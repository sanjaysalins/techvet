# Session 07 — Pranav Iyer (Senior QA / Test Engineer, 8 yr)

**Agent:** sim-07 (round-3 multichannel, phone)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Phone (5-10 min)
**Role template picked:** QA / Test Engineer

## 1. Persona inhabited

QA lead at a consumer SaaS, just wrapped an 18-month Selenium 3 / TestNG / Maven → Playwright + pytest migration (legacy Java suites still alive). Talks fast, skates over versions because Renovate auto-bumps. Treats Cypress as a *decision* (6-week POC, rejected on iframe + multi-tab gaps) — that judgment won't survive the tool.

## 2. Phone call — abbreviated

> R: "Hi Pranav — quick run-through. What's your test stack today?"
> P: "Playwright is the main thing. Just finished migrating off Selenium."
> [R: lands on QA template — 8 cards preloaded. Clicks Playwright.]
> R: "What version?" P: "Couldn't tell you — we auto-update."
> [R: clicks "Don't remember", depth=very-deep. ~6s.]
> R: "And Selenium?" P: "Selenium 4 — finished the bump last quarter."
> [R: types "4", depth=deep. ~8s.]
> P: "pytest for API tests, JUnit 5 for the legacy Java…"
> [R: pytest "8" / depth=deep — 7s. JUnit not in template — searches, adds, types "5", depth=working — 18s.]
> P: "REST Assured for API assertions, k6 for load, TestNG for legacy…"
> [R: searches "REST Assured" — **no results**. Searches "TestNG" — **no results**. Adds k6 "1.0" — 22s of fumble.]
> P: "Cypress we evaluated and rejected — iframes broke us."
> [R: Cypress preloaded. No "rejected" state. Clicks "Not in stack". 6s — but it's wrong, see §6.]
> P: "BrowserStack for devices, Docker for test containers, GHA for the pipeline."
> [R: searches "BrowserStack" — no results. Docker "Don't remember"/working — 10s. GHA "Don't remember"/working — 8s.]
> [Call ends at 7:30. TypeScript / python / vitest cards never touched.]

## 3. What TechVet would output

| Tech | Version | Depth | Verdict |
|------|---------|-------|---------|
| Playwright | unknown | very-deep | Yellow (Fix B: no depth-lift) |
| Selenium | 4 | deep | **Green** — `min:"4.0"` |
| pytest | 8 | deep | Green |
| JUnit | 5 | working | Green (added mid-call) |
| k6 | 1.0 | unknown | Green — `min:"1.0"` rubber-stamps |
| Cypress | "Not in stack" | — | Gray skipped (false — see §6) |
| Docker | unknown | working | Yellow, enterprise note suppressed |
| GitHub Actions | unknown | working | Yellow |
| TypeScript / python / vitest | (untouched) | — | "Not discussed" (Fix G) |

**Summary:** ~5 Green, 3 Yellow, 0 Red, 1 Skipped, 3 Not Discussed. PDF reads competent-but-thin — migration story, platform leadership, Cypress-as-judgment, and TestNG / REST Assured / BrowserStack all invisible.

## 4. Accuracy judgement

- **Where it's right:** Selenium 4 + deep + migration → Green is correct. Tier-level `enterpriseStillUsed` only fires on Selenium 3 (Yellow), so the "migrated off 3" detail doesn't trigger a confused note. Fix B is correct on Playwright auto-update.
- **Where it over-rates:** k6 "1.0" hits Excellent with zero corroboration on a load tool where meaningful depth is "X scenarios, Y RPS, in CI." Same `min:"0"` rubber-stamp shape Fix J cleaned up for Snowflake/GraphQL/gRPC; k6 wasn't audited. JUnit "5" → Good without asking Jupiter-vs-Vintage.
- **Where it under-rates:** Playwright at Yellow when this is the **most credible Playwright operator the recruiter will see this week**. Fix B is structurally right (no version evidence → no lift) but produces a *worse* signal than a guess. Hiring manager reads "Review / Probe" and discounts him.
- **Silent on what a hiring manager needs to know:** The migration story. Pranav's hireability is 70% "led an 18-month Selenium → Playwright migration" — nowhere to record direction-of-travel or rip-and-replace work. Cypress = "Not in stack" is *factually wrong*: he ran a 6-week POC. TestNG / REST Assured / BrowserStack don't exist in catalog — three named techs dropped on the floor.

## 5. Friction during the call

- **Three failed searches** (REST Assured, TestNG, BrowserStack) cost ~22s of dead time mid-call while Pranav kept talking. Recruiter fell behind, never revisited 3 of 8 preloaded cards.
- **Version field forced a binary** on Playwright ("type a number" vs "Don't remember"). The honest answer — "Renovate auto-updates weekly" — has no representation; the resulting Yellow misreads as ignorance.
- **No way to log Cypress as "rejected after evaluation."** Tri-state covers two of three states the recruiter heard.
- **JUnit not in QA template** — named second by the candidate, cost 18s to search/add. Should be preloaded.
- **Scope dropdown never opened** — phone budget didn't allow. No QA-default helped (Fix K only ships defaults for AI/ML).

## 6. Bugs / structural defects

1. **QA template is version-shaped for a service-shaped role.** Esi flagged it in round 1; round 3 confirms with a different candidate. Test work is "what do you cover" (UI / API / load / contract / a11y / cross-browser / visual), not "what version of Playwright." A checklist would catch Pranav's depth in 4 ticks; the version field catches none. **High** — no action in 4 weeks.
2. **Fix D (`phoneScreenPivot`) promised in round-2 cross-cut, not shipped.** No grep hit in `src/`. Without it, reading 12 services aloud stays unworkable on phone even if checklist-mode lands. **High** — blocks the remediation path for #1.
3. **"Not in stack" conflates three states.** Evaluated-and-rejected, deliberately-deprecated, never-touched all collapse to one gray pill. The first two are the *strongest* recruiting signal. Round-2 D3 still open. **High.**
4. **QA template excludes JUnit.** `junit` exists in catalog but isn't preloaded. Java-test candidates pay a search-tax. One-line fix. **Medium.**
5. **k6 `min:"1.0"` rubber-stamps "1.0" → Green** with no checklist of what the candidate load-tests. Same shape Fix J cleaned up for Snowflake; k6 wasn't audited. **Medium.**
6. **No "Managed / auto-updated" button** for toolchain-pinned tools (Playwright, Vitest, Renovate-managed packages). Round-2 Fix F, still open. **Medium.**

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate):**
  - Preloaded card + version-known: 1s click + 3s type + 3s depth = **~7s** ✓
  - Preloaded card + "Don't remember": 1s + 1s + 3s = **~5s** ✓
  - Manually-added tech (JUnit): search 4s + scan 3s + click 1s + type 3s + depth 3s = **~14-18s** ✗
  - Failed search: ~6-8s before abandon. **Three failed searches = ~22s, ~5% of total call budget on zero output.**
- **Phone-shrink test:** This *is* the phone test. What broke: (a) catalog gaps caused unrecoverable mid-call dead time; (b) recruiter fell behind, leaving 3 cards Not Discussed — correct behavior but half-empty PDF; (c) scope dropdown never opened — Fix K defaults don't ship for testing techs, so Pranav's natural Greens are uncapped operator Greens.
- **Friction that vanishes on phone:** On video the recruiter would have probed the auto-update story ("1.50 or older?"). On phone there is zero time; "Don't remember" is honest, the resulting Yellow misleads.
- **Risk / safe rating: At-risk.** Survives mechanically, but the PDF under-represents Pranav enough that a hiring manager would deprioritize him over a less-experienced candidate whose cards scored Green. Three things converge: catalog gaps, version-shape mismatch, missing "rejected/migrated-off" state.

## 7. Catalog gaps

- **TestNG** — Java test runner, named explicitly. Missing.
- **REST Assured** — dominant Java REST API DSL. Missing.
- **BrowserStack / Sauce Labs / LambdaTest** — cross-browser cloud. No Testing-Infrastructure category exists.
- **Postman / Newman** — expected by hiring manager for API QA. Missing.
- **Allure / ReportPortal** — test reporting. Missing (lower priority).
- **Maven / Gradle** — already on round-2 Fix I list; Pranav touches both daily.

## 8. One-liner for cross-cut

> **Pranav — QA / Test Engineer — Playwright lead with 18-month Selenium-migration story scores 3 Yellows + 1 false "Not in stack" because (a) version-shape template can't capture test coverage, (b) auto-update is unrepresentable, (c) "evaluated and rejected" collapses to "didn't use", (d) TestNG/REST Assured/BrowserStack vanish on search.**

## 9. Recommendation

**Convert Playwright and Selenium to checklist-mode and ship Fix D (`phoneScreenPivot`) together.** A Playwright checklist `[trace viewer, fixtures, component testing, BiDi/network mock, parallel projects, codegen, CI integration, visual regression, a11y tree]` would catch Pranav's depth in 4 ticks; Selenium's `[Grid 4, BiDi, IDE, Page Object, parallel, cross-browser]` would surface the migration. Pair with **a 4th button "Evaluated / migrated off"** so Cypress's recruiting signal isn't lost. Together these lift Pranav from a misleading PDF (3 Yellows + a false skip) to one that surfaces his actual leverage — short-list vs pass.
