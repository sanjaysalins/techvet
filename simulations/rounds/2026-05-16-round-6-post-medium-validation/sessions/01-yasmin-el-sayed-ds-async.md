# Session 01 — Yasmin El-Sayed (Senior, Data Scientist) — REDUX

**Agent:** sim-01 (post-medium validation, round 6)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-6-post-medium-validation
**Channel:** Async (CV-only)
**Role template picked:** Data Scientist
**Baseline:** `2026-05-16-round-5-cumulative-validation/sessions/01-yasmin-el-sayed-ds-async.md`
**Fixes under test:** 5η (causal-inference chip split), 5θ (NamedOnlyEditor compact in async), 5ι (methodology as 4th headline card)

## 1. Persona inhabited

Same persona as round 5. PhD economist, 8 yr senior DS at a UK fintech, leads the credit-risk causal-inference squad. Codes mostly in notebooks promoted into `dbt` + `airflow` jobs. Reaches for `statsmodels` + `PyMC` more than `scikit-learn`; only uses `pytorch` for a tabular-NN baseline that keeps losing to a hierarchical GLM. R appears on the CV because the regulatory team still wants `mgcv` outputs.

CV explicit names: Python (8 yr), pandas (daily), scikit-learn (production scoring), statsmodels, PyMC, Stan, R, dbt, Snowflake, Airflow. Methodology stated: DiD, IV, RDD, Bayesian hierarchical models, MCMC, sensitivity analysis.

## 2. Async session — abbreviated

No call. Recruiter pastes CV + JD into notes, walks DS template card-by-card, captures off-template names via search no-results CTA.

> [Picks template: Data Scientist. Channel=Async, Seniority=Senior, Years=8, Path=Traditional.]
> [Mandate: "Sr DS — credit-risk causal inference; Bayesian; SQL+warehouse fluent."]
> CV "Python (advanced, 8 yr)" → [version blank, depth=very-deep, lastUsed=current]
> CV "pandas (daily)" → [version blank, depth=very-deep]
> CV "scikit-learn (production scoring models)" → [version blank, depth=deep]
> CV silent on NumPy / Jupyter / Databricks (preloaded by template) → leaves untouched
> CV "SQL (Snowflake)" → [SQL checklist: ticks window functions, CTEs, joins, group-by; depth=deep] → 4/12
> [Searches Snowflake → adds; ticks Streams/Tasks, Time Travel, Snowpark, RBAC, External Tables → 5/12]
> [Searches dbt → adds; lastUsed=current; depth=working]
> [Searches Airflow → adds; depth=working]
> [Searches statsmodels → +named-only; "PyMC" → +named-only; "Stan" → +named-only; "R" → +named-only via Bug-3 CTA]
> **NEW (5η):** [Methodology chips: clicks **A/B testing, Difference-in-Differences (DiD), Instrumental Variables (IV), Regression Discontinuity (RDD), Bayesian inference, MCMC, Experimental design, Feature engineering**. Free-text adds: "Sensitivity analysis", "Hierarchical models" (Propensity scoring is on the catalog chip but Yasmin's CV doesn't name it — skipped).]
> [Confirms not-in-stack: Databricks (uses Snowflake), Jupyter (uses VS Code/Hex)]
> [Summary]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | (unknown) | very-deep | — | Yellow "Review / Probe" — Fix B suppresses depth-lift on unknown-version |
| pandas | (unknown) | very-deep | author (default) | Yellow — no version, author cap, no lift |
| scikit-learn | (unknown) | deep | author (default) | Yellow — same |
| NumPy | (untouched) | — | author (default) | excluded — `notDiscussed` |
| SQL | 4/12 checklist | deep | — | Yellow "Review / Probe — 4/12 services" (33% Yellow band) |
| Jupyter | (notUsed) | — | author (default) | skipped — confirmed not in stack |
| Databricks | (notUsed) | — | — | skipped |
| Snowflake | 5/12 checklist | (unset) | — | Yellow "Review / Probe — 5/12 services" (42% Yellow band) |
| dbt | (unknown) | working | — | Yellow |
| Airflow | (unknown) | working | — | Yellow |
| statsmodels / PyMC / Stan / R | — | — | — | named-only chips (compact, per 5θ) |

**Summary headline (round 6):** **`0 Good / 7 Yellow / 0 Concern / 10 Methodology`** — grid flips from 3-col to 2x2-on-mobile / 4-col-on-md with the new emerald Methodology card. Chip row: `2 confirmed not in stack` (Jupyter, Databricks) + `1 not on the CV / JD` (NumPy) + `4 candidate mentioned, off-catalog`. Channel chip: "Async (CV-only)". Methodology section: 8 chip-clicked + 2 free-text = 10 entries.

## 4. Accuracy judgement

- **Where it's right:** The named-only chip-row captures the load-bearing half of Yasmin's stack (`statsmodels`, `PyMC`, `Stan`, `R`) as compact chips — no longer presenting four half-empty depth/lastUsed editors a recruiter can't fill from a CV. The methodology section now genuinely earns its 10-entry count from canonical CV signals (DiD/IV/RDD all distinct chips that ticked cleanly), and the **4th headline stat card finally shows the senior-DS evidence at headline glance** — the round-5 "0 Green / 6 Yellow" framing is replaced by "0 Good / 7 Yellow / **10 Methodology**" which reads honestly evidence-rich.
- **Where it over-rates:** Nothing flagrant. Snowflake at 5/12 is technically Yellow band; that's defensible given the CV is silent on the advanced services. Methodology card doesn't include a tier color so it can't over-claim — it's just a count.
- **Where it under-rates:** Reduced from round 5 but not eliminated. The 7 Yellow bucket still reads as "evidence-light tools" even though the candidate is daily-driving them. A hiring manager who reads only the colored cards may still infer mediocrity until their eye hits the emerald 10-Methodology card. **The 4th card is a counter-weight, not a re-classification** — it doesn't credit `pandas (very-deep, 8 yr)` with Green; it just adds a parallel signal. For Yasmin specifically this is the right call (no version evidence, can't claim Green honestly), but for an HM skimming the report at speed the visual hierarchy still favors the bucket counts (left three cards are the familiar G/Y/R traffic-light pattern).
- **Where it's silent on something a hiring manager would need to know:** The compact-async NamedOnlyEditor (5θ) hides the depth-enrichment affordance behind italic text. A recruiter who *did* read enough of the CV to infer "PyMC is her daily driver" can still expand the editor by typing in lastUsed — but the affordance is invisible until they click. **Net win** for the typical async case (no candidate to ask, fields stay empty), **possible loss** for the carefully-prepped recruiter who'd otherwise type "production scoring 2018–present" into Stan's lastUsed field. The italic hint "no enrichment (async; verify on next step)" is the right framing — it tells the next interviewer where to probe rather than pretending the recruiter knows.

## 5. Friction during the (async) session

- **5η pays off immediately.** Round 5 had the recruiter clicking one chip ("Causal inference (DiD / IV / RDD / propensity)") AND free-texting "DiD", "IV", "RDD" separately because the CV named them individually — three slugs for one concept. Round 6: recruiter clicks 4 distinct chips, one per CV mention. **No free-text overlap.** Net click delta: previously 1 chip-click + 3 free-text-type-and-enter (~25 sec); now 4 chip-clicks (~8 sec). **~17 sec saved + cleaner data.**
- **5θ pays off immediately.** Round 5 had four named-only entries (statsmodels/PyMC/Stan/R) each rendering as a full editor with depth dropdown + lastUsed input — visual noise on an async report where neither field can be populated. Round 6: four compact chip + remove + italic hint. **PDF gets visibly cleaner.** Approximate vertical pixel saving: ~280 px (4 editors × ~70 px each).
- **5ι pays off but introduces a layout shift.** The headline grid jumps from `grid-cols-3` to `grid-cols-2 md:grid-cols-4` the moment any methodology entry is added. On the live Assessment screen this is fine (Summary isn't visible), but a recruiter who opens Summary mid-add and then goes back to add one more methodology chip will see the headline reflow when they return. Cosmetic; doesn't affect data.
- **Slight new friction — chip count.** The DS template now shows **9 methodology chips** (up from 7 in round 5: A/B + the 4 causal split + Bayesian + experimental + MCMC + feature-eng). A recruiter scanning the chip row has more to read. Still well under the threshold where the row would wrap onto a 3rd line at desktop width, but the row IS now taller than the SA/DevOps templates' 6-chip rows. Minor and arguably correct (DS gets more methodology surface because that IS the senior signal).
- **Carryover from round 5: NumPy template-preload pollution.** Still there — NumPy untouched by recruiter (Yasmin doesn't name it on the CV) still surfaces in "Not on the CV / JD". Not addressed by 5η/5θ/5ι. Low severity.
- **Carryover from round 5: methodology depth invisible.** A junior who name-dropped "Bayesian" and a senior who built three production hierarchical models look identical on the methodology chip row. The new 4th card promotes the *count* to headline visibility but doesn't differentiate quality. Same as round 5; this fix didn't target it.

## 6. Bugs / structural defects

1. **Methodology 4th card has no tier color.** Emerald-100 + Lightbulb is visually distinct from G/Y/R, but a hiring manager doing a 5-second skim may parse it as "Good adjacent" (emerald) rather than "neutral signal count". Round 5's recommendation said "fourth headline card" — landed. Whether the HM correctly interprets emerald-as-neutral-not-positive depends on their familiarity. Evidence: `Summary.tsx:259` uses `bg-emerald-100` (Good is `bg-emerald-50`). Distinguishable on close inspection; possibly conflated at glance. **Severity: Low-Medium.** Consider neutral palette (slate / sky) if the HM-readback test shows confusion.

2. **5θ compact-async hides the enrichment escape hatch.** Once compact, the only way to access the depth dropdown is to type something into the (now hidden) lastUsed input — but the input itself isn't rendered in compact mode. **The async recruiter who wants to enrich has no path back without removing-and-re-adding the named-only entry.** Evidence: `Summary.tsx:705-725` — `compactAsync` branch returns early with no expand-toggle. A small "expand" caret would close this. **Severity: Medium.** Mitigated by the fact that 95% of async recruiters won't want to enrich (the whole rationale for 5θ).

3. **Methodology card count can mislead in the opposite direction.** A recruiter who reads a sloppy CV and aggressively chip-clicks every plausible match inflates the count without earning it (8 chips × 2 sec = 16 sec of clicking). The card says "Methodology: 10" identically whether the candidate brought up 10 things or the recruiter projected 10 things. Pre-5ι the section existed but was buried — now it's headline. **Inflation risk increases with prominence.** Evidence: `Summary.tsx:258-270`. **Severity: Low for Yasmin's case** (her CV genuinely names 6+ of these), **Medium across the population**. Consider a "source: chip" vs "source: free-text" mini-breakdown to keep the recruiter honest.

4. **5η catalog chip count crowds the DS template.** 9 chips on one row is at the practical limit for readable horizontal scan on a 13" laptop. Add 1 more (e.g. Yasmin's recommended "Hierarchical models" if promoted from free-text) and it wraps. The split was the right call, but the budget for further additions is now tight. Evidence: `roles.ts:166-176`. **Severity: Low.** Worth a design pass before adding more.

5. **Carryover: Snowflake/dbt/Airflow not preloaded in DS template.** Still requires manual search-and-add. Not in scope for 5η/θ/ι. **Severity: Low** (async has time).

## 6b. Speed-of-use rating

- **Entry time (estimate).** Async, walking ~10 tech cards + 4 named-only + 8 methodology chips + 2 free-text. Round-5 estimate: 6-8 min. Round-6 estimate with 5η savings: **~5.5-7 min**. About 1 min saved primarily on methodology-without-collision. Comfortable for async.
- **Phone-shrink test.** Improved. The methodology section is still the heaviest section on phone, but 5η means clicking "DiD" + "IV" + "RDD" as 3 quick chips (~6 sec) is faster than free-texting them (~20 sec). Phone-shrink budget for DS methodology dropped from ~90 sec (round 5) to **~50 sec**. Still tight on a 2-min call but closer to viable. 5θ irrelevant on phone (channel=phone keeps full editor). 5ι improves the post-call hand-off to the HM but doesn't help during the call itself.
- **Friction that vanishes on phone.** Reading 9-chip methodology row carefully (recruiter on phone scans for 1, not 9). Compact-async editors don't apply (phone keeps full editor). Methodology 4th card lands after the call.
- **Risk / safe rating.** **Safe for async** (was "Safe for async, at-risk for phone-shrink" in round 5; the async half is now better than that). **Still At-risk for phone-shrink** of the same persona — the methodology load is genuinely demanding and 5η only chips off a portion.

## 7. Round-6 fix verdict (5η / 5θ / 5ι)

**5η — Causal-inference chip split (4 chips replacing 1).** **Landed clean.** Yasmin's CV names DiD, IV, RDD individually; round 5 forced the recruiter to free-text each one alongside the aggregated parent chip, producing duplicate emerald entries. Round 6: 4 distinct chip-clicks, no free-text overlap, ~17 sec saved per session of this shape. Side cost is a chip row that's now 9 wide on the DS template — at the edge of comfortable scan but defensible. No regression. **Verdict: solves the round-5 issue.**

**5θ — NamedOnlyEditor compact in async.** **Landed but slightly overshoots.** The ~280 px vertical decluttering is real and the italic "no enrichment (async; verify on next step)" hint is exactly the right framing for the next-interviewer hand-off. Concern: once compact, the recruiter has no in-UI path to expand the editor back to full mode if they later decide to enrich (they'd have to remove-and-re-add the entry). Most async recruiters won't want to enrich, so this is mostly fine — but a 4 px expand caret would close the regression risk cheaply. **Verdict: solves the round-5 clutter issue; introduces a small new affordance gap.**

**5ι — Methodology promoted to 4th headline card.** **Landed and is the highest-leverage of the three.** The round-5 critique — "`0 Green / 6 Yellow` reads weak-senior; the 10-entry methodology section reads strong-senior; the report contradicts itself" — is directly addressed. The 4-card row now reads `0 Good / 7 Yellow / 0 Concern / 10 Methodology` and the senior-DS signal is present at headline glance. Two cautions: (1) emerald-100 background may be parsed as "Good adjacent" by HMs unfamiliar with the convention; (2) the prominence increases the inflation risk if a recruiter loosely chip-clicks (a "Methodology" count doesn't earn the same caution as a verdict). Neither blocks the fix. **Verdict: solves the round-5 headline-contradiction; minor follow-ups worth tracking.**

## 8. One-liner for cross-cut

> **Yasmin redux — Data Scientist (async) — round-6 fixes 5η/θ/ι all land cleanly for this persona: causal split saves ~17 sec + removes duplicate-chip noise; compact async editor declutters the PDF; methodology 4th headline card directly closes the "report contradicts itself" finding. Speed-of-use moves to Safe for async (was Safe-for-async / at-risk-for-phone-shrink). Two minor follow-ups: 5θ has no expand-back-to-full affordance; 5ι emerald palette may read as "Good adjacent" at HM glance.**

## 9. Recommendations / fixes

- **R1 (5θ follow-up):** Add a small expand caret on the compact NamedOnlyEditor so an async recruiter who later wants to enrich a named-only entry can do so without remove-and-re-add. ~5 lines of JSX.
- **R2 (5ι follow-up):** A/B the methodology card palette — emerald-100 vs slate-100 vs sky-100 — with a 3-recruiter HM-readback test to confirm "neutral count" is what they read, not "good adjacent". If conflated, switch to slate/sky.
- **R3 (5ι anti-inflation):** Split the methodology card count into "chip-sourced (N) + free-text (M)" so the recruiter sees the breakdown and is anchored to mark the genuine ones. Cheap (1 derived value in `Summary.tsx`).
- **R4 (carry-forward from round 5, still open):** Methodology depth — junior-name-drop vs senior-built-three-systems looks identical. Per-entry "anchor" (URL / talk / paper / project name) free-text field would let the recruiter capture the load-bearing evidence. Larger design pass; out of scope for this round.
- **R5 (carry-forward):** Promote `statsmodels` / `PyMC` / `Stan` / `R` to first-class AI/ML catalog entries. With 4 of the 6 round-5 named-only entries surviving into round 6, the catalog gap is the next bottleneck.
- **R6 (chip-row budget):** Before adding any 10th DS methodology chip, design-pass the row layout (2-row grid, search-within-chips, or collapse-by-default).

## Disagreement with prior fixes

5η / 5θ / 5ι are all correct in direction. The disagreement I'd raise is **with the framing of 5ι in the RESUME notes ("methodology promoted to 4th headline card") as if it closes the senior-signal problem.** It promotes *visibility* of methodology, which is necessary but not sufficient. The deeper problem from round 5 was that **the bucket-color scoring system has no way to credit senior signal that lives outside version-mode evidence** — a senior who can't quote a pandas version because they've used it for 8 years still reads as "Yellow probe" no matter how many methodology chips fire. 5ι is the right *interim* fix and was the cheapest available; the structural fix is the long-promised "Senior tier above Green" plus methodology-as-scoring-axis (still on the backlog as priorities #6/#7). Tracking expectations: don't let 5ι's success disguise that the underlying axis problem hasn't been addressed.
