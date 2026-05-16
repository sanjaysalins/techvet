# Session 04 — Wendy Akpata (Senior, Lead Security AppSec)

**Agent:** sim-04 (round-4 validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-4-validation
**Channel:** Video (30-45 min, HM joins ~minute 17)
**Role template picked:** Security Engineer (AppSec)

## 1. Persona inhabited

Wendy is the AppSec lead at a UK general insurer (~2k engineers, regulated).
She owns the SAST/SCA pipeline (Semgrep + Snyk in GitHub Actions, Trivy on
container builds), runs threat-modelling sessions on every product launch,
and is the primary IR responder for app-layer incidents. She is the person
who *audits* AWS IAM/KMS policies and writes Falco rules for prod EKS —
but she has not personally `kubectl apply`'d to a prod cluster in over a
year, and her Terraform PRs are reviews, not authoring. She talks fluently
about OAuth2/OIDC and PKCE because she keeps catching auth bugs in PRs.
She'd describe herself as a "deep reviewer with shallow operator hands".

## 2. Call — abbreviated

Recruiter picks **Security Engineer (AppSec)** template. Template preloads
8 cards: python, oauth-identity, aws, kubernetes, docker, terraform, sql,
observability. K2 silently applies `reviewer` to the 5 infra techs.

> R: "Let's start broad — what's the stack you live in day to day?"
> W: "Burp Suite for manual testing, Semgrep for SAST, Trivy on every container,
>    Snyk for SCA, Vault for secrets, Falco runtime in our EKS clusters."
> [R: searches "Burp" → no results → clicks "+ Add 'Burp' as named-only" (~6 s)]
> [R: searches "Semgrep" → no results → adds named-only (~5 s)]
> [R: searches "Trivy" → no results → adds named-only (~5 s)]
> [R: searches "Snyk" → no results → adds named-only (~5 s)]
> [R: searches "Vault" → no results → adds named-only (~5 s)]
> [R: searches "Falco" → no results → adds named-only (~5 s)]
> W: "AWS — IAM heavy, KMS for envelope encryption, Macie for PII scans, GuardDuty for findings."
> [R: opens AWS checklist — ticks IAM. KMS/Macie/GuardDuty not in the list. R hesitates, ticks nothing else, picks depth=deep]
> [HM joins ~17 min. R now visibly toggling between named-only chips and AWS card.]
> W: "Kubernetes — I write Falco rules and read PodSecurityPolicy diffs; don't run kubectl much."
> [R: opens K8s card. K2 has scope already pre-set to `reviewer`. R picks depth=deep, leaves version blank.]
> W: "OAuth2, OIDC, PKCE, JWT, JWKS, MFA, passkeys all in our stack."
> [R: opens oauth-identity, ticks 7/13 services, depth=very-deep]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope (effective) | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| python | (untouched, no version) | unknown | operator (default) | Not discussed — excluded |
| oauth-identity | 7/13 ticks (~54%) | very-deep | operator | Yellow "Review / Probe — 7/13" — **no depth lift** because Fix A dropped lift on checklist mode |
| aws | 1/14 ticks (~7%) | deep | **reviewer (K2)** | Red — coverage <25% → Red. Reviewer cap is moot (already below Yellow). |
| kubernetes | (no version, untouched checklist? actually version-mode) deep | deep | **reviewer (K2)** | Yellow "Not yet assessed/unknown" — capped at Yellow by reviewer scope; Fix B blocks depth lift on unknown-version anyway |
| docker | untouched | unknown | reviewer (K2) | Not discussed |
| terraform | untouched | unknown | reviewer (K2) | Not discussed |
| sql | untouched | unknown | operator | Not discussed |
| observability | untouched | unknown | reviewer (K2) | Not discussed |
| Burp, Semgrep, Trivy, Snyk, Vault, Falco | named-only chips | — | — | No verdict — render in "Candidate mentioned — out of catalog (6)" |

**Summary headline:** 1 Green / 1 Yellow / 1 Red / 5 not-discussed / 6 named-only.
Radar: 3 categories (Auth, Cloud, DevOps) at most. Probably 2 — only oauth (Auth) and aws (Cloud) and kubernetes (DevOps) make it in. AWS at coverage-score of Red pulls the Cloud axis down hard.

## 4. Accuracy judgement

- **Where it's right:** K2 fires exactly as designed. Kubernetes deep-very-deep on a reviewer correctly does NOT become Excellent — caps at Yellow with the amber cap note. That's the Aaron failure case Riya's design was built to close, and it closes for Security too. HM watching can see the cap note and read "she reviews, doesn't operate" — that's real signal.
- **Where it over-rates:** Nothing significant on the scored bucket. The cap is doing its job.
- **Where it under-rates:** **AWS lands Red.** Wendy is a deep AWS security reviewer (IAM/KMS/Macie/GuardDuty/SecurityHub/Inspector) — but the AWS checklist is a compute/data shop's checklist (EC2/Lambda/ECS/S3/RDS/DynamoDB/API Gateway/SQS/CloudWatch/IAM/CFN/VPC/Step Functions). She ticks IAM and basically nothing else, and the K2 reviewer cap is irrelevant because she's already at Red from coverage. The report tells the HM "weak AWS coverage" when the candidate is *the security person you call when AWS IAM goes sideways*. This is Priya-redux from round-1: AWS checklist is role-blind.
- **Where it's silent on something the HM needs:** Everything that matters for AppSec. Burp/Semgrep/Trivy/Snyk/Vault/Falco render as 6 amber probe-target chips with **no verdict, no depth, no coverage**. The HM, watching live, reads this as "the recruiter took notes — now somebody else has to actually screen the candidate." The Security template preloads zero security tools. The named-only flow captures the *fact* that Wendy mentioned these, but says nothing about her actual mastery.

## 5. Friction during the call

- **Six consecutive no-results searches in front of the HM.** Each one is fast (~5 s) but they accumulate as a visible pattern. By the third search the HM is reading the screen ahead of the recruiter and watching the recruiter type "Burp" / "Semgrep" / "Trivy" with no UI affordance saying "this is normal — security tools aren't in this catalog." It reads as catalog poverty, not as graceful fallback.
- **AWS service list visibly missing security services.** The recruiter scrolled the AWS checklist looking for KMS, Macie, GuardDuty, SecurityHub. None present. She picked IAM, then stalled. HM saw the stall. The amber italic "AWS spans dozens of services" guidance footer reads almost defensively at this point.
- **K2 cap notes are well-placed, but the "capped — reviewer scope" copy reads as a downgrade rather than as fidelity.** A non-technical recruiter may not realize this is *more accurate*, not less.
- **The named-only chip strip on Assessment doesn't surface depth.** Wendy gave depth signal on every one ("I write Falco rules", "we use Burp daily") — chips capture name only. That signal is lost.

## 6. Bugs / structural defects

1. **Security template preloads zero security tools.** What. The template name says "Security Engineer (AppSec)" and the preloaded set is python + oauth + 5 infra reviewers + sql. The 5 most-named AppSec tools (Burp / Semgrep / Trivy / Snyk / Vault) are catalog-absent. Why it matters: this is *the* failure mode the template was built to address, and Fix K2 layered scope semantics on top without fixing the underlying catalog gap. Evidence: `src/data/roles.ts:103` techIds list vs. `src/data/technologies.json` — zero overlap with SAST/SCA/Secrets/Runtime. Severity: **Critical** (this is exactly Fix U on the round-3 priority list — still open).
2. **AWS checklist is role-blind.** What. The 14-service checklist serves a generic compute/data shop. For a security screen, IAM is the only relevant tick. Why it matters: a deep AWS security reviewer scores Red, contradicting reality. The reviewer-scope K2 cap doesn't help because she's not at Green to begin with. Evidence: `src/data/technologies.json:1939-1996` AWS services vs. AppSec stack (KMS/Macie/GuardDuty/SecurityHub/Inspector/Detective absent). Severity: **High** (this is the Priya-round-1 finding restated; Fix #8 on the master list — still open).
3. **Named-only chips lose depth + last-used signal.** What. The recruiter heard "we use Burp daily for manual testing" — that's depth=very-deep + lastUsed=current. Captured as a bare string. Why it matters: the HM reads a flat amber chip list and cannot distinguish "candidate evaluated it once" from "candidate is the team's Burp expert". Evidence: `src/types.ts` `namedNotInCatalog: string[]`. Severity: **Medium** (would need `{name, depth?, lastUsed?}` shape; covered partially by future Fix U closing the catalog gap, but if the gap persists this matters).
4. **K2 cap note language reads as a downgrade to non-technical readers.** What. "Verdict capped by scope — reviewer scope can't earn the higher tier" reads as "deduction". For a Security candidate it's the *correct* characterization. Why it matters: with the HM watching, the recruiter has to verbally explain that the cap is fidelity-not-penalty. That's friction the copy can absorb. Severity: **Low** (copy tweak — something like "Reviewer scope: caps at Yellow even with deep knowledge — this is the correct shape for an auditor/reviewer role.").

## 6b. Speed-of-use rating

- **Entry time (estimate).** Scored tech with checklist: search (3 s) + click-add (1 s) + open card (1 s) + tick services (1 s × N) + depth pick (2 s) + scope is auto from K2 (0 s) = ~10-14 s for AWS / oauth. Named-only: search-with-no-results (3 s) + click CTA (1 s) = **~5 s per name** — actually faster than a full tech.
- **Phone-shrink test.** What breaks on a phone:
  - The named-only flow itself stays fast (5 s × 6 = 30 s for all six). Survivable.
  - **AWS checklist hesitation does NOT survive phone.** The recruiter had time on video to scroll the list and pick IAM. On a phone with Wendy still talking, the recruiter would either freeze or tick nothing — defaulting to checklist 0/N untouched = Yellow "Not yet assessed" or 1/14 = Red. Either way wrong.
  - The HM-visible six-no-results pattern doesn't exist on phone (no audience), so the cosmetic friction vanishes — but the underlying gap (no security catalog) is *worse* because the recruiter has no slack to compensate.
- **Friction that vanishes on phone.** On video the recruiter could verbally narrate "let me add these as probe targets" to the HM. On phone there's no narration, so the named-only chips have to stand alone as evidence — and they're thin (see Bug 3).
- **Risk / safe rating.** **At-risk.** The two fixes under test (K2 + C) both technically work. But the composite outcome — Security candidate's PDF — is misleading on the dimension that matters (AppSec mastery is captured as 6 amber chips with no verdict, plus AWS Red). Fix U (security catalog) is the *unclosed gap* that K2 + C cannot substitute for.

## 7. Catalog gaps

- **Burp Suite, Semgrep, Trivy, Snyk, HashiCorp Vault, Falco** — all named, all absent. Most-cited AppSec tools in industry. Captured via named-only as designed, but with no verdict the report doesn't help the HM.
- **AWS security services** — KMS, Macie, GuardDuty, SecurityHub, Inspector, Detective, WAF, Shield, Config — none in the AWS checklist. Cascades into the Red verdict above.
- **Threat modelling / STRIDE / OWASP Top 10** — methodology, not tools. Same D4 hole the round-1 Mei session named.
- **GitHub Actions security rules** — code scanning / secret scanning / dependabot are not surfaced as services on github-actions (would need a similar checklist refactor).
- **Severity / vuln management workflow** — CVSS scoring, SBOM generation (Syft, CycloneDX) — absent.

## 8. One-liner for cross-cut

> **Wendy — Security Engineer (AppSec) — K2 reviewer cap fires correctly on the 5 infra techs, but with Burp/Semgrep/Trivy/Snyk/Vault/Falco captured only as bare named-only chips and AWS checklist still role-blind, the PDF tells the HM "weak AWS coverage, 6 probe targets" — the unclosed gap is Fix U (security catalog), not K2 or C.**

## 9. Recommendation

Ship Fix U (Security category — SAST/SCA/Secrets/Runtime/IaC-scanning/Auth-frameworks subcategories) and update the Security template's `techIds` to preload it. This is the highest-leverage change for AppSec screening — the K2 reviewer cap and Fix C named-only capture are both working as designed, but they're scaffolding around a missing catalog. As an intermediate step (2-hour fix), extend `namedNotInCatalog` to a `{name, depth?, lastUsed?, note?}` shape so depth signal isn't lost on the chip strip — even before the catalog gap closes, that lets the HM distinguish "evaluated once" from "team expert" on the probe-target list.

## Optional — Disagreement with prior fixes

No disagreement with K2 or C as shipped. K2's `reviewer` cap on the five Security infra techs is exactly right and the cap-note copy is well placed. Fix C's no-results CTA is fast and discoverable. My disagreement is with the *scoping* decision to ship them ahead of Fix U: for the Security template specifically, K2 and C together capture only the periphery of what a Security candidate actually does. Round 3 already named this (Tomi: "Security template preloads zero security tools" — bug 1 in his report). Round 4 confirms it: the fixes hold, the gap doesn't close.
