# Cross-cut — 2026-05-17 round 8 post-7F validation

**6 sessions.** 5 phone / 1 video. Cast: 3 redux personas (Mei / Anil /
Kenji — composition stress for yesterday's 7A–F ship) + 3 new shapes
(Maya senior FE / Pooja senior DE / Diego mobile cross-platform — extend
coverage to untested terrain).

**Headline result: 2 Safe / 4 At-risk / 0 Unworkable** — a step back from
round 7's 3/3/0 distribution, but every At-risk is named with a concrete
surgical fix. **No fundamental scoring failures**; every miss is one of
(1) UI rendering not catching up to a scoring-layer ship, (2) a scoring
branch missing a case, (3) a chip-set quality regression, or (4) a
template / catalog gap on a never-validated role. Each is ~15-30 LOC.

## What round 8 answered

1. **7D ships correctly at the scoring layer — but the UI rendering is
   incomplete.** Mei's TS 5.3 + shallow + junior correctly drops
   Green→Yellow per `scoring.ts:45-50` and the `"(lowered from Good by
   shallow depth)"` label per `scoring.ts:386-388`. However:
   - **`TechCard.tsx:20` calls `resolveTier(tech, item)` WITHOUT
     `seniority`** — the card badge during data entry does NOT lower,
     while the right-side GuidancePanel (driven from `Assessment.tsx:67`
     which DOES pass seniority) does. Card-badge vs. side-panel
     disagreement on the same screen for the same item.
   - **`GuidancePanel.tsx:51-55` and `TechCard.tsx:161-165` both
     hardcode "Tier improved by one step…" / "Depth raised this one
     tier — credit given" on `depthAdjusted: true`** — but for 7D's
     new `direction: 'lowered'` case this copy is a lie. Both render
     paths assume `depthAdjusted` only ever meant "lifted"; 7D broke
     the assumption silently. Two locations both need a branch on
     `depthDirection`.

2. **7C closes 5ξ for Green-base architect-capped techs, but doesn't
   fire on Yellow-base architect-capped techs.** Anil's AWS / K8s /
   Terraform / Postgres (4 of 5) all read
   `"Review / Probe (capped from Good by architect scope)"` and feed
   `Scope-capped: 4`. Marcus's minute-18 read works. **But Anil's
   Azure at 5/13 = 38% (just under 6D's 40% floor) lands as
   baseColor=Yellow, which means `applyScope` line 79-95 only enters
   the cap branch when pre-cap is Green** (`SEVERITY[adjusted.color]
   < SEVERITY.yellow`). Architect scope on a baseline-Yellow tech
   passes through with `scopeCapped: false`, `cappedFromColor:
   undefined`. Azure reads as plain "Review / Probe — 5/13"
   identical to a thin-Azure mid-engineer. The Staff-IC framing
   is invisible whenever the underlying coverage doesn't cross 40%.

3. **7D senior-preserve gate holds cleanly.** Maya (TS 5.4 + deep +
   senior) hits `sev === 0` early-return at `scoring.ts:41`. TS 5.4
   + shallow + senior falls through the junior-only guard at
   `scoring.ts:45`. Both stay Green. The inverse-Mei verification
   for 7D is successful — the gate doesn't over-correct.

4. **7F mobile-ios sub-template ships clean.** Kenji's 8-min call
   has 0 not-in-stack clicks (vs. ~5 in round 7 — ~25s reclaimed).
   2 preloaded techs, 6 iOS-canonical chips, no Android/cross-platform
   contamination. Inverse-Mei equivalent for 7F: the template-shape
   ship validates end-to-end on its target persona.

5. **7E flag audit is cleanly silent on senior current-stack
   reports.** Maya (senior FE), Kenji (senior iOS, Swift 6.0),
   Diego (mid-senior, RN 0.74) all hit Green tiers and the
   reassurance-note path doesn't run. **But Diego's session flagged
   a potential over-correction**: a hypothetical RN-0.68 shop (still
   widely shipped, legacy bridge architecture) now reads as plain
   Yellow without softener — likely the same overcorrection profile
   that drove the Selenium 3 / Cypress 10-11 tier-level-flag pattern.

## What round 8 revealed for the first time

6. **7F mobile-cross-platform chip-set has 3 quality defects.** Diego
   walked the chip-set and surfaced:
   - **`code-sharing-strategy` chip references KMP** (Kotlin
     Multiplatform — a *competing-framework* strategy). An RN-Expo
     developer would never tick this. Wrong axis. **Replace with
     `ota-update-governance`**.
   - **`native-bridge-perf` uses RN-specific "JS thread budget"
     terminology** that doesn't apply to Flutter. Rename to
     vendor-neutral.
   - **OTA update governance + two-store release coordination are
     missing entirely from the chip-set.** Both are canonical
     cross-platform 2026 differentiators; Camila free-texted both,
     which means the chips failed their job.
   - **Flutter preload is the wrong default** for the 2026 LatAm/SEA
     recruiter market — RN and Flutter are *competitive*, not
     complementary, so for every RN-shop the recruiter eats a
     not-in-stack click. Defer (sub-sub-template split is bigger
     scope); fix chips first.

7. **DE template (`data`) preloads Databricks instead of Snowflake.**
   Snowflake exists in catalog as 12-service checklist
   (`technologies.json:1221`) but isn't preloaded. The first-ever
   DE validation (rounds 1-7 had no DE in cast) caught this — every
   Snowflake DE eats a search-add step; every Databricks DE gets a
   free card. The DE-shape ↔ DBA-shape parallel: round-6 6F made
   Oracle a first-class DBA preload; round-8 should make Snowflake
   a first-class DE preload (alongside Databricks, not replacing
   it — Pooja's stack has both worlds).

8. **DE template methodology chip-set misses 2026 senior-DE
   differentiators.** Current chips: Kimball / lakehouse / data
   contracts / slowly-changing dims / data-quality SLOs / medallion.
   Pooja volunteered three chips that aren't there: **data lineage
   (OpenLineage), CDC discipline (Debezium), cost-aware warehouse
   sizing (FinOps)**. dbt test-first practice also missing. This
   is the DE-shape J4/J5 — sibling to 6F (DBA chips) and 7A
   (Backend chips). 6-chip cap means swap, not add.

9. **DE template missing `techScopes`** — Postgres + Kafka silently
   read as operator when Pooja said reviewer (her warehouse reads
   from these but she doesn't own them). Same fix pattern as
   round-5 5δ on the SA template; trivial. Reframe via 6F-style
   data-modeling chip refresh + scope assignment.

10. **6E-b auto-promote threshold confirmed wrong for senior DEs.**
    Pooja had 6 named-only (Debezium / GE / OpenLineage / MSK /
    EMR / Snowpark UDFs) and 8 scored — promote didn't fire at
    `> scored`, burying her actual senior-differentiating
    infrastructure four sections down. Confirms round-7 Kenji R3's
    flag: threshold should change from `> scored` to `> scored + 1`
    (still avoids promotion when balanced; still fires for
    `Owen 5 named > 2 scored` and `Pooja 6 named > 8 scored` cases
    have different read — actually Pooja's 6/8 wouldn't promote
    under either rule, suggesting the real fix is **catalog the
    missing named-only entries** rather than tweak the threshold).
    Verdict: catalog the canonical DE off-catalog set instead.

11. **Frontend `progressive-enhancement` chip is wrong-axis for 2026
    senior FE shops** (Maya). Logged-in consumer fintech / internal
    tools / B2B SaaS — none of them lead with PE as the senior
    differentiator. Maya skipped it; volunteered **bundle-size
    budgets** instead. Replace.

12. **Senior FE J3-equivalent gap: Storybook governance is the
    highest-leverage activity in Maya's role and lands in
    off-catalog free-text** instead of a Strengths card. Mirror
    6F's Oracle/PL-SQL pattern: catalog Storybook as
    checklist-mode tech with governance / visual-regression /
    interaction-tests / a11y-runner services, preload in Frontend
    template. ~30 min catalog work + 1 template edit; defer
    (separate from chip swap).

13. **UIKit catalog absence is more visible after 7F** (Kenji).
    Half of Kenji's daily work has no verdict surface. Round 7
    deferred this as ~30 min work; round 8 confirms it's not
    peripheral. Should be on a near-term ship batch.

14. **SwiftUI 6/10 = 60% lands Yellow on checklist mode** (Kenji).
    Reaches Green only via 6D depth-lift. The `< 25 R / 25-66 Y /
    ≥ 66 G` thresholds on a 10-service checklist (`scoring.ts:
    447-451`) means a candidate needs ≥7 services for a Green
    coverage base. Surfaces as a backlog candidate but not
    actionable in this round.

## Two new defects named

- **8α-tier-cap-on-yellow-base (Anil).** Architect/reviewer scope cap
  is invisible on baseline-Yellow techs because `applyScope` early-
  returns when `adjusted.color === yellow`. Should still set
  `scopeCapped: true` with `cappedFromColor: undefined` (or with
  `cappedFromColor: 'yellow'`) so composeLabel can render
  "(capped — architect scope)" and the Scope-capped headline count
  includes it. ~15 LOC in `scoring.ts:79-95`.

- **8β-depth-direction-ui-mismatch (Mei).** Two UI render paths
  (TechCard depth-note, GuidancePanel depth-explainer) treat
  `depthAdjusted: true` as identical to `direction: 'lifted'`. 7D
  introduced `direction: 'lowered'` but didn't update either
  callsite. Plus TechCard's own `resolveTier` call drops
  `seniority`, making the card-badge disagree with the side-panel.

## Validation matrix per shipped fix (7A–7F)

| Fix | Held? | Notes |
|-----|-------|-------|
| **7A** (Backend chips) | ✅ | Not directly tested this round (no backend redux); confirmed live in code at `roles.ts`. |
| **7B** (neutral softener wording) | ✅ | Live in `scoring.ts:195`. Pooja's Spark-moved-off case actually doesn't trigger softener (her lastUsed is recent), but Diego's hypothetical RN-0.68 trigger would now read neutrally. |
| **7C** (cappedFromColor + Scope-capped card) | ⚠️ | **Fires correctly for Green-base; misses Yellow-base architect-capped.** Anil's Azure at 38% is invisible to the headline. 8α fixes this. |
| **7D** (junior depth-lowers tier) | ⚠️ | **Scoring layer correct; UI rendering incomplete on 3 callsites.** 8β fixes this. |
| **7E** (`enterpriseStillUsed` audit) | ⚠️ | Clean for current-stack senior reports. **May have over-corrected on RN legacy** — Diego's R5 says restore tier-level flag for 0.63-0.68 band only (Selenium 3 / Cypress 10-11 pattern). |
| **7F** (Mobile sub-templates) | ✅⚠️ | **mobile-ios ships clean** (Kenji's call: 0 not-in-stack clicks, time reclaimed). **mobile-cross-platform chip-set has 3 quality defects** (Diego F2-F4: KMP wrong-axis, native-bridge-perf RN-only, OTA + two-store missing). UIKit catalog absence (deferred 7F) confirmed load-bearing. |

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- Round 5: 1 Safe / 5 At-risk / 0 Unworkable
- Round 6: 2 Safe / 4 At-risk / 0 Unworkable
- Round 7: 3 Safe / 3 At-risk / 0 Unworkable
- **Round 8: 2 Safe / 4 At-risk / 0 Unworkable**

Backslide vs. round 7. Reading the trajectory: rounds 3-7 trended toward
saturation as low-hanging fruit landed. Round 8 introduced **3 new
personas in 3 untested terrain slices** (senior FE design-system,
Data Engineer, Mobile cross-platform), and each named a structural gap
the prior rounds couldn't have caught. The At-risk distribution this
round is *new ground*, not *regressions* — every flagged item is a
template/chip/scoring-branch gap on a never-validated path, plus the
2 UI follow-ons to yesterday's scoring-layer ships.

## The 6 sessions at a glance

| # | Persona              | Channel | Rating | Headline finding |
|---|----------------------|---------|--------|------------------|
| 01 | Mei (Junior FE)     | Phone   | At-risk | 7D scoring layer correct; 2 UI render-paths still claim "Tier improved" on lowered; TechCard drops seniority prop |
| 02 | Anil (Staff SA)     | Video   | At-risk | 7C closes 5ξ for Green-base; Azure 38% (Yellow-base) reads plain Yellow — Staff-IC framing invisible |
| 03 | Kenji (Senior iOS)  | Phone   | Safe (iOS) / At-risk (UIKit-half) | 7F mobile-ios clean; UIKit absence is the residual structural gap |
| 04 | Maya (Senior FE)    | Phone   | Safe    | 7D senior-preserve gate works; PE chip wrong-axis; Storybook = senior J3-equivalent |
| 05 | Pooja (Senior DE)   | Phone   | At-risk | DE template preloads Databricks not Snowflake; missing 2026 chips (lineage/CDC/FinOps); no techScopes |
| 06 | Diego (Mid-Sr XP)   | Phone   | At-risk | mobile-XP chips have wrong-axis KMP + missing OTA/two-store; 7E may have over-corrected on RN legacy |

## Priority list — round 8 (top 6)

| ID | Severity | Effort | Item |
|----|----------|--------|------|
| **8A** | High | ~20 LOC | **8β UI rendering for 7D `lowered` direction.** Pass `seniority` to `resolveTier` from `TechCard.tsx:20`. Branch the "Depth raised this one tier — credit given" / "Tier improved by one step" copy in `TechCard.tsx:161-165` and `GuidancePanel.tsx:51-55` on `depthDirection === 'lowered'`. Eliminates card-badge vs side-panel disagreement and the misleading "credit given" framing on the lowered case. |
| **8B** | High | ~15 LOC | **8α extend 7C to baseline-Yellow architect cap.** In `applyScope` (`scoring.ts:79-95`), the reviewer/architect branch only sets `scopeCapped: true` when `SEVERITY[adjusted.color] < SEVERITY.yellow`. Extend to set `scopeCapped: true, cappedFromColor: undefined` even when already at Yellow, so composeLabel can render "(capped — architect scope)" and the Scope-capped headline counter includes it. Anil's Azure 38% becomes visible as Staff-IC-shaped. |
| **8C** | High | ~6 chip edits | **mobile-cross-platform chip-set rewrite** (Diego F2-F4). Replace `code-sharing-strategy` (KMP) with `ota-update-governance`. Rename `native-bridge-perf` to vendor-neutral. Add `two-store-release-coordination` chip (likely replace `offline-first-xplat` or `platform-overrides`). Three vendor-neutral, RN-Expo + Flutter both can tick. |
| **8D** | High | ~10 LOC | **Data Engineer template fixes** (Pooja F1, F2, F4). Add `snowflake` to `data` template `techIds` (after sql). Add `techScopes: { postgresql: 'reviewer', kafka: 'reviewer' }`. Swap 2 of 6 chips: drop `slowly-changing-dims` + `data-lakehouse`; add `data-lineage` + `cdc-discipline` (or `cost-aware-warehouse-sizing`). |
| **8E** | Medium | ~2 LOC | **Frontend chip swap** (Maya M1). Replace `progressive-enhancement` chip with `bundle-size-budgets` chip on `frontend` template. |
| **8F** | Medium | ~30 min | **UIKit catalog entry** (Kenji R5). Add UIKit as checklist-mode catalog entry, services list (UIView programmatic / Storyboards / Auto Layout constraints / UIKit Dynamics / UIViewController lifecycle / Combine bridging / accessibility). Not template-preloaded (mobile-ios is SwiftUI-focused); recruiter adds via search when relevant for migration shops. |

### Deferred / cosmetic backlog

- **8α-color-distinction** — 3 muted-pastel headline cards (emerald-100 /
  sky-100 / slate-100) at-a-glance confusable. Bump one tone to mid-saturation
  or swap a card icon for higher contrast. Cosmetic.
- **7E RN tier-level restoration** (Diego F5) — restore `enterpriseStillUsed`
  on RN tier covering 0.63-0.68 only, mirroring Selenium 3 / Cypress 10-11
  pattern. Verify exact tier `min` boundaries first. Defer.
- **Storybook catalog entry** (Maya M2) — checklist-mode, 7-8 services
  (governance / visual regression / interaction tests / a11y runner / docs /
  composition / addon ecosystem). ~30 min. Defer to a catalog-refresh batch.
- **Catalog drift** (Mei F8) — Next.js `currentVersion: "16"` doesn't match
  2026 actuals (15.x). General catalog audit needed; defer.
- **J4 / J5 still open** but partially absorbed by 7D's lowered-label
  carrying junior context. ~10 LOC each; lower urgency post-8A.
- **6E threshold rethink** (Pooja F3 + Kenji R3) — change root fix is to
  catalog Debezium / GE / OpenLineage / asyncapi-data-contracts so they
  don't fall to named-only. Bigger lift; defer.

## Recommended ship order

**Single batch (~75 LOC + chip data):** 8A + 8B together — both close
named composition gaps on yesterday's ships, both touch `scoring.ts` +
UI components only, both are 1-day-staleness fixes that complete
yesterday's work. Highest priority.

**Catalog/template pass:** 8C + 8D + 8E + 8F as one consolidated catalog
+ template refresh (no `scoring.ts` touches). Touches `roles.ts` +
`technologies.json` only. Predictable; suits the test-and-commit cadence.

If forced to pick three: **8A + 8B + 8D.** 8A and 8B close yesterday's
incomplete ships; 8D closes the first-ever-DE validation gap. Together
those three cover the four At-risk reports' load-bearing findings.
