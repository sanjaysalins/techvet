# Resume point — TechVet Playwright testing

**Status:** ✅ All PRD verification cases passed (2026-05-13).

## Verified cases

| # | Case | Result |
|---|------|--------|
| 1 | React `16` → Yellow + enterprise note | ✓ Badge `Review / Probe`; guidance panel shows _"Still widely used in many enterprise applications. React 16 era — verify Hooks familiarity (16.8+) vs class-only background."_ |
| 2 | "I don't remember" forces Yellow on TypeScript | ✓ Badge `Review / Probe`; version input disabled and empty |
| 3 | Depth lifts tier by exactly 1 | ✓ TS `3` = Concern; depth=Deep → `Review / Probe (depth-adjusted from Concern)`; very-deep does **not** lift further (no cumulative effect) |
| 4 | Radar renders ≥ 3 categories | ✓ Summary radar shows 3 axes (Frontend, Backend, Database) after adding Node.js + PostgreSQL |
| 5 | PDF export | ✓ Download triggered as `TechVet_Ada_Lovelace_2026-05-13.pdf` — valid 2-page PDF (multi-page slicing works) |

- 0 console errors throughout the run.
- The depth-adjusted badge labels itself explicitly (`"(depth-adjusted from Concern)"`) — that text wasn't called out in the PRD but is a nice tell.

## Re-running the verification

```bash
cd /home/salinss/devtools/techvet
npm run dev   # background; serves on http://localhost:5173
```

Then drive Playwright through the 5 cases above. Notes:

- Browser context drops if you interleave Playwright calls with non-Playwright tool calls — re-navigate when you see `Target page, context or browser has been closed`.
- For dropdown/category-section searches, typing into the search box and clicking the suggestion is the supported flow; the React-controlled input may need a native `input` event dispatch (`URL.set + dispatchEvent`) if `browser_type` selects the wrong textbox by index.
- The PDF export is captured by hooking `HTMLAnchorElement.prototype.click` to log `download` + `href`, or just observed via Playwright's download event (the MCP `.playwright-mcp/` directory).

## Known issues (still open)

- `npm audit` reports 4 vulns (3 moderate, 1 critical) in transitive deps (likely `jspdf` / `html2canvas`). Client-only internal tool — acceptable, but revisit before any wider distribution.
- PDF file size is ~21 MB (rasterized via html2canvas at the default scale). Fine for internal sharing; would want to optimize before bulk distribution.
