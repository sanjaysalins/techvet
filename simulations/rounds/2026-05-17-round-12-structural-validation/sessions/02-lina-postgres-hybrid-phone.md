# Session 02 — Lina Sandberg redux (Senior Fullstack, Postgres-deep, phone)

**Round:** 12, structural-validation post-round-13 Postgres-hybrid batch
**Date:** 2026-05-17
**Channel:** Phone, 10 min hard cap
**Recruiter:** Avery (US-East B2B SaaS hiring manager — same role spec
as round 10 F4, second pass; first pass surfaced "Postgres signal lost
to suggestedProbes" as the Fullstack At-risk finding that drove the
hybrid conversion)
**Candidate:** Lina Sandberg, 33, 8 yr fullstack at a US-East B2B SaaS;
owns 3 customer-facing flows end-to-end; Postgres-deep at the
schema-design + indexing + query-planning level; reviews migration
PRs across 4 services
**Template under test:** `fullstack` — 8 preloads unchanged from
round 10 (`react`, `typescript`, `nextjs`, `tailwind`, `nodejs`,
`postgresql`, `docker`, `aws`)
**Catalog under test:** `postgresql` converted from version-mode to
hybrid (`vetMode: "hybrid"`) — 4-tier version axis preserved + 13
new services (schema-design / indexing / query-planning /
partitioning / replication / backup-pitr / jsonb / vacuum-tuning /
connection-pooling / row-level-security / mvcc-isolation /
extensions / roles-grants)

---

## 1. Persona inhabited

Second pass on Lina. Same persona, same stack, same phone, same
recruiter. The thing that's changed is the round-13 Postgres-hybrid
ship — round-10 F4's exact finding ("Postgres senior signal goes to
suggestedProbes which doesn't render in the report") is the structural
defect the round-13 batch was designed to close.

Stack: React 18 / TS 5.4 / Next 14 / Tailwind 3 / Node 22 / Express +
tRPC / **Postgres 16 (DEEP — schema design + indexes + replication
posture for 3 services)** / Docker 25 / AWS (ECS Fargate + RDS + S3,
operator depth). Methodology: feature flags, trunk-based, contract
testing, Storybook, OTel. Same six chips as round 10.

The Postgres signal she carries — and that round 10 said the tool
was throwing away — is structurally **dual-axis**: she knows her
version era (16, current, secure) AND she knows her depth-of-operation
(reviews every migration PR; debugs EXPLAIN plans weekly; designed
the partitioning scheme for the event-log table; manages connection
pooling via pgbouncer; owns RLS policies for the multi-tenant flow).
She's NOT a DBA (replication failover is platform-team-owned;
PITR + barman is platform-team-owned; pg_cron extensions she's never
configured). The hybrid resolver needs to thread that "8 of 13 senior
services, version-current, deep depth, senior seniority, operator
scope" shape into a Green verdict — which would have read as Yellow
in round 10's version-only mode (because depth-lift on a single-axis
Green is a no-op) **and** would have stranded the senior signal in
freeform notes the report doesn't render.

She IS the shape the round-13 batch was designed against. If the
hybrid dual-body rendering misreads, or if the weakest-link
combination underrates a senior + deep + 8 services screening, this
is where it shows up.

---

## 2. Phone call — abbreviated

**00:00.** Avery picks **Full-Stack Developer**. 8 cards render
unchanged from round 10. Chip row below shows 6 fullstack chips
(round 10 10A's batch).

**00:10 — verify dual-body rendering on Postgres preload card.** Avery
glances at the Postgres card before dialing. **Card renders two
bodies stacked:** version input (number field + "I don't remember"
toggle) on top, 13-service checklist on bottom. Matches the K8s
dual-body pattern from the round-13 K8s conversion. No layout
regression — chip-row above, dual body below, guidance panel ties
on focus. ~5s glance.

**00:30 — call starts.** Avery: "Hi Lina, this is Avery from
[redacted] — got 10 minutes? I want to walk through the stack and
get a structural read on the senior-fullstack-with-Postgres-depth
piece."

**00:50 — React + TS + Next + Tailwind autopilot.** Same as round 10:
React 18 + TS 5.4 + Next 14 + Tailwind 3, deep depth across, all four
Green. ~90s. Identical to round 10 verdicts; no regression. Avery's
keying speed unchanged. ~02:20 in.

**02:20 — Node.** Node 22, depth working (she owns the app code
but the runtime ops are platform-team-owned). Green. ~15s.

**02:35 — Postgres. THE call.**

Avery: "OK — Postgres. What version?"

Lina: "16, all three services."

Avery types `16` into the version input. Tier resolver matches `>= 14`
→ **"Good" Green** on the version axis.

Avery: "And depth?"

Lina: "Deep. I review every migration PR, debug EXPLAIN plans weekly,
own the partitioning scheme on the event-log table. Replication
posture I know enough to be dangerous — platform team owns the
failover drills."

Avery sets depth to **deep**. Scope stays **operator** (catalog
default for DB; no template override on Postgres for Fullstack).

Avery: "Let me walk the services — tick what you've shipped in
production. I'll read them; you stop me if I'm wrong."

- **Schema design (normalization / FK design / migration discipline).**
  "Yes — that's my main lane. I review the migrations." → Tick.
- **Indexing strategy (B-tree / GIN / GiST / partial / covering).**
  "Yes — B-tree daily, partial indexes for soft-deleted rows, GIN on
  the JSONB sidecar." → Tick.
- **Query planning (EXPLAIN ANALYZE / pg_stat_statements).** "Yes —
  pg_stat_statements is on, I cycle the top-10 weekly." → Tick.
- **Partitioning (declarative range / list / hash).** "Yes — event
  log is range-partitioned by month, pg_partman manages rotation." → Tick.
- **Replication (streaming / logical / failover).** "Eh — I know the
  shape, RDS multi-AZ, logical for the read-replica analytics path,
  but platform team owns the failover drills." → **Skip honestly.**
- **Backup + PITR.** "Platform team. I've never run pg_basebackup or
  configured WAL archiving." → **Skip honestly.**
- **JSONB.** "Yes — we use it for the sidecar audit-trail blob,
  GIN-indexed, containment + path operators." → Tick.
- **VACUUM + autovacuum tuning.** "Yes — tuned autovacuum on the
  event-log table when we hit bloat at 2B rows." → Tick.
- **Connection pooling (pgbouncer / pgcat).** "Yes — pgbouncer in
  transaction mode in front of every service." → Tick.
- **Row-level security.** "We considered it for multi-tenant but
  decided against; we enforce in app layer." → **Skip honestly.**
- **MVCC + transaction isolation levels.** "Yes — we run READ
  COMMITTED everywhere and bumped to SERIALIZABLE on the financial
  ledger flow after a phantom-read incident." → Tick.
- **Extensions.** "Just pg_partman and pg_stat_statements. No
  PostGIS, no pg_cron, no pgvector." → **Skip honestly.**
- **Roles + grants discipline.** "Yes — least-privilege per service,
  separate roles for migration runner vs app runtime." → Tick.

**Final tally: 8 ticks, 5 honest skips. 8/13 = 61.5%.**

~70s for the full walk. Avery on autopilot, Lina answering crisply
because the services are named in the language she actually uses.

**03:50.** Verdict updates live as Avery ticks. After tick 8, the
card flips to Green with a "(lifted from Review / Probe by depth) —
8/13 services" sub-label. Avery glances at it and moves on. ~5s
glance, no friction.

**03:55 — Docker.** Docker 25, working depth. Green. ~15s.

**04:10 — AWS.** ECS Fargate / RDS / S3 / CloudWatch / IAM / Secrets
Manager / Route 53. ~8 of ~12 general-tagged services. Green at
depth=working, operator scope. ~50s.

**05:00 — Lina names tRPC + Express.** "Both, with tRPC carrying the
typed surface on top of Express." Search hits both; Express is in the
catalog (preload-eligible but not in Fullstack default), tRPC is
named-only. Avery adds Express, marks tRPC named-only. Express 4.x,
deep, Green. ~40s.

**05:40 — Methodology chips.** Lina names feature flags, trunk-based,
contract testing, OTel without prompting. Avery ticks 4 chips
unprompted. Storybook (FE-side discipline) doesn't have a chip in
the Fullstack set (it's in Frontend's set) — Avery types it into
free-text. ~30s.

**06:10.** Avery: "Anything else?" Lina: "We use LaunchDarkly for
the flags." Avery already has the feature-flags chip ticked. ~10s.

**06:20 — Summary.** Report renders. Avery scans for ~30s.

**Call duration: ~07:00. ~3 minutes under budget** — same speed-of-use
as round 10, with the dual-body Postgres walk costing ~70s extra
(13-service tick-walk) but **buying the senior signal that round
10 said disappeared into suggestedProbes**. Worth every second.

---

## 3. Post-call: report read

**Headline:** `5G / 2Y / 0R / Meth:4 / Scope-capped:0 / Named-only:1`

| Round | Postgres verdict | Postgres signal in report |
|---|---|---|
| 10 | Green (version-only) | "Postgres 16, deep" — **services lost to suggestedProbes** |
| **12** | **Green (lifted by depth from Yellow coverage)** | **8/13 services itemized + sub-label "lifted from Review / Probe by depth"** |

The headline counts are identical to round 10 in shape (Postgres
reads Green either way) — but the **information content** of the
Postgres card is materially different. Round 10's report read
"Postgres 16, deep, Green" with no service-list detail; the
hiring manager saw a confident verdict but no evidence trail.
Round-12's report reads "Postgres 16, deep, Green (lifted from
Review / Probe by depth)" with 8 itemized services and 5 honest
skips. The hiring manager now sees the *shape* of Lina's Postgres
depth — schema / indexing / query planning / JSONB / pooling /
VACUUM / MVCC / roles — and the *gaps* she honestly named —
replication failover / PITR / RLS / extensions. That's the
senior-fullstack-vs-DBA split made visible.

**Detail card for Postgres:**

```
PostgreSQL
Version 16 · Depth: deep · Scope: operator
Good (lifted from Review / Probe by depth) — 8/13 services
[Postgres 16 is current. Coverage: 62% of curated services.]

Services confirmed:
  ✓ Schema design       ✓ JSONB
  ✓ Indexing strategy   ✓ VACUUM tuning
  ✓ Query planning      ✓ Connection pooling
  ✓ Partitioning        ✓ MVCC isolation
  ✓ Roles + grants

Services not confirmed:
  · Replication         · Backup + PITR
  · RLS                 · Extensions
```

The "lifted from Review / Probe by depth" sub-label is the
honest framing: coverage alone would have read Yellow (61.5% sits
just under the 66% Green threshold), and Lina's senior + deep claim
is what carries it to Green. The HM reading this knows the verdict
isn't a coverage Green — it's a depth-lifted Green, which is
exactly the senior-fullstack-on-Postgres shape.

**The other Yellow on the report:** tRPC named-only. (Docker working
depth lands Green at v25.)

**Recommendation:** Strong proceed. Same verdict as round 10 but the
report is materially richer on Postgres — the structural defect
round 10 named is closed.

---

## 4. Findings

**Legend:** S1 ship blocker, S2 priority next round, S3 nice-to-have,
S4 cosmetic. **[STRUCTURAL-VALIDATION]** verifies the round-13
Postgres-hybrid ship. **[NEW]** is a round-12-specific finding.

### F1. [STRUCTURAL-VALIDATION] [PASS] Postgres dual-body rendering matches K8s pattern

Card renders version input on top (number field + "I don't remember"
toggle) and 13-service checklist underneath. Same component path
TechCard.tsx uses for K8s. No layout drift between the two hybrid
entries — chip-row above, dual body below, guidance panel ties on
focus. The dual-body pattern is now demonstrated across BOTH catalog
hybrid entries (K8s + Postgres). Component is generic-on-vetMode, not
K8s-specific. **Pass.**

### F2. [STRUCTURAL-VALIDATION] [PASS] Postgres 16 + 8/13 services + deep + senior → Green via depth-lift

Traced through `resolveHybridTier` in `scoring.ts`:

1. version "16" → `findTier`: 16 >= 14 and 16 < 17 → tier `Good` /
   green. `versionBaseColor = green`.
2. services: 8 ticked of 13 total. 0.615 ratio.
   `0.25 <= 0.615 < 0.66` → `coverageColor = yellow`.
3. Weakest-link combination: `SEVERITY[yellow] (1) > SEVERITY[green]
   (0)` → `combinedBaseColor = yellow`.
4. `adjustForDepth(yellow, 'deep', 'senior')`: `sev = 1`, `sev !==
   0`, lift → `{ color: 'green', adjusted: true, direction:
   'lifted' }`.
5. `applyScope(yellow, lift, 'operator')`: scope is operator → no
   cap. Pass through Green.
6. `applyRecency`: Postgres 16 is current → bucket is current → no
   adjustment.
7. **Final: Green, label "Good (lifted from Review / Probe by depth)
   — 8/13 services".**

Verdict is **honestly Green**, not coverage-Green. The hiring manager
reading this report sees a senior + deep claim is what carries the
verdict — exactly the framing 7C's `cappedFromColor` work and 6D's
qualified-checklist-lift work established as the catalog's design
principle. **Pass.**

### F3. [STRUCTURAL-VALIDATION] [PASS] Coverage threshold honest at 61.5%

8/13 = 61.5% sits **just below** the 66% Green threshold. This is
not an accident of catalog design — it's the structural validation:
a senior fullstack who owns 3 services and reviews migrations across
4 should tick the schema / indexing / query-plan / JSONB / pooling /
VACUUM / MVCC / roles services and **honestly skip** the replication-
failover / PITR / RLS / extensions services that are platform-team-
owned or shop-specific. The 8/13 = 62% landing point is the
deliberate "senior fullstack, not DBA" shape — and it lands one
percentage point below the Green threshold, which is exactly the
gap depth-lift exists to close.

This is the **structural answer to the brief's honest question**:
*"if 8/13 = 61% lands as Yellow without depth lift, is that right
for a senior + deep + 8 services?"* The answer is: **Yellow on
coverage alone IS right** (62% is mid-band — DBA territory is
80%+). Depth-lift to Green IS also right (senior + deep + operator
scope, version-current, 8 named services is Green-shape regardless
of the missing 5 — those 5 are scope skips, not depth gaps).

The catalog gets this **correct** by making coverage land just below
the threshold and depth carry it across. If the service list were
designed to put senior fullstack at 9/13 = 69% (auto-Green on
coverage), the depth-lift evidence would be invisible in the label
("Good" with no parenthetical). The 8/13 landing point makes the
depth-lift framing **legible** in the report — Avery's HM reads
the "(lifted from Review / Probe by depth)" sub-label and
understands what carried the verdict. **Pass — catalog tuning is
honest.**

### F4. [STRUCTURAL-VALIDATION] [PASS] No `COVERAGE_LIFT_FLOOR` regression in hybrid

`resolveChecklistTier` carries a 40% floor on depth-lift (round-6
6D, Vikram over-claim defense). `resolveHybridTier` does **not** —
verified by inspection of `scoring.ts:643`. This is correct: in
hybrid mode, the version axis is independent evidence. A senior with
a current version + deep claim + 25-40% coverage is not the Vikram
shape (2/12 LangChain services + "very-deep" with no version
context) — they have **two channels of senior signal** (era and
operation), and one channel being mid-band coverage doesn't
collapse the read. Hybrid resolves correctly that the floor is
unnecessary.

Lina's 8/13 = 62% is well above the 40% floor anyway, so this finding
is precautionary — but worth verifying because a future hybrid
candidate at 4/13 = 31% with a current version + deep claim would
test the same path. **Pass on inspection; flag for an explicit test
case if a round-13-redux persona lands in that range.**

### F5. [STRUCTURAL-VALIDATION] [PASS] Label composition correct for hybrid-yellow-lifted-to-green

`composeLabel` called with `finalColor=green`, `baseLabel="Review /
Probe"` (because `coverageColor=yellow` was the weaker channel and
the hybrid resolver hands the worse channel's label up — see
`scoring.ts:649-652`), `depthAdjusted=true`, `depthDirection='lifted'`.

Renders: `"Good (lifted from Review / Probe by depth)"`. **Correct.**

This matches the K8s "1.22 Yellow + 11/12 Green" canonical case the
hybrid mode was designed for, but inverted on the channel — Lina is
version-Green + coverage-Yellow, K8s 1.22 case is version-Yellow +
coverage-Green. Both collapse to combined-Yellow via weakest-link
and lift to Green via senior + deep. The label composition is
channel-agnostic; both render the same "(lifted from Review /
Probe by depth)" framing. **Pass.**

### F6. [STRUCTURAL-VALIDATION] [PASS] Coverage suffix renders + note combines version + checklist guidance

`coverageSuffix = " — 8/13 services"` appends to the label because
`servicesInteracted = true`. **Renders correctly on the card.**

The note combines the version-tier note (PG 16's tier has no note —
empty) and the checklist guidance paragraph from
`technologies.json:1100`. Since the version-tier note is empty, only
the checklist guidance shows: "*Round-12 hybrid mode (Lina F3
round-10): the services axis captures depth-of-operation independent
from version era. App-developers tick 4-6 services...*" — which is
exactly the framing Avery needs to read this card.

Quibble: the in-catalog reference to "Lina F3 round-10" is internal
implementation-history shorthand. It reads fine to me (I'm
hand-validating my own shape) but a recruiter reading it cold would
see an opaque codename. Not a ship blocker, but worth softening to
"*Senior fullstack engineers tick 8-10 services...*" wording in the
guidance paragraph itself. See F9 below.

### F7. [STRUCTURAL-VALIDATION] [PASS] 10A Fullstack chips fire on this persona

The round-10 10A batch added 6 methodology chips to the Fullstack
template (feature flags / trunk-based / contract testing / OTel /
a11y-wcag / design-system-discipline). On this persona, **4 of 6
fire unprompted** (feature flags, trunk-based, contract testing,
OTel) — exactly matching what Lina named. The a11y + design-system
chips don't fire on Lina (she's a backend-leaning fullstack; the FE
discipline chips would fire on a Maya-shape FE-leaning fullstack).

This is **correct distribution** — 4 of 6 firing on one persona and
2 of 6 firing on another persona, with each chip earning its slot
across the candidate space. No chip is dead weight; no chip is
over-firing. The 10A chip-set holds end-to-end across two passes
on Lina. **Pass — round-10 10A validates on round-12 evidence.**

### F8. [NEW] [S3] Storybook chip absent from Fullstack chip-set is a defensible gap

Lina named Storybook (component-driven dev discipline). Avery typed
it into the methodology free-text. The Fullstack chip-set doesn't
carry a Storybook chip; the Frontend chip-set doesn't either
(Storybook is a tech entry, not a methodology chip).

Honest read: **don't add a Storybook chip.** Storybook is a tool, not
a discipline — the chip slot wants disciplines (feature flags,
contract testing, OTel) not specific tools. The free-text fallback
correctly captures "uses Storybook" without inflating the chip-set.

If anything, the Frontend chip-set's `design-system-ownership` chip
captures the senior shape Storybook usually signals (component-driven
dev + a design system to drive). Lina ticks the
`design-system-discipline` chip on the Fullstack set, which is the
contribute-to-DS shape. **No action.**

### F9. [NEW] [S3] Postgres `checklistGuidance` references internal codename

`technologies.json:1100`: "*Round-12 hybrid mode (Lina F3
round-10):*" — the in-catalog reference reads as opaque shorthand
to recruiters who don't know the simulation history. Soften the
prefix to drop the parenthetical, e.g.:

```
Round-12 catalog wording change. New:
"The services axis captures depth-of-operation independent from
version era. App-developers / senior fullstack engineers tick 4-6
services (schema / indexing / query planning / JSONB). DBAs / data
engineers tick 9-13."
```

10-line change, no scoring impact. **Defer to next polish pass.**

### F10. [NEW] [S3] Service-tag filtering would be a senior-vs-DBA UX win

The 13-service list is correct for capturing DBA-shape signal — but
on a Fullstack-template walkthrough, the platform-team-owned services
(replication / PITR / extensions) are predictable honest-skips. A
future polish: `serviceTagFilters: { postgresql: ['app-developer'] }`
on the Fullstack template surfaces ~8 app-relevant services and hides
~5 platform-team-owned ones, shortening the walk from 13 to 8 ticks
without losing senior signal.

But: Lina's honest-skips on replication / PITR / RLS / extensions
ARE the senior-vs-DBA signal — hiding them would erase the shape.
The 5 honest skips read as "she knows what she doesn't own", which
is *more* useful information than a curated 8-service list that
implies "she ticked everything in scope".

**Net: don't add the tag filter.** The full 13-service walk costs
~70s and earns the senior-vs-DBA legibility the report would
otherwise miss. The hybrid ship makes the right trade-off here.
**Logged as a deliberate non-action.**

### F11. [NEW] [S3] Senior + 8 services + deep is Green honestly, but the lift is doing the work

Worth naming explicitly: Lina's verdict is **Green via depth-lift,
not coverage-Green**. If she had been a junior with the same 8 ticks
and a deep claim, the seniority gate inside `adjustForDepth` would
**still** lift Yellow → Green (the `seniority === 'junior'` gate is
only on the *lower* direction, not the *lift*). That's not a defect
on Lina's case — it's a structural question for the J5 / J6 backlog:
should depth-lift on hybrid-mode coverage-Yellow be gated on
seniority the same way 6D's checklist depth-lift is?

`resolveChecklistTier` requires `seniority !== 'junior'` for the lift
(round-6 6D Vikram defense). `resolveHybridTier` does **not** —
depth-lift fires regardless of seniority. Defensible: in hybrid
mode, the version axis is independent senior signal, so a junior
on a current Postgres 16 + 8 services + claimed-deep is less suspect
than a junior on 8 services + claimed-deep alone (no version anchor).
But: a junior over-claiming on the depth axis is still the Vikram
shape, and the version-channel doesn't fully defend against it.

**Logged for design-pass cross-cut.** Not a round-12 ship blocker —
Lina is senior, the gate doesn't fire either way. But the symmetry
question between `resolveChecklistTier` and `resolveHybridTier` is
worth a 30-min think on a quiet day. **S3, design item.**

### F12. [NEW] [S4] PDF export still slices Postgres dual-body card correctly

Spot check: Avery hit "Download PDF" at the end of the call. The
Postgres card spans the version body + 13-service list + label +
suggestedProbes — taller than a single-axis card. **html2canvas +
jsPDF slicing handles the taller card correctly** — no overflow,
no cropped service rows, version and services render on the same
page (or paginate cleanly if the page break falls mid-card). Same
pagination logic K8s already proved. **Pass.**

---

## 5. Round-12 verdict

**SAFE.**

Round-13's Postgres-hybrid batch lands clean. The dual-body card
renders correctly, the weakest-link combination is honest, the
depth-lift fires for a senior + deep claim on coverage-Yellow, and
the label composition makes the "(lifted from Review / Probe by
depth)" framing legible to the hiring manager reading the report.

The structural defect round-10 F4 named — "Postgres senior signal
goes to suggestedProbes which doesn't render in the report" — is
fully closed. Lina's report card now itemizes 8 confirmed services
+ 5 honest skips, surfacing the senior-fullstack-vs-DBA shape
explicitly. That shape was invisible in round 10.

**Postgres verdict trace:**

```
version 16 → tier "Good" / green
services 8/13 = 61.5% → coverage yellow
combined (weakest-link) → yellow
+ deep + senior → adjustForDepth lifts to green
+ operator scope → no cap
+ current version → no recency adjustment
final: GREEN, "Good (lifted from Review / Probe by depth) — 8/13 services"
```

**Honestly Green.** The depth-lift is doing the work, and the label
makes that visible — the HM reads the parenthetical and knows the
verdict came from depth + version evidence, not pure coverage. This
is the exact framing 7C established for `cappedFromColor` (Staff IC
pattern) inverted to depth-lifted-from-Yellow (senior-fullstack
pattern). The catalog and scoring layer agree.

**Headline preserves round-10 shape:** 5G/2Y/0R. Postgres reads Green
either way — but the **information content** of the Postgres card
is materially richer than round 10's. That richness is the deliverable
the round-13 batch was built to ship.

**Call duration: ~07:00, 3 minutes under budget.** The 13-service
walk costs ~70s vs round 10's version-only ~10s — but buys the
senior signal that round 10 said disappeared. Net speed-of-use is
**still well under the 10-min ceiling**; the over-arching product
constraint holds.

**What remains:**
- **F9 (catalog guidance copy):** Soften "Round-12 hybrid mode (Lina
  F3 round-10)" prefix to recruiter-readable wording. ~5-min copy
  change.
- **F11 (hybrid depth-lift seniority symmetry):** Should hybrid
  depth-lift be gated on `seniority !== 'junior'` the way checklist
  is? Design-pass cross-cut. S3.
- **F4 (hybrid below-floor coverage test case):** Explicit test for a
  hybrid 4/13 = 31% + current-version + deep + senior case to verify
  Yellow-base lifts cleanly. Precautionary; current code path is
  correct by inspection.

**No round-9 / 10 / 11 / 12 finding is escalated by this session.**
Lina's second pass produces a strong-proceed verdict with a
substantively better report than round 10, on the exact structural
defect she surfaced last time.

**10A Fullstack chips validate on a second persona-pass:** 4 of 6
chips fire unprompted, matching round 10's pattern. The chip-set
holds.

**Lina Sandberg: hire (second pass — strong-proceed, report
materially better than round 10).**
**Postgres hybrid (round-13 batch): SHIPS — validated end-to-end.**
**Full-Stack Developer template: ship-clean on a senior-Postgres-deep
candidate. Round-13 closes round-10's F4 structural defect.**
