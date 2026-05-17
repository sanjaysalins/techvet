# Session 01 — Mei Tanaka redux (Junior Frontend, phone)

Round 9, 2026-05-17. Primary lens: does round-8 batch 8A's UI fix for
7D's `lowered` direction land end-to-end on Mei's TS 5.3 + shallow case,
closing the card-vs-panel divergence that round 8 surfaced as the
load-bearing defect.

## 1. Persona inhabited

**Mei Tanaka, 26.** Identical to rounds 6, 7, 8. Two years at a mid-size
Brooklyn e-commerce startup (~80 eng). GA bootcamp 2023; prior career
marketing analytics at a CPG brand. Honest about depth; tells Sasha
unprompted "I write types but I don't really get generics — I copy what
the lead wrote." React 18 hooks every day, Next.js Pages-Router only,
Tailwind 3, Vite 5, Jest+RTL, Storybook, Vercel deploys. No Redux. No
RSC depth.

**Sasha Okonkwo, 32.** NYC FE-agency senior recruiter. Same fintech
mid-Engineer FE role (Next.js 14 + App Router + RSC). Five 30-min phone
screens today; Mei is the third. Her real screening budget is 6 minutes
of structured data entry plus ~1:30 wrap. Four weeks of TechVet muscle
memory. Still does NOT habitually read the candidate-context line above
the headline cards on Summary — round-7 J5 observation, unfixed in round 8
and still load-bearing.

Round 9 is the first time Sasha runs Mei post-8A — every byte of the
input is identical to rounds 6, 7, 8. The only thing that should differ
is what she sees on the **Assessment screen during data entry** at the
TS 5.3 + shallow moment.

## 2. Phone call — abbreviated

> S: "Hey Mei, thanks for the time. Quick five-minute stack pass, then
> I'll wrap with role context."
> M: "Sounds great."

Sasha is on `/#/assess` with the Frontend template preloaded
(`src/data/roles.ts:44-63`). Five tech cards under Frontend category:
React, TypeScript, Next.js, Tailwind, Vite (`Assessment.tsx:52-62`).
She clicks the **Junior** seniority pill (`Assessment.tsx:170-187`).
Phone channel pill is already selected. Types "Mei Tanaka" into
candidate-name. Selects **Career switcher** in the path dropdown.

**~0:30 — React.**

> S: "What version of React are you on day-to-day?"
> M: "Eighteen — 18.3 in prod."
> S: "And depth — shallow, working, deep, very-deep?"
> M: "Working. I write hooks daily but I'm not the one architecting
> the component model."

Sasha clicks React, types `18.3`, selects **Working knowledge**, leaves
scope blank, leaves last-used blank.

Card badge: **Good** (Green). React 18 hits the 18.0 tier. `working`
depth triggers neither lift nor lower at `scoring.ts:34-52` (lift requires
`deep`/`very-deep`; lowering requires `shallow + junior`). Side panel
agrees — Vite's panel just got displaced because focus moved to React.
(~12 s.)

**~0:50 — TypeScript. The 8A moment, finally.**

> S: "TypeScript?"
> M: "5.3. I, um — I write types but I don't really get generics. I
> copy what the lead wrote."
> S: "So depth is shallow, not working?"
> M: "Yeah, shallow's fair."

Sasha clicks the TypeScript card, types `5.3`, selects **Shallow (used
briefly)** from depth.

**Here is what round 9 validates.** The path through `scoring.ts`:

1. `resolveTier` is called from `TechCard.tsx:24` — and crucially,
   **this call now passes `{ seniority: meta.seniority }`**, which
   `meta.seniority === 'junior'` because Sasha clicked the pill 90 s ago.
   Round-8 finding #2 named exactly this hole: pre-8A, `TechCard.tsx:20`
   destructured only `updateItem, removeTech` from the store and called
   `resolveTier(tech, item)` with no opts arg. Post-8A, line 19 destructures
   `meta` and line 24 passes seniority. Verified.
2. `findTier(tech, "5.3")` → 4.9 "Good" Green tier (`scoring.ts:415-422`,
   `technologies.json` TypeScript entry).
3. `adjustForDepth('green', 'shallow', 'junior')` hits the lowering branch
   at `scoring.ts:45-50`: severity 0 → severity 1, returns
   `{ color: 'yellow', adjusted: true, direction: 'lowered' }`.
4. `applyScope` — no scope set, falls through `scoring.ts:71-78` with
   `depthDirection: 'lowered'` preserved.
5. `applyRecency` — `lastUsed` is blank, parses non-stale, pass-through.
6. `composeLabel` at `scoring.ts:407-409` sees `depthDirection === 'lowered'`
   and returns `"Review / Probe (lowered from Good by shallow depth)"`.

**Card badge updates to amber** with the full label `"Review / Probe
(lowered from Good by shallow depth)"`. Below the version/depth grid,
the new italic strip at `TechCard.tsx:174-178` renders in amber-700:

> Tier lowered by one step — shallow depth on a junior candidate reads
> as a probe target, not strong signal.

Sasha's eye catches the color shift. She has TS as auto-focused (last
clicked), so the GuidancePanel right side renders for TypeScript. The
panel headline (`GuidancePanel.tsx:29-30`) shows the same label string
in `text-amber-800` 2xl-bold. Below the catalog note, the new amber
italic at `GuidancePanel.tsx:59-63` renders:

> Tier lowered by one step — shallow depth on a junior is a probe
> target, not strong signal.

**Card badge and side panel agree.** The round-8 finding #2 + #3 defect
is closed.

> S (internal): "Huh, OK — so the tool's telling me this is a probe
> target, not a fail. I don't need to grill her on generics for 90 s;
> the HM will see why and ask in the deep dive."

Sasha leaves the TS card at Yellow and moves on. Time-cost at this card:
~20 s — same as round 8 because the UX surface is honest *as it happens*,
not 4 min later on the Summary. (Round 8's silent-Green path cost her
nothing live but cost the HM trust on the report. Now both surfaces
match.)

**~1:35 — Next.js.**

> S: "Next.js?"
> M: "12. Team's been meaning to upgrade but App Router migration is two
> sprints and we keep deprioritizing."
> S: "App Router familiarity?"
> M: "Read about it, haven't shipped any."

Types `12.0`, depth **Working**, no scope, no last-used. Hits the 12.0
Yellow tier. No depth adjustment (`working` is neutral). 6C junior gate
fires at `scoring.ts:349-352`: `tier.color === 'yellow'` AND
`enterpriseStillUsed` is true on this tier, BUT `seniority === 'junior'`
suppresses the enterprise reassurance note. So the verdict is plain
**Review / Probe** — no parenthetical, no enterprise softener, no
recency note.

Sasha types "App Router gap" in Notes. (~30 s.)

**The two-Yellows-side-by-side observation, fresh this round:** at this
moment both the TS card and the Next.js card on screen are amber pills.
TS reads `"Review / Probe (lowered from Good by shallow depth)"` —
~12-px parenthetical italics next to the badge. Next.js reads plain
`"Review / Probe"`. **On glance the badges look identical** (same amber,
same string up through "Review / Probe"); the parenthetical is the only
disambiguator and it's secondary-text size. Sasha's eye registers "two
Yellows in the Frontend section." She does NOT register "two structurally
distinct Yellows." Round 8 named this as a medium-severity cosmetic
compression (round-8 finding #4). Round 9 confirms it's still present
and now slightly more painful because the lowered-direction label is
the round's headline new copy and gets visually flattened into the
generic Yellow bucket.

**~2:10 — Tailwind.** Tailwind 3, working — Green. (~10 s.)

**~2:25 — Vite.** Vite 5, working — Green. (~10 s.)

**~2:40 — Off-catalog probes.**

> S: "Anything else worth flagging? Storybook? Jest? Testing setup?"
> M: "Jest and RTL. Storybook for the design system. Deploy to Vercel."

Sasha adds Jest (29, working — Green), Storybook (7, working — Green).
Types "Vercel" into the named-only input. (~50 s for the three.)

**~3:35 — Wrap.** "Just Zustand for state, no Redux." Sasha adds Zustand
named-only. (~15 s.)

> S: "Last one — TypeScript generics. Any mapped or conditional types
> you've actually written?"
> M: "Mostly consumer. I read `Pick<>` and `Omit<>` and reuse them.
> I haven't written conditional types myself."

Sasha leaves TS shallow — Mei confirmed the shape. (~20 s.) Clicks
**Review Summary**. Total: ~4:00 of structured entry + ~1:30 wrap =
**5:30. Inside the 6-minute budget.**

A note on what J4 cost Sasha this round: at each of the 5 preloaded
cards she scrolled past the Scope-of-use dropdown without engaging.
At ~3 s per card to register-and-skip × 5 cards = ~15 s of dead time
on a junior screen where scope is structurally irrelevant. Not 20 s
as round 8 estimated but the same shape — and round 9 didn't ship a
fix for it. Confirmed J4 still load-bearing.

## 3. Post-call: Summary page read

`/summary`. Headline-card row (`Summary.tsx:241-306`):

| Card        | Count | Color   |
|-------------|-------|---------|
| Good        | 5     | emerald |
| Review/Probe| 2     | amber   |
| Concern     | 0     | rose    |
| Off-catalog | 2     | sky     |

No Methodology card (Sasha skipped chips again — same as round 8). No
Scope-capped card. Five-card row.

**5G/2Y/0R holds from round 8** — round 9 didn't change the scoring
math, only the rendering of the existing math. The number that mattered
in round 7→8 (TS flipping from false-Green to lowered-Yellow) stays
flipped.

**Tier labels in the Yellow section:**

- **TypeScript — Review / Probe (lowered from Good by shallow depth)**.
  Catalog note for the 4.9+ tier ("Good"). The new lowered-direction
  parenthetical reads in 12-px italic next to the amber badge. Honest,
  upgrade-path-implicit framing.

- **Next.js — Review / Probe**. Plain Yellow; catalog note for the 12.0
  tier. No enterprise softener (6C junior gate). Round-6 6C win still
  holding.

**Radar:** Frontend-only — collapsed single-axis chart. Known limitation
of pure-FE phone screens, not a round-9 target.

## 4. Findings

1. **8A lands end-to-end. `TechCard.tsx:19` destructures `meta` from the
   store; `TechCard.tsx:24` passes `{ seniority: meta.seniority }` to
   `resolveTier`. Card badge for TS 5.3 + shallow + junior now reads
   `"Review / Probe (lowered from Good by shallow depth)"` in amber,
   matching the side-panel verdict.** Validates round-8 finding #2.
   **Severity: WORKING AS SHIPPED.**

2. **The new card italic strip at `TechCard.tsx:174-178` renders
   "Tier lowered by one step — shallow depth on a junior candidate reads
   as a probe target, not strong signal." in amber-700 italic.** Sits
   below the version/depth grid, replacing the old "Depth raised this
   one tier — credit given" wording that would have been factually wrong
   for the lowered case. Validates round-8 finding #3 for the card.
   **Severity: WORKING AS SHIPPED.**

3. **`GuidancePanel.tsx:59-63` renders the matching amber italic
   "Tier lowered by one step — shallow depth on a junior is a probe
   target, not strong signal."** Two text variants — card says "candidate
   reads as," panel says "is" — both honest, neither punitive. Round-8
   finding #3 closed on the panel side too. **Severity: WORKING AS SHIPPED.**

4. **The lifted path still renders correctly for non-junior deep cases.**
   The gate at `TechCard.tsx:165` (`depthDirection !== 'lowered'`) and
   `GuidancePanel.tsx:51` (same gate) preserves the original "Depth raised
   this one tier — credit given for hands-on experience" / "Tier improved
   by one step" copy for the senior+deep path. Mutually-exclusive
   conditionals — no chance of both notes rendering on the same card.
   **Severity: WORKING AS SHIPPED.** (Validates by code-reading, not by
   Mei's session — her junior+shallow shape only exercises the lowered
   branch; the senior+deep branch is validated by Anil's session 02
   downstream.)

5. **`bundle-size-budgets` chip ships in the Frontend Methodology section
   (`roles.ts:61`).** Confirmed by reading the roles file: the
   `progressive-enhancement` chip from rounds 1-7 is gone; the new
   `bundle-size-budgets` ("Bundle-size budgets + code-splitting discipline")
   sits in slot 5. Sasha didn't click any chip during Mei's session (junior
   screens don't engage Methodology), so this is verified by code-read,
   not session interaction. Maya's session 04 is the real validation
   surface for 8E. **Severity: WORKING AS SHIPPED (code-verified).**

6. **NEW round-9 finding: "lowered" copy reads as a probe-target marker,
   not a punishment, but the phrase "reads as a probe target, not strong
   signal" on the card is borderline-jargon for non-technical recruiters.**
   The panel variant ("is a probe target") is tighter. A recruiter who's
   used TechVet for 4 weeks reads both versions cleanly. A recruiter using
   TechVet for week 1 might read "probe target" as a euphemism for "weak"
   and treat the candidate worse than the score warrants. **Severity: LOW
   (copy-tuning, not bug).** Consider a single-pass on the wording in a
   later round — e.g. "Lowered tier — depth is shallow; ask follow-ups
   before forming a strong view." But the current wording is *honest*
   and *informative*, which were the round-8 promises; readability is the
   incremental improvement.

7. **NEW round-9 finding: the two-Yellows-side-by-side compression
   problem (round-8 finding #4) is unchanged and now slightly more
   visible because round-9's headline UX change is the lowered
   parenthetical.** TS lowered-Yellow and Next.js stack-version-Yellow
   render identical-color amber pills with the same "Review / Probe"
   prefix. The parenthetical disambiguates on read but not on glance.
   Mei's 5G/2Y/0R is mild enough that this doesn't bite Sasha. A denser
   shape (15+ techs, 3 categories) would mash distinct stories. The
   headline card "Review/Probe: 2" doesn't sub-bucket lowered-by-depth
   from stack-version-Yellow from coverage-Yellow from softener-Yellow.
   **Severity: MEDIUM (cosmetic compression, not bug).** A potential
   round-10 cut would be to add a small icon or accent-stripe on the
   lowered-direction label to make it pre-attentively distinct from the
   tier-match Yellows. Not a round-9 blocker.

8. **NEW round-9 finding: J4 (scope dropdown wastes ~15-20 s on junior
   screens — should be hidden for `seniority === 'junior'`) is STILL
   the most-visible junior gap.** `TechCard.tsx:97-125` renders the
   Scope-of-use dropdown unconditionally on every card. Junior candidates
   don't need scope context — they're operating tools as they're handed
   to them, not authoring/reviewing/architecting them. On Mei's 5-card
   Frontend template that's ~15 s of dead-time scrolling. Round 7 named
   it; round 8 didn't ship a fix; round 9 still doesn't. Suggested fix:
   conditional render of the scope dropdown on `meta.seniority !==
   'junior'`, OR a single "Junior — scope hidden" hint pill. **Severity:
   MEDIUM (UX cost on the primary use case, not blocker).** Recommend
   round-10 fix.

9. **NEW round-9 finding: J5 (headline cards on Summary are seniority-
   blind) is STILL the most-visible Summary gap.** `Summary.tsx:241-306`
   renders Good/Review/Concern/Off-catalog/Scope-capped counts without
   any per-seniority shading or annotation. Sasha (and the HM reading
   the report later) sees "5 Good / 2 Yellow / 0 Red" without the headline
   noting "Junior — these scores are pre-experience-weighted." Round 7,
   8 named this; round 9 hasn't shipped a fix. Mei's TS lowered-Yellow
   is the rendering layer of seniority-awareness on a *card*; the
   headline row doesn't reflect that the same way. **Severity: MEDIUM
   (HM mis-reads the headline-counts as seniority-neutral when scoring
   has been seniority-adjusted under them).** Recommend round-10 fix —
   probably a small "Junior" / "Senior" pill in the headline-row corner.

10. **NEW round-9 finding: no second-order regressions from 8A
    detected.** The four code paths potentially affected by passing
    seniority through `resolveTier`:
    - Version-mode tier match: works (Mei's TS path validates).
    - Version-mode unknown-version: scoping/scope-cap unchanged
      (`scoring.ts:267-314`); seniority only gates the enterprise note.
    - Checklist mode: 6D's coverage-lift gate at `scoring.ts:496-500`
      uses seniority correctly; junior shape is blocked from coverage-
      lifts (which is what we want).
    - Recency: 6C's seniority gate at `scoring.ts:196` was already
      receiving seniority pre-8A through the Assessment-screen
      panel call; the card path now matches. No regression.
    **Severity: NONE (verified by code-read; no observed bug).**

## 5. Round-9 verdict — Safe

8A's ship is real and end-to-end. The card and side panel agree on
TS 5.3 + shallow + junior. The lowered copy reads informative, not
punitive. The lifted path is preserved for the senior+deep case by the
mutually-exclusive direction gates. `bundle-size-budgets` is in
roles.ts (8E). No regressions detected in Mei's path.

The two yellow-bucket compression (TS lowered + Next.js stack-version)
remains a medium-severity rendering issue but it's not new — round 8
named it and round 9 wasn't scoped to fix it. The "reads as a probe
target" copy is borderline-jargon but it's the *honest* framing the
round was trying to ship; tuning is a future round's job.

J4 (scope dropdown junior-irrelevant) and J5 (seniority-blind headline
cards) are the two most-visible junior gaps and should be the next
round's priority. Neither is a regression from 8A; both predate it.

**Status: Safe to consider 8A shipped. Mei's path is honest end-to-end
for the first time since 7D.**
