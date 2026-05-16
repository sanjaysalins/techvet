# Session 06 — Margarethe Schiff (Senior, Backend Engineer / Returner)

**Agent:** sim-06 (cumulative validation, round 5)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-5-cumulative-validation
**Channel:** Phone (5-10 min)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Margarethe is a 41-year-old senior backend engineer in Hamburg. She did 9 years at a logistics SaaS — Java/Spring monolith broken into Spring Boot 2.x services in 2019, Postgres 13 fleet, Jenkins shared library she co-owned, AWS for Lambda webhooks + RDS + SQS. She left in mid-2022 for parental leave that became a 4-year break. She speaks slowly and apologetically about versions ("we *were* on 2.5… is that bad?") but precisely about architecture (she ran the Boot 1.x → 2.x migration). Last month she finished a 10-week refresher bootcamp that did Node + PG 16 on Render. She is sharper than her version numbers suggest and she knows it; the recruiter's job is not to vet for 2026 fluency but to flag her as a "ramp-up hire, not a junior".

## 2. Phone call — abbreviated

> R: "Hi Margarethe — quick 8 minutes to log your stack, then I'll send a summary to the hiring manager."
> [Picks template: **Backend Engineer**. Sets Channel=Phone (default). Sets Seniority=**Senior**, Years=**9**, Path=**Returner (career break)**, Additional context="**4 yr break, refresher bootcamp last month**". Mandate field: "Backend, Java/Spring shop, returner OK."]
> M: "Mostly Java — Spring Boot, we were on 2.5. Postgres 13. Jenkins. AWS for Lambdas and the database and queues."
> [Searches "Spring Boot" → adds. Types "2.5". Depth=deep. lastUsed="**2022**". → Card flashes red then yellow with sky-blue note.]
> [Searches "Java" → adds. M says "Java 11, mostly, some 8 lingering". Types "11". Depth=deep. lastUsed="2022".]
> [Postgres preloaded. Types "13". Depth=deep. lastUsed="2022". → Yellow, "PG 12 is out of community support" + still-widely-used note.]
> [Searches "Jenkins" → adds. Says "I owned a shared library". Recruiter ticks: declarative-pipelines, scripted-pipelines, shared-libraries, blue-ocean, multibranch. Depth=deep. lastUsed="2022". → 5/N coverage.]
> [Searches "AWS" → adds. Card shows 26 services — no template filter for Backend. M says "Lambda, RDS, SQS". Recruiter ticks: lambda, rds, sqs-sns. Scope default = operator. lastUsed="2022". → 3/26 = 11% Red.]
> M: "Oh — and the bootcamp had us doing Node and Postgres 16 on Render."
> [Node preloaded. Types "22" (recruiter guesses LTS; doesn't ask). Depth=working. lastUsed="**current**". → Green Good.]
> [Postgres is *already added at 13*. Recruiter pauses — does she change 13 to 16? Says "actually both?" out loud. Leaves it at 13 and adds a note "+ PG 16 in bootcamp" in the freeform notes. **Loses the PG-16-Green signal entirely.**]
> [Docker / Python / Redis / Kubernetes (template-preloaded) untouched → notDiscussed.]
> R: "Anything else?" M: "No, that's the picture."
> [Summary.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | lastUsed | Verdict (predicted) |
|------|--------------------|-------|-------|----------|---------------------|
| Spring Boot | 2.5 | deep | — | 2022 (stale, ~4 yr) | **Yellow "Review / Probe (softened from Concern — stale but defensible)"** + sky-blue softener note "Stale (2-4 yr) but was contemporary at last-use — returner shape; expect ramp-up". Enterprise note **suppressed** (recencyAdjusted=true). |
| Java | 11 | deep | — | 2022 | Yellow tier match (min:11). Stale Yellow → applyRecency no-op. Enterprise note fires ("Still widely used"). **No softener** — Yellow stays Yellow. |
| PostgreSQL | 13 | deep | — | 2022 | Yellow tier ("PG 12 is out of community support"). Stale Yellow → no recency adjustment. Enterprise note fires. **No softener** despite being the *most* Sarah-shape entry. |
| Jenkins | 5/N checklist | deep | — | 2022 | Coverage = ~5/14 ≈ 36% → Yellow. Checklist mode → Fix E does not apply. lastUsed is collected but ignored. |
| AWS | 3/26 checklist | — | operator (default) | 2022 | 11% coverage → **Red "Concern"**. Checklist mode → no recency softener. Backend template has no `serviceTagFilters` for AWS, so denominator is the full 26 — including 6 architect / 5 security / 2 cicd / 2 data-ml services Margarethe never had reason to touch. |
| Node.js | 22 | working | — | current | **Green "Good"**. |
| Postgres 16 (bootcamp) | — | — | — | — | **Lost.** Captured as freeform text in PG card's notes; doesn't render anywhere on Summary. |
| Docker / Python / Redis / K8s | untouched | — | — | — | notDiscussed → excluded from buckets/radar. |

Summary header line (Fix M): "**Senior · 9 yr in industry · Returner (career break) · 4 yr break, refresher bootcamp last month**". Channel chip: "Phone".

Headline buckets: **1 Green** (Node) / **4 Yellow** (Spring Boot, Java, PG, Jenkins) / **1 Red** (AWS) / 4 not-discussed.

## 4. Accuracy judgement

- **Where it's right.** Spring Boot 2.5 verdict is exactly the Sarah-shape Fix E was designed for, and the badge text + sky note + Fix M header line *do* tell the same story without doubling up. The candidate-context line says "returner, 4 yr break"; the Spring Boot softener says "expect ramp-up rather than concern". Those are complementary framings (one is candidate-level, one is tech-level), not redundant. The Node Green is correct.

- **Where it over-rates.** Node-22-Green is a *fabricated* version — the recruiter typed "22" because they assumed LTS; Margarethe never said a Node version. The bootcamp Node has 8 weeks of toy projects behind it and is shown alongside her 9 years of Java with the same Green-vs-Yellow color contrast. To a hiring manager scanning the PDF, the bootcamp Node looks *stronger* than the legacy Java. This is the inverse of Vikram. **Fix E only softens the legacy; it doesn't suppress the recruiter-invented freshness.**

- **Where it under-rates.** Postgres 13 + lastUsed=2022 is the canonical Sarah-shape case and it gets *no* softener at all because PG 13 hits the Yellow tier — Fix E only fires on Red. The Yellow stays Yellow with the standard "PG 12 EOL" note + the enterprise note, indistinguishable from "candidate is currently on PG 13 in prod and refusing to upgrade". The softener is asymmetric *by direction* (Red→Yellow only) but the spec said "stale Red softener for enterpriseStillUsed". **Stale Yellow on an enterpriseStillUsed tech is a real returner case that falls through the cracks.** Same applies to Java 11 + stale: reads as "still on 11 in 2026" rather than "was on 11 in 2022 and the floor moved under her".

- **Where AWS under-rates.** 3/26 = Red is *technically* honest coverage but unkind to a Backend returner. The Backend template doesn't filter AWS services, so her Lambda+RDS+SQS coverage is divided by Landing Zone, Macie, SageMaker, Bedrock, CodePipeline — services she had no reason to touch even in 2022. A Backend-shaped filter (`['general']` would drop 10 services) would put her at 3/16 = 19% — still Red, but a less unfair denominator. The bigger problem: AWS doesn't get Fix E at *all* because it's checklist-mode. Her "Lambda+RDS+SQS in 2022" is a Sarah-shape entry the softener can't reach.

- **Where it's silent on something a hiring manager would need to know.** The Summary doesn't visually couple the candidate-context line with the per-tech softeners. The Fix M line is rendered once in the header; the Fix E softener is per-card. A skim-reader sees "1 Green / 4 Yellow / 1 Red" and parses that as a weak senior. They have to *read* the Spring Boot card body to find the returner framing. The radar will look genuinely bad because radar averages colors; the returner story is invisible to the radar.

## 5. Friction during the call

- **The "did she change PG version or add a new card?" pause.** Postgres is preloaded. She named PG 13 (legacy) AND PG 16 (bootcamp). There is no way to log "two versions of the same tech at different times" without either overwriting or losing one. Recruiter punted to freeform notes and lost the Green. This is the *exact* returner-shape the round was built around and the tool can't represent it.
- **Typing "2022" four times.** Spring Boot, Java, PG, Jenkins all got the same `lastUsed=2022`. There's no "apply to all from this employer" shortcut. On a phone screen, that's 4 × ~3s = 12s of typing the same string.
- **Recruiter guessed Node "22".** Margarethe never said it. The recruiter typed it because the field looks like it wants a number. This is Bug B from round 2 still happening in practice — the version field is *technically* optional but visually pressurizes the recruiter to fill it.
- **AWS checklist scroll.** 26 services on a Backend template with no filter. Recruiter scanned through architect/security/data-ML services that obviously don't apply to her, paused on each. ~25s spent on a checklist where 3 services would have been ticked in 5s with a filter.

## 6. Bugs / structural defects

1. **Fix E asymmetric softener has a Yellow-tier hole.** Stale Yellow on `enterpriseStillUsed` techs gets no softener (Postgres 13, Java 11 in Margarethe's case). The Sarah design wrinkle was "version was contemporary at last-use, soften the verdict" — that's also true for PG-13-in-2022 and Java-11-in-2022, but those hit Yellow not Red, and the softener only catches Reds. Two of the four legacy techs in a Senior-returner profile silently lose the softener. **Severity: High** (this round's primary test) — `src/lib/scoring.ts:134-159`.

2. **Fix E doesn't apply to checklist-mode techs.** AWS Lambda+RDS+SQS in 2022 is structurally the same returner-shape as Spring Boot 2.5 in 2022 — she was a competent operator of a defensible-at-the-time subset and has been away. But because cloud providers are checklist-mode, applyRecency never runs and she scores Red. The comment in scoring.ts:96 explicitly acknowledges "checklist… no version to anchor recency to", but checklist *coverage* + lastUsed is anchorable: stale Red with non-zero coverage + enterpriseStillUsed tag could soften. **Severity: High** (cloud is the biggest returner-gap on a backend profile) — `src/lib/scoring.ts:326-410`.

3. **No "version-at-different-times" entry shape.** Postgres 13 (job) + PG 16 (bootcamp) can't both be logged. Recruiter must overwrite or use freeform. The Returner archetype has this *constantly* (legacy stack + refresher freshness on the same tech). **Severity: Medium** — needs design.

4. **Bootcamp Node Green is indistinguishable from production Node Green.** The recruiter typed "22" from inference; the depth=working is the recruiter's guess; the lastUsed=current is true but means "10 weeks of toy projects". The Green label and color is identical to a 5-yr Node operator. There's no "freshness without depth" signal. **Severity: Medium** — interacts with Fix M (path=returner *could* dampen Greens with very-short post-break tenure).

5. **Candidate-context line and per-card softeners aren't visually coupled.** Fix M renders the returner line in the header; Fix E renders the softener as a per-card sky note. A hiring manager skimming the headline buckets (1G/4Y/1R) gets the wrong first impression. **Severity: Medium** — Summary could surface "X cards softened by returner-recency" as a headline chip alongside Green/Yellow/Red counts.

6. **Backend template lacks `serviceTagFilters` for AWS.** Other templates (SA, SRE, DevOps, Security, AI/ML) filter AWS. Backend doesn't, so the AWS denominator is 26 for a Java backend dev who has used 4 services in her career. **Severity: Low-Medium** — `src/data/roles.ts:50-60`. One-line fix: `serviceTagFilters: { aws: ['general'] }`.

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Spring Boot card with version + depth + lastUsed = ~12s. AWS card (26 services, scroll, tick 3) = ~25s. PG card (preloaded, version + depth + lastUsed) = ~8s. The Fix M header block (seniority pill + years + path dropdown + additional-context text) added ~20s up front, paid back later because the recruiter didn't have to capture "returner" elsewhere. Per-tech average: **~12-15s**, **at the top of the phone budget**.

- **Phone-shrink test.** The thing that breaks on phone is the AWS unfiltered list. Scrolling 26 service rows while the candidate is still talking, deciding which 3 to tick, taking ~25s total — that's the whole rest of the call's slack. The Fix M block survives the phone because it's optional, but the field count (5 controls: name/role/notes/seniority/years/path/context) is borderline; a phone recruiter would skip Path and Additional context and the returner framing would be lost.

- **Friction that vanishes on phone.** The recruiter's pause to think about whether PG 13 should become PG 16 (or both); the freeform note in the PG card body; the discussion of which AWS services count as "Backend-shaped". All of these would just be dropped on a real phone call, leaving the report with bad data (PG-16 lost, AWS over-counted as Red).

- **Risk / safe rating.** **At-risk.** The Fix M block + the Spring Boot softener path is good, but: (a) PG/Java stale Yellows lose the softener; (b) AWS checklist is Red unfair-to-returner; (c) the freshness-of-bootcamp-Node gets fabricated by the recruiter typing a guessed version. Two of the three problems are scoring-rule shape, not UI; the AWS one is a one-line template fix.

## 7. Catalog gaps

- **No "version-at-different-times" pattern.** Not a missing tech; a missing entry shape. Critical for Returner / Internal-Transfer personas.
- **No Render.** Margarethe's bootcamp used Render. Not in catalog; would need named-only (Fix C). Minor.
- **Spring Framework (vs Boot) absent.** RESUME priority I lists it. She mostly described Boot, but a Java backend returner often distinguishes "Boot 2.5" from "Spring 5 underneath". Not load-bearing for this session, but flagged for the priority-I queue confirmation.

## 8. One-liner for cross-cut

> **Margarethe — Backend / Returner — Fix E softener correctly fires on Spring Boot 2.5 (Sarah-shape closed) but has a Yellow-tier hole (PG 13 + Java 11 both stale-but-defensible at last-use get no softener), and checklist-mode AWS in 2022 gets no softener at all — the returner story stays incomplete despite Fix E + Fix M composing cleanly on the one card they both reach.**

## 9. Recommendation

Broaden Fix E to also soften stale *Yellows* on `enterpriseStillUsed` techs — same softener-label shape, same sky-note, just `applyRecency` extended past the `current.color === 'red'` guard. Two-line change in `scoring.ts`. This is the highest-leverage fix because (a) the canonical-Sarah-PDF was the *whole* design driver and Sarah's Postgres + Java would hit the same Yellow-tier hole; (b) PG and Java are the two most common legacy-stack identifiers in EU/UK Java shops, so the hole is hit on most backend returners; (c) the cumulative test of "Fix M says returner + Fix E softens the techs" only works if Fix E actually softens *all* the relevant techs, not just the ones that crossed the Red threshold.

After that: give Backend template `serviceTagFilters: { aws: ['general'] }` so cloud coverage isn't divided by services no Backend dev has touched (one-line; closes the AWS-Red unfairness for any backend returner, not just Margarethe). Both fixes together would turn this session's PDF from "1G/4Y/1R" into "1G/5Y/0R", which is the truthful read of a senior returner one month out of a refresher bootcamp.

## Disagreement with prior fixes

Fix E's `current.color === 'red'` guard is too narrow. The design doc framing ("stale Red softener") read literally onto code, but the *intent* was "version was contemporary at last-use → soften the verdict from where it landed", and "where it landed" is Yellow for PG-13-in-2026 and Java-11-in-2026. The asymmetric-softener axis is right; the trigger should be `current.color !== 'green' && tech.enterpriseStillUsed && stale`, not Red-only. Stale Greens still get the existing penalty path (no change). The current shape makes Sarah's *primary* tech (Spring Boot 2.5 → Red → softened to Yellow) work and Sarah's *secondary* techs (PG 13, Java 11) silently misfire, which means the Sarah-PDF was validated against the one card the fix happened to reach.
