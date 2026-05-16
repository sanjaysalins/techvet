import { describe, it, expect } from 'vitest';
import { parseLastUsed } from '../lastUsed';

const NOW = new Date('2026-05-16');

describe('parseLastUsed — recency parser (Fix E)', () => {
  describe('current-bucket signals', () => {
    it('"current" → current', () => {
      expect(parseLastUsed('current', NOW).bucket).toBe('current');
    });
    it('"current role" → current', () => {
      expect(parseLastUsed('current role', NOW).bucket).toBe('current');
    });
    it('"now" / "today" / "still using" / "present" → current', () => {
      for (const s of ['now', 'today', 'still using', 'present']) {
        expect(parseLastUsed(s, NOW).bucket, `failed: "${s}"`).toBe('current');
      }
    });
    it('"this role" (loose) → current', () => {
      expect(parseLastUsed('this role, since 2024', NOW).bucket).toBe('current');
    });
    it('"6 months ago" → current (within the 6-month window)', () => {
      expect(parseLastUsed('6 months ago', NOW).bucket).toBe('current');
    });
  });

  describe('recent-bucket signals (≤1y)', () => {
    it('"last year" → recent', () => {
      const r = parseLastUsed('last year', NOW);
      expect(r.bucket).toBe('recent');
      expect(r.year).toBe(2025);
    });
    it('"1 year ago" → recent', () => {
      expect(parseLastUsed('1 year ago', NOW).bucket).toBe('recent');
    });
    it('"10 months ago" → recent (between 6 and 18 mo)', () => {
      expect(parseLastUsed('10 months ago', NOW).bucket).toBe('recent');
    });
  });

  describe('stale-bucket signals (2-4y)', () => {
    it('"2 years ago" → stale', () => {
      expect(parseLastUsed('2 years ago', NOW).bucket).toBe('stale');
    });
    it('"3 yr ago" → stale', () => {
      expect(parseLastUsed('3 yr ago', NOW).bucket).toBe('stale');
    });
    it('"2022" → stale (4 yr from 2026)', () => {
      const r = parseLastUsed('2022', NOW);
      expect(r.bucket).toBe('stale');
      expect(r.year).toBe(2022);
    });
    it('Sarah-shape: bare "4" (4 yr ago) → stale', () => {
      expect(parseLastUsed('4', NOW).bucket).toBe('stale');
    });
    it('"36 months ago" → stale (3 yr)', () => {
      expect(parseLastUsed('36 months ago', NOW).bucket).toBe('stale');
    });
  });

  describe('ancient-bucket signals (≥5y)', () => {
    it('"5 years ago" → ancient', () => {
      expect(parseLastUsed('5 years ago', NOW).bucket).toBe('ancient');
    });
    it('Dmitri-shape: "2018" → ancient (8 yr from 2026)', () => {
      const r = parseLastUsed('2018', NOW);
      expect(r.bucket).toBe('ancient');
      expect(r.year).toBe(2018);
    });
    it('"10 years ago" → ancient', () => {
      expect(parseLastUsed('10 years ago', NOW).bucket).toBe('ancient');
    });
    it('"72 months ago" → ancient (6 yr)', () => {
      expect(parseLastUsed('72 months ago', NOW).bucket).toBe('ancient');
    });
  });

  describe('unknown / ambiguous', () => {
    it('empty → unknown', () => {
      expect(parseLastUsed('', NOW).bucket).toBe('unknown');
    });
    it('whitespace → unknown', () => {
      expect(parseLastUsed('   \t  ', NOW).bucket).toBe('unknown');
    });
    it('garbage → unknown', () => {
      expect(parseLastUsed('for a long time', NOW).bucket).toBe('unknown');
      expect(parseLastUsed('on and off', NOW).bucket).toBe('unknown');
    });
  });

  describe('multi-year strings (use most recent)', () => {
    it('"2018-2022" picks 2022 → stale (4 yr from 2026)', () => {
      const r = parseLastUsed('2018-2022', NOW);
      expect(r.year).toBe(2022);
      expect(r.bucket).toBe('stale');
    });
    it('"worked there 2019, 2020, 2022" picks 2022 → stale', () => {
      const r = parseLastUsed('worked there 2019, 2020, 2022', NOW);
      expect(r.year).toBe(2022);
      expect(r.bucket).toBe('stale');
    });
  });

  describe('typo guards', () => {
    it('future year (typo) bounded to current year → current', () => {
      // Recruiter typos "2027" by mistake; treat as "current" rather than
      // negative-distance nonsense.
      const r = parseLastUsed('2027', NOW);
      expect(r.year).toBe(2026);
      expect(r.bucket).toBe('current');
    });
  });
});
