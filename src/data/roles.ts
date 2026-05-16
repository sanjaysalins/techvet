import type { Scope } from '../types';

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
  },
  {
    id: 'solution-architect',
    name: 'Solution Architect',
    description: 'Cloud architecture, services, infra.',
    techIds: ['kubernetes', 'terraform', 'aws', 'kafka', 'postgresql'],
    // SA designs how infra gets used; doesn't operate it day-to-day.
    // Round-3 Aaron session: SA on Terraform/K8s without this cap was
    // identical to a hands-on operator's verdict.
    techScopes: {
      kubernetes: 'architect',
      terraform: 'architect',
      aws: 'architect',
      kafka: 'architect',
      postgresql: 'architect',
    },
    // SA reads the architecture-side of AWS — Landing Zone, Organizations,
    // IAM Identity Center. Hides CodeBuild/SageMaker noise.
    serviceTagFilters: { aws: ['general', 'architect'] },
  },
  {
    id: 'devops',
    name: 'DevOps / Platform',
    description: 'CI/CD, infra-as-code, container orchestration.',
    techIds: ['kubernetes', 'terraform', 'docker', 'github-actions', 'argocd', 'helm', 'observability'],
    serviceTagFilters: { aws: ['general', 'cicd', 'container'] },
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
  },
  {
    id: 'data',
    name: 'Data Engineer',
    description: 'Pipelines, warehousing, streaming.',
    techIds: ['python', 'sql', 'spark', 'dbt', 'databricks', 'kafka', 'airflow', 'postgresql'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Analysis, modelling, experimentation.',
    techIds: ['python', 'pandas', 'numpy', 'scikit-learn', 'sql', 'jupyter', 'databricks'],
  },
  {
    id: 'ai-ml',
    name: 'AI / ML Engineer',
    description: 'Build and deploy ML / LLM systems and RAG.',
    techIds: ['python', 'pytorch', 'huggingface-transformers', 'llm-api-sdk', 'vector-db', 'fastapi', 'docker', 'aws'],
    // Round-3 Vikram named SageMaker + Bedrock as missing AWS slice; now
    // surfaced via the data-ml tag filter.
    serviceTagFilters: { aws: ['general', 'data-ml', 'container'] },
  },
  {
    id: 'mobile',
    name: 'Mobile Engineer',
    description: 'iOS / Android / cross-platform.',
    techIds: ['swift', 'kotlin', 'react-native', 'expo', 'flutter'],
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
  },
  {
    id: 'qa',
    name: 'QA / Test Engineer',
    description: 'Test automation across UI, API, and load.',
    techIds: ['playwright', 'cypress', 'pytest', 'vitest', 'selenium', 'typescript', 'python', 'github-actions'],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start blank and add technologies as you go.',
    techIds: [],
  },
];
