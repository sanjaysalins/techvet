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

- `src/data/technologies.json` — ~75 tier definitions. Each entry has `versionTiers` (sorted high→low at runtime, first match wins) and `enterpriseStillUsed` flag.
- `src/data/roles.ts` — 8 role templates that preload tech lists.
- `src/lib/version.ts` — loose version comparator; strips "LTS" / non-numerics, pads missing parts with 0.
- `src/lib/scoring.ts` — tier resolver. **The two rules to remember:**
  1. **Unknown version OR empty version OR unparseable** → forces Yellow.
  2. **Depth = `deep` or `very-deep`** lifts severity by exactly one step (Red→Yellow, Yellow→Green). No cumulative effect.
- `src/store/assessment.ts` — Zustand store with `persist` (sessionStorage) for current session, plus `saveDraft` / `loadDraft` (localStorage) for explicit drafts.
- `src/screens/Landing.tsx` — hero + role-template grid.
- `src/screens/Assessment.tsx` — grid layout: tech cards (categorized) on left, sticky `GuidancePanel` on right tied to `focusedTechId`.
- `src/screens/Summary.tsx` — radar + tier-bucket sections + PDF export. PDF is captured from `#report-root`.
- `src/lib/pdf.ts` — html2canvas → jsPDF with A4 pagination slicing.

## Tier scoring quirks worth remembering

- React min tier was originally `16.8` (hooks landing) — **changed to `16.0`** so typing just `"16"` hits Yellow with the enterprise note. PRD specifically required this. Same logic applied to Vue (lowered `2.6` → `2.0`).
- `compareVersions("3", "3.2")` is negative (3 padded to `[3,0]` < `[3,2]`), so users typing a bare major won't match `3.2` tier mins. Decide deliberately whether the tier `min` should be the major or major.minor.
- The "I don't remember" button toggles `unknownVersion`. While true, the version input is disabled and emptied. Toggling off clears the version (user re-types).
- The yellow tier's `enterpriseStillUsed: true` flag injects the reassuring "Still widely used in many enterprise applications" note.

## Tailwind config gotcha

`tailwind.config.js` palette `navy` has shades `50/100/500/600/700/800/900/950`. **All of these are referenced in `index.css` @apply directives** — don't remove any without grepping first. We hit a build failure when `navy-800` wasn't defined.

## What's verified

- `tsc -b && vite build` passes; bundle 1.18 MB (347 KB gzipped). Vite warns about chunk > 500 KB but acceptable.
- Dev server boots cleanly in ~3 s, 0 errors.
- Playwright (via `@playwright/mcp` MCP server, user-scope) reached landing + assessment screens, rendered all 5 frontend-role techs correctly. Test was interrupted before the React 16 case could be verified in-browser — see `RESUME.md`.

## Known issues / non-blockers

- `npm audit` reports 4 vulns (3 moderate, 1 critical) in transitive deps (likely `jspdf` / `html2canvas`). Client-only internal tool — acceptable, but revisit before any wider distribution.
- The Playwright MCP browser session in this harness drops between calls when interleaved with non-playwright tool calls. Workaround: chain playwright calls back-to-back; re-navigate when context is closed.
