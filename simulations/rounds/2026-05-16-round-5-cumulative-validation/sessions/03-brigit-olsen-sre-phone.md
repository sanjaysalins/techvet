# Session 03 — Brigit Olsen (Senior SRE, 7 yr)

**Agent:** sim-agent-03
**Date:** 2026-05-16
**Round:** 2026-05-16-round-5-cumulative-validation
**Channel:** Phone (5-10 min)
**Role template picked:** SRE / Platform Engineer

## 1. Persona inhabited

Brigit runs the on-call rotation for a three-region self-managed Kubernetes
fleet at a Nordic on-prem fintech. Speaks in error-budget arithmetic and
sounds bored when she does — "we burned 40% of the budget on a noisy-neighbor
in week two, so we paused feature work." Open-source obs zealot (Prom + Graf +
Loki + Alertmanager + Tempo); has opinions about Datadog pricing. Touched AWS
once in a 2022 build-vs-buy evaluation that ended in "we stayed on-prem", and
will say so unprompted if the recruiter brings it up. Reads Terraform PRs from
the platform team but doesn't write modules herself.

## 2. Phone call — abbreviated

> R: "Brigit, walk me through your stack."
> B: "Go services on self-managed K8s, three regions, Helm for everything."
> [R picks SRE template — page preloads K8s/TF/obs/Helm/Go/Python/AWS cards
>   + the 6-chip SRE methodology row]
> [R: K8s card → version "1.30", depth "very-deep" → badge flips Green]
> B: "Helm 3.14 — we author the charts, the platform team owns the registry."
> [R: Helm "3.14", depth "deep" → Green]
> R: "Terraform?"
> B: "I review platform-team PRs but don't write modules."
> [R: TF "1.8", depth "working" — template already set scope=reviewer.
>   Verdict: "Review / Probe (capped — reviewer scope)". R looks puzzled
>   for a half-second, moves on.]
> R: "Observability?"
> B: "Prom, Grafana, Loki, Alertmanager, Tempo. No Datadog, we're on-prem."
> [R clicks 5 checkboxes on obs card — 5/14 = 35%. Yellow.]
> B: "Also SLOs and error budgets, that's how we run."
> [R clicks the 6th checkbox "SLOs/SLIs/error budgets" — 6/14, still Yellow.
>   Then sees the methodology chip-row, clicks "SLOs / SLIs" AND
>   "error budgets" AND "blameless postmortems" AND "capacity planning". 4
>   chips in ~6 seconds.]
> R: "Go version?" B: "1.22." [R types, Green.] R: "Python?" B: "Scripting
>   only, 3.11." [R types, picks "working", Green.]
> R: "AWS?" B: "Evaluated in 2022, never shipped to it."
> [R: AWS — no checkboxes ticked. R types "2022" into Last used. Yellow
>   "Not yet assessed — 0/9 services". No softener fires. R looks confused.]
> [Time's up. 7 techs + 4 methodology chips logged in ~7 min.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Kubernetes | 1.30 | very-deep | operator (implied) | **Good** (1.28 tier; no depth lift needed) |
| Helm | 3.14 | deep | operator (implied) | **Good** (3.10 tier; depth lift moot) |
| Terraform | 1.8 | working | **reviewer** (K2-applied) | **Review / Probe (capped — reviewer scope)** |
| Observability | 6/14 = 43% | — | — | **Review / Probe — 6/14 services** (yellow band) |
| Go | 1.22 | working | operator (implied) | **Good** (1.21 tier) |
| Python | 3.11 | working | operator (implied) | **Good** |
| AWS | 0/9 (filtered) | — | reviewer? operator default? | **Yellow "Not yet assessed — 0/9"** + flagged `notDiscussed` → excluded from buckets |

**Methodology chips (display-only):** SLOs/SLIs, error budgets, blameless
postmortems, capacity planning (4 of 6 curated).

**Summary headline:** Strengths 4 (K8s, Helm, Go, Python). Probe Further 2
(Terraform reviewer-capped, Observability 43%). Not Discussed 1 (AWS).
Methodology section reads cleanly with 4 SRE-canonical chips.

## 4. Accuracy judgement

- **Where it's right:** K8s/Helm/Go are accurate. The TF reviewer-cap is
  *exactly correct* — Brigit reviews modules; she shouldn't read as a
  Terraform author. K2 fires automatically and saves the recruiter from
  needing to know the scope axis exists. Methodology chips capture
  Brigit's self-description verbatim (SLOs/error-budgets/blameless/
  capacity) — for a senior SRE this is the load-bearing signal.

- **Where it under-rates:** **Observability scoring is broken for the
  open-source-only candidate.** Brigit operates a complete production
  obs stack (Prom, Graf, Loki, Alertmanager, Tempo, SLOs) — that's 6
  ticks of 14 = 43% = Yellow "Review / Probe." But the 14 includes
  Datadog, New Relic, Splunk, Honeycomb, Sentry, RUM — vendors Brigit
  has *deliberately not adopted*. The denominator includes her competitors'
  products. A candidate who ran the entire CNCF observability stack
  scores identical to someone who half-knows two SaaS dashboards.
  Round-1 Robin and round-3 Cara raised this; it's still open.

- **Where it over-rates:** Helm 3.14 with `deep` flags Green. Brigit
  authors charts, so Green is defensible — but the verdict gives no
  signal that she runs charts in a three-region production fleet vs.
  having written one tutorial chart. The depth axis flattens this. Less
  critical than the obs issue.

- **Where it's silent on something a hiring manager would need to know:**
  The AWS handling. Brigit said "evaluated in 2022, never shipped" —
  that's a *negative* signal of judgment (she made a build-vs-buy call
  and ran it). The report files her under "Not Discussed" alongside
  cards the recruiter ran out of time on. Hiring manager reading the
  PDF sees "AWS: not discussed" and assumes the recruiter forgot to
  ask. Brigit's *deliberate non-adoption* is invisible. This is the
  round-1 Hiroshi-GraphQL / Sam-Pulumi "evaluated and rejected" gap
  (still tracked as Fix T but not shipped).

## 5. Friction during the call

- **Recruiter saw the TF "reviewer-cap" amber note and paused.** "Capped
  — reviewer scope" is correct, but on a phone the recruiter is reading
  a verdict that *demotes* TF without having touched a control. They
  recovered, but the message is opaque if they don't know what scope is.

- **Obs checklist scrolling.** 14 services in a one-column list on a
  laptop side panel is a *lot* on a phone-time budget. Recruiter
  scrolled to find Tempo and almost missed Alertmanager.

- **Duplicate-shape on SLO.** Brigit said "we do SLOs." Recruiter had
  two places to capture it: obs-checklist tick `slos` AND methodology
  chip `slos-slis`. Recruiter ticked both, unsure which was canonical.
  This is the cumulative-tension flagged in the dispatch: ~3 seconds of
  hesitation per duplicate-shape concept.

- **AWS lastUsed=2022 did nothing.** Recruiter expected the system to
  visibly treat "evaluated in 2022" differently from a blank field. It
  didn't. (Per `scoring.ts:118-128`, `applyRecency` is version-mode
  only and AWS is checklist; even if AWS were version-mode it has no
  `enterpriseStillUsed` flag so the softener wouldn't fire anyway.)

## 6. Bugs / structural defects

1. **Observability checklist mixes vendors with open-source — denominator
   pollution.** A 100% open-source operator (Prom + Graf + Loki +
   Alertmanager + Tempo + OTel + SLOs = 7) caps at 50% coverage because
   the denominator includes Datadog/New Relic/Splunk/Honeycomb/Sentry/RUM
   she's deliberately avoided. Either split into open-source-stack and
   vendor-stack, or compute coverage per *coherent stack*. Evidence:
   `src/data/technologies.json:2832-2889`. Still open after round-1
   Robin / round-3 Cara called it out. **Severity: High.**

2. **`applyRecency` cannot soften any checklist-mode tech — Fix E is
   silently scoped out of the cloud category.** Brigit's "AWS evaluated
   in 2022" → no softener, no penalty, no signal — because (a) AWS is
   checklist-mode and `applyRecency` only runs on version-mode tier
   match (`scoring.ts:118-128`); and (b) AWS lacks `enterpriseStillUsed`
   anyway. The Fix E softener cannot reach the entire Cloud category
   (AWS/Azure/GCP all checklist-mode, none flagged). Sarah's design
   wrinkle was sold as universal; it's actually version-mode only.
   Evidence: `scoring.ts:118-128` + `technologies.json:1928-1969`.
   **Severity: High** (silently misses a whole class of "evaluated
   and rejected" signal for the cloud subset).

3. **"Evaluated and not adopted" collapses to "Not Discussed".** When
   Brigit says "we evaluated AWS in 2022 and stayed on-prem," the report
   shows AWS under the *Not Discussed* section — same bucket as cards
   the recruiter ran out of time on. The recruiter typed "2022" into
   `lastUsed` but didn't tick any services, so the `notDiscussed` flag
   fires (`scoring.ts:357-367`). Hiring manager loses a real datapoint.
   Fix T (evaluated/migrated-off tri-state) is the named cure; still
   open. **Severity: Medium.**

4. **Duplicate-shape: SLO as obs-checklist service AND SRE methodology
   chip.** Captures the same fact in two places. Recruiter under time
   pressure ticks both. Report shows "SLOs/SLIs" in the chip-row AND
   contributes to obs coverage; the hiring manager sees it twice with
   no cross-reference. The right model: chips for methodology, checklist
   for tooling — `slos` is a methodology, not a Prometheus product. Move
   the `slos` checkbox out of the obs checklist and let the chip carry
   the signal. Evidence: `roles.ts:119` + `technologies.json:2882`.
   **Severity: Medium** (clutter, not wrong).

5. **K2 scope-cap message on Terraform is correct but cold.** "Review /
   Probe (capped — reviewer scope)" reads as a *demotion* on a phone
   call. The recruiter doesn't see the K2 rationale; they see a
   tech they didn't dispute getting yellow-flagged. Suggest the badge
   tooltip surface a one-line "SRE template assumes platform-team
   ownership of TF — change scope to operator if Brigit writes modules."
   Evidence: `scoring.ts:308-309` + `TechCard.tsx:154-159`. **Severity:
   Low** (UX polish; the cap is correct).

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate per tech).** With SRE template preloaded:
  - K8s/Helm/Go/Python (version-mode, just version + depth): **~8-10 s** each.
  - Terraform (preloaded + scope already set): **~6 s** (no scope thinking).
  - Observability (14-item scrolling checklist): **~25-35 s** to find
    and tick 6 items, even with all visible.
  - AWS (checklist + lastUsed): **~12-15 s** to acknowledge "not used."
  - **Methodology chips:** 4 chips × ~1.5 s each = **~6 s** total.
  - Methodology free-text: never used (chips covered it).
  - **Total: ~7 min for 7 techs + 4 chips.** Within the 8-min budget,
    but only because Brigit was crisp and chips obviated free-text.

- **Phone-shrink test.** What breaks on a real phone call:
  1. **Obs checklist scrolling** — 14 items is too many; recruiter
     loses voice-contact attention while scrolling.
  2. **TF "reviewer-cap" amber note** — recruiter on phone has no time
     to parse "capped — reviewer scope"; they see yellow and either
     ignore or panic-edit scope back to operator (which is wrong).
  3. **AWS "evaluated 2022"** — recruiter typed lastUsed, got no
     feedback, doesn't know if it "took." This is invisible failure.
  4. **Methodology chip-row vs obs-checklist SLO duplicate** — 3 seconds
     of hesitation × ~3 ambiguous methodology items adds ~10 s of
     cognitive load on a tight budget.

- **Friction that vanishes on phone.** Reading the K2 amber note. On
  phone the recruiter would skim it, accept the yellow, and move on —
  losing the explanation. On video/async they'd actually read it.

- **Risk / safe rating.** **At-risk.** Survives Brigit's call only because
  she's crisp and the template fits. A more rambling SRE candidate +
  more vendor-stack obs ticks + author-shaped TF would push past 10 min.
  The obs checklist length is the single biggest phone-risk item.

## 7. Catalog gaps

- **No first-class observability vendor split.** See bug 1.
- **OpenTofu is bundled with Terraform** — fine for now, but Brigit said
  "we're evaluating OpenTofu," which got captured nowhere visible.
- **No GitOps tool surfaced for SRE template** — ArgoCD is in DevOps
  template but not preloaded for SRE. Brigit didn't mention it, but a
  Flux/Argo-heavy SRE shop would expect it.
- **No "on-call / incident-response" methodology chip.** SRE has
  blameless-postmortems but not "on-call hygiene" or "incident commander"
  — Brigit's actual daily work has nowhere to live beyond the
  postmortem.

## 8. One-liner for cross-cut

> **Brigit (Senior SRE, phone) — SRE template — obs checklist still
> mixes open-source with vendor SaaS so a complete CNCF-stack operator
> scores Yellow; Fix E softener doesn't reach AWS or any cloud
> "evaluated-and-rejected" claim because applyRecency is version-mode
> only and no cloud entry carries `enterpriseStillUsed`.**

## 9. Recommendation

**Split the observability checklist into open-source-stack and
vendor-stack subsets and compute coverage per stack** (highest of the
two becomes the verdict). A complete Prom/Graf/Loki/Alertmanager
operator should score Green at 6/7 in the OSS stack — not Yellow at
6/14 across both. This was named in round 1 (Robin) and round 3 (Cara);
cumulative round 5 confirms it. Without it, the SRE shop that runs the
canonical CNCF stack reads identical to the half-Datadog dabbler.
Adjacent fix: extend Fix E so checklist-mode entries with
`enterpriseStillUsed: true` can soften when `lastUsed` is stale — this
would let "evaluated AWS in 2022" surface as a real signal instead of
collapsing into Not-Discussed.

## Disagreement with prior fixes

**Methodology chips (D4) for SLOs are the right home; the obs checklist
service `slos` should go.** D4 is the load-bearing improvement for
senior SRE screens — Brigit's signal is methodology-shaped, not tool-
shaped. But shipping D4 alongside an obs checklist that also has an
SLO checkbox creates the duplicate-shape friction (bug 4). When two
fixes overlap on the same concept, the older / less-specific one should
yield. The chip-row owns "what does she do?"; the checklist owns "what
does she run?". SLO is not a runnable product.
