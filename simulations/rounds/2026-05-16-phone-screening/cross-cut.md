# Cross-cut — 2026-05-16 phone-screening round

**10 sessions, ~19k words of findings, written by 10 independent agents.**
Channel: phone, 5-10 min, recruiter typing while listening. Cast spans
junior bootcamp grad → 12-year contractor, with deliberate boundary cases
(Go shop with no cloud, iOS specialist, ML→GenAI pivot, 3-year returner).

The headline: **the tool works for the candidate it was originally built
for (mid/senior, current stack, well-aligned template) and fails on every
adjacent shape**. Junior, returner, contractor, specialist, ML-pivot, and
GCP/JVM/Go shop candidates all produce PDFs that mislead the hiring
manager — almost always *under-rating* the candidate, occasionally
flattering them, but never accurately representing them.

## The 10 sessions at a glance

| # | Candidate | Persona | Template | Predicted PDF | Single headline failure |
|---|-----------|---------|----------|---------------|-------------------------|
| 01 | Janelle Park | Junior FE, bootcamp 1.5y | Frontend | 3G / 4Y / 0R / 1 skipped | Vite-as-daily-tool reads Yellow; TanStack/RTK confusion (most diagnostic moment) lost — neither in catalog |
| 02 | Marcus Lee | Career switcher, 1y | Backend | 3G / 2Y / 1R | Docker Yellow + enterprise note misfires on Compose-only junior; AWS 3/14 Red punishes role-split |
| 03 | Priya Joshi | Analyst→DE, 1.5y | Data Engineer | 5G / 1Y / 2 skipped | Snowflake catalog entry is a structural Green rubber-stamp (`min: "0"`); checklist too slow for phone |
| 04 | Tomás Reyes | Mid FS, 4y at one YC startup | Full-Stack | 4G / 5Y | "Managed platform" missing as version-axis state; Vercel/Stripe/Supabase catalog-absent — three core surfaces silent |
| 05 | Lin Wei | Mid-senior Go, on-prem K8s | Backend | 6G / 4Y / 2 skipped | Backend template preloads Node not Go; on-prem signal silently buried; Prometheus/Grafana not searchable |
| 06 | Aisha Khan | Mid DevOps, GKE shop | DevOps / Platform | 3G / 2Y / 1R / 2 skipped | 4 of 7 logged techs are checklist-mode = unworkable on phone; HashiCorp Vault not in catalog |
| 07 | Hana Tanaka | Mid iOS, 3y | Mobile | 0G / 2Y / 1R / 3 skipped | SwiftUI/UIKit/Combine/Xcode Cloud all absent → competent iOS dev scores 0 Green |
| 08 | Dmitri Voinov | Senior contractor, 12y | Custom | 13G / 3Y / 1R | "Polyglot senior" PDF for a recency-stale contractor; Ruby/Solidity/Erlang vanish (no "named-not-in-catalog" capture) |
| 09 | Sarah Mahoney | Senior returner, 3y break | Backend | 0G / 3Y / 2R | Spring Boot 2.5 was current-when-she-left, reads as Concern today; `lastUsed` purely cosmetic |
| 10 | Vikram Patel | Senior ML → GenAI 6mo | AI / ML Engineer | 5G / 2Y | Scope axis shipped today doesn't fire on self-overclaim; checklist depth-lift turns 5/14 LLM-SDK into Green |

## Pattern frequency

| Pattern | Sessions | Severity |
|---------|----------|----------|
| **Scope dropdown not reached on phone calls** | 10 / 10 | High (silently inerts today's shipped feature) |
| **Enterprise-still-used note misfires at `working` depth** | 6 / 10 (Janelle/Marcus/Tomás/Hana/Aisha/Dmitri) | Medium-High (recurring across personas) |
| **Catalog gaps drop the most diagnostic moments** | 10 / 10 | High (varies by persona, but every session has at least one) |
| **Checklist mode unworkable on 5-10 min calls** | 6 / 10 (Priya/Tomás/Lin/Aisha/Sarah/Marcus) | High (channel-mismatch, blocks whole role categories) |
| **Search has no aliases / no "named-not-in-catalog" path** | 6 / 10 | High (Vault, Prometheus, Vercel, SwiftUI, TanStack, Ruby all hit it) |
| **Templates preload the wrong stack for the candidate's actual shape** | 5 / 10 (Lin/Sarah/Aisha + Hiroshi prior round, Tomás Vercel) | Medium |
| **`lastUsed` captured but invisible to scoring + PDF** | 4 / 10 explicit (Sarah/Dmitri/Marcus/Aisha); implied by many | High (canonical: Sarah + Dmitri) |
| **Junior / returner / context has no representation** | 4 / 10 (Janelle/Marcus/Priya/Sarah) | Medium |
| **Untouched template cards score Yellow "Not yet assessed"** | 4 / 10 (Priya/Tomás/Aisha/Marcus) | Medium (PDF inflation) |
| **`parseVersion` major-only collapse still tanks bare-major input** | 2 / 10 (Marcus/Python `3`; Dmitri/Django `4`) | High (named in CLAUDE.md as known quirk, still unmitigated) |

## Code bugs (numbered — concrete, file:line-anchored)

### Bug 1 — Checklist-mode depth-lift undoes coverage signal
**What.** `scoring.ts:257-258` runs `adjustForDepth(baseColor, item.depth)` on the bucket derived from coverage `ratio`. A candidate self-reporting `deep` on a 17% coverage gets lifted Red→Yellow; 36% coverage → Green. **Coverage IS the signal in checklist mode** — letting depth bypass it makes checklist mode lie. Vikram's session is the canonical case: 5/14 LLM SDK coverage → "Good (lifted from Review / Probe by depth)." Six weeks of evening hacking reads identically to a year of production ownership. **Severity: High.** Suggested fix: drop depth-lift on checklist mode entirely, or gate it behind `ratio ≥ 0.5`.

### Bug 2 — Enterprise note + depth-lift on unknown-version + working depth misfire
**What.** The 2026-05-15 fix-5 gates the "still widely used in enterprise" note on `depth ≤ shallow + unknownVersion`. But `working` is the most common depth a recruiter picks (Janelle/Storybook, Marcus/Docker, Tomás/Postgres + Node, Hana/Swift, Aisha/Helm, Dmitri/Docker + FastAPI). At `working` the note fires AND, for `deep+`, the depth-lift fires too. Combined: maximum reassurance from zero version evidence. **Severity: High.** Two converging fixes proposed by agents: (a) gate on *reason* for unknown-version, not on depth (Janelle, Tomás), and (b) suppress the depth-LIFT — not just the note — when `unknownVersion=true` (Aisha). I think (b) is the correct surgical fix and (a) is the larger redesign once we have a "managed-platform" / "toolchain-pinned" first-class state.

### Bug 3 — Snowflake catalog entry is a structural Green rubber-stamp
**What.** `technologies.json` Snowflake block has `versionTiers: [{min: "0", color: "green"}]`. `findTier` matches any digit input ≥ `[0]` → Green "Good." The only path that yields Yellow is the unknown-version branch (no digit at all). Recruiter typing "1" or "8" or "current 8" → Green by accident. Sharper than the general catalog-gap framing in RESUME.md priority #10 — this is a tier ladder that *cannot fail*. **Severity: High.** Fix: convert Snowflake to checklist-mode (warehouses / Snowpark / Tasks / Streams / Dynamic Tables / Cortex / Time Travel / governance), OR change tier to `min: "1"` with `versionless` semantics. Same pattern likely exists on any single-tier `min: "0"` entry — worth auditing.

### Bug 4 — `parseVersion("3")` collapse still tanks bare-major
**What.** Known in CLAUDE.md as the "major-only collapse quirk" — unmitigated. Python `3` → Red (falls through `3.8` tier). Django `4` → Yellow (falls through `4.2` tier). Vue 3.x has the same shape. React `16.0` was *lowered* to `16.0` specifically to dodge this; Django/Vue/Python were left. **Severity: High** for phone-screening tool where recruiters won't know to type `3.11` for a junior who said "Python." Fix: lower the tier `min` for any tech where the bare major is the canonical answer (Django 4.0, Vue 3.0, etc.). Equivalent to the React 16.8→16.0 fix from the original PRD.

### Bug 5 — Spring Boot 2.5 + `enterpriseStillUsed: true` swallowed by Red tier
**What.** Sarah's Spring Boot 2.5 (current when she left in 2022) hits the `min: 0` Red tier. The root `enterpriseStillUsed: true` flag only fires the reassurance note on Yellow tiers (`scoring.ts:173`). Result: stale-but-was-current senior reads as "Concern" with no softening text. **Severity: Medium.** Two fixes possible: (a) lower Spring Boot's Yellow floor from `2.7` to `2.5` or earlier (cheap; data-only); (b) flag-related fix: allow `enterpriseStillUsed` to render a softer "legacy-but-defensible" note on Red tiers when the version was within the supported window at last-use time — requires recency (#5 below). The clean fix is (a) plus shipping #5.

### Bug 6 — Versionless catalog entries produce misleading Yellow + enterprise note
**What.** Docker's own catalog entry literally says `"Versionless in practice — probe usage."` But typing nothing into Docker + `depth=working` → Yellow "Review / Probe" + "Still widely used in many enterprise applications" (Dmitri session). FastAPI same shape. The note is *exactly wrong* — these aren't legacy techs, they're tools that don't have a meaningful version axis. **Severity: Medium.** Fix: add a `versionless: true` flag to catalog entries; when true, the version field renders disabled with a "Versionless — confirm via probes" affordance and the verdict skips the unknown-version yellow band.

## Structural defects

### S1 — Scope-of-use axis is recruiter-unreachable on phone calls
**Hit by:** All 10 sessions. **The single most-recurring finding of the round.** The axis shipped today is right in shape and works correctly when triggered (`scoring.ts:62`), but it's a fourth dropdown that requires the recruiter to (a) know what `author/operator/reviewer/architect` mean for *each tech*, and (b) interrupt a fast-moving call to set it. On a phone screen, default `—` means the cap never fires.

The axis also has a known one-sidedness (Hana, Vikram): it can cap Green→Yellow but cannot *raise* Red→Yellow for narrow-by-design specialists (Hana's analytics-only Firebase scoring Red, Marcus's AWS 3/14 scoring Red). Right axis, wrong direction for the specialist case.

**Open question for redesign:**
- Is scope a *live-call control* or a *post-call enrichment control*? Several agents (Tomás, Vikram, Sarah, Dmitri) explicitly argued post-call.
- Should scope auto-default per category? (Vikram suggests: AI/ML-category default `author`, force upgrade to `operator`. Lin/Aisha suggest: K8s + cloud default `operator`.)
- Should scope have a "Consumer / Triggered-by" 5th option for orchestration tools the candidate runs but didn't write (Priya/Airflow)?

### S2 — Checklist mode is unworkable on phone screens
**Hit by:** Priya (SQL 12 boxes), Aisha (4/7 logged techs = checklist), Lin (Observability), Sarah (Jenkins 14 items), Marcus (AWS 14 items), Tomás (none, but only because his stack happens to be version-mode), Dmitri (AWS + GCP).

For 5-10 min calls, reading 12-14 service names aloud is impossible. Recruiters under-tick (signal becomes recruiter-throughput, not candidate quality), or over-tick (yes/yes/yes/yes), or skip entire checklist cards. Result: GitLab CI Yellow "Not yet assessed" for someone who runs the fleet; Observability Yellow at 5/14 for an ecosystem-committed operator.

**Cross-cutting fix proposed independently by Aisha and Priya:** `phoneScreenPivot: true` flag on the 3-5 most diagnostic services per checklist. UI surfaces those above the full list; recruiter ticks those + a "candidate fluent on more, ran out of time" flag. Turns 60-second checklist marathons into 10-second yes/no rounds.

### S3 — Mixed-vendor checklists punish ecosystem-committed candidates
**Hit by:** Lin (Observability — Prometheus/Grafana/Loki + Datadog/New Relic/Splunk in one denominator), Aisha (same Observability + GCP), prior round's Robin-SRE.

Observability has 14 services across ~6 vendors. Engineers pick one stack and stick with it. Cap = ~6/14 (43%) → Yellow. Lin (open-source committed) lands worse than someone who tick-tags across vendors they don't actually run. **Fix:** vendor-group the checklist so candidates can declare a stack-of-record; coverage % computed against the stack, not against the full union.

### S4 — Search has no aliases and no "named-but-not-in-catalog" capture
**Hit by:** Lin (Prometheus/Grafana → no result, live inside `observability`), Janelle (TanStack/RTK → no result), Aisha (Vault → wrong results), Hana (SwiftUI/UIKit/Combine/Xcode Cloud all → no result), Tomás (Vercel/Stripe/Supabase → no result), Dmitri (Ruby/Solidity/Erlang → no result, vanish).

Two distinct fixes:
- **Aliases / reverse-service-index:** recruiters type what the candidate said. "Prometheus" should find the observability checklist; "Anthropic SDK" should find llm-api-sdk. Add a `searchAliases: string[]` field on catalog entries.
- **"Named-but-not-in-catalog" capture:** when search returns zero results, surface "Add as named-only (not assessable)" → renders as a gray chip on Summary in a "Candidate mentioned — out of catalog" section. Dmitri's three vanished techs are the canonical case. Recruiter heard them; report should show them.

### S5 — "Managed-platform / toolchain-pinned" missing as a first-class version-axis state
**Hit by:** Tomás (Vercel/Supabase managed Postgres), Hana (Apple toolchain pins Swift version), Aisha (Helm pinned by GKE), Priya (Snowflake-the-SaaS), Marcus (Docker via someone-else's-script), Sarah (Docker via CI she didn't write), Dmitri (Docker "latest").

Today the tri-state is `knows-version | don't-remember | not-in-stack`. Missing: **"Not user-controlled"** — version is structurally invisible because a platform/toolchain/managed-service pins it. This is the dominant pattern for full-stack engineers in 2026 (Vercel/Supabase/Cloudflare) and for iOS/Android/Apple. Adding it would fix Bug 2 cleanly (no need to gate by depth — the user explicitly states the reason for unknown).

### S6 — `lastUsed` captured but ignored
**Canonical cases:** Sarah (the entire signal), Dmitri (the entire signal). Implicit in Hana (Flutter 2.10 = 2yr stale), Marcus (Python `3.11` guess hides "1yr coding"), Aisha (ArgoCD evaluated 2yr ago).

This is RESUME.md priority #5, confirmed urgent by the round. **Critical design wrinkle from Sarah:** the design should be **asymmetric** — don't just *penalize* stale Greens (Sam-Ansible from prior round); *soften* stale Reds when the version was contemporary at last-use time. Sarah's Spring Boot 2.5 + `lastUsed: 2022` should resolve to *Yellow "Stale — was current 3 years ago"*, not Red. Same axis, opposite signs depending on whether the version was current-at-the-time.

Implementation hint: `versionTier.firstAvailable` date field on the catalog (or `releasedAt`) lets the scorer compute "was this version current when last used?"

### S7 — Junior / returner / contractor / specialist context absent from PDF
**Hit by:** Janelle (junior who handles her slice well = mid-level breadth on the report), Marcus (1yr coding career-switcher = "Green Python senior" to a HM), Priya (analyst→DE = mid DE), Sarah (3yr break = currently-bad rather than stale), Dmitri (12yr contractor = polyglot staff engineer). Five of ten sessions hit this in different shapes.

No structured field for *candidate context*. `meta.mandate` is the *job* mandate. A hiring manager reading any of these PDFs cannot tell seniority-experience-shape from the verdict colors alone. **Severity: Medium-High.** Could be a small structured field (years-in-industry, junior/mid/senior/returner/contractor) that anchors the report header.

### S8 — Untouched template-preloaded cards score Yellow "Not yet assessed" and inflate the PDF
**Hit by:** Priya (Databricks card untouched → Yellow), Tomás (React never came up → Yellow), Aisha (Docker skipped → Yellow), Marcus (skipped category prompt). Cards the recruiter ran out of time to touch get scored as Yellow probe-further, polluting the Probe Further bucket with non-issues that dilute the real ones. **Fix:** auto-exclude items where `version === '' && depth === 'unknown' && !checklistTouched && !notUsed` — they weren't discussed at all. Or render them in a separate "Not discussed" section, gray, excluded from buckets/radar.

### S9 — Confirmed-not-in-stack signal is weak on Summary
**Hit by:** Lin (on-prem signal buried), Tomás ("Not in stack" on AWS understates "has never operated a cloud"), Marcus (Node/K8s skipped silently). The 2026-05-15 tri-state correctly excludes from scoring, and `Summary.tsx:244-282` does render a "Not in candidate's stack" section — but agents found it visually de-emphasized. For a phone screen, "asked and confirmed absent" is *positive signal* for the right role and a *flag* for the wrong role. Currently reads as silent omission. **Fix:** elevate the section in the report layout; in headline stats add a small "Confirmed absent: N" chip.

### S10 — Self-overclaim case unaddressed (the unnamed half of priority #4)
**Hit by:** Vikram (LangChain natural Green for a 6-week tutorial user), Dmitri (Rails 7 confidence with no recency probe), implicit in Marcus (Python `3.11` guess from a "Python, mostly" answer).

The 2026-05-16 scope-axis closes the *named* problem (Diego/Aliyah from prior round — candidates who clearly are reviewers/architects and the recruiter notices). It does not close the *unnamed* problem: candidates who sound like operators but aren't. Vikram's scope-could-have-been-`author`-but-the-recruiter-can't-know is unsolvable from the recruiter's seat on a phone call. **Fix:** Vikram's recommendation — fast-moving libraries (LangChain, vector DBs, LLM SDKs) shouldn't have a natural Green tier; they should max out at Yellow and require checklist services to clear Green. This re-routes the question from "version" to "production services exercised", which is harder to overclaim.

## Catalog gaps (consolidated)

Ranked by frequency named across sessions:

| Tech | Sessions naming it | Notes |
|------|-------------------|-------|
| **HashiCorp Vault** | Aisha | P0 for security/healthcare/regulated shops |
| **Vercel / Fly / Render / Railway / Netlify** | Tomás | "Platform-as-a-cloud" category gap |
| **Stripe** (and adjacents: Twilio, SendGrid, Plaid) | Tomás | No "Payments" / "3rd-party APIs" category |
| **Supabase / Prisma / Drizzle** | Tomás | DB-as-managed-service; partially in RESUME #10 |
| **SwiftUI, UIKit, Combine, Xcode Cloud, XCTest, SPM** | Hana | iOS catalog blindness — Mobile template currently misleads |
| **TanStack Query / RTK Query / Redux / Zustand / Jotai / React Hook Form / React Router** | Janelle | React ecosystem catalog gap; state-management is second question after "what framework" |
| **MLflow, SageMaker (as AWS service), Bedrock, W&B** | Vikram (and Priya prior round) | ML tooling — table-stakes for AI/ML template |
| **Go in Backend template** | Lin | Catalog has Go; template doesn't preload it |
| **Spring Framework (non-Boot), JPA, Hibernate, Mockito, Testcontainers, Maven, Gradle** | Sarah | JVM ecosystem gap |
| **Snowflake-as-checklist** (and BI: Looker/Metabase/Tableau; ELT: Fivetran/Airbyte; data quality: Great Expectations) | Priya | Data tooling beyond the eng layer |
| **Ruby, Solidity, Erlang/Elixir** | Dmitri | Long tail — "named-but-not-in-catalog" capture is the structural fix, not adding each |
| **Git, Docker Compose, Celery, pip/poetry/uv** | Marcus | Basic Python/backend stack gaps |
| **HashiCorp Consul, Temporal, NATS, Envoy, Istio, Cilium, Karpenter** | Lin (Go ecosystem) | Modern backend infra |

## Disagreements with prior fixes (agents pushing back)

Four agents independently disagreed with shipped work:

1. **Janelle / Marcus / Tomás / Aisha — the enterprise-note depth gate is in the wrong place.** It was supposed to suppress the legacy-reassurance for non-skill users; it now fires at `depth=working`, which is the most common depth a recruiter picks. **Fix the lift, not just the note** (per Aisha).

2. **Lin — the `notUsed` tri-state shipped 2026-05-15 solves the wrong half.** Excluding from scoring was the easy half; *displaying* the confirmed-absence prominently was the hard half, and it didn't ship visibly enough.

3. **Hana — the scope-of-use axis is one-sided.** It caps Green→Yellow (Diego/Aliyah case) but cannot lift Red→Yellow for narrow-by-design specialists (Hana's analytics-only Firebase). Specialists still get punished.

4. **Vikram + Dmitri + Sarah — the scope axis is right design, wrong UX.** It's a recruiter-unreachable control on a 5-min phone call. **The axis doesn't fire in the channel where it would matter most.** Vikram's quote: *"It does nothing for the exact failure mode it was designed to catch, in the exact channel where it would matter most."*

This last one is the most important piece of feedback from the round. The scope-of-use work shipped today is correctly designed but lives in the wrong place in the workflow. Two redesign options agents proposed:
- **Auto-default scope by category** + force recruiter to upgrade (Vikram, Lin)
- **Move scope from live-call to post-call enrichment** (Tomás, Sarah)

## Priority-ordered fix list (new — to merge into RESUME.md)

| # | Fix | Effort | Why now |
|---|-----|--------|---------|
| **A** | **Drop depth-lift on checklist-mode (or gate behind ≥50% coverage)** | 0.5 day | Closes Vikram's Green-Senior-from-tutorial; single highest-precision fix in the round; 1-line scoring change + 4 tests |
| **B** | **Suppress depth-lift (not just enterprise note) when `unknownVersion=true`** | 0.5 day | Closes Helm/Storybook/Swift/Docker over-rates from 6 sessions; cleaner than gating by depth |
| **C** | **Search aliases + "named-but-not-in-catalog" capture** | 1.5 day | Highest-frequency friction (6 sessions); enables Dmitri's vanished techs to reach the PDF |
| **D** | **`phoneScreenPivot: true` flag on top 3-5 services per checklist** | 1 day catalog + 0.5 day UI | Single highest-leverage UX change for phone channel; closes Aisha's 4-of-7-techs-unworkable; closes Sarah/Lin/Priya checklist friction |
| **E** | **`lastUsed` in scoring — ASYMMETRIC design (penalize stale Greens; soften stale Reds when version was contemporary)** | 1.5 day (was 1 day in RESUME #5; Sarah's design wrinkle adds 0.5d) | Canonical case Sarah + Dmitri; without it senior returners + contractors structurally mis-score |
| **F** | **"Managed-platform / toolchain-pinned" as 4th version-axis state** | 1.5 day | Closes Tomás-Supabase, Hana-Swift, Aisha-Helm, Marcus-Docker; cleaner than Fix B once it lands |
| **G** | **Auto-exclude untouched template cards from buckets/radar** | 0.5 day | Closes Priya-Databricks, Tomás-React, Aisha-Docker pollution; tiny scoring change |
| **H** | **Backend template = JVM-aware** (or stack-family chooser: Backend(JS) / Backend(JVM) / Backend(Go)) | 1 day | Hits Sarah + Lin + prior round Hiroshi; cumulative cost across persona space is large |
| **I** | **Catalog refresh round 3** — priority order: Vault, Vercel, Stripe, Prisma, SwiftUI, UIKit, Combine, Xcode Cloud, TanStack Query, RTK, Zustand, MLflow, SageMaker-as-AWS-service, Bedrock, Spring Framework, Hibernate, Mockito, Testcontainers, Maven, Gradle, Git, Docker Compose, Celery | 3 days | Spans 8 of 10 sessions; partially in RESUME #10 but reprioritize by frequency-named in this round |
| **J** | **Snowflake → checklist mode** (and audit other `min: "0"` single-tier entries) | 0.5 day | Closes Bug 3 (structural Green rubber-stamp); cheap data fix |
| **K** | **Scope-axis UX redesign** — move to post-call enrichment OR auto-default per category | 2 days | Don't ship a v2; redesign based on the round's feedback. Touches `TechCard.tsx` + scoring + `Summary.tsx` |
| **L** | **Surface "Confirmed not in stack" more prominently on Summary** + add count to headline stats | 0.5 day | Closes Lin/Tomás complaints; existing section needs visual elevation |
| **M** | **Candidate-context block on report** (years-in-industry, junior/mid/senior/returner/contractor) | 1 day | Closes Marcus/Sarah/Janelle context-loss; single structured field on report header |
| **N** | **`scope=consumer / triggered-by` 5th option** for orchestration tools | 0.5 day | Closes Priya/Airflow case; cheap addition once scope axis is redesigned (do after K) |
| **O** | **Self-overclaim guard**: fast-moving libraries (LangChain, vector DBs, llm-api-sdk) max out at Yellow without checklist services | 1 day | Closes Vikram's natural-Green over-rate; targeted catalog work |
| **P** | **Per-tech depth tooltips** (what "working" / "deep" means in this category) | 1 day | Closes Dmitri-Kafka and Sarah scope-confusion; recruiter calibration aid |

## Recommended sequencing

**Week 1 — quick high-impact:**
- Fix A (0.5d) — checklist depth-lift
- Fix B (0.5d) — depth-lift gate on unknownVersion
- Fix G (0.5d) — auto-exclude untouched cards
- Fix J (0.5d) — Snowflake → checklist
- Fix L (0.5d) — elevate "Not in stack" section

Half-week clears five sessions' worst over/under-rates. Mechanical scoring/data changes; high-precision.

**Week 1 second half — UX retreat:**
- Fix K (2d) — scope-axis redesign (don't double down on today's shape)

**Week 2 — channel fit:**
- Fix D (1.5d) — phoneScreenPivot
- Fix C (1.5d) — search aliases + capture

**Week 2-3 — design-heavy:**
- Fix E (1.5d) — asymmetric `lastUsed`
- Fix F (1.5d) — managed-platform state
- Fix M (1d) — candidate context

**Ongoing — catalog:**
- Fix I (3d) — refresh round 3, run in parallel with above

## Notes for the next round

What worked:
- Cast diversity surfaced ~3x the patterns a homogeneous senior cast would have.
- File-based output is much easier to cross-cut than chat-only.
- 10 sessions is the right size — bigger gets diminishing returns; smaller misses pattern frequency.
- Independence-instruction was honored — agents disagreed with shipped work, including today's.

What to do differently next time:
- **Pick a different channel.** Phone-screening surfaced phone-specific findings (scope dropdown unreachable, checklist too slow). Next round: video panel (30-45 min, hiring manager joining) or async (recruiter from CV only). Different friction surfaces.
- **Add a control case.** All 10 sessions over-rated friction because the tool was being stressed by adversarial casting. Run 1-2 "well-aligned mid-senior on a current stack" sessions per round as a baseline so we can tell channel-friction from candidate-friction.
- **Constrain word count more aggressively.** Average was ~2000 words; schema asks for 600-900. Cross-cut is easier when sections are tight. Either enforce in schema or add a "1-paragraph TL;DR" requirement at the top.
- **Capture the agent's "predicted" vs "actual after I read the code" delta.** Some sessions made predictions then corrected them mid-document (Priya's Snowflake "current" path is a great example). That self-correction is itself signal — worth a dedicated schema section.

## Snapshot

- Sessions: 10 (all completed)
- Total words: 19,488
- Code bugs surfaced: 6
- Structural defects: 10
- Catalog gaps: 13+ named techs (long-tail uncounted)
- New priority items added to fix list: 16 (A–P)
- Days estimated to clear top 5 (A/B/G/J/L): 2.5 days
- Days estimated to clear all 16: ~20 days

The round paid for itself in the first finding (depth-lift on checklist mode) and again in the second (today's scope axis doesn't fire in its target channel). Run another round after Fixes A/B/K land.
