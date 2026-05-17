# Round 8 cast — 2026-05-17 post-7A/B/C/D/E/F validation

**Theme:** All six round-7 priorities (7A–7F) shipped end-of-day 2026-05-16.
Round 8 validates whether the stack composes when 5+ recent fixes touch
the same persona's report (redux on 7D/7C/7F target shapes), AND extends
into terrain round 7 didn't touch (senior FE design-system owner /
Data Engineer / Mobile cross-platform RN dev).

## What this round must answer

1. **Does 7D actually lower Mei's tier on her TS 5.3 + shallow case?**
   Round 7 left J1 (depth-can-lower) named but unshipped; 7D shipped it
   gated on `seniority === 'junior'`. Mei redux confirms the cross-role
   junior-shape regression closed without breaking senior reads.
2. **Does Anil's headline now read "Staff Architect, scope-capped" not
   "thin"?** 7C added `cappedFromColor` + the 6th "Scope-capped: N"
   headline card. Anil's `0G / 5Y / 0R / Meth:6` should now read
   `0G / 4Y / 1R / Meth:6 / Scope-capped:4` (per the 7C ship notes).
3. **Does the new `mobile-ios` sub-template feel right for Kenji?**
   2 preloaded techs (swift + swiftui) instead of 7; iOS-canonical
   chip-set (MVVM-C / snapshot / VoiceOver / Xcode Cloud-friendly).
   Is the asymmetric SwiftUI-without-UIKit gap still salient, or did
   reducing preload friction make UIKit absence less load-bearing?
4. **Senior Frontend design-system-owner shape (NEW).** 6F Frontend
   chips ship was confirmed for Mei (junior) — does the senior FE
   shape (the chips' actual target) feel honest? Are 6 chips the
   right count, or does this surface a wrong-axis chip?
5. **Data Engineer template flow (NEW).** Template exists; what's
   the catalog match-rate on a real Snowflake/dbt/Airflow stack?
   Off-catalog rate is the headline question.
6. **Mobile cross-platform RN-only dev (NEW).** 7F shipped 3 Mobile
   sub-templates; round 7 validated only the iOS sub on Kenji.
   Cross-platform sub gets first real-test on Diego.

## Cast (6 sessions — 5 phone, 1 video; 3 redux + 3 new)

### 01 — Mei Tanaka redux (Junior Frontend, phone)

- **Persona:** identical to rounds 6 & 7. 2 yr at US e-commerce startup,
  GA bootcamp, ex-marketing-analyst career-switcher.
- **Stack:** React 18 (intermediate, ~2 yr daily), TypeScript 5.3
  (shallow — "I write types but I don't really *get* generics"),
  Vite, Tailwind, Next.js 12 (team hasn't upgraded), Storybook,
  Jest + RTL, Vercel. No Redux. No SSR / RSC depth.
- **Channel:** Phone (6 min — junior screen).
- **Under round-8 test:** 7D should lower her TS 5.3 + shallow + junior
  from Green to Yellow with `"lowered from Good by shallow depth"`
  label. Headline `Y / G / R` should reflect 1 lowered Yellow, not
  the round-7 false-Green. Senior versions of the same input
  (Maya in #04) must NOT lower — verify the junior gate holds.
  Confirm 6C softener + reassurance-note gating still suppresses
  on her stale Next.js 12 (no regression from 7D).
- **Watch for:** Does the `"(lowered from Good by shallow depth)"`
  read as informative or punitive? Does the recruiter understand the
  signal at-a-glance, or read it as "the tool is being harsh on
  juniors"? Are J4 (scope dropdown on junior) and J5 (level-fit copy)
  STILL the next most visible junior gaps?

### 02 — Anil Bhat redux (Staff Solution Architect, video)

- **Persona:** identical to rounds 6 & 7. 14 yr enterprise architect at
  US fin-services consultancy. AWS Landing Zone + Azure mgmt-group.
  Doesn't write code; reviews architecture.
- **Stack:** AWS (Landing Zone + KMS / Macie / GuardDuty / Security Hub
  + Inspector), Azure (AKS, AAD), Terraform, Kubernetes, Postgres.
  Methodology: TOGAF, C4, DDD, ADRs, EventStorming, Well-Architected.
- **Channel:** Video panel (45 min; HM joins ~minute 18).
- **Under round-8 test:** 7C should be visible end-to-end. Each of
  AWS / K8s / Terraform / Postgres should show `"capped from Good by
  architect scope"` label not plain `"Review / Probe"`. The 6th
  headline card "Scope-capped: 4" should render alongside the
  Methodology card. The grid should be a 6-card row.
- **Watch for:** Does the HM at minute 18, looking at the screen
  for the first time, read the headline as "Staff Architect, broad
  but scope-capped" or as "thin engineer with 5 yellows"? If HM
  reads correctly → 5ξ resolved. If still misread → what additional
  signal is missing? Does the Scope-capped chip color (sky-100)
  feel distinct enough from the Methodology card (emerald-100) and
  the Off-catalog card (sky-100)? Are two sky cards confusable?

### 03 — Kenji Watanabe redux (Senior iOS, phone)

- **Persona:** identical to round 7. 9 yr iOS at Tokyo fintech.
  Pure native iOS. Currently leading UIKit→SwiftUI migration.
- **Stack:** Swift 6.0, SwiftUI (6 mo in prod), Combine, Core Data,
  CloudKit sync, Xcode Cloud, Fastlane. Methodology: MVVM-C
  pattern, snapshot testing, accessibility (VoiceOver), custom
  feature-flag telemetry.
- **Channel:** Phone (8 min).
- **Under round-8 test:** New `mobile-ios` sub-template preloads
  ONLY swift + swiftui (2 techs, down from 7). 6 iOS-canonical
  methodology chips (release-automation-Fastlane / MVVM-C /
  snapshot testing / VoiceOver / Dynamic Type / feature-flag
  telemetry-style — verify what 7F actually shipped). UIKit
  remains catalog-absent (deferred). Does Kenji's report read
  honestly now, or is the asymmetric SwiftUI-without-UIKit gap
  still load-bearing for migration-shop iOS shapes?
- **Watch for:** Time saved vs round 7 (was ~25s tax for 5 not-in-
  stack clicks). Are the new 6 iOS chips load-bearing for Kenji?
  Does UIKit's catalog absence still surface as a problem, or did
  the chip-set + named-not-in-catalog flow absorb it? Is the
  recruiter's mental model of Kenji's iOS depth complete in 8
  minutes now?

### 04 — NEW: Maya Patel (Senior Frontend, phone)

- **Persona:** 7 yr senior FE at a UK fintech (NOT enterprise — small
  product team). Owns the design system + a11y program for the consumer
  app. Reviews FE PRs from a team of 5. Recently led the Next.js
  12 → 14 App Router migration. Genuinely teaches Web Vitals.
- **Stack:** React 18, TypeScript 5.4 (deep), Next.js 14 (App Router,
  RSC), Tailwind, Storybook, Playwright, Vitest, Vercel.
  Methodology: WCAG a11y program ownership, Core Web Vitals
  budgets, design-system governance, RSC/streaming patterns,
  visual regression testing (Chromatic).
- **Channel:** Phone (10 min — senior screen).
- **Under round-8 test:** Senior FE is the *target* for 6F's Frontend
  chip-set (a11y / Web Vitals / design system / RSC / progressive
  enhancement / visual regression). Maya's methodology covers 5 of 6
  chips natively. Does the chip-set feel curated or arbitrary?
  Are any chips wrong-axis? Are critical FE chips missing (e.g.
  Storybook governance, micro-frontends, BFF patterns)?
- **Watch for:** With 7D's junior gate confirmed not to fire on
  senior, Maya's TS 5.4 deep should stay Green (no lowering). Her
  Next.js 14 should be Green clean. Are the chips load-bearing for
  her seniority verdict — i.e. does the headline `Y/G/R` plus chips
  paint the senior FE picture, or is the chip count irrelevant once
  the version-mode evidence is strong?

### 05 — NEW: Pooja Iyer (Senior Data Engineer, phone)

- **Persona:** 8 yr DE at a Bangalore B2B SaaS. Owns the warehouse +
  ingestion pipelines. Pure data side; no ML.
- **Stack:** Snowflake, dbt (Core + Cloud), Airflow 2.8, Python (data
  Python — pandas / polars / pyspark; doesn't write services),
  Postgres (source DB), Kafka (ingest source), Spark (legacy
  job migration target). Methodology: data modeling (Kimball
  dimensional), dbt-test-first discipline, contract testing on
  source tables, lineage tracking, cost-aware compute warehouse
  sizing.
- **Channel:** Phone (10 min).
- **Under round-8 test:** Data Engineer template flow. What's the
  catalog match-rate? Snowflake / dbt / Airflow / Spark — which are
  catalog entries vs named-not-in-catalog? Does the DE template
  preload the right techs, or is the recruiter making 4+ not-in-
  stack clicks for things Pooja doesn't touch (e.g. is ML
  preloaded by mistake)? Does the DE template have methodology
  chips, and are they right (Kimball / dbt-test / lineage /
  contract testing / cost-aware)?
- **Watch for:** Is the DE template a first-class flow or does the
  recruiter end up better off using Custom + named-not-in-catalog?
  Off-catalog count likely 2–4 (dbt almost certainly; Snowflake
  added in catalog 2.0 refresh; Airflow uncertain). If
  named-not-in-catalog count exceeds scored, does 6E auto-promote
  kick in for a senior DE shape?

### 06 — NEW: Diego Ramos (Mid-Senior Mobile Cross-Platform, phone)

- **Persona:** 5 yr at a Mexico City consumer fintech (not banking;
  remittance / wallet). Pure React Native — never wrote native iOS
  or Android in production. Owns the RN app, ships to both stores
  weekly. Genuinely uses Expo as deploy infra. Recently evaluated
  Flutter for greenfield but team stayed RN.
- **Stack:** React Native 0.74, Expo SDK 51, TypeScript 5.3,
  React Navigation, Reanimated 3, react-native-firebase (push +
  analytics + crashlytics), Detox (E2E), Fastlane. Methodology:
  RN-specific perf (Hermes / interaction handles), OTA updates
  via Expo, two-store release coordination, A/B at the JS layer.
- **Channel:** Phone (8 min).
- **Under round-8 test:** New `mobile-cross-platform` sub-template
  (preloads react-native + expo + flutter). Is Flutter preloaded
  an asset (Diego evaluated it) or noise (he doesn't ship it)?
  Are the 6 cross-platform methodology chips right for an
  RN-on-Expo shop (vs. RN bare-workflow vs Flutter-only)?
  Note: Diego is mid-senior, so 6A softener applies if anything's
  stale; 6C junior gate doesn't (he's not junior).
- **Watch for:** Time-to-Summary on a single-platform-cross-platform
  candidate. Is mobile-cross-platform genuinely cross-platform-
  focused, or does it preload three competitors as if the candidate
  knows all three? Does the chip-set feel RN-Expo-friendly, or
  does it lean Flutter? Are there cross-platform-canonical
  methodologies missing (e.g. native-module bridging, two-store
  release timing, OTA-update governance)?

---

## Diversity check

| # | Persona                       | Channel | Primary round-8 lens                                  |
|---|-------------------------------|---------|-------------------------------------------------------|
| 01 | Mei (Junior FE)              | Phone   | 7D depth-lowers-on-junior end-to-end                  |
| 02 | Anil (Staff SA)              | Video   | 7C cappedFromColor + Scope-capped headline card       |
| 03 | Kenji (Senior iOS)           | Phone   | 7F mobile-ios sub-template + iOS chip-set composition |
| 04 | Maya (Senior FE)             | Phone   | Senior FE chip-set design-system-owner shape (NEW)    |
| 05 | Pooja (Senior DE)            | Phone   | Data Engineer template catalog match-rate (NEW)       |
| 06 | Diego (Mid-Senior Mobile XP) | Phone   | mobile-cross-platform sub-template + RN-Expo shape (NEW) |

Channels: 5 phone (primary use case), 1 video (HM-presence test).
Mix: 3 redux personas (validate 7A-F ship landed) + 3 new (push into terrain).
