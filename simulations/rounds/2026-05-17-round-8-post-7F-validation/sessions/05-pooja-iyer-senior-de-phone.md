# Session 05 — Pooja Iyer (Senior Data Engineer, phone)

**Agent:** simulation agent 05 (round-8 post-7F validation)
**Date:** 2026-05-17
**Round:** 2026-05-17-round-8-post-7F-validation
**Channel:** Phone (10 min — US recruiter Vivek, candidate in Bangalore)
**Role template picked:** **Data Engineer** (`data` template) — first-ever DE
validation; rounds 1–7 cast contained zero DEs.

## 1. Persona inhabited

Pooja Iyer, 35, eight years at a Bangalore B2B SaaS (~200 engineers). Owns the
warehouse + ingestion pipelines top-to-bottom. Pure data side; no ML, no
serving. Snowflake is the warehouse — she ran the migration from on-prem
Postgres-as-warehouse in 2022 and currently maintains 8 conformed Kimball marts
on it. dbt is the modelling layer (Core + Cloud, ~3 yr daily). Airflow 2.8
orchestrates everything. Python is data-Python: pandas, polars for the
ad-hoc work, pyspark for the legacy job migration she's shepherding off a 2019
EMR Spark cluster. Postgres is the source-of-truth OLTP — she reads MVCC and
tunes index choices for the CDC reader. Kafka + Debezium feed Snowflake via
Snowpipe. Methodology she'll volunteer: Kimball dimensional, dbt test-first,
contract testing on source tables (Great Expectations + dbt source freshness
SLAs), OpenLineage emitter on every DAG, cost-aware warehouse sizing
(separate L/M/XL warehouses per workload class, monthly compute review).

Speech pattern: calm, precise, uses "we" for team but "I" for design
decisions. Indian English vocabulary — says "data contracts on source
tables" but means schema-evolution contracts enforced via dbt source
freshness + Great Expectations, NOT the AsyncAPI-style data-contracts.dev
flavour a US recruiter might pattern-match. This will matter (see Finding 6).

## 2. Phone call — abbreviated

> V: "Hi Pooja, thanks for the time. Ten minutes, walk me through your
>    day-to-day stack at a high level."
> P: "Snowflake's the warehouse, dbt Core plus Cloud for modelling,
>    Airflow 2.8 for orchestration, Python for the imperative bits,
>    Postgres is our source-of-truth OLTP, Kafka + Debezium for CDC into
>    Snowflake. Spark is the legacy I'm migrating *off* of."
> [Vivek picks **Data Engineer** from the Landing grid — third row. Cards
>  preload: Python, SQL, **Spark**, dbt, Databricks, Kafka, Airflow,
>  PostgreSQL. Eight cards. **Databricks is wrong here** — Pooja doesn't
>  use it. **Snowflake is missing** — her actual warehouse. Vivek doesn't
>  notice on the first scan because the search bar is right there.]
> [Methodology chips on the side: Dimensional modeling (Kimball) /
>  Data lakehouse architecture / Data contracts / Slowly-changing
>  dimensions (Type 2) / Data-quality SLOs / Medallion (bronze/silver/gold).
>  Six chips. Looks reasonable on first read.]
> V: "Snowflake — tell me about it."
> [Vivek types "snowflake" — it's in the catalog. Checklist of 12
>  services lands. As Pooja talks he ticks:]
> P: "We run separate L, M, and XL virtual warehouses per workload class.
>    Snowpipe ingests from Kafka via the connector. Tasks + Streams power
>    the CDC merge logic. Dynamic Tables I tested for the freshness
>    SLAs — we keep half the marts on them now. Cortex we haven't
>    touched. Time Travel — yes, for the dbt CI ephemeral schemas.
>    Resource Monitors — yes, monthly cost reviews. RBAC + masking —
>    I designed the row-access policies for the EU-residency tenants.
>    Data Sharing — yes, with two partner orgs. External Tables —
>    Iceberg on S3, two marts read from there. Materialized Views —
>    no, Dynamic Tables replaced our use case. Snowpark — yes, two
>    Python UDFs for the address-parsing logic."
> [Vivek ticks: warehouses, snowpark, tasks-streams, dynamic-tables,
>  snowpipe, time-travel, resource-monitors, rbac-governance, data-sharing,
>  external-tables. **10/12**. Skips cortex, materialized-views. Sets
>  depth=very-deep, lastUsed=current.]
> [~80 s — fluent candidate, fast checklist.]
> V: "dbt?"
> P: "dbt Core 1.8 and dbt Cloud. About 400 models across staging,
>    intermediate, marts. We do unit tests on the hairy ones, generic
>    tests on every source, source freshness SLAs everywhere. I own the
>    project structure decisions."
> [Vivek types "1.8" — green tier match. Sets depth=very-deep,
>  lastUsed=current. ~25 s.]
> V: "Airflow?"
> P: "2.8. TaskFlow API. Kubernetes executor on EKS. We version DAGs
>    via the bundle pattern. Migration to 3.0 is on the roadmap next
>    quarter."
> [Vivek types "2.8" — falls in the 2.5 tier, **Good (green)**. Sets
>  depth=very-deep, lastUsed=current. ~20 s.]
> V: "Spark — you said legacy?"
> P: "Yes — 2019 EMR cluster, Spark 3.1. I'm migrating those jobs onto
>    Snowpark over the next six months. Last touched the cluster two
>    weeks ago for a bugfix."
> [Vivek types "3.1" — Spark 3.0 tier, **Yellow Review/Probe**. Last-used
>  current (within weeks). Sets depth=deep. The card carries
>  `enterpriseStillUsed: true`. No softener fires (lastUsed isn't stale).
>  No depth-lift to Green because depth=deep + Yellow → Green per scoring
>  rules… **actually does lift.** Spark reads **Good (lifted from Review
>  / Probe by depth)**. Vivek frowns — Pooja literally said "migrating
>  off." See Finding 4.]
> V: "Postgres? You said source-of-truth."
> P: "PG 14. Heavy MVCC reader for Debezium CDC. I don't operate the
>    cluster — RDS, our SRE team owns it. I tune the index strategy on
>    the source tables for the CDC reader."
> [Vivek types "14" — Good tier. Sets scope=reviewer (the catalog
>  default scope is operator; Vivek doesn't change it). **Actually:
>  postgresql has no `defaultScope` and Vivek doesn't manually set
>  scope=reviewer**, so the card reads as operator-implied = **Good /
>  green**. Wrong — she's not the cluster operator. See Finding 5.]
> V: "Python?"
> P: "3.11. pandas, polars for the medium-data ad-hoc, pyspark for
>    legacy. I don't write services."
> [Vivek types "3.11" — Good tier. Sets depth=deep. Green.]
> V: "Kafka?"
> P: "3.6. Debezium CDC producers, Schema Registry, our team runs the
>    cluster on MSK. I designed the topic layout but don't operate
>    brokers day-to-day."
> [Vivek types "3.6" — Good tier. Sets depth=deep. Doesn't set scope.
>  Green. Same operator-blindness as Postgres.]
> V: "SQL?"
> [Pooja walks through it; Vivek ticks 10/12 services on the SQL
>  checklist. Green. ~40 s.]
> V: "Databricks?"
> P: "Never used it."
> [Vivek clicks the "Not in candidate's stack" toggle on Databricks.
>  Excluded from scoring. ~5 s.]
> [Time check: ~7 min in. Three minutes left for methodology + the
>  things Pooja named that aren't preloaded.]
> V: "You mentioned Debezium and OpenLineage — anything else on the
>    methodology side I should capture?"
> P: "Yeah — OpenLineage emitter on every DAG, we tag at the
>    column level. Great Expectations for source-table contracts.
>    Cost-aware warehouse sizing is a discipline we built — separate
>    L/M/XL warehouses per workload class, monthly review. And Kimball
>    of course — eight conformed marts."
> [Vivek scans the methodology chip rail:
>   - Kimball ✓ (tick)
>   - Data lakehouse ✗ (Pooja's on a pure-warehouse + Iceberg-external
>     pattern, not lakehouse)
>   - Data contracts ✓ (ticks it, but **this is the vocabulary mismatch**
>     — Pooja means dbt source freshness + GE; the chip's framing in a
>     US-recruiter context implies AsyncAPI / data-contracts.dev. Vivek
>     doesn't know yet there's a delta.)
>   - SCD Type 2 ✗ (Pooja didn't mention; she probably uses them but the
>     chip never fired probe)
>   - Data-quality SLOs ✓ (tick — source freshness SLAs)
>   - Medallion ✗ (she's on Kimball, not medallion)
>  Three chips ticked.]
> [No chip for: **OpenLineage / column-level lineage**, **cost-aware
>  warehouse sizing**, **CDC / Debezium discipline**, **dbt test-first
>  practice as its own signal**. Vivek uses the free-text fallback to
>  type "OpenLineage column-level lineage" and "Cost-aware warehouse
>  sizing (per-workload warehouse class)" — two free-text entries.
>  ~60 s for the methodology pass.]
> [Off-catalog tech mentions Vivek captures via TechSearch named-only:
>  **Debezium**, **Great Expectations**, **OpenLineage**, **MSK**, **EMR**,
>  **Snowpark UDFs** (Vivek isn't sure if it's covered under the
>  Snowflake checklist already — it is, but he adds the bare term too
>  to be safe). Six named-only entries. ~45 s.]
> V: "One last thing — Snowpark UDFs you mentioned earlier as part of
>    Snowflake; are you writing Python code that ships into Snowflake?"
> P: "Yes, two production UDFs. Address parsing using a Python library
>    we vendored in. I own them."
> [Vivek confirms; doesn't add a separate card. ~20 s.]
> V: "Thanks Pooja — that's our ten."

Call ends at 10:15. Vivek hits **Generate Report**.

## 3. Post-call: report read

**Scored items (8):**
- Snowflake: **Good — 10/12 services** (Green)
- dbt: **Good** (Green, 1.8 tier)
- Airflow: **Good** (Green, 2.5 tier)
- Spark: **Good (lifted from Review / Probe by depth)** (Green) — *wrong-shaped*
- PostgreSQL: **Good** (Green) — *missing reviewer scope*
- Python: **Good** (Green)
- Kafka: **Good** (Green) — *missing reviewer scope*
- SQL: **Good — 10/12 services** (Green)

**Not in stack (1):** Databricks (correct — filtered).

**Methodology chips ticked (3):** Kimball / Data contracts / Data-quality SLOs.

**Methodology free-text (2):** OpenLineage column-level lineage / Cost-aware
warehouse sizing.

**Named-only out of catalog (6):** Debezium / Great Expectations /
OpenLineage / MSK / EMR / Snowpark UDFs.

**Headline strip:** 8 scored Greens, 0 Yellow, 0 Red, 6 named-only.
6 > 8? No, 6 < 8. **6E-b auto-promote does NOT fire.** Named-only sits
below Methodology (default position). Pooja's actual signal-distinguishing
infra (Debezium / GE / OpenLineage — her three biggest senior-DE
differentiators) buried four sections down. See Finding 2.

**Radar:** 4 categories light up — Data (Spark / Airflow / Kafka / dbt),
Database (Snowflake / PostgreSQL), Language (Python / SQL). All three
read Green-shape. PDF export ~280 KB, multi-page A4, clean.

**Top-line read:** A US hiring manager scanning this PDF sees eight Greens
and an emerald methodology row. They infer "strong full-spectrum senior
DE, no gaps." That's roughly correct on *vibe* but wrong on *evidence
shape*: it overstates Spark (she's leaving), understates Postgres/Kafka
scope, buries the lineage/contracts/cost discipline that's the actual
2026 senior-DE differentiator, and silently mis-translates "data
contracts" between two communities of practice. The verdict is too
flattering and not specifically diagnostic.

## 4. Findings

### Finding 1 — DE template preloads Databricks (a competitor warehouse) instead of Snowflake — moderate

**File:** `src/data/roles.ts:171`
**Severity:** moderate (catalog gap, recruiter-recoverable)

```ts
techIds: ['python', 'sql', 'spark', 'dbt', 'databricks', 'kafka', 'airflow', 'postgresql'],
```

Databricks and Snowflake are mutually-exclusive warehouse choices for 80%
of DE candidates. Snowflake is the larger market by candidate count in 2026
(particularly outside FAANG). Preloading Databricks but not Snowflake means
*every Snowflake DE* eats a search-and-add step while *every Databricks DE*
gets the card free. Snowflake exists in the catalog (`technologies.json:1221`,
12-service checklist, well-curated) so this is purely a template-config gap.

**Fix-mapping:** Round 7E was an `enterpriseStillUsed` flag audit; it didn't
look at template preload composition. No prior round caught this — DE
template was never validated. **Recommend** swap `databricks` for `snowflake`
in the `data` template `techIds` array, OR (better) include both and let
recruiter "Not in stack" the irrelevant one (Pooja did exactly this for
Databricks in ~5 s — cheap on phone).

**Counter-argument:** Databricks shops are real and senior. A two-template
split (`data-warehouse-snowflake` / `data-lakehouse-databricks`) parallels
the round-7 7F mobile sub-template split. Owen 7F precedent says this is
the structural fix.

### Finding 2 — 6E-b auto-promote threshold misfires on senior DE shape — moderate

**File:** `src/screens/Summary.tsx:360`
**Severity:** moderate (the round-7 RESUME note about Kenji R3 flagging
`> scored + 1` as the better threshold is exactly this case)

```ts
const promoteNamedOnly = meta.namedNotInCatalog.length > scoredTotal;
```

Pooja has 6 named-only entries and 8 scored. 6 < 8, no promote. But the
6 named-only entries (**Debezium / Great Expectations / OpenLineage / MSK /
EMR / Snowpark UDFs**) ARE the senior-DE differentiating signal — they're
the lineage discipline, the data-quality contract layer, and the
infrastructure beyond the standard stack. Burying them four sections down
defeats the visual-evidence-weight principle 6E-b was built for.

**Root cause:** The threshold treats every named-only as equal weight to
every scored entry, but a *senior* DE's named-only count is structurally
inflated by tools that are genuinely catalog-able but absent (Debezium,
OpenLineage, GE are all real tools with strong communities — they should
be in the catalog, not living in named-only purgatory).

**Fix-mapping:** Round 7 RESUME explicitly noted Kenji R3 wanted
`> scored + 1` not shipped — this session **confirms the original
threshold is wrong** for any candidate whose stack uses well-known
but uncatalog'd tools. **Recommend** either (a) lower threshold (≥ 50%
of scored?), or (b) catalog Debezium / GE / OpenLineage (the three most
commonly named-only DE tools) so the underlying problem goes away.
Option (b) is the better structural fix; option (a) is the cheaper
patch.

### Finding 3 — DE methodology chips miss the 2026 senior-DE differentiators — moderate-to-major

**File:** `src/data/roles.ts:172-179`
**Severity:** moderate-to-major (this is the DE-shape gap the prompt asked
for; affects every senior DE screened with this template)

Current chips:
- Kimball
- Data lakehouse
- Data contracts
- SCD Type 2
- Data-quality SLOs
- Medallion

What 2026 senior DE actually carries that *no chip captures*:
1. **Data lineage / column-level lineage / OpenLineage / Marquez** — the
   single biggest senior-DE differentiator in 2025–26. Pooja volunteered
   this; chip didn't catch it. Vivek had to free-text.
2. **Cost-aware warehouse sizing / FinOps for data** — Snowflake/BigQuery
   bills are board-level conversations; senior DEs own the discipline.
   No chip. Vivek free-texted.
3. **CDC / change-data-capture discipline (Debezium / Snowflake Streams)**
   — distinct from "data contracts" or "streaming"; a 2026 baseline.
4. **dbt test-first / source freshness SLAs as their own practice** —
   "Data-quality SLOs" almost captures it but reads as a generic platform
   chip; the dbt-specific testing discipline is what differentiates daily
   dbt operators from copy-paste model writers.

What's there that nobody under 45 would tick standalone:
- "Medallion (bronze/silver/gold)" — Databricks vocabulary; redundant with
  "Data lakehouse" for the audience that uses it; alien vocabulary for the
  ~70% of DEs on Snowflake/BigQuery/Redshift.
- "SCD Type 2" — universal but oddly granular; nobody volunteers "SCD
  Type 2" mid-flow without prompting (Pooja didn't, and she runs them).

**Fix-mapping:** This is the DE-shaped J4/J5/7B-tier-note equivalent
the prompt named — a *structural template-level gap* that's not
catalog/scoring at all. Round 6F gave DBAs a methodology rewrite (Owen),
round 7A gave Backend chips (Sven). Round 8 should do the same for DE.

**Recommended chip set (drop-in replacement):**
- Dimensional modeling (Kimball)
- Data lineage (OpenLineage / column-level)        ← NEW
- CDC pipelines (Debezium / Streams)                ← NEW
- Data contracts + source freshness SLAs            ← reframed
- dbt test-first discipline (generic + unit + custom) ← NEW, dbt-specific
- Cost-aware warehouse sizing / FinOps              ← NEW
- Data-quality SLOs                                  ← keep
- Lakehouse / Iceberg-on-warehouse                   ← reframed to cover both

That's 8 — still scannable. SCD Type 2 / Medallion drop (or move to the
free-text long tail).

### Finding 4 — Spark "moved-off" misfire is NOT defended by 7B (lastUsed is current) — minor-to-moderate

**File:** `src/lib/scoring.ts:39-51` (depth-lift) + `:175` (recency softener
gate)
**Severity:** minor-to-moderate

Pooja said "migrating off Spark" and lastUsed = two weeks ago. 7B's
neutral-softener wording was designed for the *stale lastUsed* + moved-off
case (Sven Lambda 18mo ago). It only fires when bucket is stale or ancient
(scoring.ts:149). Pooja's Spark lastUsed is *current* — so 7B doesn't fire
and the candidate's deep technical answer (she really is fluent in Spark
3.1 — she's *currently migrating off it*) gets a depth-lift Yellow → Green
that overstates the going-forward signal.

This isn't strictly a bug — Pooja IS Spark-fluent today. But "Good"
reads as "this is a strength to lean on." She's deliberately reducing
it. A scope `migration-target` or `sunsetting` annotation would
differentiate "fluent today + leaving" from "fluent today + investing."
Round-7 7B can't help because it's recency-gated; this is a different
axis.

**Fix-mapping:** Defer or wontfix. Recruiter-side workaround: a
free-text note ("migration target, sunsetting Q3"). Not worth a
catalog change for an edge that the recruiter can capture in 5 s of
text.

### Finding 5 — PostgreSQL + Kafka read as operator when candidate is reviewer/architect — minor (recruiter-recoverable)

**File:** `src/data/technologies.json:1049` (postgresql) + `:1670` (kafka)
**Severity:** minor (the scope field exists; Vivek didn't set it)

Pooja explicitly said she doesn't operate the Postgres cluster ("RDS, our
SRE team owns it") and doesn't operate Kafka brokers day-to-day ("our
team runs the cluster on MSK"). Both cards have no `defaultScope` in
catalog and Vivek (in a 10-min phone window) didn't manually pick
`reviewer`. Result: Green / operator-implied on both.

This is the symmetric inverse of round-5 5δ (the Anil/Azure case): the
Solution Architect template now preloads cloud techs with `architect`
scope (`roles.ts:106-113`). The DE template should do the same — preload
**postgresql** and **kafka** with `reviewer` (or split: postgresql as
operator when the candidate IS the DBA, reviewer when they read CDC).

**Fix-mapping:** Add `techScopes: { postgresql: 'reviewer', kafka: 'reviewer' }`
to the `data` template. Counter-argument: some DEs DO operate Postgres
(small startups). Mitigation: recruiter can override per-card. Default
should match the modal-shape (DE reads source DBs; SRE / DBA operates them).

### Finding 6 — "Data contracts" chip carries a vocabulary mismatch across cultures — minor (UX, cross-cultural)

**File:** `src/data/roles.ts:175`
**Severity:** minor but worth naming because the prompt asked

The chip label "Data contracts" in 2025–26 US-recruiter parlance evokes
the AsyncAPI / data-contracts.dev / PayPal-style explicit contract spec.
In Indian / European DE practice (and at Pooja's shop) the same phrase
maps onto "dbt source freshness SLAs + Great Expectations on source
tables" — same intent, different mechanism, different toolchain. Pooja
ticked the chip because the *intent* matched; Vivek read the tick as
the *US toolchain*. The HM will read it the third way.

**Fix-mapping:** Reframe the chip to "Data contracts + source freshness
SLAs" or "Source-table contracts (any mechanism)" — names the intent and
drops the toolchain-coupling. Round-5 5η (Yasmin causal-inference split)
is the closest precedent: there, recruiter-from-CV ambiguity was solved
by splitting one aggregated chip into four narrower ones. Here, the fix
is to *broaden* the chip label, not split it.

### Finding 7 — DE template has no `serviceTagFilters` for Snowflake → entire 12-service checklist always shows — non-issue

**File:** `src/data/roles.ts:168-180`
**Severity:** non-issue (just noting for the record)

Vivek went through 12 services on Snowflake in ~80 s — well within phone
budget. No filter needed at this list size. Compare to AWS's 26 services
where filters are essential. Not a fix.

## 5. Round-8 verdict — **At-risk (template works but underspecified for senior DE)**

**Safe / At-risk / Unworkable:** **At-risk.**

The Data Engineer template is structurally functional — a Snowflake-stack
candidate can be screened end-to-end in 10 minutes and the recruiter never
hits a dead-end. That's the floor 7F set for the Mobile sub-templates and
the DE template clears it.

But the *output quality* is below what other validated templates produce
in 2026-05-17. Specifically:

1. **One catalog-config gap** (Databricks preloaded over Snowflake) costs
   every Snowflake DE a 10–15 s search-and-add step. Cheap fix.
2. **One scoring-config gap** (no reviewer scope on postgresql/kafka under
   the DE template) silently inflates Green tier counts on every
   non-DBA-DE. Cheap fix mirroring round-5 5δ.
3. **One chip-set gap** (no lineage / no CDC discipline / no FinOps /
   no dbt-test-first chips; one chip Pooja ticked carries a cross-cultural
   ambiguity) means the senior-DE-differentiating signal lives in
   free-text or named-only rather than scannable chips. This is the
   DE-shape gap the prompt anticipated — the structural sibling of
   round-6 6F (DBA) and round-7 7A (Backend). **Round 8 should ship a DE
   chip-set rewrite mirroring those two fixes.**
4. **One auto-promote threshold flaw** (6E-b at `> scored` doesn't fire
   for senior DEs whose named-only count is structurally inflated) buries
   the lineage/contracts/CDC infrastructure four sections down. Kenji R3
   already flagged this in round 7; Pooja confirms. **Recommend cataloging
   Debezium + Great Expectations + OpenLineage** as the structural fix
   (rather than threshold-tuning) — those three tools are catalog-able and
   widely-known, not Pooja-specific.

None of these regress prior rounds. 7E's `enterpriseStillUsed` audit is
intact on the DE-stack catalog entries (spotted: kafka / spark / airflow /
python / postgresql / dbt-yellow-tier all carry the flag correctly).
7D's junior depth-down doesn't apply (Pooja is senior). 7B's neutral
softener didn't fire (lastUsed current) and that's correct behavior. 7C
scope-cap didn't fire (Pooja is hands-on, not architect/reviewer at the
DE-template level).

**Round 8 priority list (DE-template specific):**
- **P1** — Replace `databricks` with `snowflake` in `roles.ts:171`, OR
  split into two warehouse-shape sub-templates (Snowflake / Databricks).
  Snowflake-only is the cheap fix; sub-template split is the principled
  one and mirrors 7F.
- **P1** — Ship a DE chip-set rewrite (Finding 3's 8-chip set). Sibling
  fix to 6F (DBA chips) and 7A (Backend chips).
- **P2** — Add `techScopes: { postgresql: 'reviewer', kafka: 'reviewer' }`
  to the DE template. Mirrors 5δ.
- **P2** — Catalog **Debezium**, **Great Expectations**, **OpenLineage**
  as named DE tools (closes the named-only inflation that defeats 6E-b
  for senior DEs).
- **P3** — Reframe the "Data contracts" chip label to cover the Pooja
  cross-cultural read (Finding 6).
- **Defer** — Spark "moved-off + current lastUsed" softener (Finding 4) —
  edge case, recruiter-recoverable via free-text.

Three of these are catalog/config changes only (no scoring logic touched);
one is a `services` addition to `technologies.json`. None require touching
`scoring.ts`. Estimated total effort: half a day. Estimated impact: turns
the DE template from "functional" into "validated-on-par-with-Backend/DBA."

**Bottom line:** Pooja's session was the right candidate to find these
gaps — round 1–7 cast was 100% non-DE and the DE template shipped
without a live validation. Round 8's contribution to the project is
naming this specific gap-cluster precisely so round 9 can ship it as
one batch (mirroring the 6F / 7A / 7F pattern of "validated-then-shipped
template overhaul").
