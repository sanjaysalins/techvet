import { describe, it, expect } from 'vitest';
import { formatCandidateContext, seniorityLabel, pathTypeLabel } from '../candidateContext';
import type { AssessmentMeta } from '../../types';

const baseMeta: AssessmentMeta = {
  candidateName: '',
  role: '',
  notes: '',
  mandate: '',
  startedAt: '',
  channel: 'phone',
  namedNotInCatalog: [],
  seniority: 'unspecified',
  yearsInIndustry: '',
  pathType: 'unspecified',
  candidateContext: '',
};

/**
 * Fix M (round-3 cross-cut): build a single-line candidate-context string
 * for the Summary report header. Round-3 Eitan/Riya/Min hit the "junior-
 * shaped career-switcher reads as 2yr junior" / "founder-CTO reads as
 * senior IC" / "academic researcher reads as industry MLE" failure modes
 * — this string surfaces what they actually are, so the HM doesn't infer
 * a wrong shape from years + role title alone.
 */
describe('formatCandidateContext — single-line header builder', () => {
  it('returns empty string when all fields are default (line hidden on Summary)', () => {
    expect(formatCandidateContext(baseMeta)).toBe('');
  });

  it('builds "Senior · 8 yr in industry · Returner (career break) · 3 yr break for kids"', () => {
    const meta: AssessmentMeta = {
      ...baseMeta,
      seniority: 'senior',
      yearsInIndustry: '8',
      pathType: 'returner',
      candidateContext: '3 yr break for kids',
    };
    expect(formatCandidateContext(meta)).toBe(
      'Senior · 8 yr in industry · Returner (career break) · 3 yr break for kids'
    );
  });

  it('skips unspecified seniority + pathType cleanly', () => {
    const meta: AssessmentMeta = {
      ...baseMeta,
      yearsInIndustry: '12',
      candidateContext: 'ex-Salesforce dev',
    };
    expect(formatCandidateContext(meta)).toBe(
      '12 yr in industry · ex-Salesforce dev'
    );
  });

  it('suffixes "yr in industry" for bare numbers only — leaves "10+" / "since 2018" untouched', () => {
    expect(formatCandidateContext({ ...baseMeta, yearsInIndustry: '10+' })).toBe('10+');
    expect(formatCandidateContext({ ...baseMeta, yearsInIndustry: 'since 2018' })).toBe('since 2018');
    expect(formatCandidateContext({ ...baseMeta, yearsInIndustry: '1.5' })).toBe('1.5 yr in industry');
  });

  it('only seniority set → renders just the seniority label', () => {
    expect(formatCandidateContext({ ...baseMeta, seniority: 'staff' })).toBe('Staff+');
  });

  it('trims whitespace from yearsInIndustry and candidateContext', () => {
    const meta: AssessmentMeta = {
      ...baseMeta,
      yearsInIndustry: '  5  ',
      candidateContext: '  founder  ',
    };
    expect(formatCandidateContext(meta)).toBe('5 yr in industry · founder');
  });

  it('Eitan shape: internal transfer reads correctly', () => {
    const meta: AssessmentMeta = {
      ...baseMeta,
      seniority: 'mid',
      yearsInIndustry: '8',
      pathType: 'internal-transfer',
      candidateContext: '2 yr coding (6 yr SE before)',
    };
    expect(formatCandidateContext(meta)).toBe(
      'Mid · 8 yr in industry · Internal transfer (non-eng → eng) · 2 yr coding (6 yr SE before)'
    );
  });

  it('Riya shape: founder-CTO going IC', () => {
    const meta: AssessmentMeta = {
      ...baseMeta,
      seniority: 'senior',
      yearsInIndustry: '6',
      pathType: 'founder-cto',
    };
    expect(formatCandidateContext(meta)).toBe(
      'Senior · 6 yr in industry · Founder / CTO going IC'
    );
  });
});

describe('seniorityLabel + pathTypeLabel — exhaustive enum coverage', () => {
  it('every Seniority value has a label', () => {
    for (const s of ['unspecified', 'junior', 'mid', 'senior', 'staff'] as const) {
      expect(seniorityLabel(s)).toBeTruthy();
    }
  });

  it('every PathType value has a label', () => {
    for (const p of ['unspecified', 'traditional', 'junior-first-role', 'career-switcher', 'returner', 'contractor', 'founder-cto', 'academic', 'internal-transfer', 'oss-maintainer'] as const) {
      expect(pathTypeLabel(p)).toBeTruthy();
    }
  });
});
