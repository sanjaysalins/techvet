# Round 13 — Session 02 — Senior FE / Design-Systems recruiter (JD extraction Phase 1)

**Fixture:** `fixtures/02-frontend-design-system.md`
**Result:** `results/02-frontend-design-system.json`
**Date simulated:** 2026-05-24
**Primary lens:** Would the extracted tech list, dropped into the
Assessment screen, give a senior-FE / design-systems recruiter a
sensible starting point — or would they spend the first 60 seconds
weeding/adding cards before the call?

---

## 1. Persona inhabited

Priya Raman, 9-year recruiter, two of those embedded with a Berlin
component-platform shop. Daily flow: paste JD into TechVet, sanity-check
the card set against the JD's "spend your time" bullets and the Stack
paragraph, hit *Start screen*. For senior-FE roles she expects the card
list to mirror what the candidate will actually be reviewed against:
component-library tooling (Storybook, Chromatic, the visual-regression
pipeline), the framework stack (React/Next/TS/Tailwind), the test layer
(Vitest/Playwright), and the design-handoff surface (Figma + tokens).
She's tolerant of one or two off-stack false positives but stops trusting
the tool if the headliner tech of the role (Chromatic, here) is silently
missing — because then the assessment starts in a place that misses the
job's whole point.

---

## 2. The extraction at a glance

**Count: 8** (`extractedCount: 8`).

By category, all eight:

- **Frontend (6):** `nextjs`, `react`, `storybook`, `tailwind`,
  `typescript`, `vite`
- **Testing (2):** `playwright`, `vitest`

For a JD whose Stack paragraph reads "TypeScript 5.6, React 19,
Next.js 15 (App Router), Tailwind CSS 4, Storybook 10, Chromatic,
Vite 6 for component builds, Vitest for unit tests, Playwright for
cross-browser smoke. Hosted on Vercel" — the extractor caught 7 of the
10 named techs (missed Chromatic, Vercel, and the implicit Figma /
Tokens Studio mentioned below in the "We'd love it if you" block).

---

## 3. Findings

### F1 — Core stack extraction is clean. Severity: ✓ working as intended.

All six Frontend entries (`react`, `nextjs`, `typescript`, `tailwind`,
`vite`, `storybook`) and both Testing entries (`vitest`, `playwright`)
are correct, single-match, and match against the canonical Stack
paragraph. The word-boundary regex (`(?<![a-z0-9])term(?![a-z0-9])`)
correctly handled `Next.js` (the period inside the name is regex-escaped
in `escapeRegex`) and `Tailwind CSS` (multi-word terms work because
the regex uses non-alphanumeric boundaries, not `\b`). Recruiter
verdict: this is the load-bearing 80% of the screen; cards land in a
sensible order.

### F2 — `chromatic` missed entirely — and it's the role's headline tool. Severity: ✗ blocking (but it's a catalog gap, not extractor bug).

The JD mentions "Chromatic" **three times** and once spells out the
role's purpose: *"Maintaining the Chromatic visual-regression suite."*
The "You'll spend your time" bullet literally names it as a
day-to-day surface, and the Stack paragraph lists it as a first-class
tool alongside Storybook. The extractor returns nothing for it because
there is **no `chromatic` top-level catalog entry**. Chromatic appears
only as a parenthetical inside Storybook's `visual-regression` service
description (`technologies.json:3907`, "Visual regression (Chromatic /
Loki / Percy)").

For this role, Chromatic *is* the assessment surface. A recruiter who
forgets to free-type it as off-catalog ships a PDF where the headline
tool of the JD has no verdict card. This is a Phase-1-correct extractor
behavior (it can only match what's in the catalog), but the catalog
gap makes the extraction recruiter-misleading for any design-system
role. **New-entry candidate, high priority.** Likely shape: version-mode
(7-current with `chromatic-7` ≈ Green), `defaultScope: "operator"`. The
JD mentions visual-regression suite ownership, which is operator+ work.

### F3 — `vercel` missed. Severity: ⚠ small (catalog gap).

"Hosted on Vercel" closes the Stack paragraph. Vercel is the
deployment target and would normally be a Yellow-ish probe ("you'll
ship to Vercel — comfortable with Edge runtimes, preview deploys?").
Not in the catalog (only referenced inside `nextjs`'s deployment
question at `technologies.json:72`). For a senior-FE screen Vercel
matters less than Chromatic — it's a hosted SaaS where most candidates
have at least pushed a preview — but it's still a JD-named tech that
silently drops. **New-entry candidate, medium priority** — or
deliberately deferred as "hosted SaaS, doesn't fit version-mode."
Note: matches the same pattern as round-12's Chromatic deferral
discussion.

### F4 — `figma` missed. Severity: ⚠ small (catalog gap; design-handoff surface).

Two JD mentions: *"Owning the Tailwind 4 token pipeline (CSS variables
→ React props → Figma)"* and *"Use Figma daily and know the Tokens
Studio + Variables workflow."* For a design-system role this is a
genuine vetting axis (figma-to-token bridge, Variables API,
Tokens-Studio plugin workflow). The catalog doesn't carry Figma. This
is borderline — Figma is a design tool, not strictly a developer tech
— but for the design-systems sub-discipline it's load-bearing. **New-
entry candidate, low-medium priority.** Could be checklist-mode with
services like `variables`, `tokens-studio-plugin`, `dev-mode`,
`figma-to-code`, `auto-layout`.

### F5 — `loki` (visual-regression) missed but acceptable. Severity: ✓ expected.

JD: *"Maintaining the Chromatic visual-regression suite (Loki for OSS
contributors)."* Loki here is Storybook's OSS visual-regression
runner, not Grafana Loki. The catalog mentions it only inside
Storybook's `visual-regression` service description. Phase 1 wouldn't
match it as a top-level entry — and shouldn't, because top-level
"Loki" would ambiguate with Grafana Loki (observability) anyway. Tag
this for Phase 2 if we ever surface it as a Storybook-services hint:
"Loki" in JD context near Chromatic → tick `visual-regression` service
when Storybook card is added. Defer.

### F6 — `tokens studio` missed. Severity: ⚠ small (catalog gap; possibly out of scope).

JD: *"know the Tokens Studio + Variables workflow."* Tokens Studio is
a specific Figma plugin; recruiters in design-systems space know it as
a named skill, not generic "design tokens." Not in the catalog. This
is plausibly out-of-scope (very narrow tool); the design-tokens signal
is already captured by Storybook's `design-tokens` service when a
recruiter ticks it. Defer unless we add Figma in F4.

### F7 — Context-blind hit on jQuery / Bootstrap *did not fire* — because they're not in the catalog. Severity: ✓ accidentally clean.

The JD's "Probably not for you" block reads: *"If you've spent the
last 4 years on jQuery + Bootstrap migrations…"* This is the textbook
Phase-1 context-blind risk: a *negative* mention of jQuery would still
flag jQuery if jQuery were a catalog entry. It isn't (and Bootstrap
isn't either — the only "bootstrap" hit in the catalog is
`BootstrapFewShot` inside DSPy's optimizers service, which the
extractor correctly skips because there's no top-level `bootstrap`
tech). So this JD dodges the context-blind false positive *by luck of
catalog scope*. **Don't read this as "Phase 1 handles negative
context" — it doesn't.** This is the canonical Phase-2 test case;
if jQuery / Bootstrap are ever added to the catalog (recruiters
working enterprise-legacy roles will ask), the same JD would start
extracting them as positives, and the Phase 2 LLM context layer would
need to suppress them.

### F8 — No false positive on "play functions" / "App Router" / "Variables" / "CSS variables". Severity: ✓ working as intended.

The JD is dense with vocabulary that could collide with catalog terms:
"play functions," "App Router," "Variables workflow," "CSS variables,"
"CSF 3." None of these collide because none are catalog `name`s or
aliases. The 2-character skip in `jdExtractor.ts:65` prevents bare
"CSS" / "JS" / "TS" from misfiring (TS appears nowhere as a standalone
token here anyway). Clean.

### F9 — CSF 3 / WCAG 2.2 missed (methodology, not tech). Severity: ✓ expected — these belong to methodology chips, not tech cards.

JD calls out *"WCAG 2.2 conformance review (AA, with Level-3 nice-to-
have)"* and *"CSF 3 / play-function patterns."* These are methodology
signals (a11y program ownership, story-authoring discipline) — not
catalog techs. They'd surface as methodology chips inside the
Storybook card (`story-authoring` service) and as the existing FE
methodology chip set. Phase 1 doesn't try to extract methodology, and
shouldn't. Honest scope.

---

## 4. Things genuinely missed (false negatives)

Only one *real* false negative in the extractor sense — i.e. a tech
that **is in the catalog** but the JD names and the regex didn't
catch: **none.** Every catalog tech named in the JD was extracted.

The misses (Chromatic, Vercel, Figma, Tokens Studio) are all **catalog
gaps**, not extractor failures. Important distinction for the Phase-2
roadmap: the LLM layer won't help with these either, because there's
nothing in the catalog for the LLM to map them to. The fix is
catalog expansion, not contextual extraction.

---

## 5. False positives (extracted but shouldn't be)

**Zero.** Every one of the 8 extracted entries appears in the JD with
positive intent. The JD's negative-context lines ("we don't write
component stories without play functions," "If your last shop did
'Storybook is docs-only,'", "spent the last 4 years on jQuery +
Bootstrap migrations") would be context-blind risk surfaces — but as
F7 notes, jQuery/Bootstrap dodged by catalog absence, and the
Storybook negative-context line is actually a *positive* signal for
the role (they're hiring someone who writes play functions, so
Storybook should be flagged). Lucky alignment.

---

## 6. Catalog gaps surfaced (new-entry candidates)

| Term         | JD evidence                                      | Priority   | Suggested shape                                   |
| ------------ | ------------------------------------------------ | ---------- | ------------------------------------------------- |
| Chromatic    | 3 mentions, named role responsibility            | **High**   | Version-mode (6/7+); operator default scope       |
| Figma        | "Use Figma daily" + token pipeline + Variables   | Medium     | Checklist (Variables / Tokens Studio / Dev Mode)  |
| Vercel       | "Hosted on Vercel"                               | Medium     | Possibly defer — hosted SaaS, no version axis     |
| Tokens Studio| "Tokens Studio + Variables workflow"             | Low        | Defer; captured by Storybook `design-tokens` tick |

Chromatic is the urgent one. The role's "spend your time" bullet
names it. Shipping a design-system assessment without a Chromatic card
misrepresents what the candidate will be asked about.

---

## 7. Verdict: **Safe — with one named catalog gap.**

The 8 extracted entries are exactly the core stack a senior-FE
recruiter would have manually selected; zero noise, zero corrections
needed before *Start screen*. The recruiter then free-types "Chromatic"
as off-catalog (same pattern as Maya round-8 / round-12), which is a
known workflow but a friction point given how central Chromatic is
to this specific role.

**Why Safe not At-risk:** the cost of the Chromatic miss is one
off-catalog free-text entry — the assessment doesn't start in a
*wrong* place, it starts in an *incomplete* place that the recruiter
fills in within 10 seconds of looking at the JD. The 7-of-10 hit rate
on JD-named techs is honest given Phase-1 scope; the 3 misses are
catalog gaps the extractor was never going to solve.

**Why not Unworkable:** the cards that *did* extract are right. There
is no card the recruiter would have to *remove* before starting. The
asymmetric cost (search-add Chromatic = 5s; remove a wrong card = 5s
+ trust hit) lands on the cheap side.

---

## 8. Cross-cut recommendations for Phase 2 LLM scope

1. **Chromatic catalog entry first, LLM later.** The biggest miss on
   this JD is not solvable by Phase 2; it needs a catalog addition.
   Same for Figma / Vercel. Phase 2 LLM scope should *not* include
   "map mentioned-but-uncataloged tools to off-catalog notes" — it
   should assume the catalog is reasonably complete, and the catalog
   pipeline (separate workflow) keeps it that way.
2. **The negative-context test case for Phase 2 is jQuery in this
   JD.** Add jQuery to the catalog as part of Phase-2 test prep (it's
   a legitimate enterprise-legacy tech recruiters ask about), then
   verify that the Phase-2 LLM correctly *suppresses* the jQuery
   extraction from this JD's "Probably not for you" sentence. If it
   doesn't, Phase 2 hasn't shipped its core value.
3. **Loki ambiguity is a Phase-2 disambiguation case.** "Loki" near
   "Chromatic" in a Storybook context = visual-regression tool;
   "Loki" near "Grafana" or "Prometheus" = log aggregation. Phase 1
   correctly skips both (no top-level catalog entry); Phase 2 should
   add disambiguation if Loki ever becomes top-level.
4. **Version extraction is a separate Phase-2 axis.** This JD names
   "TypeScript 5.6, React 19, Next.js 15, Tailwind CSS 4, Storybook
   10, Vite 6" — Phase 1 ignores all version numbers. Phase 2 (or a
   Phase 1.5 rules pass) should at least *prefill* the version input
   on the card when the JD names a version. Massive recruiter-time
   save.
5. **Methodology auto-tick is Phase 2 stretch.** "WCAG 2.2 conformance"
   → tick a11y chip; "CSF 3 / play functions" → tick design-system
   chip and pre-tick Storybook's `story-authoring` service. Phase 1
   doesn't try; Phase 2 could.
6. **Pet-peeve / Not-required blocks should drop priority, not flag.**
   The "Not required (we'll teach)" block and "Pet peeves" block are
   semantically *negative* surfaces. The LLM should de-rank
   extractions from these blocks rather than removing them entirely
   — a Storybook mention in the pet-peeves block is still a positive
   signal (they care about Storybook), but a jQuery mention in
   "Probably not for you" is a negative signal that should suppress.
   Distinguishing these is the genuinely hard Phase-2 job.
