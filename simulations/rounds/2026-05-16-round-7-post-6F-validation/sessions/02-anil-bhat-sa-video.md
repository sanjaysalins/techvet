# Session 02 — Anil Bhat (Staff+, Solution Architect) — round-7 redux

**Agent:** sim-02 (round-7 post-6F validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-7-post-6F-validation
**Channel:** Video panel (45 min; HM joins ~minute 18)
**Role template picked:** Solution Architect
**Round-6 baseline:** `/home/salinss/devtools/techvet/simulations/rounds/2026-05-16-round-6-post-medium-validation/sessions/02-anil-bhat-sa-video.md`
**Round-5 baseline:** `/home/salinss/devtools/techvet/simulations/rounds/2026-05-16-round-5-cumulative-validation/sessions/02-anil-bhat-sa-video.md`

## 1. Persona inhabited

Identical Anil to rounds 5 and 6. 14 yr enterprise architect, US fin-services
consultancy. Pre-sales + post-sales architecture, AWS Landing Zone + Azure
mgmt-group for regulated clients. He won't say "Kafka" voluntarily, he will
say "KMS multi-region keys" within 30 seconds, he speaks of Postgres in DDD
aggregates not `psql`. The *guardrail* / *blast radius* tells are unchanged.
Module-library author on Terraform — hasn't run `terraform apply` in 18 months.
Designs EKS topology, his platform team operates it.

The recruiter is the same external recruiter, same fin-services client
mandate, same Lucidchart-on-screen-share Zoom setup, same HM joining ~minute
18. The deltas between round 6 and round 7 should be attributable to a single
shipped fix: **6D — qualified checklist depth-lift** (Yellow → Green when
coverage ≥ 40% AND depth ∈ {deep, very-deep} AND seniority !== junior).

## 2. Video call — abbreviated

> R: picks **Solution Architect** template. Sets `channel=video`,
> `mandate="US fin-services SA; AWS landing-zone + Azure mgmt-group;
> regulated client"`. Hero loads 6 preloaded techs: AWS, Azure, Terraform,
> Kubernetes, Kafka, Postgres. All 6 carry `architect` scope from `techScopes`
> (5β + 5δ landed in round 5, validated round 6).
>
> R: "Anil, walk me through your AWS footprint."
> A: "Landing Zone + Control Tower, Organizations with SCPs at the OU level,
> IAM Identity Center federated to Entra, KMS multi-region keys with per-
> account aliases, Macie + GuardDuty + Security Hub aggregated to the central
> security account, Inspector on the workload accounts. The usual."
>
> [R: opens AWS card. Scope chip: `architect`. Ticks Landing Zone,
> Organizations, IAM Identity Center, IAM, VPC, KMS, Macie, GuardDuty,
> Security Hub, Inspector, CDK/CloudFormation, Step Functions. **12 of 22
> filtered services = 55%.** Sets `Depth = Very deep` because Anil
> articulates the SCP-OU topology and KMS multi-region without a beat.
> "X hidden" hint: "4 services hidden (filtered for Solution Architect)".]
>
> R: "Azure?"
> A: "AKS, Entra ID, Key Vault, Bicep for the tier-2 bank. Not as deep but
> it's there."
>
> [R: opens Azure card. Scope chip: `architect` (preloaded). Ticks AKS,
> Entra ID, Key Vault, Bicep. **4/13 = 31%.** Depth=Very deep (Anil
> describes Bicep tier-isolation patterns confidently).]
>
> [HM joins around minute 18.]
>
> R: "Terraform?"
> A: "I author the module library; haven't run apply in 18 months."
> [R: version "1.10", depth=Very deep, scope=architect, lastUsed="current".]
>
> R: "Kubernetes?"
> A: "EKS, multi-account topology. 1.30-ish. I design it, my platform team
> runs it."
> [R: version "1.30", depth=Very deep, scope=architect.]
>
> R: "Postgres?"
> A: "Schema design only. DDD aggregates, partitioning strategy. I don't
> operate."
> [R: leaves version blank, depth=Working (he's clear it's design-only).]
>
> R: "Kafka?" A: "Not in my world."
> [R: "Not in stack". Gray badge.]
>
> R: clicks methodology chips: TOGAF, C4 model, DDD, ADRs,
> Well-Architected reviews, EventStorming. **6 chips, ~12s.**
>
> R: Seniority=Staff+, years=14, path=Traditional. Hits Summary at
> minute ~24, exports PDF at minute ~33.

## 3. What TechVet would output (round-7, traced through the code)

Trace through `resolveTier` for each preloaded tech, in code order
(coverage/tier → depth → scope → recency):

| Tech | Mode | Raw | Depth | 6D fires? | applyScope (architect) | Final |
|------|------|-----|-------|-----------|------------------------|-------|
| AWS | checklist | 12/22 = 55% → **Yellow** | very-deep | **YES** — coverage≥40%, depth=deep, seniority≠junior → `adjusted={green,true}` | green caps to **yellow**, `depthAdjusted=false`, `scopeCapped=true` | **Review / Probe (capped — architect scope) — 12/22 services** |
| Azure | checklist | 4/13 = 31% → **Yellow** | very-deep | NO — coverage 31% < 40% floor | yellow passes through, `scopeCapped=false` | **Review / Probe — 4/13 services** *(no cap parenthetical — Yellow already, not capped from above)* |
| Terraform | version | 1.10 ≥ 1.10 → **Green "Excellent"** | very-deep (no-op, already Green) | n/a (version mode — 6D doesn't touch) | green caps to **yellow**, `scopeCapped=true` | **Review / Probe (capped — architect scope)** |
| Kubernetes | version | 1.30 ≥ 1.28 → **Green "Good"** | very-deep (no-op) | n/a | green caps to **yellow**, `scopeCapped=true` | **Review / Probe (capped — architect scope)** |
| PostgreSQL | version | blank → unknown-version **Yellow** (Fix B no-lift) | working | n/a | yellow passes through, `scopeCapped=false` | **Review / Probe** *(no cap parenthetical; `unknownVersion` italic chip)* |
| Kafka | n/a | notUsed=true | — | — | — | **Not in candidate's stack** (excluded) |

**Headline stat grid (4 cards):**

```
[ Good: 0 ]  [ Review / Probe: 5 ]  [ Concern: 0 ]  [ Methodology: 6 ]
   gray         amber                  gray            emerald
```

**Coverage chips:** `1 confirmed not in stack` (Kafka). **Channel chip:**
`Channel: Video panel`. **Candidate context line:** `Staff+ · 14 yr in
industry · Traditional path`.

**Methodology section:** 6 emerald chips.

**Radar:** Cloud + Database + DevOps categories rendered. Kafka excluded.

## 4. Accuracy judgement

- **Round 7 headline is identical to round 6 — `0G / 5Y / 0R /
  Methodology: 6`.** The headline didn't move because the only round-7
  shipment that could have moved it (6D) fires on AWS but is immediately
  erased by the architect scope-cap. Trace: `resolveChecklistTier`
  computes `adjusted = {color:'green', adjusted:true}` for AWS, then
  `applyScope` line 64 checks `SEVERITY[adjusted.color] < SEVERITY.yellow`
  → true → returns `{color:'yellow', depthAdjusted:false, scopeCapped:true}`.
  **The 6D lift is structurally invisible to scope-capped reports.** The
  regression test at `src/lib/__tests__/scoring.test.ts:350-364` pins this
  behavior explicitly (8/10 + very-deep + reviewer + senior → Yellow capped,
  `scopeCapped:true`, label "capped — reviewer scope"). It's by design,
  not a bug — but it means **6D as shipped does nothing for Anil.**

- **The 5 Yellow rows are no more differentiated than they were in round
  6 — but they're also no more *equal*.** Three subtle distinctions in
  the label text exist that an HM reading carefully could pick up:
  - **AWS** reads `(capped — architect scope) — 12/22 services` — capped
    parenthetical + coverage suffix. This is the "lifted from Yellow by
    6D then erased by architect" composite.
  - **Terraform / Kubernetes** read `(capped — architect scope)` — capped
    parenthetical, no coverage suffix (version mode).
  - **Azure** reads plain `Review / Probe — 4/13 services` — NO cap
    parenthetical because Azure was Yellow on raw coverage, scope didn't
    have to cap anything.
  - **Postgres** reads plain `Review / Probe` (no cap parenthetical, no
    coverage suffix, but `version unknown` italic chip).
  So the 5 Yellow row is actually `2 capped + 1 capped-from-green-coverage
  + 2 plain Yellow`. An HM skimming the badge text alone can't see this;
  an HM reading the inline scope-cap amber note can see 3 of the 5 have
  it. **The differentiation exists in fine print, not at headline glance.**

- **AWS specifically is mis-labelled by the composite trace.** AWS
  computes 6D-lift = Green internally, then architect-caps to Yellow with
  `depthAdjusted=false`. The amber cap note renders ("Capped by architect
  scope — operates differently than an operator-level signal would
  imply.") but the *upstream* signal — that the candidate cleared 6D's
  coverage AND depth AND seniority gates — is erased before any UI
  renders. **AWS at 12/22 + very-deep + staff is genuinely "would be Green
  but for scope"; the report says "Yellow, capped" with no breadcrumb
  back to the would-be-Green.** A label like `Review / Probe (capped from
  Good by architect scope) — 12/22 services` would carry one bit more
  signal — and the code already computes both halves; only `composeLabel`
  precedence (scopeCapped > depthAdjusted) drops the depth credit.

- **Where 6D would have fired (and didn't).** 6D's design is sound for
  the *non-scope-capped* SA — it would have lifted AWS to Green for a
  Staff Architect with operator scope. The trap is that the K2 template
  (round-3 fix) preloads architect scope on every infra tech in the SA
  template — exactly to prevent SAs reading as operators. So **6D's
  qualifying surface and K2's capping surface are perfectly orthogonal
  by design**, and Anil sits at the intersection where 6D can never
  reach. The 5λ structural finding (under-rating deep-narrow specialists)
  was supposed to be closed by 6D for the Owen DBA case; for the Anil
  SA case it's still wide open because the cap fires before the lift can
  surface.

- **Azure under-coverage is genuine.** 4/13 = 31% IS thin — Anil only
  named 4 Azure services and the catalog is operator-shaped (no
  architect-tag taxonomy on Azure; round-5 / round-6 cross-cut named this
  as out-of-scope but still open). This Yellow is the "honest" one in
  the bucket — Anil's Azure exposure is genuinely shallower than his AWS,
  so reading it the same colour as architect-capped Terraform is wrong in
  the other direction too. **Two different "Yellows" reading as the same
  badge: capped-from-strength (AWS / Terraform / K8s) and thin-coverage
  (Azure / Postgres).**

## 5. Friction during the call

- **Entry friction unchanged from round 6.** AWS checklist still fluent
  (~30s), Azure no-add (~15s), Terraform / K8s / Postgres ~10s each,
  methodology chips ~12s, Kafka not-in-stack ~1s. **Total recruiter input
  under 2 minutes** — no regression from any round-7 shipment. The 6F
  catalog refresh added 4 entries + Mobile/Frontend chips but none touch
  the SA path. No new dropdowns, no new chips on this template.

- **6D adds zero recruiter-side friction by design** (it fires
  automatically when the conditions hit). It also adds zero observable
  output for Anil. From the recruiter's side, round 7 is round 6 with
  no perceivable changes during the call OR in the report. The HM
  watching on screen-share sees the same `0G / 5Y / 0R / Methodology: 6`
  headline as last week.

- **Report-reading friction unchanged.** HM still sees a flat 5-Yellow
  bucket with the same architectural ambiguity round 6 named: "junior on
  senior infra" vs "Staff Architect capped by scope" still both read
  Yellow. The cap-amber note differentiates 3 of 5 rows in fine print
  but the bucket header reads the same.

- **One new label-mode that could help and doesn't.** AWS internally
  knows it 6D-qualified and then got capped. The `composeLabel` helper
  (`scoring.ts:308-330`) currently picks one of {recencyAdjusted,
  scopeCapped, depthAdjusted} by precedence — but for the
  6D-lifted-then-capped composite, BOTH `scopeCapped` and `depthAdjusted`
  are computationally true at one point in the trace (before scope erases
  the lift flag at line 68). The label could carry both
  ("Yellow (capped from Good by architect scope — 12/22 services with
  very-deep claim)") but the code drops the lift breadcrumb at the
  capping moment. **Cheap fix exists** (preserve a `cappedFromColor`
  flag), separate from 5ξ's structural shape question.

## 6. Bugs / structural defects (round 7)

1. **5ξ "Senior tier above Yellow" — still load-bearing, MORE
   conspicuous in round 7 than in round 6.** Round 6 surfaced this on
   the Anil case. Round 7's 6D fix targeted the same architectural
   under-rating finding (5λ) for the DBA / specialist shape — and
   succeeded there (Owen's hypothetical 8/14 + very-deep → Green).
   But the SA-shape pass-through pinches because K2 architect-cap fires
   before 6D's lift can surface. Net: 6D **partially** closed 5λ for
   non-capped specialists; 5ξ is the unclosed remainder for scope-capped
   architects. **Severity: Medium-High (architectural; recurring 3
   rounds; canonical case is the Anil persona).**

2. **6D-lift evidence erased at the capping moment.** Mechanical
   complement to #1. `applyScope` at `scoring.ts:68` returns
   `depthAdjusted:false` when it caps a Green (either natural or lifted)
   to Yellow. The fact that the candidate *cleared 6D's qualifying
   gates* (coverage≥40% AND depth ∈ {deep, very-deep} AND seniority
   !== junior) is computationally available at line 67 but dropped on
   the next line. **Severity: Low (cheap fix; preserves a breadcrumb
   for the eventual 5ξ tier label).**

3. **Within-Yellow ranking varies by 2 distinct mechanisms and the
   report flattens them.** AWS (capped from Green via 6D), Terraform /
   K8s (capped from Green via version-tier), Azure (raw Yellow
   coverage), Postgres (unknown-version Yellow). Four sub-shapes
   collapsing to one badge colour with at-most one parenthetical
   distinguisher. **Severity: Medium (HM-readability; specifically
   bites the architect / SA cluster).**

4. **Azure catalog still operator-shaped (round-5, round-6 carryover).**
   13 services, no `tags` array, no architect-tag taxonomy
   (Management Groups / Policy / Defender for Cloud / Front Door / PIM
   missing). Round-5 / round-6 called this out as out-of-scope catalog
   gap; round 7 didn't address. Anil's "Azure mgmt-group" still has no
   tick target. **Severity: Low-Medium (specialist; SA-shape cluster).**

5. **No new bugs from 6D / 6E / 6F.** 6E (off-catalog 5th headline)
   doesn't fire for Anil (he has no off-catalog techs). 6F (Owen/Priya
   /Maya catalog + template refresh) doesn't touch the SA path —
   Oracle DB, PL/SQL, Jetpack Compose, SwiftUI, Database/DBA template,
   Mobile / Frontend chips all add to other shapes without affecting
   SA preloads. Verified: SA techIds and methodologyChips arrays
   unchanged.

## 6b. Speed-of-use rating

- **Entry time unchanged from round 6 (~95s total).** No new fields,
  no new clicks, no new validations on the SA path.

- **Phone-shrink test.** Round 6 was already phone-robust (K2 + 5β +
  5δ landed). 6D doesn't add phone-side friction; 6F doesn't touch
  SA. Anil-on-phone would land identical to Anil-on-video in round 7.

- **HM-readability.** Same as round 6. Report is internally consistent
  but flat in the Yellow bucket. No regression.

- **Risk / safe rating.** **Safe.** Same rating as round 6. The remaining
  gap (5ξ) is architectural / HM-readability, not operational. The call
  goes well, the recruiter doesn't fumble, the PDF exports cleanly, the
  HM gets a coherent — if under-differentiated — story. The 5ξ
  resolution is a polish-to-excellent pass, not a fix-broken pass.

## 7. The 5ξ verdict — is it still load-bearing?

**Yes, 5ξ is still load-bearing — 6D didn't reach the SA-shape at all.**
Round 6 surfaced the architectural ambiguity ("5 Yellow capped reads as
junior-on-senior-infra OR Staff-capped-by-scope, no way to tell from the
headline"). Round 7 shipped 6D to lift deep-narrow specialists from
Yellow to Green, but 6D runs *inside* `resolveChecklistTier` BEFORE
`applyScope`, and `applyScope`'s architect/reviewer cap (`scoring.ts:64`)
erases any Green — whether from natural coverage, version tier, or 6D
lift — and zeroes the `depthAdjusted` flag. For Anil's AWS at 12/22 +
very-deep + staff + architect, 6D's gates all pass and the lift goes to
Green; the very next line caps it back to Yellow with `depthAdjusted:false`,
losing the breadcrumb. The regression test at
`src/lib/__tests__/scoring.test.ts:350-364` pins this as intentional.
**Net: 6D closed 5λ for the Owen DBA shape (no scope cap) and missed
the Anil SA shape entirely (scope cap always wins).** Headline still
reads `0G / 5Y / 0R / Methodology: 6` — identical to round 6.

**Proposed 5ξ shape (concrete, sourced from Anil's report).** A new
"Senior / Architect Pass" tier *colour* would be over-engineering and
would force HM to learn a fourth badge. The cheaper, higher-signal
move is a **label-level differentiator** within the existing Yellow
bucket, driven by a new flag `cappedFromColor: TierColor | undefined`
on `ResolvedTier` set by `applyScope` when it caps Green→Yellow.
`composeLabel` then renders three distinguishable Yellow labels:
- `Yellow (capped from Good by architect scope) — 12/22 services` for
  AWS (was-Green, capped).
- `Yellow (capped from Good by architect scope)` for Terraform / K8s
  (version-mode Green, capped).
- `Yellow — 4/13 services` for Azure (raw Yellow coverage, no cap).
- `Yellow (version unknown)` for Postgres (existing unknownVersion path).
Headline grid then either (a) splits the Yellow card into two stat
cards `Capped (3)` + `Probe (2)` when any `cappedFromColor` is set,
or (b) adds a fifth headline card `Architect-pass: 3` parallel to
Methodology in emerald-different (sky? slate?) so the senior-capped
signal lands at HM glance. Option (b) reads cleanly with the existing
4-card grid and matches the 5ι precedent (methodology as 4th card was
the round-5 win; architect-pass as 5th card mirrors it). **Anil's
headline would read `0G / 2Y / 0R / Methodology: 6 / Architect-pass:
3` — and the HM reads "Staff Architect capped by scope, not weak
mid-level" at one glance.** Implementation is shallow: new flag on
`ResolvedTier`, set in `applyScope`'s two cap branches, surfaced by
`composeLabel` for the label and by Summary's headline grid for the
stat card. The 6D-lift breadcrumb (currently dropped at the cap)
flows naturally as part of the same flag.

**Anil's HM-readability, round 6 → round 7.** Unchanged. Round 6 was
already the cleanest-end-to-end SA shape (K2 + 5β + 5δ + 5ι all
composed cleanly). Round 7 added 6D + 6E + 6F and none of them touch
Anil's path — 6D is structurally walled-off by the K2 architect cap,
6E doesn't fire (no off-catalog techs), 6F lives in DBA / Mobile /
Frontend. **The Anil session is the canonical "report is honest but
not differentiated" case — and the 5ξ fix above is the precise shape
that would resolve it without disturbing any of the other 5+ rounds of
shipped work.** Ship 5ξ next; Anil is the test case that makes it
visible end-to-end.

## 8. Composition with prior rounds

Compositional integrity holds. 6D doesn't regress K2 (the cap still
fires correctly), 5β (AWS security filter), 5δ (Azure architect scope),
5ζ (Video panel label), or 5ι (Methodology headline card). 6E and 6F
are correctly inert for the SA path (no off-catalog techs; no DBA /
Mobile / Frontend overlap). The compositional bug — that 6D and K2
overlap on the same surface and K2 wins — isn't a regression, it's
the pre-existing 5ξ gap surfaced more sharply now that 6D's "lifted"
flag is computed and then dropped.

## 9. Recommendation

**Ship 5ξ next — specifically the label-flag + 5th-headline-card shape
proposed in §7.** Anil's headline shifts from `0G / 5Y / 0R / Meth: 6`
(round 6/7) to `0G / 2Y / 0R / Meth: 6 / Architect-pass: 3`, and the
five flat Yellow rows split into "capped-from-strength" vs "honest
mid-coverage". The fix is shallow (new `cappedFromColor` field +
composeLabel branch + Summary headline grid branch) and reuses the 5ι
precedent for a new headline card. The 6D-lift breadcrumb flows
through the same mechanism. Secondary (still): Azure catalog
architect-tag taxonomy (Management Groups / Policy / Defender for Cloud
/ Front Door / PIM) — round-5 / round-6 carryover, becomes the next
blocking gap for SA shape once 5ξ lands.

## Disagreement with prior fixes

No disagreement with the 6D shipment in isolation — it correctly closes
Owen's DBA case and the floor-protection holds Vikram's case. The
disagreement is with the *characterisation* in `RESUME.md` item 23:
"5ξ 'Senior tier above Yellow' follow-on still open" is accurate, but
the round-6 → round-7 reader could be forgiven for assuming 6D made
material progress on it. **6D made zero progress on the SA-cap shape**
that 5ξ specifically names, because the lift and the cap operate on
the same surface and the cap wins by code order. The 5ξ label is
load-bearing exactly because 6D *doesn't reach the architect-cap
candidates*, and Anil is the canonical case for needing it.

## Out-of-scope observations

- The amber cap-explanation note ("Capped by architect scope — operates
  differently than an operator-level signal would imply.") renders 3
  times in Anil's report (AWS / Terraform / K8s) and not on Azure /
  Postgres. That's the existing in-fine-print differentiation. An HM
  reading the full report can see it; an HM reading only the badge
  text and headline can't. The 5ξ proposal above lifts this from
  fine-print to headline.

- 6F's catalog additions (Oracle DB, PL/SQL, Jetpack Compose, SwiftUI)
  and Database/DBA template don't intersect with the SA shape, and
  the Mobile / Frontend chip additions don't either. No spillover risk
  for SA-template candidates. Verified by inspecting `roles.ts` SA
  techIds + methodologyChips arrays unchanged.

- For the round-7 cross-cut: this session reads as the *clearest single
  case* for 5ξ across the 7 rounds. Anil's report is internally
  consistent, externally fluent, and headline-flat — a perfect canvas
  for surfacing the one remaining architectural distinction (capped-
  from-strength vs raw-Yellow) that the 6D shipment couldn't reach.
