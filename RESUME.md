# Resume point — TechVet (2026-05-15 EOD — three priority fixes from 12-session adversarial sim shipped)

**Status:** clean working tree. `npx tsc -b` clean; `npm test` passes **70/70**; `npx vite build` clean (1.23 MB / **363 KB gzipped**, +3 KB from start-of-day). The big work today was a 12-session multi-agent adversarial simulation across every role template, followed by shipping the three highest-priority fixes from the cross-cut. Six more priority items remain — see "What's next" at the bottom.

## Today's commits (2026-05-15, full timeline)

```
7d574aa  Add tri-state for tech relevance: knows / forgot / not-used
72f6810  Add "Other technologies in these categories" prompt before Summary
f2001c6  Fix 5 code bugs surfaced by 12-session adversarial review
c92e326  Add regression tests for red-team items 1 and 2
60a2697  Update RESUME.md for 2026-05-15 EOD — punch list cleared
f287768  Refresh version display for Elasticsearch, ClickHouse, Databricks
dd194a4  Update RESUME.md for 2026-05-15 EOD — items 3 & 5 landed
dd86cd2  Add Vitest + 41 unit tests for version, scoring, catalog integrity
20eb852  Add "Candidate unsure" toggle to checklist mode
```

## Sequence of the day

1. **Morning** — cleared yesterday's red-team punch list (commits `20eb852`, `dd86cd2`, `f287768`).
2. **Adversarial self-review** — wrote a critique of own work. Argued today's eng-hygiene didn't move the recruiter-screening-usefulness needle.
3. **Regression tests for the two red-team bugs** (`c92e326`) — locked `EXPECTED_ROLE_TECHS` and `EXPECTED_FAST_MOVER_TIERS` snapshots; mutation-tested both detectors.
4. **12-session multi-agent simulation** — 12 parallel general-purpose agents, each playing one fictional candidate + recruiter across one role template (see "Cast" below). Each agent read the source, simulated the 25-min call, predicted scoring output, and reported friction / accuracy / catalog-gap findings.
5. **Cross-cut synthesis** — distilled patterns by frequency across all 12 sessions. Identified **5 actual code bugs** and **4 structural defects**.
6. **Shipped Bug-1 through Bug-5** (`f2001c6`) — half-day of code, +16 regression tests.
7. **Shipped priority #2: Category prompt** (`72f6810`) — new `CategoryPrompt` component renders before Summary, surfaces in-catalog techs in already-represented categories.
8. **Shipped priority #3: Tri-state for tech relevance** (`7d574aa`) — `notUsed` boolean added; "Not in stack" button on every version-mode card; Summary filters skipped items from buckets/radar and renders a separate gray section.

Tests went **41 → 49 → 65 → 70** across the day; production build went **361 KB → 363 KB gzipped**.

## The 12-session adversarial simulation (cast + setup)

12 fictional-but-realistic candidates, each paired with one role template. Agents played BOTH the recruiter (non-technical) AND the candidate, walked through TechVet end-to-end, predicted Green/Yellow/Red verdicts, and reported flaws. Each produced a ~700-900 word structured findings doc; cross-cut delivered in chat.

| # | Candidate | Role Template | Headline failure |
|---|-----------|---------------|-----------------|
| 1 | Maya Chen — Sr Frontend / FinPivot | Frontend Engineer | 5/5 Green sweep hides senior signal; Storybook (2yr ownership) invisible |
| 2 | Jordan Park — Mid Data Eng / MidSwell | Data Engineer | **9/9 Green sweep for a mid-level** — Snowflake (#1 daily) not in template; Astronomer-managed Airflow → Excellent |
| 3 | Sam Rodriguez — Sr DevOps / MedCohort | DevOps / Platform | Jenkins/AWS/Datadog all dropped; 3/7 Greens are depth-game-adjusted |
| 4 | Priya Nair — Sr ML Platform / HelixCore | AI / ML Engineer | AWS scores Red because SageMaker/Bedrock missing from checklist; `llm-api-sdk` collapses provider distinction |
| 5 | Alex Tan — Lead iOS / LoopHabit | Mobile Engineer | **iOS specialist falsely flattered with Kotlin/RN competence** by `enterpriseStillUsed` misfire |
| 6 | Diego Morales — AppSec / TrustFold | Security Engineer | Template doesn't vet for security — none of Burp/Semgrep/Trivy/Falco/Vault in catalog; reviewer depth has no representation |
| 7 | Hiroshi Yamada — Staff JVM / SettleNorth | Backend Engineer | **"21/17/11 Java fleet" silently scored as 21**; template assumes JS/Py shop |
| 8 | Tomas Lindqvist — Sr Full-Stack / Trailblade | Full-Stack | **Identical 6/6 Green PDF to mid-level Jordan** — strong-senior signal not differentiable |
| 9 | Esi Adjei — QA Lead / WeavePay | QA / Test Engineer | 100% version-mode template for the most checklist-shaped role; Selenium ripped-out 5yr ago → Yellow trap |
| 10 | Aliyah Khan — Principal SA / FieldCue | Solution Architect | 5/5 Green for someone who hasn't typed `kubectl apply` in 2 years; Azure not in template |
| 11 | Robin Yusuf — Staff SRE / TempoStream | SRE / Platform Engineer | Modern obs stack scores **9/14 = 64%** — *below* Green floor; SLOs/error budgets is ONE checkbox |
| 12 | Mei Tanaka — Sr DS / BioFold | Data Scientist | DS-vs-MLE career split unrepresentable; methodology (A/B, causal, Bayesian) has nowhere to live |

## The cross-cut synthesis (still authoritative — refer back tomorrow)

### 5 actual code bugs — ALL FIXED today (`f2001c6`)

1. **`enterpriseStillUsed` tier-level flag ignored.** Type didn't declare it; scoring only read root. 20 catalog entries affected (Selenium, Cypress, pytest, Jest, etc.). Fix: added to `VersionTier` type; scoring reads `tier.enterpriseStillUsed ?? tech.enterpriseStillUsed`.
2. **`parseVersion` collapsed fleet hedges to first token.** "21/17/11" → 21. Hiroshi's Java 11 maintenance burden invisible. Fix: detect `/`, `,`, ` or `, ` and ` separators → pick the MINIMUM. Single-version strings with internal punctuation ("1.10-rc1", "8.4 LTS") unchanged.
3. **"(depth-adjusted from X)" label read as downgrade.** Fix: replaced with "(lifted from X by depth)" everywhere.
4. **Docker tier table only had Green tiers** (24+/0 Excellent/Good). Fix: added Yellow (18-19) + Red (pre-18) bands; tier-level `enterpriseStillUsed:true` on the Yellow band. Regression test pins the 4-color shape.
5. **`enterpriseStillUsed` note fired on empty-version + non-skill.** Sam-Docker/Alex-Kotlin/Hiroshi-Node were getting falsely flattered. Fix: suppress note when `unknownVersion && depth ≤ shallow`. Still fires when depth ≥ working (the managed-platform case).

### 4 structural defects — 2 of 4 partially closed, 2 still open

**D1. PDFs can't distinguish strong-senior from mid-level.** Tomas (8yr senior) and Jordan (mid) produce identical 6-Green PDFs. Aliyah (Principal SA who hasn't typed `kubectl apply` in 2yr) gets 5/5 Green. Root cause: `scoring.ts:31` — depth-lift caps at Green (`if (sev === 0) return { color, adjusted: false }`). No "Senior" tier above Green. **STILL OPEN.**

**D2. Reviewer / architect / auditor depth missing.** Hit explicitly by Diego/Aliyah/Robin/Mei. Depth dropdown is a *doing*-ladder; half of senior eng is reviewing/architecting/gating. **STILL OPEN — this is the recommended next priority (see "What's next").**

**D3. No "N/A / out-of-stack / direction-of-travel" state.** Hit by 9/12 sessions. **PARTIALLY CLOSED (`7d574aa`)** — `notUsed` boolean shipped; UI button "Not in stack" on every version-mode card; Summary excludes from buckets/radar and renders separate gray section. **What's NOT solved:** "abandoned / direction-of-travel" (Hiroshi/GraphQL deliberately-deprecated, Esi/Cypress migrating-off, Sam/Pulumi evaluated-rejected) — still folds into either notUsed or knows-version. A separate `historicallyUsed` axis would capture judgment-as-non-choice.

**D4. Methodology has nowhere to live.** Hit by all 12 senior screens — A/B testing, causal inference, Bayesian, SLOs, error budgets, chaos engineering, DORA, TOGAF, C4, DDD, EventStorming, Well-Architected reviews. None are technologies. Mei's agent quote: *"TechVet currently scores tools, not skills — and senior ICs are differentiated by skills."* **STILL OPEN.**

### Priority-ordered fix list — status

| # | Fix | Effort | Status |
|---|-----|--------|--------|
| 1 | 5 code bugs (above) | 1 day | ✅ `f2001c6` |
| 2 | "What else in this category?" prompt before Summary | 0.5 day | ✅ `72f6810` |
| 3 | Tri-state for tech relevance | 1 day | ✅ `7d574aa` |
| **4** | **Add `scope-of-use` axis** (operator / author / reviewer / architect) | **2-3 days incl. scoring** | **⏳ Next — see below** |
| 5 | Use `lastUsed` in scoring (stale ≥ 2yr → −1 tier) | 1 day | ⏳ |
| 6 | Methodology section with per-role tag list + radar axis | 3-5 days | ⏳ — biggest single open item |
| 7 | "Senior" tier above Green (depth + recency + coverage) | 2 days | ⏳ |
| 8 | Role-aware AWS checklists (or persona-tagged services) | 2 days | ⏳ |
| 9 | Add Security category (SAST/DAST/SCA/IaC/Runtime/Secrets/Frameworks) | 3 days | ⏳ — Security template currently decorative |
| 10 | Catalog refresh round 3 — Snowflake-as-Data, MLflow, W&B, Modal, Vault, Karpenter, Cilium, Linkerd, Chaos Mesh, SwiftUI, Stripe, Prisma, Drizzle, statsmodels, scipy, matplotlib | 2-3 days | ⏳ |
| 11 | Multi-cloud meta-skill + Azure in SA template | 0.5 day | ⏳ — small, high-signal |
| 12 | Single-category radar fallback | 1 day | ⏳ |

## What's next — start here tomorrow

**Recommended next: priority #4 — add a `scope-of-use` axis.** This is the highest-leverage open item. Closes the Jordan-Astronomer / Sam-Helm-via-ArgoCD / Diego-reviewer / Aliyah-architect / Robin-half-managed cluster of misreadings — 9 of 12 sessions hit some flavor of this.

**Concrete plan:**

- Add `scope?: 'operator' | 'author' | 'reviewer' | 'architect' | undefined` to `AssessmentItem` (orthogonal to `depth`).
  - **operator** = "I run this in prod / manage it / `kubectl apply`" (current default-implied)
  - **author** = "I write code that uses it" (Jordan/Spark = notebook author, not operator)
  - **reviewer** = "I review PRs / policies / audit it" (Diego on Terraform; Aliyah on K8s topology)
  - **architect** = "I designed how this gets used" (Aliyah on EDA; Robin on cluster topology)
- New UI control on `TechCard.tsx`: small dropdown next to Depth, label "Scope of use". Defaults to undefined → no change to scoring.
- Plumb into `scoring.ts`:
  - **reviewer / architect** → cap tier at Yellow (the "Diego/Aliyah cap"). They might know the shape but they don't operate. Override the depth-lift in this case.
  - **author** → no cap, but the depth-lift only goes Red → Yellow (not Yellow → Green). Knowing how to use Spark in notebooks ≠ knowing how to operate Spark.
  - **operator** (default) → current behavior unchanged.
- New tests:
  - `scope=reviewer` + depth=very-deep + Green version → still Yellow (caps).
  - `scope=author` + depth=deep + Yellow version → stays Yellow (doesn't lift to Green).
  - `scope=operator` + depth=deep + Yellow → lifts to Green (current behavior).
  - `scope=undefined` → exact current behavior (backward compat).
- PDF: render the scope as a chip next to depth in `Summary.tsx` so the hiring manager sees "Sam — Helm, very-deep, **operator**" vs "Diego — Terraform, deep, **reviewer**". This is the single most decision-relevant fact today.

**Estimated effort:** 2-3 days. Touches types, scoring (~30 lines), TechCard UI, Summary chip render, scoring tests, ~5-7 new test cases.

**Why not start with priority #5 (`lastUsed` in scoring)?** It's smaller (1 day) but closes only the Sam-Ansible / Maya-RN-2022-hackathon failure mode — a single-session pattern. Scope-of-use closes 9 sessions. If you want a quick warm-up, do #5 in the morning then #4 in the afternoon.

## Code state — what's where

**New files today:**
- `src/components/CategoryPrompt.tsx` — surfaces in-category in-catalog techs as one-click chips before Summary.

**Modified files (today's net changes):**
- `src/types.ts` — added `enterpriseStillUsed` to `VersionTier`; added `notUsed` to `AssessmentItem`; added `skipped` to `ResolvedTier`.
- `src/lib/scoring.ts` — Bug 1 (tier-level enterprise flag); Bug 3 (label wording); Bug 5 (empty+shallow suppression); `notUsed` short-circuit (skipped tier).
- `src/lib/version.ts` — Bug 2 (fleet-hedge minimum-pick), `compareArrays` helper.
- `src/data/technologies.json` — Bug 4 (Docker 4-tier shape).
- `src/components/TechCard.tsx` — tri-state controls (Don't remember / Not in stack); gray badge for skipped.
- `src/screens/Assessment.tsx` — `CategoryPrompt` wired in between cards and action bar.
- `src/screens/Summary.tsx` — filter skipped from buckets/radar; new "Not in candidate's stack" section.
- `src/store/assessment.ts` — `addTech` defaults `notUsed: false`.
- `src/index.css` — `.badge-gray` class for the Not-in-stack badge.
- `src/lib/__tests__/version.test.ts` — +5 fleet-hedge tests (13 → 18).
- `src/lib/__tests__/scoring.test.ts` — +5 Bug-1/3/5 tests + 5 Bug-6 (notUsed) tests (20 → 30).
- `src/data/__tests__/integrity.test.ts` — Docker 4-tier shape test (16 → 17).

**Test totals:** 49 → **70** (16 new regression tests for the 5 bugs + 5 for notUsed = 21 new tests today).

## Catalog state — only Docker changed today

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
DevOps           (11)  ansible, argocd, docker (now 4-tier), github-actions,
                       gitlab-ci, helm, jenkins, kubernetes, observability,
                       pulumi, terraform
Frontend         (11)  angular, astro, nextjs, react, storybook, svelte, tailwind,
                       typescript, vite, vue, webpack
Language         (10)  c, cpp, csharp, go, java, javascript, php, python, rust, sql
Mobile           ( 5)  expo, flutter, kotlin, react-native, swift
Testing          ( 8)  cypress, jest, junit, k6, playwright, pytest, selenium, vitest
TOTAL            96
```

12 role templates + Custom — unchanged.

## Known non-blockers (carried forward)

- `npm audit` reports 4 vulns (3 moderate, 1 critical) in transitive deps (likely `jspdf` / `html2canvas`). Client-only internal tool — acceptable.
- Vite build warns chunk > 500 KB. Code-splitting deferred.
- Cosmetic: sticky site header briefly overlaps "Strengths" title on Summary scroll. Pre-existing.
- **Vitest pinned to v2.1.9** (not v4.x in our own catalog) because v4 needs Node ≥ 20.12 and this env runs Node 18.20. Revisit when Node upgrades.

## How to resume tomorrow

```bash
cd /home/salinss/devtools/techvet
npm run dev    # http://localhost:5173 (or 5174 if 5173 was held over)
npm test       # 70 unit tests, ~2 s
```

Clear browser session if needed: `sessionStorage['techvet-session']` and `localStorage['techvet-draft']`.

## Smoke test (verify nothing regressed overnight)

```bash
npx tsc -b && npx vite build   # types + production bundle
npm test                       # 70/70 should pass
npm run dev                    # then in browser:
                               #   - Add SQL → Yellow "Not yet assessed"
                               #   - Tick 3/12 → Yellow "Review / Probe — 3/12"
                               #   - Mobile template + click "Not in stack" on Kotlin
                               #     → gray badge "Not in candidate's stack", version input disabled
                               #   - Summary → 2 Good, "3 additional techs flagged not in candidate's stack"
                               #   - Scroll Summary → "Not in candidate's stack" section with Kotlin/RN/Expo
                               #   - Hiroshi flight check: add Java, type "21/17/11" → tier matches min=11 (Yellow)
                               #     [should NOT match 21=Excellent like before today]
                               #   - Bun "1.3" → Green "Excellent"
                               #   - Frontend template → scroll down → "Other technologies in these categories"
                               #     chip row with Storybook / Astro / Webpack / etc.
```

## Bonus context — the agent IDs for the 12 sims

If we want to send a follow-up to any sim agent for clarification, the IDs are in this conversation's history. They were one-shot and their context is gone with completion, but their final summaries are in the transcript. Round assignments:

- **Round 1** (Frontend/Data/DevOps): Maya `a870ede606ea3d8c7` · Jordan `a565e97f373dcde61` · Sam `a144e2930400e1d6f`
- **Round 2** (AI/ML/Mobile/Security): Priya `a88f128e1ab29c9f6` · Alex `a3517cf21dcb85608` · Diego `a2b029d80c0e6150a`
- **Round 3** (Backend/Full-Stack/QA): Hiroshi `af05b90767d53fe02` · Tomas `add63a022e0932fdb` · Esi `a2ac40c4e26a1e320`
- **Round 4** (SA/SRE/DS): Aliyah `ad39964110935d10c` · Robin `a5e6427d68436f682` · Mei `ac74745b53f227ba2`

If we need a fresh sim for a new candidate shape (e.g. *junior* anything — we only tested mid/senior), spawn a new general-purpose agent with the same brief structure.
