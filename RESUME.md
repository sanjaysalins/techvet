# Resume point — TechVet Playwright testing

**Last session ended:** 2026-05-12, mid-browser-test.

## State of the world

- All code is written, committed-able, and **builds cleanly** (`npm run build` passes).
- Playwright MCP is installed at user scope (`claude mcp list` confirms `playwright: npx @playwright/mcp@latest`).
- Browser test had reached `/assess` with the Frontend Engineer template loaded (React, TypeScript, Next.js, Tailwind, Vite) — all 5 cards rendered correctly showing `Review / Probe` (the empty-version default).
- **Next action that was rejected by the user:** typing `"16"` into the React version input (`ref=e129`) to verify the React 16 → Yellow + enterprise note case.

## To continue next session

1. Make sure the dev server is running:
   ```bash
   cd /home/salinss/devtools/techvet
   npm run dev      # background it; serves on http://localhost:5173
   ```

2. Open the app with Playwright and re-load the Frontend Engineer template:
   ```
   mcp__playwright__browser_navigate → http://localhost:5173/
   mcp__playwright__browser_click → button:has-text("Frontend Engineer")
   ```
   Then `browser_snapshot` to get fresh refs.

3. **Run the verification cases the PRD requires:**

   | # | Case | Action | Expected |
   |---|------|--------|----------|
   | 1 | React 16 → Yellow + enterprise note | type `16` into React version input | Right sidebar shows **Review / Probe** with "Still widely used in many enterprise applications" |
   | 2 | "I don't remember" forces Yellow | click "I don't remember" on TypeScript | Badge changes to **Review / Probe**, version input disabled |
   | 3 | Depth lifts tier by exactly 1 | type `5.0` for TypeScript (would be Concern), set depth to Deep | Badge becomes **Review / Probe** (one step better, not Green) — note: `5.0` is actually Good in current tiers, so use a clearly outdated version like `3` for a real Red→Yellow test |
   | 4 | Radar renders ≥ 3 categories | add Backend tech (Node) and Database tech (Postgres) via search | Summary page radar displays |
   | 5 | PDF export | click Export PDF on Summary | downloads `TechVet_<name>_<date>.pdf`; verify multi-page slicing if long |

4. **Watch for:**
   - Browser console errors in `browser_console_messages` (the dev server runs StrictMode so double-effects are expected, not bugs).
   - PDF capture may take 1–3 s — wait before checking download.
   - The MCP browser context tends to drop when interleaved with non-playwright calls. Chain Playwright calls and re-navigate if you see `Target page, context or browser has been closed`.

## If something breaks

- Type errors → re-run `npm run build`.
- Tier resolves wrong → check `src/lib/scoring.ts:43` and the JSON `versionTiers` for that tech.
- React 16 hits Red instead of Yellow → confirm `technologies.json` for React has `"min": "16.0"` (not `"16.8"`).
- PDF blank/broken → likely Tailwind `oklch` colors. We're on v3 so this shouldn't happen; if it does, check `index.css` and the `tier-card-*` classes.

## Files modified in last session

- All of `src/**`, `package.json`, `vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `README.md`, `CLAUDE.md`, this file.
- The `.idea/` directory predates this session — leave it alone.
