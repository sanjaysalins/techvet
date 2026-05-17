# Session 05 — Akira Saito (Senior QA / Test Engineer, phone)

Round 9, 2026-05-17. **First-ever end-to-end validation of the QA template.**
Rounds 1–8 never put a QA persona on the dock — no recruiter had ever picked
"QA / Test Engineer" on the Landing grid before this session. The lens for
round 9 is structural: does the chip-set exist, does it carry the right
QA-shaped axes, does the 8-tech preload survive contact, and do 7B (softener
neutral wording) + 7E (tier-level enterpriseStillUsed audit) hold on a
QA-specific case (Selenium 2 yr ago, legacy band).

## 1. Persona inhabited

**Akira Saito, 33.** Nine years QA at a Tokyo-based SaaS doing a B2B project-
management tool (~150 engineers, ~40 QA across teams). Recently promoted to
QA-lead-of-leads — owns the cross-team Playwright e2e suite, the flake-budget
SLO process, and the perf-regression pipeline that gates every PR. Just rolled
out Pact contract testing across three services last quarter. Bilingual JA/EN
— answers in fluent but slightly precise English (uses "we keep meaning to
delete" honestly; doesn't oversell). Reviews QA PRs across teams; coaches
juniors on test-pyramid ratios.

**Stack as Akira would describe it on the phone:**

- Playwright 1.52, four years, owns the cross-team suite — deep
- Cypress 10-ish ("we're migrating off, ~1 yr left"), one year remaining
- Pytest 8.x, three years, owns backend API test framework
- Vitest 2.x, six months, just adopted on a couple of new FE services
- Selenium 3.x ("legacy, we keep meaning to delete"), last touched 2 years ago
- TypeScript 5.4 — working depth, types test fixtures
- Python 3.12 — working, pytest + perf scripts
- GitHub Actions, deep, owns CI test orchestration across teams

**Methodology arsenal** (the senior signal): flake budgeting (SLO-based —
delete tests that flake >X% in a sprint), perf-regression gates (Lighthouse CI
+ custom k6 scenarios on every PR), contract testing (Pact rollout across 3
services), test-pyramid coaching (unit → integration → e2e ratio targets),
visual regression (Percy + Chromatic — small adoption).

**Hiro Tanaka, 41.** Internal recruiter at a US-based remote-first SaaS hiring
a Staff QA. Phone, 8 minutes scheduled, the Staff role wants someone who can
own cross-team test infra and coach pyramid discipline. Hiro is reasonably
fluent in TechVet (8 rounds of org-internal use) but has never picked the QA
template before — every previous req was dev / SRE / data-engineering shaped.

## 2. Phone call — abbreviated

Hiro opens `/#/`, picks **QA / Test Engineer** on the Landing grid for the
first time ever. Eight cards preload across one or two categories
(`roles.ts:370` — `['playwright', 'cypress', 'pytest', 'vitest', 'selenium',
'typescript', 'python', 'github-actions']`). All eight are in the **Testing**
category except `typescript` (Language), `python` (Language), `github-actions`
(DevOps). On the Assessment screen, three category blocks render — five
Testing cards stacked, two Language cards, one DevOps card.

> H: "Hi Akira, thanks for taking the call. I'll do a quick stack pass, then
> we'll talk about the Staff scope."
> A: "Yes, please go ahead."

**Playwright.** "Four years, I own our cross-team suite. 1.52 currently."
Hiro types `1.52`, depth = deep. Tier resolves to **Excellent / Green**
(`technologies.json:3135` — 1.50+ band, "trace viewer, UI mode, component
testing"). Probes auto-surface in the GuidancePanel: locator strategy, auth
state across tests, sharding/retries in CI. Hiro asks the sharding one —
Akira walks through three-way shard with retries=2 and per-shard traces
uploaded as artifacts. Hiro types `cross-team suite owner, 4yr, sharded
CI w/ traces` in the per-card notes.

**Cypress.** "We have a Cypress suite from before my time. We're migrating
off. 10-ish I think, maybe 11?" Hiro toggles "I don't remember" — version
input clears and disables (`scoring.ts:267-314` unknown-version path). Tier
resolves to **Yellow** with the "still widely used in many enterprise
applications" note attached (tier-level `enterpriseStillUsed: true` on
the 10–11 band — `technologies.json:3186-3191` — preserved through the
unknown-version path because `candidateHasMeaningfulDepth` is true: Akira's
depth = working). Akira adds: "It's frustrating to maintain. We have a year
of migration work."

**Pytest.** "8.x. Three years. I own the backend API test framework." Hiro
types `8.1`, depth = deep. Excellent / Green
(`technologies.json:3013` — 8.0+ band). No probe needed.

**Vitest.** "Six months. We adopted it for two new FE services. 2.0." Hiro
types `2.0`, depth = working. **Good / Green** (2.0 band,
`technologies.json:3101`). Akira: "Jest was painful with ESM, the migration
was clean."

**Selenium.** "Legacy. Selenium 3, we have two suites that we keep meaning
to delete. I touched them maybe two years ago to fix a flaky locator." Hiro
types `3.141`, depth = working, **lastUsed = 2 yr ago**. The tier matches
the Yellow 3.x band (`technologies.json:3228-3232`, tier-level
`enterpriseStillUsed: true`). Then `applyRecency` fires (`scoring.ts:189-218`):
bucket = `stale` (2 yr → `lastUsed.ts:88` `yearsAgo < 5` = stale), color is
already yellow not green, `tech.enterpriseStillUsed` is set at root too
(verified via `grep` — Selenium has it both root-level AND tier-level), and
seniority is not junior. **Softener fires**, neutral wording per 7B:

> "Stale (2-4 yr) but the version was current at last-use — defensible older
> usage; probe whether the candidate is returning to it or deliberately
> moved off."

Hiro reads this and probes: "Are you maintaining it actively?" Akira:
"No — frozen. We snapshot-test that it still passes and ignore it. We will
delete it." Hiro types `legacy, frozen, planned deletion`.

**TypeScript.** `5.4`, depth = working. Excellent / Green (5.0+ band).
Akira: "I write fixture types and per-test factories. Not advanced generics
work." Hiro doesn't probe further.

**Python.** `3.12`, depth = working. Excellent / Green. Akira: "Pytest
plus k6 scripts."

**GitHub Actions.** Checklist mode. Akira ticks: matrix builds, reusable
workflows, OIDC for cloud, caching, self-hosted runners, secrets management.
6 of 14 (estimated coverage). Hiro hits **66%-ish threshold** band — actually
6/14 = 43% which is **Yellow / 25–66%** (`scoring.ts` checklist thresholds
per CLAUDE.md). Akira: "I run our test orchestration for the whole org —
hosted runners, OIDC into AWS for the perf-regression Grafana push."

**Now the methodology chips.** Hiro scrolls to the chip-set
(`roles.ts:371-378` — 6 chips render). Reads them aloud to himself, ticks:

- ✓ Test pyramid (unit → integration → e2e) — Akira: "Yes, I coach this."
- ✓ Contract testing (Pact / consumer-driven) — Akira: "Three services
  this quarter. Brand new for us."
- ☐ Mutation testing — Akira: "No, we don't run mutation."
- ☐ Accessibility (WCAG 2.x) — Akira: "We have one a11y-focused engineer,
  not me directly."
- partial Performance budgets + Core Web Vitals — Akira: "We do perf
  regression but it's k6 load scenarios in CI, not CWV exactly. We do run
  Lighthouse CI but it's separate." Hiro hesitates; the chip lumps two
  things (CWV-frontend-perf and load/throughput-backend-perf) that Akira
  separates. He ticks it anyway with a note: `k6 load + Lighthouse CI,
  separate pipelines`.
- ✓ Flaky test triage + quarantine — Akira: "We have a flake-budget SLO.
  Tests that flake more than 2% in a sprint get auto-quarantined and the
  owning team has to fix or delete by sprint-end."

Then Akira volunteers two things that have nowhere to go:

> "We also do visual regression — Percy and Chromatic, small footprint.
> And I run the cross-team coaching on test pyramid ratios — we have a
> dashboard that tracks unit/integration/e2e ratios per service."

Hiro types both into the free-text **Methodology / practices** input
(separate from the chips). Akira's volunteered "visual regression" maps
to an existing chip in the FE template (`roles.ts:62` —
`visual-regression`), but **QA template doesn't carry it**. Senior QA
signal lost to free-text.

Wrap: 7:50. One minute under budget.

## 3. Post-call: report read

Hiro hits **Generate Summary**. Report loads in ~600 ms.

**Headline card row.** Played the role:

- Excellent: Playwright, Pytest, TypeScript, Python (4)
- Good: Vitest (1)
- Review / Probe: Cypress (unknown version, yellow tier), GitHub Actions
  (checklist 43%), Selenium (softener-yellow, recency-adjusted) — 3
- Concern: 0
- 0 not-discussed, 0 not-in-stack.

**Radar chart.** Two categories render (Testing, Language, DevOps —
actually three). Testing dominates with 5 cards averaged. Senior-coloured.

**Tier sections.** Each card renders its note. Three things stand out
when Hiro reads:

1. The **Selenium card** carries the 7B softener wording. The tier-level
   `enterpriseStillUsed` note ("Still widely used in many enterprise
   applications") **does NOT render** — this is correct per scoring.ts:350
   (`!withRecency.recencyAdjusted` gate). The softener message replaces
   the enterprise note. The composed label reads "Review / Probe (returner
   / moved-off)" or similar — recency direction = softener — and Hiro can
   tell the Yellow is because of staleness, not because of an unresolved
   probe. Round 7E's tier-level flag-preservation audit holds: the
   reassurance note CAN fire on Selenium 3.x, but only when there's no
   active recency adjustment competing for the same label slot.

2. The **Cypress card** correctly carries the enterprise note on the
   unknown-version path. Akira's depth = working satisfies
   `candidateHasMeaningfulDepth` (`scoring.ts:288`), seniority is
   senior (defaulted from Hiro's role pick — actually wait: Hiro never
   set seniority on the Assessment screen for this session — defaulted
   to unset, which means seniority !== 'junior' is true, so the note
   fires). The note reads as "common in long-lived projects" and the
   reassurance attaches. Fine.

3. The **methodology chips section** shows three ticked
   (test-pyramid, contract-testing, flaky-test-management) plus the
   half-ticked performance-budgets-with-note. The free-text input
   below shows `visual regression (Percy + Chromatic), cross-team
   test pyramid dashboard, flake-budget SLO 2%/sprint auto-quarantine`.

The **candidate-context line** at the top of the report (the
`meta.mandate` summary) Hiro typed: "Staff QA, remote-first US SaaS,
own cross-team test infra + coach pyramid discipline."

## 4. Findings

Findings are numbered. **[QA-1ST]** marks first-ever-QA-validation
findings — by definition these have never been seen before.

### Finding 1 — QA template HAS methodologyChips. Six of them. **[Verified, not gap]**

The pre-session hypothesis was "if QA template has no chips, that's THE
finding for round 9." Reading `roles.ts:370-379` confirms the chip-set
exists and ships six chips:

1. Test pyramid (unit → integration → e2e)
2. Contract testing (Pact / consumer-driven)
3. Mutation testing
4. Accessibility (WCAG 2.x)
5. Performance budgets + Core Web Vitals
6. Flaky test triage + quarantine

This is good. The Staff QA shape gets a chip-set on first contact. Three
chips landed crisply on Akira's stack (1, 2, 6). Two didn't (3, 4 — neither
applies to Akira's role). One was wrong-shape (5 — see Finding 2).

### Finding 2 — Chip 5 ("Performance budgets + Core Web Vitals") conflates two perf axes [QA-1ST]

CWV is a **frontend** perf concept — LCP / CLS / INP / TBT, browser-side
user-perceived latency. **Backend / load / throughput perf** is a different
axis — RPS, p95 latency, error rate under load, scripted via k6 or JMeter.
Akira does **both** but in separate pipelines: Lighthouse CI for CWV,
custom k6 scenarios for load. The chip forces her into a single tick + a
free-text clarifier ("k6 load + Lighthouse CI, separate pipelines"). This
loses signal on **which** type of perf-discipline the QA shop runs — and
the two are very different senior-QA shapes (FE-centric QA leads vs
platform-QA leads vs full-stack-QA leads).

Proposed fix: split chip 5 into two:

- 5a: **Performance regression gates (CI-blocking Lighthouse / WebPageTest)**
- 5b: **Load testing discipline (k6 / JMeter / Gatling scenarios + thresholds)**

Drop "Core Web Vitals" from the chip text — CWV is the metric, not the
methodology. The methodology is the gate. Recruiter ticks one or both.

### Finding 3 — Visual regression chip is MISSING from QA template [QA-1ST]

`roles.ts:62` ships `visual-regression` on the **Frontend** template
(added round 8 8E for Maya). The QA template — which is the most likely
home for "we run Percy / Chromatic across the suite" — doesn't carry it.
Akira volunteered Percy + Chromatic and Hiro had to free-text it. This is
the canonical Round-1 "Wendy AWS slice missing" shape: senior signal lost
because the chip-set didn't anticipate it.

Proposed fix: add chip 7 to the QA template:

- 7: **Visual regression (Percy / Chromatic / Storybook test-runner)**

This is independent of FE chip 6 (frontend's `visual-regression` chip) —
the FE chip captures "the FE engineer cares about it"; the QA chip
captures "the QA owns the visual-diff infrastructure." Different signals,
both worth surfacing.

### Finding 4 — "Test pyramid coaching" is captured as "test pyramid" only — coaching signal lost [QA-1ST]

Chip 1 is labelled "Test pyramid (unit → integration → e2e)" — implies
the candidate **knows** the pyramid. Doesn't distinguish "writes tests at
the right level" (mid-level signal) from "coaches teams on ratios and
maintains the dashboard" (Staff signal — Akira's role). For the QA
template specifically — which is the template most likely to be used for
Staff/Principal QA hires — this matters.

Proposed reframing: relabel chip 1 to **"Test pyramid coaching (ratio
targets + dashboards)"** to bias the chip toward Staff signal. Recruiters
hiring mid-level QA won't tick it (good — it's a Staff differentiator
when ticked). Recruiters hiring Staff will tick it precisely.

Counter-argument: the same logic could apply to half the chip-sets across
the catalog. We don't relabel "feature flags" on the Backend template
to "feature-flag platform ownership." The principle has been "chip names
generic; recruiter free-texts seniority depth in notes." Maybe leave chip 1
alone and rely on per-card / mandate free-text. Document the decision.

### Finding 5 — Mutation testing chip is the wrong axis for the modal QA shop [QA-1ST]

Mutation testing (Stryker / Pitest / mutmut) is a **niche** discipline in
2026 — heavily used in some Java shops, rarely seen elsewhere. Most QA
shops never run it. Akira's nine-year Tokyo SaaS doesn't. It's the
"slowly-changing-dims" of the QA chip-set — sounds rigorous on paper,
fires on a tiny fraction of candidates.

What would land more universally on a senior QA candidate? Options:

- **CDC contract testing** (separate from Pact — schema-first, OpenAPI
  conformance, Spring Cloud Contract): broader than Pact specifically.
- **Test data management** (factories, fixtures, prod-clone strategies):
  appears on most senior QA CVs.
- **Cross-team test-tooling ownership** (the "Akira shape" — owns the
  framework, coaches teams).
- **Chaos / fault-injection testing in CI**: emerging Staff QA practice.

Recommendation: replace `mutation-testing` with **`test-data-management`**
(label: "Test data management (factories / fixtures / prod-clone strategies)").
Hits broader QA archetypes; Staff-shape candidates volunteer it readily.

### Finding 6 — Catalog gaps: Pact, Percy, Chromatic, Lighthouse CI, Cucumber [QA-1ST + partial-verified]

Akira named five tools that aren't in `technologies.json`:

- **Pact** — contract testing. Critical. Akira's biggest recent project.
  Not in the catalog (`grep -i "pact"` returns zero matches outside of
  "compact" / "impact" / etc strings — none are tech entries).
- **Percy** — visual regression. Not in catalog.
- **Chromatic** — visual regression + Storybook integration. Not in catalog.
- **Lighthouse CI** — perf regression gate. Not in catalog.
- **Cucumber / Gherkin** — BDD. Not in catalog (Akira didn't mention, but
  the round prompt flagged it as widely-used).

**k6** IS in catalog (`technologies.json:3290-3328`). Good.

Recommendation for catalog refresh 2.1: add **Pact** (checklist mode —
consumer-driven flows / provider verification / broker setup / breaking-
change governance / contract negotiation discipline), add **Cucumber**
(version-mode, simple version tiers, enterpriseStillUsed yellow on older).
Defer Percy / Chromatic / Lighthouse CI to free-text-only — they're more
like commercial-product-tools than "skill signal" in the same way Datadog/
Sentry are: knowing them ≈ knowing their UI. They land naturally as
free-text in the methodology section.

### Finding 7 — Preload size: 8 techs is on the high end; Selenium is borderline-noisy [QA-1ST]

The preload of 8 (`roles.ts:370`) is at the top of the recruiter-attention
window — round 7's 7F broke Mobile into three sub-templates precisely
because 7 was too many. QA at 8 risks the same shape, but the calculus is
different: most QA candidates touch most of these. Akira touched 6 of 8
in active use, 1 in legacy (Selenium), 1 inferred (Vitest is recent).

The single most-borderline preload is **Selenium**. Selenium 4.x is a real
contemporary choice (BiDi protocol, modern); Selenium 3 is the legacy
shape Akira embodies. Preloading it forces every modern-only QA candidate
(Cypress/Playwright shop, no Selenium ever) to either click "not in stack"
or leave the card untouched (`notDiscussed` fallthrough). Both add friction.

Options:

- **A. Drop Selenium from preload.** Recruiter adds manually if relevant.
  Simpler default, catches modern QA shops first. Selenium recruiters
  spend the 4 seconds.
- **B. Keep Selenium, document it as the "legacy fallback" preload.**
  Status quo.
- **C. Conditional preload based on a Landing sub-template selector**
  ("Modern QA" vs "Mixed legacy QA") — round-7 7F shape. Probably overkill
  for 8 cards.

Recommendation: **A**. Drop Selenium. Modern QA hiring is the common case;
legacy-Selenium QA hiring is the exception and the recruiter is searching
for it specifically anyway.

### Finding 8 — TypeScript + Python both preloaded; senior QA candidates typically pick one deeply [QA-1ST]

Akira does both (TS for fixtures, Python for pytest + k6 scripts). But
the modal Staff-QA candidate is **language-asymmetric**: heavy JS/TS for
Playwright/Cypress shops, heavy Python for pytest/api-test shops. Preloading
both means one card is consistently "working" or "shallow" for most
candidates.

Counter: keeping both doesn't hurt — `notDiscussed` is a clean fallthrough.
Preloading both DOES surface the asymmetry on the radar (one Language card
green, one yellow / not-discussed) and that's actually decision-useful for
the Hiring Manager.

Leave as-is. No fix needed.

### Finding 9 — 7B softener wording held on Selenium [Verified — round-7 carryover]

The neutral wording from 7B ("defensible older usage; probe whether the
candidate is returning to it or deliberately moved off") rendered correctly
on Akira's Selenium card. The "we keep meaning to delete" case is exactly
the third axis the neutral wording was designed for (returner / moved-off /
team-won't-upgrade) and the text reads honestly. Hiro's read-off
("Are you maintaining it actively?") landed naturally from the softener
prompt. Round-7 7B holds on QA.

### Finding 10 — 7E tier-level flag audit held on Selenium [Verified — round-7 carryover]

`technologies.json:3231` carries `"enterpriseStillUsed": true` on the
3.x Yellow tier. Confirmed via direct read. The audit (which removed
**root-level** flags for kubernetes/kotlin/swift/react-native/terraform/
docker) explicitly preserved **tier-level** flags — and Selenium's tier-
level flag is exactly the shape that audit was supposed to keep. The
reassurance note correctly attaches on the Yellow 3.x band when no
recency adjustment competes for the label slot (in Akira's case the
recency softener took precedence and the enterpriseNote was suppressed
by `scoring.ts:350` — `!withRecency.recencyAdjusted`). Both behaviors
are correct.

### Finding 11 — Where does Akira's cross-team coaching / SLO discipline land on the report? [QA-1ST]

The free-text methodology field captured: `visual regression (Percy +
Chromatic), cross-team test pyramid dashboard, flake-budget SLO 2%/sprint
auto-quarantine`. This is **Staff-level signal** that the HM reading the
PDF will see only if they read the free-text block.

The headline cards show "8 of 8 in-stack, 4 Excellent / 1 Good / 3 Yellow"
— which reads as "good senior IC" but not **"Staff cross-team coach."**
The chip section shows 3 chips ticked which is fine but doesn't elevate
the Staff signal either.

This isn't a QA-specific gap — it's the same `mandate` + free-text-vs-
chip-vs-card tension we've hit in every round. But it's worth naming
because the QA template is **disproportionately likely to be used for
Staff/Principal hires** (more so than mid-level QA, given the cost of
the role). A "Staff signal" surfacing band on the report would help.

Deferred to a later round — out of round-9 scope but logged.

## 5. Round-9 verdict

**Round 9 ships a working QA template on first-ever validation.** The
hypothesis going in was "if QA has no chips, that's the finding" — the
hypothesis is wrong. QA HAS chips. The chip-set is **75% correct out of
the box** which is unusually good for a first-ever template validation
(round 1 SA had ~50% chip alignment; round 4 Security pre-Fix-U had ~30%).

**Five structural improvements to ship as a round-9 batch (call it 9A):**

1. **Split chip 5** into perf-regression-gates (CWV / Lighthouse) and
   load-testing-discipline (k6 / JMeter). Two ticks possible.
2. **Add chip 7**: visual regression (Percy / Chromatic / Storybook
   test-runner). Distinct from FE template's chip.
3. **Replace chip 3 (`mutation-testing`)** with `test-data-management`.
   Niche → universal. Mutation testing recruiters can free-text.
4. **Drop Selenium from preload.** 8 techs → 7 techs. Selenium recruiters
   add manually; modern QA recruiters get a cleaner default.
5. **Catalog 2.1 additions**: Pact (checklist), Cucumber (version). Pact
   is non-negotiable — Akira's biggest recent project has nowhere to land.
   Defer Percy / Chromatic / Lighthouse CI to free-text-only.

**Two findings to log + defer:**

6. Chip 1 ("Test pyramid") — coaching vs knowing signal collapsed.
   Document the decision; don't reframe.
7. Staff-signal-surfacing band on the Summary report — not QA-specific,
   not round-9 scope.

**Two findings verified, no action:**

8. 7B softener neutral wording holds on QA (Selenium 2-yr-ago case).
9. 7E tier-level enterpriseStillUsed audit holds on QA (Selenium 3.x band).

**Round 9 verdict:** QA template ships at 75% out-of-box on first
validation. The five 9A fixes raise it to ~95% coverage on the modern
Staff-QA shape. The first-ever validation went better than expected;
the chip-set author anticipated the right axes for the most part.

The next QA persona to test would be a **language-asymmetric Python-heavy
QA** (api-testing-only, no UI) to validate that the preload doesn't
over-fire FE-shaped expectations on a backend-QA candidate. Logged for
round 10 or later.
