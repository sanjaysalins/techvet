# Round-12 structural validation — Session 01

**Tech under test:** Kubernetes (round-12 vetMode='hybrid' conversion — version axis preserved + 13-service axis added).
**Recruiter:** Sigrid Lindqvist (in-house TA, mid-sized Stockholm B2B SaaS, ~5 yr screening backend hires).
**Channel:** Phone, 8 min budget.
**Candidate:** Sven Karlsson redux — 29 yo, 4 yr backend at Stockholm B2B SaaS, owner of order-fulfilment microservice + webhook ingestion, pair on payment-events Kafka topic. Helm-consumer K8s shape. Does NOT design infra; platform team owns the chart.
**Date:** 2026-05-17.
**Outcome (one line):** Hybrid mode reads Sven's K8s honestly as bounded-Yellow — "Review / Probe — 4/13 services" — instead of the rubber-stamp Green he'd have gotten pre-round-12 on the version channel alone.

---

## 1. Persona inhabited

I picked Sven up off a referral from his current EM (worked with him at an earlier shop). The mandate from the hiring side is "mid backend, has to read Java 21 / Spring Boot 3.x cleanly, has to be comfortable in a containerised microservice shop, doesn't need to design clusters but must not be helpless when one breaks." It's a service-owner role at a fintech-adjacent platform; the platform team there is small and the backend engineers are expected to know enough K8s to debug their own deployments at 3 a.m.

I've worked the Stockholm market long enough to know the shape: a guy like Sven is going to be excellent at the things he ships (Spring, Postgres, Kafka, Dockerfiles) and competent-but-bounded at the things his platform team manages (cluster topology, RBAC, admission policy). The screener problem TechVet exists to solve is that without a structured prompt, I will charitably nod through his K8s answer ("yeah he does Kubernetes") and ship a Green to the hiring manager that *gets him to onsite* but then collapses at the deep-K8s technical with the platform lead. Hybrid mode, as round-12 shipped it, is the antidote — it forces me to ask the operate-vs-consume question on the spot.

Eight minutes. Phone. No screen-share. I have the tool open on my laptop, Sven has the phone to his ear and probably a coffee and a yard sale of toddler toys in the kitchen.

---

## 2. Phone call — abbreviated

**00:00 — Landing → Backend Engineer template.** I click "Backend Engineer" (12-tile grid, large hit target). Six chips preload: Node, Python, Postgres, Redis, Docker, Kubernetes. Java isn't in the preload — I add `java` via TechSearch (one tap, autocomplete). I also add `spring-boot`, `kafka`, `aws-lambda` (he mentioned it on the brief). I set Seniority = Mid before clicking through. Channel = Phone.

**00:35 — Java 21 → Spring Boot 3.4 → Postgres 16 → Kafka.** These are quick. Sven volunteers versions before I ask ("Java 21, on Spring Boot 3.4 since the bump last quarter"). All four chips: Green clean. Depth=working for Spring/Kafka, depth=deep for Java because he can talk about virtual threads on the order-fulfilment hot path without me prompting. No surprises; not what we're testing today.

**02:50 — Docker.** Green, deep. He writes Dockerfiles ("multi-stage, distroless base for the final image, JLink trimmed JRE"). I tick deep + operator scope. Good.

**03:20 — Kubernetes card. This is the round-12 test.** The card renders with BOTH bodies visible. Top: Version input + "I don't remember" toggle, "Last used" dropdown. Below that: 13 services as a checklist with checkboxes. Header reads "DevOps · current 1.36 · 13 services". The combined tier badge is currently "Not yet assessed — 0/13 services" because I haven't typed anything yet — that's the version-unknown + services-untouched fallback. Reasonable.

> Sigrid: "Ok, Kubernetes. What version are you on, and is it the platform team's cluster or do you guys run your own?"
>
> Sven: "It's the platform team's. They run a managed EKS, we deploy via a Helm chart they author. I'm on 1.28 I think — they bumped from 1.27 in March."
>
> Sigrid: "1.28, fine."

I type `1.28` into the version input. The badge re-resolves: the tier match against the catalog (1.33 Excellent / 1.28 Good / 1.24 Yellow / 0 Red) — `1.28` matches the Good tier (Green). With services still untouched, the gate logic (services-channel goes live only when `checklistTouched` flips or any service is ticked or unsure flips) keeps coverage out of the verdict. The badge reads **"Good"** at this point — Green, no coverage suffix. Combined verdict pre-coverage walk: Green.

This is exactly the rubber-stamp Sven would have gotten pre-round-12. Now the structural test: can the services axis pull this down to honest?

**04:10 — Services walk.** I read down the curated list, ticking what he confirms. Sven is direct about what he doesn't touch — which is itself a Mid-grade good signal (juniors will hedge; midweights know their lane).

> Sigrid: "Workloads — Deployments, StatefulSets, that kind of thing?"
> Sven: "Deployments yes. The order-fulfilment service is a stateless deployment with three replicas. Jobs occasionally for one-off backfills. No StatefulSets — Postgres is managed, we don't run stateful workloads on the cluster."
>
> *[tick `workloads`. checklistTouched flips true on this first click — confirmed by re-reading the store logic. Coverage now lives.]*
>
> Sigrid: "Config and secrets — ConfigMaps, Secret resources?"
> Sven: "Yeah ConfigMap for the non-sensitive stuff, and we use external-secrets to pull from AWS Secrets Manager into Secret resources. I'm comfortable there — I've added secret bindings to our Helm values myself."
>
> *[tick `config-secrets`.]*
>
> Sigrid: "Networking — Services, Ingress, NetworkPolicies?"
> Sven: "Services yes, Ingress yes — we have an ALB ingress in front of the cluster, the chart wires it up. NetworkPolicies, no. Platform team set the cluster-default deny and the namespace-egress rules, I don't write policy YAML."
>
> *[I think for a beat. The service line item is "Networking (Services / Ingress / NetworkPolicies)". He has 2/3 of what it covers. I tick it — he operates two of the three primitives and knows what the third is. Honest read.]*
>
> Sigrid: "Autoscaling — HPA, VPA, cluster autoscaler?"
> Sven: "HPA yes, we autoscale order-fulfilment on CPU. The platform team set up the cluster autoscaler — I see the nodes come and go but I don't tune it. VPA we don't use."
>
> *[tick `autoscaling` — he authors HPA bindings.]*
>
> Sigrid: "RBAC?"
> Sven: "Platform team. I have a developer role that lets me kubectl-get-pods and kubectl-logs in my namespace, that's it. I've never written a Role or RoleBinding."
>
> *[Skip — do not tick.]*
>
> Sigrid: "Storage — PVCs, StorageClass?"
> Sven: "No — like I said, no stateful workloads on the cluster. I've read PVC docs but I haven't touched it in anger."
>
> *[Skip.]*
>
> Sigrid: "Scheduling — node affinity, taints, topology spread?"
> Sven: "No. Workloads land where they land."
>
> *[Skip.]*
>
> Sigrid: "CRDs, operators — authored any or just consumed?"
> Sven: "Consumed. We have the external-secrets operator and cert-manager installed; I've added CRs against them. Never authored a CRD."
>
> *[Beat. The service is 'CRDs + Operators (authoring or installing)'. He has installed-and-consumed-CRs experience but the line item bundles authoring. I do NOT tick — the line item's strong reading is platform-engineer "I author or install operators", and Sven is downstream of that decision. If I tick it I'm inflating. Skip.]*
>
> Sigrid: "Admission control — webhooks, ValidatingPolicy?"
> Sven: "I have heard of OPA Gatekeeper. We have it. I don't write policies."
>
> *[Skip.]*
>
> Sigrid: "Service mesh — Istio, Linkerd, Cilium?"
> Sven: "We don't run a mesh. Plain Services and the ALB."
>
> *[Skip.]*
>
> Sigrid: "Observability hooks — metrics-server, events, readiness probes?"
> Sven: "Readiness and liveness probes yes — I write those into our chart values for every service we own. Events I read via kubectl when I'm debugging. Metrics-server is there, I don't operate it."
>
> *[Beat. He authors probes; that's the operator-side of observability hooks. Tick — he has operator-grade contact with the line item.]*
>
> *[tick `observability-k8s`. Coverage now 5/13.]*
>
> Sigrid: "Multi-cluster, federation?"
> Sven: "Single cluster shop. No."
>
> *[Skip.]*
>
> Sigrid: "Production debugging — kubectl drift, pod-level forensics?"
> Sven: "Yes — when our service CrashLoopBackOffs I dig into the pod events, exec into a running pod if I can, pull logs by label selector, check the readiness gate. That's a weekly muscle. I've also run kubectl describe deployment to find the spec drift between what's deployed and what the chart says."
>
> *[Tick — strong operator-grade signal. He named CrashLoopBackOff unprompted, which is the canonical probe question in the catalog. Coverage now 6/13.]*

Wait — let me recount. I expected 4-5 ticks per the simulation brief. What I actually ticked walking through honestly:

1. workloads
2. config-secrets
3. networking
4. autoscaling
5. observability-k8s
6. debugging-prod

That's **6/13 = 46%**. Higher than I had pre-call modelled in my head. Two of them (networking, observability-k8s) were judgment calls where the line item bundled three things and he had operator-grade contact with two. I think both ticks are defensible — the round-12 checklist is intentionally bundled at the canonical-axis level, not per-primitive, and "operator-grade contact with the majority of the primitives the line item covers" is a fair tick rule. If anything, my brief's pre-modelled 4/13 was too pessimistic; the Helm-consumer-with-strong-debug shape lands closer to 6/13.

**07:30 — Depth + last-used.** I set depth=working (he ships against the cluster daily but isn't owning the platform — the catalog depth options of working / deep don't have a "deploys but doesn't operate the control plane" intermediate; working is the right read). Scope=operator (default; he operates his own workloads). Last-used=current (he ran kubectl five minutes before the call).

**07:50 — Final card state.** Version 1.28 → Good tier (Green). Coverage 6/13 = 46% → 25% ≤ ratio < 66% → Yellow band. Combined base = MIN(Green, Yellow) = Yellow. Depth=working, no lift. Scope=operator, no cap. Last-used=current, no recency adjustment. Final color: **Yellow**.

**Badge text the recruiter sees:** "Review / Probe — 6/13 services". (`composeLabel`'s baseLabel here is the worse channel's label — "Review / Probe" from coverage — because `SEVERITY[coverageColor=yellow] > SEVERITY[versionBaseColor=green]`. Coverage suffix appends because `servicesInteracted` is true. No `(lifted ...)` / `(capped ...)` parenthetical because no depth lift, no scope cap, no recency adjustment.)

Hangup at 08:10. Slightly over budget but the K8s body absorbed about 3 min 20 s; the rest of the stack moved fast.

---

## 3. Post-call: report read

I click Summary. Radar renders across 5 categories (Language, Backend, Database, Cache, DevOps, Cloud — wait, more: Java=Language, Spring=Backend, Postgres=Database, Redis=Database, Kafka=Backend, Docker=DevOps, K8s=DevOps, Lambda=Cloud). Let me actually look at the report.

**Radar:** 5 categories show with averaged scores. DevOps reads 2.5 (Docker=3 Green + K8s=2 Yellow → avg 2.5). Pre-round-12 this would have been 3.0 flat, because K8s would have been Green-on-version-alone. The radar is now visibly honest about Sven's DevOps spread.

**Strengths bucket:** Java 21, Spring Boot 3.4, Postgres 16, Kafka, Docker.
**Probe bucket:** Kubernetes ("Review / Probe — 6/13 services"), Lambda (he hasn't touched it in 18 months — softener fires correctly per round-7).
**Concern bucket:** empty.

Click into the K8s line. Note reads (from `resolveHybridTier`'s combined-note logic): since the 1.28 catalog tier has no `note` field, the version-tier-note branch doesn't fire; the `servicesInteracted` branch hits and renders `tech.checklistGuidance`:

> "Round-12 hybrid mode (Sven round-7 + Lars rounds 9-10): the services axis captures depth-of-operation independent from version era. Helm-consumers tick 3-5 services (workloads / config / autoscaling). Platform engineers tick 9-12 (everything except possibly multi-cluster if single-cluster shop). The Yellow band (25-66% coverage) is honest mid-territory — operators who know their workloads but haven't owned cluster-build."

That guidance is internal-design language and reads like it's talking to the developer, not the hiring manager. **Naming this in findings.**

No `enterpriseNote` (1.28 is a Green tier, the flag gates on `versionTier.color === 'yellow'`). Correct.

**PDF export.** I generate the PDF for the hiring manager. K8s reads "Review / Probe — 6/13 services" cleanly in the per-tech section. Multi-page A4, 327 KB. No layout regressions on the now-taller K8s card (dual body). The PDF is the artefact I forward to the hiring side; the badge text plus the per-tech note plus the radar tell the story together.

**Verdict the HM gets:** "Sven is strong on Java/Spring/Postgres/Kafka/Docker; on Kubernetes he's a Helm-consumer with strong debugging muscle (6/13 services) — the platform team's chart is his runway, not his playground." That's the honest read and it's what hybrid mode is supposed to produce.

---

## 4. Findings

1. **Hybrid mode reads Sven correctly as bounded-Yellow on K8s — round-12's headline goal is met.** Pre-round-12, version-mode K8s on 1.28 → flat Green. Post-round-12, with the services walk, the same candidate reads "Review / Probe — 6/13 services" (Yellow). The hiring manager now sees the Helm-consumer shape instead of a rubber-stamp Green. **This is the structural win the round was scoped for.** Closure: **validated**.

2. **The 4/13 pre-modelled coverage was too pessimistic; 6/13 is the natural honest read for the Sven shape.** The brief expected 4/13 (≈31%, mid-Yellow). What actually got ticked walking through honestly was 6/13 (46%, upper-Yellow). The two extra ticks were `networking` and `observability-k8s` — both line items where the catalog bundles three primitives and Sven had operator-grade contact with the majority. The tick rule "operator-grade with majority of the primitives the line item covers" is what a recruiter naturally lands on; the brief modelled a stricter "tick only if you do all three" rule. **No defect** — 46% still lands in the Yellow band (25-66%), final verdict is identical. But future sim briefs for hybrid-mode techs should model 5-7 ticks for the Helm-consumer shape, not 3-5. **Catalog tuning consideration:** if the brief's "ideal" 4/13 was meant to land at lower-Yellow (closer to the 25% Red boundary), the line-item bundling lets it drift to mid-Yellow. Not a bug, but a calibration note for whoever sets the Helm-consumer reference shape.

3. **Dual-body card is not cluttered on a phone screen recruiter-side. Vertical scroll absorbs it fine.** I was watching for the "feels cluttered on phone" risk the brief flagged. Sigrid is on a laptop — the card grew vertically to ~430 px tall, which means the cards below get pushed down, but the focused-card pattern (TechCard scrolls to focus on click in the assessment view) absorbs that. No horizontal squeeze, no overflow, the 13-service checklist renders as a clean column. **The phone-clutter concern was about Sven's experience, but Sven isn't seeing this UI — Sigrid is. False alarm in the brief.** The 8-minute call budget *is* the real "phone" constraint, and K8s consumed 3:20 of it. Acceptable for a backend role where K8s is in the must-screen set; would be too much for a frontend role where K8s is incidental. (Backend template preloads K8s; FE template doesn't. Correct.)

4. **`checklistGuidance` for K8s reads as design-doc commentary, not recruiter-facing guidance.** The note rendered on the Summary card reads "Round-12 hybrid mode (Sven round-7 + Lars rounds 9-10): the services axis captures depth-of-operation..." — that's prose written for whoever was implementing round-12, not for Sigrid or the hiring manager. The hiring manager doesn't know who Sven and Lars are (the *internal* personas, not the candidate) and doesn't care about "round-12 hybrid mode" as a tag. **Concrete recommendation:** rewrite `kubernetes.checklistGuidance` to recruiter-voice: something like "Helm-consumers tick 3-7 services (workloads / config / networking-services-only / autoscaling / debugging). Platform engineers tick 9-12. The Yellow band (25-66%) is the honest mid — operates own workloads but doesn't own the cluster." Same content, no internal references. This is a one-line catalog edit, not a structural issue. **Not blocking round-12 closure** but worth a follow-up.

5. **Label composition is correct on the depth=working / no-adjustments path.** Final label rendered as "Review / Probe — 6/13 services" with no parenthetical. Verified path through `composeLabel`: `recencyAdjusted=false`, `scopeCapped=false`, `depthAdjusted=false` → returns `baseLabel` (= "Review / Probe" from the worse-channel coverage tier) + coverage suffix. Clean. **No regression of the round-7 parenthetical machinery.** The dual-channel `baseLabel` selection logic — pick the worse channel's label so "(lifted from X)" / "(capped from X)" framing stays honest — is correct here; I didn't test the parenthetical-firing case in this session (Sven's depth=working doesn't trigger lift), but the no-parenthetical case is right.

6. **Backend template's K8s preload is the right default — Sven's role needs it and the template delivered it without me adding manually.** Backend template preloads `kubernetes` (roles.ts:93). Validated. Saved me one TechSearch tap, which on a phone is the difference between "easy" and "annoying". No change needed.

7. **Services-untouched gate works as documented.** Between typing "1.28" and ticking the first service, the badge read "Good" (no coverage suffix) — version-only verdict, services channel dormant. After the first tick (`workloads`), `checklistTouched` flipped true and the badge re-resolved with coverage live. **Behaviour matches `resolveHybridTier`'s `servicesInteracted` gate comment.** Recruiters who do a quick version-only pass on K8s (no walk) still get a sensible Green — they don't get punished for not walking the 13-service list on every screen.

8. **Phone-budget timing — K8s eats 3:20 of an 8-min call.** That's 42% of the budget on one tech. For Backend roles where K8s is must-screen this is acceptable; for roles where K8s is incidental, recruiters will rationally skip the services walk and let the version-only Green stand. The services-untouched gate enables that gracefully (finding #7). **No defect, but a UX note:** for a Backend Engineer template, 3:20 on K8s is the ceiling, not the floor. Recruiters under time pressure will short-circuit the services walk — the gate-to-Green-on-version-only is the right back-stop for that, and round-12 shipped it. Validated.

9. **No new defects surfaced.** I was looking for: dual-body card layout breakage (none), badge label confusion when both channels disagree (none — worse-channel wins, label honest), radar regression on the new vetMode (none — radar aggregates on `color`, not vetMode, so hybrid mode slots in cleanly), depth-lift firing inappropriately on combined base (none tested in this session — depth=working). One latent concern: the `adjustForDepth` for hybrid mode runs on the combined base color regardless of which channel is worse, so a Helm-consumer who claims `depth=deep` would have his Yellow lifted to Green. Sven didn't claim deep so I didn't hit it, but **this is the case the round-12 scoring.ts comment flagged as "ship the simple version and revisit if a sim surfaces a regression"** — a future sim with a Helm-consumer who self-claims deep would test it. Flag for round-13 sim scope.

---

## 5. Round-12 verdict

**Safe.**

Round-12's hybrid mode shipped the structural change it was scoped for. Sven Karlsson's Helm-consumer K8s shape now reads honestly as bounded-Yellow ("Review / Probe — 6/13 services") instead of the rubber-stamp Green he'd have gotten pre-round-12 on the 1.28 version match alone. The dual-body card renders cleanly, the services-untouched gate preserves the recruiter-quick-pass UX, the badge label composition is correct on the no-adjustment path, the radar absorbs the new vetMode without regression, and the PDF export works.

Two non-blocking follow-ups for whoever picks up round-13:

- **Rewrite `kubernetes.checklistGuidance` in recruiter-voice** (finding #4). One-line catalog edit. The current copy refers to internal personas and round numbers that mean nothing to the hiring manager.
- **Run a sim with a Helm-consumer + self-claimed `depth=deep`** (finding #9). The `adjustForDepth` on combined-base behaviour is documented as "ship simple, revisit on regression"; this session didn't exercise it. If the lift fires inappropriately for a Sven-shape candidate who over-claims depth, that's the round-13 fix surface.

Neither blocks closing round-12. Hybrid mode is doing the job the round was scoped for, and the alternative (collapse K8s to Helm-consumer-Green-by-default) would have been worse for the Lars-shape (deep platform engineer who *should* read Green).

Ship it; clear round-12 off the priority list; move on to whatever round-13 is.
