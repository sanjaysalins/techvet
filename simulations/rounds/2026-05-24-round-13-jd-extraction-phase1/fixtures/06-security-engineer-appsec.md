Senior Security Engineer — AppSec
London, UK (hybrid — 1 day per week on-site)

The team
A 6-person product-security org inside a 900-person FinTech (regulated by FCA + PRA). We pair with product teams on threat models, run the SDLC controls, and own the secrets / supply-chain story. We're hiring a senior AppSec engineer to take over the static analysis + dependency scanning surface.

You'll spend your time
- Owning Semgrep rules + custom analyzers (we maintain ~120 rules across 14 repos)
- Triaging + tuning Snyk / Trivy findings (the two together produce ~400 open findings; signal-to-noise is your problem to solve)
- OWASP ZAP + Burp Suite runs against the staging fleet (we currently do this quarterly; we'd like monthly)
- Threat modelling with product teams (LINDDUN for PII flows, STRIDE for everything else)
- Cosign + Sigstore signing for the build artefact line
- Vault policy reviews — we use HashiCorp Vault, ~200 active policies

Required
- 6+ years in product / application security at scale
- Strong with Semgrep AND one of (Snyk / Trivy / Anchore)
- OWASP Top 10 + OWASP ASVS at Level-2 fluency
- Comfortable reading code in at least two of: Java, Python, Go, TypeScript
- Familiar with SAST vs SCA vs DAST trade-offs and when each catches what

Strongly preferred
- Cloud security at the AWS Landing Zone / IAM Identity Center level
- Familiarity with KMS / Macie / GuardDuty / Security Hub / Inspector
- Experience with OAuth 2.0 + OIDC flows (we use Auth0 for customer-facing, Okta for internal)
- Some background in Falco for runtime detection
- Experience with the SLSA framework (we're at L2 attestation, pushing to L3)

Not relevant
- Network security / firewalls / WAF tuning (separate team)
- Mobile pentest (separate team — they own iOS + Android)
- Game security / anti-cheat
- We don't write any .NET or PHP, so deep expertise there isn't required

Probably won't suit you
- If your last role was network ops or pure-infrastructure security — the gap to AppSec ASVS / threat modelling is bigger than we can close in onboarding

Tech we use day-to-day
Semgrep, Snyk, Trivy, OWASP ZAP, Burp Suite, Cosign, Sigstore, HashiCorp Vault, Auth0, Okta, Falco, AWS (Landing Zone / IAM Identity Center / KMS / Macie / GuardDuty), GitHub Actions for CI.
