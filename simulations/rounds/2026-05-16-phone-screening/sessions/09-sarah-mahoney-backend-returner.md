# Session 09 — Sarah Mahoney (Senior returner, Backend Engineer)

**Agent:** sim-09
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Sarah is 38, was a senior backend engineer at a UK insurer until early 2022, then stepped out for three years for family. She finished a 6-week refresher bootcamp last month — mostly JS/Node refresher and a Spring Boot crash module. She speaks carefully and clearly *hedges* ("I'd want a refresh", "we were on..."). Her instincts are sharp — she'll talk about idempotency, connection pooling, and message redrive without prompting — but every concrete version number she names is 2021 vintage. She knows it and is anxious about it.

## 2. Phone call — abbreviated

> R: "Sarah, walk me through what you've been working with on the backend side?"
> S: "So my main stack was Java with Spring Boot. I think we were on Spring Boot 2.5? I heard there's a Spring 6 now and I'd want to refresh."
> [R: removes nodejs/python/redis/docker/kubernetes from preload; searches "Spring", adds Spring Boot, types "2.5", depth=working, scope blank, lastUsed = "2022"]
> S: "Postgres for the main store — we ran 13, I'd assume newer now."
> [R: clicks Postgres, types "13", depth=working, lastUsed="2022"]
> S: "Lots of AWS. Lambda for event handlers, RDS for the DB obviously, SQS for the queue between services. Some S3 for documents."
> [R: clicks AWS, ticks lambda / rds / sqs-sns / s3. Pauses — should she tick more? Doesn't know what to probe.]
> S: "Jenkins for CI — declarative pipelines, we had shared libraries for the deploy steps."
> [R: searches Jenkins, ticks declarative-pipelines + shared-libraries. 2/14.]
> S: "Docker we used in CI but I'd want to refresh — I never operated the cluster."
> [R: clicks Docker, hits "Don't remember", depth=shallow, lastUsed="2022"]
> S: "Bootcamp also touched Node and Postgres 16, but I wouldn't put that on a CV yet."
> [R: re-adds nodejs, depth=shallow, lastUsed="this month"; bumps Postgres lastUsed to "this month, bootcamp only"]
> [Phone hung up around 8 min. Recruiter clicks Summary.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Spring Boot | 2.5 | working | — | **Review / Probe** (matches min=2.7? No — 2.5 < 2.7, so falls to Red `Concern`. ⚠) |
| PostgreSQL | 13 | working | — | **Good** (Green — 13 ≥ 12 but ≥ 14? 13<14, so Yellow "PG 12 is out of community support" — wait, 13 ≥ 12 → Yellow band actually). **Yellow / Review** |
| AWS (checklist) | 4/14 = 29% | working | — | **Review / Probe — 4/14** (25-66% Yellow band) |
| Jenkins (checklist) | 2/14 = 14% | working | — | **Concern — 2/14** (Red) |
| Docker | unknown | shallow | — | **Review / Probe** — enterprise note **suppressed** (the 2026-05-15 fix: shallow + unknown version → no flatter note) |
| Node.js | (blank) shallow | shallow | — | **Review / Probe** (unknown-version yellow) |

Re-checking Spring Boot: tiers sorted high→low are 3.4, 3.0, 2.7, 0. `compareVersions("2.5", "2.7")` → [2,5] vs [2,7] → -1, so doesn't match 2.7. Doesn't match 3.0. Matches min=0 → **Red / Concern**. The `enterpriseStillUsed: true` root flag doesn't fire because she landed on Red, not Yellow.

Re-checking Postgres: 13 ≥ 12 (Yellow) but 13 < 14 (Good). So she lands on **Yellow** "PG 12 is out of community support" — which is misleading; her PG 13 was perfectly mainstream in 2022.

Summary headline: radar shows Backend / Database / Cloud / DevOps / Language axes. Buckets: **1 Green**(none, actually), **3 Yellow** (Postgres, AWS, Docker, Node), **2 Red** (Spring Boot, Jenkins). PDF lands her as a *weak* candidate.

## 4. Accuracy judgement

**Where it's right:** AWS Yellow at 4/14 is fair — she has shallow service coverage for a "senior backend" claim. Jenkins Red at 2/14 is also defensible; she used Jenkins as a *consumer* of pipelines someone else wrote.

**Where it over-rates:** Nothing. The tool under-rates everywhere.

**Where it under-rates — badly:**
- **Spring Boot 2.5 → Red Concern.** This is the single most misleading verdict. Spring Boot 2.5 was *current* when she left in early 2022. She knows Spring deeply; what she doesn't know is the 2→3 migration (Jakarta namespace, Java 17 baseline, native image). The tool reads "she's bad at Spring." She's not — she's three years stale. Without recency-aware scoring (priority #5), a stale version drags an otherwise strong fundamental down to Concern. This is the exact failure mode Sarah was designed to expose.
- **Postgres 13 → Yellow "out of community support".** PG 13 was actively supported until Nov 2025; in 2022 it was a mainstream pick. The Yellow note reads as *her fault* for picking an old version when really she just hasn't logged in since.
- **AWS 4/14 Yellow.** Coverage % is honest, but the report won't differentiate "ticked 4 services, last logged in 2021" from "ticked 4 services, ships daily". For a hiring manager, those are completely different people.

**Where it's silent on something a hiring manager needs to know:**
- **No "stale stack, strong fundamentals" signal.** A hiring manager looking at this PDF sees 2 Red + 3 Yellow and passes. They never learn that Sarah's *principles* (idempotency, redrive, connection pooling, IAM least-privilege) came up unprompted in 8 minutes — those don't fit anywhere in the tool.
- **`lastUsed` is captured but invisible.** The recruiter typed "2022" four times. None of that surfaces on the report. The hiring manager has no way to tell this is a returner.
- **No "career break / returner" context anywhere.** `meta.mandate` is free-text, but there's no structured field for "candidate is re-entering after gap". This is a real recruiting category.

## 5. Friction during the call

- **Backend template was actively unhelpful.** Preloaded 6 techs (Node, Python, Postgres, Redis, Docker, K8s) — only Postgres matched her stack. Recruiter had to delete 5 cards while Sarah was already talking about Spring. A "Backend (JVM)" variant would have changed the whole feel.
- **Scope dropdown was new and confusing.** For Spring Boot the recruiter left it blank because Sarah was clearly an *author* but the dropdown options ("operator", "author", "reviewer", "architect") feel like senior-architect language. Sarah is a returner, not a reviewer. The control assumes the recruiter understands an axis Sarah herself wouldn't articulate.
- **No clear answer for "she's done it, but three years ago."** Tri-state is `knows-version / don't-remember / not-in-stack`. Sarah's actual state is *"used to know cold, three years out of touch"* — closest is "Don't remember" but that loses the depth signal. So the recruiter typed "2.5" with the caveat in Notes. The free-text caveat doesn't reach the PDF in any structured way.
- **The Jenkins checklist took 30 seconds the recruiter didn't have.** 14 items, recruiter had to read each one out loud to confirm. On phone, this is the wrong UI — should be a short "pipelines / shared libs / agents / plugins" coarse-bucket first, then probe.

## 6. Bugs / structural defects

1. **`lastUsed` is captured but doesn't reach scoring or the PDF.** Sarah is *the* canonical case for this. Tool has the field, recruiter populated it four times, output ignores it. Recommended as priority #5 in RESUME.md and confirmed here as urgent. **Severity: High.**
2. **Spring Boot Red tier swallows "stale but solid" senior signal.** Even with `enterpriseStillUsed: true` at root level, the flag only injects the reassurance note on Yellow tiers (`scoring.ts:173`). A Spring Boot 2.5 candidate hits Red and the flag is silently dropped. Conceptually, Spring Boot 2.x deserves Yellow + enterprise note, not Red — 2.x is still everywhere in 2026 banking/insurance. Compare with Java tier table (2.7 min for Yellow) vs Spring Boot's (2.7 min for Yellow): a 2.5 version that was *current* 3 years ago shouldn't bucket as "Concern". **Severity: Medium.** The Spring Boot 2.7 cutoff in `technologies.json:476` is too aggressive for the enterprise reality.
3. **Backend role template is JS-shop biased.** `roles.ts:25` — `nodejs, python, postgresql, redis, docker, kubernetes`. No Java, no Spring, no Jenkins. Hiroshi (session 7) flagged the same thing for JVM staff engineers; Sarah hits it as a *returner*. A "Backend (JVM)" template or making the template a stack-family chooser would help. **Severity: Medium.**
4. **Scope dropdown defaults to blank and recruiter doesn't know when to populate it.** It was shipped today (2026-05-16) and there's no inline hint that says "leave blank unless candidate is clearly senior reviewer/architect". On a phone screen, an unfamiliar dropdown is friction. **Severity: Low** — but worth a one-line tooltip.
5. **"Don't remember" + working depth still hits enterprise note suppression rules correctly, but the converse case — "remembers a stale version + working depth" — has no equivalent softener.** Spring Boot 2.5 with working depth lands Red with no reassurance text. There's a missing "stale-but-current-for-its-time" category. **Severity: Medium.**

## 7. Catalog gaps

- **Spring Framework (non-Boot)** isn't separately catalogued. Sarah said "Spring Boot" but enterprise Java often has Spring (DI, MVC) without Boot.
- **Hibernate / JPA / Spring Data** — Sarah used them daily and they're invisible.
- **JUnit** is in Testing (good), but nothing about **Mockito**, **Testcontainers**, **AssertJ** — the JVM testing stack is a single checkbox.
- **Maven / Gradle** — not in catalog. For a JVM backend candidate, build tool is meaningful signal.
- **Microservices patterns** (saga, circuit breaker, Resilience4j) — methodology gap (D4 in RESUME.md).
- **CI/CD as concept vs Jenkins as product** — Sarah's *real* skill is "I can write a CI pipeline" not "I know Jenkins shared libraries". The checklist mode mistakes tool-feature coverage for capability.

## 8. One-liner for cross-cut

> **Sarah Mahoney — Backend Engineer — 3-year career returner with strong fundamentals lands 2 Red / 3 Yellow because Spring Boot 2.5 was current-when-she-left but reads as "Concern" today; tool has no way to express "stale stack, solid principles" and `lastUsed` is purely cosmetic.**

## 9. Recommendation

**Ship priority #5 (`lastUsed` in scoring) — but with an asymmetric design.** Don't *penalize* stale tech (RESUME.md's current plan); instead, **soften** verdicts when staleness explains the gap. Sarah's Spring Boot 2.5 + `lastUsed: "2022"` should resolve to *Yellow "Stale — was current 3 years ago; expect ramp-up on 2→3 migration"*, not Red. Penalising stale Greens (Sam-Ansible) and softening stale Reds (Sarah-Spring) is the same axis with opposite signs depending on whether the version was *contemporary at last-use time*. A `versionTier.firstAvailable` date field would let the tool compute "was this version current when last used?" — that single signal flips Sarah from "Concern" to "Returner: ramp-up expected" and gives the hiring manager something actually useful.

## Disagreement with prior fixes

The 2026-05-16 scope axis (priority #4) is well-designed for senior reviewers/architects — but on a *phone screen with a non-technical recruiter*, it's another dropdown nobody knows how to populate. For Sarah it stayed blank on every card. The axis is right; the *UX assumption* (recruiter can classify scope mid-call) is wrong. Consider hiding the scope dropdown behind a "Senior signal" disclosure or making it post-call enrichment rather than mid-call entry.

## Edge case for the cross-cut

What's the right verdict for a candidate whose last version was contemporary-at-the-time but is now 4 versions behind? Today the tool can't distinguish her from someone who chose to stay on Spring Boot 2.5 in 2026. Both score Red. They're completely different signals.
