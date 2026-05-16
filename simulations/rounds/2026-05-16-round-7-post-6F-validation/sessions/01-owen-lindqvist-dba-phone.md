# Session 01 — Owen Lindqvist redux (Senior Oracle DBA)

**Agent:** simulation agent 01 (round-7 post-6F validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-7-post-6F-validation
**Channel:** Phone (10 min — recruiter knows it's a specialist; same budget as round 6)
**Role template picked:** **Database / DBA (NEW — 6F template)** — closes round-6 template-paralysis

## 1. Persona inhabited

Identical to round-6 Owen. 47, eighteen years deep at a Nordic insurance
carrier, owns the OLTP fleet (Oracle 19c + RAC), the Kimball-modelled
warehouse (Oracle 19c + partitioning), the PL/SQL stored-proc layer.
The on-call DBA pings him at 2 a.m. when a RAC node fences. Runs RMAN
restore drills quarterly, designs the Data Guard topology, writes the
AWR-analysis runbook the juniors follow. Currently the tech lead on a
Postgres-target migration — *source*-side DBA on the unload, not yet
operating PG in prod.

Speech pattern: precise, slow, calibrated. "I last took RMAN to L0 +
incrementals + archivelogs in February; the restore drill ran 47 minutes
end-to-end on the 8 TB fleet." Doesn't pad. The recruiter knows within
30 seconds she's talking to a senior — the question in round 7 is whether
TechVet's report says the same thing.

## 2. Phone call — abbreviated

> R: "Hi Owen — ten minutes, walk me through your day-to-day stack at a
>    high level."
> O: "Oracle 19c on RAC, Data Guard standby in Stockholm, warehouse on
>    the same 19c base with heavy partitioning. PL/SQL is where the
>    business logic lives. RMAN for backup. Postgres only as a migration
>    target — not in prod."
> [Recruiter picks **Database / DBA** template — name is right there in
>  the grid, 5 preloaded cards land: SQL, PL/SQL, Oracle DB, Postgres,
>  MySQL. 6 methodology chips light up: Kimball / 3NF / backup-recovery
>  / HA design / query-plan tuning / capacity planning.]
> [~10 s to confirm template — no search, no paralysis. Round-6's 15 s
>  template-scroll-and-pick-Custom replaced with one decisive click.]
> R: "Tell me about your Oracle stack."
> O: "Oracle 19c. RAC nodes. Data Guard standby. RMAN for backup.
>    Partitioning everywhere. AWR for tuning."
> [Recruiter clicks the Oracle DB card → checklist of 14 services.
>  Reads through fast, ticking what Owen says yes to:
>    - partitioning ✓
>    - indexes ✓ (he said "indexes" once, recruiter takes it for the
>      btree/bitmap row)
>    - AWR/ADDM tuning ✓
>    - EXPLAIN PLAN + hints ✓
>    - RAC clustering ✓
>    - Data Guard ✓
>    - RMAN backup ✓
>    - materialized views ✗ (didn't mention)
>    - PL/SQL procedures ✓
>    - sequences/triggers ✓
>    - transactions/read consistency ✓
>    - ASM ✗ ("we have it but the storage team owns ASM")
>    - Exadata ✗ ("we're on x86, no engineered systems")
>    - Statspack / SQL Plan Mgmt ✗
>  Final: **9/14** services ticked. Sets depth=very-deep, lastUsed=current.]
> [~75 s for the Oracle checklist — fluent candidate moved it fast.]
> R: "PL/SQL?"
> O: "Daily. Packages, bulk-collect for the warehouse ETL, dynamic SQL
>    sparingly, exception handling everywhere."
> [Recruiter clicks PL/SQL → 10 services. Ticks:
>    - stored procedures ✓
>    - packages ✓
>    - triggers ✓
>    - cursors ✓
>    - bulk-collect + FORALL ✓
>    - exception handling ✓
>    - collections ✗ (didn't say explicitly)
>    - pipelined functions ✗
>    - dynamic SQL ✓
>    - performance tuning (DBMS_PROFILER) ✗
>  Final: **7/10** services ticked. Sets depth=very-deep, lastUsed=current.]
> [~40 s for PL/SQL — fewer services + Owen's a fluent yes/no.]
> R: "SQL itself?"
> O: "Window functions, query plans, partitioning, triggers, stored
>    procs — all of it."
> [Recruiter clicks SQL → 12 services. Reads aloud. Owen confirms
>  10/12 (skips JSON columns — "we're relational-first" — and bitmap
>  indexes which aren't a SQL-standard thing). Sets depth=very-deep,
>  lastUsed=current.]
> [Time check: 5 min in. ~5 left — half the budget already gone but the
>  Oracle stack is *scored*, not amber-named-only.]
> R: "Postgres?"
> O: "Migration target. PG 15. I unload from Oracle, our app team owns
>    the load side. I'm not running it in prod."
> [Recruiter types "15" into PG card → tier match Good. Pauses. Last
>  round she missed Scope=architect under phone pressure. This round
>  she still misses it — the DBA template doesn't carry a `techScopes`
>  entry for postgresql, so the chip on Summary still defaults to
>  operator-implied. Same bug shape as round 6.]
> [Sets depth=working, lastUsed=current. Verdict reads "Good — PG 15".]
> R: "MySQL?"
> O: "Read about it. Never run it."
> [Recruiter clicks "Not in stack" on MySQL → it falls into the skipped
>  section, excluded from buckets.]
> [Time: 7 min. Owen mentions "DBMS_SCHEDULER for our nightly batches"
>  and "GoldenGate for the migration replication". Both Oracle-adjacent;
>  neither in catalog. Recruiter searches "DBMS_SCHEDULER" → 0 results
>  → "+ Add as named-only" CTA fires → adds. Same for "Oracle GoldenGate".
>  2 named-only entries captured.]
> [~15 s for both. Round-6's *five* named-only searches replaced with
>  two for the genuinely-uncovered tools.]
> R: "Methodology — Kimball, 3NF, backup discipline?"
> O: "Kimball in the warehouse, 3NF on OLTP, RMAN drills quarterly,
>    Data Guard switchover tested annually, query-plan tuning daily."
> [Recruiter clicks 5 of the 6 preloaded chips: Kimball / 3NF / backup-
>  recovery / HA design / query-plan tuning. Skips capacity-planning
>  (not explicit). ~12 s — five clicks, no typing.]
> [Round-6 cost: ~40 s of free-text on Custom. Round-7 cost: ~12 s of
>  chip-clicking. Net save: ~28 s, *plus* the chip labels are recruiter-
>  authored and read cleaner on the PDF than a recruiter's typo-prone
>  free-text.]
> [Sets candidateName=Owen Lindqvist, role="Senior Oracle DBA",
>  seniority=Senior, years=18, pathType=traditional, channel=phone,
>  candidateContext="Oracle DBA specialist, 18 yr at same carrier,
>  owns OLTP + warehouse + PL/SQL".]
> [Time: 9 min. Hits Summary.]
> [On Summary: enriches the 2 named-only with depth=very-deep,
>  lastUsed=current — ~12 s for both (vs ~45 s for round-6's five).]
> [Exports PDF at the 10-min mark. Within budget for the first time.]

Total entry time during call: ~10 min, with the **2 named-only
enrichments fitting inside the budget** instead of spilling past the
hang-up. First Owen session in two rounds where the recruiter wasn't
doing data entry after the candidate hung up.

## 3. What TechVet would output

### 3a. Template choice — round-7 vs round-6

Round-6: Custom (paralysis after scrolling 12 options), no chip-set,
5 free-text methodology entries, no preloaded techs.

Round-7: **Database / DBA** template lands instantly with:

- **techIds:** `['sql', 'plsql', 'oracle-db', 'postgresql', 'mysql']` —
  Owen's exact stack minus MySQL (which he marks not-in-stack in 3 s).
- **methodologyChips:** 6 — and 5 of them apply directly to Owen's
  speech (Kimball / 3NF / backup-recovery / HA / query-plan tuning).

This single template choice closes **two of round 6's three friction
sources**: template paralysis (~15 s saved) and methodology free-text
(~28 s saved). ~40 s net saved on a 10-min call, ≈ 6.7% of the budget.

### 3b. Predicted assessment table

| Tech / entry | Mode | Coverage / version | Depth | Verdict |
|--------------|------|--------------------|-------|---------|
| **Oracle DB** | checklist | **9/14 = 64%** | very-deep | **Good (lifted from Review / Probe by depth)** — 6D fires: coverage ≥ 40%, depth ∈ {deep, very-deep}, seniority='senior' ≠ junior. Label core reads `Good (lifted from Review / Probe by depth) — 9/14 services`. Base color was yellow (25–66% band); 6D bumps to green. |
| **PL/SQL** | checklist | **7/10 = 70%** | very-deep | **Good** — natural green (≥ 66% floor). No lift needed (label has no `(lifted…)` suffix). `7/10 services` in label. |
| **SQL** | checklist | **10/12 = 83%** | very-deep | **Good** — natural green. `10/12 services`. |
| **PostgreSQL** | version | 15 | working | **Good** — PG 15 tier match (current). *Structurally wrong* — Owen is source-side migration DBA, not PG operator. Scope=architect would correctly cap Yellow but DBA template carries no `techScopes` entry for postgresql. Same bug as round 6. |
| **MySQL** | skipped | n/a | n/a | **Not in stack** — excluded from buckets/radar, falls into Confirmed-not-in-stack section. |
| **DBMS_SCHEDULER** (named-only) | n/a | n/a | very-deep | No verdict — amber probe chip with very-deep + current enrichment. |
| **Oracle GoldenGate** (named-only) | n/a | n/a | very-deep | No verdict — same. |
| Methodology chips | display | n/a | n/a | 5 emerald chips: Kimball / 3NF / backup-recovery / HA design / query-plan tuning. |

### 3c. Predicted headline stats (5-card grid because methodology AND off-catalog both present)

```
[ 4 Good ] [ 0 Review/Probe ] [ 0 Concern ] [ Methodology 5 ] [ Off-catalog 2 ]
```

Plus chip-row: `1 confirmed not in stack` (MySQL) · `2 candidate
mentioned, off-catalog` (DBMS_SCHEDULER / GoldenGate).

Grid scales to `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` per
`Summary.tsx:243-244` because `extras === 2` (both methCount and
offCount > 0).

**Section order (named-only NOT promoted):** `Coverage radar → Strengths
(Oracle / PL/SQL / SQL / Postgres) → Methodology (5) → Named-only (2) →
Confirmed not in stack (MySQL)`. The 6E-b promotion condition is
`namedNotInCatalog.length > scoredTotal` = `2 > 4` = **false**. Default
position preserved. **This is the correct outcome** — Owen's evidence
weight now genuinely sits in the scored bucket (4 Greens) and the 2
off-catalog Oracle-adjacent tools are appropriately probe-target.

### 3d. Candidate-context line (unchanged from round 6)

`Senior · 18 yr in industry · Traditional path · Oracle DBA specialist,
18 yr at same carrier, owns OLTP + warehouse + PL/SQL`

### 3e. Radar (now meaningful)

- **Database axis:** Oracle DB (Green) + Postgres (Green) + MySQL
  excluded (skipped) = 2-tech avg = Green high.
- **Language axis:** SQL (Green) + PL/SQL (Green) = 2-tech avg = Green
  high.
- **Total: 2 axes with 2 entries each.** Below the 3-axis "verified
  good shape" threshold per CLAUDE.md. **Round-6's degenerate 2-axis
  problem is structurally the same — radar will still render thin
  shape.** Two strong category averages instead of one strong + one
  wrong-shape, but `radarData.length === 2` still falls under the
  3-axis floor. *Not closed by 6F.* (See §6.4.)

## 4. Accuracy judgement

- **Headline now reads "Senior DBA".** `4 Good / 0 Yellow / 0 Red /
  Methodology 5 / Off-catalog 2` is read by an HM as substantial
  coverage with strong discipline signal. Compare round-6's
  `2G / 0Y / 0R + 5 named-only-chip-row`, which read as "we got to 2
  techs." The 5-card grid is the single biggest visual improvement —
  the methodology number and off-catalog number are now siblings of
  the bucket counts, not footnotes below the disclaimer. **This is the
  fix that resolves the round-6 "thin signal" misread directly.**

- **Oracle DB Good (lifted) is the keystone result.** 6D fires
  exactly as designed: 9/14 = 64% would have been Yellow on raw
  coverage (Robin / Cara / Brigit / Tanvir / round-6 Owen shape), but
  with very-deep + senior the label reads `Good (lifted from
  Review / Probe by depth) — 9/14 services`. The parenthetical is
  *informative* (HM sees the lift reasoning) rather than *defensive*
  (which "(depth-adjusted)" used to read as before the round-1 bug-3
  rename). For Owen this is the single most important verdict on the
  whole report — it's the only Database-category result that reflects
  18 years of operator depth.

- **PL/SQL Good is correct and uncomplicated.** 7/10 = 70% → natural
  Green floor, no lift needed. Reads as a clean Strength row. The
  bulk-collect + packages + dynamic SQL combination in the picked
  services signals the warehouse-ETL depth the HM cares about per the
  catalog `checklistGuidance` ("bulk-collect + packages + dynamic SQL
  signals real backend ownership").

- **The PG-15-Green is *still* structurally wrong.** Same bug as
  round 6. DBA template has no `techScopes: { postgresql: 'architect' }`
  entry; the recruiter doesn't open the dropdown under phone pressure;
  the chip on Summary defaults to operator-implied. **Severity here
  is actually lower than in round 6** because Owen's Oracle stack is
  now scored and visible, so the misleading PG-Green is one of four
  Greens rather than half of two. But it's still on the report and
  the HM will read "Owen is a PG 15 operator", which is the opposite
  of his actual stance. Fix is one-line in `roles.ts` — see §7.

- **Methodology chips composed with 6F is the strongest delta.** 5
  emerald chips with recruiter-authored labels (Kimball / 3NF /
  backup-recovery / HA / query-plan-tuning) vs round-6's 5 free-text
  entries with recruiter typos and inconsistent capitalization. **HM
  read quality is meaningfully better** even though the *count* is
  the same. Chip-style render also fits in the headline 4th card
  cleanly, where free-text doesn't render at all in the headline.

- **Named-only is appropriately small now.** 2 entries (the genuinely
  Oracle-adjacent tools not in catalog) instead of 5 (which was
  *Owen's core stack*). The 6E-b promotion correctly *doesn't* fire
  (2 ≤ 4 scored). This is the report layout adapting to evidence
  weight — when the named-only is large, it gets promoted; when it's
  small, it sits in its default position below Methodology. Both
  branches read honest.

- **The 5-card headline grid is load-bearing on small screens.**
  `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` means on mobile (the
  recruiter's phone, not the desktop view they'd use during the call)
  the 5 cards stack 2-up. Card 5 (Off-catalog) goes on the bottom row
  alone — visually awkward but not broken. The chip-row below
  duplicates the off-catalog count with `2 candidate mentioned, off-
  catalog` so the signal is double-redundant on small screens. Both
  are necessary belt-and-braces.

## 5. Friction during the call

- **Template choice: ~10 s** (down from ~15 s in round 6). Decisive
  one-click pick.
- **Oracle DB checklist read-aloud, 14 services: ~75 s.** Owen's
  fluent yes/no pacing made it fast. With a less-fluent candidate
  this stretches to ~110 s and starts to bite the budget.
- **PL/SQL checklist, 10 services: ~40 s.** Same pacing.
- **SQL checklist, 12 services: ~50 s.** Same as round 6.
- **PostgreSQL: ~10 s.** Type version, leave depth, miss the scope
  chip again.
- **MySQL "Not in stack": ~3 s.** Effortless.
- **2 named-only searches + adds: ~15 s** (down from ~50 s for round
  6's 5 zero-result searches). Big reduction in friction *and* in
  confidence drain.
- **Methodology chips (5 clicks): ~12 s** (down from ~40 s for round
  6's free-text entry).
- **Candidate-context fields: ~30 s** (unchanged).
- **Named-only enrichment (2 entries × depth + lastUsed): ~12 s**
  (down from ~45 s for round 6's 5 entries; *fits in the call budget*
  this time).
- **Export PDF: ~5 s.**

**Total: ~9.5 min of active interaction in a 10-min call.** First
Owen session where the post-Summary enrichment fits inside the
budget. Recruiter hangs up at the 10-min mark having exported the
PDF, not still ticking dropdowns.

**Net round-6 → round-7 time saved: ~80 s** (template + methodology +
named-only-burden combined). On a 600 s call that's 13% of the budget
back. Concretely: this is the difference between "I made it" and "I
made it with slack to actually probe Owen on one more thing".

## 6. Bugs / structural defects

**1. PG-15-Green is still wrong-shape and the DBA template doesn't
defend.** Round-6 finding #4 (Scoped-as-architect missing on migration-
source candidates) is **not closed** — the DBA template at
`roles.ts:172` has no `techScopes` map. One-line fix: add
`techScopes: { postgresql: 'architect' }` so any DBA-template candidate
who mentions Postgres-as-migration-target gets capped at Yellow with
the architect note. Owen's call doesn't surface PG as operator-level;
that's the recruiter's read of his speech. Severity: **Medium** —
mis-reads a candidate's stack relationship, but the round-7 4-Green
context dilutes the misread compared to round 6.

**2. Radar still degenerate at 2 axes.** Owen has Database + Language
= 2 category axes. CLAUDE.md notes the "verified ≥ 3 categories"
threshold for radar to render its honest shape; below that it's a
2-point line. 6F adding Oracle to Database doesn't close this —
Owen's stack is *genuinely* 2-category. **Round-6 finding #5** about
named-only not contributing to radar is also unchanged: 2 named-only
chips have category-attribution (both Oracle-adjacent, would go to
Database) but the radar is `scored`-only per `Summary.tsx:70`.
Severity: **Medium** — radar is a thin signal in any specialist
report, but for specialists *of any kind* this is foreseeable.
Solution direction: either named-only-with-category contributes to
radar, OR the radar component drops gracefully to a stat-list
fallback when `radarData.length < 3`.

**3. 6D's 40% floor + 66% Green floor leaves a sharp transition at
the boundary.** Owen tipped to 9/14 = 64%; if he'd been at 8/14 =
57% the lift would still fire (≥ 40% threshold). But if he'd been at
5/14 = 36% (just below the 40% floor) with very-deep + senior, the
lift WOULDN'T fire and the report would read Yellow. **The 5λ
redesign is partially landed.** The 40% floor is defensible (Vikram
2/12 protection) but the transition is sharp. A future iteration
could blend depth-confidence into the coverage score continuously
rather than gating on a 40% step. Severity: **Low** for Owen
specifically (he's well above the floor), but the design pattern is
worth watching for the next narrow specialist who lands at 35–40%
coverage with very-deep claims.

**4. Methodology chip-set is still display-only — no scoring or
radar integration.** Owen's 5 chips read as senior signal to an HM
but they don't influence the radar, don't influence any bucket, and
don't differentiate him from a junior who clicks the same chips. For
Owen this is fine (his Greens carry the verdict); for a senior with
*only* methodology + minimal tool coverage, the report still
under-rates. The 4th headline card helps but isn't a verdict — it's
a count. Severity: **Low for Owen; carried-forward from round 5
5ι/5ξ.**

**5. Indexes service granularity may be over-coarse.** The Oracle DB
checklist has one service `indexes-btree-bitmap` covering B-tree +
bitmap + function-based indexes. Owen said "indexes" once and the
recruiter ticked it. A real Oracle DBA usually has strong feelings
about bitmap-on-OLTP-is-evil vs bitmap-on-warehouse-fine; collapsing
all three into one tick loses that signal. Same shape as round-6's
Methodology free-text dedup concern. Severity: **Low** — checklist
granularity tradeoff, not a code bug.

**6. The Methodology chip "Dimensional / Kimball modeling" overlaps
with the "Dimensional modeling (Kimball)" chip already on the Data
Engineer template** (`roles.ts:156` vs `roles.ts:174`). The IDs
differ (`kimball-modeling` vs `dimensional-modeling`) but the labels
are essentially identical. If a recruiter switches a candidate
between Data Engineer and DBA templates mid-call, the same skill
gets two different chip-ids. Severity: **Low** — recruiter-facing
labels are clean, but data hygiene for cross-template analytics
would suffer.

## 6b. Speed-of-use rating

- **Total entry time during call:** ~9.5 min of active interaction in
  a 10-min budget.
- **Slack:** ~30 s. First Owen session in 2 rounds with any slack at
  all.
- **Post-call work:** 2 named-only enrichments completed *inside* the
  call. Phone hangs up with the PDF already exported.
- **Risk rating: Safe.** Up from At-risk in round 6. The composition
  of DBA template + Oracle catalog + 6D depth-lift + 6E 5-card
  headline + 6E-b's *correct non-promotion* (because the off-catalog
  count is now appropriately small) all land together. The report
  reads as a Senior DBA at headline glance for the first time.
  Specifically: an HM reading top-down hits `4 Good · Methodology 5`
  in the first 1.5 inches of the report, before they even reach the
  radar. That's the actual fix.

## 7. Round-7 fix verdict — does the stack compose for Owen?

**6A (checklist-mode softener — stale + enterpriseStillUsed Red → Yellow):**
**No-op for Owen** — his Oracle and PL/SQL both carry
`enterpriseStillUsed: true` and would qualify if he'd quoted
lastUsed=2022, but Owen is *current* on his stack so the softener
doesn't fire. The flag is correctly attached for the
*returner-DBA* shape that 6A targets (a hypothetical post-Owen
candidate who left an Oracle shop in 2022 and is interviewing now
would benefit). Composes cleanly with 6C's seniority gate — no junior
DBAs would accidentally get the softener. **Verdict for Owen: not
exercised; correctly inert. Verdict for the catalog: well-placed
flag.**

**6D (qualified depth-lift on Yellow coverage):** **This is the single
load-bearing fix for Owen.** Oracle DB 9/14 = 64% + very-deep + senior
lifts Yellow → Green with label `Good (lifted from Review / Probe by
depth) — 9/14 services`. Without 6D, Owen would have 3 Greens (PL/SQL
+ SQL + PG) and 1 Yellow (Oracle) — the irony of an 18-yr Oracle DBA
rating *Yellow on Oracle* would have been the headline finding of
this round. Vikram floor (2/12 + very-deep stays Red) still holds
(`scoring.ts:412-417`). Junior gate (`scoring.ts:415`) means juniors
don't get the lift. Scope cap still wins (`composeLabel` precedence
at `scoring.ts:317-329`) so Anil's architect-capped Yellows don't
sneak through. **This is the fix that resolved 5 rounds of
deep-narrow-specialist evidence in one rule. Owen is the canonical
case it was built for.**

**6E-a (5th sky-toned off-catalog card):** **Fires for Owen with
offCount=2.** `extras === 2` per `Summary.tsx:238` triggers the
`grid-cols-2 sm:grid-cols-3 md:grid-cols-5` 5-card layout. Headline
reads `4 Good · 0 Yellow · 0 Red · Methodology 5 · Off-catalog 2`.
For Owen specifically this is mostly cosmetic (the Off-catalog count
is small) but it composes correctly with 6F's catalog additions:
without 6F, Owen would have had 7 named-only entries and `4 G / 1 Y
(PG) / 0 R / Methodology 5 / Off-catalog 7` — at which point the
5-card grid would carry MORE weight than the scored buckets. The two
fixes are mutually reinforcing. **Verdict: cleanly composed with
6F; the 5th card scales gracefully from 0 to 7+.**

**6E-b (named-only auto-promotion when off-catalog > scored):**
**Does NOT fire for Owen this round** — `2 > 4` is false. **And
that's the correct outcome.** The promotion was designed for
round-6's `5 named-only > 2 scored` shape; in round 7 the catalog
additions (6F) have moved Owen's stack from named-only into scored,
so the promotion's *non-firing* is itself a sign that 6F worked.
The branch is verified to render correctly when it doesn't fire
(`Summary.tsx:443` renders the default-position section). **Verdict:
correctly inert this round; composes with 6F such that the more 6F
catalog adds, the less 6E-b needs to fire — a self-balancing pair.**

**6F catalog (Oracle DB + PL/SQL with enterpriseStillUsed):**
**Removes 5 of round-6's 7 named-only searches.** Owen's Oracle
stack is now scored. PL/SQL is scored. Only the two genuinely
Oracle-adjacent tools (DBMS_SCHEDULER + GoldenGate) remain named-
only — and that's the *correct* boundary (those are arguably PL/SQL
scheduler internals and Oracle-CDC respectively; not first-class
software-screening targets per the focused-subset catalog policy).
14 Oracle services + 10 PL/SQL services give appropriate
granularity for 6D's coverage thresholds to land in the right
band. `enterpriseStillUsed` flag enables 6A on hypothetical
returner-DBA candidates without affecting Owen (he's current).
**Verdict: highest-leverage single fix of the 6 — it's the catalog
work that makes everything else applicable to Owen at all.**

**6F template (Database / DBA):** **Closes round-6's template
paralysis directly.** Preloaded `['sql', 'plsql', 'oracle-db',
'postgresql', 'mysql']` matches Owen's stack 4-of-5 (MySQL is the
slack tech he marks not-in-stack). 6 methodology chips composed with
6B's "always render section" change to make the chips immediately
visible. **Friction reduction: ~40 s on a 600 s call (~6.7% of
budget).** Critically, the template's only structural gap is **no
`techScopes` entry for postgresql** — leaving Owen's PG-15 to
default to operator-implied. This is the one-line fix to genuinely
close the round-6 PG-architect-scope-missing concern. **Verdict:
right shape, right preloads, right chips; missing one techScopes
key that would close the last round-6 carryover.**

### Overall round-6 → round-7 verdict

**Round-6 Owen: At-risk.** Headline `2G/0Y/0R` misleading; entire
Oracle stack in amber probe-target section; template paralysis +
5 zero-result searches + 5 free-text methodologies + 5 post-call
enrichments; ~10 min spent + ~45 s of post-call data entry. Visual
hierarchy inverted.

**Round-7 Owen: Safe.** Headline `4G/0Y/0R + Methodology 5 + Off-
catalog 2` reads Senior DBA at first glance; Oracle DB lifts from
Yellow to `Good (lifted by depth)` via 6D; template selection takes
10 s with chips preloaded; 2 (not 5) named-only entries enriched
*inside* the call budget; ~9.5 min total with ~30 s of slack.

**Six rounds of fixes (1→2→3→4→5→6) converged on this persona.** The
proximate fixes (6F catalog + 6F template) made Owen's stack
representable; the structural fix (6D coverage lift) made the
representation read as senior; the presentation fixes (6E-a 5-card,
6E-b promotion) made the visual hierarchy adapt to evidence weight;
the seniority gate (6C) protects junior shapes from accidental
softening; the checklist softener (6A) is positioned for the
returner-DBA shape Owen *isn't* but could be on next session. **The
stack composes for this persona. This is the cleanest end-to-end
"product works for the candidate it was built for" result in any of
the seven validation rounds.**

The two remaining gaps (PG-architect-scope + 2-axis radar) are
**residual, not blocking**. PG-architect-scope is one-line in
`roles.ts:172`. Radar is a known thin-shape problem with a
designable solution (named-only-with-category contributes, OR
fallback component for `< 3` axes). Neither prevents the report
from reading Senior DBA.

## 8. One-liner for cross-cut

> **Owen round-7 — Senior Oracle DBA — Safe (up from At-risk in
> round 6). DBA template + Oracle/PL/SQL catalog + 6D depth-lift +
> 6E 5-card headline compose end-to-end: report headline reads
> `4G/0Y/0R + Methodology 5 + Off-catalog 2` instead of round-6's
> misleading `2G/0Y/0R`; Oracle 9/14 lifts to `Good (lifted from
> Review/Probe by depth)` via 6D, the canonical fix for the 5-round
> deep-narrow-specialist pattern. Total time ~9.5 min with 30 s
> slack and named-only enrichment done *inside* the call. Two
> residual gaps: PG defaults to operator-implied (DBA template
> missing `techScopes: { postgresql: 'architect' }` — one-line fix);
> radar still degenerate at 2 axes (Database + Language only,
> structural, not closed by 6F). Six rounds of fixes converged
> cleanly on the persona they were designed for.**

## 9. Recommendation

1. **Add `techScopes: { postgresql: 'architect' }` to the DBA
   template** (`src/data/roles.ts:172-180`). One line. Closes the
   one round-6 carryover that 6F-tpl didn't directly target.
   ~5 min, no test churn (existing `techScopes` regression tests in
   the SA template will catch any wiring break).
2. **Decide on the radar < 3-axis fallback.** Two options:
   (a) **Stat-list fallback** — when `radarData.length < 3`, render
       a horizontal bar list instead of the radar polygon. Pre-
       cedented in dashboarding UI. Owen would see two solid bars
       (Database 3.0 / Language 3.0) instead of a line.
   (b) **Named-only-with-category contributes** — extend
       `NamedOnlyEntry` with an optional `category` field; the
       recruiter picks from the existing category list when adding a
       named-only; the radar averages named-only-with-category
       alongside scored. Owen's DBMS_SCHEDULER + GoldenGate both
       land in Database, lifting that axis from 2-tech to 4-tech
       contribution. **Recommend (a) for v1** (smaller scope, no
       data-model change) with (b) carried as a future enhancement
       for asymmetric specialist shapes.
3. **Smoke-test the 5-card headline grid on mobile (375 px width).**
   `grid-cols-2 sm:grid-cols-3` means on a recruiter's phone the
   5 cards stack 2/2/1 with Off-catalog alone on the bottom row.
   That's defensible but visually slightly awkward. Consider
   `grid-cols-2 sm:grid-cols-2 md:grid-cols-5` to force a clean
   2/2/1 → 5-up jump (skipping the 3-up intermediate state) — Owen's
   3-up at the sm breakpoint puts Methodology + Off-catalog on row
   2 with one slot empty, which reads weaker than 2/2/1.
4. **Carry forward "indexes service granularity" as a catalog-shape
   note for future Oracle-DBA-2.0 work.** Bitmap-on-OLTP discipline
   is a real DBA distinguisher; one row of three indexes types
   collapses it. Low priority; only matters if a senior DBA
   specialist round becomes routine.

## Optional — agreement with round-6 recommendations

Round-6 recommended all five of: ship DBA template, add Oracle
catalog, ship 5λ redesign, promote named-only when it dominates,
scope=architect nudge for migration-touchpoint techs. **Four of five
landed in 6D/6E/6F and resolved the round-6 At-risk → round-7 Safe
transition.** The fifth (scope=architect nudge) landed *catalog-
side* via 6F's enterpriseStillUsed flagging but NOT *template-side*
for the DBA template's Postgres preload — that's the residual gap
named in §7 and §9.1.

This is the rare round where the prior round's recommendations were
implemented essentially verbatim and produced the predicted effect.
The validation pattern (round 6 finds it → round 6 cross-cut
prioritizes it → 6A-F ship → round 7 confirms the fix lands on the
persona it was scoped for) worked end-to-end.
