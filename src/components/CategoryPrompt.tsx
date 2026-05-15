import { useMemo } from 'react';
import type { AssessmentItem, Technology } from '../types';
import { Layers, Plus } from 'lucide-react';

interface Props {
  technologies: Technology[];
  items: AssessmentItem[];
  onAdd: (techId: string) => void;
}

/**
 * "Other techs in these categories" prompt. Surfaced between the assessed
 * tech cards and the Review-Summary action bar so a recruiter can't miss
 * it before finalising.
 *
 * Why this exists: 11 of 12 adversarial-sim sessions hit the same failure
 * mode — the candidate's #1 daily tool was in the catalog but not in the
 * role template (Storybook for Maya, Snowflake for Jordan, LangChain for
 * Priya, etc.). `TechSearch` requires the recruiter to know the term to
 * type; this surface lists in-category options proactively.
 *
 * v1 logic: suggest techs from any category currently represented in the
 * assessment. Known limitation: templates that omit a category entirely
 * (e.g. DevOps template has no Cloud) won't surface AWS until the
 * recruiter adds at least one Cloud tech. Addressing that fully requires
 * a per-role "commonly-paired categories" hint — left for v2.
 */
export default function CategoryPrompt({ technologies, items, onAdd }: Props) {
  const techById = useMemo(
    () => new Map(technologies.map(t => [t.id, t])),
    [technologies]
  );

  const suggestions = useMemo(() => {
    const addedIds = new Set(items.map(i => i.techId));
    const addedCategories = new Set<string>();
    for (const item of items) {
      const tech = techById.get(item.techId);
      if (tech) addedCategories.add(tech.category);
    }

    const byCategory = new Map<string, Technology[]>();
    for (const tech of technologies) {
      if (!addedCategories.has(tech.category)) continue;
      if (addedIds.has(tech.id)) continue;
      const arr = byCategory.get(tech.category) ?? [];
      arr.push(tech);
      byCategory.set(tech.category, arr);
    }

    return [...byCategory.entries()]
      .map(([category, techs]) => [
        category,
        [...techs].sort((a, b) => a.name.localeCompare(b.name)),
      ] as const)
      .sort(([a], [b]) => a.localeCompare(b));
  }, [technologies, items, techById]);

  if (items.length === 0 || suggestions.length === 0) return null;

  const totalSuggestions = suggestions.reduce(
    (sum, [, techs]) => sum + techs.length,
    0
  );

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-4 h-4 text-brand" />
        <h3 className="font-semibold text-navy-900 dark:text-white">
          Other technologies in these categories
        </h3>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        The candidate might have mentioned one of these — click to add.{' '}
        {totalSuggestions} option{totalSuggestions === 1 ? '' : 's'} across{' '}
        {suggestions.length} categor{suggestions.length === 1 ? 'y' : 'ies'}.
      </p>
      <div className="space-y-3">
        {suggestions.map(([category, techs]) => (
          <div key={category}>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              {category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techs.map(tech => (
                <button
                  key={tech.id}
                  onClick={() => onAdd(tech.id)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-800/50 hover:bg-brand/5 dark:hover:bg-brand/10 hover:border-brand text-slate-700 dark:text-slate-200 transition"
                  title={`Add ${tech.name}`}
                >
                  <Plus className="w-3 h-3" />
                  {tech.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
