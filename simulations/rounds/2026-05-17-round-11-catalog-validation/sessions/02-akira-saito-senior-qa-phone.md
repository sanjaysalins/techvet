# Round-11 catalog validation — Akira Saito (Senior QA / Test Engineer, phone)

## 1. Persona inhabited

I'm Akira Saito, 33, nine years deep on QA at a Tokyo SaaS shop (multi-tenant
B2B, ~120 engineers, three product squads). I own three things that nobody
else wants to own:

- The cross-team Playwright fleet (~3,400 specs across 4 repos, sharded).
- The flake budget (we run an SLO-aligned quarantine — anything > 1.5%
  flake-rate over a 14-day window moves to quarantine, and the squad that
  authored it has a sprint to fix-or-delete).
- The perf-regression gates (Lighthouse CI on every PR for the consumer-facing
  surfaces, plus a separate k6 nightly that exercises the SLO-aligned
  scenarios against staging).

My current "I'm proud of this" project is the Pact rollout. Six months ago
we had three services that were silently breaking each other's integration
tests on shared staging; one of them had a webhook contract that changed
five times in a quarter without telling consumers. I led the Pact rollout
across all three. Pact Broker self-hosted (we're not paying PactFlow yet
— maybe next year if can-i-deploy proves out), can-i-deploy gating on the
release pipeline, consumer tests in the consumer repos, provider verification
on PR for the provider services. Working on bi-directional next because one
of the providers is a vendor SDK we can't add consumer-driven tests to and
we want to verify against their OpenAPI spec.

Stack the recruiter will hear about:
- **Playwright** — daily driver, deep. I've authored the sharding/parallelism
  setup, the trace-on-retry pattern, the auth-state-reuse fixtures.
- **Cypress** — legacy. Two squads still maintain ~600 specs; we have a
  migration deck but no calendar commitment.
- **Pytest** — backend integration tests, fluent.
- **Vitest** — for the design-system package's unit tests.
- **Selenium** — embarrassing. We have two suites a partner integration team
  still depends on. Last meaningful touch: ~2yr ago. We keep meaning to
  delete them.
- **Pact** — six-month-old rollout. I'd put myself at deep-but-not-very-deep.
- **Cucumber** — one legacy team has a 6.x suite. I don't write new Cucumber
  tests. I read them when they break. I know enough to not be wrong.
- **TS / Python / GHA** — workhorse tools.
- **Percy** — we use it for the marketing site visual regression. Light usage.
- **k6 / Lighthouse CI** — the perf-regression discipline above.

Channel: phone. Budget: 8 minutes. The recruiter (Hiro) is a 28-year-old
agency recruiter, has my CV in front of him, knows the role is "Senior QA
to inherit cross-team test platform at a Series-C fintech." I don't have
slides. I'm walking from the lunch room back to my desk.

## 2. Phone call — abbreviated

**[00:00] Hiro:** "Thanks for taking the call, Akira. I'll keep this to
eight minutes. I'm using a quick tech-screening tool — I'll pick the QA
template and we'll walk through your stack."

**Hiro picks QA / Test Engineer template.** Seven techs preload as cards:
Playwright, Cypress, Pytest, Vitest, TypeScript, Python, GitHub Actions.
Eight methodology chips render in the chip-set:

- Test pyramid
- Contract testing (Pact / consumer-driven)
- Test data management (factories / anonymized prod)
- Accessibility (WCAG 2.x)
- Perf-regression gates (Lighthouse CI / Web Vitals budgets)
- Load-testing discipline (k6 / scenarios / SLO-aligned)
- Visual regression (Percy / Chromatic / snapshot)
- Flaky test triage + quarantine (SLO-based budgeting)

No Selenium card. Good — Hiro doesn't have to remember to mark it not-used
for the modern QA shops.

**[00:25] Playwright.** "Daily driver. I author the framework — sharding,
trace-on-retry, auth-state-reuse fixtures, custom matchers for our domain
objects. Version 1.51, but more importantly we just shipped the fleet onto
the new test-runner sharding config." Hiro types **1.51**, selects depth
**very-deep**. Card goes Green / Excellent. Hiro doesn't probe further;
the depth carries it.

**[00:55] Cypress.** "Legacy. Two squads, ~600 specs, we have a deprecation
deck. I read it, I don't write it. Version 13.x I think." Hiro types
**13**, depth **working**. Green / Good. Hiro asks: "Migration plan?"
I say: "Nothing on the calendar. The squads own it and they're prioritizing
features. We'll move when there's a concrete pain — probably parallelism
cost." Hiro types this into Cypress notes.

**[01:30] Pytest.** "Backend integration tests. Fluent. ~8 years usage,
version 8.x." Hiro types **8**, depth **deep**. Green / Excellent.

**[01:45] Vitest.** "Design-system package. Lighter usage but I authored
the harness for snapshot-test stability under React 19. Version 3.x." Hiro
types **3**, depth **working**. Green / Excellent.

**[02:00] TypeScript / Python / GHA.** Quick passes. TS 5.6 / deep. Python
3.12 / deep. GHA — I author the cross-repo reusable workflow library. Hiro
ticks deep. Three Greens.

**[02:50] Hiro:** "Anything else in your testing stack?" This is the moment.

**[02:55] Me:** "Yes. Pact. We just rolled out across three services.
Self-hosted Broker, can-i-deploy gating CI, working on bi-directional next."

**Hiro searches "Pact"** in the add-tech search. **A catalog card appears**
— Pact (Contract Testing), checklist mode. He adds it. Eight services
appear as checkboxes:

1. Consumer-side test authoring — tick. "We author consumer tests in three
   repos."
2. Provider verification — tick. "Provider verification on PR for each
   provider service."
3. Pact Broker (self-hosted or PactFlow) — tick. "Self-hosted."
4. can-i-deploy gating in CI — tick. "Yes, gates release pipeline."
5. Matchers + provider states — tick. "Matchers we use; provider states we
   use lightly — only on the auth service."
6. Bi-directional contracts (OpenAPI / Postman) — half-tick. "Working on
   it. We've POC'd against one provider's OpenAPI." Hiro leaves unchecked,
   makes a note.
7. Webhooks + version selectors — tick. "We use version selectors per
   environment. Webhooks aren't wired yet."
8. Cross-team rollout strategy — tick. "I led the rollout, three teams."

**Result: 7/8 ticked → Green (≥66% threshold, well clear).** Card label
reads "Strong coverage" or similar; the checklistGuidance copy under the
card mentions "Pact Broker + can-i-deploy gating is the production-quality
signal."

Hiro: "Good, that's exactly what the JD is looking for."

**[04:50] Me:** "There's a legacy team on Cucumber 6.x. I don't write new
Cucumber, but I read it."

**Hiro searches "Cucumber"** — **catalog hit**, version-mode card. Adds.
Types **6**, depth **shallow**.

Card resolves: 6 matches the `min:"6"` Yellow tier → **Review / Probe**,
enterpriseStillUsed flag fires → "Still widely used in many enterprise
applications" reassurance note appears. Hiro reads it: "OK — so legacy
but defensible. You're not the Cucumber author, just a reader."

**[05:25] Hiro:** "What about Selenium? CV mentions it." I sigh. "Two
legacy suites a partner integration team depends on. Last meaningful
touch ~2yr ago. We keep meaning to delete."

**Hiro searches Selenium** — catalog hit. Adds. Types **3.141** (the
canonical Selenium 3 final), depth **shallow**, lastUsed **2yr**.

Card resolves: 3.141 matches Selenium 3.x tier → Yellow + tier-level
enterpriseStillUsed. Then `applyRecency` fires: bucket=stale, color=yellow,
enterpriseStillUsed=true, seniority not junior → softener path. The
**neutral round-7 7B wording** lands: *"Stale (2-4 yr) but the version
was current at last-use — defensible older usage; probe whether the
candidate is returning to it or deliberately moved off."*

Hiro reads it back. "So this is your moved-off case. Got it."

**[06:10] Hiro:** "Percy?" I say: "Light usage on the marketing site.
Not deep." Hiro searches Percy — **no catalog hit**. He uses the free-text
"named-only" path (round-8 tooling). Same for **Chromatic** — named-only.
This is fine; it's the long tail.

**[06:35] Chips.** Hiro reads the eight chips. I tick:

- Test pyramid — yes. "We hold a 70/20/10 split."
- Contract testing — yes (Pact already ticked, this chip is the
  methodology-level confirmation).
- Test data management — yes. "Factory pattern for fixtures + an
  anonymized prod-data subset for staging integration tests."
- Perf-regression gates — yes. "Lighthouse CI on every PR for consumer
  surfaces."
- Load-testing discipline — yes. "k6 nightly, SLO-aligned scenarios,
  alerts on regression vs 14-day baseline."
- Visual regression — yes. "Percy on marketing, snapshot on design-system."
- Flaky test management — yes. "SLO-aligned quarantine, the thing I'm
  proud of."

Skipped: Accessibility (WCAG 2.x). "We have an a11y discipline but it's
owned by a separate accessibility specialist; I review, don't lead."

**Seven of eight chips ticked.** That's a senior-QA fingerprint.

**[07:30] Hiro:** "OK, generating the report. Sending PDF after. Thanks
Akira."

**[07:45] Call ends.** Time-to-Summary: ~7m45s. Inside the 8-min budget.

## 3. Post-call: report read

Hiro flips to Summary. Radar chart shows two filled categories: **Testing**
(dominant, with Playwright/Cypress/Pytest/Vitest/Selenium/Pact/Cucumber
all contributing) and **Language** (TS/Python). DevOps shows one entry
(GHA). The radar reads as a Testing-shaped specialist — which is the
correct shape for a Senior QA.

**Tier buckets:**

- **Strengths (Green):** Playwright (very-deep), Pytest, Vitest,
  TypeScript, Python, GHA, Pact (7/8 services).
- **Review / Probe (Yellow):** Cypress (defensible legacy), Cucumber
  (legacy reader-only, enterprise note fires), Selenium (softener note
  fires — "defensible older usage").
- **Concerns (Red):** none.

**Methodology chips section** lists 7 chips clean — the chip refresh
(round-9 9D) means perf-regression-gates and load-testing-discipline are
both visible, capturing my Lighthouse CI / k6 distinction without me
having to free-text it. Test-data-management chip captures the factory
+ anonymized-prod ethic. Visual-regression chip captures Percy usage
even though Percy itself was named-only.

PDF generates clean — three pages A4, ~310 KB. Header sticky-overlap
glitch on the live page doesn't affect the PDF.

## 4. Findings

Numbered. Each tagged **VALIDATION** (round-11 batch behaves as designed)
or **NEW** (defect / proposal surfaced this session).

### F1. VALIDATION — Pact catalog entry: 8 services match Akira's rollout shape

Reading `src/data/technologies.json:4553-4574`, the Pact catalog entry has
exactly the eight services the round-11 spec called for: consumer-tests,
provider-verification, pact-broker, can-i-deploy, matchers-state,
bi-directional, webhooks-versioning, rollout-strategy. Every single one
maps to something I have an opinion about. Coverage threshold (7/8 = 87.5%)
clears the 66% Green floor cleanly. checklistGuidance copy is correct
("Pact Broker + can-i-deploy gating is the production-quality signal").
**This entry was authored by someone who has actually rolled out Pact.**

### F2. VALIDATION — Cucumber catalog entry: tiers fire correctly for legacy-reader case

Reading `src/data/technologies.json:4576-4593`, Cucumber is version-mode
with tiers `10/8/6/4/0`. Typing **6** in `parseVersion` returns `[6]`,
which `compareVersions` against tier-min `"6"` `[6]` returns 0 (equal) →
matches the 6.x tier (Yellow + enterpriseStillUsed). The enterpriseNote
fires on the tier-level flag (root flag is `false`, which is correct —
we don't want 8.x firing the reassurance note). The "Still widely used
in many enterprise applications" note is exactly the framing a recruiter
needs to read my legacy-reader story.

### F3. VALIDATION — QA template preload + chip-set match round-9 9D

Reading `src/data/roles.ts:412-439`:
- `techIds`: `['playwright', 'cypress', 'pytest', 'vitest', 'typescript',
  'python', 'github-actions']` — exactly 7, no Selenium. Round-9 9D Akira-F4
  fix holds.
- `methodologyChips`: 8 chips with the round-9 9D split — perf-regression-gates
  and load-testing-discipline are separate (Lighthouse vs k6 distinction
  honored), visual-regression-qa present, test-data-management replaces
  niche mutation-testing. **All four 9D chips visible on this session.**

### F4. VALIDATION — Selenium softener wording lands neutrally on the moved-off case

Reading `src/lib/scoring.ts:208-217`: `applyRecency` softener path with
`recencyDirection: 'softener'` produces the round-7 7B neutral wording:
*"Stale (2-4 yr) but the version was current at last-use — defensible
older usage; probe whether the candidate is returning to it or deliberately
moved off."* This is correct framing for my "we keep meaning to delete"
shape — I'm not a returner and I'm not deliberately moving off, I'm
*aware* of legacy I haven't deleted yet. The neutral phrasing accommodates
all three (returner / moved-off / unmoved-on-legacy) without overcommitting
to a story.

### F5. VALIDATION — Time-to-Summary within 8-min budget

Walked through 10 techs (7 preloaded + Pact + Cucumber + Selenium added
mid-call) plus 7 chips in ~7m45s, with three search-adds. The preload
elimination of Selenium (round-9 9D) bought back ~10-15s on the not-used
click; the Pact catalog entry (round-11) bought back another ~30s on
what would have been a free-text capture session. Both compound into
the 8-min budget hitting comfortably rather than at the line.

### F6. NEW — Cucumber `currentVersion: "10.x"` is suspect for 2026

Reading `technologies.json:4579`, Cucumber's currentVersion is declared
as "10.x". The Cucumber project ships under at least three implementations
(Cucumber-JVM, Cucumber-JS, Cucumber-Ruby), each with its own version
line. In 2026 production:
- **Cucumber-JVM** is at 7.x (the canonical Java Cucumber).
- **Cucumber-JS** is at 11.x.
- **Cucumber-Ruby** is at 9.x.

There is no unified "Cucumber 10.x" line. The tier mins (10 / 8 / 6 / 4)
will work in practice because most candidates type their *implementation*'s
version, but the tier copy on the 10.x tier — "current generation,
async/Promise-friendly across JVM and JS runners" — is **wrong**: 10.x
exists only in Cucumber-JS, and JVM's "current" is 7.x. A 2026 candidate
who answers "Cucumber-JVM 7" will type **7**, hit the **8** tier-min
… wait, `compareVersions("7", "8")` is negative, so 7 falls through to
the **6** tier-min (Yellow + enterpriseStillUsed). **That misclassifies
current Cucumber-JVM as legacy.**

**Proposal:** either (a) collapse Cucumber to checklist-mode (services
like step-definitions, expressions, hooks, parallelism, BDD-PM-engagement,
reporting) — same shape as round-11 Pact; or (b) keep version-mode but
fix the tier-mins to floor at "7" (or "6.x" for JVM and "8.x" for JS as
the Yellow tier) and rewrite the 10.x tier note to name JS explicitly.
Option (a) is more honest because Cucumber's senior signal is BDD
discipline, not version freshness.

### F7. NEW — Pact's 8 services are canonical but miss one 2026 vocabulary

Reading the Pact services list, the eight items cover the rollout
discipline I'd grade on. **One absence worth naming:** there's no chip
for **Pact in polyglot codebases / language-pair interop**. Real 2026
Pact rollouts almost always span at least two language stacks (Pact-JS
consumer ↔ Pact-JVM provider, or Pact-Python consumer ↔ Pact-Go provider).
The interop discipline — keeping pact spec versions aligned across
language bindings, dealing with the JSON-spec-level differences between
pact-ruby-standalone and the native bindings — is a senior-Pact signal
that the current eight services don't surface. Cross-team-rollout is
adjacent but not the same thing (rollout is org-shape, polyglot is
tech-shape).

**Proposal:** consider adding a ninth service `polyglot-pact` ("Pact in
polyglot codebases — spec-version alignment across language bindings"),
or fold it into matchers-state as `matchers-state-polyglot`. Not blocking
for round-11 — round-11 Pact catalog entry is correctly shipped — but
worth picking up in a future refresh if recruiters report seniority signal
loss for polyglot shops.

### F8. NEW (minor) — checklistTouched semantics work for Pact but I'd test 0/8

I ticked 7/8 immediately, so the `checklistTouched` flag isn't load-bearing
for this session. But the round-9 SQL test case (untouched-0/N = Yellow,
touched-then-cleared 0/N = Red) hasn't been re-validated for Pact. **If
a candidate volunteers Pact, the recruiter adds it but never clicks any
service, the card should resolve as Yellow "Not yet assessed."** Worth
a one-line spot-check in a future regression pass; not validated this
session.

### F9. NEW (proposal, not defect) — chip-card lift for "deep" depth on Pact

Round-11 Pact is checklist-mode. I rated myself "deep but not very-deep"
on Pact verbally to Hiro, but the checklist card doesn't capture *depth*
the way version-mode cards do — coverage carries the signal. **This is
arguably correct** (checklist coverage IS the depth proxy), but for
Pact specifically, "5/8 services + very-deep on the 5 I do" reads
differently from "7/8 services + shallow on most." The former is the
shape of someone who deeply owns the consumer-driven discipline at a
small org; the latter is the shape of someone who tickbox-rolled-out
Pact at a large org with shallow practice. The catalog doesn't currently
let me distinguish. **Not a round-11 defect** — same shape applies to
every checklist-mode tech — just worth naming.

## 5. Round-11 verdict

**Round-11 catalog batch lands cleanly for the QA / Test Engineer flow.**

The two new catalog entries (Pact, Cucumber) both score correctly for
Akira's session shape. Pact's 8 services are canonical for a Pact rollout
practitioner — coverage threshold fires Green at 7/8 as expected, the
checklistGuidance copy reads as written-by-someone-who-knows. Cucumber's
version-mode tiers fire correctly for the legacy-reader case (6 → Yellow
+ enterpriseStillUsed reassurance note).

The previously-shipped round-9 9D template changes (no Selenium preload,
8-chip refresh with perf-regression-gates / load-testing-discipline /
visual-regression-qa / test-data-management) hold across this session
and continue to land time-to-Summary inside the 8-min phone budget.

**Two findings to address in a future round** (not blocking round-11
ship):

- **F6 (Cucumber version-mode is wrong for the polyglot reality):**
  recommend switching Cucumber to checklist-mode in a future catalog
  refresh, since version tiers can't honestly span JVM/JS/Ruby. If
  staying version-mode, fix the 10.x tier copy to name JS specifically
  and consider lowering tier-mins.
- **F7 (Pact missing polyglot-interop service):** consider adding a
  ninth service or merging into matchers-state in a future refresh.

**No defects in round-11 itself.** Ship.
