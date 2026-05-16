# Round 5 cast — 2026-05-16 cumulative validation

**Theme:** With ~17 substantive fixes shipped today (K/K2/Q/C/M/O/E/U +
Bug 4 + cloud defaultScope + AWS role-aware + D4 + 4 hot patches +
template/catalog work), the report now has many more moving parts.
A senior candidate's PDF can show: scope chip (Fix K/K2), recency
softener/penalty note (Fix E), candidate-context line (Fix M),
methodology chips (D4), named-only enriched entries (Bug 4 + Fix C),
channel-aware section copy (Fix Q), filtered AWS services (round-4),
plus the original scored buckets.

**Round 5 is cumulative-shape validation, not feature validation.**
Each fix was validated individually. This round tests whether they
**compose cleanly** — does the report still read well? Are recruiter
inputs intuitive when stacking? Any new clutter / interaction issues?

## What's under test (cumulative)

- **Report density**: senior candidate cards now stack 5-7 distinct
  notes/chips on a single TechCard. Cluttered? Distracting?
- **Methodology section quality**: are the curated chips actually
  relevant per role? Do recruiters tend to use chips or free-text?
- **AWS role-aware filter UX**: "X services hidden (filtered for
  Template)" — helpful hint or confusing?
- **D4 + named-only interaction**: if recruiter free-text-types a
  methodology that matches an existing chip slug, do they collide?
- **Fix E + scope cap stacking**: a Yellow-tier with scope=reviewer +
  stale lastUsed — three reasons it's not Green. Readable?
- **K2 + Fix O composition**: GenAI engineer on AI/ML template — does
  LangChain checklist + author default give the right verdict?

## Cast (6 sessions, mixed channels phone-biased)

### 01 — Yasmin El-Sayed (Senior Data Scientist, async)

- **Persona:** 8 yr senior DS at a UK fintech. Lead on credit-risk
  causal-inference models. PhD economics. CV-only screen (recruiter
  never speaks to candidate).
- **CV names:** Python, pandas, scikit-learn, statsmodels, PyMC, Stan,
  R, dbt, Snowflake, Airflow. Methodology: DiD, IV, RDD, Bayesian
  hierarchical models, MCMC, sensitivity analysis.
- **Channel:** Async.
- **Under cumulative test:** D4 (DS chip set quality) + Q (async copy
  + channel chip) + Fix C/Bug-4 (named-only ML libs with depth
  enrichment) + Fix M (Senior + traditional path + 8yr context line).
- **Watch for:** Methodology + named-only + scored techs all stacking
  on Summary — does the report read cleanly or cluttered? Does the
  recruiter naturally split methodology (D4) from libs (named-only)?

### 02 — Anil Bhat (Staff Solution Architect, video)

- **Persona:** 14 yr enterprise architect at a US financial-services
  consultancy. Pre-sales + post-sales architecture. AWS Landing Zone
  + Azure mgmt-group work for regulated clients. Doesn't write code.
- **Stack:** AWS (heavy: Landing Zone, Control Tower, Organizations,
  IAM Identity Center, KMS), Azure (AKS, AAD), Terraform, Kubernetes,
  Postgres (designs schemas, doesn't operate). Methodology: TOGAF,
  C4, DDD, ADRs, EventStorming, Well-Architected reviews.
- **Channel:** Video panel (45 min; HM joins ~minute 18).
- **Under cumulative test:** K2 SA architect defaults + AWS
  role-aware filter (architect-shaped visible) + D4 SA chip set
  (TOGAF/C4/DDD all surface) + Fix M Staff+ candidate context.
- **Watch for:** Helena round-4 was the SA archetype; now also has D4
  + AWS-filter. Is the cumulative output clearly Staff-Architect-
  shaped to a HM? With HM watching, does the methodology chip-row +
  filter hint create useful structure or visual noise?

### 03 — Brigit Olsen (Senior SRE, phone)

- **Persona:** 7 yr SRE at a Nordic on-prem fintech. Owns 3-region
  cluster topology, on-call rotation. Touched AWS briefly in 2022
  evaluation; never shipped to it.
- **Stack:** Go, Kubernetes (self-managed), Helm, Terraform (reviews
  platform-team PRs), Prometheus + Grafana + Loki + Alertmanager
  (open-source obs only — no Datadog). Says she "evaluated AWS in
  2022 but we stayed on-prem."
- **Channel:** Phone (8 min).
- **Under cumulative test:** K2 SRE reviewer-on-Terraform + AWS
  role-aware filter (container subset) + Fix E stale Red softener if
  she adds AWS (2022 = 4yr stale + AWS enterpriseStillUsed maybe?) +
  D4 SRE chip set (SLOs/error budgets/chaos eng).
- **Watch for:** Observability checklist mixed-vendor issue (Robin
  round-1 / Cara round-3) — still open? Now with D4 SLO chip,
  recruiter has two places to capture "she does SLOs" — chip OR
  checklist tick. Which feels more natural?

### 04 — Idris Khan (Mid AppSec, phone)

- **Persona:** 4 yr AppSec at a US healthtech. Owns SAST/SCA
  pipeline, runs threat-models, on the IR rotation.
- **Stack:** Burp Suite (daily), Semgrep (custom rules), Trivy
  (container scans), Vault (KV + dynamic secrets), AWS (KMS, Macie,
  GuardDuty, Security Hub), OAuth2/OIDC, Python (tooling).
  Methodology: STRIDE, OWASP Top 10, SDLC integration.
- **Channel:** Phone (7 min).
- **Under cumulative test:** Fix U Security catalog (all his tools
  first-class) + K2 Security reviewer cap on infra + AWS role-aware
  filter (security subset) + D4 Security chip set (STRIDE/OWASP/SDLC)
  + Bug 4 named-only depth enrichment (anything missing?).
- **Watch for:** Should be the cleanest happy-path post-fix. If
  *anything* feels broken for Idris, the Security recruiting path
  still has friction we didn't catch.

### 05 — Tanvir Hassan (GenAI Engineer redux, phone)

- **Persona:** 3 yr ML at a Berlin AdTech, 12 months hands-on
  LangChain / RAG / vector DBs in production. Bashir's failure mode
  but inverted — he's *actually* shipped agentic features.
- **Stack:** Python, PyTorch, scikit-learn, LangChain (1.x, ships
  LangGraph agents in prod), vector DBs (Pinecone for prod;
  evaluating Weaviate), OpenAI + Anthropic SDKs, AWS (SageMaker +
  Bedrock + Lambda).
- **Channel:** Phone (8 min).
- **Under cumulative test:** Fix O LangChain checklist (tickable
  LangGraph agents / RAG retrieval / tool use / evals / production
  deploy) + K author default + AWS role-aware data-ml subset + D4
  AI-ML chip set (MLOps / LLM evals / RAG-eval) + Fix M Mid +
  traditional path.
- **Watch for:** This is the inverse of Bashir's Vikram-redux —
  Tanvir actually ships LangChain in prod, so he should tick many
  checklist services. Does his report read as a real GenAI engineer?
  Or does the author-cap from Fix K accidentally cap his deep
  legitimate work? (Should not — checklist coverage drives the
  verdict post-Fix-A; author cap is moot for natural-Green coverage
  results.)

### 06 — Margarethe Schiff (Senior backend returner, phone)

- **Persona:** 9 yr Java/Spring backend, then 4 yr career break, now
  back. Just finished a refresher bootcamp. Sarah-shape redux but
  more extreme (4 yr stale vs Sarah's 3).
- **Stack:** Java, Spring Boot ("we were on 2.5"), Postgres ("13
  was our last fleet"), Jenkins, AWS Lambda + RDS + SQS (2022).
  Bootcamp also touched Node + PG 16.
- **Channel:** Phone (8 min).
- **Under cumulative test:** Fix E asymmetric `lastUsed` — Spring
  Boot 2.5 + lastUsed=2022 → Yellow softener (Sarah-shape); Node +
  PG 16 + lastUsed=current → Green (bootcamp refresher) + Fix M
  Senior returner candidate context (path-type: returner). Cumulative
  test: Sarah PDF was the canonical "stale Red + ramp-up" case —
  does the report now actually distinguish Senior returner from a
  bad senior with stale Greens?
- **Watch for:** Does the Senior + 4-yr-break + Returner candidate-
  context line render and visually distinguish her? Does the Spring
  Boot softener + the candidate-context line together tell the same
  story (don't double-up the "she's a returner" framing)?

---

## Diversity check

| # | Persona | Channel | Primary cumulative test |
|---|---------|---------|-------------------------|
| 01 | Yasmin (Senior DS) | Async | D4 chip set + Q async + Bug-4 named-only depth |
| 02 | Anil (Staff SA) | Video | K2 + AWS filter + D4 + HM visibility |
| 03 | Brigit (Senior SRE) | Phone | K2 reviewer + D4 SRE chips + obs checklist still open? |
| 04 | Idris (Mid AppSec) | Phone | Fix U + K2 Security + D4 STRIDE/OWASP |
| 05 | Tanvir (GenAI in prod) | Phone | Fix O LangChain checklist + K author default + D4 AI-ML |
| 06 | Margarethe (Senior returner) | Phone | Fix E softener + Fix M returner context + Sarah-shape closure |

Channels: 4 phone (primary use case), 1 video, 1 async.
Roles: DS / SA / SRE / Security / AI-ML / Backend-returner (6 distinct).
Cumulative-shape focus: every persona stresses 3+ fixes simultaneously.
