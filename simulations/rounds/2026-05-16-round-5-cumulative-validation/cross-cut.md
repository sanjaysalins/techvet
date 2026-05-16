# Cross-cut — 2026-05-16 round 5 cumulative validation

**6 sessions, ~14k words.** 4 phone / 1 video / 1 async. Cast spanned
DS / SA / SRE / Security / GenAI / Senior-returner. **Cumulative-shape
validation:** does today's stack of 17 fixes compose cleanly, not just
work individually.

**Headline result: the integrated shape mostly holds.** Single-fix
tests + round-4 individual-validation kept the fixes correct in
isolation. Round-5 surfaces three classes of issue the prior rounds
couldn't:

1. **Composition gaps at the edges** — K2 + AWS filter compose
   beautifully on preloaded happy paths but break when (a) a tag is
   needed in a non-matching template, (b) recruiter manually adds a
   tech post-template-pick, (c) D4 chip overlaps with a checklist
   service.
2. **Coverage-as-single-axis** — Brigit (OSS-only obs) and Tanvir
   (deep-narrow Pinecone) both hit "narrow-and-deep doesn't survive
   a 66% Green floor." Round-1 Robin → round-3 Cara → round-5 Brigit
   + Tanvir is **three rounds of the same finding**.
3. **Yellow as catch-all** — async unknown-version + checklist-below-
   floor + scope-cap-from-Green all dump into Yellow. Headline stats
   `0G/6Y/0R` for a senior PhD reads as "weak" at the bucket level
   even when the methodology + scope-cap notes tell the right story.

The single Safe rating (Idris/Security) is the **happy path**: every
fix targeting Security ran end-to-end with no friction. That's a
proof-of-concept for what good post-fix shape looks like; the other 5
sessions show where the integrated whole still has gaps.

## Validation matrix per shipped fix

| Fix | Held? | Notes |
|-----|-------|-------|
| **K** (AI/ML defaultScope) | ✅ | No negative findings; quietly correct |
| **K2** (template techScopes) | ⚠️ | Composition gap: Anil's SA on Azure (manually added) gets `Scope: operator via default` from catalog defaultScope — wrong for architect candidate |
| **Q** (channel + per-channel copy) | ✅ | Async copy + chip render correct; video-channel chip-casing has Bug-2-shape parity issue ("Channel: video" lowercase) |
| **C** (named-not-in-catalog) | ✅ | Held; Bug-4 enrichment editor sits empty on async (Yasmin) — async has no candidate to ask depth |
| **M** (candidate context) | ✅✅ | Renders cleanly across all 4 personas where it fired. Returner shape (Margarethe) + Senior + Staff+ + Mid all formatted right |
| **O** (LangChain checklist) | ✅✅ | **Strongest validation.** Tanvir's 10/10 in-prod tick → natural Green; Bashir's 3/10 tutorial → Yellow. PDFs sharply distinguish prod-shipper from tutorial-grader. Fix O does what it was named for. |
| **E** (asymmetric lastUsed) | ⚠️ | **Narrower than advertised:** Margarethe's PG 13 + Java 11 Yellow-tier stale gets NO softener (guard at `scoring.ts:134` is `=== 'red'`). Brigit's stale-AWS-evaluation gets NO softener (Fix E doesn't apply to checklist-mode at all). Half-fix for Sarah-shape returners with mixed Red+Yellow legacy stack. |
| **U** (Security catalog) | ✅✅ | **Idris's happy path:** all 7 security tools first-class, cleanest AppSec PDF ever. Wendy's round-4 pain mode fully closed. |
| **Bug 4** (named-only depth) | ⚠️ | Useful on phone; friction on async (empty editors) — needs channel-aware hide-when-empty rule |
| **Cloud defaultScope** | ⚠️ | Backfires on SA: Azure manually added to SA template gets "Scope: operator via default" — opposite of intent for SA |
| **AWS role-aware** | ⚠️ | SA filter `[general, architect]` hides KMS that fin-services SA architect (Anil) named unprompted; Backend template has NO filter so Margarethe's AWS hits 3/26 = 11% Red |
| **D4** (methodology) | ⚠️ | Sections render correctly; gaps: (a) hidden below bucket stats (Yasmin); (b) free-text-vs-chip dedup gap (Yasmin); (c) SLO double-count (in SRE obs checklist + as SRE methodology chip — Brigit) |
| Hot patches 1/2/3/5 | ✅ | No negative findings |

## The 6 sessions at a glance

| # | Persona | Channel | 6b rating | Headline cumulative finding |
|---|---------|---------|-----------|------------------------------|
| 01 | Yasmin — Senior DS, causal+Bayesian | Async | At-risk on phone | 0G/6Y/0R bucket headline contradicts 10-deep methodology section; report says "weak" + "senior" simultaneously |
| 02 | Anil — Staff SA, fin-services | Video (HM watching) | At-risk on phone | K2+AWS-filter compose at happy-path edges break: KMS hidden under SA filter + Azure-scope-leak |
| 03 | Brigit — Senior SRE, on-prem | Phone | At-risk | Obs checklist STILL vendor-mixed (round 1+3+5); D4 SLO chip overlaps obs checklist `slos` service → double-count; Fix E doesn't reach checklist-mode |
| 04 | Idris — Mid AppSec, healthtech | Phone | **Safe** | Happy path holds — first Safe rating across 5 rounds. Fix U + K2 + AWS filter + D4 compose cleanly |
| 05 | Tanvir — GenAI in prod, 12mo | Phone | At-risk (54 checklist items) | **Fix O confirmed end-to-end** — Tanvir 10/10 Green vs Bashir 3/10 Yellow. Plus: 66% Green floor is sharp single-tick boundary; deep-narrow specialists under-rate |
| 06 | Margarethe — Senior returner, 4yr break | Phone | At-risk | Fix E softener gap: Yellow-tier stale (PG 13 + Java 11) silently gets no softener; Backend AWS missing template filter |

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- **Round 5: 1 Safe / 5 At-risk / 0 Unworkable**

First Safe rating in 21 sessions across 3 rounds. Cumulative trend
is positive — Unworkables dropped to zero, and Idris's happy-path
Safe is the proof-of-concept that the post-fix shape *can* work
under the speed-of-use constraint when every fix lines up for that
persona. The 5 At-risks are no longer "tool fundamentally broken on
phone" — they're "specific composition gaps at template edges."

## Code bugs surfaced (numbered, file:line-anchored)

### Bug 1 — Fix E softener doesn't reach Yellow-tier stale (Margarethe — High)
**What.** `applyRecency` at `src/lib/scoring.ts:134`:
```ts
if (current.color === 'red' && tech.enterpriseStillUsed) {
```
Margarethe's Postgres 13 + lastUsed=2022 lands Yellow (tier match), so the softener guard skips it. Reads as "currently on PG 13" instead of "was on PG 13 in 2022." Same shape for Java 11 + 2022.

**Fix.** Broaden to `current.color !== 'green'`:
```ts
if (current.color !== 'green' && tech.enterpriseStillUsed) {
```
Softens Yellow + Red both. For Yellow→softened-Yellow, the note text becomes the differentiator (label says "softened from Review/Probe" rather than the verdict change being the signal). **Severity: High** (Sarah-shape returner is the canonical test case).

### Bug 2 — Fix E doesn't apply to checklist mode (Brigit — Medium)
**What.** Brigit's "evaluated AWS in 2022, never shipped" should soften. AWS is checklist-mode; `applyRecency` is called only from the version-mode tier-match path (`scoring.ts:206`). No softener fires; AWS card silently lands in notDiscussed. Cumulative gap: returner-shape candidates with cloud-stale claims have no way to express it.

**Fix.** Extend Fix E to the checklist-mode path. Trickier than the version-mode tier-match because checklist coverage IS the signal (Fix A). Options: (a) for stale + enterpriseStillUsed + checklist-mode, tag the entry with a "stale-but-contemporary" note that doesn't change the bucket but renders on the report; (b) apply the softener only when coverage is Red (≤25%) — symmetric with version-mode. Probably (a) is the right answer for v1. **Severity: Medium.**

### Bug 3 — SA template AWS filter hides KMS the SA actually uses (Anil — High)
**What.** SA filter at `roles.ts:78` is `['general', 'architect']`. KMS at `technologies.json:1951` is tagged only `['security']`. Anil named KMS unprompted in the first 30 seconds — recruiter scanned 17 visible services, KMS hidden, typed it into Notes (invisible on Summary tile head). Same for Macie / GuardDuty / Security Hub / Inspector — all of which a regulated-FS architect designs.

**Fix.** Add `'security'` to SA AWS filter:
```ts
serviceTagFilters: { aws: ['general', 'architect', 'security'] },
```
**Severity: High** for regulated-industry SA candidates.

### Bug 4 — Backend template missing AWS filter (Margarethe — Medium)
**What.** Backend template at `roles.ts:24-35` has no `serviceTagFilters`. Margarethe (Senior backend returner) adds AWS manually → unfiltered 26-service checklist → 3/26 = 11% Red. Round-4 Owen rationale was "aws not in techIds, no per-template hook" — but the filter applies to manually-added techs too (verified round-4). Senior backend candidates routinely have ~5 AWS services and need the filter shape.

**Fix.** Add `serviceTagFilters: { aws: ['general'] }` to Backend (one line). **Severity: Medium.**

### Bug 5 — D4 free-text vs chip slug collision (Yasmin — Medium)
**What.** `causal-inference` chip label is "Causal inference (DiD / IV / RDD / propensity)". Recruiter reading a CV that names "DiD" and "IV" separately free-texts them → slugs `free:did` and `free:iv` differ from `causal-inference` → 3 chips for the same thing.

**Fix.** Two options: (a) split the `causal-inference` chip into separate `did` / `iv` / `rdd` / `propensity` chips (more granular catalog); (b) add fuzzy-match deduplication on free-text add — if the typed string is a substring of an existing chip label, surface a "did you mean: X?" prompt. (a) is simpler and matches how Yasmin's CV would be read; recommend (a). **Severity: Medium.**

### Bug 6 — D4 SLO chip + obs checklist `slos` service double-counts (Brigit — Medium)
**What.** SLO appears in two places: SRE D4 methodology chip `slos-slis` (`roles.ts:119`) AND observability checklist service `slos` (`technologies.json:2882`). Recruiter under phone pressure ticks both. Report double-counts the same signal.

**Fix.** Remove `slos` from obs checklist — it's a methodology, not a product (you don't "run SLOs as a tool"). Closes the duplicate. **Severity: Medium.**

### Bug 7 — Video channel chip case ("Channel: video") (Anil — Low)
**What.** `channelLabel()` at `src/lib/channel.ts:58-60` only special-cases async ("Async (CV-only)"). Phone/video render lowercase — "Channel: video" reads unfinished. Same shape as round-4 Bug 2 (which was fixed for async only).

**Fix.** Capitalize phone + video in `channelLabel`. **Severity: Low** (cosmetic). 5-min fix.

### Bug 8 — Cloud defaultScope:"operator" backfires on architect candidates (Anil — Medium)
**What.** SA template's `techScopes` only applies to preloaded `techIds`. Azure isn't preloaded in SA template → recruiter adds Azure manually mid-call → catalog `defaultScope: "operator"` engages → scope chip reads "Scope: operator — default: operator" for an architect candidate who doesn't operate Azure.

**Fix.** Two ways: (a) extend `defaultScope` resolution to consider the template (look up template's `techScopes[techId]` first; fall back to catalog default) — invasive but cleanest; (b) add `azure` to SA template's `techIds` with `architect` techScope (data-only, one-line). Recommend (b) for v1 — generalizes to "every template's expected stack should be preloaded." **Severity: Medium.**

## Structural patterns (cross-cutting)

### S1 — Yellow bucket is overloaded
Yasmin: 0G/6Y/0R for a senior PhD because async unknown-version drops everything to Yellow. Idris: Yellow conflates "deep operator below 66%" with "untouched card." Same Yellow pile contains:
- Unknown-version + meaningful depth (no softener)
- Checklist coverage 25-65% (legitimate "review further")
- Scope-cap from Green (architect/reviewer)
- Recency-softened Red

**Convergent fix:** sub-grouping in the headline OR additional headline stats. Yasmin's specific recommendation: promote methodology to a 4th stat card.

### S2 — Coverage-as-single-axis under-rates depth-over-breadth
Round 1 Robin (SRE obs); round 3 Cara (SRE obs); round 5 Brigit (SRE obs) + Tanvir (vector-db). **Three rounds same finding.** A deep-narrow specialist (one OSS stack end-to-end, one vector DB used in prod) caps below the 66% Green floor because the denominator includes vendor alternatives they deliberately don't use.

**Convergent fix:** weighted services OR vendor-grouped denominators OR per-stack-of-record coverage. Probably 2-3d with design.

### S3 — Composition gaps at template-edges
K2 + AWS filter compose beautifully on the preloaded happy path (Idris). But the cumulative gaps cluster at the edges:
- KMS hidden when SA filter doesn't include security
- Azure not in SA template → catalog defaultScope wins → wrong scope chip
- Backend template missing AWS filter
- AI/ML template no Helm/K8s scope hint

**Convergent fix:** per-template audit of "which techs are likely to be manually added mid-call?" + extend `techScopes` and `serviceTagFilters` to cover them. Pattern: K2 was templates-as-data; now also extend to anticipating recruiter-add patterns. Probably an audit + ~10 small data edits.

### S4 — D4 needs catalog hygiene
Yasmin's chip+free-text collision (causal-inference vs did/iv/rdd). Brigit's SLO double-count between methodology chip and obs checklist. D4 chip catalog needs an audit for:
- Chips that aggregate multiple distinct methodologies (split into separate chips)
- Chips that overlap with existing checklist services (remove from checklist OR remove from D4 OR formalize the overlap)

### S5 — Async channel needs hide-on-empty for Bug-4 enrichment
Bug 4's NamedOnlyEditor renders depth dropdown + lastUsed text field per entry. In async, both stay empty (no candidate to ask). Renders as cluttered empty editors. Channel-aware fix: hide the editor in async mode, show only the chip + remove button.

## Priority-ordered fix list (round 5 additions)

| # | Fix | Effort | Why |
|---|-----|--------|-----|
| 5α | Broaden Fix E to Yellow-tier stale (`!== 'green'`) | 1h | Margarethe — High; Sarah-shape returners with mixed Red+Yellow legacy |
| 5β | Add SA AWS filter `security` tag | 5 min | Anil — High; regulated-FS SA candidates |
| 5γ | Add Backend AWS filter `['general']` | 5 min | Margarethe — Medium |
| 5δ | Add Azure to SA template + techScope architect | 5 min | Anil — Medium; closes the cloud-defaultScope-backfire |
| 5ε | Remove `slos` from obs checklist | 5 min | Brigit — Medium; closes the D4-overlap double-count |
| 5ζ | Capitalize phone/video in channelLabel | 5 min | Anil — Low cosmetic |
| 5η | Split D4 `causal-inference` chip into did/iv/rdd/propensity | 15 min | Yasmin — Medium |
| 5θ | Channel-aware hide-on-empty for NamedOnlyEditor | 30 min | Yasmin — Medium |
| 5ι | Methodology as 4th headline stat card | 1h | Yasmin — Medium; closes the bucket-contradiction |
| 5κ | Fix E extends to checklist-mode (Brigit) | 0.5d | Returner + cloud-stale shape |
| 5λ | Coverage-as-single-axis redesign (Robin/Cara/Brigit/Tanvir) | 2-3d | Three rounds of evidence; needs design pass |
| 5μ | Yellow sub-grouping in headline (Idris/Yasmin) | 0.5d | Cleanest single UI fix for the Yellow-pile problem |

**Total hot-patch effort for items α-θ:** ~1.5 hours.
**With methodology stat card + Fix E checklist extension:** ~3 hours.
**Full list incl. coverage redesign:** ~3-4 days.

## What's holding up

| Category | Status |
|----------|--------|
| Round-3 priorities (A-P + Bug 4) | ✅ All shipped |
| Round-4 priorities + hot patches | ✅ All shipped |
| Round-5 hot patches (α-ε, ζ) | ⏳ ≤30 min total |
| Round-5 medium (η-κ) | ⏳ ~2h total |
| Coverage redesign + Yellow sub-grouping | ⏳ 3-4d, design pass first |

## Notes for round 6

Skip round 6 unless something material ships. Round-5 hot patches are
deterministic (data-only edits). The coverage redesign needs design,
not validation. The next round worth running would be after the
**coverage-as-single-axis redesign** (Robin/Cara/Brigit/Tanvir = four
rounds; the test would be "does the redesign close the deep-narrow
specialist failure mode without creating new gaming surface?").

## Snapshot

- Sessions: 6
- Total words: 14,360 (~27% smaller than round 3; targeted framing did its job)
- 8 numbered bugs surfaced, 5 structural patterns named
- Speed-of-use: 1 Safe (first ever), 5 At-risk, 0 Unworkable
- Validation: 5/13 fixes pass cleanly, 7/13 hold-with-caveats, 1 has a sharper-than-named gap (Fix E)
- Round-5 hot-patch total: ~1.5 hours of data edits closes 6 specific findings
