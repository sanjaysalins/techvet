# Session 01 — Yasmin El-Sayed (Senior, Data Scientist)

**Agent:** sim-01 (cumulative validation, round 5)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-5-cumulative-validation
**Channel:** Async (CV-only)
**Role template picked:** Data Scientist

## 1. Persona inhabited

Yasmin is a PhD economist who fell into ML by way of treatment-effects work and now leads the credit-risk causal-inference squad at a UK fintech. Her code is mostly notebooks promoted into `dbt` + `airflow` jobs; her conference talks are about identification strategies, not framework wars. She reaches for `statsmodels` and `PyMC` more than `scikit-learn`, and the only time she touches `pytorch` is for a tabular-NN baseline she keeps losing to a hierarchical GLM. R is in the CV because the reg team still demands `mgcv` outputs.

## 2. Async session — abbreviated

There's no call to transcribe. The recruiter sets channel=Async, pastes the JD and the CV into the notes field, and walks the DS template card-by-card while reading.

> [Picks template: Data Scientist. Sets Channel=Async, Seniority=Senior, Years=8, Path=Traditional.]
> [Mandate field: "Sr DS with credit-risk causal inference; Bayesian; SQL+warehouse fluent."]
> CV says "Python (advanced, 8 yr)" → [version blank, depth=very-deep, lastUsed=current]
> CV says "pandas (daily)" → [version blank, depth=very-deep]
> CV says "scikit-learn (production scoring models)" → [version blank, depth=deep]
> CV says nothing about jupyter or databricks (preloaded by template) → leave untouched
> CV says "SQL (Snowflake)" → [SQL: tick window functions, CTEs, joins, group-by; depth=deep]
> [Searches "Snowflake" → adds it; checklist: ticks Streams/Tasks, Time Travel, Snowpark, RBAC, External Tables]
> [Searches "dbt" → adds; lastUsed=current]
> [Searches "Airflow" → adds; depth=working]
> [Searches "statsmodels" → "+ Add 'statsmodels' as named-only"]
> [Searches "PyMC" → +named-only; "Stan" → +named-only; "R" → typing 'R' triggers Bug-3 fix; "+ Add 'R' as named-only"]
> [Methodology chips: clicks A/B testing, Causal inference, Bayesian inference, Experimental design, MCMC. Free-text: "DiD", "IV", "RDD", "Sensitivity analysis", "Hierarchical models"]
> [Confirms not-in-stack: Databricks (uses Snowflake), Jupyter (uses VS Code/Hex)]
> [Summary]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | (unknown) | very-deep | — | Yellow "Review / Probe" — Fix B suppresses depth-lift on unknown-version (no enterprise note) |
| pandas | (unknown) | very-deep | author (default) | Yellow — no version, author cap, no lift |
| scikit-learn | (unknown) | deep | author (default) | Yellow — same |
| NumPy | (untouched by recruiter) | — | — | excluded — `notDiscussed` |
| SQL | 4/12 checklist | deep | — | Yellow "Review / Probe — 4/12" (33% = Yellow band) |
| Jupyter | (notUsed) | — | — | skipped (confirmed not in stack) |
| Databricks | (notUsed) | — | — | skipped |
| Snowflake | ~5/12 checklist | (unset) | — | Green/Yellow on coverage % (5/12 = 42% → Yellow) |
| dbt | (unknown) | (unset) | — | Yellow |
| Airflow | (unknown) | working | — | Yellow |
| statsmodels / PyMC / Stan / R | — | — | — | named-only chips |

Summary headline: ~0 Green / ~6 Yellow / 0 Red, 2 confirmed not in stack, 1 not-on-CV-JD (NumPy), 4 named-only. Channel chip: "Async (CV-only)". Methodology section: 10 entries.

## 4. Accuracy judgement

- **Where it's right:** The named-only chip-row catches the entire load-bearing half of Yasmin's stack (`statsmodels`, `PyMC`, `Stan`, `R`) instead of silently dropping it — pre-Fix-C this CV would have been unscoreable. The methodology section (10 entries spanning chips + free-text) is the first thing the hiring manager will read and is exactly the senior signal Mei's quote anticipated.
- **Where it over-rates:** Nothing flagrant — async + unknown-version + Fix-B-no-lift keeps everything honest at Yellow. SQL at 4/12 reads as "probe further" which is fair given the CV is silent on advanced features.
- **Where it under-rates:** **Severely.** A PhD economist with 8 years of `pandas` and `scikit-learn` reads as "all Yellow" on the report because the CV doesn't carry library versions and Fix B (correctly) refuses to lift unknown-version. The hiring manager scanning the headline stats sees `0 Green / 6 Yellow / 0 Red` and has no way to tell this is a strong senior DS rather than a mid-level dabbler. The methodology section *is* the senior signal — but it's display-only and doesn't move the bucket counts. **The "0 Green" headline directly contradicts the methodology section's 10 entries.** This is a real cumulative-shape regression: Fix B + async + display-only D4 = a senior whose report headlines as evidence-light.
- **Where it's silent on something a hiring manager would need to know:** Whether her named-only `statsmodels`/`PyMC`/`Stan` work is the actual production stack or hobby — Bug-4 enrichment lets the recruiter set depth=deep but the CV doesn't tell her *that* either. The Bug-4 editor sits half-empty by default and the hiring manager has no way to know which of the 4 chips matter most.

## 5. Friction during the (async) session

- **NumPy template-preload pollution.** NumPy is preloaded but Yasmin doesn't mention it on her CV (it's transitively there via pandas). The recruiter has to either tick it implicitly, mark "not in stack" (wrong — she does use it), or leave it untouched and let the Fix-Q "Not on the CV / JD" section catch it. Picking the right one without speaking to her is awkward.
- **Methodology chip vs free-text collision.** Yasmin's headline strength is **causal inference: DiD / IV / RDD**. The DS template chip is `Causal inference (DiD / IV / RDD / propensity)` — one chip swallows four distinct techniques. The recruiter adds the chip, then *also* free-texts "DiD" and "IV" because the CV calls them out individually. Result: redundant entries (chip says DiD/IV/RDD in parentheses; free-text adds the same names again). Dedup by id won't catch this because the slugs differ (`causal-inference` vs `free:did`).
- **No path to capture methodology *depth*.** Yasmin's `Bayesian inference` chip is identical in render to a junior who name-dropped Bayes once. Methodology chips have no analogue of the Bug-4 depth-enrichment pattern.

## 6. Bugs / structural defects

1. **Headline stats contradict methodology section for senior async DS.** `0 Green / 6 Yellow` reads as a weak candidate; the 10-entry methodology section reads as a strong senior. Same report, opposite story. Evidence: `Summary.tsx:227-246` (headline buckets don't count methodology) vs `Summary.tsx:321-352` (display-only). **Severity: High.** This is the Mei-quote problem returning by another route — D4 shipped the section but didn't unblock the bucket counts.

2. **D4 chip + free-text duplication.** The `causal-inference` chip already contains "DiD / IV / RDD" in the label; recruiters reading a CV that names them will free-text them anyway. Two slugs, no collision detection, two emerald chips on the report saying overlapping things. Evidence: `Assessment.tsx:397-404`, `roles.ts:151`. **Severity: Medium.**

3. **NumPy template-preload is wrong for the causal-inference DS sub-shape.** DS template assumes scikit-learn-style modelling; an econometrics-leaning DS uses pandas + statsmodels/PyMC, often skipping explicit NumPy. NumPy ends up in the "Not on the CV / JD" section every async session for this archetype. Evidence: `roles.ts:145`. **Severity: Low.**

4. **Bug-4 enrichment editor sits empty for async.** The recruiter has no candidate to ask "how deep on PyMC?", so the depth dropdown stays unset on every named-only entry. The report renders 4 emptyish editors with name + blank dropdown + placeholder lastUsed. Useful for phone; **clutter for async.** Evidence: `Summary.tsx:671-716`. **Severity: Medium.**

5. **Snowflake/dbt/Airflow not preloaded in DS template.** Three of Yasmin's load-bearing tools require manual search-and-add even though they're catalog. Friction is small on async (you have time) but every DS will need them. Evidence: `roles.ts:142-157`. **Severity: Low.**

## 6b. Speed-of-use rating

- **Entry time (estimate).** Async, so the budget question is "did the recruiter open and close one tab per CV section". For chip-clicking methodology: ~2 sec each. For search-and-add of off-template techs (Snowflake/dbt/Airflow): ~10 sec each. For named-only capture via no-results CTA: ~5 sec each. Whole CV: ~6-8 minutes — comfortable for async.
- **Phone-shrink test.** On phone this session would **fail outright.** The methodology section (10 chips + free-text) would take ~90 sec to populate while the candidate keeps talking. The named-only capture for 4 libraries (statsmodels/PyMC/Stan/R) needs 4 separate searches. The Bug-4 enrichment editor on Summary is a post-call pattern but requires opening Summary mid-call, which there's no time for. The methodology free-text input is keyboard-blocking. **A phone recruiter would skip methodology entirely**, which is exactly the senior-signal-loss D4 was supposed to fix.
- **Friction that vanishes on phone.** Reading the chip labels carefully ("Causal inference (DiD / IV / RDD / propensity)" is 7 words; recruiter on phone scans for 1). Free-texting "Hierarchical models". Selecting "not in stack" deliberately for Databricks instead of letting it sit in the not-discussed bucket.
- **Risk / safe rating.** **Safe for async, at-risk for phone-shrink.** D4 + named-only + Bug-4 are async-shaped fixes; the phone-channel cousin still needs work.

## 7. Catalog gaps

- **statsmodels** — load-bearing for causal-inference DS, complement to scikit-learn. Should be first-class AI/ML.
- **PyMC** — Bayesian probabilistic programming, ships in production at multiple fintechs. First-class AI/ML.
- **Stan / CmdStanPy** — gold-standard MCMC; named in every senior DS CV in this archetype.
- **R / tidyverse** — regulated industries still demand R outputs. Right now "R" is a single-letter search dead-end fixed only by Bug 3 round-4; full first-class would let scoring distinguish base-R from tidyverse.
- **Polars** — increasingly named alongside pandas; not in catalog.
- **MLflow** — already on the round-2 carryover list (Fix I).

## 8. One-liner for cross-cut

> **Yasmin — Data Scientist (async) — senior causal-inference DS reads as `0 Green / 6 Yellow` because async + Fix-B-no-lift-on-unknown-version refuses to credit unversioned daily-driver libs; D4 methodology section carries the senior signal but doesn't move the headline counts, so the report contradicts itself.**

## 9. Recommendation

Promote the methodology section into a fourth headline stat: a `Methodology + practices (N)` card alongside Green/Yellow/Red so a senior whose buckets are all evidence-light (async, unknown versions) doesn't read as evidence-light at the headline. Cheap (15 lines of JSX in `Summary.tsx:227-246`); doesn't require touching scoring. Optional companion: a per-template "expected methodology floor" so the hiring manager sees `10 of 6 suggested + 4 free-text` instead of a bare count — that's the senior-DS signal in a single chip.

## Disagreement with prior fixes

Fix B (suppress depth-lift on unknown-version) is correct in isolation but compositionally punishes async. On a phone screen, unknown-version + very-deep means "I forgot the number"; on async it means "the CV didn't list one" — which is *not* a depth claim either way, so the no-lift is right. The bug is that the report has no way to surface "the recruiter inferred depth from the CV's prose" as a separate signal from "the candidate hesitated when asked the version." Both collapse to the same Yellow. Not a Fix-B regression per se; an absent-axis problem D4 was supposed to start closing.
