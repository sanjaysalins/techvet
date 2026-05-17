# Round 8 — Session 02 — Anil Bhat redux, Staff Solution Architect, video panel

**Channel:** Video, 45 min. Recruiter Priya solo from minute 1; HM Marcus joins minute 18.
**Template:** Solution Architect. **Seniority:** Staff.
**Primary lens:** Does 7C close 5ξ — does Anil's headline now read "Staff Architect, scope-capped" rather than "thin engineer with 5 Yellows"?

---

## 1. Persona inhabited

Anil Bhat, 42, fourteen years in enterprise architecture at a US fin-services consultancy. He owns AWS Landing Zone designs and Azure management-group structure for regulated clients — banks and insurance carriers where the cell of every architectural choice carries a compliance footnote. He doesn't write Terraform modules; he reviews the ones his platform team authors, redlines them against the Well-Architected reliability and security pillars, and signs the ADRs. He reads Helm charts to assess whether the network policy posture matches the segmentation he laid out in the C4 container diagram. He hasn't been on-call in seven years and doesn't pretend otherwise.

His speech rhythm is calm and slightly older than the room — he says "let me share my screen" when he wants to walk through a context diagram, asks "what's the blast radius if this fails" instead of "what's the SLO," and references EventStorming workshops the way junior engineers reference Jira tickets. When Priya asks what version of Kubernetes the team runs, he answers 1.30 without checking and adds "we're holding off 1.31 until the deprecated PodSecurityPolicy migration is finished in the audit branch" — which is the kind of detail an operator wouldn't volunteer because they'd already be living it. He's deliberate. He's not selling. The risk for this candidate has never been "is he weak" — it's "does TechVet make him look like a generic Yellow puddle when he's actually a Staff Architect at the top of a tightly-scoped band."

---

## 2. Video panel — abbreviated

**Pre-call (Priya, alone, two min before the link goes live).** Picks **Solution Architect** template. Seniority dropdown — selects **Staff** (the option exists; types.ts line 193 confirms `'staff'` is in the union). Channel = **Video**, duration = **45 min**. Six methodology chips pre-render on the template card: TOGAF / C4 model / DDD / ADRs / Well-Architected reviews / EventStorming. The preloaded tech IDs are kubernetes / terraform / aws / azure / kafka / postgresql, each with `techScopes` set to `architect` (roles.ts lines 106-113). She doesn't have to set scope manually on any of the five — the template did it. She does notice that the AWS service list has been filtered to ~22 of the catalog's 26 services (general / architect / security tags), exactly the slice she wants for a Landing-Zone candidate.

**Minute 0-3 (link opens, Anil joins).** Priya does the usual "this is a screening before HM joins" preamble. Anil opens his Notion page of accounts and clients, says "I've been Solution Architect at [consultancy] for nine years, before that I led platform engineering at a regional bank." She types that into the notes field on the assessment screen.

**Minute 3-12 (AWS — the main course).** She opens the AWS card. The filtered list shows 22 services: the core compute/storage row plus Landing Zone, Organizations, IAM Identity Center, KMS, Macie, GuardDuty, Security Hub, Inspector, IAM, VPC, CloudFormation/CDK. She walks the columns; he ticks Landing Zone, Organizations, IAM Identity Center, KMS, GuardDuty, Security Hub, Inspector, IAM, VPC, CloudFormation/CDK, S3, RDS. That's **12 ticks against a total of 26** (the unfiltered catalog total — `resolveChecklistTier` uses `services.length`, not the filtered surface, scoring.ts line 411). He skips Macie ("the data team owns classification, I don't author DLP policies"), skips Lambda / DynamoDB / SQS / Step Functions / API Gateway / EC2 (operational layer he reviews, not designs). She sets depth=**deep**, lastUsed=**current role**. AWS card now reads — at the live verdict footer — "Review / Probe (capped from Good by architect scope) — 12/26 services."

Priya reads that with relief. The whole reason this session was scheduled — round-7 ship of 7C — was to make sure that label appeared. Pre-7C it would have said `"Review / Probe (capped — architect scope) — 12/26"` and Marcus would not have known whether the cap was being applied to a Green ceiling or a Yellow floor.

**Minute 12-18 (K8s, Terraform — fast traversal).** Kubernetes — Anil says "1.30, holding off 1.31 for PSP cleanup." She types **1.30**, depth=**deep**, lastUsed=**current role**. Card reads "Review / Probe (capped from Good by architect scope)." No enterprise reassurance note — because (a) 7E removed `enterpriseStillUsed` from the K8s root, and (b) even pre-7E, the gate at scoring.ts line 329 requires `tier.color === 'yellow'` and 1.30 hits the **Good** tier raw, so the note couldn't have fired anyway. Quietly: 7E was already a no-op for this exact path; it would only have mattered if Anil hit unknown-version on K8s (line 285) or quoted 1.25 (the yellow band at min=1.24). Worth flagging but not load-bearing for this persona.

Terraform — "1.7." Types **1.7**, depth=**deep**, lastUsed=**current role**. Hits the Good tier at min=1.0. Architect scope caps → "Review / Probe (capped from Good by architect scope)." Same shape as K8s.

**Minute 18 (HM Marcus arrives).** Priya cmd-tabs to the Summary screen for the second screen-share — Marcus likes to see the running totals when he joins. The Summary header reads:

> **Anil Bhat** — Role: Solution Architect — Staff — Cloud architecture, fin-services
> Channel: Video panel · Started 2026-05-17 14:01

Six headline cards in the stats row (`extras=3` triggers the `md:grid-cols-6` branch, Summary.tsx line 252):

- Good: **0** (emerald)
- Review / Probe: **3** (amber) — AWS, K8s, Terraform
- Concern: **0** (rose)
- Methodology: **6** (emerald-100)
- Scope-capped: **3** (slate-100, slider icon, hover tooltip "Yellows that would have been Good without the scope cap — Staff IC / architect / reviewer patterns.")

Marcus glances at the row and reads — out loud — "okay, three Yellows but all of them scope-capped, six methodology chips, this is the Staff Architect shape." **This is the moment 5ξ was meant to fix.** It worked. Pre-7C he would have read "three Yellows, no Greens" and asked the kind of probing follow-up question that costs Priya twenty minutes of damage control.

**Minute 18-32 (back to Assessment — Postgres, Azure, Kafka).** Priya flips back. Postgres — Anil quotes **15** ("the schema-review side; I don't run vacuum"). depth=**deep**, lastUsed=**current role**, scope already=**architect** from the template. Card resolves to Yellow with "capped from Good by architect scope." Fourth scope-cap.

Azure — Anil ticks AKS, Entra ID, App Service, Key Vault, App Insights — **5 ticks of 13 services**. That's 38%, just under the 6D coverage-lift floor of 40%. baseColor = Yellow (between 25% and 66%). Then `applyScope` runs with scope=architect on an already-Yellow base: SEVERITY[yellow]=1 is **not** strictly less than SEVERITY[yellow]=1 (line 80), so the cap branch never fires — `scopeCapped: false`, `cappedFromColor: undefined`. **Azure renders as a plain "Review / Probe — 5/13 services" with no scope-cap parenthetical.**

This is the **first crack in 7C's story**. Anil at 5/13 Azure services with deep+architect on regulated AKS workloads looks identical, on the Summary card, to a mid-level engineer with patchy Azure exposure. The scope-cap card doesn't count him. The headline now reads **0G / 4Y / 0R / Meth:6 / Scope-capped:4**. AWS, K8s, Terraform, Postgres count; Azure does not.

Kafka — Anil says "we have it in two clients but I'm not the architect on those workloads, that's our streaming guild." Priya marks `notUsed=true`. Confirmed not in stack — caught by the skipped bucket, drops out of the headline counters.

**Minute 32-40 (methodology + open-ended).** Priya ticks all six methodology chips: TOGAF, C4 model, DDD, ADRs, Well-Architected reviews, EventStorming. Free-text — Anil mentions Wardley mapping ("we use it for tech-strategy bets but it's not formal"). She types Wardley into the chip-or-named-only input. It lands as a methodology chip (free-text path), adding a 7th chip. The Methodology card on Summary updates to **7**.

Marcus asks the open-ended "what was your toughest architectural call this year." Anil walks through a Landing Zone redesign that consolidated 47 accounts into a Control Tower topology after a M&A. Names ADRs, blast radius, the IAM Identity Center cutover sequence. Priya types into the notes field. Marcus is satisfied.

**Minute 40-45 (wrap, post-call review).** Priya navigates to Summary one final time. Marcus is still on the call but muted. She exports the PDF.

---

## 3. Post-call: report read

**Headline stats row (six cards, `grid-cols-2 sm:grid-cols-3 md:grid-cols-6`):**

| Card | Tone | Count |
| --- | --- | --- |
| Good | emerald-50 | 0 |
| Review / Probe | amber-50 | 4 |
| Concern | rose-50 | 0 |
| Methodology | emerald-100 | 7 |
| Scope-capped | slate-100 | 4 |
| Off-catalog | sky-100 | 0 (hidden — no off-catalog entries this session) |

Only 5 cards actually render (Off-catalog hidden, `offCount > 0` gate at Summary.tsx line 284) so `extras=2` → grid is `md:grid-cols-5`. Wait — re-tracing: methCount=7 (>0, +1), offCount=0 (+0), scopeCappedCount=4 (>0, +1) → `extras=2`. Grid is `grid-cols-2 sm:grid-cols-3 md:grid-cols-5`. **Five cards displayed across the row at md+.**

**Tier bucket labels in the Probe Further section** (Summary.tsx TierSection):

- **AWS** — `Review / Probe (capped from Good by architect scope) — 12/26 services` (badge: amber). Caption: "Capped by architect scope — operates differently than an operator-level signal would imply." Services chips show the 12 ticked.
- **Kubernetes** — `Review / Probe (capped from Good by architect scope)` v1.30. Same scope caption. No enterprise reassurance note (7E removed root flag; not relevant here anyway because raw tier was Good).
- **Terraform / OpenTofu** — `Review / Probe (capped from Good by architect scope)` v1.7. Same scope caption.
- **PostgreSQL** — `Review / Probe (capped from Good by architect scope)` v15. Same scope caption.
- **Azure** — `Review / Probe — 5/13 services`. **No scope-cap caption.** No "capped from Good" parenthetical. Reads identical to a generic patchy-Azure Yellow.

**Methodology section:** Seven chips — TOGAF, C4 model, DDD, ADRs, Well-Architected reviews, EventStorming, Wardley mapping. Emerald-50 chip styling.

**Coverage chips row:** `1 confirmed not in stack` (Kafka). No "not discussed" chip. No "off-catalog" chip.

**PDF export:** ~280 KB, three pages, opens cleanly. Headline row preserves the slate-100 Scope-capped card tone in the captured canvas.

---

## 4. Findings

1. **[Validated, Round-7 7C] Scope-cap label-text differentiation works for the lift-then-cap path on checklist mode.** AWS at 12/26 with depth=deep + scope=architect hits the 6D coverage-lift (Yellow→Green), then `applyScope` caps with `cappedFromColor: adjusted.color` = 'green' (scoring.ts line 87). composeLabel emits `"Review / Probe (capped from Good by architect scope) — 12/26 services"`. Marcus reads "Staff IC, would have been Good, capped because he doesn't operate it." This is exactly the round-6 5ξ ship target. **Severity: confirmed.**

2. **[Validated, Round-7 7C] Scope-cap label-text differentiation works for the natural-Green path on version-mode.** K8s 1.30, Terraform 1.7, Postgres 15 all land at their Good tier raw, then architect-cap fires at scoring.ts line 87 with cappedFromColor='green'. Three of four scope-cap counts come from this path. **Severity: confirmed.**

3. **[Validated, Round-7 7C] 6th-card render gate composes correctly.** Summary.tsx line 244 `extras = (methCount > 0 ? 1 : 0) + (offCount > 0 ? 1 : 0) + (scopeCappedCount > 0 ? 1 : 0)` correctly counted 2 extras (no off-catalog this session). Grid resolved to `md:grid-cols-5`. Slate-100 card rendered with title-attribute tooltip explaining the count. **Severity: confirmed.**

4. **[Gap, Round-7 7C — first crack] Architect scope on a baseline-Yellow tier doesn't set `cappedFromColor`, so Azure at 5/13 reads identical to a thin-Azure mid-engineer.** Critical case. scoring.ts line 79-95: `applyScope` only enters the cap branch when `SEVERITY[adjusted.color] < SEVERITY.yellow` — i.e., the pre-cap color is Green. When pre-cap is already Yellow (Azure at 38% coverage, below the 40% lift floor), the function passes through unchanged with `scopeCapped: false`. **Semantically defensible** (there was nothing to cap; the cap is a no-op), but **misleading on the headline**: Anil's Azure exposure as a Staff Architect with deep+architect on 5 of the 13 services and a Wardley-flavored ADR practice reads as "Review / Probe — 5/13 services" with no Staff-IC framing. The Scope-capped count is 4, not 5. **Severity: medium.** 5ξ is *mostly* closed but not fully — the "scope-capped" framing is invisible when the underlying coverage doesn't quite cross the lift floor. Fix shape: either lower the 40% floor for architect-scope, or add a `scopeContext: 'architect-marker'` flag that fires on every architect-scope card regardless of underlying tier, so the Summary chip can read "Architect scope (uncapped — under coverage threshold)". scoring.ts line 79; Summary.tsx line 73-76.

5. **[Validated, Round-7 7E] `enterpriseStillUsed` audit removed from kubernetes / terraform / kotlin / swift / react-native / docker root entries.** Verified directly: technologies.json lines 1286-1318 (K8s), 1320-1353 (Terraform), 1014-1047 (Kotlin), 979-1012 (Swift), 910-942 (React Native), 1247-1284 (Docker — note: Docker still has tier-level `enterpriseStillUsed: true` on its yellow tier at line 1268, which is *correct* — the tier-level flag means "fires only on that band" per the catalog comment, not the blanket root flag). Docker root has no `enterpriseStillUsed`. **Severity: confirmed.** For Anil this is a no-op because his K8s and Terraform both hit the natural Good tier; the 7E change matters for unknown-version branches and yellow-tier matches on those techs.

6. **[Validated, Round-7 7B] Recency softener wording is the neutral 2026-05-15 phrasing.** scoring.ts line 195 — `"Stale (X) but the version was current at last-use — defensible older usage; probe whether the candidate is returning to it or deliberately moved off."` Anil doesn't trip this branch (all his techs are lastUsed=current), so it's not directly tested in this session, but the wording is confirmed in place.

7. **[Validated, Round-7 7A] Backend methodology chips exist (6 entries).** Not used in this SA session, but confirmed at roles.ts lines 85-92.

8. **[Gap, Round-7 7C — second crack] Three sky/slate-toned cards risk confusability in the headline row.** Methodology = emerald-100 (Summary.tsx line 274), Off-catalog = sky-100 (line 285), Scope-capped = slate-100 (line 296). Methodology and Off-catalog are *adjacent on the color wheel* (emerald-100 and sky-100 are both pale-cool greens at 100 lightness in Tailwind), and Off-catalog and Scope-capped are *both cool grays* (sky-100 is barely-blue, slate-100 is barely-blue-gray). At-a-glance, three muted pastel cards in a row blur together. Marcus said "okay three Yellows but all scope-capped" — but if he'd glanced and seen Methodology:7 in his peripheral vision he might have read 7 as the scope-cap count. **Severity: low-medium, cosmetic but UX-load-bearing.** Round-7 7C ship didn't address this; the slate-100 choice was a fresh selection for round-7. Fix shape: bump Scope-capped to a more saturated tone (slate-200 + slate-800 text, or pick a different family like violet-100). Summary.tsx line 296.

9. **[Out-of-scope for round-8 but flagged] composeLabel never emits the depth-lift parenthetical alongside scope-cap.** When applyScope caps, it forcibly sets `depthAdjusted: false` (scoring.ts line 87) so composeLabel can't reach the depth branch. This is *intentional* (the comment at line 84 explains it: don't claim credit for a lift the cap removed) but it does mean that an architect candidate who got the underlying lift from deep depth (Anil's AWS case) shows "capped from Good by architect scope" without telling Marcus that the Good itself was depth-amplified, not raw coverage. This is fine in this persona (12 ticks is solid raw coverage) but matters for a high-depth low-coverage architect (e.g. 6/26 + very-deep). **Severity: low, not a 7C bug, design-question for round-9.**

10. **[Validated, indirect] Solution Architect template's per-tech architect scope pre-application means Priya didn't have to touch the scope dropdown once.** roles.ts lines 106-113. This is the round-3 K2 fix paying compound interest in round-8: 7C only works because the scope is already set when she picks the template. If she'd been on Custom and added these techs manually, the scope dropdown would have been operator-implied and 7C would have produced 0 scope-caps. **Severity: not a finding per se but worth noting — 7C's surface depends on K2 being in place.**

---

## 5. Round-8 verdict

**At-risk.** 7C ships mostly clean — 5ξ is closed for the four-of-five tech cards that hit the lift-then-cap or natural-Green-then-cap path. The headline now correctly reads `0G / 4Y / 0R / Meth:7 / Scope-capped:4` and Marcus correctly identified "Staff Architect, scope-capped" at the minute-18 screen-share moment. That's the win we shipped 7C for and it works.

The at-risk callout is finding **#4**: Azure's plain-Yellow render at 38% coverage breaks the Staff-IC framing for any architect candidate whose checklist mode tech sits in the 25-40% coverage band. This is a structural gap in 7C's coverage, not a typo or a rendering bug — `applyScope` simply doesn't have a hook for "this candidate is on an architect-shape on a Yellow-base tech." The fix is small (either lower the 40% lift floor for architect-scope, or add an uncapped-architect-marker flag) but it should be on round-9's priority list. Until then, recruiter must verbally narrate "Azure is architect-scope, the Yellow is honest coverage, not a thin-Azure signal."

Finding #8 (three pastel cards) is cosmetic but real — first-glance confusability of Methodology / Off-catalog / Scope-capped at md+ widths needs a tone refresh. Finding #5/6/7 confirm the other round-7 ships landed. Finding #9 is a round-9 design question.

Net: the round-7 lens (Staff Architect renders correctly at headline) is **safe**. The lens *just below* the headline (every architect-scope tech reads as architect-scope, not just the lifted ones) is **at-risk** and is the single thing I'd ship in round-9 to fully close 5ξ.
