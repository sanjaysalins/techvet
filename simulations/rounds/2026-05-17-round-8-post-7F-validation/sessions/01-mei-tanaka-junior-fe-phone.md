# Session 01 — Mei Tanaka redux (Junior Frontend, phone)

Round 8, 2026-05-17. Primary lens: does 7D's junior-shallow-lowers-tier
actually land end-to-end on Mei's TS 5.3 + shallow case, and does it
hold without regression on the rest of her stack.

## 1. Persona inhabited

**Mei Tanaka, 26.** Two years at a mid-size US e-commerce startup
(Brooklyn-based, ~80 eng). General Assembly bootcamp grad in 2023;
prior career was marketing analytics at a CPG brand. Honest, slightly
self-deprecating; doesn't oversell. Crisp about React 18 hooks because
that's her actual day-job — building product-detail pages and a
"my account" surface against a Next.js Pages-Router app the team
hasn't found time to migrate. Shallow on TypeScript not because she
hates it but because her team has a tech lead who writes the
complicated types and she copies the shape. Volunteered the line
"I write types but I don't really *get* generics" without prompting.

**Sasha Okonkwo, 32.** Senior recruiter at a NYC-headquartered FE
agency. Pipelining a mid-Engineer FE role for a Series-B fintech that
runs Next.js 14 (App Router) + RSC. Has booked four 30-minute phone
screens today, of which Mei is the third; two more behind her. Her
calendar slot is 30 min nominal but her actual screening time is
6 minutes — she needs the rest of the window for context-loading,
note-tidying, and the "do you have any questions for me?" close.

Sasha has used TechVet for ~four weeks. She has muscle memory for the
Frontend template, the phone channel, and the "Junior" seniority pill.
She does NOT yet have a habit of reading the candidate-context line
above the headline cards; she goes directly to the cards. This is the
round-7 J5 observation, still load-bearing.

## 2. Phone call — abbreviated

> S: "Hey Mei, thanks for the time. I've got us as a quick tag-your-stack
> pass — about five minutes — then I'll wrap with role context and
> next steps. Sound good?"
>
> M: "Sounds great."

Sasha is on `http://localhost:5173/#/assess` with a Frontend template
already preloaded (`src/data/roles.ts:44-60`). Five tech cards visible
under the Frontend category: React, TypeScript, Next.js, Tailwind,
Vite (`Assessment.tsx:52-62`). She clicks the **Junior** seniority pill
(`Assessment.tsx:170-183`). She clicks the **Phone** channel pill (the
default). She types "Mei Tanaka" in the candidate-name field and
"Career switcher" in the path-type dropdown.

The right-side `GuidancePanel` (`src/components/GuidancePanel.tsx`) is
already showing the auto-focused last-added tech (Vite — `Assessment.tsx:46-50`).

**~0:30 — React.**

> S: "Let's start with React. What version are you on day-to-day?"
> M: "Eighteen — we're on 18.3 in prod."
> S: "And how would you describe your hands-on depth? Shallow,
> working, deep, very-deep?"
> M: "Working. I write hooks every day but I'm not the one
> architecting our component model."

Sasha clicks the React card, types `18.3` into the version field
(`TechCard.tsx:189-197`), selects **Working knowledge** in the depth
dropdown (`TechCard.tsx:77-90`). She leaves scope blank. She leaves
last-used blank (implied current).

Card badge updates to **Good** (Green). The 18.0 tier of React resolves
the version match (`scoring.ts:296`, `findTier`); depth=working triggers
no adjustment (`adjustForDepth` only fires on `deep`/`very-deep` or on
shallow+junior, scoring.ts:39-50); no scope, no recency, no recency
adjustment. Clean Green. (~12 s.)

**~0:50 — TypeScript. The 7D moment.**

> S: "TypeScript?"
> M: "5.3. I, um — I write types but I don't really get generics.
> I copy what the lead wrote."
> S: "Got it. So depth is more shallow than working?"
> M: "Yeah, shallow's fair."

Sasha clicks the TypeScript card, types `5.3`, selects **Shallow (used
briefly)** in the depth dropdown.

**At this exact moment, the round-7 J1 defect bit:** TS 5.3 matches
the `4.9` tier ("Good", Green) via `findTier`, but pre-7D the depth
adjustment only ran on deep/very-deep, so shallow + junior resolved
to plain Green identical to a senior. Mei's card read **Good** with
no further note. Sasha, time-pressed, saw Green and moved on.

**Post-7D — what should now happen.** The lowering branch
(`scoring.ts:45-50`) fires: depth === 'shallow' AND seniority === 'junior',
so Green → Yellow with `direction: 'lowered'`. `composeLabel`
(`scoring.ts:386-388`) renders `"Review / Probe (lowered from Good by
shallow depth)"`. The badge color flips amber.

> But the badge Sasha sees on the TypeScript card stays Green.

Here's the bug, and it's a real one. **`TechCard.tsx:20` calls
`resolveTier(tech, item)` without passing `seniority`.** The card
component never gets the seniority context, so its locally-resolved
badge does NOT apply the 7D junior lowering. The Assessment-screen
TechCard badge stays Green ("Good") for TypeScript even though the
Summary screen will correctly resolve it to Yellow.

Meanwhile, the right-side GuidancePanel (driven from `Assessment.tsx:67`,
which DOES pass seniority) is showing the Yellow lowered verdict for
the currently-focused tech. But Sasha just clicked TypeScript and
focus moved there only briefly; she clicked back to read the React
card to verify her last entry. So she sees the React Green on the
right and the TypeScript "Good" Green on the card itself. **The
lowered Yellow is silently suppressed on the screen Sasha is actually
looking at during data entry.**

Time-cost: 0 (she doesn't see it). Verdict-cost: nil for Sasha
mid-call, real for the HM reading the Summary report.

**~1:35 — Next.js.**

> S: "Next.js?"
> M: "We're still on 12. The team has been meaning to upgrade but
> the App Router migration is two sprints of work and we keep
> deprioritizing."
> S: "Got it. Familiar with App Router or Pages Router only?"
> M: "Pages only. I've read about App Router but haven't shipped
> anything against it."

Sasha types `12.0`, depth **Working**, leaves scope blank, leaves
last-used blank.

Next.js 12 hits the `12.0` Yellow tier (`technologies.json:57-61`).
Working depth — no adjustment. No scope cap. No recency adjustment
(blank lastUsed parses as "current/unknown" — not stale). Round-6 6C
gate fires: `enterpriseStillUsed` is true on the catalog entry
(`technologies.json:68`) AND `tier.color === 'yellow'`, but
`seniority === 'junior'` blocks the enterprise reassurance note
(`scoring.ts:329`). So the verdict is plain **Review / Probe** with
no "Still widely used in many enterprise applications" softener.
The GuidancePanel's `enterpriseNote` block (`GuidancePanel.tsx:44-49`)
renders nothing.

This is the 6C round-7 win holding. Sasha types "App Router gap" in
the Notes field. (~30 s.)

**~2:10 — Tailwind.**

> S: "Tailwind?"
> M: "Tailwind 3. We've talked about 4 but haven't moved."

Tailwind 3 hits the `3.0` Green tier; working depth. Clean Green.
(~10 s.)

**~2:25 — Vite.**

> S: "Vite?"
> M: "Vite 5 for the dev server."

Vite 5 hits the `4` Green "Good" tier. Working. Clean Green. (~10 s.)

**~2:40 — Off-catalog probes.**

> S: "Anything else worth flagging? Storybook? Jest? Testing setup?"
> M: "Jest and RTL. We've got Storybook for the design system. And
> I deploy to Vercel."

Sasha clicks the **+ Add tech** search bar (`TechSearch` component).
She searches "jest", adds it, types `29`, **Working**. Searches
"storybook", adds it, types `7`, **Working**. Both Green. She types
"Vercel" in the named-not-in-catalog input (`Assessment.tsx`,
near the off-catalog section). Vercel is not in the catalog and
becomes one off-catalog entry. (~50 s for the three.)

**~3:35 — Wrap.**

> S: "You mentioned no Redux. Any global state lib?"
> M: "Just Zustand. Pretty light state needs on our app."

Sasha adds Zustand as another off-catalog entry (no catalog match).
(~15 s.)

> S: "Last one — any TypeScript generics you've actually written?
> Mapped types? Conditional types? Or strictly type-consumer?"
> M: "Mostly consumer. I read the team's `Pick<>` and `Omit<>` and
> reuse them. I haven't written conditional types myself."

Sasha leaves the TypeScript depth at shallow — Mei confirmed the
shape. (~25 s.)

She clicks **Review** (`Assessment.tsx:76-81`). Total call time on
TechVet's clock: ~4:15 of structured data entry, plus a ~1:30
on-call wrap = 5:45 total. **Inside the 6-minute budget.**

## 3. Post-call: Summary page read

Sasha is on `/summary`. Headline-cards row (Summary.tsx:241-306):

| Card        | Count | Color  |
|-------------|-------|--------|
| Good        | 5     | emerald|
| Review/Probe| 2     | amber  |
| Concern     | 0     | rose   |
| Off-catalog | 2     | sky    |

No Methodology card (she didn't click any Frontend chip — they were
there but she skipped them in 3 s as round-7 predicted). No
Scope-capped card (no scope set anywhere). Five-card row, not six.

**The 5G/2Y split** is the round-8 delta. Round-7 Mei was 6G/1Y/0R
(React, TS, Tailwind, Vite, Jest, Storybook all Green; only Next.js
12 Yellow). Round-8 Mei is **5G/2Y/0R** — TypeScript flipped from
false-Green to lowered-Yellow.

**Tier labels in the Yellow section:**

- **TypeScript — Review / Probe (lowered from Good by shallow depth)**
  Note text: catalog tier note for TS 4.9+ ("Good"). No enterprise
  note. No recency note. The parenthetical "(lowered from Good by
  shallow depth)" is the new 7D label string and reads in 12-px
  italic next to the tier badge. **It is informative-toned, not
  punitive.** It explicitly names the cause (shallow depth) and the
  pre-adjustment color (Good), which gives the HM the upgrade-path
  story implicit ("if she gets to working depth, this would be Good").

- **Next.js — Review / Probe**
  Plain Yellow label; catalog tier note for the 12.0 tier. No
  enterprise softener (6C junior gate fires). This is the round-6
  6C win still holding.

**The two Yellows do mix.** Both render as amber pills with the same
"Review / Probe" string. The lowered parenthetical on TS distinguishes
them once the HM reads past the badge, but at-a-glance both are
identical-color "yellow flag" entries. A skim-reading HM would see
"2 Yellows" and not differentiate "TS is a depth claim, Next.js is
a stack-version gap." This is a sub-optimal compression but not
broken — the labels disambiguate on read, just not on glance.

**Off-catalog section** (`Summary.tsx`, named-only renderer): Vercel,
Zustand. Sky-toned pills. Recruiter-readable; no scoring weight.

**Radar:** Frontend category dominates (5 + 2 = 7 entries). One
category, so the radar collapses to a degenerate single-axis chart —
known limitation of pure-FE phone screens; not a round-8 ship target.

## 4. Findings

1. **7D ships, lowers TypeScript Green→Yellow on Summary, label
   reads `"(lowered from Good by shallow depth)"`.** Verified at
   `scoring.ts:45-50` (`adjustForDepth` lowering branch) and
   `scoring.ts:386-388` (`composeLabel` lowered case). The headline
   shifts from round-7's 6G/1Y/0R to round-8's 5G/2Y/0R.
   **Severity: WORKING AS SHIPPED.** Validates 7D's junior-gate
   stated goal.

2. **`TechCard.tsx:20` does NOT pass seniority to `resolveTier`,
   so the card badge during data entry shows Green for TS while the
   Summary correctly shows Yellow.** The Assessment-screen TechCard
   resolves its own badge locally without `meta.seniority`, missing
   the 7D adjustment entirely. The right-side GuidancePanel (driven
   from `Assessment.tsx:67`) does get seniority and renders the
   lowered story when TS is focused — so the screen has a card-badge
   vs. side-panel disagreement. **Severity: HIGH (bug, regression on
   7D's claim of end-to-end coverage).** The ship notes say "7D
   should now differ" mid-call; in practice the card UI Sasha is
   actively reading doesn't differ until she hits Summary. Mitigation:
   one-line fix — pass `{ seniority: useAssessment().meta.seniority }`
   as the third arg in `TechCard.tsx:20`. Also affects scope-cap
   rendering on the card (`TechCard.tsx:154-160`) and recency rendering
   (`TechCard.tsx:170-174`) for any future scoring path that depends
   on seniority context — every per-card visual is currently
   seniority-blind.

3. **`GuidancePanel.tsx:51-55` says "Tier improved by one step
   based on candidate's stated depth" — but for the new lowered
   direction, this text is a lie.** The component reads
   `resolved.depthAdjusted` (bool) and unconditionally renders the
   "improved" framing. When 7D lowers Green→Yellow on junior+shallow,
   `depthAdjusted` is true AND `depthDirection === 'lowered'`, but the
   panel only checks the bool and shows "improved." The badge label
   says "lowered," the side panel says "improved" — direct
   contradiction on the same screen for the focused tech.
   **Severity: HIGH (bug, contradicts 7D's UX promise).** Fix:
   branch on `resolved.depthDirection` in GuidancePanel — render
   "Tier lowered by one step based on candidate's stated depth"
   when direction is 'lowered'. Same fix needed in `TechCard.tsx:161-165`
   ("Depth raised this one tier — credit given for hands-on experience")
   once finding #2 is fixed and the seniority context reaches the card.
   Both render paths currently assume the only `depthAdjusted` case
   is a lift; 7D broke that assumption silently.

4. **Two yellow tiers (TS lowered + Next.js stack-version) render
   identical-color pills with same "Review / Probe" string;
   parenthetical differentiates on read but not on glance.** The
   headline card says "2 Review/Probe" without sub-bucketing.
   For Mei's 6-min screen this is acceptable — Sasha has time to
   read both verdicts. For a denser session (15+ techs across 3
   categories) the same compression would mash distinct stories.
   **Severity: MEDIUM (cosmetic compression, not bug).** Not a round-8
   blocker; potential 8α — break the Yellow card into "Yellow (lowered)"
   vs "Yellow (stack-version)" sub-counts, or color-vary the lowered
   parenthetical to draw the eye.

5. **6C softener-suppression for junior + Next.js still holds.** The
   enterprise note `enterpriseNote` on the Next.js Yellow does not
   render (`scoring.ts:329` gate: `seniority !== 'junior'`). The
   GuidancePanel's `enterpriseNote` block (`GuidancePanel.tsx:44-49`)
   stays empty. The HM reads Next.js 12 as a real gap, not as
   "defensible-legacy." **Severity: NONE — round-6 win confirmed
   stable across the 7A-F ship.**

6. **J4 (scope dropdown waste) STILL open.** The scope dropdown on
   every TechCard (`TechCard.tsx:93-118`) still renders unconditionally
   for Mei's 7 cards. Sasha skipped past each one in ~2 s rather than
   the round-7 ~3 s (slight muscle-memory improvement; sub-second).
   Total junior tax: ~14 s. The lowered label on TS does NOT absorb
   J4's role — these are separate UX gaps (one is verdict-honesty,
   one is data-entry cost). **Severity: MEDIUM (round-7 finding
   intact, slight habituation reduction).**

7. **J5 (headline cards seniority-blind) PARTIALLY absorbed by 7D.**
   Round-7 J5 said "5G/2Y/0R reads as 'Mid is fine'." Round-8 Mei is
   5G/2Y/0R — the same count — but ONE of those Yellows is now
   explicitly labelled `"lowered from Good by shallow depth"`. The
   verdict itself carries junior-context. A HM reading the report
   sees the lowered parenthetical and recognises this is a junior
   shape without having to read the candidate-context line above the
   cards. The cards still don't sub-bucket by seniority, but the
   tier labels do. **Severity: MEDIUM → LOW.** J5 not fully closed —
   the "Mid is fine" mis-read is still possible if HM skims badges-only
   and ignores the parenthetical — but the label takes ~50% of the
   defense-work. The remaining ship for J5 (level-fit chip on
   headline cards, or muted-tone on lowered yellows) is now smaller
   in value-prop.

8. **No regression on Mei's other entries.** React 18.3 / Tailwind 3 /
   Vite 5 / Jest 29 / Storybook 7 all read Green clean. The 7D path
   does not fire on `depth === 'working'` cases (gate is shallow-only).
   The 7C scope-cap path doesn't fire (no scope set anywhere). The 6A
   recency path doesn't fire (no stale lastUsed). The 6C softener-gate
   correctly fires only on Next.js 12. No collateral path-interaction
   bugs surfaced. **Severity: NONE — confirms 7D's gate is correctly
   narrow.**

9. **Ambiguity in catalog: Next.js currentVersion = "16".** Catalog
   `technologies.json:44` says `"currentVersion": "16"`, but no Next.js
   16 release exists in the 2026 timeline (current actual is 14.x →
   15.x). The TechCard header renders "Frontend · current 16"
   (`TechCard.tsx:48-51`). Sasha didn't notice mid-call. Not a 7D bug;
   pre-existing catalog freshness drift. **Severity: LOW (data quality,
   round-8 caught it incidentally).**

10. **Recruiter mental model is correct.** Sasha's read of Mei post-call
    is "Junior FE, depth-honest on React/Next, depth-light on TS,
    team's on a legacy stack." That maps to the actual report: 5
    confident Greens for daily-driver depth, 2 honest Yellows for the
    TS depth gap and Next.js stack gap. **The report is now telling
    the HM what Sasha already knows.** Round-7 it was telling the HM
    "Mei is mid-tier solid" (false-Green TS) — round-8 it's telling
    the HM "Mei has the React shape but needs TS upskill and exposure
    to App Router." This is the J1 fix delivering its core promise on
    HM-read-accuracy. **Severity: NONE — round-8 round-trip success
    on the headline question.**

## 5. Round-8 verdict

**AT-RISK** — 7D's scoring change is correct end-to-end on the
Summary report, but two UI rendering paths (`TechCard.tsx:20`
seniority-missing, and `GuidancePanel.tsx:51-55` +
`TechCard.tsx:161-165` direction-blind "improved" copy) make the
mid-call recruiter experience contradict the post-call report.
Sasha doesn't lose data; the report is honest. But a more skeptical
recruiter would notice the card-badge vs. side-panel disagreement
and lose trust. Two-line fix (pass seniority to TechCard's resolveTier;
branch the depth-note copy on `depthDirection`) brings 7D from
At-Risk to Safe.
