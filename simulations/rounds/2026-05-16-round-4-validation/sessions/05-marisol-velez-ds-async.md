# Session 05 — Marisol Velez (Senior, Data Scientist)

**Agent:** sim-05
**Date:** 2026-05-16
**Round:** 2026-05-16-round-4-validation
**Channel:** Async (CV-only)
**Role template picked:** Data Scientist

## 1. Persona inhabited

Marisol is the kind of DS hiring managers actually want: she owns the
experimentation platform at a US healthtech (Stripe-flavored stack —
Snowflake + dbt + Airflow), runs DiD on staggered feature rollouts when the
RCT can't run, holds a PhD in stats so she'll push back when product wants
to call a p=0.07 result "directional." Her CV reads tool-heavy on line 1
(Python / R / sklearn / statsmodels / PyMC / Stan / dbt / Snowflake /
Looker / Airflow) but the *project bullets* are where her seniority lives —
"reduced false-positive A/B reads 40% via Bayesian sequential testing,"
"published IV strategy for a non-randomized provider-adoption study." JD
wants a senior DS for Bayesian causal inference. Strong match on paper,
real match in practice.

## 2. Async "call" — recruiter reads CV + JD

> [Recruiter: opens TechVet, clicks **Async (CV-only)** channel pill]
> [Recruiter: sets seniority=Senior, years=7, path=Traditional, name=Marisol Velez]
> [Recruiter: pastes JD into Client mandate: "Senior DS, Bayesian causal inference, healthcare data"]
> [Recruiter: clicks Data Scientist template — preloads python, pandas, numpy, scikit-learn, sql, jupyter, databricks]
> [Recruiter: scans CV. Python — version not stated, picks depth=deep, leaves version blank]
> [Recruiter: pandas/numpy — leaves blank; both default-scope=author (Fix K), already capped]
> [Recruiter: sklearn — CV says "advanced sklearn pipelines"; types "1.5", depth=deep]
> [Recruiter: SQL checklist — CV implies window functions + CTEs + query plans (Snowflake work); ticks 6/12]
> [Recruiter: jupyter — leaves blank, untouched (will be `notDiscussed`)]
> [Recruiter: databricks — CV doesn't mention; clicks "Not in stack"]
> [Recruiter: searches "statsmodels" → 0 results → "+ Add 'statsmodels' as named-only" → clicks]
> [Recruiter: searches "PyMC" → 0 results → captures named-only]
> [Recruiter: searches "Stan" → 0 results → captures]
> [Recruiter: searches "Looker" → 0 results → captures]
> [Recruiter: searches "R" → matches too many things (react, rust, redis…) — recruiter gives up the no-results CTA path, captures "R (language)" named-only instead — needed two attempts]
> [Recruiter: methodology — "Bayesian causal inference" is the JD headline. Nowhere to put it. Drops it into the candidate-context free-text field as "DiD / IV / Bayesian A/B"]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Python | (blank) | deep | — | Yellow "version unknown" — Fix B kills depth-lift |
| pandas | (blank) | working | author (via default) | Yellow "version unknown — capped by author scope" |
| numpy | (blank) | working | author (via default) | Yellow |
| scikit-learn | 1.5 | deep | author (via default) | **Green "Excellent"** — author cap only blocks Yellow→Green lift, doesn't cap natural Green |
| SQL | 6/12 checklist | deep | — | Yellow (50% coverage; 66% green floor; depth-lift dropped by Fix A) |
| Jupyter | untouched | — | — | `notDiscussed` — excluded from buckets |
| Databricks | notUsed=true | — | — | Skipped → "Confirmed not in stack" section |

Plus 5 named-only chips: statsmodels, PyMC, Stan, Looker, R (language).

Summary header: "Channel: ASYNC (CV-ONLY)" chip (CSS uppercases it).
Candidate context: "Senior · 7 yr in industry · DiD / IV / Bayesian A/B".
Headline buckets: **1 Good · 4 Review / Probe · 0 Concern**.
Plus chip: "1 confirmed not in stack · 1 not on the CV / JD · 5 candidate mentioned, off-catalog".
"Not on the CV / JD (1)" section with body "absent from the CV and the JD. You never spoke to the candidate, so these are unverified gaps — confirm on the next step." Jupyter listed.

## 4. Accuracy judgement

- **Where it's right:** scikit-learn 1.5 + deep → Green is correct; the
  author cap fired but didn't cap a natural Green, which is the documented
  Fix K behavior. SQL Yellow at 6/12 is right — half coverage isn't strong
  enough to greenlight a senior DS who lives in Snowflake. notUsed on
  Databricks correctly removes a noise card. Jupyter as `notDiscussed`
  rather than Yellow is correct under Fix G.
- **Where it over-rates:** none, given the conservative version-blank
  approach. The Fix B suppression actually saves the tool here — if Python
  blank + deep had lifted to Green, a senior PhD stats DS would have read
  as "great Python developer" off zero version evidence.
- **Where it under-rates:** Python at Yellow is technically right but
  feels wrong for a 7yr PhD stats practitioner with deep-typed CV bullets.
  Same for pandas/numpy. The signal that's *missing* isn't the version
  number — it's the project-bullet evidence. Fix Q reframes the empty
  fields helpfully ("absent from the CV — confirm on the next step") but
  only for the `notDiscussed` set, not for `unknownVersion` Yellow. Those
  4 Yellows still read as "probe further" when the recruiter's actual
  signal is "she clearly knows this; I just can't type a version in the
  box."
- **Where it's silent on something a hiring manager would need to know:**
  **Bayesian causal inference is the JD's headline ask and the report
  literally cannot represent it.** It's not in the catalog (right call — it's
  a methodology, not a tool), Fix C's named-only captures the *names*
  (DiD/IV) if she types them but the chips render in the "no verdict,
  probe target" section. The CV gives strong evidence (published IV study,
  Bayesian sequential testing improved false-positive rate 40%) and TechVet
  has no surface to show it. **This is D4 still open**; Fix C does not
  close it.

## 5. Friction during the call (such as it is, async)

- **"R" search is broken for a single-letter language.** `t.id.includes(lower)`
  on `q="r"` returns react, rust, redis, ruby etc. — recruiter has to know
  to type something disambiguating before the no-results CTA appears. They
  typed "R (language)" eventually; a non-technical recruiter might just add
  it to a sticky note.
- **No surface for methodology.** The CV-bullet seniority signal is the
  whole reason to hire her. The recruiter's only outlet is the free-text
  Additional Context field; if they don't think to use it, it's lost.
- **`notUsed` ("Confirmed not in stack") doesn't make sense in async.**
  The Summary section's copy reads "The recruiter asked; the candidate
  confirmed they do not work with these." In async there was no
  conversation — the recruiter is *inferring* from a silent CV. Fix Q
  updated `notDiscussed` copy per channel but did **not** update the
  `notUsed` section copy. Channel-aware framing is half-applied.

## 6. Bugs / structural defects

1. **Channel chip casing inconsistent.** `channelLabel('async')` returns
   `"Async (CV-only)"`, but the chip wraps it in `uppercase tracking-wider`
   so it renders "CHANNEL: ASYNC (CV-ONLY)". Phone/video return lowercase
   `'phone'`/`'video'`, also uppercased by CSS. Cosmetic but the parens-
   inside-uppercase looks like a label bug. Fix: drop the `uppercase` class
   or have `channelLabel` return display-cased strings.
   Evidence: `src/screens/Summary.tsx:204`, `src/lib/channel.ts:58-60`.
   **Severity: Low.**

2. **`notUsed` ("Confirmed not in stack") section copy is phone-only.**
   Fix Q updated `notDiscussed` per channel but the `Confirmed not in stack`
   section at `Summary.tsx:366` still reads "The recruiter asked; the
   candidate confirmed they do not work with these." In async the recruiter
   never asked anyone — they inferred from CV silence. The framing
   misleads the hiring manager into thinking there was confirmation.
   Evidence: `src/screens/Summary.tsx:366-372`.
   **Severity: Medium.** (Fix Q is incomplete; same hand should apply.)

3. **Single-letter / short-token search returns too many false positives
   to ever surface the no-results CTA.** Searching "R" matches every tech
   ID with an `r` in it. There's no way to capture R-the-language without
   typing extra disambiguator characters. Same issue would hit Go, C
   (already in catalog), D, Q. Real-world recruiters typing fast will give
   up on the CTA path.
   Evidence: `src/components/TechSearch.tsx:22-33`. Fix: exact-match boost
   or prefix-priority ranking; or always show the named-only CTA below
   matches (not only on zero-match).
   **Severity: Medium.**

4. **Methodology has no surface (D4 still open).** Marisol's CV signal —
   IV / DiD / Bayesian sequential testing / propensity scoring — has
   nowhere to live. Fix C captures the *name* but the section title says
   "No verdict — these are probe targets" which loses the senior-IC
   differentiation. For a Bayesian-causal-inference role this is THE
   thing the hiring manager needs to see.
   Evidence: `src/screens/Summary.tsx:323-351`.
   **Severity: High (mission-critical for senior DS / SRE / SA / AppSec
   screens — confirmed by 4 prior rounds).**

## 6b. Speed-of-use rating

- **Entry time (estimate).** Async is the wrong channel to time per-tech
  entry — recruiter has minutes per CV, not seconds. But the *named-only*
  flow is what would have to survive on phone: type → wait for zero-match
  → click CTA = ~5 sec. That's phone-acceptable for one or two captures
  but Marisol triggered it 5 times in a row; a phone recruiter would have
  given up by #3.
- **Phone-shrink test.** Three concrete breaks: (a) "R" search will return
  red herrings and the recruiter won't recover in time; (b) capturing 5
  named-only ML libs back-to-back without losing track is a typing-while-
  listening hazard; (c) the `notUsed` "Confirmed not in stack" framing
  collapses on phone in the inverse direction — phone *does* have
  confirmation, so the framing is right for phone but wrong for async.
- **Friction that vanishes on phone.** None — async-channel friction
  surfaces issues phone hides (single-letter search, the methodology
  question), it doesn't add new ones.
- **Risk / safe rating.** Fix Q **At-risk** (Channel chip + `notDiscussed`
  copy ship correctly, `notUsed` section copy was missed). Fix C **At-risk**
  for catalog gaps (works for tools, mis-frames for methodology). Bigger
  picture: **At-risk** overall because the Bayesian-causal-inference JD
  is unrepresentable.

## 7. Catalog gaps

- **R (the language).** Real DS / stats stack item. Not in catalog *and*
  unfindable via search due to single-char ambiguity. Add it (high-signal,
  cheap).
- **statsmodels.** OLS / GLM / time-series in Python; complementary to
  sklearn for statistical inference (vs prediction). Catalog could add
  with sklearn-shape tiers.
- **PyMC + Stan.** Two leading Bayesian libraries. Add at least one
  (PyMC is more common in Python-first DS shops).
- **Looker (or LookML).** Major BI tool; if Tableau / Power BI are also
  out, add a BI category.
- **dbt** is in catalog (good) — surface this in the DS template too, not
  just the Data Engineer template; analytics-engineering overlap is high.

## 8. One-liner for cross-cut

> **Marisol — Data Scientist — Fix Q's channel chip + `notDiscussed` copy
> ship correctly but `notUsed` ("Confirmed not in stack") section copy was
> missed and reads as phone-confirmed in async; Fix C captures the named
> libraries but methodology (Bayesian causal inference — the JD headline)
> is still D4-open.**

## 9. Recommendation

Two-part. **(a) Close the Fix Q loop:** update the "Confirmed not in
stack" section copy (`Summary.tsx:366-372`) to be channel-aware via the
same `lib/channel.ts` helper pattern. Async copy should read "Absent from
the CV / JD — inferred not in stack" instead of "recruiter asked, candidate
confirmed." This is a one-hour fix and closes the loop on Fix Q's framing
consistency. **(b) Prioritize D4 (methodology section) as the next major
fix** — it's been named in 3+ rounds now (Mei round-1, Min round-3,
Marisol round-4). Senior DS / SRE / SA / AppSec all live or die by
methodology signal that TechVet currently has no way to render. A
per-role tag list (e.g. for DS: A/B testing, DiD, IV, RDD, propensity,
Bayesian, MCMC, RCT design) on the report header — even just as a chip
strip without a verdict — would change "looks like a fine Python user"
to "stats PhD running causal inference at scale."

## Disagreement with prior fixes

None. Fix Q is the right design — it correctly identifies that the *same
underlying empty-field data* needs three different framings. The
implementation just missed one of the three sections that needs the
channel-aware treatment (`notUsed` / Confirmed-not-in-stack). Fix C is
right for tools but isn't designed to carry methodology; that's D4's job,
not C's failing.
