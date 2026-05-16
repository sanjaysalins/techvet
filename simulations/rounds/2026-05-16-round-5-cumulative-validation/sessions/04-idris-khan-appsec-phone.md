# Session 04 — Idris Khan (Mid AppSec, 4 yr, US healthtech)

**Agent:** sim-04 (round-5 cumulative validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-5-cumulative-validation
**Channel:** Phone (5-10 min)
**Role template picked:** Security Engineer (AppSec)

## 1. Persona inhabited

Idris is the kind of mid-level AppSec engineer that healthtech orgs love and underpay. Came up via the dev-tools-and-CI route rather than offensive security — he writes Semgrep rules the way his backend peers write Python decorators, treats Trivy like a unit-test runner, and is on the IR rotation but doesn't claim red-team chops. STRIDE diagrams in Lucid, OWASP Top-10 mapped against every new service in design review. Burp Suite is his actual daily driver (Repeater + Intruder; he hasn't authored a BApp). Vault: ops the KV + dynamic-secrets paths; AWS surface is the security-team slice (KMS / Macie / GuardDuty / Security Hub), not the platform-team slice (no Landing Zone, no CodeBuild). Talks fast, names tools precisely, knows what he doesn't know.

## 2. Phone call — abbreviated

> R: "Hi Idris — quick screen, 7 minutes. What's your stack day-to-day?"
> I: "AppSec at a US healthtech, 4 years. SAST/SCA pipeline owner, threat-models, IR rotation."
> [R: picks **Security Engineer (AppSec)** template — 15 techs preload incl. all 7 sec tools]
> [R: fills meta — seniority=Mid, years=4, pathType=Traditional]
> I: "Burp Suite daily — Repeater, Intruder, Scanner, Collaborator. No custom BApps."
> [R: scrolls to Burp card → ticks proxy-intercept / repeater / intruder / scanner / collaborator / authz-bypass (6/10) → depth=deep → lastUsed="current"]
> I: "Semgrep, custom rules, taint mode, CI gating, diff-baseline so PRs don't drown in noise."
> [R: Semgrep card → ticks custom-rules / ci-integration / taint-mode / diff-baseline / pre-commit (5/10) → depth=deep]
> I: "Trivy on every container — image + IaC + SBOM."
> [R: Trivy → container-scan / iac-scan / sbom / ci-integration (4/10) → depth=working]
> I: "Vault — KV, dynamic for DB + AWS creds, audit feed to Splunk. Don't run PKI."
> [R: Vault → kv-secrets / dynamic-secrets / audit-siem / policies-hcl (4/10) → depth=working]
> I: "AWS — KMS, Macie, GuardDuty, Security Hub. Threat-model the architecture, don't run it."
> [R: AWS card — list is **filtered to security subset** — ticks kms / macie / guardduty / security-hub / iam (5/~12 visible) → notes "scope=reviewer pre-applied by template, good"]
> I: "OAuth2, OIDC, JWT — we federate via Okta. Python for tooling."
> [R: oauth-identity → oauth2 / oidc / jwt / pkce / refresh-tokens (5/10) → depth=working. Python → "3.11" depth=working]
> I: "Methodology — STRIDE every design review, OWASP Top-10 baseline, secure-SDLC integration is half my job."
> [R: methodology chips → clicks STRIDE / OWASP Top 10 / Secure SDLC — three clicks total]
> [R: notes Snyk + OWASP ZAP + Falco preloaded but Idris didn't mention → leaves untouched (notDiscussed)]

## 3. What TechVet would output

| Tech | Coverage / Version | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Burp Suite | 6/10 (60%) | deep | operator (implied) | Yellow — "Review / Probe — 6/10 services" (60% < 66% Green floor; Fix A blocks depth-lift on checklist) |
| Semgrep | 5/10 (50%) | deep | operator | Yellow — 5/10 services |
| Trivy | 4/10 (40%) | working | operator | Yellow — 4/10 services |
| Vault (HashiCorp) | 4/10 (40%) | working | operator | Yellow — 4/10 services |
| AWS | 5/~12 visible (security subset; 5/26 total) | working | reviewer (K2 pre-applied) | Yellow — "Review / Probe (capped — reviewer scope) — 5/26 services" |
| OAuth / OIDC | 5/10 (50%) | working | operator | Yellow — 5/10 services |
| Python | 3.11 | working | operator | Green — "Good" (3.11 ≥ 3.10 Good band) |
| Snyk / OWASP ZAP / Falco / Kubernetes / Docker / Terraform / Observability / SQL | (untouched) | — | preloaded | **notDiscussed** — excluded from buckets, rendered in separate section |
| Methodology chips | STRIDE / OWASP Top 10 / Secure SDLC | — | — | Display-only D4 section: "Methodology + practices (3)" |

**Summary headline (predicted):** 1 Green (Python) / 6 Yellow (Burp, Semgrep, Trivy, Vault, AWS, OAuth) / 0 Red / 8 not-discussed. Channel chip: "Phone". Candidate context line: "Mid · 4 yr in industry · Traditional path". Radar covers Security (5 techs) / Auth (1) / Cloud (1) / Language (1) — 4 categories, well over the 3-category minimum.

## 4. Accuracy judgement

**Where it's right:**
- Fix U works exactly as advertised. All 7 of Idris's named tools are first-class catalog entries he can tick services on. Compared to Wendy's round-4 PDF (six bare amber name-only chips, zero verdict), Idris's report carries actual depth signal on every tool. **This is the cleanest AppSec PDF the tool can produce today.**
- K2 reviewer-cap on AWS fires automatically the moment the template loads. Recruiter never touches the scope dropdown. The "capped — reviewer scope" label tells the HM "he doesn't run AWS, he audits it" without the recruiter typing a word.
- AWS role-aware filter (security subset) hides CodeBuild / SageMaker / Bedrock noise. KMS / Macie / GuardDuty / Security Hub / Inspector all surface. Recruiter doesn't scroll past 14 irrelevant services to find the security ones.
- D4 chip-set is *exactly* the AppSec methodology vocabulary. STRIDE / OWASP / SDLC / SLSA / PTES / zero-trust — every one is a real practice an AppSec engineer would name. Three clicks captured the entire methodology section.
- Fix M renders cleanly: "Mid · 4 yr in industry · Traditional path" — no over-specification, no awkward sub-1-year months hack.

**Where it over-rates:** Nowhere obvious. The Yellow verdicts on Burp/Semgrep/Trivy/Vault are *deserved* on coverage (40-60% of curated services). The recruiter and HM can read "this is a real operator on each of these, but not the team's deepest expert" — which is exactly Idris.

**Where it under-rates:** Mildly. Burp at 6/10 with depth=deep + lastUsed=current narrowly misses the 66% Green floor. Fix A intentionally blocks the depth-lift so the depth signal can't push it over. Defensible, but a *deep daily operator* of Burp is arguably a Green even at 6/10 — the missing 4 services (Collaborator he ticked; Macros, CI/Enterprise, WebSocket, BApp authoring) are reasonable gaps for an in-house AppSec engineer who isn't building offensive tooling. The verdict reads correctly as Yellow ("Review / Probe"); the HM gets the right action ("ask him about Burp depth"); the framing isn't wrong.

**Where it's silent on something a hiring manager would need to know:** The "8 not-discussed" line is a lot. Snyk + OWASP ZAP + Falco + Kubernetes + Docker + Terraform + Observability + SQL all sit in the not-discussed section. For Snyk / ZAP / Falco that's accurate (Idris didn't claim them — he's not on those tools). For Kubernetes / Docker / Terraform / Observability / SQL that's a 7-minute-phone-call artifact — the recruiter ran out of time to probe infra-reviewer scope. Fix G handles this *correctly* (excluded from buckets, rendered separately) but the HM looking at "8 not-discussed" out of 15 preloaded techs may read it as "incomplete screen" rather than "tight phone call." Not a bug — a phone-channel ceiling.

## 5. Friction during the call

Genuinely low. The flow is:
- Template pick (1 click) → 15 techs preloaded.
- For each named tool: scroll to card (chevron-jump or scroll), tick 4-6 services (5-8 clicks), pick depth (1 click). ~25-35 seconds per tech.
- AWS: same flow but the filtered list (general+security tag) is shorter so faster to scan.
- Methodology: 3 chips clicked from a curated row. ~5 seconds total.

What the recruiter actually thinks about:
- **No "which template" hesitation** — Security template is unambiguous from "AppSec at a healthtech, threat-models, IR rotation."
- **No "is Vault in here?" search panic** — it's preloaded as a card so the recruiter just scrolls.
- **No scope-dropdown decision** — K2 pre-applied reviewer to AWS / K8s / Docker / Terraform / Observability. Recruiter doesn't have to decide what "reviewer" means.
- **No depth confusion on security tools** — recruiter picks depth=deep/working based on whether Idris said "daily" or "we use it." Easy.

One small friction: the AWS card filter hint ("X services hidden — filtered for Security Engineer (AppSec)") is visible but didn't slow the recruiter down because she wasn't *looking* for the hidden services. If she had been (Idris had said "we also use CodeBuild"), the hint would be the right disclosure — but on the happy path it's nearly invisible.

## 6. Bugs / structural defects

I went in looking for them and didn't find structural defects. The two minor observations below are framing nits, not bugs.

1. **6 Yellows + 1 Green reads as "everything is Probe Further" at-a-glance.** What. The Summary bucket histogram for Idris is heavily Yellow-weighted (6 of 7 scored items). Why it matters: a hiring manager skimming the report top-to-bottom may read "mostly amber → mediocre candidate" when the actual story is "every Yellow is a *real-operator-with-coverage-gaps*, not a *probe-the-existence-of-the-skill*." The Yellow verdict semantically conflates two very different signals here (under-ticked-but-deep operator vs untouched-card). Evidence: `src/lib/scoring.ts:371-373` — 25%/66% thresholds apply identically regardless of depth on checklist mode (Fix A is correct; the framing on Summary is what's missing). Severity: **Low** (this is a Summary-presentation concern, not a scoring bug — the per-item verdict is right). Possible cheap fix: tier-bucket sub-label like "Yellow: 5 real operators below Green floor" vs "Yellow: 1 not yet probed."

2. **`burp-suite` Burp depth doesn't surface a "deep but under-ticked" hint.** What. When the recruiter ticks 6/10 services AND picks depth=deep AND lastUsed=current, the verdict is Yellow with a generic "Coverage: 60% of curated services" note. No note distinguishing "this candidate is deep on the services they ticked but didn't tick the ones outside their workflow" from "this candidate is shallow across the board." Why it matters: HMs need to know whether to ask Idris about the missing 4 services or just accept he doesn't do that work. The current report says nothing. Evidence: `src/lib/scoring.ts:394-398` — note text branches on `coverage.selected === 0` vs falls through to `checklistGuidance`; no depth-aware branching. Severity: **Low** (would need a `depth-vs-coverage gap` hint; cheap to add but not blocking — the suggestedProbes section partially substitutes).

That's the entire defect list. I went looking for collisions between K2 + Fix U + AWS filter + D4 + Bug 4 (named-only depth) on a single card and found none — the controls compose cleanly.

## 6b. Speed-of-use rating

- **Entry time (estimate).** Tech-with-checklist (Burp, Semgrep, Trivy, Vault, OAuth): ~25-30 s each (scroll-to-card + 5-6 service clicks + depth dropdown + lastUsed type). AWS with filtered subset: ~30 s (filter helps, but 5 ticks). Python: ~8 s (version + depth). Methodology chips: ~5 s for 3 clicks. **Total: ~3.5 min of TechVet input across the 7-min call.** Comfortable inside the budget.
- **Phone-shrink test.** Already shrunk to phone — this *is* the phone session. Nothing breaks. The K2 pre-applied scope is the load-bearing fix: without it the recruiter would face six scope dropdowns mid-call and the session would collapse. With K2, the recruiter literally never thinks about scope.
- **Friction that vanishes on phone.** None observed. The methodology chip-row could in principle be a friction point (recruiter scanning 6 chips to pick 3) but the AppSec vocabulary is unambiguous enough that the recruiter picks STRIDE / OWASP / SDLC by-name without parsing the rest. Free-text input would be slower; chips win on phone here.
- **Risk / safe rating.** **Safe.** This is the happy path. The cumulative composition (Fix U + K2 + AWS filter + D4 + Fix M + Channel chip + notDiscussed flag) survives the phone constraint, produces a defensible PDF, and tells the HM a true story about Idris.

## 7. Catalog gaps

None observed for this persona. Every tool Idris named is a first-class catalog entry. The Security catalog (Fix U) is complete for a mid-AppSec at a non-enterprise: Burp Suite, Semgrep, Trivy, Snyk, OWASP ZAP, Vault, Falco. If Idris had named **Checkmarx, Veracode, Fortify** (enterprise SAST he didn't claim), **Wiz / Lacework / Orca / Prisma Cloud** (CSPM tools), **CrowdStrike** (runtime detection), or **CyberArk / 1Password Secrets Automation** (alt secrets vaults), they'd be gaps — but those are out-of-scope for this persona. The catalog covers the open-source / CI-native AppSec stack precisely.

One adjacency worth noting (not a gap, just an observation): the AWS `inspector` service tag is `["security"]` so it surfaces for Security templates. Idris didn't mention it but it's there waiting. That's the right shape.

## 8. One-liner for cross-cut

> **Idris — Security Engineer (AppSec) — Fix U + K2 + AWS-filter + D4 compose cleanly into the cleanest AppSec PDF TechVet can produce; one minor framing concern (6 Yellows reads as "mostly amber" to an HM skimming, but per-item verdicts are correct).**

## 9. Recommendation

The Security recruiting path is structurally fixed. The single highest-leverage *additional* change wouldn't be a scoring/catalog fix — it'd be **a Yellow-bucket sub-label on Summary** that distinguishes "real-operator-below-Green-coverage-floor" from "not-yet-probed / 0 ticks." Idris's report has 6 Yellows that mean very different things to an HM (5 are "deep operator, under-ticked" and 1 is "untouched"). A one-line histogram sub-grouping ("Yellow: 5 with coverage signal · 1 untouched") would let the HM read the report at-a-glance and reach the right action without scrolling per-card. Low effort; high reader-comprehension value; closes the only remaining ambiguity on what is otherwise the post-fix happy path.

## Out-of-scope observations

- The "8 not-discussed" items in Idris's report (Snyk / ZAP / Falco / K8s / Docker / Terraform / Observability / SQL) is partly a *template breadth* issue — the Security template preloads 15 techs because AppSec spans a wide tool surface, but a 7-min phone call can realistically probe 6-8 of them. This isn't a TechVet bug — it's a calibration question about whether the Security template should ship a "core 8" + "extended 7" split, or stay as-is and trust Fix G to render the not-discussed section cleanly. The latter is what's shipped and it works; I'd leave it alone.
