# 03 — Kenji Watanabe redux (Senior iOS, phone)

**Round 8 / 2026-05-17 — post-7F validation.**
Channel: Phone, 8 min. Recruiter: Hiro (internal recruiter, fluent JA/EN).
Primary lens: does the new `mobile-ios` sub-template (7F) feel right
for a pure-native senior iOS candidate?

---

## 1. Persona inhabited

Kenji Watanabe, 37, 9 years iOS engineering at a Tokyo Japanese-mobile-bank
fintech. Pure native iOS for his entire career — has *never* written an
Android line, *never* used React Native / Flutter / Expo in production.
Currently the lead engineer on a 4-year-old banking app's
UIKit → SwiftUI migration; reviews Swift PRs from a team of four.

Current stack as of today:

- Swift 6.0 (team upgraded last sprint).
- SwiftUI, ~6 months in production — used for all *new* screens
  (transfers, statements, KYC flow); older screens (account list,
  login, settings) are still UIKit and will stay UIKit until at least
  Q3 2026.
- Combine, Core Data, CloudKit sync, Xcode Cloud for CI, Fastlane for
  TestFlight / App Store delivery.
- MVVM-C (coordinator pattern). Snapshot tests via
  iOSSnapshotTestCase. VoiceOver + Dynamic Type discipline (regulated
  industry — bank app, JIS X 8341 compliance audit annually).
- Feature flags via a custom in-house telemetry SDK
  (no LaunchDarkly / Firebase — fintech compliance keeps everything
  on-prem).

Senior, working on the architect-of-his-app side but operator on the
codebase. Calm on the phone, picks his words; Hiro has to leave space.

---

## 2. Phone call — abbreviated

**Hiro picks template on Landing.** Lands on `/`, sees the role grid.
After 7F there are now 16 cards total (15 named roles + Custom).
Three Mobile cards sit next to each other in the same row:
*Mobile — Android*, *Mobile — iOS*, *Mobile — Cross-Platform*. Hiro
clicks **Mobile — iOS**.

**Assessment screen loads with 2 preloaded tech cards: Swift + SwiftUI.**
That's it. The methodology-chips strip on the right shows 6 chips:

1. Release automation (Fastlane / Xcode Cloud)
2. MVVM-C / Coordinator pattern
3. Snapshot testing (Point-Free / iOSSnapshotTestCase)
4. VoiceOver / Dynamic Type accessibility
5. A/B testing + feature flags
6. App Store Review automation + binary delivery

**Hiro (00:30):** "Kenji-san, just to set the scene — 8 minutes, I'm
going to ask about your iOS stack, take some notes, then we'll
schedule the technical deep-dive with the team. OK to go?"

**Kenji:** "Hai, OK."

**Hiro (00:50):** "What Swift version are you on?"

**Kenji:** "Swift 6.0. We upgraded last sprint — strict concurrency,
Sendable, the whole thing."

Hiro types `6.0` in the Swift card. Card flips green — **"Excellent"**
— no enterprise reassurance note attached (7E removed Swift's root
`enterpriseStillUsed`, and 6.0 is above the Excellent floor anyway so
the flag wouldn't have fired even pre-7E). Clean.

**Hiro (01:30):** "SwiftUI — I see we have a checklist of 10 areas.
Which ones have you actually used in production?"

**Kenji:** "We're 6 months in on SwiftUI. So… state — @State, @Binding,
@ObservedObject — yes. We're on iOS 17 so we're starting to migrate to
@Observable, partial there. Navigation — NavigationStack, yes, for all
new screens. Animations, yes, basic ones. UIKit interop — heavy, every
new screen has at least one UIViewRepresentable for our legacy chart
widget. async/await integration — yes."

Hiro ticks: state-binding, observation-framework, navigation-stack,
animations, uikit-interop, async-await-integration. **6 of 10.**

Card flips green — **"Good — 6/10 services"** (6/10 = 60%; the
checklist threshold is `≥66% Green / 25-66% Yellow / <25% Red`, so 60%
is **Yellow Review/Probe**). Wait — actually let me re-read this on
the screen. Yes: Yellow. 6/10 = exactly 60%, below the 66% Green floor.

**This is a UX moment.** Hiro is typing notes and notices the card
went yellow even though Kenji clearly has Good SwiftUI signal. The
label reads *"Review / Probe — 6/10 services"*. Hiro could probably
get to Green by ticking depth=`deep` (round-6 6D adds qualified
depth-lift on checklist when coverage ≥ 40% and depth is
deep/very-deep — that fires here). Hiro clicks the depth dropdown,
picks "Deep (built features end-to-end)". Card flips green:
**"Good (lifted from Review / Probe by depth) — 6/10 services"**.
Better.

**Hiro (03:00):** "What else is in your stack? Combine, Core Data, that
kind of thing?"

**Kenji:** "Combine — yes, heavy. Core Data + CloudKit sync, yes.
Xcode Cloud for CI. Fastlane for App Store. We have a custom
telemetry SDK for feature flags — built in-house, not LaunchDarkly."

Hiro tries to add each. Search → "combine" → no match in catalog.
Same for "core data", "cloudkit", "xcode cloud", "fastlane". Hiro adds
each one as a **named-only entry** (the free-text "+ Add named-only
tech" path that round-3 surfaced). Five named-only chips added —
each shows up on the report as "Named by candidate; not in catalog".

**Hiro (04:30):** "UIKit — you said the older screens are still UIKit.
Half the app?"

**Kenji:** "Hai. Login, account list, settings, transactions list —
all UIKit. We won't be done migrating until Q3, maybe Q4 next year.
I still write UIKit code every week. Code reviews are 50/50 SwiftUI
and UIKit."

Hiro searches "uikit". **No match.** UIKit is not in the catalog.
She adds it as named-only too. **That's six named-only entries for
arguably half of Kenji's daily work**. The named-only chip just says
"UIKit — named by candidate". No verdict, no depth probe, no signal.

**Hiro (05:30):** "Architecture-wise — pattern? Tests?"

**Kenji:** "MVVM-C — coordinator pattern. We've used it from before
SwiftUI; it works fine for both. Snapshot tests with
iOSSnapshotTestCase across the whole UI surface. VoiceOver and
Dynamic Type — required for bank-app regulatory audit, we test it
every release. Feature flags are our own telemetry SDK."

Hiro ticks 4 of the 6 chips:

- MVVM-C / Coordinator pattern (cleanly matches)
- Snapshot testing (Point-Free / iOSSnapshotTestCase) (exact match)
- VoiceOver / Dynamic Type accessibility (exact match)
- A/B testing + feature flags (close enough — the chip is generic
  enough to absorb Kenji's custom-SDK case)

Skipped chips:

- Release automation (Fastlane / Xcode Cloud) — Hiro had already
  added Fastlane and Xcode Cloud as named-only techs and forgot to
  loop back to the chip. **Minor double-capture risk** — though the
  named-only chip names the tools and the methodology chip names the
  *practice*, so they aren't quite redundant.
- App Store Review automation + binary delivery — not asked. Genuine
  miss on Hiro's part; would have ticked if probed.

**Hiro (07:00):** "Last thing — last time you wrote Android or React
Native?"

**Kenji:** "Never. Pure iOS, 9 years."

Hiro has nothing to click here because the iOS sub-template
**doesn't preload kotlin / jetpack-compose / react-native / flutter
/ expo at all** — none of those cards are on screen, so there's no
"not in candidate's stack" tax to dispatch. Compare to round-7,
where the single Mobile template forced Kenji to dispatch 5
not-in-stack clicks on Android + cross-platform cards. **Today: 0
not-in-stack clicks.** ~20–25 seconds saved.

**Hiro (07:40):** "ありがとう. I'll send the summary to the team
this afternoon."

Call ends at 7:50. Hiro flips to Summary.

---

## 3. Post-call: report read

Summary screen renders. The headline card row:

```
Strengths: 2    Probe: 0    Concerns: 0    Methodology: 4    Named-only: 6
```

Tier breakdown:

- **Strengths (Green):**
  - Swift / iOS — *Excellent* (6.0)
  - SwiftUI — *Good (lifted from Review / Probe by depth) — 6/10
    services*. No enterprise note.

- **Probe / Concern:** empty. No yellows, no reds.

- **Methodology chips ticked (4 of 6):**
  - MVVM-C / Coordinator pattern
  - Snapshot testing (Point-Free / iOSSnapshotTestCase)
  - VoiceOver / Dynamic Type accessibility
  - A/B testing + feature flags

- **Named-only by candidate (6):**
  - Combine
  - Core Data
  - CloudKit
  - Xcode Cloud
  - Fastlane
  - **UIKit**

Radar chart renders with Mobile category at 3.0 (max), all other
categories empty. Visually the radar is a single triangle — not great,
but accurately reflects "we screened iOS depth, nothing else".

PDF export: ~280 KB, 2-page A4, both Swift and SwiftUI cards render
cleanly with their tier badges. The 6 named-only entries appear in
their own section with a "Named by candidate; not in catalog" tag.
The Mobile-radar-only chart looks visually sparse but that's honest.

---

## 4. Findings

### Finding 1 — `mobile-ios` template preloads exactly 2 techs as advertised. **PASS.** (Severity: positive)

`src/data/roles.ts:265-277`. Template id `mobile-ios`,
`techIds: ['swift', 'swiftui']`. No kotlin / jetpack-compose /
react-native / expo / flutter contamination. This was the explicit 7F
ship target and it landed clean. Round-7's 5-not-in-stack-click tax
on Kenji is gone. Estimated ~20–25 s saved on the call.

### Finding 2 — 6 iOS-canonical chips shipped; names land close to spec but not identical. **MOSTLY PASS** (Severity: low / cosmetic)

`src/data/roles.ts:269-276`. Six chips shipped, matching the chip
count target. **Actual names vs. cast-spec phrasing:**

| Cast-spec implied label                 | Actual `roles.ts` label                                              |
|------------------------------------------|----------------------------------------------------------------------|
| Release automation (Fastlane)            | Release automation (Fastlane / Xcode Cloud)                          |
| MVVM-C                                   | MVVM-C / Coordinator pattern                                         |
| Snapshot testing                         | Snapshot testing (Point-Free / iOSSnapshotTestCase)                  |
| VoiceOver                                | VoiceOver / Dynamic Type accessibility                               |
| Dynamic Type                             | (folded into the VoiceOver chip — so only 6 total, not 7)            |
| Feature-flag telemetry-style             | A/B testing + feature flags (generic, not telemetry-specific)        |
| —                                        | App Store Review automation + binary delivery (extra, not in spec)   |

Two notes:

- The cast-spec listed VoiceOver and Dynamic Type as separate chips
  (would have been 7); the ship correctly folds them into one
  ("VoiceOver / Dynamic Type accessibility"). This is the right call
  — they're the same iOS accessibility-discipline practice and
  recruiters tick both or neither.
- The feature-flag chip ("A/B testing + feature flags") is more
  generic than the cast-spec's "telemetry-style" phrasing. For Kenji
  this still ticks cleanly — his custom in-house telemetry SDK is
  feature-flagging-and-A-B — but a recruiter reading the chip cold
  might not realize it covers self-hosted / in-house cases. The
  Backend chip (7A) uses "Feature flags (Unleash / LaunchDarkly /
  OpenFeature)" — that's more concrete. Consider naming the chip
  vendors as exemplars even on iOS (e.g. "A/B testing + feature
  flags (LaunchDarkly / Firebase / in-house SDK)") to make it ring
  more truly across the spectrum. **Not a blocker; cosmetic.**

### Finding 3 — Swift 7E flag removal is clean for Kenji's Swift 6.0 case. **PASS.** (Severity: positive)

`src/data/technologies.json:979-1012`. Swift entry has no root-level
`enterpriseStillUsed`. Swift 6.0 hits the Excellent Green tier with
no reassurance note attached. **The verdict is honest: 6.0 is
current, no softener needed.**

### Finding 4 — Counterfactual: Swift 5.5 candidate post-7E reads as plain "Good — async/await era." **PASS** (Severity: positive)

Cast spec asked: does losing the enterprise note make older-Swift
candidates seem worse?

Walked through it in my head against `src/data/technologies.json:989-994`:
the Swift 5.5 tier is **Green/"Good"** with `note: "async/await era."`
— it's still in the Green band, not Yellow. So a Swift 5.5 candidate
gets *Good (async/await era)* with no enterprise softener — and
that's correct because Green doesn't need an enterprise softener.
The softener was misfiring on the Yellow band anyway (which kicks in
at 5.0–5.4, i.e. *pre*-async/await). Even there, the Yellow tier in
the catalog has no note and no flag, so the candidate now reads as
"Review / Probe" plainly — which is accurate; pre-async-await Swift
in 2026 *is* a probe-this signal, not a soothing one. **7E's Swift
removal is defensible across the version space, not just at 6.0.**

### Finding 5 — UIKit catalog absence is the largest residual gap. **CONFIRMED CONCERN.** (Severity: medium — round-7 cross-cut still open)

This is the same issue round 7 flagged and 7F explicitly did NOT
fix (deferred as ~30 min of catalog work). Round-8 simulation
confirms it's still load-bearing:

- Kenji writes UIKit every week. Half the app is UIKit. UIKit is
  arguably the **dominant** technology on his daily-work axis.
- It does not exist in `src/data/technologies.json` (verified — no
  catalog entry for `uikit`).
- The named-only fallback captures the *name* and nothing else: no
  version (UIKit is iOS-SDK-version-bound, fine), no checklist of
  practices (View lifecycle / Auto Layout / UICollectionView
  diffable data sources / `viewDidLoad`-vs-SwiftUI bridge / etc.),
  no methodology probe. **The hiring manager reading the report
  sees a 6-of-6 named-only stack and the visible verdict is only
  about SwiftUI.** That visibly under-represents Kenji's actual
  strength.

Did 7F's mobile-ios sub-template close this gap implicitly? **No.**
The chip-set is methodology-orthogonal and doesn't help. The
MVVM-C chip captures the *architecture* layer; nothing captures
the *framework-fluency* layer for UIKit. SwiftUI gets a 10-service
checklist; UIKit gets nothing.

**Recommendation:** UIKit needs its own catalog entry as a
checklist-mode tech (version-mode doesn't really fit — UIKit is
iOS-SDK-version-bound). Suggested service list, ~8 items: View
lifecycle / Auto Layout / Storyboards-vs-programmatic /
UICollectionView (diffable data sources) / UITableView /
UINavigationController + child view controllers / SwiftUI
interop (`UIHostingController` + `UIViewRepresentable`) /
Performance & instruments (UIKit-specific profiling). Add to the
`mobile-ios` preload list so the template ships 3 techs not 2.
Promoting from "deferred ~30 min" to "next round priority"
feels right — round-8 confirms it's the residual blocker.

### Finding 6 — SwiftUI 6/10 services = exactly 60% → Yellow despite being clearly Green-shape. **MINOR but recurring.** (Severity: low)

`src/lib/scoring.ts:447-451`. Threshold is `<25% Red / 25-66% Yellow /
≥66% Green`. 6/10 = 60% lands as Yellow until depth-lift fires (which
it does if Hiro picks deep/very-deep, per round-6 6D logic at
`src/lib/scoring.ts:474-482`). Kenji's case ends up Green via the
6D depth-lift path — so the math works — but only **because Hiro
remembered to set depth=deep**. A rushed phone call where the
recruiter forgets the depth dropdown leaves senior SwiftUI
candidates with 6/10 services parked at Yellow.

Not a 7F bug — this is a pre-existing checklist threshold question
that the SwiftUI 10-service surface area surfaces more often than
smaller checklists. Possibly worth a `defaultDepth: working` hint on
the SwiftUI entry, or revisiting whether ≥60% should be Green for
checklists with 10+ services. **Not a round-8 ship issue;
backlog.**

### Finding 7 — "16 templates" vs. cast-spec's "15". **Cosmetic.** (Severity: trivial)

Cast prompt said "15 templates now exist". Actual count in
`src/data/roles.ts` is 16 (counted lines 36-355: fullstack, frontend,
backend, solution-architect, devops, sre, data, database-dba,
data-scientist, ai-ml, mobile-android, mobile-ios,
mobile-cross-platform, security, qa, custom). The spec might be
counting "15 named roles + Custom"; either way, no functional
problem, just numbering hygiene if it matters for ship notes.

### Finding 8 — Methodology chip-set misses iOS-canonical practices Kenji genuinely uses. **Low.** (Severity: low / future round)

The 6 chips cover the big ones, but Kenji's actual methodology
includes:

- **TestFlight delivery workflow** — distinct from "App Store
  Review automation". TestFlight is internal-builds + beta-testing
  discipline. He runs it weekly.
- **Provisioning profile / certificate hygiene** — distinct from
  release automation. The reason Fastlane Match exists. He's the
  team owner of this.
- **App-thinning / bitcode / binary-size budgets** — banks care
  about install size on emerging-market handsets. Equivalent of
  Frontend's "Core Web Vitals" axis.
- **Strict concurrency adoption / Sendable migration** — Swift
  6.0-specific, post-MainActor world. Not a methodology in the
  classic sense, but it's the *story* of a Swift 6 migration in
  2026.

Hiro skipped 2 of 6 chips and would have liked 2 more chips. Net
chip-fit ratio: ~4/8 for Kenji's actual practice. Not bad but not
saturated either.

### Finding 9 — Docker tier-level `enterpriseStillUsed` preserved correctly. **PASS** (Severity: positive — regression check)

`src/data/technologies.json:1268`. The Docker 18-19 Yellow tier
*still* carries `enterpriseStillUsed: true`, and `scoring.ts:309`
correctly does `tier.enterpriseStillUsed ?? tech.enterpriseStillUsed`.
So 7E's removal of Docker's *root* flag didn't accidentally strip
the tier-level softener. A Docker 18.06 candidate today still gets
the "still widely used" reassurance on their Yellow band. Confirmed
no regression in 7E's flag audit.

---

## 5. Round-8 verdict for the iOS sub-template

**SAFE for senior iOS phone screens. AT-RISK for the UIKit-half of the
candidate's work.**

The 7F mobile-ios sub-template is a clear, measurable win for Kenji's
shape: 5 not-in-stack clicks eliminated, ~20-25 s saved on an 8-min
call, methodology chips authentically iOS-canonical (MVVM-C +
snapshot + VoiceOver/Dynamic Type are the 3-of-6 a Tokyo bank-app
iOS lead actually does), and the 7E Swift flag removal is honest
across the version space, not just at 6.0.

The residual concern is **UIKit catalog absence**, and round 8
confirms what round 7 already flagged: it's not a peripheral gap.
Kenji writes UIKit every day, half his code reviews are UIKit, and
the report under-represents his depth because UIKit has no checklist
to anchor signal to. The named-only fallback is honest framing (it
*does* say "named by candidate; not in catalog") but it's a
workaround, not a capture. Recommend promoting UIKit catalog work
out of the "~30 min deferred" pile and onto the next round's ship list.

Two cosmetic notes worth a 10-minute pass at some point:

- Re-name the iOS feature-flag chip to include exemplars
  (LaunchDarkly / Firebase / in-house SDK) so recruiters reading
  it cold know it covers self-hosted cases.
- Consider whether the SwiftUI 10-service checklist should default
  to `working` depth, so 60% coverage on a 10-service surface
  doesn't park as Yellow until the recruiter remembers the depth
  dropdown.

Neither is a 7F-ship regression. Both are pre-existing checklist
behaviors that the iOS sub-template happens to surface more
acutely because SwiftUI has a 10-service list and `mobile-ios`
preloads only 2 cards — so SwiftUI carries proportionally more of
the verdict weight.

**Net round-8 read: 7F shipped what the spec promised, 7E composes
cleanly with 7F for the Swift case, and the remaining UIKit gap is
the same one round 7 named — it just got more visible now that the
not-in-stack noise around it cleared.**
