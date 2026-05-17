# Session 04 — Lina Sandberg (Senior Fullstack, phone, 10 min)

**Round:** 10 (saturation validation)
**Batch under test:** First-ever end-to-end validation of the Full-Stack
Developer template. Rounds 1–9 never put a fullstack persona on the dock —
which makes this the most-used template in production (universal first-pick
for generalists) and the *least* validated.
**Channel:** Phone, ~10 min. Recruiter Avery is internal at a NYC B2B SaaS
hiring senior fullstack — 6 month backfill, the candidate replacing the
person who just left owned the same three flows Lina owns today.
**Persona:** NEW — Lina Sandberg, 33, 8 yr fullstack at a US-East HR-tech
SaaS (~80 engineers). First time on the dock.

---

## 1. Persona inhabited

Lina Sandberg, 33. Currently a senior fullstack at a HR-tech B2B SaaS on the
East coast, ~80 engineers, 4 product squads. She owns three customer-facing
flows end-to-end — onboarding, billing, reporting — and that means she
writes React on the frontend, Node services on the backend, and ships the
AWS Lambda + RDS plumbing herself. Real fullstack, not "frontend dev who
also does Express." She reviews PRs across the stack and she's been on the
pager rotation for two years.

Her CV reads exactly the way a senior generalist's CV reads in 2026: React
18 (4 yr deep), TypeScript 5.4 strict mode, Next.js 14 App Router shipped in
the last 12 months, Tailwind 3 on the design-system, Node 22 LTS across four
microservices she owns, Express + tRPC (Express on the legacy boundary
services, tRPC on the two new ones she greenfielded last year), Postgres 16
with schema-design ownership (she wrote the 3-service partition strategy +
index audits), Docker multi-stage builds, AWS as a daily operator —
Lambda + API Gateway + RDS + S3 + Cognito.

Her methodology layer is the thing that actually differentiates her at
senior+: LaunchDarkly feature flags on every flow, trunk-based development
with PR-merge gates, Pact contract tests *across her 4 services* (this is
the strongest signal on the CV — most fullstack candidates have heard of
contract testing; she runs the rotation), Storybook governance on the
design system, OpenTelemetry tracing wired end-to-end from React → Node →
Lambda. She is exactly the shape of senior the NYC client is hiring.

Avery has 10 minutes. She's done four of these screens this morning. She's
going to pick **Full-Stack Developer** because that's what the JD says, and
she's going to expect the template to cover Lina's surface area.

I'm coming in cold — the Fullstack template has never been on the dock in
this harness, so I genuinely don't know what's going to break. The lens for
round 10 is: does the report come out **fullstack-shaped** — balanced
FE+BE+infra — or does it lean one-sided because the template only preloaded
6 cards and Lina's actual stack is 12+?

---

## 2. Phone call — abbreviated

**Avery (me):** "Lina, hi, got 10? I'm pre-screening senior fullstack —
React-Node-AWS shape, B2B SaaS. Walk me through your stack at a sprint level."

**Lina:** "Sure. React 18 on the FE, TypeScript 5.4 everywhere strict mode,
Next 14 App Router on the marketing surfaces, Tailwind 3 on the design
system. Node 22 LTS on four microservices, Postgres 16, Docker, AWS daily."

→ I pick **Full-Stack Developer** template. Six cards preload: React /
TypeScript / Node.js / Postgres / Docker / AWS. The AWS card has the
serviceTagFilter `['general', 'cicd']` (template default — `general` gives
the standard ~14 services, `cicd` adds CodeBuild/CodePipeline). Cognito is
*not on the AWS service list* (more on that below).

**Avery:** "React first — 18, deep?"

**Lina:** "4 years deep. Hooks, Suspense, RSC where it lands, Concurrent
mode for the heavy lists. I'm reviewing FE PRs daily."

→ React 18, depth **deep**, last used current. Green Excellent. Clean —
the 7D senior gate is preserved (no "extensive experience" caveat).

**Avery:** "TypeScript?"

**Lina:** "5.4, strict everywhere, project references across the four
services, satisfies operator on every public API. I write the codegen for
the tRPC routers."

→ TS 5.4, deep, current. Green Excellent. Senior signal — codegen + project
references is well above hobby.

**Avery:** "Node — version, and what's the surface?"

**Lina:** "22 LTS. Four services I own — billing, reporting, onboarding-orch,
notifications. ESM, Node test runner for unit, worker_threads for the report
generators. I'm on the pager for these."

→ Node 22, deep, operator. Green Good (Node 22 LTS — maintenance LTS tier;
24 is Excellent in catalog). Honest read — she's on 22 not 24, but it's still
LTS.

**Avery:** "Postgres."

**Lina:** "16. I own the schema for billing and reporting. Partitioning on
the events table, index audits quarterly, replication is streaming for the
read replica we use for the BI exports."

→ Postgres 16, deep, operator. Green Excellent. **But — the Postgres
catalog entry is version-mode only, no checklist.** Lina just volunteered
schema design + partitioning + indexing + replication — four senior signals
the card has nowhere to capture beyond the verdict color. I read the
`suggestedProbes` (JSONB / replication / EXPLAIN ANALYZE) — fine prompts, but
the report won't show *which* of those Lina has actually demonstrated. I
free-text "schema design + partitioning + index audits + streaming
replication" into the notes field. Cost ~12s.

**Avery:** "Docker?"

**Lina:** "29, multi-stage everywhere, distroless base for prod images, I
maintain the buildx CI lane."

→ Docker, version 29 (Excellent tier — 24+), deep, operator. Green
Excellent. Buildx + distroless is senior signal; same issue as Postgres —
no checklist mode, the prompt set is `["Multi-stage builds?", "Image size
optimization?", "Docker Compose v2 / Buildx?"]` and I tick mentally but the
report doesn't track them.

**Avery:** "AWS — what's day-to-day?"

**Lina:** "Lambda for the eventing pipeline, API Gateway in front of two
public APIs, RDS for the Postgres instances, S3 for the report exports
and customer document storage, Cognito for the multi-tenant auth — we run
our own user pools per workspace."

→ I open the AWS card. The Fullstack template applied
`serviceTagFilters: ['general', 'cicd']` so I see the 14 general services
plus CodeBuild / CodePipeline. I tick **Lambda / API Gateway / RDS / S3** —
clean. I scan for **Cognito** — and it's not there. Not under general, not
under any tag. I free-text "Cognito (user pools, multi-tenant per
workspace)" into the notes. Cost ~15s. This is the second-largest gap of
the session.

→ AWS verdict: 4 of 14 surfaced services ticked = 28% coverage = Yellow
(25–66% checklist threshold). With `operator` scope + `deep` depth lift,
that's still Yellow ("operating-signal range, narrowed to Lina's daily
surface"). Reasonable read for a candidate who's a Lambda+RDS specialist
not a 26-service tour-guide.

**Avery:** "Anything I'm missing from the stack?"

**Lina:** "Next 14 App Router, Tailwind 3, Express on legacy and tRPC on
the two new services. Storybook on the design system. OpenTelemetry
end-to-end. Pact contract tests across the four services. LaunchDarkly
flags. Trunk-based, PR gates."

→ This is where round 10 starts to show the saturation gaps. I have ~3
minutes left and I'm about to dispatch **six search-add clicks**: Next.js,
Tailwind, Express, tRPC, Storybook, observability. Plus methodology.

**Avery (working the search):** "Next.js 14, App Router…"

**Lina:** "Yep. RSC where it pays off, client components for the
interactive stuff, server actions for the form submissions."

→ Add Next.js 14, deep, operator. Green Good (App Router era — 13.4+ tier).
Clean.

**Avery:** "Tailwind."

**Lina:** "3.x. We own a design system on top, ~40 components. I'm not on 4
yet — we'll migrate next quarter."

→ Add Tailwind 3, deep, operator. Green Good. Honest read.

**Avery:** "Express + tRPC — how do they split?"

**Lina:** "Express on the two legacy services — billing-legacy and
onboarding-orch. tRPC on the two greenfield ones — reporting and
notifications. I greenfielded both."

→ Add Express 5 (deep, operator, Green Excellent). Add tRPC 11 (deep,
operator, Green Excellent — v11 current tier).

**Avery:** "Storybook."

**Lina:** "8, on the design-system repo. I run the visual regression rotation
via Chromatic."

→ Add Storybook 8, deep, operator. Green Good (7–8 tier). Chromatic note —
free-text "Chromatic visual regression" into notes.

**Avery:** "OpenTelemetry."

→ This one's interesting. OTel isn't a top-level catalog tech — it's a
**service inside the `observability` checklist** (line 2851 of the catalog).
So I search "observability" and add it. The card opens with 13 services —
Prometheus / Grafana / Loki / Tempo / Alertmanager / OpenTelemetry /
OTLP / Datadog / New Relic / Splunk / Honeycomb / Sentry / RUM. I tick
**OpenTelemetry SDK / Collector**, **OTLP exporters & semantic
conventions**, **Sentry**, **RUM** (Lina mentioned end-to-end React →
Lambda which implies RUM). 4/13 = 30%, Yellow. Honest.

**Avery:** "Methodology — feature flags, trunk-based, contract testing,
Storybook governance, OTel discipline?"

**Lina:** "All of those. LaunchDarkly for the flags, Pact for the contract
tests across the 4 services — I run the rotation."

→ I scroll to the methodology section on the Assessment screen, fully
expecting chips… and there are **none**. The Fullstack template has no
`methodologyChips`. Only the free-text fallback. I type:

> "Feature flags (LaunchDarkly), trunk-based dev with PR gates, contract
> testing (Pact across 4 services — Lina runs rotation), Storybook /
> Chromatic visual-regression governance, OpenTelemetry distributed
> tracing end-to-end."

Cost ~35s of typing on a phone call with ~90s left. This is the **biggest
single gap of the session.**

**Avery:** "Last thing — pager rotation?"

**Lina:** "Yes, 2 years, on-call every 4th week."

→ Free-text into notes.

**Time:** 9:50 of 10. End call.

---

## 3. Post-call: report read

Open the Summary. I read the radar first — 12 cards across Frontend
(React, TS, Next, Tailwind, Storybook), Backend (Node, Express, tRPC),
Database (Postgres), DevOps (Docker, observability), Cloud (AWS). That's
5 of the 11 catalog categories represented, which is the most categories
I've ever seen on a single report. Radar is **fullstack-shaped** — broad,
not deep on one axis. Visually it reads correctly.

Tier buckets:

- **Excellent (Green):** React 18, TS 5.4, Express 5, tRPC 11, Docker 29,
  Postgres 16 — 6 cards.
- **Good (Green):** Node 22, Next 14, Tailwind 3, Storybook 8 — 4 cards.
- **Review / Probe (Yellow):** AWS (4/14 services), observability
  (4/13 services) — 2 cards.

10 of 12 cards Green. The report headline reads "Excellent fullstack
candidate" — which is honest. The Yellow on AWS and observability is
*coverage*-Yellow not *concern*-Yellow, and the 7B softener wording I'd
expect ("operating-signal range, narrowed to daily surface") is doing its
job for AWS. Observability reads cleaner — 4/13 with senior-tier services
ticked (OTel/OTLP/Sentry/RUM) is *exactly* the shape of a fullstack who
uses tracing daily but isn't an SRE.

**Methodology block:** five lines of free-text. None of it is tagged,
none of it is structured. On a PDF read-out, this is going to look like a
notes field. Compare to the Backend template's report on Sven last round —
six chips ticked, each one tagged, sitting in a clean visual list. Lina's
methodology layer is *the strongest signal on her CV* and it shows up as
prose in a notes field.

**What's not in the report:** Lina's schema-design / partitioning /
indexing depth on Postgres. Lina's buildx / distroless depth on Docker.
Lina's Cognito daily usage (free-text only). Lina's Pact rotation
ownership (free-text only, no chip). Lina's LaunchDarkly choice (free-text
only, no chip).

The report is **honest** — no false positives, no false negatives. But it
**underrepresents senior signal by ~30%** vs what I captured in the call.
A junior fullstack with the same 12 cards ticked Green-Green-Yellow would
read identically on the headline, and that's the failure mode.

---

## 4. Findings

### F1 — FULLSTACK TEMPLATE HAS NO `methodologyChips` (BLOCKING for senior fullstack signal)

**FIRST-EVER finding.** The Fullstack template at `src/data/roles.ts:36-42`
has `techIds` and `serviceTagFilters` but no `methodologyChips` field. The
free-text fallback works — Sven's round-7 7A motivated the chip-set
addition for Backend on exactly this gap shape — but the Fullstack template
is the **broadest signal capture** in the harness. Cross-stack methodology
(feature flags, trunk-based, contract testing, OTel, design-system
discipline, a11y) is what differentiates a senior generalist from a junior
generalist. Free-text on a 10-min phone call costs ~30–40s; chip-tick costs
~1s per chip.

**Six chips to ship for Fullstack** — chosen to balance FE+BE+infra senior
signal, no chip duplicates one from a more-specific template's signal:

```ts
methodologyChips: [
  { id: 'feature-flags', label: 'Feature flags (LaunchDarkly / Unleash / OpenFeature)' },
  { id: 'trunk-based', label: 'Trunk-based development + PR-merge gates' },
  { id: 'contract-testing', label: 'Contract testing (Pact / consumer-driven)' },
  { id: 'otel-instrumentation', label: 'OpenTelemetry / distributed tracing end-to-end' },
  { id: 'design-system-discipline', label: 'Design-system / Storybook governance' },
  { id: 'a11y-program', label: 'Accessibility (WCAG 2.x) — program-level discipline' },
],
```

Note: `feature-flags`, `contract-testing`, `trunk-based`, `otel-instrumentation`
already exist as chip IDs on Backend/DevOps templates — re-use the same IDs so
report rendering stays uniform across templates. The chip-set is deliberately
balanced: 2 process (flags / trunk), 2 cross-service (contract / OTel),
2 FE-side (design-system / a11y). A senior fullstack who can tick 4+ of these
is the shape the NYC client is hiring.

**Priority: ship in next batch.** This is the equivalent of 7A's Sven fix
for Backend — same gap shape, same blast radius (every Fullstack screen
hits it), and Fullstack is likely the most-picked template in production.

---

### F2 — AWS catalog is missing Cognito (BLOCKING for any auth-touching fullstack/backend)

**FIRST-EVER finding** (Fullstack is the first template where Cognito would
be a daily operator surface — Backend template doesn't preload AWS, Security
template surfaces KMS/Macie/GuardDuty but not Cognito). The AWS service
checklist at `src/data/technologies.json:1928-1954` has 26 services across
4 tag groups (general / architect / security / cicd / container / data-ml).
Cognito is **absent entirely**. For a multi-tenant SaaS fullstack like Lina,
Cognito is on the same daily-touch axis as Lambda+API-Gateway+RDS+S3 — it's
how she ships auth.

**Ship:**
```json
{ "id": "cognito", "name": "Cognito (User pools / identity)", "tags": ["general", "security"] }
```

Tag with both `general` (so it surfaces on every template AWS card) and
`security` (so the AppSec template's security-tag filter catches it too).
The same gap likely exists for Azure AD / Entra ID and GCP Identity Platform —
worth a 3-line audit pass on the Azure and GCP service lists in the same batch.

---

### F3 — Postgres is version-mode only; no checklist for schema-design / indexing / partitioning / replication (senior DB signal lost)

**FIRST-EVER finding** in the sense that prior rounds vetted Postgres on
SA template (architect-scope) or DE template (reviewer-scope) — both
non-operator contexts where the version-tier is the right signal. Lina is
the first **operator-scope, deep-depth** Postgres I've vetted, and the
version-only treatment leaves the four richest senior signals — schema
design, index strategy, partitioning, replication topology — captured only
in the `suggestedProbes` prompt list, which doesn't render to the report.

This is the same gap shape that drove the SQL catalog to checklist-mode in
the round-5 era. Postgres has more surface than SQL-the-language; the
following 6-service checklist would capture the senior signals cleanly:

```json
"vetMode": "checklist",
"services": [
  { "id": "schema-design", "name": "Schema design + normalization strategy" },
  { "id": "indexing", "name": "Index strategy + EXPLAIN reading" },
  { "id": "partitioning", "name": "Partitioning (declarative / inheritance)" },
  { "id": "replication", "name": "Replication (streaming / logical)" },
  { "id": "jsonb", "name": "JSONB modeling + GIN indexes" },
  { "id": "vacuum-tuning", "name": "VACUUM / autovacuum tuning + bloat" }
]
```

**BUT** — this is non-trivial because Postgres currently has `versionTiers`
and `enterpriseStillUsed: true`, and converting to checklist-mode loses the
version-tier signal. The right shape may be a **hybrid mode** (version-mode
core + optional checklist-style "depth probes" that lift Yellow→Green on
senior signal, without flipping the whole card). That's a meatier architectural
change than F1 or F2 — flag for a dedicated round-11 design pass, don't ship
in the same batch as F1/F2.

The same hybrid case probably applies to **Docker** (multi-stage / buildx /
distroless / image-scanning are the operator signals, version is secondary).

---

### F4 — Fullstack 6-tech preload is too narrow; Lina's call dispatched 6 search-adds in ~3 minutes

**FIRST-EVER finding.** The preload covers React / TS / Node / Postgres /
Docker / AWS. Lina's actual day-to-day surface added: Next.js / Tailwind /
Express / tRPC / Storybook / observability — six more cards. That's
**twice the preload**, dispatched mid-call, on a 10-minute budget.

Compare to other templates:
- Frontend preloads 5 (react/ts/nextjs/tailwind/vite) — Lina's FE alone needs 5 of these
- Backend preloads 6 (node/python/postgres/redis/docker/kubernetes) — Lina's BE needs 4 of these
- Fullstack preloads 6 — the **intersection**, not the union

**Recommendation:** add **Next.js + Tailwind** to the Fullstack preload.
The Frontend template already does it; modern fullstack work in 2026 is
Next-first more often than not (App Router + RSC + server actions =
fullstack patterns). Express is harder — Express vs tRPC vs NestJS vs Hono
is a real divergence and forcing Express on the preload would mislead
non-Express stacks; **leave Express as named-only**. Same for tRPC.

Revised preload (8 techs):
```ts
techIds: ['react', 'typescript', 'nextjs', 'tailwind', 'nodejs', 'postgresql', 'docker', 'aws'],
```

This brings the dispatch count down from 6 to 4 (Express / tRPC /
Storybook / observability) — half the search-add tax — and the report
becomes more recognizably fullstack-shaped on the radar without the
recruiter doing extra work.

---

### F5 — Pact / LaunchDarkly named-only is OK for now but worth tracking

Pact and LaunchDarkly are not in the catalog. Akira flagged Pact in round
9 (QA template chip-set referenced Pact). Lina referenced both unprompted
as senior signals. Both ended up in the **free-text methodology field**,
which is fine *if F1 ships* — once `contract-testing` and `feature-flags`
chips exist on Fullstack, the named tool gets captured cleanly without
needing a dedicated catalog card. Defer Pact + LaunchDarkly as catalog
techs **conditional on F1 shipping**; revisit only if a future round shows
a recruiter trying to assess version/depth on these.

---

### F6 — Report headline reads correctly fullstack-shaped (positive finding)

Despite F1–F4, the radar + tier-bucket layout did produce a
**fullstack-shaped report** — 5 categories represented, 10/12 Green,
2 coverage-Yellows that read as "narrow to daily surface" rather than
concern. The headline narrative is correct. The failure mode is
*underrepresentation* of senior signal (methodology + Postgres depth +
Docker depth), not misrepresentation. That's a much friendlier failure
mode than the round-3 Aaron / round-4 Wendy false-positives that drove
the techScopes work — Fullstack template is **directionally sound**,
just **signal-thin** for senior+ candidates.

---

## 5. Round-10 verdict

**At-risk** — not unworkable, but not safe.

The Fullstack template **functions correctly** for an average-experience
fullstack candidate. The report reads honestly, the radar shape is right,
and the verdicts are not wrong. For a junior or mid-level fullstack, the
template would deliver a 7/10 report with no glaring gaps.

For **senior+ fullstack**, which is the population the template is most
often picked for (it's the universal first-pick for generalists), the
template **systematically underrepresents senior signal** along three
axes:

1. **Methodology layer** (F1) — no chips, free-text only. The single
   strongest signal differentiator for senior fullstack is invisible on
   the structured report.
2. **Auth daily surface** (F2) — Cognito missing from AWS service list;
   any auth-touching fullstack candidate eats a free-text dispatch.
3. **Database depth** (F3) — Postgres operator-scope deep candidates have
   no checklist to demonstrate schema/index/partition/replication depth.

F4 (preload width) is a quality-of-life finding rather than a blocking
correctness issue — but at 6 search-adds dispatched mid-call, it's eating
into the 10-min budget enough that senior signal gets *shortened* in the
methodology pass (where it matters most).

**Ship list for next batch (recommended order):**

1. **F1 — Fullstack methodologyChips (6 chips)** — direct port of the 7A
   pattern, reuse existing chip IDs where possible (`feature-flags`,
   `contract-testing`, `trunk-based`, `otel-instrumentation`), 30-line
   diff in `roles.ts`.
2. **F2 — Add Cognito to AWS service list** (+ audit Azure AD / GCP IdP) —
   3 lines of JSON, 0 logic changes.
3. **F4 — Add `nextjs` + `tailwind` to Fullstack preload** — 1-line diff
   in `roles.ts:40`.
4. **F3 — Postgres hybrid mode** — defer to a dedicated round-11 design
   pass; this changes scoring rules (version-tier + checklist depth), not
   a same-batch ship.

If F1 + F2 + F4 ship in the next batch, the Fullstack template moves from
**At-risk to Safe** for the senior+ fullstack population. F3 is the
medium-term DB-depth question that affects more than just Postgres —
it's the same shape Docker / Kubernetes / Node share, and it deserves its
own round.

The honest summary: **the first-ever Fullstack validation found exactly
the gap shape every "broad template" finding has had** — the broader the
role's daily surface, the more the version-tier-plus-checklist model
leaves senior signal on the table. Fullstack is the broadest. The gaps
were predictable in hindsight; they were just never exposed because no
prior round put a fullstack persona on the dock.
