# Session 01 — Janelle Park (Junior, Frontend Engineer)

**Agent:** sim-01 (2026-05-16 phone-screening round)
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Frontend Engineer

## 1. Persona inhabited

Janelle finished a 14-week bootcamp 18 months ago and got into a 40-person B2B SaaS the same quarter. She is the third frontend hire under a tech lead who set up the toolchain a year before she joined. Day-to-day she ships features in a React 18 + TypeScript + Tailwind monorepo, writes Jest unit tests, and adds Storybook stories for the design-system components someone else built. She speaks fluently about hooks, props, and "the build" but flattens anything below `npm run dev` into "I think Vite handles that?". She knows the design-system Storybook URL by heart but has never edited `.storybook/main.ts`. She mixes up TanStack Query and RTK Query because she's only seen them in tutorials — at work they use plain `fetch` wrapped in a custom hook. She is warm, fast on the call, and slightly apologetic when she doesn't know a version number.

## 2. Phone call — abbreviated

> R: "Hi Janelle — quick 8-min scan of your stack, OK? Frontend role."
> J: "Yeah, we're React, TypeScript, Tailwind, Jest. Vite for build."
> [Recruiter loads Frontend template — React/TS/Next.js/Tailwind/Vite prefilled. Starts typing.]
> R: "React?" J: "18, since I joined."
> [Types `18` in React, depth=working]
> R: "TypeScript?" J: "Yeah always, I don't know the version, whatever the repo has."
> [Clicks "Don't remember" on TS, depth=working]
> R: "Tailwind?" J: "3."
> [Types `3`, depth=working]
> R: "Vite version?" J: "Oh, uh, the build thing — I literally never touch the config."
> [Clicks "Don't remember" on Vite, depth=shallow]
> R: "Next.js?" J: "No, we're not on Next."
> [Clicks "Not in stack" on Next.js]
> R: "Anything else?" J: "Jest. And Storybook — I write stories. And the QA team owns Playwright but I've seen the reports."
> [Searches "jest" → adds, types `29`, depth=working. Searches "storybook" → adds, "Don't remember", depth=working. Searches "playwright" → adds, "Don't remember", depth=shallow.]
> R: "State management?" J: "We use TanStack Query — or wait, is it RTK Query? One of those."
> [Recruiter searches "tanstack" — no results. Searches "redux" — no results. Types in Notes field on React: "uses tanstack-or-rtk query — unclear"]
> [Clicks Review → Summary.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| React | 18 | working | — | **Good** (Green, tier `18.0`) |
| TypeScript | unknown | working | — | **Review / Probe** (Yellow) + "Still widely used in many enterprise applications" |
| Tailwind | 3 | working | — | **Good** (Green, tier `3`) |
| Vite | unknown | shallow | — | **Review / Probe** (Yellow), enterprise note **suppressed** (shallow + unknownVersion → fix from 2026-05-15 fires) |
| Next.js | — | — | — | **Not in candidate's stack** (gray, excluded from buckets/radar) |
| Jest | 29 | working | — | **Excellent** (Green, tier `29.0`) |
| Storybook | unknown | working | — | **Review / Probe** (Yellow) + enterprise note |
| Playwright | unknown | shallow | — | **Review / Probe** (Yellow), enterprise note suppressed (Playwright has no `enterpriseStillUsed` flag anyway) |

**Summary headline:** 3 Green (React, Tailwind, Jest) / 4 Yellow (TS, Vite, Storybook, Playwright) / 0 Red / 1 Skipped (Next.js). Radar: 2 categories only (Frontend + Testing) — no AI/ML, Backend, Cloud, Data, etc. The "Other technologies in these categories" prompt from `72f6810` would fire for all of the empty categories before Summary.

## 4. Accuracy judgement

- **Where it's right:** React 18 → Good is exactly right. Jest 29 → Excellent is also right. The Next.js tri-state ("Not in stack") cleanly excludes a preloaded tech she doesn't touch — this is the single best behavior in the session.
- **Where it over-rates:** Storybook gets a Yellow + "*Still widely used in many enterprise applications*" note. She **writes stories** but cannot edit `.storybook/main.ts`. The enterprise note is designed to reassure on Cypress-10-in-a-legacy-suite — here it reads as "this is real production competence" to a non-technical recruiter. Same hazard fires on TypeScript Yellow.
- **Where it under-rates:** Vite is her daily tool. She runs `npm run dev` twenty times a day. The verdict is **Yellow / unknown version** with no enterprise note (because I picked depth=shallow, which the 2026-05-15 fix uses to suppress the note). A hiring manager reading the PDF sees "Vite: Review / Probe" and assumes she might not have used it. The real failure: **the tool has no concept of "uses the output but not the config"**. Scope=author would be wrong (she doesn't write Vite plugins); scope=operator is wrong (she doesn't operate Vite in prod, it's a dev tool). There is no "consumer" scope.
- **Where it's silent on something a hiring manager would need to know:**
  1. **TanStack Query / RTK Query confusion.** This is the single most diagnostic moment of the call — she demonstrably doesn't know which library her team uses. The catalog has neither tech, so the tool drops the signal entirely. The recruiter typed it as a free-text note on the React card, which **does not appear on the radar, in the buckets, or as a probe**.
  2. **Junior-ness itself.** Eight techs logged, three Green, no Red — looks competent. The Summary cannot distinguish "junior who handles her assigned slice well" from "mid-level breadth". The D1 defect in RESUME.md (no Senior tier above Green) applies inversely here: there's also no Junior signal below Green.

## 5. Friction during the call

- **The Frontend template preloaded Next.js**, which forced an extra click ("Not in stack") for a tech she doesn't use. For a junior at a non-Next shop this is a wasted slot — and the recruiter has to know to use that button instead of just typing `0` or removing the card. The Remove (X) button and "Not in stack" button do different things to the radar; I'd bet most recruiters don't realize that.
- **"Don't remember" got clicked three times in 8 minutes** (TypeScript, Vite, Storybook). Each click produces a Yellow. The recruiter cannot tell from the badge whether Yellow means "uses it, doesn't know version" or "version is genuinely Yellow-tier". This is a longstanding ambiguity — the label is identical.
- **Search for "tanstack" returned nothing, and search for "redux" returned nothing.** Two dead-ends, ~10 seconds lost. There's no "suggest similar / add as custom" path.
- **Scope of use was not used at all** on this call. For a junior with no architect/reviewer exposure, the dropdown is dead weight in the UI — three columns of controls where one is permanently `— Not specified`. The 2026-05-16 fix is correct in principle; it just doesn't help this call.

## 6. Bugs / structural defects

1. **"Don't remember" produces the same Yellow label as a genuine Yellow-tier version match.** Both say "Review / Probe". A non-technical recruiter cannot tell, post-call, whether the Yellow means "she might have an old version" or "she literally can't remember". Evidence: `src/lib/scoring.ts:121-150` returns `label: composeLabel(...)` with `baseLabel: 'Review / Probe'` for unknown-version, identical to a Yellow tier match. **Severity: Medium** — this is the single largest source of ambiguity in the PDF.

2. **Enterprise reassurance note fires on Storybook + depth=working when the candidate didn't pick a version.** `scoring.ts:131-146` allows the note when `depth ≥ working`, on the theory that "working depth + no version" implies a managed-platform user. For Storybook + a junior who writes stories without owning config, this incorrectly signals "legacy-competence Yellow" instead of "didn't ask / doesn't know". The 2026-05-15 fix solved this for `shallow`, but `working` is the most common depth a recruiter will pick. **Severity: Medium.**

3. **Search has no aliases.** Janelle said "TanStack" and "RTK"; both returned zero. Even if the tech were in the catalog, recruiters wouldn't reliably type "react-query" or "redux-toolkit-query". `src/components/TechSearch.tsx:20-25` only matches `name`/`category`/`id` substrings. **Severity: Low** (catalog gap is the bigger fish) but compounding.

4. **No "consumer" scope.** Janelle's relationship with Vite (`npm run dev` user, never touches config) is a real category with no representation. Mapping it to operator/author/reviewer/architect all misread her. **Severity: Low for this call, Medium across the role** — every junior frontend dev has this relationship with at least one tool.

## 7. Catalog gaps

- **TanStack Query** (React Query) — the dominant data-fetching library in 2026 React shops, missing entirely. Mentioned in passing inside the tRPC note (`technologies.json:2958`) but not searchable as its own tech.
- **Redux / Redux Toolkit / RTK Query** — also missing. For a Frontend Engineer template this is a glaring omission; state management is the second question after the framework itself.
- **Zustand / Jotai / Recoil / MobX** — none present. The store this tool itself uses is Zustand, which is funny and a bit telling.
- **React Hook Form / Formik / TanStack Form** — none. Forms are 30% of frontend work.
- **React Router / TanStack Router** — none.
- **CSS-in-JS** (styled-components, emotion, vanilla-extract) — none. Tailwind isn't the whole CSS world.
- **Storybook tier table feels too generous for a junior.** Min `9` for Excellent / `7` for Good covers basically everyone who has opened Storybook in the last three years. There's no signal differentiation between "writes stories" and "owns the design system Storybook". This is the D2 cousin — scope helps a bit, but only if recruiters use it.

## 8. One-liner for cross-cut

> **Janelle — Frontend Engineer — junior who can't recall versions gets 3-Green-4-Yellow report identical in shape to a mid-level; Vite-as-daily-tool reads as a probe, and the TanStack/RTK confusion (the single diagnostic moment of the call) is dropped because neither library is in the catalog.**

## 9. Recommendation

**Add aliases + "add as custom" to the search, and add the top 5 missing React-ecosystem techs to the catalog (TanStack Query, Redux Toolkit, Zustand, React Hook Form, React Router).** The structural fix Janelle needs most — distinguishing "junior who does her slice well" from mid-level breadth — is the open D1 problem and a much bigger ask. But the immediate, cheap fix is **catalog coverage of the state-management layer**. Right now a recruiter screening a frontend dev cannot log the single most-used library in modern React, and the call's most diagnostic moment (Janelle's TanStack/RTK confusion) vanishes into a free-text note that doesn't appear on the report. Two days of catalog work would have made this 8-minute call materially more useful to the hiring manager.

## Disagreement with prior fixes

The 2026-05-15 fix to suppress the "still widely used in enterprise" note when `unknownVersion && depth ≤ shallow` is right-direction but **drew the line in the wrong place**. The note should be suppressed whenever the user clicks "Don't remember", regardless of depth — because the note is about *the version being old*, and we don't know the version. Firing it on `depth=working + unknownVersion` (as on Janelle's Storybook here) repeats the exact misread the fix was supposed to prevent.
