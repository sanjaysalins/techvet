# Round-9 / Session 03 — Pooja Iyer redux, Senior Data Engineer (phone, 10 min)

**Date:** 2026-05-17
**Validates:** Batch 8D (DE template fixes — Snowflake preload, Postgres/Kafka reviewer scope, chip swap, data-contracts reframe)
**Recruiter:** Vivek
**Persona repeat:** identical to round-8 session 03

---

## 1. Persona inhabited

Pooja Iyer, 35, eight years as a Data Engineer at a Bangalore B2B SaaS. Currently a senior IC owning the warehouse + ingestion pipelines. Stack she'll quote on a phone call, in the order she'd reach for it:

- **Snowflake** — primary warehouse; runs it day-to-day. Knows sizing, RBAC, Snowpark, Tasks/Streams, Dynamic Tables, Snowpipe, Time Travel, Resource Monitors, data sharing, materialized views. Doesn't routinely use Cortex AI or External Tables/Iceberg.
- **dbt** — Core + Cloud, ~3 yr daily. Project lead. Owns layout, contracts, generic + unit tests, snapshots, exposure docs.
- **Airflow 2.8** — orchestration.
- **Python** — data Python (pandas, polars, pyspark API). Not a backend Python dev.
- **Postgres** — source DB. She reads schemas, knows MVCC patterns, owns CDC contracts with the upstream team. Doesn't operate Postgres in production. Reviewer-shaped, not operator.
- **Kafka** — ingest source. Debezium CDC into the warehouse. Doesn't run brokers; consumer at the edge.
- **Spark** — legacy. "Moved off mostly" three years ago. Still touches it for a few inherited jobs.
- **Methodology:** Kimball dimensional, dbt test-first, source-table contract tests, OpenLineage for lineage, cost-aware warehouse sizing, CDC discipline.
- **Off-catalog she's likely to volunteer:** Debezium, Great Expectations, Evidently, Feast, polars (if Vivek surfaces it as a Python sub-tool).

Channel constraint: phone, 10 min. Pooja is articulate but compresses — she names things fast and expects Vivek to keep up.

---

## 2. Phone call — abbreviated

**00:00** — Vivek picks **Data Engineer** template. Reads off the preloaded cards as they render.

Code-grounding: `src/data/roles.ts:172-203`. The DE template now reads:

```ts
techIds: ['python', 'sql', 'snowflake', 'spark', 'dbt', 'databricks', 'kafka', 'airflow', 'postgresql'],
techScopes: { postgresql: 'reviewer', kafka: 'reviewer' },
methodologyChips: [
  { id: 'kimball-modeling', ... },
  { id: 'data-contracts', label: 'Data contracts (source-table freshness + schema enforcement)' },
  { id: 'data-quality-slos', ... },
  { id: 'medallion-architecture', ... },
  { id: 'data-lineage-openlineage', ... },
  { id: 'cdc-discipline', ... },
],
```

Nine cards land — exactly the round-8 F1 fix. Vivek confirms aloud: "Snowflake, Spark, dbt, Databricks, Kafka, Airflow, Postgres, Python, SQL — nine, good." Snowflake is the third card (after Python, SQL). Pooja, on the other end of the line, doesn't know any of this — she just hears Vivek go faster than usual.

**00:25** — "Tell me about your stack."

Pooja gives the elevator pitch: Snowflake warehouse, dbt for transforms (~3 yr), Airflow 2.8, Python on the polars/pandas side, Postgres + Kafka as sources via Debezium, Spark mostly retired.

**01:10** — Vivek ticks Snowflake first. Card opens, twelve services render (confirmed `src/data/technologies.json:1221-1245`, `vetMode: "checklist"`). He walks Pooja through them.

She confirms: Warehouses, Snowpark, Tasks & Streams, Dynamic Tables, Snowpipe, Time Travel, Resource Monitors, RBAC/governance, Data Sharing, Materialized Views. Skips Cortex AI ("haven't used it in prod yet") and External Tables/Iceberg ("evaluated, didn't ship"). That's **10/12**. Depth: she runs it daily, owns warehouse sizing decisions, so Vivek clicks `deep`.

**02:40** — dbt. Vivek sees the version-mode card (catalog `src/data/technologies.json:2614-2653` — version-mode, currentVersion 1.11, Excellent ≥1.8). Pooja says "1.9, Core and Cloud both." LastUsed: "today." Depth: very-deep ("I own the project layout").

**03:30** — Airflow. Version-mode. "2.8, daily." Vivek doesn't dig — she sounds operator-shaped. Working depth, recent.

**04:00** — Python. Pooja says "I use pandas, polars, pyspark — not a Django person." Vivek captures version as "3.11", depth working, notes "data Python, not web".

**04:30** — SQL. Checklist. Pooja: "Window functions, CTEs, recursive, plan reading, partitioning, materialized views — yes to all. JSON, yes. Heavy on dbt-flavored SQL." Vivek ticks broadly.

**05:30** — Postgres. Pooja: "Source DB. I read schemas and own the CDC contracts. I don't run replicas." Card shows version-mode. Vivek captures version "15" — she answered as a consumer. Depth: working.

Crucial code-grounding check: did the template's `techScopes.postgresql: 'reviewer'` actually arrive on the card by default?

Reading `src/screens/Landing.tsx:31`:
```ts
role?.techIds.forEach(t => addTech(t, role.techScopes?.[t]));
```
And `src/store/assessment.ts:72-86`:
```ts
addTech: (techId, scope) => ... scope, ...
```
So yes — `scope: 'reviewer'` is stamped onto the Postgres item the moment the template is picked. No recruiter action needed. Vivek's UI shows the Postgres card with the **reviewer** scope chip pre-selected. He doesn't override it.

**06:10** — Kafka. Same shape: `techScopes.kafka: 'reviewer'` is pre-applied. Pooja: "Debezium publishes from Postgres into Kafka, I consume the topics into Snowpipe. I don't run the cluster." Version "3.6", depth working. Reviewer scope is correct.

**06:45** — Spark. Pooja: "Mostly moved off three years ago. Couple of legacy jobs still." Vivek captures version "3.2", lastUsed `2023`, depth `working`. Catalog confirms `enterpriseStillUsed: true` (`src/data/technologies.json:1732`). This is exactly the round-7 7B "moved-off mostly" softener path — Spark at 3.2 hits Yellow band already (min 3.0), then recency `stale` + enterprise flag should produce the neutral softener wording.

**07:30** — Databricks. Pooja: "We evaluated it, never went. The team that took my old Spark workload chose it but I never operated it." Vivek marks `notUsed`. Card excluded from scoring.

**08:00** — Methodology chips. Vivek reads them off:

- "Kimball — yes."
- "Data contracts with source-table freshness and schema enforcement?" — Pooja: "Yes, exactly that. We have schema contracts on Debezium feeds."
- "Data quality SLOs — yes, we have freshness and completeness SLOs."
- "Medallion — bronze/silver/gold?" — "No, we don't frame it that way. We have a staging/intermediate/marts dbt layout, same idea, different vocabulary."
- "Data lineage / OpenLineage — yes, we instrumented it last quarter."
- "CDC discipline — yes, this is most of my job."

That's **5/6 ticked**. Medallion stays unticked. The reframed `data-contracts` label landed cleanly — Pooja recognized it on first reading, which is the F5 round-8 fix landing.

**08:50** — Off-catalog. Vivek: "Anything else?"

Pooja: "Debezium I've mentioned. We use Great Expectations and Evidently for data-quality checks. Looked at Feast for a feature store but didn't ship. Polars I use daily for in-memory transforms. OpenLineage I mentioned."

Vivek types as named-only: `debezium`, `great-expectations`, `evidently`, `feast`, `polars`. He doesn't add OpenLineage because it's already captured as a methodology chip. That's **5 off-catalog**.

**09:30** — "Last question, lastUsed for Spark?" — "Three years ago, maybe a tiny bit since for a one-off but not seriously."

**10:00** — Wrap. Vivek hits Summary.

---

## 3. Post-call: report read

### Headline

**Scored: 8** (Databricks excluded as `notUsed`)
Expected bucket distribution working through the resolver:

| Tech | Mode | Input | Path | Expected verdict |
|---|---|---|---|---|
| Snowflake | checklist | 10/12 = 83%, depth=deep, recent | `>=0.66` → Green base; Green + deep = no further lift (already at floor) | **Good — 10/12 services** |
| dbt | version | 1.9, very-deep, recent | min 1.8 → Excellent; depth-lift on Green = no-op | **Excellent** |
| Airflow | version | 2.8, working, recent | Airflow tiers (haven't verified, but 2.8 should be Good or Excellent) | **Good** (assumed) |
| Python | version | 3.11, working, recent | Python 3.11 in Good band | **Good** |
| SQL | checklist | wide tick, working, recent | high coverage → Green | **Good — N/N services** |
| Postgres | version | 15, working, reviewer scope, recent | Good base; reviewer scope on Green → cap to Yellow, `cappedFromColor: 'green'` | **Review / Probe (capped from Good by reviewer scope)** |
| Kafka | version | 3.6, working, reviewer scope, recent | min 3 → Good; reviewer scope → cap to Yellow with `cappedFromColor` | **Review / Probe (capped from Good by reviewer scope)** |
| Spark | version | 3.2, working, lastUsed 2023, enterpriseStillUsed | min 3.0 → Yellow tier; recency stale + enterpriseStillUsed + not-junior → softener fires, color stays Yellow, label becomes "softened from Review / Probe — stale but defensible" | **Review / Probe (softened — stale but defensible)** |

So the headline reads roughly: **5 G / 3 Y / 0 R**. Round-9 expected range was `5-7 G / 1-3 Y / 0 R / Meth: 5` — actual sits at the lower-G / upper-Y end. The two reviewer-scope caps are the swing factor: in round 8 Postgres + Kafka read as Green operator-shape (over-credited), in round 9 they correctly cap to Yellow with the Staff-IC framing.

### Methodology

`5/6 chips ticked` (Kimball, data-contracts, data-quality-slos, data-lineage-openlineage, cdc-discipline). Medallion declined. The report's methodology card lists 5 ticked + 1 unticked.

### Off-catalog

`5 named-only` (debezium, great-expectations, evidently, feast, polars).

Promote-named-only check: `meta.namedNotInCatalog.length > scoredTotal` → `5 > 8` is **false**. The named-only section renders **below** Strengths, not promoted. (See `src/screens/Summary.tsx:358-360`.)

### Per-tier label sample

- **Snowflake** — Good — 10/12 services (no parenthetical; clean Green at high coverage).
- **dbt** — Excellent (clean Green; depth-lift would have been a no-op).
- **Postgres** — Review / Probe (capped from Good by reviewer scope) — this is the round-7 7C `cappedFromColor` framing landing for DE template.
- **Kafka** — same shape: Review / Probe (capped from Good by reviewer scope).
- **Spark** — Review / Probe (softened from Review / Probe — stale but defensible). Slightly awkward — the softener label here reads as a tautology because Spark was already at Yellow before recency ran. The composeLabel logic at `scoring.ts:386-389` returns `"${finalLabel} (softened from ${baseLabel} — stale but defensible)"` where baseLabel = "Review / Probe" = finalLabel. Stale-but-defensible note still renders, which is the load-bearing part. **Cosmetic finding, not a blocker.**

---

## 4. Findings

Numbered, with 8D-validation flagged vs new round-9 findings.

### F1 (8D VALIDATED) — Snowflake preloads as the 3rd card.

`roles.ts:179` ships nine techIds, Snowflake included. Catalog entry exists at `technologies.json:1221` with 12 services in `vetMode: "checklist"`. Vivek did not have to search-add. **Round-8 F1 closed.**

### F2 (8D VALIDATED) — Postgres + Kafka render with reviewer scope by default.

`roles.ts:184-187` carries `techScopes: { postgresql: 'reviewer', kafka: 'reviewer' }`. Landing's `addTech(t, role.techScopes?.[t])` (`Landing.tsx:31`) propagates the scope into the store at template-pick time. `applyScope` in `scoring.ts:79-87` correctly caps Green → Yellow with `cappedFromColor: 'green'`, and `composeLabel` renders the round-7 7C "capped from Good by reviewer scope" wording. **Round-8 F4 closed.** Pooja's Postgres + Kafka now read as honest reviewer-shape rather than over-credited operator-shape.

### F3 (8D VALIDATED) — Chip swap landed.

`roles.ts:195-202` drops `slowly-changing-dims` + `data-lakehouse`, adds `data-lineage-openlineage` + `cdc-discipline`. Pooja ticked both new chips unprompted on first read. **Round-8 F2 closed.**

### F4 (8D VALIDATED) — `data-contracts` reframe lands.

Label is now `"Data contracts (source-table freshness + schema enforcement)"` (`roles.ts:197`). Pooja said "yes, exactly that" on first hearing — the source-table + schema vocabulary matched what she means when she says "we contract-test our sources." **Round-8 F5 closed.** No vocabulary drift left.

### F5 (NEW, ROUND 9) — Spark softener label reads as tautology.

The `composeLabel` output for stale-enterpriseFlag Spark at min-version-Yellow is: `"Review / Probe (softened from Review / Probe — stale but defensible)"`. The from/to color is identical, so the parenthetical reads circular. The semantic content (`stale but defensible`) is preserved in the recencyNote field, so the hiring manager isn't actually misled, but the label is ugly. **Cosmetic, not a blocker.** Suggested 9A: when `baseLabel === finalLabel` for recency softener, render `"Review / Probe (stale but defensible)"` without the from-clause.

### F6 (NEW, ROUND 9) — 9-tech preload may be too dense for a 10-min phone screen.

Round-7 7F trimmed Mobile from 7 → 2-3 for exactly this reason (Priya R3 + Kenji confirmation). DE template is now at 9 preloaded cards. In this session Vivek got through 8 of them + 6 methodology chips + 5 named-only in 10 minutes, but only because Pooja is articulate and Vivek skipped probes on Airflow/Python. A less compressed candidate would not fit.

The Mobile split was driven by *platform divergence* (iOS-only candidate doesn't want Android cards). DE doesn't have the same divergence — most senior DEs do span Snowflake + dbt + Airflow + Python + SQL + Postgres + Kafka. But Databricks vs Snowflake IS a fork. Pooja marked Databricks `notUsed`; a Databricks-shop DE would similarly mark Snowflake `notUsed`. That's 1 wasted card per session.

**Suggested 9B:** rather than full template split, consider making Databricks + Snowflake mutually conditional — present one preloaded based on a Landing-time toggle ("Primary warehouse: Snowflake / Databricks / Both / Other"). Or keep both but accept the 1-card waste as cheaper than a fork.

### F7 (NEW, ROUND 9) — Postgres reviewer scope reads sensibly for DE — landed.

The concern in the prompt was "does reviewer scope mis-fit DE's 'source-consumer' relationship?" Verdict: it fits. Pooja's relationship to Postgres IS reviewer-shaped (reads schemas, owns contracts, doesn't operate). The "capped from Good by reviewer scope" label tells the hiring manager exactly the right story: she would have read Good if she ran the DB, but she doesn't, so the verdict is honestly bounded. Same shape as round-3 Tomi-AppSec on Kubernetes. **Validated. No drift.**

### F8 (NEW, ROUND 9) — 6E auto-promote does not fire for senior DEs — and threshold tweak is the wrong fix.

`Summary.tsx:360`: `promoteNamedOnly = meta.namedNotInCatalog.length > scoredTotal`. Pooja: 5 off-catalog vs 8 scored. `5 > 8` = false. No promotion.

Round-7 Kenji flagged the threshold as "too loose" (it promoted when it shouldn't have). Round-8 Pooja in retrospect was "too tight" (it didn't promote when arguably it should have for senior DEs whose differentiator tooling is off-catalog). Round-9 Pooja with 5 named-only confirms: still doesn't fire, and arguably shouldn't here — 5 of her named-only are auxiliary tooling (Debezium / GE / Evidently / Feast / polars), not her core stack. The core stack (Snowflake / dbt / Airflow) IS scored. Promoting the off-catalog section above Strengths would mislead.

**The real fix is catalog those off-catalog tools, not tweak the threshold.** Specifically:

- **Debezium** — the canonical CDC source for every Kafka-into-warehouse DE. Belongs in catalog as a checklist-mode entry (capture, sink, transform, schema-registry, snapshot, etc.) or version-mode at minimum. Pooja named-only'd it; every DE will.
- **Great Expectations** — canonical data-quality tool. Checklist-mode candidate.
- **Polars** — version-mode candidate, Python ecosystem alongside pandas.
- **OpenLineage** — methodology more than tool, already chip'd. Don't catalog.
- **Evidently / Feast** — narrower, can stay off-catalog. Promote if recruiters see them more than once.

**Suggested 9C:** catalog Debezium + GE + polars in the next round to close the senior-DE off-catalog leak. Threshold logic itself is fine.

### F9 (NEW, ROUND 9) — Spark "moved-off mostly" softener fires correctly.

`enterpriseStillUsed: true` confirmed at `technologies.json:1732`. Pooja's Spark at 3.2 + lastUsed 2023 + working depth + non-junior triggers the round-7 7B path in `applyRecency:196-218`. The `recencyNote` reads: *"Stale (2-4 yr) but the version was current at last-use — defensible older usage; probe whether the candidate is returning to it or deliberately moved off."* This handles Pooja's "moved-off deliberately" case correctly without "returner" mis-framing. **Round-7 7B validated for DE template.** (The label cosmetic noted in F5 is the only blemish.)

### F10 (NEW, ROUND 9) — Methodology chip-set is now correctly sized.

Six chips, five ticked. Pooja's only un-tick was medallion (she has the same shape, different vocabulary). That's exactly the right discrimination — chips should distinguish meaningfully, not require unanimous ticking. The chip-set succeeded at capturing 2026 senior-DE signal that previously fell through to free-text.

---

## 5. Round-9 verdict

**Batch 8D landed cleanly.** All four sub-fixes (Snowflake preload, Postgres/Kafka reviewer scope, chip swap, data-contracts reframe) read correctly in the post-call report. Pooja's session in round 9 is meaningfully better than her round-8 session: the Snowflake search-add step is gone, the chip-set captures lineage + CDC without forcing free-text, the data-contracts vocabulary lands on first reading, and the reviewer scope on Postgres + Kafka prevents over-crediting.

Net new findings for round 10 consideration, ranked by impact:

1. **F8 (high):** catalog Debezium + Great Expectations + polars. Closes the senior-DE off-catalog leak more honestly than tweaking the auto-promote threshold. The Kenji/Pooja round-7-8 tension on the threshold dissolves once the core senior-DE tooling is scored rather than named-only.
2. **F5 (low, cosmetic):** Spark softener label tautology. `composeLabel` should suppress the from-clause when `baseLabel === finalLabel`. Five-line fix.
3. **F6 (medium, dependent on more sessions):** 9-tech preload density. One wasted Databricks card per Snowflake DE (and vice versa) costs ~30 seconds. Worth fixing only if a few more sessions confirm the pattern.
4. **F7 + F9 + F10 (validations):** reviewer scope fits DE shape; Spark moved-off softener fires; methodology chip-set is right-sized.

No regressions detected. No batch 8D fix needs to be unwound. Round 9 closes out batch 8 for the DE template; round 10 can move on to F8's catalog adds.
