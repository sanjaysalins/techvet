# Session 10 — Vikram Patel (Senior ML pivoting to GenAI, AI/ML Engineer)

**Agent:** sim-10
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** AI / ML Engineer

## 1. Persona inhabited

Vikram is a sharp 5-yr classical-ML guy at a martech firm. He genuinely lives in PyTorch + scikit-learn, ships SageMaker training jobs weekly, and tracks experiments in MLflow. His team got rebranded "GenAI Platform" four months ago and he's been moonlighting evenings on LangChain tutorials, a weekend RAG prototype against pgvector + a Pinecone trial, and ~5 Bedrock API calls. He speaks fluent ML-eng cadence ("we serve a ranker behind a Fargate endpoint"), so to a non-technical recruiter he sounds equally fluent on LLM stuff. He will absolutely say "deep" when asked his LangChain depth — not lying, just calibrated to "I've shipped a prototype."

## 2. Phone call — abbreviated

> R: "Walk me through your stack — what do you touch day to day?"
> V: "Python obviously, mostly 3.11. PyTorch — I'm on 2.5, we fine-tune rankers. scikit-learn, pandas, numpy. SageMaker for training, MLflow for experiments."
> [R: clicks Python, "3.11", depth=very-deep. PyTorch "2.5" very-deep. Searches "MLflow" — no result. Skips. Searches "SageMaker" — no result, types it in notes on AWS card.]
> R: "And the GenAI side? Your title says GenAI Platform."
> V: "Yeah, we rebuilt the recommendation explainer as a RAG pipeline. LangChain for orchestration — I built that. Vector DB we're on Pinecone, evaluating Weaviate."
> [R: searches "LangChain", adds, types "1.1", depth=deep. Adds Vector DB checklist, ticks Pinecone + Weaviate. Adds LLM API SDK checklist.]
> R: "Which LLM SDKs?"
> V: "Bedrock, I've called the Claude API through it. OpenAI too, embeddings mostly."
> [R: ticks Anthropic SDK, OpenAI SDK, Embeddings on llm-api-sdk. Depth=deep, "tool use? streaming?" — V: "Yeah, streaming, some tool use." R ticks both.]
> R: "FastAPI, Docker, AWS?"
> V: "All yes. AWS heavily — SageMaker, S3, Lambda, IAM, ECS Fargate, CloudWatch."
> [R: FastAPI "0.115" working. Docker "26" working. AWS checklist: S3, Lambda, IAM, ECS-Fargate, CloudWatch, EC2 — 6/14. Time's nearly up — R clicks Summary. Scope dropdown: untouched on every card.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | 3.11 | very-deep | — | **Good** (3.10 tier, depth doesn't lift Green further) |
| PyTorch | 2.5 | very-deep | — | **Excellent** (2.4 tier, Green) |
| LangChain | 1.1 | deep | — | **Excellent** (1.0 tier, natural Green — no lift needed) |
| Vector DBs | 2/12 = 17% | deep | — | **Yellow "Review / Probe (lifted from Concern by depth) — 2/12 services"** (17% is Red, depth lifts to Yellow) |
| LLM API SDK | 5/14 = 36% | deep | — | **Green "Good (lifted from Review / Probe by depth) — 5/14 services"** (36% is Yellow, depth lifts to Green) |
| FastAPI | 0.115 | working | — | **Excellent** |
| Docker | 26 | working | — | **Excellent** |
| AWS | 6/14 = 43% | working | — | **Yellow "Review / Probe — 6/14 services"** |

**Summary headline:** 5 Green / 2 Yellow / 0 Red (8 techs scored). Radar shows AI/ML, Backend, Cloud, DevOps, Language. Hiring manager opens the PDF and sees a Senior GenAI Engineer.

## 4. Accuracy judgement

- **Where it's right:** Python, PyTorch, FastAPI, Docker. These verdicts match a real senior IC.
- **Where it over-rates (badly):**
  - **LangChain Excellent.** Natural Green from version 1.1 alone. Six weeks of evening hacking on LangChain shows up identical to a year of production ownership. *Scope didn't even need to cap it — the version already grants Green.*
  - **LLM API SDK lifted to Green by depth.** 36% coverage with a self-reported "deep" depth fires the lift. Vikram has called maybe 50 prod requests across two SDKs. The label literally reads "Good (lifted from Review / Probe by depth)" — depth-game working exactly as the prior round predicted.
  - **Vector DB lifted from Red to Yellow.** He ticked two boxes for vendors he is "evaluating." Without depth lift he'd be at Red/Concern (correct); the lift hides that signal.
- **Where it under-rates:** Python 3.11 + very-deep doesn't beat Python 3.13 working — there's still no "Senior" tier above Green (D1 in cross-cut, still open).
- **Where it's silent:** SageMaker. MLflow. These are his actual day job and **neither exists in the catalog.** The hiring manager's PDF will say nothing about the candidate's deepest production muscle. The recruiter typed "SageMaker" into AWS notes — that note doesn't render in the radar or bucket.

## 5. Friction during the call

- **Scope dropdown ignored.** This is the headline finding. The recruiter never touched the scope picker on any card. On a 5-min phone call she's typing names + versions + depth as fast as Vikram talks. Scope is a fourth dropdown that requires the recruiter to reason: "is he the author of this or the operator?" — which she can't judge without knowing what those words mean for LangChain. Default is `—`, so the cap never fires. **The axis shipped today does nothing for the exact failure mode it was designed to catch, in the exact channel where it would matter most.**
- Search misses on "MLflow" and "SageMaker" force the recruiter to either skip or shove into a notes field that doesn't score.
- "Deep" vs "very-deep" forced the recruiter to ask Vikram a follow-up she didn't know how to phrase ("Like, how deep?"). He picked the bigger word.

## 6. Bugs / structural defects

1. **Scope axis is recruiter-unreachable in phone mode.** The control exists but requires (a) the recruiter to know what `author / operator / reviewer / architect` mean for each specific tech, (b) the recruiter to interrupt the candidate's stack-dump to set it. Neither happens on a 5-min call. The cap I verified in `scoring.ts:62` works correctly — `reviewer/architect` caps at Yellow, `author` blocks Yellow→Green lift — but **it never fires** because nobody sets it. Evidence: `TechCard.tsx:96-113` puts scope as a peer dropdown next to Depth with default `''`. **Severity: High.** The fix shipped today addresses Diego/Aliyah/Mei (deliberate reviewer-y candidates the recruiter notices are reviewers); it does nothing for self-overclaim like Vikram where the recruiter has zero signal to flip the dropdown.
2. **Depth-lift on checklist-mode rewards self-report without coverage evidence.** `scoring.ts:257-258` runs `adjustForDepth` on the bucket from `ratio`, so 2/12 (17%, Red) → Yellow and 5/14 (36%, Yellow) → Green just by typing "deep." The whole point of checklist mode is that *coverage* is the signal — letting depth bypass coverage undoes it. **Severity: High.** Either drop depth-lift entirely on checklist mode, or require ≥50% coverage before a lift is allowed.
3. **LangChain 1.0+ is natural Green even for a six-week user.** Version-mode says "if they typed a current version they're Green." Combined with #2 above, Vikram's GenAI claims all clear without ever touching the scope cap. Catalog entries for fast-moving libraries should not have a natural Green tier — they should max out at Yellow and rely on checklist services or a forced probe. **Severity: Medium.**
4. **No way to surface SageMaker / MLflow on the PDF.** Recruiter typed them in free-text notes; notes don't render in buckets or radar (Summary only walks the items list). For a senior ML candidate these are the single most important signals. **Severity: Medium** (catalog gap, but also a structural "the report is silent on things the recruiter heard").

## 7. Catalog gaps

- **MLflow** — table-stakes for any ML eng. Not searchable.
- **AWS SageMaker** — not a service in the AWS checklist. Same gap Priya hit in session 4 yesterday. Still unfixed; `technologies.json:1925-1989` lists 14 services, all general-purpose, none ML.
- **AWS Bedrock** — Vikram literally said "I've called Bedrock." Not in AWS checklist, not in llm-api-sdk services (which has Azure OpenAI but not Bedrock). The "Anthropic SDK" tick conflates direct API with Bedrock-routed access.
- **Weights & Biases / Comet** — alternates to MLflow, same gap.
- **Modal / RunPod / Replicate** — modern model-serving platforms.

## 8. One-liner for cross-cut

> **Vikram — AI/ML Engineer — scope-of-use axis (shipped today) does not catch self-overclaim on phone calls because the recruiter has no signal to flip the dropdown; checklist depth-lift turns 5/14 LLM-SDK coverage into Green; LangChain 1.x grants natural Green to a six-week tutorial-grade user.**

## 9. Recommendation

The highest-leverage change is **dropping depth-lift on checklist mode** (or gating it behind ≥50% coverage). Coverage is the whole signal in checklist mode; letting a self-reported "deep" override 17% coverage is precisely the depth-game the team has been trying to close, and it fires for the exact GenAI-hype candidate today's scope axis can't reach. Scope-of-use is the right axis but needs a different surface — either a one-question recruiter prompt ("Has the candidate operated this in production, or only authored/prototyped?") that fires after Summary, or auto-default scope to `author` for AI/ML-category techs and force the recruiter to upgrade to `operator` explicitly. Today's UI puts the burden in the wrong place.

## Disagreement with prior fixes

The scope axis solved the *named* problem (Diego/Aliyah/Robin/Sam — candidates who clearly are reviewers/architects). It does not solve the *unnamed* problem in the same cluster — candidates who *sound* like operators but aren't. The cross-cut conflated these; today's RESUME.md treats priority #4 as "closes the cluster," which is half-right. Self-overclaim is still wide open.
