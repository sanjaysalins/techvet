# Session 06 — Owen Kelleher (Mid · 1.5 yr coding, 5 yr DevRel before · Internal transfer, Backend)

**Agent:** sim-06 (Opus 4.7)
**Date:** 2026-05-16
**Round:** 2026-05-16-round-4-validation
**Channel:** Async (CV-only, no call)
**Role template picked:** Backend Engineer

## 1. Persona inhabited

Owen is 31, transferred internally 18 months ago from a 5-yr DevRel post
at a mid-sized CI/CD vendor. As a DevRel he ran live coding demos,
authored blog posts, gave conference talks, and maintained the public
SDK samples — so he can *talk* CI/CD architecture with unusual fluency,
and he genuinely shipped Go code for sample apps. But the ICs he's now
working alongside have 5-8 yr of real backend tenure. His Go service is
the billing-event ingestor (Postgres + a goroutine pool); he co-owns
deploys to AWS Lambda + S3 via the company's CodeBuild/CodePipeline,
manages IAM roles for that one service, and has a competent Docker
working knowledge from years of demo-env wrangling. His CV is what makes
this hard: it foregrounds both roles equally, lists AWS in the skills
strip without scoping, and the JD is for a senior platform engineer.

## 2. Async session — recruiter logging from CV + JD

> [R: Backend template loads → nodejs/python/postgresql/redis/docker/kubernetes. Channel pill set to "Async". Candidate-context: seniority=Mid, years="1.5", pathType=internal-transfer, candidateContext="5 yr DevRel before"]
> [R: removes nodejs ("CV doesn't mention it"). Removes redis (same). Removes k8s (CV says "AWS Lambda + S3 via CodePipeline" — no K8s).]
> [R: searches "go", adds Go. CV says "Go 1.22". Depth: hesitates — picks Working (CV bullet "owned billing-event ingestor in Go").]
> [R: Postgres stays. CV says "PostgreSQL 15". Depth Working.]
> [R: Docker stays. CV says "Docker for local dev + demo envs". No version. Toggles "I don't remember". Depth Working.]
> [R: AWS — opens checklist. CV bullets: "AWS Lambda, S3, IAM, CloudWatch, CodeBuild, CodePipeline". Ticks Lambda, S3, IAM, CloudWatch = 4/14. CodeBuild/CodePipeline → no tick (not in checklist). Recruiter types them into the named-only chip strip via the no-results CTA.]
> [R: searches python, adds. CV: "scripting / DevRel demos". Depth Shallow, no version.]
> [R: scans rest of CV — nothing else hits the catalog. Heads to Summary.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Go | 1.22 | Working | — | **Good** (green; tier 1.21+) |
| PostgreSQL | 15 | Working | — | **Good** (green; tier 14+) |
| Docker | (none, unknownVersion=true) | Working | — | **Yellow "Review/Probe"** (Fix B: no lift) + enterprise note |
| AWS | 4/14 (29%) | — | — | **Yellow "Review/Probe — 4/14"** (25–66% band) |
| Python | (none) | Shallow | — | **Yellow** (version-mode unknown path, no toggle → `notDiscussed=false` because depth was set; falls into Yellow "Review/Probe") |

Plus 2 named-only chips: **CodeBuild**, **CodePipeline**.
K8s/Redis/Nodejs not in items (removed). Template `notDiscussed` cards: none preloaded survived removal.

**Headline:** 2 Green / 3 Yellow / 0 Red. Async channel chip in header. Candidate-context line: *Mid · 1.5 yr in industry · Internal transfer (non-eng → eng) · 5 yr DevRel before*. Async "Not on the CV / JD" copy not triggered (recruiter pruned untouched cards rather than leaving them).

## 4. Accuracy judgement

- **Where it's right:** Go + Postgres Green is fair — CV claims, JD context supports, no over-rate. Docker Yellow + enterprise note is a reasonable "verify the version" cue. The candidate-context line **does** distinguish Owen from a 1.5-yr junior: a hiring manager reading "Mid · 1.5 yr · Internal transfer · 5 yr DevRel before" will not misread him as a bootcamp grad. **Fix M works as intended for this persona.**
- **Where it over-rates:** **AWS is the wrong shape, not the wrong tier.** 4/14 = Yellow is "feels about right" but for the wrong reasons. Owen's actual AWS depth on Lambda/S3/IAM for one service is genuinely deep (he ships it; he debugs prod IAM); his breadth is narrow by design. The checklist conflates coverage with competence — same Yellow as a junior who *ticked* 4 boxes without operating any. Also, **CodeBuild + CodePipeline are missing from the AWS checklist** so two of Owen's strongest AWS surfaces don't count toward coverage at all. They land in the named-only "Candidate mentioned" chip strip (Fix C works — good), but they don't lift the AWS score.
- **Where it under-rates:** Owen's *CI/CD operational depth* — the thing that actually transfers from DevRel — has nowhere to live. There's no GitHub Actions on his CV (the company uses CodePipeline) and no "CI/CD platform familiarity" axis. His 5 yr at a CI/CD vendor reading SDK source, debugging customer pipelines, and writing reference architectures is invisible in the report. Hiring manager reads "Mid backend, 1.5 yr coding, narrow AWS" — misses the angle that makes him interesting for a platform role.
- **Where it's silent on something a hiring manager would need to know:** The async channel chip and the candidate-context line are both rendering, but there's **no per-tech provenance**. The hiring manager can't tell that "Go Green" came from a CV bullet vs from a deep call probe. Async-mode evidence is structurally weaker than phone-mode evidence and the report doesn't say so beyond the header chip. Fix Q gets the framing right at the section level but not at the per-tech level.

## 5. Friction during the session

- **Backend template pollution.** Three of the six preloaded techs (nodejs/redis/k8s) had to be hunted down and removed for Owen's CV. ~15s of clicking-around at the start of an async session — fine here, painful on phone (carryover from Eitan's session).
- **AWS checklist 14 services, two of Owen's missing.** The recruiter has to mentally translate "CodeBuild = ?" and "CodePipeline = ?" — not in the checklist — and then *also* type them into the named-only field. Two paths for the same intent. The named-only chip strip is the right escape hatch (Fix C) but the AWS score doesn't reflect that Owen operates two AWS services the catalog can't see.
- **No scope dropdown reach.** Same as Eitan — recruiter never opens it. Backend template has no `techScopes`, so AWS sits at operator-implied. For Owen this is *correct* (he genuinely operates the AWS slice) but the recruiter has no way to express "deep on this narrow subset" vs "broad-and-shallow".

## 6. Bugs / structural defects

1. **Backend template has no `techScopes` entry.** Round-3 K2 shipped per-template scope hints for SA / SRE / Security but Backend was skipped. For Owen this happens to be fine; for the next SE→backend candidate (Eitan-shape) who claims wide AWS, the rubber-stamp problem from round 3 is unchanged. Evidence: `src/data/roles.ts:34-38`. **Severity: Medium** (depends on the next persona; no failure for Owen specifically).
2. **AWS checklist missing CodeBuild + CodePipeline.** These are first-class AWS services in any CI/CD-adjacent role. They land in the named-only chip strip instead of contributing to AWS coverage. Evidence: `src/data/technologies.json:1939-1996` (no codebuild/codepipeline in the 14-service list). **Severity: Medium.**
3. **AWS has no `defaultScope`.** Eitan's session-10 recommendation to add `defaultScope: "operator"` (or restrict via scope) to AWS/Azure/GCP was not actioned in the round-4 ship. For Owen this is non-blocking (he is an operator on his slice) but the structural gap Eitan flagged is still open. Evidence: `src/data/technologies.json:1935` (no `defaultScope`); also no integrity guard requiring one for Cloud category. **Severity: Medium.**
4. **Candidate-context renders unconditionally beneath role line.** No visual gap between `Role: Backend Engineer` and `Mid · 1.5 yr in industry · Internal transfer (non-eng → eng) · 5 yr DevRel before` — they read as one wrapped run. A small typographic separator (or a "Profile:" prefix) would help the hiring manager scan. Evidence: `src/screens/Summary.tsx:187-191`. **Severity: Low.**
5. **Async-mode untouched cards: the recruiter pruned rather than left.** I removed nodejs/redis/k8s rather than leaving them to fall into the Fix Q "Not on the CV / JD" section. Both behaviors are valid but the tool doesn't suggest which to do — and the K8s "absent from CV" is *positive coverage signal* for a non-K8s shop, which removal loses. **Severity: Low** (UX nudge, not a bug).

## 6b. Speed-of-use rating

- **Entry time (estimate).** Async has no clock pressure but I logged 5 techs + 2 named-only + 3 template-removals + 4 AWS ticks in ~3 min. Per-tech median ~25s (slower than phone because the recruiter re-reads the CV line for each).
- **Phone-shrink test.** This exact workflow would survive a phone call only because I logged few techs. The two things that break under phone shrink:
  (a) **Removing 3 of 6 Backend template defaults** at the top is dead weight the recruiter doesn't have time for. Backend template's choice of `nodejs` as the default backend language costs every non-Node candidate ~5-10s.
  (b) **CodeBuild/CodePipeline named-only capture** requires the recruiter to (1) search, (2) find no results, (3) click the named-only CTA, (4) confirm the spelling. Three deliberate steps per missing-AWS-service. On a phone call with a candidate rattling services, this falls behind immediately.
- **Friction that vanishes on phone.** Re-reading the CV. Considering which template defaults to prune vs leave for the "Not on CV/JD" section. Opening the scope dropdown to think — but the recruiter never reaches it on phone either, so this is a wash.
- **Risk / safe rating.** **Safe for this async session, At-risk if shrunk.** The async copy + candidate-context line both render correctly and meaningfully distinguish Owen. The K2-Backend-techScopes gap is latent until a more over-claiming candidate hits the Backend template.

## 7. Catalog gaps

- **AWS CodeBuild + CodePipeline missing from the AWS checklist.** First-class services; Owen's strongest claim. Should be added.
- **No "DevRel / developer advocacy" path-type option.** PathType enum has internal-transfer (which I used) but the *prior* role's shape isn't represented. The free-text candidateContext field carries "5 yr DevRel before" but it's a string the hiring manager has to parse rather than a structured signal. Possibly out of scope — but worth flagging as a recurring tag.
- **No CI/CD-platform-familiarity axis.** Owen's 5-yr CI/CD-vendor tenure (read SDK source, debugged customer pipelines) is the most-transferable part of his pre-transfer career and has nowhere to live. Same shape as Mei's "methodology has nowhere to live" structural defect (D4) — DevRel/SE adjacent careers carry skill, not just tools.

## 8. One-liner for cross-cut

> **Owen — Backend Engineer / Async — Fix M renders the internal-transfer context correctly and Fix Q's async chip lands; but Backend template still has no `techScopes`, so the next SE→backend transferer with a broader AWS claim will hit the Eitan rubber-stamp failure unchanged.**

## 9. Recommendation

**Fix M closes the Owen case — but only because Owen happened to claim narrowly on AWS.** The single highest-leverage next change is to extend K2's `techScopes` to the Backend template (something modest — `aws: 'operator'` to make the scope explicit and put it on the recruiter's radar) AND add CodeBuild + CodePipeline to the AWS checklist. The deeper fix Eitan asked for — `defaultScope: "operator"` on the three cloud providers with an integrity guard — still belongs on the priority list; today's M ship doesn't close it.

## Disagreement with prior fixes

Fix M validates cleanly here, but the round-3 cross-cut framing of M as "closes the Eitan/Owen failure mode" is half-right. M makes the *PDF readable* by the hiring manager (great). It does **not** prevent the *AWS over-rate* that was Eitan's actual scoring problem. The Eitan failure had two halves: (1) PDF is profile-blind (M fixes), (2) AWS 10/14 Green misreads SE-rattle as backend competence (M does NOT fix; needs the cloud-provider scope default + per-tick provenance). Treating M as a full close on that cluster will leave the AWS-rattle failure latent until the next SE-shape candidate hits the Backend template.

## Edge case for the cross-cut

Open question: when a recruiter prunes Backend template defaults (nodejs/redis/k8s) because the CV doesn't mention them, the report loses the "asked & confirmed absent" / "not on CV" positive-coverage signal that Fix L was designed to surface. Is async-mode template-pruning the right default behavior, or should the recruiter be nudged to leave template defaults untouched so the Fix Q "Not on the CV / JD" section can do its job? Worth a per-channel default-removal-vs-leave UX decision.
