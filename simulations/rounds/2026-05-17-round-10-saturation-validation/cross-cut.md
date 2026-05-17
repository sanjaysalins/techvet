# Cross-cut — 2026-05-17 round 10 saturation validation

**6 sessions.** 6 phone. Cast: 3 redux personas (Esme / Anil / Lars —
composition stress for batch 9) + 3 new shapes (Lina senior Fullstack /
Vikram-redux senior AI/ML author on Custom / Theo mid-senior generalist
on Custom). Saturation-validation round following round 9's 5/1/0
distribution.

**Headline result: 5 Safe / 1 At-risk / 0 Unworkable — saturation
confirmed.** Identical distribution to round 9, but on a NEW diverse
cast that pushed into 3 never-validated terrain slices (Fullstack
template + Custom template flow + library-author-on-Custom
counterfactual). The 1 At-risk is Lina (first-ever Fullstack validation
surfaced 3 surgical fixes — same shape as 7A-Sven-Backend-chips
finding). No fundamental scoring failures.

## Validation matrix per shipped fix (9A–9E)

| Fix | Held? | Notes |
|-----|-------|-------|
| **9A** (AI/ML productionization scope) | ✅✅ | Verified end-to-end via code trace (Landing.tsx:31 → addTech → store → TechCard scope dropdown). Esme dispatches 0 scope overrides (was 3 in round 9). Vector-db's cap-stealing-Green case closed. Headline reshapes from `5G/2Y-with-2-overrides` to `6G/2Y-zero-overrides`. ~75s reclaimed. |
| **9B** (capped-italic wording branch) | ✅ | TechCard.tsx:158-175 + Summary.tsx:656-668 both branch correctly on cappedFromColor. Anil's Azure 5/13 reads new "bounded by scope" wording; AWS/K8s/Terraform/Postgres read existing "capped by scope" wording. Minor copy clarity note: "review/architect-shape signal" reads clinical for non-engineer recruiters — defer to a recruiter-friendlier copy pass. |
| **9C** (tautological softener) | (n/a directly) | No direct softener case in round 10 cast (no stale + enterpriseStillUsed). Verified by integrity test. |
| **9D** (QA chip refresh + Selenium de-preload) | (n/a directly) | No QA redux in round 10 cast. |
| **9E** (DevOps Vault preload) | ✅✅ | Lars dispatches 0 search-adds for Vault (was 1 in round 9). 90s reclaimed in 10-min budget. Vault checklist works in DevOps context (no AppSec pollution). |

## What round 10 answered

1. **Saturation confirmed across never-validated terrain.** 5/1/0 on a
   cast that pushed into 3 paths rounds 1-9 never touched (Fullstack
   template / Custom flow / library-author-on-Custom). The remaining
   1 At-risk is surgical — same shape as 7A-Sven-Backend or 8D-Pooja-DE
   (template chip-set absence on a previously-unvalidated path).

2. **K2 (catalog `defaultScope: author`) + 9A (template-level
   techScopes) coexist correctly.** Vikram redux on Custom template
   verified: AI/ML library cards added via Add-tech search keep K2
   catalog default; the load-bearing moment (LLM API SDK 7/14 + deep
   + senior would lift Yellow→Green via 6D, then K2 author cap reverts
   with cappedFromColor=green) still fires correctly. No regression
   from 9A's template-level override.

3. **Custom template flow works end-to-end for clean candidates.** Theo
   adds 7 techs + 3 methodology free-text entries in ~3:25 within an
   8-min phone budget. 6B free-text methodology fallback fires
   correctly without template anchor. 7D + 7E + 7B all behave
   template-independent (correct design).

## What round 10 revealed for the first time

4. **Fullstack template has no methodologyChips** (Lina F1, **load-
   bearing**). Same shape as 7A-Sven-Backend-chips: a major template
   ships without chip-set. Fullstack is probably the most-picked
   template (universal first-pick for generalists) and never validated
   until round 10. Proposed 6 chips reusing existing IDs where possible:
   feature-flags / trunk-based / contract-testing / otel-instrumentation /
   a11y-wcag (reuse from FE) / design-system-discipline (NEW — replaces
   FE's `design-system-ownership` for shared cross-template use).
   ~30 LOC.

5. **AWS catalog missing Cognito** (Lina F2). Audit found no Cognito
   service under any tag in technologies.json. Lina's multi-tenant
   auth surface fell into free-text. 3-line JSON fix. Worth auditing
   parallel auth slices: Azure AD/Entra ID + GCP Identity Platform
   (defer if not catalog).

6. **Fullstack template's 6-tech preload is too narrow** (Lina F4).
   Lina dispatches 6 search-adds in ~3 min on a 10-min phone screen.
   Recommend adding `nextjs` + `tailwind` (already preloaded by
   Frontend; modern fullstack in 2026 is Next-first more often than
   not). Leave Express/tRPC as named-only (real divergence axis).

7. **Custom flow needs AWS serviceTagFilters** (Theo FT-2). Without
   the SA/Backend tag filter, AWS reads its full 26 services as
   denominator. Theo's Lambda+RDS+S3 = 3/26 = 11.5% → Red. Honest by
   raw math, misleading by framing for a working-depth generalist.
   Proposed fix: stack-focus picker at Custom template start (Theo
   picks "general SaaS" → applies the Backend-style `general` tag
   filter to AWS). Bigger UX change; defer.

8. **DevOps catalog adds still deferred** (Lars round-10 redux
   confirms). The 6 named-only canonical 2026 platform-eng entries
   (Argo Rollouts / Karpenter / cosign / Backstage / Unleash /
   Crossplane) re-fire from round 9. Each ~30 min catalog work;
   ~3 hr batch. Elevated to S1 round-11 priority.

9. **Round-9 9B wording polish opportunity** (Anil F4 round 10).
   "Reads as review/architect-shape signal, not hands-on operating
   signal" is technically correct but reads as internal taxonomy
   for non-engineer recruiters. Suggested simpler wording:
   "Architect-scope verdict — designs how it gets used, doesn't
   operate it day-to-day." Cosmetic; defer.

## Defects named in round 10

- **10α-fullstack-no-chips** (Lina F1). Same shape as 7A-Sven-Backend.
  Surgical fix: add `methodologyChips` array to fullstack template.

- **10β-cognito-catalog-gap** (Lina F2). 3-line JSON add to AWS
  services with `cognito-user-pool` id, label "Cognito (User Pools +
  Identity Pools)", tags `['general', 'security']`.

- **10γ-fullstack-preload-narrow** (Lina F4). 2 entries added to
  fullstack template techIds: `nextjs`, `tailwind`. Same Snowflake/DE
  + Vault/DevOps pattern.

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- Round 5: 1 Safe / 5 At-risk / 0 Unworkable
- Round 6: 2 Safe / 4 At-risk / 0 Unworkable
- Round 7: 3 Safe / 3 At-risk / 0 Unworkable
- Round 8: 2 Safe / 4 At-risk / 0 Unworkable
- Round 9: 5 Safe / 1 At-risk / 0 Unworkable ← best distribution to date
- **Round 10: 5 Safe / 1 At-risk / 0 Unworkable** — saturation confirmed

**Round 9 + Round 10 each had 5/1/0 distribution.** The single At-risk
in each round was on a never-validated path (Esme AI/ML-prod for round
9, Lina Fullstack for round 10) — every one named its surgical fix.
The trajectory is converged.

## The 6 sessions at a glance

| # | Persona              | Channel | Rating | Headline finding |
|---|----------------------|---------|--------|------------------|
| 01 | Esme (Senior AI/ML prod) | Phone | **Safe** | 9A end-to-end verified; ~75s reclaimed; HuggingFace remains honest-ambiguous |
| 02 | Anil (Staff SA)     | Phone   | **Safe** | 9B wording branch verified; minor copy-clarity follow-on |
| 03 | Lars (Senior DevOps) | Phone  | **Safe** | 9E Vault preload clean; 90s saved; 6 catalog adds re-fire |
| 04 | Lina (Senior Fullstack) | Phone | **At-risk** | First-ever Fullstack: 3 surgical fixes (chips + Cognito + nextjs/tailwind) |
| 05 | Vikram-redux (Sr AI/ML author) | Phone | **Safe** | K2 + 9A coexist; library-author shape on Custom works as designed |
| 06 | Theo (Mid-Sr Generalist) | Phone | **Safe** | Custom flow works for clean shapes; FT-2 AWS denominator framing on Custom |

## Priority list — round 10 (top 3)

| ID | Severity | Effort | Item |
|----|----------|--------|------|
| **10A** | High | ~10 LOC | **Fullstack methodologyChips** (Lina F1). 6 chips: feature-flags / trunk-based / contract-testing / otel-instrumentation / a11y-wcag / design-system-discipline. Reuse IDs from Backend (7A) + Frontend (6F) where same chip applies; new "design-system-discipline" ID for the shared cross-template use vs FE's "design-system-ownership" (which implies sole ownership). |
| **10B** | Medium | ~5 LOC | **AWS Cognito catalog entry** (Lina F2). Add to `aws` services in technologies.json: `{ id: 'cognito-user-pool', name: 'Cognito (User Pools + Identity Pools)', tags: ['general', 'security'] }`. Fullstack candidates often own multi-tenant auth (Lina's case). Sub-task: verify Azure AD / Entra ID + GCP Identity Platform have parallel entries; defer those if not. |
| **10C** | Medium | ~3 LOC | **Fullstack preload nextjs + tailwind** (Lina F4). Add to fullstack template techIds. Same Snowflake/DE (8D) + Vault/DevOps (9E) pattern. |

### Deferred / cosmetic backlog

- **10δ** — Anil F4 wording polish for 9B "review/architect-shape signal"
  → recruiter-friendlier wording. Defer.
- **FT-1** (Theo) — recruiter mental-model surprise on vetMode (version vs
  checklist). Could add a small icon on Add-tech dropdown. Defer.
- **FT-2** (Theo) — Custom flow needs AWS serviceTagFilters or starter
  stack-focus picker. Bigger UX change. Defer.
- **FT-3** (Theo) — candidate-volunteered-gaps need structured rendering.
  Defer.
- **DevOps catalog adds** (Lars F1 from round 9, re-fires) — 6 entries
  × ~30 min = ~3 hr. Defer.
- **QA catalog adds** (Akira round 9 — Pact + Cucumber) — ~1 hr. Defer.
- **AI/ML catalog adds** (Esme F3 round 9 — Braintrust + Evidently +
  Feast + Langfuse) — ~2 hr. Defer.
- **UIKit catalog entry** (Kenji rounds 7-8 deferred). Defer.
- **Storybook catalog entry** (Maya M2 round 8). Defer.
- **W&B / MLflow / ClearML catalog** (Vikram F5 round 10). Defer.

## Recommended ship order

**Single batch (~18 LOC):** 10A + 10B + 10C. All small, all surgical,
all close Lina's At-risk findings.

Round 11 cast (if extended): redux Lina (validate 10A-C) + DevOps
catalog-batch persona (validate the 6 named-only fix when shipped) +
Theo redux on Custom with stack-focus picker (validate FT-2 if it
ships).

**Stopping signal:** Two consecutive rounds at 5/1/0 with the single
At-risk surgical and named-its-fix-on-the-spot. The next valuable round
of work is **a catalog-refresh batch** (15-20 catalog adds across
DevOps / QA / AI/ML / iOS) rather than more validation rounds.
