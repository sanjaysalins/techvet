# Cross-cut — 2026-05-16 round 7 post-6F validation

**6 sessions.** 5 phone / 1 video. Cast: 3 redux personas (Owen / Anil /
Mei — composition stress for today's 6A–F ship) + 3 new shapes (Kenji
iOS / Sven mid backend / Eitan junior backend — extend coverage to
untested terrain).

**Headline result: best validation distribution across 7 rounds (3 Safe
/ 3 At-risk / 0 Unworkable). The 6A–6F batch did exactly what it was
meant to do for Owen — the canonical "all the fixes converge"
result.** Anil sharpened the 5ξ open question into a concrete proposal.
Mei + Eitan confirmed 6C closed J2 cross-role, and named which junior
defects (J1/J4/J5) are still load-bearing. Sven exposed one wrong call
in 6F (Backend chip-deferral). Kenji exposed three more (Mobile ship
asymmetric / preload scaled wrong / iOS-chip miss-rate).

## What round 7 answered

1. **The 6 fixes compose end-to-end for Owen.** Round-6 was At-risk
   with `2G/0Y/0R` misleading headline; round-7 is Safe with
   `4G/0Y/0R/Methodology:5/Off-catalog:2` and ~80s reclaimed in the
   10-min phone budget. 6F-cat + 6F-tpl + 6D + 6E-a all fire on the
   same persona without composition friction. Biggest validation
   win of any round.

2. **5ξ "Senior tier above Yellow" is sharply load-bearing.** Anil's
   sim traced the mechanics: 6D's lift FIRES correctly in
   `resolveChecklistTier` (`scoring.ts:416-420`) but then
   `applyScope`'s architect branch (`scoring.ts:63-69`) zeroes the
   `depthAdjusted` flag — the lift evidence is structurally erased.
   Headline stays `0G/5Y/0R/Meth:6`. Concrete proposal: add
   `cappedFromColor: TierColor` to `ResolvedTier`, set by
   `applyScope`'s cap branches, surfaced via `composeLabel` and a
   new "Architect-pass: N" 5th headline card.

3. **6C closed J2 cleanly cross-role.** Mei (FE) + Eitan (Backend)
   independently confirmed: `enterpriseStillUsed` softener +
   reassurance note suppressed when `seniority === 'junior'` across
   all 3 paths (`scoring.ts:154`, `:253`, `:291`). Penalty branch
   correctly stays un-gated.

4. **J1/J4/J5 are open and cross-role.** Mei + Eitan both demonstrate:
   J1 (depth never lowers a tier — TS 5.3 + shallow + junior still
   reads identical to senior author; Postgres 16 + shallow + junior
   reads Green) is the next sharpest junior gap. J4 (scope dropdown
   ~20s tax per junior) and J5 (headline cards carry no seniority
   signal) compound the misreading.

## What round 7 revealed for the first time

5. **6F Backend chip-deferral was wrong** (Sven). The free-text hint
   copy at `Assessment.tsx:447` lists only Mobile/Frontend/Security
   examples ("release automation, MVVM, threat modelling") — reads to
   a backend recruiter as "this section is for other roles." Sven's
   senior signal (contract testing / feature flags / OTel / Pact /
   idempotency) was nominally captureable via 6B's free-text fallback
   but a junior recruiter captures 0–1 of 5 in the 8-min budget.

6. **6A softener's "returner shape" framing misfires** on the
   "moved-off" case (Sven). Sven deliberately moved off AWS Lambda
   18mo ago — he's a current employee, not a returner. The note text
   ("returner shape; expect ramp-up rather than concern") mis-frames
   the verdict. Color is defensible; narrative is wrong.

7. **6F Mobile ship has 3 structural defects** (Kenji):
   (a) **asymmetric** — SwiftUI shipped first-class but UIKit didn't,
   so for a UIKit→SwiftUI migration shop (Kenji's actual job) half
   the daily work has no verdict surface; (b) **preload scaled the
   wrong direction** — 5 → 7 cards means every single-platform Mobile
   candidate dispatches 5 not-in-stack clicks instead of 4 (Priya's
   round-6 R3 had explicitly recommended a stack chooser
   Android/iOS/Cross-Platform instead); (c) **chip-set 50% miss-rate
   for native iOS** — Crashlytics is Firebase-specific (Apple uses
   Xcode Organizer), ABI splits are Android-only, offline-first is
   wrong for banking-by-regulation; missing iOS-canonical: MVVM-C,
   snapshot testing, VoiceOver / Dynamic Type.

8. **`enterpriseStillUsed: true` is a 2026 catalog mismatch on
   modern defaults** (Sven bonus). Currently fires the reassurance
   note on Kubernetes, Kotlin, Swift, React Native, Flutter,
   Terraform, Docker — these are the modern default in their
   ecosystems, not legacy. Flag audit removes the note for ~7 entries.

9. **K8s + Helm-consumer mismatch** (Sven). Kubernetes is version-mode
   only — no service slice. Sven's "deploys via owned Helm chart"
   shape (and Brigit's round-5 similar) has no surface to capture.
   Hybrid mode (version tier + checklist services) would fix it.

10. **6E auto-promotion threshold too loose for small-N** (Kenji).
    `4 named-only > 2 scored` fires `>scored` promotion, but for
    small-N reports (4 named-only on 6 total) the visual reorder is
    over-eager. `> scored + 1` tightens it without losing the
    Owen-shape (5 named-only > 2 scored still promotes).

## Two new defects named

- **7B-tier-note-mismatch (Eitan).** 6C closed 2/3 paths for junior
  gating (softener + enterpriseNote) but the tier `note` field is
  untouched. Spring Boot 2.x tier note "verify migration awareness"
  mis-fits junior-inherited-legacy (Eitan never chose to be on 2.5 —
  his team inherited it). Junior shouldn't be probed for migration
  awareness on a stack they didn't pick.

- **7C-backend-preload-junior-noisy (Eitan).** Backend template
  preloads K8s + Python + Redis. For a junior backend (Node-only,
  no K8s, no Python, no Redis) that's 3 of 6 not-in-stack clicks
  = ~9s tax on a 6-min budget.

## Validation matrix per shipped fix (6A–6F)

| Fix | Held? | Notes |
|-----|-------|-------|
| **6A** (checklist softener) | ⚠️ | Code-correct; **note text "returner shape" misfires** on moved-off cases (Sven). Reword required. |
| **6B** (always render Methodology section) | ⚠️ | Renders correctly. **Hint copy lists Mobile/FE/Security examples only — Backend recruiter reads as "not for me."** |
| **6C** (seniority junior gate) | ✅✅ | Cross-role confirmed (FE Mei + Backend Eitan). Closes J2 cleanly. Penalty branch correctly un-gated. |
| **6D** (checklist depth-lift) | ⚠️✅ | Fires correctly when it should (Owen 8/14+vd → Green). **Erased by `applyScope` architect cap on Anil's SA shape** — that's the 5ξ open question. |
| **6E-a** (5th headline card) | ✅ | Fires for Owen (4 vs 2 → 4-card grid + promotion) and Kenji (4 vs 2 — but promotion may be too eager). |
| **6E-b** (auto-promote named-only) | ⚠️ | **Threshold too loose for small-N reports** (Kenji 4 named > 2 scored fires promotion that may not be merited). `> scored + 1` tighter. |
| **6F-cat** (Oracle/PL/SQL/Compose/SwiftUI) | ✅✅ | All 4 entries land; Owen's "5 zero-result searches" closed. Highest-leverage single fix in 6F. |
| **6F-tpl** (DBA template + Mobile/FE chips) | ⚠️✅ | DBA template lands (closes Owen template paralysis). Mobile preload scaled wrong direction (Kenji R-bisect). Backend chip-deferral wrong (Sven). FE chips correct for senior, suboptimal for junior (J3 partial). |

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- Round 5: 1 Safe / 5 At-risk / 0 Unworkable
- Round 6: 2 Safe / 4 At-risk / 0 Unworkable
- **Round 7: 3 Safe / 3 At-risk / 0 Unworkable** ← best to date

Owen's round-6 → round-7 At-risk → Safe is the trajectory in
miniature. The remaining At-risks are no longer "tool fundamentally
broken on phone" — they're three specific composition gaps: a wrong
6F call (Backend chips), a load-bearing structural fix not yet
shipped (5ξ), and one junior gate that landed but only partial (6C
without J1 follow-on).

## The 6 sessions at a glance

| # | Persona              | Channel | Rating | Headline finding |
|---|----------------------|---------|--------|------------------|
| 01 | Owen (Senior DBA)   | Phone   | **Safe** ↑ from At-risk | 6 fixes compose end-to-end; ~80s reclaimed; cleanest validation win across 7 rounds |
| 02 | Anil (Staff SA)     | Video   | Safe    | 5ξ traced + concrete `cappedFromColor` proposal; 6D fires but `applyScope` erases the evidence |
| 03 | Mei (Junior FE)     | Phone   | Safe / report-At-risk | 6C closes J2 cleanly; J1/J4/J5 still open; FE chips OK but seniority-blind |
| 04 | Kenji (Senior iOS)  | Phone   | Safe-fragile | 6F Mobile ship has 3 structural defects (asymmetric SwiftUI/UIKit; preload scaled wrong; iOS chip miss-rate 50%) |
| 05 | Sven (Mid Backend)  | Phone   | At-risk | 6F Backend chip-deferral wrong; 6A "returner" framing misfires; K8s + flag audit needed |
| 06 | Eitan (Junior Backend) | Phone | At-risk | 6C confirmed cross-role; J1/J4/J5 also open on Backend; 7B-tier-note + 7C-Backend-noisy named |

## Priority list — round 7 (top 6)

| ID | Severity | Effort | Item |
|----|----------|--------|------|
| **7A** | High | ~5 LOC + 6 chips | **Backend `methodologyChips`** (contract testing / event-driven / feature flags / OTel / idempotency / circuit breakers). Fixes 6F Backend deferral mistake — Sven's senior signal becomes capturable by any recruiter. |
| **7B** | High | ~10 LOC | **Reword 6A softener** to drop "returner shape" framing. Proposed neutral wording (Sven R1): *"Stale (2-4 yr) but the version was current at last-use — defensible older usage; probe whether the candidate is returning to it or deliberately moved off."* Handles returner / moved-off / team-won't-upgrade all three. |
| **7C** | High | ~30 LOC | **5ξ "Senior tier above Yellow"** — add `cappedFromColor: TierColor` to `ResolvedTier` (set by `applyScope`'s cap branches at `scoring.ts:63-77`); `composeLabel` differentiator ("capped from Good by architect scope" vs plain "Review / Probe"); 5th sky-toned "Architect-pass: N" headline card parallel to Methodology. Anil's headline becomes `0G / 2Y / 0R / Meth:6 / Architect-pass:3`. |
| **7D** | High | ~30 LOC | **Junior J1 — depth-can-lower-tier when seniority specified.** When `meta.seniority === 'junior'` AND `depth === 'shallow'`, Green → Yellow with note. Mei (TS) + Eitan (Postgres) both demonstrate load-bearing. Penalty branch in `adjustForDepth`; gated on seniority to avoid breaking unspecified-seniority defaults. |
| **7E** | Medium | ~15 LOC + flag audit | **`enterpriseStillUsed` flag audit.** Remove from modern-default entries: kubernetes, kotlin, swift, react-native, flutter, terraform, docker. Most-current ecosystem versions don't need the "still widely used in enterprise" reassurance. Also promote K8s to hybrid mode (keep version-tier; add 8-service checklist for Helm-consumer shape). |
| **7F** | Medium | ~30 LOC | **Mobile template stack chooser** (Priya R3 + Kenji R-bisect — second confirmation). On template pick, prompt for Android / iOS / Cross-Platform / Mixed. Each sub-template preloads only the relevant techs (3 instead of 7). Closes the round-6 + round-7 "5 not-in-stack clicks" friction. Optional: Mobile chip-set splits the same way (iOS gets MVVM-C/snapshot/VoiceOver). |

### Deferred / cosmetic backlog

- **J4 (junior scope dropdown gating)** — hide on `seniority === 'junior'`. Mei + Eitan ~20s tax each.
- **J5 (level-fit line below headline cards)** — copy fix; ~10 LOC.
- **7B-tier-note (Eitan)** — tier `note` field also needs junior-aware version per fix; small.
- **6E threshold tighter** — `> scored + 1` instead of `> scored` (Kenji small-N over-eager).
- **UIKit catalog entry** — closes 6F asymmetry (Kenji R1, 30 min).
- **Mobile iOS chip expansion** — MVVM-C / snapshot / VoiceOver / vendor-neutral Crashlytics (Kenji R2, ~15 LOC).
- **6γ tautology label** (Margarethe round-6 cosmetic).
- **5θ expand-back caret** for compact NamedOnlyEditor (Yasmin round-6 cosmetic).
- **5ι color A/B** emerald-100 vs slate/sky for Methodology card (Yasmin round-6 cosmetic).

## Recommended ship order

**Single batch (~50 LOC total):** 7A + 7B together. Both small, both close named composition gaps, both land in `roles.ts` + `scoring.ts` only.

**Single big-rock:** 7C (5ξ). Touches `types.ts` + `scoring.ts` + `Summary.tsx`, but the surface is bounded and the design is concrete from Anil's session. ~2 hours focused work.

**Junior pair (~40 LOC):** 7D + J4 + J5. All three target the same axis (juniors); ship together so the junior-shape PDF improves coherently rather than in three uncoordinated edits. Mei and Eitan should both re-validate after.

**Catalog refresh:** 7E + 7F together. Touches catalog data + Mobile template. Should also fold in K8s hybrid mode + UIKit catalog + Mobile iOS chip expansion as one consolidated 6F-completion pass.

If forced to pick three: **7C (5ξ) + 7A (Backend chips) + 7D (J1).** Those are the three load-bearing structural items round 7 surfaced; everything else is polish.
