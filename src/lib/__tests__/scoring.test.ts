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
      expect(r.label).toMatch(/capped — reviewer scope/);
    });

    it('scope=reviewer + Yellow version stays Yellow (no cap fires — already there)', () => {
      const r = resolveTier(versionTech(), item({ version: '17', depth: 'working', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(false);
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
      expect(r.label).toMatch(/capped — architect scope/);
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
      expect(r.label).toMatch(/capped — reviewer scope/);
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

    it('unknownVersion + scope=reviewer + meaningful depth → stays Yellow, no cap needed post-Fix-B', () => {
      // Pre-Fix-B: Yellow base + deep lifted to Green; reviewer scope capped back.
      // Post-Fix-B: no lift happens on unknown-version, so result is naturally
      // Yellow and the cap doesn't need to fire. Same final color, different path.
      const r = resolveTier(versionTech(), item({ version: '', depth: 'deep', scope: 'reviewer' }));
      expect(r.color).toBe('yellow');
      expect(r.scopeCapped).toBe(false);
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
