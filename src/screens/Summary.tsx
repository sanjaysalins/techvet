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

export default function Summary() {
  const navigate = useNavigate();
  const { meta, items } = useAssessment();
  const [exporting, setExporting] = useState(false);

  const resolved = useMemo(() => {
    return items.flatMap(item => {
      const tech = TECH_BY_ID.get(item.techId);
      if (!tech) return [];
      return [{ tech, item, tier: resolveTier(tech, item) }];
    });
  }, [items]);

  const buckets = useMemo(() => {
    const b: Record<TierColor, typeof resolved> = { green: [], yellow: [], red: [] };
    resolved.forEach(r => b[r.tier.color].push(r));
    return b;
  }, [resolved]);

  const radarData = useMemo(() => {
    const byCat = new Map<string, { total: number; count: number }>();
    resolved.forEach(r => {
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
  }, [resolved]);

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
    try {
      const name =
        meta.candidateName.replace(/[^a-zA-Z0-9]+/g, '_') || 'candidate';
      const date = new Date().toISOString().slice(0, 10);
      await exportPdf('report-root', `TechVet_${name}_${date}.pdf`);
    } catch (err) {
      console.error(err);
      alert('PDF export failed: ' + (err as Error).message);
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
        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn-primary disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Generating PDF…' : 'Export PDF Report'}
        </button>
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
          {meta.notes && (
            <p className="text-sm text-slate-600 mt-3 italic">{meta.notes}</p>
          )}
        </header>

        {/* Headline stats */}
        <section className="grid grid-cols-3 gap-4 mb-8">
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
                {item.version && (
                  <span className="text-xs text-slate-500">
                    v{item.version}
                  </span>
                )}
                {item.unknownVersion && (
                  <span className="text-xs italic text-amber-700">
                    version unknown
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Depth: {depthLabel(item.depth)}
                {item.lastUsed ? ` · last used ${item.lastUsed}` : ''}
              </div>
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
