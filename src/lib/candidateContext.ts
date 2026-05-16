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
    // If recruiter typed a bare number, suffix " yr"; otherwise use as-is
    // so "10+ yr" / "since 2018" / etc. don't double up the unit.
    const looksLikeBareNumber = /^[\d.]+$/.test(years);
    parts.push(looksLikeBareNumber ? `${years} yr in industry` : years);
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
