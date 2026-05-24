import { useState, useEffect } from 'react';
import { X, FileSearch } from 'lucide-react';
import { extractTechsFromJD, type ExtractedTech } from '../lib/jdExtractor';

interface JDExtractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (techIds: string[]) => void;
}

export default function JDExtractModal({ isOpen, onClose, onApply }: JDExtractModalProps) {
  const [jd, setJd] = useState('');
  const [extracted, setExtracted] = useState<ExtractedTech[] | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) {
      setJd('');
      setExtracted(null);
      setSelectedIds(new Set());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleExtract() {
    const result = extractTechsFromJD(jd);
    setExtracted(result);
    setSelectedIds(new Set(result.map(e => e.id)));
  }

  function toggleId(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleApply() {
    onApply(Array.from(selectedIds));
  }

  const grouped = extracted ? groupByCategory(extracted) : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="card max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-navy-700">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-brand" />
            <h2 className="text-xl font-bold text-navy-900 dark:text-white">
              Paste a job description
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="p-5 overflow-y-auto flex-1">
          {!extracted ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                We'll scan the JD for catalog technologies. You'll review the
                list before anything loads into the assessment.
              </p>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                rows={12}
                placeholder="Senior Full-Stack Engineer at..."
                className="input font-mono text-sm"
                autoFocus
              />
              <div className="flex justify-end mt-4 gap-2">
                <button onClick={onClose} className="btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={handleExtract}
                  disabled={!jd.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Extract technologies
                </button>
              </div>
            </>
          ) : extracted.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-500 dark:text-slate-400">
                No catalog technologies matched. Try editing the JD or adding
                techs manually in the assessment.
              </p>
              <button
                onClick={() => setExtracted(null)}
                className="btn-secondary mt-4"
              >
                ← Edit JD
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Found <strong>{extracted.length}</strong> technologies.{' '}
                  <strong>{selectedIds.size}</strong> selected.
                </p>
                <button
                  onClick={() => setExtracted(null)}
                  className="text-sm text-brand hover:underline"
                >
                  ← Edit JD
                </button>
              </div>
              <div className="space-y-4">
                {Object.entries(grouped!).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      {category}
                    </h3>
                    <ul className="space-y-1">
                      {items.map(item => (
                        <li key={item.id}>
                          <label className="flex items-start gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-navy-800/40 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedIds.has(item.id)}
                              onChange={() => toggleId(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-navy-900 dark:text-white">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                matched: {item.matched.join(', ')}
                              </div>
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {extracted && extracted.length > 0 && (
          <footer className="border-t border-slate-200 dark:border-navy-700 p-4 flex justify-end gap-2">
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={selectedIds.size === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Load {selectedIds.size} into assessment
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

function groupByCategory(extracted: ExtractedTech[]): Record<string, ExtractedTech[]> {
  const out: Record<string, ExtractedTech[]> = {};
  for (const e of extracted) {
    (out[e.category] ??= []).push(e);
  }
  return out;
}
