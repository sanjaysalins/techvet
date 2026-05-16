# Cross-cut — 2026-05-16 multi-channel round 3

**10 sessions, ~19k words, 3 video / 3 async / 4 phone.** Cast spanned
underrepresented round-2 roles (Solution Architect, SRE, Security AppSec,
Data Scientist, QA), specialist extremes (Oracle DBA with 18 yr), and
non-traditional paths (OSS maintainer, academic→industry, founder→IC,
internal transfer).

The headline: **Fix K (today's scope-axis redesign) covers 10 of 96
catalog techs — five different agents independently flagged this as the
single biggest gap.** Five other patterns converged across multiple
sessions, including a genuinely new architectural concern (provenance
tagging for async/CV-inferred entries) that round 2's phone-only cast
could not have surfaced.

**Speed-of-use rating distribution: 0 Safe / 7 At-risk / 3 Unworkable.**
Even agents in the high-time-budget video and async channels found the
workflow would collapse on phone. Phone is the design constraint, but
the tool is currently failing under that constraint for most candidate
shapes — even after today's three batches of fixes.

## The 10 sessions at a glance

| # | Persona | Channel | Template | 6b rating | Headline failure |
|---|---------|---------|----------|-----------|-----------------|
| 01 | Aaron Bell — Senior SA, multi-cloud | Video | Solution Architect | At-risk | Fix K caps nothing for SA on Terraform/K8s — Aliyah failure mode unclosed |
| 02 | Cara Lin — Staff SRE, OSS-only obs | Video | SRE / Platform | At-risk | 6 SRE table-stakes missing from catalog; mixed-vendor observability denominator still unfixed |
| 03 | Tomi Ade — Lead AppSec, banking | Video | Security Engineer | **Unworkable** | Security template preloads 0 security tools; 6 Sec techs not in catalog; HM watches dead-end spiral |
| 04 | Yara Mancini — Senior DS, causal+Bayesian | Async | Data Scientist | **Unworkable** | Async + version-inference is a 5-Green rubber-stamp; methodology (D4) still has nowhere to live |
| 05 | Devon Akin — 12yr OSS maintainer | Async | Custom | **Unworkable** | 8k-star library author reads identically to bootcamp grad; 5 systems-prog techs vanish to sticky notes |
| 06 | Min Park — Academic→industry MLE | Async | AI / ML | At-risk | Fix K author cap silently no-ops on natural-Green PyTorch; 6 scientific-computing catalog gaps |
| 07 | Pranav Iyer — Senior QA, Selenium→Playwright | Phone | QA / Test | At-risk | "Evaluated and rejected" collapses to "didn't use"; QA template version-shaped for service-shaped role |
| 08 | Lou Bertrand — 18yr Oracle DBA | Phone | Custom | At-risk / Unworkable for specialists | Zero Oracle/RAC/PL-SQL/Data Guard catalog → DBA is unrenderable |
| 09 | Riya Mehta — Founder/CTO → IC | Phone | Full-Stack | At-risk | 6/6 Green sweep — Fix K covers 10 of 96 techs, 86 non-AI/ML fall through to no-op |
| 10 | Eitan Cohen — SE→dev internal transfer | Phone | Backend | At-risk | SE-rattle gives AWS 10/14 Green; no candidate-context block for 8yr industry / 2yr coding hybrid |

## Pattern frequency

| Pattern | Sessions | Severity |
|---------|----------|----------|
| **Fix K's `defaultScope` coverage too narrow (covers 10/96 techs)** | 5 / 10 (Aaron / Cara / Tomi / Riya / Eitan) | **Critical** — closes the biggest open feedback loop from round 2 only for the AI/ML subset |
| Catalog gaps for non-mainstream domains | 7 / 10 (Cara / Tomi / Yara / Devon / Min / Lou / Pranav) | High — Fix C ("name-and-park" capture) is cheaper than each catalog |
| **Async needs provenance tagging** (probed vs inferred-from-CV vs self-reported) | 3 / 10 (Yara / Devon / Min) | **High** — new architectural concept; round 2 couldn't have surfaced this |
| Natural-Green AI/ML ceiling too generous | 2 explicit (Min/Yara) + carry-over from Vikram (round 2) | High — Fix O still open; Min argues Fix K's regression test pinned wrong invariant |
| Role templates are decorative for several categories | 3 / 10 (Tomi-Security / Pranav-QA / Cara/Aaron-DevOps/SA) | High — template overhaul |
| "Evaluated and rejected" / "Migrated off" not capturable | 2 explicit (Pranav-Cypress, Riya-K8s "architected but didn't implement") + carry-over (Sam-Pulumi, Hiroshi-GraphQL) | Medium — `historicallyUsed` axis or 4th tri-state button |
| HM-visible UX failures matter in video screening | 2 / 3 video sessions (Tomi, Aaron) | Medium — video is a secondary use case but real |
| Speed-of-use rating ≤ At-risk for every session | 10 / 10 | Critical — design constraint not met |

## Code bugs (numbered, file:line-anchored where useful)

### Bug 1 — Fix K's category coverage is too narrow (Critical)
**What.** `defaultScope: "author"` was applied to the 10 AI/ML category techs only (`technologies.json:1786, 1822, 1858, 2391, 2433, 2506, 2571, 3631, 3673, 3715`). The other 86 catalog entries fall through to `scoring.ts:54-60` operator-implied no-op branch when the recruiter doesn't open the dropdown. Phone recruiters never do.

**Why it matters.** The round-2 cross-cut named the failure mode as "scope axis unreachable on phone, 10/10 sessions." Today's Fix K closed it for AI/ML candidates only. Aaron (SA on Terraform/K8s), Cara (SRE on Terraform), Tomi (Security on K8s/Terraform/Docker/AWS), Riya (CTO on backend/cloud/DB), and Eitan (SE-rattle on AWS) all confirm Fix K doesn't fire for their shapes. **5 of 10 sessions independently flagged this as their top finding.**

**Convergent fix proposals:**
- **Per-category defaults** (Cara, Tomi, Eitan): DevOps category defaults `reviewer`; cloud providers default `operator` (already the implicit default, but make it explicit so the chip can show it); Security category defaults `reviewer`.
- **Template-keyed defaults** (Riya — sharpest framing): Solution Architect template preloads `architect` as scope for backend/cloud/DB techs; SRE template preloads `operator` on workload-layer techs + `reviewer` on cluster-build techs; Founder/CTO flag preloads `architect` on backend/cloud/DB, `author` on frontend.

I think the right answer is **template-keyed defaults layered on top of per-tech defaults**: the catalog entry default applies first (e.g. PyTorch → author), then the role template overrides where applicable (e.g. SA template overrides Terraform → architect). Closes the Aaron / Riya / Tomi / Cara / Aliyah cluster without adding any per-card control under the phone budget.

**Severity: Critical.** This was supposed to be the headline closure of round 2 and it covers a minority of the cases it was named for.

### Bug 2 — Natural-Green AI/ML libs slip past the `author` cap (High)
**What.** `applyScope` in `scoring.ts:75-77` only blocks Yellow→Green depth-lifts under `author` scope; natural-tier Greens are unaffected by design. Min's PyTorch 2.4 hits Green directly so the cap silently no-ops. Yara's scikit-learn 1.5 (recruiter-guessed via inference) does the same. Same shape as Vikram's LangChain in round 2.

**Why it matters.** Round 2 documented this as the Vikram non-closure; Fix O was named as the catalog-side guard (fast-moving libs max at Yellow without checklist services). Round 3 extends the failure mode beyond fast-moving libs to *any* AI/ML lib where the candidate quotes a current version. Min argues the Fix K regression test (`scoring.test.ts: "catalog defaultScope does not affect natural-Green verdicts"`) pinned the wrong invariant for academic→industry shapes.

**Two possible fixes:**
- **Fix O (catalog-side):** lower the AI/ML library tier ceilings — LangChain min 1.0 → Yellow; require checklist services for Green. This is the round-2 plan.
- **Extend author semantics (scoring.ts-side):** `author` scope caps at Yellow regardless of tier match (matches Min's argument). This is a bigger semantic change and would affect more code paths.

I lean toward Fix O — it's a catalog change, lower-blast-radius, and aligns with the rest of TechVet's preference for data-driven over code-driven verdicts.

**Severity: High.**

### Bug 3 — Async empty-field semantics reward recruiter dishonesty (High — NEW from round 3)
**What.** Yara (DS async) was the canonical case: Fix G's `notDiscussed` flag was designed for phone-call "ran out of time" — in async it produces the opposite incentive. Recruiter typing a guessed version → tech is scored; recruiter leaving blank → tech disappears via `notDiscussed`. The "Not discussed" section reads as "we didn't get to it" when the actual story is "CV is silent and we have no candidate to ask."

**Why it matters.** Async is a real channel (3/10 sessions in this round). The recruiter never speaks to the candidate; every field is CV-inference. The current data model can't distinguish probed-and-confirmed from inferred-from-CV from recruiter-guess. Yara/Devon/Min all flagged variants of this independently.

**Convergent fix proposal:** add a **`source`** field per item-attribute (or per item): `probed | inferred-from-cv | self-reported | unknown`. The PDF can then render evidence-tier visually (e.g. solid border for probed, dashed for inferred). Async sessions would default to `inferred-from-cv` on every empty version field, suppressing the `notDiscussed` short-circuit and surfacing instead "Version inferred from CV — confirm".

A simpler intermediate fix: add a **`channel`** flag to `AssessmentMeta` (`phone | video | async`). The `notDiscussed` semantics branch on channel: in phone it's the "ran out of time" framing; in async it's "CV is silent on this dimension — get on a call before progressing." Different copy, different UX cue, same flag.

**Severity: High.** New architectural concern that round 2's phone-only cast could not surface.

### Bug 4 — `enterpriseStillUsed` note misfires on typed-version + working depth (Medium — carry-over)
**What.** Same shape as round 2 Bug 2 (which Fix B closed for the unknown-version path). For the **typed-version-tier-match** path, the note still fires whenever `tier.color === yellow && enterpriseFlag` (`scoring.ts:194-196`) regardless of depth. Aaron's Java 17 (working depth, typed version) fires "Still widely used in many enterprise applications" — implying legacy competence Aaron hasn't had since 2020. Eitan's React 18 mid-tier fires the same on a candidate who only touched React in SE demos. Cara's Terraform (unknown-version + working depth = `enterpriseStillUsed` still fires per scoring.ts:131-146).

**Why it matters.** Round 2's fix gated the unknown-version path on depth; the typed-version path is now the new misfire vector.

**Fix:** add the same depth/scope gating to the typed-version Yellow-tier path — or, cleaner, fold both paths through a single `shouldShowEnterpriseNote(tier, item, tech)` helper that respects scope (reviewer/architect should never see the legacy-reassurance note).

**Severity: Medium.**

### Bug 5 — Search collisions on tech-name overlap (Medium — NEW)
**What.** Tomi searches "Vault" — gets "Ansible Vault" (a sub-checkbox of Ansible) instead of nothing. Worse than zero results because recruiter could mis-add. Cara searches "Argo" — gets ArgoCD instead of Argo Rollouts, no recovery path. Generalizes to any tech name that is a substring of another.

**Why it matters.** Search adds a hidden mis-attribution failure on top of the catalog gap. Recruiter believes they've logged the tech; PDF shows the wrong one. With HM watching (video), the silent mis-add is the visible-fumble moment.

**Fix:** add `searchAliases: string[]` on Technology (already proposed in round 2 Fix C); promote whole-word matches over substring; show the matched-field hint in the dropdown ("Vault → matches *Ansible Vault* sub-service"). Bare minimum: warn when a search returns a sub-service rather than a top-level tech.

**Severity: Medium.**

### Bug 6 — `k6` single-tier `min: "1.0"` is a Green rubber-stamp (Medium — audit miss)
**What.** Pranav noticed: `k6` has `versionTiers` starting at `min: "1.0"` Green — any digit input ≥ 1.0 → Green. Same shape Fix J cleaned up for Snowflake/GraphQL/gRPC, but k6 wasn't in the audit. The global integrity guard added in Fix J (`integrity.test.ts: no single-tier min:"0" rubber-stamps`) doesn't catch this because k6's min is `"1.0"` not `"0"`.

**Fix:** broaden the integrity guard to also flag single-tier or single-Green-tier entries where any plausible recent version would match the top tier. Or simpler: lower k6's tier mins to match its release history (k6 v0.x → Red; 0.5-1.0 → Yellow; ≥1.0 → Good; ≥2.0 → Excellent).

**Severity: Medium.**

## Structural defects

### S1 — Role templates ship without scope defaults (and several without their actual stack)
- **Security Engineer template** (`roles.ts:73`) preloads `python, oauth-identity, aws, kubernetes, docker, terraform, sql, observability` — **zero security tools**. Tomi called it "back-end engineer with OAuth probes wearing a security-template badge."
- **QA template** is 100% version-mode; QA is the most checklist-shaped role (Pranav, echoing round 1's Esi).
- **No template has a defaultScope override.** Cara/Aaron's SA/SRE shapes need scope=reviewer/architect on backend/cloud/DB; Tomi's Security shape needs scope=reviewer on infra; Riya's CTO shape needs scope=architect across the board.

**Fix:** template overhaul. Three actions: (a) populate Security template with actual security stack (preload Vault/Burp/Semgrep/Trivy/Falco/Snyk/ZAP and a NIST/OWASP checklist tech); (b) convert QA to checklist-mode (Playwright/Selenium are about coverage, not version); (c) add per-template scope-default map.

### S2 — "Evaluated and rejected" / "Migrated off" not capturable
**Hit by:** Pranav (Cypress evaluated, rejected → "Not in stack" gray pill); Riya ("Architected K8s migration but my staff eng implemented" → no fitting state); Pranav (Selenium = migrating off, not legacy); plus carry-over from round 1 (Sam/Pulumi, Hiroshi/GraphQL-deliberately-deprecated, Esi/Cypress-migrating-off).

Today's tri-state (`knows-version | don't-remember | not-in-stack`) collapses three distinct signals to one gray pill: never-touched, evaluated-and-rejected, migrating-off. For a senior screen, the *judgment* signal (evaluated-and-rejected) is recruiter gold.

**Fix:** add a 4th tri-state option "Evaluated / migrated off" + a small `historicallyUsed` axis. Renders in its own report section with framing like "Decisions worth probing — judgment signal."

### S3 — Specialist extremes are catalog-invisible
Lou (18yr Oracle DBA) is the canonical case — catalog has zero Oracle/RAC/PL-SQL/Data Guard/RMAN/AWR/ASH. Devon's systems programming stack has the same gap (Tokio, NATS, eBPF, io_uring, QUIC, DPDK). Yara's R/Stan/PyMC. Min's JAX/Slurm/MATLAB. Building a specialist catalog for each vertical is expensive; the cross-cutting fix is **Fix C ("name and park" search-miss capture)**.

**Fix:** when search returns zero, surface a "+ Add 'X' as named-only (not assessable)" button. Lands as a gray chip in a new "Candidate mentioned — out of catalog" section on the PDF. Recruiter heard it, report shows it, hiring manager has a probe target. Cheaper than building every vertical catalog and generalizes to all specialists.

### S4 — HM-visible UX failures during video screening
**Hit by:** Aaron (HM watches scope chips stay implicit while candidate says "I review the Terraform"); Tomi (HM watches recruiter spiral on Vault/Burp/Semgrep dead-end searches in real time).

Video is TechVet's secondary channel but a real one. The cross-cut from this round suggests video has a *different* failure mode than phone: phone fails on speed; video fails on *visible* fumbling. Both need addressing but they're different fixes.

**Fix:** the cross-cut for Bug 5 (search aliases) and Fix C (named-not-in-catalog) close the visible-fumbling case. No new code needed beyond what's already on the priority list.

### S5 — Async has no provenance model (NEW)
See Bug 3 above. This is a genuine architectural gap that round 2 couldn't surface because round 2 was phone-only. The most ambitious fix is a `source` field per item; the cheapest is a `channel` flag that branches the existing flags' copy and semantics.

### S6 — No candidate-context block on report
**Hit by:** Eitan (8yr industry + 2yr coding internal transfer reads as 2yr junior); Riya (6yr founder going IC reads as 6yr senior IC); Min (4yr post-doc reads as 4yr industry MLE).

Carry-over from round 2 (Marcus/Sarah/Janelle/Priya). Confirmed urgent across 3 new round-3 sessions. This is Fix M, unshipped.

## Catalog gaps (consolidated)

| Domain | Techs named, not in catalog | Sessions naming them |
|--------|-----------------------------|----------------------|
| Security | Vault (HashiCorp), Burp Suite, Semgrep, Trivy, Grype, Falco, Snyk, OWASP ZAP | Tomi (all); confirmed round-2 still-open |
| SRE / Service mesh | Envoy, Istio, Cilium, Karpenter, Chaos Mesh, Argo Rollouts | Cara |
| Systems programming | Tokio (Rust async), NATS, eBPF, io_uring, QUIC, DPDK | Devon |
| Scientific computing | JAX, Slurm, Singularity, MATLAB, R, scipy | Min |
| DBA / Oracle stack | Oracle, RAC, PL/SQL, Data Guard, RMAN, AWR/ASH | Lou |
| Data Science | statsmodels, PyMC, R (cat: Language), Stan, Looker | Yara |
| QA-specific | TestNG, REST Assured, BrowserStack | Pranav |
| AWS security services | KMS, Organizations, GuardDuty, Security Hub, Config, CloudTrail, Macie | Tomi (sub-checklist) |
| Multi-cloud meta | (no entry) — being competent on AWS + Azure + GCP isn't expressible | Aaron |

The cross-cutting fix is **Fix C (name-and-park) first** to capture every named miss, then catalog refresh prioritized by domain frequency above.

## Disagreements with shipped work (round-3 agents pushing back)

1. **Aaron (Sim 01), Riya (Sim 09), Eitan (Sim 10), Cara (Sim 02), Tomi (Sim 03)** — all five disagree with the RESUME claim that "Fix K closes 10/10 phone-screening sessions' scope-unreachable finding." Only the AI/ML subset is closed; the much larger non-AI/ML cluster (Terraform / K8s / cloud / DB) is still unreachable.

2. **Min (Sim 06)** — disagrees with the Fix K regression test that pinned "catalog defaultScope does not affect natural-Green verdicts (author semantics)" as intentional. Argues that for academic-grade authors of research code on current versions, the natural Green IS the over-rate, and `author` cap should extend to natural Greens.

3. **Yara (Sim 04)** — disagrees with Fix G's `notDiscussed` semantics. Channel-inappropriate for async: rewards recruiter dishonesty by making blank fields silently disappear while guessed fields stay scored.

4. **Devon (Sim 05)** — disagrees with the 2026-05-15 tri-state. Conflates *candidate doesn't remember* (live-call meaning) with *CV doesn't say* (async meaning). Needs evidence-source provenance.

## Validation of round-2 + Fix K shipped today

| Fix | Held up? | Notes |
|-----|----------|-------|
| Fix A (drop checklist depth-lift) | ✅ Held | Lou hit SQL 12/12 cleanly; no negative findings |
| Fix B (suppress depth-lift on unknownVersion) | ✅ Held | Behavior correct; enterprise note still misfires on typed-version path (Bug 4) — different bug |
| Fix G (notDiscussed flag) | ⚠️ Held for phone, broken for async | Yara's critique stands — needs channel-aware semantics |
| Fix J (Snowflake/GraphQL/gRPC checklist) | ✅ Held | Audit guard didn't catch k6 (Bug 6) — broaden the guard |
| Fix L (elevated chip-row + sections) | ✅ Held | Tomi/Eitan noted them positively |
| Fix K (scope axis hybrid) | ❌ Half-failed | Covers 10/96 techs; defaults too narrow; Summary chip is video/async-only (Aaron flagged) |
| Round 1 Fix 2 (fleet-hedge minimum-pick) | ✅ Held | Lou verified under phone speed |

## Priority-ordered fix list (round 3 additions to RESUME)

| # | Fix | Effort | Why |
|---|-----|--------|-----|
| **K2** | **Template-keyed `defaultScope`** (Riya's design): SA template → architect on backend/cloud/DB; SRE → reviewer on cluster-build; Security → reviewer on infra; Founder/CTO flag (extends Fix M) | 1.5 day | **Closes the 5-session cluster** from this round. Single highest-leverage change |
| **Q** | Add `source` field (or `channel` flag) for async provenance | 1.5 day | New from round 3; closes Yara/Devon/Min critique. Channel flag is cheaper, source field is correct long-term |
| **R** | Broaden Fix J integrity guard to catch single-Green-tier rubber-stamps with non-zero min (k6 case) | 0.5 day | Spotted by Pranav; trivial fix; prevents future audit misses |
| **S** | Add `searchAliases` field + warn on sub-service substring matches (Vault → Ansible Vault collision) | 1 day | Bug 5 from this round; closes visible-fumble path during video screening |
| **T** | "Evaluated / migrated off" 4th tri-state option | 0.5 day | Pranav-Cypress / Riya-K8s-architect / round-1 carry-overs |
| **U** | Security template overhaul (preload Vault/Burp/Semgrep/Trivy/Falco/Snyk/ZAP) — depends on Fix I shipping those entries | 1 day | Tomi confirms Security template is decorative |
| **V** | QA template → checklist-mode for Playwright/Selenium | 1 day | Pranav; round-1 Esi carry-over |

Plus reprioritization of existing round-2 items:
- **Fix C (name-and-park search miss capture)** moves to *priority #1 of round-2 carryover* — 4 sessions named it (Lou, Devon, Tomi, Pranav). Cheaper than each catalog refresh and generalizes to all specialists.
- **Fix M (candidate-context block)** moves up — 3 round-3 sessions confirm urgency (Eitan, Riya, Min).
- **Fix O (fast-moving lib Yellow ceiling)** stays critical but framing expands: not just LangChain/vector-db/llm-api-sdk; also PyTorch/scikit-learn/pandas etc. when version is current — see Bug 2.
- **Fix B-extension** for typed-version path enterprise-note misfire (Bug 4 in this cross-cut).

## Recommended sequencing post-round-3

**Week 1 (~4 days) — close the round-3 critical findings:**
- K2 (template-keyed defaults) — 1.5d
- Q (channel/source flag) — 1.5d
- R + S (integrity guard + search aliases) — 1.5d combined

**Week 1 second half (~2 days) — round-2 carryovers reprioritized:**
- Fix C (named-not-in-catalog) — 1.5d
- T (Evaluated/migrated-off option) — 0.5d

**Week 2 — design-heavy:**
- Fix M (candidate context) — 1d
- Fix O (fast-moving lib ceilings, broadened) — 1.5d
- Fix E (asymmetric lastUsed) — 1.5d

**Ongoing — catalog:**
- Fix I (catalog refresh, priority: Vault/Burp/Semgrep/Trivy/Falco/Snyk for U, then Envoy/Istio/Cilium for SRE, then Tokio/NATS for systems, then JAX/Slurm for science, then Oracle ecosystem) — 4-5d

## Notes for round 4

What worked:
- Multi-channel cast surfaced async-provenance (Bug 3 / S5) which phone-only could not have.
- Speed-of-use schema section 6b worked — every agent rated explicitly; gave the cross-cut a unified frame.
- Mixing role-focus axes (underrepresented + extremes + non-traditional) gave 4-way convergence on Bug 1 — a single-focus cast wouldn't have produced that signal density.

What to do differently:
- **Validation round next.** Round 3 left 3 of today's fixes (Fix K specifically) partially-failed. Round 4 should re-test the specific fixes shipped *after* this cross-cut, with personas chosen to directly hit them (a new SA / SRE / Founder / academic-async pair). Smaller (5-6 sessions) and targeted.
- **HM-perspective sub-section** in the schema: video sessions called out HM-visible failures as a distinct evaluation axis. Worth promoting to a schema field.
- **The 600-900 word target is consistently overshot** (average ~1.9k this round). Either accept the new norm or split the schema into "primary report" (600-900) + "appendix" (unlimited). The agents are giving us evidence-density we want.

## Snapshot

- Sessions: 10
- Total words: 18,777
- Code bugs surfaced: 6
- Structural defects: 6
- Catalog gaps: ~50 named techs across 9 domains
- New priority items: 7 (K2, Q, R, S, T, U, V) + reprioritization of round-2 carryovers
- Speed-of-use ratings: 0 Safe / 7 At-risk / 3 Unworkable
- Days estimated to clear round-3 critical findings (K2 + Q + R + S): 4 days
- Days estimated to clear all: ~14-17 days (parallelizable in two streams)

The round paid for itself in the first three completions — Cara/Tomi/Aaron all independently named Fix K's narrow coverage as their #1 finding before I had even started reading. With Fix C, Fix M, Fix K2, and Fix Q shipped, the next round should be the first one where the speed-of-use rating distribution shifts toward Safe.
