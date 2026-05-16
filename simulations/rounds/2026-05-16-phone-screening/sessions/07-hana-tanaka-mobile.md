# Session 07 — Hana Tanaka (Mid, iOS Developer)

**Agent:** sim-07
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Mobile Engineer

## 1. Persona inhabited

Hana is a quietly competent 3-year iOS dev at a Tokyo-based streaming/news app
(think TVer or NHK Plus). Her real day-to-day is SwiftUI for new screens,
UIKit for the legacy video player and onboarding flows, Combine for the
playback state machine, and Xcode Cloud nightly TestFlight builds. Production
push goes through Firebase Cloud Messaging but she'd say "I only touch
analytics events." She speaks in short, careful sentences, apologises before
disagreeing, and translates English tech terms to herself before answering —
which on a phone screen reads as hesitation, not lack of knowledge. The
Flutter "side project" was an afternoon following a Medium tutorial on Flutter
2.10 (she still has the old SDK because she never ran `flutter upgrade`). She
has never written a line of Kotlin or React Native and will say so politely.

## 2. Phone call — abbreviated

> R: "Hi Hana — let's start with what you build on day to day."
> H: "Mostly Swift, iOS apps. SwiftUI for new things, UIKit where it's old."
> [Recruiter: loads **Mobile Engineer** template — sees swift / kotlin / react-native / expo / flutter cards. Clicks **Swift**.]
> R: "What version of Swift?"
> H: "Hmm, I just install Xcode and it works. Whatever current Xcode is."
> [Recruiter: clicks **I don't remember**. Sets depth = **Working knowledge**. Leaves scope blank.]
> R: "Cool. Also doing any Android or React Native?"
> H: "No, just iOS."
> [Recruiter: clicks **Not in stack** on Kotlin, React Native, Expo. Three gray cards.]
> R: "You mentioned cross-platform — Flutter?"
> H: "Yes, a side project. Maybe Flutter 2-point-something? Last weekend."
> [Recruiter: clicks **Flutter**, types "2.10", depth = **Shallow**.]
> R: "Backend services?"
> H: "Firebase, but only analytics events. Push notifications too I guess, the team set it up."
> [Recruiter: searches "Firebase" → Database. Adds it. Checklist appears — 12 services. Ticks **Analytics / Events** and **FCM**. Depth = **Shallow**.]
> R: "What about SwiftUI, UIKit, Combine — separate things or all Swift?"
> [Recruiter: searches "SwiftUI". No result. Searches "UIKit". No result. Searches "Combine". No result. Types them into the call notes field on Swift's card — but that field doesn't exist. Moves on.]
> R: "How do you ship builds?"
> H: "Xcode Cloud, then TestFlight."
> [Recruiter: searches "Xcode Cloud" → no result. Searches "Xcode" → no result. Writes a sticky note.]
> R: "OK — last one, any CI tools or testing frameworks?"
> H: "Just XCTest. And Xcode Cloud runs the tests."
> [Recruiter: skips. End of call at 7:30.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Swift / iOS | unknown (toggle on) | working | — | **Review / Probe** (Yellow) + enterprise note "Still widely used in many enterprise applications." |
| Kotlin / Android | — | — | — | Gray **Not in candidate's stack** (excluded) |
| React Native | — | — | — | Gray **Not in candidate's stack** (excluded) |
| Expo | — | — | — | Gray **Not in candidate's stack** (excluded) |
| Flutter | 2.10 | shallow | — | **Review / Probe** (Yellow — `min=2.0` band) |
| Firebase | 2/12 services (17%) | shallow | — | **Concern** (Red — ratio < 25%) |

Summary radar: only **Mobile** and **Database** categories have non-skipped
items, so the radar gets two axes (or falls back if the renderer needs ≥3 —
worth checking; Hana's report may render a near-empty chart). Buckets: 0
Strong, 2 Probe Further (Swift, Flutter), 1 Concern (Firebase), 3 Not in
stack. The headline a hiring manager sees is "0 Green, 1 Red" for a
genuinely competent iOS dev.

## 4. Accuracy judgement

- **Where it's right:** Flutter Yellow is correct — she really is at
  weekend-tutorial depth on a pre-3 SDK. The "Not in stack" exclusions on
  Kotlin/RN/Expo correctly remove false-negative noise that yesterday's
  catalog would have buried her under. Firebase Red on 2/12 services is
  technically defensible since she only touches analytics.
- **Where it over-rates:** Nothing. There is nothing green to over-rate.
- **Where it under-rates:** **Swift.** The verdict is "Yellow, probe further"
  with the enterprise reassurance note — for a 3-year full-time iOS engineer
  whose entire production app is shipped in Swift. The "I don't remember the
  version" path treats her like she half-knows Swift; in reality she lives in
  it daily and the version is genuinely irrelevant because Xcode pins it. The
  tool conflates *"can't quote the version"* with *"unclear competence"*,
  and on iOS the former is the norm even for seniors.
- **Where it under-rates (2):** **Firebase Red** is structurally wrong for
  the situation. Hana isn't a Firebase user who failed to learn it — she's an
  iOS dev for whom Firebase is a peripheral SDK her backend team owns. The
  Red badge punishes scope mismatch as if it were ignorance. The
  newly-shipped `scope` field could fix this (she's effectively an **author**
  of the analytics-event calls, not an **operator** of the Firebase suite),
  but the recruiter is highly unlikely to know that distinction mid-call and
  scope is undefined by default.
- **Where it's silent on something a hiring manager would need to know:**
  Everything that defines her actual seniority. **SwiftUI vs UIKit split,
  Combine vs async/await, Xcode Cloud vs Bitrise, XCTest coverage habits,
  push-notification entitlements work, App Store Connect ownership** — none
  appear on the report. A hiring manager reading the PDF would see a Yellow
  Swift entry, a Red Firebase entry, three gray exclusions, and a Yellow
  Flutter tutorial, and reasonably conclude "weak candidate." The actual
  signal — *she's a solid 3-year iOS engineer with a SwiftUI/UIKit mixed
  codebase* — is not in the report at all.

## 5. Friction during the call

- **Catalog search dead-ends** on SwiftUI, UIKit, Combine, Xcode Cloud,
  XCTest. Five "no result" lookups in a 7-minute call. The recruiter ends up
  with sticky notes outside the tool — exactly the workflow TechVet is meant
  to replace.
- **Swift's `suggestedProbes` mentions "SwiftUI vs UIKit?"** but a phone
  recruiter cannot use suggested probes mid-call — they're inside the
  guidance panel, not surfaced as a checklist Hana could be walked through.
  The probe exists in the data and is wasted.
- **"I don't remember" toggle on Swift is misleading.** Hana didn't forget —
  the question is malformed for her ecosystem. There's no third option for
  "version is determined by toolchain, not by candidate."
- **Firebase checklist is generic.** None of the iOS-specific tells (FCM
  entitlements, APNs handoff, App Check on iOS, Firebase Performance for
  iOS startup metrics) are differentiable from the Android equivalents.
- **Scope field is new today but recruiter doesn't reach for it.** It sits
  between Depth and Last used; on a 7-min phone screen the recruiter would
  not stop to classify Hana as `author` vs `operator` on Firebase. The
  default-undefined behavior means the new axis silently does nothing in
  the most common call mode. (Not a bug, but the rollout will need
  recruiter-side affordances or it'll be invisible.)

## 6. Bugs / structural defects

1. **iOS-ecosystem catalog blindness.** What it is: SwiftUI, UIKit, Combine,
   Xcode Cloud, XCTest, CocoaPods, SPM, Alamofire are all missing as
   first-class entries. Why it matters: iOS competence is *expressed* through
   exactly these tools; Swift-the-language is a poor proxy. A 3-year iOS dev
   leaves a phone screen with effectively one scored tech (Swift, Yellow).
   Evidence: `src/data/technologies.json` Mobile section contains only
   `swift, kotlin, flutter, react-native, expo`; grep for `swiftui|uikit|
   combine|xcode|cocoapods` returns only `suggestedProbes` strings.
   **Severity: High** for any iOS or mobile-heavy recruiting use.

2. **Unknown-version + meaningful depth fires enterprise note on Swift.**
   What it is: post-bug-5 fix from yesterday, the `enterpriseStillUsed`
   reassurance only fires when `depth ≥ working`. Hana has working depth, so
   she gets *"Still widely used in many enterprise applications"* on a
   modern, current-day language she actively builds in. The note is designed
   for "candidate is on Cypress 10 because the org won't migrate" — it reads
   absurdly on a recruit whose stack is the canonical current stack.
   Evidence: `src/lib/scoring.ts:131-146`. **Severity: Medium** — note text
   misleads when it fires on healthy-current-stack techs that happen to also
   carry the enterprise flag (Swift, Java, Spring, etc.).

3. **No "version is N/A — toolchain-pinned" affordance.** What it is: Apple
   ecosystem, Android SDK, .NET workloads, and managed runtimes (GHA, Vercel)
   pin versions outside the developer's control. The only escape hatch is
   "I don't remember", which scores identically to genuine forgetting.
   Evidence: only `unknownVersion` boolean in `AssessmentItem`. **Severity:
   Medium** — recurs across personas (Alex Tan in yesterday's round hit
   this on Xcode; the underlying gap remains).

4. **Checklist-Red for peripheral SDK usage.** What it is: Firebase ratio
   <25% returns Red unconditionally. For a candidate whose role legitimately
   only requires 2 services (analytics, push), a Red verdict is a
   role-mismatch signal, not a competence signal — but the report renders
   it as competence. The new scope axis *could* relieve this (`reviewer` /
   `author` cap at Yellow), but scope only **caps** Green; it doesn't
   **raise** Red. So a peripheral-but-correct user remains Red.
   Evidence: `src/lib/scoring.ts:252-258` — `applyScope` cannot improve
   Red→Yellow even when scope explains the low coverage. **Severity:
   Medium-High** for any candidate whose ratio is low *because their role
   is narrow*, not because they're unqualified.

5. **Radar may degenerate on iOS-only candidates.** What it is: Hana ends
   with Mobile (2 items) and Database (1 item) non-skipped — possibly only
   two axes on the radar. CLAUDE.md flags "Single-category radar fallback"
   as priority #12, so a two-axis case is not explicitly handled either.
   Evidence: needs verification in `src/screens/Summary.tsx`; flagging as
   structural for the cross-cut. **Severity: Low** (cosmetic, but it ends
   up in the PDF the hiring manager sees).

## 7. Catalog gaps

- **SwiftUI** — UI framework, deserves its own version-tier entry (1.0 / 2.0
  / 3.0 / 4.0 / 5.0+) and probe set (state management, navigation API, iOS
  16 vs 17 APIs).
- **UIKit** — version-mode doesn't fit; checklist-mode on view controllers,
  Auto Layout, diffable data sources, modern collection views.
- **Combine** — version-mode on iOS deployment target; probes on backpressure,
  schedulers, vs async/await migration.
- **Xcode Cloud** — CI/CD entry under DevOps or Mobile; probes on workflows,
  TestFlight automation, env management.
- **XCTest / XCUITest** — Testing category; coverage probes, snapshot
  testing, UI test stability.
- **CocoaPods / Swift Package Manager** — Mobile or DevOps; dependency
  management.
- **Firebase iOS-specific services** — APNs handoff, Firebase Performance,
  iOS-only quirks not differentiable in current checklist.
- **Flutter min-version tier needs re-grading.** Current Yellow floor is
  `min: 2.0`; Flutter 2.x is end-of-life and a candidate on 2.10 in 2026
  has not touched it in 2+ years. The yellow band is too generous;
  pre-3.0 should be Red (or recency should catch it — priority #5).

## 8. One-liner for cross-cut

> **Hana — Mobile Engineer — 3-year iOS specialist scores 0 Green / 1 Red on the PDF because SwiftUI / UIKit / Combine / Xcode Cloud / XCTest are all absent from the catalog and the Mobile template is centered on cross-platform Kotlin/RN/Expo she has never touched.**

## 9. Recommendation

Highest-leverage single fix: **catalog refresh to add iOS-ecosystem
first-class entries** (SwiftUI, UIKit, Combine, Xcode Cloud, XCTest) and
split the Mobile template into **iOS-native / Android-native /
Cross-platform** sub-templates. Without this, every iOS specialist
screened on the current Mobile template will produce a misleading PDF.
Secondary, lower-effort fix: surface `suggestedProbes` as a clickable
mid-call probe list inside TechCard so the *"SwiftUI vs UIKit?"* prompt
the catalog already knows about reaches the recruiter while the candidate
is still on the line.

## Disagreement with prior fixes

The scope axis shipped today is the right shape but the wrong direction
for Hana's case. It caps Green→Yellow when the candidate is a
reviewer/architect, which correctly handles Aliyah/Diego/Robin from the
previous round. But it never *raises* Red→Yellow when a low-coverage
checklist result is explained by narrow legitimate scope (peripheral SDK
user, role-bounded usage). Consider an `author`-when-Red→Yellow lift, or
a separate "narrow-by-design" flag the recruiter can set on a checklist
to mean *"this candidate's role only needs this slice."* Otherwise the
new axis is one-sided: it punishes seniors who only review, but does
nothing for specialists whose narrow surface is correct.
