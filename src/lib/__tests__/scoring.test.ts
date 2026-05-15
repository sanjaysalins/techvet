import { describe, it, expect } from 'vitest';
import { resolveTier } from '../scoring';
import type { AssessmentItem, Depth, Technology } from '../../types';

function versionTech(overrides: Partial<Technology> = {}): Technology {
  return {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    vetMode: 'version',
    currentVersion: '19.2',
    versionTiers: [
      { min: '18', label: 'Excellent', color: 'green' },
      { min: '16', label: 'Review / Probe', color: 'yellow', note: 'older' },
      { min: '0', label: 'Concern', color: 'red', note: 'very old' },
    ],
    enterpriseStillUsed: true,
    suggestedProbes: [],
    ...overrides,
  };
}

function checklistTech(overrides: Partial<Technology> = {}): Technology {
  return {
    id: 'sql',
    name: 'SQL',
    category: 'Language',
    vetMode: 'checklist',
    services: Array.from({ length: 10 }, (_, i) => ({
      id: `svc-${i + 1}`,
      name: `Service ${i + 1}`,
    })),
    suggestedProbes: [],
    ...overrides,
  };
}

function item(overrides: Partial<AssessmentItem> = {}): AssessmentItem {
  return {
    techId: 'react',
    version: '',
    unknownVersion: false,
    depth: 'working' as Depth,
    lastUsed: '',
    notes: '',
    selectedServices: [],
    checklistTouched: false,
    checklistUnsure: false,
    ...overrides,
  };
}

describe('resolveTier — version mode', () => {
  it('empty version → Yellow with enterprise note', () => {
    const r = resolveTier(versionTech(), item({ version: '' }));
    expect(r.color).toBe('yellow');
    expect(r.unknownVersion).toBe(true);
    expect(r.enterpriseNote).toMatch(/widely used/);
  });

  it('unknownVersion flag → Yellow regardless of version string', () => {
    const r = resolveTier(versionTech(), item({ version: '19', unknownVersion: true }));
    expect(r.color).toBe('yellow');
    expect(r.unknownVersion).toBe(true);
  });

  it('garbage / non-version input → Yellow', () => {
    const r = resolveTier(versionTech(), item({ version: 'latest' }));
    expect(r.color).toBe('yellow');
    expect(r.unknownVersion).toBe(true);
  });

  it('matches the highest tier whose min ≤ version', () => {
    expect(resolveTier(versionTech(), item({ version: '19' })).color).toBe('green');
    expect(resolveTier(versionTech(), item({ version: '17' })).color).toBe('yellow');
    expect(resolveTier(versionTech(), item({ version: '12' })).color).toBe('red');
  });

  it('Yellow tier + enterpriseStillUsed flag → enterprise note appears', () => {
    const r = resolveTier(versionTech(), item({ version: '17' }));
    expect(r.color).toBe('yellow');
    expect(r.enterpriseNote).toMatch(/widely used/);
  });

  it('Green tier does NOT carry the enterprise note', () => {
    const r = resolveTier(versionTech(), item({ version: '19' }));
    expect(r.color).toBe('green');
    expect(r.enterpriseNote).toBeUndefined();
  });

  it('depth=deep lifts severity by exactly one step (Yellow → Green)', () => {
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep' }));
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
  });

  it('depth=very-deep lifts Red → Yellow (not all the way to Green)', () => {
    const r = resolveTier(versionTech(), item({ version: '12', depth: 'very-deep' }));
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(true);
  });

  it('depth=deep on a Green tier stays Green and is not marked adjusted', () => {
    const r = resolveTier(versionTech(), item({ version: '19', depth: 'deep' }));
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(false);
  });

  it('depth=working leaves the tier unchanged', () => {
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'working' }));
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(false);
  });
});

describe('resolveTier — checklist mode', () => {
  it('0/N untouched → Yellow "Not yet assessed" (not Red)', () => {
    const r = resolveTier(
      checklistTech(),
      item({ selectedServices: [], checklistTouched: false })
    );
    expect(r.color).toBe('yellow');
    expect(r.label).toMatch(/Not yet assessed/);
  });

  it('0/N after interaction → Red "Concern"', () => {
    const r = resolveTier(
      checklistTech(),
      item({ selectedServices: [], checklistTouched: true })
    );
    expect(r.color).toBe('red');
  });

  it('coverage <25% (2/10) → Red', () => {
    const r = resolveTier(
      checklistTech(),
      item({ selectedServices: ['svc-1', 'svc-2'], checklistTouched: true })
    );
    expect(r.color).toBe('red');
  });

  it('coverage 25–65% (3/10) → Yellow', () => {
    const r = resolveTier(
      checklistTech(),
      item({ selectedServices: ['svc-1', 'svc-2', 'svc-3'], checklistTouched: true })
    );
    expect(r.color).toBe('yellow');
  });

  it('coverage ≥66% (7/10) → Green', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
        checklistTouched: true,
      })
    );
    expect(r.color).toBe('green');
  });

  it('boundary: exactly 25% (assuming 4/16) lands in Yellow band', () => {
    const tech = checklistTech({
      services: Array.from({ length: 16 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3'],
        checklistTouched: true,
      })
    );
    expect(r.color).toBe('yellow');
  });

  it('checklistUnsure → Yellow "candidate unsure" regardless of selections', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
        checklistTouched: true,
        checklistUnsure: true,
      })
    );
    expect(r.color).toBe('yellow');
    expect(r.label).toMatch(/candidate unsure/);
  });

  it('checklistUnsure overrides depth: very-deep + unsure does NOT promote to Green', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: [],
        checklistTouched: true,
        checklistUnsure: true,
        depth: 'very-deep',
      })
    );
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(false);
  });

  it('depth=deep promotes Red → Yellow in checklist mode too', () => {
    const r = resolveTier(
      checklistTech(),
      item({ selectedServices: ['svc-1'], checklistTouched: true, depth: 'deep' })
    );
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(true);
  });

  it('filters out selectedServices that do not exist on the tech', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'ghost-1', 'ghost-2'],
        checklistTouched: true,
      })
    );
    expect(r.coverage).toEqual({ selected: 3, total: 10 });
  });
});

/**
 * Regression tests for the 5 code bugs surfaced by the 12-session adversarial
 * simulation. Each test pins a specific behavioral fix; do not change without
 * the matching scoring.ts / version.ts / catalog edit.
 */
describe('resolveTier — adversarial regressions (5-bug fix)', () => {
  describe('Bug 1: tier-level enterpriseStillUsed flag', () => {
    it('fires the enterprise note when a Yellow tier carries the flag, even with root flag absent', () => {
      const tech: Technology = {
        id: 'legacy-yellow-only',
        name: 'LegacyYellowOnly',
        category: 'Testing',
        vetMode: 'version',
        versionTiers: [
          { min: '4', label: 'Excellent', color: 'green' },
          // Tier-level flag — root flag deliberately absent.
          { min: '3', label: 'Review / Probe', color: 'yellow', enterpriseStillUsed: true },
          { min: '0', label: 'Concern', color: 'red' },
        ],
        suggestedProbes: [],
      };
      const r = resolveTier(tech, item({ techId: 'legacy-yellow-only', version: '3' }));
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toMatch(/widely used/);
    });

    it('does NOT fire enterprise note on a Green tier even if root flag is true', () => {
      const tech: Technology = {
        id: 'never-fires-on-green',
        name: 'NeverFiresOnGreen',
        category: 'Testing',
        vetMode: 'version',
        versionTiers: [
          { min: '4', label: 'Excellent', color: 'green' },
          { min: '0', label: 'Concern', color: 'red' },
        ],
        enterpriseStillUsed: true,
        suggestedProbes: [],
      };
      const r = resolveTier(tech, item({ techId: 'never-fires-on-green', version: '5' }));
      expect(r.color).toBe('green');
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('tier-level flag overrides root: tier=false suppresses note even when root=true', () => {
      const tech: Technology = {
        id: 'tier-suppresses-root',
        name: 'TierSuppressesRoot',
        category: 'Testing',
        vetMode: 'version',
        versionTiers: [
          { min: '4', label: 'Excellent', color: 'green' },
          { min: '2', label: 'Review / Probe', color: 'yellow', enterpriseStillUsed: false },
          { min: '0', label: 'Concern', color: 'red' },
        ],
        enterpriseStillUsed: true,
        suggestedProbes: [],
      };
      const r = resolveTier(tech, item({ techId: 'tier-suppresses-root', version: '2' }));
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toBeUndefined();
    });
  });

  describe('Bug 3: depth-adjusted label reads as upward', () => {
    it('version-mode tier-match label uses "lifted from X by depth" phrasing', () => {
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep' }));
      expect(r.depthAdjusted).toBe(true);
      expect(r.label).toMatch(/lifted from .* by depth/);
      expect(r.label).not.toMatch(/depth-adjusted from/);
    });

    it('unknown-version + meaningful depth label uses "lifted from Review / Probe by depth"', () => {
      const r = resolveTier(versionTech(), item({ version: '', depth: 'deep' }));
      expect(r.depthAdjusted).toBe(true);
      expect(r.label).toMatch(/lifted from Review \/ Probe by depth/);
    });

    it('checklist depth-lift label uses "lifted from X by depth" phrasing', () => {
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: ['svc-1'], checklistTouched: true, depth: 'deep' })
      );
      expect(r.depthAdjusted).toBe(true);
      expect(r.label).toMatch(/lifted from .* by depth/);
    });
  });

  describe('Bug 5: enterprise note misfires on empty-version + non-skill', () => {
    it('SUPPRESSES the note when unknownVersion=true AND depth is unknown/shallow', () => {
      // This is the Alex/Kotlin and Sam/Docker case: "candidate doesn't use this"
      // gets falsely flattered with "Still widely used in many enterprise applications."
      const r = resolveTier(versionTech(), item({ version: '', depth: 'shallow' }));
      expect(r.color).toBe('yellow');
      expect(r.unknownVersion).toBe(true);
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('SUPPRESSES the note when depth is "unknown" (default for never-touched)', () => {
      const r = resolveTier(versionTech(), item({ version: '', depth: 'unknown' }));
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('STILL fires the note when unknownVersion=true AND depth is working+', () => {
      // The "candidate uses it but doesn't track the version" case (Sam's Docker on GHA,
      // Priya's PyTorch on Modal). The reassurance is valid here.
      const r = resolveTier(versionTech(), item({ version: '', depth: 'working' }));
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toMatch(/widely used/);
    });

    it('STILL fires the note when unknownVersion=true AND depth=deep (lifts to Green-via-depth, no note since not Yellow)', () => {
      const r = resolveTier(versionTech(), item({ version: '', depth: 'deep' }));
      // Depth lifted Yellow → Green; the note only fires when result is Yellow.
      // But under our new rule the meaningful-depth guard already passed, and
      // since the color is now Green, the enterprise note is gated by `tier.color === yellow`
      // in the version-tier path — but unknown-version uses a different gate.
      // Concretely: for unknown-version with meaningful depth, we DO want the note.
      expect(r.enterpriseNote).toMatch(/widely used/);
    });
  });

  describe('Bug 6: tri-state notUsed (excluded from scoring)', () => {
    it('notUsed=true on version-mode tech → skipped=true with neutral label', () => {
      const r = resolveTier(versionTech(), item({ version: '19', notUsed: true }));
      expect(r.skipped).toBe(true);
      expect(r.label).toMatch(/Not in candidate.*stack/);
      expect(r.note).toMatch(/don't work with/);
    });

    it('notUsed=true on checklist-mode tech → skipped=true (works for either mode)', () => {
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: ['svc-1', 'svc-2'], checklistTouched: true, notUsed: true })
      );
      expect(r.skipped).toBe(true);
      expect(r.label).toMatch(/Not in candidate.*stack/);
    });

    it('notUsed=true SUPPRESSES the enterprise-still-used reassurance note', () => {
      // The very thing the Alex/Kotlin + Sam/Docker + Hiroshi/Node sessions
      // surfaced — a non-fit candidate must not get flattering legacy-tech
      // text. notUsed precedes all other scoring; no enterpriseNote ever fires.
      const tech: Technology = {
        ...versionTech(),
        enterpriseStillUsed: true,
      };
      const r = resolveTier(tech, item({ version: '19', notUsed: true, depth: 'very-deep' }));
      expect(r.skipped).toBe(true);
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('notUsed=true overrides depth: very-deep + notUsed does NOT promote', () => {
      const r = resolveTier(versionTech(), item({ version: '19', notUsed: true, depth: 'very-deep' }));
      expect(r.skipped).toBe(true);
      expect(r.depthAdjusted).toBe(false);
    });

    it('notUsed=false (the default) leaves scoring untouched', () => {
      const r = resolveTier(versionTech(), item({ version: '19', notUsed: false }));
      expect(r.skipped).toBeFalsy();
      expect(r.color).toBe('green');
    });
  });
});
