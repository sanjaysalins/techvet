# Session 03 — AI/ML Engineer (RAG & Agent Systems), Phase 1 JD extraction audit

**Round:** 13, JD-extraction Phase 1 rules-based validation
**Date:** 2026-05-24
**Fixture:** `fixtures/03-ai-ml-engineer-rag.md` (Toronto legal-tech, 9-person AI eng team, Pinecone-backed RAG over 4M case-law docs + LangGraph contract-redline agent)
**Result under test:** `results/03-ai-ml-engineer-rag.json` (23 techs)
**Catalog under test:** 128 entries, post-2.0 refresh; AI/ML catalog includes `langchain`, `langgraph`, `llamaindex`, `agno`, `pydantic-ai`, `dspy`, `braintrust`, `langfuse`, `huggingface-transformers`, `llm-api-sdk`, `vector-db`, `pytorch`, `tensorflow`, `scikit-learn`, `numpy`, `pandas`, `jupyter`

---

## 1. Persona inhabited

I'm a senior technical recruiter on the LLM/RAG/agents desk — five years of
placing AI engineers into Series-B-through-public stacks. I open TechVet,
paste this JD into the extractor, and the screen I see next is the
assessment grid pre-loaded with the 23 techs the rules-based pass picked
up. My question is operational, not theoretical: when the candidate
dials in 90 seconds from now, is this card-set sensibly close to what
the hiring manager actually screens against? Each card I have to
manually remove or add is a tax on the 10-minute call. I will flag
false positives I'd uncheck, false negatives I'd type in, and any
cards I'd want re-categorized before dialing.

---

## 2. The extraction at a glance

**23 techs, sorted by category:**

- **AI/ML (15):** Braintrust, DSPy, Hugging Face Transformers, JupyterLab/Notebooks, LangChain, Langfuse, LangGraph, LlamaIndex, LLM API Integration (OpenAI + Anthropic), NumPy, pandas, PyTorch, scikit-learn, TensorFlow, Vector Databases (RAG / Pinecone / Weaviate / Qdrant)
- **Backend (1):** FastAPI
- **Cloud (1):** AWS
- **Database (1):** PostgreSQL (matched on "postgres" inside "RDS Postgres")
- **DevOps (3):** Docker, GitHub Actions, Kubernetes
- **Language (1):** Python
- **Testing (1):** pytest

15 of 23 in AI/ML is the right shape for an AI engineer JD. The card-set
is dense at the top (where the screen needs depth) and thin elsewhere
(where one-question disposition is fine).

---

## 3. Findings

### F1. [WORKING AS INTENDED] Core RAG/agents stack lands clean

LangChain, LangGraph, LlamaIndex, Pinecone (via `vector-db`), Braintrust,
LangFuse, DSPy — every named tool in the LLM-ecosystem core lands as a
catalog hit with no aliasing gymnastics. This is the strongest evidence
that the 2.0 catalog refresh's AI/ML expansion (`langgraph`, `llamaindex`,
`braintrust`, `langfuse`, `dspy`, `pydantic-ai`, `agno`) was correctly
scoped — the JD names them by canonical name and the catalog catches
them. **Severity: working as intended.**

### F2. [WORKING AS INTENDED] `vector-db` consolidates 4 vendor mentions

Pinecone / Weaviate / Qdrant / pgvector are all listed in the JD as
"pick a vector DB" alternatives. The catalog deliberately holds one
generic `vector-db` entry and aliases all four to it (`aliases.ts:51-60`).
Result: one card surfaces with `matched: ["RAG", "pinecone", "weaviate",
"qdrant"]`. This is exactly the recruiter-useful behaviour — I don't
want four near-duplicate cards cluttering the screen; I want one card
that prompts "which vendor have you shipped?". **Severity: working as
intended.** (Caveat: pgvector wasn't in the `matched` array — see F8.)

### F3. [WORKING AS INTENDED] `llm-api-sdk` catches OpenAI + Anthropic

The JD says "OpenAI + Anthropic APIs" and the result has `llm-api-sdk`
matched on `["OpenAI", "Anthropic"]`. The aliases include `openai api`
and `anthropic api` so this catches both the bare-name form and the
"OpenAI API" form. Good — this is the single most important card for
this role and it surfaced correctly. **Severity: working as intended.**

### F4. [BLOCKING for Phase 1, EXPECTED at the harness level] TensorFlow + Keras + PyTorch are explicit false positives

The JD has a dedicated "Not relevant" section:

> Not relevant
> - PyTorch model training from scratch (we don't train)
> - TensorFlow / Keras (we don't use these)

All three are extracted. `tensorflow` matches on both "TensorFlow" and
"keras" (the `keras` alias on the `tensorflow` entry). `pytorch` matches
on "PyTorch". A recruiter pasting this JD and walking the card-set as
delivered would interview the candidate against three frameworks the
hiring manager has explicitly excluded — burning ~3 minutes of a
10-minute call on dead questions.

**This is the single strongest argument for Phase 2 LLM scope in the
entire fixture corpus.** No regex pass can resolve "Not relevant:
PyTorch model training from scratch (we don't train)" without
sentence-level understanding. The "Must have" line *also* names PyTorch
("Familiarity with at least one of: PyTorch, HuggingFace transformers,
scikit-learn") — so PyTorch is genuinely ambiguous and a context-aware
extractor needs to surface it with a note like "named as nice-to-have,
explicitly excluded from training scope". TensorFlow + Keras are clean
removes — they appear *only* in the exclusion list.

**Severity: ✗ blocking for any Phase 1 user-facing copy that doesn't
warn the recruiter to scan for exclusion sections.** As a Phase-2
priority, this is P0.

### F5. [WORKING AS INTENDED] `jupyter` match on "Notebooks" is contextually inverted

The catalog name "JupyterLab / Notebooks" splits on `/` and matches the
JD's phrase "**not just notebooks**" in the must-have line:

> 3+ years in production ML or AI engineering (not just notebooks)

This is a textbook Phase 1 context-blindness case: the JD uses the word
"notebooks" pejoratively (i.e. *don't* bring me a notebook person), and
the extractor reads it as a positive signal. A recruiter would
immediately uncheck this card.

**Severity: ⚠ small** at the Phase 1 level — it's a single uncheck and
Jupyter is a defensible card in any AI/ML screen anyway, so the harm is
low. **Phase 2 priority: medium.** Context-aware extraction should
recognize negated proximity ("not just notebooks").

### F6. [⚠ small] "Hugging Face transformers" matched as one term, no `transformers` standalone

The JD writes "HuggingFace transformers" (no space). The
`huggingface-transformers` entry catches it via the `huggingface` alias.
Result correctly surfaces one card. No double-counting. Working as
intended — note only because a future catalog edit that adds a separate
`transformers` library entry would need an alias guard.

### F7. [⚠ small] `postgresql` matched on "RDS Postgres" — defensible, slightly ambiguous

The JD names AWS Bedrock + S3 + RDS Postgres as the cloud layer. The
extractor surfaces a `postgresql` card matched on "postgres". For a
RAG/agents role this is mid-relevance — the candidate touches Postgres
via RDS, possibly via pgvector if they evaluate that vector-DB option,
but Postgres ops depth isn't the job. **Card stays; depth gets set to
"working" not "deep" during the screen.** Severity: ⚠ small, no
action.

### F8. [⚠ small] `pgvector` named in JD but doesn't appear in matched terms

The JD literally writes "Pinecone / Weaviate / Qdrant / pgvector". Pinecone,
Weaviate, Qdrant all surface via `vector-db` aliases — but pgvector is
**not** in the `vector-db` alias list (`aliases.ts:51-60`). The catalog
does mention pgvector as a service inside `vector-db.services` (`technologies.json:2599`)
and inside the Postgres extensions service (`technologies.json:1114`), but
the JD-extractor only walks catalog `name` + top-level aliases, not
nested service IDs. **Severity: ⚠ small.** Add `pgvector` to the
`vector-db` aliases — it's a one-line catalog hit that should
surface alongside the other three vendors. (Recruiter wouldn't notice
because `vector-db` already surfaces; but the matched-terms display
would read more honestly.)

### F9. [⚠ small to ✗ blocking] "Pydantic-AI" misses the catalog entry

The catalog has `pydantic-ai` with name "Pydantic AI" (space). The JD
writes "Pydantic-AI" (hyphen) twice — once in Strongly preferred,
once in the eval-tools list. The `matchesAsTerm` regex builds the
pattern from the literal name "Pydantic AI" and requires the literal
space; the hyphen in the JD breaks the match.

I verified this with a quick Node repl:
`new RegExp('(?<![a-z0-9])pydantic ai(?![a-z0-9])').test('pydantic-ai')` → false.

This is a **named miss** — the catalog entry exists, the JD names it
twice, the rules-based extractor doesn't surface it. For an
AI-engineer-on-agents role where Pydantic-AI is one of the two
must-or-have agent frameworks, this is **severity: ✗ blocking** at
the Phase-1 level for this specific catalog entry.

**Fix:** add `'pydantic-ai'` (hyphenated form) to the `pydantic-ai`
aliases. One-line catalog change, no scoring impact. **Highest-leverage
single fix this audit surfaces.**

### F10. [⚠ small] Bedrock named but no card surfaces

JD: "AWS (Bedrock, S3, RDS Postgres)." The catalog has an `aws` entry
that surfaces; it has a service `bedrock` inside (`technologies.json:2068`)
but that's nested, not surfaced by the extractor. A recruiter screening
against Bedrock specifically would set the AWS card to "deep" or tick
the Bedrock service during the assessment — but if AWS were a checklist-
or hybrid-mode card with Bedrock as a visible service, the extractor
could prompt that explicitly. **Severity: ⚠ small.** No action this
phase; flag for catalog-mode revisit if AWS becomes hybrid.

### F11. [⚠ small] FastAPI surfacing is honest but the JD signal is light

"Python 3.12, FastAPI, LangChain (Python), LangGraph, …" — FastAPI gets
named once in the stack list. Card surfaces, recruiter would set
working-depth, move on in ~15 seconds. Working as intended.

---

## 4. False negatives a recruiter would expect

1. **Pydantic-AI** — see F9. Named twice, missed completely. **Add
   hyphenated alias.**
2. **LLM API SDKs (plural)** — JD doesn't actually write "SDKs" so this
   specific plural-miss isn't triggered by this fixture. But the JD's
   "OpenAI + Anthropic APIs" *does* hit `llm-api-sdk` cleanly via
   the alias. So Phase-1's known plurals limit isn't load-bearing here.
3. **Pydantic (the library, not Pydantic-AI)** — JD says "Strong Python
   — pydantic, async, dataclasses, type-driven". Pydantic isn't a
   catalog entry. It's a core Python library for this kind of role.
   **Catalog gap, not extractor bug** — flag for catalog 2.1.
4. **Bedrock** — see F10. Surfaces via the `aws` card but no Bedrock-
   specific signal.
5. **bge-large-en (embedding model)** — JD: "evaluating bge-large-en
   self-hosted". Specific embedding-model name; not a catalog entry,
   would be senior-signal during the call but not a screen-card. No
   action.
6. **BM25 / hybrid retrieval** — JD: "hybrid BM25 + dense". Not a
   catalog entry. This is methodology, not a tech card. A future
   `retrieval-techniques` chip-set could capture it; out of Phase-1
   scope.

---

## 5. False positives a recruiter would uncheck

1. **TensorFlow + Keras** — see F4. Named *only* in "Not relevant"
   section. Clean removes. **P0 Phase-2 priority.**
2. **PyTorch** — see F4. Ambiguous: named in "Must have" as a
   familiarity-with option, and in "Not relevant" as "model training
   from scratch (we don't train)". Phase-2 should surface with a
   contextual note rather than remove.
3. **Jupyter / Notebooks** — see F5. Matched on "not just notebooks"
   (pejorative). Recruiter unchecks in 2 seconds.
4. **NumPy / pandas** — JD: "Some background in NumPy / pandas for
   data prep." These are "nice to have, not must-have" — but they're
   genuinely named, so surfacing them is correct. Recruiter sets to
   "working" depth, doesn't probe deeply. Not a false positive.
5. **scikit-learn** — JD: "Familiarity with at least one of: PyTorch,
   HuggingFace transformers, scikit-learn." Genuinely named as an
   option. Not a false positive.

**Net false-positive cost on this JD:** 3 unchecks (TensorFlow, Keras
implicit-inside-TensorFlow, Jupyter), 1 contextual re-frame (PyTorch).
~30 seconds of recruiter time. Workable, not catastrophic — but the
TensorFlow/Keras case is the textbook example for the Phase-2 brief.

---

## 6. Catalog gaps surfaced

1. **`pydantic`** (the library, not Pydantic-AI). Core Python typing
   library; named explicitly in the JD's must-have. Should be a catalog
   entry or at least an alias on `python`'s checklist services (if
   `python` ever goes checklist-mode). **Recommend catalog 2.1 add.**
2. **`bedrock`** as a first-class catalog entry. Currently nested
   inside `aws.services`. AWS Bedrock is increasingly its own
   skill-cluster for LLM-API consumption (custom-model deployment,
   guardrails, agents). **Recommend promoting to its own catalog
   entry**, aliased to `llm-api-sdk` or `vector-db` as appropriate.
3. **`pgvector` alias missing on `vector-db`**. See F8. One-line fix.
4. **Hybrid retrieval / BM25** as methodology chips on the
   AI/ML-Engineer role template. Out of catalog scope per se but
   worth a chip-set entry.
5. **OpenAI API and Anthropic API** are already aliased onto
   `llm-api-sdk` — good. No first-class entries needed; the generic
   card with vendor-named services is the right shape.

---

## 7. Verdict

**At-risk.**

The extraction surfaces the right card-set in shape (15 AI/ML cards,
correct vendor coverage on RAG ecosystem, FastAPI + Python + pytest
+ Docker + K8s + GitHub Actions + AWS support tier complete). A
recruiter would *not* be stranded — the screen is workable. But two
operational issues prevent a clean "Safe" verdict on this fixture:

(a) **TensorFlow + Keras false positives from the "Not relevant"
section** waste ~3 minutes of a 10-minute call unless the recruiter
spots and removes them pre-dial.

(b) **Pydantic-AI named-but-missed** drops one of the two strongly-
preferred agent frameworks off the screen entirely — a senior agent
engineer would walk away from this screen feeling under-questioned.

Fix (b) is one alias line. Fix (a) is the Phase-2 LLM scope.

---

## 8. Cross-cut recommendations for Phase 2 LLM scope

This fixture is **the canonical case** for context-aware extraction.
The Phase-2 LLM should at minimum:

1. **Detect explicit-exclusion sections** ("Not relevant", "We don't
   use", "Skip if your background is mostly X"). Surface these techs
   with an `excluded: true` flag, not as positive matches. **P0** —
   TensorFlow/Keras case from this JD is the textbook example.
2. **Resolve ambiguous mentions** (PyTorch in both must-have and
   not-relevant): surface with a `note` describing the contextual
   nuance rather than a hard include/exclude.
3. **Detect pejorative use** ("not just notebooks", "we're not a
   WordPress shop"). Suppress the match or surface with `negated:
   true`. **P1.**
4. **Normalize punctuation variants** ("Pydantic-AI" vs "Pydantic AI"
   vs "PydanticAI"). The rules layer can fix the most common cases
   via aliases (do this for Pydantic-AI **now**, pre-Phase-2), but
   the LLM should generalize.
5. **Surface methodology phrases** ("hybrid retrieval", "BM25 + dense",
   "cost-aware prompt engineering", "$80k/month inference budget") as
   chip-set candidates, not necessarily as tech cards.
6. **Confidence scoring per match** — Pydantic-AI named twice in
   strongly-preferred = high confidence; PyTorch named once in
   not-relevant + once in must-have = ambiguous; Jupyter matched on
   "not just notebooks" = low confidence / probable negation.

**Pre-Phase-2 quick wins (do before LLM ships):**

- Add `pgvector` to `vector-db` aliases (F8).
- Add `'pydantic-ai'` and `'pydantic ai'` to `pydantic-ai` aliases —
  the hyphenated form is what the wider community writes (F9).
- Add `pydantic` as a new catalog entry, or as a Python-services
  entry once Python goes hybrid (F8 catalog-gap note).

These three rules-layer fixes would move this fixture from At-risk
to Safe at Phase 1 — without waiting on the LLM.

---

## 9. Headline

**Phase 1 verdict on this fixture: At-risk → Safe-after-3-alias-fixes.**

Rules-based extraction nails the LLM/RAG/agents core (LangChain,
LangGraph, LlamaIndex, Braintrust, LangFuse, DSPy, vector-db
consolidation). It correctly demonstrates Phase 2's value by
generating the textbook "Not relevant: TensorFlow / Keras / PyTorch"
contextual-extraction case. Pydantic-AI alias miss is the single
highest-leverage fix this audit surfaces — one line of `aliases.ts`,
unblocks an entire candidate-screening segment.

**Recommendation:** ship Phase 1 with the three alias fixes above
applied; queue this fixture as the Phase-2 LLM acceptance test for
exclusion-section handling.
