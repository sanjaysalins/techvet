# Round 3 cast — 2026-05-16 multi-channel + underrepresented roles

**Theme:** Mixed channels (3 video / 3 async / 4 phone) ×
underrepresented round-2 roles + specialist extremes + non-traditional
paths. 10 sessions total.

**Over-arching evaluation criterion:** speed-of-use. Even non-phone
sessions must explicitly ask "would this workflow survive being shrunk
to a phone call?" Recruiter primary use case = couple of minutes on a
phone call. See `simulations/brief-template.md` and
`simulations/finding-schema.md` section 6b.

**What round 2 left unvalidated:**
- Fix K (scope-axis UX redesign, shipped today) needs validation across
  new role types and channels. AI/ML default `author` was the key change;
  does it survive contact with non-AI/ML scope-heavy roles like SRE
  and Solution Architect?
- Fix A/B/G/J/L (round-2 top-5) need confirmation they hold under
  unfamiliar candidate shapes.
- Round 2 didn't cover: Solution Architect, SRE, Security AppSec, Data
  Scientist, QA, founder/CTO, OSS maintainer, academic→industry,
  internal-transfer, true specialists (decades in one tech).

---

## Video panel (3 sessions, 30-45 min, hiring manager joins partway)

The recruiter has time for back-and-forth probing. HM typically joins
around the 15-20 min mark and watches the recruiter use the tool. **The
visible workflow matters** — fumbling, dead-end searches, mis-clicking
are HM-visible signal.

### 01 — Aaron Bell

- **Seniority:** Senior Solution Architect, 11 yr (former SWE, last 5 yr
  pure SA at a mid-size consultancy)
- **Current role:** Pre-sales architect on AWS + Azure dual-cloud
  migrations for regulated enterprises
- **Stack he names easily:** AWS (heavy: VPC, Lambda, Step Functions,
  RDS, EKS, IAM, KMS, Organizations), Azure (AKS, Functions, Key Vault,
  AAD/Entra), Terraform, Kubernetes
- **Stack he half-remembers:** "Last wrote Java professionally in 2020",
  "Touched Python for scripts but I don't ship code anymore"
- **What he'll be wrong about:** Hasn't typed `kubectl apply` in 18
  months. Will name K8s 1.30 confidently but his last hands-on was 1.27.
- **Why he's interesting:** Round 1's Aliyah hit the "architect-doesn't-
  operate" cap with Fix #4. This time the scope axis (post-Fix-K) should
  catch it without recruiter input. Does it? Also tests multi-cloud meta
  skill (RESUME priority #11). HM watching means the recruiter's pace +
  fumbles matter.
- **Suggested template:** Solution Architect

### 02 — Cara Lin

- **Seniority:** Staff SRE, 9 yr (early career at FAANG, now Series-D
  streaming infra company)
- **Current role:** Owns the cluster topology + on-call rotation for
  ~600 microservices across 3 regions
- **Stack she names easily:** Go, Kubernetes (deep — self-managed, no
  EKS/GKE), Envoy / Istio, Prometheus + Grafana + Loki + Tempo, OTel,
  Argo Rollouts, Cilium, Karpenter, Chaos Mesh
- **Stack she half-remembers:** Terraform ("the platform team owns it,
  I review PRs"), AWS basics
- **What she'll be wrong about:** Will say "I run K8s" — but the cluster
  build is platform-team-owned; she's an operator at the workload layer,
  not cluster-build layer
- **Why she's interesting:** Round 1's Robin hit the SRE shape; checklist
  with mixed-vendor observability was scored as ~30% coverage. Does the
  catalog still mix Prom-stack with Datadog/Splunk in one denominator?
  Half her stack (Envoy/Istio/Cilium/Karpenter/Chaos Mesh) wasn't in the
  catalog at round-2 close. HM watching tests visible-friction.
- **Suggested template:** SRE / Platform Engineer

### 03 — Tomi Ade

- **Seniority:** Lead Security AppSec, 7 yr (former pen-tester, now
  embedded in product security at a UK challenger bank)
- **Current role:** Threat-models new product launches, owns SAST/SCA
  pipeline, runs incident response for app-layer
- **Stack she names easily:** Burp Suite, Semgrep, Trivy, Grype, Falco,
  HashiCorp Vault, OAuth2/OIDC, AWS IAM/KMS, Snyk, OWASP ZAP
- **Stack she half-remembers:** Some Python for tooling, Docker for lab
- **What she'll be wrong about:** Will describe Vault depth confidently;
  recruiter has no Vault catalog entry to log against
- **Why she's interesting:** Round 1's Diego flagged the entire Security
  catalog gap. Round 2 confirmed Vault still missing. Catalog refresh
  (Fix I) lists Vault + Burp + Semgrep but hasn't shipped yet. HM is
  going to watch the recruiter type "Vault" → no results → "Burp" → no
  results → "Semgrep" → no results. Visible-failure spiral.
- **Suggested template:** Security Engineer (AppSec)

---

## Async (3 sessions, CV-only, no candidate call)

Recruiter has the candidate's CV + the job description; never speaks to
the candidate. Logging is from inference. The "did the candidate know X?"
question becomes "did the CV claim X?". Catalog coverage and version
inference are the dominant pressure here.

### 04 — Yara Mancini

- **Seniority:** Senior Data Scientist, 6 yr (PhD in econometrics,
  then 3 yr at a fintech doing causal-inference for credit risk)
- **Current role:** Senior DS owning the causal-inference + Bayesian
  experimentation platform; team of 4
- **Stack the CV names:** Python, R, scikit-learn, statsmodels, PyMC,
  pandas, numpy, dbt, Snowflake, Airflow, Looker. Plus methodology:
  "DiD, IV, RDD, propensity scoring, Bayesian A/B testing, MCMC".
- **What's not on the CV (but a HM would care about):** Whether she
  ships models to production or hands them to MLEs; whether her
  Bayesian work is library-grade (PyMC) or research-grade (Stan via R)
- **What she'll be wrong about (in the recruiter's inference):**
  Recruiter likely types "scikit-learn 1.5" guessing current version;
  her CV is silent. recruiter will not know R is a different language
  category.
- **Why she's interesting:** Round 1's Mei flagged the "methodology has
  nowhere to live" defect (D4) for senior DS. Round 2 didn't cover DS at
  all. **Yara's methodology stack (DiD/IV/RDD/Bayesian) is the entire
  signal** and the tool has nowhere to put it. Async means the recruiter
  is reading the CV verbatim — does the tool prompt them to capture
  methodology, or does it silently drop it?
- **Suggested template:** Data Scientist

### 05 — Devon Akin

- **Seniority:** 12-yr open-source maintainer (multiple projects;
  primary maintainer of a Rust async networking lib with ~8k GitHub
  stars; co-maintainer on two more)
- **Current role:** Indie / part-time consulting + full-time OSS for
  the last 4 years. No "employer" on CV.
- **Stack the CV names:** Rust (deep — author of tokio-adjacent lib),
  Go, Python, C, Linux internals, eBPF, NATS, gRPC, async/await
  patterns across languages. CV is mostly project descriptions, not
  job titles.
- **What's not on the CV:** Production-scale operations experience
  (he ships libraries, not services). Team-lead experience.
- **What's structurally weird:** No employer, no role-template will
  preload his stack, no JD constrains the recruiter's screen.
- **Why he's interesting:** Tests the catalog's coverage of systems-
  programming (eBPF, NATS, async runtimes), and how the tool handles
  a candidate where the *project list* is the signal, not the
  *employer list*. Recruiter has to pick "Custom" template and build
  from CV. Tests the "named-not-in-catalog" gap (Fix C, not shipped)
  in async mode.
- **Suggested template:** Custom

### 06 — Min Park

- **Seniority:** Academic researcher (post-doc, computational
  neuroscience using ML, 4 yr post-PhD); transitioning to industry
- **Current role:** Post-doc at a US university; first industry
  application is for a Junior MLE role at a biotech
- **Stack the CV names:** Python, PyTorch, JAX, scikit-learn, numpy,
  scipy, matplotlib, Slurm, Singularity (container, not Docker),
  pandas, R, MATLAB (in passing). 3 first-author papers; one
  open-source neuroimaging toolbox.
- **What's not on the CV:** Production deployment, CI/CD, code review
  habits, working-in-a-team-of-engineers experience
- **What's structurally weird:** Her "5 years of PyTorch" is
  research-codebase PyTorch (one-off experiments, not production).
  Recruiter inferring "deep" depth from "5 years" misreads her.
- **Why she's interesting:** Tests `lastUsed` non-shipped feature (Fix
  E) — research → industry candidates have "current" tech but
  research-grade depth. Tests scope axis on PyTorch where `author`
  default may actually be RIGHT for her (she does author research code)
  but underrate her on production-readiness. Tests catalog gaps for
  scientific computing (Slurm, Singularity, MATLAB, JAX).
- **Suggested template:** AI / ML Engineer

---

## Phone (4 sessions, 5-10 min — speed is the constraint)

Recruiter has minutes. **Every control opened, every search done is at
risk of breaking the flow.** Fix K (scope defaults + Summary chip) and
Fix A/B/G/J/L are under direct test.

### 07 — Pranav Iyer

- **Seniority:** Senior QA / Test Engineer, 8 yr (test automation,
  Selenium → Playwright migration story)
- **Current role:** QA lead at a consumer SaaS; runs the cross-browser
  + API test fleet and just finished a 18-month Selenium → Playwright
  migration
- **Stack he names easily:** Playwright (current), Selenium (legacy,
  migrating off), Cypress (evaluated, rejected), pytest, JUnit 5,
  REST Assured, k6, TestNG, BrowserStack
- **Stack he half-remembers:** Some Docker for test containers,
  GitHub Actions for the test pipeline
- **What he'll be wrong about:** Will say Selenium 4 confidently; can't
  quote Playwright version because the team auto-updates
- **Why he's interesting:** Round 1's Esi flagged QA template is
  100% version-mode for the most checklist-shaped role. Tests Fix D
  (`phoneScreenPivot`, not shipped) and the "evaluated and rejected"
  gap. Selenium has tier-level `enterpriseStillUsed: true` for legacy
  versions — does it fire correctly? Migration-story is a real
  recruiting signal; can the tool capture it?
- **Suggested template:** QA / Test Engineer

### 08 — Lou Bertrand

- **Seniority:** 18-yr DBA specialist (Oracle 11g → 19c; Postgres in
  last 5 yr; deeply expert)
- **Current role:** Senior DBA at a French insurer; primary on Oracle
  fleet (~120 production instances), secondary on Postgres migration
- **Stack he names easily:** Oracle (RAC, Data Guard, RMAN, AWR/ASH
  performance tuning, PL/SQL), Postgres (pg_dump, logical replication,
  pgbench tuning), SQL (window functions, query plans, optimizer
  hints in his sleep), bash, some Python for scripts
- **Stack he half-remembers:** Docker ("for dev only, prod is bare
  metal"), AWS RDS (peripheral)
- **What he'll be wrong about:** Won't quote Postgres version off the
  top of his head ("the fleet is on 14, 15, and 16; I migrate one a
  month")
- **Why he's interesting:** **Specialist extreme.** Catalog has no
  Oracle, no Data Guard, no PL/SQL, no RAC. SQL is checklist-mode
  with 12 items — Lou ticks all 12 in 30 seconds. Tests whether the
  tool can fairly represent a depth-of-one specialist in a market
  that mostly hires breadth. Also tests Fix-2 (fleet-hedge "14/15/16"
  parses to min from round 2) — does it still work on phone speed?
- **Suggested template:** Backend Engineer (or Custom — recruiter call)

### 09 — Riya Mehta

- **Seniority:** Founder/CTO of a YC startup for 6 years; just left,
  now looking for senior IC role
- **Current role:** Between gigs; was hands-on CTO (wrote ~40% of the
  original codebase, hired and managed 8 engineers, exited via
  acquihire)
- **Stack she names easily:** Python (FastAPI + Django over the years),
  TypeScript (frontend + Node services), Postgres, Redis, AWS (heavy
  early, less hands-on after hire #3), React, Next.js, Stripe,
  Terraform
- **Stack she half-remembers:** "Architected the K8s migration but my
  staff eng implemented", "Reviewed every Spark job but didn't write
  many"
- **What she'll be wrong about:** Will quote modern versions
  confidently (she has the senior-eng habit) but her last hands-on
  commit on the codebase was ~3 yr ago
- **Why she's interesting:** **Non-traditional path** — CTO scope
  is mostly architect + reviewer + occasional author. The Fix K
  defaults are `author` for AI/ML libs only; for backend / DB /
  cloud the default is operator-implied. Riya is NOT an operator.
  Will the recruiter set scope mid-call? On phone? Tests whether
  Fix K's defaults are aggressive enough.
- **Suggested template:** Full-Stack Developer (or Custom)

### 10 — Eitan Cohen

- **Seniority:** Internal-transfer (Solutions Engineer at a SaaS company
  → Backend dev in same company, 2 yr in current dev role; 6 yr SE
  before that)
- **Current role:** Mid backend engineer on the platform team; before
  this, he was a Solutions Engineer doing customer-facing technical
  pre-sales
- **Stack he names easily:** Python, Django, Postgres, AWS (broad,
  decent depth), Docker, GitHub Actions
- **Stack he half-remembers:** Frontend React he "touched in SE demos"
- **What he'll be wrong about:** Tends to over-claim cloud / multi-
  product knowledge (SE habit). Tends to under-claim coding depth
  (impostor syndrome from the transfer)
- **Why he's interesting:** **Non-traditional path.** SE → dev is a
  real recruiting category (and a growing one). The tool has no
  context capture for "8 yr in industry but 2 yr coding". Tests
  whether the candidate-context block (Fix M, not shipped) would
  meaningfully help. Also: SE-style breadth + dev-style depth is
  a hybrid shape the role templates don't represent.
- **Suggested template:** Backend Engineer

---

## Diversity check

| Persona | Channel | Seniority | Path | Template-fit | Round-2 fix under test |
|---------|---------|-----------|------|--------------|------------------------|
| Aaron   | Video   | Senior SA, 11y | Traditional | Good, multi-cloud test | Fix K (scope post-call) |
| Cara    | Video   | Staff SRE, 9y | Traditional | Boundary (OSS-only obs) | Mixed-vendor checklist (S3 from round 2) |
| Tomi    | Video   | Lead AppSec, 7y | Traditional | Catalog-gap heavy | Fix I (catalog refresh) |
| Yara    | Async   | Senior DS, 6y | Academic→fintech | Methodology gap | D4 (methodology) |
| Devon   | Async   | OSS maintainer, 12y | Non-traditional | Custom; no employer | Fix C (named-not-in-catalog) |
| Min     | Async   | Junior-mid academic | Academic→industry | AI/ML mis-shape | Fix E (lastUsed) + Fix K (author default) |
| Pranav  | Phone   | Senior QA, 8y | Traditional | 100% version-mode template wrong shape | Fix D (phoneScreenPivot) |
| Lou     | Phone   | 18y DBA specialist | Specialist extreme | Catalog has no Oracle | Round-2 fleet-hedge parse |
| Riya    | Phone   | 6y founder→IC | Non-traditional | Scope-heavy | Fix K (defaults aggressive enough?) |
| Eitan   | Phone   | 2y dev + 6y SE | Internal transfer | Context gap | Fix M (candidate context) |

Channels: 3 video / 3 async / 4 phone.
Roles covered (underrepresented): SA, SRE, Security, DS, QA = 5.
Specialist extremes: 1 (Lou).
Non-traditional paths: 4 (Devon, Min, Riya, Eitan).
Several personas double-test multiple fixes.
