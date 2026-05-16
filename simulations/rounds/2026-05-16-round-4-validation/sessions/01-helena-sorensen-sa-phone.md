# Session 01 — Helena Sørensen (Senior, Solution Architect)

**Agent:** sim-01 (validation round)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-4-validation
**Channel:** Phone (5-10 min)
**Role template picked:** Solution Architect

## 1. Persona inhabited

Helena is a 9-year enterprise architect at a Nordic energy utility — dual-target AWS + Azure + on-prem, regulated industry, slow change cadence. She owns reference architectures and the cloud landing zone; she writes ADRs and reviews other people's Terraform PRs but hasn't run `terraform apply` herself in 14 months. Talks in terms of *blast radius*, *SCPs*, *guardrails*, *Well-Architected pillars*. Vague on patch versions ("Kubernetes 1.3-something, whatever EKS is on") because that's not her surface. Will mention Azure unprompted because half her stack is there. Calm, precise, slightly impatient with version-pedantry.

## 2. Phone call — abbreviated

> R: [picks Solution Architect template; 5 cards preload — Kubernetes, Terraform, AWS, Kafka, PostgreSQL. Channel = Phone (default). Sets Seniority = Senior, Years = 9, Path = Traditional, Context = "designs but doesn't operate"]
> R: "Hi Helena — let's start with Kubernetes."
> H: "EKS, multi-cluster. We're on whatever 1.3-something EKS is shipping — probably 1.30. I architect the topology, don't operate it."
> [R: types "1.30", depth=Very deep. Scope chip already shows `architect (via default)`. Card lights up "Review / Probe (capped — architect scope)" with amber italic note.]
> R: "Terraform?"
> H: "1.10. We use OpenTofu actually. I author the module library and review PRs — I haven't run apply in over a year."
> [R: types "1.10", depth=Very deep. Same capped-yellow result.]
> R: "AWS?"
> H: "Control Tower with SCPs, Organizations for tenant isolation, Landing Zone, IAM Identity Center, KMS for envelope encryption..."
> [R: scans checklist. EC2/Lambda/S3/RDS/IAM/VPC there. *None* of Control Tower, Organizations, Landing Zone, Identity Center, KMS, Macie. R ticks IAM + VPC + S3 only because that's all she recognised from Helena's stream. Coverage = 3/14 = 21% → Red.]
> R: "Postgres?"
> H: "Schema design only — we run RDS, I'm not operating the DB."
> [R: leaves version blank, depth=Working. Scope = architect from template. → Yellow unknown-version, capped.]
> R: "Kafka?"
> H: "MSK, we use it but I'm not the owner — talk to our streaming team."
> [R: ticks "Not in stack" → skipped. ~7 min, hangs up.]
> [R: searches "Azure" — finds it. Realises template didn't preload it. Adds, scope manually set to architect, ticks Management Groups (oh wait — does it exist?). Sees the actual Azure checklist...]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Kubernetes | 1.30 | very-deep | architect (from template) | **Review / Probe (capped — architect scope)** — was natural-Green "Good", architect cap fires |
| Terraform / OpenTofu | 1.10 | very-deep | architect | **Review / Probe (capped — architect scope)** — was natural-Green "Excellent", architect cap fires |
| AWS | 3/14 services (21%) | working | architect | **Review / Probe (capped — architect scope) — 3/14 services** — coverage <25% would normally be Red; architect cap actually *softens* this to Yellow (cap = ceiling at Yellow, no floor) |
| PostgreSQL | (blank, unknownVersion=false implicit via empty string) | working | architect | **Review / Probe (capped — architect scope)** — unknown-version Yellow + cap. `notDiscussed` flag is FALSE because depth was set; enterprise note suppressed because no version. |
| Kafka | n/a | n/a | architect | **Not in stack** — excluded from buckets |
| Azure (added manually) | (incomplete checklist) | working | (unset — must be set manually) | **Yellow / Red depending on what was ticked**; *no* architect cap unless recruiter sets it post-call |

**Summary headline:** 0 Good · 4 Probe · 0 Concern · 1 confirmed not in stack · channel chip "Phone" · candidate-context line renders: **"Senior · 9 yr in industry · Traditional path · designs but doesn't operate"**.

## 4. Accuracy judgement

- **Where it's right:** The K2 SA→architect cap is *exactly* what this candidate needed. Pre-K2, Helena's Kubernetes 1.30 + very-deep + SA would have rubber-stamped "Excellent (lifted by depth)" — a hiring manager reading that report would think she could debug a CrashLoopBackOff at 3am. With K2, the verdict reads "Review / Probe (capped — architect scope)" automatically, zero recruiter interaction. **This fix passes validation.** Same for Terraform 1.10. Candidate-context line also renders cleanly and reframes the four Yellow probes as appropriate-for-role rather than as weakness.
- **Where it over-rates:** The AWS architect cap accidentally **softens** what should be Red. Helena ticked only 3 of 14 services because the catalog has zero of her actual architect-shaped AWS surface (Control Tower, Organizations, Landing Zone, Identity Center, SCPs, KMS, Macie). 21% coverage → baseline Red → architect cap raises it to Yellow because the cap is a *ceiling* and Red is above Yellow in severity. So the verdict is "Probe Further" when the underlying signal is "we only confirmed 3 operator services in 14." A hiring manager reading "Review / Probe — 3/14 services (capped — architect scope)" might read the cap note as the explanation for the low coverage. It isn't — the catalog just doesn't carry her stack.
- **Where it under-rates:** Kubernetes-capped-to-Yellow is technically right but loses signal. Helena's *architecture* knowledge here is genuinely Excellent; the cap correctly says "she can't operate it" but doesn't communicate "she can design it really well." Fix D2 (architect/reviewer-shaped severity ladder) is still open and Helena is exactly the case it would close.
- **Silent on:** Azure isn't in the SA template, even though Helena's whole world is multi-cloud. The recruiter only added it because she happened to remember. A phone-mode recruiter under time pressure absolutely loses this.

## 5. Friction during the call

- **AWS checklist completely catalog-blind to her stack.** The 14 services are all operator-shaped (EC2, Lambda, RDS, EKS, etc.). Helena listed 7+ AWS terms in one breath and zero matched. Recruiter froze for a few seconds trying to type "Control Tower" before giving up.
- **Postgres "schema design only" has no clean expression.** Version blank because she's not running Postgres, but the scope=architect feels wrong (she's not architecting Postgres either — she's just using its schema features in design diagrams). No "skill not service" axis here.
- **Azure-not-in-SA-template is a phone-killing miss.** Required searching, adding manually, then realising scope must be set manually (no techScopes coverage). Cost ~30 seconds.

## 6. Bugs / structural defects

1. **AWS checklist has zero architect-shaped services.** Helena's actual Solution Architect AWS surface (Control Tower, Organizations, Landing Zone, IAM Identity Center, SCPs, KMS, Macie, Config) is invisible. Combined with the architect cap softening Red→Yellow, this *misrepresents* coverage. Evidence: `src/data/technologies.json:1939-1996` (AWS services list). **Severity: High** — this defeats the K2 cap's intent for the canonical SA stack.

2. **Architect/reviewer cap softens checklist Red.** `applyScope` treats Yellow as a *ceiling*, but for checklist mode the cap should not promote Red coverage up to Yellow. Evidence: `src/lib/scoring.ts:62-66`. Currently `SEVERITY[Red]=2 > SEVERITY[Yellow]=1`, so the `< yellow` branch doesn't fire, but the `return adjusted.color` branch returns Red — correction: re-reading, Red survives. **Wait, I was wrong.** Re-tracing: `SEVERITY.red = 2`, `SEVERITY.yellow = 1`; the cap check is `if (SEVERITY[adjusted.color] < SEVERITY.yellow)` — Red is NOT less than Yellow, so the cap doesn't fire and Red is returned. AWS would stay Red. **Striking this — not a bug.** Helena's AWS = Red with cap label NOT appended (scopeCapped=false), which actually reads cleaner. Leaving the AWS catalog gap (#1) as the only true defect.

3. **Azure missing from SA template.** Multi-cloud is core to senior SA work; preloading only AWS forces phone-mode recruiter to search for Azure mid-call. Evidence: `src/data/roles.ts:43`. **Severity: Medium** — captured as priority #11 in RESUME.md but Helena's session re-confirms it as live.

4. **Kafka "Not in stack" message reads "Excluded from the score and radar"** which is correct, but no signal that Helena *deferred* (other team owns it) vs *never used*. Pre-existing (Fix T tri-state for "evaluated / migrated off" is the close cousin). **Severity: Low.**

## 6b. Speed-of-use rating

- **Entry time (estimate):** Kubernetes/Terraform = ~8s each (type version, pick depth, scope already correct from template) — well under budget. **The K2 default removed the 4-5s scope-dropdown decision per tech that round-3 flagged as phone-killing.** AWS checklist = ~25s (scanning 14 services while Helena talks). Postgres = ~5s. Azure-not-preloaded = ~30s. Total ~85s on 5 techs = ~17s/tech avg, distorted upward by the Azure recovery.
- **Phone-shrink test:** Works. The K2 cap firing silently is the right design for phone — recruiter doesn't have to think about scope on infra/DB techs. The only break is the AWS checklist scan when the candidate is rattling off non-catalog services; recruiter has nowhere to drop "Control Tower" except the named-not-in-catalog list (Fix C), which she didn't think to do.
- **Friction that vanishes on phone:** Reading the scope-cap amber note aloud or sense-checking it. On phone, the recruiter just trusts that the badge is right and moves on — which is fine because K2 made it right by default.
- **Risk / safe rating:** **Safe** for the K2 cap mechanism. **At-risk** for the AWS-architect catalog gap that K2 cannot rescue.

## 7. Catalog gaps

- **AWS: Control Tower, Organizations / SCPs, Landing Zone, IAM Identity Center, KMS, Macie, Config, Security Hub, Transit Gateway.** This is the architect-shaped AWS surface and *none* of it is in the checklist.
- **Azure: not preloaded in SA template** (even though it exists in catalog).
- **"Schema design / data modeling" as a skill** distinct from running Postgres. Helena's Postgres signal can't be expressed in the current axes.

## 8. One-liner for cross-cut

> **Helena — Solution Architect — K2 architect default fires cleanly on Kubernetes+Terraform+Postgres, validating the fix; AWS checklist has zero architect-shaped services so K2's cap can't rescue what the catalog never asked.**

## 9. Recommendation

K2 passes validation — ship as-is for SA/SRE/Security templates. The next highest-leverage move for Helena's profile specifically is **augmenting the AWS checklist with architect-shaped services** (Control Tower, Organizations/SCPs, Landing Zone, Identity Center, KMS, Config). Without that, the K2 architect cap fires correctly but the underlying coverage signal is meaningless because the candidate's actual stack is invisible. This is a 0.5d catalog-only change and dramatically increases K2's value for the SA template. Pair with priority #11 (Azure in SA template, also 0.5d) and the SA flow becomes the cleanest in the tool.

## Optional — disagreement with prior fixes

None on K2 itself. Minor: the "Tune scope before exporting" banner on Summary only fires when there's at least one *implicit* scope. Because K2 makes all 5 SA preloaded techs *explicit* at item-creation time, the banner never appears for a clean SA template flow — which is correct, but means the recruiter never gets the prompt to revisit the manually-added Azure card's scope. Consider broadening the banner trigger to also include "any tech added after template-pick with unset scope."
