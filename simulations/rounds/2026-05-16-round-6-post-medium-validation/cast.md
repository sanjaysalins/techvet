# Round 6 cast — 2026-05-16 post-medium-items validation

**Theme:** Round 5 cumulative validation surfaced 12 priorities (α–μ). We shipped
6 hot patches (5α–ζ) + 3 medium items (5η–ι) and deferred 5κ to a future coverage
redesign. Round 6 validates whether the named fixes actually landed AND pushes
into untested terrain: junior personas (round 1–5 only tested mid/senior), and the
deep-narrow-specialist coverage-as-single-axis failure that round 5 named as
recurring 4 rounds in a row (deferred to 5λ — but we want fresh evidence to
prioritize the redesign).

## What's under test (this round)

- **5α** Yellow-tier softener for enterpriseStillUsed stale techs (Margarethe PG13 / Java11)
- **5β** SA AWS filter includes `security` tag (Anil KMS / Macie / GuardDuty / Security Hub / Inspector)
- **5γ** Backend template `serviceTagFilters: { aws: ['general'] }` (Margarethe manual AWS add)
- **5δ** SA template preloads Azure with architect techScope (Anil Azure)
- **5ζ** Channel label casing — "Phone" / "Video panel" / "Async (CV-only)"
- **5η** DS causal-inference chip split into DiD / IV / RDD / Propensity (Yasmin)
- **5θ** NamedOnlyEditor compact on async + no enrichment (Yasmin)
- **5ι** Methodology card promoted to 4th headline stat (Yasmin + Anil)
- **Cross-cumulative:** Do the 9 fixes compose without new visual friction?

## NEW classes pushed into this round

- **Junior personas** — round 1–5 only tested mid/senior. Does the report still
  make sense for a 2-yr junior frontend or a 6-mo bootcamp DS grad? Does the
  methodology card hide cleanly when there's nothing to fill in?
- **Deep-narrow specialists** — Senior Oracle DBA with 18 yr focused expertise.
  Round 5 named coverage-as-single-axis as the recurring failure mode (Robin /
  Cara / Brigit / Tanvir all under-rated). Confirm it's still hurting in round 6
  so the 5λ redesign is justified.
- **Mobile** — untested since round 1. The Mobile template has no methodology
  chip set, so the 5ι 4th card should NOT fire. Validate it doesn't.

## Cast (6 sessions — phone-biased, mix of all three channels)

### 01 — Yasmin El-Sayed redux (Senior Data Scientist, async)

- **Persona:** identical to round-5 Yasmin. 8 yr senior DS at UK fintech, PhD
  economics, credit-risk causal-inference lead. CV-only screen.
- **CV names:** Python, pandas, scikit-learn, statsmodels, PyMC, Stan, R, dbt,
  Snowflake, Airflow. Methodology: DiD, IV, RDD, Bayesian hierarchical, MCMC,
  sensitivity analysis.
- **Channel:** Async.
- **Under round-6 test:** 5η (does the recruiter naturally click DiD / IV / RDD
  / Propensity as 4 separate chips, or do they want the aggregated version
  back?); 5θ (NamedOnlyEditor for `statsmodels`/`PyMC`/`Stan`/`R` should render
  compact with "no enrichment (async; verify on next step)" hint); 5ι
  (methodology shows as 4th headline card alongside G/Y/R, fixes round-5's
  "0 Green / 6 Yellow / 0 Red but methodology has 10 entries" mismatch).
- **Watch for:** Does the 4-card grid feel balanced or cramped? Does the
  "Methodology: 10" number on the headline actually fix the round-5 critique
  that hiring manager saw "evidence-light senior"?

### 02 — Anil Bhat redux (Staff Solution Architect, video)

- **Persona:** identical to round-5 Anil. 14 yr enterprise architect, US
  fin-services consultancy. AWS Landing Zone + Azure mgmt-group, doesn't code.
- **Stack:** AWS (Landing Zone, Control Tower, Organizations, IAM Identity
  Center, KMS, Macie, GuardDuty, Security Hub, Inspector), Azure (AKS, AAD),
  Terraform, Kubernetes, Postgres. Methodology: TOGAF, C4, DDD, ADRs,
  EventStorming, Well-Architected reviews.
- **Channel:** Video panel (45 min; HM joins ~minute 18).
- **Under round-6 test:** 5β (AWS security tag — KMS/Macie/GuardDuty/Security
  Hub/Inspector should surface in SA filtered list); 5δ (Azure preloaded with
  architect scope, no longer falls through to operator default); 5ζ ("Video
  panel" capitalized correctly in chip + report header); 5ι (methodology card
  fires with TOGAF/C4/DDD/ADRs entries — visible to HM at headline glance).
- **Watch for:** With HM watching, does the 4-card headline read as "Staff
  Architect shape"? Does the AWS filtered list now include security services
  naturally for a fin-services SA? Does Azure scope-cap chip render correctly?

### 03 — Margarethe Schiff redux (Senior backend returner, phone)

- **Persona:** identical to round-5 Margarethe. 9 yr Java/Spring then 4 yr
  career break, now back from bootcamp.
- **Stack:** Java (Spring Boot 2.5), Postgres 13, Jenkins, AWS Lambda + RDS +
  SQS (2022). Bootcamp also touched Node + PG 16.
- **Channel:** Phone (8 min).
- **Under round-6 test:** 5α (Yellow-tier softener — Spring Boot 2.5 +
  lastUsed=2022 should now read "(softened from Review / Probe — stale but
  defensible)" with returner note. Round-5 only softened Reds; now Yellows too);
  5γ (Backend template AWS filter — recruiter adds AWS Lambda → should see ~7
  filtered general services, not 26); methodology empty path (Backend has no
  chip set; should render 3-card grid, not 4-card with 0 methodology).
- **Watch for:** Does the softener label actually help differentiate returner
  shape from a weak senior? Does the Backend AWS filter feel right or
  restrictive (no security / no architect for a backend returner)? Does the
  3-card grid look clean with no methodology promotion?

### 04 — NEW: Mei Tanaka (Junior Frontend, phone)

- **Persona:** 2 yr at a US e-commerce startup, bootcamp-trained out of General
  Assembly. First post-bootcamp role. Owns the marketing-site pages, pairs on
  the checkout flow. Career path: career-switcher (former marketing analyst).
- **Stack:** React 18, TypeScript, Vite, Tailwind, basic Next.js (12), Storybook
  for component dev, Jest + RTL for tests, Vercel deploys. No Redux (uses Zustand
  for one feature), no SSR/RSC depth, no GraphQL.
- **Channel:** Phone (6 min — recruiter on tight schedule).
- **Under round-6 test:** Junior persona shape — round 1–5 only tested mid/
  senior. Does the Frontend template's `Methodology` card hide cleanly (Frontend
  has no chip set, recruiter has no time to free-text)? Does the candidate
  context line render "Junior · 2 yr in industry · Career-switcher" usefully?
  Does the report-shape make sense for thin signal (few Greens, mostly Yellow)?
- **Watch for:** Is the phone screen completable in 6 min? Does the recruiter
  feel pressured to fill methodology when there's nothing senior-shaped to
  capture? Is the report's lack of methodology visible (3-card vs 4-card) or
  invisible (just one less card)? Are there any "senior-skewed" UI elements that
  feel wrong for a junior (e.g., scope dropdown that doesn't apply, depth
  options that overshoot)?

### 05 — NEW: Owen Lindqvist (Senior Oracle DBA, phone)

- **Persona:** 18 yr Oracle DBA at a Nordic insurance carrier. Owns the OLTP
  fleet (Oracle 19c + RAC), the warehouse (Oracle 19c + partitioning), and the
  PL/SQL stored-proc layer. Touches Postgres only as a target for an in-flight
  migration. Methodology: data-modeling (Kimball + 3NF), backup/recovery
  (RMAN), HA (Data Guard + RAC). Doesn't write app code.
- **Stack:** Oracle DB, PL/SQL, RMAN, Data Guard, RAC, partitioning, query
  tuning, AWR analysis. No checklist mode for Oracle in the catalog (per
  CLAUDE.md's "deferred set" / catalog 2.0 scope — Oracle DB might be
  version-mode or might be missing entirely; check before judging).
- **Channel:** Phone (10 min — recruiter knows it's a specialist).
- **Under round-6 test:** Deep-narrow-specialist failure mode (round-5 5λ).
  Coverage-as-single-axis under-rates Owen because Oracle is checklist-mode (if
  it exists) and 18 yr of focused expertise can still show as "3/12 ticked →
  Yellow". Confirm the failure mode is still present so 5λ redesign is justified.
  Also: how does TechVet handle a stack that's outside its catalog (Oracle,
  RMAN, Data Guard, RAC are likely all missing or thin)?
- **Watch for:** Does the recruiter end up with a report where 18 yr of Oracle
  DBA reads as "1 Yellow + 5 named-only chips"? Is Bug-4 enrichment (depth +
  lastUsed on named-only) enough to convey seniority? Does the methodology card
  fire if recruiter free-text-types "Kimball", "RMAN", "Data Guard"? Or does
  this require the chip-set redesign too?

### 06 — NEW: Priya Patel (Mid Mobile Engineer, phone)

- **Persona:** 4 yr at a US fitness app. Native Android (Kotlin + Jetpack
  Compose), shipping production for 2.5 yr. Touched KMM (Kotlin Multiplatform
  Mobile) for shared business logic in last 6 months. iOS knowledge is
  read-only (reviews Swift PRs).
- **Stack:** Kotlin, Jetpack Compose, Android SDK, Coroutines + Flow, Room,
  Hilt, Coil, Retrofit, KMM (shared core), Firebase (Crashlytics + Analytics),
  Play Store deploys.
- **Channel:** Phone (7 min).
- **Under round-6 test:** Mobile template — untested since round 1. Mobile
  template has NO methodology chip set per RESUME (only SA/DevOps/SRE/Data Eng/
  DS/AI-ML/Security/QA have chips). Validate that the 5ι 4th-card does NOT
  fire for Mobile (recruiter doesn't free-text methodology in 7 min). Validate
  Mobile template's preloaded tech list still makes sense for an Android-only
  candidate. Validate KMM as a named-only addition (not in catalog).
- **Watch for:** Does the Mobile recruiter view have anything Mobile-specific
  that wasn't there before? Does the methodology section's absence feel like a
  gap, or correct for Mobile shape? Are there iOS/cross-platform UI elements
  that feel wrong for a native-Android specialist?

---

## Diversity check

| # | Persona                  | Channel | Primary round-6 test                                        |
|---|--------------------------|---------|-------------------------------------------------------------|
| 01 | Yasmin (Senior DS)       | Async   | 5η chip split + 5θ async-compact + 5ι 4th headline card     |
| 02 | Anil (Staff SA)          | Video   | 5β AWS-security + 5δ Azure architect + 5ζ "Video panel"    |
| 03 | Margarethe (Returner)    | Phone   | 5α Yellow softener + 5γ Backend AWS filter + 3-card path   |
| 04 | Mei (Junior Frontend)    | Phone   | Junior persona shape (NEW) + methodology hide + report flow|
| 05 | Owen (Senior Oracle DBA) | Phone   | Deep-narrow-specialist (5λ redesign justification)         |
| 06 | Priya (Mid Mobile)       | Phone   | Mobile template (NEW since round 1) + no-chip-set path     |

Channels: 4 phone (primary use case), 1 video, 1 async.
Roles: DS / SA / Backend / Frontend (Junior) / DBA (specialist) / Mobile.
Mix: 3 redux personas (validate named fixes landed) + 3 new shapes (extend coverage).
