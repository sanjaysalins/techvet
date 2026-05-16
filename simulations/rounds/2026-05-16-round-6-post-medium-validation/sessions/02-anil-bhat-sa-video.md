# Session 02 — Anil Bhat (Staff+, Solution Architect) — round-6 redux

**Agent:** sim-02 (round-6 post-medium-items validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-6-post-medium-validation
**Channel:** Video panel (45 min; HM joins ~minute 18)
**Role template picked:** Solution Architect
**Round-5 baseline:** `/home/salinss/devtools/techvet/simulations/rounds/2026-05-16-round-5-cumulative-validation/sessions/02-anil-bhat-sa-video.md`

## 1. Persona inhabited

Same Anil as round 5. 14 yr enterprise architect at a US fin-services
consultancy. Pre-sales + post-sales architecture. He still won't say "Kafka"
voluntarily; he will say "KMS multi-region keys" within 30 seconds; he speaks
of Postgres in DDD aggregates not `psql`. The whole tell is that he uses the
word *guardrail* twice in two minutes and *blast radius* once. The only thing
that changed between round 5 and round 6 is the tool he's being screened with
— **the persona is identical**, deliberately, so the deltas are attributable.

The recruiter is also the same persona — same external recruiter, same
fin-services client mandate, same Lucidchart-on-screen-share Zoom setup, same
HM watching from minute ~18. Nothing about the *session* is new. Everything
about the *report* should be.

## 2. Video call — abbreviated

> R: picks **Solution Architect** template. Sets `channel=video`,
> `mandate="US fin-services SA; AWS landing-zone + Azure mgmt-group; regulated
> client"`. Hero loads 6 preloaded techs: AWS, Azure (**new — 5δ**), Terraform,
> Kubernetes, Kafka, Postgres. Mentally clocks: "Azure is here. Good — didn't
> have to add it last time."
>
> R: "Anil, walk me through your AWS footprint."
> A: "Landing Zone + Control Tower, Organizations with SCPs at the OU level,
> IAM Identity Center federated to Entra, KMS multi-region keys with per-
> account aliases, Macie + GuardDuty + Security Hub aggregated to the central
> security account, Inspector on the workload accounts. The usual."
>
> [R: opens AWS card. Scope chip reads `Scope: architect`. Searches checklist.
> Ticks Landing Zone, Organizations, IAM Identity Center, IAM, VPC, KMS,
> Macie, GuardDuty, Security Hub, Inspector. **All 10 surface in the filtered
> list now — 5β landed.** The "X hidden" hint reads "4 services hidden
> (filtered for Solution Architect)" — CodeBuild / CodePipeline / SageMaker
> / Bedrock are the 4. Recruiter glances at the hint, registers
> "irrelevant-to-SA stuff hidden", moves on. **No KMS fumble. No
> 8-second freeze. No Notes-as-workaround.** Adds Step Functions + CDK as
> Anil expands. 12 ticks. Card: "Review / Probe (capped — architect scope)
> — 12/22 services" (~55%).]
>
> R: "Azure?"
> A: "AKS, Entra ID, Key Vault, Bicep for the tier-2 bank. Not as deep but
> it's there."
>
> [R: opens Azure card. Scope chip already reads `Scope: architect` (5δ
> preloaded the scope, not just the tech). Recruiter doesn't even register
> this consciously — the chip just isn't *wrong* the way it was last time, so
> there's nothing to notice. Ticks AKS, Entra ID, Key Vault, Bicep. 4/13 = 31%
> → Yellow + architect cap. **Architect cap fires automatically on Azure now.
> Same shape as AWS.**]
>
> [HM joins. Visible on Anil's screen-share now.]
>
> R: "Terraform?"
> A: "I author the module library; haven't run apply in 18 months."
> [R: "1.10", very-deep. Card: "Review / Probe (capped — architect scope)".
> Amber italic note renders.]
>
> R: "Kubernetes?"
> A: "EKS, multi-account topology. 1.30-ish. I design it, my platform team
> runs it."
> [R: "1.30", very-deep, architect cap. Yellow capped.]
>
> R: "Postgres?"
> A: "Schema design only. DDD aggregates, partitioning strategy. I don't
> operate."
> [R: leaves version blank, depth=Working. Yellow unknown-version, capped.]
>
> R: "Kafka?"
> A: "Not in my world."
> [R: clicks "Not in stack". Gray badge.]
>
> R: "OK, methodology — TOGAF, DDD, EventStorming, you said?"
> A: "C4 for arch diagrams, ADRs, Well-Architected reviews quarterly."
> [R: clicks 6 chips. 12s total. ~17 min in. HM nodding.]
>
> R: sets Seniority=Staff+, years=14, path=Traditional, context unchanged.
>
> R: hits Summary at ~minute 23. HM watching the report on screen-share.
>
> R: exports PDF at minute 32.

## 3. What TechVet would output

| Tech | Coverage / Version | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| AWS | 12/22 services (~55%) | working | architect (template) | **Review / Probe (capped — architect scope) — 12/22 services** (Yellow; coverage Yellow 25–66%, cap rides along) |
| Azure | 4/13 services (31%) | working | **architect (template — 5δ)** | **Review / Probe (capped — architect scope) — 4/13 services** (Yellow; cap fires consistently with AWS — **same shape as round 5 AWS, no longer "via default operator"**) |
| Terraform | 1.10 | very-deep | architect | **Review / Probe (capped — architect scope)** (natural Excellent, capped) |
| Kubernetes | 1.30 | very-deep | architect | **Review / Probe (capped — architect scope)** |
| PostgreSQL | (blank, working) | working | architect | **Review / Probe (capped — architect scope)** (unknown-version Yellow, capped) |
| Kafka | n/a | n/a | architect (preloaded) | **Not in stack** — excluded |

**Headline stat grid: 4 cards now.**

```
[ Good: 0 ]  [ Review / Probe: 5 ]  [ Concern: 0 ]  [ Methodology: 6 ]
   gray         amber                  gray            emerald
```

**Coverage chips below:** `1 confirmed not in stack` (Kafka).

**Header chip:** `Channel: Video panel` (5ζ landed — no longer lowercase "video").

**Candidate context line:** `Staff+ · 14 yr in industry · Traditional path ·
designs but doesn't operate; multi-cloud regulated FS`.

**Methodology section:** 6 emerald chips — TOGAF / C4 model / DDD / ADRs /
Well-Architected reviews / EventStorming.

**Radar:** Cloud + Database + DevOps + Backend categories rendered. Kafka
excluded.

## 4. Accuracy judgement

- **Where it's right:** The report is now *uniformly* shaped across all 6
  cloud-and-infra techs. Five Yellow capped tier rows + one "Not in stack"
  + six methodology chips + a "Methodology: 6" headline card. Pre-round-6
  Anil had two off-template surfaces silently degrading (AWS-missing-KMS,
  Azure-falls-through-to-operator) which made the report read internally
  inconsistent — KMS in Notes but not in checklist, Azure operator-implied
  while everything else was architect-capped. **The two structural fixes
  (5β + 5δ) collapse that inconsistency completely.** Same shape, same
  cap, same story across the whole infra stack. HM-readability up.

- **What the new 4th headline card buys.** Round 5 had 0 Good / 5 Yellow /
  0 Red — three stat cards that all read either zero or modest. HM glancing
  at the top of the report read "evidence-light senior". The Methodology: 6
  emerald card changes that headline read to "5 Yellow (capped to
  architect) + 6 named senior practices" — which is genuinely the
  *correct* one-glance summary of a Staff Architect who designs but
  doesn't operate. **5ι is the single biggest perceptual change in
  this round for Anil.** Same data, completely different first impression.

- **Where the report still under-rates.** All 5 Yellow capped rows read
  identical. Anil's Terraform architecture knowledge (writes the module
  library) is genuinely Staff-grade; his Postgres schema design is
  competent-but-not-deep. Both render as "Review / Probe (capped —
  architect scope)" with no within-Yellow ranking. **D2 / 5λ (architect
  tier above Yellow) is still the long pole** — five fixes upstream still
  funnel into one Yellow bucket. The cumulative report makes the absence
  of a "Senior / Architect Pass" tier sharper, not flatter.

- **Where it's silent — narrower than round 5.** Round 5 had two
  silent-failure surfaces (KMS hidden + Azure operator-mislabeled).
  Round 6 has none on the SA happy path. **Control Tower as a distinct
  service** is still bundled into "Landing Zone / Control Tower"
  (cosmetic). **Azure architect-shaped services** (Management Groups,
  Policy / Blueprints, Defender for Cloud, Front Door) are still missing
  from the Azure catalog (Azure catalog is 13 ops-shaped services, no
  architect-tag taxonomy at all — round-5 catalog gap not addressed in
  round 6). Anil mentioned "Azure mgmt-group" in the persona description
  and gets nowhere to tick that.

- **The 5β filter — calibration check.** SA AWS filter is now
  `['general', 'architect', 'security']`. That surfaces 22/26 services
  with 4 hidden (CodeBuild / CodePipeline / SageMaker / Bedrock). For a
  fin-services SA that's spot-on: CI/CD pipelines are owned by the
  delivery team, ML is owned by data science, and an SA reviewing the
  landing zone doesn't tick those. **Filter is well-tuned, not over-
  permissive.** Worth noting because the obvious failure mode of "just
  add the security tag" is to over-correct and re-introduce noise; the
  curation held its discipline.

## 5. Friction during the call

- **AWS checklist is fluent.** Recruiter named 10 services in one breath
  (the 5 security ones unprompted from Anil), all 10 surfaced in the
  filtered list, all 10 ticked in ~25 seconds. Round 5 KMS fumble (8s
  freeze, hover the hint, type into Notes, lose KMS off the tier head)
  is gone. **The HM doesn't see the recruiter struggle and the report
  doesn't have a KMS-shaped hole in it.** This is the single largest
  friction reduction in the round.

- **Azure adds nothing.** Recruiter doesn't have to manually search-and-
  add Azure (no "+Azure" gesture, no scope chip to notice/ignore, no
  scope to manually change). The card is just there with the right scope
  pre-applied. **Frictionless in the "didn't have to do anything" sense.**
  This is exactly the K2 mechanic working as designed — preload + scope
  hint = recruiter-invisible correctness.

- **Methodology chips remain frictionless.** 6 clicks, 12 seconds, zero
  free-text. Same as round 5. Unchanged but worth restating because the
  *cumulative* picture is now: 5 Yellow capped tier rows requiring
  ~75–90 seconds total recruiter input (AWS the longest at 25s) + 6
  methodology chips at 12s + Kafka not-in-stack at 1s = under 2 minutes
  of clicking to fill the whole report. With a 45-min video call and HM
  joining at minute 18, the recruiter has 5–6 minutes of slack to
  Summary-export and walk HM through the report live. **That's actually
  enough** to read TechVet on screen-share in the panel.

- **Channel chip reads "Video panel".** Cosmetic 5ζ fix lands cleanly.
  Round 5 read "Channel: video" lowercase which had a Code-Label-y feel;
  round 6 reads "Channel: Video panel" which reads as deliberate. HM
  watching on screen-share doesn't bounce off the chip. Tiny but it
  matters in a customer-facing PDF.

- **Cumulative density check.** Report now has: candidate-context line +
  channel chip + **4 stat cards** (was 3) + 1 coverage chip + radar +
  5 Yellow tier items + 6 methodology chips + 1 not-in-stack section.
  The 4-card grid is *more* visually balanced than the 3-card was for
  Anil — round 5's three cards (one orange, two grays) had a lopsided
  feel; round 6's four cards (gray / orange / gray / emerald) read as
  "two-tone with senior signal" because the emerald sits next to the
  amber. Density up by one row but visual coherence up by more.

## 6. Bugs / structural defects (round 6)

1. **D2 / 5λ still open — five Yellow rows undifferentiated.** Same
   architectural issue as round 5. Five capped Yellows for Terraform /
   K8s / AWS / Azure / Postgres flatten huge within-Yellow variance. The
   round-6 fixes made the report *consistent* but didn't add a Senior
   bucket to differentiate the consistent rows. **Severity: Medium
   (architectural).** Round 6 makes the case stronger because the report
   is now consistently capped — there's nowhere within the capped set to
   say "this one is genuinely Staff".

2. **Azure catalog still operator-shaped (catalog gap, not a fix-miss).**
   Azure has 13 services, no `tags`, no architect-shaped sibling to
   Landing Zone / Organizations. Anil's "Azure mgmt-group" mention has
   no checklist target. Round 5 named this; round 6 didn't address it
   (correctly — it's a catalog gap, scoped out of medium items). Note
   for the cross-cut: 5δ fixed the *scope* but not the *surface*. Azure
   architects still can't tick what they'd architect. **Severity: Low
   (specialist).** Promote if Azure-SA candidates become a pattern.

3. **No new bugs introduced by 5β/5δ/5ζ/5ι.** Specifically:
   - 5β didn't over-permit (4 services still hidden, the right 4).
   - 5δ didn't break Azure for any other template (Azure is only in SA's
     techIds; no other template was affected).
   - 5ζ is pure presentation, no logic impact.
   - 5ι hides cleanly when methodology entries = 0 (mobile / frontend
     templates with no methodologyChips will still render 3 cards — code
     branches on `meta.methodologyEntries.length > 0`, not on template).
   No regressions visible in this session.

4. **"X hidden" hint without escape hatch — *now mostly moot for SA*
   but still architectural.** The recruiter still has no in-tool way to
   override the filter if a fin-services SA also dabbles in, say, ML
   pipeline review. For Anil specifically the new filter covers the
   stated stack so the hint isn't load-bearing anymore. **Severity:
   Low (downgraded from round-5 Medium because the SA failure mode is
   gone; the *generic* issue persists).**

## 6b. Speed-of-use rating

- **Entry time (estimate).** Video so the recruiter has headroom: AWS
  checklist ~30s (search 5 + scan 22 + tick 12, no KMS fumble); Azure
  ~15s (no add, scan 13, tick 4, no scope adjustment); Terraform / K8s /
  Postgres ~10s each; methodology 6 chips ~12s. **Per-tech mean ~15s
  (down from round-5's ~22s).** The two big time-savers are KMS-visible
  (saves 8s freeze + 7s Notes typing on AWS) and Azure-preloaded (saves
  15s add + 5s scope-chip squint).

- **Phone-shrink test.** This persona is intentionally video-only, but
  let's stress-test on phone: (1) AWS-KMS-visible would land cleanly
  even on phone — recruiter doesn't have to read the hint or workaround.
  (2) Azure-architect-scope would land silently and correctly on phone —
  no chip-squinting required. (3) Methodology chips still 12s. (4) 4-card
  headline reads identically on phone (same render path). **Round 6 is
  more phone-robust than round 5** even though Anil himself isn't a
  phone candidate. The compositional fixes traveled.

- **Friction that vanishes on phone.** Round 5 listed three phone-killers:
  AWS-KMS-hidden, Azure-scope-silently-degrades, hint-without-escape.
  Round 6: **first two are gone**, third is downgraded. The remaining
  friction is the D2 architectural gap (capped-Yellows-look-identical)
  which is a *report-reading* problem on the HM side, not a recruiter-
  input problem on the call side.

- **Risk / safe rating.** **Safe.** Round 5 rated this session
  "At-risk" because the AWS-KMS-hidden + Azure-operator-mislabeled
  composition was a live failure mode the recruiter and HM both saw.
  Round 6: composition is closed, headline reads correctly, channel
  chip reads correctly, methodology lands at headline glance. The
  remaining gap (D2 within-Yellow differentiation) is architectural,
  not operational — the call goes well and the HM gets a coherent
  story. Promote from At-risk → **Safe** for the SA video panel.

## 7. Round-6 fix verdict (5β / 5δ / 5ζ / 5ι)

- **5β (SA AWS filter includes `security` tag) — LANDS CLEANLY.** The
  recruiter ticked all 5 security services Anil named (KMS, Macie,
  GuardDuty, Security Hub, Inspector) directly from the filtered
  checklist with zero hint-fumble. Filter is calibrated, not over-
  permissive (4 services still hidden — CodeBuild / CodePipeline /
  SageMaker / Bedrock, all correctly irrelevant to an SA). This was
  the highest-severity round-5 issue for this persona and it's
  gone. ✅

- **5δ (SA template preloads Azure with architect scope) — LANDS
  CLEANLY.** Azure shows up preloaded with the architect scope chip
  already applied. Recruiter doesn't add, doesn't squint at "via
  default", doesn't have to set scope. Azure now reads same-shape as
  AWS on the report (Yellow capped, architect scope). Closes the
  Aaron/Helena/Anil multi-cloud gap. The catalog `defaultScope:
  "operator"` is correctly overridden by the template `techScopes`.
  Note: Azure catalog itself is still operator-shaped (13 ops services,
  no architect-tag taxonomy) — that's a separate catalog gap, out of
  scope for 5δ. ✅

- **5ζ (channel label capitalization) — LANDS.** Header chip reads
  "Channel: Video panel" cleanly. No more lowercase "video" or
  uppercase "VIDEO". Cosmetic but it matters on a screen-shared PDF
  with HM watching. Symmetric with "Async (CV-only)" and "Phone".
  Nothing else to verify. ✅

- **5ι (4th methodology stat card) — LANDS, AND IS THE BIGGEST
  PERCEPTUAL UPGRADE.** The "Methodology: 6" emerald card next to
  Good/Yellow/Red transforms the headline read of an SA report.
  Round 5: HM glanced and saw "0 Good, 5 Yellow, 0 Red" — read as
  evidence-light. Round 6: HM glances and sees "0 / 5 / 0 / **6
  Methodology**" — reads correctly as "capped infra signal +
  named senior practices", which is the actual shape of a Staff
  Architect. 4-card grid is visually balanced (two-tone, emerald
  next to amber). Grid swap is unconditional on
  `methodologyEntries.length > 0` so templates without methodology
  chips still render 3 cards — clean conditional, no false positives.
  ✅✅

## 8. Composition with prior rounds

The round-6 fixes compose cleanly with K2 (template scope hints) and
D4 (curated methodology chips) — in fact they *complete* the SA story
that K2+D4 started. Pre-round-6: K2 worked on 5 preloaded techs and
silently failed on Azure; D4 worked but was buried below the buckets.
Post-round-6: K2 works on all 6 preloaded techs (Azure included via
5δ), D4 surfaces at headline glance (5ι). The two round-5 KMS/Azure
silent-failure surfaces are closed (5β + 5δ). The channel chip reads
clean (5ζ). **The Anil session is now an end-to-end win for the SA
template** modulo D2 (within-Yellow differentiation) which is the
remaining architectural gap.

## 9. Recommendation

Hold the line on the four landed fixes. **Promote D2 / 5λ (Senior
tier above Yellow) to the next priority.** With 5β + 5δ closing the
two SA-template silent failures, the remaining flatness in the report
is now load-bearing: Anil has 5 Yellow capped rows that should
differentiate as "Terraform module-library author (genuinely Staff)"
vs "Postgres schema design (competent)". Without a Senior bucket, an
HM can't read that distinction off the report — and Anil specifically
is the canonical case for needing it. Secondary: **Azure architect-
shaped services** (Management Groups, Policy/Blueprints, Defender for
Cloud, Front Door) as a catalog gap — Azure now scopes correctly but
still can't surface the right *services* for an architect to tick.

## Disagreement with prior fixes

None on the round-6 batch. Each of 5β / 5δ / 5ζ / 5ι is right-sized:
filter-tag addition didn't over-permit, scope preload didn't leak to
other templates, channel label is pure presentation, methodology card
is conditional and clean. The only mild reservation is that 5ι makes
the *absence* of a Senior tier (D2) more conspicuous — HM now sees
"Methodology: 6 / Yellow: 5" and might (rightly) ask why nothing
landed in Good despite the senior signal. That's not a 5ι problem;
it's 5ι honestly surfacing a tier-gap that was always there. **Ship
5λ next so the headline can resolve.**

## Out-of-scope observations

- Anil's Azure "mgmt-group" mention has no checklist target. The Azure
  catalog needs an architect-shaped service set (Management Groups,
  Policy/Blueprints, Defender for Cloud, Front Door, Privileged
  Identity Management) — same shape as the AWS catalog already has.
  Round-5 observation, still open in round 6. Promote when Azure-SA
  becomes a pattern (Helena round 4, Anil round 5 + 6 = 3 hits).

- "4 services hidden (filtered for Solution Architect)" is now a
  *very* low-friction hint because the filter is well-calibrated for
  fin-services SAs. Worth noting for the cross-cut: this hint reads
  great when the filter is right and reads terribly when the filter
  misses. Round-5 → Round-6 is the same hint with two completely
  different meanings, depending entirely on tag curation upstream.
  The hint isn't the bug; the filter calibration was.

- For the cross-cut: this session is the cleanest end-to-end win in
  the round-6 batch as far as I can tell from inside it. Two silent-
  failure surfaces closed, one perceptual upgrade landed, one cosmetic
  polish landed, zero new regressions visible. If cross-cumulative
  finds friction elsewhere, it didn't come from the SA path.
