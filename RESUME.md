# Resume point — TechVet (2026-05-14 EOD)

**Status:** clean working tree. Yesterday's uncommitted work plus today's five additions are all committed to `main`. RESUME.md's previous TODO list is empty.

## Today's commits

```
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

## What's verified today (Playwright)

1. SQL checklist: 0/12 untouched → Yellow "Not yet assessed"; 3/12 → Yellow "Review / Probe"; 8/12 → Green "Good"; ticked-then-unticked back to 0 → Red "Concern" (touched flag persists).
2. Bun version-mode: empty version → Yellow (unknown rule); `1.3` → Green "Excellent".
3. Full-Stack template + PDF export: 312 KB, multi-page A4, radar + tier chips render cleanly. "Not yet assessed" badge renders correctly in PDF.
4. 12 role templates + Custom render on landing; AI / ML Engineer template preloads its 8 expected techs; `oauth-identity` is searchable.

## Catalog state (2026-05-14)

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
- Cosmetic: on the Summary screen, the sticky site header briefly overlaps the "Strengths" section title on scroll. Pre-existing, not from any 2026-05-14 change.
- **Tier 2 / Tier 3 catalog candidates left out of scope** by design (Focused refresh, not Comprehensive): Astro and Storybook are in but missing Solid, Remix, Qwik, Bun-as-runtime alternatives like Deno, Phoenix/Elixir, message brokers beyond Kafka (RabbitMQ, NATS), Cassandra/DynamoDB/Neo4j, Vault/Crossplane, edge/PaaS (Vercel/Netlify/Cloudflare Workers/Fly.io), CMS (WordPress/Contentful/Sanity), Enterprise (Salesforce/SAP/Workday), Game engines (Unity/Unreal/Godot), Embedded (Arduino/ESP32/FreeRTOS), Blockchain (Solidity). Promote if recruiters ask.

## How to resume

```bash
cd /home/salinss/devtools/techvet
npm run dev   # http://localhost:5173
```

If the browser was left open from a previous session, clearing `sessionStorage['techvet-session']` resets to a fresh assessment.

## Quick smoke test

```bash
npx tsc -b && npx vite build   # types + production bundle
npm run dev                    # then verify in browser:
                               #   - SQL added → Yellow "Not yet assessed"
                               #   - Tick 8/12 → Green "Good"
                               #   - Bun "1.3" → Green "Excellent"
                               #   - Export PDF → "Downloaded 0.3 MB"
```
