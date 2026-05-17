# Session 06 — Diego Ramos (Mid-Senior Mobile Cross-Platform, phone, 8 min)

**Round 8 lens:** Does the `mobile-cross-platform` sub-template that 7F shipped
genuinely fit an RN-on-Expo shop, or does it lean toward Flutter / pre-load
competitors as if every cross-platform candidate ships all three frameworks?

---

## 1. Persona inhabited

**Diego Ramos**, 30, 5 yr at a Mexico City consumer fintech (remittance + wallet,
LatAm focus, **not** a regulated bank). Pure React Native for all 5 years —
never wrote production Swift or Kotlin. Owns the RN app end-to-end, ships to
both stores weekly.

- **RN 0.74** (current; new architecture enabled — Fabric + TurboModules)
- **Expo SDK 51** — managed workflow on most features, ejected for the camera flow
- **TypeScript 5.3** — strong types, not a generics nerd
- **React Navigation** v6, **Reanimated** v3
- **react-native-firebase** — push, analytics, Crashlytics
- **Detox** for E2E, **Fastlane** for release automation
- **LaunchDarkly** for JS-layer A/B
- **OTA updates via Expo Updates**, two-store release coordination (iOS vs Play
  Store rollout timing — Play Store staged rollout, App Store phased release)
- Evaluated Flutter ~6 months ago for a greenfield internal app; team stayed RN
  (TS overlap, existing infra, Expo's deploy story). Diego has played with it
  but has shipped exactly zero lines of Dart to production.

**Recruiter:** Camila — bilingual ES/EN, calling on behalf of a US LatAm-focused
remote-first startup. 8-minute phone slot. Diego is on a coffee break between
standup and a release-cut meeting.

---

## 2. Phone call — abbreviated transcript

> *Time 00:00 — Landing page. Camila has Diego's CV open in a tab.*

**Camila:** Hola Diego, gracias por hacer el hueco. ¿Te puedo hacer la llamada
en inglés? El hiring manager va a leer mis notas.

**Diego:** Sure, English is fine.

**Camila:** *[picks "Mobile — Cross-Platform" template, seniority = Mid-Senior,
channel = Phone]* — OK, the tool just loaded React Native, Expo, and Flutter
for me. Your CV says React Native heavy. Let me start there. What version are
you running in production?

**Diego:** 0.74. We pushed to 0.74 about three months ago, mainly for the new
architecture.

**Camila:** *[types "0.74" into RN card]* — Good, that lands Green. New
architecture — Fabric and TurboModules?

**Diego:** Both, yeah. We migrated the camera flow first because we had a
native module there anyway. The rest of the app is on the interop layer for now.

**Camila:** *[sets RN depth = deep, scope = operator, lastUsed = current]* —
And Expo — managed or bare?

**Diego:** SDK 51. Mostly managed, we use EAS Build and EAS Update. The camera
flow is on a prebuild because we needed a custom native module for hardware
keys — local prebuild, not full eject.

**Camila:** *[types "51" into Expo card, depth = deep, scope = operator]* —
Got it. Two-store releases — how do you coordinate iOS phased rollouts with
Play Store staged ones?

**Diego:** We pin a JS bundle hash to a binary submission. iOS goes first
because review is slower, then we cut Play Store the next morning at the same
percentage. Hotfixes go via EAS Update — JS-only, no review queue.

**Camila:** *[wants to capture this. Looks at the methodology chips. "Release
automation (Fastlane / EAS Build / Codemagic)" — ticks it. Notices there's
nothing for "two-store rollout coordination" or "OTA discipline" specifically.
Free-texts: "two-store rollout coordination + EAS OTA pinning"]*

**Camila:** What about the camera flow native module — did you write that
yourself?

**Diego:** Yeah, Swift and Kotlin sides both. It's the only native code I've
shipped though — and Swift was painful because I'm self-taught on it.

**Camila:** *[notes this. Ticks "Native bridge / perf tuning + JS thread
budget" chip — close enough, though it's not really "native bridge" in the
2026 TurboModules sense.]* — Performance — Hermes, FPS budgets?

**Diego:** Hermes since 0.70, yeah. We've got a 60fps JS thread budget for the
swipe transactions screen. Reanimated 3 on the worklet path, InteractionManager
for non-critical work after navigation.

**Camila:** *[adds "Reanimated 3" as free-text named-only — not in catalog]* —
What about state? Redux?

**Diego:** No, Zustand for global, React Query for server state. We moved off
Redux ~2 years ago.

**Camila:** *[adds "Zustand + React Query (mobile state)" as free-text. Doesn't
add to a tech card since they're not preloaded and she's running short.]* —
Testing — Detox?

**Diego:** Detox for E2E on a CI runner. Jest + RTL for unit. Crashlytics on
Firebase for error budgets.

**Camila:** *[free-texts "Detox + Jest + RTL + Firebase Crashlytics". Doesn't
add Firebase as a tech card — Diego is using it for push + analytics +
Crashlytics, not as a BaaS database.]*

**Camila:** Feature flags?

**Diego:** LaunchDarkly at the JS layer. Same flag set for both platforms, we
gate by SDK version when we need to.

**Camila:** *[ticks "Feature flag SDK choice + rollout discipline" chip]* —
TypeScript?

**Diego:** 5.3, strict mode, no `any` allowed by lint. Not a generics wizard
but I read library types fine.

**Camila:** *[adds typescript tech card on the fly, types "5.3", depth = working,
scope = operator. Lands Good (Green).]* — One more — your CV mentions you
evaluated Flutter. Are you running any Flutter in production?

**Diego:** No, we evaluated it for an internal app six months ago and stayed
RN. I've done the tutorials, that's it.

**Camila:** *[clicks "Not in candidate's stack" on the Flutter card — one
click, excluded from radar and bucket counts.]*

**Camila:** Last thing — release cadence?

**Diego:** Weekly to both stores. EAS Update hotfixes maybe twice a month.

**Camila:** *[ticks "Release automation" chip already ticked; doesn't tick
"Code-sharing strategy (JS bridge / KMP / shared business logic)" — feels
wrong for an RN-Expo shop, KMP is the Kotlin Multiplatform-leaning option.]
[Also skips "Offline-first / sync patterns" — Diego didn't mention it and we
have ~30 sec left.] [Also skips "Platform-specific overrides + parity testing"
— Diego didn't mention specifically but she suspects he does it; doesn't want
to mis-tick.]*

**Camila:** Diego, this is great. Recruiter will follow up by Friday.

> *Time 07:30 — Camila clicks Continue → Summary.*

---

## 3. Post-call: report read — Summary state

**Bucket tally (5 items, Flutter excluded as skipped):**
- Green: react-native (Good, 0.74), expo (Good, SDK 51), typescript (Good, 5.3)
- Yellow: *(none directly — all 3 version-mode items resolved Green)*
- Red: *(none)*
- Skipped: flutter

**Methodology chips captured (4 of 6 + 2 free-text):**
- ✓ Release automation (Fastlane / EAS Build / Codemagic)
- ✓ Feature flag SDK choice + rollout discipline
- ✓ Native bridge / perf tuning + JS thread budget
- ✗ Code-sharing strategy (JS bridge / KMP / shared business logic) — skipped
- ✗ Offline-first / sync patterns — skipped (not asked)
- ✗ Platform-specific overrides + parity testing — skipped (not asked)
- Free-text: "two-store rollout coordination + EAS OTA pinning"
- Free-text: "Reanimated 3 / Zustand + React Query / Detox + Jest + RTL + Firebase Crashlytics"

**Radar:** 3 categories (Mobile + Language; only Mobile and Language carry tier
data — the radar renders fine but is thin because only 2 categories have
non-skipped items. Verdict: probably visually unhelpful for a single-platform
candidate.)

**RN report card body — verified clean:**
- Tier label: "Good" — no enterprise reassurance note. 7E removal of the root
  `enterpriseStillUsed` flag on react-native is confirmed working (RN 0.74 is
  Green so the note wouldn't render anyway, but the catalog change is verified
  at `src/data/technologies.json:910-942` — no flag at root, no flag on the
  Yellow tier at line 925-929).

**Time to summary:** ~7m 30s on an 8-min slot — *just* under. The Flutter
not-in-stack click cost ~5 sec. If RN/Expo had been Yellow and required more
probing, the slot would have overrun.

---

## 4. Findings

### Finding 1 — `mobile-cross-platform` preloads Flutter for a shop that ships only RN. **Severity: Medium.** Maps to: 7F scope question.

`src/data/roles.ts:282` preloads `['react-native', 'expo', 'flutter']`. Diego's
shop is 100% RN-on-Expo; Flutter is a one-click dispatch. Acceptable cost
(1 click, ~5 sec) **only because Camila knew from the CV** that Diego doesn't
ship Flutter. On a CV-blind call, Camila would have asked "Have you shipped
Flutter?" and burned 30+ sec on a no-signal answer.

**Real diversity within cross-platform:**
- RN-Expo shops (Diego shape) — most common in 2026 LatAm/SEA; ships 2 of 3
  preloads
- RN-bare shops (older Facebook-internal-style) — ships react-native only;
  Expo is a click-away
- Flutter shops — ships flutter only; RN + Expo are 2 not-in-stack clicks

The current "three-tech preload" works for the **theoretical** polyglot
candidate who has shipped all three. That candidate doesn't exist in the
LatAm/SEA market Camila is recruiting in — RN and Flutter are competitive,
not complementary stacks.

**Proposed fix:** Either (a) preload only `react-native + expo` (the canonical
modern RN stack) and let Flutter be a free-text add or a Custom-template
choice; or (b) split into `mobile-rn` and `mobile-flutter` sub-sub-templates
under a "Cross-Platform" intermediate landing card. Option (a) is the
80/20 — Flutter recruiters are rarer in the LatAm market Camila works.

---

### Finding 2 — Chip "Code-sharing strategy (JS bridge / KMP / shared business logic)" is **wrong for an RN-Expo shop**. **Severity: High.** Maps to: 7F chip-set.

`src/data/roles.ts:285` — the chip label is *"Code-sharing strategy (JS bridge /
KMP / shared business logic)"*. **KMP** = Kotlin Multiplatform, which is a
native-Android-led code-sharing strategy that competes with RN, not within it.
An RN-Expo developer would *never* tick this chip because:

1. The "code-sharing" question is already answered by choosing RN (JS shared
   across platforms by definition; native modules per-platform). It's not a
   methodology Diego picks — it's the framework.
2. KMP is the Kotlin-native-mobile shop's answer to "we don't want to use RN."
   Listing it on a cross-platform chip implies the recruiter should be probing
   whether the candidate knows KMP — but a candidate shipping KMP wouldn't be
   under this template at all (they'd be under mobile-android).

Camila correctly skipped this chip. It misled her about whether to ask about
it: she paused, read it twice, and moved on. **That's the failure** — a chip
should resolve in <2 sec or get ticked. This one cost her ~5 sec of cognitive
load on an 8-min slot.

**Proposed replacement:** `"OTA update governance (EAS Update / CodePush / over-the-air policy)"`
— this is the actual cross-platform-specific methodology that distinguishes
mid from senior. Diego's "JS bundle hash pinned to binary submission" answer
above is precisely the kind of senior signal this chip would capture, and it
applies equally to RN (EAS Update / CodePush) and Flutter (Shorebird /
patches). **Vendor-neutral, cross-platform-specific.**

---

### Finding 3 — Chip "Native bridge / perf tuning + JS thread budget" is **RN-specific terminology hiding as cross-platform**. **Severity: Low-Medium.** Maps to: 7F chip-set.

`src/data/roles.ts:288` — *"Native bridge / perf tuning + JS thread budget"*.
"JS thread budget" is **only an RN concern** — Flutter runs on Dart with no
JS bridge at all. Flutter's perf equivalent is "isolate / raster thread
budget" or "frame-build time discipline."

Camila ticked this for Diego correctly, but a Flutter candidate would either
skip the chip (looks like it doesn't apply) or free-text the Flutter
equivalent — losing the comparability across candidates that chips exist
to provide.

**Proposed replacement / rewording:** `"Mobile perf budgets (frame time / main-thread work / cold-start)"`
— framework-neutral, captures both RN's JS-thread story and Flutter's
isolate/raster story.

---

### Finding 4 — **Two RN-Expo-canonical methodologies are missing entirely from the chip-set.** **Severity: Medium.** Maps to: 7F chip-set.

Diego mentioned two practices that are **the** differentiators between mid
and senior on an RN-Expo team, and **neither** has a chip:

1. **OTA update governance** — when to ship JS-only via EAS Update vs cutting a
   binary. Diego's answer about pinning bundle hash to binary submission is
   senior-level discipline. Camila free-texted it because no chip captured it.
2. **Two-store release coordination** — iOS phased rollout vs Play Store
   staged rollout timing. Camila also free-texted this.

These are **exactly** the practices that distinguish "ships RN" from "ships RN
at scale to two stores with hotfix discipline." Both are vendor-neutral
(EAS Update / CodePush / Shorebird) and apply across the cross-platform
shape. The current chip-set instead spends two slots on "code-sharing" (a
non-question for an in-framework candidate) and "platform overrides + parity"
(a useful chip, but less differentiating).

**Proposed chip-set rewrite for `mobile-cross-platform`:**

```
{ id: 'release-automation-xplat', label: 'Release automation (Fastlane / EAS Build / Codemagic)' },
{ id: 'ota-update-governance', label: 'OTA update governance (EAS Update / CodePush / Shorebird)' },  // NEW
{ id: 'two-store-rollout', label: 'Two-store rollout coordination (phased / staged)' },  // NEW
{ id: 'feature-flag-sdk', label: 'Feature flag SDK choice + rollout discipline' },
{ id: 'mobile-perf-budgets', label: 'Mobile perf budgets (frame time / main thread / cold start)' },  // RENAMED
{ id: 'platform-overrides', label: 'Platform-specific overrides + parity testing' },
```

That drops `code-sharing-strategy` and `offline-first-xplat` (offline-first is
already covered on `mobile-android`'s chip-set; it's not specifically a
cross-platform concern — it's a mobile concern), and adds two missing
canonical RN-Expo-and-Flutter practices.

---

### Finding 5 — **7E's removal of `enterpriseStillUsed` from `react-native` is correct for Diego but over-corrects for a hypothetical RN-0.68 shop.** **Severity: Medium-Low.** Maps to: 7E.

Verified at `src/data/technologies.json:910-942` — no `enterpriseStillUsed`
flag at root, no flag on the Yellow tier (0.63 min). 7E correctly removed the
"Still widely used in many enterprise applications" reassurance.

For Diego (RN 0.74 → Green), this is invisible — the note wouldn't fire on
Green anyway. **But consider a hypothetical RN-0.68 shop:**

- RN 0.68 → tier `min: 0.63` → Yellow ("Review / Probe")
- Pre-7E: would have rendered "Still widely used in many enterprise
  applications" — softening the verdict toward "this team hasn't upgraded yet
  but RN-0.68 still ships."
- Post-7E: **no softener.** The Yellow now reads as raw "Review / Probe"
  without context.

Is RN-0.68 "still widely used in enterprise"? **Probably yes** — pre-new-arch
bridge RN ships in *many* enterprise apps (Walmart, Discord-historically,
several Big Tech apps still on bridge). The 0.68→0.70 cutoff for Yellow is
defensible, but the lack of reassurance now misreads "team hasn't upgraded
past bridge" as a concern signal.

**Tension with the 7E rationale:** 7E removed RN's root flag because the
*current* RN flag was firing on every Yellow tier including the
"actually-problematic-pre-0.63" band. The fix may have over-corrected. A
**tier-level** flag on `0.63 ≤ x < 0.70` only (the bridge-but-still-shipping
band) would have been more surgical — preserving the "legacy bridge is
defensible" softener while not soothing genuinely-old-RN.

**Recommend:** Add `enterpriseStillUsed: true` back on the **Yellow tier
specifically** at `src/data/technologies.json:925-929` (and add a `note`
field naming the bridge architecture):

```json
{
  "min": "0.63",
  "label": "Review / Probe",
  "color": "yellow",
  "enterpriseStillUsed": true,
  "note": "Pre-new-architecture bridge RN; still widely shipped — probe whether team plans to migrate or stays on bridge."
}
```

This is the same surgical-tier-level approach used for Selenium 3 and Cypress
10-11 per the CLAUDE.md notes. RN deserves the same treatment.

---

### Finding 6 — **Bilingual recruiter context surfaces no i18n issue, but exposes a UX one: chip labels are long enough to wrap on phone-screen widths.** **Severity: Low.** Maps to: cross-cut.

Camila is bilingual ES/EN and the tool stayed in English throughout. No i18n
gap — there are no Spanish chip labels and Camila didn't need them. **But:**
the chip *"Code-sharing strategy (JS bridge / KMP / shared business logic)"*
is 60+ chars. On a recruiter using the tool on a phone (which Camila isn't
today, but the CLAUDE.md `techvet_speed_of_use.md` constraint says recruiters
might), this chip wraps to 3 lines and visually swamps the others.

Not a blocker. But the "longer chip labels = lower tick rate" effect
(observed in round-6 6F sessions — recruiters skip chips they have to read
carefully) likely applies here too. Shorter labels (≤ 40 chars) tick faster.

---

### Finding 7 — **Time-to-Summary on a single-stack cross-platform candidate is acceptable but not great.** **Severity: Low.** Maps to: 7F preload sizing.

7m 30s on an 8-min slot, with **all** of the following going right:
- Diego is a current-stack candidate (no Yellow-band probing required)
- RN 0.74 + Expo 51 both Green on first quote
- Camila knew from the CV that Flutter wasn't relevant (one click)
- TypeScript on-the-fly add was fast because 5.3 is current

Replace any of those with a friction point (Yellow band, candidate hedging on
version, recruiter doesn't know Flutter doesn't apply) and the slot overruns.

**Compare:** if `mobile-cross-platform` preloaded just `react-native + expo`
(2 techs, Finding 1's proposal), the same call would have ended at ~7m flat
with the same coverage. The Flutter preload cost is ~30 sec in CV-blind
calls and ~5 sec when the recruiter has CV context. Multiplied across many
calls, lazy-asking Flutter is cheaper.

---

## 5. Round-8 verdict

**At-risk.**

The `mobile-cross-platform` sub-template that 7F shipped is **structurally
correct** (sub-templates beat the round-7 mega-mobile template, that's
indisputable from the round-6/7 sessions) but **contents-imperfect**:

- **The Flutter preload is the wrong default** for the 2026 LatAm/SEA
  recruiter market (Finding 1). Lazy-asking Flutter is cheaper than the
  one-click cost.
- **2 of 6 chips are off-target** for RN-Expo shops: `code-sharing-strategy`
  references KMP (a competing-framework strategy, Finding 2) and
  `native-bridge-perf` uses RN-specific terminology (Finding 3).
- **2 canonical RN-Expo + Flutter methodologies are missing entirely** from
  the chip-set: OTA update governance and two-store rollout coordination
  (Finding 4). Camila free-texted both, which means the chip-set didn't do
  its job.
- **7E's RN flag removal is correct for current-RN but over-corrects for
  legacy-bridge-RN** (Finding 5). Tier-level flag on 0.63-0.70 specifically
  would preserve the legacy softener.

**None of these are blockers for shipping.** The template renders, scores
correctly (RN 0.74 → Green with no enterprise note, verified), and produces a
usable report. But the chip-set under-validates what "cross-platform" actually
means in the field — it reads like it was designed by listing
framework-comparison axes (code-sharing, native-bridge) rather than
candidate-behavior axes (release discipline, OTA governance).

**Recommended round-8 fixes (in priority order):**

1. **8A — Chip-set rewrite per Finding 4** (replace `code-sharing-strategy`
   with `ota-update-governance`; replace `native-bridge-perf` with
   `mobile-perf-budgets`; add `two-store-rollout`; drop `offline-first-xplat`
   as duplicative). This is the high-leverage fix — chips are
   recruiter-facing and the wrong chips actively mislead.
2. **8B — Drop Flutter from `mobile-cross-platform` preload, or split into
   `mobile-rn` and `mobile-flutter`** (Finding 1). Lower-priority because
   the cost is small per-call but adds up across many calls.
3. **8C — Restore `enterpriseStillUsed: true` at the RN Yellow-tier level
   only** (Finding 5). Targeted catalog change; protects legacy-bridge-RN
   shops from reading as concerning.

**Not at-risk:**
- The 7E catalog change for react-native at the root level is verified
  correct for current-RN (Green tier renders clean for Diego).
- The version comparator handles "0.74" correctly against tier mins.
- The template wiring (preload → assessment screen → chip render) works.
- The Flutter not-in-stack click flow is fast (one click excludes from
  radar + buckets cleanly).

---

## Files touched (read-only this session)

- `/home/salinss/devtools/techvet/src/data/roles.ts` (lines 279-291 —
  `mobile-cross-platform` template definition)
- `/home/salinss/devtools/techvet/src/data/technologies.json` (lines 910-942 —
  react-native; 944-977 — flutter; 2965-3004 — expo)
- `/home/salinss/devtools/techvet/src/lib/scoring.ts` (lines 241-340 —
  version-mode resolver; lines 305-309 — tier-level `enterpriseStillUsed`
  override of root flag, relevant to Finding 5 proposal)
- `/home/salinss/devtools/techvet/src/lib/version.ts` (parseVersion + compare
  — confirms "0.74" → [0,74] >= "0.70" → [0,70])
