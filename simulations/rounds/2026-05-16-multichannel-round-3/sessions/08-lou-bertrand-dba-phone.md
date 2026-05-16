# Session 08 — Lou Bertrand (Senior, DBA specialist)

**Agent:** sim-08
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Phone (5-10 min)
**Role template picked:** Custom

## 1. Persona inhabited

Lou is 18 years deep on Oracle at a French insurer — 120 prod instances,
RAC clusters, Data Guard standby, RMAN backups, AWR/ASH at the level
where he diagnoses by glance. The Postgres migration is his secondary
brief: about a third of the fleet is moved, one major version per month.
He thinks of himself as "a database engineer who happens to write a bit
of bash and a bit of Python when nothing else will do". On a recruiter
call he is calm, terse, and assumes the person on the other end knows
what an EXPLAIN plan is. He's never used Docker in production and will
say so.

## 2. Phone call — abbreviated

> R: "Lou, walk me through your stack — top to bottom."
> L: "Oracle is the day job. RAC, Data Guard, RMAN, PL/SQL. AWR for tuning."
> [Recruiter (custom template, blank): types "Oracle" → no results.
>  Tries "RAC" → no results. Tries "PL/SQL" → no results. Tries "Data Guard"
>  → no results. Hesitates, doesn't know how to log this. Skips.]
> R: "OK… and Postgres?"
> L: "Yes, secondary. Fleet is on 14, 15, and 16 — I migrate one a month."
> [R: searches "Postgres" → adds. Types "14/15/16" verbatim. Picks depth=Deep.
>  Doesn't touch Scope.]
> R: "SQL — comfort?"
> L: (chuckles) "Joins, CTEs, window functions, indexes, query plans, isolation,
>     normalisation, views, stored procs, JSON, partitioning — yes."
> [R: searches "SQL" → opens checklist. Reads down the 12 items, ticks all 12
>  in ~30 s as Lou ack-acks. Depth=Very-deep.]
> R: "Anything cloud or containers?"
> L: "AWS RDS, peripheral — I review configs. Docker only in dev."
> [R: adds "AWS" — sees a long checklist of 20+ services. Ticks RDS only.
>  Adds Docker — types "26", depth=Working.]
> R: "Scripting?"
> L: "Bash, some Python."
> [R: searches Bash → no result. Adds Python, no version, depth=Shallow.]
> Call ends ~7 min. Recruiter never opens Scope dropdown on any card.

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| PostgreSQL | "14/15/16" → min=14 (Fix 2) | Deep | — | **Good** (Green); tier `min:"14"` matches; depth-lift no-op (already Green) |
| SQL | 12/12 = 100% | Very-deep | — | **Good — 12/12 services** (Green); Fix A = no lift, but already top |
| AWS | 1/20 ≈ 5% | (untouched) | — | **Concern — 1/20 services** (Red); ratio < 0.25 |
| Docker | 26 → Green tier | Working | — | **Excellent** (Green) — but scope=operator-by-default is wrong here |
| Python | empty version, no toggle | Shallow | — | Card has no version + no toggle + no notes → **`notDiscussed=true`** (Fix G) — *excluded* from buckets/radar; surfaces in "Not discussed on the call" |
| Oracle / RAC / Data Guard / PL/SQL / RMAN / AWR | — | — | — | **Never logged.** Recruiter searched, got 0 hits, gave up. The candidate's primary skill is invisible to the report. |
| Bash | — | — | — | **Never logged** (no catalog entry). |

Summary headline: 3 Green / 0 Yellow / 1 Red across 4 scored techs +
1 not-discussed. Radar = Database, Language, Cloud, DevOps. **No mention
of Oracle anywhere on the PDF.** The hiring manager reads the report and
infers Lou is a Postgres-and-SQL generalist with weak AWS — exact
opposite of the truth.

## 4. Accuracy judgement

- **Where it's right:** Postgres "14/15/16" → Good (Fix 2 holds under
  phone speed — Lou said it as a single utterance and the recruiter
  typed it verbatim; the min-pick saved the verdict from a deceptive
  Excellent on the bleeding edge). SQL 12/12 → Good honestly reflects
  Lou's depth.
- **Where it over-rates:** Docker → Excellent. Lou said "dev only".
  Recruiter never touched scope, so it logs as operator. He doesn't run
  Docker in prod — at best he's a `docker run` consumer. Without scope
  intervention this is a 3-point Green he doesn't deserve.
- **Where it under-rates / disappears the candidate:** AWS Red is technically
  correct on coverage but misleading: Lou is a DBA, "RDS-only" is the
  *right* answer for his role, not a coverage failure. More damaging,
  **Oracle, PL/SQL, RAC, Data Guard, RMAN, AWR** — the entire reason
  someone would hire Lou — are absent from the PDF. A hiring manager
  scanning this report cannot tell the candidate is a senior Oracle DBA.
- **Where it's silent on something a hiring manager would need to know:**
  Years of specialism. Lou is 18 years deep on one platform; the report
  has no field for that. The radar will look thin (~3-4 axes filled out
  of 11) which a non-technical hiring manager will read as "narrow
  candidate, decline" rather than "specialist, route to Oracle role".

## 5. Friction during the call

- **Search dead-ends (4 in a row).** Oracle, RAC, PL/SQL, Data Guard all
  return zero. Recruiter loses ~40 seconds and abandons. On a 7-minute
  phone call this is 10% of total budget burned.
- **Custom template = blank canvas.** No DBA template means the recruiter
  is flying without scaffolding while typing. Defaults to typing what
  the candidate says verbatim, which is fine for Postgres but bankrupt
  for everything not in the catalog.
- **AWS checklist is 20+ items.** Recruiter ticks one (RDS). Reading the
  full list aloud at phone speed is impossible; ticking-by-ear means
  most boxes are simply not asked about. The denominator-of-20 punishes
  any narrow user.
- **Scope dropdown never opens.** No recruiter on a 7-min call is going
  to open a 4-option dropdown on each of 5 cards. AI/ML libs have
  catalog `defaultScope: "author"` (Fix K) but Docker, Postgres, AWS
  do not — so Lou's review-only AWS and dev-only Docker score as
  full operators.

## 6. Bugs / structural defects

1. **Catalog-shaped invisibility for vertical specialists.** Title.
   The catalog has no Oracle, no PL/SQL, no RAC, no Data Guard, no RMAN,
   no AWR. A senior DBA's primary stack is unrenderable. The PDF will
   imply Lou is a Postgres/SQL generalist. Evidence:
   `src/data/technologies.json` — 96 techs, 0 Oracle. Severity: **High**
   (genuine candidate-misrepresentation, not just friction).
2. **Search returns zero with no fallback / capture.** Title.
   Recruiter typed Oracle, RAC, PL/SQL, Data Guard, Bash — all zero
   hits. Tool offers no "name-and-park" capture (Fix C in cross-cut
   priorities — still ⏳). On phone, dead-end search compounds: 4 misses
   in 40 s loses recruiter rhythm. Severity: **High** (already on the
   queue as Fix C; this session is +1 evidence with a new shape).
3. **No DBA / Database-specialist role template.** Title.
   `src/data/roles.ts:8-87` — 12 templates, none oriented at DBAs
   (closest is Data Engineer, which is pipeline-shaped). Custom is
   blank. A DBA-specialist template (Postgres, MySQL, MongoDB, Redis,
   SQL, plus an Oracle stub once added) would orient the recruiter and
   reduce the chance Oracle is forgotten. Severity: **Medium**.
4. **Docker scope default does not protect against "dev only" answer.**
   Lou explicitly said "dev only" out loud, scoring Docker as Excellent
   anyway because operator-by-default and recruiter doesn't open scope.
   Fix K shipped `defaultScope` for AI/ML libs only. Docker (and
   arguably AWS, Kubernetes) deserve a `defaultScope` audit for non-AI/ML
   shapes. Severity: **Medium**.
5. **AWS 20-item checklist + flat denominator punishes narrow users
   correctly but with the wrong tone.** Lou-the-DBA "RDS-only" is the
   right answer for his role, not a coverage failure. Without role-aware
   AWS checklists (cross-cut Fix #8, ⏳), every non-cloud-engineer who
   says one AWS service scores Red. Severity: **Medium**.

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Search + click-add + type-version + pick-depth
  ≈ 8-12 s for a tech that exists in the catalog (Postgres, Docker,
  Python). For SQL with 12 boxes ticked it stretched to ~35 s — but
  that's the *good* case (Lou knew them all and said yes-yes-yes). For
  techs *not* in the catalog (Oracle, RAC, PL/SQL, Data Guard, Bash):
  ~10 s of search + zero result + abandon = pure dead time, ~50 s lost.
- **Phone-shrink test (this IS the phone test).** What broke: (a) 5
  search-zero events compressed into 7 minutes — recruiter never recovers
  rhythm; (b) AWS 20-item checklist is unreadable at phone pace — only
  RDS got asked because Lou volunteered it; (c) Scope dropdown never
  opened on any card, so Docker-dev-only and AWS-reviewer scored as
  operator. Fix-2 fleet-hedge held up nicely under phone speed: Lou said
  "14/15/16" once, recruiter typed it verbatim, no thinking required.
- **Friction that vanishes on phone.** All of it would survive video
  better — the recruiter could have re-prompted Lou for the Postgres
  version, opened Scope on each card, read the AWS checklist out, and
  asked "is Oracle the same as PL/SQL for searching?". On phone none of
  that fits.
- **Risk / safe rating.** **At-risk for breadth candidates, Unworkable
  for vertical specialists.** The tool produces a defensible report on
  Postgres + SQL but loses the actual headline (18 years Oracle).
  Net for Lou: the PDF actively misleads.

## 7. Catalog gaps

- **Oracle Database** — flagship enterprise RDBMS, completely absent.
  Likely should be checklist-mode: RAC, Data Guard, RMAN, ASM, GoldenGate,
  Partitioning, Advanced Compression, Flashback, AWR/ASH, Resource
  Manager, Audit Vault, OEM/Cloud Control. (Catalog refresh round 2
  defers enterprise — but Oracle is a recruiter-staple even for
  software-shaped roles in finance/insurance/telecom; promoting it is
  warranted.)
- **PL/SQL** — distinct skill from generic SQL; deserves its own entry
  (or a checkbox under SQL).
- **Bash / shell scripting** — recruiter dead-end; trivial to add as a
  Language entry (could be checklist: pipes, traps, getopts, here-docs,
  process-substitution, signal handling, set -euo pipefail).
- **MariaDB** — separately likely missing for the EU market.
- **Postgres tooling** — pg_dump, pgbench, logical replication,
  pg_stat_statements, pgBackRest deserve to be checkbox depth on the
  Postgres card (right now Postgres is pure version-mode; says nothing
  about *what* the candidate does with it).

## 8. One-liner for cross-cut

> **Lou Bertrand — Custom — 18-year Oracle DBA appears on the PDF as a
> Postgres-and-SQL generalist; primary stack (Oracle/RAC/PL-SQL/Data
> Guard) is unrenderable, so the headline candidate signal is silently
> dropped.**

## 9. Recommendation

The single highest-leverage change for Lou's session is **a search "name
and park" fallback** (cross-cut Fix C) so the recruiter can type
"Oracle", "RAC", "PL/SQL" and have them captured as free-text-tagged
items — even without a tier, the PDF would then *say the words* "Oracle
DBA, 18 years" to the hiring manager. This is far cheaper than building
a full Oracle catalog entry and it generalises to every other
specialist-extreme shape that will collide with the catalog gap. A DBA
role template (Recommendation #3 above) is the second-cheapest win.

## Disagreement with prior fixes

None — Fix 2 (fleet-hedge minimum-pick) survived phone speed cleanly on
"14/15/16" and was the one piece of the workflow I'd point to as
unambiguously good. Fix K's `defaultScope: author` for AI/ML libs is the
right shape but the wrong scope of catalog: Docker and AWS would
benefit from analogous defaults (e.g. AWS `defaultScope: operator`
combined with role-template-aware checklists). The principle is right;
the coverage is partial.
