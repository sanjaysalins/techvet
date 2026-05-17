# Round 10 cast — 2026-05-17 saturation validation

**Theme:** Round 9 hit 5 Safe / 1 At-risk / 0 Unworkable — best distribution
across 9 rounds. Batch 9 (9A-9E) shipped 5 fixes targeting that single
At-risk (Esme AI/ML productionization) + 4 cleanup items. Round 10
validates the saturation signal: does the stack now read clean across a
new diverse cast, or does pushing into never-validated terrain
(Fullstack, Custom template, library-author redux) re-open a structural
gap?

## What this round must answer

1. **Did 9A close Esme's AI/ML productionization shape?** Redux on
   Esme: zero scope-override tax. Headline reads honest.
2. **Did 9B's wording branch fire correctly on Anil's Azure case?**
   Italic copy now matches verdict semantics (bounded, not lowered).
3. **Does Lars's DevOps report read honest with Vault now preloaded?**
   And does 8 preloads on phone still fit the 10-min budget?
4. **Fullstack template — first-ever validation.** Most-used template
   probably; never put on the dock. Modern senior fullstack on
   Next.js/RSC + Postgres + Docker + AWS.
5. **Custom template flow — first-ever validation.** Recruiter-driven,
   no preload. Does Add-tech search + named-only flow work end-to-end
   when there's NO template anchor?
6. **Vikram library-author redux on Custom.** 9A added template-level
   scope override on the AI/ML template — does the K2 catalog default
   (`defaultScope: 'author'`) still serve the library-author shape when
   they pick Custom (not AI/ML template)?

## Cast (6 sessions — 6 phone; 3 redux + 3 new)

### 01 — Esme Okonkwo redux (Senior AI/ML productionization, phone)

- **Persona:** identical to round 9. 8 yr ML eng, Lagos-based AI startup.
  Production LLM inference + RAG + drift + evals harness. Productionization
  shape (operator on libraries, not author).
- **Stack:** Python (deep), FastAPI (3 yr, deep), PyTorch (working operator),
  HuggingFace Transformers (deep — fine-tunes small models; author scope ambiguity),
  LLM API SDK (operator), Vector DB / Qdrant (operator), Docker (deep),
  AWS (operator).
- **Channel:** Phone, 10 min.
- **Under round-10 test:** 9A shipped template-level techScopes:
  `pytorch: operator, llm-api-sdk: operator, vector-db: operator`. Esme picks
  AI/ML template; PyTorch / LLM API SDK / Vector DB cards arrive scope-locked
  to operator (no recruiter override). HuggingFace remains catalog-default
  author (recruiter manually overrides if Esme isn't fine-tuning).
- **Watch for:** Verify the override applies at template-pick time
  (read Landing.tsx for how techScopes propagate). Verify the scope
  dropdown on each card shows "operator" not "Use default: author."
  Time saved vs round 9: ~22s reclaimed in 10-min budget. Does the
  AI/ML template now feel productionization-shaped on first read, or
  does the HuggingFace card still feel like a friction point?
  Does Esme's headline read `5G/2Y/0R` or similar (production-engineer
  shape) vs round 9's `4G/3Y/0R` (over-yellow from author-cap on libs)?

### 02 — Anil Bhat redux (Staff SA, phone)

- **Persona:** identical to rounds 6, 7, 8, 9. Same stack including
  Azure 5/13.
- **Channel:** Phone, 10 min.
- **Under round-10 test:** 9B shipped wording branch on cappedFromColor.
  Anil's Azure 5/13 = 38% Yellow-base architect-cap should now render:
  - Card italic strip: "Verdict bounded by scope — architect scope reads
    as review/architect-shape signal, not hands-on operating signal."
  - Summary per-row italic: "Bounded by architect scope — reads as
    review/architect-shape signal, not hands-on operating signal."
  - NOT the "can't earn the higher tier" wording (which would mis-frame
    bounded-not-lowered as demotion).
  - AWS / K8s / Terraform / Postgres (Green-base capped) STILL render
    "Verdict capped by scope — can't earn the higher tier on operating
    signals alone" since `cappedFromColor` is set there.
- **Watch for:** Walk through both card-side and Summary-side. Verify
  branch fires correctly. Identify any second-order wording defects
  (e.g. does "review/architect-shape signal" land for video too vs
  print PDF?). Confirm headline Scope-capped: 4 (Azure NOT in count).

### 03 — Lars Bergstrom redux (Senior DevOps, phone)

- **Persona:** identical to round 9. 11 yr platform eng, Stockholm fintech.
  GitOps + cluster autoscaling + secrets management.
- **Stack:** Adds Vault deep (was named-only in round 9; now preloaded
  per 9E).
- **Channel:** Phone, 10 min.
- **Under round-10 test:** 9E shipped Vault preload. Lars's DevOps
  template now preloads 8 techs (was 7). Vault as catalog (Security
  template's checklist — verify it works in DevOps context too).
  Round-9 Lars dispatched 6 named-only entries; round 10 with Vault
  preloaded should drop to 5 named-only.
- **Watch for:** Is 8-tech preload at the budget edge for phone? (Round 7
  found 7 too many for Mobile; should 8 be too many for DevOps?
  Probably OK — DevOps engineers touch more techs than mobile devs.)
  Vault checklist coverage: how does Lars's deep Vault use (HCP + 4+
  services) read? Does 6D's 40% lift fire? Are the other 5 named-only
  entries from round 9 (Argo Rollouts / Karpenter / cosign / Backstage /
  Unleash / Crossplane) all still load-bearing, or did Vault preload
  shift the named-only/scored ratio enough to change the report read?

### 04 — NEW: Lina Sandberg (Senior Fullstack, phone)

- **Persona:** 8 yr fullstack at a US-East SaaS (B2B HR tech, ~80 engineers).
  Owns 3 customer-facing flows end-to-end: onboarding, billing, reporting.
  Real fullstack — writes React frontend AND Node backend AND ships AWS
  Lambda + RDS. Reviews PRs across the stack.
- **Stack:** React 18 (deep, 4 yr), TypeScript 5.4 (deep), Next.js 14
  (App Router, ~12 mo), Tailwind 3, Node.js 22 (LTS, deep — owns 4
  microservices), Express + tRPC (uses both; tRPC is newer), Postgres
  16 (deep — owns schema design + indexes for 3 services), Docker (deep
  — multi-stage Dockerfiles for the team), AWS (operator — Lambda +
  API Gateway + RDS + S3 + Cognito). Methodology: feature flags (LaunchDarkly),
  trunk-based dev, contract testing (Pact across her 4 services), Storybook
  for FE component library, OTel for tracing.
- **Channel:** Phone, 10 min. Recruiter Avery is internal at a NYC-based
  B2B SaaS hiring senior fullstack.
- **Under round-10 test:** Fullstack template never validated.
  - Pick Full-Stack Developer template. 6 preloaded: react / typescript /
    nodejs / postgresql / docker / aws. Read roles.ts:38-42.
  - Fullstack template's `methodologyChips`? Check.
  - Lina's TS 5.4 deep + senior → Green clean (7D senior gate preserves).
  - AWS — operator scope (Lina's real scope) per catalog defaultScope.
    Round-2 K2 fix.
  - Lina mentions Next.js / Tailwind / Express / tRPC / Pact / LaunchDarkly /
    Storybook / OTel — some catalog, some named-only.
- **Watch for:** Is the 6-tech preload sized right for fullstack? Are Next.js
  + Tailwind unfortunate omissions (they're in Frontend template)? Does
  fullstack have methodology chips? If yes, what 6 — and do they balance
  frontend + backend signals (a11y / Web Vitals AND contract testing /
  OTel)? If no chips, that's the 4th-or-5th-found template-shape-blindness
  finding. Does Lina's named-only count (Express / tRPC / Pact / LaunchDarkly /
  Storybook / OTel) feel high or right?

### 05 — NEW: Vikram-redux Senior AI/ML library-author on Custom (phone)

- **Persona:** 32, AI researcher at a UK research-y AI lab. Pure
  library-author shape: writes LangChain agents for paper experiments,
  fine-tunes models from scratch, lives in colab + notebooks. NOT a
  productionization engineer. Picks Custom template (or possibly AI/ML
  by default, but round-10 explicitly walks through Custom flow to
  isolate K2 catalog default from 9A template override).
- **Stack:** Python (deep), PyTorch (DEEP — authors novel architectures),
  HuggingFace Transformers (DEEP — author scope, fine-tunes large
  models), LangChain (named-only — probably), Jupyter (deep), pandas
  (deep), some SciPy / NumPy / scikit-learn, Weights & Biases (named-only),
  some Triton (named-only). Methodology: paper-driven experiments,
  reproducibility discipline, A/B model evals, weight sharing.
- **Channel:** Phone, 10 min. Recruiter Naveen is for a research-shop
  hiring a model author.
- **Under round-10 test:** 9A added techScopes to AI/ML template, NOT
  to Custom template. K2 catalog default (`defaultScope: 'author'`) on
  PyTorch / HuggingFace / LLM API SDK should still serve Vikram's
  library-author shape via Custom template. Walk through:
  - Naveen picks Custom template. No preload.
  - Naveen searches "PyTorch", adds. Card shows scope: "Use default:
    author" (K2 catalog default). Vikram's deep + author scope =>
    cap-blocks Yellow→Green lift, so verdict stays where the natural
    tier puts it. Verify behavior unchanged from K2.
  - Same for HuggingFace, LLM API SDK.
- **Watch for:** Does the K2 catalog default still serve library-author
  on Custom? Or did 9A inadvertently regress Custom? Note: 9A only
  added techScopes to ai-ml template; Custom doesn't have techScopes
  so catalog defaults apply. Should be no regression. But verify.
  Also: does Vikram's productionization-shape mismatch finding from
  round 3 (the seed for K2) re-emerge under round-10 Custom flow, or
  is the K2 default still pulling its weight?

### 06 — NEW: Theo Adesina (Mid-senior Generalist, phone, Custom template)

- **Persona:** 30, 5 yr at a Lagos-based fintech (NOT regulated bank —
  remittance + small-merchant payments). Generalist who's done some of
  everything: Python + Django backend, React frontend, GitHub Actions
  CI/CD, Postgres, some AWS. Not deep in any specific domain. The kind
  of candidate where no template fits cleanly because the stack spans
  6+ areas.
- **Stack:** Python (working — 3 yr Django), Django 5 (working), React
  17 (working — legacy frontend), TypeScript (shallow — types props
  but not generics), Postgres 15 (working — schema design but not deep
  indexes), Docker (working), AWS (operator — Lambda + RDS + S3),
  GitHub Actions (working). Methodology: trunk-based, code review,
  some pytest. No Pact, no OTel, no feature flags.
- **Channel:** Phone, 8 min.
- **Under round-10 test:** Custom template flow — recruiter manually
  builds the assessment from scratch, no preload. Walk through:
  - Recruiter Liam picks Custom. Empty assessment. Methodology section
    renders the free-text fallback per 6B (since no chips on Custom).
  - Liam adds React / TS / Python / Django / Postgres / Docker / AWS
    one-by-one via Add-tech search.
  - Liam fills versions + depths + scopes.
  - Liam types methodology entries free-text ("trunk-based", "pytest",
    "code review discipline").
- **Watch for:** Does Custom flow feel rough vs template flow? Time-to-
  add-7-techs on phone: 7 × ~10s = ~70s tax (substantial). Should
  Custom have a "starter chip" presenting common categories? Or
  should there be a "loose template" with the most common base
  (React + TS + Python + Postgres + Docker + AWS — the "average
  fullstack-ish" stack) and Custom for true blank-slate?
  Does the 6B free-text methodology entry work end-to-end (verify
  store + Summary render)? Are 7E enterpriseStillUsed and 7B softener
  behaviors all correctly fired without a template anchor?

---

## Diversity check

| # | Persona                       | Channel | Primary round-10 lens                                 |
|---|-------------------------------|---------|-------------------------------------------------------|
| 01 | Esme (Senior AI/ML prod)     | Phone   | 9A end-to-end (template techScopes propagation)       |
| 02 | Anil (Staff SA)              | Phone   | 9B end-to-end (wording branch on cappedFromColor)     |
| 03 | Lars (Senior DevOps)         | Phone   | 9E Vault preload + DevOps stability (8-tech budget)   |
| 04 | Lina (Senior Fullstack)      | Phone   | Fullstack template first-ever validation (NEW)        |
| 05 | Vikram-redux (Sr AI/ML author) | Phone | K2 catalog default still serves library-author (NEW)  |
| 06 | Theo (Mid-Sr Generalist)     | Phone   | Custom template flow first-ever validation (NEW)      |

Channels: 6 phone. Mix: 3 redux personas (validate batch 9 ship landed)
+ 3 new (push into 3 never-validated paths: Fullstack template / Custom
template / library-author-on-Custom counterfactual).

Round 10 expects: Esme + Anil + Lars all Safe (batch 9 closed each named
defect). Lina + Theo + Vikram-redux probably named-only-heavy reports
that surface 2-3 new structural items on the never-validated paths.
Distribution prediction: 3-4 Safe / 2-3 At-risk / 0 Unworkable.
If saturation holds despite new terrain, that's a strong stop signal.
