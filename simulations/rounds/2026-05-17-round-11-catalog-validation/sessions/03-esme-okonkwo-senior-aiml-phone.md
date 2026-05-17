# Session 03 — Esme Okonkwo redux (Senior AI/ML productionization, phone)

Round 11, 2026-05-17. Catalog validation. Round 9 surfaced finding #3
(four named-only entries — Braintrust, Evidently, Feast, Langfuse —
each center-of-gravity for the productionization role but living in the
free-text gutter). Round 10 confirmed 9A landed clean while
acknowledging finding #3 still standing. Round 11 ships the four
catalog promotions and reruns Esme end-to-end to verify (a) each is
discoverable via Add-tech search, (b) each renders checklist-mode on
first add with no manual scope override required (operator-default
honored), (c) the integrity-test exception list keeps the AI/ML
default-author guard from punishing the new entries, and (d) the
named-only chip count falls from round 9's four to roughly zero.

This is the third redux of Esme. Persona-identical to rounds 9 and 10
— same CV, same depth claims, same stack ownership. A successful round
11 means the *tool* produces a different post-call shape on the same
candidate: fewer search-named-only roundtrips, more checklist coverage
visible on the report.

## 1. Persona inhabited

**Esme Okonkwo, 31.** Eight years total ML. Three at the Lagos-based
AI startup (~40 engineers, customer-support copilot serving ~200
mid-market SaaS tenants) running the FastAPI inference service fronting
a Qdrant-backed RAG pipeline plus three LLM providers (Anthropic
primary, OpenAI fallback, Bedrock for one regulated tenant). Weekly
fine-tunes of small distilled classifiers via HuggingFace `Trainer` +
`peft`. Monthly base-model eval reruns through Braintrust. Drift
monitoring via Evidently AI on classifier outputs plus a custom
faithfulness score over RAG generations. Feature store (Feast) six
months deployed — bedding in, ~30 feature views across two teams,
Redis online + BigQuery offline. LLM observability via Langfuse,
self-hosted on the same EKS cluster as the inference service for
data-residency reasons (her Bedrock tenant is in a financial-services
vertical and prefers no third-party trace store).

Depth claims unchanged from rounds 9/10:

- **Python**: deep. Inference-service codeowner.
- **FastAPI**: deep.
- **PyTorch**: working. Loads checkpoints, fine-tunes classification
  heads, doesn't write custom `nn.Module`. **Operator scope on a
  library, not author.** (9A propagates this.)
- **HuggingFace Transformers**: deep, author-shape (genuine fine-tuner
  — writes `Trainer` configs, picks LoRA settings).
- **LLM API SDK**: deep operator (9A).
- **Vector DB / Qdrant**: deep operator (9A).
- **Docker**: deep.
- **AWS**: operator (Bedrock + SageMaker + S3 + Lambda).
- **Braintrust**: deep operator. Custom scorers, golden sets,
  CI-gating, online sampling. NEW to catalog this round.
- **Evidently AI**: deep operator. Drift + concept + test-suites in
  Prefect. NEW to catalog this round.
- **Feast**: working-to-deep operator. Six months in, ~30 feature
  views, Redis + BigQuery, PIT-correct joins working. NEW to catalog
  this round.
- **Langfuse**: deep operator. Self-hosted, trace + prompt-management
  + eval-integration. NEW to catalog this round.

**Daniel Harper, 38.** Same London fintech, same JD ("AI Engineer for
production LLM applications — we're not hiring researchers"). Four
weeks into round-9 now, twenty-plus AI/ML phone screens under his belt
since 9A shipped. He recognizes Esme's voice (third redux), even
remembers the Qdrant detail. He has NOT been told the catalog gained
four new entries this morning — the tool just has them now. The
interesting micro-moment of round 11: does Daniel reach for the
free-text named-only fallback first (twenty calls of muscle memory) or
does he type the tool name into Add-tech and notice the new catalog
hit?

## 2. Phone call — abbreviated

> D: "Hi Esme, third time's the charm. Same shape — ten minutes flat
> on the stack, then wrap with role context."
> E: "Same as last time. I'll be on a flight Thursday so this is the
> last call before then."

Daniel is on `/#/assess`. Landing pick: **AI / ML Engineer**
(`src/data/roles.ts:278`). Eight tech cards preloaded: `python,
pytorch, huggingface-transformers, llm-api-sdk, vector-db, fastapi,
docker, aws` (`roles.ts:281`). Path: **Productionization / serving**
(8E). Senior pill. Methodology chips render right rail (six —
`roles.ts:301-308`).

**~0:30 — Python.** `3.12`, deep. Excellent. Clean. (~10 s.)

**~0:45 — FastAPI.** `0.115`, deep. Excellent. Clean. (~12 s.)

**~1:00 — PyTorch.** `2.4`, working. Scope reads `Operator (runs in
prod)` pre-selected — 9A propagation, zero scope click. Excellent
(Good). (~10 s, down from round 9's ~32 s.)

**~1:15 — HuggingFace Transformers.** `5.2`, deep. Scope dropdown
shows `— Use default: author` (catalog default; 9A deliberately did
not override). Daniel leaves it; Esme is a genuine fine-tuner so the
author read is honest. Excellent. (~12 s.)

**~1:30 — LLM API SDK (checklist).** 14 services. Esme ticks
openai-sdk, anthropic-sdk, streaming, tool-use, structured-outputs,
prompt-caching, embeddings, batch-api, eval-harness, agents — same
10 as rounds 9/10. 10/14 = 71% → Good (Green) at ≥66%. Scope
pre-selected operator (9A). (~65 s.)

**~2:35 — Vector DB / Qdrant (checklist).** 12 services. Esme ticks
qdrant, pgvector, hybrid-search, reranking, faiss — same 5. 5/12 =
42%; deep + senior + ≥40% → 6D lift to Green. Scope pre-selected
operator (9A), no author-cap. Verdict: "Good (lifted from Yellow by
depth) — 5/12 services." (~75 s.)

**~3:50 — Docker.** `28.0`, deep. Excellent. Clean. (~10 s.)

**~4:00 — AWS (checklist).** 8 ticks (lambda, s3, sagemaker, bedrock,
cloudwatch, iam, ecs-fargate, ec2) under the data-ml-filtered surface.
8/14 = 57%, deep + senior + ≥40% → 6D lift to Green. (~75 s.)

**~5:15 — THE round-11 moment. Daniel types into Add-tech:
"Braintrust."**

He pauses. In rounds 9 and 10 his muscle memory was: type the name →
see "no matches" → click "+ Add 'Braintrust' as named-only" (the
Fix-C zero-results CTA at `TechSearch.tsx:51`). This time he types
**B-r-a-i-n** and the dropdown surfaces **Braintrust** with the AI/ML
category badge.

> D: (quiet) "Oh — Braintrust is in there now."
> E: "Was it not before?"
> D: "We've been treating it as free-text. Better now."

He clicks the result. Card renders. He scans:

- Scope dropdown reads `Operator (runs in prod)` — pre-selected. No
  manual override needed. Round-11 catalog author had this exact debate
  (default-author guard at `integrity.test.ts:587-602` would have
  punished a missing operator default; the `MLOPS_OPERATOR_TOOLS`
  exception list at line 586 names this case explicitly).
- Checklist mode, 8 services rendered:
  1. Eval framework (scorers + datasets)
  2. Dataset versioning + golden sets
  3. Custom scorer authoring (LLM-as-judge / heuristic)
  4. Prompt playground + A/B compare
  5. Production logging + online eval sampling
  6. Experiment comparison + regression detection
  7. CI integration (PR-gated eval runs)
  8. Trace debugging (span-level inspection)

> D: "Eval-framework, custom scorers — yes?"
> E: "Yes. Both LLM-as-judge for free-form generations and heuristic
> scorers for the classifier outputs. The judge prompts are versioned
> in Braintrust itself."
> D: "Dataset versioning, golden sets?"
> E: "Yes. Golden set per intent class, plus a held-out RAG-faithfulness
> set."
> D: "Playground?"
> E: "Use it occasionally — the engineers do most prompt iteration in
> code, not the UI."
> D: "Production logging + online sampling?"
> E: "5% sampling, flagged outputs go to a triage queue."
> D: "Experiment comparison?"
> E: "Yes — every PR with a prompt change has a comparison artifact
> linked in the description."
> D: "CI integration?"
> E: "Yes, eval-on-PR is gating for the routing service."
> D: "Trace debugging?"
> E: "Yes, span-level. Bug-hunt tool."

Ticks: 1, 2, 3, 5, 6, 7, 8 — seven of eight. (Skipped playground.)
7/8 = 87.5% → Green/Good. (~75 s for the card — comparable to the
LLM-API-SDK checklist time but with vastly higher signal than a
named-only chip.)

**~6:30 — "Evidently."**

Types **E-v-i-d**. Dropdown surfaces **Evidently AI**. Click.

- Scope: operator, pre-selected.
- 8 services: data drift / prediction drift / data quality / concept
  drift / monitoring dashboards / test suites / model performance /
  production integration.

> D: "Data drift?"
> E: "Yes, on feature distributions for the routing classifier."
> D: "Prediction drift?"
> E: "Yes, on the output class distribution."
> D: "Data quality?"
> E: "We rely on upstream Feast checks for this — Evidently quality
> reports we don't run."
> D: "Concept drift?"
> E: "Quarterly, with labeled-data refresh."
> D: "Monitoring dashboards?"
> E: "Yes, live in Grafana via export."
> D: "Test suites — do they gate retraining?"
> E: "Yes. A failing suite blocks the auto-retrain DAG in Prefect."
> D: "Model performance reports?"
> E: "Weekly, scheduled."
> D: "Production integration?"
> E: "Prefect — yes."

Ticks: 1, 2, 4, 5, 6, 7, 8 — seven of eight. Skipped data-quality
(handed off to Feast). 7/8 = 87.5% → Green/Good. (~70 s.)

**~7:40 — "Feast."**

Types **F-e-a**. Dropdown surfaces **Feast (Feature Store)**. Click.

- Scope: operator, pre-selected.
- 8 services: feature definitions / online store / offline store /
  materialization / point-in-time joins / registry / serving /
  discovery.

> D: "Feature definitions?"
> E: "Yes — about 30 feature views, two teams contributing."
> D: "Online store?"
> E: "Redis, latency budget is tight."
> D: "Offline store?"
> E: "BigQuery — same warehouse the analytics team uses."
> D: "Materialization?"
> E: "Batch only. Stream materialization via Kafka was on the roadmap
> but we deferred it — six months in we're not yet pushing the
> limits."
> D: "Point-in-time joins?"
> E: "Yes — debugged a training-serving skew incident in month two
> that turned out to be a PIT join bug, taught me a lot."
> D: "Registry?"
> E: "Yes. `feast apply` is in CI."
> D: "Serving?"
> E: "gRPC, behind the inference service."
> D: "Discovery — cross-team reuse?"
> E: "Working on it. We've got two teams' feature views in the same
> registry but discovery is still tribal-knowledge. No proper catalog
> UI."

Ticks: 1, 2, 3, 5, 6, 7 — six of eight. Skipped materialization
(batch-only is the honest answer, not a tick), discovery (admitted
gap). 6/8 = 75% → Green/Good. (~85 s — slightly longer because the
PIT-join + discovery discussion was substantive.)

**~9:05 — "Langfuse."**

Types **L-a-n-g-f**. Dropdown surfaces **Langfuse**. Click.

- Scope: operator, pre-selected.
- 8 services: tracing / prompt management / evaluations / user
  feedback / datasets / session replay / cost tracking / self-host.

> D: "Tracing — nested spans, latency, tokens?"
> E: "Yes."
> D: "Prompt management — versioning, A/B?"
> E: "Versioning yes. A/B we do upstream of Langfuse, not via its UI."
> D: "Evaluations?"
> E: "Integrated with Braintrust — Langfuse traces feed Braintrust
> scorers."
> D: "User feedback?"
> E: "Thumbs in the product, captured."
> D: "Datasets + experiments?"
> E: "Braintrust again — we don't use Langfuse's dataset feature."
> D: "Session replay?"
> E: "Multi-turn — yes, very useful for RAG debugging."
> D: "Cost tracking?"
> E: "Yes, per session and per tenant."
> D: "Self-host?"
> E: "Yes, on EKS — data-residency for the regulated tenant."

Ticks: 1, 2, 3, 4, 6, 7, 8 — seven of eight. Skipped datasets
(handed off to Braintrust). 7/8 = 87.5% → Green/Good. (~70 s.)

**~10:15 — Methodology chips.** Esme ticks mlops, retraining-cadence,
feature-stores, drift-detection, llm-evals, rag-evaluation — six of
six. **Zero free-text entries this round** (rounds 9 and 10 had 5
named-only entries; round 11 has none).

> D: "Last bit — any practices we missed? Shadow deployments, canary
> for ML?"
> E: "Yes — shadow on the routing classifier before promote, canary
> on the RAG-generation prompt changes."

Daniel adds those as free-text (still named-only, since 9A/10A didn't
ship chip-set refresh — that's still open from round-9 finding #4).
**Two free-text entries** (shadow-deployment-ml, canary-for-ml).

**~11:30 — Wrap.** Mandate + role context. Continue to Summary.

Total call time: **~11:30 elapsed** vs round-10's 7:30 and round-9's
8:45. **The call is longer because four named-only entries that
previously cost ~5-8 s each (just typing the name in the free-text box)
now cost ~70-85 s each as real checklist passes.** This is the
intended trade: ~4 minutes of additional signal capture in exchange
for losing roughly half a minute of free-text shuffling. The
free-text-roundtrip estimate from the cast brief ("30-40s reclaimed")
under-counted: round 11 *adds* recruiter time on the call but pays it
back tenfold in report quality. Esme also gave four substantive
sub-stories (PIT-join training-serving skew incident, self-host
data-residency rationale, Braintrust playground non-use, Feast
discovery gap) that would have been completely invisible on a
named-only chip.

## 3. Post-call — report read

Daniel scrolls Summary. Headline buckets:

- **Excellent / Good (Green band):** 10 — python, fastapi, pytorch,
  huggingface-transformers, llm-api-sdk, vector-db, docker, aws,
  braintrust, evidently-ai. Wait — count: python, fastapi, pytorch,
  huggingface, llm-api-sdk, vector-db, docker, aws, braintrust,
  evidently, feast, langfuse = **12 cards in the Green band.**
- **Lifted from Yellow:** 2 (vector-db, aws — both 6D-lifted on
  checklist coverage at deep + senior + ≥40%).
- **Yellow band:** 0.
- **Red band:** 0.
- **Scope-overrides applied by recruiter:** 0.
- **Scope set by template (9A):** 3 (pytorch, llm-api-sdk,
  vector-db).
- **Scope set by catalog default (new round-11 entries):** 4
  (braintrust, evidently-ai, feast, langfuse — all operator via
  `defaultScope` in catalog).
- **Methodology chips ticked:** 6/6.
- **Free-text methodology:** 2 entries (shadow-deployment-ml,
  canary-for-ml — round-9 finding #4 still open).
- **Named-only catalog gaps:** **0** (down from 4 in rounds 9/10).

Headline shape: **12G / 0Y / 0R** with 2 of those being lifted-from-Y
and 4 being NEW catalog hits this round. The named-only count dropped
to zero. The Yellow band emptied entirely.

ScopeChip rendering on Summary (`Summary.tsx:716-750`): the four
new entries render with "via default" hint (since none have an
`item.scope` override, they read the catalog default at render time).
This is correct and clean — operator IS the catalog default for these
four, the chip just surfaces the fact.

## 4. Findings

### Finding #1 (CATALOG VALIDATION) — All four new AI/ML entries are searchable via Add-tech

Reading the chain: `TechSearch.tsx:22-33` runs a case-insensitive
`includes` match against name, category, and id. Each of the four new
techs has an `id` that's a substring of any reasonable prefix typed by
a recruiter who's heard the tool name:

- `braintrust` — types "Brain", "Braintrust", "brain" all hit.
- `evidently-ai` — "Evid", "Evidently" both hit. The `-ai` suffix on
  the id matches "ai" too, which means anyone typing "ai" sees
  Evidently in the dropdown alongside ai-shop libraries — minor noise,
  not a bug.
- `feast` — "Feast", "feast" hit. Three-letter prefix "Fea" matches.
  Concern: "fea" also matches "fea**ture-flag**" if such a tech
  existed, but currently catalog has no fea-prefix collision.
- `langfuse` — "Lang", "Langf" hit. The `lang` prefix collides with
  `langchain` etc. if those existed; currently catalog has no
  lang-prefix collision (LangChain is named-only). Recruiters typing
  "Lang" will see Langfuse alone — fine for now, watch if LangChain
  ever gets promoted.

**Verdict: CATALOG VALIDATION passes.** All four discoverable with
realistic prefixes.

### Finding #2 (CATALOG VALIDATION) — All four render checklist-mode with operator default on first add

Reading `technologies.json:4459-4550`: each of the four new entries
carries `vetMode: "checklist"` and `defaultScope: "operator"` on the
catalog row. When `addTech` is called from `TechSearch` (no scope
override is passed — `TechSearch.tsx:46` calls `onAdd(t.id)` with id
only), the store's `addTech(techId, undefined)` writes the item with
`scope: undefined`. The TechCard's scope `<select>` (`TechCard.tsx:
102`) reads `item.scope ?? ''`, which renders the placeholder option
`— Use default: operator` for each of the four — because the catalog
`defaultScope` flows through to the placeholder copy via the
TechCard rendering path.

The scoring math at `lib/scoring.ts` treats the catalog-default
operator the same as an explicit operator scope for these entries, so
no author-cap fires regardless of coverage. Six-of-eight on Feast,
seven-of-eight on the other three, all land Green/Good cleanly without
needing the depth-lift.

**Verdict: CATALOG VALIDATION passes.** No recruiter scope-click
required on any of the four new cards. The 22-second-per-call
scope-tax that 9A removed for pytorch/llm-api-sdk/vector-db is also
not re-introduced for the four new entries.

### Finding #3 (CATALOG VALIDATION) — Integrity guard's MLOPS_OPERATOR_TOOLS exception list is wired and tested

Reading `src/data/__tests__/integrity.test.ts:586`: the
`MLOPS_OPERATOR_TOOLS` set names `braintrust / evidently-ai / feast /
langfuse` as deliberate exceptions to the AI/ML category's
"defaultScope must equal 'author'" guard. The test at lines 589-602
asserts:

1. Every AI/ML-categorized tech NOT in the exception list carries
   `defaultScope: "author"` (Vikram-protect, the K2 fix).
2. Every member of the exception list IS present in the catalog AND
   carries `defaultScope: "operator"` (belt-and-braces against an
   exception entry being silently dropped from the catalog without
   removing it from the list).

This is the right shape. The guard fails loud both ways — adding a
new AI/ML library without author-default OR adding to the exception
list without operator-default both trip the test. The comment block
above the set (`integrity.test.ts:580-585`) names the productionization
shape explicitly. Future maintenance is well-documented.

**Verdict: CATALOG VALIDATION passes.** Round-11 catalog batch is
guarded against drift.

### Finding #4 (NEW, round-11) — Categorizing operator-default platform tools under "AI/ML" rather than "DevOps" creates a mild discoverability mismatch but is correctly chosen

A defensible challenge surfaced reading the catalog: Braintrust /
Evidently / Feast / Langfuse are *operator-shape platform tools*
running alongside the production ML stack — they could plausibly live
under "DevOps" or a new "MLOps" category. Why does the catalog place
them under AI/ML?

The answer is recruiter shape, not tooling taxonomy. A recruiter
hiring an AI/ML Engineer searches for AI/ML candidates and expects to
see MLOps platform tools in the AI/ML category. A recruiter hiring a
DevOps engineer doesn't expect to see Langfuse; they'd be looking for
Datadog or Grafana. The integrity-guard exception list explicitly
acknowledges this (`integrity.test.ts:580-585` comment: "They belong
in the AI/ML category for discoverability"). This is the right call,
and the exception-list pattern lets the catalog place them where
recruiters search without breaking the K2 author-default for actual
AI/ML libraries.

A minor cost: a recruiter on the **DevOps** template who happens to
ask "do you run Langfuse?" won't see it in the Add-tech dropdown when
typing the name unless they spell at least 4 characters — because
the dropdown limits to 8 results and DevOps-categorized techs would
sort first under most prefix matches. **In practice this doesn't
happen** — Langfuse usage signals ML-engineer shape, not DevOps —
but if a "Platform / SRE for AI infra" template ever ships, the
category placement might want revisiting.

**Severity: non-blocker. Filed as a future-axis note.**

### Finding #5 (NEW, round-11) — Feast checklist missing two services Esme volunteered: stream materialization (separately), feature lineage

Esme's "batch-only, stream-via-Kafka deferred" answer was honest and
gradient-revealing. The current Feast checklist treats materialization
as a single tick (`materialization: "batch + stream"`); a senior MLOps
candidate who's done batch-only but hasn't yet shipped streaming
materialization either over-ticks (misleading) or under-ticks
(undercredits). The honest signal is "batch yes, stream not yet" —
which the single-tick service can't capture.

Similarly, Esme described feature-discovery as "two teams, no proper
catalog UI, tribal knowledge." The `feature-discovery` service in the
checklist captures discovery as a binary; the senior signal is
**feature lineage** (which team owns which feature view, which models
consume it, deprecation policy) which the current checklist doesn't
distinguish from raw discovery.

Two possible splits worth considering for a future batch:

- Split `materialization` into `materialization-batch` and
  `materialization-stream` (the two operational shapes are genuinely
  different).
- Add a `feature-lineage` service distinct from `feature-discovery`
  (lineage is the more senior signal).

**Severity: minor catalog-refinement note.** Doesn't block round-11.
Six-of-eight on Feast is the right Green result either way; the
proposed splits would let Esme tick seven-of-eight more honestly. Not
urgent — Feast is fresh to the catalog and observing one session's
worth of signal isn't enough to redesign the service set yet.

### Finding #6 (NEW, round-11) — Langfuse + Braintrust overlap creates some redundant ticks

Esme's actual deployment has Braintrust as the eval canonical and
Langfuse as the trace canonical, with Braintrust scorers consuming
Langfuse traces. On the catalog this surfaces as overlap:

- `braintrust.production-logging` — "Production logging + online eval
  sampling"
- `langfuse.tracing` — "LLM tracing"
- `langfuse.evaluations` — "Evaluations (LLM-as-judge / scoring)"
- `braintrust.eval-framework` — "Eval framework (scorers + datasets)"

These four services span two tools but Esme's deployment makes them
coherent. The current checklist asks the candidate to tick each tool's
service independently — which is correct (Langfuse's eval feature
exists; whether Esme uses it is a senior-shape signal), but a recruiter
reading the report sees "evaluations" ticked on Langfuse AND
"eval-framework" ticked on Braintrust and might read that as
double-counting. The substance is "Braintrust authoritative, Langfuse
feeds it" which the chip-level surface doesn't capture.

No catalog change suggested — the report is honest, the recruiter can
read both sets of checks and ask "which is canonical?" mid-call (Daniel
did). Just naming the shape: when two adjacent tools both surface in
the catalog, the overlap is a feature (each tool's senior signal
captured separately) and a minor noise (the integration story isn't
chip-shaped).

**Severity: design observation, no action.**

### Finding #7 (NEW, round-11) — Round-9 finding #4 (chip refresh) still standing

Esme volunteered shadow-deployment and canary-for-ml again. These
remain free-text entries because the AI/ML template's
`methodologyChips` array at `roles.ts:301-308` still carries the
round-3 six-chip set. Round-11 was scoped to catalog refresh, not chip
refresh — same scoping discipline as 9A — so this isn't a round-11
regression, it's a still-open finding from round 9.

A future batch might add `shadow-deployment-ml` and
`canary-rollout-ml` as chips, and could consider splitting
`rag-evaluation` into `retrieval-eval` and `generation-eval`.

**Severity: queue-for-next-batch, unchanged from rounds 9/10.**

### Finding #8 (NEW, round-11) — Call time went UP by ~4 minutes, intentionally

Round 9: ~8:45 elapsed, four named-only entries (~6 s each = 24 s)
plus zero actual checklist data on those four tools.

Round 10: ~7:30 elapsed (the 1:15 saving was 9A scope-tax removal).

Round 11: ~11:30 elapsed. The added ~4 minutes is four real checklist
passes on previously-named-only tools, capturing roughly 32 service
ticks plus four substantive sub-stories that didn't exist on the
report at all in earlier rounds.

This is the *correct* direction. Recruiter time-on-call increased,
but candidate signal captured per minute went up sharply. The cast
brief's "30-40s reclaimed" estimate was anchored to the wrong
denominator — the right framing is **report quality per recruiter
minute**, which improved materially. A hiring manager reading the
post-call PDF gets a far stronger signal on Esme's MLOps maturity
than the rounds 9/10 reports could deliver.

**Severity: design clarification.** Recruiter Daniel needs to know
the AI/ML template can run 11-12 minutes when the candidate has full
MLOps platform-tool ownership — slightly over the 10-min nominal
budget. In practice he'd compress methodology-chip pass to ~30 s once
the checklist signal is rich, getting back to ~11 minutes total. No
tool change needed.

## 5. Round-11 verdict

**Safe.**

Round-11 catalog batch ships clean. All four new AI/ML entries —
Braintrust, Evidently AI, Feast, Langfuse — are:

| Criterion                                                       | Status |
|-----------------------------------------------------------------|--------|
| Discoverable via Add-tech search at ≤4-char prefix              | yes (verified at `TechSearch.tsx:22-33`) |
| Render checklist-mode on first add                              | yes (`vetMode: "checklist"` on each, 8 services each) |
| Scope reads operator without recruiter override                 | yes (`defaultScope: "operator"` on each; `MLOPS_OPERATOR_TOOLS` exception list at `integrity.test.ts:586` honors this) |
| Integrity guard test passes for the new entries                 | yes (exception list named, both-directional asserts at `integrity.test.ts:589-602`) |
| Named-only count for Esme drops to 0                            | yes (round 9: 4; round 10: 4; round 11: 0) |
| Headline shape improves from `6G / 2 lifted-Y / 0R + 4 named-only` to all-Green checklist coverage | yes (round 11: 12G / 0Y / 0R, 2 of which lifted-from-Y; 0 named-only AI/ML gaps; 2 named-only methodology chips remain open from round-9 finding #4) |

The honest follow-ons NOT closed by round 11 and acknowledged as still
open:

1. **Methodology chip refresh** (round-9 finding #4, round-10 finding
   #5, round-11 finding #7). Add `shadow-deployment-ml` and
   `canary-rollout-ml`; consider splitting `rag-evaluation`. Lower
   priority than catalog gaps were — the named-only fallback works.

2. **Feast service-set splits** (round-11 finding #5). Split
   `materialization` into batch + stream; add `feature-lineage`
   distinct from `feature-discovery`. Minor refinement; observe one
   or two more Feast candidates before deciding.

3. **Langfuse/Braintrust overlap shape** (round-11 finding #6). No
   action proposed; named for future awareness.

4. **Category-placement note** (round-11 finding #4). If a future
   "Platform / SRE for AI infra" template ships, revisit the AI/ML
   categorization of the four MLOps tools. Currently correct.

None block the round-11 catalog verdict for this session: the four
new entries land clean on the candidate they were designed for, the
integrity guard works in both directions, and Esme's redux is
materially stronger as a hiring signal than rounds 9 or 10.

**Round-11 catalog batch: validated against the canonical productionization
candidate. Ship it.**
