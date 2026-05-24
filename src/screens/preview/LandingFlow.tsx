import { useNavigate, Link } from 'react-router-dom';
import { useAssessment } from '../../store/assessment';
import { ROLE_TEMPLATES } from '../../data/roles';
import { extractTechsFromJD, type ExtractedTech } from '../../lib/jdExtractor';
import { ArrowRight, FileSearch, FileText, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Preview A — single-flow, JD-led.
 * JD paste textarea is the dominant hero. Templates render as a
 * compact chip strip below. No tabs, no modal.
 */
export default function LandingFlow() {
  const navigate = useNavigate();
  const { reset, addTech, setMeta, loadDraft } = useAssessment();
  const [hasDraft, setHasDraft] = useState(false);
  const [jd, setJd] = useState('');
  const [extracted, setExtracted] = useState<ExtractedTech[] | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setHasDraft(!!localStorage.getItem('techvet-draft'));
  }, []);

  function startTemplate(roleId: string) {
    const role = ROLE_TEMPLATES.find(r => r.id === roleId);
    reset();
    setMeta({
      role: role?.name ?? 'Custom',
      startedAt: new Date().toISOString(),
      templateId: roleId,
    });
    role?.techIds.forEach(t => addTech(t, role.techScopes?.[t]));
    navigate('/assess');
  }

  function applyExtraction() {
    reset();
    setMeta({
      role: 'Custom (from JD)',
      startedAt: new Date().toISOString(),
      templateId: 'custom',
    });
    Array.from(selectedIds).forEach(t => addTech(t));
    navigate('/assess');
  }

  function handleExtract() {
    const r = extractTechsFromJD(jd);
    setExtracted(r);
    setSelectedIds(new Set(r.map(e => e.id)));
  }

  function toggleId(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const grouped = extracted ? groupByCategory(extracted) : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
      <Link to="/preview" className="text-xs text-slate-500 hover:text-brand inline-flex items-center gap-1 mb-6">
        <ChevronLeft className="w-3 h-3" /> Preview index
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-navy-900 dark:text-white">
          Vet developer skills <span className="text-brand">in minutes</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
          Paste the job description below — we'll pre-fill the tech checklist.
        </p>
      </div>

      {!extracted ? (
        <>
          <div className="card p-6 md:p-8 mb-4">
            <label className="text-sm font-semibold text-navy-900 dark:text-white flex items-center gap-2 mb-3">
              <FileSearch className="w-4 h-4 text-brand" />
              Job description
            </label>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              rows={10}
              placeholder="Paste the full JD here — required tech, nice-to-haves, the works.&#10;&#10;e.g. Senior Backend Engineer — Java 21, Spring Boot 3, PostgreSQL, Kafka, AWS EKS..."
              className="input font-mono text-sm"
              autoFocus
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleExtract}
                disabled={!jd.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Extract technologies <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 border-t border-slate-200 dark:border-navy-700" />
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              or start from a role template
            </span>
            <div className="flex-1 border-t border-slate-200 dark:border-navy-700" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {ROLE_TEMPLATES.map(role => (
              <button
                key={role.id}
                onClick={() => startTemplate(role.id)}
                className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-navy-700 text-sm text-navy-900 dark:text-slate-100 hover:border-brand hover:text-brand hover:bg-brand/5 transition"
                title={role.description}
              >
                {role.name}
              </button>
            ))}
          </div>

          {hasDraft && (
            <div className="text-center mt-6">
              <button
                onClick={() => loadDraft() && navigate('/assess')}
                className="text-sm text-slate-500 hover:text-brand inline-flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" /> Resume saved draft
              </button>
            </div>
          )}
        </>
      ) : (
        <ExtractionResults
          extracted={extracted}
          grouped={grouped!}
          selectedIds={selectedIds}
          onToggle={toggleId}
          onApply={applyExtraction}
          onBack={() => setExtracted(null)}
        />
      )}
    </div>
  );
}

function ExtractionResults({
  extracted,
  grouped,
  selectedIds,
  onToggle,
  onApply,
  onBack,
}: {
  extracted: ExtractedTech[];
  grouped: Record<string, ExtractedTech[]>;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onApply: () => void;
  onBack: () => void;
}) {
  if (extracted.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No catalog technologies matched. Try editing the JD or pick a template instead.
        </p>
        <button onClick={onBack} className="btn-secondary mt-4">
          ← Edit JD
        </button>
      </div>
    );
  }
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Found <strong>{extracted.length}</strong> technologies. {selectedIds.size} selected.
        </p>
        <button onClick={onBack} className="text-sm text-brand hover:underline">
          ← Edit JD
        </button>
      </div>
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, items]) => (
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
                      onChange={() => onToggle(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-navy-900 dark:text-white">{item.name}</div>
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
      <div className="flex justify-end mt-6 gap-2 pt-4 border-t border-slate-200 dark:border-navy-700">
        <button onClick={onBack} className="btn-secondary">
          ← Edit JD
        </button>
        <button
          onClick={onApply}
          disabled={selectedIds.size === 0}
          className="btn-primary disabled:opacity-50"
        >
          Load {selectedIds.size} into assessment <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function groupByCategory(extracted: ExtractedTech[]): Record<string, ExtractedTech[]> {
  const out: Record<string, ExtractedTech[]> = {};
  for (const e of extracted) (out[e.category] ??= []).push(e);
  return out;
}
