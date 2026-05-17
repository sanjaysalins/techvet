# Round 8 — Session 04 — Maya Patel (Senior Frontend, design-system owner)

**Channel:** Phone — 10 min senior screen
**Recruiter:** Aaron (more time budget than Mei's 6-min phone)
**Date simulated:** 2026-05-17
**Primary lens:** Does the 6F Frontend chip-set carry senior signal? Does
the 7D junior-only depth-lowering gate hold cleanly for senior+shallow
and senior+deep? Inverse-Mei verification.

---

## 1. Persona inhabited

Maya Patel, 32, seven years senior FE at a UK consumer fintech (small
product team — 5 FE + 1 designer; not enterprise scale, this matters
later). Owns the design system and the WCAG 2.2 a11y program for the
consumer app. Reviews FE PRs from the rest of the team. Just led the
Next.js 12 → 14 App Router migration in production for ~9 months. Runs
the eng-wide brown bag on Core Web Vitals.

Stack as Aaron pulled it from the LinkedIn / CV before dialing:
React 18, TypeScript 5.4 (Maya wrote the team's generics-and-conditional-
types internal guide), Next.js 14 App Router with RSC, Tailwind 3,
Storybook in governance mode (she runs the cross-team Storybook approval
flow), Playwright for E2E, Vitest for unit, Chromatic for visual
regression, deployed on Vercel.

Mental model going into the call: Maya is exactly the "senior FE
differentiated by methodology, not library versions" persona the 6F
chip-set was designed to capture. She is also the target case for
verifying 7D doesn't over-correct — TS 5.4 + deep on a senior is a
canonical "should stay Green and nothing should fire" path. If her
report doesn't read Green / methodology-anchored / clean, the chip-set
is either wrong-axis or under-spec'd.

---

## 2. Phone call — abbreviated transcript

(Aaron picks **Frontend Engineer** template on the landing screen.
Seniority defaults to **Senior**. Five preloaded cards appear: React,
TypeScript, Next.js, Tailwind, Vite. Six methodology chips visible in
the right-hand panel: a11y / Core Web Vitals / design system / RSC SSR /
progressive enhancement / visual regression.)

**Aaron:** Thanks for making time, Maya. I've got about ten minutes —
quick technical screen, not a deep dive. Want to start with the stack?

**Maya:** Sure. React 18, TypeScript 5.4, Next.js 14 App Router, Tailwind
3, Storybook, Playwright, Vitest, Chromatic for visual regression. We're
on Vercel.

**Aaron:** (ticks React 18, working, operator. Vite 5 working — she
mentioned it's the bundler under Next? — actually she didn't, he leaves
Vite as-is at unknown version, will revisit.) Next 14 — App Router or
Pages?

**Maya:** App Router. We migrated from 12 last summer. Took about four
months, mostly converting client components to RSC and untangling layouts.

**Aaron:** (ticks Next.js 14, depth=deep — she led the migration —
scope=operator.) TypeScript — comfortable with generics, conditional
types?

**Maya:** Yeah. I wrote our team's generics guide last year — we have
some gnarly mapped types for our design-token API. I review every type
PR from the team.

**Aaron:** (ticks TS 5.4, depth=**deep**, scope=author. Pauses on scope —
she also reviews — but author is more load-bearing here; she's not
gatekeeping, she's writing the canonical types.) Tailwind?

**Maya:** Tailwind 3. We stayed on 3 because v4's oklch broke our
design-token pipeline. We have a custom theme extension layer that maps
our Figma tokens to Tailwind utilities.

**Aaron:** (ticks Tailwind 3, depth=deep, operator.) Vite — you mentioned
the bundler. Next.js uses Turbopack now, right?

**Maya:** Yeah, Next 14 has Turbo behind a flag. We don't use Vite
directly — Storybook 8 uses it under the hood for the dev server.

**Aaron:** (clicks "Not in candidate's stack" on Vite. Good — that
removes it from the radar instead of dinging her on a version-she-doesn't-
quote.) Cool. Let me cover methodology — I've got chips for the usual FE
practices. Tell me what you actually own.

**Maya:** I run our a11y program. WCAG 2.2 AA target, automated axe
checks in CI, manual VoiceOver / TalkBack passes every release. I also
own Core Web Vitals — we have budgets enforced in the Lighthouse CI step;
fails the build at LCP > 2.5s or CLS > 0.1. I own the design system —
Storybook in governance mode, every component change goes through a
review flow. RSC patterns I just shipped (the migration). Chromatic for
visual regression — every PR gets a baseline diff before merge.

**Aaron:** (ticks a11y-wcag, core-web-vitals, design-system-ownership,
rsc-ssr, visual-regression. Hovers over progressive-enhancement.)
Progressive enhancement — JS-disabled-still-works?

**Maya:** Not really our pattern. We're a logged-in consumer app, JS is
required after login. We use RSC for the marketing site and that's
SSR'd, but it's not "works without JS" in the classical sense.

**Aaron:** (skips progressive-enhancement chip.) Anything I'm missing
from your day-to-day?

**Maya:** Storybook governance — I gatekeep the design system there.
Chromatic and Playwright on the CI side. We also do bundle-size budgets
per route — fails the build if a route page exceeds 200KB JS.

**Aaron:** (types "Storybook" into the add-tech search, no match — adds
as off-catalog with note "governance-mode, design system gatekeeper".
Types "Playwright" — match exists but he didn't preload Testing in this
template. Adds it manually, ticks at working/operator. Same for
Chromatic — off-catalog, "visual regression CI". Bundle budgets he
mentally bucketizes under Core Web Vitals which he already ticked.) Last
question — when did you last ship to production with this stack?

**Maya:** This week. We shipped a notifications redesign yesterday.

**Aaron:** (lastUsed defaults to recent for everything. Good.) That's
my ten minutes. Thanks Maya, I'll be in touch by Friday.

(Call ends. Aaron switches to Summary screen.)

---

## 3. Post-call: report read

**Headline stats** (top of Summary, large cards):

- Good: **5**
- Review / Probe: **0**
- Concern: **0**
- Methodology: **5**
- Off-catalog: **2** (Storybook, Chromatic — Playwright matched catalog)

Bucket grid renders **5 cards** (grid-cols-2 sm:grid-cols-3 md:grid-cols-5
per Summary.tsx:251). No scope-capped chip — Maya is operator on
everything except TS which is author and Green.

**Skipped chip-row:** 1 confirmed not in stack (Vite). Adds one
"confirmed not in stack" gray pill below the headline.

**Strengths section** (the Green bucket — main signal block):

1. **React 18 — Good.** Working depth, operator. Clean.
2. **TypeScript 5.4 — Good (Excellent tier `4.9`).** Deep + author.
   `adjustForDepth` hits line 41 — `sev === 0` (Green), returns
   `{color, adjusted: false}`. No "lifted from" parenthetical because no
   adjustment fired. **This is the 7D senior-preserve verification.** ✓
3. **Next.js 14 — Good.** Deep + operator. Same path — already Green,
   no lift, no parenthetical.
4. **Tailwind 3 — Good.** Deep + operator. Same path.
5. **Playwright (manually added) — Good.** Working + operator.

**Methodology + practices section:** 5 chips render — a11y / Core Web
Vitals / design system / RSC SSR / visual regression. Reads as a coherent
senior-FE methodology profile.

**Off-catalog section:** 2 entries — Storybook (governance-mode, design
system gatekeeper) and Chromatic (visual regression CI). Both named-only,
no scoring.

**PDF export:** Headline reads "5G / 0Y / 0R / Meth:5 / Off:2 / 1 not in
stack." HM glancing at this gets senior-FE-shape immediately. No false
Yellow noise.

---

## 4. Findings

### F1 — 7D senior-preserve gate holds for both depth axes. Severity: ✓ confirmed-clean.

The inverse-Mei test passes cleanly. Two paths verified by code-reading
`src/lib/scoring.ts:34-52`:

- **TS 5.4 + deep + senior:** `findTier` returns Green (tier `4.9`).
  `adjustForDepth(green, 'deep', 'senior')` enters the `deep` branch
  (line 39), checks `SEVERITY[color]` which is 0, returns
  `{color: green, adjusted: false}` (line 41). Final color Green, no
  parenthetical. ✓
- **TS 5.4 + shallow + senior** (the hypothetical Aaron-doesn't-tick-deep
  case): `findTier` returns Green. `adjustForDepth(green, 'shallow',
  'senior')` skips the `deep` branch (line 39 false), checks the shallow
  branch (line 45), fails the `seniority === 'junior'` guard, returns
  `{color: green, adjusted: false}` (line 51 fall-through). ✓

7D's wording in the code comment (line 27-33) names this explicitly:
*"Junior gate prevents the lower from over-correcting mid/senior
unspecified-shallow cases."* The senior case is preserved because the
function returns the no-adjustment object when neither the deep-lift nor
the junior-shallow-lower triggers. This is the canonical "round 7 closed
J1 for juniors AND preserved the senior path" verification.

**Maps to round-7:** `7D` (J1 close — confirmed not regressed on senior side).

---

### F2 — Frontend chip-set load-bearing for senior FE: 5/6 land cleanly, 1 misfires. Severity: medium (chip-set quality issue, not a defect).

Of the six 6F chips, Maya ticked **five** (a11y, Core Web Vitals, design
system, RSC SSR, visual regression). She **skipped** progressive
enhancement — explicitly, because her product is a logged-in consumer
app where JS-required-after-login is the design contract.

The five she ticked **are** load-bearing — they're literally the practice
areas she owns or runs the brown bag on. The chip-set captures her
shape better than typing them all out would. Time-to-signal was ~30
seconds for the methodology section.

But: **progressive enhancement is the one chip that didn't land for the
target persona it was designed for.** Looking at the 6F catalog
(`roles.ts:52-59`), progressive enhancement is a 2010-era SSR-first
mindset that's load-bearing in:

- Government / public-sector sites (GOV.UK style)
- News and content sites that need to work without JS
- Some e-commerce checkout flows

It's NOT typically load-bearing in:

- Logged-in consumer fintech apps (Maya's shape)
- Internal tools / dashboards
- B2B SaaS
- The vast majority of senior-FE roles a UK fintech recruiter is screening

**Proposed replacements** (one of these would have ticked for Maya):

- **Bundle-size budgets** (per-route JS budget, code-splitting discipline)
  — Maya mentioned this unprompted ("fails the build if a route page
  exceeds 200KB JS"). Aaron mentally bucketed it under Core Web Vitals
  but it's distinct: CWV is a runtime perf signal, bundle budgets is a
  shipping-discipline signal.
- **Hydration strategy** (selective / partial / island hydration; what's
  RSC and what's client; streaming HTML) — would actually be redundant
  with RSC SSR which already captures it. Skip.
- **Storybook governance / design-system review flow** — this is the
  chip Maya literally has highest leverage on. Currently has to be
  free-typed as off-catalog.

**Recommended fix:** Drop progressive-enhancement, add **bundle-size
budgets** as the sixth chip. Keeps cardinality at 6 (which feels right
for senior FE — see F4). Captures the shipping-discipline axis that
matters for performance-critical senior FE work in 2026.

**Maps to round-7:** Not directly — this is a 6F chip-curation issue
the senior side surfaced that the junior side (Mei) couldn't because Mei
didn't have the depth to evaluate which chips were load-bearing. Tag
this **M1** (Maya-1, senior-FE chip-set curation): progressive-
enhancement is wrong-axis for the majority of senior FE shops; bundle-
size budgets is the missing load-bearing chip.

---

### F3 — Storybook governance is the J3-equivalent structural gap for senior FE. Severity: medium.

Round 7 named J3 ("Frontend has no chips") as Maya's persona's biggest
gap, which 6F closed. The chip-set fix worked. But this session
surfaces the next-layer-down structural gap:

**Storybook governance** — Maya's single highest-leverage activity in
her role — has no clean home in TechVet's data model.

- It's not a methodology chip (it's a tool-with-governance-discipline,
  not a practice like "test pyramid").
- It's not a checklist tech entry in `technologies.json` (Storybook
  isn't in the catalog at all — confirmed by Aaron typing it into the
  add-tech search and getting no match).
- It ends up in off-catalog as a free-text note, which downgrades the
  signal: the HM reading the PDF sees "Storybook (governance-mode, design
  system gatekeeper)" in the *Off-catalog* section, which visually
  groups it with stuff-we-couldn't-categorize. It deserves the
  Strengths section.

This is the senior-FE analogue of round-6 J3: a chip-set closed the
mid-band gap (free-text awkwardness) but the top-of-mind senior signal
still doesn't have a structured home.

**Proposed fix (M2):** Add **Storybook** as a checklist-mode tech entry
in `technologies.json` with services like:
- `component-library-authoring`
- `governance-mode / approval-flow`
- `visual-regression-integration` (Chromatic / Percy)
- `interaction-tests` (play functions)
- `MDX docs`
- `add-on authoring`

Then preload Storybook in the Frontend template `techIds`. A Maya-shaped
candidate ticks 4-5 services and reads as Green design-system specialist;
a Mei-shaped candidate ticks 1-2 and reads as Yellow exposure. **This is
exactly the Owen-DBA fix pattern** (round-6 6F preloaded SQL + Oracle +
PostgreSQL for the DBA template — the structural answer to "a
specialist's load-bearing thing needs catalog presence, not free-text").

**Maps to round-7:** J3-equivalent for senior FE. Tag **M2**.

---

### F4 — Chip cardinality (6) reads correct for senior FE on phone. Severity: ✓ confirmed-fit.

A concern I held going in: would 6 chips feel sparse for the
methodology-rich senior-FE shape? Empirically, no. Maya ticked 5 of 6
in roughly 30 seconds of conversation. Adding more chips (8-9 like
Data Scientist's chip-set) would:

- Slow down phone-pace recruiters (Aaron is on a 10-min budget, not 30).
- Push chips into less-load-bearing territory (the long tail).
- Conflict with TechVet's over-arching constraint (recruiter-on-a-phone,
  speed-of-use — per the MEMORY.md note).

The Data Scientist template's 9 chips work because DS is *defined* by
methodology proliferation (causal inference splits into 4 named methods).
FE methodology is broader-axis (a11y, perf, design-system, etc.) so 6
covers the surface. The right call here is **chip-set quality fixes
(M1, M2), not cardinality increase**.

**Maps to round-7:** Validates the round-7 batch 25 (6F) decision to
ship 6 FE chips, not more.

---

### F5 — Named-only flow lands Chromatic & Storybook visibly but in the wrong section. Severity: low (cosmetic + signal-routing).

Aaron typed Storybook and Chromatic into the add-tech search; neither
matched the catalog. They ended up as off-catalog entries on the
Summary. The 5ι round-5 fix added the Off-catalog headline card; both
entries are counted (Off: 2), which is the senior-tooling-depth signal
Aaron wanted to capture. The mechanism works.

But: **off-catalog as a section reads as "stuff we couldn't
categorize"**, not "captured senior tooling depth." For Maya, these
two are arguably her highest-leverage stack items (Storybook
governance is her core role; Chromatic is the CI mechanism that makes
the governance enforceable). Having them in a sky-blue card visually
labeled "Off-catalog" mildly buries the signal compared to a Strengths
card.

This is partially addressed by F3's M2 proposal (catalog Storybook).
Chromatic is harder — it's a hosted SaaS for visual regression that
doesn't fit version-mode or checklist-mode cleanly. The honest
answer might be: **leave Chromatic in off-catalog, fix Storybook,
accept that 1 off-catalog entry on a senior FE report is correct
signal**. Aaron's note ("visual regression CI") does the work.

**Maps to round-7:** Not a regression. Soft tag **M3** (off-catalog
visual treatment for senior tooling) — defer unless multiple sessions
surface it.

---

### F6 — `enterpriseStillUsed: true` on React/TS/Tailwind doesn't fire for Maya. Severity: ✓ confirmed-clean.

React, TypeScript, and Tailwind all carry `enterpriseStillUsed: true` at
the catalog root (`technologies.json:32, 210, 245`). The note only
fires when the tier hits Yellow (scoring.ts:329). Maya is Green on all
three. No misfire — the 7E flag audit was about not surfacing the
reassurance where it's wrong-shape, not about Green tiers (which never
get the note). ✓

**Maps to round-7:** `7E` (enterpriseStillUsed audit — confirmed not
regressed for senior FE Green-only path).

---

### F7 — 7C scope-cap headline card doesn't fire (Maya scope is operator on most). Severity: ✓ confirmed-clean.

Maya's only non-operator scope is TypeScript=author. The 7C "Scope-
capped" headline card fires when a Green would-have-been-Green entry is
capped down to Yellow by reviewer/architect scope. Maya's TS is already
Green and author scope doesn't cap Green → Yellow for author (only for
reviewer/architect — scoring.ts:79-88). No card fires, correctly. ✓

**Maps to round-7:** `7C` (scope-capped headline — confirmed not
misfiring on author-scope Green case).

---

## 5. Round-8 verdict

**SAFE — with two named follow-ons (M1, M2).**

### Verification status

- **7D (J1 close)** — ✓ confirmed senior-preserve gate holds for both
  deep and shallow senior paths. Inverse-Mei verification successful.
  The junior gate on line 45 is the load-bearing surgical fix; senior
  Maya's TS 5.4 + deep stays Green clean. (F1)
- **7E (enterpriseStillUsed audit)** — ✓ not regressed; Maya's Green
  path correctly doesn't surface the note. (F6)
- **7C (scope-capped headline)** — ✓ not misfiring on author-scope.
  (F7)
- **7A (Backend chips)**, **7B (recency wording)**, **7F (Mobile sub-
  templates)** — n/a for this persona's stack.
- **6F (Frontend chip-set)** — load-bearing for the senior target
  audience it was designed for. 5/6 chips ticked in ~30s. Chip-set
  cardinality of 6 is correct. (F4)

### Follow-on items surfaced

- **M1 (medium)** — Drop progressive-enhancement, add bundle-size
  budgets as the 6th Frontend chip. Progressive enhancement is wrong-
  axis for the majority of senior FE shops in 2026 (logged-in consumer,
  internal tools, B2B SaaS); bundle-size budgets captures the
  shipping-discipline signal that Maya mentioned unprompted.
- **M2 (medium)** — Add Storybook as a checklist-mode tech entry with
  governance + visual-regression-integration + interaction-tests
  services. Preload in Frontend template. This is the senior-FE J3-
  equivalent: a top-of-mind senior practice without a structured home,
  currently surviving only via off-catalog free-text.
- **M3 (low, defer)** — Off-catalog section visual treatment reads as
  "uncategorized" rather than "senior tooling captured." Wait for
  multiple-session confirmation before acting.

### Why Safe, not At-risk

The two M-items are chip-set / catalog quality improvements, not
behavioral defects. The senior FE flow produces a correct, readable
report (`5G / 0Y / 0R / Meth:5 / Off:2`) that a hiring manager glancing
at the PDF gets the right signal from in under five seconds. No tier
verdict is wrong; no card is missing; no header reads misleading.
M1 and M2 raise the *quality* of the senior FE chip-set / catalog, but
the current state is still load-bearing and not pressuring — exactly
what 6F + 7D promised.

The most important finding is the cleanly-confirmed 7D senior-preserve
gate (F1). Round 7 closed J1 for juniors and round 8 confirms the fix
didn't over-correct mid/senior cases — `adjustForDepth` returns the
no-adjustment object on senior paths regardless of depth (deep already
at Green ceiling, shallow gated to junior-only). The surgical junior-
only fix held.
