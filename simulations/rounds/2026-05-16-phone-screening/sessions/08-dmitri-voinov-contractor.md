# Session 08 — Dmitri Voinov (Senior contractor, 12 yr, between gigs)

**Agent:** sim-08 (phone-screening round)
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Custom

## 1. Persona inhabited

Dmitri is the rare-but-recognisable "I've touched everything" contractor who's spent 12 years on 6-12 month gigs — Berlin fintech, Tallinn gov, Dublin SaaS, a stint on a 2018 Ethereum L2 he won't shut up about. He speaks in lists. He never says "I don't know" — he says "yeah, used it." His "Rails 7" was a 2023 maintenance contract he hasn't logged into since; his "Kubernetes" is Helm-deploying charts he didn't write; his "Kafka" was reading from a topic someone else owned. Confidently quotes versions he hasn't touched in two years. Speaks 1.4x; the recruiter has time for one syllable per tech.

## 2. Phone call — abbreviated

> R: "Dmitri, you've been around — let's just rip through your stack. Last 5 years."
> D: "Sure. Ruby, Rails 7, Django 4, FastAPI, React 18, Vue 3, Postgres 16, MySQL 8, Mongo 6, Redis 7, Kubernetes 1.30, Docker — latest — AWS, GCP, Terraform 1.6, Ansible, Kafka 3.5, GraphQL, gRPC, also Solidity, Erlang once —"
> [R, frantically typing, pivots to Custom template. Searches "Ruby". Nothing. Skips. Adds Rails 7.]
> R: "Rails — how recent?"
> D: "Current."
> [R types Rails "7", depth=working. lastUsed = "current" (free text). Doesn't touch scope.]
> D: "Django was a side gig, 2023, version 4 LTS. FastAPI on a recent thing."
> [R adds Django "4", working; FastAPI no version, working.]
> R: "React, Vue?"
> D: "React 18, Vue 3, both prod."
> [R adds both at "18" and "3", depth=working. No scope, no lastUsed.]
> R: "Databases?"
> D: "Postgres 16, Mongo 6, Redis 7, Mysql 8 on the gov gig."
> [R: four cards, fast typing. depth=working on all. Doesn't even read the badges; they're flashing Green so she stops watching.]
> R: "K8s, Docker, Terraform?"
> D: "K8s 1.30 — operators, the works. Docker daily. Terraform 1.6."
> [R adds all three, depth=deep on K8s ("operators, the works" → she infers deep), working on others.]
> R: "AWS, GCP?"
> D: "EC2, S3, Lambda, RDS, IAM. GCP — BigQuery, Cloud Run."
> [AWS checklist: ticks 5/15. GCP: ticks 2/12. depth=working.]
> R: "Anything I should flag for the technical interviewer?"
> D: "Kafka 3.5 producer-consumer, GraphQL Apollo, gRPC in Go. And I did Solidity in 2018 — that's a thing now again, right?"
> [R adds Kafka, GraphQL, gRPC. Searches "Solidity" — nothing. Skips. Time up. Generate Report.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Rails | 7 | working | — | **Green "Excellent"** (≥7.2? No — 7 < 7.2. Lands in `min 6.1` band → Green "Good") |
| Django | 4 | working | — | Green "Good" (min 4.2 — but 4 padded `[4,0]` < `[4,2]` → falls to min 3.2 → **Yellow "Review / Probe"** + enterprise note) |
| FastAPI | (empty) | working | — | Yellow "Review / Probe" + enterprise note ("Still widely used in many enterprise applications") |
| React | 18 | working | — | Green "Good" |
| Vue | 3 | working | — | Green "Good" |
| PostgreSQL | 16 | working | — | Green "Good" (min 14) |
| MySQL | 8 | working | — | Green "Excellent" |
| MongoDB | 6 | working | — | Green "Good" |
| Redis | 7 | working | — | Green "Excellent" |
| Kubernetes | 1.30 | deep | — | Green "Excellent" (lift not even needed; 1.30 > 1.28) |
| Docker | (empty / "latest" — not a version) | working | — | Yellow "Review / Probe" + enterprise note |
| Terraform | 1.6 | working | — | Green "Good" (≥1.0, <1.10) |
| AWS | 5/15 = 33% | working | — | Yellow "Review / Probe — 5/15 services" |
| GCP | 2/12 = 17% | working | — | **Red "Concern — 2/12 services"** |
| Kafka | 3.5 | working | — | Green "Good" |
| GraphQL | (versionless catalog) | working | — | Green "Good" |
| gRPC | (versionless catalog) | working | — | Green "Good" |

**Headline:** ~13 Green / 3 Yellow / 1 Red. Three things Dmitri said out loud (Ruby, Solidity, Erlang) never reach the report. The PDF the hiring manager opens reads: *"strong polyglot senior, broad cloud + backend + frontend, one weak spot on GCP."* That is not what Dmitri is.

## 4. Accuracy judgement

- **Where it's right:** The GCP Red is correct — 2/12 services is genuinely shallow exposure, and the threshold caught it. K8s at deep is fair (he did sound credible there). The Django 4 padding-quirk Yellow is, by accident, *more* accurate than the literal answer would be — he hasn't touched Django since 2023.
- **Where it over-rates:** Rails "7" gets Green "Good" with zero recency signal that this is 2023 work he can't open today. React 18, Vue 3, Postgres 16, MySQL 8, Mongo 6, Redis 7, Terraform 1.6, Kafka 3.5 — eight Greens, all from confident bare-major version-quotes with no probe of *which year*. The fundamental problem isn't scoring; it's that a working depth + a plausible version = Green and the tool **has no mechanism to ask "when".** `lastUsed` is captured but doesn't enter scoring (RESUME priority #5, not shipped). For a contractor profile this is the entire ballgame: Dmitri's value is which of these he can ramp on in a week, not the union of everything he's ever touched.
- **Where it under-rates:** FastAPI and Docker land Yellow on missing-version, both with the enterprise-still-used note attached because depth=working. Docker doesn't *have* meaningful versions in practice (the catalog literally says so: `"Versionless in practice — probe usage."`); penalising Dmitri for not quoting one is friction-generated wrong-signal. Same for FastAPI (most devs have never looked at a FastAPI version — it's 0.x and rolling).
- **Where it's silent on something a hiring manager would need to know:** *Half his claimed stack.* Ruby-the-language, Solidity, Erlang — three different "actually maybe interesting" data points the recruiter heard and the tool ate. The recruiter has no way to log "candidate named X, X not in catalog, candidate sounded confident/shaky" — the tech vanishes. For a contractor whose whole pitch is breadth, the catalog gaps are the story.

## 5. Friction during the call

- **Custom template = blank canvas** is the right pick for a list-talker, but it means the recruiter is searching, clicking, typing for every single tech while Dmitri keeps talking. She fell two techs behind by Postgres and was logging from memory.
- **Scope dropdown was never opened.** It's brand-new (shipped today). On a phone screen where she's already triaging, a fourth control per card is a control too many. She picked the depth that "felt right" and moved on. Today's shipping work was invisible to this session.
- **lastUsed field is free-text and not in scoring**, so even when she did type "current" for Rails she got no signal back and stopped bothering.
- **Three named-but-missing techs vanished.** The search-returns-nothing experience offers no "add anyway" path — the tech doesn't even appear as a flag on the report.
- **Mid-typing badge flashes.** Postgres "1" briefly rendered Red (mins 12/14/17 unmet) before she finished typing "16". She visibly hesitated. Minor, but real.

## 6. Bugs / structural defects

1. **Docker + FastAPI Yellow-with-enterprise-note on bare-major absence is misleading.** Both catalog entries are de-facto versionless in practice; the catalog even *says* so for Docker. But because `depth=working` clears the suppression rule in `scoring.ts:131-132`, the "Still widely used in many enterprise applications" reassurance fires on what's actually a *no-data* state. Hiring manager reads "Yellow + enterprise legacy" → infers "they're on old Docker because their company won't upgrade" → wrong inference. Should be: when `tech.currentVersion` contains "Current" / "rolling" / "versionless" / etc., either auto-resolve to the tier-0 band or render a different unknown-version note. **Severity: Medium.**
2. **Django `"4"` → Yellow tier band via padding quirk.** `parseVersion("4")` → `[4,0]`; tier min `"4.2"` → `[4,2]`; `compareVersions` returns negative, so the candidate falls through to the `3.2` Yellow tier. Same shape that CLAUDE.md warns about for Vue 3.x. Django's `4.2` LTS minimum is *intentionally* major.minor, but on a phone screen no one says "Django 4.2" — they say "Django 4". The tool punishes precision-deficit on a major version that's deliberately tier-fragmented. **Severity: Medium.** (Compare to React, where `16.0` minimum was *lowered* exactly to avoid this; Django and Vue still have it.)
3. **No "candidate named a tech not in the catalog" capture.** Ruby/Solidity/Erlang vanish silently. For a recruiter doing phone screens this is the most common failure mode — a niche thing comes up, search returns nothing, the recruiter moves on, and the report never reflects the candidate said it. A "name only — not assessable" gray chip on Summary would close this. **Severity: High** (it's the single biggest gap between what the call captured and what the report shows).
4. **Custom-template + Mongo 6 + working = Green "Good" with zero coverage of replica-set / aggregation pipeline / sharding skill differentiation.** Version-mode for NoSQL is wrong shape for senior screening. Mongo and Redis especially are *all* about depth-of-usage; the version is irrelevant. This isn't a code bug, it's a catalog-shape decision — but for a contractor screen it's the wrong decision. **Severity: Medium.**
5. **Kafka "3.5" → Green Good while candidate explicitly said "producer-consumer" (i.e. shallow consumer-app use).** Recruiter heard a signal that should have been depth=shallow at most. She picked working. The depth dropdown is too easy to over-pick because there's no anchored description of what "working" means in this category. **Severity: Low (recruiter calibration), but tool can help: per-tech depth tooltips.**
6. **lastUsed is captured but ignored.** Known (priority #5); calling it out anyway because for a contractor *it is the entire signal*. The free-text field accepting "current" with no parse-back means even the data the recruiter *did* enter is invisible. **Severity: High** for this persona specifically.

## 7. Catalog gaps

- **Ruby (the language).** The catalog has Rails and `csharp/php/python/java/javascript/go/rust/cpp/c` but no Ruby. Anyone who's done Rails in the last decade considers it a separate skill. Add `ruby` as a Language entry.
- **Solidity / blockchain.** CLAUDE.md says this is deliberately out of scope. Fine — but the *recruiter* doesn't know that, and a "named but out-of-scope" capture (per bug 3) would close the loop without requiring catalog expansion.
- **Erlang / Elixir.** Niche but real — phoenix/elixir shops exist. Probably defer, but again: capture-the-name should suffice.
- **MariaDB.** Bundled into MySQL in practice; worth a note in the MySQL entry that it's covered.
- **OpenTofu under Terraform** — already merged; good.
- **"Apollo / Hasura / Relay"** are in GraphQL probes but if the recruiter searches them they get nothing.

## 8. One-liner for cross-cut

> **Dmitri — Custom — 13/3/1 Green-sweep PDF reads "polyglot senior" for a list-talker the tool can't tell from a recency-stale contractor; three named techs (Ruby/Solidity/Erlang) vanish because no "named-not-in-catalog" capture exists.**

## 9. Recommendation

**Single highest-leverage change: ship `lastUsed` in scoring (priority #5).** Yes, this is on the list — but Dmitri is the canonical case for it. Without it, the contractor profile is structurally undifferentiable from the staff-engineer-still-running-it profile. A secondary, almost-as-valuable fix: when search returns zero results during Custom-template assessment, surface a "Add as named-only (not assessable)" button that lands the tech in a gray "Candidate mentioned — out of catalog" section on the PDF. Recruiter heard it; report should show it. Together these two changes turn this session's PDF from misleading to useful with maybe a day of work each.

## Disagreement with prior fixes

The scope-of-use axis shipped today is sound design but **invisible on a 5-minute phone screen** — it's a fourth control that recruiters won't reach for under time pressure. Today's work doesn't help Dmitri's screen because operator/author/reviewer/architect is a distinction recruiters can't make from a candidate's first-pass description. Consider whether scope wants an *inferred default* when depth=working (probably operator) so it isn't an extra click for the common case. This isn't a disagreement that scope was wrong to ship — it's a flag that on this channel (phone, time-pressured) the surface complexity now exceeds what the recruiter can absorb.
