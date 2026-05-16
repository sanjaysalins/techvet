# Session 02 — Marcus Lee (Junior career-switcher, Backend Dev)

**Agent:** sim-02 (Opus 4.7)
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Marcus, 34, taught high-school CS for eight years before doing a 14-week
Python bootcamp last spring; he's now ten months into his first dev role at
an EdTech startup of nine people. He speaks slowly, qualifies almost
everything ("I think we use…", "Honestly the senior set that up"), and is
genuinely solid on Python data structures and Django views/templates but
fuzzy past the URL conf — he doesn't know what gunicorn is. His Postgres is
real but capped at SELECT/JOIN/WHERE and the occasional `manage.py
makemigrations`. He hasn't typed `docker run` in his life; he runs
`docker compose up` from a Makefile.

## 2. Phone call — abbreviated

> R: "Hi Marcus, thanks for jumping on. Quick five-minute tech check before
> we route you to engineering. What's the day-to-day stack?"
> M: "Python, mostly. Django… version, uh, I'd have to check, four
> something? Postgres for the DB."
> [R: Backend template is preloaded. Types `3.11` into Python (he guessed),
> depth=working. Python → **Good (Green)**. Searches `django`, adds it,
> types `4`, depth=working → **Good (Green, 4.2 LTS)**.]
> R: "Postgres version?"
> M: "Whatever AWS RDS gives us… 14 maybe?"
> [R: types `14` into Postgres, depth=working → **Good (Green)**.]
> R: "Anything else? Redis? Docker?"
> M: "Yeah, Redis for caching — but our senior set that up, I just call it
> from Django. And Docker, yeah, we use Docker."
> [R: Redis → leaves version blank, clicks "I don't remember", depth=shallow.
> Docker → blank version, depth=working (Marcus sounded confident).]
> R: "AWS?"
> M: "We deploy to AWS, yeah. There's a script. I push to main and it goes."
> [R: Opens AWS checklist. "Which services?" M: "Um… RDS for Postgres? S3
> I think? EC2?" R ticks RDS, S3, EC2 (3/14). Skips probing further — time.]
> R: "Node? Kubernetes?"
> M: "No, we don't use those."
> [R: Clicks "Not in stack" on Node.js and Kubernetes. Skips "Other techs
> in these categories" prompt — out of time. Clicks Generate Report.]

Total call time: ~6 minutes. Recruiter never asked about Git, Celery,
gunicorn, virtualenvs, or whether Django ORM vs raw SQL.

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | 3.11 | working | — | **Good (Green)** — matches `min: 3.10` tier |
| Django | 4 | working | — | **Good (Green)** — matches `min: 4.2`? Actually `compareVersions("4","4.2")` → [4,0] < [4,2] → **falls through to 3.2 tier = Yellow "Review / Probe"** + enterprise note |
| PostgreSQL | 14 | working | — | **Good (Green)** |
| Redis | unknown | shallow | — | **Yellow "Review / Probe"**, no enterprise note (depth=shallow suppresses it per the 2026-05-15 fix) |
| Docker | unknown | working | — | **Yellow "Review / Probe"** + enterprise note ("Still widely used…") because depth=working passes the candidateHasMeaningfulDepth gate |
| AWS | 3/14 services (21%) | working | — | **Red "Concern — 3/14 services"** (<25% threshold) |
| Node.js | — | — | — | Gray, "Not in candidate's stack", excluded |
| Kubernetes | — | — | — | Gray, "Not in candidate's stack", excluded |

**Summary radar/buckets:** 3 Green, 2 Yellow, 1 Red across Backend, Language,
Database, DevOps, Cloud categories. Headline: Green-heavy at first glance,
but the Red on AWS will make the hiring manager think Marcus doesn't know
cloud at all. PDF will be ~280 KB.

## 4. Accuracy judgement

- **Where it's right:** Python Green is fair — he genuinely is fine at it.
  Redis Yellow with a shallow depth-suppressed note correctly reads "junior
  using it through a helper". Marking Node and K8s as Not-in-stack keeps the
  radar honest.

- **Where it over-rates:**
  - **Docker Yellow + "Still widely used in enterprise" note** is actively
    misleading. Marcus has never written a Dockerfile; he runs
    `docker compose up`. The enterprise-note fires because the recruiter
    picked depth=working off his confident tone — but `working` here means
    "I type the command", not "I author images". The note will read to a
    hiring manager as "legacy-but-competent", which is the opposite of true.
  - **Django Green if recruiter types `4.2`**. Even at the Yellow tier (if
    they type `4`), the enterprise note will reassure a HM that he's solid.
    He can do CRUD views and not much else.

- **Where it under-rates:**
  - **AWS Red is unfair.** Marcus's job genuinely doesn't require AWS depth —
    his startup has a senior who owns deploy. The checklist coverage metric
    punishes the org's role split, not the candidate. A `scope=operator`
    nuance (e.g. "I deploy *through* AWS, I don't operate it") doesn't help
    here because operator is the default and the coverage is still 21%.
  - **If recruiter typed `Python 3`** (likely for a junior who doesn't know
    minor versions), `compareVersions("3","3.8")` returns negative → falls
    through to **Concern (Red)**. A Python dev typing the major version of
    their language should not get Red. This is the same `parseVersion` major-
    only collapse bug noted in the CLAUDE.md gotchas, still unmitigated.

- **Where it's silent on something a HM would need to know:** Marcus said
  "Docker" but it's Compose only — the tool has no way to distinguish.
  He mentioned "Git" but Git isn't in the catalog at all. He mixes Django
  ORM with SQLAlchemy — that's a conceptual gap a HM would care about, but
  there's no place in TechVet to flag "candidate confused two ORMs". Nothing
  signals that he's a **career switcher** (1 yr coding); a HM reading the
  PDF will assume 1 yr at this role = 1 yr in industry, which is wrong.

## 5. Friction during the call

- **Recruiter typed `3.11` for Python on a guess.** Marcus said "Python,
  mostly" without a version. The tool's tier table is unforgiving of
  bare-major input (3 → Red); the recruiter has to silently pick a plausible
  version or use "I don't remember" (which forces Yellow on a strong tech).
  Neither matches the reality: Marcus is fine at Python, just doesn't track
  versions. **The depth field is doing all the work and the version field
  is fighting it.**
- **AWS checklist took ~90 seconds** to walk through 14 services for a
  junior who recognized 3. On a 5-min call that's 25% of the budget for
  one tech. The "Candidate unsure" toggle existed but the recruiter wanted
  *some* signal, not none.
- **Depth-vs-Scope confusion.** The new Scope dropdown ("operator / author /
  reviewer / architect") is between Depth and Last used. The recruiter (who
  doesn't know what an architect is in software) left it on "Not specified"
  for everything. Scope is invisible to non-technical users without inline
  examples or a tooltip.
- **No prompt to capture "career switcher" context.** `meta.mandate` is free
  text but the PRD doesn't surface a candidate-context field on the report.

## 6. Bugs / structural defects

1. **Docker Yellow + enterpriseStillUsed note misfires for "compose-only" users.** The depth-meaningful gate (`working+`) was designed to suppress the note for non-skill users — but a junior who runs `docker compose up` daily honestly answers "working". Evidence: `scoring.ts:131-135` — gate is purely on depth, not on whether the candidate *authors* artifacts. **Severity: High** (actively misleads HM).

2. **`parseVersion("3")` → Red for Python.** Bare major versions tank candidates whose language uses major.minor tiers. Evidence: `version.ts:46` returns `[3]`, `compareVersions([3],[3,8])` → negative. Pre-existing per CLAUDE.md "compareVersions quirks", still un-mitigated. **Severity: High** for a phone-screen tool where recruiters won't know to type `3.11`.

3. **Checklist coverage punishes role split, not candidate.** Marcus's 3/14 AWS = Red is a verdict on his employer's deploy ownership, not his cloud skill. There's no way to express "operates one corner, by design". `scope=operator` doesn't help (it's the default). `notUsed` lies. **Severity: Medium** — structural, will recur for every junior in a senior-led shop.

4. **No "candidate context" capture on the report.** `meta.mandate` is the *job* mandate. No equivalent for **candidate** context (years in industry, career switcher, returner). HM reading Marcus's PDF will not see that Green Python = "1 yr coding career-switcher Green" vs senior Green. **Severity: Medium**.

5. **Scope dropdown lacks inline examples for non-technical recruiters.** Three of four scope values use software-engineering jargon (`operator`, `author`, `architect`) the recruiter doesn't have ground truth for. Result: 100% left as "Not specified" → scope-cap feature inert on this call. Evidence: `TechCard.tsx` dropdown labels in `scopeLabel()` (`scoring.ts:319-326`) are terse. **Severity: Medium** — silent failure of a feature shipped today.

## 7. Catalog gaps

- **Git is not in the catalog.** Marcus named it. Recruiter has no entry. For a phone-screen tool this is the single most-named tech across all roles.
- **Docker Compose** is not separately tracked. Compose-only operators read identically to Docker authors.
- **Celery / RQ / background jobs** — Django stacks always have one. Marcus's suggested probe even mentions it, but there's nowhere to log it.
- **`pip` / `poetry` / `uv` / `virtualenv`** — Python packaging is a suggested probe but not a logged technology.

## 8. One-liner for cross-cut

> **Marcus — Backend Engineer — junior career-switcher gets Green Python, Yellow-with-enterprise-note Docker (he only runs Compose), and Red AWS for not owning deploy in a 9-person startup; the tool can't tell "doesn't operate it by design" from "doesn't know it" and has no slot for "1 yr coding career-switcher" context.**

## 9. Recommendation

Add a **candidate-context block** at the top of the report (years coding,
career-switcher/returner/junior flag, free text) plus an **"in-stack but
not personally owned"** sub-state on `notUsed` — so AWS-via-someone-else's-
script reads as "operates the output, doesn't own the platform" rather than
Red. This is higher leverage than priority #5 (lastUsed) for junior-screen
fairness, because juniors don't have stale tech — they have role-scoped tech.

## Disagreement with prior fixes

The 2026-05-15 depth-gate on `enterpriseStillUsed` (suppress note when
`unknownVersion && depth ≤ shallow`) overcorrected. It was designed to stop
"I've never touched Kotlin" from getting a legacy-competence note. But a
junior honestly saying `working` on Docker (because they invoke it daily)
now *trips* the note. The fix should additionally gate on **scope ≠
operator-of-managed-tool**, or better, only fire the enterprise note on a
matched-Yellow-tier (not on unknown-version Yellow). The current rule fires
the most-misleading variant — Yellow with no version evidence and a "still
widely used" reassurance — for exactly the user it was supposed to protect.
