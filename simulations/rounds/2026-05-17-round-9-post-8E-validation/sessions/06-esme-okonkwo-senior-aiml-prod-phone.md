# Session 06 — Esme Okonkwo (Senior AI/ML Engineer, productionization, phone)

Round 9, 2026-05-17. First-ever end-to-end validation of the AI/ML
Engineer template against a **productionization-shaped** candidate.
Round-3 Vikram was library-author shape (LangChain experiments,
notebooks, fine-tuning) — that session was the canonical driver for the
Round-2 K2 fix that put `defaultScope: "author"` on every AI/ML library
catalog entry. Esme is the opposite shape: she **operates** these
libraries in production, doesn't author novel architectures, doesn't
publish to HuggingFace Hub. This session asks whether the K2 default
fits her, or whether the productionization shape needs its own
template-level scope override.

## 1. Persona inhabited

**Esme Okonkwo, 31.** Eight years total ML experience. Three years at a
Lagos-based AI startup (~40 engineers, customer-support copilot product
serving ~200 mid-market SaaS tenants). Prior five years at a UK research
lab (LSE-affiliated NLP group; she was the engineer who turned PhD
prototypes into deployable artifacts — never first-authored a paper).
Three years ago she pivoted intentionally away from the research-lab
shape: she likes shipping the inference stack at 99.5% SLO more than she
likes reading arXiv.

What she actually owns in 2026: a FastAPI inference service fronting a
Qdrant-backed RAG pipeline that serves three LLM providers (Anthropic
primary, OpenAI fallback, Bedrock for one regulated tenant). Weekly
fine-tunes of small distilled classifiers for routing/intent (~150M
params, HuggingFace Transformers); monthly base-model eval reruns via
Braintrust. Drift monitoring via Evidently AI on the classifier outputs
plus a custom faithfulness score over RAG generations. Feature store
(Feast) ~6 months old, still bedding in. CI/CD for models through a
custom-built model registry on top of S3 + MLflow.

Her depth claims are honest in a way Vikram's weren't:
- **Python**: deep. Owns the inference codebase end-to-end.
- **FastAPI**: deep (3 yr, she's the codeowner).
- **PyTorch**: working. Loads pretrained checkpoints, runs inference,
  occasionally fine-tunes a classification head. She has NOT written a
  custom `nn.Module`, hasn't touched the autograd internals, doesn't
  know what `torch.compile` does in 2.4+ beyond "it makes things
  faster, the team enabled it." **Operator scope on a library, not
  author.**
- **HuggingFace Transformers**: deep but operator — she fine-tunes
  small classifiers via `Trainer` and `peft`. She doesn't author new
  model classes; she picks one off the Hub and wires it into the
  pipeline.
- **LLM API SDK**: deep — Anthropic and OpenAI primary, knows the
  caching/streaming/tool-use/structured-output knobs cold.
- **Vector DB**: deep — Qdrant primary, also has shipped pgvector for
  a smaller tenant.
- **Docker**: deep — multi-stage builds for the inference image are
  her pull-request territory.
- **AWS**: operator. Bedrock + SageMaker inference endpoints + S3 +
  Lambda. Not architecture-track, not reviewer-shaped — she runs the
  cloud bits her service touches.

**Daniel Harper, 38.** London-based internal recruiter at a UK fintech
(consumer lending, ~600 engineers, three years into the org). His role
is hiring an **AI Engineer for production LLM applications** — the JD
explicitly says "we're not hiring researchers." He's done six TechVet
phone screens this week and is comfortable with the tool. He knows the
AI/ML template is the right pick. He has NOT screened a Vikram-shape
before (LangChain experimenter); his last three AI/ML screens have all
been productionization candidates, which is what the JD selects for.

## 2. Phone call — abbreviated

> D: "Hi Esme, thanks for making this work — I know Lagos to London is
> tight on the schedule. I'll do a quick stack pass, ten minutes flat,
> then wrap with role context."
> E: "Sounds good. I've blocked the hour either side, so no rush."

Daniel is on `/#/assess`. Landing pick was **AI / ML Engineer**
(`roles.ts:249-264`). Eight tech cards preloaded: python, pytorch,
huggingface-transformers, llm-api-sdk, vector-db, fastapi, docker, aws
(`roles.ts:252`). The 6 methodology chips render in the right rail —
`mlops / retraining-cadence / feature-stores / drift-detection /
llm-evals / rag-evaluation` (`roles.ts:256-263`). He selects the
**Senior** pill, types "Esme Okonkwo," picks **Productionization /
serving** in the path dropdown (added round-8 8E for AI/ML; he uses it).

**~0:30 — Python.** "Day-to-day Python version?" "3.12." "Depth?"
"Deep, owner of the inference service." Daniel types `3.12`, picks
**Deep**, scope-blank, last-used blank. Card: **Excellent**. Clean.
(~10 s.)

**~0:45 — FastAPI.** "FastAPI version?" "0.115 in prod, we're behind on
the bump but it's pinned." Types `0.115`. Hits the `0.110` tier:
**Excellent** (`technologies.json:572`). Depth deep. Scope-blank — FastAPI
has no `defaultScope`, so operator-implied, no friction. Clean.
(~12 s.)

**~1:00 — PyTorch. THE moment this session was built around.**

> D: "PyTorch version?"
> E: "Whatever the team locked — 2.4 I think. The platform team owns
> the base image."
> D: "Depth?"
> E: "Working. I load checkpoints, I run inference, I fine-tune the
> occasional classification head. I haven't written a custom module
> in five years and never in production."

Daniel clicks PyTorch, types `2.4`. Scope dropdown shows
**"— Use default: author"** (`TechCard.tsx:114-118`). He hovers, doesn't
click yet — types Working depth first. Card badge flickers, then settles.

What is rendered: **PyTorch 2.4 + working + scope=undefined → catalog
default scope `author` (`scoring.ts:251-254`).** The `applyScope` branch
at `scoring.ts:117-120` runs but doesn't fire — the author cap only
trips on Yellow→Green depth-lifts, and `working` depth doesn't lift at
all (`scoring.ts:39-44`). PyTorch 2.4 already matches the Excellent tier
on its own. Result: **Good** (Green), no cap, no italic strip.

So far so quiet. But Daniel pauses — he reads "Use default: author" and
the muscle memory from his last three productionization screens kicks
in. He says, half to himself, "She's not an author of PyTorch, she's
running it." He opens the scope dropdown and picks **Operator (runs in
prod)**. Card unchanged (Good still). ~7 seconds of tax. No verdict
movement, but the **report** now reads operator on the Summary's scope
column, which is the truth.

This is finding #1 forming in real time. He's overriding scope on a
card where the default didn't actually move the verdict. The tax is
defensive — paying for an over-claim that never happened.

**~1:30 — HuggingFace Transformers.**

> D: "Transformers — version, depth?"
> E: "5.2, deep. I fine-tune the small models — DistilBERT for intent,
> a quantized Mistral-7B for one tenant."

Types `5.2`. Hits `5.0` tier: **Excellent**
(`technologies.json:2359-2363`). Picks **Deep**.

`applyScope` at `scoring.ts:117-120` matters here. With deep depth,
`adjustForDepth` doesn't lift Green (already at Green; lift only applies
to Red/Yellow), so the author cap clause `baseColor === 'yellow' &&
adjusted.color === 'green'` is false. Verdict stays Green either way.

But the dropdown still reads **"Use default: author"** and Daniel
remembers Esme literally just said "I fine-tune the small models" —
which is closer to author-shape, actually. He hesitates. The fine-tuning
loop she described (`Trainer`, `peft`, LoRA configs she writes) IS
author-ish in scope. He leaves it on the default. ~5 seconds of
hesitation, zero clicks.

This is finding #2 forming: the operator/author boundary on
HuggingFace Transformers is genuinely ambiguous for a productionization
engineer who fine-tunes. Esme is operator on PyTorch (loads pretrained,
runs inference) but author-ish on Transformers (writes the fine-tuning
loop, picks the LoRA config, owns the training script). The catalog
default of `author` is correct for this one — Vikram-shape and
Esme-shape collapse to author here, just for different reasons.

**~2:00 — LLM API SDK (checklist).** Daniel walks the 14 services
(`technologies.json:2406-2463`). Esme ticks: openai-sdk, anthropic-sdk,
streaming, tool-use, structured-outputs, prompt-caching, embeddings,
batch-api, eval-harness, agents. That's 10/14 = 71% → **Good** (Green)
on the ≥66% threshold (`scoring.ts:470-472`). Skips google-genai
(no Vertex experience), azure-openai (not in her stack), vision (not
relevant to text copilot), fine-tuning (uses HF for that, not the API).
Depth deep. Daniel **overrides scope to operator** this time — saw the
"Use default: author" and made the call faster. ~6 seconds tax. The
verdict doesn't move (66%+ already Green; author cap on deep-lifted
Yellow→Green doesn't fire because the natural tier already cleared).
(~75 s for the whole card.)

**~3:30 — Vector DB (checklist).** 12 services
(`technologies.json:2479-2528`). Esme ticks: qdrant (primary),
pgvector (smaller tenant), hybrid-search (BM25 + dense), reranking
(Cohere rerank-3). 4/12 = 33% → **Yellow** (25–66% band). But she
also volunteers Faiss in dev — Daniel ticks faiss. 5/12 = 42%, still
Yellow. Coverage qualifies for the 6D depth-lift at 40%+
(`scoring.ts:495-503`), Esme is deep, senior — lift fires.
**Adjusted to Green.** Then `applyScope` runs with `author` default:
`baseColor === 'yellow' && adjusted.color === 'green'` — exactly the
condition `scoring.ts:118-120` traps. **Verdict caps back to Yellow,
`cappedFromColor: 'green'`.** Card label: **"Review / Probe (capped
from Good by author scope) — 5/12 services"**.

This is the **load-bearing moment**. The author default just stole an
honest Green from a deep productionization engineer who runs Qdrant in
production daily. Daniel reads it, reads the "Use default: author"
on the dropdown, and overrides to **Operator**. Card flips back to
**Good (lifted from Yellow by depth)**. ~9 seconds tax — longer because
he had to read the cap note, parse why the cap fired, then open the
dropdown.

This is exactly the round-9 hypothesized 30s tax materializing. (~95 s
for the whole card.)

**~5:10 — Docker.** `28.0`, deep, operator-implied (no defaultScope on
docker catalog entry). Excellent. (~10 s.)

**~5:25 — AWS (checklist).** Service-tag filter on AI/ML template is
`['general', 'data-ml', 'container']` (`roles.ts:255`) — surfaces
SageMaker + Bedrock alongside the general slice. Esme ticks: lambda,
s3, sagemaker, bedrock, cloudwatch, iam, ecs-fargate, ec2 (some of her
team's training runs). That's 8 ticks. The filtered service set has
~14 services in the surfaced subset. 8/14 = 57% → **Yellow**. Deep
depth, senior. AWS `defaultScope: "operator"` (`technologies.json:1925`)
— operator-implied, no scope override needed. 6D lift: 57% > 40%
floor, deep, senior — qualifies. **Adjusted to Green.** Author-cap
check doesn't apply (scope is operator). Verdict: **Good (lifted from
Yellow by depth) — 8/14 services**. Clean. (~80 s.)

**~6:45 — Methodology chips.** Daniel reads the 6 chips. Esme ticks
all 6 unprompted as he names them: mlops, retraining-cadence,
feature-stores, drift-detection, llm-evals, rag-evaluation. She
volunteers free-text: "Braintrust" (Daniel types into the free-text
input), "Evidently AI," "Feast." Three named-only entries.

She then says — and this is a finding — "Also we shadow-deploy new
classifier versions for two weeks before promoting." Daniel reaches
for `shadow-deployment` chip, doesn't find it. Free-texts it. Fourth
named-only. Says, "And the production sampled evals are basically a
canary — we sample 5% of real traffic through the candidate model and
score against the baseline." Daniel free-texts `canary-for-ml`. Fifth
named-only.

(~8:30 by now.)

**~8:45 — Wrap.** Daniel reads mandate, drops the role context line,
clicks **Continue to Summary**.

## 3. Post-call — report read

Daniel scrolls Summary. Headline cards:
- **Excellent / Good:** 5 (python, fastapi, pytorch, huggingface,
  docker)
- **Lifted from Yellow:** 2 (vector-db, aws)
- **Capped from Green:** 0 (the cap on vector-db was overridden mid-call)
- **Scope-overrides applied:** 2 (pytorch and vector-db, both
  author→operator)
- **Methodology chips ticked:** 6/6
- **Free-text methodology:** 5 entries (Braintrust, Evidently AI,
  Feast, shadow-deployment, canary-for-ml)
- **Named-only catalog gaps:** Qdrant (catalog service, not a tech),
  Braintrust, Evidently AI, Feast

He reads the Strengths section. RAG pipeline ownership reads as Good
on vector-db because of the mid-call override. PyTorch reads Good but
the operator scope label is on it — which is honest and useful. The
Summary's "Scope dropdown overridden from catalog default" hint section
correctly lists 2 entries.

The report is honest. But Daniel spent ~22 seconds total on scope
overrides where the verdict outcome was either unchanged (pytorch,
llm-api-sdk) or restored from a cap that never should have fired
(vector-db). On a 10-min phone budget, that's 3.7% — meaningful but
not catastrophic. The single most expensive override was vector-db at
9 s because the cap fired visibly and required reading + diagnosis +
override.

## 4. Findings

### Finding #1 (LOAD-BEARING) — Author default is shape-mismatched for productionization candidates

The Round-2 K2 fix placed `defaultScope: "author"` on six AI/ML
catalog entries (pytorch, tensorflow, langchain, huggingface-transformers,
llm-api-sdk, vector-db; verified `technologies.json:1780, 1816, 1852,
2354, 2396, 2469`). This was a response to Vikram round-3 — a
library-author shape where deep self-claims on thin coverage were
inflating verdicts through depth lifts. The fix is correct for Vikram.

But it is shape-mismatched for productionization candidates. Esme is
the canonical opposite shape:

| Library                 | Esme's actual scope | Catalog default | Override needed? |
|-------------------------|---------------------|-----------------|------------------|
| PyTorch                 | operator            | author          | yes (defensive)  |
| HuggingFace Transformers| author-ish          | author          | no (correct)     |
| LLM API SDK             | operator            | author          | yes              |
| Vector DB               | operator            | author          | **yes (load-bearing — cap fired)** |

Three of four AI/ML library cards needed scope overrides. One of those
overrides (vector-db) was load-bearing because the author cap actually
fired on a depth-lifted Green and stole the verdict from a deep
production engineer. Two were defensive (no verdict movement, but
needed for report honesty on the scope column).

Tax: ~22 s total. On a 10-min budget that's 3.7%. Not enormous, but
when stacked against other taxes (search-add for named-only entries,
methodology free-text entry), it compounds.

**Proposed fix:** add a productionization-shape default to the AI/ML
template via `techScopes`:

```ts
techScopes: {
  pytorch: 'operator',
  'huggingface-transformers': 'operator',  // see Finding #2 caveat
  'llm-api-sdk': 'operator',
  'vector-db': 'operator',
}
```

This follows the K2 template-overrides-catalog precedent that already
ships on SA / SRE / Backend / Security / Data / AppSec templates. The
AI/ML template is the **only template where the catalog defaults push
the *opposite direction* from the template's most common user.**

The counterargument — that the AI/ML template historically served both
library-author (Vikram) and productionization shapes and we shouldn't
pick one — doesn't hold post-round-8 8E. The 8E path-dropdown for AI/ML
now includes `productionization-serving` as one of the explicit options
(per the cast brief; would need to confirm in `Assessment.tsx`). The
productionization shape is the **declared first-class** AI/ML
candidate path. Vikram-shape recruiters can still manually override
to author per card if needed — they were doing that before K2 anyway.

**Severity:** load-bearing. Recommend ship.

### Finding #2 — HuggingFace Transformers is genuinely scope-ambiguous

Even for Esme, the HuggingFace scope claim is honestly ambiguous.
She **uses** Transformers as a library (operator-shape: load, run,
serve) **and** writes the fine-tuning loop (author-shape: writes the
code that uses it). The catalog default of `author` fits the
fine-tuning half of her work cleanly.

This matters for the Finding #1 fix: if we set the AI/ML template's
`techScopes` to push huggingface-transformers to operator, we'll
mis-shape candidates who fine-tune. Recommend: **set pytorch /
llm-api-sdk / vector-db to operator at the template level, but
LEAVE huggingface-transformers at catalog default `author`.** That
correctly handles "I write training loops" (which Esme does and which
productionization candidates routinely do) and still lets a pure-
operator shape (e.g. someone who only uses pretrained inference
endpoints from HF) override down to operator manually per card.

**Severity:** design subtlety — affects the precise fix, not the
need for the fix.

### Finding #3 — Catalog gaps in MLOps tooling

Three named-only entries volunteered: **Braintrust** (LLM evals),
**Evidently AI** (drift detection), **Feast** (feature store).
Plus Qdrant is only available as a vector-db checklist service, not a
catalog tech in its own right.

For a productionization shape, these are not edge cases — they're the
*center of gravity* of the role. A senior AI/ML engineer interviewing
for a London fintech in 2026 will name at least two of these within a
10-min phone screen. Current state: they vanish into a free-text bag
that's display-only on the report.

Comparable catalog gaps from prior rounds (Pooja's OpenLineage,
Lars's Crossplane, Akira's Pact) were sized similarly and have all
been candidates for catalog promotion. Recommend: add Braintrust /
Evidently / Feast / Langfuse as AI/ML catalog entries (vetMode:
checklist; small service lists). Decline Qdrant as a standalone — it's
correctly a vector-db service per the round-3 design.

**Severity:** non-blocker but cumulatively meaningful for 2026 senior
AI/ML productionization screens.

### Finding #4 — Methodology chips miss two productionization-canonical practices

The 6 chips (`mlops / retraining-cadence / feature-stores /
drift-detection / llm-evals / rag-evaluation`) cover the methodology
core well. But Esme volunteered two practices that didn't have chips:

- **Shadow deployment** (two-week pre-promotion shadow of new
  classifier versions) — canonical MLOps risk-reduction practice.
- **Canary-for-ML / sampled production evals** (5% traffic
  through candidate model, scored against baseline) — emerging
  standard practice for online LLM evals in 2026.

Both fell into free-text. Recommend: replace `mlops` (which is a
catch-all that everyone ticks regardless of actual practice) with two
narrower chips: **shadow-deployment-ml** and **canary-rollout-ml**.
Alternatively split `rag-evaluation` into `retrieval-eval` (recall@k /
MRR) and `generation-eval` (faithfulness / groundedness) — Esme runs
both as separate practices.

**Severity:** template chip polish. Recommend a focused refresh.

### Finding #5 — "Use default: author" dropdown copy is well-designed but lossy under time pressure

The Round-2 K2 UX choice to surface the default in the dropdown
(`TechCard.tsx:114-118`) reads well in a calm review — "I see the
default, I know what scope is in play without expanding." But under
phone-call cognitive load, Daniel's eye skipped over the **"Use
default: author"** dropdown text on PyTorch and only noticed when he
explicitly thought "wait, she's not an author." Then he overrode
defensively. On vector-db he didn't notice until the **cap fired
visibly** with the italic strip — that's what made him diagnose.

The italic strip with `(catalog default; override in Scope dropdown
above)` (`TechCard.tsx:162`) is the load-bearing UI affordance — it
**only** appears when the cap actually fires. The dropdown surface
of "Use default: X" is too quiet to drive action proactively.

**Severity:** UX nuance — informs whether the Finding #1 fix is
"required" (recruiter can't be relied on to override) or "polish"
(recruiter notices and adapts). Argues toward "required."

## 5. Round-9 verdict

**The AI/ML template needs a productionization-shape `techScopes`
override.** This is the headline finding of round 9 session 06.

Specifically:

```ts
// roles.ts, ai-ml template
techScopes: {
  pytorch: 'operator',
  'llm-api-sdk': 'operator',
  'vector-db': 'operator',
  // huggingface-transformers: intentionally NOT overridden — author
  // default fits the fine-tuning loop shape that productionization
  // candidates routinely own.
},
```

Rationale (in priority order):
1. Three of four AI/ML library overrides Esme manually applied were
   correct, and one was load-bearing (vector-db cap fired and stole an
   honest Green).
2. The AI/ML template is the only template where catalog defaults push
   the **opposite direction** from the template's declared first-class
   candidate shape (post-8E `productionization-serving` path).
3. Pre-round-2 K2, Vikram's library-author shape over-credited. K2 fixed
   that. But K2 over-corrected against the productionization shape that
   round-9 just put on the dock for the first time. The
   template-level `techScopes` is the precise way to undo the
   over-correction without disturbing K2's protection for the
   library-author shape (catalog default still fires on Custom template
   AI/ML adds, and on huggingface-transformers within the AI/ML
   template).
4. The 22 s scope-override tax compounds with the named-only tax
   (Braintrust / Evidently / Feast / Qdrant) and the missing-chip
   tax (shadow-deployment / canary-ml). Each is individually small;
   together they squeeze a 10-min budget noticeably.

Secondary recommendations (lower priority, queue for batch ship):
- Add Braintrust / Evidently / Feast (and Langfuse) as AI/ML catalog
  entries with checklist vetMode.
- Refresh methodology chips: replace the catch-all `mlops` with
  `shadow-deployment-ml` and `canary-rollout-ml`; consider splitting
  `rag-evaluation` into retrieval + generation eval as two chips.

Honest counter-position considered: should we just trust the recruiter
to override per-card? In principle yes — Daniel did it correctly all
three times. But (a) the recruiter only *noticed* the load-bearing case
when the cap visibly fired on Vector DB, meaning the defensive
overrides on PyTorch / LLM-API-SDK were happenstance-luck, and (b) the
template-level fix is a single line of config that converts a
22-second per-call tax for *every* productionization candidate into
zero. That's a clear win.

Round 9 verdict: **first-ever productionization validation of AI/ML
template surfaces one load-bearing structural finding (template-level
techScopes for AI/ML) and three queue-for-next-batch findings (catalog
gaps, chip refresh, dropdown-copy UX).** The template is fundamentally
sound — the 6 methodology chips fit, the 8 preloaded techs all
applied, the path dropdown post-8E carries the right options. The
single structural defect is fixable in one PR.
