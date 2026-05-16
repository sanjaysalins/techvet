import type { Recency } from '../types';

/**
 * Fix E (round-3 cross-cut, Sarah's design wrinkle): parse the free-text
 * `lastUsed` field into a coarse recency bucket so scoring can soften
 * stale Reds where the version *was* current at last-use (returner case)
 * and penalize stale Greens where it wasn't (Sam-Ansible / Maya-RN-2022
 * case). The asymmetry is the point — same axis, opposite signs.
 *
 * Parser is forgiving by design. Recruiters type whatever the candidate
 * says ("current role", "2 years ago", "since 2018", "8", ""), and the
 * tool should not throw on garbage or demand a date-picker. Default is
 * `unknown` so an empty / ambiguous field never affects scoring.
 *
 * Buckets:
 *   - current  : actively using (≤6 months, or "current"/"now"/"today")
 *   - recent   : within ~1 year
 *   - stale    : 2-4 years
 *   - ancient  : ≥5 years (Sarah's 3-yr break + 1-yr-since-bootcamp =
 *                4 yr; round it to "stale". Dmitri's 2018 Solidity = 8
 *                yr = ancient.)
 *   - unknown  : empty, garbage, or ambiguous
 */
export function parseLastUsed(
  input: string,
  now: Date = new Date()
): { bucket: Recency; year?: number } {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return { bucket: 'unknown' };

  const nowYear = now.getFullYear();

  // "current" / "now" / "today" / "this role" / "current role" / "still"
  if (/\b(current|now|today|this role|currently|still using|present)\b/.test(trimmed)) {
    return { bucket: 'current', year: nowYear };
  }

  // "last year" → recent
  if (/\blast year\b/.test(trimmed)) {
    return { bucket: 'recent', year: nowYear - 1 };
  }

  // "X months ago" / "X mo ago" / "X-month" — only if X ≤ 24
  const monthsMatch = trimmed.match(/(\d+)\s*(?:mo|month)s?\b/);
  if (monthsMatch) {
    const months = parseInt(monthsMatch[1], 10);
    if (months <= 6) return { bucket: 'current', year: nowYear };
    if (months <= 18) return { bucket: 'recent', year: nowYear };
    if (months <= 60) return { bucket: 'stale', year: nowYear - Math.floor(months / 12) };
    return { bucket: 'ancient', year: nowYear - Math.floor(months / 12) };
  }

  // "X years ago" / "X yr ago" / "X year" — relative phrasing
  const yearsAgoMatch = trimmed.match(/(\d+)\s*(?:yr|year)s?\b/);
  if (yearsAgoMatch) {
    const yearsAgo = parseInt(yearsAgoMatch[1], 10);
    return bucketFromDistance(yearsAgo, nowYear - yearsAgo);
  }

  // Year string: 1990-2099. If multiple years mentioned ("2018-2022"), use
  // the most recent one — that's the closest to "when did they last use it".
  const yearMatches = [...trimmed.matchAll(/\b(19[89]\d|20\d\d)\b/g)].map(m =>
    parseInt(m[1], 10)
  );
  if (yearMatches.length > 0) {
    const mostRecent = Math.max(...yearMatches);
    // Bound future years to current (typo guard); past years → distance.
    const year = Math.min(mostRecent, nowYear);
    return bucketFromDistance(nowYear - year, year);
  }

  // Bare number ("5", "8") → interpret as "X years ago" per the field
  // semantic (the column header is "Last used", so a bare number reads as
  // "X years ago" — not "X years of experience" which would be a different
  // field).
  const bareNum = trimmed.match(/^(\d+)$/);
  if (bareNum) {
    const yearsAgo = parseInt(bareNum[1], 10);
    return bucketFromDistance(yearsAgo, nowYear - yearsAgo);
  }

  return { bucket: 'unknown' };
}

function bucketFromDistance(yearsAgo: number, year: number): { bucket: Recency; year: number } {
  if (yearsAgo <= 1) return { bucket: yearsAgo === 0 ? 'current' : 'recent', year };
  if (yearsAgo < 2) return { bucket: 'recent', year };
  if (yearsAgo < 5) return { bucket: 'stale', year };
  return { bucket: 'ancient', year };
}
