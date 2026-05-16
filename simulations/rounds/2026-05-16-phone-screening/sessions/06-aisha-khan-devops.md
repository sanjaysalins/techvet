# Session 06 — Aisha Khan (Mid, DevOps)

**Agent:** sim-06
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** DevOps / Platform

## 1. Persona inhabited

Aisha came up as a Linux sysadmin at a small ISP before doing two Coursera Kubernetes courses and landing at a Series-B healthcare SaaS that had just migrated their EHR-adjacent product onto GKE. Four years in she's the de-facto cluster owner for two GKE environments, writes most of the Helm charts, owns the Terraform that lays down the projects/VPCs/SQL, and runs the GitLab CI fleet on self-hosted runners. She talks fluently about pods/HPAs/network policies and rolls her eyes about "we run our own Prom/Grafana because the SRE team won't pay for Datadog." She is not a programmer — Python is `kubectl` glue and a few Terraform external data sources. She likes the word "we" and rarely says "I built". She'll undersell.

## 2. Phone call — abbreviated

> R: "Hi Aisha — I've got about ten minutes. Walk me through your day-to-day stack."
> A: "Sure — we're a GKE shop on GCP. Mostly Kubernetes, Helm charts I write, Terraform for the infra, GitLab CI for pipelines."
> [R loads "DevOps / Platform" template — preloads kubernetes, terraform, docker, github-actions, argocd, helm, observability. Searches "GitLab", clicks `gitlab-ci`, picks depth=Working — leaves checklist 0/12 untouched for now.]
> A: "We're on 1.28 — pretty current I think."
> [R: clicks Kubernetes card, types `1.28`, depth=Working.]
> A: "Helm version… I don't actually know, we just use what GKE ships? Charts I write myself."
> [R: clicks Helm, hits the "I don't remember" toggle, depth=Deep.]
> R: "Cloud — AWS?"
> A: "No, GCP. GKE, Cloud SQL, Pub/Sub, Cloud Build a little, Secret Manager."
> [R: removes `aws` (Not in stack), searches "GCP", clicks gcp, ticks gke / cloud-sql / pubsub / cloud-build / secret-manager / cloud-iam / monitoring-logging / cloud-storage. 8/12.]
> A: "Terraform — current is something 1.something. We pin to 1.5 because state."
> [R: types `1.5`, depth=Deep, scope=Author.]
> A: "We use observability — Prom, Grafana, Loki, Alertmanager. OTel is on the roadmap."
> [R: clicks observability checklist, ticks prometheus / grafana / loki / alertmanager / slos. 5/14.]
> A: "ArgoCD we looked at, didn't ship. Pulumi I read a tutorial."
> [R: clicks ArgoCD, ticks nothing, but inadvertently touches a checkbox then un-ticks — `checklistTouched=true`, 0/12. Marks Pulumi "Not in stack".]
> A: "Vault for secrets — HashiCorp Vault."
> [R: searches "Vault" — gets Ansible Vault and Azure Key Vault. Neither right. Skips.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Kubernetes | `1.28` | Working | — | **Good** (Green; min `1.28` tier match) |
| Helm | unknown-version, "I don't remember" | Deep | — | **Review / Probe (lifted from Review / Probe by depth)** — i.e. Green via depth-lift from Yellow; enterprise note fires (depth ≥ working) |
| Terraform | `1.5` | Deep | Author | **Excellent** (Green ≥1.10 not reached; `1.0` Good tier match — depth-lift Yellow→Green is blocked by author scope but `1.5` is already Green so no cap) |
| GitLab CI | 0/12, untouched | Working | — | **Yellow "Not yet assessed — 0/12 services"** |
| GCP | 8/12 (67%) | Working | — | **Good — 8/12 services** (ratio 0.667 ≥ 0.66 → Green just barely) |
| Observability | 5/14 (36%) | Working | — | **Review / Probe — 5/14 services** (Yellow; 25–66% band) |
| ArgoCD | 0/12, touched | (default) | — | **Concern — 0/12 services** (Red; ratio<0.25 + touched) |
| AWS | — | — | — | excluded (notUsed) |
| Pulumi | — | — | — | excluded (notUsed) |
| Docker | (recruiter skipped, preloaded) | unknown | — | leaves as default — **Yellow "Not yet assessed"** equivalent or empty card |

**Summary headline:** roughly 3 Green / 2 Yellow / 1 Red / 2 grey "Not in stack". Radar renders across DevOps + Cloud (only two categories that scored — borderline for the ≥3-category radar threshold; may degrade to bar chart). PDF ships in ~300 KB.

## 4. Accuracy judgement

- **Where it's right:** Kubernetes 1.28 → Good is correct; ArgoCD Red is fair (she evaluated, didn't ship — that should not pass for a DevOps engineer). Terraform Author + 1.5 → Green is accurate; she does own the IaC repo. Marking AWS "Not in stack" correctly removes a Red that would otherwise have anchored the report.
- **Where it over-rates:** **Helm.** She honestly doesn't know the version (likely 3.12-ish on GKE) and the recruiter hit "I don't remember" + Deep. Depth-lift takes Yellow→Green and the enterprise note fires. Result: a non-version-knowing candidate gets a Green-equivalent label with reassurance text — but she has *real* Helm authoring depth, so this is the rare case where the over-rate is *correct in spirit*. The mechanism is wrong (we can't tell from the data); the outcome happens to be right. **GCP at 8/12 = 66.67%** sneaks across the Green floor by a single tick. Different recruiter, same candidate, would land Yellow. The verdict is bimodal on transcription accuracy, not on candidate quality.
- **Where it under-rates:** **GitLab CI Yellow "Not yet assessed"** because the recruiter ran out of time to walk the 12-item checklist. Aisha actually runs the fleet — declarative pipelines, includes, runners, OIDC-to-GCP, container registry, the lot. On a phone call the recruiter literally cannot read 12 checkboxes aloud. The verdict reflects recruiter throughput, not candidate skill. **Observability 5/14 = 36% → Yellow** also under-rates her. She runs the Prom/Grafana/Loki/Alertmanager/SLO stack end-to-end; the catalog dilutes her score by including Datadog, New Relic, Splunk, Honeycomb, Sentry, RUM, OTLP, OTel — none of which her shop runs. **The checklist penalizes single-vendor depth.** A 5/14 here is more impressive than 10/14 from someone tick-happy across vendors.
- **Where it's silent on something a hiring manager would need to know:** Vault (HashiCorp). Aisha named it twice; the catalog has only "Ansible Vault" (a string inside an Ansible checklist) and "Azure Key Vault" (a tick on the Azure card). For a healthcare SaaS, secrets management is load-bearing — the report won't say "she runs Vault" anywhere. Also silent: GKE Autopilot vs Standard, Workload Identity (is she actually doing the GCP-native IAM-to-K8s binding?), network policies / Cilium — none of which the catalog probes at the GCP layer.

## 5. Friction during the call

- The DevOps template preloads `aws` but not `gcp` — recruiter had to remove AWS and search-add GCP. **The template is AWS-biased** despite catalog parity. Costs ~15 seconds and breaks flow.
- Two checklist-mode cards in seven minutes (GCP + Observability + ArgoCD + GitLab CI = four) is unworkable on a phone call. Recruiter ran the GCP checklist verbally (slow), gave up on GitLab CI, and forgot Docker entirely.
- "I don't remember" toggle on Helm felt right but produced an over-rating without warning the recruiter.
- The Pulumi "read a tutorial" case has no clean control — recruiter marked it "Not in stack", which suppresses the *judgment* (she evaluated and rejected). The PDF will not say "she considered Pulumi".

## 6. Bugs / structural defects

1. **DevOps template biases AWS over GCP/Azure.** `roles.ts:37` lists `aws` but no other cloud. Healthcare/regulated/EU shops are disproportionately GCP/Azure. Recruiter must delete-and-add on every non-AWS DevOps screen. **Severity: Medium.**
2. **Checklist-mode is hostile to phone screens.** Reading 12-14 service names aloud and ticking is impossible in 1 minute. The "Candidate unsure" toggle (`scoring.ts:225`) helps but doesn't solve it — there's no "quick-pick top 5" mode or "candidate enumerated, I ticked what they said" affordance distinct from "I read the list to them". Result: GitLab CI Yellow-not-assessed for a fluent practitioner. **Severity: High** for the phone scenario specifically.
3. **Checklist Green floor at 66% punishes single-vendor depth.** Observability has 14 services across 6 vendors; a candidate using one stack end-to-end caps at ~6/14 = 42% and lands Yellow. The catalog should weight or split vendor-alternatives. `scoring.ts:253-255` treats all services equivalently. **Severity: High** (Robin's session #11 in the prior round flagged the same shape — still open).
4. **HashiCorp Vault missing from catalog.** Named by the candidate; nowhere to log it. "Vault" search returns misleading hits (Ansible Vault, Azure Key Vault). On a healthcare SaaS this is the single most security-relevant tool she runs. **Severity: Medium-High.**
5. **"Evaluated and rejected" has no representation.** Pulumi-as-considered-and-passed-on is signal — it shows judgment. Forcing it into `notUsed` deletes that signal. RESUME.md flags this as the open `historicallyUsed` axis. **Severity: Low** for this session, but cumulative across senior screens.
6. **Helm depth-lift from unknown-version produces a misleading Green.** When the candidate can't quote a version, the only thing keeping the verdict honest is the Yellow tier. Depth=Deep silently lifts it AND fires the "enterprise" note. Combined effect: the report reads "she's good at Helm" with reassurance text, with zero version evidence. The Author scope would have blocked this; recruiter didn't set scope. **Severity: Medium.** Fix candidate: when `unknownVersion` is true, suppress the depth-lift entirely (parallel to the existing enterprise-note suppression for low depth).

## 7. Catalog gaps

- **HashiCorp Vault** — not in catalog. For DevOps/SRE/Security templates this is a P0 omission.
- **GKE Autopilot vs Standard** — no probe / no service distinction inside GCP checklist.
- **Workload Identity** — not on GCP checklist; it's the GCP-native equivalent of IRSA and is *the* security signal for GKE shops.
- **Cilium / Calico / network policies** — Kubernetes card has a freeform probe but no structured capture.
- **Self-hosted runners** captured under GitLab CI checklist but not surfaced as a cross-cutting skill (matters for compliance shops).
- **External Secrets Operator / Sealed Secrets** — invisible. Helm probe asks about secrets but doesn't capture the answer.

## 8. One-liner for cross-cut

> **Aisha — DevOps / Platform — checklist-mode is unrunnable on a 7-min phone call (4 of her 7 logged techs are checklist), template hard-codes AWS, and HashiCorp Vault — her load-bearing secrets tool — isn't in the catalog at all.**

## 9. Recommendation

Highest leverage: **add a "quick-pick" affordance to checklist-mode for phone screens** — surface the 3-5 most diagnostic services per checklist (curated, marked `phoneScreenPivot: true` in the catalog) above the full list, and let the recruiter tick those + a "candidate fluent on more, ran out of time" flag. This single change turns four 60-second checklist marathons into four 10-second yes/no rounds. Pair with `gcp` (or a `multi-cloud` placeholder) in the DevOps template and a HashiCorp Vault entry, and Aisha's session goes from 3G/2Y/1R-under-noise to a defensible 4G/2Y/0R that a hiring manager could actually act on.

## Optional — disagreement with prior fixes

The `enterpriseStillUsed` suppression rule (CLAUDE.md / `scoring.ts:131-146`) gates on `depth ≥ working` to avoid falsely flattering non-skills. That's correct in spirit but creates the opposite failure for Aisha's Helm: depth=Deep + unknown-version triggers BOTH the depth-lift to Green AND the enterprise note, producing a maximally reassuring verdict from minimum evidence. The depth-lift should be the gated rule, not the note — if there's no version, a lift can't be justified. The note is fine; the lift is the harm.
