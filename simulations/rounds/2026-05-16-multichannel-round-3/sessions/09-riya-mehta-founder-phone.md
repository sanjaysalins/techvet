# Session 09 — Riya Mehta (Founder/CTO post-acquihire, Senior IC search)

**Agent:** sim-09 (founder/CTO, phone)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Phone (5-10 min)
**Role template picked:** Full-Stack Developer

## 1. Persona inhabited

Riya ran a 12-person YC startup for 6 years before an acquihire closed last month. She's the canonical founder/CTO: wrote ~40% of the original Python/TypeScript/Postgres codebase 2018-2021, then morphed into reviewer + architect + occasional incident-author after hiring her staff engineer in 2022. Her last hands-on commit on a service of substance is ~3 yr old. She'll *quote* modern versions ("we were on Postgres 16, Node 20, TS 5.4") because she signed off the upgrade tickets — but she has not personally written a non-trivial migration, JOIN, or async iterator in two years. She talks like a senior IC and looks like one on paper. She isn't one anymore in the operator sense.

## 2. Phone call — abbreviated

Recruiter Maya picks **Full-Stack Developer** template (React, TS, Node, Postgres, Docker, AWS). Six pre-loaded cards. Five minutes of call time.

> M: "Walk me through your stack for the last few years."
> R: "Postgres 16 — heavy. TypeScript everywhere, 5.4 ish. Node 20. React 18 on the frontend. Heavy AWS shop, EC2/Lambda/RDS/S3/IAM/SQS/CloudWatch — all of it."
> [Maya: types `16` into Postgres, picks depth=Deep. Card flips Green "Excellent". Types `5.4` TS, depth=Deep — Green. Node `20`, depth=Deep — Green (lifted from Yellow). React `18`, depth=Deep — Green.]
> M: "Docker?"
> R: "Yeah — Compose for local, ECS Fargate for prod. Wrote the original Dockerfiles."
> [Maya: types `24` (guessing current — Riya didn't say a version), depth=Deep — Green.]
> M: "AWS — I'll walk you through services, just say yes/no."
> R: "Yes, yes, ECS yes, no EKS, S3 yes, RDS yes, no Dynamo, API Gateway yes, SQS yes, CloudWatch yes, IAM yes, CDK yes, VPC yes — Step Functions yes."
> [Maya ticks 12/14. Card flips Green "Good — 12/14 services".]
> M: "Anything else big?"
> R: "Stripe, Terraform, Redis, Next.js — but I architected the K8s migration, my staff eng implemented."
> [Maya: out of time. Doesn't add the rest. Hits "Generate Summary".]

Total: 6 techs in ~5 min. **Maya never opens the Scope dropdown once.** She didn't know what to pick and the depth dropdown felt like enough.

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| PostgreSQL | 16 | Deep | — (undefined) | **Excellent** (Green, natural tier ≥14) |
| TypeScript | 5.4 | Deep | — | **Excellent** (Green, ≥5.5? — actually 5.4 < 5.5 → tier `4.9` = "Good" Green) |
| Node.js | 20 | Deep | — | **Good (lifted from Review / Probe by depth)** — Green via depth lift from Yellow tier `20` |
| React | 18 | Deep | — | **Good** (Green, tier `18.0`) |
| Docker | 24 | Deep | — | **Excellent** (Green, tier ≥24) |
| AWS | 12/14 services | n/a | — | **Good — 12/14 services** (Green, 86%) |

Summary headline: **6/6 Green. 0 Yellow. 0 Red.** Radar fully extended on Frontend / Backend / Database / Cloud / DevOps. PDF goes to hiring manager reading: *Strong senior full-stack candidate, hands-on across the stack at modern versions.*

The scope-tune banner ("Tune scope before exporting") **does not fire** for any of these techs — none have `defaultScope` set in the catalog (only AI/ML libs do). So the Summary doesn't even nudge Maya to revisit scope.

## 4. Accuracy judgement

- **Where it's right:** Riya genuinely knows these technologies at architect depth. She *could* sit a code review on any of them and not embarrass herself.
- **Where it over-rates (badly):** Every single Green is operator-implied. The PDF reads "hands-on senior" when the truth is "hasn't written a non-trivial PR in 24+ months." Hiring manager will book her for an IC role, walk her into a sprint, and discover she's slower than a mid-level for 4-6 months. Node 20 specifically was lifted Yellow→Green by depth — a depth-game she'd pass in conversation but not at the keyboard.
- **Where it under-rates:** Nothing — there is no under-rating because there is no Yellow or Red on this report.
- **Where it's silent on something a hiring manager would need to know:** *The single most important fact about this candidate.* She's been a CTO, not an operator. Architect/reviewer/author-of-small-things is her actual scope — and the report has no chip, no note, no flag for it. This is exactly Aliyah's Round-1 failure replayed, except Aliyah was a Solution Architect (where the recruiter might *think* to set scope=architect). Riya looks like a full-stack dev on paper. The recruiter has no prompt to ask the scope question at all.

## 5. Friction during the call

- **Scope dropdown invisibility on phone.** Three controls per card (Version / Depth / Scope) is one too many under time pressure. Maya defaulted to Version+Depth and never touched Scope. She didn't *know* it mattered.
- **Depth dropdown is the wrong UX for this candidate.** "Deep — built features end-to-end" is technically true for Riya circa 2020 — she did. The dropdown doesn't ask *when*. Result: depth=Deep on a 3-year-stale skill = false Green.
- **Docker version guessed.** Riya never said a number. Maya typed `24` from memory of "current is recent." Real candidate didn't volunteer it; tool didn't push back.
- **AWS checklist is fast** — yes/no down 14 items took ~45 sec. This was the one control that worked well on phone.
- **No prompt for "is this person an operator vs an architect"** anywhere in the flow. The whole CTO shape is invisible.

## 6. Bugs / structural defects

1. **Fix K's defaults are too narrow — only AI/ML libs get a sensible default.** AI/ML libs default to `author` because they're library-shaped. But the *opposite* problem applies to backend / DB / cloud: those techs implicitly assume `operator` when the user is a CTO or Staff+ who is actually `architect/reviewer`. The current catalog has `defaultScope` on 10 of 96 techs. The 86 others fall through to the `operator|undefined` branch in `applyScope()` (`scoring.ts:54-60`), which is a no-op. **Severity: High.** This session's entire 6/6 Green sweep is downstream of this gap.

2. **No catalog signal for "scope ambiguous, prompt the recruiter."** Even if we don't ship a default, Postgres/Node/AWS/Docker/K8s could carry a `scopeProbeRequired: true` flag that triggers a visible nudge in the Summary banner (regardless of whether `defaultScope` is set). Today the banner only fires when *implicit* scope is in play (post-Fix-K logic) — but with no default set, scope is `undefined`, the banner stays silent, and the PDF ships. **Severity: High.**

3. **Depth dropdown has no recency dimension.** Riya is "very-deep three years ago." The control offers no way to express that. Picking `deep` lifts Yellow to Green; picking `shallow` is wrong. There is no honest answer. (Fix E queued — `lastUsed` in scoring — would help, but the *primary* signal is scope+recency together, not recency alone.) **Severity: Medium.**

4. **Role template "Full-Stack Developer" has no founder/CTO variant.** The 12 templates encode IC archetypes. A founder/CTO is a different shape — hands-on early, advisory late. No template would ever recommend `defaultScope: architect` for the cloud/backend cards. **Severity: Medium.** (Could be a flag on the role rather than a new template.)

5. **No "candidate context" surface.** RESUME flags Fix M for this. This session is concrete evidence: "6 yr CTO, just exited" should be a chip on the report and ideally drive scope defaults. **Severity: Medium.**

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Per tech: search (3s) + click-add (1s, mostly preloaded) + type-version (4s) + open depth dropdown (2s) + pick depth (2s) = **~10-12s for version-mode**. AWS checklist: 14 yes/no = ~45s, ~3s/service. **Scope dropdown: 0s, never opened.** Total for 6 techs: ~3-4 min. Within phone budget.
- **Phone-shrink test.** It already *was* the phone shrink. What broke: scope was implicit. The recruiter saw three dropdowns per card and silently dropped the third under time pressure. The depth-lift on Node 20 fired without operator-evidence. The Summary's "Tune scope before exporting" banner didn't help because nothing had `defaultScope` set, so the banner never appeared.
- **Friction that vanishes on phone.** A video recruiter would have time to ask "are you the one who wrote this or the one who reviewed it?" — phone Maya cannot. A video recruiter might notice the Scope dropdown sitting there and click it out of curiosity — phone Maya banks on defaults. A video recruiter could read the sticky guidance panel ("operator vs author vs reviewer") — phone Maya does not glance right.
- **Risk / safe rating.** **At-risk.** The mechanics are fast (good) but the defaults are wrong for a non-operator senior. Every CTO/staff-plus going through phone-screen at this agency right now will produce a misleadingly Green PDF.

## 7. Catalog gaps

- **Stripe** — Riya named it twice. Not in catalog (Fix I queued).
- **Terraform** — present, but Riya said "I review the PRs my staff eng writes." There's no way to log "reviewed-only" without Maya opening the Scope dropdown — same Fix-K-defaults gap.
- **Next.js** — present, would have been Green via template-default if it were preloaded. Wasn't. Lost.
- **Redis, K8s** — Riya named both, recruiter dropped them under time pressure. The 2-min cliff hits hard on phone.
- **No "Founder/CTO" role tag or context** — out-of-catalog but in-scope for the tool.

## 8. One-liner for cross-cut

> **Riya Mehta — Full-Stack Developer template — Fix K defaults catch AI/ML libs but leave the 86 non-AI/ML techs operator-implied; CTO/staff-plus candidates get 6/6 Green sweeps because phone recruiters don't open the Scope dropdown for Postgres or AWS.**

## 9. Recommendation

**Extend Fix K's `defaultScope` beyond AI/ML, keyed off the role template, not the tech.** A `Full-Stack Developer` template is operator-implied; a `Solution Architect` template should preload `defaultScope: architect` on its cards; a `Founder/CTO` flag (new) should preload `defaultScope: architect` on backend/cloud/DB and `defaultScope: author` on frontend/language techs. The post-call Summary chip (already shipped) lets the recruiter override per-tech. This closes the Riya/Aliyah class of misreadings without adding a single control to the per-tech card — which is the one thing the phone budget cannot afford.

## Disagreement with prior fixes

Fix K's catalog-side `defaultScope` is the right *mechanism* but the wrong *scoping*. Tagging defaults on AI/ML libs only solves the Vikram/Priya cluster; it does nothing for the much larger cluster of seniors-who-don't-operate (Aliyah/Riya/any CTO/any Staff+ who's drifted from the keyboard). Today's RESUME calls Fix K "closes 10/10 phone-screening sessions' scope-unreachable finding" — that's only true for the AI/ML subset. Today's session is direct evidence the cap doesn't fire for backend/cloud, where the same defaulting logic was needed but wasn't shipped.
