# Session 05 — Lin Wei (Mid-senior, Backend)

**Agent:** sim-05
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Lin is 5 years deep at PayConduit, a regional card-processor that runs
its own metal in a Tier-3 colo because the compliance team has a
deep-seated allergy to multi-tenant cloud. She talks like an engineer
who's been on call: precise, short sentences, names systems before she
names tools. She works the back half of their auth-and-settlement path —
gRPC services in Go, hot path on Postgres 15 with a Kafka outbox, search
on a one-node Elasticsearch 7 that she keeps meaning to upgrade. She
half-remembers Python because she keeps the data team's reconciliation
scripts running. She's never typed `kubectl get nodes` against EKS in
her life. She thinks "AWS" is something other people's children worry
about.

## 2. Phone call — abbreviated

> R: "Hi Lin. Quick screen, ~10 min. Walk me through your stack."
> L: "Sure. We're a Go shop. gRPC between services, Postgres for state,
> Kafka for events, all on our own Kubernetes in a colo."
> [R picks **Backend Engineer** template. Sees pre-loaded: Node.js,
> Python, Postgres, Redis, Docker, K8s. Frowns. Searches "Go", clicks it.
> Types "1.22". Picks depth = Deep.]
> R: "Postgres version?"
> L: "15. Some of the older shards are still on 13, we're migrating."
> [R types "15" into Postgres. Depth = Deep. Hesitates on the "13"
> comment, doesn't log it.]
> R: "Kubernetes — version?"
> L: "We're on 1.27. Self-managed, kubeadm. I'm not the cluster owner
> but I deploy to it daily."
> [R: types "1.27", depth = Working. Sees Yellow. Moves on.]
> R: "What else?"
> L: "Kafka 3.6, Elasticsearch 7 — that one's old, I know. Prometheus
> and Grafana for obs. gRPC obviously."
> [R searches "Kafka" — types "3.6", depth Deep. Searches "Elasticsearch"
> — types "7", depth Shallow. Searches "gRPC" — depth Deep. Searches
> "Prometheus" — *no result*. Tries "Grafana" — *no result*. Tries "obs"
> — finds **Observability (Prometheus / Grafana / OTel)**. Opens checklist,
> ticks prometheus + grafana + alertmanager. Looks at 3/10, sighs.]
> R: "Node.js? Redis? Docker? AWS?"
> L: "No Node. We use Redis for rate-limits, I don't really own it. No
> AWS — colo. Docker, sure, every service ships in one."
> [R: clicks "Not in stack" on Node.js and AWS. Redis: types nothing,
> depth Shallow. Docker: types "24", depth Working. Python:
> "Yeah, I write reconciliation scripts" — types "3.10", depth Shallow.]
> R: "Time's up. Thanks Lin." [Clicks Summary.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Go | 1.22 | Deep | — | **Good** (Green; 1.21 tier; depth-lift was Green→Green no-op) |
| PostgreSQL | 15 | Deep | — | **Good** (Green; 14 tier) |
| Kubernetes | 1.27 | Working | — | **Review / Probe** (Yellow; 1.24 tier; depth=Working doesn't lift) |
| Kafka | 3.6 | Deep | — | **Good** (Green; 3 tier) |
| Elasticsearch | 7 | Shallow | — | **Review / Probe** (Yellow; enterprise note fires? **no** — shallow depth suppresses it on version-mode, but 7 IS a tier-level yellow with `enterpriseStillUsed: true` at root → note fires) |
| gRPC | (no version, single-tier) | Deep | — | **Good** (single Green tier) |
| Observability | 3/10 (~30%) | — | — | **Review / Probe — 3/10 services** (Yellow; ratio 0.30 lands in the 0.25-0.66 band) |
| Docker | 24 | Working | — | **Excellent** (Green; 24 tier) |
| Python | 3.10 | Shallow | — | **Good** (Green; 3.10 tier) |
| Redis | (empty) | Shallow | — | **Review / Probe** (Yellow, unknown-version; enterprise note suppressed because depth ≤ shallow — correct) |
| Node.js | — | — | — | **Not in stack** (gray, excluded) |
| AWS | — | — | — | **Not in stack** (gray, excluded) |

**Summary headline:** ~6 Green, 4 Yellow, 0 Red, 2 excluded. Radar shows
Language / Database / Backend / DevOps / Data categories present. The
PDF will read like a competent generalist backend dev with one weak spot
(Elasticsearch) and a Kubernetes question.

## 4. Accuracy judgement

- **Where it's right:** Postgres 15 / Go 1.22 / Kafka 3.6 / Docker 24 /
  gRPC all land at Green, which matches reality. Elasticsearch 7 + shallow
  correctly lands at Yellow with the "still used in enterprise" reassurance.
  Python 3.10 + shallow ≠ misleading because the tier IS Green; the depth
  badge is there for the hiring manager to read.
- **Where it over-rates:** **Observability at 3/10 = Yellow is wrong.**
  Lin runs prod Prometheus + Grafana + Alertmanager *and is on the pager*
  for a payments shop. She'd never tick Loki / Tempo / OTel / Datadog /
  New Relic / Splunk — the catalog mixes "things you'd own" with "vendor
  products you'd own *instead*". Coverage % over a mixed open-source +
  vendor list under-represents anyone who picked one ecosystem and stuck
  with it. This is the same shape as the Robin-SRE failure last round.
- **Where it under-rates:** **Kubernetes 1.27 + Working = Yellow** for a
  candidate who deploys to a self-managed K8s cluster daily and on-calls
  for it. The "Working" depth is honest (she doesn't own the cluster) but
  the tier band starts Green at 1.28 — she's literally one minor version
  off, on a self-managed cluster she's been on for years. The verdict
  reads "soft on K8s" to a hiring manager, which is the opposite of true.
- **Where it's silent on something a hiring manager would need to know:**
  **The "on-prem, no cloud" signal is invisible.** Lin explicitly said no
  AWS. The recruiter correctly clicked "Not in stack" — but the PDF will
  just *omit* AWS. A hiring manager scanning the report has no way to know
  whether the candidate didn't get asked, or actively can't deploy to a
  cloud. For a payments-domain backend role this is a make-or-break datum
  and the report swallows it. The new tri-state needs a third surface in
  Summary: a "Confirmed not in stack" block that's visually distinct from
  "not asked".

## 5. Friction during the call

- Recruiter typed "Prometheus" and "Grafana" first, got nothing. Cost
  ~15 sec of confused alt-tabbing before "observability" was tried. On a
  10-min call that's 2.5% of the budget burned on search alias gaps.
- Recruiter saw "0/10 services" on Observability and visibly slowed — *do
  I tick every one she mentioned? what about ones she didn't?* — and
  ended up ticking only what Lin said aloud. The 30% verdict is an
  artifact of that under-ticking. Checklist UX assumes the recruiter
  knows to probe each unticked item; on a phone screen they won't.
- "13" mentioned in passing for Postgres legacy shards was lost. There's
  no field for "fleet hedge" the recruiter could type, and fix #2 from
  the cross-cut (multi-version parsing) only fires if they type "15/13"
  into the version box — which they didn't, because there's no prompt to.
- Scope dropdown went untouched the entire call. The recruiter had no
  prompt to pick it, and on a phone-screen tempo they wouldn't anyway.
  Lin's K8s answer ("I don't own the cluster but deploy daily") is
  *exactly* the operator-vs-author distinction the new axis was built
  for — and the call wasted it. The scope axis ships unused.

## 6. Bugs / structural defects

1. **Search has no aliases.** "Prometheus" and "Grafana" both return
   nothing, even though the canonical entry is `observability` and lists
   both in its services. Recruiters on a phone screen will type what the
   candidate said, not what the catalog ID is. Add aliases (or a service-name
   reverse index) to the search. Evidence: catalog entry at
   `src/data/technologies.json` id `observability` has Prometheus / Grafana
   inline but no top-level alias hook. **Severity: High.**

2. **Mixed open-source + vendor checklists punish ecosystem-committed
   candidates.** Observability lists Prometheus *and* Datadog *and* New
   Relic *and* Splunk in the same coverage denominator. A real engineer
   picks one. Lin's 3/10 reads as "knows a third of it" when she really
   knows 100% of the open-source half. Same structural issue likely on
   AWS/Azure/GCP cross-pollination if it exists. **Severity: High.**

3. **"Not in stack" is invisible on the Summary report.** The Yellow
   sentinel and the `skipped` flag correctly exclude from buckets, but a
   confirmed-absent answer is a positive signal for a colo / on-prem
   role and a negative one for a cloud role — either way it deserves a
   visible block. Currently the hiring manager can't tell *not asked*
   from *asked and answered no*. Evidence: `scoring.ts:99-109` returns
   `skipped: true` and `Summary.tsx` excludes from radar/buckets but I see
   no surfaced section. **Severity: Medium.**

4. **Scope dropdown has no prompt or default suggestion per depth.** A
   recruiter typing fast won't open the dropdown unprompted. The axis
   exists but the workflow doesn't drive recruiters to it. Consider:
   when depth = Working/Deep and tech is in {kubernetes, aws, azure, gcp,
   observability}, surface a one-click chip ("Operator? Author? Reviewer?")
   instead of a dropdown buried in the third column. **Severity: Medium.**

5. **Kubernetes tier table feels too tight.** 1.27 → Yellow is technically
   correct (1.28 is the supported floor at time of scoring) but a
   self-managed-1.27-on-prem operator is a stronger signal than a
   managed-1.30-on-EKS clicker. The version-only check can't see this.
   Not a fix today; flagging as a structural ceiling. **Severity: Low.**

## 7. Catalog gaps

- **"On-prem / bare metal / colo" has no representation.** There's no
  way for Lin to signal that her K8s is self-managed, no way to flag
  she has zero hyperscaler experience as a positive signal for an
  on-prem-shop role. The whole Cloud category collapses to "AWS / Azure /
  GCP" with no "private cloud / bare metal" entry.
- **No Temporal, NATS, Consul, Vault, Envoy, Istio, Linkerd.** Modern Go
  payments shops live on this kind of infra. The Backend template
  pre-loads Node.js (not Go!) and the catalog can't represent half the
  ecosystem a Go engineer would name.
- **Prometheus / Grafana not searchable as separate techs.** Mentioned
  above — these are universe-level brands, not sub-services of an
  abstract "observability" entry.
- **Backend template doesn't include Go.** This is the loudest defect of
  the session. The template that the recruiter picks for "Backend Engineer"
  pre-loads Node.js + Python but not Go, Java, C#, Rust, or any of the
  actually-most-common backend languages a recruiter would screen. The
  recruiter has to manually add Go before they even start.
- **No `gRPC` in the Backend template** either, despite being the wire
  protocol for ~every modern Go/Java backend.

## 8. One-liner for cross-cut

> **Lin Wei — Backend Engineer — Go-shop / no-cloud candidate gets a
> generically-fine 6G/4Y PDF that hides her actual strengths (self-managed
> K8s, prod Prometheus, gRPC) and silently buries her actual weakness
> (zero hyperscaler experience) under a "Not in stack" gray badge that
> never appears on the Summary.**

## 9. Recommendation

The single highest-leverage change for this session is **rewriting
Backend Engineer's `techIds`** in `src/data/roles.ts` to include `go`
and `grpc` and drop the `nodejs`/`redis` presumption — and adding a
surfaced "Confirmed not in stack" section to the Summary PDF so that a
candidate's explicit *no* to AWS becomes a piece of evidence rather than
silent exclusion. Both are <30-line diffs; together they turn this
report from "competent backend dev, score-padded by depth-game" into
"competent backend dev with deep on-prem signal and zero cloud — route
to the colo-shop client, not the AWS migration client". Without those
two changes, the scope-of-use axis shipped today does nothing for Lin's
call, because the recruiter never reached for it.

## Disagreement with prior fixes

The `notUsed` tri-state shipped 2026-05-15 solves the wrong half of the
problem. Excluding from scoring was the easy half; *displaying the
confirmed absence* is the hard half and it didn't ship. For a phone
screen, "we explicitly asked and they said no" is more useful than the
checkmark in a tier band, because it tells the hiring manager what was
covered. As-is, the Summary cannot distinguish "we ran out of time" from
"we asked and got a clean negative" — and on a 10-min screen that
distinction is the entire signal.
