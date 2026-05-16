import type { AssessmentMeta, PathType, Seniority } from '../types';

/**
 * Fix M (round-3 cross-cut): builds a single-line candidate-context
 * string for the Summary report header from the structured fields.
 * Skips defaults so a recruiter who only filled in seniority sees
 * just the seniority, no awkward "Unspecified · 0 yr · unspecified."
 */
export function formatCandidateContext(meta: AssessmentMeta): string {
  const parts: string[] = [];

  if (meta.seniority !== 'unspecified') {
    parts.push(seniorityLabel(meta.seniority));
  }

  const years = meta.yearsInIndustry.trim();
  if (years) {
    // If recruiter typed a bare number, format it. Otherwise use as-is
    // so "10+ yr" / "since 2018" / etc. don't double up the unit.
    // Round-4 Bug 5: sub-1 bare numbers (Eli typed "0.3" for 4 months)
    // rendered awkwardly as "0.3 yr in industry"; switch to months.
    const looksLikeBareNumber = /^[\d.]+$/.test(years);
    if (looksLikeBareNumber) {
      const n = parseFloat(years);
      if (n > 0 && n < 1) {
        const months = Math.max(1, Math.round(n * 12));
        parts.push(`${months} mo in industry`);
      } else {
        parts.push(`${years} yr in industry`);
      }
    } else {
      parts.push(years);
    }
  }

  if (meta.pathType !== 'unspecified') {
    parts.push(pathTypeLabel(meta.pathType));
  }

  const context = meta.candidateContext.trim();
  if (context) {
    parts.push(context);
  }

  return parts.join(' · ');
}

export function seniorityLabel(s: Seniority): string {
  return {
    unspecified: '—',
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior',
    staff: 'Staff+',
  }[s];
}

export function pathTypeLabel(p: PathType): string {
  return {
    unspecified: '—',
    traditional: 'Traditional path',
    'junior-first-role': 'Junior / first role',
    'career-switcher': 'Career switcher',
    returner: 'Returner (career break)',
    contractor: 'Contractor / project-hopper',
    'founder-cto': 'Founder / CTO going IC',
    academic: 'Academic → industry',
    'internal-transfer': 'Internal transfer (non-eng → eng)',
    'oss-maintainer': 'Open-source maintainer',
  }[p];
}

export const SENIORITY_OPTIONS: Seniority[] = ['unspecified', 'junior', 'mid', 'senior', 'staff'];
export const PATH_TYPE_OPTIONS: PathType[] = [
  'unspecified',
  'traditional',
  'junior-first-role',
  'career-switcher',
  'returner',
  'contractor',
  'founder-cto',
  'academic',
  'internal-transfer',
  'oss-maintainer',
];
