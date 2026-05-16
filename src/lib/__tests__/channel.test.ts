import { describe, it, expect } from 'vitest';
import { notDiscussedCopy, channelLabel, confirmedNotInStackCopy } from '../channel';

/**
 * Fix Q (round-3 cross-cut): per-channel framing for empty/not-touched
 * techs. Pin the copy so a future agent can't quietly homogenize it back
 * to phone-only wording (which was the round-3 critique from Yara/Devon/Min).
 */
describe('notDiscussedCopy — per-channel framing for the Summary report', () => {
  it('phone framing references the call + recruiter pacing', () => {
    const c = notDiscussedCopy('phone');
    expect(c.chip).toMatch(/call/);
    expect(c.sectionTitle).toMatch(/call/);
    expect(c.sectionBody).toMatch(/recruiter ran out of time/);
    // Phone framing should NOT mention CV/JD — that's async territory.
    expect(c.sectionBody).not.toMatch(/CV/);
  });

  it('video framing references the panel, not the call', () => {
    const c = notDiscussedCopy('video');
    expect(c.chip).toMatch(/panel/);
    expect(c.sectionTitle).toMatch(/panel/);
    expect(c.sectionBody).toMatch(/didn't come up/);
    // Video framing should NOT mention CV/JD or "ran out of time".
    expect(c.sectionBody).not.toMatch(/CV/);
    expect(c.sectionBody).not.toMatch(/ran out of time/);
  });

  it('async framing references the CV / JD + the never-spoke-to-candidate caveat', () => {
    const c = notDiscussedCopy('async');
    expect(c.chip).toMatch(/CV \/ JD/);
    expect(c.sectionTitle).toMatch(/CV \/ JD/);
    expect(c.sectionBody).toMatch(/never spoke to the candidate/);
    expect(c.sectionBody).toMatch(/unverified gaps/);
    // Async framing should NOT pretend a call happened.
    expect(c.sectionBody).not.toMatch(/call/);
    expect(c.sectionBody).not.toMatch(/recruiter ran out of time/);
  });

  it('every channel returns a non-empty chip, title, and body', () => {
    for (const ch of ['phone', 'video', 'async'] as const) {
      const c = notDiscussedCopy(ch);
      expect(c.chip).toBeTruthy();
      expect(c.chipHint).toBeTruthy();
      expect(c.sectionTitle).toBeTruthy();
      expect(c.sectionBody.length).toBeGreaterThan(40);
    }
  });
});

describe('channelLabel — human-readable channel name', () => {
  it('async expands to "Async (CV-only)" so the report header is unambiguous', () => {
    expect(channelLabel('async')).toBe('Async (CV-only)');
  });

  it('phone and video render as their lowercase id (header context already capitalizes them)', () => {
    expect(channelLabel('phone')).toBe('phone');
    expect(channelLabel('video')).toBe('video');
  });
});

/**
 * Round-4 Bug 1 (Marisol DS-async): the "Confirmed not in stack" section
 * was hard-coded with phone-only framing ("the recruiter asked"), which
 * is structurally wrong in async — the recruiter never spoke to the
 * candidate. Per-channel helper closes the loop on Fix Q.
 */
describe('confirmedNotInStackCopy — per-channel framing', () => {
  it('phone framing references "the recruiter asked"', () => {
    const c = confirmedNotInStackCopy('phone');
    expect(c.title(3)).toMatch(/Confirmed not/);
    expect(c.lead).toMatch(/recruiter asked/);
    expect(c.emphasis).toBe('positive coverage signal');
    expect(c.emphasisStyle).toBe('strong');
  });

  it('video framing references "the panel asked"', () => {
    const c = confirmedNotInStackCopy('video');
    expect(c.title(3)).toMatch(/Confirmed not/);
    expect(c.lead).toMatch(/panel asked/);
    expect(c.lead).not.toMatch(/recruiter asked/);
  });

  it('async framing does NOT claim a candidate was asked (none was)', () => {
    const c = confirmedNotInStackCopy('async');
    expect(c.title(3)).toMatch(/Marked not/);
    expect(c.lead).toMatch(/CV \/ JD/);
    expect(c.lead).not.toMatch(/asked/);
    expect(c.emphasis).toBe('not');
    expect(c.emphasisStyle).toBe('em');
    expect(c.tail).toMatch(/verify on the next step/);
  });

  it('every channel returns a callable title + non-empty lead/emphasis/tail', () => {
    for (const ch of ['phone', 'video', 'async'] as const) {
      const c = confirmedNotInStackCopy(ch);
      expect(c.title(5)).toMatch(/\(5\)/);
      expect(c.lead.length).toBeGreaterThan(20);
      expect(c.emphasis.length).toBeGreaterThan(0);
      expect(c.tail.length).toBeGreaterThan(10);
    }
  });
});
