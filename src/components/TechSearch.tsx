import { useMemo, useState, useRef, useEffect } from 'react';
import type { Technology } from '../types';
import { Search, Plus } from 'lucide-react';

interface Props {
  technologies: Technology[];
  alreadyAdded: Set<string>;
  onAdd: (techId: string) => void;
}

export default function TechSearch({ technologies, alreadyAdded, onAdd }: Props) {
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

      {open && matches.length > 0 && (
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
        </div>
      )}
    </div>
  );
}
