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
    // Round-10 10C (Lina F4): nextjs + tailwind added — modern 2026 fullstack
    // is Next-first; both were already preloaded by Frontend template.
    fullstack: ['aws', 'docker', 'nextjs', 'nodejs', 'postgresql', 'react', 'tailwind', 'typescript'],
    frontend: ['nextjs', 'react', 'tailwind', 'typescript', 'vite'],
    backend: ['docker', 'kubernetes', 'nodejs', 'postgresql', 'python', 'redis'],
    'solution-architect': ['aws', 'azure', 'kafka', 'kubernetes', 'postgresql', 'terraform'],
    // Round-9 9E (Lars F2): Vault added — DevOps owns secrets management.
    devops: ['argocd', 'docker', 'github-actions', 'helm', 'kubernetes', 'observability', 'terraform', 'vault'],
    sre: ['aws', 'go', 'helm', 'kubernetes', 'observability', 'python', 'terraform'],
    // Round-8 8D (Pooja F1): Snowflake added as first-class preload — was in
    // catalog but invisible to the template, every Snowflake DE ate a search-add.
    data: ['airflow', 'databricks', 'dbt', 'kafka', 'postgresql', 'python', 'snowflake', 'spark', 'sql'],
    'data-scientist': ['databricks', 'jupyter', 'numpy', 'pandas', 'python', 'scikit-learn', 'sql'],
    'ai-ml': ['aws', 'docker', 'fastapi', 'huggingface-transformers', 'llm-api-sdk', 'pytorch', 'python', 'vector-db'],
    // Round-7 7F (Priya R3 + Kenji): single Mobile template split into 3
    // sub-templates so single-platform candidates don't dispatch 5
    // not-in-stack clicks.
    'mobile-android': ['jetpack-compose', 'kotlin'],
    'mobile-ios': ['swift', 'swiftui'],
    'mobile-cross-platform': ['expo', 'flutter', 'react-native'],
    security: [
      // Fix U (round-4): Security template now preloads actual security
      // tools alongside the infra reviewer-cap stack. If a future agent
      // removes any, update this snapshot AND the Security catalog audit
      // test below.
      'aws', 'burp-suite', 'docker', 'falco', 'kubernetes', 'oauth-identity',
      'observability', 'owasp-zap', 'python', 'semgrep', 'snyk', 'sql',
      'terraform', 'trivy', 'vault',
    ],
    // Round-9 9D (Akira F4): Selenium dropped from preload — recruiter adds
    // manually for legacy shops via search.
    qa: ['cypress', 'github-actions', 'playwright', 'pytest', 'python', 'typescript', 'vitest'],
    // Round-6 6F (Owen): new DBA template; preloads the SQL + Oracle
    // + Postgres + MySQL stack.
    'database-dba': ['mysql', 'oracle-db', 'plsql', 'postgresql', 'sql'],
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
 * Fix U (round-4 cross-cut, Wendy AppSec validation): Security catalog
 * overhaul. Pre-Fix-U the Security template was "back-end engineer with
 * OAuth probes wearing a security-template badge" — zero actual security
 * tools. Now 7 first-class checklist entries cover the most-named tools
 * from rounds 1, 3, and 4 (Diego/Tomi/Wendy).
 *
 * This test fails loudly if any of the 7 is removed without a deliberate
 * decision; same shape as the Fix J / Fix O integrity guards.
 */
describe('technologies.json — Security catalog (Fix U)', () => {
  const SECURITY_TECHS = ['vault', 'burp-suite', 'semgrep', 'trivy', 'snyk', 'owasp-zap', 'falco'];

  it('every Security catalog entry exists and is checklist-mode', () => {
    for (const id of SECURITY_TECHS) {
      const t = TECH_BY_ID.get(id);
      expect(t, `${id} missing from catalog (Fix U regression)`).toBeDefined();
      expect(t!.category, `${id} not in Security category`).toBe('Security');
      expect(t!.vetMode, `${id} should be checklist-mode`).toBe('checklist');
      expect(
        (t!.services ?? []).length,
        `${id} should have ≥8 curated services to separate name-dropped from operated`
      ).toBeGreaterThanOrEqual(8);
    }
  });

  it('Vault has the load-bearing service slice (Wendy round-4 case)', () => {
    const v = TECH_BY_ID.get('vault');
    expect(v).toBeDefined();
    const serviceIds = new Set((v!.services ?? []).map(s => s.id));
    expect(serviceIds.has('kv-secrets')).toBe(true);
    expect(serviceIds.has('dynamic-secrets')).toBe(true);
    expect(serviceIds.has('pki-ca')).toBe(true);
    expect(serviceIds.has('audit-siem')).toBe(true);
  });

  it('Security category appears in the catalog with ≥7 entries', () => {
    const sec = TECHS.filter(t => t.category === 'Security');
    expect(sec.length).toBeGreaterThanOrEqual(7);
  });
});

/**
 * Round-4 Owen session (post-Bug-4 + Backend-template-techScopes batch):
 * cloud-provider catalog entries (AWS / Azure / GCP) must carry
 * `defaultScope: "operator"`. Without this the Eitan/Owen SE→dev
 * internal-transfer shape can name-drop 10 AWS services from non-
 * operator context and the chip stays "Not specified" instead of
 * making the operator claim explicit. Per-template techScopes can't
 * close this (Backend doesn't preload aws/azure/gcp), so the catalog
 * entry IS the defense.
 */
describe('technologies.json — Cloud providers carry defaultScope=operator', () => {
  it('every Cloud category tech has defaultScope set to "operator"', () => {
    const cloud = TECHS.filter(t => t.category === 'Cloud');
    expect(cloud.length, 'Cloud category empty').toBeGreaterThan(0);
    const missing = cloud
      .filter(t => t.defaultScope !== 'operator')
      .map(t => `${t.id} (defaultScope=${t.defaultScope ?? 'undefined'})`);
    expect(
      missing,
      'Cloud providers without defaultScope=operator silently fail the Eitan/Owen SE-rattle guard — make the operator claim explicit on the chip'
    ).toEqual([]);
  });
});

/**
 * Round-4 (Helena/Wendy/Owen "AWS role-blind"): per-service tags so role
 * templates can surface different subsets. Tests pin both the catalog
 * side (every AWS service has tags) and the template side (filters
 * reference valid tags that exist on at least one service).
 */
describe('technologies.json — AWS role-aware service tags', () => {
  const VALID_AWS_TAGS = new Set(['general', 'architect', 'security', 'cicd', 'container', 'data-ml']);

  it('every AWS service has a non-empty `tags` array', () => {
    const aws = TECH_BY_ID.get('aws');
    expect(aws, 'aws missing from catalog').toBeDefined();
    const missing = (aws!.services ?? [])
      .filter(s => !s.tags || s.tags.length === 0)
      .map(s => s.id);
    expect(
      missing,
      'AWS services without tags would always show regardless of template filter — defeats role-aware filtering'
    ).toEqual([]);
  });

  it('AWS service tags are drawn from the canonical set (catches typos)', () => {
    const aws = TECH_BY_ID.get('aws')!;
    const offenders: string[] = [];
    for (const s of aws.services ?? []) {
      for (const tag of s.tags ?? []) {
        if (!VALID_AWS_TAGS.has(tag)) {
          offenders.push(`${s.id}: unknown tag "${tag}"`);
        }
      }
    }
    expect(
      offenders,
      `AWS service tags must be one of: ${[...VALID_AWS_TAGS].join(', ')}`
    ).toEqual([]);
  });

  it('AWS includes the canonical round-4 service slice (Helena/Wendy/Owen named)', () => {
    const aws = TECH_BY_ID.get('aws')!;
    const ids = new Set((aws.services ?? []).map(s => s.id));
    // Architect (Helena)
    expect(ids.has('landing-zone')).toBe(true);
    expect(ids.has('organizations')).toBe(true);
    expect(ids.has('iam-identity-center')).toBe(true);
    // Security (Wendy)
    expect(ids.has('kms')).toBe(true);
    expect(ids.has('macie')).toBe(true);
    expect(ids.has('guardduty')).toBe(true);
    expect(ids.has('security-hub')).toBe(true);
    expect(ids.has('inspector')).toBe(true);
    // CI/CD (Owen)
    expect(ids.has('codebuild')).toBe(true);
    expect(ids.has('codepipeline')).toBe(true);
    // Data/ML (Vikram round-3)
    expect(ids.has('sagemaker')).toBe(true);
    expect(ids.has('bedrock')).toBe(true);
  });
});

describe('roles.ts — serviceTagFilters integrity (round-4 AWS role-aware)', () => {
  const VALID_AWS_TAGS = new Set(['general', 'architect', 'security', 'cicd', 'container', 'data-ml']);

  it('every serviceTagFilters entry uses valid tags (filter can target techs added manually mid-call too, not just preloaded)', () => {
    // Note: serviceTagFilters intentionally applies to techs the recruiter
    // adds *during* the call too (e.g. DevOps template doesn't preload aws
    // but if the recruiter adds it, the cicd+container filter should still
    // apply). So we only validate tag well-formedness here, not techIds
    // membership.
    const offenders: string[] = [];
    for (const role of ROLE_TEMPLATES) {
      if (!role.serviceTagFilters) continue;
      for (const [techId, tags] of Object.entries(role.serviceTagFilters)) {
        if (techId === 'aws') {
          for (const tag of tags ?? []) {
            if (!VALID_AWS_TAGS.has(tag)) {
              offenders.push(`${role.id}: aws filter has unknown tag "${tag}"`);
            }
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it('Solution Architect surfaces architect + security + general AWS services (round-5 5β added security tag for fin-services SA archetype)', () => {
    const sa = ROLE_TEMPLATES.find(r => r.id === 'solution-architect');
    expect(sa?.serviceTagFilters?.aws).toEqual(['general', 'architect', 'security']);
  });

  it('Security template surfaces security + general AWS services', () => {
    const sec = ROLE_TEMPLATES.find(r => r.id === 'security');
    expect(sec?.serviceTagFilters?.aws).toEqual(['general', 'security']);
  });

  it('AI / ML template surfaces data-ml + container + general AWS services (Vikram SageMaker case)', () => {
    const aiml = ROLE_TEMPLATES.find(r => r.id === 'ai-ml');
    expect(aiml?.serviceTagFilters?.aws).toEqual(['general', 'data-ml', 'container']);
  });
});

/**
 * Fix D4 (round-1+3+4): methodology chip catalogs per template. Required
 * for templates whose round-1/3/4 sessions explicitly named the gap.
 * Free-text fallback covers the long tail.
 */
describe('roles.ts — methodology chip catalogs (Fix D4)', () => {
  // Templates that MUST have methodology chips per round 1/3/4 evidence.
  // (Backend / Full-Stack / Frontend / Mobile / Custom get the free-text
  // input only — methodology surface is less role-defining there.)
  const REQUIRED_CHIP_TEMPLATES = [
    'solution-architect',
    'devops',
    'sre',
    'data',
    'data-scientist',
    'ai-ml',
    'security',
    'qa',
  ];

  it('every required template carries methodologyChips with ≥4 entries', () => {
    for (const id of REQUIRED_CHIP_TEMPLATES) {
      const role = ROLE_TEMPLATES.find(r => r.id === id);
      expect(role, `${id} template missing`).toBeDefined();
      const chips = role!.methodologyChips ?? [];
      expect(
        chips.length,
        `${id} template needs ≥4 methodology chips (round-1+3+4 evidence: senior IC differentiation lives in methodology)`
      ).toBeGreaterThanOrEqual(4);
    }
  });

  it('methodology chip ids are unique within a template', () => {
    for (const role of ROLE_TEMPLATES) {
      if (!role.methodologyChips) continue;
      const ids = role.methodologyChips.map(c => c.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      expect(dupes, `${role.id} methodology chip id collisions`).toEqual([]);
    }
  });

  it('methodology chip ids are stable slugs (no spaces; lowercase + hyphens only)', () => {
    const slugRe = /^[a-z0-9-]+$/;
    const offenders: string[] = [];
    for (const role of ROLE_TEMPLATES) {
      for (const chip of role.methodologyChips ?? []) {
        if (!slugRe.test(chip.id)) {
          offenders.push(`${role.id}: chip id "${chip.id}" must be lowercase + hyphens (stable id)`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it('Data Scientist surfaces the 4 causal-inference primitives + Bayesian + A/B (round-5 5η: chip split from aggregated label)', () => {
    const ds = ROLE_TEMPLATES.find(r => r.id === 'data-scientist');
    const ids = new Set((ds?.methodologyChips ?? []).map(c => c.id));
    // 4 separate causal-inference chips (was 1 aggregated `causal-inference`)
    expect(ids.has('difference-in-differences')).toBe(true);
    expect(ids.has('instrumental-variables')).toBe(true);
    expect(ids.has('regression-discontinuity')).toBe(true);
    expect(ids.has('propensity-scoring')).toBe(true);
    // The other DS pillars still present
    expect(ids.has('bayesian-inference')).toBe(true);
    expect(ids.has('ab-testing')).toBe(true);
    // Pre-5η aggregated id is gone
    expect(ids.has('causal-inference')).toBe(false);
  });

  it('SRE surfaces SLOs + error budgets (Robin/Cara canonical case)', () => {
    const sre = ROLE_TEMPLATES.find(r => r.id === 'sre');
    const ids = new Set((sre?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('slos-slis')).toBe(true);
    expect(ids.has('error-budgets')).toBe(true);
  });

  it('Security surfaces STRIDE + OWASP + SLSA (Tomi/Wendy canonical case)', () => {
    const sec = ROLE_TEMPLATES.find(r => r.id === 'security');
    const ids = new Set((sec?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('stride-threat-modeling')).toBe(true);
    expect(ids.has('owasp-top-10')).toBe(true);
    expect(ids.has('slsa-supply-chain')).toBe(true);
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
  it('every AI/ML LIBRARY (not MLOps platform tool) has defaultScope set to "author"', () => {
    // Round-11 (Esme R9 catalog adds): MLOps PLATFORM tools (Braintrust /
    // Evidently / Feast / Langfuse) are operator-shape, NOT library-author
    // shape. Esme uses them as production services (dashboards / SDKs /
    // managed infrastructure), not as libraries she authors against. They
    // belong in the AI/ML category for discoverability (recruiters
    // searching AI/ML candidates need to find them) but the author-default
    // would misframe them. Listed below as intentional `defaultScope:
    // 'operator'` exceptions.
    const MLOPS_OPERATOR_TOOLS = new Set(['braintrust', 'evidently-ai', 'feast', 'langfuse']);
    const aimlTechs = TECHS.filter(t => t.category === 'AI/ML');
    expect(aimlTechs.length, 'AI/ML category empty — catalog drift').toBeGreaterThan(0);
    const missing = aimlTechs
      .filter(t => !MLOPS_OPERATOR_TOOLS.has(t.id))
      .filter(t => t.defaultScope !== 'author')
      .map(t => `${t.id} (defaultScope=${t.defaultScope ?? 'undefined'})`);
    expect(
      missing,
      `AI/ML libs without defaultScope=author let depth-game earn Green for tutorial-grade users — add "defaultScope": "author" to each, or intentionally add to MLOPS_OPERATOR_TOOLS set above if the entry is an operator-shape platform tool.`
    ).toEqual([]);
    // Belt-and-braces: the exception list members all exist + carry operator.
    for (const id of MLOPS_OPERATOR_TOOLS) {
      const tech = TECHS.find(t => t.id === id);
      expect(tech, `${id} missing from catalog — exception list stale`).toBeDefined();
      expect(tech!.defaultScope, `${id} should be operator (in MLOPS_OPERATOR_TOOLS exception list)`).toBe('operator');
    }
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

  it('Solution Architect template sets architect on all preloaded techs (Aaron round-3 + round-5 5δ added Azure)', () => {
    const sa = ROLE_TEMPLATES.find(r => r.id === 'solution-architect');
    expect(sa, 'SA template missing').toBeDefined();
    expect(sa!.techScopes).toEqual({
      kubernetes: 'architect',
      terraform: 'architect',
      aws: 'architect',
      azure: 'architect',
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
    // Round-8 8D (Pooja F4): `data` template gained techScopes (postgresql + kafka
    // as reviewer — DE consumes upstream sources rather than operates them).
    // Round-9 9A (Esme): `ai-ml` template gained techScopes (pytorch / llm-api-sdk
    // / vector-db as operator — productionization-shape override of catalog
    // author defaults; huggingface-transformers intentionally left at default).
    const noScopesYet = ['fullstack', 'frontend', 'backend', 'devops', 'data-scientist', 'mobile-android', 'mobile-ios', 'mobile-cross-platform', 'qa', 'custom', 'database-dba'];
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

/**
 * Round-6 6F: catalog + template refresh closing Owen (DBA) and Priya
 * (Mobile) gaps. Pin the new catalog entries and template additions so
 * a future agent who renames or drops them has to update this guard
 * intentionally.
 */
describe('Round-6 6F — Mobile + DBA catalog/template additions', () => {
  it('Oracle Database catalog entry exists and is checklist-mode with ≥10 services', () => {
    const t = TECH_BY_ID.get('oracle-db');
    expect(t, 'oracle-db missing — DBA template would lose its anchor tech').toBeDefined();
    expect(t!.vetMode).toBe('checklist');
    expect(t!.services?.length ?? 0).toBeGreaterThanOrEqual(10);
    // Load-bearing services for an Oracle DBA — RMAN + Data Guard + RAC
    // are the canonical "you operate this in prod" signal cluster.
    const ids = new Set((t!.services ?? []).map(s => s.id));
    expect(ids.has('rman-backup')).toBe(true);
    expect(ids.has('data-guard-ha')).toBe(true);
    expect(ids.has('rac-clustering')).toBe(true);
    expect(t!.enterpriseStillUsed).toBe(true);
  });

  it('PL/SQL catalog entry exists and is checklist-mode with ≥8 services', () => {
    const t = TECH_BY_ID.get('plsql');
    expect(t, 'plsql missing').toBeDefined();
    expect(t!.vetMode).toBe('checklist');
    expect(t!.services?.length ?? 0).toBeGreaterThanOrEqual(8);
    expect(t!.category).toBe('Language');
  });

  it('Jetpack Compose catalog entry exists and is checklist-mode with ≥10 services', () => {
    const t = TECH_BY_ID.get('jetpack-compose');
    expect(t, 'jetpack-compose missing — Mobile template would lose its modern Android anchor').toBeDefined();
    expect(t!.vetMode).toBe('checklist');
    expect(t!.services?.length ?? 0).toBeGreaterThanOrEqual(10);
    expect(t!.category).toBe('Mobile');
  });

  it('SwiftUI catalog entry exists and is checklist-mode with ≥8 services', () => {
    const t = TECH_BY_ID.get('swiftui');
    expect(t, 'swiftui missing').toBeDefined();
    expect(t!.vetMode).toBe('checklist');
    expect(t!.services?.length ?? 0).toBeGreaterThanOrEqual(8);
    expect(t!.category).toBe('Mobile');
  });

  it('Round-7 7F: Mobile-Android sub-template preloads Jetpack Compose + Kotlin (closes Priya stack-chooser finding)', () => {
    const android = ROLE_TEMPLATES.find(r => r.id === 'mobile-android');
    expect(android?.techIds).toContain('jetpack-compose');
    expect(android?.techIds).toContain('kotlin');
    expect(android?.methodologyChips?.length ?? 0).toBeGreaterThanOrEqual(4);
  });

  it('Round-7 7F: Mobile-iOS sub-template preloads SwiftUI + Swift + iOS-shaped chips (closes Kenji finding)', () => {
    const ios = ROLE_TEMPLATES.find(r => r.id === 'mobile-ios');
    expect(ios?.techIds).toContain('swift');
    expect(ios?.techIds).toContain('swiftui');
    // Load-bearing iOS-canonical chips Kenji named (MVVM-C / snapshot
    // testing / VoiceOver) that the old generic Mobile chip-set missed.
    const ids = new Set((ios?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('mvvm-c-coordinator')).toBe(true);
    expect(ids.has('snapshot-testing-ios')).toBe(true);
    expect(ids.has('voiceover-dynamic-type')).toBe(true);
  });

  it('Round-7 7F: Mobile-Cross-Platform sub-template preloads RN + Expo + Flutter', () => {
    const xplat = ROLE_TEMPLATES.find(r => r.id === 'mobile-cross-platform');
    expect(xplat?.techIds).toContain('react-native');
    expect(xplat?.techIds).toContain('expo');
    expect(xplat?.techIds).toContain('flutter');
    expect(xplat?.methodologyChips?.length ?? 0).toBeGreaterThanOrEqual(4);
  });

  it('Round-8 8C: Mobile-Cross-Platform chips include OTA + two-store, drop wrong-axis KMP (Diego F2-F4)', () => {
    const xplat = ROLE_TEMPLATES.find(r => r.id === 'mobile-cross-platform');
    const ids = new Set((xplat?.methodologyChips ?? []).map(c => c.id));
    // Load-bearing 2026 cross-platform methodologies a senior demonstrates.
    // If a future agent reverts to the round-7 chip-set, Diego's failure
    // mode (free-texts OTA and two-store because chips don't fit) returns.
    expect(ids.has('ota-update-governance')).toBe(true);
    expect(ids.has('two-store-release-coordination')).toBe(true);
    // Wrong-axis competing-framework chip removed.
    expect(ids.has('code-sharing-strategy')).toBe(false);
    // Renamed away from RN-specific "JS thread budget" terminology.
    expect(ids.has('native-bridge-perf')).toBe(false);
  });

  it('Frontend template carries ≥4 methodologyChips (closes Maya/Mei chip-absent finding)', () => {
    const fe = ROLE_TEMPLATES.find(r => r.id === 'frontend');
    expect(fe?.methodologyChips?.length ?? 0).toBeGreaterThanOrEqual(4);
  });

  it('Round-8 8E: Frontend chips swap progressive-enhancement → bundle-size-budgets (Maya M1)', () => {
    const fe = ROLE_TEMPLATES.find(r => r.id === 'frontend');
    const ids = new Set((fe?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('bundle-size-budgets')).toBe(true);
    expect(ids.has('progressive-enhancement')).toBe(false);
  });

  it('Round-8 8D: Data Engineer template preloads Snowflake + has DE techScopes + 2026 senior-DE chips (Pooja F1/F2/F4)', () => {
    const de = ROLE_TEMPLATES.find(r => r.id === 'data');
    expect(de?.techIds).toContain('snowflake');
    expect(de?.techScopes?.postgresql).toBe('reviewer');
    expect(de?.techScopes?.kafka).toBe('reviewer');
    const ids = new Set((de?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('data-lineage-openlineage')).toBe(true);
    expect(ids.has('cdc-discipline')).toBe(true);
    // Niche/redundant chips dropped to free chip-set room.
    expect(ids.has('slowly-changing-dims')).toBe(false);
    expect(ids.has('data-lakehouse')).toBe(false);
  });

  it('Round-9 9A: AI/ML template overrides catalog author-default scope for productionization (Esme F1)', () => {
    const aiml = ROLE_TEMPLATES.find(r => r.id === 'ai-ml');
    expect(aiml?.techScopes?.pytorch).toBe('operator');
    expect(aiml?.techScopes?.['llm-api-sdk']).toBe('operator');
    expect(aiml?.techScopes?.['vector-db']).toBe('operator');
    // huggingface-transformers intentionally left at catalog default (author)
    // because productionization candidates routinely author fine-tuning loops.
    expect(aiml?.techScopes?.['huggingface-transformers']).toBeUndefined();
  });

  it('Round-9 9D: QA template ships 8 chips with Selenium de-preloaded (Akira F1-F4)', () => {
    const qa = ROLE_TEMPLATES.find(r => r.id === 'qa');
    expect(qa?.techIds).not.toContain('selenium');
    const ids = new Set((qa?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('perf-regression-gates')).toBe(true);
    expect(ids.has('load-testing-discipline')).toBe(true);
    expect(ids.has('visual-regression-qa')).toBe(true);
    expect(ids.has('test-data-management')).toBe(true);
    // Niche chip dropped.
    expect(ids.has('mutation-testing')).toBe(false);
    // Round-9 9D ships 8 chips (up from 6) — chip-set is QA-specific so
    // the slight chip-count inflation is fine; the cap is 6 ONLY when the
    // chip-set risks pressure-to-fill, which is a junior-shape concern.
    expect((qa?.methodologyChips ?? []).length).toBe(8);
  });

  it('Round-9 9E: DevOps template preloads Vault (Lars F2)', () => {
    const devops = ROLE_TEMPLATES.find(r => r.id === 'devops');
    expect(devops?.techIds).toContain('vault');
  });

  it('Round-10 10A: Fullstack template ships 6 methodologyChips (Lina F1)', () => {
    const fs = ROLE_TEMPLATES.find(r => r.id === 'fullstack');
    expect(fs?.methodologyChips?.length ?? 0).toBe(6);
    const ids = new Set((fs?.methodologyChips ?? []).map(c => c.id));
    // Reused from Backend (7A): feature-flags / trunk-based via DevOps /
    // contract-testing / otel-instrumentation. Reused from FE (6F): a11y-wcag.
    // New: design-system-discipline (vs FE's design-system-ownership).
    expect(ids.has('feature-flags')).toBe(true);
    expect(ids.has('trunk-based')).toBe(true);
    expect(ids.has('contract-testing')).toBe(true);
    expect(ids.has('otel-instrumentation')).toBe(true);
    expect(ids.has('a11y-wcag')).toBe(true);
    expect(ids.has('design-system-discipline')).toBe(true);
  });

  it('Round-10 10C: Fullstack template preloads nextjs + tailwind (Lina F4)', () => {
    const fs = ROLE_TEMPLATES.find(r => r.id === 'fullstack');
    expect(fs?.techIds).toContain('nextjs');
    expect(fs?.techIds).toContain('tailwind');
  });

  it('Round-10 10B: AWS catalog includes Cognito (Lina F2)', () => {
    const aws = TECH_BY_ID.get('aws');
    const ids = new Set((aws?.services ?? []).map(s => s.id));
    expect(ids.has('cognito-user-pool')).toBe(true);
  });

  /**
   * Round-11 catalog refresh: 13 new catalog entries close the named-only
   * frontier surfaced across rounds 8-10. DevOps (6) + AI/ML (4) + QA (2) +
   * Apple (1). If a future agent removes or renames any, the round-9/10
   * personas (Lars / Akira / Esme / Kenji) regress to dispatching named-only
   * for canonical 2026-vocabulary tools.
   */
  it('Round-11 catalog: DevOps 2026-vocabulary entries shipped (Lars rounds 9-10)', () => {
    for (const id of ['argo-rollouts', 'karpenter', 'backstage', 'unleash', 'crossplane', 'cosign-sigstore']) {
      const tech = TECH_BY_ID.get(id);
      expect(tech, `${id} missing — DevOps catalog vocabulary gap`).toBeDefined();
      expect(tech!.vetMode).toBe('checklist');
      expect((tech!.services ?? []).length).toBeGreaterThanOrEqual(6);
      expect(tech!.category).toBe('DevOps');
    }
  });

  it('Round-11 catalog: AI/ML productionization platform tools shipped (Esme round 9 F3)', () => {
    for (const id of ['braintrust', 'evidently-ai', 'feast', 'langfuse']) {
      const tech = TECH_BY_ID.get(id);
      expect(tech, `${id} missing — MLOps platform-tool catalog gap`).toBeDefined();
      expect(tech!.vetMode).toBe('checklist');
      expect((tech!.services ?? []).length).toBeGreaterThanOrEqual(6);
      // Operator-shape per round-9 design — these are platform tools, not libraries.
      expect(tech!.defaultScope).toBe('operator');
      expect(tech!.category).toBe('AI/ML');
    }
  });

  it('Round-11 catalog: Pact + Cucumber QA testing entries shipped (Akira round 9)', () => {
    const pact = TECH_BY_ID.get('pact');
    expect(pact, 'pact missing — Akira contract-testing named-only').toBeDefined();
    expect(pact!.vetMode).toBe('checklist');
    expect((pact!.services ?? []).length).toBeGreaterThanOrEqual(6);

    const cucumber = TECH_BY_ID.get('cucumber');
    expect(cucumber, 'cucumber missing — BDD catalog gap').toBeDefined();
    expect(cucumber!.versionTiers, 'cucumber should be version-mode').toBeDefined();
    expect((cucumber!.versionTiers ?? []).length).toBeGreaterThanOrEqual(3);
  });

  it('Round-12: Kubernetes is hybrid mode with version tiers AND services (Sven R5 + Lars R9-10)', () => {
    // K8s converted from version-mode-only to hybrid mode so Helm-consumers
    // (Sven shape) get a services-channel verdict and deep-platform-engineers
    // (Lars shape) still get the version-tier signal. If a future agent
    // reverts vetMode, both personas lose half their honest signal.
    const k8s = TECH_BY_ID.get('kubernetes');
    expect(k8s, 'kubernetes missing — catalog drift').toBeDefined();
    expect(k8s!.vetMode, 'K8s must be hybrid (Round-12 Sven R5 ship)').toBe('hybrid');
    expect((k8s!.services ?? []).length, 'K8s hybrid needs ≥10 services for coverage signal').toBeGreaterThanOrEqual(10);
    expect((k8s!.versionTiers ?? []).length, 'K8s hybrid keeps version tiers').toBeGreaterThanOrEqual(3);
    // Load-bearing services per Sven (Helm consumer) + Lars (operator).
    const serviceIds = new Set((k8s!.services ?? []).map(s => s.id));
    expect(serviceIds.has('workloads')).toBe(true);
    expect(serviceIds.has('rbac')).toBe(true);
    expect(serviceIds.has('networking')).toBe(true);
  });

  it('Round-11 catalog: UIKit shipped for iOS migration shops (Kenji rounds 7-8 deferred)', () => {
    const uikit = TECH_BY_ID.get('uikit');
    expect(uikit, 'uikit missing — Kenji migration-shop named-only').toBeDefined();
    expect(uikit!.vetMode).toBe('checklist');
    expect(uikit!.category).toBe('Mobile');
    expect(uikit!.enterpriseStillUsed).toBe(true);
    const ids = new Set((uikit!.services ?? []).map(s => s.id));
    // Load-bearing migration-shop services per Kenji's round-7 finding.
    expect(ids.has('swiftui-interop')).toBe(true);
    expect(ids.has('accessibility')).toBe(true);
  });

  it('Round-7 7A: Backend template carries ≥4 methodologyChips (closes Sven 6F deferral mistake)', () => {
    const be = ROLE_TEMPLATES.find(r => r.id === 'backend');
    expect(be?.methodologyChips?.length ?? 0).toBeGreaterThanOrEqual(4);
    // Load-bearing senior-backend signals — if a future agent strips these,
    // the Sven misfire returns.
    const ids = new Set((be?.methodologyChips ?? []).map(c => c.id));
    expect(ids.has('contract-testing')).toBe(true);
    expect(ids.has('otel-instrumentation')).toBe(true);
    expect(ids.has('idempotency-keys')).toBe(true);
  });

  it('Database / DBA template exists, preloads the Oracle stack + SQL, carries methodologyChips', () => {
    const dba = ROLE_TEMPLATES.find(r => r.id === 'database-dba');
    expect(dba, 'database-dba template missing — Owen-shape recruiter loses the template anchor').toBeDefined();
    expect(dba!.techIds).toContain('oracle-db');
    expect(dba!.techIds).toContain('plsql');
    expect(dba!.techIds).toContain('sql');
    expect(dba!.methodologyChips?.length ?? 0).toBeGreaterThanOrEqual(4);
  });

  it('Round-7 7E: modern-default entries do NOT carry root-level enterpriseStillUsed', () => {
    // Sven's round-7 bonus: the flag fires the "Still widely used in
    // enterprise" reassurance, which mis-frames K8s 1.30 / Kotlin 2.x /
    // Swift 6.x / RN 0.85 / Terraform 1.15 / Docker 29 as legacy when
    // they're the modern default. If a future agent re-adds the flag,
    // the wrong reassurance returns.
    const modernDefaults = ['kubernetes', 'kotlin', 'swift', 'react-native', 'terraform', 'docker'];
    for (const id of modernDefaults) {
      const tech = TECH_BY_ID.get(id);
      expect(tech, `${id} missing from catalog`).toBeDefined();
      expect(
        tech!.enterpriseStillUsed,
        `${id} re-added enterpriseStillUsed root flag — re-introduces Sven's 7E misfire`
      ).toBeFalsy();
    }
  });
});
