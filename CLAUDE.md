# TechVet — project notes for Claude

A 100% client-side internal recruiter tool for fast developer tech screening.
No backend, no database, no accounts. Built from a Ralph-Wiggum-mode PRD.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3 (NOT v4 — avoid for now; v4's oklch colors break html2canvas PDF capture)
- Zustand for state (sessionStorage-backed, localStorage draft via `saveDraft`)
- Recharts for the category radar chart
- jsPDF + html2canvas for PDF export (sliced for multi-page A4)
- React Router with `HashRouter` in production, `BrowserRouter` in dev (so it deploys to any static subpath)
- Lucide-react icons

## Run / build

```bash
npm i              # NOTE: `npm install` (long form) was blocked by harness perms here — use `npm i`
npm run dev        # → http://localhost:5173
npm run build      # → dist/
```

## Key files

- `src/data/technologies.json` — 73 tech definitions across 9 categories. Each entry is either **version-mode** (has `versionTiers`, sorted high→low at runtime, first match wins) or **checklist-mode** (has `vetMode: "checklist"` + a `services: [{id, name}]` array). `enterpriseStillUsed` flag injects the "still widely used" reassurance note on Yellow tiers.
- `src/data/roles.ts` — 8 role templates that preload tech lists.
- `src/lib/version.ts` — loose version comparator; strips "LTS" / non-numerics, pads missing parts with 0.
- `src/lib/scoring.ts` — tier resolver, dispatches by `vetMode`. **Rules to remember:**
  1. **Version-mode: unknown / empty / unparseable** → forces Yellow.
  2. **Checklist-mode coverage thresholds:** `<25%` Red, `25–66%` Yellow, `≥66%` Green.
  3. **Checklist-mode: 0/N with `checklistTouched: false`** → Yellow "Not yet assessed" (distinguishes "haven't asked" from "asked and got zero").
  4. **Depth = `deep` or `very-deep`** lifts severity by exactly one step (Red→Yellow, Yellow→Green). No cumulative effect. Skipped for the untouched-zero case.
- `src/store/assessment.ts` — Zustand store with `persist` (sessionStorage) for current session, plus `saveDraft` / `loadDraft` (localStorage) for explicit drafts. `meta.mandate` carries the free-text client mandate; items track `selectedServices` + `checklistTouched`.
- `src/screens/Landing.tsx` — hero + role-template grid.
- `src/screens/Assessment.tsx` — grid layout: tech cards (categorized) on left, sticky `GuidancePanel` on right tied to `focusedTechId`.
- `src/screens/Summary.tsx` — radar + tier-bucket sections + PDF export. PDF is captured from `#report-root`.
- `src/lib/pdf.ts` — html2canvas → jsPDF with A4 pagination slicing.

## Tier scoring quirks worth remembering

- React min tier was originally `16.8` (hooks landing) — **changed to `16.0`** so typing just `"16"` hits Yellow with the enterprise note. PRD specifically required this. Same logic applied to Vue (lowered `2.6` → `2.0`).
- `compareVersions("3", "3.2")` is negative (3 padded to `[3,0]` < `[3,2]`), so users typing a bare major won't match `3.2` tier mins. Decide deliberately whether the tier `min` should be the major or major.minor.
- The "I don't remember" button toggles `unknownVersion`. While true, the version input is disabled and emptied. Toggling off clears the version (user re-types).
- The yellow tier's `enterpriseStillUsed: true` flag injects the reassuring "Still widely used in many enterprise applications" note.
- **Letter-prefixed versions break ordering.** `parseVersion` strips non-digits and keeps the first numeric token, so `"C99"` → `99` > `"C23"` → `23` would flip the tier order. C and C++ are intentionally checklist-mode (features) for this reason. ECMAScript years (`"ES2025"` → `2025`) work fine because year ordering is preserved.
- **Checklist `touched` semantics.** `checklistTouched` flips true on first checkbox click and never flips back. 0/N untouched = Yellow "Not yet assessed"; 0/N after any interaction = Red "Concern". Existing assessments missing the flag default to `false` and behave as untouched.

## Tailwind config gotcha

`tailwind.config.js` palette `navy` has shades `50/100/500/600/700/800/900/950`. **All of these are referenced in `index.css` @apply directives** — don't remove any without grepping first. We hit a build failure when `navy-800` wasn't defined.

## What's verified

- `tsc -b && vite build` passes; bundle 1.20 MB (356 KB gzipped). Vite warns about chunk > 500 KB but acceptable.
- Dev server boots cleanly in ~3 s, 0 errors.
- All 5 PRD verification cases passed in-browser via Playwright (2026-05-13): React 16 → Yellow + enterprise note; "I don't remember" forces Yellow; depth lifts tier by exactly 1 (non-cumulative); radar renders ≥ 3 categories; PDF export downloads a valid multi-page A4 file. See `RESUME.md` for the full table.
- New behaviors verified 2026-05-14: SQL checklist transitions (0 untouched → Yellow "Not yet assessed" → 3/12 Yellow → 8/12 Green → ticked-then-cleared → Red); Bun version-mode green at `1.3`; full-stack PDF export 312 KB.

## Known issues / non-blockers

- `npm audit` reports 4 vulns (3 moderate, 1 critical) in transitive deps (likely `jspdf` / `html2canvas`). Client-only internal tool — acceptable, but revisit before any wider distribution.
- PDF export is ~300 KB on a 6-tech report after the 2026-05-14 scale-1.5 + JPEG@0.92 switch (down from ~24 MB). Text stays crisp; if a finer pass is ever needed, move to vector via `jsPDF.html()` — but that path is fragile with Recharts SVG and Tailwind v3 colors.
- The Playwright MCP browser session in this harness drops between calls when interleaved with non-playwright tool calls. Workaround: chain playwright calls back-to-back; re-navigate when context is closed.
- Cosmetic: on the Summary screen, the sticky site header briefly overlaps the "Strengths" section heading on scroll. Not present in the PDF (header is sticky-only on the live page).
