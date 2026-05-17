# Session 05 — Mei Tanaka redux (Junior Frontend, phone) — round-16 closure: J4 + J5

Round 12 (structural-validation tree), 2026-05-17. Primary lens: does the
round-16 batch — **J4** (hide Scope dropdown on junior, card grid 3-col → 2-col)
and **J5** (seniority-aware framing sentence under Summary headline cards) —
land end-to-end on Mei's identical-since-round-6 inputs? Secondary lens: do
the round-13/14 K8s + Postgres + Storybook hybrid changes leak into her flow
(they shouldn't; she touches none of those cards).

## 1. Persona inhabited

**Mei Tanaka, 26.** Identical to rounds 6, 7, 8, 9. Two years at a mid-size
Brooklyn e-commerce startup (~80 eng). GA bootcamp 2023; prior career
marketing analytics at a CPG brand. Honest about depth; tells Sasha unprompted
"I write types but I don't really get generics — I copy what the lead wrote."
React 18 hooks every day, Next.js Pages-Router only, Tailwind 3, Vite 5,
Jest+RTL, Storybook, Vercel deploys. No Redux. No RSC depth.

**Sasha Okonkwo, 32.** NYC FE-agency senior recruiter. Same fintech mid-Engineer
FE role (Next.js 14 + App Router + RSC). Five 30-min phone screens today;
Mei is the third. Real screening budget: 6 min of structured entry plus ~1:30
wrap. Now five+ weeks of TechVet muscle memory. Still does NOT habitually read
the candidate-context line above the headline cards on Summary — that observation
is round-7 J5, then round-9, then round-11, and J5-the-batch-name (round-16)
is the second pass at fixing it from a different angle. We'll see whether the
*new* framing line below the headline is read.

Round 12 is the first time Sasha runs Mei post-J4/J5. Every byte of the input
is identical to rounds 6–9. What should differ is (a) the *shape* of each tech
card during entry, and (b) one italic sentence under the headline counts on Summary.

## 2. Phone call — abbreviated (narrating the J4 time-save)

> S: "Hey Mei, thanks for the time. Quick five-minute stack pass, then I'll
> wrap with role context."
> M: "Sounds great."

Sasha is on `/#/assess`, Frontend template preloaded (`src/data/roles.ts:44-63`).
Five tech cards under Frontend category: React, TypeScript, Next.js, Tailwind,
Vite. She clicks the **Junior** seniority pill (`Assessment.tsx:170-187`).
Phone channel already selected. Types "Mei Tanaka" → candidate-name. Selects
**Career switcher** in the path dropdown.

**The first visible J4 moment lands before Sasha asks a single tech question.**
Clicking the Junior pill mutates `meta.seniority` to `'junior'`, and every
`TechCard` re-renders. The 3-col grid (Depth / Scope / Last used) at
`TechCard.tsx:93` collapses to 2-col (`md:grid-cols-2`), and the entire Scope
`<div>` at lines 114–144 unmounts. Notes row's col-span adapts at line 162
(`md:col-span-2` when junior, `md:col-span-3` otherwise). The visual effect:
each card gets ~25% shorter in vertical run, and the eye's left-to-right
scan path is **Depth → Last used** instead of **Depth → Scope → Last used**.
A tighter card. Sasha doesn't notice consciously, but she also doesn't
hover-pause on the now-absent Scope dropdown the way she did in rounds 6–9
when she'd glance at it, register "blank — fine for junior", and skim past.

**~0:30 — React.**

> S: "What version of React are you on day-to-day?"
> M: "Eighteen — 18.3 in prod."
> S: "And depth — shallow, working, deep, very-deep?"
> M: "Working. I write hooks daily but I'm not the one architecting
> the component model."

Sasha clicks React, types `18.3`, selects **Working knowledge**, leaves
last-used blank.

Pre-J4 (rounds 6–9): three fields visible, eye skips Scope, types last-used
blank, clicks next card. ~12 s.

Post-J4: two fields visible. Tab path: version-input → depth-select →
last-used-input → next-card. Tab key lands in the right slot one fewer time.
~9 s.

Card badge: **Good** (Green). 18.3 hits the 18.0 tier; `working` depth triggers
neither lift nor lower. (`scoring.ts:34-52`.)

**~0:42 — TypeScript.** The case that has been load-bearing across rounds 6–9.

> S: "TypeScript?"
> M: "5.3. I, um — I write types but I don't really get generics. I
> copy what the lead wrote."
> S: "So depth is shallow, not working?"
> M: "Yeah, shallow's fair."

Sasha clicks the TypeScript card, types `5.3`, selects **Shallow (used briefly)**
from depth.

Verdict: **Caution** (Yellow) on the card. `resolveTier` is called from
`TechCard.tsx:24` with `{ seniority: 'junior' }`. 5.3 hits the 5.0 tier
(Green base), then `scoring.ts` lowers by one for the junior+shallow rule
shipped in round-7 7D and fixed at the card layer in round-8 8A. The amber
*"Tier lowered by one step — shallow depth on a junior candidate reads as a
probe target, not strong signal."* note renders at `TechCard.tsx:210-214`. No
regression from J4 — that branch is unaffected by the grid change. (~10 s; was
~13 s pre-J4. The Scope drop-down was the field Sasha actually *did* hover-pause
on for TS — she'd think "is shallow + author a thing?" then move on. With no
Scope present, the pause doesn't happen.)

**~0:52 — Next.js.**

> M: "Next 12. Pages router. Haven't touched App router."

Types `12`, depth **Working knowledge**, last-used blank. Card hits Yellow
on the 12.x tier (per catalog), enterprise-still-used note injects.
(~8 s; was ~11 s pre-J4. Bigger saving here because rounds 6–9 had Sasha
nudge the Scope dropdown by reflex even when she'd decided to leave it.)

**~1:00 — Tailwind 3.** Types `3.4`, depth **Working knowledge**. Green.
(~6 s; was ~8 s. Smaller delta — Tailwind is the lowest-friction card in
the panel because everything's defaulted right.)

**~1:06 — Vite 5.** Types `5.0`, depth **Working knowledge**. Green.
(~6 s; was ~8 s.)

**~1:12 — done with the five cards.** Sasha now uses the +Add Tech autocomplete
to add Storybook (Mei mentioned it in pre-call). Picks "Storybook" from suggestions.

Round-14 hybrid note: Storybook *might* be hybrid-mode now (the round-13/14
batch added hybrid to K8s + Postgres + Storybook). Card renders. Mei recalls
version 7.x but not minor. Sasha types `7.0`. Depth **Working knowledge**.
For the checklist half, Mei mentions "stories, controls, addons" — Sasha
ticks 3 of N services. No Scope dropdown shown (junior). The framing reads
fine; the hybrid render order (`TechCard.tsx:78-82` — VersionBody, then
ChecklistBody) is sensible. No regression on Mei. (~22 s.)

**~1:34 — Sasha wraps.** Total entry: ~1:35 across 6 cards (5 template + 1 added).
Pre-J4 baseline for the 5-card identical input was ~1:50 across the same five.
Net **~15 s saved on Mei's exact run**, which lines up with the J4 hypothesis
(15–20 s across 5 cards) when you note that Mei's cards skew low-friction
(she's a clean Frontend stack with no Scope ambiguity anywhere). The headline
estimate "~15–20s saved" holds, lower end.

Sasha clicks **Summary**.

## 3. Post-call: report read — the J5 framing test

Summary renders at `/#/summary`. The radar shows 1 category (Frontend) — sparse;
the round-7 sparse-radar fallback fires. Headline cards: **3 Good** (React, Tailwind, Vite),
**2 Caution** (TypeScript-lowered, Next.js-enterprise), **0 Concern**. Plus
**1 Probe target** chip (TypeScript flagged by 7D lowering, surfaces in the
round-9 chip strip).

**Right below the headline counts, the new J5 line renders.** At `Summary.tsx:314-324`:

> *"Junior candidate — Yellows often indicate probe targets, not regressions;
> verify the right depth + version expectations for the role."*

Italic, slate-500, `mb-6 -mt-2`. Visually it lives in the negative space
between the headline grid and the coverage chips. Subtle. Not bold, not bordered.

**Does Sasha read it?** Sasha is the senior recruiter, and she's the one
forwarding this PDF to the hiring manager (Daniel, a Staff FE at the fintech).
On her own read she registers it peripherally — "right, juniors, Yellows are
probes" — and that matches the mental model she already has. The line is
**confirmatory for Sasha** rather than load-bearing.

**The real test is Daniel-the-HM, who will see this for the first time over
email tomorrow.** Daniel is not in this session. But imagining his read: the
headline "**2 Caution**" was the historic point-of-stumble (rounds 6–9 noted
HMs misreading "2 yellow" as "two areas of weakness" when on a junior it
actually means "two probe targets, one of them the strongest signal in the
report"). The J5 line lands *exactly above where his eye would otherwise
jump from headline to first scored section*. Whether he reads it or not is
empirical and depends on email-skim behavior. **Designed correctly**;
**uncertain real-world uptake**, same critique as round-9 candidate-context line.

One observation on placement: the framing line is *below* the headline cards
(`Summary.tsx:314` is after the headline `</section>` close at `:307`). For
the read-order story this matters — Daniel scans the big numbers first, then
encounters the framing. That ordering is correct (you want the framing to
recontextualize the numbers, not pre-condition them). Good call.

PDF export — `#report-root` captures both the headline and the framing line
(both are children of `#report-root` per `pdf.ts`). Verified by inspecting the
DOM tree on the live route. PDF on this run: ~290 KB, 2 pages A4, framing
sentence renders on page 1 below the headline grid. Clean.

## 4. Findings

1. **J4 fires correctly on Mei's identical-since-round-6 input.** Card grid
   drops 3-col → 2-col when `meta.seniority === 'junior'`. Scope dropdown
   unmounts. Notes row's col-span adapts. Each card runs ~25% shorter
   vertically. Verified at `TechCard.tsx:93, 114, 162`.

2. **Time-to-fill: ~15 s saved across Mei's 5 template cards.** Lower end of
   the hypothesized 15–20 s range — expected, because Mei's stack is
   low-Scope-friction (no AI/ML, no K8s, no platform cards where Scope
   actually matters). The saving comes mostly from removed tab-stops and
   from Sasha not reflex-hovering the now-absent dropdown.

3. **J5 framing renders below headline, correct read-order.** `Summary.tsx:314-324`
   conditional on `meta.seniority && !== 'unspecified'`. Junior branch reads
   *"Yellows often indicate probe targets, not regressions; verify the right
   depth + version expectations for the role."* Subtle (italic, slate-500),
   right placement (after headline, before coverage chips). Captured in PDF.

4. **No regression from round-13/14 hybrid changes.** Storybook hybrid (added
   ad-hoc by Sasha mid-call) renders cleanly. K8s and Postgres are not in
   Mei's stack so the hybrid path is exercised only on Storybook, which has
   a small enough service list that it doesn't dominate the card.

5. **J4 over-correction risk: real but small, and not load-bearing for Mei.**
   The honest critique — *some* juniors absolutely DO have author-scope
   relevance, namely AI/ML juniors who've fine-tuned a model in a research
   group but operate it like a primary author of a small artifact. For those
   candidates on cards like Hugging Face / PyTorch, Scope = author is the
   *correct* signal and hiding the dropdown blunts it. But:
   - Mei isn't that candidate (Frontend, no AI/ML cards in her flow).
   - The catalog default scope (`tech.defaultScope`) still applies under the
     hood. AI/ML libs default to `author` in the catalog (per round-9 9B
     wording fix). So a junior on an AI/ML card still gets the author-cap
     verdict — just without a visible knob.
   - **The realistic over-correction case is the junior AI/ML reviewer**
     who is *neither* author *nor* operator (a junior at a research org who
     reads PRs but doesn't ship). They'd be miscategorized as
     operator-by-omission. This is rare. Round-12 doesn't surface it.
   - Recommendation: leave J4 as-is. If the rare case lands, add a quiet
     "Adjust scope" expander on junior cards where `tech.defaultScope` is
     `author` or `architect` — surfaces only on the cards where it matters
     (~5 cards out of 96).

6. **J5 wording: not patronizing, but axis-precise check.** The phrase "verify
   the right depth + version expectations for the role" reads slightly
   homework-y to an experienced HM — it's telling Daniel to do his job.
   *Slight* friction. The first half ("Yellows often indicate probe targets,
   not regressions") is the load-bearing part and reads well. Proposed
   alternative: drop the second clause. The line becomes:

   > *"Junior candidate — Yellows here typically flag probe targets, not
   > regressions."*

   Tighter, less imperative, and doesn't tell the HM to verify anything.
   The "right depth + version expectations for the role" framing belongs
   in the role-fit interpretation footer (`Summary.tsx` near `:546` already
   carries that copy elsewhere), not in the seniority strap.

7. **J5 placement is subtle to the point of skip risk** — same J5 problem
   that round-7 to round-11 surfaced for the candidate-context line above the
   headline. The new line is below the headline cards in `text-xs slate-500
   italic`, which an HM email-skim will likely glide past. Two options:
   - Bump to `text-sm` and remove italic. Reads as a caption, not a footnote.
   - Or: render it as a tiny chip embedded *inside* the seniority context
     (e.g., a "Junior — probe targets, not regressions" pill near the
     candidate-name header). Higher visibility, same content.
   - I'd lean to (a). It's the smallest change and least-design-disruptive.

8. **No card-vs-panel divergence remains on Mei's TS 5.3 case.** This was the
   round-8 8A close. Re-verified on round-12 input: TS 5.3 + shallow + junior
   → card badge Caution, side panel Caution, both with consistent lowered-tier
   wording. Round-8's close has held through rounds 9, 10, 11, 12. No regression.

9. **The K8s + Postgres + Storybook hybrid round (13/14) is fully orthogonal
   to Mei's flow.** Storybook is the only hybrid card she might touch (she
   added it ad-hoc). Rendered correctly. No latent coupling between hybrid
   render order and the J4 grid collapse — both are clean conditionals on
   different keys (`vetMode === 'hybrid'` vs `meta.seniority === 'junior'`).

## 5. Round-12 verdict

**J4: ship as-is.** The grid collapse is clean, the time saved is real (~15 s
on Mei's specific stack, hypothesized 15–20 s across mixed juniors), and the
over-correction case is rare and softened by `tech.defaultScope` already
doing the right thing for AI/ML author-shape cards. If the rare reviewer-shape
junior case surfaces in a future round, layer an "Adjust scope" expander on
the ~5 cards where catalog default is author/architect. Don't pre-build it.

**J5: ship the structure, polish the copy.** The placement (below headline,
before coverage chips) is correct; the conditional is correct; the PDF capture
works. The exact wording carries a redundant second clause that reads as a
mild instruction-to-HM. Proposed rewrite (Finding #6): *"Junior candidate —
Yellows here typically flag probe targets, not regressions."* Or bump
`text-sm` non-italic for read-ability (Finding #7). One copy edit + a single
class change — both are 10-minute fixes for the next round.

**Round-12 close on Mei: green.** No regression on the cumulative round 6→11
fixes (depth-direction wording at `TechCard.tsx:201-214`, scope-cap branching
at `:177-200`, recency note at `:219-223`, card-vs-panel parity from 8A).
The J4 grid change interacts with none of them. The J5 line is the first
*report-side* fix in this thread — every prior round was data-entry side.
That's notable: it's the recognition that "we made the entry experience
honest for juniors; the report itself was still seniority-blind."

**Next round priorities, in order:**
1. J5 copy: trim the second clause OR replace with the proposed alt (1 line edit).
2. J5 visibility: bump `text-xs italic` → `text-sm` non-italic (1 class edit).
3. Watch for the AI/ML junior reviewer over-correction case in any
   round-13+ AI/ML-junior sim run. If it lands, add the per-card "Adjust scope"
   expander (small, targeted, not blanket).
4. Carry forward the unfixed cross-round observation: senior recruiters do
   not reliably read the candidate-context line above the headline cards.
   J5 is the second attempt to surface that context. If round-13 still shows
   HMs missing it, the answer is probably visual weight (chip vs prose), not
   copy.
