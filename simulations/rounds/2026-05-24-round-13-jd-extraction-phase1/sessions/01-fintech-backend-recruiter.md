# Round-13 JD-extraction Phase 1 — Session 01

**Fixture under test:** `01-senior-backend-fintech.md` — Senior Backend Engineer, trading systems, Lugano. Java 21 / Spring Boot 3 / PostgreSQL 16 / Redis 7 / Kafka 3.7 / gRPC / Envoy on EKS, with Maven, Terraform, GitHub Actions, Grafana, Prometheus. Nice-to-haves: Quarkus, Flink, FIX/FAST, OpenTelemetry, gRPC-over-Envoy streaming.
**Recruiter persona:** Maja Brunner — 11 yr fintech / trading-systems recruiter in Zurich / Lugano, ex-Avaloq talent partner, currently independent on a retained mandate for the platform lead. Knows the JVM trading stack cold; can tell a JD-keyword skim from a real screen in 30 seconds; allergic to assessment tools that pad the chip list with frontend cruft when the JD says "we don't ship frontend".
**Date:** 2026-05-24.
**Outcome (one line):** Phase 1 extraction is At-risk — it nails the core JVM/Postgres/AWS spine but silently drops Kafka and Flink (catalog name = "Apache Kafka" / "Apache Flink" never matches a JD that writes "Kafka"), miscategorises Kotlin as Mobile on a backend role, and surfaces a JUnit false-positive that the recruiter has to manually unpick before the screen starts.

---

## 1. Persona inhabited

I work in-between FINMA-regulated brokerages and the Ticino / Zug fintech belt — order-routing, post-trade, market-data shops. The mandate from the platform lead at this brokerage is unambiguous: "Java 21 / Spring Boot 3 on EKS, must read Postgres 16 like a native, must not be helpless on Kafka, gRPC nice." Lugano hybrid, 3 days on-site. I'll do roughly 18 phone screens for this seat over six weeks, and the cost of getting the assessment chip list wrong is that I either pad screens with irrelevant probes (eats time on the phone) or miss the actual must-screen (ships a Green to the platform lead that collapses on the onsite). TechVet's job, when I paste a JD, is to get me to a sensible starting set of chips with one click — not to be exhaustive, but to be **right about the spine**. I tolerate a small false-negative tail (the JD-extraction can miss a nice-to-have); I do not tolerate the JD's flagship stack tech being silently dropped.

---

## 2. The extraction at a glance

11 techs extracted, grouped by category:

- **Language:** `java`
- **Backend:** `spring-boot`, `grpc`
- **Database:** `postgresql`, `redis`
- **Data:** *(none — see F1, Kafka miss)*
- **Cloud:** `aws`
- **DevOps:** `terraform`, `github-actions`, `observability` (matched on "Prometheus" + "Grafana")
- **Mobile:** `kotlin` *(see F3, miscategorised)*
- **Testing:** `junit` *(see F2, false positive)*

The radar would render across 7 categories with one of those (Mobile) being a chip the recruiter has to remove on a backend role where the JD explicitly says "Out of scope: Frontend, mobile, ML — we don't ship any of those from this team."

---

## 3. Findings

### F1 — `kafka` and `flink` silently dropped because the catalog `name` is "Apache Kafka" / "Apache Flink". ✗ blocking

The JD writes "Kafka 3.7" in the day-to-day list and "MSK Kafka" in the AWS bullet — Kafka is one of the four pillars of this role. The catalog entry at `technologies.json:1782` has `"name": "Apache Kafka"`. The extractor's `nameSearchTerms()` splits on `/` and `()` only — *not* on spaces — so "Apache Kafka" stays as one search term. The JD never writes the literal phrase "Apache Kafka", so `kafka` is never extracted. Same story for `flink` at line 4085 (`"name": "Apache Flink"`) — JD says "Experience with Flink for analytics joins" and Flink is missed.

This is the worst class of Phase 1 miss because (a) the recruiter has no signal that anything was dropped — there is no "did you mean Kafka?" affordance — and (b) Kafka is the JD's flagship messaging tech. A recruiter who trusts the auto-extract will start the screen without a Kafka chip and either notice mid-call (and fumble adding it via search while the candidate waits) or, worse, not notice at all. **Fix surface:** either add `kafka: ['apache kafka']` aliases (backwards — the alias should be the *longer* form so the bare "Kafka" in the JD matches the catalog entry), OR make `nameSearchTerms()` also emit the trailing token of the name when the leading word is a vendor prefix ("Apache" / "Microsoft" / "Google"). The latter is more robust and would also fix Flink, future Apache-* additions, and any "Microsoft SQL Server" / "Google BigQuery" style entries that get added later.

### F2 — `junit` extracted via "Java" matching the parenthesis-stripped name "JUnit (Java)". ✗ blocking

The catalog entry at `technologies.json:3368` is `"name": "JUnit (Java)"`. `nameSearchTerms()` splits on `()` and emits `["JUnit", "Java"]`. The JD says "Java 21" — so `java` matches "Java" (correct) AND `junit` matches "Java" (false positive). The result JSON proves it: `"id": "junit", ..., "matched": ["Java"]`. JUnit is plausible for a Java backend role but the JD does not name JUnit anywhere, and a fintech trading-systems shop is at least as likely to be on Spock / Testcontainers / a homegrown harness. The recruiter has to decide whether to keep this chip; the right call without more info is to remove it (JD didn't mention it) and add JUnit back only if the candidate volunteers it. **Fix surface:** `nameSearchTerms()` should *not* emit parenthetical contents that are themselves a different catalog tech's primary name. Either skip any term that is a top-level catalog `name`, or treat the parenthetical as a disambiguator (don't search on it), or maintain a small denylist of cross-tech parenthetical terms ("Java", "Python", "JS", "Go").

### F3 — `kotlin` extracted with `category: "Mobile"` because the catalog name is "Kotlin / Android". ⚠ small

JD: "Java preferred; Kotlin acceptable for the right candidate" — this is backend Kotlin (the JVM-on-Spring lane). The catalog entry's `name` is "Kotlin / Android" and its category is "Mobile". The extractor splits "Kotlin / Android" → `["Kotlin", "Android"]`, "Kotlin" hits, and the chip lands in the Mobile bucket on the radar. On a JD that explicitly excludes mobile ("Out of scope: ... mobile"), this is jarring. **Not Phase 1's fault per se — it's a catalog-shape issue:** Kotlin's backend usage and Kotlin's Android usage are different vetting axes (coroutines / JVM interop vs Jetpack Compose / Android SDK), and the catalog conflates them into one Mobile entry. The recruiter's likely workaround is to keep the chip and mentally re-categorise it as Language; the Phase 2 LLM won't help here either, because the catalog itself is the constraint. **Track as a catalog-restructure candidate**, not a Phase 1 fix.

### F4 — "OpenTelemetry" in JD does not match `OTel` alias-term inside `observability`. ⚠ small

The observability catalog name is "Observability (Prometheus / Grafana / OTel)" → terms `["Observability", "Prometheus", "Grafana", "OTel"]`. JD writes "OpenTelemetry instrumentation". The custom word-boundary `(?<![a-z0-9])otel(?![a-z0-9])` rejects "opentelemetry" because the preceding "p" is alphanumeric. The `observability` chip *did* still get extracted (via "Prometheus" + "Grafana"), so the recruiter does see Observability on the chip list — but the third signal in the JD didn't reinforce it, and the `matched: ["Prometheus", "Grafana"]` array would not include "OpenTelemetry" in any tooltip. **Add aliases** `observability: ['opentelemetry', 'otel']` — the existing 3-char-minimum rule is satisfied and "otel" alone with proper boundaries is unlikely to false-positive in prose. This is a one-line aliases.ts edit.

### F5 — Core spine extraction is correct and recruiter-useful. ✓ working as intended

`java`, `spring-boot`, `postgresql`, `redis`, `grpc`, `aws`, `terraform`, `github-actions`, `observability` — nine of the eleven chips are the right chips. For a Java/Spring/Postgres/Redis/gRPC/AWS/Terraform/GHA/Observability stack, this is the spine of what I'd want to screen. The chip ordering (category-then-name) is sensible; Spring Boot landing in Backend (not Language) is correct. The PostgreSQL match on bare "PostgreSQL" with no alias dance is exactly the boring-correct behaviour you want.

### F6 — `aws` matched on the JD's bare "AWS" token; the JD's "EKS + RDS + MSK Kafka" specifics are absorbed silently into the AWS checklist. ✓ working as intended

The `aws` entry is checklist-mode and `EKS` / `RDS` are nested services inside it (confirmed at `technologies.json` ~ lines around `"id": "eks"`). Phase 1 doesn't extract nested service IDs as chips — and that's the right call, because the user model is "one chip per top-level tech, walk the services in the assessment". The recruiter ticking the AWS chip will then see EKS / RDS in the checklist and tick them during the call. No defect; flag this as a *documented behaviour* in any user-facing copy explaining the auto-extract.

---

## 4. Things genuinely missed that a recruiter would expect (false negatives)

1. **Kafka** — F1, blocking. The JD's flagship messaging tech.
2. **Flink** — F1, expected-Phase-1 miss for the same name-prefix reason but lower-stakes because it's nice-to-have.
3. **OpenTelemetry** — F4, near-miss; observability chip still appears so not blocking.
4. **gRPC streaming over Envoy** — gRPC chip extracted, but Envoy is not in the catalog at all (see catalog gaps).
5. **Quarkus** — JD names it as an acceptable alternative to Spring Boot. Not in the catalog (see catalog gaps).
6. **PagerDuty** — appears in JD twice ("Carrying pager rotation (PagerDuty, 1-in-6...)"). Not in the catalog as a top-level chip; only appears as a nested service inside observability ("Alertmanager / PagerDuty integration"). Acceptable miss — PagerDuty isn't a screening axis on its own.
7. **Maven** — JD explicitly lists it in "Tech we use day-to-day". Not in catalog. Phase 2 LLM won't help here either; this is a catalog gap.
8. **FIX / FAST market-data protocols** — nice-to-have, JD says "not deal-breaker". Domain-specific to trading; arguably not in scope for a general developer assessment tool, but worth a recruiter-side note.

---

## 5. False positives

1. **`junit`** — F2, blocking. Extracted purely because "Java" appears in its parenthetical name; JD never says "JUnit".
2. **`kotlin`** in Mobile category — F3, mis-categorised rather than false-positive in the strict sense (JD does name Kotlin), but on this JD the Mobile categorisation is misleading.
3. No context-blind hits in this fixture — the JD doesn't have a "we do NOT use X" sentence to test the documented Phase 1 limit. Worth checking against a JD that does, in a later round.

---

## 6. Catalog gaps surfaced

- **Quarkus** — named as Spring Boot alternative. Probably worth a top-level entry for fintech/JVM-shop coverage; currently only a comment in a Java tier note ("modern Quarkus distribution").
- **Envoy** — service-mesh / API gateway proxy, called out in the JD twice ("gRPC streaming over Envoy"). No catalog entry. Reasonable add — recruiters in service-mesh shops will see it on JDs.
- **Maven** — build tool. JVM shops still default to Maven or Gradle. Neither is in the catalog as a top-level chip. Either add both or accept this as an out-of-scope build-tool gap and document the decision.
- **MSK / RDS / EKS as discoverable terms** — they exist as nested service IDs inside `aws`, but the recruiter pasting a JD that says "MSK Kafka" gets no signal that MSK was even noticed. Worth considering an alias map at the nested-service layer (Phase 1.5?) so the AWS chip's `matched` array can include "MSK", "RDS", "EKS" as hints to the recruiter that the JD named those specific services.
- **OpenTelemetry** as a standalone — currently only an alias-worthy term inside observability. F4's alias edit is the minimum viable fix.

---

## 7. Verdict

**At-risk.**

Phase 1 nails the spine (9/11 chips are useful) but the Kafka miss is a blocking-quality false-negative on a JD that has Kafka in the day-to-day stack list, and the JUnit false-positive plus Kotlin-as-Mobile would have me hand-editing the chip list before I can even start the screen. A recruiter who trusts the auto-extract on this JD will walk into a Kafka-less assessment for a Kafka-must-screen role — that's the failure mode the feature exists to prevent. The Kafka fix is a one-line alias or a small `nameSearchTerms()` change; it should ship before Phase 2 because Phase 2's LLM can't reliably make up for a deterministic-layer miss on the JD's flagship tech.

---

## 8. Cross-cut recommendations for Phase 2 LLM scope

1. **Vendor-prefix name handling is a Phase 1 fix, not a Phase 2 problem.** "Apache Kafka" / "Apache Flink" / "Microsoft Azure" / "Google Cloud Platform" should all match the bare token in JD prose at the rules layer. Either via the `nameSearchTerms()` enhancement or via alias entries (`kafka: ['apache kafka']` is the *wrong* direction — recruiters will write "Kafka", not "Apache Kafka"; the alias is unnecessary if the catalog name's trailing token also becomes a search term).
2. **Parenthetical-disambiguator names should not emit their disambiguators as search terms.** "JUnit (Java)", "Kotlin / Android", any future "Cypress (E2E)" — the parenthetical or post-slash content is metadata for the recruiter, not a search term. Phase 1 conflates the two roles of that string.
3. **Context-negation (the documented "we do NOT use jQuery still flags jQuery" limit) is the right Phase 2 LLM scope.** This fixture doesn't have a negation sentence to test it, but JDs in the wild routinely have "we are not a [stack] shop" lines and a small LLM pass over the JD with the extracted chip list as input — asking "for each of these, is the JD using it, avoiding it, or only mentioning it as legacy / not-our-stack?" — would be high-value. Output: a tri-state per chip (use / avoid / neutral) the recruiter can act on.
4. **Domain-protocol mentions (FIX / FAST / MQTT / AMQP / FpML / SWIFT)** are a separate axis from the dev-tool catalog. Phase 2's LLM could surface these as *flags* ("JD mentions trading protocols: FIX, FAST") without trying to chip them — the recruiter doesn't screen on FIX as a tech the way they screen on Postgres, but they want to know.
5. **Mobile-vs-backend Kotlin disambiguation** should be a catalog restructure, not an LLM responsibility. Two entries — `kotlin-jvm` (Language) and `kotlin-android` (Mobile) — would let the rules layer route correctly without the LLM having to second-guess category. Track separately.
6. **A "did you mean?" affordance** for the closest near-miss tokens in the JD that didn't match (e.g. JD has "Kafka" → catalog has "Apache Kafka") would catch Phase 1 misses without waiting for Phase 2 LLM compute. Cheap UI win.
