import { useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAssessment } from '../store/assessment';
import technologiesData from '../data/technologies.json';
import type { Channel, PathType, Seniority, Technology } from '../types';
import {
  seniorityLabel,
  pathTypeLabel,
  SENIORITY_OPTIONS,
  PATH_TYPE_OPTIONS,
} from '../lib/candidateContext';
import TechCard from '../components/TechCard';
import TechSearch from '../components/TechSearch';
import CategoryPrompt from '../components/CategoryPrompt';
import GuidancePanel from '../components/GuidancePanel';
import { resolveTier } from '../lib/scoring';
import { Save, FileBarChart, Sparkles, Phone, Video, FileText, X, MessageSquarePlus } from 'lucide-react';
import { cn } from '../lib/cn';

const CHANNELS: { id: Channel; label: string; icon: typeof Phone; hint: string }[] = [
  { id: 'phone', label: 'Phone', icon: Phone, hint: '5-10 min, typing while listening' },
  { id: 'video', label: 'Video', icon: Video, hint: '30-45 min, more probe time' },
  { id: 'async', label: 'Async (CV-only)', icon: FileText, hint: 'No live call — CV + JD only' },
];

const TECHS = technologiesData as unknown as Technology[];

const TECH_BY_ID = new Map(TECHS.map(t => [t.id, t]));

export default function Assessment() {
  const navigate = useNavigate();
  const {
    meta,
    items,
    focusedTechId,
    setMeta,
    addTech,
    addNamedOnly,
    removeNamedOnly,
    setFocused,
    saveDraft,
  } = useAssessment();

  // Auto-focus the most recently added tech.
  useEffect(() => {
    if (!focusedTechId && items.length > 0) {
      setFocused(items[items.length - 1].techId);
    }
  }, [items, focusedTechId, setFocused]);

  const categories = useMemo(() => {
    const cats = new Map<string, Technology[]>();
    items.forEach(item => {
      const tech = TECH_BY_ID.get(item.techId);
      if (!tech) return;
      const arr = cats.get(tech.category) ?? [];
      arr.push(tech);
      cats.set(tech.category, arr);
    });
    return cats;
  }, [items]);

  const focusedTech = focusedTechId ? TECH_BY_ID.get(focusedTechId) : null;
  const focusedItem = items.find(i => i.techId === focusedTechId) ?? null;
  const focusedResolved =
    focusedTech && focusedItem ? resolveTier(focusedTech, focusedItem) : null;

  const alreadyAdded = new Set(items.map(i => i.techId));

  function handleSaveDraft() {
    saveDraft();
    alert('Draft saved to this browser. Resume from the home screen anytime.');
  }

  function handleReview() {
    if (!meta.candidateName.trim()) {
      if (!confirm('No candidate name set. Continue to summary anyway?')) return;
    }
    navigate('/summary');
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Candidate header */}
      <div className="card p-5 mb-6 space-y-4">
        {/* Fix Q: channel pill — drives per-channel empty-field semantics
            on the Summary report. Phone is the primary use case (default);
            async needs different framing because the recruiter never spoke
            to the candidate. */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
            Screening channel
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CHANNELS.map(c => {
              const Icon = c.icon;
              const active = meta.channel === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setMeta({ channel: c.id })}
                  type="button"
                  title={c.hint}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition',
                    active
                      ? 'bg-brand text-white border-brand shadow-sm'
                      : 'bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {c.label}
                </button>
              );
            })}
            <span className="text-xs text-slate-500 dark:text-slate-400 italic self-center ml-2">
              {CHANNELS.find(c => c.id === meta.channel)?.hint}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              Candidate name
            </label>
            <input
              type="text"
              value={meta.candidateName}
              onChange={e => setMeta({ candidateName: e.target.value })}
              placeholder="Full name"
              className="input"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              Role
            </label>
            <input
              type="text"
              value={meta.role}
              onChange={e => setMeta({ role: e.target.value })}
              placeholder="e.g. Senior Full-Stack"
              className="input"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              CV link / notes
            </label>
            <input
              type="text"
              value={meta.notes}
              onChange={e => setMeta({ notes: e.target.value })}
              placeholder="Anything top-of-mind"
              className="input"
            />
          </div>
        </div>
        {/* Fix M (round-3): candidate context row. Renders inline on
            Summary header so HM reads it before the verdicts. All optional;
            defaults hide the line. */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_120px_1fr_1.5fr] gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              Seniority
            </label>
            <div className="flex flex-wrap gap-1">
              {SENIORITY_OPTIONS.map(s => {
                const active = meta.seniority === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setMeta({ seniority: s as Seniority })}
                    className={cn(
                      'px-2.5 py-1.5 rounded-md text-sm font-medium border transition',
                      active
                        ? 'bg-brand text-white border-brand shadow-sm'
                        : 'bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600'
                    )}
                  >
                    {s === 'unspecified' ? '—' : seniorityLabel(s)}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              Years in industry
            </label>
            <input
              type="text"
              value={meta.yearsInIndustry}
              onChange={e => setMeta({ yearsInIndustry: e.target.value })}
              placeholder="e.g. 8 or 10+"
              className="input"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              Path
            </label>
            <select
              value={meta.pathType}
              onChange={e => setMeta({ pathType: e.target.value as PathType })}
              className="input"
            >
              {PATH_TYPE_OPTIONS.map(p => (
                <option key={p} value={p}>
                  {p === 'unspecified' ? '— Not specified' : pathTypeLabel(p)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
              Additional context <span className="font-normal text-slate-400 dark:text-slate-500">(optional)</span>
            </label>
            <input
              type="text"
              value={meta.candidateContext}
              onChange={e => setMeta({ candidateContext: e.target.value })}
              placeholder="e.g. 3 yr career break, ex-teacher, ex-Salesforce dev"
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
            Client mandate
            <span className="ml-1.5 font-normal text-slate-400 dark:text-slate-500">
              — what the client asked for (paste the JD bullets or short summary)
            </span>
          </label>
          <textarea
            value={meta.mandate}
            onChange={e => setMeta({ mandate: e.target.value })}
            placeholder="e.g. Senior backend on AWS (Lambda + RDS), React FE, 5+ yrs TypeScript, Postgres at scale"
            rows={2}
            className="input resize-y min-h-[64px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Main column */}
        <div className="space-y-6">
          <TechSearch
            technologies={TECHS}
            alreadyAdded={alreadyAdded}
            onAdd={addTech}
            onAddNamedOnly={addNamedOnly}
          />

          {/* Fix C: "Candidate mentioned" chip strip. Shows the names
              recruiter captured via the no-results search CTA. Each chip
              has an x-button to remove. Stays compact — primary purpose
              is "did the tool catch what I just heard?" feedback. */}
          {meta.namedNotInCatalog.length > 0 && (
            <div className="card p-3">
              <div className="flex items-start gap-2">
                <MessageSquarePlus className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                    Candidate mentioned ({meta.namedNotInCatalog.length})
                    <span className="ml-1.5 font-normal text-slate-400 dark:text-slate-500">
                      — not in catalog; probe target for the technical interviewer
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.namedNotInCatalog.map(name => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700 text-sm"
                      >
                        {name}
                        <button
                          onClick={() => removeNamedOnly(name)}
                          className="p-0.5 hover:bg-amber-100 dark:hover:bg-amber-800/30 rounded"
                          aria-label={`Remove ${name}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="card p-10 text-center">
              <Sparkles className="w-8 h-8 text-brand mx-auto mb-3" />
              <h3 className="font-semibold text-navy-900 dark:text-white">
                Add a technology to begin
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md mx-auto">
                Use the search above. As soon as you pick one, you'll see live
                color-coded guidance on the right.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {[...categories.entries()].map(([cat, techs]) => (
                <section key={cat}>
                  <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-3 px-1">
                    {cat}
                  </h2>
                  <div className="space-y-3">
                    {techs.map(tech => {
                      const item = items.find(i => i.techId === tech.id)!;
                      return (
                        <TechCard
                          key={tech.id}
                          tech={tech}
                          item={item}
                          focused={focusedTechId === tech.id}
                          onFocus={() => setFocused(tech.id)}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}

              <CategoryPrompt
                technologies={TECHS}
                items={items}
                onAdd={addTech}
              />
            </div>
          )}

          <div className="no-print flex flex-wrap gap-3 sticky bottom-4 pt-4">
            <button onClick={handleSaveDraft} className="btn-secondary">
              <Save className="w-4 h-4" /> Save draft (this browser)
            </button>
            <button
              onClick={handleReview}
              disabled={items.length === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileBarChart className="w-4 h-4" /> Review Summary
            </button>
            <Link to="/" className="btn-ghost">
              Cancel
            </Link>
          </div>
        </div>

        {/* Sticky right guidance sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            {focusedTech && focusedResolved ? (
              <GuidancePanel tech={focusedTech} resolved={focusedResolved} />
            ) : (
              <div className="card p-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="font-semibold text-navy-900 dark:text-white mb-1">
                  Live guidance appears here
                </div>
                Add a technology and start filling in a version — color-coded
                advice and probe questions will appear on this panel
                automatically.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
