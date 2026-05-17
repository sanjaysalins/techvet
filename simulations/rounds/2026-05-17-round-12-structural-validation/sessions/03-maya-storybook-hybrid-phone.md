# Round 12 — Session 03 — Maya Patel redux (Storybook hybrid closure)

**Channel:** Phone — 10 min senior screen
**Recruiter:** Aaron
**Date simulated:** 2026-05-17
**Primary lens:** Round-14 shipped Storybook converted from version-mode to
**hybrid** vetMode with 8 services. This is the closure validation for
Maya M2 (round-8 04-maya-patel-senior-fe-phone.md F3): "Storybook
governance is the J3-equivalent structural gap for senior FE." Round-14
purports to close it. Verify in-character whether the structured home
now actually carries the senior signal it was supposed to capture, and
whether dual-body card rendering on Storybook earns its visual cost.

---

## 1. Persona inhabited

Maya Patel, 32, seven years senior FE at the same UK consumer fintech
as round-8. Owns the design system + WCAG 2.2 a11y program. Recently
finished the Next.js 12 → 14 App Router migration (now ~9 months in
production). Runs the cross-team **Storybook governance flow** —
new components don't enter the design system until they have:
test-bearing stories (CSF 3 play functions), Chromatic visual-regression
baseline, design-token consumption (no raw hex), a11y addon clean. She
literally gatekeeps the design system from the Storybook composition
dashboard.

What changed since round-8: nothing in her work. What changed in TechVet
since round-8: Storybook is now in the catalog (it wasn't in round-8 —
Aaron had to free-type it as off-catalog), and it's in hybrid vetMode
(version axis + 8-service coverage axis). Frontend template still
doesn't preload it; Aaron has to add via search. Mental model going in:
this should be Green / Green coverage / clean — if it isn't, hybrid mode
didn't actually close M2 and the round-14 batch is structurally
incomplete on the persona it was named for.

Secondary question I'm holding: is the dual-body card the right
visual treatment for Storybook? Kubernetes (round-12 5R Sven case)
was the canonical hybrid case — running cluster vs operating it
read identical on version-only. Storybook is less load-bearing than
K8s — it's a dev-time tool, not a production runtime. Does the same
dual-body rendering feel right here, or excessive?

Stack as Aaron pulled it from LinkedIn / CV: React 18, TypeScript 5.4,
Next.js 14, Tailwind 3, **Storybook 10.4** (current — Maya stays on
the bleeding edge for design-system work), Playwright, Vitest,
Chromatic, Vercel.

---

## 2. Phone call — abbreviated transcript

(Aaron picks **Frontend Engineer** template. Seniority defaults to
**Senior**. Five preloaded cards: React, TypeScript, Next.js, Tailwind,
Vite. Storybook is NOT preloaded — confirmed by inspecting roles.ts:71.
Six methodology chips visible: a11y / Core Web Vitals / design-system
ownership / RSC SSR / **bundle-size budgets** (M1 shipped — replaced
progressive-enhancement) / visual regression.)

**Aaron:** Hi Maya. Ten minutes, technical screen. Stack rundown?

**Maya:** React 18, TS 5.4, Next 14 App Router, Tailwind 3, Storybook
10, Playwright, Vitest, Chromatic for visual regression, Vercel.

**Aaron:** (ticks React 18 working/operator. Next.js 14 — App or Pages?)

**Maya:** App Router, migrated from 12 last summer.

**Aaron:** (Next 14, deep, operator.) TS — generics, conditional types?

**Maya:** Yeah, I wrote the team's generics guide. Mapped types for our
design-token API.

**Aaron:** (TS 5.4, deep, author.) Tailwind?

**Maya:** Tailwind 3. We stayed on 3 because v4's oklch broke our
design-token pipeline.

**Aaron:** (Tailwind 3, deep, operator. Quick clicks "Not in candidate's
stack" on Vite — Storybook 8+ uses Vite under the hood but Maya doesn't
operate it directly; same call as round-8.) Right, you mentioned
Storybook. Let me add it — (types "Storybook" into add-tech search) —
yep, matches. Adding.

(A card appears below the preloaded five. Card header reads:
**Storybook**, badge **Not yet assessed — 0/8 services**, subtitle
**Frontend · current 10.4 · 8 services**. Card body shows TWO sections
stacked: a Version row up top — version input + "I don't remember" +
last-used + depth + scope — and a Services checklist below with 8
checkboxes. Aaron pauses for a half-second taking in the dual-body
layout. He's seen it before on Kubernetes; the visual pattern reads.)

**Aaron:** Which Storybook version are you on?

**Maya:** 10.4. We upgraded from 8 about three months ago — wanted the
new test-runner improvements.

**Aaron:** (types "10.4" into the version field. The card badge updates
to **Good — 0/8 services**. Wait — the suffix is wrong. The version
side resolved Green (tier `9` Excellent → 10.4 matches), but the
coverage side is still "0/8 untouched." The combined verdict shows
Green because untouched services don't drag the verdict — back-compat
gate. He notes this, will follow up. Sets depth=very-deep, scope=operator,
lastUsed=current.) OK, let me walk you through some Storybook services
real quick. Story authoring — CSF 3, args, play functions?

**Maya:** Yes. All our stories are CSF 3, and the interaction-heavy ones
have play functions — we use them as both docs and tests.

**Aaron:** (ticks `story-authoring`. Card now reads **Good — 1/8 services**.
Note the suffix appeared as soon as the first tick fired — services
channel went live.) Addons — a11y, interactions, viewport?

**Maya:** All three plus the measure addon. We require axe-clean before
a story can be approved.

**Aaron:** (ticks `addons`. 2/8.) Test-runner?

**Maya:** Yeah, we run interaction tests on every PR plus a smoke pass
across the full library.

**Aaron:** (ticks `test-runner`. 3/8.) Visual regression — Chromatic?

**Maya:** Chromatic. Every PR gets a baseline diff. Nothing merges with
unreviewed visual changes.

**Aaron:** (ticks `visual-regression`. 4/8.) Design tokens?

**Maya:** Owned. We map our Figma tokens into a tokens.ts that Storybook
and Tailwind both consume. No raw hex in the design system.

**Aaron:** (ticks `design-tokens`. 5/8 — card flips to **Good — 5/8
services**, 62.5% coverage, just under the 66% green threshold... wait,
no, the version channel is Green and 5/8 services puts coverage at
Yellow (25-66% range), and MIN(Green, Yellow) = Yellow. The badge
should now read Yellow. Let me look — yes, badge is **Review / Probe
— 5/8 services**. Combined verdict moved Yellow because coverage didn't
yet cross the 66% threshold. He's mid-call so he keeps moving; this is
honest, he hasn't asked the other three yet.) Docs site — MDX,
autodocs?

**Maya:** We have MDX docs pages for the more complex patterns —
combobox, date-picker — but most components use autodocs. The MDX is
hand-written when the autodocs aren't enough.

**Aaron:** (ticks `docs-site`. 6/8 — card flips back to **Good — 6/8
services**. 75% crosses the 66% green floor. Combined now MIN(Green,
Green) = Green.) Composition — multi-repo federation?

**Maya:** No. We're a small team, single repo, no federation. Doesn't
fit our shape.

**Aaron:** (skips composition. 6/8.) Governance — component approval
workflow?

**Maya:** Yes, this is the thing I most own. New component PRs go
through a checklist — a11y addon clean, Chromatic baseline reviewed,
design-token consumption verified, play-function coverage if it's
interactive. I'm the approver.

**Aaron:** (ticks `governance`. 7/8. Card stays **Good — 7/8 services**,
87.5%. Plus depth=very-deep which would have lifted Yellow→Green but
the verdict is already Green so adjustForDepth no-ops on the lift
side. Note the parenthetical: just "Good" — no "(lifted from)" because
no lift fired.) Anything else missing from your day-to-day?

**Maya:** Bundle-size budgets per route — we fail the build if a route
exceeds 200KB JS. Also our notifications redesign shipped yesterday.

**Aaron:** (ticks `bundle-size-budgets` methodology chip — the M1 chip
from round-8 is now there, which Maya hit unprompted again. Confirms
M1 was the right call.) Last ship?

**Maya:** Yesterday.

**Aaron:** Great. Thanks Maya — I'll be in touch by Friday.

(Call ends. Aaron switches to Summary.)

---

## 3. Post-call: report read

**Headline stats:**

- Good: **6** (React, TS, Next, Tailwind, Storybook, **+1 new vs round-8 since Storybook is now scored, not off-catalog**)
- Review / Probe: **0**
- Concern: **0**
- Methodology: **6** (a11y, CWV, design-system, RSC SSR, bundle-size budgets, visual regression — 6/6 ticked this time)
- Off-catalog: **1** (Chromatic — leave it, per round-8 F5)

**Skipped chip-row:** 1 confirmed not in stack (Vite).

**Strengths section** (the Green bucket — main signal block):

1. **React 18 — Good.** Working / operator.
2. **TypeScript 5.4 — Good.** Deep / author.
3. **Next.js 14 — Good.** Deep / operator.
4. **Tailwind 3 — Good.** Deep / operator.
5. **Storybook 10.4 — Good — 7/8 services.** Very-deep / operator. The
   card displays both axes in the Strengths bucket: version line
   "10.4 — Excellent (9/10 current; Vite-first, CSF3, modern addons)"
   AND coverage "7 of 8 services — 87.5% coverage." The
   `checklistGuidance` note renders below: *"Round-14 hybrid mode (Maya
   M2 round-8): the services axis captures design-system governance
   senior signal independent from version era."*

**Methodology section:** 6 chips render — Maya ticked all six. M1's
bundle-size budgets shipped and landed for her unprompted.

**Off-catalog section:** 1 entry — Chromatic. (Down from 2 in round-8;
Storybook moved out of off-catalog and into a Strengths card — **M2 closed**.)

**PDF export:** Headline reads "6G / 0Y / 0R / Meth:6 / Off:1 / 1 not
in stack." Glanceable. HM gets senior-FE-with-design-system-governance
shape immediately.

---

## 4. Findings

### F1 — M2 (Maya round-8) structurally closed. Severity: ✓ confirmed-clean.

Round-8's M2 named the exact gap: *"Storybook governance is the
J3-equivalent structural gap for senior FE."* The recommendation was
to add Storybook as a **checklist-mode** entry with services like
component-library-authoring / governance / visual-regression-integration
/ interaction-tests / MDX docs / addon-authoring.

Round-14 shipped **hybrid** instead of checklist, with 8 services
that map cleanly onto M2's proposed shape:

| M2 (round-8) proposed         | Round-14 shipped                            |
| ----------------------------- | ------------------------------------------- |
| component-library-authoring   | `story-authoring` (CSF 3 / args / play)     |
| governance / approval-flow    | `governance` (component approval / contrib) |
| visual-regression-integration | `visual-regression` (Chromatic / Loki)      |
| interaction-tests             | `test-runner` (interaction tests + smoke)   |
| MDX docs                      | `docs-site` (MDX / autodocs)                |
| add-on authoring              | `addons` (a11y / interactions / measure)    |
| —                             | `design-tokens` (new — design-token bridge) |
| —                             | `composition` (new — multi-repo federation) |

The shipped set is a **superset** of M2 — `design-tokens` and
`composition` weren't in M2 but are correct senior-FE governance axes.
Design-tokens specifically is high-leverage for Maya (she owns the
token mapping). M2's intent landed plus two extras. ✓

**The structural test:** Maya's highest-leverage activity now has a
verdict surface. In round-8 it was a free-text off-catalog note buried
in the "uncategorized" section. In round-14 it's a scored Strengths
card with 7/8 services confirming her shape and a current-version
Green confirming her tooling currency. The HM reading the PDF sees
exactly what Maya owns. **M2 is closed.**

**Maps to round-14:** primary objective met.

---

### F2 — Hybrid > checklist for Storybook. Severity: ✓ confirmed-correct call.

Round-14 chose hybrid over checklist-mode. This was the right call,
and Maya's session demonstrates why:

- **Version axis carries independent signal.** Storybook 6.x vs 10.x
  is a real shape difference — 6 is pre-Vite, pre-CSF3, pre-modern-
  addons. A candidate on Storybook 6 ticking 7/8 services reads
  differently from Maya on 10.4 ticking 7/8 — the older candidate is
  probably on a frozen design system that hasn't kept pace. The
  hybrid model captures this with `min: "6"` flagged
  `enterpriseStillUsed: true` so a 6.x candidate reads Yellow with the
  "still common, verify migration" note even if their coverage is good.
- **Services axis carries independent signal.** A candidate on
  Storybook 10 with 2/8 services ticked (story-authoring + addons
  only) reads differently from Maya — they write stories but don't
  govern the design system. Checklist-only would have erased the
  version-era signal; version-only would have erased the depth-of-
  operation signal. Hybrid captures both.

The MIN-combination semantics (weakest-link) match the K8s Sven case:
honest under-claim is honest, honest over-claim is honest. Maya at
10.4 + 7/8 = MIN(Green, Green) = Green. A hypothetical mid-engineer on
10.4 + 2/8 = MIN(Green, Red) = Red — correctly flags the "writes
stories, doesn't govern" shape that a version-only screen would have
missed.

**Maps to round-14:** vetMode-choice validated.

---

### F3 — The transition through Yellow at 5/8 is honest, not a bug. Severity: ✓ confirmed-clean.

Mid-call Aaron watched the badge swing Green → Yellow → Green as he
ticked services 4 → 5 → 6. The 5/8 = 62.5% spot fell just under the
66% green floor, so coverage flipped to Yellow, MIN(Green, Yellow) =
Yellow. Then 6/8 = 75% crossed the floor, coverage went Green,
combined back to Green.

This is honest behavior:

- If Aaron had hung up at 5/8, Maya would have read Yellow — and
  that's correct, because at 5/8 he genuinely hadn't probed her on
  docs/composition/governance yet. The verdict was honestly uncertain.
- Once governance ticked, the verdict honestly resolved Green.

If the version channel had been Yellow (say Storybook 7) the same
sweep would have landed differently — version=Yellow + 5/8=Yellow
= Yellow; version=Yellow + 7/8=Green = MIN(Yellow, Green) = Yellow.
The version-era signal would have correctly anchored the verdict at
Yellow regardless of coverage. This is what hybrid is for.

**Maps to round-14:** combination semantics work as designed.

---

### F4 — Dual-body card on Storybook reads cleanly, NOT excessive. Severity: ✓ confirmed-fit (with one caveat).

Pre-call hypothesis I held: Storybook is less load-bearing than K8s
(dev-time tool vs production runtime), so maybe the dual-body card
that earns its visual cost on K8s feels excessive on Storybook.

Empirically, no — the dual-body card reads cleanly for Maya's shape.
The reasons:

1. **The version input is fast.** Maya quoted "10.4" in two seconds.
   It's not a friction surface; it's a 2-character input + tier flash.
2. **The services checklist is the load-bearing surface.** It's where
   8 of the 10 minutes worth of value lives. Without it, Aaron would
   have been free-typing Maya's governance shape into a notes field
   (round-8 outcome). Having structured ticks lets him capture seven
   senior signals in ~40 seconds.
3. **The version + services pair tells a story together.** "10.4 + 7/8"
   reads as "current tooling, deeply governed." "8.x + 2/8" would
   read as "current-ish, writes stories." "6.x + 7/8" would read as
   "deep governance on legacy tooling — probe migration plan."
   None of these stories are visible on a single-axis card.

**Caveat — the visual hierarchy could be tightened.** On the Storybook
card body the Version block currently occupies the same vertical
real-estate as on a pure version-mode tech (React, TS). For a tool
where services are arguably the *more* load-bearing axis (Maya's
governance > Maya's version currency for HM signal), the Version block
feels mildly oversized. Compare K8s where version-era signal (1.22 vs
1.30, EOL risk, security posture) is genuinely equal-weight with the
services axis. On Storybook the version axis is slightly weaker.

**Soft recommendation (R14-α, low priority):** consider a tighter
Version row on hybrid cards where the version axis is the "supporting
signal" rather than co-equal. Single line: "Version: [input] · last
used [select] · depth [select] · scope [select]." Same fields, less
vertical space. Then the Services checklist gets visual primacy
matching its signal weight for Storybook-like tools. K8s might want to
stay co-equal. Out-of-scope for round-14 closure; flag for round-15+.

**Maps to round-14:** dual-body shipping correct; visual hierarchy
optional refinement.

---

### F5 — `composition` (multi-repo federation) is the right inclusion for the senior tier — honest skip for Maya. Severity: ✓ confirmed-fit.

I held a question going in: would the 8 services miss a canonical
governance pattern Maya uses? Walking through each:

- ✓ `story-authoring` — load-bearing (CSF 3 + play functions)
- ✓ `addons` — load-bearing (a11y addon clean is a governance gate)
- ✓ `test-runner` — load-bearing (interaction tests = test-bearing stories)
- ✓ `visual-regression` — load-bearing (Chromatic = governance enforcement)
- ✓ `design-tokens` — load-bearing (her token mapping is the design-system core)
- ✓ `docs-site` — load-bearing (MDX for complex patterns; autodocs for the rest)
- ✗ `composition` — *not* her shape (single repo, small team) but legitimately
  load-bearing for federated design-system orgs (Shopify Polaris, GitHub
  Primer, IBM Carbon). Correct inclusion for the catalog; correct skip
  for Maya.
- ✓ `governance` — her core role; load-bearing.

Gaps I looked for and didn't find missing:
- ~~Theming / dark-mode story coverage~~ — implicitly covered by
  `design-tokens` + `addons` (theme decorator addon).
- ~~Storybook in CI~~ — implicitly covered by `test-runner` +
  `visual-regression` (both run in CI).
- ~~Performance benchmarking~~ — wrong-axis for Storybook (perf
  belongs to Core Web Vitals methodology chip, not Storybook services).

One *micro-gap* worth naming: **i18n / locale-switching stories**.
Storybook governance for any consumer product that ships in multiple
locales needs i18n decorator + locale-switching stories as a
governance gate (every component renders correctly in RTL Arabic, in
German, in CJK). Maya's fintech is UK-only so she didn't surface this
gap, but a candidate at, say, Booking.com or Airbnb would. **Severity
low — defer until a multi-locale persona's session names it.**

**Maps to round-14:** service-set coverage correct; one defer-flag for
i18n.

---

### F6 — `defaultScope` not set on Storybook. Severity: low (minor consistency).

The catalog (technologies.json:3793-3845) doesn't set `defaultScope` on
Storybook. For a typical Storybook user the default is `operator`
(they run Storybook locally, write stories in their app, see them on
Chromatic). Aaron set scope=operator manually for Maya, which is
correct — but a recruiter who forgets to set it on a quick screen
would default to undefined scope, no scope-cap, no scope-cap headline
card.

This is fine for Storybook because the scope-cap pattern (Staff-IC
architect-not-operator) is rare on Storybook — most Storybook users
*are* operators. But for consistency with other tools in the catalog
that set `defaultScope`, consider adding `"defaultScope": "operator"`
to Storybook. Trivial.

**Maps to round-14:** flag for round-15+ catalog hygiene pass.

---

### F7 — Frontend template still doesn't preload Storybook. Severity: medium (UX gap).

`roles.ts:71` — `techIds: ['react', 'typescript', 'nextjs', 'tailwind',
'vite']`. Storybook is not in the preload list. Round-8 M2 specifically
recommended "Preload Storybook in the Frontend template `techIds`."
Round-14 shipped the catalog entry but not the preload.

This is a recruiter-pace cost: Aaron had to manually search and add
Storybook mid-call, which cost ~5 seconds and broke flow. For a senior
FE screen where Storybook is load-bearing 70-80% of the time, this
should be preloaded.

Counter-argument: not every Frontend candidate is on a Storybook shop
(some teams use Styleguidist, Bit, Histoire, or no docs platform at
all). Preloading Storybook would mean those candidates start with a
card they don't need and have to remove.

**Recommendation:** preload it. Removal is one click. Re-adding a
missing card is a search-type-confirm flow that breaks recruiter
flow mid-call. The asymmetric cost favors preload-by-default. Same
pattern as round-8 6F preloading Tailwind even though some FE shops
use vanilla CSS.

**Tag R14-β (medium):** add `'storybook'` to Frontend template
`techIds` in `roles.ts`. Single-line change.

**Maps to round-14:** preload step from M2 not yet shipped.

---

### F8 — `checklistGuidance` text references "Maya M2 round-8" by name. Severity: ✓ love this, but flag the meta-leak.

The `checklistGuidance` string in technologies.json:3844 reads:
*"Round-14 hybrid mode (Maya M2 round-8): the services axis captures
design-system governance senior signal..."*

The "(Maya M2 round-8)" reference is internal-narrative metadata
bleeding into recruiter-visible UI copy. A hiring manager reading the
PDF sees this and thinks "who's Maya, what's M2?" The note's *content*
is great — names the senior-FE thesis directly — but the
parenthetical is build-time context that doesn't belong in the
shipped product.

**Recommendation:** strip the parenthetical. Rewrite as:
*"Hybrid mode: the services axis captures design-system governance
senior signal independent from version era. Story-writers tick 2-3
services. Senior FE design-system owners tick 6-8 (test-bearing
stories + visual regression + composition + governance flow)."*

Same pattern audit needed across other catalog `checklistGuidance` /
`note` fields — round-12's K8s entry might have similar persona
leak. Worth a grep pass.

**Tag R14-γ (low):** strip internal-persona references from
recruiter-visible copy.

---

## 5. Round-12 verdict

**SAFE — M2 closed; three small follow-ons (R14-α visual hierarchy,
R14-β preload Storybook in Frontend template, R14-γ strip persona
references from UI copy).**

### Verification status

- **M2 (Maya round-8) — ✓ closed.** Storybook now has a verdict surface
  in TechVet. Maya's highest-leverage activity (governance) appears as
  a Strengths card with 7/8 services + Green tier, replacing the
  round-8 off-catalog free-text. The structural gap named in round-8
  F3 is fixed. (F1)
- **Hybrid > checklist choice — ✓ validated.** Both axes carry
  independent signal; combining them via MIN preserves both
  legacy-tooling-but-deep and current-tooling-but-shallow honestly.
  (F2)
- **Combination semantics — ✓ honest.** The Green→Yellow→Green sweep
  at 5/8→6/8 is correct behavior, not glitch. (F3)
- **Dual-body card — ✓ reads cleanly,** with a soft suggestion for
  tightening Version block visual hierarchy on supporting-axis hybrid
  techs (F4). NOT excessive for Storybook despite less-load-bearing-
  than-K8s nature.
- **Service-set coverage — ✓ correct.** 8 services map cleanly onto
  M2's proposed shape + 2 useful extras (`design-tokens`,
  `composition`). One micro-gap flagged (i18n) but defer until a
  multi-locale persona surfaces it. (F5)
- **Catalog hygiene — ✓ minor flags only.** `defaultScope` not set
  (F6), copy persona-leak (F8).
- **Preload step — ✗ not shipped.** Frontend template still doesn't
  include Storybook. (F7)

### Follow-on items surfaced

- **R14-α (low)** — Visual hierarchy on hybrid cards: tighter Version
  row when the version axis is supporting (Storybook) vs co-equal
  (K8s). Defer; cosmetic.
- **R14-β (medium)** — Add `'storybook'` to Frontend template
  `techIds`. M2 recommended this; round-14 shipped catalog entry but
  not preload. Single-line change in `roles.ts`. Ship soon.
- **R14-γ (low)** — Strip "(Maya M2 round-8)" persona reference from
  Storybook `checklistGuidance`. Same pattern audit across other
  catalog notes — quick grep.
- **R14-δ (defer)** — `defaultScope: "operator"` on Storybook for
  consistency. Trivial.
- **R14-ε (defer)** — Consider i18n / locale-switching as a 9th
  Storybook service if a multi-locale persona session surfaces it.
  Not now; speculative.

### Why Safe, not At-risk

The primary objective of round-14 (close M2) is met. The HM glancing
at Maya's PDF gets exactly the right signal: senior FE who owns the
design-system governance flow on current tooling, six methodology
chips ticked, one off-catalog (Chromatic) which is legitimately off-
catalog because Chromatic is a hosted SaaS that doesn't fit version-
or services-mode cleanly. No verdict is wrong; no card is missing;
no header reads misleading.

The three follow-ons are all polish, not defects:
- R14-α is a visual refinement.
- R14-β is the obvious next step (preload) that the M2 recommendation
  named but round-14 didn't ship. Worth doing but doesn't block the
  closure verdict — recruiters can search-add it in 5 seconds.
- R14-γ is a copy-cleanup pass.

The most important finding is that the **shape of round-14's bet
held**: hybrid mode chose correctly between version-only and
checklist-only by refusing to choose. The Storybook case demonstrates
the same pattern as K8s (round-12 5R Sven): a tool with independent
senior signal on both axes needs both axes scored, and MIN-combination
preserves the honesty. Maya 10.4 + 7/8 = Green; hypothetical mid-FE
10.4 + 2/8 = Red; hypothetical staff-FE 6.x + 7/8 = Yellow with
enterpriseStillUsed note. All three reads are honest. M2 is closed.
