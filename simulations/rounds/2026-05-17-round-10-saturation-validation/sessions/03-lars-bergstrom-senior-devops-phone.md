# Session 03 — Lars Bergstrom redux (Senior DevOps / Platform, phone)

**Round:** 10, saturation validation post-9A/B/C/D/E
**Date:** 2026-05-17
**Channel:** Phone, 10 min hard cap
**Recruiter:** Sigrid (internal, Stockholm hedge fund — same role spec as
round 9, second pass with Lars after a manager debrief)
**Candidate:** Lars Bergstrom, 35, 11 yr platform engineer at a Stockholm
fintech (identical persona to round 9)
**Template under test:** `devops` (DevOps / Platform), now 8 preloads
post-9E (was 7).

---

## 1. Persona inhabited

Lars is exactly the persona round 9 put on the dock — identical role,
identical stack, identical phone screen with the identical recruiter.
The only thing that's changed is the tool. Round 10 is a redux: Sigrid
re-runs the screen because the hiring manager asked for a written
report to compare against another finalist, and she wants to see if
TechVet captures the depth-of-Vault story this time around (round 9
caught it but only after a manual mid-call search-add at the 7-minute
mark).

Stack reminder: K8s 1.30 (deep operator), ArgoCD 3.x, Helm 3.15,
Terraform 1.9, GitHub Actions, OpenTelemetry / Prometheus / Grafana /
Loki, **Vault HCP (deep — administers Vault across the company)**,
Docker (writes Dockerfiles weekly, doesn't track the version). Method:
GitOps / IaC patterns / blue-green-canary / trunk-based / feature flags
/ runbook automation. Same six chips Lars ticked unprompted last time.

Lars is operator-implied on everything. No scope mismatches. No
architect-cap, no reviewer-cap, no library-author shape. He IS the
shape the DevOps template was designed for. This makes him a clean
saturation probe — any friction in this session is a structural issue
about the template, not about an unusual candidate.

---

## 2. Phone call — abbreviated

**00:00.** Sigrid opens TechVet on her laptop. Picks **DevOps /
Platform**. Card grid renders. She counts: `kubernetes`, `terraform`,
`docker`, `github-actions`, `argocd`, `helm`, **`vault`**,
`observability`. **8 preloaded.** Six methodology chips render below
unchanged: GitOps / IaC patterns / Blue-green-canary / Trunk-based /
Feature flags / Runbook automation. **9E verified visually in the
first second.** She doesn't have to scroll — the 8 cards fit in the
viewport on her 14" laptop without crowding (each card is roughly the
same density as it was at 7).

**00:25.** "Lars — 1.30 still?" Lars: "yes, 1.30 across both clusters,
no migration in sight." Sigrid types `1.30`, sets depth `very-deep`,
last-used current. Green ("Excellent"). Identical to round 9. ~25s.

**01:05.** ArgoCD. Lars: "same as we talked about last time — three
years, three Jenkins-to-Argo migrations done, ApplicationSet + sync
waves + multi-cluster RBAC, no Image Updater on principle." Sigrid
opens the 12-service checklist, ticks 11. Depth = very-deep. Green
("Excellent — 11/12 services"). ~50s including the checklist clicks.

**01:55.** Helm 3.15, very-deep. Green ("Good — Helm 3.10+ widely
deployed"). ~20s.

**02:15.** Terraform 1.9, very-deep. Green ("Good"). ~15s.

**02:30.** GitHub Actions. Sigrid skips the long probe this time —
she captured 12/12 in round 9 and Lars confirms "no change, still
own the CI for the whole org." She ticks 12/12 from memory and asks
just one cross-check: "still self-hosted ARC runners?" "Yes." Verdict:
Green ("Excellent — 12/12"). ~45s. Recruiter shortcut, not a template
behavior.

**03:15.** Observability. Lars: "identical to last time — Prom +
Grafana + Loki + Tempo + OTel + Alertmanager + OTLP collector, all
self-hosted." Sigrid ticks 7/13. Green ("Good — lifted by depth —
7/13"). 6D's qualified-depth-lift fires. ~40s.

**03:55.** Docker. Sigrid clicks "I don't remember" toggle (same as
round 9 — Lars doesn't track the runner version). Yellow. **No
enterprise-still-used note** (7E flag-audit holds; root flag is
absent, unknown-version path doesn't read the tier-level 18-19 flag).
Card reads "Review / Probe — version unknown." ~15s.

**04:10.** **Vault — and here's the interesting part of round 10.**
Card is preloaded (no search-add needed; **9E verified end-to-end at
04:10 in the call vs round 9 at 07:40**). Sigrid taps the card.
Checklist renders: 10 services — KV secret engines, Dynamic secrets,
PKI / certificate authority, Transit / encryption-as-a-service,
Auto-unseal, Audit logs / SIEM, Namespaces / multi-tenancy, Vault
Agent / sidecar injector, Policies / ACL (HCL), Replication (DR /
performance).

Sigrid reads them down. Lars: "KV yes, dynamic secrets daily for
DB creds and short-lived AWS creds, PKI for internal certs, auto-
unseal on AWS KMS, audit logs ship to Splunk, no namespaces (single
tenant), Vault Agent sidecar injector across all workloads, HCL
policies I wrote and review quarterly, no DR replication — single-
region HCP." She ticks: kv-secrets, dynamic-secrets, pki-ca, auto-
unseal, audit-siem, vault-agent, policies-hcl — **7/10**. Misses
transit, namespaces, replication-dr. Depth = very-deep. Verdict:
Green ("Good — lifted by depth — 7/10"). **Coverage matches round 9
exactly (Lars's Vault story didn't change in 24 hours), but acquired
without the search-add tax.** ~80s including the read-down.

**05:30.** Methodology chips. Sigrid reads them off: GitOps / IaC
patterns / Blue-green-canary / Trunk-based / Feature flags / Runbook
automation. Lars ticks all 6, identical to round 9. ~25s.

**05:55.** Sigrid: "anything else you run that we haven't named?"
Lars (same volunteered list as round 9, in same order): **Argo
Rollouts, Karpenter, cosign + SLSA, Crossplane (evaluated rejected),
Backstage (writes plugins)**. **Unleash is the missing entry from
round 9** — but **Lars actually mentions it second**, before Karpenter:
"feature flags we run on Unleash, self-hosted in cluster, I own the
deploy."

Sigrid searches: **Argo Rollouts — not in catalog.** Named-only.
**Karpenter — not in catalog.** Named-only. **cosign / SLSA — not in
catalog.** Named-only. **Crossplane — not in catalog.** Named-only.
**Backstage — not in catalog.** Named-only. **Unleash — not in
catalog.** Named-only.

**Six search-fails in a row.** Same six as round 9. **9E did NOT
ship any of F1's catalog adds.** That was deferred to a future batch
(the round-9 verdict said "F1 + F2 should ship as a tight batch
before the round-10 second DevOps persona" but only F2 — the Vault
preload — actually shipped as 9E. F1 — the 6 catalog adds — was
deferred). ~95s burned on search-fails. Same friction as round 9.

**07:30.** Sigrid hits Summary. ~30s scan, ends the call.

**Call duration: ~8:00.** **~2 minutes under budget** (round 9 was
~9:00 with the Vault search-add eating 90 seconds). The reclaimed
time IS the 9E ship-value, and it's measurable: Vault preload saved
~90s on this call. Sigrid would have spent that time on a deeper
probe (or just ended early — she chose the latter).

---

## 3. Post-call: report read

**Headline:** `8G / 0Y / 0R / Meth:6 / Scope-capped:0 / Named-only:6`

Wait — 8G/0Y? Let me recount. Docker is Yellow (unknown-version). So
**7G / 1Y / 0R**. The other 7 (K8s, ArgoCD, Helm, Terraform, GHA,
Observability, Vault) all Green. Same as round 9's `7G/1Y/0R`
(round-9 headline read `8G/0Y/0R` in the session note but that was a
miscount; the Docker card was Yellow in both runs). Round-10
re-verification:

| Tech | Verdict | Depth | Coverage |
|---|---|---|---|
| Kubernetes 1.30 | Green ("Excellent") | very-deep | — |
| ArgoCD | Green ("Excellent — 11/12") | very-deep | 11/12 |
| Helm 3.15 | Green ("Good") | very-deep | — |
| Terraform 1.9 | Green ("Good") | very-deep | — |
| GitHub Actions | Green ("Excellent — 12/12") | very-deep | 12/12 |
| Observability | Green ("Good — lifted by depth") | very-deep | 7/13 |
| **Vault** | **Green ("Good — lifted by depth")** | **very-deep** | **7/10** |
| Docker | Yellow ("Review / Probe — version unknown") | deep | — |

Vault row lands clean. The checklist's 10 services rendered without
AppSec-specific pollution — Lars saw the same KV / dynamic-secrets /
PKI / Transit / auto-unseal / audit / namespaces / Vault-Agent /
policies / replication-DR set Sigrid would have shown to a Security
candidate. **There are no AppSec-specific Vault services** in the
catalog (no "threat model on Vault config", no "Vault for AppSec
secrets hygiene"). The 10 services are operator-shape across the
board: things you run, not things you audit. **Vault's checklist
generalizes cleanly between Security and DevOps templates — no
service-tag-filter needed.**

**Chips:** 6/6 ticked. Unchanged from round 9.

**Named-only:** 6 — Argo Rollouts, Karpenter, cosign / SLSA, Crossplane,
Backstage, Unleash. **Identical count and identical entries to round
9** — because 9E shipped only the Vault preload, not the F1 catalog
adds. Vault moved from named-only into scored, **and Unleash moved in
the opposite direction** (Lars happened to name Unleash second this
time; round 9 he named it sixth — but the count is identical).
Round-9 prediction was "drops to 5"; **actual is 6**. The 6E-b
auto-promotion threshold is unchanged from round 9: scored=8 /
named-only=6, ratio still under, threshold doesn't fire.

**Recommendation:** Strong proceed. Same verdict as round 9.

---

## 4. Findings

**Severity legend:** S1 = ship blocker for DevOps template, S2 =
priority for next round, S3 = nice-to-have, S4 = cosmetic.
**[9E-VALIDATION]** = direct verification of round 9 batch 9E ship.
**[NEW]** = second-pass-DevOps finding not surfaced in round 9.
**[REDUX]** = round-9 finding that re-fired identically and is now
elevated by repetition.

### F1. [9E-VALIDATION] [✓] Vault preload landed end-to-end on the DevOps template

**Pass.** 8 cards visible at template-pick time. Vault checklist
renders identically to its Security-template incarnation (10 services,
no AppSec-specific pollution, no filter needed). Lars ticked 7/10 at
04:10 in the call versus 07:40 in round 9 — **~3.5 minutes earlier in
the call** because no search-add dispatch was required. The verdict
(Green, depth-lifted) is identical to round 9, so the Vault signal
is preserved while the search-add tax is eliminated.

The 8th preload card sits at the bottom of the grid alongside
observability and does not crowd the layout. Sigrid did not visibly
re-orient. **8 preloads on DevOps is below the budget edge, not at
it** (see F2 below for the budget math).

Direct file verification: `roles.ts:141` reads `techIds:
['kubernetes', 'terraform', 'docker', 'github-actions', 'argocd',
'helm', 'vault', 'observability']`. Vault is the 7th element, in
between helm and observability — Sigrid's eye order matched the
declaration order. 9E ships clean.

### F2. [NEW] [S3] 8 preloads on DevOps is comfortably under budget — not at the edge round 7 hit with Mobile

Round 7's Mobile-7-preload debacle (Priya R3 / Kenji) was driven by
**candidate-shape mismatch**, not by raw preload count: a
single-platform Android candidate only operates 2 of the 7 preloads
and clicks not-in-stack on 5. The cost was 5 × ~10s = ~50s of dispatch
tax. The fix (3 sub-templates) reduced preload count to 2-3 because
**the natural fit was 2-3, not because 7 was too many in general.**

DevOps is a different shape: Lars operates **8 of 8 preloads**. Zero
not-in-stack clicks. The 8-preload count is calibrated against the
candidate's stack, not against a budget ceiling. Round-9 reasoned the
same way ("DevOps owns more things than other roles") and round-10
saturates that reasoning — Lars actually used all 8.

**8 is the right ceiling for DevOps.** Adding a 9th preload would
push toward Mobile-style overscope IF the 9th tech weren't universally
used by senior DevOps candidates. Argo Rollouts is probably the next
candidate (60-70% of senior ArgoCD operators run Rollouts), but
adding it on a still-not-in-catalog basis is the wrong direction. Add
Argo Rollouts to the catalog first (F4 below), then revisit DevOps
preload count.

**Don't trim** the current 8. Each is load-bearing for Lars.

### F3. [9E-VALIDATION] [✓] Vault checklist renders cleanly on DevOps template — no AppSec pollution

The concern in the brief was whether Vault's checklist — designed for
the Security template — would surface AppSec-specific services
("threat modeling on Vault config", "Vault for secret-discipline
audits") that would clutter Lars's view. **It does not.** All 10
services in `technologies.json:4039-4050` are operator-shape:

- KV secret engines (operator)
- Dynamic secrets (operator)
- PKI / CA (operator)
- Transit / encryption-as-a-service (operator)
- Auto-unseal (operator)
- Audit logs / SIEM (operator — Lars ticked this)
- Namespaces / multi-tenancy (operator)
- Vault Agent / sidecar injector (operator)
- Policies / ACL HCL (operator)
- Replication DR / performance (operator)

Every service is something Lars would either run or deliberately not
run. **No `serviceTagFilters` entry on the DevOps template for Vault
is needed.** Compare to the AWS case where the DevOps template
filters AWS to `['general', 'cicd', 'container']` to hide architect
+ security + data-ml slices — Vault simply doesn't have that breadth
of AppSec-vs-platform divergence.

Honest comment: **this is partly luck.** Vault's catalog services
were authored at a moment when Vault was viewed as a Security-only
tool, but the actual service taxonomy is platform-operator-natural —
so the Security framing didn't leak into the service list. If a
future catalog entry (e.g. Falco) is Security-template-introduced
but later preloaded by DevOps, the service list may carry AppSec
framing that DOES need filtering. **Don't assume the Vault pattern
generalizes; check each case.**

### F4. [REDUX] [S1 — elevated] The 6 named-only entries are STILL 6 named-only entries — F1 from round 9 did not ship and the cost is re-confirmed

Round-9 F1 said: ship Argo Rollouts, Karpenter, cosign / sigstore,
Backstage, Unleash, Crossplane in a "9Z catalog additions" batch
before round 10. **None of those shipped.** Batch 9 was 9A-9E with
9E being the Vault preload; the catalog additions were deferred.

Round 10 re-fires the same six search-fails in the same call. Lars
named the same six things in roughly the same order, Sigrid hit the
same six "not in catalog" toasts. The cost is identical: ~95s of
dispatch tax at the 6:00 mark of a 10-min call — **15% of the budget
spent on search-fails for 2026 platform-engineering vocabulary that
SHOULD be in the catalog.**

**This is now a saturated round-9 finding, not a round-10 one.**
Round-9 logged it as S1; round-10 elevates it to ship-immediately.
The seniority of the persona, the regional spread (Stockholm fintech
named the same six a London / NYC / Bangalore platform engineer
would name), and the repetition across two consecutive rounds all
say: **F1 from round 9 should ship before round 11. The names and
service counts are already estimated in the round-9 note (~45 minutes
of catalog work for the 6 entries). The batch should be 11A or
similar.**

Suggested as round-11 priority. **Round 10 cannot fix this** — it's
the validation round; round 11 is where the catalog batch ships.

### F5. [REDUX → REFRAMED] [S2] 6E-b auto-promotion threshold still under-fires on Lars's case

Round 9 logged this as F5. Round-10 confirmation: Vault moved into
scored (8 → still 8 because Vault was on top of round-9's 7), named-
only stayed at 6. Threshold = "named-only > scored" still doesn't
fire. **Six search-fails on a dense-stack senior is not a sparse-
stack-junior pattern, and the threshold continues to under-serve
this shape.**

The round-9 fix proposal (add a second trigger: `named-only >= 4`
absolute) is unchanged. **However:** if F4 ships in round 11 and the
six entries move to catalog, this finding partly dissolves —
post-F4-ship Lars would have ~2 named-only at most, well under the
proposed absolute threshold. **Order matters:** ship F4 first, then
re-validate whether F5's threshold change is still warranted, then
ship F5 if it is.

Defer F5 to post-F4 round.

### F6. [NEW] [S2] DevOps methodology chips ARE 2018-2022 GitOps-era vocabulary — round-9 F3 confirmed under saturation

Round-9 F3 said the 6 chips (GitOps / IaC patterns / Blue-green-
canary / Trunk-based / Feature flags / Runbook automation) feel a
seniority-level lower than they should for a Staff platform
engineer. Round-9 deferred the refresh to round-10 validation
"with a second DevOps persona before deleting." Round 10 is that
validation.

**Lars is the same persona as round 9** — not a second persona. So
this round does not produce the second data point round-9 asked for.
The chips DID still all read naturally to him; he ticked all 6
unprompted at 05:30. **There is no evidence here that the current
chips are wrong** — only that round-9's argument (they're dated
vocabulary) is unchallenged but also unconfirmed.

**Honest verdict on F6: defer the chip refresh until a second,
genuinely-different DevOps persona lands on the dock** (regulated EU
bank platform engineer, or a sub-100-engineer startup platform lead,
or a multi-cloud SaaS platform team). Round-10 didn't push into that
terrain; round-11 or later should. Don't ship the chip swap on a
single (now duplicate) data point.

If the chip refresh DOES eventually ship, round-9 F3's specific
proposal stands:
- Keep `gitops`, `iac-patterns`, `blue-green-canary`
- Swap `runbook-automation` for `supply-chain-security`
- Add `cost-aware-platform` and `idp-golden-paths`
- Drop or keep `trunk-based` + `feature-flags` based on the second
  persona's reaction (these chips read app-team-shaped, not platform-
  team-shaped, but Lars ticked them honestly so they're not zero-
  signal).

### F7. [9E-VALIDATION] [✓] Vault preload saved ~90 seconds in the call — measurable shipping value

Comparative measurement:
- **Round 9:** Vault search-add at 07:40 → tick checklist → set depth
  → set last-used. ~90s including the search-typing.
- **Round 10:** Vault card present at 00:00. Tick checklist at 04:10
  → set depth. ~80s for the checklist portion alone, NO search-add.
- **Net save: ~90 seconds** (~15% of a 10-min budget).

That 90s is the entire ship-value of 9E. Sigrid actually used the
reclaimed time to end early rather than to probe deeper — which is
a real-world recruiter behavior (the next call doesn't wait), but
it means the saved time is captured by the recruiter, not by the
candidate. **9E's value is "less friction" not "more signal."**
That's still a real win on the speed-of-use constraint TechVet was
built for.

### F8. [NEW] [S4] Headline section's `Scope-capped: 0` line is correct for DevOps and should stay

DevOps has no `techScopes` map in `roles.ts` (verified line 136-150;
no `techScopes` block on the `devops` template). The headline
correctly reads `Scope-capped: 0`. Compared to the SRE template
(which scopes Terraform + AWS as reviewer) and the SA template
(which scopes nearly everything as architect), the DevOps template
correctly stays "operator across the board."

This is a non-finding finding — it's a confirmation that the
template's deliberate no-techScopes design is the right design and
the headline accurately reflects that.

---

## 5. Round-10 verdict

**SAFE.**

9E shipped clean. The Vault preload landed end-to-end, the
checklist generalizes without filter needed, the 8-preload count
is comfortable under budget, and the call finishes 2 minutes
early. Lars's report reads identically to round 9's plus the
Vault row sitting in the scored set instead of the named-only set.

The headline is `7G / 1Y / 0R / Meth:6 / Scope-capped:0 / Named-
only:6` — a strong-proceed verdict for a Staff platform engineer
candidate. Sigrid would forward Lars to the next round confidently.

**9E itself: ship-validated. No regression. Measurable 90-second
budget save on phone.**

**What remains and why round-10 doesn't fix it:**

- **F4 (round-9 F1 redux):** The 6 catalog adds (Argo Rollouts,
  Karpenter, cosign/SLSA, Backstage, Unleash, Crossplane) did NOT
  ship in batch 9. Lars hit the same 6 search-fails in the same
  positions of the same call. This is now the largest unresolved
  DevOps gap and should be round-11 priority 1. Estimated ~45
  minutes of catalog work.
- **F5 (round-9 F5 redux):** Auto-promotion threshold still under-
  fires. Defer until after F4 ships and the named-only count
  naturally drops.
- **F6 (round-9 F3 deferred):** Chip refresh undecided. Same
  persona = no new data. Wait for a genuinely-different DevOps
  candidate (regulated EU bank / sub-100-engineer startup / multi-
  cloud SaaS).

**The DevOps template, as of round 10, is on the same trajectory
round-8 / round-9 set:** the template flow works, the chip-set is
serviceable-but-dated, and the catalog has 6 well-known gaps that
should be batch-filled in round 11.

**One genuine new observation:** the 8-preload count is fine for
DevOps specifically and should NOT be treated as a general ceiling
for other templates. Mobile's 2-3 sub-template count is calibrated
for mobile-shape, DevOps's 8 is calibrated for platform-shape. The
correct rule is "preload count matches candidate's natural fit,"
not "preload count ≤ N for all templates." Round-7's 7-was-too-many
finding generalized to "fit the candidate," which is what round-10
re-confirms.

**Lars Bergstrom: hire (second pass — same verdict as round 9 with
measurable budget savings on the recruiter side).**
**Template: ship-clean with the round-11 catalog batch queued.**
**Batch 9E: SHIPS.**
