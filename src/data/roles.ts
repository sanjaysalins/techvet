import type { MethodologyChip, Scope } from '../types';

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  techIds: string[];
  /** Fix K2 (round-3 cross-cut): per-template scope hints. Applied at
   *  template-pick time as the explicit scope on each preloaded item —
   *  the recruiter's choice of template IS a scope signal. Example: SA
   *  template applies `architect` to all preloaded infra/DB techs so a
   *  Solution Architect screening doesn't quietly get the same Excellent
   *  verdicts an operator would. Keys must be in `techIds`. Templates
   *  without `techScopes` (or specific techs without an entry) fall
   *  through to catalog `defaultScope` (Fix K) and then to operator-
   *  implied — pre-K2 behavior preserved. */
  techScopes?: Partial<Record<string, Scope>>;
  /** Round-4 (Helena/Wendy/Owen "AWS role-blind"): per-tech checklist
   *  service-tag filters. Map of techId → array of tags to surface. When
   *  set, the TechCard's checklist only shows services whose `tags`
   *  array intersects with the filter. Services without `tags` always
   *  show (untagged = universally relevant). Example: SA template
   *  filters AWS to `['general', 'architect']` so Landing Zone /
   *  Organizations appear and CodeBuild / SageMaker don't clutter the
   *  list. Custom + untagged templates: no filter, all services shown. */
  serviceTagFilters?: Partial<Record<string, string[]>>;
  /** Fix D4 (round-1+3+4): curated methodology / practice chips shown on
   *  the Assessment screen for this template. Recruiter clicks to add;
   *  free-text input handles the long tail. Display-only on the report
   *  (no scoring impact in v1). Templates without `methodologyChips` get
   *  the free-text input only. */
  methodologyChips?: MethodologyChip[];
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Developer',
    description: 'Frontend + backend with cloud deployment.',
    techIds: ['react', 'typescript', 'nodejs', 'postgresql', 'docker', 'aws'],
    serviceTagFilters: { aws: ['general', 'cicd'] },
  },
  {
    id: 'frontend',
    name: 'Frontend Engineer',
    description: 'Web UI specialist (React, modern tooling).',
    techIds: ['react', 'typescript', 'nextjs', 'tailwind', 'vite'],
    // Round-6 6F (Mei round-6 + Maya round-1): frontend candidates carry
    // signal beyond library versions — performance budgets, a11y discipline,
    // design-system ownership. Chips give the recruiter a 30-second way to
    // capture senior FE signal without typing.
    methodologyChips: [
      { id: 'a11y-wcag', label: 'Accessibility (WCAG 2.x)' },
      { id: 'core-web-vitals', label: 'Core Web Vitals / performance budgets' },
      { id: 'design-system-ownership', label: 'Design system ownership' },
      { id: 'rsc-ssr', label: 'RSC / SSR / streaming patterns' },
      { id: 'progressive-enhancement', label: 'Progressive enhancement' },
      { id: 'visual-regression', label: 'Visual regression testing' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Engineer',
    description: 'API and services specialist.',
    techIds: ['nodejs', 'python', 'postgresql', 'redis', 'docker', 'kubernetes'],
    // Backend template doesn't preload aws/azure/gcp (recruiter adds
    // them manually mid-call) so a per-template techScopes map can't
    // reach them. The Eitan/Owen SE→dev AWS-over-rate failure is
    // defended catalog-side: aws/azure/gcp carry `defaultScope:
    // "operator"` so the scope is explicit on the chip the moment the
    // recruiter adds them — regardless of which template they're under.
    // Round-5 5γ (Margarethe): serviceTagFilters applies to manually-
    // added techs too, so 'general' on AWS gives Backend candidates
    // the standard service set (~10) rather than the full 26.
    serviceTagFilters: { aws: ['general'] },
    // Round-7 7A (Sven): 6F deferred Backend chips on the assumption
    // that 6B's free-text fallback would cover it. Sven exposed that
    // the hint copy lists Mobile/FE/Security examples only — backend
    // recruiters read the empty section as "not for me" and miss
    // capturing the very signals that differentiate a senior backend
    // engineer (contract testing, event-driven design, OTel
    // discipline, idempotency). Six chips chosen for breadth across
    // backend archetypes (microservices / message-driven / payments
    // / platform-services), not just one stack.
    methodologyChips: [
      { id: 'contract-testing', label: 'Contract testing (Pact / consumer-driven)' },
      { id: 'event-driven-design', label: 'Event-driven design (CQRS / outbox pattern)' },
      { id: 'feature-flags', label: 'Feature flags (Unleash / LaunchDarkly / OpenFeature)' },
      { id: 'otel-instrumentation', label: 'OpenTelemetry / distributed tracing' },
      { id: 'idempotency-keys', label: 'Idempotency keys + dedup patterns' },
      { id: 'circuit-breakers', label: 'Circuit breakers + retry/backoff (Resilience4j etc.)' },
    ],
  },
  {
    id: 'solution-architect',
    name: 'Solution Architect',
    description: 'Cloud architecture, services, infra.',
    // Round-5 5δ: Azure preloaded so Anil's manually-added-mid-call
    // Azure no longer falls through to cloud catalog `defaultScope:
    // "operator"` (wrong for an architect candidate). techScope below
    // applies architect cap consistently with the rest of the stack.
    techIds: ['kubernetes', 'terraform', 'aws', 'azure', 'kafka', 'postgresql'],
    // SA designs how infra gets used; doesn't operate it day-to-day.
    // Round-3 Aaron session: SA on Terraform/K8s without this cap was
    // identical to a hands-on operator's verdict.
    techScopes: {
      kubernetes: 'architect',
      terraform: 'architect',
      aws: 'architect',
      azure: 'architect',
      kafka: 'architect',
      postgresql: 'architect',
    },
    // SA reads the architecture-side of AWS — Landing Zone, Organizations,
    // IAM Identity Center, plus the security slice (KMS / Macie /
    // GuardDuty / Security Hub / Inspector) regulated-industry SAs
    // routinely design (round-5 Anil). Hides CodeBuild/SageMaker noise.
    serviceTagFilters: { aws: ['general', 'architect', 'security'] },
    methodologyChips: [
      { id: 'togaf', label: 'TOGAF' },
      { id: 'c4-model', label: 'C4 model' },
      { id: 'ddd', label: 'Domain-Driven Design (DDD)' },
      { id: 'adrs', label: 'Architecture Decision Records (ADRs)' },
      { id: 'well-architected', label: 'Well-Architected reviews' },
      { id: 'event-storming', label: 'EventStorming' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps / Platform',
    description: 'CI/CD, infra-as-code, container orchestration.',
    techIds: ['kubernetes', 'terraform', 'docker', 'github-actions', 'argocd', 'helm', 'observability'],
    serviceTagFilters: { aws: ['general', 'cicd', 'container'] },
    methodologyChips: [
      { id: 'gitops', label: 'GitOps' },
      { id: 'iac-patterns', label: 'IaC patterns (modules, state isolation)' },
      { id: 'blue-green-canary', label: 'Blue-green / canary deploys' },
      { id: 'trunk-based', label: 'Trunk-based development' },
      { id: 'feature-flags', label: 'Feature flags' },
      { id: 'runbook-automation', label: 'Runbook automation' },
    ],
  },
  {
    id: 'sre',
    name: 'SRE / Platform Engineer',
    description: 'Reliability, observability, automation at scale.',
    techIds: ['kubernetes', 'terraform', 'observability', 'helm', 'go', 'python', 'aws'],
    // SRE typically operates the workload layer (K8s/Helm/obs/code) but
    // reviews cluster-build artifacts (Terraform, cloud) owned by a
    // platform team. Round-3 Cara session: deep K8s operator AND Terraform
    // PR-reviewer needed two different scopes simultaneously.
    techScopes: {
      terraform: 'reviewer',
      aws: 'reviewer',
      // kubernetes/helm/observability/go/python: operator-implied (default)
    },
    serviceTagFilters: { aws: ['general', 'container'] },
    methodologyChips: [
      { id: 'slos-slis', label: 'SLOs / SLIs' },
      { id: 'error-budgets', label: 'Error budgets' },
      { id: 'chaos-engineering', label: 'Chaos engineering' },
      { id: 'dora-metrics', label: 'DORA metrics' },
      { id: 'blameless-postmortems', label: 'Blameless postmortems' },
      { id: 'capacity-planning', label: 'Capacity planning' },
    ],
  },
  {
    id: 'data',
    name: 'Data Engineer',
    description: 'Pipelines, warehousing, streaming.',
    techIds: ['python', 'sql', 'spark', 'dbt', 'databricks', 'kafka', 'airflow', 'postgresql'],
    methodologyChips: [
      { id: 'kimball-modeling', label: 'Dimensional modeling (Kimball)' },
      { id: 'data-lakehouse', label: 'Data lakehouse architecture' },
      { id: 'data-contracts', label: 'Data contracts' },
      { id: 'slowly-changing-dims', label: 'Slowly-changing dimensions (Type 2)' },
      { id: 'data-quality-slos', label: 'Data-quality SLOs' },
      { id: 'medallion-architecture', label: 'Medallion (bronze/silver/gold)' },
    ],
  },
  {
    // Round-6 6F (Owen): no template fit a DBA specialist; recruiter ended
    // up on Custom and lost the methodology chip-set. This template
    // preloads the SQL + Oracle stack and gives the DBA-shape its own
    // chip-set (data modeling, backup discipline, HA design).
    id: 'database-dba',
    name: 'Database / DBA',
    description: 'Database administration + data modelling specialist.',
    techIds: ['sql', 'plsql', 'oracle-db', 'postgresql', 'mysql'],
    methodologyChips: [
      { id: 'dimensional-modeling', label: 'Dimensional / Kimball modeling' },
      { id: 'normalization-3nf', label: 'Normalization (3NF / BCNF)' },
      { id: 'backup-recovery-discipline', label: 'Backup & recovery discipline (PITR / drills)' },
      { id: 'ha-design', label: 'HA design (replication / failover topology)' },
      { id: 'query-plan-tuning', label: 'Query-plan reading + index strategy' },
      { id: 'capacity-planning-storage', label: 'Capacity planning + storage layout' },
    ],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Analysis, modelling, experimentation.',
    techIds: ['python', 'pandas', 'numpy', 'scikit-learn', 'sql', 'jupyter', 'databricks'],
    // Round-3 Yara + round-4 Marisol canonical case: senior DS is
    // differentiated by methodology, not tools. DiD/IV/Bayesian/A/B is
    // the entire signal for causal-inference shops.
    //
    // Round-5 5η (Yasmin): the original aggregated chip
    // "Causal inference (DiD / IV / RDD / propensity)" caused recruiters
    // reading a CV to free-text DiD and IV separately — three chips for
    // the same thing. Split into 4 narrower chips so each one ticks
    // cleanly from a CV mention.
    methodologyChips: [
      { id: 'ab-testing', label: 'A/B testing' },
      { id: 'difference-in-differences', label: 'Difference-in-Differences (DiD)' },
      { id: 'instrumental-variables', label: 'Instrumental Variables (IV)' },
      { id: 'regression-discontinuity', label: 'Regression Discontinuity (RDD)' },
      { id: 'propensity-scoring', label: 'Propensity scoring / matching' },
      { id: 'bayesian-inference', label: 'Bayesian inference' },
      { id: 'experimental-design', label: 'Experimental design + power analysis' },
      { id: 'mcmc', label: 'MCMC / probabilistic programming' },
      { id: 'feature-engineering', label: 'Feature engineering + selection' },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI / ML Engineer',
    description: 'Build and deploy ML / LLM systems and RAG.',
    techIds: ['python', 'pytorch', 'huggingface-transformers', 'llm-api-sdk', 'vector-db', 'fastapi', 'docker', 'aws'],
    // Round-3 Vikram named SageMaker + Bedrock as missing AWS slice; now
    // surfaced via the data-ml tag filter.
    serviceTagFilters: { aws: ['general', 'data-ml', 'container'] },
    methodologyChips: [
      { id: 'mlops', label: 'MLOps + model lifecycle' },
      { id: 'retraining-cadence', label: 'Retraining cadence + triggers' },
      { id: 'feature-stores', label: 'Feature stores' },
      { id: 'drift-detection', label: 'Drift detection + monitoring' },
      { id: 'llm-evals', label: 'LLM evals (offline + online)' },
      { id: 'rag-evaluation', label: 'RAG evaluation (recall@k / MRR)' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile Engineer',
    description: 'iOS / Android / cross-platform.',
    // Round-6 6F (Priya): Compose + SwiftUI promoted to first-class
    // checklist-mode catalog entries. Mobile-2026 signal lives there.
    techIds: ['swift', 'kotlin', 'jetpack-compose', 'swiftui', 'react-native', 'expo', 'flutter'],
    // Round-6 6F: Mobile differentiators are heavily methodology — store
    // submission discipline, crash-triage workflows, MVVM/MVI patterns,
    // ABI/screen-density management. Chips capture this in ~30s on phone.
    methodologyChips: [
      { id: 'release-automation', label: 'Release automation (Fastlane / GitHub Actions)' },
      { id: 'mvvm-mvi', label: 'MVVM / MVI architecture' },
      { id: 'ab-feature-flags', label: 'A/B testing + feature flags' },
      { id: 'crashlytics-triage', label: 'Crashlytics / triage workflow' },
      { id: 'abi-splits', label: 'ABI / screen-density / size optimization' },
      { id: 'offline-first', label: 'Offline-first / sync patterns' },
    ],
  },
  {
    id: 'security',
    name: 'Security Engineer (AppSec)',
    description: 'Application and cloud security.',
    // Fix U (round-4 cross-cut): Security template now preloads actual
    // security tools — Vault / Burp / Semgrep / Trivy / Snyk / ZAP / Falco
    // — alongside the infra reviewer-cap stack. Round-4 Wendy: pre-Fix-U
    // the template was "back-end engineer with OAuth probes wearing a
    // security-template badge."
    techIds: [
      // Security tools (new — Fix U)
      'vault', 'burp-suite', 'semgrep', 'trivy', 'snyk', 'owasp-zap', 'falco',
      // Infra (existing — AppSec reviews these for security posture)
      'aws', 'kubernetes', 'docker', 'terraform', 'observability',
      // Code + auth + data (existing — AppSec operates these)
      'python', 'oauth-identity', 'sql',
    ],
    // AppSec reviews infra for security posture; doesn't run it.
    // Round-3 Tomi session: lead AppSec at a bank, infra knowledge is
    // reviewer-shaped (threat-models, audits, IR) not operator-shaped.
    // Python / SQL / OAuth / security-tools stay operator-implied —
    // AppSec engineers actually run these tools daily.
    techScopes: {
      aws: 'reviewer',
      kubernetes: 'reviewer',
      docker: 'reviewer',
      terraform: 'reviewer',
      observability: 'reviewer',
      // vault/burp-suite/semgrep/trivy/snyk/owasp-zap/falco: operator-implied
      // python/oauth-identity/sql: operator-implied
    },
    // Round-4 Wendy: AppSec needs KMS / Macie / GuardDuty / SecurityHub /
    // Inspector visible on the AWS checklist. Hides CodeBuild + SageMaker.
    serviceTagFilters: { aws: ['general', 'security'] },
    methodologyChips: [
      { id: 'stride-threat-modeling', label: 'STRIDE threat modeling' },
      { id: 'owasp-top-10', label: 'OWASP Top 10' },
      { id: 'secure-sdlc', label: 'Secure SDLC integration' },
      { id: 'slsa-supply-chain', label: 'SLSA supply-chain security' },
      { id: 'ptes-pen-testing', label: 'PTES (pen-testing methodology)' },
      { id: 'least-privilege', label: 'Least-privilege / zero-trust patterns' },
    ],
  },
  {
    id: 'qa',
    name: 'QA / Test Engineer',
    description: 'Test automation across UI, API, and load.',
    techIds: ['playwright', 'cypress', 'pytest', 'vitest', 'selenium', 'typescript', 'python', 'github-actions'],
    methodologyChips: [
      { id: 'test-pyramid', label: 'Test pyramid (unit → integration → e2e)' },
      { id: 'contract-testing', label: 'Contract testing (Pact / consumer-driven)' },
      { id: 'mutation-testing', label: 'Mutation testing' },
      { id: 'accessibility-wcag', label: 'Accessibility (WCAG 2.x)' },
      { id: 'performance-budgets', label: 'Performance budgets + Core Web Vitals' },
      { id: 'flaky-test-management', label: 'Flaky test triage + quarantine' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start blank and add technologies as you go.',
    techIds: [],
  },
];
