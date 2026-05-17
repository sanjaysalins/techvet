# 04 — Kenji Watanabe redux (Senior iOS, phone)

**Round 11 / 2026-05-17 — catalog-refresh validation.**
Channel: Phone, 8 min. Recruiter: Hiro (internal recruiter, fluent JA/EN).
Primary lens: does the new `uikit` catalog entry (round-11 batch,
deferred from rounds 7-8) finally let Hiro vet the UIKit half of
Kenji's daily work?

---

## 1. Persona inhabited

Kenji Watanabe, 37, 9 years iOS engineering at a Tokyo Japanese-mobile-bank
fintech. Pure native iOS for his entire career — has *never* written an
Android line, *never* used React Native / Flutter / Expo in production.
Currently the lead engineer on a 4-year-old banking app's
UIKit → SwiftUI migration; reviews Swift PRs from a team of four.

Stack as of today (unchanged from rounds 7-10 — same persona, the
catalog is what's moving):

- Swift 6.0 (team upgraded last sprint).
- SwiftUI, ~6 months in production — used for all *new* screens
  (transfers, statements, KYC flow). Newer screens use @Observable
  (iOS 17+ Observation framework); older screens still on
  @ObservedObject (team hasn't done the migration sweep yet).
- **UIKit — deep.** Older screens (login, account list, settings,
  transaction list) are still UIKit and will stay UIKit until at
  least Q3-Q4 2026. Half the production codebase. Kenji writes UIKit
  every week; code reviews split 50/50 SwiftUI ↔ UIKit. Heavy on
  diffable data sources (migrated from index-path-based last year),
  programmatic Auto Layout (storyboards only for the legacy login
  flow), SwiftUI ↔ UIKit interop via `UIHostingController` for
  embedding new SwiftUI screens inside the existing UIKit nav stack,
  and `UIViewRepresentable` going the other way for two legacy chart
  widgets. Accessibility discipline — VoiceOver and Dynamic Type
  tested every release per the JIS X 8341 audit.
- Combine, Core Data, CloudKit sync, Xcode Cloud for CI, Fastlane.
- MVVM-C (coordinator pattern). Snapshot tests via
  iOSSnapshotTestCase. In-house custom telemetry SDK for feature
  flags (no LaunchDarkly / Firebase — fintech compliance).

Senior, operator on the codebase, architect-shape on his own app.
Calm on the phone, picks his words; Hiro has to leave space.

---

## 2. Phone call — abbreviated

**Hiro picks template on Landing.** Lands on `/`, sees the role grid.
Three Mobile cards sit in the same row — *Mobile — Android*,
*Mobile — iOS*, *Mobile — Cross-Platform*. Hiro clicks
**Mobile — iOS**. (No surprise vs round 8; the iOS sub-template
landed in 7F and has been stable since.)

**Assessment screen loads with 2 preloaded tech cards: Swift +
SwiftUI.** Methodology-chips strip on the right shows the same 6
chips from round 8 (Fastlane / MVVM-C / snapshot testing / VoiceOver
+ Dynamic Type / A/B + feature flags / App Store Review automation).

**Hiro (00:30):** "Kenji-san — 8 minutes, iOS stack, then I'll
schedule the technical deep-dive with the team. Hajimemashō?"

**Kenji:** "Hai."

**Hiro (00:50):** "Swift version?"

**Kenji:** "Swift 6.0. Last sprint. Strict concurrency, Sendable —
the whole thing."

Hiro types `6.0`. Card flips green — **"Excellent"** — no enterprise
reassurance (7E removed Swift's root flag; 6.0 is above Excellent
floor regardless). Clean.

**Hiro (01:30):** "SwiftUI — 10 areas in the checklist. Which are in
production for you?"

**Kenji:** "Six months in. State — @State, @Binding, @ObservedObject
— yes. We're on iOS 17 so we're migrating to @Observable, partial
there. Navigation — NavigationStack for new screens. Animations —
basic. Async/await integration — yes. UIKit interop — heavy, every
new screen has at least one UIHostingController bridging into the
legacy nav stack."

Hiro ticks: state-binding, observation-framework, navigation-stack,
animations, uikit-interop, async-await-integration. **6 of 10**.
Card reads **"Review / Probe — 6/10 services"** (60% < 66% Green
floor). Hiro picks depth=`deep` from the dropdown — round-6 6D's
qualified depth-lift fires (coverage ≥ 40% + deep + senior), card
flips to **"Good (lifted from Review / Probe by depth) — 6/10
services"**. Same outcome as round 8.

**Hiro (02:30):** "OK — UIKit. You said the older screens are still
UIKit. Half the app?"

**Kenji:** "Hai. Login, account list, settings, transactions list —
all UIKit. We won't be done migrating until Q3 maybe Q4 next year. I
write UIKit code every week."

Hiro searches **"uikit"** in the tech search box. **Match.** Card
appears. Hiro clicks. Card slots into the Mobile column.

**This is the round-11 catalog hit.** Pre-11, this was a named-only
chip with no verdict, no probes, no depth — half of Kenji's daily
work was invisible on the report. Now there's a real checklist
card.

Card opens in checklist mode. 10 services visible:

1. UIViewController lifecycle + transitions
2. Auto Layout (programmatic + NSLayoutConstraint)
3. Storyboards / XIBs
4. UITableView / UICollectionView (diffable data sources)
5. UINavigationController + UITabBarController patterns
6. UIView animations + UIViewPropertyAnimator
7. Core Animation (CALayer / CAAnimation)
8. SwiftUI interop (UIHostingController / UIViewRepresentable)
9. Accessibility (UIAccessibility / VoiceOver / Dynamic Type)
10. UI testing (XCUITest / snapshot)

**Hiro (03:30):** "Walk me through — which of these are in the
codebase?"

**Kenji:** "Most of them. View controllers, lifecycle — every day.
Auto Layout, programmatic — we left storyboards behind years ago
except for the login flow, which is still a storyboard for
historical reasons. Storyboards — yes but only that one screen.
Diffable data sources — we migrated the transactions list last year,
big quality-of-life win. Navigation controller, tab bar — yes,
that's the app's root chrome. UIView animations — yes, basic stuff.
Core Animation — sparingly, for the chart widget transitions.
SwiftUI interop — heavy, daily, the migration depends on it.
Accessibility — bank audit, mandatory. UI testing — XCUITest plus
iOSSnapshotTestCase across the whole UI surface."

Hiro ticks: view-controllers, auto-layout, storyboards-xibs (kept —
Kenji explicitly named one screen), table-collection-views,
navigation-controllers, uikit-animations, swiftui-interop,
accessibility, uikit-testing. Skipped core-animation (Kenji said
"sparingly" and Hiro reads that as not-confident). **8 of 10 = 80%
→ Green coverage band.** Hiro adds depth=`deep`. (The 6D lift wouldn't
fire anyway because base is already Green; depth is captured as
context for the team interview.)

Card reads **"Good — 8/10 services"**. No enterprise reassurance
note attached (correct: enterpriseStillUsed only fires on Yellow
bands per `scoring.ts:350`; 80% is straight Green from coverage,
not from softener territory).

**Hiro (05:15):** "Anything else? Combine, Core Data, CloudKit?"

**Kenji:** "Combine — yes, heavy. Core Data + CloudKit sync.
Xcode Cloud for CI. Fastlane for App Store. Custom in-house
telemetry SDK for feature flags."

Hiro searches each. Combine — no match, named-only. Core Data — no
match, named-only. CloudKit — no match, named-only. Xcode Cloud —
no match, named-only. Fastlane — no match, named-only. **Five
named-only entries** — one fewer than round 8 (UIKit graduated out
of named-only).

**Hiro (06:30):** "Architecture, tests?"

**Kenji:** "MVVM-C, coordinator. Snapshot tests, iOSSnapshotTestCase
across UI. VoiceOver + Dynamic Type — required for JIS X 8341. Our
own telemetry SDK for feature flags."

Hiro ticks 4 of 6 methodology chips (MVVM-C / snapshot-testing /
VoiceOver+Dynamic-Type / A-B+feature-flags). Skipped Fastlane chip
(already named-only) and App Store Review automation chip (Hiro
forgot to ask — genuine miss, same as round 8).

**Hiro (07:30):** "Last — Android, React Native, ever?"

**Kenji:** "Never. Pure iOS, 9 years."

iOS sub-template doesn't preload any Android/cross-platform cards,
so no not-in-stack tax to dispatch. **0 not-in-stack clicks.**

**Hiro (07:50):** "ありがとう. Summary going to the team this
afternoon."

Call ends at 7:55. Hiro flips to Summary.

---

## 3. Post-call: report read

Summary headline row:

```
Strengths: 3   Probe: 0   Concerns: 0   Methodology: 4   Named-only: 5
```

Tier breakdown:

- **Strengths (Green):**
  - Swift — *Excellent* (6.0)
  - SwiftUI — *Good (lifted from Review / Probe by depth) — 6/10
    services*
  - **UIKit — *Good — 8/10 services*. No enterprise note attached
    (correct — Green base, not Yellow softener territory).**

- **Probe / Concern:** empty.

- **Methodology chips ticked (4 of 6):** MVVM-C / snapshot testing /
  VoiceOver + Dynamic Type / A-B + feature flags.

- **Named-only by candidate (5):** Combine, Core Data, CloudKit,
  Xcode Cloud, Fastlane.
  **UIKit graduated off this list.** Was the sixth entry in round 8.

Radar chart: Mobile category at 3.0 (max — 3/3 Green techs), other
categories empty. Same visual shape as round 8 (single Mobile
triangle), but the *Mobile vertex weight* is now backed by 3 Green
techs not 2. The radar value doesn't change because it caps at the
category max, but the *report content* is materially better — the
team interview now has UIKit signal to work from.

PDF export attempted: ~310 KB, 2-page A4 (extra UIKit card pushes
slightly past the round-8 ~280 KB). Swift / SwiftUI / UIKit cards
all render with tier badges, services lists, and depth selectors.
Clean.

---

## 4. Findings

### Finding 1 — UIKit catalog entry lands cleanly with 10 services. **PASS.** (Severity: positive)

`src/data/technologies.json:4594-4619`. Entry exists, `id: "uikit"`,
`name: "UIKit"`, `category: "Mobile"`, `vetMode: "checklist"`,
`enterpriseStillUsed: true` at root. 10 services as cast-spec'd —
view-controllers, auto-layout, storyboards-xibs,
table-collection-views (with diffable data sources mention in label),
navigation-controllers, uikit-animations, core-animation,
swiftui-interop, accessibility, uikit-testing. Card renders in
checklist mode, coverage thresholds apply correctly (8/10 = 80% →
Green). **This is the round-11 deliverable, and it ships clean.**

### Finding 2 — `swiftui-interop` service exists and is load-bearing for Kenji's verdict. **PASS.** (Severity: positive)

`src/data/technologies.json:4608`. Service id `swiftui-interop`,
label "SwiftUI interop (UIHostingController / UIViewRepresentable)"
— mentions *both* directions of the bridge (UIKit hosting SwiftUI
*and* SwiftUI hosting UIKit), which is the right granularity for a
migration-shape candidate. Round 7's named-only-UIKit session
explicitly flagged this as the load-bearing miss — Kenji's daily
work *is* the SwiftUI ↔ UIKit boundary. Now it's a tickable
service. **Honest-shape signal restored.**

### Finding 3 — `accessibility` service captures the JIS X 8341 / bank-audit discipline. **PASS.** (Severity: positive)

`src/data/technologies.json:4609`. Service id `accessibility`,
label "Accessibility (UIAccessibility / VoiceOver / Dynamic Type)".
Bank-app candidate with regulated accessibility discipline can
now tick this in the UIKit card *separately from* the methodology
chip on the right strip. Two-channel signal: methodology chip
attests to "practice exists at this team," service tick attests
to "the candidate touches the UIKit accessibility APIs in their
own code." Round 8 had only the methodology chip; round 11 closes
the loop. **Honest depth signal.**

### Finding 4 — `enterpriseStillUsed: true` at root level is correct framing but slightly under-aimed. **MINOR DESIGN CONCERN.** (Severity: low)

`src/data/technologies.json:4599`. Root-level flag. Per
`scoring.ts:330`, root-level flag triggers reassurance only on
Yellow bands. For Kenji (8/10 = 80% Green), it doesn't fire — correct.

The flag's *intended* trigger is the case Hiro will see next week:
a UIKit-only candidate (no SwiftUI experience) at e.g. 4/10
coverage = 40% = Yellow, where "still widely used in many
enterprise applications" reassures the HM that UIKit-only-in-2026
isn't a red flag. That's the right framing — UIKit is exactly the
"legacy-but-active" shape the flag was designed for (Spring Boot,
Selenium 3, Cypress 10-11 are siblings).

**The gap:** the flag at root level means it fires on *any* Yellow
the candidate lands on. Including the 5/10 = 50% case (Yellow,
mid-band coverage). That's borderline — a candidate with 50% UIKit
coverage might be a tutorial-grade dabbler (not enterprise
defensible) just as easily as a focused-specialist (enterprise
defensible). The reassurance copy reads identically.

Worth considering for round-12: split the flag to tier-level so
Yellow band 25-50% (low-mid Yellow) doesn't fire the reassurance
but 50-66% (high Yellow) does. That mirrors what Selenium 3 and
Cypress 10-11 do — they declare the flag *only* on the specific
legacy tier where it's defensible, not on every Yellow.

But: this is a coverage-band design discussion, not a round-11
ship blocker. **The flag at root is correct for the v1 ship.**

### Finding 5 — Service list misses three canonical UIKit patterns Kenji uses in production. **MEDIUM CATALOG GAP.** (Severity: medium)

Reading the 10 services with Kenji's daily-work lens, three things
are missing that any senior native iOS engineer in 2026 does
weekly:

- **App lifecycle in UIKit** — `UIApplicationDelegate` /
  `UISceneDelegate` / `UIWindowSceneDelegate`. This is the
  multi-window / scene-based architecture that came in iOS 13 and
  has been the canonical app entry-point since. The current
  service list has `view-controllers` (UIViewController-level
  lifecycle) but not *app*-level lifecycle. Push notifications,
  background fetch, state-restoration, multi-window iPad support
  — all live here. A candidate who's been on UIKit for 9 years
  has strong opinions about whether the team uses
  `application(_:didFinishLaunchingWithOptions:)` or pure scene
  delegate. **This is a genuine miss for senior iOS** — not for
  juniors who haven't touched the delegate plumbing.

- **Push notifications / background tasks** —
  `UNUserNotificationCenter` registration, APNs token handling,
  `BGTaskScheduler` background fetch + processing. For a banking
  app, push is core (transaction confirmations, balance alerts).
  Kenji ships push code monthly. The service list has no slot for
  this — Hiro can't tick it. It would otherwise show up as a
  named-only entry or get folded into "view-controllers" which is
  inaccurate.

- **Custom UI / drawing (CoreGraphics / `UIView.draw(_:)`)** — for
  custom controls, charts, signature capture. Kenji's app has a
  custom signature-capture screen for KYC and chart widgets. The
  current list has `core-animation` (CALayer / CAAnimation, which
  is the *animation* side) but no slot for the *drawing* side. A
  candidate who's drawn custom controls can't signal that here.

None of these blocks the round-11 ship — Kenji still lands Green
at 8/10 because the items he *can* tick are honest. But for
**round-12 catalog refinement**, recommend extending UIKit to
12-13 services with these additions. The 66%-Green-floor stays
unchanged in absolute service-count terms (8/12 = 67% still
Green; 8/13 = 62% slips to Yellow — would require tweaking the
threshold or accepting more candidates land in Yellow band, which
is honest given UIKit is a deep surface).

### Finding 6 — `enterpriseStillUsed` reassurance gating for a senior who legitimately uses UIKit. **DESIGN GAP NAMED.** (Severity: low / design)

Counterfactual: imagine a different candidate — a senior iOS
engineer at a *non-migrating* shop where UIKit is 100% of the app
(no SwiftUI roadmap; team made an explicit "we're staying on
UIKit" call). Coverage 9/10 = 90% Green. enterpriseStillUsed
doesn't fire — correct, Green doesn't need softener.

Now imagine a slightly different candidate — same shop, 6/10
coverage = 60% Yellow. The reassurance note fires: "Still widely
used in many enterprise applications." Reading as the HM, the
note's framing implies *legacy*. But for this candidate, UIKit
isn't legacy — it's current. The team's not migrating; UIKit is
the active framework for them in 2026.

The note is *technically true* and the verdict is *correctly
Yellow* (60% coverage is honest mid-band Yellow), but the
softener's framing ("still widely used") leans toward
legacy-reassurance when this candidate is actually
current-but-narrow. Senior + Yellow + enterpriseStillUsed today
reads to the HM as "they're on the dying tech but it's OK." For
the *migrating-shop* candidate (Sarah/Spring shape, Kenji at half
the codebase), that framing is honest. For the
*staying-on-UIKit* candidate, it isn't.

**Suggested fix path for round-12:** soften the copy from "Still
widely used in many enterprise applications" to something more
neutral — e.g. "UIKit remains a primary iOS framework in 2026;
many production apps mix it with SwiftUI." That avoids the
legacy-implication while keeping the reassurance.

Or — and this is the bigger refactor — gate the note on the
candidate's *SwiftUI* tier signal: if the candidate has no
SwiftUI card OR explicitly notUsed-SwiftUI, frame as
"UIKit-primary shop"; if they have a Green SwiftUI card alongside
the Yellow UIKit, frame as "migration shape." The data is there;
the wiring isn't.

Round-7 7B's neutral-wording fix for the recency softener
("returning to it or deliberately moved off") is the precedent —
the asymmetric story matters more than the symmetric softener
copy. Same principle applies here.

**Not a round-11 blocker.** Tagged for round-12 design discussion.

### Finding 7 — Sub-template + UIKit catalog combo eliminates the "named-only for half the work" tax. **PASS.** (Severity: positive)

Compare named-only count across rounds for the same Kenji persona:

| Round | UIKit handled as | Named-only count | Greens | Mobile radar weight |
|-------|------------------|------------------|--------|---------------------|
| 7     | Named-only      | 6                | 2      | 3.0 (from 2 techs)  |
| 8     | Named-only      | 6                | 2      | 3.0 (from 2 techs)  |
| 11    | **Checklist**   | **5**            | **3**  | 3.0 (from 3 techs)  |

Same call, same persona, same answers — the report now has a real
verdict for half of Kenji's daily code. The team-interview prep
has UIKit service-list to drive deep-dive probes off. **This is
the exact gap rounds 7-8 named; round 11 closed it.**

### Finding 8 — `suggestedProbes` list is honest and senior-aimed. **PASS.** (Severity: positive)

`src/data/technologies.json:4612-4617`. Four probes:

1. Programmatic Auto Layout vs Storyboards — preference + why.
2. Diffable data sources — migrated from index-path or still on legacy.
3. SwiftUI migration story — incremental adoption strategy.
4. Last UIKit performance issue debugged — cause.

All four are senior-aimed (architect / lead probes, not
junior-knowledge probes). The diffable-data-sources one
specifically discriminates "migrated last year" (senior shape) from
"never heard of it" (junior). The SwiftUI-migration-story probe
catches the exact Kenji shape. Last-perf-issue is the canonical
senior-iOS probe and lands here. **Probe list is well-targeted.**

### Finding 9 — `checklistGuidance` copy is honest and frames the legacy-but-active shape correctly. **PASS.** (Severity: positive)

`src/data/technologies.json:4618`. Reads: "UIKit is the legacy-but-active
iOS UI framework — most production iOS apps in 2026 still have
substantial UIKit surface during SwiftUI migration. Diffable data
sources + SwiftUI interop + accessibility discipline signals a
senior iOS engineer who's bridging eras; tutorial-level UIKit is
storyboards-only."

Two things this gets right:

- Calls out the three senior-discriminator services explicitly
  (diffable, interop, accessibility) — those are exactly the
  ones Kenji ticked and they're exactly the ones a junior wouldn't.
- "Tutorial-level UIKit is storyboards-only" is the right negative
  framing — junior who only ticks storyboards-xibs is genuinely
  tutorial-shape, and the copy gives the recruiter the lens to
  read that.

**Honest catalog copy.** Better than the round-8 named-only
experience by a wide margin.

---

## 5. Round-11 verdict

**SHIP. The UIKit catalog entry is the headline round-11 deliverable
and it lands the way rounds 7-10 said it should.**

What the round-11 batch fixed for Kenji's session:

- Half of his daily work is now visible on the report (was
  named-only, now checklist with verdict + services + probes).
- `swiftui-interop` and `accessibility` services exist and tick
  cleanly — the two load-bearing senior-discriminator surfaces
  from round 7's named-only complaint.
- Named-only count dropped from 6 → 5; Green tech count rose from
  2 → 3. Team interview now has UIKit signal to deep-dive on.
- `enterpriseStillUsed` flag correctly stays silent on Kenji's
  Green band (would fire on a different candidate's Yellow band —
  honest legacy-reassurance framing for the migrating-shop case).
- `suggestedProbes` and `checklistGuidance` are senior-aimed and
  honest. No tutorial-shape over-claim risk for the catalog as
  shipped.

What's left for round-12 (not blockers; honest catalog-evolution
debt):

- **Three canonical UIKit surfaces missing** (Finding 5):
  app/scene lifecycle, push notifications / background tasks,
  custom drawing (CoreGraphics). Senior iOS does these weekly.
- **enterpriseStillUsed copy framing** (Finding 6): "Still widely
  used in many enterprise applications" leans legacy. Doesn't fit
  the staying-on-UIKit-by-design candidate. Either soften the
  copy or gate on the candidate's SwiftUI signal.
- **enterpriseStillUsed band granularity** (Finding 4): root-level
  flag fires on every Yellow, including thin coverage (25-50%)
  where "still widely used in enterprise" can over-soothe a
  tutorial-grade candidate. Sibling catalog entries (Selenium 3,
  Cypress 10-11) gate on tier; UIKit could too.

Net: the round-11 ship is honest, clean, and recovers a known
named-only gap. The follow-up notes are catalog-evolution items,
not round-11 holds. **Recommend merge.**

---

**Call duration: 7:55. Net Green count: 3 (Swift 6.0, SwiftUI lifted,
UIKit 8/10). Named-only: 5 (down from 6). Total report: 3 catalog +
5 named-only + 4 methodology chips = 12 signals across a roughly
8-minute window. Efficient.**
