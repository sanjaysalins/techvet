# Session 02 — Cara Lin (Staff SRE, 9 yr)

**Agent:** simulation agent 02
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Video panel (30-45 min, hiring manager joins ~15-20 min mark)
**Role template picked:** SRE / Platform Engineer

## 1. Persona inhabited

Cara is a low-key, precise talker. She runs ~600 microservices across 3 self-managed K8s clusters; her team built it on bare metal + Cilium, intentionally bypassing EKS. She'll over-claim "I run K8s" by reflex (she does — the workload layer), but the cluster build / upgrade pipeline is the platform team's. She quotes Go 1.24, Kubernetes 1.31 (lagging current 1.36 by design — they pin), Helm 3.16, Argo Rollouts (not ArgoCD — different product), and reels off Envoy/Istio/Cilium/Karpenter/Chaos Mesh as if they're table stakes. Reads the Terraform PRs the platform team raises but doesn't author. The HM joining at minute 17 is her future skip-level CTO.

## 2. Video panel — abbreviated

> R: "Walk me through your stack — start wherever."
> C: "OK — Go for everything we write. Kubernetes self-managed, no EKS."
> [R: SRE template loaded; clicks Kubernetes card → types "1.31" → depth "Very deep"]
> C: "Helm for packaging, mostly 3.16."
> [R: types "3.16" on Helm card, depth "Deep"]
> C: "Service mesh is Istio over Envoy. CNI is Cilium."
> [R: searches "Istio" → no results. Searches "Envoy" → no results. Searches "Cilium" → no results. Pauses. Types into mandate field instead.]
> C: "Observability is the Prom-Grafana-Loki-Tempo stack with OTel collectors."
> [R: clicks Observability card → ticks Prometheus, Grafana, Loki, Tempo, OpenTelemetry, OTLP, Alertmanager, SLOs = 8/14]
> [HM joins at 17:00. Watches the next 6 searches.]
> C: "Karpenter for node autoscaling, Chaos Mesh for game days."
> [R: searches "Karpenter" → no results. "Chaos Mesh" → no results. Visibly types both into mandate notes. HM frowns slightly.]
> C: "Argo Rollouts for canaries."
> [R: searches "Argo" → ArgoCD appears. Adds it. Ticks 0 services. Awkward — wrong product.]
> C: "Terraform — the platform team owns it. I review their PRs."
> [R: clicks Terraform → no version → toggles unknown → depth "working"]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Kubernetes | 1.31 | very-deep | (none) | **Excellent** — 1.31 ≥ 1.28 Good tier; depth-lift on Green is no-op |
| Go | 1.24 | very-deep | (none) | **Excellent** — 1.24 hits top tier |
| Helm | 3.16 | deep | (none) | **Good** — 3.16 ≥ 3.10 Good tier (Green) |
| Observability | 8/14 = 57% | working | (none) | **Review / Probe — 8/14 services** (Yellow — falls in 25-66% band) |
| Terraform | unknown (toggled) | working | (none) | **Review / Probe** — Fix B suppresses depth-lift on unknown version. `enterpriseStillUsed` flag fires (depth ≥ working) so "Still widely used in many enterprise applications" note injects. |
| ArgoCD | 0/12 ticked | unknown | (none) | **Not yet assessed — 0/12 services**, `notDiscussed: true` (Yellow) — auto-excluded from buckets per Fix G |
| Python | (untouched template card) | unknown | (none) | **Not discussed** — preloaded by template, never opened. Fix G excludes from buckets. |
| AWS | (untouched template card) | unknown | (none) | **Not discussed** — same as above |

**Summary headline:** 3 Strengths (K8s, Go, Helm), 2 Probe Further (Observability 57%, Terraform reviewer-shape), 0 Concerns, 2 Not discussed. Radar shows 3 categories (Language, DevOps, Cloud-empty). The Envoy / Istio / Cilium / Karpenter / Chaos Mesh / Argo Rollouts content sits in the free-text mandate notes — not on the radar, not in the PDF score table, invisible to the HM reading the PDF.

## 4. Accuracy judgement

- **Where it's right:** K8s/Go/Helm Green is correct — she really is excellent at all three. Observability at 8/14 ticking Yellow is fair *if* you accept the mixed denominator; it's not a wrong score so much as a wrong question (see below).
- **Where it over-rates:** Terraform Yellow + "Still widely used in many enterprise applications" enterprise-note misreads her completely. She's a *reviewer* of Terraform, not a user. The note implies "legacy-but-respectable competence" when the truth is "I read PRs". Fix-K's `defaultScope` only fires for AI/ML libs — Terraform has no catalog default, so the recruiter would need to open the scope dropdown mid-call to pick "Reviewer" → Yellow cap with the right reason. Even on video, the recruiter didn't think to.
- **Where it under-rates:** Observability score is 57% Yellow but Cara's coverage of the *Prom-stack half* is 6/7 (Prom, Grafana, Loki, Tempo, Alertmanager, OTel, OTLP). The other 7 (Datadog, New Relic, Splunk, Honeycomb, Sentry, RUM, SLOs) are vendor alternatives or domain-extras she'd correctly not tick because she's never used them. **Mixed-denominator: Robin's round-1 finding is unfixed.** A 6/7 "I am the Prom-stack expert" shows up as 8/14 = "review / probe" Yellow on the report.
- **Where it's silent on something a hiring manager would need to know:** Envoy, Istio, Cilium, Karpenter, Chaos Mesh, Argo Rollouts — *six* of the technologies she names easily are not in the catalog. They live as free-text in mandate notes, off the radar, and the PDF doesn't mention them. The HM reading the report sees an SRE with 3 Greens + 2 Yellows and no service-mesh / autoscaling / chaos signal at all.

## 5. Friction during the call

- **Six dead-end searches in front of the HM.** Envoy/Istio/Cilium/Karpenter/Chaos Mesh/Argo-Rollouts → no results, no "we don't have this — capture it here" affordance. Recruiter improvises by typing into mandate notes; HM watches and infers either (a) the tool is thin, or (b) the recruiter doesn't know to type these into the right place. Fix C ("named-but-not-in-catalog") would have closed this — still unshipped.
- **ArgoCD vs Argo Rollouts confusion.** Recruiter searched "Argo", got ArgoCD, added it without checking. Cara doesn't run ArgoCD (it's Flux at her shop). The recruiter now has a 0/12 untouched ArgoCD card that Fix G correctly excludes from buckets — but the wasted click and the wrong-product moment was visible to the HM.
- **No prompt to open scope on Terraform.** Recruiter knew Cara said "platform team owns it" but had no nudge to flip scope to Reviewer. Fix K's post-Summary chip means it's recoverable — but only if the recruiter goes back. On video she might; on phone she won't.
- **Observability checklist took ~25 seconds** of reading 14 items aloud. Phone budget is 10-15s per tech total. Reading 14 vendor names aloud while listening is unworkable.

## 6. Bugs / structural defects

1. **Mixed-vendor checklist denominator (Observability).** Prom/Grafana/Loki/Tempo (OSS) and Datadog/New-Relic/Splunk/Honeycomb (commercial) share one denominator. An OSS-stack expert maxes at 7/14 = 50% Yellow; a Datadog shop at full coverage maxes at ~5/14 = 36% Red. **Carries forward from Robin (round 1) and Aliyah (round 1) unfixed.** Evidence: `src/data/technologies.json:2866-2923`, `src/lib/scoring.ts:277-280`. **Severity: High.**
2. **Six SRE-table-stakes techs missing from catalog.** Envoy, Istio, Cilium, Karpenter, Chaos Mesh, Argo Rollouts. None are in `technologies.json`. ArgoCD is, but it's a different product class (deployment, not progressive delivery). **Severity: High** for the SRE template specifically.
3. **`enterpriseStillUsed` fires on Terraform-by-PR-review.** Cara has depth=working and toggled unknown-version. Fix-from-yesterday suppresses the note when `unknownVersion && depth ≤ shallow`, but `working` lets it through. The note's intended audience is "legacy-but-current operator", not "reviewer of someone else's IaC". Evidence: `src/lib/scoring.ts:152-167`. **Severity: Medium.**
4. **`defaultScope` only set on AI/ML category.** Terraform/Kubernetes/Helm/AWS for an SRE candidate are commonly reviewed (platform team owns them). Catalog has no `defaultScope: "reviewer"` for any DevOps category entry. Fix-K's value here is zero unless the recruiter manually opens the dropdown. **Severity: Medium-structural.**
5. **No "Argo Rollouts" alias / disambiguation on Argo search.** Search returns ArgoCD only, and there's no "did you mean Argo Rollouts (not in catalog)?" hint. **Severity: Low** (covered by Fix C).

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Per tech: search ~3s + click-add ~1s + type-version ~3s + pick-depth ~3s = **10s** for version-mode best case. Observability checklist: read 14 items + tick 8 = **~25s**. ArgoCD wrong-add → realize → leave-untouched: **~12s wasted** with the HM watching. Total time-on-tool for ~7 logged items + 6 dead-end searches: ~3-4 minutes of a 30-min call. Acceptable here, **lethal on phone**.
- **Phone-shrink test.** What breaks specifically: (a) Six dead-end catalog searches with no save-as-named-only path — recruiter would lose flow each time, no recovery on phone budget. (b) Observability 14-item read-aloud is unworkable — Fix D's `phoneScreenPivot` flag was specced for exactly this and is unshipped. (c) ArgoCD vs Argo-Rollouts mix-up never gets corrected on phone — wrong product stays in the report. (d) Terraform-by-review case requires opening the scope dropdown — recruiter on phone would not. Result: a phone-screened Cara would PDF as "K8s/Go/Helm Green, Terraform Yellow with enterprise note (over-rate), Observability Yellow (under-rate), ArgoCD untouched", and **the entire service-mesh / chaos / autoscaling story would be lost**.
- **Friction that vanishes on phone.** Reading the 14-item observability list aloud (Cara would just say "Prom-Grafana-Loki-Tempo + OTel" and the recruiter would have to map to checkboxes herself, missing some). Walking back to fix the ArgoCD mis-add. Going back to Summary post-call to flip scope on Terraform via Fix-K chip — phone recruiters end the call and export immediately.
- **Risk / safe rating.** **At-risk.** The video-channel slack is masking three independent failures (catalog gaps, mixed-vendor denominator, scope-implicit Terraform). Each one alone would survive video; together on phone they'd cascade. Fix C + Fix D + DevOps-category `defaultScope` + observability split-by-vendor are the four needed moves before this is Safe.

## 7. Catalog gaps

- **Envoy** (service mesh proxy) — missing.
- **Istio** (service mesh control plane) — missing.
- **Cilium** (eBPF-based CNI + network policy + service mesh) — missing.
- **Karpenter** (K8s autoscaler, AWS-origin but cloud-agnostic now) — missing.
- **Chaos Mesh** (chaos engineering / fault injection) — missing.
- **Argo Rollouts** (progressive delivery, distinct from ArgoCD) — missing.
- **Flux** (the GitOps alternative to ArgoCD) — missing; without it, recruiters who get "Flux" answer fall back to ArgoCD wrong-product.
- **eBPF** as a meta-skill / category — missing; Cara uses it via Cilium and would mention it.
- Observability checklist needs to either split into "Prom-stack" + "Commercial APM" + "Tracing" sub-checklists, or score by *cluster coverage* rather than `selected/total`.

## 8. One-liner for cross-cut

> **Cara Lin — SRE / Platform Engineer — six SRE table-stakes techs (Envoy/Istio/Cilium/Karpenter/Chaos Mesh/Argo Rollouts) missing from catalog become six visible dead-end searches in front of the hiring manager; mixed-vendor observability denominator under-rates the Prom-stack expert at 8/14 Yellow.**

## 9. Recommendation

Highest-leverage single change: **split the Observability checklist by vendor cluster and score by best-cluster coverage**, e.g. Prom-stack (Prom/Grafana/Loki/Tempo/Alertmanager/OTel/OTLP), Commercial APM (Datadog/New-Relic/Splunk/Honeycomb), Cross-cutting (SLOs/RUM/Sentry). Coverage = max(cluster %) gated by SLOs presence. Cara's 6/7 + SLOs would correctly land Green. Robin's round-1 finding stays open until this lands. Pair with Fix C (named-but-not-in-catalog capture) so the six missing meshes/autoscalers/chaos-tools at least make it into the PDF as "candidate-named, not-in-catalog: Envoy, Istio, Cilium, Karpenter, Chaos Mesh, Argo Rollouts" — that's the difference between an SRE PDF that tells the HM the truth and one that hides her actual stack.

## Optional — disagreement with prior fixes

Fix K's `defaultScope` shipped only on AI/ML libs. The SRE-shape case (Terraform owned by platform team, K8s cluster-build owned by platform team) is a more frequent reviewer-default situation than AI/ML libs are. Recommend: extend `defaultScope` to allow per-tech catalog opt-in across DevOps category, and consider a per-role-template scope-default override (SRE template defaults Terraform to Reviewer, etc.). Without this, Fix K's coverage is narrow.
