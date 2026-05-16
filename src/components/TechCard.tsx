import type { AssessmentItem, Depth, Scope, Technology } from '../types';
import { resolveTier, depthLabel, scopeLabel, tierBadgeClass } from '../lib/scoring';
import { useAssessment } from '../store/assessment';
import { ROLE_TEMPLATES } from '../data/roles';
import { X, HelpCircle, Slash } from 'lucide-react';
import { cn } from '../lib/cn';

interface Props {
  tech: Technology;
  item: AssessmentItem;
  focused: boolean;
  onFocus: () => void;
}

const DEPTH_OPTIONS: Depth[] = ['unknown', 'shallow', 'working', 'deep', 'very-deep'];
const SCOPE_OPTIONS: Scope[] = ['operator', 'author', 'reviewer', 'architect'];

export default function TechCard({ tech, item, focused, onFocus }: Props) {
  const { updateItem, removeTech } = useAssessment();
  const resolved = resolveTier(tech, item);
  const isChecklist = tech.vetMode === 'checklist';

  return (
    <div
      onClick={onFocus}
      className={cn(
        'card p-5 cursor-pointer transition-all',
        focused
          ? 'ring-2 ring-brand border-brand shadow-glow'
          : 'hover:border-slate-300 dark:hover:border-navy-600'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-navy-900 dark:text-white truncate">
              {tech.name}
            </h3>
            <span className={resolved.skipped ? 'badge-gray' : tierBadgeClass(resolved.color)}>
              <span className="w-2 h-2 rounded-full bg-current opacity-70" />
              {resolved.label}
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {tech.category}
            {isChecklist
              ? ` · ${(tech.services ?? []).length} services`
              : tech.currentVersion
                ? ` · current ${tech.currentVersion}`
                : ''}
          </div>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            removeTech(tech.id);
          }}
          className="text-slate-400 hover:text-rose-500 p-1 -m-1"
          title="Remove"
          aria-label={`Remove ${tech.name}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isChecklist ? (
        <ChecklistBody tech={tech} item={item} />
      ) : (
        <VersionBody tech={tech} item={item} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
            Depth
          </label>
          <select
            value={item.depth}
            onChange={e =>
              updateItem(tech.id, { depth: e.target.value as Depth })
            }
            onClick={e => e.stopPropagation()}
            className="input"
          >
            {DEPTH_OPTIONS.map(d => (
              <option key={d} value={d}>
                {depthLabel(d)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
            Scope of use
          </label>
          <select
            value={item.scope ?? ''}
            onChange={e =>
              updateItem(tech.id, {
                scope: (e.target.value || undefined) as Scope | undefined,
              })
            }
            onClick={e => e.stopPropagation()}
            className="input"
          >
            {/* Fix K: surface the catalog default so the recruiter knows
                the chosen scope without opening the dropdown. AI/ML libs
                default to "author" so the depth-game stops earning Green. */}
            <option value="">
              {tech.defaultScope
                ? `— Use default: ${tech.defaultScope}`
                : '— Not specified'}
            </option>
            {SCOPE_OPTIONS.map(s => (
              <option key={s} value={s}>
                {scopeLabel(s)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
            Last used
          </label>
          <input
            type="text"
            value={item.lastUsed}
            onChange={e =>
              updateItem(tech.id, { lastUsed: e.target.value })
            }
            onClick={e => e.stopPropagation()}
            placeholder="e.g. current role, 2 years ago"
            className="input"
          />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
            Notes
          </label>
          <input
            type="text"
            value={item.notes}
            onChange={e => updateItem(tech.id, { notes: e.target.value })}
            onClick={e => e.stopPropagation()}
            placeholder="Anything noteworthy from the call"
            className="input"
          />
        </div>
      </div>

      {resolved.scopeCapped && (
        <div className="mt-3 text-xs text-amber-700 dark:text-amber-300 italic">
          Verdict capped by scope — {item.scope ?? tech.defaultScope} scope
          can't earn the higher tier on operating signals alone
          {item.scope === undefined && tech.defaultScope ? ' (catalog default; override in Scope dropdown above)' : ''}.
        </div>
      )}
      {!resolved.scopeCapped && resolved.depthAdjusted && (
        <div className="mt-3 text-xs text-emerald-700 dark:text-emerald-300 italic">
          Depth raised this one tier — credit given for hands-on experience.
        </div>
      )}
      {/* Fix E: recency note. Sky for softener (Red→Yellow returner),
          amber for penalty (Green→Yellow stale). Both use sky tone to
          differentiate from the depth (green) + scope (amber) notes;
          softener variant gets a distinct icon-less prefix. */}
      {resolved.recencyAdjusted && resolved.recencyNote && (
        <div className="mt-3 text-xs italic text-sky-700 dark:text-sky-300">
          {resolved.recencyNote}
        </div>
      )}
    </div>
  );
}

function VersionBody({ tech, item }: { tech: Technology; item: AssessmentItem }) {
  const { updateItem } = useAssessment();
  const isForgot = item.unknownVersion;
  const isNotUsed = item.notUsed ?? false;
  return (
    <div className="mt-4">
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
        Version
      </label>
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={item.version}
          disabled={isForgot || isNotUsed}
          onChange={e => updateItem(tech.id, { version: e.target.value })}
          onClick={e => e.stopPropagation()}
          placeholder="e.g. 18.2"
          className="input flex-1 min-w-[180px] disabled:opacity-50"
        />
        <button
          onClick={e => {
            e.stopPropagation();
            // Toggling "Don't remember" clears any "Not in stack" state — they're
            // mutually exclusive tri-state options.
            updateItem(tech.id, {
              unknownVersion: !isForgot,
              notUsed: false,
              version: !isForgot ? '' : item.version,
            });
          }}
          className={cn(
            'btn px-3 py-2 text-xs whitespace-nowrap',
            isForgot
              ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/40 dark:text-amber-200'
              : 'btn-secondary'
          )}
          title="Candidate uses this tech but doesn't recall the version"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Don't remember
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            updateItem(tech.id, {
              notUsed: !isNotUsed,
              unknownVersion: false,
              version: !isNotUsed ? '' : item.version,
            });
          }}
          className={cn(
            'btn px-3 py-2 text-xs whitespace-nowrap',
            isNotUsed
              ? 'bg-slate-200 text-slate-800 border border-slate-300 dark:bg-navy-700 dark:text-slate-100 dark:border-navy-600'
              : 'btn-secondary'
          )}
          title="Candidate doesn't work in this stack — excludes from score"
        >
          <Slash className="w-3.5 h-3.5" />
          Not in stack
        </button>
      </div>
      {isNotUsed && (
        <div className="text-xs text-slate-500 dark:text-slate-400 italic mt-2">
          Excluded from the score and radar. Appears on the report under
          &ldquo;Not in candidate&rsquo;s stack.&rdquo;
        </div>
      )}
    </div>
  );
}

function ChecklistBody({ tech, item }: { tech: Technology; item: AssessmentItem }) {
  const { updateItem, meta } = useAssessment();
  const allServices = tech.services ?? [];
  const selected = new Set(item.selectedServices ?? []);
  const unsure = item.checklistUnsure ?? false;

  // Round-4 AWS role-aware filter: surface only services matching the
  // active template's tag filter for this tech. Untagged services (back-
  // compat for SQL / Snowflake / etc.) always show. Already-selected
  // services also always show — the recruiter's choice persists even if
  // the filter would hide it (rare but possible if template switches).
  const template = meta.templateId
    ? ROLE_TEMPLATES.find(r => r.id === meta.templateId)
    : null;
  const tagFilter = template?.serviceTagFilters?.[tech.id];
  const services =
    tagFilter && tagFilter.length > 0
      ? allServices.filter(s => {
          if (selected.has(s.id)) return true;
          if (!s.tags?.length) return true;
          return s.tags.some(t => tagFilter.includes(t));
        })
      : allServices;
  const hiddenCount = allServices.length - services.length;

  function toggle(id: string) {
    if (unsure) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    updateItem(tech.id, {
      selectedServices: Array.from(next),
      checklistTouched: true,
    });
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Services the candidate has used
          {hiddenCount > 0 && (
            <span className="ml-1.5 font-normal text-slate-400 dark:text-slate-500">
              — {hiddenCount} other {hiddenCount === 1 ? 'service' : 'services'} hidden (filtered for {template?.name})
            </span>
          )}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {selected.size} / {services.length}
          </span>
          <button
            onClick={e => {
              e.stopPropagation();
              updateItem(tech.id, { checklistUnsure: !unsure });
            }}
            className={cn(
              'btn px-2.5 py-1 text-xs whitespace-nowrap',
              unsure
                ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/40 dark:text-amber-200'
                : 'btn-secondary'
            )}
            title="Mark candidate as unsure"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Candidate unsure
          </button>
        </div>
      </div>
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 gap-1.5',
          unsure && 'opacity-50 pointer-events-none'
        )}
      >
        {services.map(svc => (
          <label
            key={svc.id}
            onClick={e => e.stopPropagation()}
            className={cn(
              'flex items-center gap-2 text-sm px-2.5 py-1.5 rounded-md border transition',
              unsure ? 'cursor-not-allowed' : 'cursor-pointer',
              selected.has(svc.id)
                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                : 'bg-slate-50 dark:bg-navy-800/50 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-navy-600'
            )}
          >
            <input
              type="checkbox"
              checked={selected.has(svc.id)}
              disabled={unsure}
              onChange={() => toggle(svc.id)}
              className="accent-emerald-600"
            />
            <span className="truncate">{svc.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
