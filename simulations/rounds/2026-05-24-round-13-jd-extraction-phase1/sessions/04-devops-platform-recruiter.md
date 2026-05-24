# Round-13 JD extraction Phase 1 — Session 04 (DevOps / Platform)

**Fixture:** `fixtures/04-devops-sre-platform.md` — "Staff DevOps / Platform Engineer", Austin hybrid, 1,200-person B2B SaaS supply-chain SaaS; owns the GitOps + admission-control surface on multi-tenant K8s.
**Result file:** `results/04-devops-sre-platform.json` — 18 extracted techs.
**Recruiter:** Marisol "Mari" Reyes, 11 yr platform/SRE recruiting out of Austin, current desk is K8s + GitOps + supply-chain-security shops (Argo, Flux, Crossplane, Sigstore, Backstage). Bills against staff/principal platform reqs; she has read enough job descriptions to know what the JD-author *meant* even when they were sloppy.
**Date:** 2026-05-24.

---

## 1. Persona inhabited

Mari has worked enough K8s reqs to know the shape this JD wants: a candidate who has lived in ArgoCD + Argo Rollouts day-to-day, has migrated from Gatekeeper to Kyverno (a real, recent industry move), authors Crossplane Compositions instead of bare Terraform for dynamic tenant carve-outs, and is fluent in Cosign / Sigstore / SLSA L2→L3 attestation. The "Hands-off the keyboard" section is the kind of thing she *celebrates* in a JD — it tells her not to send Java backend candidates pretending to be platform engineers, and it tells her not to waste her time with Windows/.NET shops or frontend specialists. She would paste this JD into TechVet first thing, look at what preloads, and decide which template to start from (DevOps / SRE). What she wants out of Phase 1 extraction: a clean platform-engineer chip set, no language-noise contamination, and Vault + the mesh layer correctly surfaced because those are deal-breaker depth questions on the call.

---

## 2. The extraction at a glance

18 entries, sorted by category:

- **Backend (1):** `dotnet` ← matched ".NET" from the *"No Windows / .NET"* exclusion line. **False positive.**
- **Cloud (1):** `aws` ← matched "AWS".
- **DevOps (12):** `argo-rollouts`, `argocd`, `backstage`, `cosign-sigstore` (matched "Cosign" + "Sigstore"), `crossplane`, `github-actions`, `gitlab-ci`, `helm`, `karpenter`, `kubernetes` (matched "Kubernetes" + "k8s"), `kyverno`, `observability` (matched "Prometheus" + "Grafana"), `pulumi`, `terraform` (matched "Terraform" + "tf" — the alias picked up "static infra stays on TF").
- **Language (1):** `java` ← matched "Java" from the *"We don't write Java here"* exclusion line. **False positive.**
- **Testing (1):** `junit` ← matched "Java" because the catalog name is "JUnit (Java)" and `nameSearchTerms` splits on parens, so "Java" becomes a search term for `junit`. **False positive, and the worse of the two — JUnit is not even adjacently mentioned in the JD.**

That's 15 sensible chips + 3 wrong chips.

---

## 3. Findings

### F1 — DevOps catalog coverage is excellent: every K8s/GitOps tech the JD names was hit  ✓
Argo Rollouts, ArgoCD, Kyverno, Crossplane, Karpenter, Backstage, Cosign/Sigstore — every one of the recently shipped DevOps catalog entries the brief flagged was extracted correctly. The `cosign-sigstore` entry deserves special call-out: matched both "Cosign" and "Sigstore" via independent terms, exactly as the catalog `name` "Cosign / Sigstore" + `nameSearchTerms` split intends. Helm, Kubernetes (both "Kubernetes" + "k8s" alias), Terraform (both "Terraform" + "tf" alias), GitHub Actions, GitLab CI, Pulumi, AWS — all clean. The 12 DevOps chips Mari sees are *exactly* the recruiter-useful core. **This is the headline win for Phase 1 on this fixture.**

### F2 — `.NET` false positive from the "Hands-off the keyboard" exclusion list  ⚠ (expected Phase 1 limit, but worth quantifying)
JD line 33: *"No Windows / .NET"*. The `dotnet` alias list (`aliases.ts:43`) contains `.net`, and `matchesAsTerm` correctly word-boundaries the period and the slash — so ".NET" hits. This is the canonical Phase 1 known limit the brief explicitly flagged. Mari can remove the chip in one click on the assessment screen; no harm, but the friction is real. **Severity ⚠ because: low-effort to dismiss, but the JD-author wrote a *crystal-clear* exclusion section and the tool ignored it.** If a JD this explicit can't get the negation right, more ambiguous JDs ("we're moving away from .NET") definitely can't.

### F3 — `java` false positive from "We don't write Java here"  ⚠ (same Phase 1 limit, same ergonomic cost)
JD line 32. Same mechanism as F2 — substring match has no context. Mari removes the chip. Same recommendation as F2: Phase 2 LLM must handle the entire "Hands-off" section as an exclusion block.

### F4 — `junit` false positive cascading from `java`  ✗ (worse than F2/F3 — this one is a structural extractor flaw, not just context-blindness)
The catalog entry `junit` has `name: "JUnit (Java)"`. `nameSearchTerms` (jdExtractor.ts:35) splits on `/` and `()`, producing `["JUnit", "Java"]`. The standalone term "Java" appearing *anywhere* in any JD will now flag JUnit, even though JUnit itself is never mentioned. The JD says "Java" once, in an exclusion line, and Mari gets handed a JUnit chip for a platform-engineering role. **This is a non-trivial bug independent of Phase 2 context-awareness — it would still mis-fire on a perfectly worded JD that mentions Java only in a sentence like "candidates with Java background welcome but not required."** Recommended fix: `nameSearchTerms` should only emit the parenthetical content as a term when the parenthetical is a *synonym* (e.g. "Go (Golang)" — both forms refer to the same tech), not when it's a *qualifier* (e.g. "JUnit (Java)" — "Java" is parent-language metadata, not a synonym). Cheapest fix: move parent-language qualifiers out of the `name` into a separate `parentLanguage` field, or curate which parenthetical content the splitter emits. **Severity ✗ — qualifies as blocking because it's reproducible on any JD that mentions Java in *any* context.**

### F5 — Vault is mentioned three times in the JD but not extracted  ✗
JD line 27: *"Vault for secrets (we use HCP)"*. Line 29: *"Familiarity with cosign / SLSA / SBOM (we're at L2 attestation today...)"* references the secrets story implicitly. Line 37 tooling list: *"...Vault, AWS (EKS / Lambda / DynamoDB / S3 / EventBridge)."* The catalog entry exists at `technologies.json:4166` as `id: "vault"`, `name: "HashiCorp Vault"`. The extractor builds search terms from `nameSearchTerms("HashiCorp Vault")` = `["HashiCorp Vault"]` (single multi-word term; the `/` and `()` splits don't apply here). There is **no alias** for `vault` in `aliases.ts`. So the extractor demands the literal multi-word "hashicorp vault" appear in the JD; bare "Vault" is invisible. For a platform/SRE role, missing the secrets-management tech is a recruiter-relevant gap — Mari would expect to see it as a chip and walk the 10-service checklist. **Recommended fix: add `vault: ['hcp vault']` to `aliases.ts` and either (a) add a `vault` alias too, accepting the false-positive risk on "Ansible Vault" prose, or (b) split `nameSearchTerms` to also emit the trailing-word "Vault" the way GitHub Actions / GitLab CI already work as multi-word names without aliases.** Severity ✗ because this is a top-of-the-fold "We'd love" requirement plus a tooling-list anchor.

### F6 — Linkerd / Istio / Cilium / eBPF — entire service-mesh layer is invisible  ✗ (catalog gap, not extractor bug)
JD lines 25-26: *"Service mesh experience (we run Linkerd; Istio acceptable)"*, *"Cilium or eBPF familiarity"*. None of Linkerd, Istio, Cilium, or eBPF exist as top-level catalog entries — they appear only inside the `kubernetes` sub-service `service-mesh` line item (`technologies.json:1417`: `"Service mesh (Istio / Linkerd / Cilium)"`), and the extractor iterates *top-level* techs only. Mari would expect at minimum a "Service Mesh" or per-mesh chip; she would not expect to find these depth-of-skill probes buried as a single sub-service checkbox under K8s. **This is a catalog-shape gap, not an extractor bug** — but the JD highlights it: a platform-engineer role where the mesh is a named differentiator and the tool surfaces zero mesh signal. Recommendation: promote `linkerd`, `istio`, `cilium` to top-level catalog entries (each easily warrants a checklist-mode 8-10-service entry), and let `service-mesh` line item on K8s become the "have you operated *any* mesh" gate. Severity ✗ because it's the single biggest signal-loss on this fixture for the platform-engineer recruiter.

### F7 — Datadog / Honeycomb mentioned as alternates to Prometheus, only Prometheus extracted  ⚠
JD line 21: *"One of: Prometheus, Datadog, Honeycomb at production-instrumentation depth"*. The `observability` catalog entry has Datadog and Honeycomb as sub-services (`technologies.json:2977`, `:2989`), but the entry's search terms are built from its name "Observability (Prometheus / Grafana / OTel)" → `["Observability", "Prometheus", "Grafana", "OTel"]`. Sub-service names are not exposed as searchable surface. Result: Prometheus + Grafana fire the `observability` chip, Datadog and Honeycomb are silent. For *this* JD Mari still gets the observability chip (good), and during the checklist walk on the assessment screen she'd see Datadog/Honeycomb as ticked-or-not options. So the *extraction* outcome is fine, but a JD that named only Datadog (no Prometheus/Grafana) would extract zero observability signal. **Severity ⚠ on this fixture; would be ✗ on a Datadog-only or Honeycomb-only JD.** Same recommendation as F6 path: either promote sub-services to top-level techs, or have the extractor index sub-service names as additional search surface for the parent.

### F8 — "tf" alias picked up correctly on the throwaway phrase "stays on TF"  ✓
JD line 10: *"static infra stays on TF"*. The `terraform: ['tf', ...]` alias hit. Word-boundary regex correctly accepted "on TF" / "on TF)" punctuation. Nice — this is exactly the abbreviation-recovery the alias map exists for. The `matched` array in the result transparently lists both "Terraform" and "tf", which is useful telemetry for whoever is debugging extraction.

### F9 — "Sigstore" matched via the slash-split of "Cosign / Sigstore" — confirms `nameSearchTerms` works as designed for synonyms  ✓
The catalog `name` is `"Cosign / Sigstore"` and the JD uses both forms ("Cosign + Sigstore signing flow" on line 11; "cosign / SLSA / SBOM" on line 29). Both got matched, deduplicated under the single `cosign-sigstore` chip. This is the right behaviour — Cosign and Sigstore are siblings in the ecosystem, the catalog correctly clusters them, and the extractor honors that.

### F10 — Pulumi extracted from a conditional ("at least one of (Crossplane / Pulumi)") — correct  ✓
JD line 19. Pulumi is named as an *alternative* skill the candidate might bring. Phase 1 fires it; Mari sees both Crossplane and Pulumi chips. This is the right read — the candidate might come from either side. No defect.

---

## 4. Things genuinely missed that a recruiter would expect

- **Vault** (F5) — top-tier miss for a platform-engineer JD; secrets-management is on every platform req.
- **Linkerd / Istio / Cilium / eBPF** (F6) — entire mesh layer invisible.
- **Datadog / Honeycomb** (F7) — only safe on this JD because Prometheus co-occurred; Datadog-only or Honeycomb-only JDs would silently drop the observability chip.
- **SLSA / SBOM** as standalone signal — JD mentions "L2 attestation today, pushing to L3 this fiscal" which is a concrete differentiator. Currently the `cosign-sigstore` chip absorbs this (via the `slsa-build` and `attestations` sub-services), so the recruiter sees the right chip but loses the *level* signal. Not a Phase 1 fix — Phase 2 LLM should be able to extract "L2 → L3 push" as a structured attribute on the cosign chip.
- **EKS / Lambda / DynamoDB / S3 / EventBridge** — JD line 37 explicitly enumerates these as the AWS surface. Phase 1 fires `aws` (good), but the *services* named are not pre-ticked on the assessment screen. Phase 2 could parse the parenthetical and pre-tick the relevant `aws.services` sub-entries; Mari otherwise has to remember to walk all 5 manually on a 6-7 minute platform-engineer screen.

## 5. False positives — extracted but shouldn't be

- **`java`** (F3) — "Hands-off" exclusion.
- **`junit`** (F4) — cascading from `java` via `nameSearchTerms` quirk. **The blocking one.**
- **`dotnet`** (F2) — "Hands-off" exclusion.

Three chips out of 18 (~17%) are wrong. Mari can swat all three in a few seconds, but F4 is a Phase 1 fix surface independent of any LLM work.

## 6. Catalog gaps surfaced

- **Linkerd** — promote to top-level checklist-mode entry (10-service: TCP / mTLS / multi-cluster / traffic split / retries / timeouts / circuit-breakers / ext-authz / observability / policy).
- **Istio** — promote similarly (Envoy proxy / Gateway API / VirtualService / DestinationRule / Sidecar / Ambient mode / Telemetry v2 / Wasm extensions / federation / mTLS).
- **Cilium / eBPF** — combined entry probably right (CNI / NetworkPolicy / Hubble / kube-proxy replacement / Tetragon / WireGuard / encryption / service mesh / gateway / clustermesh).
- **Datadog** — top-level entry (APM / Logs / Synthetics / RUM / Database Monitoring / Cloud SIEM / Workload Security / DBM / CI Visibility / CSPM).
- **Honeycomb** — top-level entry (events / BubbleUp / SLOs / Triggers / Refinery / OpenTelemetry-native / derived columns).
- **Envoy** (mentioned only as substring of "EventBridge"-adjacent territory in this fixture — but a standalone candidate for any service-mesh-heavy JD).
- **Gatekeeper / OPA** — JD says *"we recently migrated off Gatekeeper"*. The catalog references OPA/Gatekeeper inside Kyverno's `suggestedProbes` (`technologies.json:4770`) and `checklistGuidance`, but it's not a top-level entry. For a platform role hiring someone to *operate* a Gatekeeper-migration story, the recruiter would want a chip to attach the "have you done the Kyverno migration before?" probe to.

Phase 2 LLM is not the right answer for any of these — they are *catalog* gaps, not *extraction* gaps. Add the entries; Phase 1's deterministic matcher will pick them up cleanly.

## 7. Verdict — **At-risk**

**Why:** The DevOps-core extraction is excellent (F1), but three signal-shape problems compound on a platform-engineer JD:
1. The `junit` cascade (F4) — a structural extractor bug independent of Phase 2.
2. Vault silently missed (F5) — a top-tier requirement absent from the chip set, fixable with a one-line alias edit.
3. The entire mesh + multi-vendor-observability layer invisible (F6, F7) — catalog gaps, but they leave the recruiter walking into a platform-engineer screen with no Linkerd / Datadog chip to anchor the depth probe.

Mari's net experience: she'd start the assessment, remove .NET + Java + JUnit (10 seconds), add Vault manually via TechSearch (10 seconds), then go into the K8s service walk to find the buried service-mesh checkbox to capture Linkerd signal — workable, but the tool's first impression is "you have to babysit it" rather than "preload was sensible". On a Backend or Frontend JD this extraction quality would land at Safe; for the platform/SRE depth this JD targets, At-risk is honest.

## 8. Cross-cut recommendations for Phase 2 LLM scope

1. **Handle exclusion sections explicitly.** "Hands-off the keyboard", "Not required", "We don't use", "No frontend / mobile / Windows" — these are formulaic enough that even a small in-browser LLM should suppress matches inside them. F2 + F3 disappear immediately.
2. **Do NOT rely on the LLM to fix F4** — that's `nameSearchTerms` exposing parent-language qualifiers as search terms. Fix it in the catalog/extractor before Phase 2 ships; otherwise the LLM is papering over a deterministic bug.
3. **Pre-tick sub-services from parentheticals.** "AWS (EKS / Lambda / DynamoDB / S3 / EventBridge)" should pre-tick those five `aws.services` checkboxes on the assessment screen. This is the highest recruiter-value Phase 2 unlock — it converts the extractor from "which top-level chips" to "which sub-services within the chip".
4. **Extract numeric / level attributes onto the chip.** "L2 attestation today, pushing to L3" → annotate the cosign chip with "Currently L2, target L3". "Kubernetes 1.32" → pre-fill the version input. "5 prod clusters, 3 staging" → maybe scope=architect signal.
5. **Mesh + secondary-observability promotion is catalog work, not LLM work.** Land F6 + F7 catalog entries before Phase 2 ships, so the LLM has something to map to.
6. **Keep the deterministic extractor as the floor.** Phase 2 should *add* matches the rules miss, but should not silently *remove* rules-based matches — the recruiter benefits from seeing both signal sources and being able to override. The result file's `matched: [...]` array is the right primitive for this; Phase 2 should write `matchedBy: 'rules' | 'llm' | 'both'` alongside.
