# Session 05 — Owen Lindqvist (Senior Oracle DBA)

**Agent:** simulation agent 05 (round-6 post-medium-items validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-6-post-medium-validation
**Channel:** Phone (10 min — recruiter knows it's a specialist; extended budget)
**Role template picked:** Custom (no template fits — see §3a)

## 1. Persona inhabited

Owen is 47, eighteen years deep at a Nordic insurance carrier where he owns
the OLTP fleet (Oracle 19c + RAC), the Kimball-modelled warehouse (Oracle
19c + partitioning), and the PL/SQL stored-proc layer that everything
else hangs off. He's the person the on-call DBA pings at 2 a.m. when a
RAC node fences. He runs RMAN restore drills quarterly, designs the Data
Guard topology, and writes the AWR-analysis runbook the juniors follow.

Recently he's been the technical lead on a Postgres-target migration —
he doesn't operate Postgres in prod yet, he's the *source* DBA on the
unload side. He does not write app code, has no interest in app code,
and the hiring manager is screening him for a Senior Oracle DBA seat
that mirrors what he already does. The call is a sanity-check on
seniority and currency, not a stack-fit probe.

Speech pattern: precise, slow, calibrated. "I last took RMAN to L0 +
incrementals + archivelogs in February; the restore drill ran 47 minutes
end-to-end on the 8 TB fleet." Doesn't pad. Recruiter knows within
30 seconds she's talking to a senior, but TechVet has no scaffolding
for the stack he names.

## 2. Phone call — abbreviated

> R: "Hi Owen — ten minutes, walk me through your day-to-day stack at a
>    high level."
> O: "Oracle 19c on RAC, Data Guard standby in Stockholm, warehouse on
>    the same 19c base with heavy partitioning. PL/SQL is where the
>    business logic lives. RMAN for backup. Postgres only as a migration
>    target — not in prod."
> [Recruiter freezes at "Oracle 19c". Types into TechVet search.]
> [Search: "Oracle" → 0 matches → "+ Add 'Oracle' as named-only" CTA fires. Clicks. Card lands in chip row.]
> [Search: "Oracle 19c" → same, no matches → adds as separate named-only.]
> [Pauses. Realises she's doubled-named. Removes "Oracle 19c". Renames the first to "Oracle DB 19c" mentally but the chip stays "Oracle".]
> [Search: "PL/SQL" → 0 matches → named-only.]
> [Search: "RMAN" → 0 matches → named-only.]
> [Search: "Data Guard" → 0 matches → named-only.]
> [Search: "RAC" → matches "react", "rails" by substring — no exact name match → CTA fires. Adds as named-only.]
> [Search: "partitioning" → matches the SQL checklist service `partitioning` but only as a sub-item, not searchable at the top level. Skips.]
> [Now: 5 named-only chips, zero scored cards.]
> O: "I also do query tuning, read AWR reports, and own the data-modeling — Kimball in the warehouse, 3NF on the OLTP side."
> [Recruiter hesitates. "Methodology + practices" section: no template picked, so no chips. Free-text only. Types "Kimball dimensional modelling" → Enter. "3NF / OLTP normalisation" → Enter. "AWR analysis" → Enter. "RMAN backup/restore drills" → Enter. "Data Guard HA design" → Enter.]
> O: "We're migrating a chunk to Postgres — I'm the source-side DBA on the unload, not running it in prod."
> [Recruiter searches "Postgres" → exact match. Adds PostgreSQL card. Owen says "PG 15 is the target". Recruiter types "15" → tier match "Good (Green)". Pauses — Owen's *not actually operating it in prod*. She doesn't think to set Scope=architect; the scope dropdown is below the fold on this card.]
> R: "SQL itself?"
> O: "Daily for 18 years. Window functions, query plans, partitioning, triggers, stored procs — all of it."
> [Recruiter clicks SQL → checklist of 12 services. Reads aloud at speed: joins (✓), subqueries/CTE (✓), window functions (✓), aggregations (✓), indexes (✓), query plans (✓), transactions (✓), normalisation (✓), views (✓), stored procs (✓), JSON columns ("yes, but rarely — we're relational-first" — recruiter under pressure ticks), partitioning (✓). 12/12. Sets depth=very-deep.]
> [Time check: 7 min in. 3 min left.]
> [Recruiter realises she has no card for the Oracle DBA core. Goes back to Summary mentally — Bug-4 enrichment editor will let her set depth + lastUsed on each named-only.]
> [Sets candidateName=Owen Lindqvist, role="Senior Oracle DBA", seniority=Senior, years=18, pathType=traditional, channel=phone, candidateContext="Oracle DBA specialist, 18 yr at same carrier, owns OLTP + warehouse + PL/SQL"]
> [Hits Summary. 9 min elapsed.]
> [On Summary: enriches each of the 5 named-only with depth=very-deep, lastUsed=current. ~45 s for 5 dropdowns + 5 lastUsed fields = blows past the 10 min budget. Recruiter finishes the enrichment offline after the call.]
> [Exports PDF.]

Total entry time during call: ~10 min hard stop. Bug-4 enrichment of the 5
named-only chips finished post-call (5 dropdowns + 5 text fields ≈ 45-60 s
of mechanical clicking, with the phone already hung up).

## 3. What TechVet would output

### 3a. Template choice tension (predicted upfront)

Owen's deep-narrow shape forces a bad template call. Walking the 12
options:

| Template | Why it doesn't fit | Damage if picked |
|----------|-------------------|------------------|
| Full-Stack | App-layer | Preloads React/Node/TS — recruiter has to mass-delete |
| Frontend | App-layer | Same |
| Backend | App-layer + ORM-shaped | Preloads Node+Python+Redis+K8s — alien |
| Solution Architect | Architect cap is wrong for an operator | SA scope cap on Postgres would Yellow-cap his (correct) Green |
| DevOps / SRE | Different mental model | Preloads K8s/Helm/obs — none apply |
| **Data Engineer** | **Closest of the 12** but pipeline-shaped, not DBA-shaped | Preloads dbt/Spark/Airflow/Databricks — none apply; chip set has Kimball, but also lakehouse/medallion which don't |
| Data Scientist | Wrong tribe | Methodology chips are DiD/IV/Bayesian — irrelevant |
| AI/ML Engineer | Wrong tribe | PyTorch/HF/LangChain — irrelevant |
| Mobile / Security / QA | Wrong tribe | All preload alien stacks |
| **Custom** | **No methodology chips at all** | Owen's Kimball/RMAN/Data Guard methodology has to be free-text typed; recruiter pays the cost on every entry |

The recruiter's actual choice in the simulation: **Custom**, because she
recognises within 5 seconds that no template's preloaded `techIds`
include anything Owen named, and rather than mass-delete 6-8 chips she
starts from blank. Cost: she loses the methodology chip set entirely
(Data Engineer's chips are the only ones with *Kimball* on them and one
of three Owen would have ticked).

**This is the gap:** there is no DBA template. Data Engineer is the
least-bad approximation but its chip set is pipeline-flavoured and its
preloaded techs are Spark/dbt/Databricks — wrong stack. The recruiter
either takes the chip overhead on Data Engineer + mass-delete, or takes
Custom + free-text-types 5 methodology entries. Both eat ~60-90 s of a
10-min call.

### 3b. Predicted assessment table

| Tech / entry | Mode | Coverage / version | Depth | Verdict |
|--------------|------|-------------------|-------|---------|
| **PostgreSQL** | version | 15 | unknown (recruiter didn't open) | **Good (Green)** — tier 14+ Good band; *but completely wrong* (Owen is source-side migration DBA, not PG operator). Scope dropdown not opened mid-call. Will read as "Owen is a PG 15 expert" on the report. |
| **SQL** | checklist | 12/12 (100%) | very-deep | **Good (Green)** — 100% > 66% Green floor; depth-lift moot at Green. Honest verdict for the 12-service capture, but **carries the entire weight of Owen's Oracle expertise on a single SQL row** because Oracle itself isn't a scored card. |
| **Oracle** (named-only) | n/a | n/a | very-deep (post-call) | No verdict — amber probe-target chip with "very-deep + lastUsed=current" enrichment |
| **PL/SQL** (named-only) | n/a | n/a | very-deep (post-call) | No verdict — same |
| **RMAN** (named-only) | n/a | n/a | very-deep (post-call) | No verdict — same |
| **Data Guard** (named-only) | n/a | n/a | very-deep (post-call) | No verdict — same |
| **RAC** (named-only) | n/a | n/a | very-deep (post-call) | No verdict — same |
| Methodology free-text | display | n/a | n/a | 5 emerald chips: Kimball, 3NF, AWR, RMAN drills, Data Guard HA |

**Predicted headline stats** (4-card grid because methodology ≥ 1):

```
[ 2 Good ] [ 0 Review/Probe ] [ 0 Concern ] [ 5 Methodology ]
```

Plus chip-row: `5 candidate mentioned, off-catalog`.

**Strengths section:** PostgreSQL (wrong — see above), SQL (correct).
**Probe Further section:** empty.
**Concerns section:** empty (hidden).
**Methodology + practices (5):** Kimball, 3NF, AWR, RMAN drills, Data Guard HA.
**Candidate mentioned — out of catalog (5):** Oracle / PL/SQL / RMAN /
   Data Guard / RAC, each with the very-deep + current enrichment.

**Radar:** Database category averages on 1 row (PG-Green). Language
category averages on SQL-Green. That's two categories with one entry
each — radar will render only 2 axes (below the verified ≥3 threshold),
so the radar likely shows degenerate (2-point line, not a triangle).
**This may visually break the report header section.**

### 3c. Candidate-context line

`Senior · 18 yr in industry · Traditional path · Oracle DBA specialist,
18 yr at same carrier, owns OLTP + warehouse + PL/SQL`

That single line is, ironically, the most accurate seniority signal in
the entire report. The structured data below it under-rates Owen.

## 4. Accuracy judgement

- **The PG-15-Green is structurally wrong and the report cannot
  self-correct.** Owen is a *source-side migration DBA* on a PG
  unload — he doesn't operate Postgres in prod. The 14-version Green
  reads as "Owen is a senior PG operator", which is the opposite of his
  actual stack relationship. The fix would be Scope=architect (caps
  Green → Yellow) but the recruiter never opens the dropdown under
  phone pressure. **This is a Margarethe-shape failure** (returner with
  source-stack stale knowledge) on a fresh axis: candidate has *current*
  knowledge of target stack but isn't *operating* it. There's no UI
  affordance that says "did you actually run this in prod, or is it a
  migration touchpoint?"
- **The SQL Green is correct *and* is doing all the work.** 12/12
  with depth=very-deep is exactly the right verdict for an 18-yr DBA.
  But it's also the *only* scored row carrying the Oracle expertise
  signal — and SQL is a Language-category card, not a Database-category
  card. The Database category radar axis has only PG (the wrong-shape
  Green). **A hiring manager reading "1 Green in Database" learns
  nothing about Owen as a DBA.**
- **The 5 named-only chips carry the actual Oracle stack but at lower
  visual weight than scored cards.** Bug-4 enrichment (depth=very-deep
  + lastUsed=current on all 5) gives the chips real information density,
  but they live in a separate section below Strengths/Probe/Concerns
  with amber styling that reads as "probe target" (i.e., *not yet
  established*) rather than "core stack". For Owen this is exactly
  inverted: the named-only section IS his core stack; the scored
  section is incidental. **The visual hierarchy is wrong for
  specialists.**
- **Methodology section is genuinely useful here.** 5 chips with
  Kimball + 3NF + AWR + RMAN drills + Data Guard HA reads to an HM as
  "this person owns the discipline, not just the tool." The 4th
  headline card (Methodology: 5) helps. **This is the strongest
  positive in the report.** If you read the report top-down, the
  methodology card is the first place you see "senior DBA shape"
  signal — not in the bucket counts, not in the radar.
- **Headline `2G/0Y/0R` reads as "thin signal".** The screen
  composition is misleading: 2 scored Greens looks like "we only got to
  2 techs" when in fact the recruiter covered Owen's entire 18-yr
  stack — most of which lives in named-only. **The named-only count
  (5) is in the chip-row below the headline, not promoted to a 4th/5th
  stat card.** Hiring manager glance order: bucket counts → methodology
  → chip-row → radar → strengths → named-only. The signal is
  bottom-of-page.

## 5. Friction during the call

- **5 zero-result searches in the first 60 seconds is a momentum
  killer.** Each search → "0 matches" → "+ Add 'X' as named-only" CTA
  is ~6-8 seconds of typing-and-clicking. The first one is fine
  (Bug-4's named-only flow handles it gracefully). The fifth one
  (after the recruiter has visibly *not* found Owen's stack four
  times in a row) is a confidence drain — she starts wondering if
  she's mis-typing, switches to abbreviations ("RAC", "DG"), and the
  abbreviation `RAC` hits substring matches on `react` etc., which
  *also* doesn't help.
- **Template choice paralysis cost ~15 s.** No template names DBA;
  recruiter scrolls the 12 options once, picks Custom. Not a long
  pause but visible.
- **Methodology free-text on 5 entries cost ~40 s.** Each free-text
  add is type + Enter, then a moment of "what did he say again?". On
  Data Engineer template the recruiter would have ticked Kimball
  once (~2 s); the other 4 still need free-text but at least one was
  one click. Custom template makes her free-text all 5.
- **SQL checklist read-aloud at 12 items took ~50 s.** With a fluent
  candidate this is fine; with Owen specifically the read-aloud was
  fast because he confirmed each one in 2 words. But under tighter
  phone pressure a recruiter would skip several items and the
  coverage would drop below 12/12, dropping Owen below 8/12 = 66%
  Green threshold (8/12 = 66.7% — single-tick boundary again).
- **Bug-4 enrichment on 5 named-only chips, post-Summary, was ~45 s.**
  Each chip = a depth dropdown click + a lastUsed text field. Phone
  already hung up. **This is the structural shape that worked on
  Wendy/Idris (1-2 enrichments) but starts to feel like data entry at
  5+ enrichments.** For deep-narrow specialists, named-only is the
  bulk of the report, and the enrichment editor is the bulk of the
  post-call work.
- **No scope-dropdown nudge on PG.** Recruiter never opens the scope
  chip. The "Tune scope before exporting" banner *should* fire (PG is
  scored, scope undefined, no catalog default for PG) — but the banner
  is generic, not Owen-specific, and easy to miss in a phone-budget
  scan.

## 6. Bugs / structural defects

**1. No template for the DBA-specialist shape.** What: 11 templates
   exist and none of them preload Oracle / Postgres / SQL with
   DBA-shaped methodology chips. Data Engineer is closest and still
   wrong-shaped (preloads dbt/Spark/Databricks). The fix would be a
   13th template "Database / DBA" with techIds: `['postgresql',
   'mysql', 'sql', 'snowflake', 'clickhouse']` + methodologyChips:
   `['kimball-modeling', 'normalization-3nf', 'backup-recovery',
   'ha-replication', 'partitioning-design', 'query-tuning-awr',
   'data-quality-slos']`. Severity: **High** for the specific persona,
   but DBA is one of multiple under-served shapes (network engineer,
   game-engine dev, embedded dev all have similar gaps per CLAUDE.md's
   "deferred set"). Probably a small one-template-at-a-time add.

**2. Oracle (and the rest of Owen's stack) isn't in the catalog.**
   What: Catalog 2.0 was scoped Focused / recruiter agencies on
   software roles; DBA specialist territory deferred. The named-only
   flow handles missing catalog entries gracefully, but the result is
   that 5 of 7 entries on Owen's report are amber probe-targets
   instead of scored cards. The 5 entries carry **less HM-visible
   weight** than the 2 scored cards because (a) amber bg reads
   "uncertain", (b) they live below the bucket counts in the visual
   hierarchy, (c) they don't appear in the radar, (d) they don't
   appear in Strengths section. Severity: **High** for the
   coverage-as-single-axis cumulative finding.

**3. Coverage-as-single-axis under-rates Owen.** What: this is
   round-5 5λ deferred-redesign, fresh evidence. Owen has 12/12 SQL
   (Green) — but SQL is a Language card. His *Database* row has 1
   entry (PG-15-Green, structurally wrong). If Oracle existed as a
   checklist with 14 services (call it `oracle-rac`, `oracle-dg`,
   `pl-sql`, `rman`, `partitioning`, `awr`, `aq`, `goldengate`,
   `apex`, `exadata`, `multitenant`, `flashback`, `asm`, `data-pump`),
   Owen might tick 8/14 = 57% → **Yellow**. An 18-yr Oracle DBA
   rating Yellow on Oracle is the Tanvir-Pinecone finding made
   sharper: he isn't covering 14 of 14 because he deliberately
   doesn't use Exadata or GoldenGate at his shop, but he *operates*
   the 8 he uses with very-deep mastery. The 66% Green floor would
   miss him by one or two ticks. Severity: **High** — fourth
   independent confirmation of the round-5 5λ pattern (Robin / Cara
   / Brigit / Tanvir → now Owen). The fix isn't "lower the floor"
   (gameable) — it's weighted coverage or per-stack-of-record
   coverage or depth-anchored coverage. Continues to need a design
   pass.

**4. Scoped-as-architect missing on migration-source candidates.**
   What: Owen's PG-15-Green is structurally wrong because he doesn't
   operate PG. Scope=architect would correctly cap it Yellow. But
   there's no template-level scope hint (Custom template has no
   `techScopes`), and the recruiter doesn't open the dropdown on
   phone. This is a Margarethe-shape returner failure (asymmetric
   knowledge) on a fresh axis: target-stack-current vs
   source-stack-stale. Possible fix: a "candidate added this but
   doesn't operate it" toggle on the tech card, equivalent to
   Scope=architect but framed for non-architects. Severity:
   **Medium**.

**5. Named-only chips don't appear on the radar.** What: Owen's 5
   Oracle-stack chips have depth=very-deep + lastUsed=current
   enrichment, but they don't contribute to any radar axis (radar is
   scored-only). Result: the Database axis shows 1 PG point, not 6
   points (5 Oracle + 1 PG). Effectively, the radar's claim of
   "Database coverage" omits Owen's actual database expertise.
   Severity: **Medium**. Either named-only should optionally map to a
   category for radar purposes, OR the radar caveat should be made
   explicit ("scored techs only; see Named-only section for
   off-catalog mentions").

**6. Methodology free-text doesn't dedup against checklist services.**
   What: Owen typed "RMAN backup/restore drills" as a methodology AND
   Oracle has no checklist (so no service overlap fires here) — but
   the design pattern is the same as round-5 Brigit's SLO double-count
   and round-5 Yasmin's causal-inference chip-vs-free-text collision.
   For DBA shape: if Oracle were added as a checklist with `rman` as a
   service, and recruiter ALSO free-typed "RMAN backup/restore
   drills" as methodology, the report would double-count. Severity:
   **Low** for Owen (no double-count fires today) but a foreseeable
   regression once Oracle ships in the catalog.

## 6b. Speed-of-use rating

- **Entry time per zero-result search:** ~6-8 s. Five of them in the
  first 60 s.
- **Methodology free-text 5 entries:** ~40 s (with Custom template).
  Would be ~25 s on Data Engineer template (1 click + 4 free-text).
- **SQL checklist 12-service read-aloud:** ~50 s. Fluent candidate
  helped.
- **PG card:** ~10 s (type version, leave depth).
- **Bug-4 enrichment of 5 named-only:** ~45 s, post-Summary, phone
  hung up.
- **Total during call:** ~10 min hard stop. Owen's call ran to
  budget but with **zero slack** — any nervousness or wandering would
  have blown it. The recruiter finished Bug-4 enrichment after the
  call ended, which she has to keep mental track of.
- **Risk / safe rating: At-risk.** Not Unworkable — the named-only
  flow is graceful enough that the report does get generated — but
  the report under-rates Owen significantly, and the friction
  pattern (5 zero-result searches, template paralysis, 5 free-text
  methodologies, 5 post-Summary enrichments) is too dense for a
  shorter 5-min phone screen. A recruiter doing 6 of these a day
  would feel TechVet wasn't built for her DBA candidates.

## 7. Specialist + 5λ-coverage-redesign verdict

- **Concrete under-rating example #1: 5-of-7 entries demoted to amber
  probe-target chips.** Owen's entire Oracle stack (Oracle / PL/SQL
  / RMAN / Data Guard / RAC) lives in the off-catalog section. Even
  with Bug-4 enrichment, amber styling reads as *uncertain* rather
  than *core*. HM glance order puts these below the bucket counts,
  below methodology, below the radar. The visual hierarchy is
  inverted for specialists: their **core stack is presented as
  probe-target ambiguity** while a peripheral PG-touchpoint reads as
  the strength.

- **Concrete under-rating example #2: predicted Oracle checklist
  rating (if Oracle were added).** A 14-service Oracle checklist
  ticked 8/14 by Owen = 57% = Yellow. 18 yr of focused Oracle
  expertise rated Yellow because he deliberately doesn't operate
  Exadata, GoldenGate, or APEX. Same shape as Tanvir-Pinecone
  (4/12), Brigit-obs-OSS-only, Cara-K8s-OSS-only, Robin-Prometheus-
  only. **Fifth round, same finding.** Coverage as single axis
  cannot tell narrow-by-design from shallow-by-default.

- **Concrete under-rating example #3: the radar is 2-axis with one
  axis wrong-shape.** Owen's only Database row is PG-15-Green (wrong)
  and his only Language row is SQL-Green (correct). The radar will
  render either as a degenerate 2-point line or hide (need to verify
  < 3 axes behavior on Summary). For a DBA specialist this is
  catastrophically thin signal output — the radar's whole job is to
  show shape, and Owen's shape isn't representable in the scored set.

- **Concrete under-rating example #4: headline bucket count
  `2G/0Y/0R` contradicts seniority.** Hiring manager reads bucket
  counts first. 2 Greens is "we only got to 2 techs" semantically,
  not "this candidate is excellent". The methodology 4th card
  partially saves it (5 entries shows discipline), but you have to
  read past the bucket-count primacy bias to get there.

- **Coverage redesign should be depth-anchored, not breadth-anchored
  for specialists.** Owen ticks 12/12 SQL with depth=very-deep — the
  depth claim has been validated by 12 checklist confirmations.
  Conversely, if Owen ticked only 6/12 SQL with depth=very-deep, the
  depth claim is suspect (you can't be very-deep on SQL and not
  recognise window functions). The two axes are mutually constraining
  and the verdict should reflect both. Current scoring uses coverage
  only (Fix A correctly blocked depth-lift on checklist to prevent
  gaming). The redesign should rehabilitate depth as a **coverage
  consistency signal** — depth + coverage that *agree* lift the
  signal, depth + coverage that *disagree* downrate it. This protects
  Owen (depth=very-deep + coverage=100% = Green-with-confidence) and
  catches Bashir-shape gaming (depth=very-deep + coverage=28% =
  flagged for inconsistency, not lifted to Green).

- **The DBA template gap is the proximate fix; the 5λ redesign is the
  structural fix.** Adding a Database / DBA template (4-6 hours of
  catalog work) closes the template-paralysis friction and gives Owen
  a methodology chip set. But it doesn't fix coverage-as-single-axis;
  it just gives Owen a place to land. Both should ship.

## 8. One-liner for cross-cut

> **Owen — Senior Oracle DBA — fifth round of evidence that
> coverage-as-single-axis under-rates deep-narrow specialists. Five
> zero-result searches in 60 s + template paralysis + 5 free-text
> methodologies + 5 post-Summary Bug-4 enrichments fit in 10 min but
> with zero slack. Report headline `2G/0Y/0R` contradicts 18-yr
> seniority; the actual Oracle stack lives in amber probe-target chips
> below the radar. The 5λ redesign is now four independently-confirmed
> rounds of evidence (Robin / Cara / Brigit / Tanvir → Owen).**

## 9. Recommendation

1. **Ship the Database / DBA role template** (4-6 h catalog work +
   methodology chip set). This is the proximate fix for the template-
   paralysis friction. Closes Owen's 40 s methodology-free-text cost
   and gives DBA candidates a recognised landing place. Doesn't fix
   the structural under-rating.
2. **Add Oracle DB + PL/SQL + RMAN/Data Guard/RAC as catalog entries**
   (1-2 d of catalog work, depending on checklist depth). Removes the
   5 zero-result searches and the post-Summary 5-chip enrichment
   burden. Brings Owen's stack into the scored set so it appears in
   buckets, radar, and Strengths section. Still doesn't fix coverage-
   as-single-axis (Owen will likely Yellow on Oracle checklist at
   8/14).
3. **Prioritise the 5λ coverage redesign.** Five rounds (Robin →
   Cara → Brigit → Tanvir → Owen) is enough evidence. The design
   sketch from §7 (depth + coverage as mutually constraining axes;
   weighted services; or per-stack-of-record coverage) needs a
   2-3 d design pass. Without this, every catalog expansion that
   adds a multi-vendor checklist creates a new way for specialists
   to land Yellow.
4. **Promote named-only section in visual hierarchy when it dominates
   the report.** When `namedNotInCatalog.length > scored.length`, the
   named-only section should appear ABOVE Strengths, not below. For
   Owen (5 named-only > 2 scored) this would re-centre the report on
   his actual stack. Small CSS reorder; ~30 min.
5. **Scope=architect nudge for migration-touchpoint techs.** When a
   tech is added during a session that's otherwise dominated by a
   different stack (heuristic: 1 of 7 entries in a non-template
   category), prompt the recruiter to confirm scope. Probably a small
   data-only addition to scope-chip prominence on solitary cards.

## Optional — disagreement with prior fixes

Mildly disagree that the named-only flow + Bug-4 enrichment is
sufficient for off-catalog techs. It was designed for Wendy/Idris-
shape candidates (1-3 named-only entries alongside 6-8 scored). For
deep-narrow specialists where named-only IS the candidate's core
stack (Owen: 5 named-only + 2 scored), the visual hierarchy is
inverted and the post-Summary enrichment burden compounds (5
dropdowns + 5 text fields ≈ 45 s of mechanical clicking, beyond
the call). The fix isn't to remove named-only — it's to acknowledge
that catalog gaps are not always small-N exceptions but sometimes
the entire shape of a senior candidate, and the report layout
should adapt when that's true.
