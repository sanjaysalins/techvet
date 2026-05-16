# Session 02 — Anil Bhat (Staff+, Solution Architect)

**Agent:** sim-02 (round-5 cumulative validation)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-5-cumulative-validation
**Channel:** Video panel (45 min; HM joins ~minute 18)
**Role template picked:** Solution Architect

## 1. Persona inhabited

Anil is 14 years in, the kind of pre-sales / post-sales architect who lives in Lucidchart, Word (for ADRs), and Zoom — last `terraform apply` was probably late 2023 on his own dev account. He talks in *blast radius* / *guardrails* / *SCPs* / *pillars*. Multi-cloud by client mandate (regulated US financial services — AWS for primary, Azure for a tier-2 bank that won't leave Office365). He won't mention Kafka because he doesn't think about it; he WILL mention KMS, Macie, and Macie's blind spots without prompting. Calm, formal, slightly impatient when asked patch versions. Speaks of Postgres as schema-design — he draws DDD aggregates, he doesn't `psql`.

## 2. Video call — abbreviated

> R: "Anil, walk me through your AWS footprint."
> A: "Landing Zone + Control Tower, Organizations with SCPs at the OU level, IAM Identity Center federated to Entra, KMS multi-region keys with per-account aliases. The usual."
> [R: opens AWS card. Scope chip already shows `Scope: architect` (template-applied). Searches checklist: ticks Landing Zone, Organizations, IAM Identity Center, IAM, VPC. Scans for "KMS" — *not visible*. Stares. Sees "9 other services hidden (filtered for Solution Architect)" under the checklist label. Pauses. Frowns. Hovers over the hint. *HM has not joined yet. Recruiter scrolls — there's no "show all" toggle.* Types "KMS" into Notes as a workaround. Reverts: ticks CloudFormation/CDK and Step Functions because Anil mentioned "Step Functions for the audit-evidence workflow." 7 ticks. Card: "Review / Probe (capped — architect scope) — 7/17 services" (41%).]
> R: "Azure?"
> A: "AKS, Entra ID, Key Vault, Bicep for the tier-2 bank. Not as deep but it's there."
> [R: searches "Azure". Not preloaded. Adds. Scope chip reads `— default: operator` then `via default`. R doesn't notice; types nothing. Ticks AKS, Entra ID, Key Vault, Bicep/ARM. 4/13 = 31% → Yellow. *No architect cap fired.*]
> [HM joins. Visible on Anil's screen-share now.]
> R: "Terraform?"
> A: "I author the module library; haven't run `apply` in 18 months."
> [R: types "1.10", depth=Very deep. Card: "Review / Probe (capped — architect scope)" — amber italic note visible. HM nods.]
> R: "Kubernetes?"
> A: "EKS, multi-account topology. 1.30-ish. I design it, my platform team runs it."
> [R: "1.30", very-deep, architect cap. Yellow.]
> R: "Postgres?"
> A: "Schema design only. DDD aggregates, choice of partitioning strategy. I don't operate."
> [R: leaves version blank, depth=Working. Yellow unknown-version, capped. *No `notDiscussed` flag (depth touched)*.]
> R: "Kafka?"
> A: "Not in my world."
> [R: clicks "Not in stack". Gray badge.]
> R: "OK, let me capture methodology — you mentioned TOGAF, DDD, EventStorming. Anything else?"
> A: "C4 for arch diagrams, ADRs, Well-Architected reviews quarterly."
> [R: clicks 6 chips (TOGAF / C4 / DDD / ADRs / Well-Architected / EventStorming) — *all 6 of Anil's stated methodology already curated for SA*. Zero free-text needed. HM smiles. ~18 min in.]
> R: [Sets Seniority=Staff+, years=14, path=Traditional path, context="designs but doesn't operate; multi-cloud regulated FS"]
> R: Exports PDF at minute 32. HM still watching.

## 3. What TechVet would output

| Tech | Coverage / Version | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| AWS | 7/17 services (41%) | working | architect (template) | **Review / Probe (capped — architect scope) — 7/17 services** (Yellow; coverage alone would be Yellow [25–66%], cap rides along) |
| Azure | 4/13 services (31%) | working | operator (via default — never overridden) | **Review / Probe — 4/13** (Yellow; *no* architect cap because Azure isn't in `techScopes` and SA template's `techScopes` only reaches preloaded techs) |
| Terraform | 1.10 | very-deep | architect | **Review / Probe (capped — architect scope)** (was natural Excellent; cap drops to Yellow + amber italic note) |
| Kubernetes | 1.30 | very-deep | architect | **Review / Probe (capped — architect scope)** (same shape) |
| PostgreSQL | (blank, no `Don't remember` toggle, no `Not in stack`) | working | architect | **Review / Probe (capped — architect scope)** (unknown-version Yellow; cap rides along; `notDiscussed=false` because depth set) |
| Kafka | n/a | n/a | architect (preloaded but unused) | **Not in stack** — gray badge, excluded from buckets |

**Summary headline:** 0 Good · 5 Probe · 0 Concern · 1 confirmed not in stack · 0 not discussed · candidate-context line renders: **"Staff+ · 14 yr in industry · Traditional path · designs but doesn't operate; multi-cloud regulated FS"** · channel chip "Channel: video" · methodology section "Methodology + practices (6)" with all six chips · radar shows Cloud + Database + DevOps + Backend (Kafka excluded).

## 4. Accuracy judgement

- **Where it's right:** K2 + AWS filter compose well on the *preloaded* SA stack. Terraform, Kubernetes, Postgres all read "capped — architect scope" automatically with zero recruiter interaction. Pre-K2 these would have been Excellent / Good rubber-stamps off depth=very-deep. The cap renders with a one-line amber italic ("Verdict capped by scope — architect scope can't earn the higher tier on operating signals alone") which is genuinely the right message for a hiring manager. **The D4 methodology section is the cleanest part of the report** — Anil's whole methodology stack (TOGAF / C4 / DDD / ADRs / Well-Architected / EventStorming) is six curated chips, zero free-text needed. With HM watching, this is the moment the report stops looking tool-shaped and starts looking SA-shaped. Big win.

- **Where it over-rates:** Azure. Because Azure isn't in the SA template's `techIds`, the `techScopes` map never fires; the catalog `defaultScope: "operator"` engages instead. Anil's Azure card on the report reads `Scope: operator via default` — wrong for an SA, *especially* an architect who barely touches Azure. A hiring manager skimming the Azure row will read 4/13 + working + operator = "she actually runs Azure at junior-mid level" — when really Anil reviews Bicep and writes ADRs. **This is the same Helena/Aaron Azure-not-in-SA-template gap, now compounded by the new `defaultScope: operator` catalog defense which actively mis-labels SA candidates' Azure scope.**

- **Where it under-rates:** All five capped chips on his preloaded stack read identically (Yellow capped). The HM can't see *within* the Yellows that Anil's Terraform architecture knowledge is genuinely staff-grade vs. his Postgres schema design which is competent-but-not-deep. D2 (architect-shaped severity ladder above Yellow) is still open; cumulative report makes its absence sharper because the cap creates a Yellow ceiling that flattens five distinct senior signals into one bucket.

- **Where it's silent:** **KMS is hidden by the SA filter.** KMS is tagged `["security"]` only; SA filter is `['general','architect']`. Anil literally said "KMS multi-region keys with per-account aliases" — that's load-bearing SA-grade design and the checklist refuses to surface it. Recruiter typed it into Notes (invisible on report tile head). Same fate for Macie / GuardDuty / Security Hub / Inspector — all of which an SA designing a regulated-FS landing zone needs to vet. The SA AWS filter is *too narrow* in security overlap; it should include `security` tag or at minimum the auth-adjacent slice.

- **Also silent:** **Control Tower as a distinct tickable service.** It's bundled into "Landing Zone / Control Tower (multi-account)" — fine, but Anil mentions both by name and would expect to see them as siblings. Cosmetic.

## 5. Friction during the call

- **AWS "9 hidden" hint creates a recruiter dead-end.** When Anil said KMS, the recruiter pattern-matched "KMS = AWS service = checklist", scanned the visible 17, saw 11 generals + 3 architect + 3 architect-tagged-general, and KMS wasn't there. The hint told her *why* but not *how to fix it* (no "show all" toggle, no per-keyword search-and-add). With HM watching, this 8-second freeze was visible. She typed into Notes as a fallback. **The filter is helpful AT REST but unhelpful WHEN THE CANDIDATE NAMES A HIDDEN SERVICE.**

- **Azure scope chip silently degrades to operator.** Because Azure isn't in SA's `techIds`, it's manually added. The chip reads `Scope: operator via default` — recruiter would have to (a) notice the chip, (b) understand what "via default" means, (c) think "wait, this is an SA, should be architect", and (d) click to change. None of this happens on a call. The K2 mechanism (template sets scope at add-time) doesn't reach manually-added techs. Cumulatively: the cap fires reliably on 5 preloaded techs and silently fails on the 6th.

- **Methodology chips are *frictionless* — surprising upside.** With HM watching, the recruiter clicked 6 chips in maybe 12 seconds. No typing, no thinking about which methodology label to use. The fact that *every single one of Anil's stated methodologies* was in the curated SA chip set made it look choreographed. Cumulative density question: this is one place where MORE structure actually reduces visual noise (vs. 6 free-text entries with random capitalization).

- **Cumulative density verdict (with HM watching).** The report stacks: candidate-context line + channel chip + 3 stat cards + 1 coverage chip + radar + 5 Yellow tier items (each with scope chip + cap explanation italic + tier note) + 6 methodology chips + 1 "confirmed not in stack" section. **It's dense but it's organized** — each section has a clear h2 and clear purpose. The Probe Further section is the heaviest (5 items × ~4 lines each = ~20 lines of similar-looking Yellow rows), and that's where HM eye-glaze risk is highest. Methodology section actively *relieves* density because it's the only section that doesn't say "Review / Probe".

## 6. Bugs / structural defects

1. **SA AWS filter excludes `security` tag — KMS hidden for architects who design encryption hierarchies.** What: SA `serviceTagFilters: { aws: ['general', 'architect'] }` (`roles.ts:78`). KMS is tagged `["security"]` only (`technologies.json:1951`); Macie / GuardDuty / Security Hub / Inspector likewise. An SA designing a regulated-industry landing zone vets these as part of the architecture, not just as the AppSec team's tools. Why it matters: round-5 cumulative test fired and *visibly missed Anil's most-named AWS service* on a video call with HM watching. Recruiter had no escape hatch. Evidence: Anil named KMS unprompted in the first 30s; checklist filter hid it; the "9 hidden" hint communicated the cause but not the fix. **Severity: High.** Trivial fix: add `'security'` to SA AWS filter (or split into "security-overlap" sub-tag).

2. **K2 scope-set doesn't reach manually-added techs (Azure regression).** What: `techScopes` only applies at `loadTemplate` time on `techIds` (`Landing.tsx:31`). Azure isn't in SA's `techIds`. When recruiter adds Azure mid-call, it falls through to `defaultScope: 'operator'` — *worse than nothing*, because pre-Fix-K it was implicit and the report just said operator-implied; post-K it says `Scope: operator via default` which reads as a confident catalog-level claim. Why it matters: same Aaron/Helena Azure failure mode but now actively misleading instead of silently absent. SA is canonically multi-cloud. Evidence: `defaultScope: 'operator'` on Azure (`technologies.json:1974`); no SA-template defense reaches it. **Severity: High.** Fix options: (a) add Azure + GCP to SA template `techIds` (cheap), (b) `defaultScopesByTemplate` so the catalog-template intersection wins (more invasive), (c) when a tech is added inside a template context, apply template's `techScopes` even if the tech wasn't preloaded (cleanest).

3. **"X hidden (filtered for Y)" hint is informational, not actionable.** What: TechCard renders hidden-count message but no "show all" toggle. `TechCard.tsx:292-296`. Why it matters: works fine *until* the candidate names a hidden service. Then the recruiter has no in-tool path — has to fall back to Notes (which doesn't render in a tier head on Summary). Evidence: KMS scenario above. **Severity: Medium.** Fix: small "show all" link next to the hint that flips a local state.

4. **Channel chip renders lowercase `video` / `phone` — cosmetic but reads sloppy on a customer-facing PDF.** What: `channelLabel` (`channel.ts:58-60`) returns `channel === 'async' ? 'Async (CV-only)' : channel` — phone/video pass through raw, so the chip says "Channel: video" not "Channel: Video". Async got specifically capitalized; phone/video didn't. Why it matters: with HM watching the report on screen-share, "Channel: video" looks like a code label. Evidence: line 59. **Severity: Low.** Fix: capitalize all three.

5. **Five Yellows look identical — D2 (architect tier above Yellow) still the long pole.** What: With K2 + AWS-filter composing, an architect candidate's entire report ends up Yellow-capped. Anil's Terraform / Kubernetes / Postgres / AWS / Azure all read Yellow, but the *quality of architecture knowledge* across those 5 is hugely variable (Terraform deep / Postgres surface-level). Why it matters: HM can't discriminate within the capped set. Cumulative test reveals this isn't a K2 bug — it's a missing tier. Evidence: cross-cut D2 still listed open in RESUME.md. **Severity: Medium (architectural).** Fix: a Senior / Architect tier above Green that depth+coverage+scope can land in; otherwise the architect cap is a flattening operator.

## 6b. Speed-of-use rating

- **Entry time (estimate).** Video so the recruiter has headroom: AWS checklist ~45s (search 3 + scan 17 + tick 7 in 20 + KMS fumble 8 + Notes 7); Azure ~30s (manual add + scan 13 + tick 4 + chip ignored 2); Terraform / K8s / Postgres ~10s each; methodology 6 chips ~12s total (2s/chip). **Per-tech mean ~22s; methodology ~2s/item.** The methodology section is faster per item than tech entry because it's chip-only — that's a model worth noting.

- **Phone-shrink test.** Three breaks: (1) **AWS-KMS-hidden fumble** would compound on phone where the recruiter can't pause to read the hint — she'd just be confused and miss KMS entirely. (2) **Azure-scope silent degradation** would never get caught on phone (recruiter doesn't read chips while typing). (3) **Methodology section would compress fine** — chips are click-only and the chip set was 100% accurate to Anil's stated stack; this might actually be the *least* phone-fragile cumulative element. The hint-without-escape-hatch and the Azure-scope leak are the phone-killers.

- **Friction that vanishes on phone.** Reading the "9 hidden (filtered for Solution Architect)" hint, hovering, frowning, deciding what to do — all video-only thinking time. On phone the recruiter would tick the 7 visible services and move on, KMS lost entirely. Worse: HM watching on a video reveals the freeze; on phone it would be silent data loss.

- **Risk / safe rating.** **At-risk.** The K2 + AWS-filter + D4 *composition* works for the happy-path 5 preloaded techs — those are Safe. The two off-template surfaces (Azure not in SA, KMS hidden from SA AWS filter) are At-risk and one of them (KMS) is the candidate's most-named AWS service. Not Unworkable; the methodology section and the auto-firing cap on the 5 preloaded techs are real wins. But the cumulative shape exposes that "validated individually" did NOT catch the composition gap.

## 7. Catalog gaps

- **AWS SA filter excludes security tag** — KMS / Macie / GuardDuty / Security Hub / Inspector all hidden from SA. SA candidates designing landing zones for regulated industries care about these as architecture concerns (key hierarchy, data-classification policy, threat detection coverage) — not just as AppSec daily tools.
- **Azure missing from SA template `techIds`** — Helena round-4 also flagged this. SA is canonically multi-cloud; Azure should be preloaded (with `architect` scope hint).
- **Azure missing architect-shaped services** entirely — Anil mentioned Management Groups, Policy / Blueprints, Defender for Cloud, Front Door (none in Azure catalog). Azure catalog (13 services) is operator-shaped; no architect-tag taxonomy at all (unlike AWS).
- **Control Tower bundled into "Landing Zone / Control Tower"** — fine pragmatically but Anil reads them as two distinct AWS products; report doesn't show his per-product fluency.
- **Methodology chip set for SA is *perfect*** — TOGAF / C4 / DDD / ADRs / Well-Architected / EventStorming covered 100% of Anil's stated stack. Not a gap; worth noting as positive evidence that D4 chip curation per role is well-tuned.

## 8. One-liner for cross-cut

> **Anil Bhat — Solution Architect (video panel) — K2 + AWS-filter + D4 compose cleanly on the 5 preloaded techs but break at the *edges*: KMS hidden by SA AWS filter (security-tag excluded), Azure manually added falls through to `Scope: operator via default`, and the "X hidden" hint has no escape hatch — cumulative validation surfaces a composition gap that single-fix tests missed.**

## 9. Recommendation

**Add `'security'` to the SA AWS filter and add Azure (with `architect` scope) to the SA template `techIds`.** Both are one-line edits in `roles.ts`. The first closes the KMS-hidden fumble that fires on every regulated-industry SA candidate. The second closes the Aaron/Helena multi-cloud gap and stops the Azure scope chip from silently mis-labeling architects as operators. Together they take Anil's report from "Yellow-capped + KMS-in-Notes + Azure-operator-mislabeled" to "Yellow-capped + KMS-visible + Azure-architect-capped" — same shape across all six cloud-and-infra techs, no off-template degradation. After that, the next-largest leverage is D2 (architect tier above Yellow) so the 5 capped Yellows can differentiate.

## Disagreement with prior fixes

None on the SA happy path — K2's architect cap is exactly right for Anil's preloaded techs and round-3 Aaron's recommendation landed cleanly. **Mild pushback on Fix K's `defaultScope: 'operator'` for cloud techs**: it's a good defense for backend-template-adds-AWS-mid-call (Eitan/Owen) but it actively mis-labels SA-template-adds-Azure-mid-call. The defense is mode-blind to the active template. A `defaultScopesByTemplate` map (or "if active template has `techScopes`, apply its scope to any add even if not preloaded") would close this without breaking the Eitan defense.

## Out-of-scope observations

- The "9 hidden (filtered for Solution Architect)" hint as written is a *recruiter*-facing message. If HM is watching screen-share, they read it too and have to interpret what "Solution Architect filter" means about why an AWS service is hidden. Consider whether the hint should be no-print on PDF and silent in HM-visible contexts. Edge case for the cross-cut.
