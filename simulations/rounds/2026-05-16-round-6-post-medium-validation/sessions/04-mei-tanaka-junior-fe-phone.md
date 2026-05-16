# Session 04 — Mei Tanaka (Junior Frontend, 2 yr, career-switcher)

**Agent:** sim-agent-r6-04
**Date:** 2026-05-16
**Round:** 2026-05-16-round-6-post-medium-validation
**Channel:** Phone (6 min — recruiter has 3 more screens after this)
**Role template picked:** Frontend Engineer

## 1. Persona inhabited

Mei is 26, two years out of General Assembly's 3-month full-stack bootcamp
after three years as a marketing analyst at a mid-size B2B SaaS. She's been
at a US e-commerce startup the whole time post-bootcamp. Owns the marketing-
site pages (CMS pulls, landing-page A/B tests), pairs on the checkout flow.
Speaks fluently about React hooks but admits "I copy types from teammates more
than I write them." Vite + Tailwind daily, Next.js 12 (the team hasn't
upgraded to 13/14 — they keep talking about it). Storybook for component dev.
Jest + RTL for unit tests, Vercel deploys. Used Zustand for one feature
(notification bell), otherwise useState. Never wrote a custom hook deeper
than `useDebounce`. No Redux, no SSR/RSC, no GraphQL.

She's friendly, slightly under-confident, and tries to be honest — when the
recruiter asks "what version?" she answers crisply when she knows and says
"honestly I'd have to look" when she doesn't.

The recruiter (Sasha, external technical recruiter) has Mei on for 6 min
because three more screens are queued for the rest of the morning. Sasha is
screening for a US e-commerce startup looking for a junior FE — they want
React + TypeScript + comfort with a modern build pipeline. They are NOT
looking for senior signal.

## 2. Phone call — abbreviated

> S: "Hey Mei, thanks for the time. I just need to tag your stack in our
>   tool, won't take long. You're a frontend engineer, right? About 2 years?"
> M: "Yeah, two years post-bootcamp, three years before that in marketing."
> [S clicks Frontend Engineer template. Page preloads React / TypeScript /
>   Next.js / Tailwind / Vite cards.]
> [S sets seniority=Junior, years=2, path=Career switcher, channel stays Phone.]
> [S skips Additional context, skips Client mandate — no time.]
>
> S: "React version?" M: "18, latest 18.3 I think."
> [S types "18.3" → Green "Good" (matches min:18.0 tier). Sets depth=working.]
>
> S: "TypeScript?" M: "Whatever Vite scaffolds. 5-something. I use it but
>   honestly I copy types from teammates more than I write them."
> [S types "5.3" → Green "Good" (matches min:4.9 tier). Sets depth=shallow.
>   Pauses for half a second on shallow — feels harsh? — leaves it.]
>
> S: "Next.js?" M: "12, we keep meaning to upgrade."
> [S types "12" → Yellow "Review / Probe" (matches min:12.0 yellow tier).
>   Sets depth=working.]
>
> S: "Tailwind, Vite — current?" M: "Tailwind 3, Vite 5."
> [S types Tailwind "3" → Green "Good" (matches min:3 tier). depth=working.]
> [S types Vite "5" → Green "Good" (matches min:4). depth=working.]
>
> S: "What else do you use?"
> M: "Storybook for components, Jest with React Testing Library, Zustand for
>   one feature, Vercel for deploys."
> [S types "Storybook" in search → finds it. Adds. Asks version. M: "I don't
>   remember the version honestly." S clicks "I don't remember" toggle →
>   Yellow "Review / Probe — version unknown". Sets depth=working.]
> [S types "Jest" → finds it. Adds. M: "Jest 29." Types "29" → Green. depth=working.]
> [S types "React Testing Library" → no results. Clicks "+ Add 'React Testing
>   Library' as named-only". Chip appears.]
> [S types "Zustand" → no results. Clicks "+ Add 'Zustand' as named-only".]
> [S types "Vercel" → no results. Clicks "+ Add 'Vercel' as named-only".]
>
> [Time is up. Sasha hasn't touched scope on any card. Hasn't filled
>   methodology (no chips suggested for Frontend; she didn't notice the
>   free-text field). Hasn't filled lastUsed on anything.]
>
> S: "Great, thanks Mei. We'll be in touch by end of week."
>
> [Total: 7 techs scored + 3 named-only chips + 0 methodology. ~5:40 elapsed.]

## 3. What TechVet would output

### Tech table

| Tech       | Version | Depth    | Scope                 | Predicted verdict                              |
|------------|---------|----------|-----------------------|------------------------------------------------|
| React      | 18.3    | working  | operator (implied)    | **Good** (min:18.0 tier match)                 |
| TypeScript | 5.3     | shallow  | operator (implied)    | **Good** (min:4.9 tier match)                  |
| Next.js    | 12      | working  | operator (implied)    | **Review / Probe** (min:12.0 yellow tier; `enterpriseStillUsed` → "Still widely used in many enterprise applications" note) |
| Tailwind   | 3       | working  | operator (implied)    | **Good** (min:3 tier match)                    |
| Vite       | 5       | working  | operator (implied)    | **Good** (min:4 tier match)                    |
| Storybook  | unknown | working  | operator (implied)    | **Review / Probe** (`unknownVersion=true` → forces yellow; depth-lift suppressed per Fix B; `enterpriseStillUsed` note fires because depth ≥ working — `scoring.ts:238-253`) |
| Jest       | 29      | working  | operator (implied)    | **Good** (min:29.0 tier match)                 |

### Named-only chips (no verdict)

- React Testing Library — depth not set, lastUsed not set
- Zustand — depth not set, lastUsed not set
- Vercel — depth not set, lastUsed not set

### Headline grid

- **3-card grid** (`grid-cols-3`) — Frontend template has no `methodologyChips`
  set (`roles.ts:43-48`), `meta.methodologyEntries` is empty → 5ι 4th-card
  branch at `Summary.tsx:235-238` does NOT fire.
- **Good: 5** (React, TS, Tailwind, Vite, Jest)
- **Review / Probe: 2** (Next.js, Storybook)
- **Concern: 0**

### Coverage chips row

- `3 candidate mentioned, off-catalog` (named-only) — amber chip, "(see section below)"
- No "confirmed not in stack" chip (no `notUsed` toggles fired)
- No "not discussed" chip (every preloaded card was touched)

### Candidate context line

`formatCandidateContext` (per `candidateContext.ts:9-46`) yields:

> **Junior · 2 yr in industry · Career switcher**

Renders below the role line in the report header (`Summary.tsx:189-193`).

### Channel chip

> **Channel: Phone** (per 5ζ capitalization, `channel.ts`)

### What the PDF actually looks like to the HM

A 5-Green / 2-Yellow / 0-Red headline, with a "3 off-catalog" amber chip
below. Radar shows Frontend (5 entries) + Testing (1 entry) — only 2 axes.
Strengths section lists 5 techs. Probe Further lists 2. No methodology
section. No "confirmed not in stack" section. Named-only section shows 3
chips with empty depth/lastUsed editors (NOT compact-async because channel
is phone — `Summary.tsx:702-704`).

## 4. Accuracy judgement

### Where it's right

- **React/TS/Tailwind/Vite/Jest as Green is correct for junior shape.** Mei
  uses each of these daily in a working capacity. The verdicts match
  reality.
- **Next.js 12 as Yellow is exactly right.** The team hasn't upgraded; the
  HM should probe whether Mei can do App Router. The `enterpriseStillUsed`
  note ("Still widely used in many enterprise applications") softens this
  honestly — Next.js 12 is in lots of production codebases.
- **Storybook "I don't remember version" → Yellow is correct.** Fix B
  (suppress depth-lift on unknown-version) means depth=working doesn't push
  this to Green. Sasha's instinct that "she uses it but doesn't know the
  version" should NOT be a Green is preserved.
- **Candidate context line is the single highest-value fix for juniors.**
  "Junior · 2 yr in industry · Career switcher" reframes the entire report.
  Without it, 5G/2Y/0R reads as "weak senior"; with it, it reads as
  "junior with normal junior signal — exactly what we wanted."
- **3-card grid hides cleanly.** No empty methodology card, no "0
  methodology" pollution. The absence is the right call here.

### Where it under-rates Mei

- **`depth=shallow` on TypeScript is honest but the verdict ignores it.**
  Mei said "I copy types from teammates more than I write them." Sasha
  picked `shallow` correctly. The TypeScript Green tier doesn't reflect
  that — the badge reads "Good" identical to a senior who's authored
  generics. Junior shape collapses into senior shape at the verdict layer.
  The depth axis only *moves* tiers when it lifts (Red→Yellow or
  Yellow→Green per Fix A/B suppression and `scoring.ts:25-36`). There is
  no symmetric downward path: shallow + Green tier stays Green. **This is
  the junior failure mode the test was looking for.**
- **No "junior is fine here" framing on any of the Greens.** A senior
  reading the report sees 5 Greens and 2 Yellows and reads "competent
  enough." A more nuanced read — "5 Greens at junior depth, which is the
  ceiling for 2 yr post-bootcamp" — is invisible. The candidate context
  line in the header is the only redress, and it depends on the HM
  remembering to read it before the verdict cards.
- **Next.js 12 `enterpriseStillUsed` note can backfire for a junior.** The
  copy "Still widely used in many enterprise applications" is reassurance
  written for a senior on legacy stack (Hiroshi's Spring Boot 2.5 shape).
  Mei isn't on Next 12 by deliberate enterprise-pinning; her team just
  hasn't upgraded. The note implies "this is fine, lots of shops are
  here" — which under-codes the actual signal ("she hasn't seen App Router
  and that's a junior gap"). The flag fires on the *tier*, not on the
  *candidate context*.
- **Storybook depth=working is a bit generous.** Mei "writes stories" but
  doesn't configure Storybook. The verdict doesn't distinguish "writes
  stories" from "owns the Storybook config", but `shallow` would have
  read as harsh given she uses it daily. The depth ladder is built for
  authorship; "user of a tool teammate configured" has no clean cell.
  Junior-typical, but the tool nudges toward `working` because `shallow`
  feels like under-credit.

### Where it over-rates Mei (mild)

- **Jest 29 = Green is technically correct but loses the texture.** Mei
  writes test files; she doesn't author custom matchers, didn't pick Jest
  over Vitest, didn't set up the config. The same Green a Sr FE writing
  shared test utilities would get. Junior-typical collapse again.

### Where the report stays silent on something a HM would want

- **No "skipped fields = junior didn't have an answer" framing.** Sasha
  didn't fill lastUsed on anything (no time + Mei is on her current stack
  daily so it'd be "current" on all of them). The HM reading the PDF sees
  no recency context. For a 2-yr junior on her first role this is
  obviously "current role" — but the report doesn't say so.

## 5. Friction during the call

- **Scope dropdown on every card is dead weight for a junior screen.** Mei
  is an operator on every tech she touches — operator/author/reviewer/
  architect is a senior axis. The dropdown sits in the middle of every
  TechCard's 3-column grid (`TechCard.tsx:72`) and Sasha had to *not*
  click it 7 times. On a 6-min phone budget every "thing I don't need to
  touch" is a tax. **The presence of the field implies the recruiter
  should fill it.**
- **Depth options "Deep" and "Very deep" feel mis-scaled.** Mei is
  `working` on everything except TypeScript (shallow). "Deep (built
  features end-to-end)" arguably applies to her marketing-pages ownership,
  but Sasha doesn't have time to think about it and defaults to working.
  The depth dropdown's senior-skewed labels ("Very deep (architected /
  led)") subtly anchor the recruiter to undershoot juniors.
- **Methodology section silence.** Sasha sees no chips (Frontend has no
  set), sees the free-text input, and skips it. Zero friction here — but
  also zero capture. If the recruiter had time and the field had a
  Frontend chip-set (a11y, perf budgets, design-system contribution, code
  review, pair programming), she might have ticked 2 chips in 4 seconds
  and gotten real junior-differentiation signal. **This is a missed
  opportunity, not a bug.**
- **Named-only capture worked smoothly.** RTL, Zustand, Vercel all got
  captured via the no-results CTA in <3 s each. Sasha didn't try to
  enrich on the Assessment screen (good — that's a Summary-step concern).
- **Candidate context row felt natural to fill.** Junior + 2 + Career
  switcher took ~6 s total. The Additional context field stayed blank
  (no time).
- **Client mandate textarea stayed blank.** Sasha skipped it. On a 6-min
  call it's unrealistic to paste in JD bullets. The HM gets no anchor.

## 6. Bugs / structural defects

### Defect J1 — Junior depth doesn't lower verdicts

**Severity: High** for junior validity.

`adjustForDepth` (`scoring.ts:25-36`) only lifts tiers downward in
severity. `shallow` and `unknown` depths never push Green→Yellow. So
Mei's "I copy types from teammates" admission with depth=shallow on
TypeScript 5.3 still produces a Green badge identical to a senior who
authored library types. The tool has no symmetric "depth too low to
support this version-tier" path. Round 1's D1 (Tomas/Jordan PDF-identical
problem at the senior end) is the upward case of the same single-axis
collapse; this is the downward case. **Evidence:** `scoring.ts:25-36`
plus per-call observation that 4 of 5 Greens for Mei are tier-driven and
depth-blind.

### Defect J2 — `enterpriseStillUsed` softener fires for "team hasn't upgraded" cases

**Severity: Medium.**

The Next.js 12 Yellow note "Still widely used in many enterprise
applications" reads as exoneration when in fact a junior on a stale
framework has a *gap* (no App Router experience), not a *defensible
legacy choice*. The flag was designed for Hiroshi-shape returners and
Sarah-shape Spring Boot 2.5; it misfires for "small team that hasn't
done the upgrade work." **Evidence:** `scoring.ts:286-289` fires when
`tier.color === 'yellow' && enterpriseFlag && !recencyAdjusted`. No path
considers candidate seniority / path-type when deciding whether the
softener is helpful.

### Defect J3 — Frontend template has no methodology chips, silent miss

**Severity: Medium.**

The Frontend template (`roles.ts:43-48`) carries no `methodologyChips`.
For a senior FE on a video screen this would be a gap (a11y, perf
budgets, design-system contribution, RUM, Core Web Vitals all have
nowhere to live as chips). For a junior on a phone screen it's the
correct UX (no clutter, hides cleanly). But the *same* code path serves
both — there's no per-template, per-seniority gating. The 5ι 4th-card
hides because there are no entries (`Summary.tsx:258`); on a video
senior-FE screen, the free-text input alone is too high-friction. Round
1 Maya raised the senior-FE case; junior FE is fine but the seam is
visible.

### Defect J4 — Scope dropdown on every card is a senior-only axis with no opt-out

**Severity: Medium** for junior-screen UX.

`TechCard.tsx:93-118` always renders the Scope dropdown in the 3-column
grid alongside Depth and Last used. For 100% of Mei's stack the answer
is "operator" — the catalog default for non-AI/ML libs (per Fix K). The
field's presence implies the recruiter should consider it. On a 6-min
call this is cognitive load with no payoff. Possible mitigations: hide
the scope row when seniority=junior; or collapse it under a "more
details" disclosure; or default-render only on templates that have any
`techScopes` set. **None of these have been considered** — round 1-5
didn't have a junior shape to surface the problem.

### Defect J5 — No "candidate is fine for the level being hired" framing

**Severity: Low (but it's the framing the recruiter most wants).**

The headline 5G / 2Y / 0R reads as "this candidate is fine" regardless
of seniority. A HM looking for a junior wants the headline to say "5G
at junior depth — expected" or "verdict appropriate for the level
targeted." The candidate context line in the header is the only
seniority signal and it lives ABOVE the headline cards, so the cards
themselves still read as a senior-or-mid verdict. **Evidence:** the
headline cards (`Summary.tsx:232-271`) carry no level-awareness.

## 6b. Speed-of-use rating (REQUIRED)

### Entry time per tech (junior + Frontend template + Phone)

- React/TS/Tailwind/Vite/Jest (version-mode, just version + depth):
  **~8-12 s** each. Sasha types fast because Mei is crisp.
- Next.js (preloaded; quick "12" then move on): **~6 s**.
- Storybook (search + add + "I don't remember" toggle + depth): **~15 s**.
  Searching takes 3 keystrokes + click; the "I don't remember" toggle is
  one click but the depth field still needs setting.
- RTL/Zustand/Vercel as named-only: **~6 s each = 18 s**. The no-results
  CTA is fast.
- Candidate context row (Junior + 2 + Career switcher): **~6 s**.
- Channel chip / candidate name / role / notes: **~12 s** total.
- Methodology section: **0 s** (skipped — no chips, no free-text).
- Client mandate textarea: **0 s** (skipped — no time on a 6-min call).
- **Total: ~140 s of TechVet entry time + ~200 s of conversational pauses
  = ~5 min 40 s.** Inside the 6-min budget with ~20 s buffer.

### Phone-shrink test — what breaks on a real phone call

1. **Scope dropdown tax.** Sasha "not-clicking" the scope dropdown 7
   times costs maybe 3 s of "do I need this?" hesitation per card. Adds
   ~20 s of cognitive load. **Junior-shape mitigation: don't render
   when seniority=junior.**
2. **`enterpriseStillUsed` note on Next.js 12.** Sasha glances at the
   Yellow badge, reads "Still widely used in many enterprise applications"
   in 1 s, decides "ok she's fine," moves on. The note misleads her into
   under-flagging an actual gap. **Junior-shape mitigation: suppress
   when seniority=junior** (the legacy-enterprise narrative is a senior
   narrative).
3. **Storybook unknown-version flow has 3 clicks.** Add → type → "I don't
   remember" toggle → depth. On a 6-min call this is a lot for one tech.
4. **No "this is fine for junior" headline framing.** Doesn't break the
   call (HM reads later); breaks the *report*.

### Friction that vanishes on phone

- **Methodology free-text.** Sasha doesn't see the input, doesn't think
  about it. For a junior shape this is the right outcome (no useful
  methodology signal at 2 yr post-bootcamp).
- **Scope cap explanations.** Nothing scope-caps for Mei, so no amber
  notes appear. The 3-column TechCard grid feels less crowded because
  the scope-cap rationale never fires.

### Risk / safe rating

**Speed-of-use: SAFE for the phone-time budget (~5:40 vs 6 min target).**

**Report-shape: AT-RISK for junior accuracy.** The verdicts are
defensible but the *framing* skews senior. A HM glancing at the PDF
sees 5G/2Y/0R and reads "she's fine" — which is the right conclusion
but for the *wrong reason* (the Greens reflect tier-match, not skill
depth). The candidate context line saves it from being misleading, but
relies on the HM reading the header before the badges.

## 7. Junior-shape verdict

- **TechVet does NOT actively under-rate juniors at the verdict layer;
  it under-rates them at the *texture* layer.** Mei's 5G/2Y/0R is
  correct as a verdict. But the report reads as a competent
  professional, not as a junior-with-junior-shape signal. The
  `shallow` vs `working` vs `deep` axis is invisible in the headline.
- **The candidate context line (Fix M) is doing 90% of the
  junior-reframing work.** Without "Junior · 2 yr · Career switcher" in
  the header, this report is genuinely indistinguishable from a Mid
  FE's. With it, the HM has a fighting chance. Fix M was shipped for
  Eitan/Riya/Sarah at mid/senior shapes; juniors are arguably its
  highest-value use case. **Validates Fix M; surfaces that it's the
  *only* defense.**
- **Senior-skewed UI elements that feel wrong for junior phone screens:**
  (a) Scope dropdown on every card (`TechCard.tsx:93-118`) — adds
  cognitive tax with zero payoff for an all-operator candidate; (b)
  Depth labels "Deep (built features end-to-end)" / "Very deep
  (architected / led)" — anchor the recruiter to undershoot rather
  than honestly mark `working`; (c) `enterpriseStillUsed` softener
  copy "Still widely used in many enterprise applications" reads as
  reassurance when the actual signal is a junior gap. None of these
  break the screen, but each is a small senior-bias the round-1-to-5
  cast was too senior to catch.
- **The methodology card hiding cleanly (no 4th card) is the right
  default for junior FE — but the same code path mis-serves Senior FE.**
  The 5ι "promote methodology to 4th card" branch is gated on
  `meta.methodologyEntries.length > 0`, not on template + seniority. For
  Junior Mei the absence is correct; for Senior Maya (round 1) the
  absence was a documented gap. The Frontend template needs a
  methodology chip-set (a11y, perf budgets, design-system, RUM,
  Core Web Vitals, code review, pair programming) — but only some
  should be junior-relevant. Adding chips improves senior FE; not
  adding chips keeps junior FE clean. **The seniority filter would
  unify the two.**
- **Junior-with-normal-shape vs weak-senior-at-junior-level is NOT
  distinguishable in TechVet today.** A weak Sr FE with no React
  Server Components experience, no design-system ownership, no
  Storybook config, no perf-budget instinct would produce a similar
  report to Mei's. The candidate context line says "Senior · 8 yr"
  for that candidate vs "Junior · 2 yr" for Mei, but the tier badges
  themselves are identical. The HM has to do the cross-reference
  mentally. **This is the asymmetric expression of the Tomas/Jordan
  D1 problem (round 1) — same root cause: tier badges flatten
  experience to "what version do you know" with depth as a one-way
  lift only.**
- **Speed-of-use on a 6-min phone call is just barely safe.** ~5:40
  inside the 6-min budget. The biggest risk to that margin is the
  scope dropdown (20 s of "not-clicks") and the Storybook
  unknown-version 3-click flow (15 s). Both are senior-features
  imposing junior-tax. A more nervous recruiter or a less crisp
  candidate would push past 6 min.

## 8. Bugs / structural defects (de-duplicated summary)

| #   | Defect                                                                                   | Severity | Evidence                                       |
|-----|------------------------------------------------------------------------------------------|----------|------------------------------------------------|
| J1  | Junior depth doesn't lower verdicts (no symmetric depth-down path)                        | High     | `scoring.ts:25-36`                              |
| J2  | `enterpriseStillUsed` softener misfires for "team hasn't upgraded" juniors                | Medium   | `scoring.ts:286-289`                            |
| J3  | Frontend template has no methodology chips — fine for junior, gap for senior              | Medium   | `roles.ts:43-48`                                |
| J4  | Scope dropdown renders on every card — senior axis taxing junior phone screens            | Medium   | `TechCard.tsx:93-118`                           |
| J5  | Headline cards carry no seniority awareness — 5G/2Y looks like "Mid is fine"              | Low      | `Summary.tsx:232-271`                           |

## 9. Catalog gaps

- **Vercel** — only mentioned as a probe in `react.guidanceForUnknownVersion`
  (`technologies.json:72`). Captured as named-only for Mei. Round-2 Fix I
  carryover already names this — Vercel + Stripe + TanStack Query + Zustand
  are in the deferred set. **Confirmed urgent for any FE-shaped screen.**
- **Zustand** — not in catalog. Captured as named-only. Round-2 Fix I.
- **React Testing Library** — not in catalog. RTL is the canonical companion
  to Jest for any React shop; its absence is a sharper catalog gap than
  Vercel because RTL is one of *two* default React testing tools (the
  other being Vitest + RTL). **New round-6 catalog gap.**
- **No "design-system / component-library" first-class concept.** Mei
  pairs on the checkout flow and owns marketing pages — "do you
  contribute to the design system" is a real probe but nowhere to live.

## 10. One-liner for cross-cut

> **Mei (Junior FE, 2 yr, career-switcher, phone) — Frontend template — 6
> min safely fit; candidate context line is the only thing reframing
> 5G/2Y/0R as "junior shape" vs "weak senior"; scope dropdown + senior
> depth labels + `enterpriseStillUsed` reassurance copy are senior-built
> elements taxing junior screens; Frontend template has no methodology
> chips (correct for junior, gap for senior — needs seniority gating).**

## 11. Recommendations

1. **Suppress the Scope dropdown when `meta.seniority === 'junior'`.**
   Renders as a read-only "operator (default)" chip below the depth
   field. Saves 20 s on phone screens. Implementation: `TechCard.tsx:93-118`
   wrap in `{meta.seniority !== 'junior' && (...)}`. (Or hide unless
   the template carries `techScopes`.)
2. **Add a "junior" suppression on the `enterpriseStillUsed` softener
   note.** Pre-suppress when `meta.seniority === 'junior'`. The
   "still widely used" reassurance is senior-narrative; for juniors it
   under-codes an actual gap. `scoring.ts:286-289`.
3. **Add Frontend template methodology chips: a11y (WCAG), perf budgets
   / Core Web Vitals, design-system contribution, code review, pair
   programming, Storybook config ownership.** Of these, ~2 are
   junior-relevant (code review, pair programming) — the chips
   themselves can carry an implicit seniority hint via labeling. Closes
   round-1 Maya + this session simultaneously.
4. **Add a "level-fit" inline headline below the 3-card grid: "5G / 2Y
   verdicts read as: appropriate for Junior level."** Driven by
   `meta.seniority`. Distinguishes "junior with normal junior signal"
   from "weak senior who happens to score at this level." The single
   biggest junior-shape fix.
5. **Catalog: add Vercel + Zustand + React Testing Library as
   first-class entries.** All three are FE-default tooling missed by
   the catalog; named-only captures them but with no verdict and no
   probe questions.
6. **(Lower priority) Symmetric depth-down path:** when `depth=shallow`
   on a Green tier, drop to Yellow with note "candidate's depth doesn't
   support the version-tier signal — probe before relying on it." Would
   close J1 but risks over-correcting and reading as "the tool penalizes
   honesty." Worth a design pass before shipping.

## Disagreement with prior fixes

**`enterpriseStillUsed` note is good for returners (Margarethe / Sarah)
and bad for juniors (Mei).** Round-5 5α broadened the softener from Red
to all non-Green to help the returner shape. For juniors on stale stacks
("team hasn't upgraded"), the same note misframes a gap as a defensible
legacy choice. The flag needs a context check — softener helpful when
path-type is returner or seniority is mid/senior; harmful when
seniority is junior. **The fix isn't to remove the flag; it's to gate
on `meta.seniority` and `meta.pathType` before showing the note.**

**Candidate context line (Fix M) is doing the junior-reframing work
single-handedly. It should be more prominent.** Currently lives below
the role line in 14-px font (`Summary.tsx:189-193`). For a junior the
report-shape depends on the HM noticing it before reading the verdict
cards. Promote to a more visible chip / banner above the headline
3-card grid for non-mid seniorities.
