# Cross-cut — 2026-05-17 round 11 catalog-validation

**4 sessions.** 4 phone. Cast: 4 redux personas validating the round-11
catalog refresh (13 new entries — DevOps 6 / AI/ML 4 / QA 2 / iOS 1).
Lars / Akira / Esme / Kenji each carry deep usage of their respective
named-only batches from rounds 9-10; this round confirms each entry
lands cleanly on the persona it was designed for.

**Headline result: 4 Safe / 0 At-risk / 0 Unworkable — total saturation.**
Every catalog entry verified end-to-end:
- Lars: 6 of 6 DevOps entries searchable, render checklist correctly,
  named-only count 6 → 1 (only Kyverno remains).
- Akira: Pact + Cucumber both validate. Pact's 8 services match her
  real rollout shape. Cucumber's tier-level enterpriseStillUsed fires
  correctly on legacy 6.x band.
- Esme: All 4 AI/ML platform tools land. Operator default propagates
  via integrity exception list. Named-only count 4 → 0. Headline
  `12G/0Y/0R/0 named-only AI/ML gaps`.
- Kenji: UIKit checklist with all 10 services (swiftui-interop +
  accessibility load-bearing per round 7). Named-only count 6 → 5.

This is the cleanest round across all 11 rounds. No "At-risk" verdicts.
The 9B copy polish (round-10 Anil F4) also lands cleanly — recruiter-
friendlier scope-specific wording.

## What round 11 answered

1. **The 13 catalog adds close the named-only frontier surfaced across
   rounds 8-10.** Every entry was actively used by its target persona;
   every service list maps to recruiter-recognizable real-world patterns;
   no entry was rejected as not-applicable.

2. **MLOps operator-tool exception in the AI/ML K2 integrity guard
   works correctly.** Braintrust / Evidently / Feast / Langfuse all
   ship with `defaultScope: 'operator'` (per round-11 design — they're
   platform tools, not modelling libraries) while the K2 author default
   continues to fire for actual AI/ML libraries (PyTorch / HuggingFace
   / etc).

3. **9B copy polish reads honestly to recruiters.** Anil's wording
   complaint from round 10 ("review/architect-shape signal" reads
   clinical) closed: TechCard + Summary italics now say "Architect-
   scope verdict — designs how this gets used; doesn't operate it
   day-to-day."

4. **Per-minute signal density rises with each catalog add** (Esme F8).
   Esme's round-11 call went 4 min longer than round 10 because she
   actually had services to tick through (vs. 4 named-only chips
   skipped past) — but the headline report carries 4× the substantive
   evidence. Time spent is the wrong metric; *signal quality per minute*
   is the right one.

## What round 11 revealed for the first time

5. **Cucumber `currentVersion: "10.x"` is fiction** (Akira F6, real
   defect, ~5 LOC fix). Cucumber-JVM ships at 7.x, Cucumber-JS at 11.x,
   Cucumber-Ruby at 9.x — there is NO unified "10.x." A Cucumber-JVM 7
   user types "7", which falls past the existing `min: 6` tier and
   is misclassified as legacy. Fix: either remove `currentVersion` +
   add language-specific guidance, or switch to checklist mode (BDD
   discipline is the senior signal anyway).

6. **UIKit missing 3 canonical services** (Kenji follow-on F1). Senior
   iOS engineers touch weekly:
   - App / Scene lifecycle (UIApplicationDelegate / UISceneDelegate /
     UIWindowSceneDelegate)
   - Push notifications + background tasks (UNUserNotificationCenter +
     BGTaskScheduler)
   - Custom drawing (CoreGraphics / UIView.draw / CALayerDelegate)
   ~6 LOC catalog add.

7. **UIKit `enterpriseStillUsed` at root vs tier** (Kenji follow-on F2,
   F3). Root-level flag fires on every Yellow band (25-66% coverage),
   including thin coverage where reassurance can over-soothe tutorial-
   grade candidates. Sibling entries (Selenium 3, Cypress 10-11) gate
   on tier. Should UIKit follow that pattern? Honest argument both ways:
   UIKit is genuinely legacy-but-active across the entire 2026 iOS
   industry (root makes sense), but tier-level would tighten the
   tutorial-grade misfire. Defer.

8. **Feast `materialization` service conflates batch + stream** (Esme
   F5). Senior MLOps engineers ship one but not the other (Pooja-shape
   batch-only DEs; Esme-shape near-real-time fine-tuners). Single tick
   under/over-credits. Split into `batch-materialization` +
   `stream-materialization`. Defer — observe 1-2 more DE/ML personas
   before redesigning.

9. **Kyverno is the new named-only on DevOps** (Lars F7). Replaces
   Cosign-via-policy enforcement axis. Round-12 candidate if a second
   platform-eng persona also names it. Single-persona evidence is too
   thin to ship now.

10. **Crossplane category placement defensible at DevOps** (Lars F4,
    F5). No "IaC" or "Platform" category exists; splitting Crossplane
    alone would orphan it. Backstage similarly: in DevOps until
    Port/Cortex/OpsLevel join the catalog (then justify carving an
    IDP / Developer-Platform category for the cluster).

## Validation matrix per round-11 catalog entry

| Entry | Category | Held? | Notes |
|-------|----------|-------|-------|
| `argo-rollouts` | DevOps | ✅ | 8 services match Lars's real canary discipline. Searchable. |
| `karpenter` | DevOps | ✅ | NodePool + consolidation + spot story all surface. |
| `backstage` | DevOps | ✅ | Scaffolder + plugins + adoption discipline lands. |
| `unleash` | DevOps | ✅ | OpenFeature axis present. Strategies + lifecycle solid. |
| `crossplane` | DevOps | ✅ | Compositions + Functions present. Lars marked notUsed; no friction. |
| `cosign-sigstore` | DevOps | ✅ | SLSA + Rekor + admission-policy axis all present. |
| `braintrust` | AI/ML | ✅ | Operator default propagates. Scorers + CI integration honest. |
| `evidently-ai` | AI/ML | ✅ | Drift trio (data / prediction / concept) + test suites + integration. |
| `feast` | AI/ML | ⚠️✅ | Lands; materialization conflation flagged as follow-on. |
| `langfuse` | AI/ML | ✅ | Trace + prompt + eval + cost tracking. Self-host vs cloud surface. |
| `pact` | Testing | ✅ | Pact Broker + can-i-deploy + bi-directional all present. |
| `cucumber` | Testing | ⚠️ | Lands functionally; **`currentVersion: "10.x"` is fiction** — real defect (F6). |
| `uikit` | Mobile | ✅⚠️ | Lands; **3 canonical services missing** as catalog evolution debt (F1). |

## Two new defects named

- **11α-cucumber-currentversion** (Akira F6). `currentVersion: "10.x"`
  doesn't exist as a unified Cucumber version. Tier mins need
  language-context or the entry needs checklist conversion. ~5-20 LOC
  depending on approach.

- **11β-uikit-missing-services** (Kenji F1). Three canonical UIKit
  surfaces (app/scene lifecycle / push+background / custom drawing)
  absent from the catalog services list. ~6 LOC additions.

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- Round 5: 1 Safe / 5 At-risk / 0 Unworkable
- Round 6: 2 Safe / 4 At-risk / 0 Unworkable
- Round 7: 3 Safe / 3 At-risk / 0 Unworkable
- Round 8: 2 Safe / 4 At-risk / 0 Unworkable
- Round 9: 5 Safe / 1 At-risk / 0 Unworkable
- Round 10: 5 Safe / 1 At-risk / 0 Unworkable
- **Round 11: 4 Safe / 0 At-risk / 0 Unworkable** — *total* saturation

Three consecutive rounds in the saturated zone (9: 5/1/0, 10: 5/1/0,
11: 4/0/0). Round 11 is the first round with zero At-risk verdicts
across the diverse cast.

## The 4 sessions at a glance

| # | Persona              | Channel | Rating | Headline finding |
|---|----------------------|---------|--------|------------------|
| 01 | Lars (Senior DevOps) | Phone   | **Safe** | 6 DevOps entries land; named-only 6 → 1; +5 Greens |
| 02 | Akira (Senior QA)    | Phone   | **Safe** | Pact + Cucumber both validate; Cucumber currentVersion is fiction (F6 defect) |
| 03 | Esme (Senior AI/ML)  | Phone   | **Safe** | 4 platform tools land; named-only 4 → 0; signal density 4× |
| 04 | Kenji (Senior iOS)   | Phone   | **Safe** | UIKit lands; named-only 6 → 5; 3 follow-on services for catalog evolution |

## Priority list — round 11 (top 2 surgical + 4 deferred)

| ID | Severity | Effort | Item |
|----|----------|--------|------|
| **11A** | Medium | ~10 LOC | **Cucumber `currentVersion` fiction fix** (Akira F6). Drop the unified `currentVersion: "10.x"` claim; add language-context to existing tier `note` fields explaining ecosystem version splits. Less invasive than full checklist conversion. |
| **11B** | Low | ~6 LOC | **UIKit missing services** (Kenji F1). Add app/scene lifecycle + push/background tasks + custom drawing services to the existing UIKit checklist. |

### Deferred / cosmetic

- **11γ Feast materialization split** (Esme F5) — needs 2+ DE personas to confirm.
- **11δ Kyverno catalog** (Lars F7) — needs second platform-eng persona to confirm canonical.
- **11ε UIKit enterpriseStillUsed gating** (Kenji F2, F3) — design question (root vs tier).
- **Storybook checklist-mode conversion** (Maya M2 round 8) — half-day work.
- **Custom flow stack-focus picker** (Theo FT-2 round 10) — UX redesign.
- **K8s hybrid vetMode** (Sven round 7 deferred) — half-day implementation.
- **Postgres checklist mode** (Lina F3 round 10) — architectural change.

## Recommended ship order

**Single tiny batch (~16 LOC):** 11A + 11B. Both surgical, both close
real defects surfaced in round 11. After this, the autonomous block
should declare done — no more validation rounds add information
without first shipping more catalog/structural work.

**Saturation confirmed**: rounds 9 + 10 + 11 each show diminishing
At-risk and converging signal. Next valuable work after batch 12:
- A consolidated catalog refresh (Kyverno + Port/Cortex IDPs +
  vector-DB specific entries vs umbrella + Postgres checklist mode).
- The deferred structural items each warrant their own session.

**Don't run round 12.** It would just confirm 11A + 11B work and is
unlikely to surface new information. Stop after batch 12.
