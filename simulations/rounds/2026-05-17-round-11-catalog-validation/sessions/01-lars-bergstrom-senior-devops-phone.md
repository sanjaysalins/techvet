# Session 01 — Lars Bergstrom redux-redux (Senior DevOps / Platform, phone)

**Round:** 11, catalog-validation post-batch-11-DevOps-adds
**Date:** 2026-05-17
**Channel:** Phone, 10 min hard cap
**Recruiter:** Sigrid (Stockholm hedge fund — same role spec as
rounds 9 and 10; third pass after the hiring manager asked for one
more written check)
**Candidate:** Lars Bergstrom, 35, 11 yr platform engineer at a
Stockholm fintech (identical persona to rounds 9 and 10)
**Template under test:** `devops` — 8 preloads unchanged from round 10
**Catalog under test:** 6 new round-11 DevOps entries —
`argo-rollouts`, `karpenter`, `backstage`, `unleash`, `crossplane`,
`cosign-sigstore`

---

## 1. Persona inhabited

Third pass on Lars. Same persona, same stack, same phone, same
recruiter. The only thing that's changed is that batch 11 shipped
what batch 9 deferred: the six DevOps catalog entries that re-fired
as search-fails in round 10's saturation note.

Stack: K8s 1.30, ArgoCD 3.x, Argo Rollouts (canary + AnalysisTemplates
+ Istio traffic split + auto-rollback), Helm 3.15, Terraform 1.9, GHA
(self-hosted ARC), full obs stack (OTel / Prom / Grafana / Loki /
Tempo), Vault HCP (deep), Karpenter (replaced Cluster Autoscaler 14
months ago), Backstage (2 yr in, 4 golden paths + 2 custom plugins),
Unleash (self-hosted, cluster admin + consumer-side SDK), Crossplane
(evaluated 3 months, didn't ship — governance lost to Terraform),
cosign + Sigstore + SLSA L3 target (keyless OIDC, Rekor on, Kyverno
admission policy). Six methodology chips ticked unprompted each round.

He IS the shape the round-11 catalog batch was designed against. If
any new entry's service list misreads against his stack, this is
where it shows up.

---

## 2. Phone call — abbreviated

**00:00.** Sigrid picks **DevOps / Platform**. 8 cards render
unchanged from round 10. Chip row below.

**00:15 — 03:30.** 8 preloads on autopilot, same verdicts as rounds
9/10: K8s 1.30 very-deep Green / ArgoCD 11/12 Green / Helm 3.15 Green
/ Terraform 1.9 Green / GHA 12/12 Green / Observability 7/13 Green
(depth-lifted) / Vault 7/10 Green (depth-lifted) / Docker
"don't remember" Yellow. **No preload regressions.** ~3.5 min in.

**03:30 — pivot.** Sigrid: "anything else you run we haven't named?"
Lars: Argo Rollouts, Unleash, Karpenter, cosign + SLSA, Crossplane
(evaluated), Backstage — same list as round 10.

**03:40 — Argo Rollouts.** Search `Argo Rollouts` → catalog hit.
8-service checklist opens. Lars: "canary primary, AnalysisTemplates
on Prom metrics, Istio traffic split, auto-rollback on error-rate
breach, ArgoCD sync-wave integration, manual prod promotion." Ticks
6/8 — canary, analysis-templates, traffic-management, rollback-
automation, argocd-integration, manual-promotion. Skips blue-green
(not used) and experiment-resource ("A/B is in Unleash, not in the
deployment strategy"). Depth deep. 6/8 = 75% → Green. ~30s.

**04:10 — Karpenter.** Search → catalog hit. Lars: "NodePools per
workload class, EC2NodeClass with org-AMI + OTel userData, both
consolidation policies on, 60% spot for batch + stateless web,
instance diversification m6i/m6a/m7i, drift on, taints for batch,
PDBs everywhere." **Ticks 8/8.** Depth deep → Green. ~35s.

**04:45 — Backstage.** Search → catalog hit. Lars: "Software Catalog
from GitHub org, Scaffolder for 4 golden paths, TechDocs across
services, 2 custom plugins (on-call rota + ArgoCD sync), OIDC via
Vault, k8s plugin on but limited, CI on ArgoCD + GHA, self-hosted
on platform cluster." **Ticks 8/8.** Depth deep → Green. ~40s.

**05:25 — Unleash.** Search → catalog hit. Lars: "boolean + variant
toggles, gradual + userId + IP strategies, constraints on country /
role, A/B variants for trading-UI, server-side (Go/Python) +
client-side (React) SDKs, lifecycle audit at 90 days, OpenFeature
roadmap not shipped, self-hosted with HA + backups." Ticks 7/8 (skips
openfeature honestly). 7/8 = 87% → Green. ~40s.

**06:05 — Crossplane.** Search → catalog hit. Sigrid marks `notUsed`
and walks the POC briefly for notes. Lars: "AWS provider, authored
one Composition, reached Claims, never Functions or configuration
packages — Terraform governance won." Card reads "Not in candidate's
stack." ~50s, mostly POC narration captured in freeform notes.

**06:55 — cosign.** Search `cosign` → matches `cosign-sigstore` by
id substring. Lars: "keyless via GHA OIDC + Fulcio, no key-pair (we
don't manage signing keys), Rekor on, SLSA provenance attestations
on every build, verify in Kyverno admission AND CD pipeline, SLSA L2
today / L3 queued, ECR + GHCR, cosign-installer everywhere." Ticks
7/8 (skips key-pair honestly). 7/8 → Green. ~50s.

**07:45.** Sigrid: "anything else?" Lars after a pause: "Kyverno for
admission policy — but that's pretty much it." Sigrid types
`kyverno` → not in catalog → named-only. ~20s.

**08:05.** Methodology chips. 6/6 ticked, identical to rounds 9/10.

**08:25.** Summary. ~30s scan, ends.

**Call duration: ~9:00. ~1 minute under budget** — a minute longer
than round 10 because that minute now buys 5 scored Green entries
that were previously skipped as named-only search-fails. The trade
is the entire point of round 11.

---

## 3. Post-call: report read

**Headline:** `12G / 1Y / 0R / Meth:6 / Scope-capped:0 / Named-only:1`

| Round | Scored | Named-only |
|---|---|---|
| 9 | 6G / 1Y / 0R | **6** |
| 10 | 7G / 1Y / 0R | **6** |
| **11** | **12G / 1Y / 0R** | **1** |

**Named-only dropped 6 → 1.** The one remaining is `kyverno` (Lars's
late mention; not in the batch, surfaced as a new round-11 gap). 5 of
6 round-10 named-only entries moved to scored Green. Crossplane is
the 6th — sitting in the scored bucket as `notUsed`, which is the
correct state for an evaluated-rejected tech (distinct from
named-only because the candidate actually engaged with the tool).

| New tech | Verdict | Depth | Coverage |
|---|---|---|---|
| Argo Rollouts | Green | deep | 6/8 |
| Karpenter | Green | deep | 8/8 |
| Backstage | Green | deep | 8/8 |
| Unleash | Green | deep | 7/8 |
| Crossplane | Not-in-stack | — | — |
| Cosign / Sigstore | Green | deep | 7/8 |

All 5 ticked entries Green at deep depth — no depth-lift needed,
coverage was already in Green range. The verdict pattern reads
correctly for a Staff platform engineer with multi-year operator
history on each tool.

**Recommendation:** Strong proceed. Same verdict as rounds 9 and 10
but the report is materially richer: 12 scored Green entries vs 7,
with five new checklists documenting 2026 platform-engineering
depth-of-practice. **The report is the deliverable, and it's
substantively better than round 10's.**

---

## 4. Findings

**Legend:** S1 ship blocker, S2 priority next round, S3 nice-to-have,
S4 cosmetic. **[CATALOG-VALIDATION]** verifies a round-11 entry.
**[NEW]** is a round-11-specific finding.

### F1. [CATALOG-VALIDATION] [PASS] All 6 entries are searchable

Verified by typing each in Add-tech:
- `Argo Rollouts` → `argo-rollouts` (name match)
- `Karpenter` → `karpenter` (name match)
- `Backstage` → `backstage` (name match)
- `Unleash` → `unleash` (name match)
- `Crossplane` → `crossplane` (name match)
- `cosign` → `cosign-sigstore` (id substring) — and `Sigstore`
  also resolves via name substring

The cosign dual-keyword resolution is the right call: senior
candidates name the tool as "Cosign" or "Sigstore" interchangeably
and either reaches the entry. Round-10 F4 (the round-9 F1 redux) is
fully resolved.

### F2. [CATALOG-VALIDATION] [PASS] All 6 entries are checklist-mode with 8 services

`technologies.json:4319-4455`. Each: `vetMode: "checklist"`, exactly
8 services, 4 suggestedProbes, checklistGuidance paragraph,
`category: "DevOps"`. No version-mode (correct — none of these have
recruiter-meaningful version tiers). Integrity test at
`integrity.test.ts:876` asserts all of the above and passes.

### F3. [CATALOG-VALIDATION] [PASS] Service taxonomy maps clean to Lars's stack

I rate each service list against what Lars actually does:

**Argo Rollouts (6/8 + 2 honest skips):** canary / AnalysisTemplate
/ traffic-mgmt / rollback / ArgoCD-integration / manual-promotion
all hit Lars's stack. blue-green and experiment-resource are
surfaced for other candidates (e.g. shops running progressive A/B
inside Rollouts) — correct to include, correct for Lars to skip.

**Karpenter (8/8):** NodePool + EC2NodeClass + consolidation + spot
+ instance-mix + drift + taints + disruption-budget. This IS the
2026 Karpenter operator surface. No gaps.

**Backstage (8/8):** Software Catalog + Scaffolder + TechDocs +
plugins + auth + k8s-plugin + CI integrations + deployment
discipline. Complete. Quibble: a "Backstage as platform" vs "as
catalog UI" axis would split a senior operator from a tutorial-
follower, but that's better captured via depth-probes than a
service split.

**Unleash (7/8 + 1 roadmap skip):** Toggles + strategies +
constraints + A/B + SDK + lifecycle + OpenFeature + self-hosting.
Complete. The OpenFeature service correctly captures "tracks with
OSS standardization" — Lars deferred honestly.

**Crossplane (notUsed):** Providers / Compositions / Composite
Resources / Configuration packages / Claims / Functions / Managed
Resources / RBAC. Correct for a 2026 Crossplane operator. The list
would have correctly graded Lars's 3-month POC as Yellow (4/8 with
providers + Compositions + Composite Resources + Claims) had Sigrid
walked the checklist instead of marking `notUsed`. Honest call.

**Cosign / Sigstore (7/8 + 1 honest skip):** Keyless + key-pair +
Rekor + attestations + verify-policy + SLSA + registry + CI. The
keyless-vs-key-pair split is the right orthogonality — Lars gets
credit for keyless without being penalized for not running key-pair.

**No missing canonical services I can name across any of the 6
entries.** Pass.

### F4. [NEW] [S3] Crossplane in DevOps is defensible — don't create an IaC category for one tool

The brief flagged Crossplane's DevOps categorization as worth
revisiting. Honest answer: leave it. The catalog has no IaC
category today; Terraform / Ansible / Pulumi all sit in DevOps as
the de facto IaC + GitOps + CD bucket. Moving Crossplane alone
would split the IaC story across categories. Creating an "IaC"
category is a much larger taxonomy decision (it would have to move
Terraform / Ansible / Pulumi too) and should not be driven by one
entry. **DevOps is acting coherently as the IaC bucket; Crossplane
fits.** Logged for taxonomy-wide discussion if a future round
wants it; no round-11 action.

### F5. [NEW] [S3] Backstage in DevOps is right today but flag for an IDP category if more entries land

Backstage is the only IDP-shaped entry in the catalog. If Port,
Cortex, or OpsLevel enter the catalog in a future round, the
DevOps category starts to feel overloaded and an `IDP` /
`Developer Platform` category becomes worth carving from DevOps.
**No action yet** — single entry doesn't justify a new category.

### F6. [NEW] [S3] `Cosign / Sigstore` display name with a slash works, matches the `oauth-identity` pattern

The display name carries a literal slash + spaces. Search resolves
both keywords. Card and report render the full name. Consistent
with the prior `oauth-identity` display-vs-id pattern. The slash
honestly captures the Cosign-CLI-vs-Sigstore-umbrella distinction
senior candidates use. **No action.**

### F7. [NEW] [S2] Kyverno is the new named-only — next round-12 catalog target

Lars's late mention of Kyverno is round-11's new named-only.
Admission policy for K8s, real 2026 platform tool (competes with
OPA Gatekeeper). Estimate ~8 services (policies / validating /
mutating / cleanup / autogen / cluster-wide / image-verify /
reports), checklist-mode, DevOps category. ~10 minutes of catalog
work.

Not a round-11 ship blocker (one tool, not a batch). The signal
to ship is the round-11 pattern: if a second persona names Kyverno
unprompted, ship it in round 12 alongside OPA Gatekeeper (the
orthogonal alternative for that slot).

### F8. [NEW] [S4] Round-10 F5 (auto-promotion threshold) is resolved by round-11's batch, not by changing the threshold

Scored 12, named-only 1, ratio strongly in scored's favor —
threshold has no reason to fire and shouldn't. Round-10 F5 said
"add absolute trigger `named-only >= 4`" but round-11 dissolves
the very gap that finding was about. **Defer the absolute-
threshold proposal indefinitely.** Revisit only if a future dense-
stack senior again surfaces ≥4 named-only.

### F9. [NEW] [S4] Don't expand DevOps preloads to 9 on the basis of round 11 alone

Round-10 F2 speculated Argo Rollouts would be the next preload
candidate. Round-11 now has it in the catalog — should it preload?

**No, not yet.** For: 60-70% of senior ArgoCD operators run
Rollouts (Lars does), saves ~10s search-add. Against: ArgoCD users
without Rollouts exist (Spinnaker shops, Flagger shops, no-
progressive-delivery shops). 8 preloads is at the comfortable
ceiling.

Same logic against Karpenter (AWS-only — wrong-shape for GCP /
Azure / on-prem candidates) and Backstage (commercially competitive
with Port / OpsLevel — preloading favors one IDP). **Don't expand
preloads from a single persona's data.** Wait for a non-Lars DevOps
persona in round 12. Round-10 F2's caution holds.

---

## 5. Round-11 verdict

**SAFE.**

Round-11's catalog batch lands clean. All 6 new DevOps entries are
searchable, render correctly as checklist-mode with 8 services
each, capture Lars's actual stack with no missing canonical
services, and dissolve the named-only frontier that re-fired in
rounds 9 and 10 (named-only 6 → 1).

The report is substantively better than rounds 9/10 — 12 scored
Green entries vs 7, with five new checklists documenting 2026
platform-engineering depth (Argo Rollouts canary discipline,
Karpenter NodePool / spot story, Backstage golden-path authoring,
Unleash lifecycle + self-hosting, cosign keyless + SLSA L3 target).
A recruiter reading this cold gets a sharper picture of Lars as a
Staff platform engineer than round-10's report afforded.

**Preload behavior holds end-to-end.** Same 8 verdicts, same scopes,
same checklists, same chips. The round-11 ship is additive — zero
behavioral change on the existing surface.

**Call: ~9:00, under budget.** A minute longer than round 10
because Lars now ticks through 5 new checklists, but the trade is
the entire point of round 11: ~50s of recruiter time buys ~5 scored
Green verdicts. Clean speed-of-use win on the over-arching
constraint TechVet was built for.

**What remains:**
- **F7 (Kyverno):** New named-only. Track for round 12 — ship if a
  second persona names it.
- **F4 + F5 (taxonomy):** Crossplane / Backstage stay in DevOps.
  Revisit only on a larger taxonomy refactor.
- **F9 (preload-count):** Don't expand to 9 on round-11 evidence
  alone. Wait for a non-Lars DevOps persona.

**No round-9 / 10 / 11 finding is escalated by this session.** Lars's
third pass produces a strong-proceed verdict with a substantively
better report than round 10, on a template that has saturated
cleanly.

**Lars Bergstrom: hire (third pass — strongest verdict yet).**
**Catalog batch 11 (DevOps slice): SHIPS — validated end-to-end.**
**DevOps / Platform template: ship-clean. Round-11 closes the
multi-round DevOps catalog frontier.**
