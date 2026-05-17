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
    // Round-10 10C (Lina F4): 6-tech preload was too narrow for fullstack —
    // modern 2026 fullstack is Next-first more often than not, and Tailwind
    // is the default styling layer. Both already preloaded by Frontend
    // template; symmetric addition here closes Lina's "6 search-adds in 3
    // minutes" tax. Express/tRPC stay named-only (real divergence axis).
    techIds: ['react', 'typescript', 'nextjs', 'tailwind', 'nodejs', 'postgresql', 'docker', 'aws'],
    serviceTagFilters: { aws: ['general', 'cicd'] },
    // Round-10 10A (Lina F1): Fullstack had no methodologyChips — same shape
    // as the round-7 7A Sven-Backend defect (a major template ships without
    // chip-set). Fullstack is the most-picked template (universal first-pick
    // for generalists) and went unvalidated until round 10. Six chips chosen
    // to balance FE + BE + cross-stack senior signal: feature flags +
    // trunk-based dev (cross-stack discipline), contract testing + OTel
    // (service-architecture senior signal), a11y + design-system-discipline
    // (FE senior signal). Reuse chip IDs from Backend (7A) and FE (6F) where
    // the same concept applies; new `design-system-discipline` ID (vs FE's
    // `design-system-ownership`) since fullstack engineers contribute to
    // rather than solely own design-systems.
    methodologyChips: [
      { id: 'feature-flags', label: 'Feature flags (LaunchDarkly / Unleash / OpenFeature)' },
      { id: 'trunk-based', label: 'Trunk-based development' },
      { id: 'contract-testing', label: 'Contract testing (Pact / consumer-driven)' },
      { id: 'otel-instrumentation', label: 'OpenTelemetry / distributed tracing' },
      { id: 'a11y-wcag', label: 'Accessibility (WCAG 2.x)' },
      { id: 'design-system-discipline', label: 'Design-system discipline (token consumption + component reuse)' },
    ],
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
      // Round-8 8E (Maya M1): `progressive-enhancement` was wrong-axis for the
      // 2026 senior FE shops this chip-set targets (logged-in consumer fintech,
      // internal tools, B2B SaaS — none lead with PE). Maya skipped it,
      // volunteered "bundle-size budgets" unprompted. Senior FE signal in 2026.
      { id: 'bundle-size-budgets', label: 'Bundle-size budgets + code-splitting discipline' },
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
    // Round-9 9E (Lars F2): Vault was preloaded by Security template but not
    // DevOps — same gap shape as round-8 8D's Snowflake/DE fix. Modern platform
    // teams own secrets management end-to-end; Vault is the canonical operator-
    // scope tech for DevOps. Add to preload so platform-engineer candidates
    // don't dispatch a search-add for it.
    techIds: ['kubernetes', 'terraform', 'docker', 'github-actions', 'argocd', 'helm', 'vault', 'observability'],
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
    // Round-8 8D (Pooja F1): Snowflake was catalog (`technologies.json:1221`,
    // 12-service checklist) but not preloaded. Every Snowflake DE ate a
    // search-add step while every Databricks DE got a free card. Add as
    // first-class preload alongside Databricks — many senior DEs span both.
    techIds: ['python', 'sql', 'snowflake', 'spark', 'dbt', 'databricks', 'kafka', 'airflow', 'postgresql'],
    // Round-8 8D (Pooja F4): DE owns the warehouse but typically *consumes*
    // upstream Postgres + Kafka rather than operating them — same shape as
    // round-5 5δ on the SA template. Without this, DE-stack Postgres/Kafka
    // silently read as operator and over-credit verdicts.
    techScopes: {
      postgresql: 'reviewer',
      kafka: 'reviewer',
    },
    // Round-8 8D (Pooja F2): chip-set missed 2026 senior-DE differentiators.
    // Dropped `slowly-changing-dims` (niche; covered by Kimball) and
    // `data-lakehouse` (redundant with medallion). Added `data-lineage` and
    // `cdc-discipline` — Pooja volunteered both unprompted; recruiter had to
    // free-text them. Reframed `data-contracts` with the source-table /
    // schema-enforcement vocabulary US recruiters reach for (Pooja F5
    // cross-cultural vocabulary mismatch).
    methodologyChips: [
      { id: 'kimball-modeling', label: 'Dimensional modeling (Kimball)' },
      { id: 'data-contracts', label: 'Data contracts (source-table freshness + schema enforcement)' },
      { id: 'data-quality-slos', label: 'Data-quality SLOs' },
      { id: 'medallion-architecture', label: 'Medallion (bronze/silver/gold)' },
      { id: 'data-lineage-openlineage', label: 'Data lineage (OpenLineage / dbt docs)' },
      { id: 'cdc-discipline', label: 'CDC discipline (Debezium / source freshness)' },
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
    // Round-9 9A (Esme): Round-2 K2 put `defaultScope: 'author'` on AI/ML
    // library catalog entries to match Vikram's library-author shape (LangChain
    // experiments / colab notebooks). Esme is the *productionization* shape:
    // she uses these libraries as production tools, not research artifacts.
    // The catalog default is right for the AVERAGE AI/ML candidate, but the
    // *template* signals the productionization-engineer intent and should
    // override accordingly. Without this, Esme dispatches ~22s of scope-
    // override tax on a 10-min phone screen (3.7% of budget). Intentionally
    // leave `huggingface-transformers` at catalog default — productionization
    // engineers genuinely do author fine-tuning loops, so author scope is the
    // honest default there.
    techScopes: {
      pytorch: 'operator',
      'llm-api-sdk': 'operator',
      'vector-db': 'operator',
    },
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
    // Round-7 7F (Priya R3 + Kenji 2nd confirmation): the single Mobile
    // template preloading 7 techs (swift / kotlin / compose / swiftui /
    // react-native / expo / flutter) forced every single-platform
    // candidate to dispatch ~5 not-in-stack clicks. Split into 3
    // sub-templates — recruiter picks the platform shape on Landing and
    // gets a 2-3 tech preload sized for the candidate. Each carries
    // platform-specific methodology chips (Kenji's iOS MVVM-C + snapshot
    // testing belongs nowhere on the Android chip-set, and vice versa).
    id: 'mobile-android',
    name: 'Mobile — Android',
    description: 'Native Android (Kotlin + Jetpack Compose).',
    techIds: ['kotlin', 'jetpack-compose'],
    methodologyChips: [
      { id: 'release-automation-android', label: 'Release automation (Fastlane / GitHub Actions / Gradle)' },
      { id: 'mvvm-mvi-android', label: 'MVVM / MVI architecture' },
      { id: 'ab-feature-flags-android', label: 'A/B testing + feature flags' },
      { id: 'crashlytics-firebase', label: 'Crashlytics + Firebase triage workflow' },
      { id: 'abi-screen-density', label: 'ABI / screen-density / app-size optimization' },
      { id: 'offline-first-android', label: 'Offline-first / WorkManager sync patterns' },
    ],
  },
  {
    id: 'mobile-ios',
    name: 'Mobile — iOS',
    description: 'Native iOS (Swift + SwiftUI).',
    techIds: ['swift', 'swiftui'],
    methodologyChips: [
      { id: 'release-automation-ios', label: 'Release automation (Fastlane / Xcode Cloud)' },
      { id: 'mvvm-c-coordinator', label: 'MVVM-C / Coordinator pattern' },
      { id: 'snapshot-testing-ios', label: 'Snapshot testing (Point-Free / iOSSnapshotTestCase)' },
      { id: 'voiceover-dynamic-type', label: 'VoiceOver / Dynamic Type accessibility' },
      { id: 'ab-feature-flags-ios', label: 'A/B testing + feature flags' },
      { id: 'app-store-review', label: 'App Store Review automation + binary delivery' },
    ],
  },
  {
    id: 'mobile-cross-platform',
    name: 'Mobile — Cross-Platform',
    description: 'React Native / Flutter / Expo.',
    techIds: ['react-native', 'expo', 'flutter'],
    // Round-8 8C (Diego F2-F4): the previous chip-set carried 3 quality defects.
    // `code-sharing-strategy` referenced KMP — a competing-framework axis no
    // RN-Expo dev would tick. `native-bridge-perf` used RN-specific "JS thread
    // budget" terminology that doesn't apply to Flutter. OTA update governance
    // and two-store release coordination — the two canonical cross-platform
    // methodologies a 2026 senior cross-platform dev demonstrates — were missing
    // entirely. Drop the wrong-axis + offline-first chips; add OTA + two-store;
    // rename native-bridge-perf to vendor-neutral.
    methodologyChips: [
      { id: 'release-automation-xplat', label: 'Release automation (Fastlane / EAS Build / Codemagic)' },
      { id: 'ota-update-governance', label: 'OTA update governance (Expo Updates / CodePush / EAS)' },
      { id: 'feature-flag-sdk', label: 'Feature flag SDK choice + rollout discipline' },
      { id: 'two-store-release-coordination', label: 'Two-store release coordination + rollout timing' },
      { id: 'native-perf-tuning', label: 'Native perf tuning (frame budget, profiling, native modules)' },
      { id: 'platform-overrides', label: 'Platform-specific overrides + parity testing' },
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
    // Round-9 9D (Akira F4): Selenium dropped from preload — for modern QA
    // shops it's legacy (Akira's "we keep meaning to delete" case is typical),
    // every modern-QA candidate ate a not-in-stack click. Recruiter still
    // adds Selenium manually for legacy shops; the 7B softener + tier-level
    // enterpriseStillUsed flag on Selenium 3.x ensure the legacy-defensible
    // story still reads honestly when added.
    techIds: ['playwright', 'cypress', 'pytest', 'vitest', 'typescript', 'python', 'github-actions'],
    // Round-9 9D (Akira F1-F3): chip refresh. Split the original perf chip
    // into perf-regression-gates + load-testing — Akira separates Lighthouse
    // CI (perf gates) from k6 (load) in different pipelines. Added
    // visual-regression chip — Percy / Chromatic is a senior signal Akira
    // volunteered. Replaced niche mutation-testing chip with universal
    // test-data-management chip (test-fixture discipline, factory patterns,
    // anonymized-prod-data ethics).
    methodologyChips: [
      { id: 'test-pyramid', label: 'Test pyramid (unit → integration → e2e)' },
      { id: 'contract-testing', label: 'Contract testing (Pact / consumer-driven)' },
      { id: 'test-data-management', label: 'Test data management (factories / anonymized prod)' },
      { id: 'accessibility-wcag', label: 'Accessibility (WCAG 2.x)' },
      { id: 'perf-regression-gates', label: 'Perf-regression gates (Lighthouse CI / Web Vitals budgets)' },
      { id: 'load-testing-discipline', label: 'Load-testing discipline (k6 / scenarios / SLO-aligned)' },
      { id: 'visual-regression-qa', label: 'Visual regression (Percy / Chromatic / snapshot)' },
      { id: 'flaky-test-management', label: 'Flaky test triage + quarantine (SLO-based budgeting)' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start blank and add technologies as you go.',
    techIds: [],
    // Round-17 (Theo FT-2 round-10): Custom flow had no `serviceTagFilters`,
    // so AWS / Azure / GCP rendered all 26+ services as denominator. Theo's
    // generalist Lambda+RDS+S3 = 3/26 = 11.5% → Red, mis-framing a working-
    // depth generalist as thin. Apply the 'general' tag filter as the
    // Custom default (matches Backend/Fullstack templates' lens). Recruiters
    // who want the architect / security / data-ml / CI slice should pick
    // those templates instead — Custom is the "common-stack default" lens.
    // Full stack-focus picker UI (per-card chips for changing lens mid-call)
    // is deferred to a separate UX-redesign session.
    serviceTagFilters: { aws: ['general'] },
  },
];
