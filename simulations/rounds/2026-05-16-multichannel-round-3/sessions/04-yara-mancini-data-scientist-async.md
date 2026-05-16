# Session 04 — Yara Mancini (Senior Data Scientist, 6 yr)

**Agent:** sim-04 (async)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Async (CV + JD only, recruiter never speaks to candidate)
**Role template picked:** Data Scientist

## 1. Persona inhabited

Yara is a credit-risk DS at a UK fintech. PhD in econometrics (LSE, 2019). Three years at the fintech: she owns the **causal-inference + Bayesian experimentation platform**, leads a team of four, and her work feeds the credit-decisioning policy team. Her code lives in dbt + Snowflake (feature pipelines), Airflow (refresh DAGs) and a Python monorepo with PyMC + statsmodels. **She does not deploy real-time inference services** — when policy needs to ship a model, she writes the spec and an MLE on the platform team productionises it. Her PyMC work is library-grade; her R is mostly historic (some Stan calls from her PhD that she still reaches for when MCMC convergence is squirrelly). The JD she's being screened against is a "Senior DS, experimentation platform" role at a US neobank; it asks for "causal inference, Bayesian methods, SQL fluency, dbt + warehouse, plus ability to mentor".

## 2. Async logging trace — abbreviated

The recruiter has the CV + JD on screen, opens TechVet on a second monitor, picks Data Scientist template (loads python, pandas, numpy, scikit-learn, sql, jupyter, databricks).

> [Recruiter scans CV. Notes: Python, R, scikit-learn, statsmodels, PyMC, pandas, numpy, dbt, Snowflake, Airflow, Looker. Methodology line: DiD/IV/RDD/propensity/Bayesian A/B/MCMC.]
> [Adds Python — types `3.11` (CV silent; recruiter guesses current LTS), depth `working` — they don't know what to put. Leaves scope blank.]
> [Adds pandas — types `2.2` (CV silent on version, recruiter guesses currentish). Leaves depth unknown — feels speculative on async.]
> [Adds numpy — types `2.0`. Same shrug.]
> [Adds scikit-learn — types `1.5`. Same. Catalog defaultScope=author kicks in silently — recruiter doesn't see this in async; they're not on TechCard.]
> [Adds SQL — checklist appears. Recruiter has no signal beyond "CV says SQL". **Doesn't tick anything.** → renders Yellow "Not yet assessed — 0/12".]
> [Adds Snowflake — same problem, checklist. Doesn't tick anything → Yellow "Not yet assessed — 0/12".]
> [Adds dbt — types `1.7` (guessing). Adds Airflow — types `2.7` (guessing).]
> [Searches "statsmodels" — **no results.** Searches "PyMC" — **no results.** Searches "R" — gets only React, Redis, Rust, Rails. **No R-the-language.** Searches "Stan" — no results. Searches "Looker" — no results. Searches "DiD", "RDD", "Bayesian", "MCMC" — all no results.]
> [Recruiter shrugs, hits Summary. Methodology line on the CV is captured nowhere.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | 3.11 | working | — | Excellent (Green) |
| pandas | 2.2 | unknown | — (defaultScope=author silent) | Excellent (Green) |
| numpy | 2.0 | unknown | — (defaultScope=author) | Excellent (Green) |
| scikit-learn | 1.5 | unknown | — (defaultScope=author) | Excellent (Green) |
| SQL | 0/12 untouched | — | — | Yellow "Not yet assessed" → **notDiscussed=true → excluded from buckets** |
| Snowflake | 0/12 untouched | — | — | Yellow "Not yet assessed" → **notDiscussed=true → excluded from buckets** |
| dbt | 1.7 | unknown | — | Good (Green) |
| Airflow | 2.7 | unknown | — | (depends on tier — likely Green) |
| jupyter (template-preloaded, untouched) | empty | — | — | notDiscussed → excluded |
| databricks (template-preloaded, untouched) | empty | — | — | notDiscussed → excluded |

Summary headline: **5–6 Greens** in Strengths, **2 Not-discussed** chips (SQL + Snowflake), zero Probe Further, zero Concerns. Radar with maybe 3 axes lit (AI/ML, Data, Language — though Language has zero scored techs because SQL was the only one and it got filtered out by Fix G). PDF goes to the hiring manager: a clean rubber-stamp.

## 4. Accuracy judgement

- **Where it's right:** dbt + Airflow Greens are fair — those are versioned tools she uses daily and the recruiter's guesses are inside the right tier band.
- **Where it over-rates:** Three Greens (pandas, numpy, scikit-learn) come from the recruiter typing the **current version into a CV that didn't quote one**. On async this is structural: there is *no signal* about her library version, and the tool produces three Excellents anyway. The `defaultScope: author` from Fix K does fire silently, but for a real DS, author IS the right scope, so it doesn't change the verdict — it just decorates it.
- **Where it under-rates:** SQL + Snowflake both fall into "Not discussed" because the recruiter has no per-service evidence from a CV. **A senior DS who ships dbt models on Snowflake is presumably fluent in window functions, CTEs, and query plans** — but in async mode, Fix G's notDiscussed correctly says "we didn't ask". The hiring manager loses the most load-bearing skill on the JD.
- **Where it's silent on something a hiring manager would need to know:** **All of it.** The CV's methodology line — DiD, IV, RDD, propensity scoring, Bayesian A/B testing, MCMC — is **the entire reason a senior DS gets hired at this level**, and the tool has nowhere to put it. Plus statsmodels, PyMC, R, Looker are CV-named techs that don't exist in the catalog. The PDF that lands on the hiring manager's desk says "5 Greens, looks good"; it does not say "I had no way to score her actual specialism". The HM will read it as "this candidate's profile is shallow on causal inference" when in fact the *tool* is shallow on capturing it.

## 5. Friction during the screen

(No live call, but friction equivalents on the recruiter's CV-reading flow.)
- **5 catalog dead-ends in a row** (statsmodels, PyMC, R, Stan, Looker, DiD/RDD/MCMC). Async means no recruiter panic, but it means **5 lines of the CV produce no log entry**. The PDF silently omits them.
- **Version inference burden.** CV is silent on every library version. Recruiter has to either (a) leave version blank → Yellow "Review / Probe" with a wishy-washy note, or (b) guess at current → false Green. The tool offers no third path ("CV-named, version not specified") that scores honestly.
- **SQL + Snowflake checklists are useless in async.** No live candidate to walk through 12 services. Recruiter is forced into the untouched=Yellow=notDiscussed bucket. Right behavior, but it means the CV's most important warehouse skill is invisible on the report.
- **Methodology line on CV is unreadable by the tool.** Recruiter has nowhere to type "DiD, IV, RDD, Bayesian A/B".

## 6. Bugs / structural defects

1. **Catalog has no statsmodels, no PyMC, no Stan, no R, no Looker.** Mei (round 1) hit this for a different DS. Yara's CV names 5 techs; 5 are absent. Statsmodels and PyMC are the canonical Python causal/Bayesian libraries — for a DS catalog this is closer to "no React in a frontend catalog" than to a niche gap. R is a *language*, not a frontend framework, and not having it means the catalog can't represent any DS with a stats-academic background. **Severity: High** (structural — DS persona unrepresentable).

2. **Version inference has no honest third state for async.** When a CV names a tech without a version, the recruiter must guess (false Green) or leave empty (Yellow with `notDiscussed=false` because they typed the tech). Fix G handles untouched template cards but not "added-by-recruiter, version-unknown-by-design". Evidence: `src/lib/scoring.ts:144` only flags notDiscussed when `!item.version && !item.unknownVersion && !item.notUsed`, but on async the recruiter is supposed to add the tech — which makes the card touched. **Severity: High** (silently inflates Green count on every CV-only screen).

3. **D4 (methodology) still entirely open.** Yara's CV line "DiD, IV, RDD, propensity scoring, Bayesian A/B, MCMC" is the *primary* hiring signal at senior DS. Round 1 flagged this; nothing has shipped. Evidence: no `methodology` field in `src/types.ts`; no field on `AssessmentItem` for capturing free-text skills. The PDF goes out missing the entire methodological signal. **Severity: Critical for DS, but cross-role.**

4. **`defaultScope: author` is silent on async.** Fix K wires it through scoring but the recruiter logging from a CV never sees the dropdown — the verdict flips behind the scenes. For a DS where author IS right, this is fine; but it means the tool gives a *correct* answer with no explanation a reviewer can audit. The Summary scope chip would help if the recruiter looks at it, but on async there's no prompt to. **Severity: Low** (latent UX, becomes a problem the moment author isn't the right default).

5. **No "CV-only assessment" mode / context flag on the report.** The hiring manager reading the PDF cannot tell whether the recruiter spoke to the candidate (and probed each tech) or read a CV (and inferred). Same Green badge means very different things. Cross-references Fix M (candidate-context block, not shipped). **Severity: Medium** (report misleads the downstream reader).

## 6b. Speed-of-use rating (REQUIRED — phone-shrink test)

- **Entry time (estimate, async).** Per tech: 3-5 sec for searched-and-found techs (search → click → type version → leave depth blank); failed searches cost ~8-10 sec each (multiple alias attempts). Yara's 11-tech CV took ~90 sec for the 6 techs that exist + ~50 sec wasted on the 5 that don't. **Total: ~2.5 min.** Fine in async.
- **Phone-shrink test: would this workflow survive a 7-minute phone screen?** **No.** Three failure modes:
  1. **The 5 catalog dead-ends become live-call dead-ends** — recruiter typing "statsmodels", "PyMC", "R", "Looker" while the candidate is talking is the exact "visible failure spiral" the Tomi-AppSec session is testing. On phone, dead searches don't just waste time, they break recruiter focus. Recruiter falls behind. Candidate keeps talking about Bayesian inference; recruiter stops capturing.
  2. **SQL + Snowflake checklists are 12 + 12 services each.** Reading them aloud on phone is impossible in 5-10 min. Yara would name 3-4 services, recruiter would tick those, get to 4/12 (Yellow Probe / 33%) — **lower verdict than the async 0/12 that filters out via notDiscussed.** Counterintuitively, talking to her *lowers* her score because partial coverage from a real conversation reads as worse than untouched.
  3. **Methodology line on CV is the entire signal**. On phone this is the question Yara would answer in 90 seconds with concrete evidence ("here's a DiD spec I shipped last quarter"). Tool has nowhere to log it. Recruiter would have to free-text it into Notes, and Notes don't render on the radar or buckets.
- **Friction that vanishes on phone.** On async, the recruiter has time to debate "should I guess scikit-learn 1.5?" — on phone they'd have to ask the candidate, who'd say "I don't track library versions", → unknownVersion=true → Yellow "Review / Probe" (Fix B-protected, no false lift). Async mode actively *removes* a check that the live channel provides.
- **Risk / safe rating.** **Unworkable on phone for this candidate shape.** The DS template + checklist-heavy data layer + uncatalogued methodology means a phone version of this screen produces a less-accurate report than the async one, and the async one already misrepresents her. Two of the three biggest hiring signals (methodology, warehouse depth) are uncapturable in either channel.

## 7. Catalog gaps

- **statsmodels** (Python) — canonical Python stats library, every causal-inference DS uses it. Currently unsearchable.
- **PyMC** — Python Bayesian library. Mei (round 1) flagged. Still missing.
- **Stan** (or rstan / cmdstanpy) — Bayesian gold standard, rstan especially common in academic-trained DS.
- **R** — entire *language*, missing from Language category. Affects DS, biostats, academic-transfer roles.
- **Looker** (and LookML, Tableau, Mode, Hex) — BI / metrics layer. Senior DS roles routinely list one.
- **MLflow / Weights & Biases / Comet** — experiment tracking. RESUME Fix I lists MLflow as pending.
- **Polars** — pandas successor; growing fast in DS.
- **dbt's Snowflake adapter / Snowpark** are inside Snowflake's checklist (good), but a candidate naming "dbt + Snowflake" doesn't get credit for the integration.
- **Methodology vocabulary** is not a catalog gap — it's a *category* gap. DiD / IV / RDD / propensity / Bayesian A/B / MCMC are not technologies; they need their own axis (D4).

## 8. One-liner for cross-cut

> **Yara — Data Scientist — async screen produces 5 Greens from recruiter version-guesses on a CV that doesn't quote versions; 5 of 11 CV-named techs (statsmodels, PyMC, R, Stan, Looker) are uncatalogued; the entire methodology stack (DiD/IV/RDD/Bayesian/MCMC) — the actual senior signal — has nowhere to live, so the PDF reads as a clean rubber-stamp the hiring manager cannot audit.**

## 9. Recommendation

**Highest leverage: ship Fix #6 (methodology section) and pair it with an async-mode "version unknown by design" third state.** D4 has been open since round 1 and Yara is the third senior persona to hit it; methodology is the differentiator at this seniority. Concretely: a free-text + tag-list field on each role template (DS template ships with DiD/IV/RDD/propensity/Bayesian A/B/MCMC/causal/experimentation as suggested tags), rendered as its own h2 on the Summary above the radar. Pair it with a "CV-named, version unspecified" toggle on TechCard that scores as Yellow with `cvInferred: true` — separating the recruiter's inference from a probed answer. Together these two changes turn this rubber-stamp PDF into something a hiring manager can act on.

## Optional — Disagreement with prior fixes

**Fix G's notDiscussed semantics misfire in async.** In phone/video, "untouched" correctly means "didn't get to it". In async, the recruiter is *expected* to add CV-named techs without complete probing — that's the channel. The current rule (untouched = excluded from buckets) means the more honest the recruiter is in async (leaving versions blank rather than guessing), the more techs disappear from the report. Suggest: a `channel: 'phone' | 'video' | 'async'` flag on the assessment, and have async treat empty version + tech-was-added as `cvInferred=Yellow Review` rather than `notDiscussed=excluded`.

## Optional — Edge case for cross-cut

What's the right verdict for a CV that names "scikit-learn" with no version? Three plausible policies: (a) Yellow "version unspecified" — current behaviour but only if recruiter doesn't type a version; (b) infer current, score Green — recruiter's likely action today, **structurally over-rates**; (c) score against the catalog's `currentVersion` field as a default with a "(catalog-default version)" annotation. (c) seems best for async but needs a design pass.
