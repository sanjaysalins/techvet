# Session 06 — Theo Adesina (Mid-Senior Generalist, phone, Custom template, 8 min)

**Round:** 10 (saturation validation)
**Batch under test:** First-ever validation of the Custom template flow — recruiter-driven, no preload, no curated methodology chips. Validates whether `techIds: []` on the `custom` template (roles.ts:417-421) holds together end-to-end on a phone-budget vet.
**Channel:** Phone, 8 min hard stop, Theo on a coffee break between standup and a one-to-one.
**Persona shape:** NEW. Generalist mid-senior, no specialist anchor. The deliberate "no template fits" case — by design no curated path takes this candidate.

---

## 1. Persona inhabited

Theo Adesina, 30, five years at a Lagos-based remittance + small-merchant
payments fintech (not a regulated bank — the fintech-not-bank distinction
matters; he has not been within ten metres of a SOC 2 audit). One employer
the whole way, promoted twice, currently "Mid-Senior Engineer" on a six-person
platform pod. He owns no single area end-to-end; he owns *coverage* — the
backend Django, the React legacy frontend that everyone keeps meaning to
re-architect, the GHA pipelines, the Postgres schemas, and just enough AWS
to keep Lambda + RDS + S3 humming without paging the platform tech lead.

What that means in vet terms: he can answer every question, but every answer
is "working knowledge" — not "deep." He knows Python's syntax but not the
async runtime quirks. He's typed React props but has never opened the React
profiler. He's written SQL migrations but has never sat down with EXPLAIN
ANALYZE for an hour. He's a *generalist*, and the catalog's tier ladders are
calibrated for people who go deep on one rung.

Crucially he is **not junior** — five years is mid-senior in the Lagos fintech
market, and his self-assessment is honest, not Dunning-Kruger. The 7D
shallow-lower-on-junior gate (`scoring.ts:45-50`) won't fire on his TypeScript
shallow — he stays at his tier. That's correct.

Channel is phone. 8 minutes. Liam (internal recruiter at a Nigerian
remote-first remittance shop, mandate is "mid-senior generalist") has the
CV in front of him and a single 8-minute window before Theo's standup ends.

**Why Custom:** Liam scanned the landing page for templates. Backend pre-loads
Django (good) but assumes deeper specialisation. Frontend pre-loads React +
TypeScript (good) but no Python. Fullstack (round-10 session 04) pre-loads
Next.js — Theo isn't on Next.js. No template covers the shape "Django + React
17 legacy + GHA + AWS Lambda + RDS + S3 + Postgres + Docker." So Liam picks
Custom. **This is the first session in 10 rounds that uses Custom in anger.**

---

## 2. Phone call — abbreviated

T-00:00 — Liam clicks the **Custom** card on the landing page (the
description "Start blank and add technologies as you go" reads accurate
but slightly intimidating on a stopwatch). Lands on /assess. Items list is
empty. Renders the "Add a technology to begin" empty state (Assessment.tsx:296-306).
Methodology section renders BUT — *checking* — does it render the 6B
free-text hint? Reading Assessment.tsx:445-449: `hasNoChips &&
methodologyEntries.length === 0` → italic hint "No template chips — type any
methodology / practice and press Enter to add" — yes, fires. 6B holds on
Custom. **First-ever Custom-flow validation point 1: PASS.**

Liam fills the header in ~30s: candidate name "Theo Adesina", role
"Mid-Senior Generalist", seniority `mid-senior`, years `5`, path `unspecified`,
mandate "Mid-senior generalist — Django + React + Postgres + AWS Lambda/RDS/S3
+ GHA, remote-first." Total elapsed: **00:30**.

T-00:30 — "Theo, hi — eight minutes, I need to walk your CV stack one-by-one,
ready? Python first."

T-00:32 — Liam clicks the search input, types "Python." Dropdown opens
(focus + change → setOpen(true), TechSearch.tsx:79-83). Three hits: Python,
pytest, pytorch. Liam clicks Python. Card appears under "Language" section.
**~7s.**

**Theo:** "3.11 in production, working depth, three years at this shop on
Django. Current."

Liam: types `3.11` → Green (Python's `3.10` tier "Good"). Sets depth=working,
scope=author (he writes code; the runtime is operated by Docker/Lambda).
Last-used: current. **~12s.** Elapsed: **00:51**.

T-00:51 — "Django?"

Liam: types "Django" in the search. Hit. Click. Card appears.
**Theo:** "Five, working depth, three years."

Types `5` → Green (Django's `4.2` tier "Good"). depth=working, scope=author,
last-used current. **~11s.** Elapsed: **01:02**.

T-01:02 — "React?"

Liam: types "React." Multiple hits (React, React Native — TechSearch
substring matches both). Picks React. **Theo:** "17, working, it's the
legacy frontend we keep meaning to migrate but never do."

Types `17` → Yellow (React's `16.0` tier — note: README quirk says React was
deliberately moved to 16.0 so bare "16" hits Yellow). `enterpriseStillUsed: true`
at root level + candidateHasMeaningfulDepth (working) + seniority is not
junior → `enterpriseNote: "Still widely used in many enterprise applications"`
fires. Reading scoring.ts:349-352. **Confirmed: 7E + enterpriseStillUsed
flag fires correctly on Custom flow.** No template anchor required.
Last-used: current. depth=working, scope=author. **~14s.** Elapsed: **01:16**.

T-01:16 — "TypeScript?"

Liam: types "TypeScript." Click. **Theo:** "Shallow. I type props and
interfaces but I don't write generics. We don't use strict mode."

Liam types nothing — pauses. Theo hasn't named a version. Liam takes the
recruiter shortcut: clicks "I don't remember version" toggle. Resolves to
Yellow (unknown-version branch, scoring.ts:267-315). depth=shallow, scope=author,
seniority=mid-senior → 7D lower-on-junior does NOT fire (scoring.ts:45 gates on
junior). Verdict stays Yellow. **This is the first-ever Custom-flow verification
of 7D's mid-senior pass-through.**

But wait — the `enterpriseNote` for unknown-version also gates on
`candidateHasMeaningfulDepth = item.depth === 'working' || 'deep' || 'very-deep'`
(scoring.ts:288-289). Shallow does NOT qualify. So Theo's TS shallow + unknown
version → Yellow, NO enterprise reassurance note. **That's the right call.**
"Still widely used in enterprise" would be the wrong framing for "I type props
and that's it." Elapsed: **01:30** (~14s).

T-01:30 — "Postgres? 15, you said on the CV?"

Liam: types "Postgres." Hits PostgreSQL — clicks. Card appears under "Database."
**Theo:** "15, working, schema design but I don't go deep on indexes — when
something gets slow I ask our DBA-shaped guy."

Liam EXPECTED a checklist here (he'd seen one for AWS coming up and assumed
all the platform-y categories were checklist-shaped). Reading
technologies.json:1049-1083: **Postgres is version-mode, not checklist.**
No service list. So Liam can only enter version + depth + scope.

Types `15` → Green (`14` tier "Good"). depth=working, scope=author, last-used
current. **~12s** because Liam paused looking for a checklist that wasn't
there. Elapsed: **01:42**.

→ **First-ever Custom-flow structural finding (FT-1):** Recruiter mental
model on phone is "platform = checklist, language = version." Postgres breaks
that — it's a platform-shaped piece (Theo's qualitative shape "schema design
not indexes" wants a checklist) but the catalog has it as version-mode. On
template flows this never surfaces because the template frames expectations
("you're a Backend dev, Postgres is your tool"). On Custom flow with no
template anchor, the recruiter is forced to discover each catalog shape
on the fly. Costs ~5s of hesitation per surprise.

T-01:42 — "Docker?"

Liam: types "Docker." Click. **Theo:** "Working — I write multi-stage
Dockerfiles for our services. Version probably 24 or 25, whatever GHA
runners give us."

Types `24` → Green (`24` tier "Excellent"). depth=working, scope=author,
last-used current. Note Docker has `enterpriseStillUsed` at tier level on
the Yellow `18` band only (technologies.json:1268), NOT at root. So Theo's
Green doesn't trigger the note — by design, the reassurance is band-specific.
**7E tier-level scoping confirmed firing correctly on Custom flow.** **~10s.**
Elapsed: **01:52**.

T-01:52 — "AWS — Lambda, RDS, S3, anything else?"

Liam: types "AWS." Click. Card opens — checklist mode, 26 services.
*(Reading technologies.json:1927-1955 — Custom has no `serviceTagFilters`,
so all 26 render. Round-4 SA template uses `serviceTagFilters: ['architect']`
to cut this to ~7; Custom gets the firehose.)*

**Theo:** "Lambda, RDS, S3. That's it. We do a tiny bit of CloudWatch for
logs but I wouldn't say I use it."

Liam: ticks Lambda, RDS, S3 (3 of 26). 3/26 = 11.5% → Red (under 25%
threshold, scoring.ts:480). depth=working, scope=operator (catalog's
`defaultScope: 'operator'` applies via Fix K, scoring.ts:251-254).
AWS has `enterpriseStillUsed: true` at root, but on checklist+Red the
softener only fires if `lastUsed` is stale (it isn't — current). So:
**Red, "Concern — 3/26 services."** **~22s** (ticking 3 boxes in a
26-row list, plus the "wait should I tick CloudWatch" pause).

Elapsed: **02:14**.

→ **FT-2 (Custom-flow structural):** A generalist who legitimately uses
3 AWS services in production reads "Concern" on the report. On the SA
template the architect-filter cuts the list to 7 services so 3/7 = 43%
Yellow. On a `defaultScope: operator` mandate with no template, the
denominator is 26. Theo's verdict is *technically* honest (he's not
broadly across AWS) but the HM reading "AWS: Concern" for a candidate
who is genuinely competent at the AWS surface his job touches will
mis-read this. The Custom-flow lack of a denominator-filter is real
signal noise.

T-02:14 — "GitHub Actions?"

Liam: types "GitHub Actions." Two hits (search matches the category "DevOps"
too — TechSearch substring match on category at TechSearch.tsx:29). Clicks
the first. Card opens — checklist again, 12 services.
**Theo:** "Workflows yeah, matrix builds yeah, secrets yeah, OIDC to AWS
yeah, caching yeah, artifacts yeah. We don't do reusable workflows or
composite actions — overkill for our size."

Liam ticks workflows-basics, matrix-builds, secrets-environments, oidc-cloud,
caching, artifacts → 6/12 = 50% → Yellow (between 25 and 66%). depth=working,
scope=author. **~22s** (ticking 6 of 12 with phone narration). Elapsed:
**02:36**.

T-02:36 — Liam goes back to add anything else? Theo: "That's basically the
stack. We have a redis cache and some sentry for errors but I don't
*build* with them, they're just there."

Liam pauses. Should he add Redis? Sentry? Theo's qualitative claim is
"I don't build with them." Liam decides: skip — the Summary will note
the stack he covered, the HM can ask in interview about peripheries.
Elapsed: **02:36**.

T-02:36 — Methodology. Liam types "trunk-based" in the free-text input,
hits Enter. Chip appears (green-ish via emerald-50 styling per
Assessment.tsx:477). Types "code review", Enter. Types "pytest", Enter.
Three entries.

**Theo:** "We do some pytest but coverage is patchy. No Pact, no OTel, no
feature flags."

Liam types "no pact / no otel / no flags" — pauses. Should he capture
negatives as methodology? The free-text hint says "type any methodology
/ practice." The semantics are "what the candidate brought up." Liam decides
NOT to add the negatives — they belong in interview notes, not the methodology
chip strip (which the Summary renders as "things the candidate brought up
beyond tools"). **~25s** for methodology including the hesitation.
Elapsed: **03:01**.

→ **First-ever Custom-flow methodology validation:** 6B's free-text fallback
works end-to-end on Custom. Three entries added, all persist to
`meta.methodologyEntries`, the chip strip renders with X-buttons. **PASS.**

T-03:01 — Liam: "Anything from your CV I haven't asked about?"

Theo: "Not really. Maybe Celery for background jobs?"

Liam: types "Celery" — no hits in catalog. The named-only CTA appears
("+ Add 'Celery' as named-only"). Click. Chip appears in the "Candidate
mentioned" amber strip per Assessment.tsx:263-294. **First-ever Custom-flow
validation of named-only on a no-template session: PASS.** **~10s.**

Elapsed: **03:11**.

T-03:11 — Liam closes: "Anything you'd flag as a gap? Honest."

Theo: "Async Python — I've never written async/await in anger. And
Postgres index strategy beyond the basics."

Liam types these into the candidate context box on the header? No — the
mandate box is full and there's no obvious place. He adds them to the
`notes` field at top. Elapsed: **03:25**.

→ **FT-3 (Custom-flow finding):** No structured place to capture
candidate-volunteered gaps. They go in `meta.notes` (CV link / notes), which
is a single line on the header. On template flows the candidate's gaps tend
to surface through the template's curated probes (red cards = gaps). On
Custom flow with no preload and a generalist who covers his stack at
working depth, **there are no Red cards** (apart from AWS coverage), so
the gaps *Theo volunteered* don't get captured anywhere structured. The
Summary won't render them.

T-03:25 — Liam: "Great, that's it." Calls "Review Summary."

**Time check:** 3 minutes 25 seconds total — well under the 8-minute
budget. The ~70s tax estimate was generous; actual was closer to **2:30
of add-tech time** (8 cards × ~12s avg = 96s, plus the methodology + named-only
+ context = ~35s). Custom flow on phone is **viable** on this stack.

But: Theo is a *clean* shape. He named one version per tech, ticked
exactly the AWS services he uses, and offered no version-confusion. A
messier candidate (forgets versions, ambiguous about Lambda vs ECS, walks
back claims) would eat more time per card and Custom flow's *tax* would
bite harder.

---

## 3. Post-call: report read

Headline ribbon (after navigating to Summary): **5G / 2Y / 1R / 1 named-only**.

- **Green:** Python 3.11, Django 5, Postgres 15, Docker 24, GitHub
  Actions (6/12 services Yellow → actually Yellow not Green, correcting:
  6/12 = 50% which is Yellow band). Let me re-count.

Re-counting more carefully:

- Python 3.11 → Green (Good)
- Django 5 → Green (Excellent)
- Postgres 15 → Green (Good)
- Docker 24 → Green (Excellent)
- React 17 → Yellow (Review / Probe) + enterpriseNote "Still widely used"
- TypeScript unknown + shallow → Yellow (Review / Probe), no enterprise note (shallow gate)
- GitHub Actions 6/12 → Yellow (Review / Probe — 6/12 services)
- AWS 3/26 → Red (Concern — 3/26 services)

Headline: **4G / 3Y / 1R / 1 named-only (Celery)**.

That reads honestly for a generalist mid-senior. The Greens are language +
framework + DB + container tooling — areas where the catalog's version
ladder rewards "current and working." The Yellows are React (legacy frontend),
TypeScript (shallow on a tool the catalog expects mid-deep), and GHA (only
half the surface). The Red is AWS — and it's *technically* honest (3/26 is
genuinely sparse coverage) but **mis-frames Theo's actual competence**
on the surface his job touches.

Methodology renders below the Yellow section per Summary.tsx:429+, three
entries (trunk-based / code review / pytest), no verdict — display-only
per Fix D4. **PASS.**

Named-only "Celery" renders in its own block — recruiter probe target for
the technical interviewer. **PASS.**

**What's missing from the report:**

1. The candidate-volunteered gaps (async Python, deep Postgres index strategy)
   — captured only in `meta.notes` as a single line, doesn't render with
   the prominence those gaps deserve. **FT-3 holds.**
2. There's no "generalist signal" framing. The 4G/3Y/1R distribution
   *looks like* an over-Yellow report, but the underlying story is
   "this candidate is appropriately competent at working depth across
   his stack" — not "this candidate has three weak areas." A reader
   without context (HM at 7am) sees three Yellows and a Red and
   reads "lots of gaps." The template-flow reports get a built-in
   shape framing from the template ID ("Senior Fullstack"); the
   Custom-flow report just renders the verdicts. **FT-4.**

---

## 4. Findings (numbered; FT- = first-ever Custom-flow)

**FT-1 — Mental-model mismatch on version-vs-checklist (medium):** On
Custom flow, recruiter discovers each tech's `vetMode` (version vs
checklist) only at the moment the card opens. Postgres looked
checklist-shaped in Liam's head (platform-y, services-y) but is
version-mode in catalog. ~5s tax per surprise. Doesn't bite on
template flows because the template frames the expectation. **Fix
shape:** dropdown badge on each card header that says "version-mode"
or "checklist-mode (12 services)" — surfaces the shape before the
recruiter starts hunting. Low effort.

**FT-2 — AWS Red on legitimate-3-service generalists (high):** A
generalist who uses exactly Lambda + RDS + S3 in production reads as
"AWS: Concern — 3/26 services" on a Custom-flow report. SA / DevOps /
Backend templates filter the AWS service list via `serviceTagFilters`
so the denominator is realistic (~7 services). Custom gets the full
26-item firehose. **Honest by raw math but misleading by framing.**
**Fix shape:** Custom needs *some* way to scope the denominator. Two
options:
   (a) Custom asks the recruiter to pick a "stack focus" (frontend /
       backend / fullstack / devops / data) at template-pick time, which
       maps to a `serviceTagFilters` for AWS + Azure + GCP cards. Same
       shape as templates but explicit. Adds ~5s at the start, saves
       the AWS Red-misread at the end.
   (b) The AWS card itself has a "filter to scope" pill (e.g. "operator
       / architect / security / cicd") on Custom. Same UX as the template
       does behind the scenes, but exposed.
   I lean (a) — fewer per-card decisions on a phone budget.

**FT-3 — No structured place for candidate-volunteered gaps (medium):**
The candidate-volunteered gap signal ("I'm weak on async Python")
is some of the highest-value signal in any vet. On templates with curated
red cards, gaps surface naturally via the red verdicts. On Custom flow
with a working-depth-across-the-board generalist, **no card reds out**
(except the AWS denominator mis-read), so the gaps go into `meta.notes`
— a single-line free-text on the header that renders inline on Summary
but doesn't read as a *gap*. **Fix shape:** add a "Candidate self-flagged
gaps" free-text input near the methodology section. Renders in its own
block on Summary alongside methodology. Display-only, no scoring impact.
Same shape as 6B's free-text methodology fallback but for the negative
signal.

**FT-4 — Report shape framing is template-anchored (low):** Template
flows get a built-in shape from `meta.role = template.name`. Custom-flow
reports just render verdicts with no shape framing — the HM has to infer
what kind of candidate this is from the stack list. For Theo (mid-senior
generalist, 4G/3Y/1R) the verdict-only render risks reading as "lots of
gaps" when the actual story is "appropriately working-depth across a
broad stack." **Fix shape:** Custom prompts the recruiter for a freeform
"candidate shape in one line" at template-pick time (e.g. "Mid-senior
generalist across Django + React"). Renders as the headline on Summary.
Low effort, high readability impact.

**FT-5 — 6B + 7D + 7E + named-only all fire correctly on Custom (no
fix needed):** Free-text methodology renders on no-chip Custom flow.
TypeScript shallow on mid-senior does NOT lower (7D gates on junior).
React 17 working + valid version + non-junior fires enterpriseNote.
Docker tier-level Yellow `enterpriseStillUsed` would fire on a Yellow
band (Theo's Green doesn't trigger by design). Named-only "Celery" CTA
fires on zero-hit search. **All four behaviors hold without a template
anchor.** This is the round-10 confirmation that 6B / 7D / 7E /
named-only were correctly designed template-independent.

**FT-6 — Time-to-add-7-techs on phone fits the 8-min budget (mostly)
for clean candidates (low-medium):** Actual add-time was ~96s for 8
cards (12s avg), well under the rough ~70s estimate. But Theo is a
*clean* shape — clear versions, no walk-backs, no ambiguity. A
messy candidate (forgets versions, ambiguous on what "we use" means)
would push per-card time to 20s+ and the budget would bite.
**Fix shape:** None for now — but worth tracking. If a future
Custom-flow session on a messier candidate runs over budget,
revisit FT-2's option (a) as a "loose starter" that pre-loads
~4 common techs (Python + React + Postgres + Docker — the
"generalist-ish" base) and saves ~50s. The Custom template
description could become "Start blank — or pick Loose Starter
above for a common 4-tech base." This is the "loose template"
the persona prompt floated. Not urgent yet, but the structural
gap exists.

---

## 5. Round-10 verdict

**Custom-flow status:** **SAFE with structural caveats.** Custom works
end-to-end on an 8-minute phone vet for a clean-shape generalist. The
6B / 7D / 7E / named-only behaviors all fire correctly without a
template anchor — confirming those four were template-independent by
design (FT-5). The free-text methodology fallback is a complete
substitute for chips. Named-only flow surfaces correctly.

**Structural items for round 11+ consideration:**

- **FT-2 (AWS denominator) is the strongest signal** — Custom-flow
  reports systematically over-Red generalists on cloud-checklist
  techs because Custom has no `serviceTagFilters`. This is a
  framing defect, not a scoring defect, but it shows up on every
  Custom session with a Cloud card. Medium-priority fix.
- **FT-1 (version-vs-checklist surprise) and FT-3 (no gap capture)
  are paper-cuts** that don't sink the flow but each cost ~5-10s
  on a phone budget. Low-priority each, batchable.
- **FT-4 (no shape framing) is a readability issue** for the HM,
  not the recruiter. Worth a small fix.
- **FT-6 (loose starter template) is hypothetical** — depends on
  whether a future messy-candidate Custom session breaches the
  8-min budget. Park.

**The 8-min phone budget held with 3+ minutes to spare for a clean
generalist.** Custom flow is recommendable. The recruiter-on-phone
constraint — TechVet's overarching product constraint per MEMORY.md
— is met by Custom on this shape. Round 10's Custom-flow validation
was its riskiest never-validated path; it's now validated and
viable. The 4 structural FTs are all framing-level, not flow-level
— Custom works, the reports it produces just need slightly better
shape signal.

**Distribution prediction stands:** Theo's session lands At-risk on
FT-2 (AWS denominator is a real mis-read), not Unworkable. The
Custom path itself is Safe.

**One pithy verdict for the round-10 round-up:** *Custom works — but
without a serviceTagFilters story, every generalist who touches AWS
will read "Concern" on the report. That's the structural item to ship
before Custom-flow goes public.*
