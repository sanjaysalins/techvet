# Session 06 — Min Park (Junior-mid, Academic→Industry MLE)

**Agent:** sim-06 (round-3 multichannel)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Async (CV + JD only, no candidate call)
**Role template picked:** AI / ML Engineer

## 1. Persona inhabited

Min did her PhD on representation learning for fMRI data and stayed on as a post-doc, four years out, three first-author NeurIPS / Nature Methods–tier papers, primary author of a small but well-cited neuroimaging toolbox in PyTorch. Day to day she writes single-author research code on a Slurm cluster, runs experiments in Singularity images her IT staff built once and never updated, opens MATLAB only to reproduce a reviewer's old figure, and rarely sees another Python file she didn't write. She has never owned a CI pipeline, never code-reviewed for a team, never deployed a model, and the word "production" makes her pause. Her CV reads like a strong AI/ML engineer to a non-technical recruiter — Python, PyTorch (5 years!), JAX, scikit-learn, numpy, scipy, pandas — but the *shape* of her experience is research-monolith, not product-team.

## 2. Async session — abbreviated

The recruiter has Min's CV (PDF), the JD for "Junior MLE — disease-target ML, computational biology background a plus", and TechVet open in another tab. No call.

> [Recruiter: opens TechVet → AI / ML Engineer template → 8 cards preloaded:
> python, pytorch, huggingface-transformers, llm-api-sdk, vector-db,
> fastapi, docker, aws]
> [Reads CV: "5 years PyTorch, JAX, scikit-learn, numpy, scipy, matplotlib,
> Slurm, Singularity, pandas, R, MATLAB"]
> [Searches "Slurm" → no results. Searches "Singularity" → no results.
> "JAX" → no results. "MATLAB" → no results. "R" → no results.]
> [Logs PyTorch: types "2.4" (current as of CV cut), depth = "deep" (5 yr
>   feels deep), scope dropdown shows "— Use default: author", leaves it.
>   lastUsed = "current".]
> [Logs Python "3.11", depth = working — CV doesn't say senior-Python.]
> [Logs scikit-learn "1.5" (guesses current), depth = working, scope default.]
> [Logs huggingface-transformers — CV doesn't mention. Toggles "Not in stack".]
> [Logs llm-api-sdk — CV silent. "Not in stack".]
> [Logs vector-db — CV silent. "Not in stack".]
> [Logs FastAPI — CV silent. "Not in stack".]
> [Logs Docker — CV says "Singularity (container, not Docker)". Toggles
>   "Not in stack" with note "uses Singularity (HPC) instead — catalog gap".]
> [Logs AWS — CV silent. "Not in stack". Note: "uses on-prem Slurm".]
> [Free-text: tries to add JAX / Slurm / Singularity / MATLAB / R / scipy.
>   None appear. Adds nothing. Moves on.]
> [Total time ~6 min.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|-----|-----|-----|-----|
| Python | 3.11 | working | — | Excellent (3.11 hits Green band) |
| PyTorch | 2.4 | deep | author (default) | **Excellent (Green)** — 2.4 is in the top tier; depth-lift not needed; author cap blocks Yellow→Green lifts but does NOT cap natural Greens (`scoring.ts:75`) |
| scikit-learn | 1.5 | working | author (default) | Excellent (1.5 is current Green) |
| huggingface-transformers | — | — | — | "Not in candidate's stack" (gray, excluded) |
| llm-api-sdk | 0/N untouched | — | — | "Not in candidate's stack" (excluded) |
| vector-db | 0/N untouched | — | — | "Not in candidate's stack" (excluded) |
| FastAPI | — | — | — | "Not in candidate's stack" (excluded) |
| Docker | — | — | — | "Not in candidate's stack" (excluded — *misleading*: she uses Singularity) |
| AWS | 0/N untouched | — | — | "Not in candidate's stack" (excluded — *misleading*: she uses Slurm/HPC) |

**Summary headline:** 3 Green / 0 Yellow / 0 Red, plus 6 confirmed-not-in-stack chips. Radar shows AI/ML and Language axes only — Cloud, DevOps, Backend collapsed. PDF reads as a clean Junior MLE who knows the ML stack and doesn't yet own deployment. **That's directionally correct, but it's correct by accident.**

## 4. Accuracy judgement

- **Where it's right:** The "Not in stack" set (FastAPI / vector-db / Docker / AWS / HF / llm-api-sdk) correctly tells the HM Min has not shipped LLM/web/cloud stuff. That's the most decision-relevant fact and the tool surfaces it cleanly thanks to Fix L's chip row.
- **Where it over-rates:** PyTorch Green is the load-bearing wrong call. Min has 5 years of PyTorch but it's *one-author research-codebase* PyTorch — no `torch.compile` in anger, no DDP/FSDP across nodes she didn't configure, no model-serving, no gradient-checkpointing for a real memory budget. Fix K's `defaultScope: "author"` was supposed to catch exactly this shape but its semantics only block *depth-lifts* into Green, not *natural-tier* Greens (`scoring.ts:75-77`). For a Junior MLE role, the verdict reads as "shipped PyTorch competent" when the truth is "academic PyTorch competent". Same for scikit-learn and pandas (if it had been preloaded — it isn't in the AI/ML template, surprisingly).
- **Where it under-rates:** Min's *real* signal — three first-author papers, a maintained OSS toolbox, a working knowledge of JAX, scipy, MATLAB, Slurm-scale numerical work — has nowhere to land. The PDF will look like a thin junior with 3 Greens and nothing else. The HM may pass on a candidate whose research engineering depth is genuinely an asset for a biotech ML role.
- **Where it's silent on something a HM would need to know:** That she is mid-career-transitioning, not actually junior; that her container experience is Singularity not Docker (a real and legitimate substitute in HPC); that she has never written CI; that "5 years PyTorch" is research-PyTorch. Not one of these is capturable today.

## 5. Friction during async logging

- 5 catalog dead-ends back-to-back (Slurm, Singularity, JAX, MATLAB, R, scipy). The tool doesn't let the recruiter capture "I searched and there was nothing" — those searches are silently lost. Round-2 Fix C is the right shape; this session would have logged 5 named-not-in-catalog entries.
- The recruiter has to decide *for* the candidate whether each preloaded template tech is "Not in stack" or "untouched". The default, with Fix G, is correct (untouched → excluded), but it took the recruiter explicit clicks to mark FastAPI/Docker/AWS *confirmed*-absent vs. silently-untouched. On a CV-only screen, this distinction is fragile — the recruiter is *inferring*, not confirming. There is no "inferred-absent" state.
- Version inference for PyTorch / scikit-learn / Python is pure guesswork; the CV is silent. The recruiter typed current-ish numbers and Fix B (no depth-lift on unknown version) doesn't apply because the recruiter put numbers in.

## 6. Bugs / structural defects

1. **Author scope cap doesn't fire on natural Greens — Min's PyTorch case.** `scoring.ts:75` only fires when `baseColor === 'yellow' && adjusted.color === 'green'`. PyTorch 2.4 hits Green directly; the author cap is silent. For research-author shapes (the entire post-doc transition cohort), this means the AI/ML library defaults are decorative on the most accurate tier. **Severity: High.** Same root cause as Vikram-LangChain in round 2 (RESUME Fix O), but extends beyond fast-moving libs to *every* AI/ML library when the author has 5 years on a current version. Fix idea: `author` should also cap natural-Green at Green-with-asterisk, or the cap should distinguish "shipped" from "wrote".

2. **No "inferred from CV" provenance.** Async mode has no checkbox / state for "I am inferring this version, the CV doesn't say". The version field treats recruiter-typed `2.4` identically to candidate-confirmed `2.4`. HMs reading the PDF cannot tell which Greens are evidence-backed and which are recruiter-best-guess. **Severity: High** for async channel; medium overall.

3. **Singularity / Slurm / HPC blind spot.** The catalog has Docker as the only container (`technologies.json` DevOps category). Min's CV explicitly names Singularity as her container — substituting Docker → "Not in stack" loses the signal that she does in fact know containers, just not the ones the JD will demand. Same for Slurm (legitimate orchestrator, not Kubernetes). **Severity: Medium** — biotech / academic-bridge JDs are a real recruiting segment.

4. **JAX missing from AI/ML category.** JAX is the second-most-likely PyTorch alternative for an academic ML CV (Google Research, Stanford, lots of comp-neuro). Catalog has 10 AI/ML libs; JAX absence is a category-coverage gap, not just a long-tail miss. **Severity: Medium.**

5. **MATLAB / R / scipy / matplotlib all missing.** MATLAB is a Language; R is a Language (catalog has it as zero entries — confirmed); scipy and matplotlib are AI/ML-adjacent. For an academic CV these are 4 of the 10 named techs. **Severity: Medium** for catalog refresh prioritization — academia → industry is a real cohort.

6. **`lastUsed` field is logged but never scored.** Recruiter typed "current" for PyTorch. The field changes nothing. Round 2 already flagged this (RESUME Fix E pending). For Min the right move is *not* to penalize "current" — it's to read "5 years current research-codebase" differently from "5 years current production". `lastUsed` alone won't fix the academic→industry mis-read; it needs a scope-style "context" axis (research / production / hobby). **Severity: Medium**, structural.

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** ~30-40 s per logged tech in this async session: read CV line → search → click → type version → pick depth → consider scope (left at default) → type lastUsed → check the card. The 6 "Not in stack" toggles were faster (~10 s each: search → click card → click "Not in stack"). Total session ~6 min.
- **Phone-shrink test.** Async-style this would die instantly on phone. Specifically: (a) version inference is not a phone activity — recruiter cannot ask "what version" 6 times in a 5-min call; (b) reading 12 LLM-checklist items aloud to confirm "she doesn't use any of them" is impossible — the only phone-safe move would be to skip the card entirely, which Fix G now permits but the recruiter has to *not click* it (silent skip). The 6 "Not in stack" toggles took 60 s here; on phone they'd be silent skips and the HM would never know whether the recruiter forgot or confirmed.
- **Friction that vanishes on phone.** Reading the CV's bullet "Singularity (container, not Docker)" carefully and typing it as a Docker note. On phone the candidate would say "we use Singularity" and the recruiter would type Docker, depth=working, no note — and the PDF would be silently wrong.
- **Risk / safe rating.** **At-risk.** Async actually flatters the workflow because the recruiter has time to reason. Phone-version of this same persona would either over-rate her PyTorch (rushed Green) or invent a Yellow with no rationale. The author-cap-on-natural-Green gap (bug #1) is the main thing that needs to fix before either channel becomes safe.

## 7. Catalog gaps

- **JAX** (AI/ML) — high priority, second-most-common PyTorch alternative.
- **Slurm / HPC orchestration** (DevOps or new HPC category) — academic compute.
- **Singularity / Apptainer** (DevOps, container) — Docker substitute in scientific/HPC.
- **MATLAB** (Language) — common in academic CVs (engineering / neuro / signal).
- **R** (Language) — statistical computing; named by both Min and Yara (session 04).
- **scipy** (AI/ML) — scientific Python core; named alongside numpy on most academic CVs.
- **matplotlib** (AI/ML or Frontend-of-data) — visualization staple.
- **PyMC / Stan** (AI/ML) — overlaps Yara's session; Bayesian modelling.

## 8. One-liner for cross-cut

> **Min Park — AI / ML Engineer (async) — `defaultScope: author` doesn't cap natural-Green PyTorch; academic 5-yr-research-PyTorch reads identically to 5-yr-production-PyTorch in the PDF, and 6 of her CV's named techs (JAX/Slurm/Singularity/MATLAB/R/scipy) are unfindable.**

## 9. Recommendation

Single highest-leverage change for this session: **extend `author` scope to cap natural-Green at Green-but-flagged ("Author scope — verify production scale")** in `scoring.ts:75`. The current cap only blocks depth-lifts, which means anyone who self-reports a current version on PyTorch / scikit-learn / pandas / numpy bypasses the cap that Fix K shipped to protect against exactly this shape. Pair with a one-shot "Inferred from CV" toggle on TechCard for async mode so the PDF distinguishes recruiter-guesses from candidate-confirmed. Catalog refresh (Fix I) should add JAX, Singularity, scipy, R, MATLAB before the next academic-cohort screen.

## Disagreement with prior fixes

Fix K's `defaultScope: "author"` on AI/ML libs was sold as closing "the cluster of misreadings where reviewers, architects, and notebook-authors get scored like operators" (`scoring.ts:43-44`). For Min — a textbook notebook-author — the cap silently no-ops because she's on a current version. The fix's regression test for "natural-Green-unaffected" (RESUME mentions "Vikram non-closure documented") locked in the wrong invariant: natural-Green *should* be affected when scope is `author`, otherwise the catalog default is misleading recruiters into thinking the cap is doing work it isn't. Either the cap needs to fire on natural-Green for `author`, or the AI/ML default should be relabeled honestly (e.g. shown in the chip as "Author — depth-lift cap only").
