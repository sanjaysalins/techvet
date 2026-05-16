# Session 06 — Eitan Berg (Junior Backend, 1.5 yr, career-switcher)

**Agent:** sim-agent-r7-06
**Date:** 2026-05-16
**Round:** 2026-05-16-round-7-post-6F-validation
**Channel:** Phone (6 min — junior screen, tight)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Eitan is 31, 1.5 years into his first dev role at a Berlin healthtech where
he was previously a manual QA engineer for 5 years. He did a 12-week
bootcamp 18 months ago and was hired internally — same company, same
domain knowledge, new job title. He owns two internal admin tools (CRUD over
Postgres + Express) and helps maintain a legacy patient-eligibility service
written in Spring Boot 2.5 that the team inherited and "keeps meaning to
upgrade." He reads the Spring code, occasionally patches bugs, has never
authored a controller from scratch. He writes Jest tests for everything he
ships — that's his QA muscle and it's his strongest area. He doesn't deploy
to Kubernetes ("our SRE team handles that"). He runs containers locally via
`docker compose` but doesn't author Dockerfiles ("the platform team gives
us a template"). No formal methodology — "what the team taught me, mostly.
We do standups and PRs."

He is friendly, a bit nervous, and honest about gaps. He answers crisply
when he knows ("Node 20") and says "honestly I'd have to ask the team"
when he doesn't.

The recruiter (Sasha, the same external technical recruiter who screened
Mei this morning) has Eitan booked for a tight 6-min phone slot — the
Berlin healthtech wants a junior backend dev to take over internal admin
tooling. They are NOT looking for senior signal; they want competent
Postgres + Node + Express + a willingness to learn the legacy Spring service.

## 2. Phone call — abbreviated

> S: "Hi Eitan, thanks for the time. Quick stack check, won't take long.
>   You're junior backend, about 18 months in, came from QA?"
> E: "Yeah, exactly. 5 years manual QA before that, all at the same
>   healthtech."
> [S clicks Backend Engineer template. Page preloads:
>   Node.js / Python / PostgreSQL / Redis / Docker / Kubernetes cards.]
> [S sets seniority=Junior, years=1.5, path=Career switcher, channel=Phone.]
> [S types in Additional context: "ex-QA, 5 yr before bootcamp". ~5 s.]
> [S skips Client mandate textarea — no time on 6-min call.]
>
> S: "Node version?" E: "20."
> [S types "20" → Yellow "Review / Probe" (matches min:20.0 yellow tier).
>   Sets depth=working. Pauses — Node 20 is LTS, feels harsh? Leaves it.]
>
> S: "Postgres?" E: "16."
> [S types "16" → Green "Good" (matches min:14.0 tier). Sets depth=shallow
>   — Eitan uses Postgres via the ORM, doesn't write raw SQL beyond findBy*.]
>
> S: "Docker?" E: "We use it but I just run `docker compose up`. Platform
>   team makes the images."
> [S clicks "I don't remember" toggle → Yellow "Review / Probe — version
>   unknown". Sets depth=shallow. The `unknownVersion + depth=shallow`
>   combo correctly suppresses the enterpriseStillUsed note (per Bug 5
>   fix from 12-session round in scoring.ts ~line 236).]
>
> S: "Kubernetes?" E: "I don't really deploy, our SRE team does that.
>   I've never run kubectl."
> [S clicks "Not in stack" → gray badge, item.notUsed=true, excluded from
>   buckets/radar. ~3 s.]
>
> S: "Python or Redis at all?" E: "No, we're a Node shop, and we don't use
>   Redis."
> [S clicks "Not in stack" on Python and Redis. Two more gray badges. ~5 s.]
>
> S: "What else do you use day-to-day?"
> E: "Express, Jest, and we maintain a Spring Boot 2.5 service that
>   nobody on the team wrote — I just patch bugs in it."
>
> [S types "Express" → finds it. E: "Whatever version, 4 something."]
> [S types "4" → Green "Good" (matches min:4 tier). depth=working.]
> [S types "Jest" → finds it. E: "29."]
> [S types "29" → Green "Good" (matches min:29.0 tier). depth=working.
>   This is Eitan's strongest area — he could honestly mark deep, but
>   Sasha defaults to working to avoid over-claim.]
> [S types "Spring Boot" → finds it. E: "2.5, the legacy service."]
> [S types "2.5" → **RED "Concern"** — version 2.5 is BELOW the min:2.7
>   Yellow tier, so it falls through to the min:0 Red tier. depth=shallow
>   (he reads it, patches bugs, never authored a controller). With
>   seniority=junior, 6C gates the enterpriseStillUsed softener — recency
>   doesn't fire because lastUsed=current (no recency penalty either
>   direction). The Red verdict stands.]
>
> [Time check: ~5:00 elapsed. Sasha skips methodology (Backend template
>   has no chips per 6F focused-subset deferral; she sees the free-text
>   input + the "No template chips — type any methodology..." hint per
>   Assessment.tsx:445-449 but Eitan has no methodology to capture).]
>
> S: "Great, thanks Eitan. We'll be in touch."
>
> [Total: 4 scored techs + 3 notUsed + 0 named-only + 0 methodology.
>   ~5:25 elapsed.]

## 3. What TechVet would output

### Tech table

| Tech        | Version | Depth    | Scope                 | Predicted verdict                                                                     |
|-------------|---------|----------|-----------------------|---------------------------------------------------------------------------------------|
| Node.js     | 20      | working  | operator (implied)    | **Review / Probe** (min:20.0 yellow tier; enterpriseStillUsed root flag but `seniority=junior` gates the note off per `scoring.ts:289-292`) |
| PostgreSQL  | 16      | shallow  | operator (implied)    | **Good** (min:14.0 tier match; depth=shallow is invisible — version mode has no symmetric depth-down per J1)        |
| Docker      | unknown | shallow  | operator (implied)    | **Review / Probe** (`unknownVersion=true` forces yellow; Fix B suppresses depth-lift; enterpriseNote suppressed because `depth ≤ shallow` per `scoring.ts:236-237`) |
| Kubernetes  | —       | —        | —                     | **Not in stack** (gray skipped badge, excluded from buckets/radar)                    |
| Python      | —       | —        | —                     | **Not in stack** (gray)                                                                |
| Redis       | —       | —        | —                     | **Not in stack** (gray)                                                                |
| Express     | 4       | working  | operator (implied)    | **Good** (min:4 tier match)                                                            |
| Jest        | 29      | working  | operator (implied)    | **Good** (min:29.0 tier match)                                                         |
| Spring Boot | 2.5     | shallow  | operator (implied)    | **Concern (RED)** — 2.5 < min:2.7 yellow, falls through to min:0 red tier. 6C gates softener off (junior), lastUsed=current means no recency softener either way. **Red stands.** |

### Named-only chips

None — Eitan didn't surface any off-catalog tech.

### Methodology

Zero chips (Backend template has no methodologyChips per `roles.ts:62-76`),
zero free-text entries (Eitan has nothing to capture).

### Headline grid

- **3-card grid** (`grid-cols-3`) per `Summary.tsx:241` — no methodology
  entries (`methCount === 0`), no named-only (`offCount === 0`), so the
  4th-card and 5th-card branches don't fire.
- **Good: 3** (PostgreSQL, Express, Jest)
- **Review / Probe: 2** (Node.js, Docker)
- **Concern: 1** (Spring Boot)

### Coverage chips row

- `3 confirmed not in candidate's stack` chip (K8s + Python + Redis) — per
  Fix L `Summary.tsx:295-298`. Reads as positive coverage signal ("we
  asked, they said no").
- No "not discussed" chip — every preloaded card was touched or marked
  notUsed.
- No "off-catalog" chip — no named-only entries.

### Candidate context line

`formatCandidateContext(meta)` per `candidateContext.ts:9-46` yields:

> **Junior · 1.5 yr in industry · Career switcher · ex-QA, 5 yr before bootcamp**

Renders below the role line in 14-px font (`Summary.tsx:189-193`).

### Channel chip

> **Channel: Phone** (5ζ capitalization via `channelLabel()` in `channel.ts`)

### What the PDF actually looks like to the HM

Headline: **3 Good / 2 Yellow / 1 Red**, with a "3 confirmed not in
stack" gray chip below. Radar shows Backend (2 entries: Node, Express) +
Database (1: Postgres) + DevOps (1: Docker) + Testing (1: Jest) — only 4
axes. Strengths section lists 3 techs. Probe Further lists 2. Concerns
lists 1 (Spring Boot 2.5 with note "Spring Boot 2.x — verify Spring 6 /
Boot 3 migration awareness."). "Confirmed not in candidate's stack" h2
section lists K8s + Python + Redis with the positive-coverage framing.
No methodology section (zero entries). No named-only section. Candidate
context line in header.

## 4. Accuracy judgement

### Where it's right

- **K8s as "Not in stack" is the cleanest possible call.** Eitan honestly
  said he doesn't deploy and never runs kubectl. The notUsed gray badge
  excludes from buckets per `Summary.tsx` filter chain. **This is the
  6D belt-and-braces for junior K8s working as designed** — the brief
  imagined checklist 1/12 = 8% → Red, but Kubernetes is version-mode
  in this catalog so the notUsed path is even cleaner. No false
  Red-from-checklist; just an honest "not relevant to this candidate"
  gray. Eitan's truthful "I don't deploy" answer gets a truthful
  exclusion.
- **6C junior gate on Spring Boot 2.5 fires correctly.** With
  `seniority=junior`, the enterpriseStillUsed softener path in
  `applyRecency` (`scoring.ts:154`) is skipped. ALSO the enterpriseNote
  on the Yellow tier-match branch (`scoring.ts:291`) wouldn't have
  fired anyway because **2.5 lands on Red, not Yellow**. Red stays Red,
  reads as "Concern", and the HM sees the legacy-Spring gap as a probe
  target — exactly the round-7 intent. **6C junior gate validates
  cross-role on Backend, not just Mei's FE.** Even though in this
  specific case the version falls to Red and the junior gate is
  redundant with the Red-tier path (which has no softener at all), 6C
  would have fired if Eitan had said "2.7" — and the cross-role
  guarantee is what we needed to verify.
- **The "3 confirmed not in stack" chip carries unusually high signal
  for a junior screen.** Sasha asked 3 things Eitan honestly doesn't
  know, got honest "no"s, captured them. The HM reads "this junior
  knows what he doesn't know" — which is the single most positive
  junior signal available. Fix L promoted this to a chip-row; round-7
  Eitan is a clean validation.
- **Candidate context line carries the seniority + path reframing
  correctly.** "Junior · 1.5 yr in industry · Career switcher · ex-QA,
  5 yr before bootcamp" tells the HM in one line: this is a junior
  with domain depth from another role, not a fresh grad. The
  Additional-context field (`meta.candidateContext`) carrying the
  "ex-QA" phrase is doing real work — Fix M's free-text slot earns its
  place here.
- **Docker `unknown + shallow` correctly suppresses the
  enterpriseStillUsed note.** Per `scoring.ts:236-237`, the note only
  fires when `depth ≥ working`. Eitan's shallow stays cleanly Yellow
  with no misleading "Still widely used" reassurance. This is bug 5
  from the 12-session round protecting Eitan correctly.

### Where it under-rates Eitan

- **Spring Boot Red doesn't capture "he reads code and patches bugs in
  it" well.** A pure Red badge reads as "candidate is weak on Spring
  Boot." Eitan is junior-honest about it — he can read Spring code,
  occasionally lands patches, but has never authored a controller. The
  tier note "Spring Boot 2.x — verify Spring 6 / Boot 3 migration
  awareness." (tier-level note from `technologies.json:476-480`)
  doesn't fit Eitan's shape — the *version* concern is moot for a
  junior who didn't pick the version. The note assumes a candidate
  with agency over upgrades. **This is a tier-note mis-fit: catalog
  notes assume senior agency; the junior-on-legacy-stack-they-inherited
  case has no clean cell.** Mei had the same shape with Next.js 12
  and the J2 defect (round-6) named it — Eitan reproduces it on
  Backend with Red instead of Yellow.

### Where it over-rates Eitan (J1 territory, mostly)

- **PostgreSQL Green is honest tier-wise but ignores depth=shallow.**
  Eitan said "I use the ORM, I don't write much raw SQL." Sasha picked
  `shallow` correctly. The verdict stays Green identical to a senior
  who's authored partitioned tables and tuned EXPLAIN ANALYZE plans.
  Per `scoring.ts:25-36` (`adjustForDepth`), depth only LIFTS, never
  lowers. Same exact pattern Mei hit on TypeScript: junior depth axis
  is invisible in the headline. **J1 is open on Eitan's Postgres,
  identical mechanism to Mei's TS.** `src/lib/scoring.ts:25-36`
  governs both.
- **Express Green is technically correct but loses texture.** Express
  4 = Good is honest, but Eitan doesn't reach for middleware
  composition patterns, doesn't think about async error handlers, just
  writes route handlers the way his team taught him. depth=working
  captures that — but Green for a junior copying patterns reads
  identical to Green for a senior who reaches for Fastify/Hono in
  greenfield. Same J1 collapse.
- **Jest Green is correct AND Eitan's strongest area, but the badge
  doesn't celebrate it.** This is the inverse problem to PostgreSQL —
  Eitan COULD be marked `deep` here (5 yr of QA muscle, writes tests
  for everything), but Sasha defaulted to `working` to avoid
  over-claim. Even if she'd marked `deep`, Jest 29 is already Green so
  the depth-lift path can't lift further (`adjustForDepth` early-
  returns when sev === 0 per `scoring.ts:34`). **Eitan's strongest
  signal — QA-muscle Jest — has no way to surface as differentiated
  Green.** D1 root cause: no "Senior tier above Green."

### Where the report stays silent on something a HM would want

- **No "this candidate is junior-shape — verdicts are appropriate for
  the level being hired" framing.** The 3G/2Y/1R headline reads as
  "competent mid with one weak area" to a HM glancing at the report.
  The candidate context line in the header is the only redress, but
  the headline cards themselves carry zero seniority awareness. J5
  from Mei still open verbatim on Eitan.
- **No "Spring Boot 2.5 is inherited legacy, not chosen" framing.**
  The Red badge implies Eitan is weak on Spring Boot. The reality is
  more subtle — his team inherited a service nobody wrote, and he's
  the most-junior person occasionally patching it. The tier note
  doesn't help because it assumes upgrade-agency. The
  `candidateContext` free-text field could carry this nuance but Sasha
  didn't have time on a 6-min screen — she filled "ex-QA, 5 yr before
  bootcamp" instead, which is more valuable globally.
- **No "Eitan has no methodology yet — that's expected for junior"
  framing.** The Backend template has no methodology chips per the 6F
  focused-subset deferral (`roles.ts:62-76`). With 6B's
  always-render-section change, the empty section + free-text hint
  appears on Assessment but doesn't carry through to Summary if zero
  entries. Sasha sees the hint, skips it, no methodology card on the
  report. **This is the correct outcome for junior Eitan** (he has no
  methodology to capture). For a mid/senior Backend the same UI is a
  miss — but Eitan's session correctly hides the methodology card.

## 5. Friction during the call

- **Scope dropdown on every card is dead weight again** (J4 redux).
  Eitan is operator on every tech he touches. Sasha did NOT click
  scope on any of the 6 preloaded cards or 3 added cards (Express,
  Jest, Spring Boot). That's 9 cards × ~2-3 s of "do I need this?"
  hesitation per card = **~18-27 s of cognitive tax** on a 6-min
  budget. J4 from Mei is reproduced verbatim on Backend. The
  recommendation from Mei's session — hide the scope row when
  `meta.seniority === 'junior'` — remains the right shape. Source:
  `src/components/TechCard.tsx:93-118` always renders the Scope
  dropdown in the 3-column grid.
- **"Not in stack" button is the single highest-value UX element on
  this screen.** Sasha clicked it 3 times (K8s, Python, Redis) and
  each time the badge went gray + the card visually receded. ~3 s
  per click. Total ~9 s for high-value coverage capture. **The button
  is doing real work for junior screens** where 30-50% of the
  preloaded template doesn't apply.
- **Backend template preloading K8s + Python + Redis for a junior
  Node shop is template noise.** Sasha had to mark 3 of 6 preloaded
  templates as notUsed. The template assumes a fuller-stack backend
  shape; Eitan's reality is Node-only + a legacy Spring service.
  **Cost: ~9 s of explicit "not in stack" clicks** on a 6-min
  budget. Mitigation: a smaller "Junior Backend" subset template, or
  a template-customization step before the cards load. **Speed-of-use
  flag: 9 s of "not in stack" is the minimum tax for honest
  coverage capture; mitigation requires template fragmentation
  decisions out of scope for round 7.**
- **Spring Boot 2.5 Red feels harsh for a junior on inherited legacy.**
  The verdict is technically correct but lacks nuance. Sasha read the
  Red, read the tier note ("verify Spring 6 / Boot 3 migration
  awareness"), and had to mentally translate "he didn't pick this,
  his team inherited it." No UI affordance helps with that mental
  translation. **Cost: ~5 s of "should I add a note?" hesitation, no
  actual fix.**
- **Methodology section silence works in Eitan's favor.** Sasha sees
  the section, sees the "No template chips — type any methodology..."
  hint per `Assessment.tsx:445-449` (6B always-render fix), sees
  there's nothing junior Eitan can offer, skips it. **Zero time
  cost. The hint is visible-but-ignorable, not pressure-inducing.**
  6F's decision to skip Backend methodology chips is *correct for
  this junior backend candidate specifically* — see section 7 for
  the broader call.
- **Candidate context row felt natural.** Junior + 1.5 + Career
  switcher + "ex-QA, 5 yr before bootcamp" took ~12 s total — the
  bootcamp/ex-QA detail in Additional context took maybe 6 s of
  typing. **Fix M's free-text field is the single most decision-
  relevant element on this screen.**

### Phone-shrink test — what breaks on a real phone call

1. **Scope dropdown tax (~20 s).** Same as Mei. Junior-mitigation:
   hide when seniority === 'junior'. **J4 STILL OPEN cross-role.**
2. **Backend template preloads 3 techs Eitan doesn't use** (Python,
   Redis, K8s). 9 s of "not in stack" clicks. Not a junior-specific
   issue but the junior-budget makes it more painful.
3. **Spring Boot Red doesn't fit "inherited legacy" shape.** No UI
   nudge to add nuance; relies on HM reading candidate context line.
   **5 s of hesitation, zero recourse in the tool.**
4. **No "this is fine for junior" headline framing** (J5). HM has to
   cross-reference the candidate context line with the headline
   cards mentally. **Doesn't break the call; breaks the report.**

### Friction that vanishes on phone for Eitan specifically

- **Methodology section** — visible-but-ignorable. The 6B always-render
  + free-text hint shows nothing for a recruiter to fill on a junior
  with no methodology. Zero cost. **Correct UX for this shape.**
- **Lastused field** — Sasha skipped on every card. Eitan is on
  current stack daily; recency is implicit. No friction.
- **Scope-cap explanations / amber notes** — never fire for Eitan
  (no scope set, no architect/reviewer). 3-column TechCard grid
  feels less crowded.

### Speed-of-use rating

**Speed-of-use: AT-RISK for the phone-time budget (~5:25 vs 6 min target).**

Inside the budget but with thinner margin than Mei (5:25 vs Mei's
5:40 — Eitan has fewer techs but the template has more notUsed-click
overhead). The biggest single risk to the margin is the scope dropdown
(~20 s of "not-clicks") + the 3 notUsed clicks (~9 s). A more nervous
recruiter or a candidate who answers less crisply would push past
6 min. **Junior-mitigation: hide scope when junior + offer a "Junior
Backend" template subset → would bring this to ~4:30, comfortable.**

**Report-shape: AT-RISK for junior accuracy.** 3G/2Y/1R reads as
"competent mid with a Spring Boot weakness" to a HM. The candidate
context line saves it from being misleading. The Red on Spring Boot
specifically risks being mis-read as "Eitan is weak" vs "Eitan
inherited a legacy stack his team won't upgrade." **Same J5 root
cause as Mei.**

## 6. Bugs / structural defects

### Defect J1 redux — Junior depth doesn't lower verdicts (cross-role confirmed)

**Severity: High** for junior validity. **Still open.**

Same root cause as Mei round-6 J1: `adjustForDepth`
(`scoring.ts:25-36`) only lifts. Eitan's PostgreSQL 16 + depth=shallow
produces a Green badge identical to a senior who tunes EXPLAIN ANALYZE
plans. Eitan's Express 4 + depth=working also Green identical to a
senior who reaches for Fastify in greenfield. **J1 reproduces verbatim
on Backend — not specific to Mei's FE template. Confirms cross-role
gap.** Evidence: `src/lib/scoring.ts:25-36` + observed on PostgreSQL
and Express on this session.

### Defect J4 redux — Scope dropdown on every card (cross-role confirmed)

**Severity: Medium** for junior-screen UX. **Still open.**

`TechCard.tsx:93-118` always renders the Scope dropdown. Eitan is
operator on 100% of his 6 scored techs. Sasha "not-clicks" the
dropdown 9 times (6 preloaded + 3 added). Cost: ~18-27 s of
cognitive tax on a 6-min budget. Mei's J4 with identical mechanism
on Frontend template. **Cross-role confirmed: J4 is junior-shape, not
template-shape.** Mitigations from Mei's session unchanged:
seniority-gate the field or defer to a "more details" disclosure.

### Defect J5 redux — Headline cards carry no seniority context (cross-role confirmed)

**Severity: Low (but it's the framing the HM most wants).** **Still open.**

The 3G/2Y/1R headline reads as "competent mid with a Spring Boot
weakness." For Eitan as a 1.5-yr career-switcher, "competent" is
generous and "weakness on Spring Boot" misframes inherited-legacy as
candidate-weakness. The candidate context line in the header is the
only seniority signal and it lives ABOVE the headline cards.
**Evidence:** the headline cards (`Summary.tsx:235-289`) carry no
level-awareness. Cross-role-confirmed: identical Mei mechanism on
Backend.

### Defect 7B (new) — Tier notes assume senior agency over version choice

**Severity: Medium** for junior-on-legacy-stack shapes.

Spring Boot 2.5 tier note (the min:2.7 Yellow tier note, which would
have applied if Eitan were on 2.7 instead of 2.5) reads "Spring Boot
2.x — verify Spring 6 / Boot 3 migration awareness." This assumes the
candidate has agency over upgrades. For junior-inherited-legacy
candidates, the relevant probe isn't "are you aware of migration" —
it's "what's your day-to-day shape on this legacy code, do you
understand what you're patching?" **Evidence:**
`src/data/technologies.json:479` tier note copy. The 6C softener fix
correctly suppressed the *softener note* but didn't touch the *tier
note*, which carries its own seniority-assumption bias. Note: this
particular session Eitan landed on Red (2.5 < min:2.7), so this
specific tier-note doesn't render — but the same pattern applies on
many Yellow tiers across catalog (Django 3.2 / MongoDB 4 / Java 11 /
etc. all carry "verify migration awareness" or equivalent senior-
agency assumptions).

### Defect 7C (new) — Backend template preloads K8s + Python + Redis is junior-noisy

**Severity: Low.**

Backend template (`roles.ts:62-76`) preloads
`['nodejs', 'python', 'postgresql', 'redis', 'docker', 'kubernetes']`.
For Eitan (Node-only shop + legacy Spring), 3 of 6 preloads are
notUsed. Cost: ~9 s of explicit notUsed clicks. Doesn't break the
screen but adds noise on a junior 6-min budget. Possible mitigations
out of scope for this round but worth naming: a "Junior Backend"
template variant with just `[nodejs, postgresql, docker]`, or a
template-customization step.

## 6b. Speed-of-use rating (REQUIRED)

### Entry time per tech (junior + Backend template + Phone)

- Node/Postgres/Docker/Express/Jest (version-mode, version + depth):
  **~8-12 s each = ~50 s.**
- Spring Boot (search + add + version + depth): **~15 s.**
- K8s + Python + Redis (notUsed clicks): **~9 s total** (~3 s each).
- Candidate context row (Junior + 1.5 + Career switcher + ex-QA
  context): **~12 s.**
- Channel chip / name / role: **~10 s.**
- Methodology section: **0 s** (skipped — no chips, no entries).
- Client mandate textarea: **0 s** (skipped — no time).
- **Total entry time: ~96 s of TechVet interaction + ~225 s of
  conversational pauses = ~5:25 elapsed.** Inside 6-min budget with
  ~35 s buffer.

### Risk / safe rating

**Speed-of-use: AT-RISK for junior backend phone screen
(~5:25 vs 6:00).** Inside budget but the scope dropdown tax
(~20 s of not-clicks) is the single biggest risk. A more nervous
recruiter or a less-crisp candidate would push past 6 min. **The
junior gates on 6C work correctly; the unmitigated J4 scope-dropdown
tax is the dominant junior friction. Closing J4 would bring this to
SAFE comfortably.**

## 7. Cross-role junior validation

**6C closes the junior softener regression cross-role on Backend.**
The round-6 Mei regression was on Next.js 12 (Yellow + enterpriseStillUsed
+ junior → softener fires → masks App Router gap). 6C's gate
(`scoring.ts:154`: `tech.enterpriseStillUsed && seniority !== 'junior'`)
correctly suppresses the softener for ANY junior on ANY enterpriseStillUsed
tech, FE or Backend. Eitan's Spring Boot 2.5 specifically lands on Red
(below min:2.7) so the softener path is inapplicable in this particular
case — but the same 6C check ALSO gates the enterpriseStillUsed Yellow-tier
note on the tier-match branch (`scoring.ts:291`), and that branch would
have fired if Eitan said "2.7" or "2.6" (which would Yellow-match). Round
7's Eitan validates: **the junior gate is template- and category-agnostic,
firing wherever `enterpriseStillUsed` exists in catalog + Yellow tier +
junior seniority intersect.** Cross-role regression is closed.

### J-defect ledger from Mei round-6 — still-open status as of Eitan round-7

| #  | Defect (Mei round-6 framing)                                                          | Eitan reproduces? | Severity | Notes                                                                                                                                          |
|----|---------------------------------------------------------------------------------------|-------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| J1 | Junior depth doesn't lower verdicts (no symmetric depth-down path in version mode)    | YES               | High     | PostgreSQL 16 + shallow → Green identical to senior tuner. Express 4 + working → Green identical to senior framework-picker. `scoring.ts:25-36`.|
| J2 | `enterpriseStillUsed` softener fires for junior on "team hasn't upgraded" stale techs | NO (closed by 6C) | —        | Verified above. 6C gate works on Backend too.                                                                                                  |
| J3 | Frontend template has no methodology chips                                            | N/A               | —        | Closed for Frontend by 6F. Backend has no chips either, but for junior Eitan this is the *correct* UX (no methodology to capture).             |
| J4 | Scope dropdown on every card — senior axis taxing junior phone                        | YES               | Medium   | Eitan not-clicks 9 cards × 2-3 s = ~20 s tax. `TechCard.tsx:93-118` unchanged since Mei.                                                       |
| J5 | Headline cards carry no seniority-awareness — 3G/2Y/1R reads as "weak mid"            | YES               | Low      | Spring Boot Red specifically misframes inherited-legacy. Candidate context line is the only redress and lives above the cards. `Summary.tsx:235-289`. |

**Score: 1 of 5 Mei defects closed by round-6/7 ships. J1/J4/J5 confirmed
cross-role; not Mei-specific or FE-template-specific.** They are junior-
shape gaps in the product, surfacing wherever junior recruiters use TechVet.

### Was 6F's Backend chip-less decision right for junior Backend specifically?

**YES — correct for junior Backend, but for the wrong-shaped reason.** 6F's
focused-subset scope skipped Backend chips because the Backend template
serves a broad junior-to-senior range and any chip-set would over-fit one
seniority. For junior Eitan specifically, the chip-less Backend renders
the 6B always-render-section + free-text hint cleanly — Eitan has no
methodology to capture, the hint is visible-but-ignorable, no time cost.
**For mid/senior Backend (Sven this round), the chip-less Backend is
documented as a gap** — Sven's contract-testing/feature-flags/OTel/
idempotency signal has no chip surface. **The right fix is seniority-
gated chip-sets, not chip-or-no-chip:** Backend template carries a
chip-set that filters by seniority (junior sees 0-2 lightweight chips,
mid sees 4-6, senior sees the full 6-8). Until that lands, 6F's chip-less
Backend is the safest default — over-fitting to senior would have made
junior screens worse, and junior screens are the speed-of-use canary.

## 8. Bugs / structural defects (de-duplicated summary)

| #   | Defect                                                                                   | Severity | Evidence                                       |
|-----|------------------------------------------------------------------------------------------|----------|------------------------------------------------|
| J1  | Junior depth doesn't lower verdicts (cross-role confirmed)                                | High     | `scoring.ts:25-36`                              |
| J4  | Scope dropdown on every card — senior axis taxing junior phone (cross-role confirmed)     | Medium   | `TechCard.tsx:93-118`                           |
| J5  | Headline cards carry no seniority context — 3G/2Y/1R reads as "weak mid" (cross-role)     | Low      | `Summary.tsx:235-289`                           |
| 7B  | Tier notes assume senior agency over version choice — mis-fit junior-inherited-legacy    | Medium   | `technologies.json:479` (Spring Boot 2.x note) + ~10 other Yellow tier notes carry similar assumptions |
| 7C  | Backend template preloads K8s + Python + Redis — junior-noisy (3 of 6 notUsed clicks)    | Low      | `roles.ts:62-76`                                |

## 9. Catalog gaps

- **No first-class "Senior tier above Green" axis.** Eitan's Jest is
  his strongest signal (5 yr QA + writes tests for everything) but the
  badge is the same Green a junior who's never used Jest before would
  get. Catalog tier mechanism caps at Green per `scoring.ts:34`.
  Round-1 D1 / Mei round-6 J1 root cause; not a new finding but
  reproduced on a junior shape this round.
- **No "inherited-legacy" tag on tier notes.** Spring Boot 2.x tier
  note assumes upgrade-agency; junior-inherited-legacy candidates
  need different probes ("can you read this code? what have you
  patched recently?"). Could be a `juniorTierNote` field on
  Technology / VersionTier — alternate copy when seniority=junior.

## 10. One-liner for cross-cut

> **Eitan (Junior Backend, 1.5 yr, career-switcher, phone) — Backend
> template — 5:25 / 6:00 AT-RISK; 6C junior gate confirmed cross-role
> on Spring Boot (lands Red because 2.5 < min:2.7, but same gate
> would fire on 2.7 Yellow); J1 (depth-blind Greens) reproduces on
> PostgreSQL + Express; J4 (scope dropdown tax ~20s) and J5
> (headline no-seniority-context) reproduce verbatim from Mei FE.
> Backend chip-less is correct for junior Eitan but documented gap
> for mid/senior — seniority-gated chip-sets is the real fix.**

## 11. Recommendations

1. **Hide Scope dropdown when `meta.seniority === 'junior'`.** Same
   mitigation Mei recommended, now confirmed cross-role. Saves ~20 s
   on phone screens. `TechCard.tsx:93-118` wrap in
   `{meta.seniority !== 'junior' && (...)}`. Single highest-value
   junior-shape ship.
2. **Add a "level-fit" inline headline below the 3-card grid:
   "3G / 2Y / 1R verdicts read as: appropriate for Junior level."**
   Driven by `meta.seniority`. Distinguishes "junior with normal
   junior shape" from "weak mid." Single highest-value junior-shape
   *report* fix. Same recommendation as Mei round-6.
3. **Symmetric depth-down path in version mode** — when `depth=shallow`
   on a Green tier, drop to Yellow with note "candidate's depth
   doesn't support the version-tier signal — probe before relying on
   it." Would close J1. Risks reading as "the tool penalizes honesty"
   — needs design pass. Lower priority than #1 and #2.
4. **Seniority-gated tier notes.** Add optional `juniorTierNote`
   field on VersionTier so junior-inherited-legacy candidates get
   different probe copy. Closes 7B. ~1 day of catalog editing across
   ~10 enterpriseStillUsed tiers.
5. **Seniority-gated methodology chip-sets on Backend (and other
   currently-chip-less templates).** When seniority=junior, render
   0-2 lightweight chips (e.g. "PR review etiquette", "writing
   helpful test assertions"). When seniority=mid/senior, render the
   full 6-8 (contract testing / feature flags / OTel / idempotency
   for Backend). Closes the 6F deferral cleanly and matches Mei +
   Eitan recommendations.
6. **(Lower priority) "Junior Backend" template subset** preloading
   only `[nodejs, postgresql, docker]`. Saves 3 notUsed clicks per
   junior backend screen. Same shape would apply to junior-frontend
   (skip Storybook + Vite for very-fresh juniors). Template-fragmentation
   decision deserves its own design pass.

## Disagreement with prior fixes

**6C junior softener gate is correctly cross-role but creates a
visible inconsistency on `enterpriseStillUsed` tier notes.** Round-6
6C suppressed both the recency softener (`scoring.ts:154`) and the
Yellow-tier enterpriseNote (`scoring.ts:291`) for juniors. Both gates
fire on `seniority !== 'junior'`. But the tier's `note` field —
e.g. Spring Boot 2.x's "verify Spring 6 / Boot 3 migration awareness"
— is unchanged regardless of seniority. So junior Eitan on a Spring
Boot 2.7 hypothetical would see Yellow, no softener, no
enterpriseNote ("Still widely used..."), but WOULD see the tier note
("verify migration awareness"). That tier note carries its own
senior-agency assumption (Mei's Next.js 12 has the same shape). **6C
went 2/3 of the way; the tier note copy is the missing third leg.**
Add `juniorTierNote` field (see Recommendation 4) or have the UI
suppress the tier note for juniors and rely on suggestedProbes
instead.

**Backend template chip-less is right for junior, gap for mid/senior
— don't add chips, add seniority-gated chips.** A naive "add Backend
methodology chips" would over-fit Sven (mid) and pressure Eitan
(junior) into filling a field he has no answers for. The right shape
is seniority-conditional chip rendering. Until that lands, 6F's
chip-less Backend is the safer default — but it's a temporary safety,
not an end-state.
