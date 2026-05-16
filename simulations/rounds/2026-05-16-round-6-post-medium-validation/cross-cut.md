# Cross-cut — 2026-05-16 round 6 post-medium-items validation

**6 sessions.** 4 phone / 1 video / 1 async. Cast: 3 redux personas
(Yasmin / Anil / Margarethe — validating round-5 fixes landed) + 3
new shapes (Mei junior FE / Owen DBA specialist / Priya Mobile — pushing
into untested terrain).

**Headline result: every named round-5 fix landed cleanly on its
target persona, but new persona shapes surfaced two structural classes
the senior-only testing across rounds 1–5 couldn't see.** The 3 redux
personas moved from At-risk → Safe (Yasmin, Anil) or stayed At-risk
with measurable slack recovered (Margarethe). The 3 new personas
collectively raise five structural concerns and 6 numbered bugs.

The three classes of finding worth naming:

1. **Seniority-blindness.** TechVet was built and validated for mid /
   senior personas. Mei (junior FE) surfaced 5 distinct defects in
   one session — `enterpriseStillUsed` softener misfires for
   "team hasn't upgraded" juniors (regression introduced by 5α);
   depth never lowers a tier (shallow TS reads identical to senior
   author); Scope dropdown wastes ~20s of cognitive tax per junior
   screen; headline cards carry no level-fit signal. Fix-direction
   is consistent: gate behaviors on `meta.seniority + meta.pathType`.

2. **Template-shape-blindness.** Mobile, Frontend, Backend templates
   have no methodology chips, and the Assessment screen silently
   hides the entire Methodology section when chips=[] AND entries=[]
   (Priya R-fix). Recruiter never discovers free-text capture exists.
   Combined with Owen's "no template fits DBA specialist," the
   pattern is the same: TechVet's UX assumes the template covers
   ~80% of the candidate's stack, which holds for the templates that
   got round 1–5 attention and breaks elsewhere.

3. **Coverage-as-single-axis (5λ) is now 5× confirmed.** Robin →
   Cara → Brigit → Tanvir → **Owen** all under-rated for deep-narrow
   specialism. Owen's 18-yr Oracle DBA scoring `2G / 0Y / 0R` is the
   sharpest evidence yet. The deferral-to-redesign was correct in
   round 5; the redesign should now be prioritized over further hot
   patches.

## Validation matrix per shipped fix (5α through 5ι)

| Fix | Held? | Notes |
|-----|-------|-------|
| **5α** (Yellow-tier softener broadened) | ⚠️ | **Landed for returners, regresses for juniors.** Margarethe's Java 11 + PG 13 now soften correctly. Mei (J2) — the same `enterpriseStillUsed` reassurance misfires on "team hasn't upgraded" juniors. Needs seniority gate. |
| **5β** (SA AWS `+security` tag) | ✅✅ | Anil's 5 fin-services security services (KMS / Macie / GuardDuty / Security Hub / Inspector) now surface. Filter well-calibrated: 22 of 26 visible, 4 hidden correctly. Round-5 Anil KMS-fumble closed. |
| **5γ** (Backend AWS `['general']`) | ✅ | 14 of 26 services; phone-friction down ~60%. Denominator fair for backend returner. Carryover: doesn't reach checklist-mode softener (5κ), so Margarethe's AWS at 3/14 = 21% still reads Red. |
| **5δ** (SA Azure architect preload) | ✅ | Azure preloaded with architect scope; no manual add, no `Scope: operator via default` mislabel. Multi-cloud SA gap closes for scope. Underlying surface (Azure catalog itself is still operator-shaped — no architect-tag taxonomy, no Mgmt Groups / Policy / Defender) is a separate finding. |
| **5ζ** (channel label casing) | ✅ | Chips read "Phone" / "Video panel" / "Async (CV-only)" cleanly. No regressions. |
| **5η** (causal-inference 1 → 4 chips) | ✅✅ | Yasmin saves ~17 sec; chip clicks land on her exact CV terms; no slug collision. Side cost: DS template now shows 9 methodology chips, near the row-wrap limit. |
| **5θ** (NamedOnly compact in async) | ⚠️ | Lands but no expand-back affordance. ~280 px of PDF clutter removed across Yasmin's 4 named-only entries; hint "no enrichment (async; verify on next step)" is correct framing. Concern: once compact, recruiter who later wants to enrich must remove-and-re-add. |
| **5ι** (4th methodology stat card) | ⚠️ | **Highest-leverage of the three.** Closes Yasmin's round-5 "0G/6Y/0R contradicts 10-deep methodology" headline contradiction; Anil's "Methodology: 6 / Yellow: 5" now reads as capped infra + senior practices, not evidence-light. **But** the same code path that gates Junior-FE-empty (correct) also hides Senior-FE-empty AND silently regresses Mobile/Frontend/Backend on Assessment (Priya R-fix). 5-line Assessment.tsx fix below. |

## The 6 sessions at a glance

| # | Persona                  | Channel | Round-6 rating       | Headline cumulative finding                                                        |
|---|--------------------------|---------|----------------------|------------------------------------------------------------------------------------|
| 01 | Yasmin (Senior DS)       | Async   | **Safe** (was At-risk) | 5ι closes round-5 headline contradiction; 5η + 5θ both land; phone-shrink still At-risk |
| 02 | Anil (Staff SA)          | Video   | **Safe** (was At-risk) | All 4 fixes (5β / 5δ / 5ζ / 5ι) land cleanly; HM headline now reads correctly      |
| 03 | Margarethe (Returner)    | Phone   | At-risk (was At-risk; +90s slack) | 5α softens both Java 11 & PG 13; 5κ promotion (~15 LOC) flips this Safe        |
| 04 | Mei (Junior FE)          | Phone   | At-risk (NEW shape)  | **5 junior-shape defects in one session**; senior-blind scoring + UI               |
| 05 | Owen (Senior DBA)        | Phone   | At-risk (NEW shape)  | **5th confirmation of 5λ coverage failure**; total Oracle catalog miss             |
| 06 | Priya (Mid Mobile)       | Phone   | At-risk (NEW shape)  | Mobile template untouched since round 1; methodology silently hidden in Assessment |

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- Round 5: 1 Safe / 5 At-risk / 0 Unworkable
- **Round 6: 2 Safe / 4 At-risk / 0 Unworkable**

Trend continues positive on redux personas (Yasmin + Anil both
promoted Safe). The 4 At-risks split cleanly: 1 returner needs 5κ
(known patch, ~15 LOC) + 3 new persona shapes where the structural
work is the gate, not isolated hot patches.

## Code bugs surfaced (numbered, file:line-anchored)

### Bug 6α — `enterpriseStillUsed` softener fires for juniors (Mei — High; **regression from 5α**)

**What.** 5α broadened the softener guard from `=== 'red'` to non-Green
+ `enterpriseStillUsed`. Pure win for returners (Margarethe). For Mei
(2-yr junior FE on Next.js 12 because the team hasn't upgraded), the
softener fires and renders "Still widely used in many enterprise
applications" — which **mis-codes a genuine junior gap (no App Router
experience) as a non-issue.** Mei should read Yellow + "Probe: any
App Router / RSC familiarity?" not Yellow + soft reassurance.

**Fix.** Gate on `meta.seniority`:
```ts
if (current.color !== 'green' && tech.enterpriseStillUsed && meta.seniority !== 'junior') {
```
Junior FE on stale enterprise stack should read as "needs probe,"
not "stale-but-defensible." **Severity: High** — actively misleading.

### Bug 6β — Methodology section silently hidden on Assessment when chips=[] AND entries=[] (Priya — High)

**What.** `Assessment.tsx:408` (per Priya's read) renders the
Methodology section only when `template.methodologyChips?.length` is
truthy OR `meta.methodologyEntries.length > 0`. Mobile, Frontend,
Backend templates have no chips → recruiter never sees the section →
free-text methodology capture is undiscoverable. Priya's recruiter
silently dropped "I run A/B feature-flag rollouts" + "I own the
Crashlytics triage workflow." Same gap on Mei's Frontend session.

**Fix.** Always render the section. When `chips=[]` show empty chip
row + free-text input + hint: "No template chips — type to add
practices / methodologies." 5-line change. Closes a silent regression
introduced by the 5ι gating logic. **Severity: High** (because it's
invisible — recruiter doesn't know they're missing signal).

### Bug 6γ — Tautology label `"(softened from Review / Probe — stale but defensible)"` when final color == base color (Margarethe — Low)

**What.** When 5α softens a Yellow tier and the result stays Yellow,
the composed label reads `"Review / Probe (softened from Review /
Probe — stale but defensible)"`. The X→X language is awkward.

**Fix.** When `final.color === base.color`, omit `"softened from
<base>"` and read just `"Review / Probe (stale but defensible)"`.
~5 lines in `composeLabel`. **Severity: Low** (cosmetic, harmless).

### Bug 6δ — Headline `2G/0Y/0R` actively misleads for specialist-shaped reports (Owen — High)

**What.** Owen's 18-yr Oracle DBA report ends up with two scored
cards (Postgres-15 wrong-shape Green + SQL 12/12 Green) and five
named-only chips below the fold (Oracle 19c + PL/SQL + RMAN + Data
Guard + RAC, each enriched depth=very-deep / lastUsed=current). The
headline shows `2 Good / 0 Yellow / 0 Concern` — which any HM reads as
"thin but solid mid-level signal." This contradicts a clear senior
specialist on a stack the catalog doesn't cover.

**Fix-direction.** Two options. (a) Named-only chips need to influence
headline counts — count `namedNotInCatalog.length` as Yellow at the
bucket level, or surface a new "Off-catalog named: N" headline card
alongside the 4-card grid. (b) Promote the named-only section above
Strengths when `namedNotInCatalog.length > scored.length`, so visual
hierarchy matches actual evidence weight. Likely both. **Severity:
High** — directly contradicts the speed-of-use product promise of
"recruiter sees the truth in one glance."

### Bug 6ε — Depth never lowers a tier (Mei J1 — Medium)

**What.** `applyDepth` at `scoring.ts:25-36` only lifts (Red→Yellow,
Yellow→Green). Mei's `depth=shallow` on TypeScript 5.3 produces a
Green identical to a senior who authors lib types. Asymmetric on the
wrong axis.

**Fix.** When `meta.seniority` is specified, allow depth to lower a
tier (Green→Yellow when depth=shallow). Requires care — most existing
mid/senior personas leave depth blank and assume Green. Probably
gate on `meta.seniority === 'junior'` for v1. **Severity: Medium.**

### Bug 6ζ — Scope dropdown wastes ~20s on junior screens (Mei J4 — Medium)

**What.** Scope dropdown renders on every TechCard with options
operator / author / reviewer / architect / lead. For a 2-yr junior,
all options except operator are nonsense. Recruiter mentally rejects
each option on each card = ~20s of cognitive tax across a 6-min
phone screen.

**Fix.** When `meta.seniority === 'junior'`, hide the Scope dropdown
(or render it collapsed behind a "scope?" expander). Same treatment
likely applies to depth=very-deep option. **Severity: Medium**
(speed-of-use under the user's phone-call constraint).

## Structural findings (not single-bug; design work)

### 5λ — Coverage-as-single-axis (5th confirmation, redesign overdue)

Round-5 deferred this for redesign. Round-6 Owen makes it 5 personas
in a row (Robin / Cara / Brigit / Tanvir / Owen). Owen's hypothetical
Oracle checklist tick of 8/14 = 57% = Yellow despite 18 yr focused
expertise is the sharpest case. Per Owen's recommendation: depth +
coverage should be **mutually constraining**, not independent axes.
A `depth=very-deep` + `coverage=8/14` Oracle should compose to Green,
not Yellow. **2–3 day design effort. Highest leverage of any
backlog item for senior signal.**

### 5μ — Catalog coverage debt (DBA + Mobile)

Owen's session is total miss (Oracle / PL/SQL / RMAN / Data Guard /
RAC — zero matches). Priya's session is partial miss (KMM / Jetpack
Compose / Hilt / Coroutines / Coil / Retrofit / Fastlane — 7 of 10
named-only). Mei's session: Vercel / Zustand / RTL missing. The
pattern is: catalog 2.0 was scoped "Focused on software roles
(recruiter agencies)" — every specialist persona pushed into this
testing exposes the gap. Promotion of Compose + SwiftUI to first-
class checklist-mode catalog entries (Priya R1) is the highest-
leverage Mobile fix. Oracle + DBA stack is the highest-leverage
specialist fix.

### 5ν — Inverted visual hierarchy for specialist + off-catalog candidates (Owen)

Owen's actual core stack (5 chips) lives below buckets / radar /
Strengths. Two wrong-shape Green cards drive the headline. Visual
hierarchy doesn't match evidence weight. Fix-direction: when
`namedNotInCatalog.length > scored.length`, promote the named-only
section above Strengths. **Pairs with Bug 6δ** (which is the
headline-count side of the same problem).

### 5ξ — Senior tier above Yellow (D2 / round-2-shipped-but-deferred)

Anil's report: `0G / 5Y / 0R / Methodology: 6`. 5ι made the
methodology weight visible. But the Yellow row is now ambiguous — is
this "junior on senior infra" or "Staff Architect capped by scope"?
The long-promised "Senior" or "Capped-but-Strong" tier above Yellow
is the differentiator. 5ι made the gap **more** conspicuous, not less.
Likely belongs in the 5λ redesign pass.

## Priority list — round 6 (6 items, A–F)

| ID | Severity | Effort  | Item                                                                                       |
|----|----------|---------|---------------------------------------------------------------------------------------------|
| **6A** | High     | ~15 LOC | **Ship 5κ — checklist-mode softener.** Margarethe's AWS at 21% still reads Red. Promoted from round-5 deferred. Flips Margarethe Safe. |
| **6B** | High     | ~5 LOC  | **Bug 6β — always render Methodology section on Assessment.** Closes silent Mobile/FE/Backend regression introduced by 5ι gating. |
| **6C** | High     | ~10 LOC | **Bug 6α — gate `enterpriseStillUsed` softener on `meta.seniority !== 'junior'`.** Closes 5α-induced junior regression. |
| **6D** | High     | 2–3 d   | **5λ coverage redesign — depth + coverage mutually constraining.** 5th confirmation; biggest leverage for senior signal. Folds in 5ξ "Senior tier" + Owen's specialist case. |
| **6E** | High     | ~30 LOC | **Bug 6δ — named-only chips influence headline counts OR auto-promote above Strengths when `named > scored`.** Closes Owen-shape inverted-hierarchy. |
| **6F** | Medium   | 4–6 h   | **Mobile + DBA catalog + template refresh.** Promote Compose/SwiftUI/Hilt/Room/Fastlane to checklist-mode; add Oracle / PL/SQL / RMAN / Data Guard / RAC; new Database / DBA template; Mobile + Frontend `methodologyChips`. |

### Cosmetic / polish (low priority)

- **Bug 6γ** — tautology label when softened color matches base color (~5 LOC, Margarethe)
- **5θ expand-back caret** — add a small expand affordance on compact NamedOnlyEditor in async (Yasmin)
- **5ι background tone** — A/B test emerald-100 vs slate / sky for the Methodology card to reduce "Good adjacent" perceptual conflict (Yasmin)
- **Scope dropdown gating** — hide on `meta.seniority === 'junior'` (Bug 6ζ — overlaps 6C's seniority-aware UX direction)

## Recommended ship order

6A → 6B → 6C ship in one batch (~30 LOC total, ~1h). All three are
hot patches that close active regressions or silent gaps from
round 5 / round 6 fixes.

6D is the design-and-build big rock. It should follow because:
(a) it's the 5th confirmation — design risk is now low;
(b) it unblocks Owen + Tanvir + Brigit + Cara + Robin retroactively;
(c) it likely subsumes 5ξ (Senior tier) into the same redesign.

6E + 6F are catalog / structural work that benefits from 6D landing
first (named-only visibility changes depending on whether the headline
bucket counts become more or less reliable post-5λ).
