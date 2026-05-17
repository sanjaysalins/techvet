import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAssessment } from '../store/assessment';
import { ROLE_TEMPLATES } from '../data/roles';
import technologiesData from '../data/technologies.json';
import type { AssessmentItem, Depth, NamedOnlyEntry, Scope, Technology, TierColor } from '../types';
import {
  resolveTier,
  colorScore,
  tierBadgeClass,
  depthLabel,
} from '../lib/scoring';

const DEPTH_OPTIONS: Depth[] = ['unknown', 'shallow', 'working', 'deep', 'very-deep'];
import CategoryRadar from '../components/CategoryRadar';
import { exportPdf } from '../lib/pdf';
import { notDiscussedCopy, channelLabel, confirmedNotInStackCopy } from '../lib/channel';
import { formatCandidateContext } from '../lib/candidateContext';
import { Download, ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle, Slash, Circle, Sliders, MessageSquarePlus, X, Lightbulb } from 'lucide-react';

const SCOPE_OPTIONS: Scope[] = ['operator', 'author', 'reviewer', 'architect'];

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

  // Round-18 (Theo R12 fix): pass each tech's template-specific
  // serviceTagFilter into resolveTier so the Summary verdicts match the
  // Assessment-page card renders. Pre-18 the report scoring used
  // tech.services.length regardless of filter, producing label/coverage
  // inconsistency with the card UI.
  const template = useMemo(
    () => (meta.templateId ? ROLE_TEMPLATES.find(r => r.id === meta.templateId) : null),
    [meta.templateId]
  );
  const resolved = useMemo(() => {
    return items.flatMap(item => {
      const tech = TECH_BY_ID.get(item.techId);
      if (!tech) return [];
      const serviceTagFilter = template?.serviceTagFilters?.[tech.id];
      return [{ tech, item, tier: resolveTier(tech, item, { seniority: meta.seniority, serviceTagFilter }) }];
    });
  }, [items, meta.seniority, template]);

  // Three exclusion buckets, in order of precedence:
  //   - skipped       (notUsed=true)        — candidate confirmed absent
  //   - notDiscussed  (Fix G, round-2)      — recruiter never touched the card
  //   - scored        (everything else)     — feeds buckets + radar
  // notDiscussed cards are template-preloaded but the recruiter ran out of
  // time or pivoted. Scoring the recruiter's silence as candidate weakness
  // (the pre-fix behavior) inflated Yellow probes and diluted real ones.
  const scored = useMemo(
    () => resolved.filter(r => !r.tier.skipped && !r.tier.notDiscussed),
    [resolved]
  );
  const skipped = useMemo(() => resolved.filter(r => r.tier.skipped), [resolved]);
  const notDiscussed = useMemo(
    () => resolved.filter(r => r.tier.notDiscussed && !r.tier.skipped),
    [resolved]
  );

  const buckets = useMemo(() => {
    const b: Record<TierColor, typeof resolved> = { green: [], yellow: [], red: [] };
    scored.forEach(r => b[r.tier.color].push(r));
    return b;
  }, [scored]);

  // Round-7 7C (5ξ, Anil): scope-capped count for the new 6th headline card.
  // Counts scored entries that landed Yellow because reviewer/architect/author
  // scope capped a higher tier (cappedFromColor is set by `applyScope`).
  // Anil's round-6 headline `0G/5Y/0R` made "capped-strong" and "thin
  // coverage" read identical; the 6th sky-toned card differentiates at glance.
  const scopeCappedCount = useMemo(
    () => scored.filter(r => r.tier.scopeCapped && r.tier.cappedFromColor === 'green').length,
    [scored]
  );

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

  if (items.length === 0 && meta.namedNotInCatalog.length === 0) {
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

  // Fix K (round-2): post-call enrichment hint. Surface when there's at
  // least one scored tech whose scope is implicit (no explicit user choice).
  // The recruiter didn't have time to set it mid-call — fix it here.
  const hasUnsetScopes = scored.some(r => r.item.scope === undefined);

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

      {hasUnsetScopes && (
        <div className="no-print flex items-start gap-3 p-3 mb-4 rounded-lg border border-navy-200 bg-navy-50 text-sm text-navy-800">
          <Sliders className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Tune scope before exporting.</strong> Click any{' '}
            <span className="font-mono text-xs">Scope:</span> chip below to
            mark a tech as operator / author / reviewer / architect. AI/ML
            libraries default to <em>author</em>; everything else defaults to
            operator-implied. Adjustments update the verdict live.
          </div>
        </div>
      )}

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
              {/* Fix M: candidate-context line. Hidden when all defaults so
                  the header stays clean for the screens recruiter didn't
                  fill out. */}
              {formatCandidateContext(meta) && (
                <div className="text-sm text-slate-700 mt-1.5 font-medium">
                  {formatCandidateContext(meta)}
                </div>
              )}
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>Generated {new Date().toLocaleDateString()}</div>
              {meta.startedAt && (
                <div className="mt-0.5">
                  Started {new Date(meta.startedAt).toLocaleString()}
                </div>
              )}
              {/* Fix Q: channel chip in report header so the hiring
                  manager knows whether this was a phone screen, a video
                  panel, or async CV review — meaningfully different
                  evidence levels. Round-4 Bug 2: uppercase styling was
                  mangling "Async (CV-only)" to "ASYNC (CV-ONLY)"; chip
                  now sentence-case so the parens stay legible. */}
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                Channel: {channelLabel(meta.channel)}
              </div>
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

        {/* Headline stats — scored buckets + methodology + off-catalog +
            scope-capped (round-7 7C) when present. Each card promotes a
            specific senior-signal axis that pre-5ι/6E/7C was buried below
            the fold. Card scales 3 → 6 cards based on which extensions fire.
            Mobile: stacks 2-col regardless to keep cards readable. */}
        {(() => {
          const methCount = meta.methodologyEntries.length;
          const offCount = meta.namedNotInCatalog.length;
          const extras = (methCount > 0 ? 1 : 0) + (offCount > 0 ? 1 : 0) + (scopeCappedCount > 0 ? 1 : 0);
          const gridClass =
            extras === 0
              ? 'grid-cols-3'
              : extras === 1
                ? 'grid-cols-2 md:grid-cols-4'
                : extras === 2
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6';
          return (
            <section className={`grid gap-4 mb-3 ${gridClass}`}>
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
              {methCount > 0 && (
                <div className="rounded-xl border-2 p-4 bg-emerald-100 text-emerald-900 border-emerald-300">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    <div className="text-xs font-semibold uppercase tracking-wider">
                      Methodology
                    </div>
                  </div>
                  <div className="text-3xl font-bold mt-1">{methCount}</div>
                </div>
              )}
              {offCount > 0 && (
                <div className="rounded-xl border-2 p-4 bg-sky-100 text-sky-900 border-sky-300">
                  <div className="flex items-center gap-2">
                    <MessageSquarePlus className="w-5 h-5" />
                    <div className="text-xs font-semibold uppercase tracking-wider">
                      Off-catalog
                    </div>
                  </div>
                  <div className="text-3xl font-bold mt-1">{offCount}</div>
                </div>
              )}
              {scopeCappedCount > 0 && (
                <div className="rounded-xl border-2 p-4 bg-slate-100 text-slate-900 border-slate-300" title="Yellows that would have been Good without the scope cap — Staff IC / architect / reviewer patterns.">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5" />
                    <div className="text-xs font-semibold uppercase tracking-wider">
                      Scope-capped
                    </div>
                  </div>
                  <div className="text-3xl font-bold mt-1">{scopeCappedCount}</div>
                </div>
              )}
            </section>
          );
        })()}
        {/* Round-16 J5 (Mei + Eitan rounds 6-10): seniority-aware framing
            sentence below the headline cards. Pre-J5, headline counts were
            seniority-blind — HM reading Mei's report saw "1 Yellow" without
            knowing it was a TS-shallow junior probe target vs a senior tech
            debt issue. One line of context anchors the read. */}
        {meta.seniority && meta.seniority !== 'unspecified' && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 -mt-2">
            {/* Round-18 polish (Mei R12 sim 05 finding F6, F7): tightened to
                drop the homework-y "verify the right depth + version" clause
                AND swapped text-xs italic → text-sm so it doesn't email-skim. */}
            {meta.seniority === 'junior'
              ? `Junior candidate — Yellows here typically flag probe targets, not regressions.`
              : meta.seniority === 'mid'
                ? `Mid-level candidate — balanced verdicts expected; the read is deep+narrow specialism vs broad working knowledge.`
                : meta.seniority === 'senior'
                  ? `Senior candidate — Greens carry depth signal; capped Yellows on architect/reviewer scope read as Staff-IC shape.`
                  : `Staff+ candidate — methodology + named-only signals carry more weight than version-tier coverage.`}
          </p>
        )}
        {/* Coverage chips — confirmed-absent and not-discussed counts. Fix L
            (round-2 cross-cut): hiring managers asked to distinguish "asked &
            confirmed not in stack" from "ran out of time" — both used to be
            buried below the disclaimer. Chip-row gives them headline-level
            visibility without polluting the three scored buckets. */}
        {(skipped.length > 0 || notDiscussed.length > 0 || meta.namedNotInCatalog.length > 0) && (
          <section className="flex flex-wrap gap-2 mb-8">
            {skipped.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-slate-100 text-slate-700 text-sm">
                <Slash className="w-3.5 h-3.5" />
                <strong>{skipped.length}</strong> confirmed not in stack
                <span className="text-xs text-slate-500">(see section below)</span>
              </span>
            )}
            {notDiscussed.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-amber-200 bg-amber-50 text-amber-800 text-sm">
                <Circle className="w-3.5 h-3.5" />
                <strong>{notDiscussed.length}</strong> {notDiscussedCopy(meta.channel).chip}
                <span className="text-xs text-amber-700">{notDiscussedCopy(meta.channel).chipHint}</span>
              </span>
            )}
            {/* Fix C: surface named-only count in the headline chip-row so
                hiring manager sees there are off-catalog probe targets. */}
            {meta.namedNotInCatalog.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-amber-300 bg-amber-100 text-amber-900 text-sm">
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <strong>{meta.namedNotInCatalog.length}</strong> candidate mentioned, off-catalog
                <span className="text-xs text-amber-800">(see section below)</span>
              </span>
            )}
          </section>
        )}
        {skipped.length === 0 && notDiscussed.length === 0 && meta.namedNotInCatalog.length === 0 && <div className="mb-8" />}

        {/* Radar */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-navy-900 mb-3">
            Coverage by Category
          </h2>
          <div className="text-slate-700">
            <CategoryRadar data={radarData} />
          </div>
        </section>

        {/* Round-6 6E-b: when off-catalog evidence outweighs scored evidence,
            promote the named-only section above Strengths so visual order
            matches evidence weight (Owen-shape: 5 enriched DBA chips
            outweigh 2 scored Greens — recruiter shouldn't have to scroll
            past Strengths/Yellow/Red/Methodology to find the actual stack). */}
        {(() => {
          const scoredTotal = buckets.green.length + buckets.yellow.length + buckets.red.length;
          const promoteNamedOnly = meta.namedNotInCatalog.length > scoredTotal;
          const namedOnlySection = meta.namedNotInCatalog.length > 0 ? (
            <section className="mb-6">
              <div className="mb-3 flex items-start gap-2">
                <MessageSquarePlus className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold text-navy-900">
                    Candidate mentioned — out of catalog ({meta.namedNotInCatalog.length})
                    {promoteNamedOnly && (
                      <span className="ml-2 text-xs font-normal text-amber-700">
                        (promoted — off-catalog evidence outweighs scored)
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Names heard during the screening that aren&rsquo;t in
                    TechVet&rsquo;s catalog. <strong>No verdict</strong> — these
                    are probe targets for the technical interviewer. Bug 4 (round-4):
                    add <em>depth</em> and <em>last used</em> inline below so the
                    recruiter&rsquo;s "Burp daily, deep" isn&rsquo;t lost as bare
                    "Burp".
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {meta.namedNotInCatalog.map(entry => (
                  <NamedOnlyEditor key={entry.name} entry={entry} />
                ))}
              </div>
            </section>
          ) : null;

          return (
            <>
              {promoteNamedOnly && namedOnlySection}

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

              {/* Methodology + practices (Fix D4, round-1+3+4). Display-only:
                  senior signal the hiring manager reads. No verdict; capture is
                  on Assessment. Empty → section hidden. */}
              {meta.methodologyEntries.length > 0 && (
                <section className="mb-6">
                  <div className="mb-3 flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-navy-900">
                        Methodology + practices ({meta.methodologyEntries.length})
                      </h2>
                      <p className="text-sm text-slate-600">
                        Skills and practices the candidate brought up beyond the
                        tool stack. <strong>No verdict</strong> — senior signal
                        the hiring manager reads as context. Round-1 Mei:
                        &ldquo;senior ICs are differentiated by skills, not
                        tools.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.methodologyEntries.map(entry => (
                      <span
                        key={entry.id}
                        className="inline-flex items-center px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-medium"
                      >
                        {entry.label}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Candidate mentioned — out of catalog (default position, after
                  Methodology). Promoted above Strengths when 6E-b condition
                  fires (handled at the top of this fragment). */}
              {!promoteNamedOnly && namedOnlySection}
            </>
          );
        })()}

        {/* Confirmed not in stack — first-class section, not a footer note.
            Fix L (round-2): agents asked for "asked and confirmed absent" to
            read as positive coverage signal (right role) or a flag (wrong
            role) — not as silent omission. Heading-level prominence + a
            slash-icon callout box. */}
        {skipped.length > 0 && (
          <section className="mb-6">
            <div className="mb-3 flex items-start gap-2">
              <Slash className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
              {(() => {
                // Round-4 Bug 1 (Marisol async session): channel-aware
                // title + 3-part body so async doesn't claim "the
                // recruiter asked the candidate" when no call happened.
                const copy = confirmedNotInStackCopy(meta.channel);
                const Emphasis = copy.emphasisStyle === 'strong' ? 'strong' : 'em';
                return (
                  <div>
                    <h2 className="text-lg font-semibold text-navy-900">
                      {copy.title(skipped.length)}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {copy.lead}
                      <Emphasis>{copy.emphasis}</Emphasis>
                      {copy.tail}
                    </p>
                  </div>
                );
              })()}
            </div>
            <div className="space-y-2">
              {skipped.map(({ tech, item }) => (
                <div
                  key={tech.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-300 bg-slate-50"
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

        {/* Not discussed on the call — template-preloaded but never touched.
            Fix G (round-2): pre-fix these cards scored as Yellow "Review /
            Probe" and inflated the Probe Further bucket with non-issues
            (Priya/Databricks, Tomás/React, Aisha/Docker). Now excluded
            from buckets/radar and surfaced here with a clear "we didn't
            get to it" framing — distinct from confirmed-absent. */}
        {notDiscussed.length > 0 && (
          <section className="mb-6">
            <div className="mb-3 flex items-start gap-2">
              <Circle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-navy-900">
                  {notDiscussedCopy(meta.channel).sectionTitle} ({notDiscussed.length})
                </h2>
                <p className="text-sm text-slate-600">
                  {notDiscussedCopy(meta.channel).sectionBody}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {notDiscussed.map(({ tech }) => (
                <div
                  key={tech.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-navy-900">{tech.name}</strong>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        Not discussed
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Category: {tech.category}
                    </div>
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
              <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span>Depth: {depthLabel(item.depth)}</span>
                <ScopeChip tech={tech} item={item} />
                {item.lastUsed && <span>· last used {item.lastUsed}</span>}
              </div>
              {tech.vetMode === 'checklist' && (
                <ServicesList tech={tech} item={item} />
              )}
              {/* Round-9 9B (Anil F1, F2): same wording split as TechCard.
                  cappedFromColor present → demotion story (Green-base capped);
                  absent → bounded story (Yellow-base capped). The pre-9B
                  generic wording mis-framed the bounded case as a demotion. */}
              {tier.scopeCapped && tier.cappedFromColor && (
                <div className="text-xs italic text-amber-700 mt-1">
                  Capped by {item.scope ?? tech.defaultScope} scope — operates differently than an operator-level signal would imply.
                </div>
              )}
              {tier.scopeCapped && !tier.cappedFromColor && (
                <div className="text-xs italic text-amber-700 mt-1">
                  {/* Round-11 (Anil R10 copy polish): plain-English variant of the
                      9B bounded-by-scope wording. Recruiter-friendlier framing. */}
                  {item.scope === 'architect' || tech.defaultScope === 'architect'
                    ? 'Architect-scope verdict — designs how this gets used; doesn\'t operate it day-to-day.'
                    : item.scope === 'reviewer' || tech.defaultScope === 'reviewer'
                      ? 'Reviewer-scope verdict — reviews and audits this; doesn\'t operate it day-to-day.'
                      : 'Author-scope verdict — writes code that uses this; doesn\'t operate it day-to-day.'}
                </div>
              )}
              {/* Fix E: recency note rendered before the tier note so the
                  recency reasoning is the first thing HM reads when it
                  fires. Sky tone differentiates from depth (green) +
                  scope (amber). */}
              {tier.recencyAdjusted && tier.recencyNote && (
                <div className="text-xs italic text-sky-700 mt-1">
                  {tier.recencyNote}
                </div>
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

/**
 * Fix K (round-2 cross-cut): post-call scope enrichment chip. Renders a
 * compact native select that lets the recruiter set or change scope from
 * the Summary screen — solving the "scope dropdown unreachable on phone"
 * problem flagged by all 10 phone-screening sessions.
 *
 * - Empty option = "Use catalog default" (when tech.defaultScope is set)
 *   or "Operator (implied)" (when no default). The first option both
 *   communicates the current effective scope and lets the recruiter
 *   revert from an explicit choice back to the default.
 * - Italic "via default" hint appears when the effective scope comes
 *   from the catalog rather than from an explicit user choice.
 * - Stops click propagation so the chip doesn't bubble to the parent
 *   tier row, and updates the store immediately so verdicts re-resolve
 *   and buckets shift live.
 */
function ScopeChip({ tech, item }: { tech: Technology; item: AssessmentItem }) {
  const { updateItem } = useAssessment();
  const effective = item.scope ?? tech.defaultScope;
  const isExplicit = item.scope !== undefined;
  const placeholder = tech.defaultScope
    ? `— default: ${tech.defaultScope}`
    : '— operator implied';
  return (
    <span className="inline-flex items-center gap-1">
      <select
        value={item.scope ?? ''}
        onChange={e =>
          updateItem(tech.id, {
            scope: (e.target.value || undefined) as Scope | undefined,
          })
        }
        onClick={e => e.stopPropagation()}
        className="text-xs px-1.5 py-0.5 rounded bg-navy-50 text-navy-700 border border-navy-200 font-medium cursor-pointer hover:bg-navy-100"
        aria-label={`Scope for ${tech.name}`}
      >
        <option value="">
          Scope: {effective ?? 'operator'} {placeholder}
        </option>
        {SCOPE_OPTIONS.map(s => (
          <option key={s} value={s}>
            Scope: {s}
          </option>
        ))}
      </select>
      {!isExplicit && tech.defaultScope && (
        <span className="text-xs italic text-slate-500">via default</span>
      )}
    </span>
  );
}

/**
 * Bug 4 (round-4 Wendy): post-call enrichment editor for named-only
 * entries. Pre-Bug-4 entries were bare strings — "Burp daily, deep"
 * flattened to "Burp." Now the recruiter can attach depth + lastUsed
 * inline on Summary (same post-call pattern as Fix K's ScopeChip).
 *
 * Round-5 5θ (Yasmin async): in async mode the editor's depth +
 * lastUsed fields sit empty (no candidate to ask) and render as
 * cluttered half-empty editors. Now collapse to a compact chip in
 * async when both fields are empty; expand once either has a value.
 * Phone/video keep the full editor visible — recruiter captures live.
 */
function NamedOnlyEditor({ entry }: { entry: NamedOnlyEntry }) {
  const { updateNamedOnly, removeNamedOnly, meta } = useAssessment();

  const hasEnrichment = entry.depth !== undefined || (entry.lastUsed?.trim().length ?? 0) > 0;
  const compactAsync = meta.channel === 'async' && !hasEnrichment;

  if (compactAsync) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-2.5">
        <div className="flex items-center gap-2">
          <strong className="text-navy-900 text-sm flex-1 min-w-0 truncate">
            {entry.name}
          </strong>
          <span className="text-xs text-amber-700 italic mr-1">
            no enrichment (async; verify on next step)
          </span>
          <button
            onClick={() => removeNamedOnly(entry.name)}
            className="text-amber-700 hover:bg-amber-100 rounded p-0.5"
            aria-label={`Remove ${entry.name}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 p-2.5">
      <div className="flex items-center gap-2 mb-1.5">
        <strong className="text-navy-900 text-sm flex-1 min-w-0 truncate">
          {entry.name}
        </strong>
        <button
          onClick={() => removeNamedOnly(entry.name)}
          className="text-amber-700 hover:bg-amber-100 rounded p-0.5"
          aria-label={`Remove ${entry.name}`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <select
          value={entry.depth ?? ''}
          onChange={e =>
            updateNamedOnly(entry.name, {
              depth: (e.target.value || undefined) as Depth | undefined,
            })
          }
          className="text-xs px-2 py-1 rounded bg-white border border-amber-200 text-slate-700"
          aria-label={`Depth for ${entry.name}`}
        >
          <option value="">— Depth not set</option>
          {DEPTH_OPTIONS.map(d => (
            <option key={d} value={d}>
              {depthLabel(d)}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={entry.lastUsed ?? ''}
          onChange={e => updateNamedOnly(entry.name, { lastUsed: e.target.value })}
          placeholder="Last used — e.g. current role, 2022"
          className="text-xs px-2 py-1 rounded bg-white border border-amber-200 text-slate-700 placeholder:text-slate-400"
          aria-label={`Last used for ${entry.name}`}
        />
      </div>
    </div>
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
