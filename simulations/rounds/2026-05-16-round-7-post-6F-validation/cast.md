# Round 7 cast — 2026-05-16 post-6F validation

**Theme:** All six round-6 priorities (6A–6F) shipped today plus the 4
catalog entries / 1 new template / 2 chip-set additions from 6F.
Round-7 validates whether the stack composes when 5+ recent fixes
touch the same persona's report, AND fills the 5ξ "Senior tier above
Yellow" question Anil's round-6 session left open.

## What this round must answer

1. **Does the round-7 Owen-shape PDF actually read "Senior DBA" now?**
   Same persona, same channel as round 6, but with DBA template +
   Oracle catalog + 6D depth-lift + 6E off-catalog promotion all
   firing simultaneously. Round-6 Owen was At-risk with `2G/0Y/0R`
   misleading headline; if round 7 reads Safe, that's six rounds of
   fixes converging into a useful product.
2. **Is 5ξ "Senior tier above Yellow" still load-bearing?** Round-6
   Anil with Yellow scope-capped K8s/Terraform/Postgres + Methodology
   6 read as evidence-light at headline glance. With 5λ live, does
   any of his Yellow capped lift? If yes, 5ξ may resolve itself; if
   no, it's the next big rock.
3. **Did 6C close the junior regression cleanly?** Mei redux on the
   same persona — softener should stay suppressed; new Frontend chips
   should feel optional, not pressuring. Eitan as a fresh junior
   persona on Backend confirms the gate works cross-role.
4. **iOS specialist shape on Mobile template with new preloads** —
   does the recruiter feel time-pressured by 7 preloaded techs (5
   that don't apply for a pure iOS dev)?
5. **Backend without methodology chips** (Sven) — was the 6F deferral
   correct, or should Backend get chips too?

## Cast (6 sessions — 5 phone, 1 video; 3 redux + 3 new)

### 01 — Owen Lindqvist redux (Senior DBA, phone)

- **Persona:** identical to round-6 Owen. 18 yr Oracle DBA at Nordic
  insurance carrier. Owns OLTP fleet (Oracle 19c + RAC), warehouse
  (19c + partitioning), PL/SQL layer. Touches Postgres only as
  migration target. Doesn't write app code.
- **Stack:** Oracle DB (19c), PL/SQL, RMAN, Data Guard, RAC,
  partitioning, query tuning, AWR. Methodology: data-modeling
  (Kimball + 3NF), backup/recovery, HA design.
- **Channel:** Phone (10 min — same as round 6).
- **Under round-7 test:** Picks NEW DBA template. Oracle DB + PL/SQL
  now catalog entries (checklist-mode). 6D lifts Oracle 8/14 +
  very-deep → Green. 6E shows "Off-catalog: N" 5th headline card +
  named-only promotion when count > scored. Composition: DBA template
  + Oracle catalog + 5λ depth-lift + 6E hierarchy fix should all line
  up on Owen's exact shape.
- **Watch for:** Direct comparison to round 6 (At-risk / `2G/0Y/0R` /
  inverted hierarchy). Is round-7 Owen now Safe? If not, what specific
  composition gap or new bug surfaces?

### 02 — Anil Bhat redux (Staff Solution Architect, video)

- **Persona:** identical to round-6 Anil. 14 yr enterprise architect
  at US fin-services consultancy. AWS Landing Zone + Azure mgmt-group
  for regulated clients. Doesn't write code.
- **Stack:** AWS (Landing Zone + KMS/Macie/GuardDuty/Security Hub +
  Inspector), Azure (AKS, AAD), Terraform, Kubernetes, Postgres.
  Methodology: TOGAF, C4, DDD, ADRs, EventStorming, Well-Architected.
- **Channel:** Video panel (45 min; HM joins ~minute 18).
- **Under round-7 test:** 6D's qualified depth-lift on Yellow coverage
  — does any of Anil's scope-capped Yellow (K8s/Terraform/Postgres/
  Azure) lift to Green now? Note: scope cap is reviewer/architect, not
  depth. The 6D lift fires on Yellow coverage + deep depth + senior +
  non-junior, but scope cap takes precedence in composeLabel. So
  Anil's architect-scope might still keep him at Yellow. **The
  question is whether this is still the right outcome.**
- **Watch for:** Does the headline still read "0 Good / 5 Yellow /
  0 Red / Methodology: 6"? If yes, 5ξ "Senior tier above Yellow" is
  sharply justified — propose a concrete shape (Senior tier color?
  new label? compositional badge?). If the report now reads more
  honestly, name what changed.

### 03 — Mei Tanaka redux (Junior Frontend, phone)

- **Persona:** identical to round-6 Mei. 2 yr at US e-commerce
  startup, GA bootcamp, career-switcher (ex-marketing analyst).
- **Stack:** React 18, TypeScript, Vite, Tailwind, Next.js 12,
  Storybook, Jest+RTL, Vercel. No Redux. No SSR/RSC depth.
- **Channel:** Phone (6 min).
- **Under round-7 test:** 6C end-to-end — softener should NOT fire on
  her stale Next.js 12 (verify the regression is closed). Plus the new
  Frontend methodology chips (a11y / Web Vitals / design system / RSC /
  PE / visual regression) — does the recruiter feel pressured to fill
  them, or are they optional? Junior shouldn't have load-bearing
  methodology yet.
- **Watch for:** Did the J1/J3/J4/J5 defects from round 6 also close,
  or only J2 (which 6C targeted)? J1 was "depth never lowers a tier"
  — version mode, not checklist; likely still open. J3 was "Frontend
  has no chips" — closed by 6F. J4 was "Scope dropdown wastes ~20s on
  junior". J5 was "headline cards carry no seniority context". Report
  which junior-shape defects are still open.

### 04 — NEW: Kenji Watanabe (Senior iOS Engineer, phone)

- **Persona:** 9 yr iOS at a Tokyo fintech. Pure native iOS — never
  written Android, never used a cross-platform framework in prod.
  Currently leading the migration from UIKit to SwiftUI on a 4-yr-old
  banking app. Reviews Swift PRs from a team of 4.
- **Stack:** Swift 6.0 (just upgraded), SwiftUI (6 mo in prod for
  new screens; older screens still UIKit), Combine, Core Data,
  CloudKit sync, Xcode Cloud (CI), Fastlane. Methodology: MVVM-C
  pattern, snapshot testing, accessibility (VoiceOver), feature
  flagging via custom telemetry stack.
- **Channel:** Phone (8 min).
- **Under round-7 test:** Picks Mobile template (preloads 7 techs:
  swift, kotlin, jetpack-compose, swiftui, react-native, expo,
  flutter). Kenji's stack covers swift + swiftui only — recruiter
  must mark 5 of 7 not-in-stack. Does that drag the 8-min phone
  budget? SwiftUI is now first-class checklist-mode (10 services).
  Can the recruiter capture Kenji's UIKit-vs-SwiftUI split via the
  SwiftUI checklist + version-mode swift? Mobile template's 6
  methodology chips (release automation / MVVM / A-B / Crashlytics /
  ABI / offline-first) — do any match Kenji's MVVM-C + snapshot
  testing methodology, or does he need free-text?
- **Watch for:** Is the expanded 7-tech Mobile preload helpful or
  oppressive for a pure-iOS candidate? Does SwiftUI's 10-service
  checklist capture his depth honestly, or feel exhaustive? Does the
  Mobile chip-set miss native-iOS-specific methodologies (MVVM-C /
  snapshot testing / accessibility / Xcode Cloud workflow)?

### 05 — NEW: Sven Karlsson (Mid Backend, phone)

- **Persona:** 4 yr at a Stockholm B2B SaaS. Owns the order-fulfilment
  microservice + the webhook ingestion service. Pairs on the
  payment-events Kafka topic. Doesn't design infra (his platform team
  does) but ships features daily.
- **Stack:** Java 21 (recently upgraded from 17), Spring Boot 3.4,
  Postgres 16, Kafka, Docker (writes Dockerfiles), Kubernetes (deploys
  via Helm chart his platform team owns, doesn't author manifests),
  AWS Lambda + SQS (peripheral). Methodology: contract testing
  (Pact), feature flags (Unleash), observability discipline (OTel),
  Postgres MVCC patterns, idempotency keys.
- **Channel:** Phone (8 min).
- **Under round-7 test:** Backend template has NO methodologyChips
  (deferred in 6F focused-subset). With 6B's free-text fallback,
  recruiter can still type methodology — but does the recruiter
  realize they should? Sven's senior signal is heavily methodology
  (contract testing / feature flags / OTel / idempotency). 6D lift on
  K8s checklist if ticks ≥40% + scope=operator + senior — does it
  fire? 6A softener on his AWS if he says "lastUsed=2023, we moved
  off Lambda" — but he's mid-senior so 6C doesn't gate him.
- **Watch for:** Was 6F right to skip Backend methodology chips? If
  Sven's senior signal vanishes without chips, propose a Backend
  chip-set (likely: contract testing / event-driven patterns /
  feature flags / OTel / idempotency / circuit breakers).

### 06 — NEW: Eitan Berg (Junior Backend career-switcher, phone)

- **Persona:** 1.5 yr coding, ex-QA engineer at a Berlin healthtech.
  Currently building internal admin tools. Career path: career-
  switcher (5 yr manual QA → bootcamp → first dev job 18 mo ago).
- **Stack:** Node.js 20, Express, Postgres 16, Docker (uses but doesn't
  author images), Jest (still leans on QA muscle). Spring Boot 2.5
  on a legacy service his team maintains (he reads code, occasionally
  patches). No K8s depth (10% coverage). No methodology beyond "what
  the team taught me."
- **Channel:** Phone (6 min — junior screen, tight).
- **Under round-7 test:** Multi-role junior validation — round-6 Mei
  was junior FE only; need to confirm 6C softener gate works on a
  junior BACKEND too. Spring Boot 2.5 + lastUsed=current (his team
  hasn't upgraded) — softener should NOT fire (junior gate). 6D lift
  on K8s: 1/12 = 8% (Red) + depth=shallow + seniority=junior — Fix A
  floor protects, and junior gate adds belt-and-braces. Backend
  template no chips — does Eitan's methodology feel like a gap (he
  has none yet — that's expected for junior).
- **Watch for:** Does the junior junior path read honestly (probe
  targets visible, not soothed into false-defensible)? Does the
  6B free-text methodology absence on Backend feel like a hole or
  correct silence for a junior? Are J1/J4/J5 from Mei still open
  here too, confirming they're cross-role junior gaps?

---

## Diversity check

| # | Persona                  | Channel | Primary round-7 lens                                       |
|---|--------------------------|---------|------------------------------------------------------------|
| 01 | Owen (Senior DBA)        | Phone   | 6F template + 6D lift + 6E promotion full composition stress |
| 02 | Anil (Staff SA)          | Video   | 5ξ open question — does 5λ help Anil's capped Yellow?       |
| 03 | Mei (Junior FE)          | Phone   | 6C end-to-end + Frontend chips no-pressure validation        |
| 04 | Kenji (Senior iOS)       | Phone   | SwiftUI catalog + Mobile expanded preload (NEW shape)        |
| 05 | Sven (Mid Backend)       | Phone   | Backend chip-less + 6D lift + 6A AWS (NEW shape)             |
| 06 | Eitan (Junior Backend)   | Phone   | 6C/6D junior gate cross-role (NEW shape)                     |

Channels: 5 phone (primary use case), 1 video (HM-presence test for Anil).
Mix: 3 redux personas (validate today's ship) + 3 new (push into terrain).
