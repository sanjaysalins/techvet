# Session 03 — Priya Joshi (Junior-mid, Data Engineer transition)

**Agent:** sim-03 (phone-screening round)
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Data Engineer

## 1. Persona inhabited

Priya is 18 months into her career. She joined a London fintech as a BI analyst writing Looker SQL on top of someone else's warehouse, then over the last six months has been shoved into a "junior data engineer" seat because the senior left. She owns three dbt models (staging→mart for the payments fact table) and triggers a handful of Airflow DAGs that the senior wrote. She speaks confidently about SQL window functions and pandas joins. She becomes vague — but doesn't realise she's becoming vague — the moment the conversation moves to infrastructure: she can't tell you whether Snowflake bills her team by credit, warehouse size, or vibes, and she once ran a Spark notebook in Databricks because a Stack Overflow answer told her to. Polite, fast talker, slightly over-claims to compensate for the title gap.

## 2. Phone call — abbreviated

> R: "Hi Priya — quick 5-min round. Walk me through your daily stack."
> P: "Mostly SQL and dbt. We're on Snowflake. I write models, run dbt build, push to GitHub."
> [R: Data Engineer template already loaded — clicks SQL card, opens checklist. Asks her to walk it.]
> P: "Joins yes, CTEs yes, window functions yes, group-by obviously, indexes — uh, Snowflake handles that, right?"
> [R ticks joins / subqueries-cte / window-functions / aggregations. Skips indexes, query-plans. Depth = working.]
> P: "JSON columns yes, we parse webhooks into VARIANT. Stored procs no. Partitioning — Snowflake clusters automatically."
> [R ticks json-cols. Total: 5/12.]
> R: "dbt version?"
> P: "Oh — 1.7? Whatever Cloud is on. I just write the SQL framework models."
> [R types "1.7", depth=working. Skips scope dropdown.]
> R: "Snowflake?"
> P: "Snowflake is Snowflake, it just updates."
> [R types "current", depth=working. Yellow flash. R confused, then leaves it.]
> R: "Airflow?"
> P: "I trigger DAGs but I don't write them. The senior owned that."
> [R types "2.7", depth=shallow. Scope dropdown — hovers, picks Operator.]
> R: "Spark, Kafka?"
> P: "Ran a Spark notebook once in Databricks. Kafka the streaming team owns."
> [R types Spark "3.4", depth=shallow. Kafka → Not in stack.]
> R: "Python?"
> P: "Pandas, every day. 3.11 I think."
> [R: types Python "3.11", depth=working. Skips pandas (not in template).]
> R: "Postgres in your stack?"
> P: "No, just Snowflake."
> [R: Not in stack.] [Time's up — clicks Generate Report.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| SQL | 5/12 services (42%) | working | — | Yellow "Review / Probe — 5/12 services" |
| dbt | 1.7 | working | — | Green "Good" (1.5 tier band) |
| Snowflake | "current" → parses to `[0]` but matches min `0` Green tier | working | — | Green "Good" |
| Airflow | 2.7 | shallow | operator | Green "Good" (2.5 tier band) |
| Spark | 3.4 | shallow | — | Green "Good" (3.4 tier band) |
| Python | 3.11 | working | — | Green "Good" (3.10 tier band) |
| Databricks | (not entered — Spark covered it in R's mind) | — | — | Yellow "Not yet assessed" if template card stays untouched |
| Kafka | Not in stack | — | — | Gray "Not in candidate's stack" |
| PostgreSQL | Not in stack | — | — | Gray "Not in candidate's stack" |

**Summary headline:** 5 Green / 1 Yellow / 0 Red, 2 skipped, 1 possibly "Not yet assessed". Radar will show 4 categories (Language, Data, Database) with healthy fills. PDF reads like a competent mid-level data engineer.

## 4. Accuracy judgement

- **Where it's right:** SQL Yellow at 5/12 is the most honest verdict in the report — Priya genuinely is a working SQL author who hasn't yet hit the query-plan / index / partitioning rung that separates analyst SQL from engineer SQL. The checklist did its job. Spark depth=shallow Green is wrong (see below), but the recruiter at least captured `shallow` so a technical interviewer can see it on the card.
- **Where it over-rates:** Spark "3.4 working" lands **Green "Good"** because the 3.4 tier is Green and shallow depth doesn't downgrade. She ran ONE notebook once. A naive hiring manager reading the PDF sees Spark in the Strengths bucket. The depth dropdown carries the truth (shallow) but the badge colour speaks louder. **Snowflake is the worst over-rate**: the candidate said "Snowflake is Snowflake, it just updates" and TechVet stamps her **Green "Good"** because the catalog has a single tier with `min: "0"`. Any string with a digit (or even "current" via the unknown-version path — actually "current" has no digit so it would fail `looksLikeVersion` and route to the unknown-version yellow). Wait — `looksLikeVersion("current")` returns false, so this goes through the unknown-version path → Yellow. So the real Snowflake verdict is Yellow with an enterprise note because `enterpriseStillUsed` + working depth fires. That's actually right by accident. But anyone who types "1" or any digit gets Green automatically. The Snowflake catalog entry is structurally a Green-rubber-stamp for anyone who says the word.
- **Where it under-rates:** dbt "1.7 working" → Green "Good". That's defensible on the version axis but it hides that Priya is writing models *in someone else's project*, not architecting the layout — she literally called dbt "the SQL framework" on the call. The recruiter has no field to capture "writes models, doesn't own structure." Scope=author would have been the right pick but the recruiter didn't reach for it. SQL Yellow under-rates her join/CTE/window fluency *relative to her experience level* — for a junior-mid she's actually solid on the SQL she does know, and 5/12 reads like a gap when really 5/12 *with confident, fast answers* is on-track for an analyst→DE transition.
- **Where it's silent on something a hiring manager would need to know:** The whole career-trajectory story. The PDF will show 5 Green / 1 Yellow and look indistinguishable from a true mid-level data engineer. There's no field for "1.5 years in, transitioning from analyst, owns models but not infrastructure." No seniority axis. No years-of-experience. The hiring manager screens her in for a senior DE role, interviews her, and discovers in the first 15 minutes that she's at the wrong rung.

## 5. Friction during the call

- **Snowflake stumped the recruiter.** Versionless SaaS in a version-field UI. Recruiter typed "current", got a Yellow flash, didn't know whether to argue with it or move on. Cost ~15 seconds of dead air.
- **Scope dropdown unused.** Three new fields on every card (Depth, Scope, Last used). On a 5-min call the recruiter Tab-Tab-Tabbed past Scope on every tech except Airflow where Priya literally said "I don't own those." Even there, picking Operator was wrong — she's an operator-by-trigger but Airflow scope=operator implies prod responsibility she doesn't have. There's no "Consumer / Triggered-by" option.
- **Databricks ambiguity.** Priya said "I ran a Spark notebook in Databricks." That's BOTH a Spark fact AND a Databricks fact. The template includes both. The recruiter logged Spark and forgot Databricks; Databricks then sits in the template as a "Not yet assessed" yellow card cluttering the report. There's no UX cue that a candidate utterance maps to two tech cards.
- **SQL checklist was the longest interaction.** 12 checkboxes read aloud on a phone call is slow. Recruiter rushed and Priya said "yes" to four out of seven items in 20 seconds. Checklist mode is correct in *what it measures* but heavy in *how long it takes* — wrong shape for the phone-screen channel.
- **`enterpriseStillUsed` Yellow note on Snowflake** would say "Still widely used in many enterprise applications" — which is technically true but absurd as guidance ("Snowflake is widely used"). Reads as filler.

## 6. Bugs / structural defects

1. **Snowflake catalog entry is a structural rubber-stamp.** `versionTiers: [{min: "0", color: "green"}]` — any user input that contains a digit gets Green "Good". Only the unknown-version path (no digit at all) yields Yellow. Recruiter typing "1", "8", "XS", "M" all → Green. Evidence: `src/data/technologies.json` Snowflake block; `src/lib/scoring.ts:202` `findTier` will match the `0` tier for anything ≥ `[0]`. **Severity: High.** This is the catalog gap RESUME.md priority #10 calls out ("Snowflake-as-Data") but the issue is sharper than re-categorisation — it's that a Green-only tier ladder cannot fail.

2. **Checklist mode has no time-budget UI for phone use.** SQL is 12 items, each rendered as a checkbox row. On a phone screen the recruiter needs a one-shot "she said joins, CTEs, windows, group-by, JSON" multi-select or a fuzzy "tick the ones she names" entry. Severity: Medium. Touches `src/components/TechCard.tsx` checklist render path.

3. **Scope dropdown lacks "Consumer / Triggered-by" option for orchestration tools.** Airflow `operator` semantics don't fit "I press the play button on DAGs I didn't write." This is a real, very-common junior pattern. Severity: Medium. `src/lib/scoring.ts:319-326`.

4. **`enterpriseStillUsed` note fires on Snowflake** as "still widely used in many enterprise applications" — meaningless for a SaaS-only product. The flag should be gated on tech that has a legacy-vs-current axis. Severity: Low. Catalog data quality.

5. **"Not yet assessed" cards from the role template clutter the PDF** when the recruiter ran out of time before touching them. Databricks shows up as Yellow on the report even though it was never discussed. The recruiter's silence is being scored. Severity: Medium. Suggest: untouched template cards should render as gray / "Not asked" not Yellow.

## 7. Catalog gaps

- **Snowflake warehouse sizing / cost modelling** — there's no checklist for Snowflake. The probes are right ("warehouse sizing / multi-cluster / cost monitoring") but the recruiter can't tick them. Snowflake should be checklist-mode like SQL, not version-mode with a degenerate `min: 0` tier. RESUME.md priority #10 mentions this; bumping it earlier seems right given how common Snowflake is now.
- **Looker / Looker Studio / Metabase / Power BI / Tableau** — Priya is a transitioning analyst. Her last-12-months stack includes a BI tool. None of these are in the catalog. The Data Engineer template doesn't ask for them either, fairly, but for a junior-DE-from-analyst path it would be a useful signal.
- **dbt Cloud vs dbt Core** — Priya said "whatever Cloud is on." The version-tier ladder doesn't distinguish, and the probe about Core vs Cloud is buried.
- **Fivetran / Airbyte / Stitch / Hightouch** — ELT ingestion tools. A junior DE pipeline person almost always touches one. None in catalog.
- **Great Expectations / Soda / dbt-expectations** — data quality tooling. Missing.

## 8. One-liner for cross-cut

> **Priya — Data Engineer — career-transitioning analyst scores 5 Green / 1 Yellow indistinguishable from a mid-level DE; Snowflake's single-tier catalog entry is a structural Green rubber-stamp, checklist mode is too slow for phone, and "Not yet assessed" template cards inflate the PDF when the recruiter runs out of time.**

## 9. Recommendation

The single highest-leverage change: **convert Snowflake (and any other versionless-SaaS where the real signal is service breadth) to checklist mode** with a curated list of warehouses, Snowpark, Tasks, Streams, Dynamic Tables, Cortex AI, Time Travel, resource monitors, governance. Priya's verdict flips from accidental-Yellow to a meaningful 0–1 out of 8, and the recruiter actually has something to walk her through instead of staring at a Snowflake version field that doesn't exist. This is a one-catalog-entry change with outsized signal for the data-roles channel — and it forces the recruiter to ask the warehouse-sizing question that she ducked on this call.

## Optional — Disagreement with prior fixes

The scope-of-use axis shipped today is genuinely useful for senior reviewers/architects (the priority #4 case), but on a phone call with a junior the recruiter doesn't have time to think about scope and the dropdown sits unused. I'd suggest a sticky default per-tech-category — e.g. orchestration tools default scope to a new "Consumer / Triggered-by" — so the recruiter doesn't have to make the call mid-utterance. Otherwise scope becomes a senior-only feature that costs everyone two seconds per tech.

## Optional — Edge case for the cross-cut

`looksLikeVersion("current")` returns false (no digit), routing Snowflake to the unknown-version Yellow path. But `looksLikeVersion("Snowflake 8")` would return true and match the `min: 0` Green tier. The Snowflake entry's behaviour depends on whether the recruiter types a digit at all — an undocumented dependency on candidate phrasing. Open question: should versionless techs reject all version input and present a "Versionless — confirm services" affordance instead?
