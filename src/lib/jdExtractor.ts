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
 * Find all term occurrences in the JD with custom word boundaries: the
 * term must be surrounded by chars that aren't `[a-z0-9_]` (or string
 * edges). The `_` exclusion (Round-13 F3) prevents matches inside
 * identifier-style tokens like `go_router` (Flutter library) flagging
 * the Go language. Returns positions for span-suppression downstream.
 */
function findTermMatches(jdLower: string, term: string): Array<{ start: number; end: number }> {
  const escaped = escapeRegex(term.toLowerCase());
  const re = new RegExp(`(?<![a-z0-9_])${escaped}(?![a-z0-9_])`, 'g');
  const matches: Array<{ start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(jdLower)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length });
    if (m.index === re.lastIndex) re.lastIndex += 1; // safety for zero-width
  }
  return matches;
}

/**
 * Split a catalog `name` like "Redis / Valkey" or "Observability
 * (Prometheus / Grafana / OTel)" into component searchable terms.
 *
 * Paren-handling: parentheses without a `/` inside hold disambiguators,
 * domain hints, or expansions ("JUnit (Java)" / "k6 (load testing)" /
 * "dbt (data build tool)") — drop them. Parens with `/` inside hold an
 * alternatives list ("Observability (Prometheus / Grafana / OTel)") —
 * keep the contents. When a useful alternative form gets dropped (e.g.
 * "Amazon Web Services" from "AWS (Amazon Web Services)"), recover it
 * via TECH_ALIASES.
 *
 * Round-13 validation surfaced the disambiguator bug: pre-fix, JUnit
 * (Java) emitted "Java" as a search term, false-positiving on every
 * Java-mentioning JD.
 */
function nameSearchTerms(name: string): string[] {
  const cleaned = name.replace(/\(([^)]*)\)/g, (_, inner) =>
    inner.includes('/') ? `/ ${inner}` : ''
  );
  return cleaned
    .split('/')
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
interface TermHit {
  term: string;
  start: number;
  end: number;
}

interface TechHits {
  tech: Technology;
  hits: TermHit[];
}

export function extractTechsFromJD(jd: string): ExtractedTech[] {
  if (!jd || !jd.trim()) return [];
  const jdLower = jd.toLowerCase();

  // Pass 1: collect all term-match positions per tech.
  const techHits: TechHits[] = [];
  for (const tech of TECHS) {
    const terms = [...nameSearchTerms(tech.name), ...(TECH_ALIASES[tech.id] ?? [])];
    const hits: TermHit[] = [];
    const seenLowerTerm = new Set<string>();
    for (const term of terms) {
      if (term.length < 2) continue;
      const key = term.toLowerCase();
      if (seenLowerTerm.has(key)) continue;
      seenLowerTerm.add(key);
      for (const pos of findTermMatches(jdLower, term)) {
        hits.push({ term, ...pos });
      }
    }
    if (hits.length > 0) techHits.push({ tech, hits });
  }

  // Pass 2: span suppression. When a hit from tech A is strictly contained
  // within a longer hit from a DIFFERENT tech B, drop A's hit. Round-13
  // F4: "React" matching inside "React Native" should suppress the React
  // extraction when react-native is also matched on the same span.
  const results: ExtractedTech[] = [];
  for (const { tech, hits } of techHits) {
    const survivors = hits.filter(h => {
      for (const other of techHits) {
        if (other.tech.id === tech.id) continue;
        for (const o of other.hits) {
          const oLen = o.end - o.start;
          const hLen = h.end - h.start;
          if (o.start <= h.start && o.end >= h.end && oLen > hLen) return false;
        }
      }
      return true;
    });
    if (survivors.length === 0) continue;
    const matched: string[] = [];
    const seen = new Set<string>();
    for (const s of survivors) {
      const k = s.term.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      matched.push(s.term);
    }
    results.push({
      id: tech.id,
      name: tech.name,
      category: tech.category,
      matched,
    });
  }

  results.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });
  return results;
}
