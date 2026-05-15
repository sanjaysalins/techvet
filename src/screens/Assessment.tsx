import { useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAssessment } from '../store/assessment';
import technologiesData from '../data/technologies.json';
import type { Technology } from '../types';
import TechCard from '../components/TechCard';
import TechSearch from '../components/TechSearch';
import CategoryPrompt from '../components/CategoryPrompt';
import GuidancePanel from '../components/GuidancePanel';
import { resolveTier } from '../lib/scoring';
import { Save, FileBarChart, Sparkles } from 'lucide-react';

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
          />

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
