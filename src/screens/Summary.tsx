import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAssessment } from '../store/assessment';
import technologiesData from '../data/technologies.json';
import type { Technology, TierColor } from '../types';
import {
  resolveTier,
  colorScore,
  tierBadgeClass,
  depthLabel,
} from '../lib/scoring';
import CategoryRadar from '../components/CategoryRadar';
import { exportPdf } from '../lib/pdf';
import { Download, ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const TECHS = technologiesData as unknown as Technology[];
const TECH_BY_ID = new Map(TECHS.map(t => [t.id, t]));

type ExportStatus =
  | { kind: 'idle' }
  | { kind: 'busy'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

export default function Summary() {
  const navigate = useNavigate();
  const { meta, items } = useAssessment();
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState<ExportStatus>({ kind: 'idle' });

  const resolved = useMemo(() => {
    return items.flatMap(item => {
      const tech = TECH_BY_ID.get(item.techId);
      if (!tech) return [];
      return [{ tech, item, tier: resolveTier(tech, item) }];
    });
  }, [items]);

  // Skipped items (notUsed=true) are excluded from scoring buckets and radar.
  // They get their own neutral section at the bottom of the report.
  const scored = useMemo(() => resolved.filter(r => !r.tier.skipped), [resolved]);
  const skipped = useMemo(() => resolved.filter(r => r.tier.skipped), [resolved]);

  const buckets = useMemo(() => {
    const b: Record<TierColor, typeof resolved> = { green: [], yellow: [], red: [] };
    scored.forEach(r => b[r.tier.color].push(r));
    return b;
  }, [scored]);

  const radarData = useMemo(() => {
    const byCat = new Map<string, { total: number; count: number }>();
    scored.forEach(r => {
      const cat = r.tech.category;
      const prev = byCat.get(cat) ?? { total: 0, count: 0 };
      prev.total += colorScore(r.tier.color);
      prev.count += 1;
      byCat.set(cat, prev);
    });
    return [...byCat.entries()].map(([category, { total, count }]) => ({
      category,
      score: +(total / count).toFixed(2),
      count,
    }));
  }, [scored]);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
          No technologies assessed yet
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Head back and add at least one technology to generate a summary.
        </p>
        <Link to="/assess" className="btn-primary mt-6 inline-flex">
          Back to assessment
        </Link>
      </div>
    );
  }

  async function handleExport() {
    setExporting(true);
    setStatus({ kind: 'busy', message: 'Preparing report…' });
    try {
      const name =
        meta.candidateName.replace(/[^a-zA-Z0-9]+/g, '_') || 'candidate';
      const date = new Date().toISOString().slice(0, 10);
      await exportPdf('report-root', `TechVet_${name}_${date}.pdf`, p => {
        if (p.stage === 'capturing') setStatus({ kind: 'busy', message: 'Capturing report…' });
        else if (p.stage === 'rendering') setStatus({ kind: 'busy', message: `Rendering page ${p.page}/${p.total}…` });
        else if (p.stage === 'saving') setStatus({ kind: 'busy', message: 'Saving PDF…' });
        else if (p.stage === 'done') setStatus({ kind: 'success', message: `Downloaded ${(p.bytes / 1024 / 1024).toFixed(1)} MB. Check your Downloads folder.` });
      });
    } catch (err) {
      console.error('[TechVet] PDF export failed', err);
      setStatus({ kind: 'error', message: (err as Error).message || 'Unknown error — see browser console.' });
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="no-print flex flex-wrap gap-3 justify-between items-center mb-6">
        <button onClick={() => navigate('/assess')} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> Back to assessment
        </button>
        <div className="flex items-center gap-3">
          {status.kind !== 'idle' && (
            <span
              role="status"
              className={
                'text-sm px-3 py-1.5 rounded-md border ' +
                (status.kind === 'busy'
                  ? 'bg-navy-50 dark:bg-navy-800 border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-100'
                  : status.kind === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-700 text-rose-700 dark:text-rose-200')
              }
            >
              {status.message}
            </span>
          )}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="btn-primary disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Generating PDF…' : 'Export PDF Report'}
          </button>
        </div>
      </div>

      <div id="report-root" className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-soft">
        {/* Report header */}
        <header className="border-b border-slate-200 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                TechVet — Initial Screening Report
              </div>
              <h1 className="text-3xl font-bold text-navy-900 mt-1">
                {meta.candidateName || 'Unnamed candidate'}
              </h1>
              {meta.role && (
                <div className="text-slate-600 mt-1">Role: {meta.role}</div>
              )}
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>Generated {new Date().toLocaleDateString()}</div>
              {meta.startedAt && (
                <div className="mt-0.5">
                  Started {new Date(meta.startedAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>
          {meta.mandate && (
            <div className="mt-4 p-3 rounded-md border border-slate-200 bg-slate-50">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Client mandate
              </div>
              <p className="text-sm text-slate-700 whitespace-pre-line">{meta.mandate}</p>
            </div>
          )}
          {meta.notes && (
            <p className="text-sm text-slate-600 mt-3 italic">{meta.notes}</p>
          )}
        </header>

        {/* Headline stats */}
        <section className="grid grid-cols-3 gap-4 mb-2">
          <StatCard
            color="green"
            count={buckets.green.length}
            label="Good"
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatCard
            color="yellow"
            count={buckets.yellow.length}
            label="Review / Probe"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <StatCard
            color="red"
            count={buckets.red.length}
            label="Concern"
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </section>
        {skipped.length > 0 && (
          <p className="text-xs text-slate-500 mb-8">
            {skipped.length} additional tech{skipped.length === 1 ? '' : 's'}{' '}
            flagged &ldquo;not in candidate&rsquo;s stack&rdquo; — excluded from the
            headline stats and radar; see section below.
          </p>
        )}
        {skipped.length === 0 && <div className="mb-8" />}

        {/* Radar */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-navy-900 mb-3">
            Coverage by Category
          </h2>
          <div className="text-slate-700">
            <CategoryRadar data={radarData} />
          </div>
        </section>

        {/* Strengths */}
        {buckets.green.length > 0 && (
          <TierSection
            title="Strengths"
            subtitle="Versions are current or recent; depth supports it."
            items={buckets.green}
            color="green"
          />
        )}

        {/* Review */}
        {buckets.yellow.length > 0 && (
          <TierSection
            title="Probe Further"
            subtitle="Older versions or unknown version — worth confirming with the team."
            items={buckets.yellow}
            color="yellow"
          />
        )}

        {/* Concerns */}
        {buckets.red.length > 0 && (
          <TierSection
            title="Concerns"
            subtitle="Significantly outdated; verify before progressing the candidate."
            items={buckets.red}
            color="red"
          />
        )}

        {/* Not in candidate's stack — neutral, excluded from scoring */}
        {skipped.length > 0 && (
          <section className="mb-6">
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-navy-900">
                Not in candidate&rsquo;s stack
              </h2>
              <p className="text-sm text-slate-500">
                Confirmed not part of the candidate&rsquo;s working set. Listed
                for completeness; excluded from the score and radar.
              </p>
            </div>
            <div className="space-y-2">
              {skipped.map(({ tech, item }) => (
                <div
                  key={tech.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-navy-900">{tech.name}</strong>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                        Not in stack
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Category: {tech.category}
                      {item.lastUsed ? ` · last touched ${item.lastUsed}` : ''}
                    </div>
                    {item.notes && (
                      <div className="text-xs text-slate-500 mt-1 italic">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <footer className="border-t border-slate-200 pt-5 mt-8 text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-700">Disclaimer:</strong> This is an{' '}
          <em>initial</em> recruiter screening tool. It is not a substitute for a
          technical interview by an engineer. Version-tier signals reflect
          ecosystem maturity and should be confirmed with a hiring manager
          before any decision is made. All data was entered by the recruiter and
          never transmitted off this browser.
        </footer>
      </div>
    </div>
  );
}

function StatCard({
  color,
  count,
  label,
  icon,
}: {
  color: TierColor;
  count: number;
  label: string;
  icon: React.ReactNode;
}) {
  const map = {
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    yellow: 'bg-amber-50 text-amber-800 border-amber-200',
    red: 'bg-rose-50 text-rose-800 border-rose-200',
  };
  return (
    <div className={`rounded-xl border-2 p-4 ${map[color]}`}>
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-xs font-semibold uppercase tracking-wider">
          {label}
        </div>
      </div>
      <div className="text-3xl font-bold mt-1">{count}</div>
    </div>
  );
}

function TierSection({
  title,
  subtitle,
  items,
  color,
}: {
  title: string;
  subtitle: string;
  items: { tech: Technology; item: any; tier: any }[];
  color: TierColor;
}) {
  return (
    <section className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="space-y-2">
        {items.map(({ tech, item, tier }) => (
          <div
            key={tech.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <strong className="text-navy-900">{tech.name}</strong>
                <span className={tierBadgeClass(color)}>{tier.label}</span>
                {tech.vetMode !== 'checklist' && item.version && (
                  <span className="text-xs text-slate-500">
                    v{item.version}
                  </span>
                )}
                {tech.vetMode !== 'checklist' && item.unknownVersion && (
                  <span className="text-xs italic text-amber-700">
                    version unknown
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Depth: {depthLabel(item.depth)}
                {item.lastUsed ? ` · last used ${item.lastUsed}` : ''}
              </div>
              {tech.vetMode === 'checklist' && (
                <ServicesList tech={tech} item={item} />
              )}
              {tier.note && (
                <div className="text-xs text-slate-700 mt-1.5">{tier.note}</div>
              )}
              {tier.enterpriseNote && (
                <div className="text-xs italic text-emerald-700 mt-1">
                  {tier.enterpriseNote}
                </div>
              )}
              {item.notes && (
                <div className="text-xs text-slate-500 mt-1 italic">
                  Note: {item.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesList({
  tech,
  item,
}: {
  tech: Technology;
  item: { selectedServices?: string[] };
}) {
  const services = tech.services ?? [];
  const selected = new Set(item.selectedServices ?? []);
  if (services.length === 0) return null;
  const picked = services.filter(s => selected.has(s.id));
  return (
    <div className="mt-2">
      {picked.length === 0 ? (
        <div className="text-xs italic text-amber-700">
          No services confirmed yet — ask which {tech.name} services they've actually used.
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {picked.map(s => (
            <span
              key={s.id}
              className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
            >
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
