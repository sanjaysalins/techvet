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
  const cleaned = v.toString().toLowerCase().trim()
    .replace(/lts/g, '')
    .replace(/[^0-9.]/g, ' ')
    .trim()
    .split(/\s+/)[0] || '';
  if (!cleaned) return [0];
  return cleaned.split('.').map(p => {
    const n = parseInt(p, 10);
    return isNaN(n) ? 0 : n;
  });
}

/** Loose validation — true if the string contains any digits. */
export function looksLikeVersion(v: string): boolean {
  return /\d/.test(v);
}
