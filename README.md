# TechVet

A 100% client-side, offline-first internal tool for non-technical recruiters
to do fast, structured technical screening of developer / solution architect
candidates.

- No backend, no database, no accounts.
- All data stays in the browser. Optional in-browser draft save.
- One-click PDF report.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build & deploy

```bash
npm run build
```

This produces a static `dist/` folder. Drag it to any free host:

- **Cloudflare Pages**: connect repo or upload `dist/`.
- **GitHub Pages**: push `dist/` to the `gh-pages` branch.
- **Netlify / Vercel hobby**: drag-and-drop `dist/`.

The app uses relative paths (`base: './'`) and `HashRouter` in production, so
it works at any subpath without server config.

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- Zustand for state (sessionStorage-backed; optional localStorage draft)
- Recharts for the category radar
- jsPDF + html2canvas for PDF export
- Lucide React for icons

## Project structure

```
src/
  data/
    technologies.json   ← 60+ tech tiers (2026-realistic versions)
    roles.ts            ← role templates
  lib/
    version.ts          ← loose semver comparison
    scoring.ts          ← tier resolution + depth adjustment
    pdf.ts              ← html2canvas → jsPDF
    cn.ts
  store/assessment.ts   ← Zustand session store + draft helpers
  components/
    TechCard.tsx
    TechSearch.tsx
    GuidancePanel.tsx
    CategoryRadar.tsx
  screens/
    Landing.tsx
    Assessment.tsx
    Summary.tsx
```

## Tier logic

1. Each technology has tiered `min` versions → Excellent / Good / Review / Concern.
2. Higher tiers win — the highest `min` whose comparison is `≤ user version`.
3. "I don't remember version" → Yellow (Review / Probe) automatically.
4. Depth (Deep / Very Deep) improves severity by **at most one step**:
   - Concern → Review
   - Review → Good
   - Good stays Good
5. Enterprise-still-used techs (e.g. React 16, Spring Boot 2.7) get a
   reassuring note when they land in Yellow.
