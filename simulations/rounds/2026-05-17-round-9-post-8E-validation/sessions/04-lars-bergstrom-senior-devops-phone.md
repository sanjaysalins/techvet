# Session 04 — Lars Bergstrom (Senior DevOps / Platform, phone)

**Round:** 9, post-8A/B/C/D/E validation
**Date:** 2026-05-17
**Channel:** Phone, 10 min hard cap
**Recruiter:** Sigrid (internal, Stockholm hedge fund hiring a Staff
platform engineer)
**Candidate:** Lars Bergstrom, 35, 11 yr platform engineer at a
Stockholm fintech (small platform team of 4 supporting ~120 engineers,
not regulated)
**Template under test:** `devops` (DevOps / Platform) — **FIRST-EVER
end-to-end validation across rounds 1–9**

---

## 1. Persona inhabited

Lars has spent the last six years inside Kubernetes — operator scope,
not architect, not reviewer. He's migrated three different application
teams from Jenkins-pipelines + kubectl-apply onto ArgoCD-driven GitOps
over those six years and now owns the platform-team's library Helm
charts. He writes Terraform daily (module library shipped quarterly to
the rest of the org), runs the observability stack himself (Prometheus
+ Grafana + Loki + Tempo, pushing teams onto OTel SDK over the last
two years), and is the Vault administrator across the company. He
doesn't ship application features and hasn't in 5 years. The platform-
team is 4 people, so he wears the supply-chain / cost / autoscaling
hats too — he set up Karpenter on the workload clusters last quarter
and is in the middle of a cosign / SLSA-attestation rollout.

Crucially for this validation: **Lars is a deep operator on every
single thing the DevOps template preloads.** No reviewer scope, no
architect scope, no library-author shape. He is exactly the shape this
template was designed for — which means anything the template gets
wrong is a structural issue, not a scope mismatch.

Sigrid is internal, knows the role spec cold ("Staff platform — owns
the K8s + ArgoCD + Vault story for a hedge fund moving off Jenkins"),
and has 10 minutes before her next screen. Phone, no video, no shared
screen.

---

## 2. Phone call — abbreviated

**00:00.** Sigrid opens TechVet, lands on the role-template grid,
picks **DevOps / Platform**. Card preloads: 7 techs surface
immediately — `kubernetes`, `terraform`, `docker`, `github-actions`,
`argocd`, `helm`, `observability`. Six methodology chips render below
the chip strip: GitOps / IaC patterns / Blue-green-canary / Trunk-
based / Feature flags / Runbook automation.

**00:30.** "Lars, tell me about your Kubernetes — version, scope of
ownership?" Lars: "1.30, I run two production clusters, ~120
namespaces, six years on K8s." Sigrid types `1.30`, depth = `very-deep`,
last-used = current. Card flips Green ("Excellent") immediately. No
enterprise-still-used reassurance note appears. **7E removal verified
in vivo.**

**01:20.** ArgoCD. "Three years on it, I've migrated three teams from
Jenkins onto it, ApplicationSet patterns + sync waves + multi-cluster
RBAC." Sigrid opens the ArgoCD checklist (12 services) and ticks:
Application, ApplicationSet, app-of-apps, sync waves, sync hooks,
Helm chart support, Kustomize, multi-cluster, RBAC/SSO, Projects,
self-healing — **11/12**. Misses only Image Updater (Lars: "we
deliberately don't, we want the Git commit to be the source of
truth"). Depth = very-deep. Verdict: Green ("Excellent — 11/12
services"). Clean.

**02:30.** Helm. "3.15, library charts and chart governance — I'm
the chart owner for the company." Sigrid types `3.15`, depth = very-
deep. Card flips Green ("Good — Helm 3.10+, widely deployed, stable").
Note: matched against the `3.10` tier (Green), not `4.0` (Excellent).
Lars is correctly read as solid-current rather than bleeding-edge.

**03:10.** Terraform. "1.9, modules + state isolation. I ship a
module library to the rest of the org quarterly." Sigrid types `1.9`,
depth = very-deep. Card flips Green ("Good"). **No enterprise note**
on 1.9 (it's already Green, no tier flag would fire anyway). 7E
removal not visible here because Terraform's `enterpriseStillUsed`
flag was already absent from Green tiers — but the 0.13 tier no
longer carries it either, which is the right call.

**04:00.** GitHub Actions. Checklist (12 services). Sigrid asks "matrix
+ reusable + OIDC?" Lars: "matrix daily, reusable workflows yes —
we have a library of 6, OIDC to AWS we set up last year, self-hosted
runners on the platform cluster, GITHUB_TOKEN scoping by job, release
automation with semver tagging — I own the CI for ~120 engineers."
Sigrid ticks: workflows-basics, reusable-workflows, composite-actions,
custom-actions, matrix-builds, self-hosted-runners, oidc-cloud,
secrets-environments, caching, artifacts, permissions-scoping,
release-automation — **12/12**. Verdict: Green ("Excellent — 12/12").

**05:00.** Observability. Sigrid: "Walk me through your stack." Lars:
"Prometheus + Grafana + Loki + Tempo, all self-hosted on the platform
cluster. OTel SDK across all services, OTLP collector. Alertmanager
→ PagerDuty. No Datadog, no Honeycomb — we self-host." Sigrid ticks
prometheus, grafana, loki, tempo, alertmanager, opentelemetry, otlp —
**7/13** = 54% coverage. Depth = very-deep. Verdict: Green ("Good —
lifted from Review / Probe by depth — 7/13"). 6D's qualified depth-
lift fires correctly (54% > 40% floor; very-deep; senior — qualifies).

**06:00.** Docker. Sigrid: "What Docker version?" Lars: "honestly I
don't remember — whatever GHA runners ship. I write Dockerfiles every
week — multi-stage, distroless base, BuildKit features." Sigrid clicks
**"I don't remember"** toggle. Card flips Yellow. **Critical
verification:** does the enterprise-still-used note fire? Reading the
catalog: Docker has tier-level `enterpriseStillUsed: true` on the 18–19
Yellow band, but **not** at root. Lars's unknown-version case lands in
the `resolveVersionTier` unknown branch which checks `tech.enterpriseStillUsed`
(root, not tier). So **no enterprise note fires on unknown — correct.**
7E was about removing root-level flags from K8s/Terraform/Docker; the
Docker 18–19 tier-level flag is preserved (recruiter who actually
types `18` still gets the legacy-but-defensible note). Lars's depth =
deep, so the Yellow-by-unknown-version path doesn't lift to Green
(Fix B from round 2 blocks depth-lift on unknown-version). Card reads
honestly: "Review / Probe — version unknown, probe usage."

**07:00.** Methodology chips. Sigrid reads them off: "GitOps, IaC
patterns, Blue-green/canary, Trunk-based, Feature flags, Runbook
automation?" Lars ticks all six without hesitation. All match his
actual work. Zero free-text.

**07:40.** Lars volunteers: "We also run **Vault** — I'm the Vault
admin across the company. KV, dynamic secrets for DB creds, PKI for
internal certs, auto-unseal on AWS KMS, Vault Agent sidecar injector,
policies in HCL." Sigrid searches "vault" in the tech-search field —
catalog hit (it's there from the Security template). Adds it. 10-
service checklist. Sigrid ticks 7/10 (kv-secrets, dynamic-secrets,
pki-ca, auto-unseal, audit-siem, vault-agent, policies-hcl). Depth =
very-deep. Verdict: Green ("Good — lifted by depth — 7/10").

**08:30.** Lars mentions **Argo Rollouts** (for canary deploys),
**Unleash** (feature flags), **Karpenter** (cluster autoscaling — set
up last quarter), **cosign + SLSA attestations** (supply-chain rollout
in progress), **Crossplane** (evaluated, rejected for now), and
**Backstage** (the company's internal developer portal, he doesn't
own it but writes plugins). Sigrid searches each:

- **Argo Rollouts** — **NOT in catalog.** Sigrid drops into the named-
  only / free-text field.
- **Unleash** — NOT in catalog. Named-only. (It's IN the Backend
  template's `feature-flags` chip label, but not as a tech.)
- **Karpenter** — NOT in catalog. Named-only.
- **cosign / sigstore / SLSA** — NOT in catalog. Named-only.
- **Crossplane** — NOT in catalog. Named-only.
- **Backstage** — NOT in catalog. Named-only.

Six named-only entries. **That's a lot for a 10-min senior-DevOps
phone screen, and every single one is canonical 2026 platform-eng
vocabulary.**

**09:30.** Sigrid hits Summary. Quick scan, ends the call.

---

## 3. Post-call: report read

**Headline (Round 8 layout):** `8G / 0Y / 0R / Meth:6 / Scope-capped:0
/ Named-only:6`

Scope-capped:0 is correct — Lars is operator-implied on every preloaded
tech (the `devops` template carries NO `techScopes` map, confirmed in
`roles.ts:136–144`). This is right: a Platform / DevOps candidate
operates the stack day-to-day. The SRE template applies reviewer-scope
to Terraform + AWS (because SRE typically reviews infra owned by a
platform team), but the DevOps template itself IS the platform team —
they own it. **Template scope decision is correct.**

**Tier breakdown:**

| Tech | Verdict | Depth | Coverage |
|---|---|---|---|
| Kubernetes 1.30 | Green ("Excellent") | very-deep | — |
| ArgoCD | Green ("Excellent — 11/12 services") | very-deep | 11/12 |
| Helm 3.15 | Green ("Good") | very-deep | — |
| Terraform 1.9 | Green ("Good") | very-deep | — |
| GitHub Actions | Green ("Excellent — 12/12") | very-deep | 12/12 |
| Observability | Green ("Good — lifted by depth — 7/13") | very-deep | 7/13 |
| Docker | Yellow ("Review / Probe — version unknown") | deep | — |
| Vault | Green ("Good — lifted by depth — 7/10") | very-deep | 7/10 |

**Chips ticked:** GitOps, IaC patterns, Blue-green/canary, Trunk-based,
Feature flags, Runbook automation (6/6).

**Named-only:** Argo Rollouts, Unleash, Karpenter, cosign / sigstore /
SLSA, Crossplane, Backstage.

**Recommendation rendered:** Strong proceed. Verdict accurately
matches the phone call's signal. Sigrid is happy.

---

## 4. Findings

**Severity legend:** S1 = ship blocker for DevOps template,
S2 = priority for next round, S3 = nice-to-have, S4 = cosmetic.
**[NEW-DEVOPS]** = first-ever-DevOps-template finding (rounds 1–8
never put a DevOps persona on the dock). **[CROSS-BATCH]** = also
relevant to other templates.

### F1. [NEW-DEVOPS] [S1] Six named-only entries from canonical 2026 platform-eng vocabulary

Lars's named-only set was: **Argo Rollouts, Unleash, Karpenter, cosign
/ sigstore / SLSA, Crossplane, Backstage**. Every one of these is
mainstream 2026 platform-engineering vocabulary — not niche, not
trailing-edge, not regional. A senior platform engineer in Stockholm,
London, NYC, or Bangalore will all name them.

The 6E-b auto-promotion threshold (named-only > scored → promote)
**did not fire here** because Lars had 8 scored entries (the 7 preloads
+ Vault) vs 6 named-only. But the recruiter still ate 6 search-fails
in a row at the 8-minute mark of a 10-minute call. That's the failure
mode auto-promotion was designed to catch, and the threshold misses
it here.

**Priority adds to catalog (ranked):**

1. **Argo Rollouts** — separate from ArgoCD, ships with every senior
   ArgoCD operator's stack. Checklist mode: BlueGreen / Canary /
   Analysis templates / Experiment / Traffic shaping (Istio / Linkerd /
   nginx / SMI) / Metric providers (Prometheus / Wavefront / Datadog) /
   Rollback automation / Argo Notifications integration. ~8 services.
2. **Karpenter** — checklist or version. NodePool + EC2NodeClass +
   disruption budgets + consolidation + spot mix + multi-AZ + provisioner
   migration (from Cluster Autoscaler). ~7 services.
3. **cosign / sigstore** — checklist: image signing / verify policies /
   keyless signing (OIDC) / rekor transparency log / attestations /
   SLSA provenance / Kyverno or admission-controller integration. ~7
   services. This is THE 2026 supply-chain story.
4. **Backstage** — checklist: software catalog / TechDocs / templates
   (scaffolder) / plugins authoring / cost-insights / TechRadar /
   custom backend plugins / auth integration. ~8 services. The internal
   developer portal category is too big to leave at named-only.
5. **Unleash** — short version-mode entry or 5-service checklist
   (toggles / strategies / variants / metrics / API SDKs). Currently
   only namespaced inside the Backend `feature-flags` chip label —
   that's wrong for a DevOps candidate who **operates** Unleash for
   the whole org.
6. **Crossplane** — checklist: providers / compositions / claims /
   functions / pipeline-mode compositions / Helm provider. Slightly
   more niche but adoption is real among 2026 platform teams.

Suggested ship batch: name these "9Z catalog additions — DevOps gap-
fill" and add all six in one cut. Each is a 5–10 minute catalog entry
following the existing checklist conventions; the round-9 finding rate
of 6 named-only on a single phone call justifies the batch size.

### F2. [NEW-DEVOPS] [S2] Vault preloaded by Security template but not DevOps

Vault is `roles.ts:332` (Security `techIds`) but not in DevOps's 7
preloads. **Yet Vault is the canonical secrets store for any platform
team running Kubernetes + GitOps.** Lars manually searched it mid-call
(8 min mark) and added it as a 7/10 checklist hit. That's the same
issue 8D fixed for Snowflake on the Data Engineer template (Pooja
ate a search-add for what should have been a preload).

**Fix:** Add `vault` to the DevOps `techIds` array. The 7→8 preload
count is on-budget — DevOps already preloads 7 and rounds 7–8
trimmed Mobile to 2-3, so 8 is at the upper edge but still within the
"DevOps owns more things than other roles" reality. **Don't trim
existing entries to make room; DevOps genuinely spans more than
Mobile or Frontend does.**

Two caveats:
- **Vault and only Vault?** Lars also named cosign / Karpenter as
  things the platform-team owns. But Vault is the only one currently
  in the catalog. Once F1 ships Karpenter + cosign, revisit whether
  Karpenter should also be a DevOps preload (probably yes — cluster
  autoscaling is a daily-driver concern for any K8s platform team).
- **Vault is currently scoped Security, not DevOps.** When DevOps
  preloads Vault, it'll naturally appear without any techScope
  (operator-implied). The Security template scopes Vault as operator
  too (operator-implied via the omission from `techScopes`). No
  conflict — both teams operate Vault for different concerns.

### F3. [NEW-DEVOPS] [S2] Chip-set has 6 chips but misses 4 canonical 2026 platform-eng differentiators

The 6 chips Lars ticked all matched his work — **but they're 2018–2021
GitOps-era vocabulary, not 2024–2026 platform-engineering vocabulary.**
Comparing to the SRE template (slos-slis / error-budgets / chaos /
DORA / blameless-postmortems / capacity-planning), the DevOps chips
feel like a level lower in seniority — appropriate for a mid DevOps
engineer running pipelines, undersold for a Staff platform engineer
running cluster + supply-chain + dev-experience.

**Missing chips that Lars would have ticked unprompted:**

1. **Supply-chain security** (cosign / sigstore / SLSA attestations /
   admission controllers). 2025–2026 is THE supply-chain rollout era;
   every senior DevOps candidate in 2026 has an opinion on Sigstore vs
   Notary, on SLSA L2 vs L3, on Kyverno vs OPA Gatekeeper for image
   policy. Currently lives only on the Security template
   (`slsa-supply-chain` chip).
2. **Cost-aware platform engineering** (Karpenter / KEDA / cluster
   autoscaler / spot mix / Kubecost). The economics of running K8s
   in 2026 is a senior-DevOps differentiator. Currently nowhere.
3. **Internal developer platform (IDP) ownership** (Backstage /
   golden paths / scaffolder / service templates). Stockholm fintech
   sized at 120 engineers — exactly the size where a platform team
   ships an IDP. Currently nowhere.
4. **Chaos / resilience engineering** (Litmus / Chaos Mesh / failure
   injection). Currently on the SRE template (`chaos-engineering`)
   but ALSO platform-engineering-relevant — DevOps and SRE overlap.

**Fix proposal:** Reshape the 6 chips to:

```
- gitops                     (keep — table-stakes)
- iac-patterns               (keep — table-stakes)
- supply-chain-security       (NEW — replaces blue-green-canary;
                               blue-green is now table-stakes for any
                               GitOps team, not a differentiator)
- cost-aware-platform         (NEW — replaces trunk-based; TBD is
                               app-team concern, not platform-team)
- idp-golden-paths            (NEW — replaces feature-flags; feature
                               flags are App-team / Backend / Mobile
                               concern, not Platform-team-owned. Lars
                               ran Unleash as INFRA but the chip on
                               the DevOps template still reads as
                               "do you make use of feature flags",
                               which is the wrong axis for a Platform
                               candidate)
- chaos-resilience            (NEW — replaces runbook-automation;
                               runbook-automation is dated Ansible-
                               era vocabulary, chaos-resilience is
                               the 2026 senior differentiator)
```

Six chips, swap four. **Recommend doing this as a chip-rebalance
diff and validating with a second DevOps persona (round 10
candidate) before shipping** — Lars ticked all 6 of the current
chips honestly, so removing them WILL lose signal he was willing
to give. Goal is to swap the four lower-signal chips for four
higher-signal ones, not just to feel more 2026.

**Alternative:** Keep the existing 6, ADD 4 more = 10 chips. Backend
has 6, Frontend has 6, SRE has 6, DevOps would be 10 — exceeds the
established cap. **Going to 7 or 8 chips on DevOps specifically is
defensible** (the role does span more concerns than Frontend) and is
the safer change to ship without losing Lars-shape signal. Recommend:
swap `runbook-automation` for `supply-chain-security`, add
`cost-aware-platform` and `idp-golden-paths`. 8 chips total.

### F4. [NEW-DEVOPS] [S3] GitHub Actions deep depth maxed at 12/12 — no further senior-DevOps signal extractable

Lars hit 12/12 on the GitHub Actions checklist in 60 seconds. The
checklist is well-designed for screening a backend engineer's CI
fluency — but for a Staff platform engineer who **owns** GHA across
the org, there's no headroom. He'd have ticked these 12 services in
any case; the signal that differentiates him from a senior backend
engineer (he ships reusable workflows AS A LIBRARY, he runs the
ARC self-hosted-runner controller, he wrote the GHA → OIDC trust
policies, he runs the GITHUB_TOKEN-permissions audit quarterly) is
invisible.

**Fix:** Either (a) add 4–6 platform-team-specific services to the
checklist (reusable-workflows-library / runner-controller-ARC / OIDC-
trust-policy-authoring / actions-cache-self-hosted / required-status-
checks-governance / audit-tooling), bringing it from 12 to 17–18; or
(b) accept that GHA is checklist-capped for senior platform candidates
and rely on the per-template `methodologyChips` for the seniority
signal. **(a) is the cleaner fix because checklists are deeper than
chips for capturing 'I run THIS for the whole company' signal.**

Same comment applies to GitLab CI if a senior GitLab-CI-platform-team
candidate ever lands on the dock — but defer until that case shows up.

### F5. [CROSS-BATCH] [S2] Auto-promote threshold (6E-b) misses Lars's 6 named-only because scored count is higher

6E-b auto-promotes a named-only entry when the named-only count
exceeds the scored count. Lars hit `scored=8 / named-only=6` — under
the threshold. But six search-fails in a row at minute 8 of a 10-min
call IS the failure mode auto-promotion is meant to prevent. The
threshold is calibrated for sparse-stack cases (round-6 Mei-style
junior with 3 scored + 5 named-only); it under-fires for dense-stack
senior cases (Lars-style senior with 8 scored + 6 named-only) where
the 6 named-only are STILL load-bearing.

**Fix proposal:** Add a second trigger — named-only >= 4 absolute,
regardless of ratio to scored. The 4-threshold catches Lars without
triggering on a single missing tech. Don't ship blind — this affects
every template; should be validated against round-1 → round-8
session named-only counts to confirm no false-positive triggers.
Round-9 finding only; round-10 ship at the earliest.

### F6. [CROSS-BATCH] [S3] No "European DevOps" vocabulary drift detected

Worth recording explicitly because the prompt asked: Lars is in
Stockholm, works at a Swedish fintech, has worked with European and
US tools. The 6 chips (GitOps / IaC patterns / blue-green-canary /
trunk-based / feature-flags / runbook-automation) all read naturally
to him. No cultural drift visible — DevOps vocabulary is genuinely
Anglo-global. Unlike round-8 Pooja's data-contracts Indian-vs-US
vocabulary mismatch, no parallel finding for DevOps in 2026.

Stockholm fintech is **not** a regulated bank — Lars's culture is
California-Bay-Area-fintech-cloned-into-Swedish-time-zone. The
vocabulary mismatch finding would more likely appear with a
candidate from a regulated EU bank (Deutsche Bank, BNP Paribas)
where the platform-team operates under SREP / DORA-regulation /
ECB-stress-test constraints. **Defer this to a future
regulated-EU-bank persona; nothing to fix from this session.**

### F7. [NEW-DEVOPS] [S4] 7E flag-audit verified in-context — Kubernetes / Terraform / Docker root flags absent, tier flag preserved

Direct verification of round-8 7E work:

- Kubernetes 1.30: Green tier, no enterprise note. **Catalog read:
  `kubernetes` entry has NO `enterpriseStillUsed` at root NOR at tier.
  Correct — K8s 1.30 in 2026 is recent (current is 1.36); no
  legacy-but-defensible framing applies.**
- Terraform 1.9: Green tier, no enterprise note. **Catalog read:
  no `enterpriseStillUsed` flag anywhere. Correct.**
- Docker unknown-version: Yellow, no enterprise note. **Catalog read:
  root `enterpriseStillUsed` absent (7E removed it), but the 18–19
  Yellow tier preserves it. Lars's unknown-version path falls through
  the root flag check and gets `undefined`, so no note fires. If
  Sigrid had typed `18` explicitly, the tier-level flag WOULD fire.
  Correct preservation of legitimate Docker 18–19 legacy framing
  while removing the false-positive root flag.**

7E is doing what it was designed to do. No regression. **The audit
work IS load-bearing on this session — pre-7E, all three of Lars's
Yellow entries (or the one Docker Yellow) would have carried the
"still widely used in enterprise" note, which on a Staff platform
engineer's 2026 phone screen would have read as patronizing.**

---

## 5. Round-9 verdict

**DevOps template, first-ever validation: SHIPS.**

The verdict Lars receives at the end of the call is accurate to his
shape. Sigrid would proceed him confidently. The template flow is
serviceable — 7 preloads, none are wasted, all but Docker score
Green naturally, GHA + ArgoCD + observability checklists are well-
designed and capture the right signal.

**The seven preloads are correctly sized.** Compared to round-7
Mobile's 7-tech debacle (which forced 3 sub-templates), DevOps's 7
genuinely all apply — Lars used 7/7. No not-in-stack clicks. **The
DevOps preload doesn't have a Mobile-style overscope problem.**

**What ships next for the DevOps shape:**

1. **F1 priority adds to catalog: Argo Rollouts, Karpenter, cosign /
   sigstore, Backstage, Unleash, Crossplane.** This is the highest-
   leverage fix — every senior DevOps candidate will name 4–6 of
   these. Six search-fails on a single 10-min call is the strongest
   signal in this validation.
2. **F2 Add Vault to DevOps preloads.** Trivial diff, immediate
   value, parallels round-8 8D's Snowflake-to-DE add.
3. **F3 Chip-set refresh.** Add supply-chain-security, cost-aware-
   platform, idp-golden-paths. Defer the trunk-based / feature-flags /
   runbook-automation removals to round-10 validation with a second
   DevOps persona before deleting.
4. **F4 GitHub Actions checklist depth-extension** for platform-team
   scope. Optional, second-priority.
5. **F5 Auto-promote threshold** — defer to cross-batch round, not
   DevOps-specific.

**What's already right and shouldn't be touched:**

- No `techScopes` on the DevOps template — operator-implied
  everywhere is correct for this role shape. Don't copy the SRE
  template's reviewer-on-Terraform/AWS to DevOps; the platform team
  IS the team that operates this.
- `serviceTagFilters: { aws: ['general', 'cicd', 'container'] }` —
  Lars didn't touch AWS in this session but the filter is well-sized
  for a DevOps candidate who would (hides architect / security /
  data-ml slices; keeps the build / container / general slice). No
  change needed.
- 7E enterprise-flag removal works. No regression.

**Bottom line:** Round 9 surfaces a healthy 7-finding rate on a
first-ever-template validation, which is on par with rounds 4–8's
new-template find rate (round-7 Mobile produced ~9 findings on first
real validation, round-8 DE produced 5). DevOps catalog is the
biggest gap — 6 named-only on one call is twice the round-1-through-8
average per session. **F1 + F2 should ship as a tight batch before
the round-10 second DevOps persona; F3 + F4 + F5 should wait for
the second persona to confirm.**

Lars Bergstrom: hire. Template: ship-with-the-catalog-batch.
