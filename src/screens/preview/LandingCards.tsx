import { useNavigate, Link } from 'react-router-dom';
import { useAssessment } from '../../store/assessment';
import { ROLE_TEMPLATES } from '../../data/roles';
import { extractTechsFromJD, type ExtractedTech } from '../../lib/jdExtractor';
import { ArrowRight, FileSearch, FileText, ChevronLeft, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

type Mode = 'choose' | 'jd' | 'templates';

/**
 * Preview C — two-card hero.
 * Default "How do you want to start?" with two equal-weight cards:
 * "Got a JD?" / "No JD?". Each transitions to its own inline view.
 */
export default function LandingCards() {
  const navigate = useNavigate();
  const { reset, addTech, setMeta, loadDraft } = useAssessment();
  const [mode, setMode] = useState<Mode>('choose');
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
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
      <Link to="/preview" className="text-xs text-slate-500 hover:text-brand inline-flex items-center gap-1 mb-6">
        <ChevronLeft className="w-3 h-3" /> Preview index
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-navy-900 dark:text-white">
          Vet developer skills <span className="text-brand">in minutes</span>
        </h1>
      </div>

      {mode === 'choose' && (
        <>
          <p className="text-center text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8">
            How do you want to start?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <button
              onClick={() => setMode('jd')}
              className="card p-8 text-left hover:border-brand hover:shadow-glow transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <FileSearch className="w-6 h-6" />
              </div>
              <div className="font-semibold text-lg text-navy-900 dark:text-white group-hover:text-brand transition">
                Got a JD?
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Paste the job description and we'll pre-fill the technology checklist for you.
              </div>
              <div className="mt-4 text-sm text-brand inline-flex items-center gap-1">
                Paste JD <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => setMode('templates')}
              className="card p-8 text-left hover:border-brand hover:shadow-glow transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Target className="w-6 h-6" />
              </div>
              <div className="font-semibold text-lg text-navy-900 dark:text-white group-hover:text-brand transition">
                No JD?
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Pick a role template — we have 15 pre-built shapes for common engineering roles.
              </div>
              <div className="mt-4 text-sm text-brand inline-flex items-center gap-1">
                Pick a role <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
          {hasDraft && (
            <div className="text-center mt-8">
              <button
                onClick={() => loadDraft() && navigate('/assess')}
                className="text-sm text-slate-500 hover:text-brand inline-flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" /> Resume saved draft
              </button>
            </div>
          )}
        </>
      )}

      {mode === 'jd' && !extracted && (
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setMode('choose')} className="text-sm text-slate-500 hover:text-brand inline-flex items-center gap-1 mb-4">
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </button>
          <div className="card p-6 md:p-8">
            <label className="text-sm font-semibold text-navy-900 dark:text-white flex items-center gap-2 mb-3">
              <FileSearch className="w-4 h-4 text-brand" />
              Paste the job description
            </label>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              rows={12}
              placeholder="Paste the full JD here — required tech, nice-to-haves, the works."
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
        </div>
      )}

      {mode === 'jd' && extracted && (
        <div className="max-w-3xl mx-auto">
          <ExtractionResults
            extracted={extracted}
            grouped={grouped!}
            selectedIds={selectedIds}
            onToggle={toggleId}
            onApply={applyExtraction}
            onBack={() => setExtracted(null)}
          />
        </div>
      )}

      {mode === 'templates' && (
        <>
          <button onClick={() => setMode('choose')} className="text-sm text-slate-500 hover:text-brand inline-flex items-center gap-1 mb-4">
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center mb-6">
            Pick a role template
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROLE_TEMPLATES.map(role => (
              <button
                key={role.id}
                onClick={() => startTemplate(role.id)}
                className="card p-5 text-left hover:border-brand hover:shadow-glow transition group"
              >
                <div className="font-semibold text-navy-900 dark:text-white group-hover:text-brand transition">
                  {role.name}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                  {role.description}
                </div>
                {role.techIds.length > 0 && (
                  <div className="mt-3 text-xs text-slate-400">
                    {role.techIds.length} preloaded technologies
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
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
        <p className="text-slate-500 dark:text-slate-400">No catalog technologies matched.</p>
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
        <button onClick={onApply} disabled={selectedIds.size === 0} className="btn-primary disabled:opacity-50">
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
