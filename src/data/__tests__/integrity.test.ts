import { describe, it, expect } from 'vitest';
import technologies from '../technologies.json';
import { ROLE_TEMPLATES } from '../roles';
import type { Technology } from '../../types';
import { looksLikeVersion } from '../../lib/version';

const TECHS = technologies as Technology[];
const TECH_BY_ID = new Map(TECHS.map(t => [t.id, t]));

describe('technologies.json — integrity', () => {
  it('every tech id is unique', () => {
    const ids = TECHS.map(t => t.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('every tech has a non-empty name and category', () => {
    for (const t of TECHS) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.category).toBeTruthy();
    }
  });

  it('checklist techs have ≥1 service and service ids are unique within each tech', () => {
    const checklistTechs = TECHS.filter(t => t.vetMode === 'checklist');
    expect(checklistTechs.length).toBeGreaterThan(0);
    for (const t of checklistTechs) {
      const services = t.services ?? [];
      expect(services.length, `${t.id} has no services`).toBeGreaterThan(0);
      const ids = services.map(s => s.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      expect(dupes, `${t.id} duplicate service ids`).toEqual([]);
    }
  });

  it('version-mode techs have ≥1 tier', () => {
    // currentVersion is display-only (never fed to compareVersions), so values
    // like Snowflake's "Current (rolling)" are intentional. Tier mins ARE used
    // in scoring — that parseability check lives in the next test.
    const versionTechs = TECHS.filter(t => t.vetMode !== 'checklist');
    for (const t of versionTechs) {
      const tiers = t.versionTiers ?? [];
      expect(tiers.length, `${t.id} has no tiers`).toBeGreaterThan(0);
    }
  });

  it('every version tier has color, label, and a parseable min', () => {
    const versionTechs = TECHS.filter(t => t.vetMode !== 'checklist');
    for (const t of versionTechs) {
      for (const tier of t.versionTiers ?? []) {
        expect(['green', 'yellow', 'red']).toContain(tier.color);
        expect(tier.label).toBeTruthy();
        expect(
          looksLikeVersion(tier.min),
          `${t.id} tier min=${tier.min} is not parseable`
        ).toBe(true);
      }
    }
  });
});

describe('roles.ts — integrity', () => {
  it('every role template id is unique', () => {
    const ids = ROLE_TEMPLATES.map(r => r.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('every role template techId resolves to a tech in the catalog', () => {
    for (const role of ROLE_TEMPLATES) {
      for (const techId of role.techIds) {
        expect(
          TECH_BY_ID.has(techId),
          `Role "${role.id}" references missing techId "${techId}"`
        ).toBe(true);
      }
    }
  });

  it('no role template has duplicate techIds', () => {
    for (const role of ROLE_TEMPLATES) {
      const dupes = role.techIds.filter((id, i) => role.techIds.indexOf(id) !== i);
      expect(dupes, `Role "${role.id}" has duplicate techIds`).toEqual([]);
    }
  });
});
