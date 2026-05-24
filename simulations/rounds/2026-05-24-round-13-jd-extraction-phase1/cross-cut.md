# Round 13 cross-cut — JD-extraction Phase 1 validation

**Date:** 2026-05-24
**Scope:** Validate the rules-based JD-extraction modal (Phase 1) against 4 diverse real-shape JDs spanning fintech backend / FE design-system / AI-ML RAG / DevOps platform.

**Distribution: 1 Safe / 3 At-risk / 0 Unworkable.**
(2 of the 3 At-risk drop to Safe with one-line alias/regex fixes; the AI/ML At-risk is intentional — exclusion-section FPs are Phase 2 LLM territory.)

| # | Persona / JD | Verdict | Extracted | Notable |
|---|---|---|---|---|
| 01 | Senior Backend, fintech trading systems | At-risk | 11 | Kafka + Flink silently dropped (whitespace bug); JUnit FP from "Java" disambiguator |
| 02 | Senior FE, design system / Storybook governance | **Safe** | 8 | Zero extractor FPs/FNs. Only catalog gaps (Chromatic high-pri) |
| 03 | AI/ML Engineer, RAG + agents (legal-tech) | At-risk → Safe after aliases | 23 | TensorFlow/Keras/PyTorch flagged from "Not relevant" section (Phase 2 P0); Pydantic-AI hyphen miss; pgvector unaliased |
| 04 | Staff DevOps / Platform Engineer | At-risk | 18 | JUnit FP recurs (confirms F2 from session 01); Vault FN ("HashiCorp Vault" → whitespace bug again); Java/.NET context-blind FPs |

---

## Convergent findings (each surfaced by ≥2 agents)

### F-W1 — `nameSearchTerms` doesn't split on whitespace

**Severity: ✗ blocker. Confirmed by sessions 01 + 04.**

Catalog `name` fields like "Apache Kafka", "Apache Flink", "HashiCorp Vault" stay as a single multi-word search term because `nameSearchTerms` only splits on `/` and `()`. The JD's bare "Kafka 3.7" / "Vault for secrets" never matches. Affects 5 top-level catalog entries:

```
kafka     → "Apache Kafka"
spark     → "Apache Spark"
airflow   → "Apache Airflow"
flink     → "Apache Flink"
vault     → "HashiCorp Vault"
```

These are headline techs in their respective ecosystems — silently dropping them is a recruiter-trust hit.

**Fix shape:** Don't whitespace-split blindly (would break "React Native" → "Native" matches "native code"). Either (a) explicit aliases for the bare forms — narrowest, safest; or (b) detect known vendor prefixes (Apache, HashiCorp, Microsoft, Amazon, Google, Red Hat) and auto-add the post-prefix form. Recommend (a) for Phase 1 simplicity.

### F-P1 — `nameSearchTerms` paren-split emits disambiguators as FPs

**Severity: ✗ blocker. Confirmed by sessions 01 + 04.**

Catalog name `"JUnit (Java)"` splits into `["JUnit", "Java"]`. Any JD mentioning "Java" anywhere auto-extracts JUnit — false positive in both backend (session 01) and DevOps "we don't write Java" (session 04) fixtures. Same shape would affect `"Go (Golang)"` and `"JavaScript (ECMAScript)"`, but for those the parenthetical IS a useful alternate name and is also present in `TECH_ALIASES` — so dropping it doesn't lose coverage.

**Fix:** strip parenthesized content entirely; rely on aliases (already populated for `golang` / `ecmascript`) when the paren contained a real alternative.

### F-C1 — Context-blind extraction from negation / exclusion sections

**Severity: ✗ blocker for AI/ML (P0 for Phase 2). Confirmed by sessions 03 + 04, lurked behind session 02's "lucky escape" with jQuery.**

Phase 1 cannot tell that:
- AI/ML JD's "**Not relevant** — we don't use TensorFlow, Keras, PyTorch model training from scratch" is an exclusion — Phase 1 still flags all three.
- DevOps JD's "**Hands-off the keyboard** — we don't write Java here, no Windows / .NET" — Phase 1 flags Java and .NET.
- FE JD's "**Probably not for you** — if your last shop did jQuery + Bootstrap" — Phase 1 *would* flag both, only saved because jQuery + Bootstrap aren't catalog entries (session 02 calls this "luck, not capability").

This is genuine Phase 2 LLM territory. Rules-layer heuristics could catch a fraction (e.g. proximity to "don't" / "not" / "no" within N words), but section-aware exclusion is what an LLM does well.

**Recommended Phase 2 prompt scope:** detect negation context within the same sentence + section-header exclusion blocks ("Not relevant:", "Hands-off:", "Probably not for you:", "Pet peeves:").

---

## Rules-layer quick wins (Phase 1 follow-up, all <2hr)

Each session named these — collated and deduped:

1. **Strip parens in `nameSearchTerms`** (F-P1). Fixes JUnit FP across both backend + DevOps fixtures.
2. **Add bare-form aliases** for the 5 vendor-prefixed Apache/HashiCorp entries. Fixes Kafka / Flink / Vault FNs.
3. **`pydantic-ai` alias** with the hyphenated form. Session 03 verified the regex repl — current pattern misses "Pydantic-AI" written with a hyphen.
4. **`vector-db` alias** add `pgvector`. Session 03 flagged the JD's `pgvector` mention is invisible despite belonging semantically to the generic Vector DB entry.
5. **OpenTelemetry / OTel** — session 01 noted the `OTel` alias (if it exists) is shadowed by the lookbehind when "OpenTelemetry" appears in JD; needs explicit `opentelemetry` alias on the observability entry.

---

## Catalog gaps surfaced (not extractor bugs — track separately)

Sessions also surfaced techs JDs mention that have no catalog entry. None of these are Phase 1 extractor bugs; they're new-entry candidates:

**High priority (each cited in ≥2 fixtures or central to a JD's job):**
- **Chromatic** (session 02) — JD names 3 times, "Maintaining the Chromatic visual-regression suite" is a core responsibility. Lives only parenthetically inside Storybook's `visual-regression` service.
- **Datadog** (session 04) — observability sub-service only; a Datadog-only JD would extract nothing.
- **Pydantic** (the core library, separate from Pydantic-AI; session 03) — must-have in AI/ML JD.

**Medium priority:**
- Vercel, Figma (session 02)
- Linkerd, Istio, Cilium, eBPF — entire service-mesh layer invisible (session 04)
- Honeycomb (session 04)
- Quarkus, Envoy, Maven (session 01)
- Bedrock as standalone (currently AWS sub-service; session 03)

**Defer:**
- Tokens Studio (session 02)
- Gatekeeper / OPA (session 04 — buried inside Kyverno probes)
- FIX / FAST protocols (session 01 — domain-niche)

---

## Phase 2 LLM scope (from agent recommendations)

Convergent Phase 2 priorities (each named by ≥2 sessions):

1. **Negative-context detection** (sessions 02, 03, 04). Sentence-level: "we don't use X" / "not looking for X" / "no X background" → suppress. Section-level: "Not relevant", "Hands-off the keyboard", "Probably not for you", "Pet peeves" blocks suppress all techs within.
2. **Version extraction** (sessions 02, 04). "React 19" / "Java 21" / "K8s 1.32" → pre-fill the `version` field on the tech card.
3. **Sub-service pre-ticking** (session 04). "AWS (EKS, RDS, S3, IAM)" → pre-tick those services on the AWS hybrid card.
4. **Sense disambiguation** (session 03). "not just notebooks" — Phase 1 reads as positive Jupyter signal; LLM should read negatively. "We use Loki for OSS contributors" — distinguish Grafana Loki (observability) from LokiJS (FE state).
5. **De-ranking from optional / pet-peeve sections** (session 02). Don't delete, but mark as "review" not "auto-checked".

Architecture recommendation (session 04): keep rules as the floor with provenance — return `{ matchedBy: 'rules' | 'llm' | 'both' }` per extracted tech. Lets the UI show high-confidence (rules-hit) vs review (LLM-only).

---

## Verdict on Phase 1 ship-readiness

**As shipped today:** Phase 1 is useful but has 2 rules-layer bugs that cause recruiter-trust hits on common JD shapes (Kafka silently missing on every fintech-backend JD; JUnit FP on every Java-mentioning JD). **Recommend shipping the two rules-layer fixes (F-W1 + F-P1) before considering Phase 1 "done."** Total effort: ~1-2 hours including tests.

After those land:
- Backend (01) → Safe
- Frontend (02) → already Safe
- AI/ML (03) → Safe after aliases (3 more line additions)
- DevOps (04) → Safe after the Vault alias + the two structural fixes

**Distribution after fixes: 4 Safe / 0 At-risk / 0 Unworkable.**

That's the cleaner stopping point for declaring Phase 1 complete and starting Phase 2 (LLM in-browser).

---

## Post-fix round-2 validation (2026-05-24 PM)

After shipping the F-W1 + F-P1 fixes, validation expanded to 2 new terrains (mobile + AppSec) to surface anything the original 4 missed. Both agents confirmed the round-1 fixes hold, and **2 more rules-layer blockers surfaced** that round-1 didn't have terrain to catch:

| # | Persona / JD | Pre-fix verdict | New findings |
|---|---|---|---|
| 05 | Senior Mobile, cross-platform Flutter | At-risk | **F3** + **F4** (both new blockers) |
| 06 | Senior AppSec / FCA fintech | **Safe** | Confirmed F-W1 + F-P1 hold; surfaced catalog-shape issue (Kotlin/Android `/`-split makes "Android" extract Kotlin) |

### F3 — Identifier-style tokens with `_` false-positive on short language names

**Severity: ✗ blocker. Surfaced by session 05.**

The word-boundary regex `(?<![a-z0-9])` treats `_` as a non-alphanumeric separator, so the Flutter library `go_router` extracts the Go language. Will fire on every Flutter JD mentioning go_router (idiomatic in 2026 Flutter). Same shape would affect `c_` / `r_` / any other 1-2 char language with an `_`-prefixed identifier.

**Fix shipped:** extend boundary to `(?<![a-z0-9_])` — exclude underscore from "word-extended" character set.

### F4 — Contained matches inside compound aliases

**Severity: ✗ blocker. Surfaced by session 05.**

A JD mentioning ONLY "React Native" still extracted `react` because the standalone `React` term has valid boundaries (space on either side) inside the compound "React Native" phrase. Same shape applies to any compound alias containing a shorter alias as a substring.

**Fix shipped:** span-suppression — collect match positions in pass 1, then in pass 2 drop any match whose `(start, end)` span is strictly contained within a longer match from a DIFFERENT tech. Per-match-instance, so a JD with bare "React" AND "React Native" still extracts both.

### Catalog-shape carryover (out of scope for this round)

Session 06 noted that the `/`-split rule (kept intentionally for "Redis / Valkey" / "Terraform / OpenTofu" style alternatives) makes the **platform-name halves** of compound mobile catalog entries extract their language:
- `Kotlin / Android` — JD mentioning "Android" extracts Kotlin
- `Swift / iOS` — JD mentioning "iOS" extracts Swift

The catalog-name shape conflates "the language" with "the platform it targets." Defensible (most Kotlin work is Android-targeted) but produces FPs when JDs mention the platform without the language. **Track as catalog refactor candidate**, not a Phase 1 extractor bug.

### Final ship-readiness after round-2 fixes

| # | Persona | Final verdict |
|---|---|---|
| 01 | Fintech backend | Safe (F-W1 + F-P1 fixes resolved Kafka/Flink/JUnit) |
| 02 | FE design-system | Safe (was already Safe) |
| 03 | AI/ML RAG | Safe-after-aliases (TF/Keras/PyTorch FPs remain — Phase 2 P0) |
| 04 | DevOps platform | Safe (F-W1 + F-P1 fixes resolved Vault/JUnit; Java/.NET FPs are Phase 2) |
| 05 | Mobile cross-platform | Safe (F3 + F4 fixes resolved go_router/React FPs; Postgres/Spring-Boot from "separate team" line is Phase 2) |
| 06 | AppSec | Safe (catalog-shape Android/iOS FPs deferred to catalog refactor) |

**Final distribution: 6 Safe / 0 At-risk / 0 Unworkable.** Phase 1 is ship-ready.

### Quick win still open

The Kotlin/Android + Swift/iOS catalog-shape issue is a 5-minute catalog-rename or a 5-line extractor refinement (don't emit known platform names — iOS / Android / macOS / Windows / Linux — as search terms even from `/`-split). Defer to a follow-up commit; not blocking ship.
