import { useMemo, useState, useRef, useEffect } from 'react';
import type { Technology } from '../types';
import { Search, Plus, MessageSquarePlus } from 'lucide-react';

interface Props {
  technologies: Technology[];
  alreadyAdded: Set<string>;
  onAdd: (techId: string) => void;
  /** Fix C (round-3 cross-cut): when search returns zero matches, the
   *  dropdown surfaces "+ Add 'X' as named-only" — captures techs the
   *  candidate mentioned but the catalog doesn't have (Lou-Oracle,
   *  Devon-Tokio, Tomi-Vault, Dmitri-Ruby all hit this in round 3).
   *  When omitted, the no-results state shows nothing (pre-Fix-C). */
  onAddNamedOnly?: (name: string) => void;
}

export default function TechSearch({ technologies, alreadyAdded, onAdd, onAddNamedOnly }: Props) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return technologies
      .filter(
        t =>
          t.name.toLowerCase().includes(lower) ||
          t.category.toLowerCase().includes(lower) ||
          t.id.includes(lower)
      )
      .slice(0, 8);
  }, [q, technologies]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function pick(t: Technology) {
    onAdd(t.id);
    setQ('');
    setOpen(false);
  }

  function pickNamedOnly() {
    const trimmed = q.trim();
    if (!trimmed || !onAddNamedOnly) return;
    onAddNamedOnly(trimmed);
    setQ('');
    setOpen(false);
  }

  const hasQuery = q.trim().length > 0;
  const showNamedOnlyCta = hasQuery && matches.length === 0 && !!onAddNamedOnly;

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={q}
          onFocus={() => setOpen(true)}
          onChange={e => {
            setQ(e.target.value);
            setOpen(true);
          }}
          placeholder="Search technologies — React, Postgres, AWS Lambda…"
          className="input pl-10"
        />
      </div>

      {open && (matches.length > 0 || showNamedOnlyCta) && (
        <div className="absolute left-0 right-0 mt-2 card max-h-80 overflow-auto z-20 p-1.5">
          {matches.map(t => {
            const added = alreadyAdded.has(t.id);
            return (
              <button
                key={t.id}
                disabled={added}
                onClick={() => pick(t)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <div className="font-medium text-navy-900 dark:text-white truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.category} · current {t.currentVersion}
                  </div>
                </div>
                {added ? (
                  <span className="text-xs text-slate-400">Already added</span>
                ) : (
                  <Plus className="w-4 h-4 text-brand opacity-0 group-hover:opacity-100 transition" />
                )}
              </button>
            );
          })}
          {showNamedOnlyCta && (
            <button
              onClick={pickNamedOnly}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center justify-between gap-3 group border-t border-slate-100 dark:border-navy-700 mt-1 pt-2.5"
            >
              <div className="min-w-0">
                <div className="font-medium text-navy-900 dark:text-white truncate">
                  + Add &ldquo;{q.trim()}&rdquo; as named-only
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Not in catalog — captured as a probe target for the
                  technical interviewer; no verdict
                </div>
              </div>
              <MessageSquarePlus className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 transition" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
