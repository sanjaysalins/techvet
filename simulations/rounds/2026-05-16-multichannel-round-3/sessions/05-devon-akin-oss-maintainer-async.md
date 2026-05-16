# Session 05 — Devon Akin (12-yr OSS maintainer, Backend / Systems Engineer)

**Agent:** sim-05 (async)
**Date:** 2026-05-16
**Round:** 2026-05-16-multichannel-round-3
**Channel:** Async (CV + JD only, recruiter never speaks to candidate)
**Role template picked:** Custom

## 1. Persona inhabited

Devon's CV is a project README, not a job history. The top of page 1 is
"Maintainer, `tokio-quicstream` — async QUIC streams over Tokio, ~8.4k
stars, 220 contributors". Then a project list: a NATS Rust client he
co-maintains, an eBPF observability sidecar he wrote in C+Rust, a Go
gRPC adapter shim. "Employer" is a one-line `Independent / Open Source
Maintainer (2022 – present)`. Before that: 4 years at a CDN doing edge
networking in C and Rust. He talks about systems in terms of zero-copy,
syscall budgets, and tail latency. He has never on-call'd a 3-region
fleet. He has never managed anyone. The JD is a generic "Backend /
Systems Engineer, Rust preferred".

## 2. Async — recruiter at desk with CV + JD, no call

> [Recruiter opens TechVet, scans role list]
> [No template fits — there's no "Systems / Networking" template,
>  no "OSS Maintainer" template. Picks **Custom**.]
> [Reads CV top to bottom, types each named tech into search]
> [Search: "Rust" → hit, add. Types version `1.85` (current stable as
>  of CV date), depth `very-deep`, scope: leaves blank]
> [Search: "Tokio" → no hits. Types "tokio-quicstream" → no hits.
>  Types "async runtime" → no hits. Recruiter writes a sticky note.]
> [Search: "NATS" → no hits. Sticky note grows.]
> [Search: "eBPF" → no hits. Sticky note grows.]
> [Search: "Go" → hits. Adds, types `1.22` (guess from CV date), depth
>  `working`. CV doesn't say a Go version anywhere — recruiter is
>  guessing.]
> [Search: "C" → hits, opens checklist. 12 services. Recruiter ticks
>  pointers, memory-mgmt, structs-unions, build-systems, undefined-
>  behaviour, sanitizers, threading. Stops at 7/12 because the CV
>  doesn't enumerate the rest. Doesn't know if he uses C99 vs C23.]
> [Search: "Python" → adds. No version on CV. Leaves blank, depth
>  `working`. Toggles "I don't remember the version" — actually it's
>  the recruiter who doesn't remember, but the button is the closest
>  fit.]
> [Search: "gRPC" → hits, opens checklist. 10 services. CV says "gRPC
>  adapter shim" — recruiter ticks unary, protobuf-schema, codegen.
>  Three of ten. Has no idea if he does streaming.]
> [Search: "Linux internals" → no hits. Search "Linux" → no hits.
>  Recruiter doesn't know what to do. Skips.]
> [Recruiter clicks Summary. Done in ~7 minutes total — fast for async
>  but with five sticky notes to attach as a separate Word doc.]

## 3. What TechVet would output

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| Rust | 1.85 | very-deep | (blank) | Excellent (1.85 ≥ 1.85 Green; depth lift n/a — already Green; scope undefined → no cap) |
| Go (Golang) | 1.22 | working | (blank) | Good (1.22 ≥ 1.21 Green tier) |
| C | 7/12 (58%) | working | (blank) | **Yellow** — 58% < 66%, fires "Review / Probe — 7/12 services". Depth=working, no lift on checklist (Fix A). |
| Python | (blank) + "I don't remember" | working | (blank) | Yellow "Review / Probe", no lift (Fix B). Enterprise note suppressed (depth=working actually does fire it — see bug #1 below). |
| gRPC | 3/10 (30%) | (default unknown) | (blank) | **Yellow** — 30% in 25–66% band. No "evaluation note" indicating recruiter inferred from a one-line CV claim. |

**Summary screen:** 2 Greens (Rust, Go), 3 Yellows (C, Python, gRPC),
0 Reds. Radar shows Language (Rust+Go+C+Python), Backend (gRPC). Two
of five categories represented; AI/ML, Cloud, DevOps, Frontend, Mobile,
Testing, Database, Auth, Data all empty. The headline number — "60%
Green coverage" — looks decent. The hiring manager reading the PDF will
get **none** of the actual signal: that this candidate wrote a popular
async Rust networking library from scratch.

## 4. Accuracy judgement

- **Where it's right:** Rust = Excellent is correct. Go = Good is
  defensible (he uses Go but it's not his identity tech).
- **Where it over-rates:** Python at Yellow when the CV barely
  mentions it — the verdict is indistinguishable from "candidate
  legitimately probed and found gaps". An async-channel Yellow is just
  "recruiter had nothing to write" but the report doesn't say that.
- **Where it under-rates:** Rust at "Excellent" is the *same* badge a
  bootcamp grad with `cargo new` would get if they typed `1.85`. The
  tool has no way to surface "this person *wrote a Tokio-adjacent
  library with 8k stars*". gRPC Yellow at 30% is wrong in the other
  direction — he co-authored an adapter shim; he likely knows
  streaming and interceptors cold, but the recruiter (not the
  candidate) couldn't infer the checks from the CV.
- **Where it's silent on something a hiring manager would need to know:**
  Tokio, async runtimes, eBPF, NATS, QUIC, kernel-bypass networking,
  protocol design, library design, OSS maintenance, syscall-level
  performance work. **The entire identity of the candidate is invisible
  to the report.** A backend hiring manager looking at this PDF would
  see "Rust + Go + some Python, missing cloud and DB" and pass — when
  the right read is "specialist who's wrong-shape for an ops role and
  exactly-right for an infra-team founding hire".

## 5. Friction during the call (async equivalent)

Async friction is different — no candidate to lose attention. The
friction is **inference under ambiguity** and **dead-end search**:

- 5 named technologies on the CV (Tokio, NATS, eBPF, Linux internals,
  async/await) returned zero search results. Recruiter has no
  capture path — the round-2 cross-cut Fix C (named-but-not-in-catalog
  capture) is exactly this gap, still not shipped. In async the failure
  mode is silent: the recruiter just types into a sticky note and the
  PDF never knows.
- Python had no version on the CV. Recruiter used "I don't remember"
  — but that toggle is for the *candidate* not remembering, and on
  the report it'll read as "candidate couldn't quote a version" when
  the truth is "CV didn't mention". Same control, two completely
  different meanings.
- gRPC checklist required the recruiter to guess from one CV bullet.
  No "I'm inferring, candidate not present" mode. Coverage % becomes
  a fiction.
- C checklist worked OK structurally but left recruiter making 12
  guesses with no candidate to confirm.

## 6. Bugs / structural defects

1. **Enterprise-note misfire on async unknown-version + depth=working
   (regression in spirit of Fix 5).** `scoring.ts:152-153` —
   `candidateHasMeaningfulDepth` is true at `working`, so an
   inferred-from-CV Python with the recruiter clicking depth=working
   *to record what they read* will fire "Still widely used in many
   enterprise applications" on Python (which doesn't carry the flag,
   so this specific case is fine — but the same path would fire on
   any unknown-version + working tech that does carry the flag, e.g.
   if recruiter inferred "Java" from the CV with no version). The
   round-1 fix only suppressed for `depth ≤ shallow`. In async,
   `working` is the natural depth choice for "the CV claims this"
   — there's no candidate to probe, so depth becomes a recording
   convention, not an evidence claim. **Severity: Medium.**

2. **No "inferred from CV" / source-of-claim flag.** Async-mode use
   is structurally different from phone/video — every depth setting
   is a recruiter inference, not a candidate probe. The data model
   has no way to mark "this came from CV reading, not from
   conversation". The PDF reads identical for both. **Severity: High
   for async use.** This is the async-channel analogue of the
   round-1 D2 (reviewer/architect depth missing).

3. **Custom template + zero categorical scaffolding = silent
   under-coverage.** On a Custom template the recruiter has no
   prompts. The CategoryPrompt ("Other technologies in these
   categories?") fix from 2026-05-15 only fires for categories *with
   at least one tech logged*. Devon has 0 in Cloud / Database /
   DevOps / Testing — categories the JD presumably cares about. The
   PDF will simply omit them with no "we never asked" indicator.
   This silently flatters the candidate by hiding gaps. **Severity:
   High.**

4. **Excellence-of-creation invisible.** Rust verdict for the author
   of a 8k-star Rust async lib is *identical* to a bootcamp grad
   typing `1.85`. There is no `creates|consumes` axis, no
   "OSS-maintainer" annotation, no integration with public signal.
   Adjacent to D1 ("strong-senior indistinguishable from mid"), but
   structurally different — D1 is about depth-lift capping; this is
   about there being no input field at all for "wrote the library
   itself". **Severity: High** for OSS-maintainer / library-author
   shapes.

5. **Catalog gap cluster: systems programming.** Tokio, async-std,
   QUIC, eBPF, NATS, MQTT, Linux kernel, io_uring, DPDK, mTLS,
   Envoy, Cilium (also flagged in Cara's brief). For a tool whose
   role list includes "Backend" and "DevOps", missing async runtimes
   *for languages already in the catalog* is striking. Rust without
   Tokio is C# without `.NET`. **Severity: High.**

## 6b. Speed-of-use rating (REQUIRED)

- **Entry time (estimate).** Per-tech in async: search (2s) + click
  add (1s) + type version (3s) + depth dropdown (2s) + skip scope
  (0s) ≈ **8s per known tech**. *But*: each unsearchable tech costs
  20–30s of "is it under a different name? maybe abbrev? give up,
  sticky note". Five unsearchable techs ate ~2 of the 7 minutes.
- **Phone-shrink test.** This exact session would **collapse on
  phone**. The candidate would name Tokio, NATS, eBPF, async-std,
  io_uring back-to-back in 30 seconds. Recruiter would fall behind
  on tech #2 and abandon the rest. The Custom template makes it
  worse — there are no preloaded cards to lean on, every tech is a
  search-from-cold. A phone recruiter would close the laptop and
  type into Notes.
- **Friction that vanishes on phone.** Async-only: the recruiter has
  the *luxury* of re-reading the CV bullet to decide between
  `working` and `deep`, and the time to write sticky notes for the
  five misses. On phone, both luxuries vanish — depth picks become
  reflex (default to `working`) and unsearchable techs are simply
  forgotten as the candidate keeps talking.
- **Risk / safe rating.** **Unworkable on phone for this candidate
  shape.** The whole point of an OSS-maintainer profile is the
  techs the catalog doesn't know yet (libraries in flight, kernel
  bypass, niche protocols). Speed-of-use does not save you when the
  *vocabulary* is missing.

## 7. Catalog gaps

Tokio (and async-std), NATS, eBPF, io_uring, QUIC, mTLS / X.509 work,
DPDK, AF_XDP, Cilium, Envoy, kernel bypass. "Linux internals" is a
meta-skill that probably belongs in a methodology section (D4), not as
a tech entry. "Async/await patterns across languages" is also
methodology — currently distributed across ~7 catalog entries' probe
text but ungatherable.

## 8. One-liner for cross-cut

> **Devon Akin — Custom template (async) — OSS maintainer of an 8k-star
> Rust async lib gets a "60% Green" PDF that's indistinguishable from a
> mid-level Rust hobbyist; five named techs (Tokio, NATS, eBPF, async-std,
> Linux internals) silently vanish into recruiter sticky notes because
> Fix C (named-not-in-catalog capture) hasn't shipped, and Custom
> template has no categorical scaffolding to surface absences.**

## 9. Recommendation

Highest-leverage single change for **this** session: ship Fix C
(named-but-not-in-catalog capture). Even a free-text "techs the
candidate / CV named that we couldn't log" field, surfaced as a
first-class section on the PDF, would have rescued this report — the
hiring manager would at least see "Tokio, NATS, eBPF, async-std,
Linux internals" appear *somewhere*, and could draw the right
inference. Without it, async use of TechVet on a non-mainstream
profile produces an actively misleading report — worse than no
report, because the absences read as gaps rather than as catalog
limits. Second priority: a Custom-template categorical-coverage
prompt that fires *before* Summary even when no card has been logged
in a category, asking "did you check Cloud? Database? Testing?" —
otherwise async + Custom is a silent under-coverage trap.

## Optional — Disagreement with prior fixes

Fix B (no depth-lift on unknown-version) is correct for phone but
borderline for async. In async the recruiter's depth click is a
*recording* of what the CV claimed, not a probe of the candidate.
Suppressing the lift means the report can't distinguish "CV
prominently features this" from "CV mentions in passing". A
channel-aware split (or, simpler: an "evidence source" enum with
`probed | inferred-from-cv | self-reported`) would let async use
the depth signal without re-introducing the phone-screen over-rate.
