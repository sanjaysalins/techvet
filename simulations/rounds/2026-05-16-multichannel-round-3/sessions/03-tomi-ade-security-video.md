# Session 03 — Tomi Ade (Lead Security AppSec, 7 yr)

**Agent:** sim-agent-03
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Video panel (30-45 min, hiring manager joins partway around the 15-20 min mark)
**Role template picked:** Security Engineer (AppSec)

## 1. Persona inhabited

Tomi is a London-based Lead AppSec at a UK challenger bank, ex-pen-tester, two years embedded in product security. She owns the SAST/SCA pipeline (Semgrep + Snyk + Trivy/Grype in CI), runs the Burp licence pool for the team, and is the on-call escalation for app-layer incidents. She thinks in threat models — STRIDE on every new product, OWASP ASVS as her baseline. She *talks about* HashiCorp Vault as if she runs it; in reality she consumes it (transit engine, dynamic DB creds, AppRole) and her team-mate Jay owns the cluster. She'll quote `vault kv get` confidently and over-state hands-on cluster ops. She codes Python for tooling/Lambdas (Boto3, scripts that hit GuardDuty + Security Hub) — author scope, not operator. Her AWS depth is real but specifically IAM/KMS/SCP/Organizations/GuardDuty/Security Hub — not the compute/data services the catalog scores against.

## 2. Video panel — abbreviated

> R: "Tomi, walk me through your day-to-day stack — what do you reach for first?"
> T: "Burp Suite Pro every morning, then Semgrep for SAST, Trivy and Grype for our images, Falco runtime, and Vault for secrets management."
> [Recruiter picks **Security Engineer (AppSec)** template — preloads python, oauth-identity, aws, kubernetes, docker, terraform, sql, observability. None of what Tomi just said is in there.]
> [Recruiter searches "Burp" → 0 results. Searches "burpsuite" → 0. "Semgrep" → 0. "Trivy" → 0. "Grype" → 0. "Falco" → 0.]
> R (visibly stalling, HM not yet on call): "OK, we'll capture those in notes. What about secrets management?"
> T: "Vault — I run a multi-cluster Vault deployment, transit engine for app-layer encryption, dynamic Postgres creds, AppRole auth for our services."
> [Recruiter searches "Vault" → 1 hit: **Ansible Vault (secrets)**. Wrong product. Adds nothing.]
> [HM joins ~minute 17. Recruiter pivots to what IS in template.]
> R: "What AWS services do you use?"
> T: "IAM heavy, KMS for envelope encryption, Organizations + SCPs, GuardDuty, Security Hub, Macie, Config, and CloudTrail for audit."
> [Recruiter opens AWS checklist (14 services). Ticks **iam**. KMS not present. GuardDuty/SecHub/Organizations/SCPs/Macie/Config/CloudTrail — all absent. Ticks **vpc** because Tomi mentioned PrivateLink. 2/14 = 14% → Red.]
> R: "OAuth?"
> T (rattles off device-flow, PKCE, SAML, SCIM, JWT validation pitfalls, refresh-token rotation, mTLS for service-to-service).
> [Recruiter ticks 7/9 oauth-identity services → Green.]
> [Recruiter, on Python: types "3.12", scope "author", depth "working" → Green. K8s/Docker/Terraform: Tomi reviews IaC PRs but doesn't author → recruiter sets scope=reviewer where she remembers, leaves it default elsewhere.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | 3.12 | working | author | Good (Green) |
| OAuth / OIDC | 7/9 services | working | (default) | Good — 7/9 services |
| AWS | 2/14 services (IAM, VPC) | working | (default) | Concern — 2/14 services (Red, ~14%) |
| Kubernetes | "1.29" | working | reviewer | Review / Probe (capped — reviewer scope) |
| Docker | empty + "Don't remember" | working | author | Review / Probe (no enterprise note — depth working passes the gate, but version unknown so no green-lift) |
| Terraform | "1.7" | shallow | reviewer | Review / Probe (capped — reviewer scope) |
| SQL | 0/N untouched | unknown | — | Yellow "Not yet assessed" (filtered out by Fix G) |
| Observability | 1/14 (Sentry only) | shallow | reviewer | Concern — 1/14 services |
| Burp / Semgrep / Trivy / Grype / Falco / Vault / Snyk / OWASP ZAP | NOT IN CATALOG | — | — | Captured only in mandate free-text or recruiter's own notes. Invisible to PDF. |

**Summary headline:** ~2 Green, ~2 Yellow, ~2 Red, plus a Not-discussed bucket for SQL. Radar shows 4-5 categories. **The headline reads "weak AWS, weak observability, OK identity" — the precise inverse of Tomi's actual signal.** Her entire security toolchain is in the notes field at most.

## 4. Accuracy judgement

- **Where it's right:** OAuth/OIDC verdict is genuinely a strong Green — Tomi can ship auth. K8s/Terraform reviewer-cap is correct (Fix K firing as designed; she does review IaC, doesn't operate clusters).
- **Where it over-rates:** Python Green is overgenerous — she's a glue-script author, not a back-end Python engineer; depth=working with no production-service evidence shouldn't go Green on a 3-line probe.
- **Where it under-rates (the headline failure):** AWS = Red because IAM and VPC are the only checklist hits. Tomi's AWS practice is **the entire AWS security surface** (KMS, Organizations, SCPs, GuardDuty, Security Hub, Macie, Config, CloudTrail, Inspector). Catalog has zero of those. The denominator is built for a back-end engineer, not a security engineer. She gets penalised for breadth she actually has.
- **Where it's silent:** Burp / Semgrep / Trivy / Grype / Falco / Vault / Snyk / OWASP ZAP / Checkov / Wiz / Prowler — **the entire AppSec toolchain**. The PDF tells the HM nothing about the candidate's primary working surface. The Security Engineer template is decorative — it preloads back-end-engineer-with-IAM-checked, not a security engineer's stack. Diego (round 1) and round-2 confirmation flagged this; nothing has shipped (Fix I lists Vault/Burp/Semgrep but is open).

## 5. Friction during the call

- Six dead-end searches in the first three minutes (Burp, Semgrep, Trivy, Grype, Falco, Vault). All visible to HM after minute 17. The Vault search returning Ansible Vault is *worse than zero* — the recruiter could mis-tap-add it.
- AWS checklist forces the recruiter to read 14 service names while Tomi rattles off 8 services that aren't there. The recruiter's eye-flick says "I can't keep up" — and HM sees it.
- Reviewer scope dropdown is the right answer for K8s/Terraform but it's the third dropdown on the card. With HM watching, the recruiter has to think about scope semantics on each tech — there's no "this candidate is a reviewer-by-default" mode.
- "Not in stack" button doesn't help here — Tomi DOES use these tools, the *catalog* doesn't.

## 6. Bugs / structural defects

1. **Vault search collision.** Typing "Vault" returns Ansible Vault, a sub-checkbox of an entirely different tool. A security recruiter will mis-add it. The HashiCorp Vault product (a top-15 secrets-management tool) is missing entirely. Evidence: `src/data/technologies.json` — 2 matches for "vault", both Ansible/Azure key vaults. **Severity: High.**

2. **Security Engineer template is decorative.** `roles.ts:73` preloads `python, oauth-identity, aws, kubernetes, docker, terraform, sql, observability` — zero security tools. The template is "back-end engineer with OAuth probes". Hits 9/12 of round-1 Diego's findings AND this session. **Severity: Critical** (template lies to the recruiter about what they're about to vet).

3. **AWS checklist services are persona-blind.** 14 services, all back-end / data ones. KMS, Organizations, SCPs, GuardDuty, Security Hub, Config, CloudTrail, Macie, Inspector — none present. A security engineer's AWS coverage scores Red regardless of actual depth. RESUME priority #8 (role-aware AWS checklists) explicitly names this; not shipped. **Severity: High.**

4. **Whole catalog category missing.** No "Security" category. SAST/DAST/SCA/IaC-scanning/Runtime/Secrets/Frameworks (OWASP ASVS, NIST 800-53, threat-modelling) — none. Diego flagged this round 1; Fix I (round 2) lists Vault/Burp/Semgrep but no Trivy/Grype/Falco/Snyk/ZAP. **Severity: Critical for security-template usefulness.**

5. **Search returns nothing for unknown techs (no capture path).** When "Semgrep" returns 0, the recruiter has nowhere to log "candidate named Semgrep". Mandate free-text + per-tech notes are the only options, both invisible from the radar/buckets. Fix C (named-but-not-in-catalog) is open. With HM watching, six 0-result searches read as recruiter incompetence even though it's a tool gap. **Severity: High.**

6. **AWS denominator should be persona-tagged.** A 14-checklist scored uniformly assumes one shape of AWS user. Adding KMS+GuardDuty+SecHub+Config etc. as additional services without tagging would penalise back-end engineers in turn. The fix needs `serviceTags: ["security", "data", "compute", ...]` or per-template denominator subsets, not just additions. **Severity: Medium (design note, not a bug).**

7. **`.searchAliases` for product-name collisions.** "Vault" needs to disambiguate HashiCorp vs Ansible vs Key Vault. Same problem latent for "Identity" (Azure AD vs Okta vs OIDC concept). **Severity: Medium.**

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** For techs that ARE in catalog: search (2s) + click-add (1s) + version (3s) + depth (2s) + scope (3s, harder semantics) = **~11s/tech** — within the 10-15s phone budget. For checklist tech (AWS): add (3s) + read 14 services + tick 4 = **~25-40s** depending on candidate pace. **Above phone budget.** For not-in-catalog (Burp/Vault/Semgrep): search (2s) + 0 results (cognitive: where do I put this? 3-5s) + abandon or type into notes (5s+) = **~10-15s of dead time per missing tech**, repeated.
- **Phone-shrink test.** This session's six dead-end searches would torch a 5-min phone slot on minute 1-3. The recruiter has no fallback ritual — they fall back to notes-typing, which the Summary doesn't surface. By the time they get to OAuth probes the candidate has moved on to Kubernetes.
- **Friction that vanishes on phone.** The recruiter HAD time to read all 14 AWS services aloud and mentally map them to what Tomi was naming; on a phone screen they'd tick 1-2 by ear and move on. They HAD time to set scope=reviewer thoughtfully on K8s and Terraform; on phone they'd skip the dropdown and let the catalog default fire (no defaultScope set on K8s/Docker/Terraform — so it stays "operator" implicit, which over-rates her).
- **Risk / safe rating: Unworkable.** This channel is "Unworkable on phone" twice over: catalog gaps (6 of 10 named tools missing) + scope axis requires manual work for an entire reviewer-shaped persona. Even the video version with HM-visible 0-result spiral is borderline-unworkable for the channel's reputation cost.

## 7. Catalog gaps

Named by Tomi, not in catalog: **HashiCorp Vault, Burp Suite, Semgrep, Trivy, Grype, Falco, Snyk, OWASP ZAP, Checkov, AWS KMS, AWS Organizations / SCPs, GuardDuty, Security Hub, Macie, Config, CloudTrail, Inspector**. Methodologies named: STRIDE threat-modelling, OWASP ASVS — D4 (methodology) territory.

Wrong-category / collision: "Vault" search returns Ansible Vault (Ansible sub-feature). Hijacks the search slot for the more-common product.

Tier ranges: n/a (most missing entries).

## 8. One-liner for cross-cut

> **Tomi Ade — Security Engineer (AppSec) — six 0-result searches in front of the hiring manager (Vault/Burp/Semgrep/Trivy/Grype/Falco) + Red verdict on AWS for the actual AWS-security expert; template is decoratively named, catalog has no Security category, "Vault" search collides with Ansible Vault.**

## 9. Recommendation

Ship Fix I's security slice **first**, not whole-catalog. The minimum viable set is six entries: HashiCorp Vault, Burp Suite, Semgrep, Trivy, Snyk, OWASP ZAP — plus a `searchAliases` field on `Technology` so "Vault" disambiguates and "burpsuite"/"burp suite" both hit. In the same patch, retire the Security Engineer template's current preload and replace with `[oauth-identity, aws, vault, semgrep, trivy, burp-suite, snyk]` — that's the actual screen. Without this, the security template visibly fails in front of every hiring manager who watches a video panel; the verdict is the inverse of the candidate's real signal; and the recruiter's competence is on display alongside the tool's gap.

## Disagreement with prior fixes

Fix K (scope defaults on AI/ML libs) is correct in spirit but the wrong category got the treatment. AppSec is the textbook reviewer-default category — `defaultScope: "reviewer"` on K8s, Terraform, Docker, AWS would auto-cap for the security persona without recruiter input. Currently the recruiter has to set scope=reviewer per tech, which doesn't survive phone. Suggestion: per-template scope hints (`templateDefaultScope` on `RoleTemplate.techIds` mapping) so Security/SA templates carry a different default than Backend.

## Out-of-scope observations

If the security template is going to claim to vet security engineers, the project owner has to commit to either (a) a curated Security catalog with ongoing maintenance (Burp/Semgrep/Trivy versions move quickly) or (b) explicitly scoping security as out-of-charter and removing the template. The current middle ground is the worst of both — recruiters trust the template, the template silently fails, and HMs see the failure live.
