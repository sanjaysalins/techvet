# Round 9 cast — 2026-05-17 post-8A/B/C/D/E validation

**Theme:** Round-8 batch (8A–8E) shipped 90 min ago. Round 9 validates
the 4 At-risk personas from round 8 now read Safe, AND extends coverage
to 3 untouched templates that rounds 1-8 never put on the dock: DevOps,
QA, and AI/ML productionization (vs round-3 Vikram's library-author shape).

## What this round must answer

1. **Does the new card-vs-panel parity actually fire end-to-end?** Mei
   redux: same TS 5.3 + shallow + junior. Card badge should now match
   side-panel verdict (round 7 + round 8 pre-batch had divergence).
   Lowered-direction copy in BOTH locations should read honestly, not
   as "credit given."
2. **Does 8B fix Anil's Azure plain-Yellow read?** Anil redux: Azure
   5/13 = 38% architect scope should now render "(capped — architect
   scope)" label without inflating Scope-capped headline (Staff-IC
   count unchanged at 4).
3. **Does 8D close the DE shape end-to-end?** Pooja redux: Snowflake
   preloaded, postgres+kafka reviewer-scoped, new lineage + CDC chips
   visible. The 6 named-only entries should drop substantially —
   probably 4-6 → 2-3.
4. **DevOps template never validated** (rounds 1-8). Mid-senior DevOps
   on Helm/ArgoCD/Terraform — does the template flow feel right?
5. **QA template never validated** (rounds 1-8). Test engineer with
   Playwright + Pytest + Cypress shop — first-ever QA shape.
6. **AI/ML productionization shape** (vs Vikram's library-author).
   Senior AI/ML engineer running production LLM ops — does the AI/ML
   template feel productionization-friendly or research-friendly?

## Cast (6 sessions — 6 phone; 3 redux + 3 new)

### 01 — Mei Tanaka redux (Junior Frontend, phone)

- **Persona:** identical to rounds 6, 7, and 8. 2 yr at US e-commerce
  startup, GA bootcamp, career-switcher. **Same exact stack input.**
- **Channel:** Phone, 6 min.
- **Under round-9 test:** 8A landed. Walk through the same TS 5.3 +
  shallow + junior input. Verify:
  - Card badge reads `"Review / Probe (lowered from Good by shallow
    depth)"` with yellow tone (not green).
  - Card italic note reads `"Tier lowered by one step — shallow depth
    on a junior candidate reads as a probe target, not strong signal."`
  - GuidancePanel side-panel headline matches card.
  - GuidancePanel italic strip reads `"Tier lowered by one step —
    shallow depth on a junior is a probe target, not strong signal."`
  - No card-vs-panel divergence.
  - Other entries (React 18, Vite 5, Tailwind 3) read Green normally.
  - Next.js 12 reads Yellow (no enterprise note — 6C gate).
- **Watch for:** Is the "lowered" framing readable to a recruiter
  reading the summary report 30 min later (not just live during call)?
  Does seeing two Yellows side-by-side (lowered TS + stack-version
  Next.js 12) get visually confusing — same tier, different stories?
  Does the J5 gap (headline cards still seniority-blind) feel resolved
  or still load-bearing? Bonus: J4 (scope dropdown still wastes ~20s
  on junior — should be hidden but currently visible).

### 02 — Anil Bhat redux (Staff SA, phone — was video, switching to phone)

- **Persona:** identical to rounds 6, 7, 8. Same stack. **Switch
  channel to PHONE this round** to validate the same fix on the
  primary use case.
- **Channel:** Phone, 10 min (no HM joining mid-call).
- **Under round-9 test:** 8B landed. Walk through:
  - AWS / K8s / Terraform / Postgres — architect scope on Green base
    → `"Review / Probe (capped from Good by architect scope)"`. These
    still feed Scope-capped headline (cappedFromColor === green).
  - **Azure 5/13 = 38% — architect scope on Yellow base → NOW reads
    `"Review / Probe (capped — architect scope) — 5/13 services"` (no
    "from Good" since cappedFromColor is undefined).** This is the
    pre-batch-8 plain "Review / Probe — 5/13" misread fixed.
  - Headline: `0G / 5Y / 0R / Meth:6 / Scope-capped:4`. Azure NOT
    in Scope-capped count (correct — cappedFromColor undefined).
- **Watch for:** Does the differentiated label-suffix actually carry
  the Staff-IC framing for Azure? Or does "capped — architect scope"
  (without "from Good") read weaker than "capped from Good by
  architect scope"? Is there a second-order tension where the recruiter
  reads "Scope-capped: 4" and counts the 5 architect-scoped entries
  and gets confused why only 4 appear?
  Confirm 8B's TechCard "Verdict capped by scope" text fires on Azure
  too (currently uses generic "can't earn the higher tier" wording —
  is that misleading for Yellow-base where the verdict didn't move?).

### 03 — Pooja Iyer redux (Senior Data Engineer, phone)

- **Persona:** identical to round 8. 8 yr DE at Bangalore B2B SaaS.
  Snowflake / dbt / Airflow / Python / Postgres (reviewer) / Kafka
  (reviewer) / Spark / Kimball / lineage / CDC discipline / cost-aware.
- **Channel:** Phone, 10 min.
- **Under round-9 test:** 8D landed. Walk through:
  - DE template now shows 9 preloaded techs (snowflake added). All
    relevant for Pooja's stack — zero not-in-stack clicks (was 0 for
    Databricks-only shape, but now snowflake is also useful).
  - Postgres + Kafka — scope reads as reviewer (not operator) per
    template techScopes.
  - 6 methodology chips. Pooja ticks: Kimball / data-contracts /
    data-quality-slos / data-lineage-openlineage / cdc-discipline
    (5 of 6 — drops medallion which her warehouse doesn't use).
- **Watch for:** Is the 9-tech preload too long for phone? (Round-7
  Mobile-7 was the cautionary tale; rounds 7-8 trimmed to 2-3.) Is
  Snowflake's 12-service checklist friction-free in 10 min? Does the
  6E-b auto-promote threshold still under-fire on a Pooja-shape
  (6 named-only > 9 scored = 8E-b doesn't promote — is that right
  now that scored count went up)? Does the "Data contracts
  (source-table freshness + schema enforcement)" reframe land for
  a US recruiter? Does the Spark "moved-off legacy" framing read
  honest, or does 7B's softener wording mis-frame her (since she's
  currently migrating, not returning)?

### 04 — NEW: Lars Bergstrom (Senior DevOps / Platform, phone)

- **Persona:** 11 yr platform engineer at a Stockholm-based fintech
  (NOT a regulated bank — small platform team of 4 supporting ~120
  engineers). Owns the GitOps pipeline + cluster autoscaling +
  observability stack + secrets management. Has migrated 3 different
  teams to ArgoCD over the years. Writes Helm charts daily. Doesn't
  develop application features.
- **Stack:** Kubernetes (1.30, deep operator), ArgoCD (3.x, sync
  policies + ApplicationSet patterns), Helm (3.15, chart governance +
  library charts), Terraform (1.9, modules + state isolation),
  GitHub Actions (matrix + reusable workflows), OpenTelemetry +
  Prometheus + Grafana + Loki, Vault (HCP, deep). Some Docker (writes
  multi-stage Dockerfiles). Methodology: GitOps mature (3 yr deep),
  IaC patterns (Terraform module library shipped quarterly),
  blue-green + canary via Argo Rollouts, trunk-based dev, feature
  flags via Unleash, runbook automation (Ansible + bash).
- **Channel:** Phone, 10 min.
- **Under round-9 test:** DevOps template never validated. Walk
  through:
  - Pick DevOps / Platform template. 7 preloaded: kubernetes /
    terraform / docker / github-actions / argocd / helm /
    observability. All relevant.
  - 6 methodology chips: gitops / iac-patterns / blue-green-canary /
    trunk-based / feature-flags / runbook-automation. All match
    Lars's methodology.
  - Lars mentions Vault — search-add or named-only.
  - Lars mentions Unleash — named-only.
  - Lars mentions ArgoCD Rollouts as separate from ArgoCD — likely
    named-only.
- **Watch for:** Does the DevOps template cover the modern GitOps
  shop, or does it miss something (Crossplane, Backstage, Atlantis,
  Spacelift)? Are the 7 preloads sized right (vs. round 7's pre-7F
  Mobile-7 problem)? Are there DevOps-specific catalog gaps (Vault
  status — likely a security catalog entry; Unleash status; chaos
  tools)? Does the 7E flag-audit-removal on K8s / Terraform / Docker
  read right for Lars's current-stack (no enterprise reassurance
  needed; modern defaults)?

### 05 — NEW: Akira Saito (Senior QA / Test Engineer, phone)

- **Persona:** 9 yr QA at a Tokyo-based SaaS (project management
  tool, ~150 engineers, ~40 QA across teams). Owns the cross-team
  Playwright e2e suite + flake budget tracking + the perf-regression
  pipeline. Recently rolled out Pact contract testing across 3
  services. Bilingual JA/EN. Reviews QA PRs across teams.
- **Stack:** Playwright (deep, 4 yr), Cypress (legacy — team
  migrating away, ~1 yr left), Pytest (3 yr for backend api tests),
  Vitest (just adopted, ~6 mo), Selenium (still maintains 2 legacy
  suites; honest about "we keep meaning to delete"), TypeScript
  (working), Python (working), GitHub Actions (deep — owns CI
  test orchestration). Methodology: flake budgeting (SLO-based;
  delete tests that flake too often), perf-regression gates, contract
  testing (Pact), test pyramid coaching, visual regression (Percy).
- **Channel:** Phone, 8 min.
- **Under round-9 test:** QA template never validated. Walk through:
  - Pick QA / Test Engineer template. 8 preloaded: playwright /
    cypress / pytest / vitest / selenium / typescript / python /
    github-actions. Mixed bag — Selenium is legacy for Akira, but
    most apply.
  - QA template chips? Read roles.ts to check if QA has methodology
    chips. **Likely no chips** (rounds 1-8 never touched QA chips;
    might be one of the few templates without chip-set).
  - Akira mentions Pact — likely named-only (no Pact catalog entry).
  - Akira mentions Percy — likely named-only.
  - 7B softener should fire on Selenium (stale + enterpriseStillUsed
    tier-level flag) — Akira's "we keep meaning to delete" case is
    almost a tongue-in-cheek "team-won't-upgrade" case the 7B
    rewording handles.
- **Watch for:** Does QA have methodology chips? If NO, that's a
  template-shape gap — what 6 QA chips should ship (flake budgeting /
  contract testing / test pyramid / visual regression / perf gates /
  contract testing on consumers)? Are there QA-specific catalog gaps
  (Pact / Percy / Lighthouse CI / k6 — wait, k6 might exist)?
  Selenium tier-level enterpriseStillUsed: does 7E flag audit
  preserve it (legacy 3.x still appropriate)? Does the QA recruiter
  feel under-served by the current template? (Akira's perf-regression
  + flake-budget discipline is the senior signal — does anything
  in TechVet capture it?)

### 06 — NEW: Esme Okonkwo (Senior AI/ML Engineer, productionization, phone)

- **Persona:** 8 yr ML engineer at a Lagos-based AI startup (3 yr
  at the startup; previously 5 yr at a UK research-y AI lab). Owns
  the production LLM inference stack + RAG pipeline + drift
  detection + evals harness for a customer-support copilot.
  Productionization-focused — doesn't write papers, doesn't fine-
  tune large models. Lives in MLOps / serving infra / evals.
- **Stack:** Python (deep), FastAPI (3 yr, owns the inference service),
  PyTorch (working — loads models, doesn't author novel architectures),
  HuggingFace Transformers (deep — uses + fine-tunes small models for
  classification subtasks), LLM API SDK (Anthropic + OpenAI, deep),
  Vector DB (Qdrant, deep), Docker (deep), AWS (operator scope —
  Bedrock + SageMaker inference endpoints + S3 + Lambda for trigger
  workflows). Methodology: MLOps (model registry + CI/CD for models),
  retraining cadence (weekly fine-tune + monthly base-model eval),
  feature stores (Feast, ~6 mo), drift detection (Evidently AI),
  LLM evals (Braintrust offline + production sampled online evals),
  RAG evaluation (recall@k + custom faithfulness scoring).
- **Channel:** Phone, 10 min.
- **Under round-9 test:** AI/ML template never validated end-to-end
  for productionization shape (round-3 Vikram was library-author
  shape, which the catalog's `defaultScope: 'author'` was designed
  for). Walk through:
  - Pick AI/ML Engineer template. 8 preloaded: python / pytorch /
    huggingface-transformers / llm-api-sdk / vector-db / fastapi /
    docker / aws. All relevant for Esme.
  - 6 methodology chips: mlops / retraining-cadence / feature-stores /
    drift-detection / llm-evals / rag-evaluation. All match.
  - PyTorch — Esme is `working` scope `operator` (loads pretrained,
    doesn't author novel architectures). Default scope for PyTorch
    is `author`. **Does Esme override scope to operator?** Or does
    the author default mis-read her?
  - Vector DB / LLM API SDK — catalog entries. Esme deep on both.
  - Mentions Braintrust + Evidently + Feast — likely named-only.
- **Watch for:** The Round-2 K2 fix added `defaultScope: 'author'`
  on AI/ML libraries. Esme's actual scope is `operator` for
  PyTorch + HuggingFace (she uses them as production tools, not
  authors them). Does the catalog default reverse the cap (Vikram's
  library-author shape vs Esme's productionization shape) — meaning
  Esme has to manually override scope on every AI/ML library? That's
  a ~30s tax per card × 4 cards = ~2 min, very expensive on a 10-min
  phone screen. Is this a template-level override needed (set
  techScopes: { pytorch: 'operator', huggingface: 'operator' } on
  AI/ML template for the productionization shape)? Round 9's biggest
  potential structural finding.

---

## Diversity check

| # | Persona                       | Channel | Primary round-9 lens                                  |
|---|-------------------------------|---------|-------------------------------------------------------|
| 01 | Mei (Junior FE)              | Phone   | 8A end-to-end (card-panel parity + lowered copy)      |
| 02 | Anil (Staff SA)              | Phone   | 8B end-to-end (Yellow-base architect label fix)       |
| 03 | Pooja (Senior DE)            | Phone   | 8D end-to-end (Snowflake preload + chips + techScopes) |
| 04 | Lars (Senior DevOps)         | Phone   | DevOps template first-ever validation (NEW)           |
| 05 | Akira (Senior QA)            | Phone   | QA template first-ever validation (NEW)               |
| 06 | Esme (Senior AI/ML prod)     | Phone   | AI/ML productionization vs library-author shape (NEW) |

Channels: 6 phone (primary use case). Anil moved phone to stress the
non-video read of 8B; HM-presence read already done round-8 video.
Mix: 3 redux personas (validate today's ship) + 3 new (push into 3
templates that have never been on the dock).
