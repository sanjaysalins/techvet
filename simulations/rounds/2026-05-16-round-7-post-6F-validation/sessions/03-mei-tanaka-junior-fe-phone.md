# Session 03 — Mei Tanaka redux (Junior Frontend, 2 yr, career-switcher)

**Agent:** sim-agent-r7-03
**Date:** 2026-05-16
**Round:** 2026-05-16-round-7-post-6F-validation
**Channel:** Phone (6 min — recruiter has 3 more screens after this)
**Role template picked:** Frontend Engineer

## 1. Persona inhabited

Same Mei as round 6. 26, two years post-bootcamp (GA, 3-month full-stack),
three years before that as a B2B-SaaS marketing analyst. US e-commerce
startup. Owns marketing-site pages + pairs on checkout flow. Speaks
crisply about React 18 hooks; admits "I copy types from teammates more
than I write them." Vite + Tailwind daily. Next.js 12 — the team keeps
talking about upgrading and hasn't. Storybook for component dev, Jest +
RTL, Vercel deploys. Used Zustand for one feature (notification bell),
otherwise `useState`. No Redux, no SSR/RSC, no GraphQL. Honest about
gaps.

Sasha (external technical recruiter) has 6 min. Three more screens
queued. US e-commerce startup looking for a junior FE — React +
TypeScript + comfort with modern build pipeline. They are NOT looking
for senior signal.

This is the round-6 session re-run on today's code. Round 7 ships **6C
(seniority gate on `enterpriseStillUsed` softener + reassurance note)**
and **6F (Frontend template gains 6 methodology chips)**. Round 6 named
five junior defects J1–J5; only J2 was directly targeted by 6C. The
question for this session: did 6C close J2 end-to-end, do the new
Frontend chips serve or pressure a junior phone screen, and are J1 /
J4 / J5 still load-bearing.

## 2. Phone call — abbreviated

> S: "Hey Mei, thanks for the time. Quick tag-your-stack pass for our
>   tool, won't take long. Junior FE, two years post-bootcamp, right?"
> M: "Yeah, two years, three before that in marketing."
> [S picks Frontend Engineer template. Page preloads React / TypeScript /
>   Next.js / Tailwind / Vite. Six methodology chips appear in the
>   Methodology section: WCAG a11y / Core Web Vitals / design system /
>   RSC SSR / progressive enhancement / visual regression.]
> [S sets seniority=Junior, years=2, path=Career switcher, channel=Phone.]
> [S sees the 6 chip buttons. Half-second pause — "are these for me to
>   fill?" Glances at Mei's CV, none apply at junior level, moves on.
>   Skips chips. Skips Additional context. Skips Client mandate.]
>
> S: "React version?" M: "18, 18.3 I think."
> [S types "18.3" → Green "Good". depth=working.]
>
> S: "TypeScript?" M: "Whatever Vite scaffolds — 5-something. I copy
>   types from teammates more than I write them."
> [S types "5.3" → Green "Good". depth=shallow. Pauses on shallow —
>   feels like under-credit — leaves it.]
>
> S: "Next.js?" M: "12, we keep meaning to upgrade."
> [S types "12" → Yellow "Review / Probe". depth=working.
>   **6C live: no "Still widely used in many enterprise applications"
>   note appears.** Just the bare tier note + the tier's own
>   "App Router era" guidance pointer.]
>
> S: "Tailwind, Vite — current?" M: "Tailwind 3, Vite 5."
> [S types "3" → Green. "5" → Green. depth=working each.]
>
> S: "What else?"
> M: "Storybook, Jest with RTL, Zustand for one feature, Vercel deploys."
> [S types "Storybook" → adds. M: "Don't remember version honestly." S
>   clicks "I don't remember" → Yellow "Review / Probe — version
>   unknown". depth=working. **No enterprise note (Storybook has no
>   root `enterpriseStillUsed` flag).**]
> [S types "Jest" → adds. M: "Jest 29." Types "29" → Green. depth=working.]
> [S types "React Testing Library" → no results → "+ Add as named-only".]
> [S types "Zustand" → no results → "+ Add as named-only".]
> [S types "Vercel" → no results → "+ Add as named-only".]
>
> [Time check ~5:35. Sasha has not touched scope on any card. Did not
>   fill methodology chips. Did not fill lastUsed.]
>
> S: "Great, thanks Mei. We'll be in touch by end of week."
>
> [Total: 7 techs scored + 3 named-only + 0 methodology entries. ~5:35.]

## 3. What TechVet would output

### Tech table

| Tech       | Version | Depth    | Scope                 | Predicted verdict                              |
|------------|---------|----------|-----------------------|------------------------------------------------|
| React      | 18.3    | working  | operator (implied)    | **Good** (min:18.0 tier; **no enterprise note — 6C suppresses on junior**) |
| TypeScript | 5.3     | shallow  | operator (implied)    | **Good** (min:4.9 tier)                        |
| Next.js    | 12      | working  | operator (implied)    | **Review / Probe** (min:12.0 yellow; **no "Still widely used in many enterprise applications" note — 6C gate fires; `seniority === 'junior'` suppresses**) |
| Tailwind   | 3       | working  | operator (implied)    | **Good** (min:3 tier)                          |
| Vite       | 5       | working  | operator (implied)    | **Good** (min:4 tier)                          |
| Storybook  | unknown | working  | operator (implied)    | **Review / Probe — version unknown** (unknownVersion path; no enterprise note — Storybook has no root flag) |
| Jest       | 29      | working  | operator (implied)    | **Good** (min:29.0 tier)                       |

### Named-only chips (no verdict)

- React Testing Library — depth / lastUsed unset
- Zustand — depth / lastUsed unset
- Vercel — depth / lastUsed unset

### Headline grid

- `meta.methodologyEntries.length === 0` (Sasha skipped chips) →
  methCount=0; `namedNotInCatalog.length === 3` → offCount=1. **extras=1**
  → `grid-cols-2 md:grid-cols-4` (`Summary.tsx:239-244`).
- **Good: 5** (React, TS, Tailwind, Vite, Jest)
- **Review / Probe: 2** (Next.js, Storybook)
- **Concern: 0**
- **Off-catalog: 3** (sky 5th card from 6E — 4-card grid total since
  no methodology card fires)

### Coverage chips row

- `3 candidate mentioned, off-catalog` amber chip
- No "confirmed not in stack" chip
- No "not discussed" chip (every preloaded card touched)

### Candidate context line

> **Junior · 2 yr in industry · Career switcher**

Renders below the role line in the report header (`Summary.tsx:189-193`).

### Channel chip

> **Channel: Phone**

### What the PDF actually looks like to the HM

4-card headline (Good 5 / Probe 2 / Concern 0 / Off-catalog 3). Candidate
context line above the cards. Radar = Frontend (5 entries) + Testing (1)
= 2 axes. Strengths section: 5 Green cards (React/TS/Tailwind/Vite/Jest)
**without "Still widely used in many enterprise applications" notes**
where round-6 they would have showed. Probe Further: 2 Yellow cards
(Next.js 12, Storybook) **without softener copy on Next.js** — just the
bare tier label. Named-only section: 3 chips with empty editors. No
methodology section (entries=0 hides the report-side section per
`Summary.tsx:410`).

## 4. Accuracy judgement

### Where 6C lands cleanly (regression closed)

- **Next.js 12 reads as a junior gap, not a defensible-legacy choice.**
  Round 6 saw "Still widely used in many enterprise applications" appended
  to Mei's Yellow Next.js 12 verdict. Round 7 strips that copy. What the
  HM sees is a bare "Review / Probe" with the tier's existing "App Router
  era" pointer. **The HM is now correctly nudged to probe whether Mei
  has touched App Router — which she hasn't.** This is the exact failure
  J2 named in round 6, and 6C closes it end-to-end on Mei's stack.
- **React 18 unknown-version branch unaffected (correctly).** React
  carries `enterpriseStillUsed: true` at root. If Mei had typed nothing
  + depth=working, the unknown-version path would have suppressed the
  enterprise note too. Mei typed "18.3" so this path doesn't fire for
  her — but the gate is symmetric across both paths (`scoring.ts:253`
  and `scoring.ts:291`), which is the right shape.
- **The penalty branch still fires.** A junior with a stale Green (no
  Mei case here, but tested logically): Green + lastUsed=2022 →
  `applyRecency` returns the Yellow "penalized from Excellent — stale"
  branch, which doesn't check seniority. **Juniors still get penalized
  for stale Greens, only the softener side of the asymmetry is gated.**
  This is the correct directionality — soft excuses shouldn't apply to
  juniors; hard probes should. Confirmed via `scoring.ts:136-144`.

### Where 6F lands (new Frontend chips)

- **Six Frontend chips now appear in the Methodology section on
  Assessment.** Sasha sees them as 6 button-rows under the chip header
  "Suggested for Frontend Engineer — click to add."
- **For Mei (junior, phone, 6 min) the chips are a small UX tax, not a
  capture win.** None of the six (a11y / Web Vitals / design system /
  RSC SSR / progressive enhancement / visual regression) are 2-yr-
  post-bootcamp shape. WCAG / Web Vitals are senior-FE differentiators
  Maya-shape (round 1). RSC/SSR is explicitly *absent* from Mei's stack
  by her own admission. Design-system ownership is a 5+ year arc.
  Progressive enhancement is a senior-grade ergonomic call. Visual
  regression is tooling Mei hasn't met.
- **Sasha's hesitation cost ~3 s.** Looking at the chips, deciding none
  apply, moving on. Not a 20-second tax. But the *presence* of 6 chips
  for a junior screen implies the recruiter should be capturing
  methodology — when the honest answer is that a junior has none yet.
- **The chips are doing exactly what they should for Senior Maya
  (round 1).** This session can't measure that — but the round-6 J3
  finding ("Frontend has no chips") was framed against Maya, and 6F
  closes the senior side. **J3 closed for Maya; mildly mis-applies to
  Mei.**

### Where the report stays accurate

- 5G/2Y/0R headline is the right verdict for Mei. Candidate context
  line "Junior · 2 yr · Career switcher" reframes it as junior-normal.
- Off-catalog: 3 (RTL/Zustand/Vercel) is visible at headline glance.
  HM sees there's evidence the catalog can't score, signals to ask
  follow-up.
- Next.js 12 = Yellow reads now as a junior gap to probe (App Router
  unfamiliarity), which is the actual risk.

### Where the report still under-rates Mei's *texture* (round-6 carryovers)

- **J1 still open. `depth=shallow` on TypeScript still produces Green.**
  Mei's "I copy types from teammates more than I write them" is captured
  honestly in the depth field, but `adjustForDepth` only lifts upward
  (`scoring.ts:25-36`). The verdict on TypeScript 5.3 reads identical
  to a senior who's authored library types. Not 6C-related; not 6F-
  related; round-7 ship doesn't touch this.
- **J4 still open. Scope dropdown still renders on every TechCard.**
  7 cards × ~3 s of "do I need this?" = ~20 s of cognitive tax for
  a candidate where the answer is "operator" on every single card.
  Round-6 finding intact.
- **J5 still open. Headline cards carry no seniority awareness.** The
  4-card "5 G / 2 Y / 0 R / Off-catalog 3" reads as "Mid candidate is
  fine" without the candidate-context line. The line lives above the
  cards but in 14-px regular weight; the cards are visually dominant.
  Round-6 finding intact.
- **6F chip-set on Frontend is mild pressure on junior screens.** Not a
  blocker — Sasha skipped in 3 s. But the chip-set has no seniority
  awareness (round-6 J3 prediction): the same six chips render for
  Senior Maya (where they should) and Junior Mei (where they nudge
  toward over-capture). 6F closes the senior gap but inherits the
  same single-axis-per-template flaw that J3 named.

## 5. Friction during the call

- **Scope dropdown ×7 cards.** Same ~20 s tax as round 6. J4 unchanged.
- **Depth dropdown still anchors senior.** "Very deep (architected /
  led)" reads as inapplicable to a 2-yr post-bootcamp; "Deep (built
  features end-to-end)" arguably applies to Mei's marketing-page
  ownership but feels like over-claim. Sasha defaults to working on
  everything, shallow on TS. Senior-skewed labels still anchor recruiter
  to undershoot, like round 6.
- **New: Methodology chip section visible but skipped.** ~3 s glance,
  decision to skip, move on. Junior-shape mitigates pressure (Mei's CV
  obviously has no a11y/Web Vitals/RSC). For a senior Maya redux the
  same chip-set would be ~30 s of useful capture.
- **Next.js 12 reads more honestly to Sasha.** The absence of the
  enterprise softener is *invisible* to her (you can't notice a missing
  note), but the bare "Review / Probe" reads as a real probe target.
  6C's effect is felt in the report-shape, not in Sasha's call-time.
- **Named-only capture still smooth.** RTL/Zustand/Vercel each ~6 s.
- **Candidate context row.** Junior + 2 + Career switcher ~6 s.
- **Client mandate textarea.** Skipped (no time).

### Entry-time recount (junior + Frontend + Phone, round 7)

- React/TS/Tailwind/Vite/Jest: ~50 s total
- Next.js: ~6 s
- Storybook (search + add + don't-remember + depth): ~15 s
- RTL/Zustand/Vercel named-only: ~18 s
- Candidate context row: ~6 s
- Channel / candidate name / role / notes: ~12 s
- Methodology chip section (glance + skip): ~3 s
- Methodology free-text: 0 s (skipped)
- Client mandate: 0 s
- **Total: ~110 s of TechVet entry + ~225 s conversational pauses =
  ~5:35.** Inside the 6-min budget with ~25 s buffer (round 6 was
  ~5:40 → 20 s buffer; round 7 marginally faster because the Next.js
  card has one less line of softener copy to scan + the chip skip is
  fast).

## 6. Bugs / structural defects (round-7 view)

### Closed since round 6

- **J2 (Medium → CLOSED).** `enterpriseStillUsed` softener now correctly
  suppressed for `seniority === 'junior'` on both the unknown-version
  branch (`scoring.ts:253`) and the version-mode tier-match branch
  (`scoring.ts:291`). Mei's Next.js 12 reads as a junior gap rather
  than a defensible-legacy choice. Recency softener path inside
  `applyRecency` also gated (`scoring.ts:154`). Penalty branch still
  fires (correct — juniors shouldn't get soft excuses but should still
  be penalized for stale Greens). **End-to-end fix.**
- **J3 (Medium → PARTIALLY CLOSED).** Frontend template gains six
  methodology chips per 6F (`roles.ts:52-59`). Closes the *senior* side
  of J3 (Maya-shape capture). On the *junior* side (Mei-shape), the
  same chips are mild pressure — the chips themselves carry no
  seniority hint. Net: the senior-FE gap closes; junior FE gets a small
  cognitive tax that didn't exist in round 6 (when the section was
  invisible). Mei's report-side methodology section still hides
  cleanly (entries=0).

### Still open after round 7

- **J1 (High).** `adjustForDepth` only LIFTS tiers (`scoring.ts:25-36`).
  No symmetric downward path. Mei's TypeScript 5.3 + depth=shallow →
  Green identical to a senior author. Round 7 doesn't touch this.
  **Highest-value remaining junior fix.**
- **J4 (Medium).** Scope dropdown renders on every TechCard
  (`TechCard.tsx:93-118`). For a junior who is `operator` on every
  card, this is ~20 s of cognitive tax per session. No seniority gate;
  no per-template-techScopes-presence gate. Round 7 doesn't touch this.
- **J5 (Low-but-load-bearing).** Headline cards
  (`Summary.tsx:232-271`) carry no seniority signal. "5 Good / 2 Yellow /
  0 Concern / Off-catalog 3" reads as "Mid is fine" regardless of who's
  being screened. Candidate context line is the sole defense; lives in
  14-px regular weight above the cards.
- **New seam from 6F.** The Frontend methodology chip-set has no
  seniority awareness — same six chips render for Maya (senior) and
  Mei (junior). Junior screens see chips they have no business
  ticking. Not a blocker, but the *seniority-blind template UI*
  pattern that round 6 named via J3 is also still present in 6F's
  fix. The right shape would be `methodologyChipsBySeniority` or a
  small seniority-filter when chips render.

## 7. Junior-defect ledger

| #  | Defect                                                                                          | Round 6 | Round 7   | Evidence                                                                                                                                      |
|----|-------------------------------------------------------------------------------------------------|---------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| J1 | Junior depth doesn't lower verdicts (no symmetric depth-down path)                              | Open    | Still open | `scoring.ts:25-36` — `adjustForDepth` returns `{adjusted:false}` when `depth !== 'deep' && depth !== 'very-deep'`. Shallow / working never demote. |
| J2 | `enterpriseStillUsed` softener / reassurance note misfires for "team hasn't upgraded" juniors    | Open    | Closed     | `scoring.ts:154` (recency softener), `scoring.ts:253` (unknown-version note), `scoring.ts:291` (tier-match note) — all three gate on `seniority !== 'junior'`. |
| J3 | Frontend template has no methodology chips — fine for junior, gap for senior                    | Open    | Partially closed | `roles.ts:52-59` — 6 Frontend chips shipped (closes senior-Maya). For junior Mei the chips are mild pressure (no seniority filter on chip rendering). |
| J4 | Scope dropdown renders on every card — senior axis taxing junior phone screens                  | Open    | Still open | `TechCard.tsx:93-118` — unconditional render. No `meta.seniority === 'junior'` gate; no `template.techScopes` presence gate.                  |
| J5 | Headline cards carry no seniority awareness — 5G/2Y/0R reads as "Mid is fine"                   | Open    | Still open | `Summary.tsx:232-271` — `StatCard` is seniority-blind. Candidate context line at `Summary.tsx:189-193` is the only redress, lives above (smaller font) the dominant cards. |

**Net round-7 score: 1 closed, 1 partially closed, 3 still open.**

## 7b. Junior-serving verdict

TechVet now serves juniors *more honestly* than it did 24 hours ago, but
the verdict is still **At-risk for junior accuracy**. 6C surgically
closes the single sharpest junior misframing — Mei's Next.js 12 no
longer reads as a defensible enterprise choice — and that's a real win
because the failure cut against the recruiter's exact intent (probe
the App Router gap). But J1, J4, J5 remain the load-bearing junior
defects: J1 collapses Mei's `shallow` TypeScript into senior-shape
Green, J4 costs 20 s of phone budget on a 6-min call where seconds
matter, and J5 leaves the headline reading as "Mid is fine" until the
HM reads the candidate-context line. **6C was the single most valuable
of the three from a *misleading-the-HM* angle, so the right next ship
is J1 (symmetric depth-down) followed by J5 (level-fit headline
framing); J4 is a UX-tax fix worth pairing with the next TechCard pass
but not load-bearing on its own.** The 6F Frontend chip-set is a
genuine senior-FE win that costs juniors ~3 s of skip-time — net
positive, with a future opportunity to add `seniorityHint` to chips
so junior screens auto-hide the senior-only ones.

## 8. Speed-of-use rating (REQUIRED)

**Speed-of-use: SAFE for the phone-time budget (~5:35 vs 6 min target,
~25 s buffer).** Round-7 is marginally faster than round 6 (~5:40,
20 s buffer) because the Next.js card no longer renders the softener
copy (less to scan) and the new Methodology chip-section is a clean
~3 s skip for an obviously-not-applicable chip-set. The buffer
remains thin — a less crisp candidate or a less confident recruiter
would push past 6 min, with the J4 scope-dropdown tax being the single
biggest threat to that margin.

**Report-shape: AT-RISK for junior accuracy.** 6C makes a small but
real improvement (Mei's Next.js 12 reads honestly now). J1 / J4 / J5
remain the load-bearing junior defects. The candidate context line
still does 80% of the junior-reframing work single-handedly, and the
HM still has to read it before glancing at the dominant headline cards.

## 9. Catalog gaps (carried over from round 6)

- **Vercel** — still named-only. Round-2 Fix I carryover. Confirmed
  urgent for any FE-shaped screen.
- **Zustand** — still named-only. Round-2 Fix I.
- **React Testing Library** — still named-only. RTL is the canonical
  companion to Jest for any React shop; sharper FE catalog gap than
  Vercel because it's one of two default React testing tools.
- **No "design-system / component-library" first-class concept.** Mei
  pairs on checkout flow + owns marketing pages — "do you contribute
  to the design system" is a real probe with nowhere to live. The 6F
  `design-system-ownership` chip surfaces the *practice* but not the
  *artifact* (Chakra / Mantine / Radix / shadcn / Headless UI / etc.
  are uncatalogued).

## 10. One-liner for cross-cut

> **Mei (Junior FE, redux, phone) — 6C cleanly closes J2 (Next.js 12
> softener gone for juniors); 6F Frontend chips render but Mei skips
> them in 3 s (mild pressure, not blocker); J1/J4/J5 still load-bearing
> — TypeScript depth=shallow still reads Green identical to senior,
> scope dropdown still costs 20 s on 6-min call, headline cards still
> read "Mid is fine"; speed-of-use SAFE (~5:35); report-shape AT-RISK
> for junior accuracy until J1 (symmetric depth-down) lands.**

## 11. Recommendations

1. **Ship J1: symmetric depth-down on version-mode Greens.** When
   `depth === 'shallow'` on a tier-matched Green, drop to Yellow with
   note "Candidate's depth doesn't support the version-tier signal —
   probe before relying on it." Mirror the existing depth-lift logic.
   Risk: feels like the tool penalizes honesty. Mitigation: only fire
   when seniority hint is junior/mid AND tier is Green (so seniors
   who self-mark shallow on something they don't lead aren't punished
   for honesty); add a `note` not a label suffix so it reads as
   probe-guidance not gradeschool. Closes the J1 single-axis collapse.
   **Highest-value remaining junior ship.**
2. **Ship J5: level-fit headline inline copy.** Below the 4-card grid,
   render an italic line: "5G / 2Y / 0R verdicts read as: *appropriate
   for Junior level*." Driven by `meta.seniority`. Distinguishes
   junior-with-normal-junior-signal from weak-senior-at-junior-level.
   The single biggest junior-shape fix per round-6 J5 commentary.
   ~30 lines of code.
3. **Ship J4: gate Scope dropdown on `seniority !== 'junior'` (or
   template-has-techScopes).** Saves ~20 s per junior screen. For
   non-junior screens the dropdown stays as-is. Two-line conditional
   wrap in `TechCard.tsx:93-118`.
4. **6F follow-on: add `seniorityHint` to MethodologyChip.** Mark
   each chip with `junior | mid | senior` (or a min-seniority).
   Filter the chip render to only chips at-or-below the selected
   seniority. Mei's Frontend would render 0 chips (correct); Maya's
   Frontend would render all 6. Closes the seniority-blind-template-
   UI pattern J3 named, on the new 6F surface area before it
   compounds across more templates.
5. **Catalog: add Vercel + Zustand + React Testing Library as
   first-class entries.** Round-2 Fix I carryover; round-6 named.

## 12. Disagreement with prior fixes

- **6C is exactly right; the symmetric extension is sharper than the
  initial design.** Round-6 finding suggested gating on
  `seniority === 'junior'`; 6C as shipped gates on `seniority !== 'junior'`,
  which is the same shape but lets `undefined` (recruiter didn't set
  seniority) fall through to the old behavior. For a recruiter who
  skips the seniority field, the softener still fires — which is the
  correct default (we can't penalize for an empty field). The
  asymmetry (penalty branch un-gated, softener branch gated) is the
  right call: juniors shouldn't get soft excuses but should still face
  hard probes. Confirmed `scoring.ts:136-144` un-gated penalty,
  `scoring.ts:154` + `253` + `291` gated softener/note.
- **6F closes Maya's J3 and inherits the seniority-blind template UI
  pattern.** The fix is a real senior-FE win. The recommended follow-on
  is `seniorityHint` on chips, not "don't render chips for juniors" —
  some chips (code review / pair programming, if added) are junior-
  relevant. The pattern fix is per-chip filtering, not per-template
  gating.
- **The candidate-context line (Fix M) is still doing 80% of the
  junior-reframing work.** Round 6 named this; round 7 hasn't promoted
  it. Until J5 lands, the line is the only defense against "5G/2Y/0R
  reads as Mid is fine." A future ship should chip-ify the candidate
  context (or banner it more visibly) above the headline cards.
