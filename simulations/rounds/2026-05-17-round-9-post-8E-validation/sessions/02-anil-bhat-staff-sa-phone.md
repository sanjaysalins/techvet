# Round 9 — Session 02 — Anil Bhat redux, Staff Solution Architect, phone

**Channel:** Phone, 10 min. Recruiter Priya solo throughout; HM Marcus to read the PDF asynchronously.
**Template:** Solution Architect. **Seniority:** Staff.
**Primary lens:** Does 8B close the Yellow-base architect-scope gap that round-8 surfaced — i.e. does Anil's Azure (5/13 services = 38% = Yellow base) now render a scope-cap parenthetical without inflating the Staff-IC Scope-capped headline? And the second axis: same persona, now on phone (round 8 ran video), so any UI hint that depended on screen-share is now invisible — does the call still complete in time?

---

## 1. Persona inhabited

Anil Bhat, 42, fourteen years in enterprise architecture at a US fin-services consultancy. He owns AWS Landing Zone designs and Azure management-group structure for regulated clients — banks and insurance carriers where every architectural choice carries a compliance footnote. He doesn't write Terraform modules; he reviews the ones his platform team authors, redlines them against the Well-Architected pillars, and signs the ADRs. He reads Helm charts to confirm the network policy posture matches what he laid out in the C4 container diagram. He hasn't been on-call in seven years and doesn't pretend otherwise.

Phone is a deliberately worse channel for him than video. On video in round 8 he could share his screen and walk Priya through a context diagram; the recruiter could read body language while he paused to recall an account boundary. On phone — 10 minutes, no visuals — Priya has to take it at his speech rhythm: calm, deliberate, slightly older than the room. He still says "blast radius" instead of "SLO," still references EventStorming workshops the way a junior would reference Jira tickets. The risk for this candidate has never been "is he weak" — it's "does the report fairly differentiate a Staff Architect from a generic Yellow puddle." Round 8 closed the Green-base case (7C). Round 9 is supposed to close the Yellow-base case (8B). If the label suffix doesn't render, or if the Scope-capped headline inflates from 4 to 5 because Azure now counts, then 8B has not landed end-to-end and we'd be shipping the same misread on a different surface.

---

## 2. Phone call — abbreviated

**Pre-call (Priya, alone, ninety seconds before dialling).** Solution Architect template selected from Landing. Seniority dropdown — **Staff**. Channel = **Phone**, duration target = **10 min**. Six methodology chips pre-render: TOGAF / C4 / DDD / ADRs / Well-Architected / EventStorming. The five preloaded techs (kubernetes / terraform / aws / azure / postgresql; kafka also preloads but Priya plans to confirm-not-in-stack like last time) all arrive with `techScopes` set to `architect` from roles.ts. No phone-side scope dropdown to fumble with — the template did it.

Free-text mandate field: "Fin-services consultancy — Staff Solution Architect — Landing Zone + multi-account AWS, AKS architecture, ADR ownership."

**Minute 0-1 (dial, intro).** Anil answers on the second ring. "Anil here." Priya does the thirty-second framing: TechVet phone screen, ten minutes, hands the candidate to the technical interviewer afterward. He's done these before. "Go ahead."

**Minute 1-4 (AWS — the main course).** "Which AWS services do you actually work with day-to-day, even just at the architecture level?" He goes through a list — no rush, in his order. Landing Zone, Organizations and SCPs, IAM Identity Center, KMS, GuardDuty, Security Hub, Inspector, IAM, VPC, CloudFormation/CDK, S3, RDS. She ticks each as he speaks. He pauses, adds Macie ("I review the classification policies even if the data team authors them"). She ticks Macie. **13 of 26 AWS services = 50%**. depth=**deep**, lastUsed=**current role**, scope=**architect** (template default). Live verdict footer reads `"Review / Probe (capped from Good by architect scope) — 13/26 services"`. The 7C label format from round 8 is rendering identically on phone. Quietly confirmed.

(50% lands in the 25-66% Yellow band but above the 40% coverage-lift floor at scoring.ts line 495 — so depth=deep would normally lift Yellow→Green. Then architect scope catches that lifted Green at line 80 and caps back to Yellow with `cappedFromColor='green'`. The label parenthetical says "capped from Good" because the pre-cap color is Green. Correct.)

**Minute 4-5 (Kubernetes, Terraform — fast).** Anil: "1.30 on the regulated workloads, holding 1.31 until the PSP cleanup ships." Types **1.30**, depth=**deep**, lastUsed=**current role**. Card resolves to Green tier (min=1.28), then architect scope caps to Yellow with `cappedFromColor='green'`. Label: `"Review / Probe (capped from Good by architect scope)"`. No enterprise reassurance note — confirmed 7E removed `enterpriseStillUsed` from K8s root, but even pre-7E this path wouldn't have fired because the gate at scoring.ts line 350 requires `tier.color === 'yellow'` and 1.30 hits the Good tier raw. The 7E removal was load-bearing only for unknown-version or sub-1.28 quotes; not for Anil's 1.30.

Terraform: "1.9." Types **1.9**, depth=**deep**, scope=**architect**. Good tier (min=1.0), architect cap, Yellow. Same label shape. No enterprise note. Both 7E and the structural tier gate consistent with round 8.

**Minute 5-7 (Postgres — version-mode).** "We're on Postgres 15 in regulated production. I read schemas and review migration ADRs — I don't run vacuum." Types **15**, depth=**deep**, scope=**architect**, lastUsed=**current role**. PG 15 hits the Good tier at min=14 (root `enterpriseStillUsed=true` per technologies.json:1076; tier-level not declared, so falls back to root). Architect scope caps Green → Yellow, `cappedFromColor='green'`. Label `"Review / Probe (capped from Good by architect scope)"`. No enterprise note — same reason as K8s/Terraform: gate requires `tier.color === 'yellow'`, but the tier was Green, so the gate's tier-color check never matches. Counts as the fourth Staff-IC scope-cap.

**Minute 7-9 (Azure — the test).** This is the entry that round 8 surfaced as broken. Priya opens the Azure card. The 13-service checklist sits there. "Which Azure services do you touch?" Anil: "AKS for managed K8s on a couple of clients. App Service for the smaller workloads. Entra ID for the identity slice — I do a lot of management-group RBAC design. Key Vault for secrets-of-record. App Insights when I'm reviewing observability dashboards." Five ticks: AKS, App Service, Entra ID, Key Vault, App Insights. depth=**deep**, lastUsed=**current role**, scope=**architect**.

**5/13 = 38.46%.** That's under the 40% lift floor (scoring.ts:495 `COVERAGE_LIFT_FLOOR`) so depth=deep does NOT lift. baseColor stays **Yellow** (25-66% band). `applyScope` runs with adjusted color=Yellow, scope=architect. SEVERITY[yellow]=1, which is **not** strictly less than SEVERITY.yellow=1 — so the round-7 7C green-base branch at line 80-88 doesn't fire. Instead the new 8B branch at line 99-106 fires: `scopeCapped: true`, `cappedFromColor: undefined`, color unchanged at Yellow. composeLabel takes the second branch at scoring.ts:401 (no cappedFromColor) and renders `"Review / Probe (capped — architect scope)"`. Coverage suffix appends: **`"Review / Probe (capped — architect scope) — 5/13 services"`**.

Priya doesn't fully process the label phrasing on the live card during the call — she just reads "(capped" and trusts that scope is being honored. She makes a mental note to read it again on Summary.

**Minute 9-10 (Kafka, methodology, wrap).** "Kafka?" Anil: "Two clients have it but the streaming guild owns that workload. I'm not the architect on those." Priya marks Kafka `notUsed=true`. Methodology chips — all six template chips ticked while he was talking. She thanks him, says the technical interviewer will follow up within 48 hours, and hangs up at 10:03.

---

## 3. Post-call: report read

Priya navigates to Summary. PDF export is deferred — she wants to read the live screen first because she's specifically auditing 8B.

**Header.** "Anil Bhat — Role: Solution Architect — Staff — Cloud architecture, fin-services. Channel: Phone · Started 2026-05-17 11:48." Client mandate block renders the consultancy framing in slate-50.

**Headline cards.** `extras=2` (Methodology + Scope-capped both > 0, off-catalog=0) — so the grid is `md:grid-cols-5` per Summary.tsx:251. Five cards:

- Good: **0** (emerald)
- Review / Probe: **5** (amber) — AWS, K8s, Terraform, Postgres, Azure
- Concern: **0** (rose)
- Methodology: **6** (emerald-100)
- Scope-capped: **4** (slate-100, tooltip "Yellows that would have been Good without the scope cap — Staff IC / architect / reviewer patterns.")

**This is the exact number we wanted: 4, not 5.** The Scope-capped headline counts AWS / K8s / Terraform / Postgres (all four had `cappedFromColor === 'green'`) but excludes Azure (whose `cappedFromColor` is undefined under the 8B branch). Summary.tsx:73-75 filter `r.tier.scopeCapped && r.tier.cappedFromColor === 'green'` confirmed correct.

**Probe Further section — every Yellow's label text, exactly as rendered:**

1. **AWS (Amazon Web Services)** — `"Review / Probe (capped from Good by architect scope) — 13/26 services"` · 13 service chips listed below (Landing Zone, Organizations, IAM Identity Center, KMS, Macie, GuardDuty, Security Hub, Inspector, IAM, VPC, CloudFormation/CDK, S3, RDS). Depth chip: "Deep (built features end-to-end)." Scope chip: "architect." Last used: current role. Italic amber strip: *"Capped by architect scope — operates differently than an operator-level signal would imply."*

2. **Kubernetes** — `"Review / Probe (capped from Good by architect scope)"` · v1.30. Depth Deep, scope architect, last used current role. Italic amber strip same.

3. **Terraform / OpenTofu** — `"Review / Probe (capped from Good by architect scope)"` · v1.9. Same metadata strip.

4. **PostgreSQL** — `"Review / Probe (capped from Good by architect scope)"` · v15. Same.

5. **Microsoft Azure** — `"Review / Probe (capped — architect scope) — 5/13 services"` · 5 service chips below (AKS, App Service, Entra ID, Key Vault, App Insights). Depth Deep, scope architect, last used current role. Italic amber strip: *"Capped by architect scope — operates differently than an operator-level signal would imply."*

**Methodology + practices (6).** TOGAF, C4 model, DDD, ADRs, Well-Architected reviews, EventStorming. Emerald-50 chips. No verdict label, as designed.

**Confirmed not in stack (1).** Apache Kafka. Slash-icon callout box.

**Scope-capped card.** Slate-100 background, Sliders icon, "Scope-capped" header, count "4." On hover, the title attribute reads "Yellows that would have been Good without the scope cap — Staff IC / architect / reviewer patterns."

---

## 4. Findings

1. **VALIDATED — 8B fires on Yellow-base architect/reviewer.** Azure 5/13 = 38% Yellow base, scope=architect, renders `"Review / Probe (capped — architect scope) — 5/13 services"`. Source: scoring.ts:99-106 (new Yellow-base branch) → composeLabel:401 (no-cappedFromColor case). The pre-8B behavior — bare `"Review / Probe — 5/13 services"` indistinguishable from a mid-engineer with patchy Azure exposure — is gone.

2. **VALIDATED — Scope-capped headline does NOT inflate.** Count is 4, not 5. Azure's `cappedFromColor: undefined` correctly fails the Summary.tsx:74 filter (`cappedFromColor === 'green'`). Marcus reads the report and sees "4 of 5 Yellows are Staff-IC pattern" — the Staff-IC story is preserved without diluting it. Source: Summary.tsx:73-75.

3. **VALIDATED — Green-base path unchanged.** AWS / K8s / Terraform / Postgres all render `"(capped from Good by architect scope)"` exactly as round 8 confirmed. 8B is purely additive; the 7C contract held. Source: scoring.ts:80-88 still owns the Green-base branch with `cappedFromColor: adjusted.color`.

4. **VALIDATED — 7E flag-audit still holds.** No enterprise reassurance note on K8s 1.30 / Terraform 1.9 / Postgres 15. Two reasons confirmed: (a) 7E removed `enterpriseStillUsed` from K8s root (PG and Terraform never had it at the tier level either), and (b) the gate at scoring.ts:350 only fires when `tier.color === 'yellow'`, and all three hit Green tiers raw — so the architect cap moves the *final* color to Yellow but the *tier* was Green and the note never gets a chance. Defensive in depth. Working.

5. **DEFECT (cosmetic but real) — TechCard italic strip wording mis-frames the new 8B case.** Lines 158-163 of TechCard.tsx render *"Verdict capped by scope — {scope} scope can't earn the higher tier on operating signals alone"* whenever `resolved.scopeCapped` is true. For the Green-base cases (AWS / K8s / Terraform / Postgres) that wording is accurate — those *would* have read Good without the cap. But for Azure under 8B, the verdict was Yellow before scope ran and stayed Yellow after; nothing was capped *down*, only *bounded*. "Can't earn the higher tier" implies a tier was taken away. It wasn't. The honest framing for the Yellow-base case is closer to *"Architect scope acknowledged — verdict reflects scoped depth, not operator coverage"* or *"Scope honored — this Yellow is a scoped read, not an operator gap"*. Same wording defect lives on the Assessment screen card too (Anil never sees this on phone, but the recruiter does mid-call; a video session with screen-share would have surfaced it sooner). **Fix candidate for round-10**: branch the italic on `cappedFromColor !== undefined` and render two different strings — Green-base keeps current wording, Yellow-base gets the honest "bounded not lowered" framing. Source: TechCard.tsx:158-163.

6. **DEFECT (subtler) — Summary's per-tier-row italic at Summary.tsx:656-660 has the same mis-framing.** Same wording as TechCard, same problem. The Azure row renders *"Capped by architect scope — operates differently than an operator-level signal would imply"* which is closer to honest than TechCard's "can't earn the higher tier," but still leans on the implication that something was capped *off*. For the Yellow-base case the truth is the verdict was set by coverage alone and scope merely tagged it; the parenthetical label `"(capped — architect scope)"` does most of the explanatory work, the italic strip adds noise. **Fix candidate**: drop the italic strip entirely when `cappedFromColor === undefined`, OR rewrite to "Architect scope honored — verdict reflects scoped coverage." Source: Summary.tsx:656-660.

7. **OBSERVATION — Label asymmetry could confuse a careful reader.** Anil's report has two distinct cap labels:
   - `"(capped from Good by architect scope)"` — used for AWS / K8s / Terraform / Postgres
   - `"(capped — architect scope)"` — used for Azure

   A recruiter who notices the difference will probably read the first as "stronger" because it names the would-have-been tier. That's actually the correct read (Staff-IC pattern *is* a stronger signal than scope-bounded mid-coverage), but the labels don't *say* that — they just look different. The Scope-capped headline card already differentiates by count (4 not 5), so the signal is there in aggregate, but the per-row labels are unequal in a way that isn't documented anywhere in the UI. **Suggestion for round-10**: consider an explicit `"(capped at Yellow by architect scope)"` variant for the Azure case to make the asymmetry intentional-looking rather than accidental-looking. Or add a footnote under the Scope-capped card explaining the headline filter. Not load-bearing — Marcus will read this PDF in the right order — but a careful HM might pause.

8. **OBSERVATION — Headline mismatch (5 Yellows, 4 Scope-capped) is not visually explained.** Priya reads `0G / 5Y / 0R / Meth:6 / Scope-capped:4` and immediately understands. Marcus, reading the PDF without context, sees 5 Yellows and 4 scope-capped and has to count which of the 5 Yellow rows lacks the "capped from Good" suffix to figure out which one isn't counted. The Scope-capped card's title attribute tooltip ("Yellows that would have been Good without the scope cap") is the explanation, but title attributes don't print on PDF (Summary.tsx:296 — that's HTML behavior, not a TechVet bug). **Suggestion for round-10**: render the tooltip text as a visible micro-caption under the Scope-capped card count, at least in print, so the headline math is self-explanatory.

9. **VALIDATED — Channel chip reads "Phone."** Round-4 Bug 2's sentence-case styling holds. No regression on the phone path from round-8's video session.

10. **OBSERVATION — Phone channel exposed zero new defects in 8B itself.** The label, the headline filter, and the count all rendered identically to what a video session would produce. 8B is channel-agnostic, which is the right design. The wording defects in findings 5/6 are pre-existing UI strings that didn't change in 8B — they're surfaced now because 8B is the first build where Yellow-base scope-capped is a *distinct* case from Green-base.

11. **OBSERVATION — Coverage-lift floor (40%) doing the right thing.** Azure at 38% sits one tick below the floor. If Anil had ticked one more service — Bicep, App Insights deeper, anything to reach 6/13 = 46% — the lift would have fired, base would have gone Yellow→Green via depth, scope would have caught it at Green and rendered `"capped from Good."` That'd be a fifth Staff-IC count. The 40% floor is doing exactly what it was scoped to do (Owen's "mutually constraining" recommendation from round 6D): a deep+narrow specialist can earn the lift, a deep+thin self-report cannot. Anil's actual Azure exposure (5 services in a 13-row catalog) is genuinely thinner than his AWS exposure (13 in a 26-row catalog at 50%), and the report honestly reflects that.

12. **VALIDATED — PDF export.** Priya exports. Five Yellow rows, 6 methodology chips, 1 confirmed-not-in-stack, no Greens, no Reds. ~290 KB. Multi-page A4. The "(capped — architect scope)" suffix appears legibly on the Azure row in the PDF. Channel chip in header reads "Phone." All five label variants survive html2canvas correctly.

---

## 5. Round-9 verdict

**Safe — with two wording defects worth queueing for round 10.**

8B itself lands cleanly: the new Yellow-base architect/reviewer branch fires correctly, the label suffix renders, the Scope-capped headline filter holds the line at Staff-IC count without inflating. The number Marcus will read (Scope-capped: 4) is the right number; pre-8B he would have seen Scope-capped: 4 alongside Azure rendering as plain "Review / Probe — 5/13 services" and the case for differentiation would have been weaker. 8B closed the round-8 "α" gap.

The two defects (findings 5 and 6) are pre-existing wording strings now reading awkwardly because 8B introduced a new case those strings were never written for. Neither is load-bearing for Anil's specific report — Marcus will read the headline counts, the label parentheticals, and the methodology chips, and form the correct impression. But a future Yellow-base-architect candidate where the italic strip *is* the first thing the reader's eye lands on — say, a single-tech report — would get the mis-framing in full force.

Suggested round-10 batch:
- Branch the TechCard italic at lines 158-163 on `cappedFromColor !== undefined` and render two strings.
- Drop or rewrite the per-row Summary italic at lines 656-660 for the Yellow-base case.
- Optionally: render the Scope-capped card's tooltip text as visible micro-caption (one line of slate-500) for print.

Neither defect needs to ship before any external use; both should ship before the next architect-template candidate's PDF goes to a hiring manager who doesn't have the round-8 context Marcus does.

Anil's report, as it stands today after 8B, would survive a hiring manager read without anyone misreading it. The scope-cap story is honest, the headline math is correct, the methodology chips do the senior-signal work. Phone as a channel didn't introduce any 8B-specific risk. Round 9 has the green light on this lane.
