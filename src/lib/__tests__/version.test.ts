import { describe, it, expect } from 'vitest';
import { compareVersions, parseVersion, looksLikeVersion } from '../version';

describe('parseVersion', () => {
  it('returns [0] for empty / nullish input', () => {
    expect(parseVersion('')).toEqual([0]);
  });

  it('parses dotted numerics into integer parts', () => {
    expect(parseVersion('1.2.3')).toEqual([1, 2, 3]);
    expect(parseVersion('18.2')).toEqual([18, 2]);
  });

  it('strips "LTS" suffix (case-insensitive)', () => {
    expect(parseVersion('8.4 LTS')).toEqual([8, 4]);
    expect(parseVersion('20.10 lts')).toEqual([20, 10]);
  });

  it('strips non-numeric tokens and keeps the first numeric chunk', () => {
    // This is exactly why C / C++ are checklist-mode: "C99" -> 99 > "C23" -> 23
    // would flip tier ordering if used in version-mode.
    expect(parseVersion('C99')).toEqual([99]);
    expect(parseVersion('C23')).toEqual([23]);
    expect(parseVersion('ES2025')).toEqual([2025]);
  });

  it('handles rc / pre-release suffixes by stripping them', () => {
    expect(parseVersion('1.10-rc1')).toEqual([1, 10]);
  });

  /**
   * Regression for "fleet hedge" bug surfaced by 12-session adversarial sim.
   * Senior engineers in real production systems answer with a fleet ("21 / 17 / 11"
   * — current edge, prod fleet, legacy). Previously parseVersion silently kept
   * the FIRST token and scored the candidate on their cutting edge while hiding
   * their legacy floor — the opposite of what a hiring manager needs. With an
   * explicit list separator we now score the MINIMUM.
   */
  describe('fleet-version hedges (regression)', () => {
    it('slash-separated list → scores the minimum', () => {
      expect(parseVersion('21/17/11')).toEqual([11]);
      expect(parseVersion('21 / 17 / 11')).toEqual([11]);
    });

    it('comma-separated list → scores the minimum', () => {
      expect(parseVersion('1.5, 1.3, 1.0')).toEqual([1, 0]);
    });

    it('"X or Y" phrasing → scores the minimum', () => {
      expect(parseVersion('21 or 17')).toEqual([17]);
      expect(parseVersion('5 or 6')).toEqual([5]);
    });

    it('"X and Y" phrasing → scores the minimum', () => {
      expect(parseVersion('3.3 and 2.7')).toEqual([2, 7]);
    });

    it('does NOT trigger on internal punctuation like rc / dash / LTS', () => {
      // Single-version strings with internal punctuation must keep prior behavior.
      expect(parseVersion('1.10-rc1')).toEqual([1, 10]);
      expect(parseVersion('8.4 LTS')).toEqual([8, 4]);
      expect(parseVersion('C# 14')).toEqual([14]);
    });
  });
});

describe('compareVersions', () => {
  it('returns 0 for identical versions', () => {
    expect(compareVersions('1.2.3', '1.2.3')).toBe(0);
  });

  it('orders bare major below major.minor (zero-padding)', () => {
    // CLAUDE.md gotcha: typing "3" pads to [3,0] which is < [3,2].
    expect(compareVersions('3', '3.2')).toBeLessThan(0);
    expect(compareVersions('3.2', '3')).toBeGreaterThan(0);
  });

  it('ignores LTS suffix when comparing', () => {
    expect(compareVersions('8.4 LTS', '8.4')).toBe(0);
    expect(compareVersions('20 LTS', '18')).toBeGreaterThan(0);
  });

  it('compares multi-part versions numerically (not lexically)', () => {
    expect(compareVersions('1.10', '1.9')).toBeGreaterThan(0);
    expect(compareVersions('2.0.0', '1.99.99')).toBeGreaterThan(0);
  });

  it('treats missing parts as zero', () => {
    expect(compareVersions('1', '1.0.0')).toBe(0);
    expect(compareVersions('1.0', '1.0.1')).toBeLessThan(0);
  });

  it('handles ECMAScript year-style versions correctly', () => {
    expect(compareVersions('ES2025', 'ES2020')).toBeGreaterThan(0);
  });
});

describe('looksLikeVersion', () => {
  it('returns true when any digit is present', () => {
    expect(looksLikeVersion('1.2')).toBe(true);
    expect(looksLikeVersion('v18')).toBe(true);
    expect(looksLikeVersion('8.4 LTS')).toBe(true);
  });

  it('returns false for digit-free strings', () => {
    expect(looksLikeVersion('')).toBe(false);
    expect(looksLikeVersion('latest')).toBe(false);
    expect(looksLikeVersion('LTS')).toBe(false);
  });
});
