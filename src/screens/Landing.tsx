import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../store/assessment';
import { ROLE_TEMPLATES } from '../data/roles';
import { extractTechsFromJD, type ExtractedTech } from '../lib/jdExtractor';
import { ArrowRight, FileSearch, FileText, Sparkles, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import TechSearch from '../components/TechSearch';
import type { Technology } from '../types';
import technologies from '../data/technologies.json';

const TECHS = technologies as Technology[];
const TECH_BY_ID = new Map(TECHS.map(t => [t.id, t]));

/**
 * Simple / Advanced tabbed landing.
 * - Simple: paste a JD, get a pre-filled checklist, search to add
 *   anything the rules-based extractor missed (e.g. generic "AI" or
 *   "Cloud" mentions), then load into the assessment.
 * - Advanced: pick from 15 role templates or resume a saved draft.
 */
export default function Landing() {
  const navigate = useNavigate();
  const { reset, addTech, setMeta, loadDraft } = useAssessment();
  const [tab, setTab] = useState<'simple' | 'advanced'>('simple');
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

  function addExtra(id: string) {
    setSelectedIds(prev => new Set(prev).add(id));
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-navy-900 dark:text-white">
          Vet developer skills <span className="text-brand">in minutes</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
          Paste a job description, or pick a role template. Everything runs in your browser.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-slate-100 dark:bg-navy-900 p-1 rounded-full">
          <button
            onClick={() => setTab('simple')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
              tab === 'simple'
                ? 'bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-soft'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Simple
          </button>
          <button
            onClick={() => setTab('advanced')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === 'advanced'
                ? 'bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-soft'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            Advanced
          </button>
        </div>
      </div>

      {tab === 'simple' && !extracted && (
        <div className="max-w-3xl mx-auto">
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
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
            Don't have a JD?{' '}
            <button onClick={() => setTab('advanced')} className="text-brand hover:underline">
              Switch to Advanced
            </button>{' '}
            for role templates.
          </p>
        </div>
      )}

      {tab === 'simple' && extracted && (
        <div className="max-w-3xl mx-auto">
          <ExtractionResults
            extracted={extracted}
            selectedIds={selectedIds}
            onToggle={toggleId}
            onAddExtra={addExtra}
            onApply={applyExtraction}
            onBack={() => setExtracted(null)}
          />
        </div>
      )}

      {tab === 'advanced' && (
        <>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center mb-6">
            Pick a role template
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
          {hasDraft && (
            <div className="text-center">
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
    </div>
  );
}

interface ResolvedRow {
  id: string;
  name: string;
  category: string;
  matched?: string[];
}

function ExtractionResults({
  extracted,
  selectedIds,
  onToggle,
  onAddExtra,
  onApply,
  onBack,
}: {
  extracted: ExtractedTech[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onAddExtra: (id: string) => void;
  onApply: () => void;
  onBack: () => void;
}) {
  const extractedById = new Map(extracted.map(e => [e.id, e]));

  const allRowIds = new Set<string>([
    ...extracted.map(e => e.id),
    ...Array.from(selectedIds),
  ]);
  const rows: ResolvedRow[] = [];
  for (const id of allRowIds) {
    const ex = extractedById.get(id);
    if (ex) {
      rows.push({ id: ex.id, name: ex.name, category: ex.category, matched: ex.matched });
    } else {
      const t = TECH_BY_ID.get(id);
      if (t) rows.push({ id: t.id, name: t.name, category: t.category });
    }
  }

  const grouped: Record<string, ResolvedRow[]> = {};
  for (const r of rows) (grouped[r.category] ??= []).push(r);
  for (const k of Object.keys(grouped)) grouped[k].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCategories = Object.keys(grouped).sort();

  const extractedCount = extracted.length;
  const addedExtras = Array.from(selectedIds).filter(id => !extractedById.has(id)).length;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Found <strong>{extractedCount}</strong> technologies in the JD
          {addedExtras > 0 && <span> · <strong>{addedExtras}</strong> added manually</span>}
          {' · '}
          <strong>{selectedIds.size}</strong> selected
        </p>
        <button onClick={onBack} className="text-sm text-brand hover:underline">
          ← Edit JD
        </button>
      </div>

      <div className="mb-5 p-4 rounded-lg bg-slate-50 dark:bg-navy-800/40 border border-slate-200 dark:border-navy-700">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="w-4 h-4 text-brand" />
          <span className="text-sm font-semibold text-navy-900 dark:text-white">
            Missing something?
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Generic mentions like "AI" or "Cloud" won't auto-match — add them here.
          </span>
        </div>
        <TechSearch
          technologies={TECHS}
          alreadyAdded={selectedIds}
          onAdd={onAddExtra}
        />
      </div>

      {extractedCount === 0 && addedExtras === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
          No catalog technologies matched the JD. Try the search above to add the techs you want to assess.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedCategories.map(category => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {category}
              </h3>
              <ul className="space-y-1">
                {grouped[category].map(item => (
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
                          {item.matched ? (
                            <>matched: {item.matched.join(', ')}</>
                          ) : (
                            <span className="text-brand/80">added manually</span>
                          )}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

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
