# Session 01 — Aaron Bell (Senior Solution Architect, 11 yr)

**Agent:** sim-01 (round 3)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Video panel (30-45 min, hiring manager joins ~17 min mark)
**Role template picked:** Solution Architect

## 1. Persona inhabited

Aaron is a pre-sales architect at a 200-person consultancy doing AWS+Azure migrations for UK/EU regulated clients. Days in Lucidchart and Zoom; last `git push` was a Terraform module bump in late 2024. Talks fluently in service names ("Step Function in front of EventBridge fanning out to Lambda") but if asked to write the Terraform he'd open Cursor and prompt his way through. Calls himself "hands-on" because he reviews PRs.

## 2. Video call — abbreviated

> R: "Walk me through your stack."
> A: "AWS — VPC, Lambda, Step Functions, RDS, EKS, IAM, KMS, Organizations."
> [R: opens AWS checklist. Ticks lambda, vpc, eks, iam, rds, step-functions, sqs-sns. KMS and Organizations aren't options.]
> R: [types "KMS heavy, multi-account via Orgs" in Notes. Depth = Very deep. Scope **untouched**.]
> A: "Half my workload is Azure now — AKS, Functions, Key Vault, Entra ID."
> [R: ticks aks/functions/key-vault/entra-id. Depth = Deep. Scope skipped.]
> A: "Terraform everywhere, K8s 1.30 in EKS and AKS."
> [R: TF v1.10 / Deep. K8s v1.30 / Deep.]
> [HM joins ~17 min. Watches the rest live.]
> A: "Last wrote Java professionally in 2020. Some Python for scripts."
> [R: removes preloaded Kafka and Postgres. Adds Java with "Don't remember", Depth = Working. Same for Python.]
> A: "TOGAF, Well-Architected, threat modeling, cost-out workshops…"
> [R: types in meta notes. No tool surface for it.]

## 3. What TechVet would output

| Tech | Coverage / Version | Depth | Scope | Verdict |
|------|--------------------|-------|-------|---------|
| AWS | 7/14 (50%) | very-deep | — operator-implied | **Review / Probe — 7/14** (Yellow) |
| Azure | 4/13 (31%) | deep | — | **Review / Probe — 4/13** (Yellow) |
| Terraform | 1.10 | deep | — | **Excellent** (Green) |
| Kubernetes | 1.30 | deep | — | **Good** (Green) |
| Java | unknown | working | — | **Review / Probe** + misleading enterpriseNote |
| Python | unknown | working | — | **Review / Probe** |

**Headline:** 2 Green / 4 Yellow / 0 Red. Plus 2 confirmed-not-in-stack (Kafka, Postgres). The "Tune scope before exporting" banner fires (4 of 6 implicit) — **after** the HM has watched the assessment screen.

## 4. Accuracy judgement

- **Right:** AWS Yellow at 50% is fair. Azure Yellow at 31% is fair. Java unknown→Yellow is the right shape.
- **Over-rates:** **Terraform Excellent and K8s Good are both wrong.** Aaron architects with TF; he doesn't `apply` weekly. K8s 1.30 is a confident name, not a hands-on number — last actual kubectl was 1.27. Both read to HM as "operator-grade", which is exactly what the scope axis was built to prevent. **Fix K's `defaultScope` only fires on the 10 AI/ML libs** (`technologies.json:1786, 1822, 1858, 2391, 2433, 2506, 2571, 3631, 3673, 3715`). Architect candidates in cloud/DevOps still default to operator-implied.
- **Under-rates:** Aaron's actual differentiators — TOGAF, Well-Architected, multi-account Orgs design, KMS hierarchy, threat modeling — have no tool surface (D4, methodology gap).
- **Silent on:** **Multi-cloud as a meta-skill.** AWS Yellow + Azure Yellow side-by-side reads worse than AWS-only Green; the dual-cloud architect is the harder hire. RESUME priority #11.

## 5. Friction during the call

- **Scope dropdown not opened.** No prompt at moment of entry. HM watched four chips stay "operator-implied" while Aaron literally said "I don't write the Terraform, I review it." Visible mismatch in front of the HM.
- **KMS / Organizations missing from AWS checklist.** Recruiter typed into Notes — invisible on Summary tile head.
- **Methodology nowhere to live.** TOGAF / Well-Architected / threat modeling went into meta `notes`. Don't appear in any tier section, don't move radar.
- **"Tune scope before exporting" is post-call.** Right idea, wrong room for the video channel — HM has already formed the impression.
- **K8s 1.30 confidence not interrogated.** `suggestedProbes` are about CRDs, not recency.

## 6. Bugs / structural defects

1. **`defaultScope` coverage too narrow.** Only 10 AI/ML libs carry it. Architect-shaped candidates in cloud/DevOps default to operator-implied. **Fix:** add to kubernetes/terraform/kafka/aws/azure/gcp, or add `defaultScopeByRole` so SA template loads with `architect`. **Severity: High** — this is the close to round 1's Aliyah finding and it didn't actually close.

2. **Multi-cloud meta-skill invisible.** Two Yellow clouds aggregate to nothing. No aggregation in `Summary.tsx`. **Fix:** when ≥ 2 cloud techs each ≥ 25% coverage, render a "Multi-cloud" callout. **Severity: Medium** (RESUME #11).

3. **`enterpriseStillUsed` note fires on Java unknown-version + working depth.** Aaron last wrote Java in 2020. The Yellow Java tile says "Still widely used in many enterprise applications" — positive-coded reassurance for a tech he hasn't used in 5 years. `scoring.ts:152-167` — `working` counts as meaningful depth. **Fix:** also gate on `lastUsed` ≥ stale (waits on Fix E). **Severity: Medium**.

4. **K8s `versionTiers` reward name-knowledge over hands-on.** Even Fix E wouldn't catch Aaron because his last hands-on (1.27) is also Good. **Fix:** when version-mode matches Green/Good but `lastUsed` ≥ 1yr, soften to Yellow with a "named-not-touched" note. **Severity: Medium**.

5. **Notes-field workaround invisible on Summary.** "KMS, Organizations" never surfaces. **Fix:** parse Notes for capitalised tokens that match no service ID and surface as "Noted but uncatalogued" chips. **Severity: Low**.

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time.** AWS checklist ~50 sec (search 3 + scan 30 + tick 7 in 15 + Notes 12). Azure ~35 sec. TF/K8s ~10 sec each. Java/Python ~12 sec each. Per-tech average **~22 sec**. The two checklist entries blow past the 10-15 sec phone budget by 3-5×.

- **Phone-shrink test.** Three breaks: (1) **AWS/Azure 13-14-item checklist** can't be scanned while candidate talks — Fix D (`phoneScreenPivot` flag) is needed for cloud, not just AI/ML. (2) **Scope chip lives on Summary, not TechCard** — phone recruiter exports immediately, never sees the post-call banner. (3) **No prompt at moment of confusion** — when Aaron said "I review the Terraform but don't write it", the TechCard had no inline scope hint.

- **Friction that vanishes on phone.** Notes-field workaround would not happen. Reading the checklist aloud would not happen. Tick-rhythm collapses from ~1 sec to ~4-5 sec per item because recruiter holds names in audio memory. Two checklists × 14 items = 60+ sec, half the phone budget.

- **Risk / safe rating.** **At-risk.** Video worked because the recruiter had time for workarounds. Phone produces a falsely-flattering Green/Good combo on TF/K8s with no scope cap, and the recruiter never sees the post-call banner.

## 7. Catalog gaps

- **AWS missing:** **KMS, Organizations**, CloudFront/Route 53, WAF, GuardDuty.
- **Azure missing:** **Azure Policy / Blueprints**, Defender for Cloud, Front Door / Application Gateway.
- **Methodology nowhere (D4):** TOGAF, Well-Architected, STRIDE, C4, EventStorming, cost-out.
- **Multi-cloud meta-skill** (RESUME #11): cross-tech badge, not just template addition.
- **No "advisory / pre-sales" sub-category for SA** — delivery SA vs pitch SA are different hires.

## 8. One-liner for cross-cut

> **Aaron Bell — Solution Architect (video panel) — Fix K's `defaultScope` only covers 10 AI/ML libs; architects on TF/K8s still default operator-implied, the post-call scope chip fires too late with HM watching, and multi-cloud meta-skill is invisible.**

## 9. Recommendation

**Extend `defaultScope` to architect-prone techs (kubernetes, terraform, kafka, all 3 clouds) AND surface scope as an inline 4-pill toggle on the TechCard at moment-of-entry** — not just as a post-call Summary chip. Recruiter taps in 1 click while Aaron is still talking; HM watches the verdict cap fire visibly instead of watching four implicit chips drift past. Closes "scope unreachable on phone" for non-AI/ML AND the "HM saw nothing fire" failure that Fix K's banner cannot reach.

## Disagreement with prior fixes

RESUME says Fix K "Closes the round-2 'scope axis unreachable on phone' finding (10 of 10 sessions)". Holds only if every affected tech was AI/ML. For SA / SRE / CTO candidates in cloud/K8s/TF, **the scope axis is still unreachable on phone** — the dropdown lives in per-card UI recruiters don't open, the catalog defaults that would auto-fire are absent, and the Summary chip is a video/async closure not a phone closure. RESUME should reflect that Fix K closes the AI/ML half and Aliyah-style architects on non-AI/ML stacks remain open.
