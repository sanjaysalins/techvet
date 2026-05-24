# TechVet

A 100% client-side, offline-first tool built for recruiters who screen
developer and solution-architect candidates. Recruiter-led technical
screening, end to end — live guidance on every tech, color-coded verdicts,
one-click PDF.

- No backend, no database, no accounts.
- All data stays in the browser. Optional in-browser draft save.
- One-click PDF report the hiring manager will actually read.

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

This produces a static `dist/` folder. The app uses `HashRouter` in
production (URLs like `/#/assess`) so it works on any static host without
SPA redirect rules.

### Deploy to Netlify (recommended — free tier)

The repo is configured for one-click Netlify deploys:

- `netlify.toml` — build command + publish dir + Node version
- `.nvmrc` — pins Node 18 (matches the toml)

To set up the live site:

1. Push to GitHub (`git push`).
2. On netlify.com → **Add new site → Import an existing project → GitHub**.
3. Pick this repo. Build settings auto-detect from `netlify.toml`.
4. **Deploy site**. First build takes ~1–2 minutes.
5. Every subsequent `git push` to `main` redeploys automatically.

Free tier covers everything we use: static hosting, HTTPS, 100 GB
bandwidth/month, 300 build minutes/month, optional custom domain.

### Other deploy targets

- **Cloudflare Pages**: connect repo (similar flow, also free).
- **GitHub Pages**: push `dist/` to `gh-pages` branch.
- **Any static host**: upload `dist/`.

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
