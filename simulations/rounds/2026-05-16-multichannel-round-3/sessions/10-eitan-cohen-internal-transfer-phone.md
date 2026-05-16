# Session 10 — Eitan Cohen (Internal-transfer SE→Dev, Backend)

**Agent:** sim-10 (Opus 4.7)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Phone (5-10 min)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Eitan is 34, two years into a backend role on the Platform team at his SaaS
employer; the prior six years he was a Solutions Engineer there — doing
customer-facing pre-sales demos, POCs, and integration scripting. He
genuinely ships Python/Django services on AWS now (his team owns billing
APIs, Postgres-backed). But six years of demoing the whole product
catalog gave him an SE-shaped breadth on AWS — he can *name* twelve
services and has *built against* maybe five. He under-claims coding
depth ("I'm still kind of new at this") and over-claims cloud breadth
("I've worked with all of it"). His React is purely demo-fixture work.

## 2. Phone call — abbreviated

> R: "Walk me through your stack."
> E: "Mostly Python and Django for the billing service, on Postgres."
> [R: Backend template loaded — `nodejs/python/postgresql/redis/docker/kubernetes`. Removes nodejs (3 clicks). Searches "django", adds it.]
> E: "Python 3.11, Django 5.0."
> [R: types versions; depth picker — pauses — picks "Working" for both. Postgres "we're on 15." Picks "Deep".]
> E: "We deploy to AWS — I've worked with EC2, Lambda, S3, RDS, IAM, CloudWatch, also touched API Gateway, Step Functions, EventBridge, Fargate, DynamoDB once for a POC..."
> [R: opens AWS checklist, ticks 10 of 14 as Eitan rattles them off. Doesn't pause to ask "in production" vs "in a demo".]
> E: "Docker yes, GitHub Actions yes, Kubernetes — uh, EKS but I don't really run it, the platform team owns that."
> [R: Docker no version typed → "I don't remember", depth Working. K8s → "Not in stack"? Hesitates, leaves depth=Shallow, no version. GHA: opens checklist, ticks 4 of 8.]
> E: "Front end I touched some React for SE demos, version... 17 maybe?"
> [R: searches React, adds, types "17", depth Shallow.]
> E: "Redis we use for session cache, fairly basic."
> [R: Redis depth Working, no version. Time's up.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | 3.11 | Working | — | **Good** (green; tier 3.10+) |
| Django | 5.0 | Working | — | **Good** (green; tier 4.2+, below 5.2 LTS) |
| PostgreSQL | 15 | Deep | — | **Good** (green; tier 14+) |
| Redis | (none) + "I don't remember" not toggled | Working | — | **Yellow "Review/Probe"** + `notDiscussed=false` (version typed empty but recruiter never toggled unknown — falls into version-mode unknown path; Fix B blocks depth lift; `enterpriseStillUsed` note fires because depth=Working) |
| Docker | (none, unknownVersion=true) | Working | — | **Yellow "Review/Probe"** + enterprise note (Fix B: no lift) |
| Kubernetes | (none) | Shallow | — | **Yellow "Not discussed on the call"** (version-mode: empty, no toggle, depth shallow; `notDiscussed=true` → excluded from buckets/radar) |
| AWS | 10/14 (71%) | — | — | **Good** (green; ≥66% threshold) |
| GitHub Actions | 4/8 (50%) | — | — | **Yellow "Review/Probe — 4/8"** |
| React | 17 | Shallow | — | **Yellow** (16.0–17.x tier) + enterprise note (depth=shallow → suppressed by Fix 5: needs ≥working) — actually no, version IS present so enterprise note path uses `tier.color===yellow && enterpriseFlag` → fires regardless of depth. **Yellow + enterprise note.** |

Summary headline: ~5 Green / 3 Yellow / 0 Red, with K8s in "Not
discussed". Radar: 6 categories represented. Hiring manager sees
"Excellent backend, broad cloud, decent CI" PDF.

## 4. Accuracy judgement

- **Where it's right:** Python/Django/Postgres greens are accurate.
  He genuinely ships these. GHA Yellow at 4/8 is fair.
- **Where it over-rates:** **AWS 10/14 = Green is misleading.** Eitan
  named services in SE-rattle mode — half were "I demoed it" or "I did
  a POC". The checklist has no "operator vs demoed" distinction, no
  recency, no "in production" gate at the tick level. The
  `suggestedProbes` text says "not just tutorials" but the recruiter
  on a 7-min phone call doesn't see those probes per-tick — they see
  a checkbox. **Fix K's `defaultScope` doesn't apply to AWS** (only
  AI/ML libs got it), so there's no automatic cap. Outcome: Eitan's
  SE-breadth gets scored as backend-engineer-breadth. Hiring manager
  reading the PDF will assume he can architect on AWS; he can't yet.
- **Where it under-rates:** **React Yellow + "still widely used in
  enterprise" reads like legacy competence**, but Eitan's React is
  literal demo-fixture work — not even working knowledge. The note
  flatters a non-skill. Also: nothing on the report communicates
  **"2 yr coding, 6 yr adjacent industry"**. A hiring manager seeing
  the PDF cold will assume Eitan is a 2-yr junior dev — missing that
  he has 8 yr of customer-facing technical context that's *very*
  relevant for a platform team that talks to customers.
- **Where it's silent on something a hiring manager would need to
  know:** The non-traditional path. Fix M (candidate context block)
  is not shipped. There is no field for "8 yr in industry, 2 yr in
  this role, transferred from SE". This is the entire reason he's
  interesting as a hire and the report cannot say it.

## 5. Friction during the call

- **Removing nodejs from the Backend template** cost ~3 clicks
  (find card, "Not in stack" or delete). On a 7-min call that's a
  meaningful chunk of attention.
- **Recruiter never opened scope dropdown** — phone-call recruiters
  don't think "is he an operator or an architect of EKS?" while the
  candidate is talking. Fix K's interactive Summary chip helps
  *post*-call but the verdict is already locked when Eitan moves on.
- **AWS checklist of 14 ticks** while Eitan rattles services took the
  recruiter ~25 seconds — too long; she fell behind on Docker.
- **Depth picker hesitation on every tech.** "Working" vs "Deep" is a
  judgment call the recruiter doesn't have time to make. She defaulted
  to Working everywhere a candidate sounded confident — which silently
  blocked depth-lift opportunities and rewarded SE-style fluency.

## 6. Bugs / structural defects

1. **AWS checklist has no "operator vs demoed" gate per tick.**
   Cloud breadth is exactly the SE-vs-dev failure mode. A recruiter
   ticks what the candidate names, with no per-tick scope context.
   Fix K's `defaultScope` only fires on AI/ML libs. AWS/Azure/GCP
   would benefit from a `defaultScope: "operator"` *requirement* —
   or better, a per-tick "in prod / demoed only" toggle.
   Evidence: `src/data/technologies.json:1935-2000` (no defaultScope);
   `src/lib/scoring.ts:115-119` (defaultScope only fires when set).
   **Severity: High.**
2. **No candidate-context block on report (Fix M unshipped).** Eitan's
   PDF is indistinguishable from a 2-yr junior backend dev's PDF.
   The hiring manager needs "transferred from SE, 8 yr industry" to
   read the verdicts correctly. **Severity: High.**
3. **React enterprise note fires on demo-fixture knowledge.** Tier
   17 (Yellow) carries `enterpriseStillUsed: true` at root; scoring
   reads it whenever color is yellow regardless of depth (`scoring.ts:194-196`).
   The Fix-5 depth gate only applies to the *unknown-version* path,
   not the typed-version path. Evidence: same lines.
   **Severity: Medium.**
4. **No way to capture "Eitan is a Solutions Engineer turned dev" as
   a tag.** The mandate field is free text, not the candidate's
   profile. **Severity: Medium** (subset of #2).
5. **"Not in stack" UX requires recruiter to find each removed
   template tech and click it.** Bulk-remove or "uncheck template
   defaults at start" would save 3-5 clicks per session.
   **Severity: Low.**

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Version-mode tech with depth: ~12-15s
  (search 3s, click 1s, type version 3s, depth dropdown 5s, click
  away 1s). Checklist tech (AWS): **~30-40s** for 10 ticks. GHA
  checklist: ~15-20s for 4 ticks. Removing template default: ~5s.
  **Total for 9 logged techs ≈ 3.5 min** of a 7-min call. Tight but
  feasible. Scope dropdown ignored entirely (recruiter never opened).
- **Phone-shrink test.** Two things break:
  (a) **AWS checklist of 14 services** — recruiter cannot keep up
  with a fluent SE-style recital while ticking. She'll mis-tick or
  skip services Eitan named, producing either over- or under-coverage.
  (b) **Removing pre-loaded template techs** (nodejs here) is dead
  weight — every recruiter starts a Backend call with `nodejs` they
  didn't ask about, and "Not in stack" still requires them to find
  the card.
- **Friction that vanishes on phone.** Reading the per-tick
  `suggestedProbes` ("not just tutorials"). Opening scope dropdown
  to think. Reading the depth-picker labels carefully. Hovering
  guidance. All gone. The recruiter ticks what she hears.
- **Risk / safe rating.** **At-risk.** Survives a phone call but
  produces a misleading Green on AWS for SE-shape candidates, and
  produces a profile-blind PDF that hiring managers cannot read
  correctly. Two fixes (M + per-checklist scope default) would move
  it to Safe.

## 7. Catalog gaps

- **No field for non-traditional path.** Cast brief explicitly
  flagged this. The whole reason Eitan is recruitable is invisible.
- **Solutions Engineering as a category / tag is missing.** SE→dev
  is a real recruiting category (also sales-engineering, customer-
  engineering). TechVet has no way to record the *adjacent
  industry years*.
- **Django REST Framework / Django Ninja** not in catalog as
  separate entries — Django's `suggestedProbes` mention them but a
  candidate naming "DRF" can't be ticked anywhere.
- **AWS Step Functions / EventBridge / Fargate / DynamoDB** *are*
  all in the AWS checklist (good), but there's no way to mark which
  are demo-touched vs production-operated. Same issue Priya hit in
  round 1.
- **No SE-style "I've integrated against this product" axis** for
  any cloud or SaaS tool. Different shape from "I built it" or
  "I operate it".

## 8. One-liner for cross-cut

> **Eitan — Backend Engineer — AWS 10/14 Green misreads SE-breadth as backend-engineer-breadth; report cannot communicate the 8-yr-industry / 2-yr-coding hybrid that makes him hireable.**

## 9. Recommendation

**Ship Fix M (candidate-context block) and add `defaultScope:
"operator"` to the three cloud-provider entries (AWS/Azure/GCP).**
Fix M alone closes the "PDF reads as junior" problem for every
non-traditional path persona (Eitan, plus Devon/Min/Riya in this
round). The cloud-provider scope default is a one-line catalog
change that forces the AWS Green into a Yellow cap — preventing
the SE-rattle failure mode without requiring per-tick UX. Together
they close two of this round's most frequent cross-cut categories
in maybe 1.5 days of work.

## Disagreement with prior fixes

Fix K's choice to ship `defaultScope` on AI/ML libs only — and not
on the cloud-provider checklists — leaves the biggest scope-cap
opportunity on the table. The justification ("Vikram natural-Green")
is real but narrow. Cloud-provider checklists are where SE-shape
candidates score high without operating; they need the cap more
than `pandas` does. I'd prefer the integrity guard be expanded to
require `defaultScope` on every Cloud-category checklist.
