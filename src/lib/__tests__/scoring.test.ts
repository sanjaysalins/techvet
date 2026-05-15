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
