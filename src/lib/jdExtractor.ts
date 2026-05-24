import type { Technology } from '../types';
import technologies from '../data/technologies.json';
import { TECH_ALIASES } from '../data/aliases';

const TECHS = technologies as Technology[];

export interface ExtractedTech {
  id: string;
  name: string;
  category: string;
  matched: string[];
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Match a term against the JD with custom boundaries: the term must be
 * surrounded by non-alphanumeric chars (or string edges). Catches
 * "PostgreSQL" / "Postgres," / "(K8s)" / "C#." but rejects "psqlite" /
 * "Postgresx". Special chars in the term (`.+#-`) are regex-escaped.
 */
function matchesAsTerm(jdLower: string, term: string): boolean {
  const escaped = escapeRegex(term.toLowerCase());
  const re = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`);
  return re.test(jdLower);
}

/**
 * Split a catalog `name` like "Redis / Valkey", "Go (Golang)", or
 * "Swift / iOS" into its component searchable terms. Single-word names
 * pass through unchanged.
 */
function nameSearchTerms(name: string): string[] {
  return name
    .split(/[/()]/)
    .map(s => s.trim())
    .filter(s => s.length >= 2);
}

/**
 * Rules-based JD → catalog-tech extraction. Returns techs whose `name`
 * or any aliased form appears as a standalone term in the JD.
 *
 * Phase 1: deterministic substring matching only — no contextual
 * understanding ("we do NOT use X" still flags X). Phase 2 will layer
 * an in-browser LLM on top to handle context.
 *
 * Skips entries with 2-character names ("C", "Go" technically passes
 * via the "golang" alias, but bare "Go" matches too — accepted because
 * recruiters writing JDs typically capitalize and surround language
 * names with punctuation). Returns results sorted by category then name.
 */
export function extractTechsFromJD(jd: string): ExtractedTech[] {
  if (!jd || !jd.trim()) return [];
  const jdLower = jd.toLowerCase();
  const results: ExtractedTech[] = [];

  for (const tech of TECHS) {
    const terms = [...nameSearchTerms(tech.name), ...(TECH_ALIASES[tech.id] ?? [])];
    const matched: string[] = [];
    const seenLower = new Set<string>();
    for (const term of terms) {
      if (term.length < 2) continue;
      const key = term.toLowerCase();
      if (seenLower.has(key)) continue;
      if (matchesAsTerm(jdLower, term)) {
        matched.push(term);
        seenLower.add(key);
      }
    }
    if (matched.length > 0) {
      results.push({
        id: tech.id,
        name: tech.name,
        category: tech.category,
        matched,
      });
    }
  }

  results.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });
  return results;
}
