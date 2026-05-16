# Session 03 — Eli Ortiz (Junior, Frontend)

**Agent:** sim-03
**Date:** 2026-05-16
**Round:** 2026-05-16-round-4-validation
**Channel:** Phone (5-10 min)
**Role template picked:** Frontend Engineer

## 1. Persona inhabited

Eli is 28, four months out of a 16-week bootcamp, three months before that
in a retail floor-supervisor job. His current employer is a 12-person
design-system team building a Tailwind monorepo someone else set up;
he was hired into a "junior frontend" req. He talks confidently about
the bits of React he writes daily (function components, hooks, props,
basic Suspense), more haltingly about TypeScript ("we have it on,
but `any` is still in the code I write"), and admits he's never opened
the `vite.config.ts` or `next.config.js` files. Storybook stories are
his daily output but he has never configured the addon list. He says
"yeah I think so" to most version questions and apologizes when he
can't be more precise.

## 2. Phone call — abbreviated

> R: "Hey Eli — quick 8 minutes to log your stack. Cool?"
> E: "Yeah, sure."
> [Recruiter: picks Frontend Engineer template → 5 cards preload: React,
>  TypeScript, Next.js, Tailwind, Vite. Sets Channel=Phone, Seniority=Junior,
>  Years=0.3, Path=Career switcher, Additional context="ex-retail, 28"]
> R: "Talk me through what you actually touch."
> E: "React mostly — 18 something? We're on whatever the monorepo pinned."
> [R: focuses React card, types "18", depth stays at default `working`]
> E: "Tailwind for everything visual. I write classes, don't configure it."
> [R: types Tailwind version "3" (Eli says "3 I think"), depth=working]
> E: "And Jest for tests, kind of — I write a few, the seniors write most."
> [R: searches "Jest", adds it, types "29"? — Eli hedges, R picks
>  depth=shallow on his hesitation]
> E: "Oh and Storybook — I write stories all day."
> [R: searches "Storybook", adds it, no version (Eli doesn't know),
>  flips "I don't remember" toggle, depth=working]
> E: "Uh, that's about it really. TypeScript is on but I'm still learning it."
> [R: focuses TypeScript card, taps version field, Eli says "I don't know",
>  R hovers, decides not to log the version, moves on]
> R: "Anything else come to mind?"
> E: "Not really, no."
> [R: leaves Next.js and Vite untouched; clicks Review Summary]

Total controls touched: ~13 clicks across ~6.5 minutes.

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| React | 18 | working | — | **Good** (Green, tier match at min `18.0`) |
| Tailwind | 3 | working | — | **Good** (Green, tier match at min `3`) |
| Jest | 29 | shallow | — | **Excellent** (Green, min `29.0`) |
| Storybook | unknownVersion=true | working | — | **Review / Probe** (Yellow, version-unknown path; Fix B blocks depth-lift) |
| TypeScript | (empty, no toggle) | working (default) | — | **Not discussed** (filtered out of buckets by Fix G) |
| Next.js | (empty, never focused) | working (default) | — | **Not discussed** |
| Vite | (empty, never focused) | working (default) | — | **Not discussed** |

Headline stats: **3 Good / 1 Review / 0 Concern** + chip *"3 not
discussed on the call"*. Radar: Frontend axis avg ≈ 2.67 (= 1 Yellow
+ 2 Green Frontend techs averaged: React=3, Tailwind=3, Storybook=2);
Testing axis = 3 (Jest alone).

Header line: **"Junior · 0.3 yr in industry · Career switcher · ex-retail, 28"**.

## 4. Accuracy judgement

- **Where it's right:** the verdicts on each tech are individually
  defensible. React 18 + working is what Eli actually has; the Storybook
  Yellow correctly refuses to inflate from "I write stories" to Green.
  Fix G correctly hides the three never-touched cards from the Probe
  Further bucket — without it, Eli's PDF would have shown *4* Probe
  Furthers and looked weaker than he is.
- **Where it over-rates:** Jest = **Excellent**. Eli said "I write a few"
  and the recruiter picked `shallow`. The catalog tier hits Green at
  29.0 with no depth pressure (Fix A/B don't apply because version is
  present and shallow doesn't lift). A junior who writes "a few" tests
  does not deserve an Excellent badge — but the tool gives one. This is
  a different bug (no "shallow caps Green" rule) but it lands on the
  most over-claimable tech for a junior.
- **Where it under-rates:** nothing meaningful. The header line carries
  the seniority context, so a single Yellow Storybook reads correctly
  as "junior is still learning".
- **Where it's silent on something a hiring manager would need to know:**
  the report does not say *which of the Greens are routine-junior-level
  vs. senior-level*. Eli's React Green and a senior's React 18 Green are
  rendered identically except for the new header line. That line is the
  whole load-bearing differentiator now.

**Verdict on Fix M:** **Pass, with one caveat.** The header line renders
correctly, comma-free, with the right separator dots, and the seniority
pill makes it scannable at the top of page 1. Compared to a 4-month
**mid-level** hypothetical (same 3-Green-1-Yellow PDF, but header line
"Mid · 4 yr in industry · Traditional path"), the difference is
*visible at a glance*. The HM would not conflate them. That is exactly
the hazard Fix M was designed to close, and it closes it.

The caveat: **"0.3 yr in industry"** reads awkwardly. A recruiter who
literally types `0.3` gets it suffixed to "0.3 yr in industry" by the
bare-number branch in `candidateContext.ts:20`. For sub-1-year tenure
the natural recruiter input is "4 months" or "0.3" — the latter renders
oddly, the former renders verbatim and reads better. Not a bug, but
the placeholder text "e.g. 8 or 10+" steers recruiters into the wrong
phrasing for juniors.

**Verdict on Fix G (carryover):** **Pass.** TypeScript, Next.js, and
Vite all correctly land in the "Not discussed on the call" section with
the phone-channel copy ("recruiter ran out of time or pivoted"). None
of them inflate Probe Further. The chip-row at the top shows
**"3 not discussed on the call"** which is exactly what a HM needs to
see — three template-loaded gaps, no scoring noise.

## 5. Friction during the call

- **Candidate-context block is 4 controls in a row** (Seniority pills /
  Years input / Path dropdown / Additional context input). On a real
  phone screen the recruiter would skip the whole row to save seconds.
  The defaults-hide-the-line behavior protects them, but only if they
  *skip entirely*. Half-filling — say Seniority pill only — produces a
  bare "Junior" header line that looks malformed compared to the full
  4-part composition.
- **Path dropdown has 10 options**, one of which ("Junior / first role")
  semantically overlaps with the Seniority=junior pill. A recruiter on
  the phone has to mentally disambiguate which is the right control
  for a bootcamp grad: pill, dropdown, or both. I picked Career switcher
  because Eli was in retail; another agent might pick Junior / first
  role. Inconsistency across sessions is the real risk.
- The Storybook "I don't remember" toggle worked, but Storybook is
  arguably *never* version-relevant for a junior who writes stories —
  the meaningful question is "are you using CSF2 or CSF3?", which the
  catalog doesn't expose.

## 6. Bugs / structural defects

1. **Jest=29 + shallow + junior → Excellent.** Catalog version-tier match
   is unmoderated by depth=shallow. A 4-month junior who writes "a few
   tests" gets the same badge as a senior who owns the test infra.
   Evidence: `src/lib/scoring.ts:175-201` — version-mode path runs
   `adjustForDepth` but no symmetrical "shallow depresses Green" rule.
   Severity: **Medium** — single-tech misreading, but it lands on the
   most over-claimable testing tech.

2. **Bare-number "0.3" renders as "0.3 yr in industry".** Acceptable for
   integers, awkward for fractional juniors. Evidence:
   `src/lib/candidateContext.ts:18-22` — `looksLikeBareNumber` matches
   `^[\d.]+$`. Fix is one regex tweak or a placeholder change.
   Severity: **Low** — cosmetic; doesn't affect verdict.

3. **Seniority pill + Path dropdown overlap on juniors.** "Junior / first
   role" in pathType is a near-duplicate of Seniority=junior. Recruiters
   will pick one or both inconsistently. Evidence:
   `src/types.ts:126-136` + `src/lib/candidateContext.ts:46-58`. If both
   are picked, the header reads "Junior · ... · Junior / first role"
   which is redundant. Severity: **Low** — schema choice, but worth
   either dropping the pathType option or auto-suppressing it when
   seniority=junior.

4. **No "shallow scope" guardrail interaction with Fix M.** Eli is
   tagged Junior on the header but his React=Good doesn't soften to
   "Good for a junior". The header line says "Junior" but the bucket
   says "Strengths". A more decisive design would let seniority drive
   a per-bucket caveat ("Good — junior-level depth"). Severity:
   **Medium-Low** — Fix M shipped half the answer; the verdicts still
   read seniority-blind.

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Tech entry: ~7-10 sec per tech (search +
  click + type version + depth dropdown). Candidate-context block adds
  ~20-25 sec one-time at the start (pill click + years type + path
  dropdown scroll-and-select + free-text). Total session: ~6.5 min,
  inside the 5-10 budget.
- **Phone-shrink test.** The candidate-context block is the new risk.
  Path dropdown has 10 options and requires reading; on a phone the
  recruiter will either default-skip the whole row or fumble the
  dropdown live. Specifically: opening the `<select>` mid-call to read
  10 path-type labels is 5+ seconds of dead air. The Seniority pill
  group is fine (1 click).
- **Friction that vanishes on phone.** I read the path-type dropdown
  labels carefully before clicking. On a real call I would have either
  skipped the row or guessed wrong. The "Additional context" free-text
  ("ex-retail, 28") is genuinely valuable but only because I had a quiet
  moment — a recruiter mid-call would not type it. Defaulting it empty
  loses the most distinguishing piece of Eli's profile.
- **Risk / safe rating.** **At-risk.** Fix M is structurally correct
  but the input ergonomics will cause recruiters to under-fill on phone.
  Recommend: collapse Seniority+Path into a single 6-button row, and
  make Additional context a post-call enrichment on Summary (mirror
  the ScopeChip pattern).

## 7. Catalog gaps

None for Eli's named stack — React/TypeScript/Tailwind/Jest/Storybook/
Next.js/Vite are all in catalog. One soft gap: Storybook's tier table
is version-only; CSF2 vs CSF3 (the actually-distinguishing factor for a
junior who writes stories) has nowhere to live. Not actionable in
catalog, would need a per-tech sub-axis.

## 8. One-liner for cross-cut

> **Eli Ortiz — Frontend Engineer — Fix M renders the junior context
> correctly and prevents the 4-month-mid conflation, but the
> candidate-context input row is 4 controls deep and likely to be
> under-filled on phone; also surfaces Jest=29+shallow → Excellent as a
> standing depth-asymmetry gap.**

## 9. Recommendation

**Move "Additional context" to the Summary screen as a post-call
enrichment input, mirroring the ScopeChip pattern.** On phone, the
recruiter cannot afford the 4-control candidate-context block; they
will skip "Additional context" first and lose the most signal-rich
field (the one that says "ex-retail, 28" instead of just "Junior"). If
the input shows up *after* PDF generation in the Tune-scope banner area,
the recruiter fills it in the 30 seconds between hanging up and
exporting — and Fix M's distinguishing power actually lands on every
report instead of only on the ones where the recruiter had a slow call.

## Disagreement with prior fixes

Fix M is the right schema but the wrong placement. Putting the
candidate-context row in the Assessment header — alongside the channel
pill and CV-link input — competes with the live call. Recruiters will
under-fill the field that matters most (free-text Additional context)
exactly when speed pressure peaks. The structural fix already exists
(post-call enrichment via ScopeChip on Summary, shipped as Fix K);
applying the same pattern to candidate-context would close the
under-fill gap.
