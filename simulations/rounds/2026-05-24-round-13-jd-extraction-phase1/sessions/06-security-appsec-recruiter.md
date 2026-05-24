# Round-13 JD extraction Phase 1 — Session 06 (Security / AppSec)

**Fixture:** `fixtures/06-security-engineer-appsec.md` — "Senior Security Engineer — AppSec", London hybrid, 900-person FCA/PRA-regulated FinTech; 6-person product-security org owning SDLC controls, secrets, supply-chain.
**Result file:** `results/06-security-engineer-appsec.json` — 21 extracted techs.
**Recruiter:** Priya Mahendran, 9 yr AppSec / product-security desk out of London EC2, places into FCA-regulated FinTechs and challenger banks. Familiar with the SDLC controls vocabulary (Semgrep rule authoring, Snyk/Trivy triage, OWASP ASVS Level-2, threat-modelling with LINDDUN / STRIDE, Cosign/Sigstore + SLSA attestation, Vault policy reviews). Has lost a placement before because the candidate confused SCA and DAST in a screening call — she now triages this rigorously.
**Date:** 2026-05-24, validating Phase 1 *post* F-W1 + F-P1 fixes.

---

## 1. Persona inhabited

Priya's role-shape filter on this JD: a candidate who has written Semgrep custom rules (not just consumed them), has tuned SCA noise at 400-finding scale, can run threat-modelling sessions in LINDDUN/STRIDE without a cheat sheet, and has hands-on Vault policy authoring + Cosign/Sigstore signing pipelines. The Auth0/Okta line tells her this is not a pure-IAM role; the SLSA L2→L3 line tells her the supply-chain story is the differentiator. She would paste this JD into TechVet first thing on a fresh brief and expect the extraction to surface the headline AppSec stack (Semgrep, Snyk, Trivy, Burp, ZAP, Vault, Cosign/Sigstore, Falco, OAuth/OIDC, Auth0, Okta, AWS) without noise from the "Not relevant" block.

---

## 2. The extraction at a glance

21 entries, sorted by category:

- **Auth / Identity (3):** `auth0`, `oauth-identity` (matched "OAuth" + "OIDC"), `okta`.
- **Backend (1):** `dotnet` ← matched ".NET" from the *"We don't write any .NET or PHP"* exclusion line. **False positive (expected Phase 1 limit).**
- **Cloud (1):** `aws` ← matched "AWS".
- **DevOps (2):** `cosign-sigstore` (matched "Cosign" + "Sigstore"), `github-actions`.
- **Frontend (1):** `typescript`.
- **Language (4):** `go`, `java`, `php` ← FP from same exclusion line, `python`.
- **Mobile (2):** `kotlin` ← matched "Android"; `swift` ← matched "iOS". **Both FPs from "Mobile pentest (separate team — they own iOS + Android)".**
- **Security (6):** `burp-suite`, `falco`, `vault` (matched "HashiCorp Vault" + "vault"), `owasp-zap`, `semgrep`, `snyk`, `trivy`.

Headline: **17 correct chips + 4 context-blind FPs (.NET, PHP, Kotlin/Android, Swift/iOS), 0 catalog-noise / regex bugs.**

---

## 3. Findings

### F1 — Post-fix structural bugs are gone  ✓ (validates F-W1 + F-P1)
The two round-1 blockers cleanly resolved on this fixture. `vault` extracted with `matched: ["HashiCorp Vault", "vault"]` — the bare-form alias (`aliases.ts:81`) closed F-W1. JUnit did *not* fire despite four mentions of "Java" — F-P1 paren-strip held; the catalog name "JUnit (Java)" no longer emits "Java" as a search term. **Both fixes verified on AppSec terrain.**

### F2 — `cosign-sigstore` hybrid matched both halves cleanly  ✓
JD line 12: *"Cosign + Sigstore signing for the build artefact line"*. The catalog name `Cosign / Sigstore` splits on `/` into two independent terms, both hit, `matched: ["Cosign", "Sigstore"]`. This is the exact behaviour the round-1 cross-cut called out as the *intended* paren/slash split shape — it survives the F-P1 fix. Priya gets one card with two confirming matches, which is recruiter-useful provenance.

### F3 — `oauth-identity` correctly resolved "OAuth 2.0 + OIDC"  ✓
JD line 25: *"Experience with OAuth 2.0 + OIDC flows (we use Auth0 for customer-facing, Okta for internal)"*. The `oauth-identity` aliases (`aliases.ts:62`) include `oauth` and `oidc`; `matchesAsTerm`'s `(?<![a-z0-9])oauth(?![a-z0-9])` happily matches "OAuth" before the "2.0" (the space is the boundary). Both `oauth` and `oidc` matched, plus `auth0` and `okta` as independent siblings. Priya gets the full identity trio without redundant noise — this is the cleanest case in the fixture.

### F4 — Every headline AppSec tool the JD named was extracted  ✓
Semgrep, Snyk, Trivy, OWASP ZAP, Burp Suite, Cosign, Sigstore, HashiCorp Vault, Falco, Auth0, Okta, AWS, GitHub Actions, OAuth/OIDC — 14 for 14 on the "Tech we use day-to-day" line (JD line 39). The "Required" / "Strongly preferred" sections add no further uncovered techs beyond what's in the day-to-day list. **This is the headline win on this fixture: the AppSec catalog (Semgrep / Snyk / Trivy / OWASP ZAP / Burp / Falco / Cosign-Sigstore / Vault) is dense enough that a regulated-FinTech AppSec JD lands cleanly.**

### F5 — `.NET` + `PHP` false positives from "Not relevant" block  ⚠ (expected Phase 1 limit)
JD line 33: *"We don't write any .NET or PHP, so deep expertise there isn't required"*. `dotnet` matched via the `.net` alias; `php` matched via the catalog name. Priya removes both chips in two clicks. Severity ⚠ because: dismissable, but a JD this explicit being ignored is a recruiter-trust micro-erosion. The "Not relevant" section header is the textbook anchor for the Phase 2 LLM exclusion-block detector — same shape as session 04's "Hands-off the keyboard".

### F6 — `kotlin` + `swift` false positives from "Mobile pentest (separate team)"  ⚠ (expected Phase 1 limit, but uglier)
JD line 31: *"Mobile pentest (separate team — they own iOS + Android)"*. Catalog names `Kotlin / Android` and `Swift / iOS` slash-split, so `Android` becomes a search term for `kotlin` and `iOS` for `swift`. Both hit. This is *worse* than F5 because: (a) the FPs are on the **Mobile** category, which Priya would expect to see *empty* for an AppSec role — its presence makes her double-take; (b) the chip labels read "Kotlin / Android" and "Swift / iOS" which is even further from what the JD said (the JD never said "Kotlin" or "Swift" — just "iOS" and "Android"). Severity ⚠ — same Phase 1 limit, but it's a clear Phase 2 LLM win: "separate team — they own X" is a textbook out-of-scope marker.

### F7 — Acronyms SAST / SCA / DAST silently absent  ✓ (correct Phase 1 behaviour — catalog gap, not bug)
JD line 20: *"Familiar with SAST vs SCA vs DAST trade-offs"*. None of these are catalog entries; correctly not extracted. They're concept-not-tool, so probably not catalog-worthy in their own right — they're already implied by the Semgrep / Snyk / OWASP ZAP chips. Noted, no action.

### F8 — Domain frameworks LINDDUN / STRIDE / OWASP Top 10 / OWASP ASVS / SLSA silently absent  ✓ (catalog gap — track separately)
JD lines 11, 18, 27. Same as F7: not extractor bugs. But for an AppSec recruiter, these are the **headline qualification markers** — Priya screens for "ASVS Level-2 fluency" and "SLSA L2 → L3" as much as for tool-name hits. See §6.

### F9 — `Anchore` silently absent  ✓ (catalog gap)
JD line 17 lists it as a Snyk/Trivy peer ("Strong with Semgrep AND one of (Snyk / Trivy / Anchore)"). No catalog entry. Same shape — track as a P2 catalog candidate.

---

## 4. False negatives (Phase 1 misses, not bugs)

None caused by extractor logic. All FNs trace to catalog gaps (§6).

---

## 5. False positives

| Chip | Source line | Cause | Severity |
|---|---|---|---|
| `dotnet` (.NET) | "We don't write any .NET or PHP" | Context-blind | ⚠ expected |
| `php` | same line | Context-blind | ⚠ expected |
| `kotlin` (Kotlin / Android) | "Mobile pentest (separate team — they own iOS + Android)" | Context-blind + catalog name carries "Android" as a slash-sibling | ⚠ expected, worse optics than the others |
| `swift` (Swift / iOS) | same line | same shape | ⚠ expected |

4 FPs out of 21 extractions — 19%. All four are Phase 2 LLM territory; none are rules-layer regressions.

---

## 6. Catalog gaps surfaced

Track separately from extractor work — each is a new-entry candidate.

**High priority for AppSec terrain:**
- **OWASP ASVS** — JD names it as a hard "Required" qualifier at Level-2 fluency. Conceptually a framework not a tool, but recruiter-critical screening signal.
- **OWASP Top 10** — same shape; recruiter-critical.
- **SLSA** — JD calls out current L2 + target L3; this is *the* differentiating supply-chain marker. Pairs naturally with the existing `cosign-sigstore` entry.
- **Anchore** — listed alongside Snyk / Trivy as a peer container-scanner. Phase 1 silently drops every Anchore-only JD.
- **LINDDUN** — privacy-threat-modelling framework, niche but rising; PII-heavy FinTech / health-tech JDs name it more often.
- **STRIDE** — paired with LINDDUN; broader applicability.

**Medium priority:**
- **AWS sub-services as standalone-extractable**: KMS, Macie, GuardDuty, Security Hub, Inspector, IAM Identity Center — currently invisible under the `aws` umbrella. Recruiters screening cloud-security depth would value pre-ticking these on the AWS hybrid card. (This is session 04's "AWS sub-service pre-ticking" recommendation, surfaced again from the security angle.)

**Defer:**
- SAST / SCA / DAST as standalone catalog entries — concept-not-tool, covered by the tool chips.

---

## 7. Verdict

**Safe.** Phase 1 post-fix is shippable for this AppSec fixture. The two structural fixes (F-W1 vault bare-form, F-P1 paren-strip) demonstrably held: `vault` extracted, JUnit did not FP despite four "Java" mentions. The 17 correct chips give Priya a clean, recruiter-useful AppSec card set; the 4 context-blind FPs are dismissable and entirely within the documented Phase 1 limits. The Mobile-category FPs (kotlin/swift from "Mobile pentest") are the ugliest because they appear in a category Priya would expect empty — but they're not blockers, just optics.

The remaining recruiter-trust hit on this terrain is **catalog gaps**, not extractor logic: ASVS / SLSA / LINDDUN / STRIDE are the qualification markers that distinguish a senior AppSec candidate from a junior one, and Phase 1 can't surface what isn't catalogued.

---

## 8. Phase 2 LLM scope recommendations

Convergent with prior sessions; AppSec-specific reinforcement in **bold**.

1. **"Not relevant" / "Probably won't suit you" exclusion-block detection** — same shape as session 04's "Hands-off the keyboard" and session 03's "Not relevant" block. This fixture's "Not relevant" section is textbook-clean: contiguous lines under a section header, all negated. **Strong P0 — every AppSec JD I've seen carries an exclusion section, and the SDLC-controls vocabulary makes "X is a separate team" idioms (cf. F6) especially frequent.**
2. **"Separate team owns X" idiom detection** — F6's "Mobile pentest (separate team — they own iOS + Android)" is a recurring AppSec-JD shape and clearly out-of-scope. Sentence-level LLM check on proximity to "separate team", "owned by", "another org".
3. **Concept-vs-tool surfacing** — when the JD names ASVS / SLSA / LINDDUN / STRIDE and the catalog has no entry, Phase 2 should still surface these as "review chips" (greyed, no tier) so the recruiter knows the JD called them out. Bridges the catalog-gap problem without forcing every framework to become a full catalog entry.
4. **Hybrid AWS sub-service pre-ticking** — "KMS / Macie / GuardDuty / Security Hub / Inspector" should pre-tick those services on the `aws` hybrid card. Already on session 04's list; reinforced here.
5. **Provenance flag** — keep the round-1 cross-cut's `matchedBy: 'rules' | 'llm' | 'both'` recommendation. On this fixture, `vault` would carry `both` (rules + LLM), `kotlin` would carry `rules` only and the LLM would mark it suppressed-by-exclusion.

