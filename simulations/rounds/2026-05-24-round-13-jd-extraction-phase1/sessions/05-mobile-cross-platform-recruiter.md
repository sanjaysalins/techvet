# Session 05 — Mobile cross-platform recruiter validation (post-fix)

## Persona

Senior mobile recruiter placing for cross-platform Flutter shops with native escape hatches. Day-job is reading JDs like this one — "70% Flutter, 20% native (Swift+SwiftUI / Kotlin+Jetpack Compose), 10% legacy RN being wound down" is a textbook mobile-team shape in 2026 EU health-tech. Sentry + Firebase Crashlytics + mixpanel-style analytics is the unfussy default; Fastlane / Bitrise are commodity build-tooling.

## Extraction at a glance

13 techs extracted. The mobile core (Flutter, React Native, Swift/iOS, SwiftUI, Kotlin/Android, Jetpack Compose, Expo) all came through cleanly, plus Firebase + GitHub Actions. **But three of the 13 are noise** (Spring Boot, PostgreSQL, Go) — two are exclusion-section FPs (Phase 2 territory, known limit), one is a genuine new rules-layer bug (`go_router` → Go).

## Findings

### F1 — Mobile-core extraction is clean ✓ working

Flutter (`flutter`), React Native (`react-native` via the `react native` alias hitting "React Native 0.78"), Swift/iOS (`swift` — both "Swift" and "iOS" sub-terms hit), SwiftUI (`swiftui`), Kotlin/Android (`kotlin` — both halves of "Kotlin / Android" landed), Jetpack Compose (`jetpack-compose`), Expo (`expo`). Every catalog-present headline mobile tech the JD names appears in the result. **F-W1 / F-P1 fixes confirmed not to have regressed mobile extraction.**

### F2 — Firebase appears 3x in JD, extracts once cleanly ✓ working

JD mentions "Firebase Crashlytics" (must-have), "Firebase (Auth + Crashlytics + Remote Config)" (stack), and is implicitly referenced via Crashlytics again. The result has one `firebase` entry with `matched: ["Firebase"]`. Correct dedup behavior — the extractor returns one tech per id regardless of mention count. The sub-services (Auth / Crashlytics / Remote Config) are catalog services on the Firebase entry that Phase 2 should pre-tick (see recs).

### F3 — `go_router` mis-extracts as Go language ✗ blocking (new finding)

JD line 8: `~70% Flutter (Dart 3.6, riverpod, go_router)`. The result extracts `go` (Go/Golang) with `matched: ["Go"]`. The regex `(?<![a-z0-9])go(?![a-z0-9])` treats `_` in `go_router` as a non-alphanumeric boundary, so "go" matches as a standalone term. **This is the same shape as F-W1/F-P1: a structural lookbehind/lookahead gap, not a one-off alias issue.** A mobile recruiter sees "Go (Golang)" on the assessment for a Flutter JD and immediately distrusts the tool. The fix is narrow: extend the boundary class to also reject `_` (treat as identifier-char), i.e. `(?<![a-z0-9_])...(?![a-z0-9_])`. Worth verifying it doesn't regress any current alias.

### F4 — `React` extracted as a standalone language despite only appearing in "React Native" ✗ blocking (new finding)

Result line 38-44: `react` extracted with `matched: ["React"]`. The JD only contains "React Native" (twice). The catalog's `react` entry has `nameSearchTerms` → `["React"]`; the regex `(?<![a-z0-9])react(?![a-z0-9])` matches inside "React Native" because the trailing space is a valid non-alphanumeric boundary. So **React (the library) auto-extracts on any JD mentioning React Native** — false positive on every mobile JD with an RN component. Mobile recruiters will see this on probably ~60% of cross-platform JDs they paste in.

Fix shape: when a longer alias for a *different* tech already matched the same span, suppress the shorter parent match. Concretely, after the per-tech loop, drop `react` matches whose only matched span is contained inside a `react-native` matched span. Implementable as a post-pass over the JD with span tracking.

### F5 — Spring Boot + Postgres extracted from explicit exclusion section ⚠ small (known Phase-1 limit)

JD line 31: "Backend work is owned by a separate team — you won't write Spring Boot or Postgres on this role". Phase 1 flags both. **Not a new bug** — this is the F-C1 negation-context limit from cross-cut.md, confirmed again on a fourth fixture. Worth noting that this JD makes the negation unusually clean ("you won't write X or Y") — a sentence-level Phase 2 prompt would pick this up easily.

### F6 — "Probably not for you: Cordova / Ionic / PhoneGap" — saved by catalog gaps ⚠ small

JD line 29 lists Cordova, Ionic, PhoneGap as anti-patterns. Confirmed catalog has no entries for any of the three — so no FPs landed despite the context-blindness. Pure luck. If recruiters ever ask for Cordova/Ionic catalog coverage, the F-C1 negation gap will bite immediately on JDs of this shape.

### F7 — "We don't ship games — no Unity / Unreal" — catalog gap saves us again ⚠ small

Same shape as F6. Unity / Unreal are not in the catalog (intentionally out-of-scope per CLAUDE.md). No FPs. Phase 2 negation detection would handle this regardless.

## False negatives (mostly catalog gaps, not extractor bugs)

- **Dart** — JD names "Dart 3.6" explicitly (must-have language). **No `dart` catalog entry.** This is a significant gap for any Flutter JD because recruiters assess Dart fluency separately from Flutter framework knowledge. **High-priority new catalog entry.**
- **Sentry** — JD line 17, 26 both name Sentry. Only a sub-service of `observability` (Prometheus/Grafana/OTel) — won't match the parent entry. Same gap as Datadog in session 04. **High-priority new catalog entry or alias-on-observability.**
- **Riverpod / Bloc** — Flutter state management; JD names both. Already represented as Flutter sub-services (confirmed in the Flutter entry's services list — "State management — Riverpod, Bloc, Provider?"). Phase 2 should pre-tick these on the Flutter card; no top-level entry needed.
- **HealthKit / Health Connect** — iOS/Android health-data SDKs. Niche, defer.
- **BLE / GATT** — Bluetooth protocols; appears in Swift/iOS and Kotlin/Android service lists as sub-services. No top-level needed.

## False positives

- `spring-boot` — exclusion-section FP (F5).
- `postgresql` — exclusion-section FP (F5).
- `react` — compound-name leakage from "React Native" (F4).
- `go` — `_` boundary gap on "go_router" (F3).

That's 4 FPs out of 13 extracted = ~31% FP rate on this fixture. Three of the four are new structural findings (F3, F4) or confirmations of known Phase-2 territory (F5).

## Catalog gaps (new-entry candidates)

**High priority:**
- **Dart** (language) — every Flutter JD assesses Dart separately. Naked gap.
- **Sentry** — observability-as-product. Promote out of sub-service.
- **Fastlane** — store-automation tooling; appears in must-have on this JD and is industry standard for iOS/Android release pipelines.

**Medium priority:**
- **Bitrise** — mobile-specific CI; less common than Fastlane but present on this JD.
- **Mixpanel** — product analytics; JD says "mixpanel-style funnels" (recruiter wants to confirm analytics fluency).

**Defer:**
- Cordova / Ionic / PhoneGap (legacy cross-platform — only useful as anti-pattern probes).
- HealthKit / Health Connect (live as platform sub-services).

## Verdict — At-risk

The mobile-core extraction works. But on this fixture **two new structural bugs surface that weren't covered by the round-1 fixes**: F3 (`go_router` → Go via `_` boundary) and F4 (React extracts from "React Native"). Both will fire on essentially every Flutter JD in production. The exclusion FPs (F5) are known Phase-2 territory and don't change the verdict; the new structural FPs do.

After F3+F4 are fixed, this drops to Safe — the catalog gaps (Dart, Sentry, Fastlane) are separate work-tracks.

## Phase 2 LLM scope recommendations (mobile-specific additions)

1. **Negation detection** — fourth confirmation across fixtures. Sentence-level "you won't write X or Y" pattern on this JD is unambiguous; the bullet-list-after-"Probably not for you:" header is also unambiguous. Both should be P0 prompt-scope items (already captured in cross-cut.md).
2. **Compound-name disambiguation** — "React Native" is a single concept, not React + Native. Prompt should be aware that certain compound tech names take precedence over their constituent parts. (Could also be handled at rules layer per F4 fix.)
3. **Sub-service pre-ticking** — "Firebase (Auth + Crashlytics + Remote Config)" should pre-tick those 3 services on the Firebase card. Similarly "riverpod, go_router" should pre-tick Flutter's state-management + routing sub-services. This is the highest-ROI Phase 2 win for mobile JDs because the entire native-modules story lives in sub-services.
4. **Version extraction** — "Flutter 3.41, Dart 3.6, Swift 6, Kotlin 2.0, React Native 0.78" — every framework version is named explicitly on the same line. Trivial prompt win.
5. **"Legacy / winding down" de-ranking** — JD line 10 marks RN as "winding down ... your job isn't migration, just keeping the lights on". Should appear on the card but flagged "review / low priority" rather than auto-checked at depth-deep. Same shape as session 02's optional/pet-peeve de-ranking.
