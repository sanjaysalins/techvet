# Resume point — TechVet (2026-05-16 EOD — priority #4 shipped: scope-of-use axis)

**Status:** clean working tree. `npx tsc -b` clean; `npm test` passes **86/86** (was 70 yesterday; +16 scope regression tests); `npx vite build` clean (1.23 MB / **363.6 KB gzipped**, +0.6 KB). Today's work: priority #4 from the 12-session adversarial cross-cut. Closes the cluster of misreadings where reviewers, architects, and notebook-authors got scored like operators (Diego/Aliyah/Robin/Jordan/Sam — 9 of 12 sessions). Five priority items remain — see "What's next" at the bottom.

## Today's commit (2026-05-16)

```
<new>  Add scope-of-use axis (operator / author / reviewer / architect)
```

## Yesterday's commits (2026-05-15)

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

## Sequence of the day (2026-05-16)

1. **Read RESUME.md** — picked up at the recommended priority #4 (scope-of-use axis).
2. **Designed `applyScope()`** — orthogonal to depth, runs *after* `adjustForDepth()`. Three semantics:
   - `reviewer | architect` → hard ceiling at Yellow; erases any depth-lift to Green.
   - `author` → no overall cap, but depth-lift is restricted to Red→Yellow only (Yellow→Green disallowed).
   - `operator | undefined` → pre-scope behavior preserved (backward compat).
3. **Plumbed scope through three scoring paths** — version unknown/empty, version tier-match, checklist coverage. New `composeLabel()` helper centralized the label suffix logic so all three paths render "(capped — X scope)" / "(lifted from Y by depth)" consistently.
4. **UI** — `TechCard.tsx` grid expanded from 2-col → 3-col on `md+` to fit a new "Scope of use" dropdown between Depth and Last used. Amber cap-explanation note replaces the green depth-lift note when the cap fires.
5. **Summary** — scope chip rendered next to Depth in every tier item; cap-explanation italic note above the tier guidance when `tier.scopeCapped`.
6. **Tests** — `+16` regression tests across backward compat, reviewer/architect cap, author depth-restriction, checklist-mode scope, and interactions with `notUsed` and `enterpriseStillUsed`.
7. **Browser smoke** — verified end-to-end: React (v19, very-deep, reviewer) → badge `Review / Probe (capped — reviewer scope)` with amber cap note; Summary shows scope chip + cap explanation in the Probe Further section. TypeScript (v5.0, deep, author) → natural Green stays Green (author cap only blocks Yellow→Green lifts).

Tests: **70 → 86** (+16). Build: **363 → 363.6 KB gzipped** (+0.6 KB).

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

| # | Fix | Effort (est) | Status |
|---|-----|--------|--------|
| 1 | 5 code bugs from 12-session sim | 1 day | ✅ `f2001c6` (2026-05-15) |
| 2 | "What else in this category?" prompt before Summary | 0.5 day | ✅ `72f6810` (2026-05-15) |
| 3 | Tri-state for tech relevance | 1 day | ✅ `7d574aa` (2026-05-15) |
| 4 | `scope-of-use` axis (operator / author / reviewer / architect) | 2-3 days | ✅ today — shipped in ~1 hr; orthogonal-flag design kept the scoring change to ~30 lines as predicted |
| **5** | **Use `lastUsed` in scoring** (stale ≥ 2yr → −1 tier) | **1 day** | **⏳ Recommended next — see below** |
| 6 | Methodology section with per-role tag list + radar axis | 3-5 days | ⏳ — biggest single open item |
| 7 | "Senior" tier above Green (depth + recency + coverage) | 2 days | ⏳ |
| 8 | Role-aware AWS checklists (or persona-tagged services) | 2 days | ⏳ |
| 9 | Add Security category (SAST/DAST/SCA/IaC/Runtime/Secrets/Frameworks) | 3 days | ⏳ — Security template currently decorative |
| 10 | Catalog refresh round 3 — Snowflake-as-Data, MLflow, W&B, Modal, Vault, Karpenter, Cilium, Linkerd, Chaos Mesh, SwiftUI, Stripe, Prisma, Drizzle, statsmodels, scipy, matplotlib | 2-3 days | ⏳ |
| 11 | Multi-cloud meta-skill + Azure in SA template | 0.5 day | ⏳ — small, high-signal |
| 12 | Single-category radar fallback | 1 day | ⏳ |

## What's next — start here tomorrow

**Recommended next: priority #5 — use `lastUsed` in scoring.** Smallest open item (1 day), closes the Sam-Ansible / Maya-RN-2022-hackathon "stale tech still scoring Green" failure mode. With scope shipped, this is the highest-signal small fix left.

**Concrete plan:**

- Parse `item.lastUsed` (free-text today, e.g. "current role", "2 years ago", "2021") in `lib/lastUsed.ts` — return a coarse bucket: `current | recent (≤1yr) | stale (≥2yr) | ancient (≥5yr) | unknown`.
  - Forgiving parser: accept "current", "now", "this role", "today", year strings (2020-2026), relative phrases ("3 years ago", "last year"). Default to `unknown` on anything ambiguous.
- Plumb into `scoring.ts` after scope (so the order is: tier → depth → scope → recency):
  - `stale` → −1 tier (Green → Yellow, Yellow → Red).
  - `ancient` → −1 tier *and* set `recencyConcern: true` for a stronger note.
  - `current | recent | unknown` → no adjustment (unknown is the safe default; don't penalize for an empty field).
- New `ResolvedTier.recencyAdjusted: boolean` + `recencyNote?: string` for surface in TechCard and Summary.
- Interactions:
  - Scope cap takes precedence: if reviewer caps Green→Yellow, recency doesn't further drop to Red unless `ancient`.
  - notUsed still short-circuits — recency never runs.
- Tests (~6-8): "current" stays Green; "2021" (= 5yr ago as of today 2026-05-16) drops Green→Yellow; "2018" drops Yellow→Red and fires `recencyConcern`; empty `lastUsed` → no change; "current role" parses as current; interaction with reviewer cap.
- UI: small recency badge on TechCard (`Current` / `1yr` / `3yr` / `5yr+`) + the recency note ("Stale — last used 3yr ago, expect ramp-up time") in Summary tier items.

**Estimated effort:** 1 day. Touches new `lib/lastUsed.ts`, `scoring.ts` (~20 lines), `TechCard.tsx` (badge), `Summary.tsx` (note), `~8` new tests.

**Why not jump to #6 (methodology)?** It's the biggest remaining open item (3-5 days) and a structurally new axis — needs a design pass first. Worth doing #5 + maybe #11 (Azure in SA template, 0.5d) as quick wins before opening that scope.

## Code state — what's where

**Files modified today (2026-05-16):**
- `src/types.ts` — new `Scope` type (`'operator' | 'author' | 'reviewer' | 'architect'`); added `scope?: Scope` to `AssessmentItem`; added `scopeCapped?: boolean` to `ResolvedTier`.
- `src/lib/scoring.ts` — new `applyScope()` (runs after `adjustForDepth`); new `composeLabel()` helper centralizes the depth-lift / scope-cap label suffix; new `scopeLabel()` exported. Three call sites (unknown-version, tier-match, checklist) updated to flow through `applyScope`.
- `src/store/assessment.ts` — `addTech` defaults `scope: undefined`.
- `src/components/TechCard.tsx` — grid expanded `md:grid-cols-2` → `md:grid-cols-3` to fit new "Scope of use" dropdown between Depth and Last used. New amber italic note when `resolved.scopeCapped`; existing green depth-lift note now only fires when scope didn't cap.
- `src/screens/Summary.tsx` — scope chip rendered inline with Depth in every tier item; new amber italic cap-explanation note above tier guidance when `tier.scopeCapped`.
- `src/lib/__tests__/scoring.test.ts` — +16 regression tests across backward compat, reviewer/architect cap, author depth-restriction, checklist-mode scope, and interactions with `notUsed` / `enterpriseStillUsed`.

**Test totals:** 70 → **86** (+16 scope regression tests today).

## Code state — yesterday's changes (2026-05-15, reference)

**New files:** `src/components/CategoryPrompt.tsx`

**Modified:** `src/types.ts` (`enterpriseStillUsed` on `VersionTier`, `notUsed` on `AssessmentItem`, `skipped` on `ResolvedTier`) · `src/lib/scoring.ts` (Bugs 1, 3, 5, notUsed short-circuit) · `src/lib/version.ts` (Bug 2 fleet-hedge minimum-pick, `compareArrays` helper) · `src/data/technologies.json` (Bug 4 Docker 4-tier shape) · `src/components/TechCard.tsx` (tri-state controls) · `src/screens/Assessment.tsx` (`CategoryPrompt` wired in) · `src/screens/Summary.tsx` (skipped section) · `src/store/assessment.ts` (`notUsed: false` default) · `src/index.css` (`.badge-gray`) · `+11` regression tests across version, scoring, integrity suites.

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
npm test       # 86 unit tests, ~2 s
```

Clear browser session if needed: `sessionStorage['techvet-session']` and `localStorage['techvet-draft']`.

## Smoke test (verify nothing regressed overnight)

```bash
npx tsc -b && npx vite build   # types + production bundle
npm test                       # 86/86 should pass
npm run dev                    # then in browser:
                               #   - Frontend template → React → version "19" + depth "Very deep"
                               #     → badge "Excellent" (Green)
                               #   - Set scope = "Reviewer (reviews / audits)"
                               #     → badge flips to "Review / Probe (capped — reviewer scope)"
                               #     → amber italic note "Verdict capped by scope — reviewer scope can't earn the higher tier..."
                               #   - Set scope back to "— Not specified" → returns to "Excellent"
                               #   - Set scope = "Author" + depth "Deep" + version "17"
                               #     → stays Yellow (author cap blocks Yellow→Green lift)
                               #   - Review Summary → React row shows scope chip "Reviewer (reviews / audits)"
                               #     next to Depth, plus amber italic cap explanation under the tier note
                               #   - Yesterday's regressions also still good:
                               #     · SQL untouched → Yellow "Not yet assessed"
                               #     · Tick 3/12 → Yellow "Review / Probe — 3/12"
                               #     · Java "21/17/11" → matches min=11 (Yellow), not 21
                               #     · Mobile + "Not in stack" on Kotlin → gray badge + excluded from buckets
                               #     · Bun "1.3" → Green "Excellent"
                               #     · Frontend template → "Other technologies in these categories" chip row
```

## Bonus context — the agent IDs for the 12 sims

If we want to send a follow-up to any sim agent for clarification, the IDs are in this conversation's history. They were one-shot and their context is gone with completion, but their final summaries are in the transcript. Round assignments:

- **Round 1** (Frontend/Data/DevOps): Maya `a870ede606ea3d8c7` · Jordan `a565e97f373dcde61` · Sam `a144e2930400e1d6f`
- **Round 2** (AI/ML/Mobile/Security): Priya `a88f128e1ab29c9f6` · Alex `a3517cf21dcb85608` · Diego `a2b029d80c0e6150a`
- **Round 3** (Backend/Full-Stack/QA): Hiroshi `af05b90767d53fe02` · Tomas `add63a022e0932fdb` · Esi `a2ac40c4e26a1e320`
- **Round 4** (SA/SRE/DS): Aliyah `ad39964110935d10c` · Robin `a5e6427d68436f682` · Mei `ac74745b53f227ba2`

If we need a fresh sim for a new candidate shape (e.g. *junior* anything — we only tested mid/senior), spawn a new general-purpose agent with the same brief structure.
