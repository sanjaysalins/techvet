import type { AssessmentItem, Depth, Technology } from '../types';
import { resolveTier, depthLabel, tierBadgeClass } from '../lib/scoring';
import { useAssessment } from '../store/assessment';
import { X, HelpCircle } from 'lucide-react';
import { cn } from '../lib/cn';

interface Props {
  tech: Technology;
  item: AssessmentItem;
  focused: boolean;
  onFocus: () => void;
}

const DEPTH_OPTIONS: Depth[] = ['unknown', 'shallow', 'working', 'deep', 'very-deep'];

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
            <span className={tierBadgeClass(resolved.color)}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
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

        <div className="md:col-span-2">
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

      {resolved.depthAdjusted && (
        <div className="mt-3 text-xs text-emerald-700 dark:text-emerald-300 italic">
          Depth raised this one tier — credit given for hands-on experience.
        </div>
      )}
    </div>
  );
}

function VersionBody({ tech, item }: { tech: Technology; item: AssessmentItem }) {
  const { updateItem } = useAssessment();
  return (
    <div className="mt-4">
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
        Version
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={item.version}
          disabled={item.unknownVersion}
          onChange={e => updateItem(tech.id, { version: e.target.value })}
          onClick={e => e.stopPropagation()}
          placeholder="e.g. 18.2"
          className="input flex-1 disabled:opacity-50"
        />
        <button
          onClick={e => {
            e.stopPropagation();
            updateItem(tech.id, {
              unknownVersion: !item.unknownVersion,
              version: !item.unknownVersion ? '' : item.version,
            });
          }}
          className={cn(
            'btn px-3 py-2 text-xs whitespace-nowrap',
            item.unknownVersion
              ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/40 dark:text-amber-200'
              : 'btn-secondary'
          )}
          title="Mark version unknown"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          I don't remember
        </button>
      </div>
    </div>
  );
}

function ChecklistBody({ tech, item }: { tech: Technology; item: AssessmentItem }) {
  const { updateItem } = useAssessment();
  const services = tech.services ?? [];
  const selected = new Set(item.selectedServices ?? []);

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    updateItem(tech.id, { selectedServices: Array.from(next) });
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Services the candidate has used
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {selected.size} / {services.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {services.map(svc => (
          <label
            key={svc.id}
            onClick={e => e.stopPropagation()}
            className={cn(
              'flex items-center gap-2 text-sm px-2.5 py-1.5 rounded-md border cursor-pointer transition',
              selected.has(svc.id)
                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                : 'bg-slate-50 dark:bg-navy-800/50 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-navy-600'
            )}
          >
            <input
              type="checkbox"
              checked={selected.has(svc.id)}
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
