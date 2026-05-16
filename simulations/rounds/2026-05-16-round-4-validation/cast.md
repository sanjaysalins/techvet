# Round 4 cast — 2026-05-16 validation round (targeted)

**Theme:** Validation — does each round-3-cross-cut fix shipped today
(K / K2 / Q / C / M) actually hold up under fresh contact? Smaller and
more targeted than rounds 2/3 — 6 personas, mixed channels (3 phone /
1 video / 2 async), each chosen to directly stress one or two specific
fixes.

**Over-arching evaluation criterion:** speed-of-use. Same as round 3
— even non-phone sessions must answer "would this workflow survive
being shrunk to a phone call?" (schema 6b).

## What's under test

Shipped today (must validate):
- **Fix K** — `defaultScope` on 10 AI/ML libs. Catalog default cap fires
  without recruiter touching the dropdown.
- **Fix K2** — template-keyed `techScopes`. SA → architect on all infra/
  DB; SRE → reviewer on cluster-build; Security → reviewer on infra.
- **Fix Q** — channel flag + per-channel Summary copy (phone / video /
  async).
- **Fix C** — named-not-in-catalog capture via search no-results CTA.
- **Fix M** — candidate-context block (seniority + years + pathType +
  free-text) inline on report header.

Also expected to surface (still open from round 3):
- Fix E (asymmetric `lastUsed`) — Vikram natural-Green, Sarah stale-but-
  was-current.
- Fix O (catalog ceilings for fast-moving AI/ML libs).
- Fix S (search alias collisions — Vault → Ansible Vault).
- Fix R (broaden integrity guard for non-zero single-Green-tier).
- Fix T (Evaluated / migrated-off 4th tri-state).

## Validation goals per persona

Each agent's brief includes the specific fix-under-test plus an
instruction to also flag *anything else* that breaks. Validation
doesn't mean "rubber-stamp" — it means "did the fix work, and did
shipping it surface a new problem?"

---

## Phone (3 sessions, 5-10 min, speed is THE constraint)

### 01 — Helena Sørensen — Senior Solution Architect (validates K2 SA)

- 9 yr enterprise architect at a Nordic energy company; AWS + Azure +
  on-prem dual-target. Designs reference architectures, reviews PRs,
  but hasn't run `terraform apply` herself in 14 months.
- Stack she names easily: Kubernetes (cluster topology), Terraform
  (modules + state design), AWS (Landing Zone, Control Tower, SCPs),
  Azure (mgmt groups, policy), PostgreSQL (schema design only)
- **Validates:** does the SA template's `architect` default fire on all
  5 preloaded techs and produce caps where Helena's natural-Green
  versions would otherwise have rubber-stamped her?
- **Watch for:** does the recruiter see + understand the cap notes? Does
  Helena's *Senior · 9 yr · Traditional* candidate-context render
  cleanly? Multi-cloud is in her stack but Azure isn't preloaded — does
  the recruiter notice?

### 02 — Bashir Mahmoud — GenAI Engineer pivoting to platform (validates K + Fix O non-closure)

- 4 yr classical ML at a Berlin AdTech, now 8 months hands-on LangChain
  / RAG / vector DBs. Builds prototypes, doesn't operate any of it.
- Stack he names easily: Python, PyTorch, scikit-learn, LangChain
  ("1.x, I think latest"), Pinecone, Weaviate, OpenAI SDK, Anthropic SDK
- **Validates:** does Fix K's `author` default cap LangChain to Yellow
  via depth-lift block? **Confirms:** does LangChain still hit natural
  Green (1.x tier match) and slip past the cap — i.e. is Fix O still
  open and needed?
- **Watch for:** vector-db checklist coverage — does the author-default
  cap fire? Bashir is the canonical Vikram-shape; if his PDF still
  reads as Senior GenAI Engineer, Fix O is the unclosed gap.

### 03 — Eli Ortiz — Junior frontend, 4 months in (validates M + earliest-career rendering)

- 4 months at first job (bootcamp grad, switched from retail at 28).
  React 18 in a Tailwind monorepo someone else set up. Writes Storybook
  stories for the design system.
- Stack he names easily: React, TypeScript, Tailwind, Jest (a little),
  Storybook (writes stories, doesn't configure)
- **Validates:** does the M candidate-context block (set to *Junior · 4
  months · Career switcher · ex-retail*) render correctly on the report
  and prevent the HM from misreading him as a 4-month mid?
- **Watch for:** the Frontend template preloads 5 techs; how many does
  Eli's 4-month-in tenure actually justify scoring? Does Fix G
  (notDiscussed) correctly hide what didn't come up?

---

## Video (1 session, 30-45 min, HM joins partway)

### 04 — Wendy Akpata — Lead Security AppSec at a UK insurer (validates K2 Security + C Vault/Burp)

- 6 yr AppSec lead; threat-models product launches, owns the SAST/SCA
  pipeline, runs IR for app-layer.
- Stack she names easily: Burp Suite, Semgrep, Trivy, Snyk, HashiCorp
  Vault, Falco, OAuth2/OIDC, AWS IAM/KMS/Macie, GitHub Actions security
  rules
- **Validates:**
  1. K2 Security template caps AWS / Kubernetes / Docker / Terraform /
     Observability at `reviewer` automatically (cap fires without
     recruiter dropdown touch).
  2. Fix C's named-only CTA captures Vault / Burp / Semgrep / Trivy /
     Snyk / Falco when recruiter searches each one.
- **Watch for:** with HM watching, does the named-only flow feel like
  recovery or like a workaround? Does the "Candidate mentioned" section
  render usefully or feel like a dumping ground?

---

## Async (2 sessions, CV-only)

### 05 — Marisol Velez — Senior Data Scientist (validates Q async + C ML libs)

- 7 yr at a US healthtech; experimentation platform owner. CV names
  Python, R, sklearn, statsmodels, PyMC, Stan, dbt, Snowflake, Looker,
  Airflow. JD asks for senior DS in Bayesian causal inference.
- **Validates:**
  1. Fix Q: Summary "Not on the CV / JD" section title + body render
     correctly (not phone-only copy); channel chip in header reads
     "Async (CV-only)".
  2. Fix C: CV-named techs not in catalog (statsmodels / PyMC / R /
     Stan / Looker) can be captured via named-only.
- **Watch for:** does the recruiter add named-only entries for *every*
  catalog-missing tech, or just a subset? Does that map differ from
  the phone-channel intuition? D4 (methodology — DiD/IV/Bayesian) is
  still completely open; expect the agent to flag this.

### 06 — Owen Kelleher — Internal-transfer DevRel → backend (validates M internal-transfer + async)

- 5 yr DevRel (developer advocacy) at a CI/CD vendor, then transferred
  internally to backend engineer 18 months ago. CV has both roles
  prominently. Stack: Go, Postgres, Docker, AWS (deep on the parts
  needed for their product), some Python.
- **Validates:** does Fix M render *Mid · 18 mo coding (5 yr DevRel
  before) · Internal transfer*? Does the async channel copy frame his
  18-month tenure as "verify on the next step" rather than as the
  full screen?
- **Watch for:** SE-rattle-shaped over-claim on AWS (similar to Eitan
  round 3) — does the K2 cap apply if he's on the Backend template? It
  doesn't (Backend has no `techScopes`); is that a gap?

---

## Diversity check

| Persona | Channel | Seniority | Path | Primary fix under test |
|---------|---------|-----------|------|------------------------|
| Helena  | Phone | Senior 9y | Traditional | K2 SA architect default |
| Bashir  | Phone | Mid 4y → GenAI | Career-pivot | K author default + Fix O confirmation |
| Eli     | Phone | Junior 4mo | Career switcher | M renders junior + Fix G untouched |
| Wendy   | Video | Senior 6y | Traditional | K2 Security reviewer + C named-only spiral |
| Marisol | Async | Senior 7y | Traditional | Q async copy + C named-only ML libs |
| Owen    | Async | Mid 1.5y coding | Internal transfer | M internal-transfer rendering + async copy |

Channels: 3 phone / 1 video / 2 async (biased toward phone since it's
primary). All 5 today-shipped fixes covered. Bashir is the explicit
Vikram-redux to confirm Fix O is still the next critical thing.
