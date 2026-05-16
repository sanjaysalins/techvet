# Cross-cut — 2026-05-16 round 4 validation

**6 sessions, ~12k words. Targeted validation of K / K2 / Q / C / M
shipped earlier today.** 3 phone / 1 video / 2 async. Bashir was the
explicit Vikram-redux to confirm whether Fix O is still the urgent
next thing (spoiler: yes, and verified at the source level).

**Headline result: 3 of 5 fixes pass cleanly; 2 are half-shipped and
need follow-up before round 5.** New finding count is smaller than
round 3 (as expected for a targeted round), but the findings are
sharper — agents traced source paths to back up claims, and one agent
self-corrected mid-session after misreading the severity comparison.

## Validation matrix

| Fix | Validation | Notes |
|-----|------------|-------|
| **K** (catalog `defaultScope` AI/ML) | ⚠️ **HALF-FAILED** | Decorative for natural-Green AI/ML libs. Bashir source-traced `scoring.ts:75` — author cap requires `adjusted.adjusted && baseColor === 'yellow' && adjusted.color === 'green'`. Natural-Green tier match satisfies none of those. **Fix O is urgent** and specific (see below). |
| **K2** (template `techScopes`) | ✅ **PASS** | Helena (SA architect) + Wendy (Security reviewer) both validated. Cap fires automatically at template-pick time; ~8s/tech entry time confirmed (under phone budget). |
| **Q** (channel flag + per-channel copy) | ⚠️ **HALF-SHIPPED** | "Not on the CV / JD" section correct in async; channel chip renders. **But Marisol caught:** `Summary.tsx:366-372` "Confirmed not in stack" copy still phone-only ("the recruiter asked; the candidate confirmed"). 1-hour fix to push through `notDiscussedCopy`-style helper. Cosmetic: channel chip uppercase-tracking-wider renders "ASYNC (CV-ONLY)" awkwardly. |
| **C** (named-not-in-catalog capture) | ✅ **PASS with caveats** | Lou-style specialists + Wendy's 6 security tools captured cleanly at ~5s/tech. **But:** Wendy's "Burp daily, deep" flattens to bare "Burp" (depth signal lost). Marisol exposed **single-letter search bug** — "R" matches every tech containing `r` so the no-results CTA never fires. |
| **M** (candidate-context block) | ✅ **PASS with caveats** | Eli + Owen both validate rendering. Sarah-shape, Eli-shape (junior career-switcher), Owen-shape (internal transfer) all distinguishable from bare-tenure reads. **But:** Eli flagged "0.3 yr in industry" suffix is awkward (placeholder "8 or 10+" doesn't steer toward sub-1-yr); 4-control row at-risk on phone — recommend mirroring Fix K's ScopeChip pattern to move `Additional context` to Summary post-call enrichment. |

## Speed-of-use rating distribution

Round 3 baseline: 0 Safe / 7 At-risk / 3 Unworkable.

Round 4: **0 Safe / 5 At-risk / 1 not-stated.** Not a regression — same
candidate shapes still find friction in the unshipped fixes (E/O/U/etc).
The pattern remains: today's fixes mostly close the *named* failures
they were designed for, but the underlying speed-of-use constraint
isn't fully met until the catalog-side gaps (Fix O, Fix U, Fix I)
land.

## The 6 sessions at a glance

| # | Persona | Channel | Verdict on the fix | Headline new finding |
|---|---------|---------|---------------------|----------------------|
| 01 | Helena Sørensen — Senior SA, multi-cloud | Phone | K2 SA: PASS | AWS checklist has zero architect-shaped services; Azure missing from SA template |
| 02 | Bashir Mahmoud — GenAI 8mo pivot | Phone | K: HALF-FAILED | LangChain `min:"1.0"` natural Green slips past `author` cap unchanged — Fix O urgent, source-verified |
| 03 | Eli Ortiz — Junior frontend 4mo | Phone | M: PASS w/ caveat | Jest 29 + shallow + junior → Excellent (depth asymmetry — lifts but never depresses Green) |
| 04 | Wendy Akpata — Lead AppSec, banking | Video (HM watching) | K2 Security: PASS; C: mechanical PASS | Fix U (security catalog overhaul) is the unclosed gap K2+C can't substitute for; named-only captures lose depth signal |
| 05 | Marisol Velez — Senior DS, causal+Bayesian | Async | Q: HALF-SHIPPED; C: PASS for tools, not methodology | D4 methodology still completely open (round 1+3+4 now); confirmed-not-in-stack section still uses phone copy; single-letter search broken |
| 06 | Owen Kelleher — DevRel→backend internal transfer | Async | M: PASS; Q: PASS | Backend template needs `techScopes` too — Eitan-shape repeats without K2 extension |

## New bugs (numbered, file:line-anchored)

### Bug 1 — Fix Q is half-shipped: `Confirmed not in stack` section uses phone-only copy (Marisol)
**What.** `Summary.tsx:366-372` reads *"The recruiter asked; the candidate confirmed they do not work with these..."* — wrong framing for async (recruiter never spoke to the candidate). The `notDiscussedCopy` helper pattern from `lib/channel.ts` should apply here too. **Severity: Medium.** **Effort: ~1 hour.** Add a `confirmedNotInStackCopy(channel)` to `lib/channel.ts` and use it for the section title + body.

### Bug 2 — Channel chip rendered uppercase-tracking-wider (Marisol)
**What.** `Summary.tsx:204` wraps `channelLabel(meta.channel)` in `uppercase tracking-wider`, so "Async (CV-only)" renders as "ASYNC (CV-ONLY)". The label was designed mixed-case to disambiguate the parens. **Severity: Low (cosmetic).** Drop the uppercase class on the channel chip OR change the label to all-caps-safe form.

### Bug 3 — Single-letter search matches by substring (Marisol)
**What.** `TechSearch.tsx:22-33` filters by `name/category/id` substring. Recruiter typing "R" (for the R language) gets back every tech with `r` in its id — react, rust, redis, ruby, terraform, etc. — so the no-results CTA never fires and Fix C's capture path is unreachable for any single-letter tech. Same hits Go, Q, D. **Severity: Medium** for catalog-extreme languages. **Fix:** require minimum query length ≥ 2 OR rank exact `name`/`id` matches above substring hits and surface the named-only CTA when no exact match exists.

### Bug 4 — Named-only entries lose depth + recency signal (Wendy)
**What.** `namedNotInCatalog: string[]` captures bare strings. Wendy said "Burp daily, deep" — the report shows bare "Burp" with no verdict, no depth, no recency. The recruiter heard a rich signal; the report shows a flat one. **Severity: Medium.** **Fix:** extend the data shape to `Array<{ name: string; depth?: Depth; lastUsed?: string }>`. Bigger UI change but unlocks the signal. Keeps backward compat if old entries decode as `{ name }` only.

### Bug 5 — `yearsInIndustry` placeholder doesn't steer toward sub-1-yr (Eli)
**What.** `Assessment.tsx` placeholder reads "e.g. 8 or 10+" but Eli (4 months) types "0.3" → renders as "0.3 yr in industry" which reads awkwardly. **Severity: Low.** **Fix:** change placeholder to "e.g. 8, 0.3, 10+" or add explicit "months" support in the formatter (`formatCandidateContext` could detect a fractional bare-number and render "X months" instead of "X yr").

## Confirmed-urgent (not new — round-3 priorities re-confirmed)

### Fix O — fast-moving AI/ML libs max at Yellow without checklist services
**Bashir's exact recommendation (source-verified):** demote `langchain` `min: "1.0"` Green → Yellow. Gate any Green behind checklist services. Same shape for `vector-db` and `llm-api-sdk` coverage thresholds. **Bonus integrity test proposed:** "no AI/ML version-mode tech may have a Green tier without `releasedYear` within ~18 months" — catches future fast-mover ladders that go stale.

This was already #1 on the round-3 "still open" list. Round 4 validates it via the canonical case and gives a concrete catalog edit.

### Fix U — Security template overhaul (catalog refresh, security slice)
Wendy: K2 Security caps work + C captures names, but the report still tells the HM "weak AWS coverage + 6 probe targets" for the team's AppSec lead. **Fix C is recovery; Fix U is the structural answer** — actually populate the catalog with Vault/Burp/Semgrep/Trivy/Snyk/Falco as first-class entries (with depth-mode + checklist services for the checklist-shaped ones), and either swap or augment the Security template's preload.

### AWS checklist is role-blind (Helena + Wendy + Owen — 3 of 6 sessions)
- **Architect-shaped services missing** (Helena): Landing Zone, Control Tower, Organizations/SCPs, IAM Identity Center
- **Security-shaped services missing** (Wendy): KMS, Macie, GuardDuty, SecurityHub, Inspector
- **CI/CD services missing** (Owen): CodeBuild, CodePipeline

Round-2 priority #8 (role-aware AWS checklists) is now confirmed urgent across three different role-types. Either split into category-tagged services or build separate AWS-Architect / AWS-Security / AWS-Operator checklists.

### Backend template needs `techScopes` (Owen)
K2 populated SA / SRE / Security. Backend was left alone because round-3 evidence pointed elsewhere; Owen's session shows the Eitan failure mode reproduces unchanged for SE→backend transferers. **Quick fix:** add `aws: 'operator'` to Backend template `techScopes` (explicit operator on the canonical scope-blind tech) + the broader `defaultScope: "operator"` on AWS/Azure/GCP catalog entries (Eitan's original recommendation from round 3).

### D4 — Methodology has nowhere to live (Marisol; round 1+3+4 carryover)
Marisol confirms: DiD / IV / RDD / Bayesian causal inference is the JD's headline ask for senior DS, and the tool has no field for it. Named-only chips capture *statsmodels* and *PyMC*, but not *"causal inference"* itself. Methodology section (per-role tag list + radar axis) is the structural fix; this is the largest single open item.

## Standing problems (re-flagged but not new)

### Depth asymmetry (Eli)
Depth can lift severity by one step (Yellow→Green, Red→Yellow) but never depress a Green. Jest 29 + shallow + junior → Excellent. Means *shallow + Green tier = Excellent* with no resistance. Worth carving out as Fix W: "shallow depth caps tier at Yellow" — counters the bare-version-claim over-rate that Janelle/Eli both surface.

### Scope dropdown unreachable on phone (still)
Across all 3 phone sessions in this round, recruiters didn't open the scope dropdown. K2's template defaults carry the cases that have a defined template hint; everything else stays implicit. This is the *expected* behavior post-K/K2 — UI didn't need redesigning, defaults did. But it's worth noting that the dropdown itself is essentially dormant on phone.

## Re-prioritized fix list (validation-informed)

**Hot patches (today/tomorrow, ≤1 day total):**
- Bug 1 — channel-aware copy for `Confirmed not in stack` section (1h)
- Bug 2 — channel chip casing (10min)
- Bug 3 — minimum query length OR no-results CTA on no-exact-match (1h)
- Bug 5 — fractional-year placeholder + "X months" formatter branch (30min)

**Next priority (was already next, now confirmed urgent):**
- Fix O — LangChain / vector-db / llm-api-sdk tier ceilings (1d). Catalog work + integrity test for `releasedYear` freshness.

**After O — choose two:**
- Fix E — asymmetric `lastUsed` (1.5d). Sarah/Dmitri canonical cases unchanged.
- Fix U — Security catalog overhaul (1d). Wendy validates urgency.
- Bug 4 — extend `namedNotInCatalog` to `{name, depth?, lastUsed?}` (1d). Wendy proposes.

**Cluster-wide (multi-day):**
- D4 — methodology section (3-5d). Most-named open structural defect (rounds 1, 3, 4).
- Role-aware AWS checklists (2d). Helena+Wendy+Owen — 3 sessions in one round.
- Backend template `techScopes` (0.5d) + cloud-provider `defaultScope` (0.5d). Cheap.

## What worked in this round

- **Targeted validation framing** produced cleaner pass/fail signal than round 3's open exploration. 6 sessions in ~4 minutes of cross-cut reading time vs. round 3's 10 sessions × 1.9k words.
- **Source-level claims** with file:line (Bashir's `scoring.ts:75` trace, Marisol's `Summary.tsx:366-372`) were directly actionable. Agents reading code to back up findings is a clear maturity step.
- **One agent self-corrected mid-session** (Helena's Sim 01 initially flagged an `applyScope` bug, re-traced, removed it). That's the kind of independence-but-rigor we want.

## What to do differently in round 5

- Skip a full round 5 unless something material ships. Round 4's hot patches (Bugs 1-3, 5) + Fix O are deterministic; they don't need agent validation, they need unit tests. Save a round for after Fix E (asymmetric `lastUsed`) since that has design tradeoffs Sarah's session couldn't have predicted.
- If running another round soon: target Fix O (does the Yellow ceiling + checklist services actually catch the GenAI-hype self-overclaim?) with 3-4 sessions tightly scoped to ML/GenAI personas. Faster, cheaper, and tests the *redesign* not the *rename*.

## Snapshot

- Sessions: 6 (all completed, all schema-conformant including 6b)
- Total words: 11,881 (~38% smaller than round 3's 19k; targeted framing did its job)
- New bugs: 5 (4 hot patches + 1 medium signal-loss issue)
- Validation results: K half-failed (Fix O), K2 pass, Q half-shipped (1h fix), C pass with caveats, M pass with caveats
- Re-confirmed urgent: Fix O (sharpest validation), Fix U, AWS role-aware checklists, Fix E, D4 methodology
- Hot-patch effort to fully close today's fixes: ~2.5 hours of code + Fix O (~1d) = round 4's full deliverable is ~1.5 days of follow-up work
