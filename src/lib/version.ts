/**
 * Compare two loose version strings.
 * Returns: negative if a<b, 0 if equal, positive if a>b.
 * Handles formats like "1.2.3", "19", "1.10-rc1", "8.4 LTS".
 */
export function compareVersions(a: string, b: string): number {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const av = pa[i] ?? 0;
    const bv = pb[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
}

export function parseVersion(v: string): number[] {
  if (!v) return [0];
  const raw = v.toString().toLowerCase().trim();

  // Detect explicit multi-version hedges. Senior engineers in real production
  // fleets answer "21 / 17 / 11" or "21 in new services, 17 in most, 11 still
  // on legacy". The previous behavior silently kept the FIRST token, which
  // scored the candidate on their cutting edge while hiding their legacy
  // burden — exactly the wrong signal for a hiring manager. When a list
  // separator is present we score the MINIMUM token (the legacy floor).
  // Single-version strings with internal punctuation ("1.10-rc1", "8.4 LTS")
  // do NOT trigger this path.
  const isHedge = /[/,]|\bor\b|\band\b/.test(raw);

  const cleaned = raw
    .replace(/lts/g, '')
    .replace(/[^0-9.]/g, ' ')
    .trim();
  if (!cleaned) return [0];

  const tokens = cleaned.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [0];

  const parseOne = (t: string): number[] => t.split('.').map(p => {
    const n = parseInt(p, 10);
    return isNaN(n) ? 0 : n;
  });

  if (!isHedge || tokens.length === 1) return parseOne(tokens[0]);

  const parsed = tokens.map(parseOne);
  return parsed.reduce((lo, cur) => (compareArrays(cur, lo) < 0 ? cur : lo));
}

function compareArrays(a: number[], b: number[]): number {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
}

/** Loose validation — true if the string contains any digits. */
export function looksLikeVersion(v: string): boolean {
  return /\d/.test(v);
}
