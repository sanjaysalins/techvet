# Resume point — TechVet (2026-05-17 mid-day — rounds 8/9/10 shipped; saturation marker reached)

---

## 👋 Pick up here

**Repo state — clean as of 2026-05-17 ~13:35.**

- Working tree clean (last commit `a4d7b73`). 3 ship batches today across rounds 8, 9, 10 of adversarial validation (16 items shipped across 8A-8E, 9A-9E, 10A-10C).
- `npx tsc -b` clean. `npm test` → **291/291 pass** (+16 today). `npx vite build` clean (1.29 MB / ~379 KB gzipped). Catalog **107 entries** / **15 templates** (DE template +1 preload, DevOps +1 preload, Fullstack +2 preloads + 6 chips, QA chips +2, AI/ML +3 scope locks).
- **Saturation marker reached.** Rounds 9 + 10 both came in at **5 Safe / 1 At-risk / 0 Unworkable** — the single At-risk in each round was on a never-validated terrain path that named-its-fix on the spot and was shipped in the same cycle. Round-by-round: round 3 (0/7/3) → round 6 (2/4/0) → round 7 (3/3/0) → round 8 (2/4/0) → **round 9 (5/1/0)** → **round 10 (5/1/0, on a NEW diverse cast)**.

**What's next (in priority order):**

1. **Run a catalog-refresh batch** (NOT another validation round). Round-10 cross-cut explicitly recommends this as the next valuable work — saturation means the structural redesigns are converged. ~6 hr batch:
   - **DevOps catalog (Lars rounds 9-10, ~3 hr):** Argo Rollouts / Karpenter / Backstage / Unleash / Crossplane / cosign-SLSA — six canonical 2026 platform-eng entries still named-only. Each ~30 min catalog work copy-modifying e.g. the Helm or Vault entries.
   - **AI/ML catalog (Esme round 9, ~2 hr):** Braintrust (LLM evals) / Evidently (drift detection) / Feast (feature store) / Langfuse (LLM observability). Each productionization-canonical.
   - **QA catalog (Akira round 9, ~1 hr):** Pact (checklist-mode, contract testing — Akira's biggest project) / Cucumber (version-mode, BDD).
   - **iOS UIKit catalog (Kenji rounds 7-8, deferred):** ~30 min checklist-mode entry — UIView programmatic / Storyboards / Auto Layout / UIViewController lifecycle / Combine bridging / accessibility / UIViewRepresentable interop. For migration-shop iOS shapes.

2. **Small UI / scoring polish items** (each ~5-15 LOC):
   - **9B copy polish (Anil round 10):** "review/architect-shape signal" reads clinical for non-engineer recruiters. Replace with "Architect-scope verdict — designs how it gets used, doesn't operate it day-to-day."
   - **J4** — hide Scope dropdown on `meta.seniority === 'junior'` (Mei+Eitan ~20s tax across rounds 6-10).
   - **J5** — level-fit copy line below headline cards (seniority-aware framing).
   - **Storybook catalog entry** (Maya M2 round 8, deferred) — checklist-mode senior FE governance.

3. **Larger structural items deferred** (each half-day to day):
   - **Custom flow stack-focus picker** (Theo FT-2 round 10) — without serviceTagFilters on AWS, generalist on Custom reads "Concern" at 3/26 services. Could ship a starter "What kind of stack?" picker that applies category tag filters.
   - **K8s hybrid mode** (Sven R5 round 7, deferred) — version-mode only; Helm-chart-consumers have no service-slice signal. Needs new `vetMode: 'hybrid'`.
   - **Postgres checklist mode** (Lina F3 round 10) — currently version-mode only; senior DB signal (schema design / indexing / partitioning / replication / JSONB / VACUUM) goes to suggestedProbes which doesn't render in the report. Architectural change.
   - **GCP Identity Platform catalog** — Round 10 added AWS Cognito; verify parallel AWS Azure GCP auth coverage.

**How to verify nothing regressed before starting work:**

```bash
cd ~/devtools/techvet
git status                   # should be clean (a4d7b73 is HEAD)
npx tsc -b                   # types clean
npm test                     # 291/291 pass
npx vite build               # builds clean ~10s
npm run dev                  # boots ~1s; visit http://localhost:5173
                             # smoke 4 things:
                             #   1. Pick AI/ML template — PyTorch / LLM API SDK / Vector DB cards arrive scope-locked to operator (no "Use default: author").
                             #   2. Pick Fullstack template — 8 preloaded techs (incl. nextjs + tailwind); Methodology section shows 6 chips.
                             #   3. Pick SA template, leave Azure at 5/13 services, scope=architect → label "(capped — architect scope)" with no "from Good".
                             #   4. Junior + Frontend + TS 5.3 + shallow → card AND side panel both read "Review/Probe (lowered from Good by shallow depth)".
```

**Pointers:**
- `CLAUDE.md` — codebase notes (stack, scoring quirks, Tailwind config gotchas, what's verified).
- `simulations/rounds/` — **10 rounds** of adversarial agent findings (~100k+ words across ~58 sessions). `cross-cut.md` in each round is the synthesis + priority list. Most recent: `2026-05-17-round-10-saturation-validation/cross-cut.md`.
- Today's commits: `54fc806` (batch 8), `2637da3` (batch 9), `a4d7b73` (batch 10).
- The numbered log below this section is reverse-chronological history. Skim if needed; not pickup material.

**Flagged for review (autonomous-session caveats):**
- 8B's new TechCard "Verdict bounded by scope" italic copy: validated mechanically but reads clinical. Decide whether to ship the round-10 copy polish or keep as-is.
- 10A's `design-system-discipline` chip ID is new (vs FE's existing `design-system-ownership`). Different concept (contribution vs ownership) but worth sanity-checking the naming if you intend to unify.
- 9A scope override on AI/ML template assumes the template signals "productionization shape." If a library-author candidate accidentally picks AI/ML template (instead of Custom), they hit the operator override and may need to manually flip back to author on PyTorch/LLM-API-SDK/Vector-DB. HuggingFace stays at catalog default for this exact reason.

---

## 2026-05-17 mid-day autonomous block — rounds 8/9/10 (+ 3 ship batches, +16 tests)

User ran a ~3.5 hour Ralph-loop while away. Three rounds + three ship batches.

**31. Shipped round-10 batch (10A–10C) — Fullstack template chips + AWS Cognito + Next/Tailwind preload.** Closes Lina's first-ever Fullstack template At-risk finding. Same shape as 7A Sven-Backend (template-without-chips). Tests: 288 → 291. Commit `a4d7b73`.

**30. Ran round 10 — saturation validation.** 6 sims: 3 redux (Esme/Anil/Lars validating batch 9) + 3 new shapes (Lina Senior Fullstack / Vikram-redux library-author on Custom / Theo mid-senior generalist on Custom). **Distribution: 5 Safe / 1 At-risk / 0 Unworkable** — saturation confirmed (identical to round 9 on a NEW diverse cast that pushed into 3 never-validated paths). K2 catalog default + 9A template override coexist correctly; Custom flow works end-to-end for clean shapes; first-ever Fullstack validation surfaced 3 surgical fixes.

**29. Shipped round-9 batch (9A–9E) — AI/ML productionization scope override + 4 cleanup items.** Closes Esme's At-risk. 9A added template-level `techScopes: { pytorch: 'operator', llm-api-sdk: 'operator', vector-db: 'operator' }` to AI/ML template (HuggingFace stays at catalog default — genuine scope ambiguity). 9B branches capped-by-scope italic copy on cappedFromColor presence. 9C suppresses tautological softener label when finalLabel === baseLabel. 9D refreshes QA chip-set + drops Selenium from preload. 9E adds Vault to DevOps preload. Tests: 283 → 288. Commit `2637da3`.

**28. Ran round 9 — post-8E validation.** 6 sims: 3 redux (Mei/Anil/Pooja validating batch 8) + 3 new shapes (Lars senior DevOps / Akira senior QA / Esme senior AI/ML productionization). **Distribution: 5 Safe / 1 At-risk / 0 Unworkable** — best to date. DevOps + QA templates first-ever validations both ship at ~75% out-of-box. AI/ML's K2 author-default mismatched productionization shape.

**27. Shipped round-8 batch (8A–8E) — UI parity fix + Yellow-base architect cap + cross-platform chip rewrite + DE template fixes + FE chip swap.** 8A passed seniority to TechCard.tsx:resolveTier (card-vs-panel divergence closed). 8B set scopeCapped on Yellow-base architect (Anil's Azure surfaces). 8C rewrote mobile-XP chips (KMP wrong-axis dropped, OTA + two-store added). 8D added Snowflake preload + Postgres/Kafka reviewer techScopes + lineage/CDC chips to DE template. 8E swapped progressive-enhancement for bundle-size-budgets on FE. Tests: 275 → 283. Commit `54fc806`.

**26. Ran round 8 — post-7F validation.** 6 sims: 3 redux (Mei/Anil/Kenji) + 3 new (Maya senior FE / Pooja senior DE / Diego mobile cross-platform). Distribution: 2 Safe / 4 At-risk / 0 Unworkable. Surfaced UI rendering gap for 7D lowered direction, applyScope branch missing Yellow-base cap, mobile-XP chip quality defects, DE template first-ever validation.

---

**Status (pre-2026-05-17 autonomous block):** clean working tree. `npx tsc -b` clean; `npm test` passes **275/275** (+49 today); `npx vite build` clean (1.24 MB / **~374 KB gzipped**). Catalog: **107 entries** across 12 categories. **15 role templates** (Mobile split 1 → 3). Twenty-eight things today:

1. **Priority #4 shipped** — scope-of-use axis. Closes the *named* half of yesterday's 12-session cluster.
2. **Built `simulations/` pipeline + ran 10-session phone-screening round.** 10 independent agents wrote ~19k words of findings into `simulations/rounds/2026-05-16-phone-screening/`. Surfaced **6 code bugs, 10 structural defects, 13+ catalog gaps, 4 substantive pushbacks on shipped work**. Cross-cut + 16-item priority list (A–P) in `cross-cut.md`.
3. **Shipped round-2 top-5 fixes (A/B/G/J/L)** in ~2 hours. The two highest-precision scoring bugs closed; Snowflake/GraphQL/gRPC "Green rubber-stamp" single-tier entries now checklist-mode; untouched template cards excluded from buckets; confirmed-absent + not-discussed are headline chips + prominent sections.
4. **Shipped Fix K — scope-axis UX redesign (hybrid).** Catalog-side `defaultScope: "author"` on all 10 AI/ML libraries so the cap fires automatically without the recruiter touching the dropdown. Interactive `<select>` chip on Summary lets the recruiter tune scope post-call — live verdict update, buckets shift, can move techs between Strengths and Probe Further with one click. Closes the round-2 "scope axis unreachable on phone" finding **for the AI/ML subset only** (see #5 below — round 3 found this insufficient).
5. **Ran round 3: multi-channel × underrepresented roles.** 10 sessions (3 video / 3 async / 4 phone) covering Solution Architect, SRE, Security AppSec, Data Scientist, QA, OSS maintainer, academic→industry, founder→IC, internal transfer, 18yr DBA specialist. **Headline finding: Fix K covers 10 of 96 catalog techs** — 5 of 10 round-3 agents independently named this as their #1 finding. The non-AI/ML cluster (Terraform / K8s / cloud / DB) is still scope-unreachable on phone. Cross-cut + 7 new priorities (K2, Q, R, S, T, U, V) in `simulations/rounds/2026-05-16-multichannel-round-3/cross-cut.md`. New architectural concern surfaced (provenance tagging for async/CV-inferred entries — Fix Q) that round 2's phone-only cast couldn't have caught.
28. **Shipped 7D / 7E / 7F as one batch — junior depth-down + flag audit + Mobile sub-templates.** Closes the remaining three round-7 cross-cut priorities, clearing the 7A–F list end-to-end:
    - **7D — Junior J1 (Mei + Eitan).** `adjustForDepth` extended to accept seniority + return a `direction: 'lifted' | 'lowered'`. When `seniority === 'junior'` AND `depth === 'shallow'`, tier lowers one step (Green → Yellow, Yellow → Red; Red is the floor). New `depthDirection?: 'lifted' | 'lowered'` on `ResolvedTier` threaded through applyScope + applyRecency. composeLabel renders `"(lowered from Good by shallow depth)"` for the new case. Mei's TS 5.3 + shallow + junior now reads Yellow (was Green identical to senior author). Mid/senior cases unchanged (junior-only gate); deep/very-deep semantics unchanged. Checklist mode unaffected (Fix A still holds — coverage IS the signal there). +8 regression tests.
    - **7E — `enterpriseStillUsed` flag audit (Sven bonus).** Removed root-level flag from 6 modern-default ecosystem entries: kubernetes, kotlin, swift, react-native, terraform, docker. Modern-default versions don't need the "still widely used in enterprise" reassurance — fires the wrong narrative for K8s 1.30 etc. (Sven's bonus finding). Docker keeps its tier-level `enterpriseStillUsed: true` on the Yellow tier (Docker 18-19) — legitimate legacy framing there. +1 integrity guard prevents regression. **K8s hybrid mode** (Sven R5) deferred to a separate design pass — adding services to a version-mode entry needs new vetMode='hybrid' support; out of scope for 7E.
    - **7F — Mobile sub-templates (Priya R3 + Kenji 2nd confirmation).** Replaced single 7-tech `mobile` template with 3 sub-templates: `mobile-android` (kotlin + jetpack-compose, 6 Android-shaped chips), `mobile-ios` (swift + swiftui, 6 iOS-canonical chips including MVVM-C / snapshot testing / VoiceOver), `mobile-cross-platform` (react-native + expo + flutter, 6 cross-platform chips). Single-platform candidates no longer dispatch ~5 not-in-stack clicks. iOS template carries Kenji's load-bearing chips that the old generic Mobile set missed. Templates: 13 → 15. +3 integrity guards. **Defers UIKit catalog entry** (Kenji R1 asymmetric SwiftUI-without-UIKit finding) — separate ~30-min catalog work.
    Tests: 265 → 275 (+10 today; 8 for 7D junior depth-down, 1 for 7E flag audit, 1 net across 7F template guards minus a removed mobile-only assertion). Browser-verified: Landing shows 15 templates with 3 Mobile sub-templates (no generic "Mobile Engineer"); Mei junior TS 5.3 + shallow → `"Review / Probe (lowered from Good by shallow depth)"`; K8s 1.30 no longer fires the enterprise note.

27. **Shipped 7A / 7B / 7C as one batch — Backend chips + neutral softener + 5ξ resolved.** Three top-priority items from round 7 cross-cut, all browser-verified end-to-end:
    - **7A — Backend `methodologyChips`** (6 entries: contract testing / event-driven design / feature flags / OpenTelemetry / idempotency keys / circuit breakers). Closes Sven's round-7 "6F Backend chip-deferral wrong" finding: backend recruiters now see curated chips that anchor senior signal, rather than reading the chip-less section as "not for me."
    - **7B — Neutral 6A softener wording.** Note text changed from `"Stale (X) but was contemporary at last-use — returner shape; expect ramp-up rather than concern"` to `"Stale (X) but the version was current at last-use — defensible older usage; probe whether the candidate is returning to it or deliberately moved off."` Handles returner / moved-off / team-won't-upgrade equally. Closes Sven's round-7 7B finding (his "moved off Lambda 18mo ago" wasn't a returner shape but read as one).
    - **7C — 5ξ structural fix (Anil).** Added `cappedFromColor?: TierColor` to `ResolvedTier`; `applyScope`'s reviewer/architect/author cap branches now set it; `composeLabel` differentiates `"capped from Good by architect scope"` (Staff IC pattern) from plain `"Review / Probe"` (thin coverage). Added new sky/slate-toned **"Scope-capped: N"** 6th headline stat card alongside Methodology + Off-catalog, counting entries with `cappedFromColor === 'green'`. Grid scales 3 → 6 cards based on which extensions fire. Anil's round-6 headline `0G / 5Y / 0R / Meth:6` now reads `0G / 4Y / 1R / Meth:6 / Scope-capped:4` — HM sees "Staff Architect capped by scope" vs "thin coverage" at a glance.
    Tests: 257 → 265 (+8 new for 7C `cappedFromColor` field; 4 prior scope-cap test regexes updated for new label format). Browser-verified: Anil headline shows the 6th card + correct count, label texts updated; operator-scope counter-test cleanly drops to 4-card grid; Sven AWS softener uses neutral wording; Backend template Methodology section renders 6 chips.

26. **Ran round 7 post-6F validation (6 sessions, ~22k words).** Cast: 3 redux (Owen DBA / Anil SA / Mei junior FE — composition stress) + 3 new shapes (Kenji iOS / Sven mid backend / Eitan junior backend). **Results: 3 Safe / 3 At-risk / 0 Unworkable** — best distribution across all 7 rounds. **Owen jumped from At-risk → Safe** (the canonical "fixes converged" win — 6 fixes composed end-to-end on the persona round 6 named as the structural failure case; ~80s reclaimed in the 10-min phone budget). Anil traced 5ξ mechanically (6D fires but `applyScope` zeroes the lift evidence — concrete `cappedFromColor` proposal). Mei + Eitan confirmed 6C cross-role; J1/J4/J5 still open as cross-role junior defects. Kenji surfaced 3 structural defects in the 6F Mobile ship (asymmetric SwiftUI/UIKit, preload scaled wrong way, chip-set 50% miss for native iOS). Sven exposed 6F Backend chip-deferral as wrong + 6A "returner" framing misfires on "moved-off" case + K8s `enterpriseStillUsed` flag audit needed. Cross-cut + 6-item priority list (7A-7F) in `simulations/rounds/2026-05-16-round-7-post-6F-validation/cross-cut.md`.

25. **Shipped 6F — catalog + template refresh (Owen DBA + Priya Mobile + Maya/Mei Frontend).** Closes round-6 6F (medium priority); user picked the focused-subset scope. Four new catalog entries (catalog 103 → 107) + one new role template (12 → 13) + methodologyChips added to Mobile and Frontend templates that previously had none:
    - **Oracle Database** — Database category, checklist-mode, 14 services (RMAN / Data Guard / RAC / partitioning / AWR-tuning / PL/SQL / ASM / Exadata / etc.), `enterpriseStillUsed: true`. Closes Owen's "zero matches for Oracle/PL/SQL/RMAN/Data Guard/RAC" total-catalog-miss.
    - **PL/SQL** — Language category, checklist-mode, 10 services (procedures / packages / triggers / bulk-collect / dynamic-SQL / collections / pipelined functions / exception handling / cursors / DBMS_PROFILER), `enterpriseStillUsed: true`.
    - **Jetpack Compose** — Mobile category, checklist-mode, 12 services (state / side-effects / Material 3 / animation / @Stable performance / Compose Multiplatform / View interop / testing / etc.). Closes Priya's "Compose vs XML split has nowhere to live" finding.
    - **SwiftUI** — Mobile category, checklist-mode, 10 services (@State / Observation framework / NavigationStack / async-await integration / UIViewRepresentable interop / etc.).
    - **Database / DBA template** — new template id `database-dba`, preloads SQL + PL/SQL + Oracle DB + Postgres + MySQL, carries 6 methodology chips (Kimball / 3NF / backup-recovery discipline / HA design / query-plan tuning / capacity planning). Closes Owen template-paralysis.
    - **Mobile template gets 6 methodology chips** — release automation (Fastlane / GH Actions), MVVM/MVI, A/B + feature flags, Crashlytics triage, ABI/screen-density optimization, offline-first patterns. Mobile now also preloads `jetpack-compose` + `swiftui` alongside the existing 5 platform techs.
    - **Frontend template gets 6 methodology chips** — WCAG accessibility, Core Web Vitals / performance budgets, design system ownership, RSC/SSR/streaming, progressive enhancement, visual regression testing. Closes Maya/Mei "Frontend template has no chip set" gap.
    +8 integrity guards pin the new catalog entries (vetMode + service counts + load-bearing service ids like rman-backup/data-guard-ha/rac-clustering), Mobile/Frontend chip presence, and DBA template shape. Browser-verified DBA template flow (5 tech cards + 6 chips + Oracle service list), Mobile template (6 chips + Compose service list), Frontend template (6 chips). 248 → 256 tests pass.

24. **Shipped 6E — Owen-shape inverted-hierarchy fix (two halves).** Closes round-6 cross-cut Bug 6δ. Two coordinated changes in `Summary.tsx`:
    - **6E-a — 5th headline stat card "Off-catalog: N"** when `meta.namedNotInCatalog.length > 0`. Sky-100 background + MessageSquarePlus icon (distinct from emerald Methodology + the tier amber/rose). Grid scales: 3 cards (none) → `grid-cols-2 md:grid-cols-4` (one extension) → `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` (both methodology + off-catalog). Owen's headline `2 Good / 0 Yellow / 0 Concern` (which any HM reads as "thin mid-level signal") now reads `2G / 0Y / 0R / Off-catalog: 5` — senior specialism is visible at headline glance.
    - **6E-b — auto-promote named-only section above Strengths** when `meta.namedNotInCatalog.length > buckets.green.length + buckets.yellow.length + buckets.red.length`. Visual order matches evidence weight. Heading adds a "(promoted — off-catalog evidence outweighs scored)" subscript so the recruiter understands the reorder isn't a bug. When balanced (named ≤ scored), default position after Methodology is preserved.
    No new unit tests (Summary.tsx changes are presentation-only). Browser-verified Owen-shape end-to-end: 4-card grid (no methodology) with Off-catalog=5; section order `Coverage → Named-only (promoted) → Strengths`. Counter-test with 1 named-only vs 2 scored: no promotion, no badge. 248/248 tests still pass; build clean.

23. **Shipped 6D — 5λ coverage redesign (qualified checklist depth-lift).** The 5-rounds-recurring deep-narrow-specialist failure mode (Robin / Cara / Brigit / Tanvir / Owen) closed. New rule in `resolveChecklistTier`: if **coverage ≥ 40% AND depth ∈ {deep, very-deep} AND seniority !== 'junior'**, lift Yellow → Green with `depthAdjusted=true`. Fix A's 25% floor still holds (Vikram protection — 2/12 + very-deep stays Red); reviewer/architect scope still caps the lift; recency still runs after. Owen's hypothetical Oracle 8/14 = 57% + very-deep now reads `"Good (lifted from Review / Probe by depth) — 8/14 services"` instead of buried-Yellow. Junior gate matches 6C's pattern (depth claims from juniors unreliable; require probe, not auto-lift). +11 regression tests covering Owen/Robin shapes, Vikram floor protection, junior gate, scope-cap interaction, recency composition, and the 40% boundary. Browser-verified: SQL 6/12 + very-deep + senior → Good (headline `1/0/0`); flip to junior → Yellow (headline `0/1/0`). Closes round-6 6D priority + folds Owen specialist case into one rule. 5ξ "Senior tier above Yellow" follow-on still open.

22. **Shipped round-6 6A/6B/6C as one batch.** Three fixes addressing the top high-severity findings from round 6:
    - **6A — checklist-mode softener (was deferred 5κ).** Extended `applyRecency` to `resolveChecklistTier` so stale + `enterpriseStillUsed` checklist coverage softens Red→Yellow with the returner note. Also added `enterpriseStillUsed: true` to AWS / Azure / GCP catalog entries — three cloud platforms that genuinely fit the "still around, old usage defensible" flag. Browser-verified: Margarethe's AWS at 2/26 services + `lastUsed=2022` now reads `"Review / Probe (softened from Concern — stale but defensible) — 2/26 services"` with the returner note rendered.
    - **6B — always render Methodology section on Assessment.** Removed the early-return that hid the section when template chips=[] AND entries=[]. Mobile / Frontend / Backend / Custom templates now show the section with a free-text input + hint "No template chips — type any methodology / practice and press Enter to add". Closes round-6 Priya finding: silent regression introduced by 5ι gating logic where recruiter never discovered the free-text capture existed.
    - **6C — gate `enterpriseStillUsed` softener + reassurance note on `seniority !== 'junior'`.** Added optional `opts?: { seniority?: Seniority }` to `resolveTier`; piped through to `applyRecency` + both `enterpriseNote` paths (unknown-version branch + version-mode tier-match). Closes round-6 Mei finding: 5α regressed for juniors on "team hasn't upgraded" stacks (Next.js 12 read as defensible-legacy, masking real App Router gap). Browser-verified: Junior + React 17 (Yellow + enterprise) → NO note; flip to mid seniority → note returns. Penalty branch still fires for juniors (stale Greens still penalize).
    Tests: 226 → 237 (+11 — 8 new for 6C seniority gate, 2 new for 6A checklist softener, 1 reframe of "checklist + stale → no adjustment" since premise inverted).

21. **Ran round 6 post-medium-items validation (6 sessions, 6 sims in parallel, ~17k words).** Cast: 3 redux personas (Yasmin / Anil / Margarethe — validate round-5 fixes landed) + 3 new shapes (Mei junior FE / Owen senior DBA / Priya mid Mobile — push into untested terrain). **Results: 2 Safe / 4 At-risk / 0 Unworkable** (vs round 5's 1/5/0; Yasmin + Anil promoted to Safe). All 9 round-5 fixes landed cleanly on their target redux personas. **Three new structural classes named:** (1) **seniority-blindness** — 5 distinct junior defects in one session, including 5α regression for juniors; (2) **template-shape-blindness** — Methodology section silently hidden on Assessment when chips=[] AND entries=[] (Mobile/FE/Backend affected); (3) **5λ coverage-as-single-axis 5× confirmed** (Robin → Cara → Brigit → Tanvir → Owen — design-and-build now overdue). Cross-cut + 6-item priority list (6A–6F) in `simulations/rounds/2026-05-16-round-6-post-medium-validation/cross-cut.md`.

20. **Shipped round-5 medium items (5η/5θ/5ι — 3 fixes).** Three round-5 cross-cut medium-priority items, all browser-verified end-to-end:
    - **5η** Causal-inference chip on DS template split from one aggregated chip into four: Difference-in-Differences (DiD), Instrumental Variables (IV), Regression Discontinuity (RDD), Propensity scoring / matching. Closes Yasmin's round-5 DS critique that "Causal inference" alone was too coarse for senior DS differentiation. Integrity test asserts all four ids exist and the legacy `causal-inference` id is gone.
    - **5θ** `NamedOnlyEditor` on Summary now async-aware: when `channel === 'async'` and no enrichment fields are filled, renders compact (chip + remove only) with hint "no enrichment (async; verify on next step)". Async sessions have no candidate to enrich against in-call so the full editor was misleading. Phone/video paths unchanged.
    - **5ι** Methodology promoted to **4th headline stat card** parallel to G/Y/R (Yasmin's exact recommendation). Grid is `grid-cols-3` when no methodology, `grid-cols-2 md:grid-cols-4` when methodology fires. Emerald-100 background distinguishes from Good's emerald-50. Lightbulb icon. Closes the round-5 "senior signal invisible at headline glance for async DS whose evidence lives in methodology" finding. Browser-verified both grid paths (DS template with 2 chips → 4-card 4-col; no methodology → 3-card 3-col).
    - **5κ deferred** to coverage redesign (5λ). Fix E softener currently only reaches version-mode techs (lift after tier-match path). Extending it to checklist-mode has design tension — checklist coverage thresholds (<25/25-66/≥66) don't have a natural "stale but defensible" axis without redefining what coverage *measures*. Folded into the round-5 structural finding "coverage-as-single-axis under-rates deep-narrow specialists" — needs the coverage redesign anyway, so fix in that pass instead of patching twice.

19. **Shipped round-5 hot patches (5α-ζ — 6 fixes in ~1.5h).** Six data-only edits closing named composition gaps from round-5 cross-cut:
    - **5α** Fix E softener broadened from `=== 'red'` to all non-Green for enterpriseStillUsed techs. Margarethe's PG 13 + Java 11 Yellow-tier stale now softens with returner note. Label reads `"(softened from Review / Probe — stale but defensible)"` even when color stays Yellow. Preserves upstream `scopeCapped` flag so scope-cap note + softener note coexist on the same card.
    - **5β** SA AWS filter gains `security` tag — Anil's KMS/Macie/GuardDuty/Security Hub/Inspector surface for fin-services SA archetype.
    - **5γ** Backend template gets `serviceTagFilters: { aws: ['general'] }` — Margarethe's manually-added AWS no longer hits the full 26-service list.
    - **5δ** Azure preloaded in SA template with `architect` techScope — Anil's Azure no longer falls through to catalog `defaultScope: "operator"`.
    - **5ε** Removed `slos` from observability checklist — Brigit's D4 chip + obs service double-count closed (SLO is methodology not product).
    - **5ζ** `channelLabel()` capitalizes phone → "Phone", video → "Video panel". Async unchanged. Closes Anil's "Channel: video" lowercase finding.
    Tests: 224 → 226 (+2 — Yellow-tier softener regression + video label). All integrity snapshots updated for SA template addition + AWS filter tag changes. Browser-verified PG 13 + lastUsed=2022 → "softened from Review/Probe" badge + returner note.

18. **Ran round 5 cumulative validation (6 sessions, ~14k words).** First Safe rating in 21 sessions across 3 rounds (Idris/AppSec) — proof-of-concept that the post-fix shape works when every fix lines up. **Fix O sharply validated** end-to-end: Tanvir's 10/10 in-prod LangChain → Green vs Bashir's 3/10 tutorial → Yellow. **Fix U + K2 + AWS filter + D4 + M compose cleanly** for the Security happy path. **8 new bugs + 5 structural patterns surfaced** — most are composition gaps at the edges that single-fix validation couldn't catch (KMS hidden under SA filter, Azure-scope-leak via catalog defaultScope, Fix E softener only reaches Red-tier not Yellow-tier, SLO double-counts between D4 chip and obs checklist, D4 free-text-vs-chip slug collision). **Structural pattern recurring 4 rounds:** coverage-as-single-axis under-rates deep-narrow specialists (Robin/Cara/Brigit/Tanvir) — needs redesign. Cross-cut + 12-item priority list (α-μ) in `simulations/rounds/2026-05-16-round-5-cumulative-validation/cross-cut.md`. Speed-of-use distribution: 1 Safe / 5 At-risk / **0 Unworkable** (vs round 3's 0/7/3).

17. **Shipped D4 — methodology + practices section.** Round-1 Mei: "*TechVet scores tools, not skills — and senior ICs are differentiated by skills.*" Round-3 Yara + round-4 Marisol confirmed it open across DS / SA / SRE / Security shapes. New `MethodologyChip` + `MethodologyEntry` types; `methodologyEntries: MethodologyEntry[]` on AssessmentMeta; `methodologyChips?: MethodologyChip[]` on RoleTemplate. 8 templates carry 5-6 curated chips each (SA: TOGAF/C4/DDD/ADRs/Well-Architected/EventStorming; DevOps: GitOps/IaC/canary/trunk/feature-flags/runbooks; SRE: SLOs/error-budgets/chaos-eng/DORA/blameless/capacity; Data Eng: Kimball/lakehouse/contracts/SCDs/quality-SLOs/medallion; DS: A/B/causal/Bayesian/experimental/MCMC/feature-eng; AI-ML: MLOps/retraining/feature-stores/drift/LLM-evals/RAG-eval; Security: STRIDE/OWASP/SDLC/SLSA/PTES/zero-trust; QA: pyramid/contract/mutation/a11y/perf/flaky). New `MethodologySection` UI on Assessment between candidate header and main column — click chips to add, free-text input + Enter for long tail, dedup by id. **Display-only on Summary report** (no scoring impact per v1 design). +16 tests (10 store + 6 integrity including canonical-case pins for Yara/Marisol/Robin/Cara/Tomi/Wendy). Browser-verified end-to-end on DS template: chip click + free-text add both work; Summary shows "Methodology + practices (2)" with the Mei quote framing.

16. **Shipped AWS role-aware checklists (Option A).** Closes the round-4 "AWS checklist is role-blind" finding (Helena/Wendy/Owen — 3 of 6 sessions). New `tags?: string[]` on ServiceItem + `serviceTagFilters?: Record<string, string[]>` on RoleTemplate + `templateId?` on AssessmentMeta. AWS catalog expanded from 14 → 26 services with the round-3/4 named gaps: architect (Landing Zone / Organizations / IAM Identity Center), security (KMS / Macie / GuardDuty / Security Hub / Inspector), CI/CD (CodeBuild / CodePipeline), data-ML (SageMaker / Bedrock). Templates surface different subsets: SA → 17 (general+architect); Security → 20 (general+security); DevOps/Backend → 16 (general+cicd+container); AI/ML → 18 (general+data-ml+container); Custom → all 26. TechCard reads `meta.templateId` → looks up filter → renders subset + a "X other services hidden (filtered for [template name])" hint. Already-selected services stay visible even if filter would hide them. +7 integrity tests (every AWS service tagged; tags from canonical set; per-template filter snapshots).

15. **Shipped cloud-provider `defaultScope: "operator"`.** Owen round-4 recommendation: AWS/Azure/GCP catalog entries now carry `defaultScope: "operator"` so the operator claim is explicit on the chip the moment the recruiter adds them — regardless of which template they're under. Backend template doesn't preload cloud techs (per-template `techScopes` map can't reach what's added manually mid-call), so the catalog entry IS the defense. **Browser-verified:** AWS card dropdown placeholder now reads `"— Use default: operator"` (was `"— Not specified"`); Summary chip on AWS reads `"Scope: operator — default: operator"` with the "via default" hint, instead of a silent implicit blank. New integrity guard: every Cloud category tech must have `defaultScope: "operator"` — fails loudly if a future agent removes it. Closes the Eitan/Owen SE→dev internal-transfer AWS-rattle failure mode.

14. **Shipped Bug 4 — `namedNotInCatalog` carries depth + lastUsed.** Round-4 Wendy: pre-Bug-4 the named-only entries were bare strings, so "Burp daily, deep" flattened to "Burp" with no verdict + no depth. Now: new `NamedOnlyEntry = {name, depth?, lastUsed?}` type; `addNamedOnly` still creates `{name}` (recruiter captures mid-call without thinking); new `updateNamedOnly(name, patch)` action lets the recruiter enrich on Summary. New `NamedOnlyEditor` component renders per-entry on Summary with depth select + lastUsed text field — post-call enrichment pattern from Fix K. Backward-compat migration in `onRehydrateStorage` coerces legacy `string[]` to `{name}[]` so pre-Bug-4 sessions hydrate cleanly. +5 unit tests including patch merging + missing-name no-op. Browser-verified end-to-end: legacy `['Tokio','NATS','eBPF']` hydrates as 3 editors with empty depth/lastUsed; setting depth=deep + lastUsed=current persists correctly.

13. **Shipped Fix U — Security catalog overhaul.** New "Security" category with 7 first-class checklist-mode entries: HashiCorp Vault (KV/dynamic/PKI/transit/audit/auto-unseal/namespaces/agent/policies/replication), Burp Suite (Proxy/Repeater/Intruder/Scanner/Collaborator/extensions/macros/CI/WebSocket/auth-bypass), Semgrep (custom-rules/CI/Cloud/taint-mode/autofix/pre-commit/diff-baseline/secrets/SCA/policy), Trivy (container/IaC/SBOM/secrets/license/policies/CI/air-gapped/filesystem/k8s), Snyk (SCA/SAST/container/IaC/license/IDE/CLI/Broker/PR-checks/dashboards), OWASP ZAP (active/passive/spider/auth/API/automation/CI/scripts/fuzzing/reports), Falco (runtime-rules/custom/k8s-audit/plugins/alerting/sandboxed/sidekick/drift/multi-tenant/UEBA). Security template now preloads all 7 + existing infra (15 total techs). **"Vault" search now returns HashiCorp Vault first-class — closes Tomi's round-3 Ansible Vault collision.** +3 integrity guards prevent regression (every Security tech checklist-mode with ≥8 services; Vault has load-bearing service slice; Security category has ≥7 entries). Catalog 96 → 103, categories 11 → 12.

12. **Shipped Fix E — asymmetric `lastUsed` in scoring** per Sarah's design wrinkle from round 3. New `lib/lastUsed.ts` forgiving parser handles "current"/"now"/"2022"/"3 years ago"/"6 months ago"/bare numbers; buckets to `current | recent (≤1y) | stale (2-4y) | ancient (≥5y) | unknown`. New `applyRecency` runs after scope on version-mode tier-match path only (not checklist/unknown-version/notUsed — no version to anchor recency to). **Asymmetric**: stale Greens get penalty (Sam-Ansible / Maya-RN-2022 shape → "Stale — verify currency"); stale Reds + `enterpriseStillUsed` get softener (Sarah's Spring Boot 2.5 → "stale but contemporary at last-use; returner shape, expect ramp-up"). `composeLabel` extended with recency precedence so badge text reads "Review / Probe (softened from Concern — stale but defensible)" or "(penalized from Excellent — stale)". Sky-tone italic note on TechCard + Summary differentiates from depth (green) + scope (amber) reasons. Browser-verified both shapes end-to-end. +39 regression tests (27 parser + 12 scoring integration including scope-cap-precedes-recency and enterprise-note-suppression-on-softener).

11. **Shipped round-4 hot patches + Fix O.**
    - **Bug 1** (channel-aware Confirmed-not-in-stack copy): new `confirmedNotInStackCopy(channel)` helper in `lib/channel.ts` returns per-channel `{ title, lead, emphasis, emphasisStyle, tail }`. Closes Marisol's "the recruiter asked the candidate" misframing in async. +4 channel tests.
    - **Bug 2** (channel chip casing): dropped `uppercase tracking-wider` on the Summary header chip. "Async (CV-only)" no longer mangles to "ASYNC (CV-ONLY)".
    - **Bug 3** (single-letter search dead-end): no-results CTA now fires on no-exact-name-match (not just zero-matches). Recruiter typing "R" sees substring matches PLUS "+ Add 'R' as named-only" — fixes Marisol's Fix C unreachability for catalog-extreme languages.
    - **Bug 5** (sub-1-year months formatter): `formatCandidateContext` detects bare numbers < 1 and renders "X mo in industry" (0.3 → "4 mo"). Placeholder updated to "e.g. 8, 0.3, 10+". +3 tests.
    - **Fix O** (LangChain → checklist): converted to checklist mode with 10 curated services (LangGraph agents, RAG retrieval, tool use, structured output, streaming, memory, prompt caching, evals, observability, production deploy). Per Bashir's source-verified recommendation. Closes the Vikram natural-Green over-rate that Fix K couldn't reach. New integrity test pins the checklist shape.

10. **Ran round 4 validation (6 sessions, targeted).** 3 phone / 1 video / 2 async. Personas chosen to directly stress K/K2/Q/C/M. Cross-cut + 5 new bugs + reprioritization in `simulations/rounds/2026-05-16-round-4-validation/cross-cut.md`. **Validation matrix:** K2 ✅ pass (Helena SA, Wendy Security); K ⚠️ half-failed (Bashir source-traced `scoring.ts:75` — `author` cap requires `adjusted.adjusted` so natural-Green AI/ML libs slip past; Fix O urgent and now has a specific catalog edit); Q ⚠️ half-shipped (Marisol caught `Confirmed not in stack` section still uses phone-only copy in async — 1h fix); C ✅ pass with caveats (Wendy: depth signal lost on named-only; Marisol: single-letter search breaks the CTA); M ✅ pass with caveats (Eli: sub-1-yr "0.3 yr" awkward; 4-control row at-risk on phone). **5 new bugs (4 hot patches ≤1h each + 1 medium signal-loss). Re-confirmed urgent:** Fix O (sharpest validation yet), Fix U (Security catalog), role-aware AWS checklists (3 of 6 sessions), Backend template `techScopes` (Owen).

9. **Shipped Fix M — candidate-context block on report.** New `Seniority` + `PathType` types + 4 fields on AssessmentMeta: seniority (5-button pill group), yearsInIndustry (free-text), pathType (10-option dropdown including OSS-maintainer / founder-CTO / academic / internal-transfer / returner / contractor / career-switcher), candidateContext (free-text qualifier). Renders inline on Summary report header: `Senior · 8 yr in industry · Returner (career break) · 3 yr break`. Defaults hide the line so reports stay clean for screens recruiter didn't fill out. New `lib/candidateContext.ts` with `formatCandidateContext()` formatter + label helpers + option arrays. +10 unit tests covering Eitan/Riya/Sarah/staff/years-suffix-only-on-bare-numbers/trimming behavior. Closes Eitan/Riya/Min/Marcus/Sarah round-2-and-3 context-loss findings.

8. **Shipped Fix C — named-not-in-catalog capture.** New `namedNotInCatalog: string[]` on AssessmentMeta. When TechSearch returns zero results, the dropdown surfaces "+ Add 'X' as named-only (not assessable)" — recruiter clicks to capture the tech as a probe target. New chip strip on Assessment shows captured names with x-buttons to remove. New "Candidate mentioned — out of catalog (N)" section + headline chip on Summary. Store actions: `addNamedOnly` (trim + 80-char cap + case-insensitive dedup, preserves first-add casing) and `removeNamedOnly` (exact match). +10 unit tests. Empty-state guard on Summary now also checks named-only count so a recruiter who only captured names can still see a report. Closes Lou-Oracle / Devon-Tokio+NATS+eBPF / Tomi-Vault+Burp+Semgrep / Dmitri-Ruby+Solidity vanishing from PDFs.

7. **Shipped Fix Q — channel flag for async provenance.** New `Channel = 'phone' | 'video' | 'async'` on `AssessmentMeta`. Three-button pill selector in Assessment header (Phone default — primary use case). New `lib/channel.ts` module with `notDiscussedCopy` helper that drives per-channel section title + body + chip wording on Summary. Async sessions now read "Not on the CV / JD — you never spoke to the candidate" instead of phone's "ran out of time on the call"; video reads "Not discussed on the panel". Channel chip in report header so hiring manager sees the evidence level. Backward-compat via `onRehydrateStorage` callback that backfills missing fields on persisted-session hydration. +6 unit tests (extracted to `lib/channel.ts` so the copy is testable). Closes Yara/Devon/Min round-3 critique that Fix G's `notDiscussed` framing was phone-only and read as recruiter incompetence in async mode.

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
| 5 | Use `lastUsed` in scoring (asymmetric) | 1.5 day | ✅ shipped today as Fix E. New `lib/lastUsed.ts` parser → `Recency = current/recent/stale/ancient/unknown`. Asymmetric `applyRecency`: stale Green → Yellow with "stale, verify currency" penalty (Sam-Ansible shape); stale Red + `enterpriseStillUsed` → Yellow with "returner shape, expect ramp-up" softener (Sarah-Spring-Boot-2.5 shape). Order: tier → depth → scope → recency. Doesn't apply to checklist/unknown-version/notUsed (no version to anchor to). Badge text shows "(softened from Concern — stale but defensible)" or "(penalized from Excellent — stale)". +39 tests (27 parser + 12 scoring integration) |
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
| **C** | "Named-but-not-in-catalog" capture (search aliases deferred to a separate fix) | 1.5 day | ✅ shipped today. No-results CTA in TechSearch → "+ Add 'X' as named-only"; chip strip on Assessment with x-buttons to remove; "Candidate mentioned — out of catalog (N)" section + headline chip on Summary. Trim, 80-char cap, case-insensitive dedup. +10 store unit tests. Closes Lou-Oracle/Devon-Tokio-NATS-eBPF/Tomi-Vault-Burp-Semgrep/Dmitri-Ruby-Solidity. (Search aliases for the *collision* case — Vault → Ansible Vault — still open; carved out as Fix S) |
| **D** | `phoneScreenPivot: true` flag on top 3-5 services per checklist | 1.5 day | ⏳ — closes Aisha's 4-of-7-checklist-techs-unworkable |
| **F** | "Managed-platform / toolchain-pinned" as 4th version-axis state | 1.5 day | ⏳ — closes Tomás-Supabase, Hana-Swift, Aisha-Helm; cleaner long-term than B |
| **G** | Auto-exclude untouched template cards from buckets/radar | 0.5 day | ✅ today — closes Priya-Databricks PDF pollution. New `notDiscussed` flag + Summary section + headline chip. +9 regression tests |
| **H** | Backend template = JVM-aware (or stack-family chooser) | 1 day | ⏳ — Sarah + Lin + prior round Hiroshi |
| **I** | Catalog refresh — Vault, Vercel, Stripe, Prisma, SwiftUI, UIKit, Combine, Xcode Cloud, TanStack Query, RTK, Zustand, MLflow, SageMaker-as-AWS-service, Bedrock, Spring Framework, Hibernate, Mockito, Testcontainers, Maven, Gradle, Git, Docker Compose | 3 days | ⏳ — spans 8 of 10 sessions |
| **J** | Snowflake → checklist mode (and audit other `min: "0"` single-tier entries) | 0.5 day | ✅ today — Snowflake/GraphQL/gRPC all converted (audit found 3, not 1). 12 / 10 / 10 services respectively. +4 integrity tests including a global guard against future single-tier `min:0` regressions |
| **K** | Scope-axis UX redesign (hybrid: defaults + post-call chip) | 2 days | ✅ today — `defaultScope` on all 10 AI/ML libs (depth-game now caps automatically); interactive scope chip on Summary with live verdict update. +7 regression tests + 1 integrity guard. Closes 10/10 phone-screening sessions' "scope unreachable" finding. NOTE: does NOT close Vikram natural-Green LangChain — needs Fix O |
| **L** | Surface "Confirmed not in stack" more prominently on Summary + count chip | 0.5 day | ✅ today — first-class h2 sections + headline chip-row for both confirmed-absent and not-discussed |
| **M** | Candidate-context block on report (seniority + years + path-type + free-text) | 1 day | ✅ shipped today. Seniority pill group (5 options), Years free-text, Path-type dropdown (10 options including OSS-maintainer/founder-CTO/academic/internal-transfer), Additional context input. Renders inline on report header: "Senior · 8 yr in industry · Returner (career break) · 3 yr break". Defaults hide the line. +10 unit tests on `formatCandidateContext` helper |
| **N** | `scope=consumer / triggered-by` 5th option for orchestration tools | 0.5 day | ⏳ — do after K |
| **O** | Self-overclaim guard: fast-moving libs max at Yellow without checklist services | 1 day | ⏳ — Vikram natural-Green LangChain |
| **P** | Per-tech depth tooltips | 1 day | ⏳ — Dmitri-Kafka + Sarah scope-confusion |

## What's next — start here tomorrow

**Recommended next: round-5 medium items** (~2h). The 6 hot patches (5α-ζ) are shipped. Medium:
- **5η** Split D4 `causal-inference` chip into did/iv/rdd/propensity (15m) — Yasmin
- **5θ** Channel-aware hide-on-empty for NamedOnlyEditor in async (30m) — Yasmin
- **5ι** Methodology as 4th headline stat card (1h) — Yasmin
- **5κ** Fix E extension to checklist-mode (0.5d) — Brigit

Then larger (design-pass-first): **coverage-as-single-axis redesign** (Robin round-1 → Cara round-3 → Brigit + Tanvir round-5 = four rounds of the same finding). Yellow sub-grouping in headline (Idris/Yasmin). 3-4d total.

See `simulations/rounds/2026-05-16-round-5-cumulative-validation/cross-cut.md` for full evidence.

Full round-3 priority list + sequencing in `simulations/rounds/2026-05-16-multichannel-round-3/cross-cut.md`.

### Round 3 additions (2026-05-16 multi-channel)

| # | Fix | Effort | Why |
|---|-----|--------|-----|
| **K2** | Template-keyed `techScopes` (Riya's design) | 1.5 day | ✅ shipped today. SA → architect on all 5 infra/DB techs; SRE → reviewer on Terraform+AWS (cluster-build), operator-implied on workload-layer; Security → reviewer on infra. Closes Aaron's Kubernetes 1.30 + very-deep + SA → "Review/Probe (capped — architect scope)" *automatically*. +5 integrity regression tests; 119/119 pass |
| **Q** | `channel` flag for async provenance | 1.5 day | ✅ shipped today. `Channel = 'phone' \| 'video' \| 'async'` on `AssessmentMeta`; pill selector in Assessment header; channel-aware `notDiscussedCopy` helper (extracted to `lib/channel.ts`) drives per-channel section title + body + chip + headline channel badge. Closes Yara/Devon/Min critique. +6 unit tests. Deferred: per-item `source` enum (more invasive; channel flag captures 90% of value) |
| **R** | Broaden Fix J integrity guard to catch non-zero single-Green-tier rubber-stamps (k6) | 0.5 day | Spotted by Pranav; trivial |
| **S** | `searchAliases` field + sub-service substring-match warning (Vault → Ansible Vault collision) | 1 day | Bug 5 round-3; visible-fumble fix during video screens |
| **T** | "Evaluated / migrated off" 4th tri-state option | 0.5 day | Pranav/Riya + round-1 Sam-Pulumi / Hiroshi-GraphQL carryovers |
| **U** | Security template overhaul + 7 first-class security catalog entries | 1 day | ✅ shipped today. New "Security" category in catalog with 7 checklist-mode entries (Vault / Burp Suite / Semgrep / Trivy / Snyk / OWASP ZAP / Falco), each with 10 curated services that separate "name-dropped" from "actually operate" (Vault: KV/dynamic/PKI/transit/audit/auto-unseal; Burp: Repeater/Intruder/Scanner/extensions; Semgrep: custom-rules/taint-mode/diff-baseline; etc.). Security role template now preloads all 7 + existing infra (15 total). "Vault" search now returns HashiCorp Vault as first-class — closes Tomi's round-3 Ansible Vault collision. +3 integrity guards. Catalog: 96 → 103 entries; categories: 11 → 12 |
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
