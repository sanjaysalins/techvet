# Session 05 — Vikram-redux (Senior AI/ML library-author, Custom template, phone)

Round 10, 2026-05-17. Counterfactual validation for the round-2 K2
fix (`defaultScope: 'author'` on AI/ML catalog libraries) against
round-9 9A which added template-level `techScopes` on the `ai-ml`
template (`pytorch / llm-api-sdk / vector-db` forced to operator for
productionization candidates). The structural question: **did 9A
regress K2's protection for the library-author shape when screened
via Custom?** Cast brief predicted no — 9A is template-level; Custom
has `techIds: []` and no `techScopes`. This session walks Vikram
redux end-to-end through Custom to confirm.

## 1. Persona inhabited

**Vikram Rao, 32.** Seven years at a UK research-y AI lab (Cambridge-
adjacent, ~30 researchers, 8-12 papers/yr at NeurIPS / ACL / ICML).
PhD in NLP. Pure library-author shape — writes the code that *uses*
PyTorch and Transformers; doesn't deploy inference services. His
Python lives in `~/experiments/2026-paper-3/notebooks/`, not in a
Docker image with a FastAPI handler.

Current work: novel sparse-attention architecture for long-context
retrieval (authors the `nn.Module` from scratch, DDP across 8 A100s,
weights checkpointed to HF Hub under the lab's org); LoRA fine-tune
of a 7B base with custom curriculum schedule; LangChain agent for a
paper-replication harness. Methodology is paper-driven —
reproducibility discipline (deterministic seeds, frozen env YAML),
ablation grids, W&B for tracking. Has written a Triton sparse-
attention kernel + a couple of custom CUDA kernels for the inner
loop.

Honest depth claims: **PyTorch 2.4 very-deep author** (novel
architecture from scratch); **HF Transformers 5.2 very-deep author**
(LoRA + patched `Trainer` for curriculum); **LLM API SDK deep** but
narrow (OpenAI + Anthropic for replication harness, knows streaming
/ structured output / tool use; no batch, vision, Vertex, Azure);
**Python / Jupyter / pandas deep**; **Vector DBs not used** (raw
embedding tensors in-memory, Faiss indices for baselines);
**LangChain working, six weeks of LangGraph for one prototype**; W&B
/ Triton / custom CUDA all volunteered.

**Naveen Subramanian, 36.** London external recruiter at a boutique
research-shop agency. Hiring for a London AI research lab (LLM-
architecture team, looking for a model author for a long-context
research line). ~40 TechVet calls under his belt. Was told "library-
author, not productionization." Naveen has read the 9A release notes
and knows the AI/ML template is now operator-shape-biased — his
deliberate choice for Vikram: **Custom template**, so the catalog
defaults flow without the template-level operator override.

## 2. Phone call — abbreviated

Landing → **Custom** (`roles.ts:417-421`). No preload, empty
assessment, no chip set. Senior pill, name "Vikram Rao," mandate
free-text: "Library-author AI researcher — long-context attention,
model authoring, paper-replication harness."

**~0:30 — PyTorch.** Naveen types "PyTorch" in search
(`TechSearch.tsx`), match, click. The search-add path
(`Assessment.tsx:255`, `onAdd={addTech}`) calls `addTech(techId)`
with no scope argument; store creates item with `scope: undefined`
(`assessment.ts:86`). Types `2.4`, **Very deep**. Scope dropdown
default reads **"— Use default: author"** (`TechCard.tsx:114-118`).
Leaves it.

Under the hood (`scoring.ts:251-254`): scope undefined + catalog
defaultScope=author → effective scope=author. Tier 2.4 → Excellent
(`technologies.json:1782-1787`). `adjustForDepth(green, very-deep)`
→ no lift (already severity 0). `applyScope` author branch: lift
clause is false (nothing lifted). Result: **Excellent**, silent.
~12 s.

**K2 validation point #1**: catalog default applied (dropdown surface
declares it), verdict honest because natural tier cleared Green.
Author cap is silent guardrail — fires only when depth-lift would
over-credit a Yellow.

**~0:50 — HuggingFace Transformers.** Search → match → `5.2`, **Very
deep**, default scope=author. defaultScope=author
(`technologies.json:2354`). Tier 5.0 → Excellent. Same flow — no
lift, no cap, **Excellent**. ~10 s. Author scope surfaces on the
report column, which is *more* informative for Vikram than for Esme
(Esme uses `Trainer` off-the-shelf; Vikram patches it). Both correct.

**~1:10 — LLM API SDK (checklist).** Search → match → 14-service
checklist. Vikram volunteers: openai-sdk, anthropic-sdk, streaming,
tool-use, structured-outputs, embeddings, eval-harness. Skips
google-genai, azure-openai, vision, prompt-caching, fine-tuning,
batch-api, agents. **7/14 = 50%** → Yellow (`scoring.ts:480-482`).
Depth=**deep**, senior, scope default=author.

6D depth-lift check: ratio ≥ 0.40 ✓, depth ∈ {deep, very-deep} ✓,
seniority !== junior ✓ → **all qualify**. `adjusted = { color: green,
adjusted: true, direction: 'lifted' }`. `applyScope(yellow, {green,
true, lifted}, author)`: cap clause at `scoring.ts:118-120` is
**true**. **Cap fires.** Color reverts to yellow,
`cappedFromColor='green'`, `scopeCapped=true`.

Card label: **"Review / Probe (capped from Good by author scope) —
7/14 services"** (`scoring.ts:407-409`). Italic strip fires
(`TechCard.tsx:158-164`):

> Verdict capped by scope — author scope can't earn the higher tier
> on operating signals alone (catalog default; override in Scope
> dropdown above).

**K2 validation point #2 — the load-bearing moment.** Cap fired
exactly as designed: depth-lifted Yellow→Green from a library-author
claim caught and reverted. Without K2, this would have read as a
confident production-ready Green on 50% coverage + self-reported
deep — the exact Vikram-round-3 over-credit pattern K2 was built to
defend.

Naveen reads the strip, says "fair, you're not running an inference
service," moves on. ~5 s read-tax, zero override tax. ~85 s for the
whole card.

Note: 9A did NOT regress this. If Vikram had picked AI/ML template,
9A would have forced scope=operator on llm-api-sdk at preload —
research-shape would have over-credited to Green (operator + 6D lift
+ no cap). That would have been the regression. On Custom, 9A's
`techScopes` is inert; catalog default flows; verdict honest. **K2
still serves.**

**~2:35 — Vector DB.** Search → match → Vikram says "I work with
raw embedding tensors, no service." Naveen ticks **notUsed**;
excluded from buckets/radar (`scoring.ts:234-244`). Vikram
volunteers Faiss — no catalog match, **named-only** via the
no-results CTA (`TechSearch.tsx:51-57`). ~18 s.

**~3:05 — Jupyter / pandas / Python.** All search-add. Jupyter and
pandas carry catalog defaultScope=author (`technologies.json:3590,
3674`); Python has no defaultScope so falls through to operator-
implied. All three: natural Green tier, deep depth, no lift on Green,
no cap. Three clean **Excellents**. ~30 s combined.

**~3:45 — LangChain.** Catalog match (`technologies.json:1849-1872`),
defaultScope=author. 10-service checklist. Vikram ticks 3:
langgraph-agents, tool-use, structured-output. 3/10 = 30% → Yellow,
**below 40% floor** for 6D lift (`scoring.ts:507`). Depth=working
(six weeks of prototype). No lift attempted, no cap to fire. Stays
**Review / Probe — 3/10 services**. Honest for a six-week
prototype. ~25 s.

**~4:15 — Named-only volunteers.** "Weights & Biases" → no catalog
match, named-only. "Triton" → named-only. "CUDA kernels" → named-
only. ~18 s combined.

**~4:40 — Methodology section.** No template = no chips
(`Assessment.tsx:393`, `methodologyChips ?? []`). 6B free-text
fallback renders the hint (`Assessment.tsx:445-449`):

> No template chips — type any methodology / practice and press Enter
> to add (e.g. release automation, A/B feature flags, MVVM, threat
> modelling).

Hint examples are FE / Mobile / Security flavored — none anchor on
research/AI shape. Naveen knows the shape anyway and types: "paper-
driven experiments," "reproducibility discipline," "ablation grids,"
"deterministic seeds + frozen env," "weight sharing." Five entries,
~35 s.

**~5:25 — Wrap.** Mandate read-back, role context line, **Continue
to Summary**. ~6.5 min total — inside 10-min budget.

## 3. Post-call — report read

Summary headline:
- **Excellent / Good**: 5 (python, pytorch, huggingface, jupyter,
  pandas).
- **Review / Probe**: 2 (llm-api-sdk capped from Green, langchain
  natural Yellow).
- **Scope-capped (Green-base)**: 1 — llm-api-sdk
  (`cappedFromColor='green'`, counted per `Summary.tsx:74` filter).
- **Skipped**: 1 (vector-db notUsed).
- **Named-only**: 4 (Faiss, W&B, Triton, CUDA kernels).
- **Methodology**: 5 free-text entries.
- **Scope overrides applied by recruiter**: 0. Every scope dropdown
  left on catalog default.

The report reads as a **library-author shape**, cleanly. Strengths
lead with PyTorch + Transformers + Jupyter + pandas, all author-
scope on the report column. Review/Probe shows LLM API SDK
explicitly capped from Green by author scope — the correct story for
a research-lab head ("LLM SDK use is research-shape; even his
deep-on-50%-coverage doesn't earn top tier on its own — non-blocker
for research role"). LangChain at 3/10 untouched depth. Named-only
strip carries the load-bearing author signal (Triton + CUDA-kernel
author = exactly what the lab head will care about, and no template
captures it).

**Headline reads library-author shape. K2 doing its job.**

## 4. Findings

### Finding #1 (K2 STILL SERVES — VALIDATION) — Catalog defaults flow cleanly on Custom post-9A

K2's `defaultScope: 'author'` on six AI/ML catalog libraries
(`technologies.json:1780, 1816, 1852, 2354, 2396, 2469`) continues
to serve library-author shape when screened via Custom.

Validated this session:
- **PyTorch 2.4 + very-deep + author**: natural Green, no cap,
  honest Excellent.
- **HF Transformers 5.2 + very-deep + author**: same shape, honest
  Excellent.
- **LLM API SDK 7/14 + deep + senior + author**: 6D would have
  pushed Yellow→Green; **author cap fires** (`scoring.ts:118-120`),
  reverts to Yellow with `cappedFromColor='green'`. Load-bearing
  moment — without K2 this reads as confident production-shape Green
  on a research-shape candidate.
- **LangChain 3/10 + working + author**: 30% < 40% floor — no lift
  attempted, no cap to fire. Natural Yellow.
- **Vector DB notUsed**: catalog default never engages (skipped
  branch fires first).

9A's mechanism is template-level only: `Landing.tsx:31` forwards
`role.techScopes?.[t]` inside `role.techIds.forEach`, which is a
no-op for Custom (`techIds: []`). Search-add via `Assessment.tsx:255`
passes only techId, never a scope arg → every mid-call add lands
`scope: undefined` → catalog defaultScope flows per `scoring.ts:
251-254`. The integrity test at `integrity.test.ts:662-665` pins
this: "templates without techScopes preserve pre-K2 behavior."
Custom is in that set.

**Severity:** validation — K2 + 9A coexist correctly. No fix needed.

### Finding #2 (NEW — at-risk) — Custom-template time-tax on phone: ~120s of input mechanics

Vikram's session ran ~6.5 min, inside budget. But the input
mechanics:
- 8 search-add cycles (pytorch, huggingface, llm-api-sdk, vector-db,
  jupyter, pandas, python, langchain) at ~6-10s each = ~60s.
- 4 named-only entries (Faiss / W&B / Triton / CUDA kernels) at ~6s
  each = ~25s.
- 5 free-text methodology entries at ~7s each = ~35s.

Total: **~120s on input mechanics** — 20% of a 10-min budget. Esme
(AI/ML template) dispatched **zero** search-adds on core stack
because 8 techs preloaded; her tax was scope overrides (~22s round
9, projected ~0s post-9A round 10).

Two directions:
1. **"Starter chip" for Custom**: small set of buttons offering
   common bases ("Common base: react + ts + python + postgres +
   docker + aws," "Research base: python + pytorch + huggingface +
   jupyter + pandas + numpy," "DBA base: sql + plsql + postgres +
   mysql"). Recruiter picks → preload → adds/removes from there.
   True blank-slate Custom stays available for the rare "no preset"
   case.
2. **Faster search-add UX**: tab-to-select on first match, comma to
   add another, Enter to confirm. Keyboard through 5 techs in ~15s
   instead of ~60s.

Direction 1 addresses the broader "no template fits" problem (Owen
round 6, Theo round 10 likely). Direction 2 only solves typing
mechanics. **Queue if round 10 session 06 (Theo) replicates the tax
shape.**

**Severity:** at-risk for phone time-budget. Vikram fit in 6.5 min
because Naveen knows what to search for. The junior-recruiter-on-
unfamiliar-JD case is the failure mode.

### Finding #3 (NEW — polish) — 6B free-text methodology hint copy biases FE/Mobile/Security

`Assessment.tsx:446-448` hint examples: "release automation, A/B
feature flags, MVVM, threat modelling." Three mobile-shaped, one
security-shaped, zero anchoring a research-shape recruiter on what
to capture for a library-author. Naveen got there because he knows
the shape; a junior recruiter might not capture "reproducibility
discipline" or "ablation grids" — the exact signals that
differentiate Vikram from a confident-but-shallow self-claimer.

Fix: expand examples to span shapes — "e.g. release automation, A/B
feature flags, threat modelling, **reproducibility discipline,
experimental design, contract testing**." Six examples covering
Mobile / Security / Research / Backend.

**Severity:** polish. 6B works end-to-end (Naveen used it cleanly);
the example copy under-serves the research-shape Custom case.

### Finding #4 (NEW — polish) — "Use default: author" dropdown copy reads cleanly when author IS the right answer; lossy when ambiguous

Inverse of round-9 finding #5 (Esme-side, where the copy was too
quiet under override pressure). For Vikram, where author *is* the
right answer, the dropdown reads cleanly — zero override tax. But a
junior recruiter who doesn't know what "author" means in
scope-of-use context might read "Use default: author" as a guess
at candidate self-description ("are they the author? of what?")
rather than the intended "writes code that uses the library, vs.
operating it as a service."

Proposed copy: "— Use default: author (writes code that uses it)"
— symmetric with `scopeLabel()` outputs (`scoring.ts:589-596`).
Verbose but disambiguating across recruiter experience levels.

**Severity:** polish. Doesn't regress anything; helps junior
recruiters on cross-domain screens.

### Finding #5 (NEW — minor, cumulative) — Catalog gaps in research-shape tooling

Vikram volunteered 4 named-only entries (Faiss, W&B, Triton, CUDA
kernels). For a research-shape AI candidate at a research lab these
aren't edge cases. W&B is the daily experiment tracker for ~70% of
academic shops; Triton + CUDA-kernel author signal differentiates
top-tier model authors.

Two-track:
- **Add as checklist-mode catalog**: W&B, MLflow, ClearML —
  experiment trackers, modest scope, parallels Esme's round-9
  productionization-side catalog gaps (Braintrust / Evidently /
  Feast / Langfuse).
- **Stay named-only**: Triton + custom CUDA. They're skill
  categories not techs; the named-only strip is actually useful
  signal here, not friction.

**Severity:** queue-for-next-batch with the round-9 AI/ML catalog
adds. Single batch.

## 5. Round-10 verdict

**K2 catalog default still serves the library-author shape on Custom
template post-9A. Zero regression.** This was the headline
counterfactual question for round 10 session 05, answered cleanly:
9A's template-level `techScopes` on `ai-ml` does not leak into Custom
or any other template, because (1) `roles.ts:417-421` Custom has
`techIds: []` so the Landing.tsx forEach is a no-op; (2)
`Assessment.tsx:255` wires search-add via `onAdd={addTech}` with no
scope arg, so every mid-call add inherits catalog defaultScope; (3)
`integrity.test.ts:662-665` pins this invariant explicitly.

The load-bearing K2 moment fired exactly once — LLM API SDK at 7/14
+ deep + senior, where 6D would have pushed Yellow→Green and the
author cap caught it. Without K2, that reads as confident
production-shape Green for a research-shape candidate with 50%
coverage. Cap fired silently (italic strip), no override tax,
report's Scope-capped headline counted correctly.

Vikram's report headline reads library-author-shape: 5 Green
(author-scope on report column), 1 capped-from-Green by author
scope (correctly), 1 natural Yellow (LangChain 3/10), 1 skipped
(vector-db), 4 named-only (Faiss / W&B / Triton / CUDA kernels). A
research-lab head reading this gets the right shape on first glance.

Round 10 session 05 result: **Safe**. Four findings queue for batch:
- **F2 (at-risk if Theo replicates):** Custom time-tax ~120s on
  input mechanics. Starter-chip or faster-search-add UX.
- **F3 (polish):** 6B hint copy bias toward FE/Mobile/Security.
- **F4 (polish):** Dropdown default copy disambiguation for junior
  recruiters.
- **F5 (queue with round-9 catalog adds):** W&B + MLflow + ClearML
  as experiment-tracker checklist entries.

The architectural split is doing its job: catalog-level defaults
(K2: protects the average-shape the catalog can name) and template-
level overrides (9A: matches the declared-shape the template
signals). Each does what it was built for; neither leaks into the
other's territory. **K2 + 9A coexist correctly.**
