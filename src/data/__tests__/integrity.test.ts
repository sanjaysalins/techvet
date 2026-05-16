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

/**
 * Regression test for red-team item 1 (commit fd8935d / c115ea0).
 *
 * A prior catalog-refresh agent silently dropped `argocd` from the
 * DevOps template and `spark` from the Data Engineer template. The
 * existing "every techId resolves" test couldn't catch this because
 * the dropped IDs simply weren't there to validate.
 *
 * This snapshot pins each role's exact contents (sorted). If a future
 * edit drops, adds, or renames a tech in a role, this test will fail
 * with a clear diff. To intentionally change a template, update the
 * map below and the integrity layer is enforced again.
 */
describe('roles.ts — content snapshots (regression for red-team item 1)', () => {
  const EXPECTED_ROLE_TECHS: Record<string, string[]> = {
    fullstack: ['aws', 'docker', 'nodejs', 'postgresql', 'react', 'typescript'],
    frontend: ['nextjs', 'react', 'tailwind', 'typescript', 'vite'],
    backend: ['docker', 'kubernetes', 'nodejs', 'postgresql', 'python', 'redis'],
    'solution-architect': ['aws', 'kafka', 'kubernetes', 'postgresql', 'terraform'],
    devops: ['argocd', 'docker', 'github-actions', 'helm', 'kubernetes', 'observability', 'terraform'],
    sre: ['aws', 'go', 'helm', 'kubernetes', 'observability', 'python', 'terraform'],
    data: ['airflow', 'databricks', 'dbt', 'kafka', 'postgresql', 'python', 'spark', 'sql'],
    'data-scientist': ['databricks', 'jupyter', 'numpy', 'pandas', 'python', 'scikit-learn', 'sql'],
    'ai-ml': ['aws', 'docker', 'fastapi', 'huggingface-transformers', 'llm-api-sdk', 'pytorch', 'python', 'vector-db'],
    mobile: ['expo', 'flutter', 'kotlin', 'react-native', 'swift'],
    security: ['aws', 'docker', 'kubernetes', 'oauth-identity', 'observability', 'python', 'sql', 'terraform'],
    qa: ['cypress', 'github-actions', 'playwright', 'pytest', 'python', 'selenium', 'typescript', 'vitest'],
    custom: [],
  };

  it('every non-custom role still includes its expected techs', () => {
    for (const role of ROLE_TEMPLATES) {
      const expected = EXPECTED_ROLE_TECHS[role.id];
      expect(expected, `Role "${role.id}" is missing from EXPECTED_ROLE_TECHS — add it intentionally`).toBeDefined();
      const actual = [...role.techIds].sort();
      const expectedSorted = [...expected].sort();
      expect(
        actual,
        `Role "${role.id}" contents drifted — if intentional, update EXPECTED_ROLE_TECHS in this test`
      ).toEqual(expectedSorted);
    }
  });

  it('the set of role ids matches the expected snapshot', () => {
    const actualIds = ROLE_TEMPLATES.map(r => r.id).sort();
    const expectedIds = Object.keys(EXPECTED_ROLE_TECHS).sort();
    expect(actualIds).toEqual(expectedIds);
  });
});

/**
 * Regression test for red-team item 2 (commit c115ea0).
 *
 * A prior tier-recalibration agent set degenerate tier mins on
 * fast-moving projects (Hono, Astro, Vitest, Bun, k6, Pulumi) —
 * for example, Bun's Green tier-min was 1.0 when 1.3 was current
 * and 1.0 was already two majors old. The pre-existing "tier min
 * is parseable" check passed because 1.0 IS a parseable version.
 *
 * This pins the calibrated tier mins by color. If a future edit
 * drifts these (e.g. an agent "simplifies" the bands), the test
 * fails with a clear diff. Calibration is a deliberate act — to
 * change, update both this snapshot and the catalog entry.
 *
 * Reviewed against upstream releases on 2026-05-15:
 *   Hono v4.12, Astro v6.3, Vitest v4.1, Bun v1.3, k6 v2.0, Pulumi v3.239.
 */
describe('technologies.json — fast-mover tier snapshots (regression for red-team item 2)', () => {
  // [techId, expected mins by color in tier order]
  const EXPECTED_FAST_MOVER_TIERS: Array<[string, { green: string[]; yellow: string; red: string }]> = [
    ['hono',   { green: ['4.0', '3.0'],   yellow: '2.0',   red: '0' }],
    ['astro',  { green: ['5.0', '4.0'],   yellow: '3.0',   red: '0' }],
    ['vitest', { green: ['3.0', '2.0'],   yellow: '1.0',   red: '0' }],
    ['bun',    { green: ['1.2', '1.0'],   yellow: '0.8',   red: '0' }],
    ['k6',     { green: ['1.0', '0.55'],  yellow: '0.45',  red: '0' }],
    ['pulumi', { green: ['3.150', '3.50'], yellow: '3.0',  red: '0' }],
  ];

  for (const [techId, expected] of EXPECTED_FAST_MOVER_TIERS) {
    it(`${techId} has calibrated tier mins (Excellent ${expected.green[0]} / Good ${expected.green[1]} / Yellow ${expected.yellow})`, () => {
      const tech = TECH_BY_ID.get(techId);
      expect(tech, `${techId} missing from catalog`).toBeDefined();
      const tiers = tech!.versionTiers ?? [];
      const greens = tiers.filter(t => t.color === 'green').map(t => t.min);
      const yellows = tiers.filter(t => t.color === 'yellow').map(t => t.min);
      const reds = tiers.filter(t => t.color === 'red').map(t => t.min);

      expect(
        greens,
        `${techId} green tier mins drifted — if intentional, update this test`
      ).toEqual(expected.green);
      expect(yellows).toEqual([expected.yellow]);
      expect(reds).toEqual([expected.red]);
    });
  }
});

/**
 * Regression test for red-team Bug 4 (Docker tier degeneracy, surfaced by
 * Sam/DevOps + Tomas/Full-Stack sessions).
 *
 * The original Docker entry had only two Green tiers (`min:24` Excellent +
 * `min:0` Good) and no Yellow/Red — so any modern Docker version trivially
 * scored Excellent and the tool could not represent an outdated Docker setup.
 * The pre-existing "tier min is parseable" check passed because the tier
 * mins were valid; the tier *shape* was the bug.
 *
 * This test asserts the four-color shape. If the catalog re-collapses,
 * this fails with a clear diff. Also serves as a general "version-mode tech
 * should have all four colors" template (NOT enforced globally because some
 * techs deliberately omit Red for managed services).
 */
describe('technologies.json — Docker tier shape (regression for red-team Bug 4)', () => {
  it('Docker has a proper four-color tier shape (Green / Green / Yellow / Red)', () => {
    const docker = TECH_BY_ID.get('docker');
    expect(docker, 'docker missing from catalog').toBeDefined();
    const tiers = docker!.versionTiers ?? [];
    const colors = tiers.map(t => t.color);
    expect(colors).toContain('yellow');
    expect(colors).toContain('red');
    // Two Green bands (Excellent + Good) — drop down to Yellow before Red.
    expect(colors.filter(c => c === 'green').length).toBe(2);
    expect(colors.filter(c => c === 'yellow').length).toBe(1);
    expect(colors.filter(c => c === 'red').length).toBe(1);
  });
});

/**
 * Regression test for Fix J (2026-05-16 round-2 cross-cut Bug 3): version-mode
 * entries with a single tier at `min: "0"` produce a structural Green
 * rubber-stamp — `findTier` matches any digit input ≥ [0] → Green "Good."
 * Recruiter typing "1" or "8" or any digit → Green by accident. Snowflake was
 * the canonical case (Priya session); audit found GraphQL and gRPC had the
 * same shape. All three converted to checklist-mode where the catalog probes
 * already knew what to ask. This test prevents regression.
 */
describe('technologies.json — no single-tier `min: "0"` rubber-stamps (Fix J)', () => {
  it('no version-mode tech has a single tier with `min: "0"` (would Green-stamp any digit)', () => {
    const offenders: string[] = [];
    for (const t of TECHS) {
      if (t.vetMode === 'checklist') continue;
      const tiers = t.versionTiers ?? [];
      if (tiers.length === 1 && tiers[0].min === '0') {
        offenders.push(t.id);
      }
    }
    expect(
      offenders,
      `single-tier min:"0" entries produce structural Green rubber-stamps; convert to checklist-mode or add real tier bands`
    ).toEqual([]);
  });

  it('Snowflake is checklist-mode with curated services (post-Fix-J)', () => {
    const sf = TECH_BY_ID.get('snowflake');
    expect(sf, 'snowflake missing from catalog').toBeDefined();
    expect(sf!.vetMode).toBe('checklist');
    expect((sf!.services ?? []).length).toBeGreaterThanOrEqual(8);
    // Spot-check a few load-bearing services that the recruiter probes for.
    const serviceIds = new Set((sf!.services ?? []).map(s => s.id));
    expect(serviceIds.has('warehouses')).toBe(true);
    expect(serviceIds.has('snowpark')).toBe(true);
    expect(serviceIds.has('rbac-governance')).toBe(true);
  });

  it('GraphQL is checklist-mode with curated services (post-Fix-J audit)', () => {
    const gql = TECH_BY_ID.get('graphql');
    expect(gql, 'graphql missing from catalog').toBeDefined();
    expect(gql!.vetMode).toBe('checklist');
    expect((gql!.services ?? []).length).toBeGreaterThanOrEqual(8);
  });

  it('gRPC is checklist-mode with curated services (post-Fix-J audit)', () => {
    const grpc = TECH_BY_ID.get('grpc');
    expect(grpc, 'grpc missing from catalog').toBeDefined();
    expect(grpc!.vetMode).toBe('checklist');
    expect((grpc!.services ?? []).length).toBeGreaterThanOrEqual(8);
  });

  /**
   * Fix O (round-4 Bashir validation): LangChain was version-mode with
   * `min: "1.0"` Green — Bashir source-traced `scoring.ts:75` and
   * confirmed the `author` cap can't fire on a natural Green tier match
   * (cap requires `adjusted.adjusted === true`). Result: 6 weeks of
   * tutorials read as Senior GenAI Engineer because LangChain 1.x hit
   * the Green tier directly. Now checklist-mode with services that the
   * candidate must have actually exercised (LangGraph agents / RAG /
   * tool use / etc.). Same shape as Snowflake/GraphQL/gRPC under Fix J.
   */
  it('LangChain is checklist-mode with curated services (post-Fix-O)', () => {
    const lc = TECH_BY_ID.get('langchain');
    expect(lc, 'langchain missing from catalog').toBeDefined();
    expect(lc!.vetMode).toBe('checklist');
    expect((lc!.services ?? []).length).toBeGreaterThanOrEqual(8);
    // Spot-check the load-bearing services Bashir's recommendation called out.
    const serviceIds = new Set((lc!.services ?? []).map(s => s.id));
    expect(serviceIds.has('langgraph-agents')).toBe(true);
    expect(serviceIds.has('rag-retrieval')).toBe(true);
    expect(serviceIds.has('tool-use')).toBe(true);
    expect(serviceIds.has('evals-langsmith')).toBe(true);
  });
});

/**
 * Regression test for Fix K (round-2 cross-cut): AI/ML libraries all carry
 * `defaultScope: "author"` so the scope axis fires on phone calls where
 * the recruiter doesn't reach the dropdown. Without this default, every
 * AI/ML candidate's library work scored like operator (= depth-game earns
 * Green for tutorial-grade users — Vikram session).
 *
 * If a future agent adds an AI/ML library and forgets the default, the
 * cap silently disappears for that tech and the phone-screening failure
 * mode returns. This test fails loudly so the omission is intentional.
 */
describe('technologies.json — AI/ML libraries carry defaultScope=author (Fix K)', () => {
  it('every AI/ML category tech has defaultScope set to "author"', () => {
    const aimlTechs = TECHS.filter(t => t.category === 'AI/ML');
    expect(aimlTechs.length, 'AI/ML category empty — catalog drift').toBeGreaterThan(0);
    const missing = aimlTechs
      .filter(t => t.defaultScope !== 'author')
      .map(t => `${t.id} (defaultScope=${t.defaultScope ?? 'undefined'})`);
    expect(
      missing,
      `AI/ML libs without defaultScope=author let depth-game earn Green for tutorial-grade users — add "defaultScope": "author" to each, or intentionally remove from this guard if the lib should not default to author`
    ).toEqual([]);
  });
});

/**
 * Fix K2 (round-3 cross-cut): template-keyed scope defaults. Per Riya's
 * design, the recruiter's choice of role template IS a scope signal:
 * Solution Architect screening defaults to architect on the infra/DB
 * stack; Security screening defaults to reviewer on infra; SRE splits
 * cluster-build (reviewer) from workload-layer (operator-implied).
 *
 * The closest catch: every key in `techScopes` must be present in
 * `techIds`, otherwise the hint silently dies. This test fails loud.
 */
describe('roles.ts — techScopes integrity (Fix K2)', () => {
  it('every techScopes key is present in the role\'s techIds', () => {
    const orphans: string[] = [];
    for (const role of ROLE_TEMPLATES) {
      if (!role.techScopes) continue;
      const techIdSet = new Set(role.techIds);
      for (const key of Object.keys(role.techScopes)) {
        if (!techIdSet.has(key)) {
          orphans.push(`${role.id}: techScopes["${key}"] not in techIds`);
        }
      }
    }
    expect(
      orphans,
      'techScopes keys must match a tech in techIds — orphans dropped silently'
    ).toEqual([]);
  });

  it('Solution Architect template sets architect on all preloaded techs (Aaron round-3)', () => {
    const sa = ROLE_TEMPLATES.find(r => r.id === 'solution-architect');
    expect(sa, 'SA template missing').toBeDefined();
    expect(sa!.techScopes).toEqual({
      kubernetes: 'architect',
      terraform: 'architect',
      aws: 'architect',
      kafka: 'architect',
      postgresql: 'architect',
    });
  });

  it('SRE template sets reviewer on cluster-build (Terraform, AWS) only (Cara round-3)', () => {
    const sre = ROLE_TEMPLATES.find(r => r.id === 'sre');
    expect(sre, 'SRE template missing').toBeDefined();
    expect(sre!.techScopes).toEqual({
      terraform: 'reviewer',
      aws: 'reviewer',
    });
    // Workload-layer techs MUST stay unset so operator-implied default fires.
    const workloadLayer = ['kubernetes', 'helm', 'go', 'python', 'observability'];
    for (const tech of workloadLayer) {
      expect(
        sre!.techScopes![tech],
        `SRE workload-layer ${tech} should NOT have a scope hint — keep operator-implied`
      ).toBeUndefined();
    }
  });

  it('Security template sets reviewer on infra (AWS / K8s / Docker / Terraform / Observability) only (Tomi round-3)', () => {
    const sec = ROLE_TEMPLATES.find(r => r.id === 'security');
    expect(sec, 'Security template missing').toBeDefined();
    expect(sec!.techScopes).toEqual({
      aws: 'reviewer',
      kubernetes: 'reviewer',
      docker: 'reviewer',
      terraform: 'reviewer',
      observability: 'reviewer',
    });
    // Python/SQL/OAuth stay unset — AppSec engineers operate these.
    expect(sec!.techScopes!.python).toBeUndefined();
    expect(sec!.techScopes!.sql).toBeUndefined();
    expect(sec!.techScopes!['oauth-identity']).toBeUndefined();
  });

  it('templates without techScopes (full-stack, frontend, etc.) preserve pre-K2 behavior', () => {
    // Pin which templates intentionally don't have techScopes so future drift
    // is visible. If a template gains one, update this list.
    const noScopesYet = ['fullstack', 'frontend', 'backend', 'devops', 'data', 'data-scientist', 'ai-ml', 'mobile', 'qa', 'custom'];
    for (const id of noScopesYet) {
      const role = ROLE_TEMPLATES.find(r => r.id === id);
      expect(role, `${id} template missing`).toBeDefined();
      expect(
        role!.techScopes,
        `${id} template now has techScopes — if intentional, remove from this guard`
      ).toBeUndefined();
    }
  });
});
