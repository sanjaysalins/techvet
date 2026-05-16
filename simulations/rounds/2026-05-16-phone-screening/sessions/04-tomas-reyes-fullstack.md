# Session 04 — Tomás Reyes (Mid, Full-Stack)

**Agent:** sim-04 (2026-05-16 phone-screening round)
**Date:** 2026-05-16
**Round:** 2026-05-16-phone-screening
**Channel:** Phone (5-10 min)
**Role template picked:** Full-Stack Developer

## 1. Persona inhabited

Tomás is the kind of mid-level full-stack engineer the modern T3-stack startup factory mints by the dozen. Four years at one YC company that hit Series B and then stalled; the title says "full-stack" but in practice he ships product features against an opinionated, almost zero-ops Vercel + tRPC + Postgres + Stripe stack that someone more senior wired up before he arrived. He's fluent in App Router patterns, tRPC routers, Tailwind, Zod, React Query, and Stripe webhooks. He has never opened the AWS console, has never written a Dockerfile (Vercel builds for him), and his "Postgres" is whatever connection string Supabase handed him. He hedges constantly ("we", "the platform handles that") and is mildly evasive about versions because the team doesn't actually own upgrades — his lead does. He'll claim Next.js 15 because the marketing site said so; the app is actually on 14.2.

## 2. Phone call — abbreviated

> R: "Walk me through your stack day to day."
> T: "Mostly Next.js — App Router. TypeScript everywhere. tRPC for the API. Postgres on the backend, Tailwind on the front."
> [Recruiter: clicks Next.js (already a template tech? no — adds), types "15", depth = working. Adds tRPC — searches "trpc", finds it, types "11", working. TypeScript preloaded — types "5.4", working. Tailwind preloaded? No, not in Full-Stack template — adds, types "3", working.]
> R: "And database?"
> T: "Postgres. Honestly I don't know the version, Supabase manages it."
> [Recruiter: opens Postgres (preloaded), clicks "I don't remember", depth = working. Pauses — doesn't know what to do about Supabase.]
> R: "Hosting?"
> T: "Vercel, all-in."
> [Recruiter: searches "Vercel" — nothing. Searches "vercel" — nothing. Skips.]
> R: "Payments?"
> T: "Stripe — I own the subscription flow and the webhook handlers."
> [Recruiter: searches "Stripe" — nothing. Frowns. Types "Stripe — owns subs + webhooks" into the meta-notes field, hopes the hiring manager reads it.]
> R: "Anything else? Python? Redis? AWS?"
> T: "A bit of Python for ETL scripts, nothing serious. Redis is there but the senior wired it up. No AWS."
> [Recruiter: adds Python, "I don't remember", depth = shallow. Opens Redis — adds it from search, "I don't remember", depth = shallow. AWS preloaded — clicks "Not in stack". Docker preloaded — "Not in stack". Node.js preloaded — leaves it, asks "what Node?" Tomás: "no idea, Vercel manages it." Recruiter: "I don't remember", depth = working. React preloaded — never came up; recruiter leaves at unknown/unknown.]
> [Recruiter prompts "Other technologies?" — adds nothing else; runs out of time.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Next.js | 15 | working | — | **Excellent** (Green) |
| tRPC | 11 | working | — | **Excellent** (Green) |
| TypeScript | 5.4 | working | — | **Good** (Green) — 4.9 ≤ 5.4 < 5.5 |
| Tailwind CSS | 3 | working | — | **Good** (Green) |
| PostgreSQL | unknown | working | — | **Review / Probe** (Yellow) + "Still widely used in many enterprise applications" |
| Python | unknown | shallow | — | **Review / Probe** (Yellow) — no enterprise note (suppressed by shallow + unknownVersion) |
| Redis | unknown | shallow | — | **Review / Probe** (Yellow) — no enterprise note |
| Node.js | unknown | working | — | **Review / Probe** (Yellow) + "Still widely used in many enterprise applications" |
| React | (untouched) | unknown | — | **Review / Probe** (Yellow), no enterprise note |
| AWS | — | — | — | **Not in candidate's stack** (gray, excluded) |
| Docker | — | — | — | **Not in candidate's stack** (gray, excluded) |

**Summary headline:** 4 Green, 5 Yellow, 0 Red. Radar: 5 categories present (Frontend, Backend, Database, Language). PDF would emphasize Strengths (Next.js, tRPC, TS, Tailwind) and Probe Further (Postgres, Node, Python, Redis, React). Vercel and Stripe absent entirely.

## 4. Accuracy judgement

- **Where it's right:** Next.js / tRPC / TS / Tailwind landing Green is the correct read on his core skill — these are the things he ships every day. The Yellow on Python (shallow + unknown) correctly signals "don't lean on this." Marking AWS / Docker "Not in stack" cleanly excludes them from the score, which is the right call.
- **Where it over-rates:** **Next.js 15 → Excellent is a lie the tool can't catch.** Tomás said "15" because he saw it in a release-notes blog; the running app is 14.2. There is no way for the recruiter to know, and the tool has no notion of "verify this version claim against repo evidence." Same shape as Vikram's GenAI overclaim — but for version, not depth. **tRPC 11 / scope=undefined → Excellent** also probably over-rates: he writes routers but didn't design the auth/context plumbing. Scope=author would have been more honest, and the tool wouldn't have flagged anything because there's no Yellow→Green lift to cap (he naturally hits Green).
- **Where it under-rates:** **PostgreSQL → Yellow with enterprise note is misleading downward.** Tomás writes Prisma queries against Postgres every single day; he just doesn't track the version because Supabase manages it. The Yellow + "still widely used in many enterprise applications" framing reads like "he last touched this on a legacy project" — the exact opposite of his reality. The enterpriseStillUsed note here is firing on a managed-platform user where the version is structurally invisible, which the 2026-05-15 fix-5 was supposed to clean up — but the depth=working branch still serves the note. **Node.js → same problem, same root cause.**
- **Where it's silent on something a hiring manager would need to know:** Three things, all critical:
  1. **Stripe ownership.** He owns subscription flow + webhooks. That's the single most important sentence in the report and there's nowhere to put it.
  2. **Vercel as cloud.** A hiring manager evaluating him for an AWS shop needs to know he has *zero* hands-on cloud infra. The "Not in stack" gray badge on AWS conveys "didn't use AWS" but not "has never operated a cloud at all." Big difference.
  3. **Supabase / Prisma / managed-platform pattern.** His entire backend posture is "the platform does it." A hiring manager screening for an on-prem K8s shop would absorb 4 Greens and miss the ramp-up cliff.

## 5. Friction during the call

- **Searching for Vercel / Stripe / Supabase / Prisma → zero results, four times.** Recruiter has no fallback workflow — does she type them in the mandate notes? Skip silently? Each miss costs ~3-5 seconds and a hiccup in the call rhythm.
- **"Not in stack" decision for preloaded AWS/Docker.** Easy in retrospect, but on a phone call the recruiter has to make the leap "he uses Vercel therefore not AWS" — not obvious for a non-technical recruiter. If she hesitates and leaves them at unknown/unknown, both score Yellow and pollute the radar with false signal.
- **Postgres "I don't remember" — depth choice is unclear.** He uses it daily but doesn't know the version. Is that "working" or "deep"? The recruiter picked "working" defensively. With scope=undefined and unknownVersion the tool gives him the same Yellow it would give a candidate who last touched Postgres in college.
- **Scope dropdown was shipped today and the recruiter never used it.** Reasonable on a first phone screen — there's no time to evaluate scope on every tech. But that means Tomás's tRPC=author distinction (which would have been useful) never materializes.
- **React preloaded but never discussed.** Tomás frames everything through Next.js. Recruiter doesn't know whether to delete React or leave it. Left it; it scores Yellow with no version. Pollutes the Probe Further section with a non-issue.

## 6. Bugs / structural defects

1. **Enterprise-note misfires on managed-platform daily-driver pattern.** When a candidate uses Postgres/Node via a managed platform (Vercel, Supabase, Render, Fly), the version is structurally unknown but their hands-on depth is high. Current rule (`scoring.ts:131-146`) fires the "still widely used in enterprise" note when `depth ≥ working`, which is exactly when this misfire is loudest. The note reads as a legacy-tech reassurance but is being applied to people on the bleeding edge of the managed-platform pattern. **Severity: Medium** — it's not wrong wrong, but it actively misleads the hiring manager in the direction the recruiter least wants. Suggestion: introduce a third state ("Managed — version not user-controlled") accessible from the unknown-version path.

2. **No way to record platform-as-cloud claims.** "Vercel" / "Fly" / "Render" / "Railway" / "Netlify" are the cloud for an entire generation of full-stack engineers and they have no representation. Marking AWS "Not in stack" understates the gap (reads as "didn't use AWS") rather than capturing "operates no cloud at all". **Severity: High** for full-stack screening — this is the single biggest catalog gap for the persona the Full-Stack template is built around.

3. **Stripe / payments has no category and no entry.** For B2C and B2B SaaS recruiting this is the most-asked-about non-database integration, full stop. **Severity: High** for product engineering roles; lower for infra/data.

4. **Version claims accepted at face value.** No mechanism to flag a version that's improbable (Next.js 15 in 2026 is plausible; Next.js 15 paired with App-Router-but-no-server-actions, less so). Not a "bug" the tool can fix alone, but the Excellent badge gives the version claim a credibility halo it didn't earn. **Severity: Low** — out of scope unless the tool starts asking corroborating probes.

5. **Preloaded techs that the candidate never mentions stay at unknown/unknown and count toward Yellow.** React in this session is a noise Yellow with no signal. Either prompt the recruiter at end-of-call to "skip techs not discussed" or auto-exclude unknown-version + unknown-depth from the radar. **Severity: Medium** — pollutes the Probe Further bucket with non-issues, which dilutes the real ones.

## 7. Catalog gaps

Tomás named six techs that the catalog handles cleanly (Next.js, tRPC, TypeScript, Tailwind, Postgres, Redis, Python, Node, React). He named **three** that the catalog has no answer for, all of which are core to his actual job:

- **Vercel** — his cloud. Belongs in a new "Platform-as-a-Cloud" category alongside Fly.io, Render, Railway, Netlify, Cloudflare Pages/Workers. Without it, the "no AWS" reading is incomplete.
- **Stripe** — payments. There is no "Payments" or "Third-party APIs" category. Adjacent gap: Twilio, SendGrid, Plaid, Auth0 (Auth0 is in the catalog but lonely).
- **Supabase / Prisma** — Supabase is in the catalog (Database). Prisma is not; for the T3-stack persona it's the unit of Postgres interaction. Worth adding alongside Drizzle (RESUME.md priority #10 already lists both — agreed).

Tier ranges that misread him: none. The Postgres / Node misread is depth-axis, not tier-axis.

## 8. One-liner for cross-cut

> **Tomás — Full-Stack Developer — 4 Green / 5 Yellow PDF that flatters his Next.js/tRPC core and hides three of his most important work surfaces (Vercel, Stripe, Supabase) behind catalog silence; Postgres scores Yellow on a managed-platform daily driver because version is structurally invisible.**

## 9. Recommendation

The single highest-leverage change for this session would be a **"managed-platform" first-class concept on the version axis**, alongside "I don't remember" / "Not in stack". Today the unknownVersion + working-depth path collapses two very different candidates onto one Yellow tile: the legacy-Postgres-on-EC2 engineer and the Supabase-Prisma daily driver. Splitting them into "version not known" vs. "version not user-controlled" would (a) suppress the misleading enterprise-still-used note for the latter, (b) free the badge to read Green-with-caveat instead of Yellow, and (c) give the recruiter a single dropdown click to capture the architectural posture that defines this entire persona. Pair it with catalog entries for Vercel / Stripe / Prisma (RESUME priority #10) and the next Tomás-shaped candidate gets a PDF that actually describes him.

## Disagreement with prior fixes

The 2026-05-15 fix-5 ("suppress enterprise note on unknownVersion + shallow") is correct as far as it goes, but it didn't go far enough. The same misfire happens at `depth=working` for the managed-platform case — and the managed-platform case is the entire reason a mid-level full-stack engineer in 2026 doesn't know their Postgres version. The gating condition should not be depth; it should be the *reason* the version is unknown.

## Out-of-scope observations

- A phone-screen recruiter cannot meaningfully use the scope-of-use axis under time pressure. It's a Summary-review-time control, not a live-call control. Consider hiding it on the Assessment screen behind an "expand for more" and surfacing it on Summary review for any tech currently Green where the candidate's depth claim is the only thing keeping it there.
- The "Other technologies in this category?" prompt before Summary is genuinely useful here — it gave the recruiter a last chance to remember Stripe / Vercel before generating the PDF. The fact that both are catalog-missing means the prompt's value is currently bottlenecked by catalog coverage, not by UX.
