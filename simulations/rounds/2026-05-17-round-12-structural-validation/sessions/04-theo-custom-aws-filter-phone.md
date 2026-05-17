# Session 04 — Theo Adesina redux (Mid-Senior Generalist, Custom flow, phone)

**Round:** 12, structural-validation post-batch-17-Custom-AWS-filter
**Date:** 2026-05-17
**Channel:** Phone, 8 min hard cap
**Recruiter:** Liam (London consultancy, generalist hiring funnel — no
domain template fits the brief, recruiter has been picking Custom for
three months and complaining the AWS card was unreadable on phone calls)
**Candidate:** Theo Adesina, 30, 5 yr at a Lagos fintech (generalist
backend-leaning fullstack; Django + React + Postgres + Docker + AWS).
First time he's been screened post-round-17.
**Template under test:** `custom` — round-17 added the first-ever
`serviceTagFilters` entry to Custom (`{ aws: ['general'] }`).
**Closure target:** Theo FT-2 round-10 finding (Custom-AWS denominator
mis-frames working-depth generalists as thin engineers).

---

## 1. Persona inhabited

Same Theo as round 10's FT-2 session. Re-running to validate the
shipped fix.

30 yo, computer science undergrad, joined the Lagos fintech as
employee #14 and has been there 5 yr. Stack drifted with the
company's shape — first 2 yr was hands-on Django + React rendering
internal tooling, last 3 yr split between feature work, AWS
operations (Lambda for webhooks + RDS Postgres + S3 for KYC docs),
and senior code review. Knows enough Docker to run `docker compose`
in dev and ship a one-off Dockerfile for a Lambda layer; doesn't
own the production container story (Render handles their main app).

The shape: **working-depth generalist**, not a deep specialist
anywhere. He's the engineer a fintech that hits Series B keeps as
the technical anchor for the next two-team scaling — not the engineer
a series-D platform-team posting wants. The recruiter brief here is
the Series B shape exactly. Theo SHOULD read as a competent yes.

Round-10's pre-fix verdict read him as thin (AWS 3/26 = 11.5% → Red)
and the headline buckets dragged him into "Concern" territory. The
hiring manager passed. Round-17 was scoped to fix that misread.

---

## 2. Phone call — abbreviated

**00:00.** Liam picks **Custom**. Empty assessment. No template
chips. Same blank canvas he's been working from for three months.

**00:10 — 01:50. Search-add storm.** Liam runs his memorized
sequence: search `Python` add. `Django` add. `React` add. `TypeScript`
add. `PostgreSQL` add. `Docker` add. `AWS` add. `GitHub Actions` add.
**Eight cards rendered in 1:40.** This is the search-add tax round
10 named — Custom always pays it. Out of scope for round 17 (a Custom
Generalist preload was deferred to the UX-redesign session).

**01:50 — 02:25. Python.** "3 yr Django backend, 4 small data
scripts." Liam types `3.11`, depth working. Tier match: Green
(Excellent ≥ 3.10). Clean. **~25s.**

**02:25 — 02:55. Django.** "5 LTS, mostly DRF + Channels for
webhooks." Version `5.0`, depth working. Green. **~25s.**

**02:55 — 03:25. React.** "17, we never migrated off CRA. Class
components in the older tools, hooks in the newer ones." Version
`17`, depth working. **Yellow with "Still widely used in many
enterprise applications" softener** — this is exactly the enterprise
note Theo's defensible-legacy story is supposed to trigger. Honest.
**~25s.**

**03:25 — 03:55. TypeScript.** "Shallow. I read it, I write small
patches, I don't author libraries." Version `5.x`, depth `shallow`,
seniority NOT set to junior (Theo is mid-senior). Green tier
unaffected by shallow (the round-7 7D junior-shallow-lower only
fires when seniority=junior). Reads as Green clean — **likely
overreads Theo's actual TS depth.** Flagging — see Finding 4.
**~25s.**

**03:55 — 04:45. Postgres — NEW HYBRID BODY.** This is batch-13's
first phone-call appearance on Custom. Card renders with **both**
the version slot AND a 13-service checklist below it. Liam pauses
for half a second — first time seeing the dual body — then types
`15`, working depth, leaves checklist untouched. Verdict: **Green
"Good" (version ≥ 14), no coverage suffix.** No regression. The
hybrid back-compat gate (services untouched + checklistTouched=false
→ version-only) fires as designed. **~45s** including the visual
pause. Theo is verbal about JSONB ("we store form-field metadata
that way") but Liam is rationing chip-clicks on the phone and skips
ticking it. A senior DBA recruiter would tick 4-6 services here;
Liam (generalist recruiter, 8-min call) doesn't. **The hybrid card
behaves correctly when the recruiter doesn't engage with the
services axis — no surprise Red from accidentally rendering the
coverage channel.**

**04:45 — 05:10. Docker.** "I don't remember a version, Render
handles deploy, I write the Dockerfile when needed." Liam clicks
"I don't remember." Forced Yellow — enterpriseNote suppressed
(working depth + unknown version + Theo not junior, but the gate
also checks for meaningful depth — passes — so the enterprise note
DOES fire). Reads as Yellow with "Still widely used" softener.
Acceptable on phone budget. **~25s.**

**05:10 — 06:30. AWS — THE TEST.** This is the round-17 closure
target. Liam adds AWS, scope auto-resolves to operator (catalog
default), depth working, version unused (checklist tech).

**Card renders.** The checklist body shows **15 services** with
a sub-header reading **"— 11 other services hidden (filtered for
Custom)"**. Pre-round-17 this was 26 services and a wall of
SageMaker / Bedrock / Macie / GuardDuty / Landing Zone scrolling
past the Lambda Theo actually uses.

Liam walks Theo: "AWS — what services?"
Theo: "Lambda for webhooks, RDS for the main DB, S3 for KYC docs.
That's mostly it. CloudWatch alarms read-only — I look at them, I
don't configure them."

Liam ticks **Lambda + RDS + S3** as confirmed production. Skips
CloudWatch (read-only is below his threshold for ticking).

**Card shows: 3 / 15.**

**BUT the verdict badge shows: Concern — 3/26 services.** Red.

Liam squints at the screen. **The coverage suffix in the verdict
label says 3/26 — not 3/15.** UI count says "3 / 15" in the
checklist body, verdict label says "3/26 services" in the header,
ratio computed at 11.5%, base color Red, no depth-lift (working
not deep + ratio < 40% gate fails twice). Result on screen: **Red
"Concern — 3/26 services"** with the filtered "15 services shown,
11 hidden" caption below contradicting the headline number.

Liam reads the verdict aloud anyway. Theo reasonably objects: "I
saw fifteen things on the list, why does it say twenty-six?" Liam
mumbles "tool quirk" and moves on. **~1:20 burned including the
explanation tax.**

**06:30 — 06:55. GitHub Actions.** "12 workflows, deploy + tests +
linting + a Slack notifier." Liam — running out of clock — checks
the 4 services that match Theo's description. Coverage ~4/12 = 33%
→ Yellow. **~25s.**

**06:55 — 07:25. Wrap.** Liam pulls together the verdict. Skips
the chip row (Custom has no methodology chips). Asks one closing
question about on-call. Hangs up at **07:25.** Within the 8 min
budget by a margin of 35 seconds.

---

## 3. Post-call: report read

Liam reads the summary on his laptop while the call is still in
his head.

**Headline buckets:**
- Good (Green): Python, Django, Postgres
- Review / Probe (Yellow): React (enterprise-softened), Docker
  (unknown version), GitHub Actions, TypeScript actually reads
  Green here — see Finding 4
- Concern (Red): **AWS** (3/26 services)

**Radar:** 7 categories covered. AWS pulls the Cloud spoke down
to ~0.33 of the wedge; everything else sits at 0.66–1.0. Visually,
the candidate looks like a competent generalist with one weak spot
— the recruiter's read.

**Trade-off framing.** The headline still says Theo is a Concern
on AWS. The pre-round-17 number was 11.5% (clearly thin). The
post-round-17 number IS 11.5% TOO — because the scoring engine
hasn't changed. **The display layer was filtered. The scoring
denominator was not.** Theo is exactly as thin in the verdict as
he was in round 10. The fix is cosmetic on the wrong axis.

Liam stares at the AWS card. "3/15 shown" caption directly below
the "3/26 services" verdict. He notices the contradiction. He
doesn't know whose number to trust.

---

## 4. Findings — numbered

Marking each as **C** (Custom-AWS-filter closure validation) or **N**
(new finding surfaced this session).

### F1 [C, FAILED] — The round-17 fix is display-only; scoring is unchanged.

**Severity: At-risk → Blocker.** This is the single most important
finding of the session. Round-17 added
`serviceTagFilters: { aws: ['general'] }` to the Custom template.
This filter is consumed by `TechCard.tsx:314-323` — purely a render-
layer filter that hides services from the checkbox grid. The
scoring engine at `scoring.ts:442` (`resolveChecklistTier`) uses
`tech.services` (the full 26) as the denominator, ignoring the
template's filter entirely. Result: the UI displays "3 / 15" in the
checklist body and the SAME verdict object reports "3/26 services"
in the label. The ratio 0.115 < 0.25 → Red. Theo's verdict is
identical pre- and post-fix.

**The closure objective FAILED.** The recruiter's pain point
(headline reading "thin engineer") is unmoved.

**Worse than no-fix.** Pre-round-17, the UI and verdict agreed:
both said 3/26, both read Red. The recruiter knew where they were.
Post-round-17, the UI says 3/15 and the verdict says 3/26.
**Internally contradictory output on the same card.** Theo
notices and pushes back; Liam can't explain. The trust cost of
visible inconsistency is higher than the misread it was supposed
to fix.

**Root cause:** `serviceTagFilters` was originally designed
(round-4 Helena/Wendy/Owen) as a noise-reduction filter for
already-filtered roles (SA, Security, AI/ML — all narrower
mandates where the *purpose* was to hide irrelevant services
from the recruiter's eye). On those templates the denominator
question never bit because (a) the candidates for those roles
score high enough that 3/26 → Red wasn't the failure mode, and
(b) the denominator never surfaced as the headline number — the
headline read "Coverage: 23%" or similar; the actual count was
secondary. The Custom case inverts both: the denominator IS the
story, and the candidate's ticks IS the failure mode.

**Fix shape (proposed):** Make `serviceTagFilters` a scoring
consideration in `resolveChecklistTier`, not just a render filter.
Either:
- (a) **Filter the denominator** in scoring too: pass the
  active template's filter through `resolveTier` so `services`
  is the same 15 the recruiter sees. Theo becomes 3/15 = 20% →
  still Red (below the 25% threshold) but at least
  internally-consistent and 8.5pp closer to the boundary.
- (b) **Filter denominator AND adjust threshold semantics**:
  decide whether the filter changes the meaning of coverage
  (general-only filter → "operator-shape coverage" with the
  original threshold, OR "filtered subset coverage" with a
  recalibrated threshold). Probably overengineered for v1.
- (c) **Surface the contradiction explicitly:** show "3/15
  shown (3/26 catalog)" in the verdict so the recruiter knows.
  Honest but ugly; doesn't fix Theo's misread.

The PRD-honest answer is probably (a) and accept that Theo at
3/15 = 20% is still Red on raw coverage. **The actual fix Theo
needs to read Yellow is a fourth service tick** — Liam would
need to tick CloudWatch (it's `general`-tagged) to land 4/15 =
26.7% → Yellow. That's not a scoring fix; that's a recruiter-
training fix. The 'general' filter alone doesn't flip the Red.

**This finding nullifies the round-17 Custom-AWS-filter ship as
shipped.** Re-open as round-12 priority blocker.

### F2 [C, PASSED] — The render-layer filter itself works correctly.

The display side of the round-17 fix is implemented as designed.
Card renders 15 services (the 15 `general`-tagged ones), with the
hidden-count caption ("11 other services hidden (filtered for
Custom)") correctly displayed. The mechanism (consuming
`meta.templateId` → finding the role → reading
`serviceTagFilters?.[tech.id]` → intersection-filtering by tag)
fires for Custom exactly as it does for Backend / Fullstack / SA.

No regression on Backend/SA/Security/AI/ML — they continue to
render their filtered subsets unchanged.

The implementation IS what the PR says it is. The PR just
doesn't reach the scoring path.

### F3 [C, PASSED] — Postgres hybrid (batch-13) doesn't regress on Custom.

Theo's "15, working depth, services untouched" lands as **Green
"Good" with no coverage suffix** — exactly what batch-13's hybrid
back-compat gate (services untouched → version-only) was designed
to produce. The dual-body card renders without visual jank.
Liam's half-second pause is real (first time seeing it) but not
disruptive — adds ~3s to the screening, not the 30s that would
make hybrid mode unviable on a phone budget.

The hybrid gate's "untouched → version-only" path is the right
default for a Custom-template generalist recruiter who doesn't
have time to walk a 13-service checklist. **Recommend keeping
this behavior; resist any temptation to force a coverage walk on
hybrid cards.** The senior-DBA recruiter who wants the coverage
signal is on the `database-dba` template, not Custom.

### F4 [N] — TypeScript shallow + mid-senior reads Green (unchanged from round-10).

Theo: "Shallow. I read it, I write small patches, I don't author
libraries." Tier match TS 5.x → Green; depth=shallow + seniority
not junior → no lowering (round-7 7D only fires on junior). Card
reads Green clean.

**Honest read of Theo:** he's not Green on TS. He's a working-depth
Python+Django dev who reads TS on his React app. The current scoring
honors his self-report ("shallow") with no penalty for mid-senior
candidates. This is the same finding as round-10 FT-2's F3 — round
10 logged it as a follow-up. Still unaddressed.

**Severity: ambient.** Doesn't break the session — the recruiter
sees `shallow` in the depth chip and is responsible for reading
the full card. But the headline-bucket count for Theo says he's
Green on TS, which feeds into Liam's "competent generalist" read
in a way that isn't quite earned.

**Speculative fix:** extend round-7 7D's shallow-lower to also
apply when `seniority` is `unspecified` (the Custom flow where
Liam never picks a seniority). Or — more honest — surface
"shallow" prominently in the verdict label for mid/senior
candidates too. Defer to a separate session; not a round-12
blocker.

### F5 [N, trade-off pressure-test] — Custom 'general' filter is opinionated against Security-shaped and AI-shaped candidates.

The round-17 commit message notes this trade-off ("Recruiters who
want the architect / security / data-ml / CI slice should pick
those templates instead"). The simulation pressure-tests it.

**Imagined counter-case:** Theo's colleague Adaeze runs the same
fintech's security work — she actually configures KMS keys, reviews
GuardDuty findings, and operates the SecurityHub aggregator. The
fintech doesn't have a dedicated security engineer; Adaeze is a
backend dev who also owns security. **Liam, if he ran her on the
Custom template** (which he would, because the same brief —
generalist — applies), would see her tick zero security services
because the security services are HIDDEN. Her AWS verdict would
read identical to Theo's Lambda+RDS+S3 generalist. **The Custom
filter actively hides the differentiating signal.**

Fix on the recruiter side: Liam picks the Security template for
Adaeze. But the round-17 commit's mental model assumes Liam knows
to switch — and Custom is the "I don't know what shape this person
is" fallback by definition.

**Severity: ambient → at-risk** depending on how often the
non-general AWS slice is the differentiating signal for a generalist-
recruited candidate. Pre-round-17 the wall-of-26-services made
Adaeze look bad too (security ticks read as low-coverage on a
26-service denominator), so this isn't strictly a regression — the
hidden-by-default model trades one failure mode for another. But
it's a real surface.

**Tracked option:** per-card lens picker in the UX-redesign session
the round-17 commit defers to. (Liam clicks a chip on the AWS card
to change `general` → `security` mid-call.) Right model long-term;
not a round-12 batch.

### F6 [N] — Search-add tax on Custom remains the dominant time cost.

1:40 of 8:00 (~21% of budget) was spent typing 8 search-adds before
the first verdict was rendered. Round 10's FT-2 logged the same
finding; round 17 was scoped to Custom-AWS-filter only, not
search-add reduction. **Reminder note**: the deferred "Custom
generalist preload" (5-tech default of python+postgres+docker+aws+
github-actions, recruiter removes/adds as the call goes) would
recover ~1 min of phone budget. Not in round-17 scope; re-flag for
the next Custom-flow batch.

### F7 [N, minor] — Render contradiction is more visible on phone-screen rendering than desktop.

Liam was on a phone-call laptop screen (15", default zoom). The
"3 / 15" caption and the "3/26 services" verdict label are visually
~80px apart on the AWS card. On a smaller screen (recruiter-on-
laptop in a coffee shop, the actual context the tool is designed
for) the contradiction is in a single eye-saccade. On a 27" desktop
the caption and label are far enough apart that a less-attentive
recruiter might miss the divergence.

**Implication:** F1's "internally contradictory output" is most
salient in exactly the channel the tool is most-used in (phone,
small screen, time pressure). The trust cost of F1 is higher than
a pure screen-real-estate consideration would suggest.

---

## 5. Round-12 verdict

**Round-17 Custom-AWS-filter ship: closure target NOT met. Re-open
as round-12 blocker.**

The render-layer change is correctly implemented (F2). The scoring-
layer change that closure required was not implemented (F1). The
two together produce visible self-contradiction on the candidate
card — UI says 3/15, verdict says 3/26 — which is a worse
recruiter experience than the pre-round-17 baseline. Theo's
headline read is unchanged (still Red on AWS, still mis-framed
as thin). The pain point round 10 raised is unresolved.

**Recommended next step:** thread `serviceTagFilters` through the
scoring path in `scoring.ts:resolveChecklistTier` (and the parallel
hybrid path in `resolveHybridTier` if any hybrid tech is targeted
by a future filter). Make the denominator match what the recruiter
sees. Document in the JSDoc on `serviceTagFilters` (roles.ts:26)
that it now affects scoring, not just display.

**Honest secondary read:** even with the scoring fix, Theo at 3/15
= 20% is still Red on raw coverage. The round-17 commit message's
claim that Theo would read Yellow post-fix is arithmetically wrong
— it would need 4 ticks (4/15 = 26.7%) to clear 25%. The 'general'
filter alone doesn't flip Red→Yellow for a 3-service Lambda+RDS+S3
generalist; it just narrows the denominator. If the goal really
is to make the Lambda+RDS+S3 working-depth generalist read Yellow,
the right lever is either (a) narrowing 'general' further to ~10
services (drop EKS / EC2 / VPC / DynamoDB / CloudFormation — these
are SA/DevOps territory, not generalist-fullstack core), OR (b)
re-tuning the Red/Yellow threshold from 25% to a value that fits
the filtered shape. Both are catalog-curation decisions, not
scoring-engine fixes; both belong in a separate ralph-loop session
after F1 is shipped.

**Round-12 priority list (provisional):**
1. **F1 BLOCKER** — scoring-side filter for `serviceTagFilters`.
2. **F5 AT-RISK** — track per-card lens picker for the
   non-general-shaped candidate on Custom.
3. **F4 AMBIENT** — TypeScript shallow + mid-senior reads Green
   (round-10 follow-up, still open).
4. **F6 AMBIENT** — Custom-flow search-add tax (deferred to UX
   redesign).
5. **F7 MINOR** — verify F1's fix removes the screen-real-estate
   contradiction on phone-rendering.

Theo deserves a third pass after F1 ships.
