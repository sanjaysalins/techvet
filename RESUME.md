# Resume point — TechVet (2026-05-16 EOD-4 — priority #4 + round-2 fixes A/B/G/J/L + K + K2 shipped; Fix Q next)

**Status:** clean working tree. `npx tsc -b` clean; `npm test` passes **119/119** (+5 K2 integrity tests); `npx vite build` clean (1.24 MB / **~366 KB gzipped**). Six things today:

1. **Priority #4 shipped** — scope-of-use axis. Closes the *named* half of yesterday's 12-session cluster.
2. **Built `simulations/` pipeline + ran 10-session phone-screening round.** 10 independent agents wrote ~19k words of findings into `simulations/rounds/2026-05-16-phone-screening/`. Surfaced **6 code bugs, 10 structural defects, 13+ catalog gaps, 4 substantive pushbacks on shipped work**. Cross-cut + 16-item priority list (A–P) in `cross-cut.md`.
3. **Shipped round-2 top-5 fixes (A/B/G/J/L)** in ~2 hours. The two highest-precision scoring bugs closed; Snowflake/GraphQL/gRPC "Green rubber-stamp" single-tier entries now checklist-mode; untouched template cards excluded from buckets; confirmed-absent + not-discussed are headline chips + prominent sections.
4. **Shipped Fix K — scope-axis UX redesign (hybrid).** Catalog-side `defaultScope: "author"` on all 10 AI/ML libraries so the cap fires automatically without the recruiter touching the dropdown. Interactive `<select>` chip on Summary lets the recruiter tune scope post-call — live verdict update, buckets shift, can move techs between Strengths and Probe Further with one click. Closes the round-2 "scope axis unreachable on phone" finding **for the AI/ML subset only** (see #5 below — round 3 found this insufficient).
5. **Ran round 3: multi-channel × underrepresented roles.** 10 sessions (3 video / 3 async / 4 phone) covering Solution Architect, SRE, Security AppSec, Data Scientist, QA, OSS maintainer, academic→industry, founder→IC, internal transfer, 18yr DBA specialist. **Headline finding: Fix K covers 10 of 96 catalog techs** — 5 of 10 round-3 agents independently named this as their #1 finding. The non-AI/ML cluster (Terraform / K8s / cloud / DB) is still scope-unreachable on phone. Cross-cut + 7 new priorities (K2, Q, R, S, T, U, V) in `simulations/rounds/2026-05-16-multichannel-round-3/cross-cut.md`. New architectural concern surfaced (provenance tagging for async/CV-inferred entries — Fix Q) that round 2's phone-only cast couldn't have caught.
6. **Shipped Fix K2 — template-keyed `techScopes`.** Per Riya's design: per-template per-tech scope hints applied at template-pick time. Solution Architect template now sets `architect` on all 5 preloaded infra/DB techs (kubernetes/terraform/aws/kafka/postgresql); SRE template sets `reviewer` on cluster-build (terraform/aws), workload-layer stays operator-implied; Security template sets `reviewer` on infra (aws/kubernetes/docker/terraform/observability), python/sql/oauth stay operator-implied. **Aaron's failure mode (Kubernetes 1.30 + very-deep + SA → Excellent) now correctly resolves to "Review/Probe (capped — architect scope)" with zero recruiter interaction.** +5 integrity regression tests. Browser-verified end-to-end across 4 templates including Full-Stack backward-compat.

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
| 4 | `scope-of-use` axis (operator / author / reviewer / architect) | 2-3 days | ✅ today — but **phone-screen round found it unreachable in this channel** (see fix K) |
| 5 | Use `lastUsed` in scoring | 1 day | ⏳ — REDESIGN per round 2: must be **asymmetric** (penalize stale Greens + soften stale Reds when version was contemporary). +0.5d = 1.5d total. See cross-cut fix E. |
| 6 | Methodology section with per-role tag list + radar axis | 3-5 days | ⏳ — biggest single open item |
| 7 | "Senior" tier above Green (depth + recency + coverage) | 2 days | ⏳ |
| 8 | Role-aware AWS checklists (or persona-tagged services) | 2 days | ⏳ |
| 9 | Add Security category (SAST/DAST/SCA/IaC/Runtime/Secrets/Frameworks) | 3 days | ⏳ — Security template currently decorative |
| 10 | Catalog refresh round 3 (see fix I for reprioritized order from round 2) | 2-3 days | ⏳ |
| 11 | Multi-cloud meta-skill + Azure in SA template | 0.5 day | ⏳ — small, high-signal |
| 12 | Single-category radar fallback | 1 day | ⏳ |

### Round 2 additions (2026-05-16 phone-screening — see `simulations/rounds/2026-05-16-phone-screening/cross-cut.md` for full evidence)

| # | Fix | Effort | Status |
|---|-----|--------|--------|
| **A** | Drop depth-lift on checklist mode | 0.5 day | ✅ today — closes Vikram Green-from-tutorial. +5 regression tests pinning coverage-is-the-signal |
| **B** | Suppress depth-lift when `unknownVersion=true` | 0.5 day | ✅ today — closes Helm/Storybook/Swift/Docker over-rates from 6 sessions. +5 regression tests |
| **C** | Search aliases + "named-but-not-in-catalog" capture | 1.5 day | ⏳ — highest-frequency friction; Dmitri's vanished techs |
| **D** | `phoneScreenPivot: true` flag on top 3-5 services per checklist | 1.5 day | ⏳ — closes Aisha's 4-of-7-checklist-techs-unworkable |
| **F** | "Managed-platform / toolchain-pinned" as 4th version-axis state | 1.5 day | ⏳ — closes Tomás-Supabase, Hana-Swift, Aisha-Helm; cleaner long-term than B |
| **G** | Auto-exclude untouched template cards from buckets/radar | 0.5 day | ✅ today — closes Priya-Databricks PDF pollution. New `notDiscussed` flag + Summary section + headline chip. +9 regression tests |
| **H** | Backend template = JVM-aware (or stack-family chooser) | 1 day | ⏳ — Sarah + Lin + prior round Hiroshi |
| **I** | Catalog refresh — Vault, Vercel, Stripe, Prisma, SwiftUI, UIKit, Combine, Xcode Cloud, TanStack Query, RTK, Zustand, MLflow, SageMaker-as-AWS-service, Bedrock, Spring Framework, Hibernate, Mockito, Testcontainers, Maven, Gradle, Git, Docker Compose | 3 days | ⏳ — spans 8 of 10 sessions |
| **J** | Snowflake → checklist mode (and audit other `min: "0"` single-tier entries) | 0.5 day | ✅ today — Snowflake/GraphQL/gRPC all converted (audit found 3, not 1). 12 / 10 / 10 services respectively. +4 integrity tests including a global guard against future single-tier `min:0` regressions |
| **K** | Scope-axis UX redesign (hybrid: defaults + post-call chip) | 2 days | ✅ today — `defaultScope` on all 10 AI/ML libs (depth-game now caps automatically); interactive scope chip on Summary with live verdict update. +7 regression tests + 1 integrity guard. Closes 10/10 phone-screening sessions' "scope unreachable" finding. NOTE: does NOT close Vikram natural-Green LangChain — needs Fix O |
| **L** | Surface "Confirmed not in stack" more prominently on Summary + count chip | 0.5 day | ✅ today — first-class h2 sections + headline chip-row for both confirmed-absent and not-discussed |
| **M** | Candidate-context block on report (junior/mid/senior/returner/contractor + years) | 1 day | ⏳ — Marcus/Sarah/Janelle/Priya |
| **N** | `scope=consumer / triggered-by` 5th option for orchestration tools | 0.5 day | ⏳ — do after K |
| **O** | Self-overclaim guard: fast-moving libs max at Yellow without checklist services | 1 day | ⏳ — Vikram natural-Green LangChain |
| **P** | Per-tech depth tooltips | 1 day | ⏳ — Dmitri-Kafka + Sarah scope-confusion |

## What's next — start here tomorrow

**Recommended next: Fix Q — channel/source flag for async provenance (1.5 days).** New from round 3 (Yara/Devon/Min). With K2 shipped, this is the highest-signal open round-3 finding. Async sessions revealed Fix G's `notDiscussed` semantics reward recruiter dishonesty in CV-only mode — guessed version stays scored; left blank disappears. Convergent fix proposal: `channel` flag on `AssessmentMeta` (phone | video | async) with per-channel empty-field semantics, OR per-item `source` enum (probed | inferred-from-cv | self-reported | unknown). Channel flag is cheaper, source field is correct long-term.

After Q: Fix C (named-not-in-catalog capture, 1.5d — 4 round-3 sessions named it), then Fix M (candidate context, 1d), then Fix E (asymmetric `lastUsed`, 1.5d).

Full round-3 priority list + sequencing in `simulations/rounds/2026-05-16-multichannel-round-3/cross-cut.md`.

### Round 3 additions (2026-05-16 multi-channel)

| # | Fix | Effort | Why |
|---|-----|--------|-----|
| **K2** | Template-keyed `techScopes` (Riya's design) | 1.5 day | ✅ shipped today. SA → architect on all 5 infra/DB techs; SRE → reviewer on Terraform+AWS (cluster-build), operator-implied on workload-layer; Security → reviewer on infra. Closes Aaron's Kubernetes 1.30 + very-deep + SA → "Review/Probe (capped — architect scope)" *automatically*. +5 integrity regression tests; 119/119 pass |
| **Q** | `source` field (or `channel` flag) for async provenance | 1.5 day | NEW from round 3. Closes Yara/Devon/Min critique of Fix G in async |
| **R** | Broaden Fix J integrity guard to catch non-zero single-Green-tier rubber-stamps (k6) | 0.5 day | Spotted by Pranav; trivial |
| **S** | `searchAliases` field + sub-service substring-match warning (Vault → Ansible Vault collision) | 1 day | Bug 5 round-3; visible-fumble fix during video screens |
| **T** | "Evaluated / migrated off" 4th tri-state option | 0.5 day | Pranav/Riya + round-1 Sam-Pulumi / Hiroshi-GraphQL carryovers |
| **U** | Security template overhaul (preload actual security stack, depends on Fix I) | 1 day | Tomi: Security template preloads zero security tools |
| **V** | QA template → checklist-mode for Playwright/Selenium | 1 day | Pranav; round-1 Esi carryover |

Round-2 carryovers reprioritized: **Fix C** (named-not-in-catalog capture) bumped to #1 carryover — 4 round-3 sessions named it (Lou/Devon/Tomi/Pranav); cheaper than each catalog refresh. **Fix M** (candidate context) bumped — 3 round-3 sessions confirmed (Eitan/Riya/Min). **Fix O** scope broadened — not just LangChain; also PyTorch/scikit-learn/pandas when version is current (Min/Yara).

### Superseded plan: Fix E — `lastUsed` in scoring (1.5 days) Sarah and Dmitri are the canonical cases. Design must be **asymmetric** per Sarah's session: penalize stale Greens (Sam-Ansible from prior round) AND *soften* stale Reds when the version was contemporary at last-use time (Sarah's Spring Boot 2.5 was current when she left in 2022). Same axis, opposite signs depending on whether the version was current-at-the-time.

Implementation outline:
- Parse `item.lastUsed` (free-text today: "current role", "2 years ago", "2022") in new `lib/lastUsed.ts` → coarse bucket `current | recent (≤1yr) | stale (≥2yr) | ancient (≥5yr) | unknown`.
- Add `versionTier.firstAvailable` (year) to catalog tiers so the scorer can compute "was this version current when last used?"
- Plumb into `scoring.ts` after scope (order: tier → depth → scope → recency):
  - `stale` Green + version-current-at-the-time → no penalty
  - `stale` Green + version-was-already-old-at-the-time → −1 tier
  - `stale|ancient` Red + version-was-current-at-last-use → +1 tier (Red→Yellow softener with "Returner: ramp-up expected" note)
  - All else: no change
- New `recencyAdjusted: boolean` + `recencyNote?: string` on ResolvedTier.
- Interactions: scope cap precedes recency (no double-discount); notUsed still short-circuits.
- UI: small recency chip on TechCard + Summary; lastUsed parser feedback in the input.
- Tests: 8-10 — current parsing, stale parsing, ancient parsing, contemporary-version softening, stale-version penalty, interactions with scope cap.

**After E:** Fix I (catalog refresh, 3 days — Vault, Vercel, Stripe, Prisma, SwiftUI/UIKit/Combine/Xcode Cloud, MLflow, SageMaker-as-AWS-service, TanStack Query, Spring Framework, Hibernate, etc.). Ongoing in parallel.

**Then Fix O** (1 day) — fast-moving libs (LangChain, vector DBs, llm-api-sdk) max at Yellow without checklist services. Closes the Vikram natural-Green case that Fix K cannot reach.

### Reference: original priority #5 plan (PRE-Sarah's design wrinkle, kept for diff)

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

**Files modified today (2026-05-16) — full day:**

**Morning (priority #4 — scope axis):**
- `src/types.ts` — `Scope` type + `scope` on `AssessmentItem` + `scopeCapped` on `ResolvedTier`.
- `src/lib/scoring.ts` — `applyScope()` runs after `adjustForDepth`; `composeLabel()` helper; `scopeLabel()` exported.
- `src/store/assessment.ts` — `scope: undefined` default in `addTech`.
- `src/components/TechCard.tsx` — `md:grid-cols-3` to fit Scope dropdown; scope-cap amber note.
- `src/screens/Summary.tsx` — scope chip inline with Depth; cap-explanation note.
- `src/lib/__tests__/scoring.test.ts` — +16 scope regression tests.

**Afternoon (10-session phone-screening round + cross-cut):**
- `simulations/` — new directory: pipeline README, brief-template, finding-schema; rounds/2026-05-16-phone-screening/ with cast.md, 10 session files (~19k words), cross-cut.md (16-item priority list A-P).

**EOD (round-2 top-5 fixes A/B/G/J/L):**
- `src/types.ts` — `notDiscussed?: boolean` on `ResolvedTier` (Fix G).
- `src/lib/scoring.ts` — **Fix A**: dropped `adjustForDepth` call on checklist coverage path (coverage IS the signal). **Fix B**: dropped `adjustForDepth` on version-mode unknown path (no version evidence to lift). **Fix G**: `notDiscussed` flag set on version-mode empty-no-toggle and checklist 0/N-untouched paths.
- `src/data/technologies.json` — **Fix J**: Snowflake/GraphQL/gRPC all converted from single-tier `min:"0"` rubber-stamps to checklist-mode with curated services (12 / 10 / 10 respectively).
- `src/screens/Summary.tsx` — **Fix G**: `notDiscussed` filtered from `scored`/`buckets`/`radarData`, rendered in new "Not discussed on the call" section. **Fix L**: headline chip-row with `Slash`/`Circle` icons showing confirmed-absent and not-discussed counts; "Confirmed not in candidate's stack" elevated to first-class h2 with positive-coverage-signal framing.
- `src/lib/__tests__/scoring.test.ts` — updated 5 tests for changed behavior (depth-lift no longer fires); +19 new regression tests across Fix A (checklist no lift), Fix B (unknown-version no lift), Fix G (notDiscussed flag transitions).
- `src/data/__tests__/integrity.test.ts` — +4 Fix J tests including a global guard (no single-tier `min:"0"` entries ever again) + per-tech checklist-shape pins for Snowflake/GraphQL/gRPC.

**Test totals:** 70 → 86 (scope) → 107 (round-2 fixes A/B/G/J) → **114** (Fix K). +28 regression tests today total.

**EOD-2 (round-2 Fix K — scope-axis UX redesign):**
- `src/types.ts` — added `defaultScope?: Scope` to `Technology` (catalog-level scope default).
- `src/lib/scoring.ts` — `resolveTier` computes `effectiveScope = item.scope ?? tech.defaultScope` and passes through `itemWithEffectiveScope` to the version/checklist paths. Explicit user choice always wins; the existing applyScope logic doesn't need to change.
- `src/data/technologies.json` — added `"defaultScope": "author"` to all 10 AI/ML category libs (pytorch/tensorflow/langchain/huggingface-transformers/llm-api-sdk/vector-db/scikit-learn/pandas/numpy/jupyter). Surgical sed insertion preserved the existing per-entry formatting.
- `src/components/TechCard.tsx` — scope dropdown's empty option shows `— Use default: author` when a catalog default exists. Amber cap-explanation note uses `item.scope ?? tech.defaultScope` and adds a "catalog default; override in Scope dropdown above" hint when the cap came from the default.
- `src/screens/Summary.tsx` — new `ScopeChip` component: interactive `<select>` styled as a chip; reads/writes via `useAssessment.updateItem`; verdict re-resolves and buckets shift live as the recruiter changes scope post-call. New "Tune scope before exporting" banner above `#report-root` (outside the PDF capture area) when any scored tech has implicit scope.
- `src/lib/__tests__/scoring.test.ts` — +6 Fix K regression tests covering default-applies, explicit-overrides, natural-Green-unaffected (Vikram non-closure documented), reviewer-default-caps-natural-Green, backward-compat, and checklist-mode parity.
- `src/data/__tests__/integrity.test.ts` — +1 integrity guard: every AI/ML category tech must carry `defaultScope: "author"`. Loud regression if a future agent adds a lib without it.

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
