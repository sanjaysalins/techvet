# Resume point — TechVet (2026-05-15 EOD, red-team punch list cleared)

**Status:** clean working tree. All five red-team items from yesterday now closed. Build passes (`tsc -b` clean); `npm test` passes (41/41). Production build still 1.23 MB / 361 KB gzipped.

## Today's commits (2026-05-15)

```
f287768  Refresh version display for Elasticsearch, ClickHouse, Databricks
dd194a4  Update RESUME.md for 2026-05-15 EOD — items 3 & 5 landed
dd86cd2  Add Vitest + 41 unit tests for version, scoring, catalog integrity
20eb852  Add "Candidate unsure" toggle to checklist mode
```

## Previous commits (2026-05-14)

```
fd8935d  Save state mid-red-team-fixes for tomorrow pickup
c115ea0  Restore dropped templates and recalibrate fast-mover tier mins
b4e4a8d  Refresh RESUME.md and CLAUDE.md for catalog 2.0
ddb31e7  Catalog refresh 2.0 — 73 → 96 techs, +5 role templates
21024a5  Update CLAUDE.md for the 2026-05-14 catalog and scoring changes
5b20d50  Update RESUME.md for 2026-05-14 EOD
0ad38e7  Shrink PDF export ~77x by switching to JPEG@0.92 + scale 1.5
5b00172  Show "Not yet assessed" for untouched checklist techs
5db5d44  Add 18 Tier-1 technologies for 2026 hiring coverage
dafaff7  Add checklist vetMode, fix PDF export, refresh tech versions to May 2026
```

### dafaff7 — yesterday's uncommitted work, bundled
Three threads bundled because they overlapped on `technologies.json` and `Summary.tsx`: checklist vetMode for cloud techs (AWS / Azure / GCP collapsed from 22 entries to 3 platform cards), PDF export silent-failure fix (Blob + `<a download>` flow, inline status pill), and the May-2026 version data refresh.

### 5db5d44 — Tier-1 catalog additions (55 → 73 techs)
Filled gaps that 2026 recruiters routinely screen for:
- **Language (+4):** SQL, C, C++, JavaScript. C/C++ went checklist-mode because the version comparator strips letters (`C99` → 99 > `C23` → 23 broke ordering). Feature checklists are also more discriminating for hiring.
- **AI/ML (+4):** Hugging Face Transformers, scikit-learn (version), LLM API SDK and Vector DBs (checklist on providers/features).
- **Data (+2):** Databricks, dbt.
- **Database (+2):** ClickHouse, DuckDB.
- **DevOps (+3):** Helm, Pulumi, Observability checklist (Prometheus / Grafana / Loki / Tempo / OTel / Datadog / etc.).
- **Backend (+2):** Bun, tRPC.
- **Mobile (+1):** Expo.

All `currentVersion` values verified against GitHub releases / npm / endoflife.date on 2026-05-14.

### 5b00172 — 0-of-N UX behavior
Adding a checklist tech (AWS, SQL, etc.) used to flash Red "Concern — 0/N services" before the recruiter had asked anything — read as a finding rather than an unfilled state. New behavior:
- 0/N **untouched** → Yellow "Not yet assessed"
- 0/N **touched** (ticked then unticked) → Red "Concern" (preserves the real signal)

Implementation: new `checklistTouched?: boolean` on `AssessmentItem`, flipped true on first checkbox click. Mirrors the version-mode rule that empty version → Yellow.

### 0ad38e7 — PDF size optimization
Two-line change in `src/lib/pdf.ts`: html2canvas `scale: 2 → 1.5` plus `pdf.addImage('PNG') → ('JPEG')` at quality 0.92. A 6-tech Full-Stack report dropped **24 MB → 312 KB (77×)** with no visible quality loss. Status pill now reports "Downloaded 0.3 MB".

### ddb31e7 — Catalog refresh 2.0 (73 → 96 techs, +5 role templates)
Recruiter-driven expansion to cover whole job categories that were missing.

**New role templates (5):** AI / ML Engineer, Data Scientist, SRE / Platform Engineer, Security Engineer (AppSec), QA / Test Engineer.

**New tech categories (2):**
- **Testing (+8):** pytest, jest, vitest, playwright, cypress, selenium, junit, k6 — all version-mode at 2026 versions.
- **Auth / Identity (+5):** `oauth-identity` (checklist on concepts: OAuth 2.0/2.1, OIDC, SAML, JWT, PKCE, passkeys, RBAC…), auth0, clerk, keycloak (version), okta (checklist on features).

**Filled gaps in existing categories (+10):**
- AI/ML: pandas, numpy, jupyter
- Frontend: astro, storybook
- Database: sqlite, supabase (checklist), firebase (checklist)
- Data: flink
- Backend: hono

**Existing role templates modernized:** DevOps now includes `helm` + `observability` (in place of `gcp`/`argocd` that already appeared elsewhere); Data Engineer adds `sql`/`dbt`/`databricks`; Mobile adds `expo`.

## Red-team punch list — final state (all five closed)

| # | Item | Status |
|---|------|--------|
| 1 | Silently dropped `argocd`/`spark` from role templates | ✓ Fixed in `c115ea0` |
| 2 | Degenerate tier mins for fast-movers (Hono, Astro, Vitest, Bun, k6, Pulumi) | ✓ Fixed in `c115ea0` |
| 3 | Asymmetric "I don't remember" — checklist has no equivalent | ✓ Fixed in `20eb852` |
| 4 | Unverified version-mode entries (~45 from yesterday's batch agent) | ✓ Closed in `f287768` — full 45/45 sample verified; 3 precision bumps applied. |
| 5 | Zero automated tests on scoring logic | ✓ Fixed in `dd86cd2` — 41 tests across 3 files |

### What landed today (2026-05-15)

**Item 3 — `20eb852`:** Checklist mirror of `unknownVersion`. `AssessmentItem.checklistUnsure` (defaults false). When true: forces Yellow "Review / Probe — candidate unsure", disables the checkbox grid (dimmed via `opacity-50 pointer-events-none`), skips depth adjustment so deep+unsure can't auto-green. Toggling off restores prior selections (non-destructive). Files: `types.ts`, `lib/scoring.ts`, `store/assessment.ts`, `components/TechCard.tsx`. Verified in browser end-to-end on the SQL card.

**Item 5 — `dd86cd2`:** Vitest 2.1.9 + 41 unit tests across `src/lib/__tests__/version.test.ts` (13), `src/lib/__tests__/scoring.test.ts` (20), `src/data/__tests__/integrity.test.ts` (8). Scripts: `npm test` (run once) and `npm run test:watch`.

- **Vitest pinned to v2, not v4** (which is in our own catalog) because Vitest 4 imports `styleText` from `node:util` which needs Node 20.12+, and this dev env runs Node 18.20. Revisit when Node ships at ≥20 here.
- **`parseVersion` was made `export`** in `lib/version.ts` to test it directly.
- **Integrity test caught one catalog quirk:** Snowflake's `currentVersion: "Current (rolling)"` (intentional — managed service, no user-facing version). Since `currentVersion` is display-only and never fed to `compareVersions`, the test was relaxed to drop the parseability check on that field. Tier `min` parseability — which IS used in scoring — still asserted.

### Item 4 — what the full version sweep found (commit `f287768`)

Cross-checked the remaining 16 unsampled techs in a single parallel `gh api` pass plus three WebFetch lookups for Apache + Databricks (which don't publish to GitHub releases).

- **13/16 matched current upstream within a patch** (cosmetic drift, no change): PyTorch 2.12.0, TensorFlow 2.21.0, pandas 3.0.3, numpy 2.4.4, scikit-learn 1.8.0, JupyterLab 4.5.7, dbt-core 1.11.10, DuckDB 1.5.2, Airflow 3.2.1, HF Transformers 5.8.1, LangChain 1.3.1, Spark 4.1.0, Flink 2.2.1.
- **3 precision bumps applied**:
  - `elasticsearch` "9" → **"9.4.1"** (RESUME called this out)
  - `clickhouse` "26.1" → **"26.4"** (was 3 minors stale; 26.4 is current stable, 26.3 is the LTS line)
  - `databricks` "17.3" → **"18.2 (17.3 LTS)"** (DBR 17.3 is now the LTS line as of Oct 2025; DBR 18.2 is the May 4 2026 standard release; tier note refreshed)
- **No tier mins changed** — the existing bands are conservative enough that the observed drift doesn't push any candidate into the wrong tier. Cosmetic display precision was the only actionable gap.

## What's verified today (2026-05-15)

1. **Vitest suite green:** 41/41 tests across version / scoring / integrity. `npm test` runs in ~2 s.
2. **Production build clean:** `tsc -b && vite build` passes; bundle still 1.23 MB / 361 KB gzipped (no change from catalog 2.0).
3. **Playwright — `checklistUnsure` end-to-end on SQL card:**
   - Add SQL → Yellow "Not yet assessed — 0/12 services" (untouched default).
   - Tick 3 services → Yellow "Review / Probe — 3/12 services".
   - Click "Candidate unsure" → button turns amber, badge → Yellow "Review / Probe — candidate unsure", all 12 checkboxes disabled, grid dimmed (`opacity-50 pointer-events-none`).
   - Click "Candidate unsure" again → restores Yellow "Review / Probe — 3/12 services" with the same 3 ticks intact (non-destructive toggle).
4. **Catalog version pass (16 techs):** all matched upstream within a patch except the 3 precision bumps committed in `f287768`. Tier mins unchanged.

### Previously verified (still holds — 2026-05-14)

1. SQL checklist transitions: 0/12 untouched → Yellow "Not yet assessed"; 3/12 → Yellow; 8/12 → Green "Good"; ticked-then-unticked back to 0 → Red "Concern" (touched flag persists).
2. Bun version-mode: empty → Yellow (unknown rule); `1.3` → Green "Excellent".
3. Full-Stack template + PDF export: 312 KB, multi-page A4, radar + tier chips render cleanly.
4. 12 role templates + Custom render on landing; AI / ML Engineer template preloads its 8 expected techs; `oauth-identity` is searchable.

## Catalog state (unchanged from 2026-05-14)

```
AI/ML            (10)  huggingface-transformers, jupyter, langchain, llm-api-sdk,
                       numpy, pandas, pytorch, scikit-learn, tensorflow, vector-db
Auth / Identity  ( 5)  auth0, clerk, keycloak, oauth-identity, okta
Backend          (16)  bun, django, dotnet, express, fastapi, fastify, flask,
                       graphql, grpc, hono, laravel, nestjs, nodejs, rails,
                       spring-boot, trpc
Cloud            ( 3)  aws, azure, gcp
Data             ( 6)  airflow, databricks, dbt, flink, kafka, spark
Database         (11)  clickhouse, duckdb, elasticsearch, firebase, mongodb,
                       mysql, postgresql, redis, snowflake, sqlite, supabase
DevOps           (11)  ansible, argocd, docker, github-actions, gitlab-ci, helm,
                       jenkins, kubernetes, observability, pulumi, terraform
Frontend         (11)  angular, astro, nextjs, react, storybook, svelte, tailwind,
                       typescript, vite, vue, webpack
Language         (10)  c, cpp, csharp, go, java, javascript, php, python, rust, sql
Mobile           ( 5)  expo, flutter, kotlin, react-native, swift
Testing          ( 8)  cypress, jest, junit, k6, playwright, pytest, selenium, vitest
TOTAL            96
```

**Role templates (12 + Custom):** Full-Stack, Frontend, Backend, Solution Architect, DevOps, SRE, Data Engineer, Data Scientist, AI/ML Engineer, Mobile, Security (AppSec), QA, Custom.

## Known non-blockers

- `npm audit` still reports 4 vulns (3 moderate, 1 critical) in transitive deps (likely `jspdf` / `html2canvas`). Client-only internal tool — acceptable; revisit before any wider distribution.
- Vite build warns chunk > 500 KB (bundle 1.23 MB / 361 KB gzipped after catalog 2.0). Acceptable for an internal tool; code-splitting deferred.
- Cosmetic: on the Summary screen, the sticky site header briefly overlaps the "Strengths" section title on scroll. Pre-existing.
- **Vitest pinned to v2.1.9 (not v4.x in our own catalog)** because v4 needs Node ≥ 20.12 and this env runs Node 18.20. Bump when the env's Node upgrades.
- **Tier 2 / Tier 3 catalog candidates left out of scope** by design (Focused refresh, not Comprehensive): Astro and Storybook are in but missing Solid, Remix, Qwik, Bun-as-runtime alternatives like Deno, Phoenix/Elixir, message brokers beyond Kafka (RabbitMQ, NATS), Cassandra/DynamoDB/Neo4j, Vault/Crossplane, edge/PaaS (Vercel/Netlify/Cloudflare Workers/Fly.io), CMS (WordPress/Contentful/Sanity), Enterprise (Salesforce/SAP/Workday), Game engines (Unity/Unreal/Godot), Embedded (Arduino/ESP32/FreeRTOS), Blockchain (Solidity). Promote if recruiters ask.

## How to resume

```bash
cd /home/salinss/devtools/techvet
npm run dev    # http://localhost:5173
npm test       # 41 unit tests, ~2 s
```

If the browser was left open from a previous session, clearing `sessionStorage['techvet-session']` resets to a fresh assessment.

## Quick smoke test

```bash
npx tsc -b && npx vite build   # types + production bundle
npm test                       # 41/41 tests should pass
npm run dev                    # then verify in browser:
                               #   - SQL added → Yellow "Not yet assessed"
                               #   - Tick 3/12 → Yellow "Review / Probe — 3/12"
                               #   - Click "Candidate unsure" → Yellow "candidate unsure", grid dimmed
                               #   - Click again → restores 3/12 state
                               #   - Bun "1.3" → Green "Excellent"
                               #   - 12 role templates + Custom on landing
```
