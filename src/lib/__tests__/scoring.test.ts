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

  it('depth=deep does NOT lift in checklist mode (Fix A, 2026-05-16 round-2)', () => {
    // Pre-fix behavior: depth-lift fired on checklist mode, so deep + 1/10 (10%, Red)
    // → Yellow. Post-fix: coverage IS the signal in checklist mode; a self-reported
    // "deep" can't bypass it. 1/10 = 10% stays Red. Closes Vikram's 5/14 LLM-SDK +
    // deep → Green over-rate.
    const r = resolveTier(
      checklistTech(),
      item({ selectedServices: ['svc-1'], checklistTouched: true, depth: 'deep' })
    );
    expect(r.color).toBe('red');
    expect(r.depthAdjusted).toBe(false);
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
 * Round-6 6D (5λ coverage redesign): qualified checklist depth-lift.
 * Owen / Robin / Cara / Brigit / Tanvir under-rated for 5 rounds — deep-
 * narrow specialists with mid-Yellow coverage. Fix: lift Yellow → Green
 * when coverage ≥ 40% AND depth ∈ {deep, very-deep} AND seniority !== junior.
 * Fix A's 25% floor still holds (Vikram protection); reviewer/architect
 * scope still caps; junior gate matches 6C's pattern.
 */
describe('resolveTier — checklist 6D qualified depth-lift', () => {
  it('Owen-shape: 8/14 (57%, Yellow) + very-deep + senior → lifts to Green', () => {
    const tech = checklistTech({
      services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7'],
        checklistTouched: true,
        depth: 'very-deep',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
    expect(r.label).toMatch(/lifted from Review \/ Probe by depth/);
    expect(r.label).toMatch(/8\/14 services/);
  });

  it('Robin-shape: 5/12 (42%, Yellow) + deep + senior → lifts to Green', () => {
    const tech = checklistTech({
      services: Array.from({ length: 12 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4'],
        checklistTouched: true,
        depth: 'deep',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
  });

  it('under coverage floor: 3/10 (30%, Yellow) + very-deep + senior → stays Yellow (under 40%)', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3'],
        checklistTouched: true,
        depth: 'very-deep',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(false);
  });

  it('Vikram protection (Fix A floor): 2/10 (20%, Red) + very-deep + senior → stays Red', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2'],
        checklistTouched: true,
        depth: 'very-deep',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('red');
    expect(r.depthAdjusted).toBe(false);
  });

  it('insufficient depth: 5/10 (50%, Yellow) + working depth → stays Yellow (no lift without deep claim)', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5'],
        checklistTouched: true,
        depth: 'working',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(false);
  });

  it('junior gate: 8/14 (57%) + very-deep + JUNIOR → stays Yellow (junior depth claims unreliable)', () => {
    const tech = checklistTech({
      services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7'],
        checklistTouched: true,
        depth: 'very-deep',
      }),
      { seniority: 'junior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(false);
  });

  it('seniority undefined (back-compat): depth-lift still fires (treats as non-junior)', () => {
    const tech = checklistTech({
      services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7'],
        checklistTouched: true,
        depth: 'very-deep',
      })
    );
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
  });

  it('scope cap still wins: 8/14 + very-deep + reviewer scope → Yellow (scope-cap-from-lifted-Green)', () => {
    const tech = checklistTech({
      services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7'],
        checklistTouched: true,
        depth: 'very-deep',
        scope: 'reviewer',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.label).toMatch(/capped from .* by reviewer scope/);
  });

  it('already-Green coverage (10/10) + very-deep → stays Green, no lift fires (already at top)', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7', 'svc-8', 'svc-9', 'svc-10'],
        checklistTouched: true,
        depth: 'very-deep',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('green');
    // Not lifted *via depth* — was already Green from coverage; depthAdjusted false.
    expect(r.depthAdjusted).toBe(false);
  });

  it('boundary: exactly 40% (4/10) + deep + senior → lifts (inclusive floor)', () => {
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4'],
        checklistTouched: true,
        depth: 'deep',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
  });

  it('lifted Green + ancient lastUsed → recency penalty fires (composition with 6A)', () => {
    const tech = checklistTech({
      services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7'],
        checklistTouched: true,
        depth: 'very-deep',
        lastUsed: '2018',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.recencyAdjusted).toBe(true);
    expect(r.recencyNote).toMatch(/Stale/);
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

    // Removed by Fix B (2026-05-16 round-2): depth-lift no longer fires on
    // unknown-version path. See "Fix B" regression block below for the
    // updated assertion.
    // Removed by Fix A (2026-05-16 round-2): depth-lift no longer fires on
    // checklist mode. See "Fix A" regression block below.
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

    it('STILL fires the note when unknownVersion=true AND depth=deep (no lift anymore, but Yellow + meaningful depth)', () => {
      // Updated by Fix B (2026-05-16 round-2): depth no longer lifts on unknown-version,
      // so the result stays Yellow. The enterprise note's gate (meaningful depth) still
      // passes, so the reassurance text still fires — which is correct for the
      // "candidate uses it but doesn't track the version" case the note exists for.
      const r = resolveTier(versionTech(), item({ version: '', depth: 'deep' }));
      expect(r.color).toBe('yellow');
      expect(r.depthAdjusted).toBe(false);
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

/**
 * Priority #4 — scope-of-use axis. Closes the cluster of misreadings where
 * reviewers, architects, and notebook-authors get scored like operators.
 * See RESUME.md "scope-of-use" plan: reviewer/architect cap at Yellow,
 * author disallows Yellow→Green depth lift, operator and undefined preserve
 * pre-scope behavior.
 */
describe('resolveTier — scope-of-use axis', () => {
  describe('backward compatibility', () => {
    it('scope=undefined is identical to current behavior across all paths', () => {
      const a = resolveTier(versionTech(), item({ version: '19', depth: 'working' }));
      const b = resolveTier(versionTech(), item({ version: '17', depth: 'deep' }));
      const c = resolveTier(versionTech(), item({ version: '', depth: 'working' }));
      expect(a.color).toBe('green');
      expect(a.scopeCapped).toBeFalsy();
      expect(b.color).toBe('green'); // depth-lifted
      expect(b.scopeCapped).toBeFalsy();
      expect(c.color).toBe('yellow');
      expect(c.scopeCapped).toBeFalsy();
    });

    it('scope=operator preserves current behavior (default-implied)', () => {
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep', scope: 'operator' }));
      expect(r.color).toBe('green');
      expect(r.depthAdjusted).toBe(true);
      expect(r.scopeCapped).toBeFalsy();
    });
  });

  describe('reviewer scope caps at Yellow', () => {
    it('scope=reviewer + depth=very-deep + Green version → caps to Yellow', () => {
      const r = resolveTier(versionTech(), item({ version: '19', depth: 'very-deep', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.depthAdjusted).toBe(false);
      expect(r.label).toMatch(/capped from .* by reviewer scope/);
    });

    it('scope=reviewer + Yellow version stays Yellow but scopeCapped:true (round-8 8B)', () => {
      // Round-8 8B (Anil R2, "8α"): Yellow-base reviewer/architect used to
      // pass through with scopeCapped: false — indistinguishable in the UI
      // from a thin-coverage mid-engineer. Post-8B the scope rule still
      // *runs* on Yellow so composeLabel can render "(capped — reviewer
      // scope)" and the recruiter sees scope was applied. cappedFromColor
      // stays undefined because nothing was lowered.
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'working', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.cappedFromColor).toBeUndefined();
      expect(r.label).toMatch(/capped — reviewer scope/);
    });

    it('scope=reviewer + Red version stays Red (cap is a ceiling, not a floor)', () => {
      const r = resolveTier(versionTech(), item({ version: '12', depth: 'working', scope: 'reviewer' }));
      expect(r.color).toBe('red');
      expect(r.scopeCapped).toBe(false);
    });

    it('scope=reviewer overrides depth-lift: Yellow + deep would be Green, but caps back to Yellow', () => {
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.depthAdjusted).toBe(false);
    });
  });

  describe('architect scope behaves identically to reviewer', () => {
    it('scope=architect + depth=very-deep + Green → caps to Yellow', () => {
      const r = resolveTier(versionTech(), item({ version: '19', depth: 'very-deep', scope: 'architect' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.label).toMatch(/capped from .* by architect scope/);
    });
  });

  describe('author scope restricts depth lift', () => {
    it('scope=author + depth=deep + Yellow version → STAYS Yellow (no lift to Green)', () => {
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep', scope: 'author' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.depthAdjusted).toBe(false);
    });

    it('scope=author + depth=very-deep + Red version → still lifts to Yellow', () => {
      const r = resolveTier(versionTech(), item({ version: '12', depth: 'very-deep', scope: 'author' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(false);
      expect(r.depthAdjusted).toBe(true);
    });

    it('scope=author + natural Green version → STAYS Green (no overall cap)', () => {
      const r = resolveTier(versionTech(), item({ version: '19', depth: 'working', scope: 'author' }));
      expect(r.color).toBe('green');
      expect(r.scopeCapped).toBe(false);
    });

    it('scope=author + working depth + Yellow stays Yellow (no lift attempted)', () => {
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'working', scope: 'author' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(false);
    });
  });

  describe('scope in checklist mode', () => {
    it('scope=reviewer caps a Green coverage verdict to Yellow', () => {
      const r = resolveTier(
        checklistTech(),
        item({
          selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
          checklistTouched: true,
          scope: 'reviewer',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.label).toMatch(/capped from .* by reviewer scope/);
      // Coverage suffix still appears.
      expect(r.label).toMatch(/7\/10 services/);
    });

    it('scope=author + depth=deep + Yellow coverage stays Yellow (no lift at all in checklist post-Fix-A)', () => {
      // Pre-Fix-A: depth-lift fired in checklist mode, then author scope reverted
      // it (scopeCapped=true). Post-Fix-A: no lift happens at all in checklist mode,
      // so the author cap has nothing to revert. Result is still Yellow but via
      // a different path. scopeCapped is now false because no lift was attempted.
      const r = resolveTier(
        checklistTech(),
        item({
          selectedServices: ['svc-1', 'svc-2', 'svc-3'], // 3/10 = Yellow band
          checklistTouched: true,
          depth: 'deep',
          scope: 'author',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(false);
    });
  });

  describe('scope interacts with other flags correctly', () => {
    it('notUsed takes precedence over scope (no scoring happens at all)', () => {
      const r = resolveTier(versionTech(), item({ version: '19', notUsed: true, scope: 'reviewer' }));
      expect(r.skipped).toBe(true);
      expect(r.scopeCapped).toBeFalsy();
    });

    it('unknownVersion + scope=reviewer + meaningful depth → Yellow with scopeCapped:true (8B)', () => {
      // Pre-Fix-B: Yellow base + deep lifted to Green; reviewer scope capped back.
      // Post-Fix-B: no lift happens on unknown-version, so result is naturally
      // Yellow at scoring layer. Round-8 8B: reviewer/architect scope on a
      // Yellow-base still sets scopeCapped: true so the recruiter sees the
      // scope rule applied (cappedFromColor undefined — nothing was lowered).
      const r = resolveTier(versionTech(), item({ version: '', depth: 'deep', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.cappedFromColor).toBeUndefined();
      expect(r.depthAdjusted).toBe(false);
    });

    it('scope=reviewer + Yellow tier + enterpriseStillUsed → still shows enterprise note', () => {
      // Cap doesn't change the tier color in this case (already Yellow), so the
      // Yellow-only enterprise note continues to fire.
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'working', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toMatch(/widely used/);
    });
  });
});

/**
 * Round 2 (2026-05-16 phone-screening) — fixes A, B, G, J. See
 * `simulations/rounds/2026-05-16-phone-screening/cross-cut.md` for the
 * full evidence trail. These regression tests pin the new behavior so a
 * future agent can't quietly revert it.
 */
describe('resolveTier — round 2 fixes (A, B, G)', () => {
  describe('Fix A: no depth-lift on checklist mode', () => {
    it('1/10 + deep stays Red (was Yellow pre-fix)', () => {
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: ['svc-1'], checklistTouched: true, depth: 'deep' })
      );
      expect(r.color).toBe('red');
      expect(r.depthAdjusted).toBe(false);
    });

    it('3/10 (Yellow band) + very-deep stays Yellow (was Green pre-fix)', () => {
      const r = resolveTier(
        checklistTech(),
        item({
          selectedServices: ['svc-1', 'svc-2', 'svc-3'],
          checklistTouched: true,
          depth: 'very-deep',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.depthAdjusted).toBe(false);
    });

    it('5/14 (≈36%, Yellow) + deep stays Yellow — Vikram LLM-SDK case', () => {
      const tech = checklistTech({
        services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
      });
      const r = resolveTier(
        tech,
        item({
          selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4'],
          checklistTouched: true,
          depth: 'deep',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.label).not.toMatch(/lifted/);
    });

    it('7/10 (Green) coverage stays Green regardless of depth — coverage IS the signal', () => {
      const r = resolveTier(
        checklistTech(),
        item({
          selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
          checklistTouched: true,
          depth: 'shallow',
        })
      );
      expect(r.color).toBe('green');
    });

    it('scope=reviewer STILL caps Green coverage to Yellow (Fix A doesn\'t touch scope)', () => {
      const r = resolveTier(
        checklistTech(),
        item({
          selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
          checklistTouched: true,
          depth: 'very-deep',
          scope: 'reviewer',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
    });
  });

  describe('Fix B: no depth-lift on unknown-version', () => {
    it('unknownVersion + deep stays Yellow (was Green pre-fix)', () => {
      const r = resolveTier(versionTech(), item({ version: '', depth: 'deep' }));
      expect(r.color).toBe('yellow');
      expect(r.depthAdjusted).toBe(false);
    });

    it('unknownVersion + very-deep stays Yellow (was Green pre-fix)', () => {
      const r = resolveTier(versionTech(), item({ version: '', depth: 'very-deep' }));
      expect(r.color).toBe('yellow');
      expect(r.depthAdjusted).toBe(false);
    });

    it('unknownVersion=true (toggle) + deep stays Yellow', () => {
      const r = resolveTier(versionTech(), item({ version: '17', unknownVersion: true, depth: 'deep' }));
      expect(r.color).toBe('yellow');
      expect(r.depthAdjusted).toBe(false);
    });

    it('version-mode tier-match path STILL lifts on deep (Fix B only touches unknown path)', () => {
      // Sanity: the Yellow→Green depth-lift on a matched Yellow tier with a known
      // version is the legitimate case (candidate IS on the older version and the
      // version-tier is the signal). That path is unchanged.
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep' }));
      expect(r.color).toBe('green');
      expect(r.depthAdjusted).toBe(true);
    });

    it('enterprise note still fires on unknownVersion + working+ depth (gate unchanged)', () => {
      const r = resolveTier(versionTech(), item({ version: '', depth: 'working' }));
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toMatch(/widely used/);
    });
  });

  describe('Fix G: notDiscussed flag for untouched template cards', () => {
    it('version-mode: empty version, no toggles → notDiscussed=true', () => {
      const r = resolveTier(versionTech(), item({ version: '' }));
      expect(r.notDiscussed).toBe(true);
    });

    it('version-mode: empty version + unknownVersion toggle → NOT notDiscussed (recruiter interacted)', () => {
      const r = resolveTier(versionTech(), item({ version: '', unknownVersion: true }));
      expect(r.notDiscussed).toBeFalsy();
    });

    it('version-mode: empty version + notUsed → NOT notDiscussed (skipped takes precedence)', () => {
      const r = resolveTier(versionTech(), item({ version: '', notUsed: true }));
      expect(r.skipped).toBe(true);
      // notDiscussed not set on the skipped path — separate exclusion.
      expect(r.notDiscussed).toBeFalsy();
    });

    it('version-mode: typed version → NOT notDiscussed', () => {
      const r = resolveTier(versionTech(), item({ version: '19' }));
      expect(r.notDiscussed).toBeFalsy();
    });

    it('version-mode: garbage version ("latest") → NOT notDiscussed (recruiter did type something)', () => {
      const r = resolveTier(versionTech(), item({ version: 'latest' }));
      expect(r.notDiscussed).toBeFalsy();
    });

    it('checklist-mode: 0/N untouched → notDiscussed=true', () => {
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: [], checklistTouched: false })
      );
      expect(r.notDiscussed).toBe(true);
      expect(r.label).toMatch(/Not yet assessed/);
    });

    it('checklist-mode: 0/N after interaction → NOT notDiscussed (Red Concern is the real verdict)', () => {
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: [], checklistTouched: true })
      );
      expect(r.color).toBe('red');
      expect(r.notDiscussed).toBeFalsy();
    });

    it('checklist-mode: any services ticked → NOT notDiscussed', () => {
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: ['svc-1'], checklistTouched: true })
      );
      expect(r.notDiscussed).toBeFalsy();
    });

    it('checklist-mode: checklistUnsure flag → NOT notDiscussed (recruiter explicitly parked)', () => {
      // checklistUnsure is the recruiter saying "candidate said they can't recall"
      // — that's an active datum, not silence. Currently lands in the Unsure path
      // before the untouched path, so notDiscussed stays falsy.
      const r = resolveTier(
        checklistTech(),
        item({ selectedServices: [], checklistTouched: false, checklistUnsure: true })
      );
      expect(r.notDiscussed).toBeFalsy();
    });
  });
});

/**
 * Fix K (round-2 cross-cut): scope-axis UX redesign — catalog-side smart
 * defaults so the right cap fires even when the recruiter doesn't reach
 * the dropdown on a phone call. AI/ML libs default to `author` so the
 * depth-game stops earning Green for tutorial-grade users.
 *
 * The interactive Summary chip (the other half of Fix K) is a UI change
 * covered by the browser smoke test, not a unit test.
 */
describe('resolveTier — Fix K: defaultScope from catalog', () => {
  it('applies catalog defaultScope when item.scope is undefined', () => {
    const tech: Technology = {
      ...versionTech(),
      id: 'aiml-lib',
      defaultScope: 'author',
    };
    // Yellow tier + deep would normally lift to Green; author default
    // blocks the lift just like an explicit scope=author would.
    const r = resolveTier(tech, item({ techId: 'aiml-lib', version: '17', depth: 'deep' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.depthAdjusted).toBe(false);
  });

  it('explicit item.scope overrides catalog defaultScope', () => {
    const tech: Technology = {
      ...versionTech(),
      id: 'aiml-lib-override',
      defaultScope: 'author',
    };
    // Default would be author (caps the lift). Explicit operator releases the lift.
    const r = resolveTier(
      tech,
      item({ techId: 'aiml-lib-override', version: '17', depth: 'deep', scope: 'operator' })
    );
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
    expect(r.scopeCapped).toBe(false);
  });

  it('catalog defaultScope does not affect natural-Green verdicts (author semantics)', () => {
    // The author cap only blocks Yellow→Green depth lifts; natural Green
    // from the version tier stays Green. This is the Vikram LangChain case
    // that Fix K does NOT close — Fix O is the catalog-side guard for that.
    const tech: Technology = {
      ...versionTech(),
      id: 'aiml-natural-green',
      defaultScope: 'author',
    };
    const r = resolveTier(tech, item({ techId: 'aiml-natural-green', version: '19', depth: 'working' }));
    expect(r.color).toBe('green');
    expect(r.scopeCapped).toBe(false);
  });

  it('catalog defaultScope=reviewer would cap a natural Green to Yellow', () => {
    // Hypothetical — no catalog entry uses reviewer as default today, but
    // pin the behavior in case one is added (e.g. a Security tool where
    // the typical relationship is audit/review, not operation).
    const tech: Technology = {
      ...versionTech(),
      id: 'reviewer-default',
      defaultScope: 'reviewer',
    };
    const r = resolveTier(tech, item({ techId: 'reviewer-default', version: '19', depth: 'working' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
  });

  it('no defaultScope + no explicit scope → operator-implied behavior unchanged', () => {
    // Backward compat: techs without defaultScope continue to behave as
    // they did pre-Fix-K (operator implied, no cap).
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep' }));
    expect(r.color).toBe('green'); // depth lifts Yellow→Green, no cap
    expect(r.depthAdjusted).toBe(true);
    expect(r.scopeCapped).toBe(false);
  });

  it('defaultScope applies on checklist-mode techs too', () => {
    const tech: Technology = {
      ...checklistTech(),
      id: 'checklist-with-default',
      defaultScope: 'reviewer',
    };
    // 7/10 = Green; reviewer default caps to Yellow.
    const r = resolveTier(
      tech,
      item({
        techId: 'checklist-with-default',
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
        checklistTouched: true,
      })
    );
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
  });
});

/**
 * Fix E (round-3 cross-cut, Sarah's design wrinkle): asymmetric recency.
 * Penalize stale Greens (Sam-Ansible case) AND soften stale Reds where
 * `enterpriseStillUsed` says the old version is defensible (Sarah-Spring
 * case). Only fires on version-mode tier-match path.
 */
describe('resolveTier — Fix E: asymmetric recency', () => {
  describe('stale Green penalty (Sam-Ansible / Maya-RN-2022 shape)', () => {
    it('Green tier + lastUsed="2022" (4 yr stale) → Yellow with stale note', () => {
      const r = resolveTier(versionTech(), item({ version: '19', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      expect(r.recencyNote).toMatch(/Stale/);
      expect(r.recencyNote).toMatch(/verify currency/);
    });

    it('Green tier + lastUsed="2018" (ancient) → Yellow with 5+ yr framing', () => {
      const r = resolveTier(versionTech(), item({ version: '19', lastUsed: '2018' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyNote).toMatch(/5\+ yr/);
    });

    it('Green tier + lastUsed="current" → stays Green', () => {
      const r = resolveTier(versionTech(), item({ version: '19', lastUsed: 'current role' }));
      expect(r.color).toBe('green');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('Green tier + empty lastUsed → stays Green (unknown does nothing)', () => {
      const r = resolveTier(versionTech(), item({ version: '19', lastUsed: '' }));
      expect(r.color).toBe('green');
      expect(r.recencyAdjusted).toBeFalsy();
    });
  });

  describe('stale Red softener (Sarah-Spring-Boot-2.5 shape)', () => {
    it('Red tier + enterpriseStillUsed + stale → Yellow with neutral softener note (round-7 7B)', () => {
      // versionTech() has enterpriseStillUsed: true at root by default.
      const r = resolveTier(versionTech(), item({ version: '12', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      // Round-7 7B: note text rephrased to handle returner / moved-off /
      // team-won't-upgrade equally (Sven misfire on "moved-off" case).
      expect(r.recencyNote).toMatch(/current at last-use/);
      expect(r.recencyNote).toMatch(/defensible older usage/);
      expect(r.recencyNote).toMatch(/returning to it or deliberately moved off/);
    });

    it('Red tier WITHOUT enterpriseStillUsed + stale → stays Red (no false softener)', () => {
      const tech: Technology = {
        ...versionTech(),
        id: 'no-enterprise-flag',
        enterpriseStillUsed: false,
      };
      const r = resolveTier(tech, item({ techId: 'no-enterprise-flag', version: '12', lastUsed: '2022' }));
      expect(r.color).toBe('red');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    // Round-5 5α: broadened softener also fires on Yellow-tier stale + flag.
    // Margarethe's PG 13 + Java 11 → Yellow-tier match → was previously
    // skipped; now gets the returner softener note even though the COLOR
    // doesn't change. Label + note carry the returner story.
    it('Yellow tier + enterpriseStillUsed + stale → softener fires with neutral note (color stays Yellow)', () => {
      const r = resolveTier(versionTech(), item({ version: '17', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      // Round-7 7B: neutral wording (was "returner shape; expect ramp-up").
      expect(r.recencyNote).toMatch(/current at last-use/);
      expect(r.recencyNote).toMatch(/defensible older usage/);
      // Round-9 9C (Pooja F5): when finalLabel === baseLabel (both Yellow
      // = "Review / Probe"), composeLabel suppresses the tautological from-
      // clause. Label reads "Review / Probe (stale but defensible)" instead
      // of "(softened from Review / Probe — stale but defensible)".
      expect(r.label).toMatch(/Review \/ Probe \(stale but defensible\)/);
    });
  });

  describe('no-op cases', () => {
    // Round-5 Margarethe shipped: Yellow + enterpriseStillUsed + stale now
    // softens (broader returner-shape support). The no-op variant requires
    // the enterprise flag to be absent.
    it('Yellow tier + stale + NO enterpriseStillUsed → no recency adjustment', () => {
      const tech: Technology = {
        ...versionTech(),
        id: 'no-enterprise-yellow',
        enterpriseStillUsed: false,
      };
      const r = resolveTier(tech, item({ techId: 'no-enterprise-yellow', version: '17', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('Green tier + "6 months ago" (current bucket) → stays Green', () => {
      const r = resolveTier(versionTech(), item({ version: '19', lastUsed: '6 months ago' }));
      expect(r.color).toBe('green');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('Green tier + recent ("last year") → stays Green', () => {
      const r = resolveTier(versionTech(), item({ version: '19', lastUsed: 'last year' }));
      expect(r.color).toBe('green');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    // Round-6 6A: recency now applies to checklist mode too. The previous
    // "coverage is the signal, not version freshness" rationale held until
    // Margarethe surfaced that an AWS-checklist tick from 2022 carries the
    // same staleness story as a version-mode 2022 match. Green coverage +
    // ancient lastUsed → Green penalty (symmetric with version mode), so the
    // tick can't impersonate live production knowledge.
    it('checklist mode + Green coverage + ancient lastUsed → Green-stale penalty fires', () => {
      const r = resolveTier(
        checklistTech(),
        item({
          selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
          checklistTouched: true,
          lastUsed: '2020',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      expect(r.recencyNote).toMatch(/Stale/);
      expect(r.recencyNote).toMatch(/verify currency/);
    });

    // Round-6 6A: Red coverage + enterpriseStillUsed + stale → softener fires
    // (Margarethe's AWS at 3/14 = 21% lastUsed=2022). Symmetric with version
    // mode's Red softener.
    it('checklist mode + Red coverage + enterpriseStillUsed + stale → softens to Yellow with neutral note', () => {
      const tech = checklistTech({ id: 'aws-mock', name: 'AWS', enterpriseStillUsed: true });
      const r = resolveTier(
        tech,
        item({
          techId: 'aws-mock',
          selectedServices: ['svc-1', 'svc-2'], // 2/10 = 20% Red
          checklistTouched: true,
          lastUsed: '2022',
        })
      );
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      // Round-7 7B: neutral wording.
      expect(r.recencyNote).toMatch(/current at last-use/);
      expect(r.recencyNote).toMatch(/defensible older usage/);
    });

    // Round-6 6A: checklist coverage suffix still appears alongside softener.
    it('checklist softener composes with coverage suffix in label', () => {
      const tech = checklistTech({ id: 'aws-mock', name: 'AWS', enterpriseStillUsed: true });
      const r = resolveTier(
        tech,
        item({
          techId: 'aws-mock',
          selectedServices: ['svc-1', 'svc-2'],
          checklistTouched: true,
          lastUsed: '2022',
        })
      );
      expect(r.label).toMatch(/softened from Concern/);
      expect(r.label).toMatch(/2\/10 services/);
    });

    it('unknown-version + stale → no recency adjustment (no version to anchor)', () => {
      const r = resolveTier(versionTech(), item({ version: '', lastUsed: '2020' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('notUsed + stale → skipped wins (recency never runs)', () => {
      const r = resolveTier(versionTech(), item({ version: '19', notUsed: true, lastUsed: '2018' }));
      expect(r.skipped).toBe(true);
      expect(r.recencyAdjusted).toBeFalsy();
    });
  });

  // Round-6 6C: gate the enterpriseStillUsed softener on `seniority !== 'junior'`.
  // Mei's Next.js 12 on a team-hasn't-upgraded stack should NOT read as
  // "defensible legacy" — it should read as a probe target so the recruiter
  // surfaces the App Router / RSC gap. Penalty branch still fires for juniors
  // (stale Greens still penalize regardless of seniority). Only the softener
  // direction is gated.
  describe('seniority gate on enterpriseStillUsed softener (6C)', () => {
    it('version mode: Yellow + enterpriseStillUsed + stale + seniority=junior → NO softener (stays Yellow, no recencyAdjusted)', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '17', lastUsed: '2022' }),
        { seniority: 'junior' }
      );
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('version mode: Red + enterpriseStillUsed + stale + seniority=junior → NO softener (stays Red — probe target, not defensible legacy)', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '12', lastUsed: '2022' }),
        { seniority: 'junior' }
      );
      expect(r.color).toBe('red');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('checklist mode: Red coverage + enterpriseStillUsed + stale + seniority=junior → NO softener (stays Red)', () => {
      const tech = checklistTech({ id: 'aws-mock', name: 'AWS', enterpriseStillUsed: true });
      const r = resolveTier(
        tech,
        item({
          techId: 'aws-mock',
          selectedServices: ['svc-1', 'svc-2'],
          checklistTouched: true,
          lastUsed: '2022',
        }),
        { seniority: 'junior' }
      );
      expect(r.color).toBe('red');
      expect(r.recencyAdjusted).toBeFalsy();
    });

    it('Green-stale penalty still fires for juniors (penalty side is NOT gated)', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '19', lastUsed: '2022' }),
        { seniority: 'junior' }
      );
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      expect(r.recencyNote).toMatch(/verify currency/);
    });

    it('seniority=mid: softener still fires (only junior is gated)', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '12', lastUsed: '2022' }),
        { seniority: 'mid' }
      );
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      expect(r.recencyNote).toMatch(/current at last-use/);
    });

    it('seniority undefined (back-compat): softener still fires', () => {
      const r = resolveTier(versionTech(), item({ version: '12', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
    });

    it('unknown-version + enterpriseStillUsed + seniority=junior → NO enterpriseNote', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '', depth: 'working' }),
        { seniority: 'junior' }
      );
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('Yellow tier-match + enterpriseStillUsed + seniority=junior → NO enterpriseNote (Mei Next.js 12 scenario)', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '17' }), // Yellow tier
        { seniority: 'junior' }
      );
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('Yellow tier-match + enterpriseStillUsed + seniority=mid → enterpriseNote still fires (only junior gated)', () => {
      const r = resolveTier(
        versionTech(),
        item({ version: '17' }),
        { seniority: 'mid' }
      );
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toMatch(/widely used/);
    });
  });

  describe('interaction with scope cap', () => {
    it('scope=reviewer caps Green→Yellow; post-5α, the softener still fires for Yellow+enterpriseStillUsed (no color double-discount; both notes render)', () => {
      // Pre-5α: scope cap stopped the recency path because the Red-only
      // guard skipped Yellow. Post-5α: Yellow + enterpriseStillUsed + stale
      // fires the softener — color stays Yellow (no double color discount),
      // but the returner note + scope-cap note both render on the report.
      // That's correct: scope explains why it's not Green; recency explains
      // why the older version is defensible. Different signals, both useful.
      const r = resolveTier(
        versionTech(),
        item({ version: '19', depth: 'very-deep', scope: 'reviewer', lastUsed: '2022' })
      );
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(true);
      expect(r.recencyAdjusted).toBe(true);
    });

    it('Green tier from depth-lift + stale → recency penalizes back to Yellow', () => {
      // version=17 (Yellow) + deep lifts to Green; lastUsed="2022" (stale)
      // penalizes back to Yellow with the stale note.
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      expect(r.depthAdjusted).toBe(false); // recency overrides depth-lift credit
    });
  });

  describe('enterprise note interaction', () => {
    it('Yellow tier + enterpriseStillUsed + stale Red softener override suppresses the enterprise note', () => {
      // Sarah's case: pre-Fix-E Red Concern. Post-Fix-E Yellow via recency softener.
      // The recency note replaces the enterprise-still-used reassurance to avoid noise.
      const r = resolveTier(versionTech(), item({ version: '12', lastUsed: '2022' }));
      expect(r.color).toBe('yellow');
      expect(r.recencyAdjusted).toBe(true);
      // Enterprise note suppressed because the recency note takes precedence in this case.
      expect(r.enterpriseNote).toBeUndefined();
    });

    it('Yellow tier + enterpriseStillUsed + no recency adjustment → enterprise note still fires', () => {
      const r = resolveTier(versionTech(), item({ version: '17', lastUsed: 'current' }));
      expect(r.color).toBe('yellow');
      expect(r.enterpriseNote).toMatch(/widely used/);
    });
  });
});

/**
 * Round-7 7C (5ξ, Anil): cappedFromColor field + composeLabel differentiator.
 * Anil's headline `0G/5Y/0R` previously made "capped-strong" and "thin
 * coverage" read identical in the Yellow bucket. Now ResolvedTier carries
 * `cappedFromColor` so HM-facing UI can count + differentiate Staff IC
 * patterns from raw Yellow.
 */
describe('resolveTier — 7C cappedFromColor (5ξ)', () => {
  it('reviewer scope on Green version → cappedFromColor: green', () => {
    const r = resolveTier(versionTech(), item({ version: '19', scope: 'reviewer' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBe('green');
  });

  it('architect scope on Green version → cappedFromColor: green', () => {
    const r = resolveTier(versionTech(), item({ version: '19', scope: 'architect' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBe('green');
  });

  it('reviewer scope on Yellow version → scopeCapped:true, cappedFromColor undefined (8B)', () => {
    // Round-8 8B (Anil R2): Yellow-base reviewer/architect now sets
    // scopeCapped: true (cappedFromColor undefined — verdict wasn't lowered,
    // just bounded). Summary's Scope-capped headline still counts only
    // cappedFromColor === 'green' (Staff-IC pattern) so this Yellow-base
    // case surfaces in the label but doesn't inflate the headline count.
    const r = resolveTier(versionTech(), item({ version: '17', scope: 'reviewer' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBeUndefined();
    expect(r.label).toMatch(/capped — reviewer scope/);
  });

  it('operator scope → no cappedFromColor regardless of color', () => {
    const r = resolveTier(versionTech(), item({ version: '19', scope: 'operator' }));
    expect(r.color).toBe('green');
    expect(r.cappedFromColor).toBeUndefined();
  });

  it('author scope on Yellow+deep (would have lifted Green) → cappedFromColor: green', () => {
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep', scope: 'author' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBe('green');
  });

  it('checklist mode: architect scope on 6D-lifted Green → cappedFromColor: green', () => {
    const tech = checklistTech({
      services: Array.from({ length: 14 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7'],
        checklistTouched: true,
        depth: 'very-deep',
        scope: 'architect',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBe('green');
  });

  it('composeLabel uses cappedFromColor in label text', () => {
    const r = resolveTier(versionTech(), item({ version: '19', scope: 'architect' }));
    expect(r.label).toMatch(/capped from Good by architect scope/);
  });

  it('softener composing with scope-cap preserves cappedFromColor', () => {
    const r = resolveTier(
      versionTech(),
      item({ version: '19', depth: 'very-deep', scope: 'reviewer', lastUsed: '2022' })
    );
    // Scope caps Green → Yellow with cappedFromColor=green; recency softener
    // also fires on the Yellow output (enterpriseStillUsed) and preserves
    // cappedFromColor through the recency path.
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBe('green');
    expect(r.recencyAdjusted).toBe(true);
  });
});

/**
 * Round-8 8B (Anil R2, "8α"): reviewer/architect scope on a *baseline-Yellow*
 * tech now sets scopeCapped: true with cappedFromColor: undefined. Pre-8B
 * the verdict passed through identical to a thin-coverage mid-engineer
 * (Anil's Azure at 5/13 = 38% read the same as a mid Azure engineer who
 * happens to know 5 services). Post-8B the label gets "(capped — architect
 * scope)" so the recruiter sees scope was applied. Summary's Scope-capped
 * headline still filters on cappedFromColor === 'green' (Staff IC pattern)
 * so the Yellow-base case surfaces in the label but doesn't inflate the
 * headline count.
 */
describe('resolveTier — 8B yellow-base architect/reviewer scope-bounded', () => {
  it('architect scope on Yellow version → scopeCapped:true, cappedFromColor undefined, label suffix fires', () => {
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'working', scope: 'architect' }));
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBeUndefined();
    expect(r.label).toMatch(/capped — architect scope/);
  });

  it('architect scope on Yellow version: NOT counted in Staff-IC headline (cappedFromColor === green) filter', () => {
    // Summary.tsx filters scopeCappedCount on `cappedFromColor === 'green'`.
    // This case has cappedFromColor undefined, so it correctly stays out of
    // the Staff-IC count while still showing the label suffix.
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'working', scope: 'architect' }));
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBeUndefined();
  });

  it('reviewer scope on Red version still passes through with scopeCapped:false', () => {
    // Red base — architect/reviewer scope doesn't pull a Red down further and
    // surfacing "(capped)" on a Red would imply the candidate would have been
    // higher without scope, which isn't honest for thin coverage.
    const r = resolveTier(versionTech(), item({ version: '12', depth: 'working', scope: 'reviewer' }));
    expect(r.color).toBe('red');
    expect(r.scopeCapped).toBe(false);
    expect(r.cappedFromColor).toBeUndefined();
  });

  it('checklist mode Yellow + architect → scopeCapped:true (Anil Azure 5/13 = 38% case)', () => {
    const tech = checklistTech({
      services: Array.from({ length: 13 }, (_, i) => ({ id: `s-${i}`, name: `S${i}` })),
    });
    const r = resolveTier(
      tech,
      item({
        selectedServices: ['s-0', 's-1', 's-2', 's-3', 's-4'], // 5/13 = 38% Yellow
        checklistTouched: true,
        depth: 'deep',
        scope: 'architect',
      }),
      { seniority: 'senior' }
    );
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBeUndefined();
    expect(r.label).toMatch(/capped — architect scope/);
  });
});

/**
 * Round-8 8A (Mei UI bugs): TechCard.tsx now passes seniority to resolveTier
 * so the card badge matches the GuidancePanel verdict. The depth-note UI
 * branches on depthDirection so junior+shallow's "lowered" verdict doesn't
 * read as "credit given." These are UI-layer fixes; the scoring layer was
 * already correct after 7D. Test reproduces what Assessment.tsx and
 * TechCard.tsx should now both compute identically.
 */
describe('resolveTier — 8A seniority threading parity (Mei)', () => {
  it('same item + seniority resolves identically across call sites', () => {
    const baseItem = item({ version: '5.3', depth: 'shallow' });
    // Whether the call comes from Assessment.tsx (always passes seniority)
    // or TechCard.tsx (post-8A also passes seniority), the result must be
    // identical for the same input. Pre-8A, TechCard dropped seniority and
    // returned Green for Mei's TS 5.3 + shallow while the side panel
    // returned Yellow.
    const fromAssessment = resolveTier(versionTech(), baseItem, { seniority: 'junior' });
    const fromTechCard = resolveTier(versionTech(), baseItem, { seniority: 'junior' });
    expect(fromAssessment.color).toBe(fromTechCard.color);
    expect(fromAssessment.label).toBe(fromTechCard.label);
    expect(fromAssessment.depthDirection).toBe(fromTechCard.depthDirection);
  });
});

/**
 * Round-9 9C (Pooja F5): when composeLabel softener/penalty fires on an
 * already-Yellow baseLabel, the from-clause renders the same label twice
 * ("(softened from Review / Probe — stale but defensible)"). Suppress the
 * from-clause when finalLabel === baseLabel. Cosmetic but the tautology
 * read awkward across rounds 5-9.
 */
/**
 * Round-18 (Theo R12 sim 04 — round-17 closure bug): pre-batch-18 the
 * serviceTagFilters template field was render-only — TechCard hid filtered
 * services from the checkbox grid but resolveChecklistTier used full
 * services.length. Verdict labels like "3/26 services" appeared while the
 * checkbox grid showed "3 / 15". Threading the filter fixes this.
 */
describe('resolveTier — round-18 serviceTagFilter threading (Theo)', () => {
  function taggedChecklistTech(): Technology {
    return {
      id: 'tagged-tech',
      name: 'Tagged Tech',
      category: 'Cloud',
      vetMode: 'checklist',
      services: [
        { id: 'svc-a', name: 'A', tags: ['general'] },
        { id: 'svc-b', name: 'B', tags: ['general'] },
        { id: 'svc-c', name: 'C', tags: ['general'] },
        { id: 'svc-d', name: 'D', tags: ['security'] },
        { id: 'svc-e', name: 'E', tags: ['security'] },
        { id: 'svc-f', name: 'F', tags: ['security'] },
        { id: 'svc-g', name: 'G', tags: ['architect'] },
        { id: 'svc-h', name: 'H', tags: ['architect'] },
      ],
      suggestedProbes: [],
    };
  }

  it('without filter: denominator is full services.length', () => {
    const tech = taggedChecklistTech();
    const r = resolveTier(tech, item({ selectedServices: ['svc-a', 'svc-b'], checklistTouched: true }));
    expect(r.coverage?.total).toBe(8);
    expect(r.label).toMatch(/2\/8 services/);
  });

  it('with general filter: denominator drops to filtered service count', () => {
    const tech = taggedChecklistTech();
    const r = resolveTier(
      tech,
      item({ selectedServices: ['svc-a', 'svc-b'], checklistTouched: true }),
      { serviceTagFilter: ['general'] }
    );
    expect(r.coverage?.total).toBe(3);
    expect(r.label).toMatch(/2\/3 services/);
  });

  it('already-selected service outside the filter still counts (matches render logic)', () => {
    // Mirror TechCard.tsx: already-selected always shows in render. Scoring
    // must match — if a previously-ticked service is now filtered-out by
    // template, it stays in both the denominator and the selected count.
    const tech = taggedChecklistTech();
    const r = resolveTier(
      tech,
      item({ selectedServices: ['svc-a', 'svc-d'], checklistTouched: true }),
      { serviceTagFilter: ['general'] }
    );
    // svc-d is selected but tagged 'security' (not in 'general' filter).
    // It still appears in the denominator + selected count via the
    // matched-by-tag OR already-selected OR untagged rule.
    expect(r.coverage?.total).toBe(4); // 3 general + 1 selected-out-of-filter
    expect(r.coverage?.selected).toBe(2);
    expect(r.label).toMatch(/2\/4 services/);
  });

  it('hybrid mode also respects serviceTagFilter (K8s + Backend template scenario)', () => {
    const tech: Technology = {
      ...taggedChecklistTech(),
      id: 'hybrid-tagged',
      vetMode: 'hybrid',
      currentVersion: '5',
      versionTiers: [
        { min: '5', label: 'Excellent', color: 'green' },
        { min: '3', label: 'Good', color: 'green' },
        { min: '0', label: 'Concern', color: 'red' },
      ],
    };
    const r = resolveTier(
      tech,
      item({ version: '5', selectedServices: ['svc-a', 'svc-b'], checklistTouched: true }),
      { serviceTagFilter: ['general'] }
    );
    // Version Green + 2/3 (67%) coverage = Green base → Green.
    expect(r.color).toBe('green');
    expect(r.label).toMatch(/2\/3 services/);
  });
});

/**
 * Round-12 hybrid mode (Sven round-7 R5 + Lars rounds 9-10): vetMode='hybrid'
 * combines version-tier + checklist-coverage via MIN/weakest-link. Kubernetes
 * is the canonical case. Tests cover the four matrix cells (version × services)
 * plus back-compat (services untouched → version-only).
 */
describe('resolveTier — round-12 hybrid mode (K8s shape)', () => {
  function hybridTech(): Technology {
    return {
      id: 'hybrid-test',
      name: 'Hybrid Test',
      category: 'DevOps',
      vetMode: 'hybrid',
      currentVersion: '1.36',
      versionTiers: [
        { min: '1.33', label: 'Excellent', color: 'green' },
        { min: '1.28', label: 'Good', color: 'green' },
        { min: '1.24', label: 'Review / Probe', color: 'yellow' },
        { min: '0', label: 'Concern', color: 'red' },
      ],
      services: [
        { id: 's1', name: 'S1' }, { id: 's2', name: 'S2' }, { id: 's3', name: 'S3' },
        { id: 's4', name: 'S4' }, { id: 's5', name: 'S5' }, { id: 's6', name: 'S6' },
        { id: 's7', name: 'S7' }, { id: 's8', name: 'S8' }, { id: 's9', name: 'S9' },
        { id: 's10', name: 'S10' }, { id: 's11', name: 'S11' }, { id: 's12', name: 'S12' },
      ],
      suggestedProbes: [],
    };
  }

  it('version Green + services untouched → Green (back-compat: services don\'t drag when not interacted)', () => {
    const r = resolveTier(hybridTech(), item({ version: '1.30', depth: 'working' }));
    expect(r.color).toBe('green');
    // No coverage suffix in label because services-channel didn't contribute.
    expect(r.label).not.toMatch(/services/);
  });

  it('version Green + 11/12 services (92%) → Green (Lars deep-operator shape)', () => {
    const r = resolveTier(
      hybridTech(),
      item({
        version: '1.30',
        depth: 'deep',
        selectedServices: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
        checklistTouched: true,
      })
    );
    expect(r.color).toBe('green');
    expect(r.label).toMatch(/11\/12 services/);
  });

  it('version Green + 3/12 services (25%) → Yellow (Sven Helm-consumer at the edge)', () => {
    const r = resolveTier(
      hybridTech(),
      item({
        version: '1.28',
        depth: 'working',
        selectedServices: ['s1', 's2', 's3'],
        checklistTouched: true,
      })
    );
    // 3/12 = 25% — Yellow tier (≥25%, <66%); MIN(Green, Yellow) = Yellow.
    expect(r.color).toBe('yellow');
    expect(r.label).toMatch(/3\/12 services/);
  });

  it('version Green + 2/12 services (17%) → Red (Sven shallow Helm consumer)', () => {
    const r = resolveTier(
      hybridTech(),
      item({
        version: '1.28',
        depth: 'working',
        selectedServices: ['s1', 's2'],
        checklistTouched: true,
      })
    );
    // 2/12 = 17% < 25% — Red tier; MIN(Green, Red) = Red.
    expect(r.color).toBe('red');
    expect(r.label).toMatch(/2\/12 services/);
  });

  it('version Yellow (legacy 1.25) + 11/12 services + deep + senior → Green via depth lift', () => {
    const r = resolveTier(
      hybridTech(),
      item({
        version: '1.25', // ≥ 1.24 Yellow tier (< 1.28 Good)
        depth: 'deep',
        selectedServices: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
        checklistTouched: true,
      }),
      { seniority: 'senior' }
    );
    // Combined base = Yellow (version drags); depth=deep lifts Yellow→Green.
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
    expect(r.depthDirection).toBe('lifted');
    expect(r.label).toMatch(/lifted from .* by depth/);
    expect(r.label).toMatch(/11\/12 services/);
  });

  it('version Yellow + 11/12 + reviewer scope → Yellow capped with cappedFromColor (Staff IC shape)', () => {
    const r = resolveTier(
      hybridTech(),
      item({
        version: '1.25', // Yellow tier
        depth: 'deep',
        selectedServices: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
        checklistTouched: true,
        scope: 'reviewer',
      }),
      { seniority: 'senior' }
    );
    // Yellow base + deep lift → Green; reviewer cap returns to Yellow with cappedFromColor=green.
    expect(r.color).toBe('yellow');
    expect(r.scopeCapped).toBe(true);
    expect(r.cappedFromColor).toBe('green');
    expect(r.label).toMatch(/capped from .* by reviewer scope/);
  });

  it('unknownVersion + services interacted → uses coverage only', () => {
    const r = resolveTier(
      hybridTech(),
      item({
        version: '',
        unknownVersion: true,
        selectedServices: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'],
        checklistTouched: true,
      })
    );
    // 8/12 = 67% → Green coverage; version unknown forces Yellow on version channel;
    // MIN(Yellow, Green) = Yellow.
    expect(r.color).toBe('yellow');
    expect(r.unknownVersion).toBe(true);
    expect(r.label).toMatch(/8\/12 services/);
  });

  it('checklistUnsure parks services-channel at Yellow', () => {
    const r = resolveTier(
      hybridTech(),
      item({ version: '1.30', depth: 'working', checklistUnsure: true })
    );
    // Version Green + services Yellow (unsure) = Yellow.
    expect(r.color).toBe('yellow');
  });

  // Note: K8s catalog wire-up assertion lives in `src/data/__tests__/integrity.test.ts`
  // (where TECH_BY_ID is already imported and the project's `noUncheckedSideEffectImports`
  // / `no-require` rules accept it).
});

describe('resolveTier — 9C tautological softener label (Pooja)', () => {
  it('softener on Yellow base label suppresses from-clause', () => {
    const r = resolveTier(versionTech(), item({ version: '17', lastUsed: '2022' }));
    expect(r.color).toBe('yellow');
    expect(r.recencyAdjusted).toBe(true);
    // Label = "Review / Probe (stale but defensible)" NOT "Review / Probe
    // (softened from Review / Probe — stale but defensible)".
    expect(r.label).toBe('Review / Probe (stale but defensible)');
  });

  it('softener on different base label still renders from-clause', () => {
    // Red → Yellow softener: baseLabel "Concern" != finalLabel "Review / Probe".
    // From-clause stays.
    const r = resolveTier(versionTech(), item({ version: '12', lastUsed: '2022' }));
    expect(r.color).toBe('yellow');
    expect(r.recencyAdjusted).toBe(true);
    expect(r.label).toMatch(/softened from Concern — stale but defensible/);
  });
});

/**
 * Round-7 7D (J1, Mei + Eitan): depth=shallow + seniority=junior LOWERS
 * tier by one (Green → Yellow, Yellow → Red). Pre-7D, depth never lowered;
 * a junior who barely uses TypeScript (shallow) read identical to a senior
 * library author on a Green version. Junior gate prevents over-correcting
 * mid/senior cases where shallow is the default. Direction is reflected in
 * the label ("lowered from Good by shallow depth").
 */
describe('resolveTier — 7D junior shallow lowers tier (J1)', () => {
  it('junior + shallow + Green version → Yellow (lowered)', () => {
    const r = resolveTier(versionTech(), item({ version: '19', depth: 'shallow' }), { seniority: 'junior' });
    expect(r.color).toBe('yellow');
    expect(r.depthAdjusted).toBe(true);
    expect(r.depthDirection).toBe('lowered');
    expect(r.label).toMatch(/lowered from .* by shallow depth/);
  });

  it('junior + shallow + Yellow → Red (lowered)', () => {
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'shallow' }), { seniority: 'junior' });
    expect(r.color).toBe('red');
    expect(r.depthAdjusted).toBe(true);
    expect(r.depthDirection).toBe('lowered');
  });

  it('junior + shallow + Red → stays Red (Red is the floor — no double-lower)', () => {
    const r = resolveTier(versionTech(), item({ version: '12', depth: 'shallow' }), { seniority: 'junior' });
    expect(r.color).toBe('red');
    expect(r.depthAdjusted).toBe(false);
  });

  it('mid + shallow → no lower (gate only on junior)', () => {
    const r = resolveTier(versionTech(), item({ version: '19', depth: 'shallow' }), { seniority: 'mid' });
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(false);
  });

  it('seniority undefined + shallow → no lower (back-compat preserved)', () => {
    const r = resolveTier(versionTech(), item({ version: '19', depth: 'shallow' }));
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(false);
  });

  it('junior + working → no lower (only shallow triggers)', () => {
    const r = resolveTier(versionTech(), item({ version: '19', depth: 'working' }), { seniority: 'junior' });
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(false);
  });

  it('junior + deep still LIFTS (deep/very-deep semantics unchanged for junior)', () => {
    const r = resolveTier(versionTech(), item({ version: '17', depth: 'deep' }), { seniority: 'junior' });
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(true);
    expect(r.depthDirection).toBe('lifted');
  });

  it('checklist mode unaffected by 7D (Fix A still holds — coverage IS the signal)', () => {
    // Junior + shallow + Green coverage should stay Green because checklist
    // mode doesn't call adjustForDepth (Fix A round-2). 7D doesn't reach it.
    const r = resolveTier(
      checklistTech(),
      item({
        selectedServices: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'svc-6', 'svc-7'],
        checklistTouched: true,
        depth: 'shallow',
      }),
      { seniority: 'junior' }
    );
    expect(r.color).toBe('green');
    expect(r.depthAdjusted).toBe(false);
  });
});
