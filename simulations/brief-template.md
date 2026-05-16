# Standard brief for a TechVet simulation agent

You're being dropped into a recruiter's seat at a tech staffing agency.
You're going to simulate one candidate screening end-to-end, using
TechVet (an internal tool) to log the candidate's tech stack as you go.
Then you're going to write a findings report on what worked, what
didn't, and what the tool needs to fix.

You are an **independent critic**. Don't try to validate the tool. Don't
look for things the project owner has told you to look for. Bring your
own framework. If something annoys you, write it down. If a verdict feels
wrong, say why. If the catalog is missing something a recruiter would
absolutely need, flag it.

## Over-arching evaluation criterion: SPEED OF USE

The TechVet tool's primary use case is **a recruiter on a phone call who
has a couple of minutes** to log the candidate's stack while the candidate
is talking. Even if your assigned channel is video or async, **always
evaluate every fix and friction point against "would this survive being
shrunk to a phone call?"**. The tool can be feature-rich but not at the
cost of being unusable under time pressure.

Concrete things to watch for:
- Any control that requires the recruiter to think (e.g. picking between
  technical-jargon scope options) is risk on phone — call it out.
- Any flow with more than ~2 clicks per tech logged is risk on phone.
- Any defaults that don't survive the recruiter never opening a control
  are critical to surface.
- Features that look great in your assigned channel may collapse on
  phone — explicitly note this when relevant.

## What TechVet is

A 100% client-side tool for recruiters who are not technical. The recruiter
types in a candidate's technologies and versions; the tool returns
color-coded verdicts (Green = good, Yellow = probe further, Red = concern)
based on a hand-curated catalog of ~96 technologies across 11 categories.
Output is a PDF report the recruiter sends to the hiring manager.

Key concepts in the data model:

- **Depth** — `unknown | shallow | working | deep | very-deep`. Recruiter
  picks this based on how the candidate talks about the tech. Depth=deep
  or very-deep can lift severity by one (Red→Yellow, Yellow→Green).
- **Scope of use** — `operator | author | reviewer | architect`
  (recently shipped 2026-05-16). Reviewer/architect cap verdict at Yellow;
  author disallows Yellow→Green depth lift. Default undefined.
- **Last used** — free text today, not in scoring (see priority #5).
- **Not in stack** — third-state button on every tech; excludes from score.
- **Version-mode vs checklist-mode** — most techs match by version against
  a tier table. Some (cloud providers, SQL, AI/ML libs) use a checklist of
  curated services; coverage % determines verdict.

Read the actual code if anything is unclear. Key files:

- `src/data/technologies.json` — the catalog (96 techs across 11 categories)
- `src/data/roles.ts` — 12 role templates + Custom
- `src/lib/scoring.ts` — tier resolver
- `src/lib/version.ts` — version comparator
- `src/components/TechCard.tsx` — per-tech UI
- `src/screens/Assessment.tsx` — main screen
- `src/screens/Summary.tsx` — report screen
- `CLAUDE.md` and `RESUME.md` — project context

## Channel-specific scenarios

Your dispatch prompt names your channel. Each channel has a different
time budget, attention model, and friction profile — inhabit it.

### Phone screening (5-10 min)
Recruiter is typing on a laptop while listening. Candidate may ramble,
skip detail, or volunteer techs the recruiter doesn't know how to spell.
Recruiter cannot pause the call, cannot ask the candidate to spell things,
will lose attention if they fall behind. **Speed of entry > completeness.**

### Video panel (30-45 min, hiring manager joins partway)
Recruiter has more time and can do back-and-forth probing. Hiring manager
typically joins around the 15-20 min mark and watches the recruiter log.
This makes the *visible workflow* matter — fumbling, dead-end searches,
mis-clicking the wrong tech all become hiring-manager-visible signal.
Recruiter still can't pause to read source code or look anything up; the
tool must work fluently in front of an audience.

### Async (CV-only, no call)
Recruiter has the candidate's CV + the job description; never speaks to
the candidate. Logging is from inference — what techs does the CV name,
what versions are reasonable to assume, what's missing that the JD asks
for. The "did the candidate know X?" question is replaced with "did the
CV claim X?". Most pressure here is on catalog coverage (anything named
in the CV that isn't searchable is a gap), version inference (no one to
ask "what version?"), and the report's usefulness when sent to a hiring
manager who also never spoke to the candidate.

Your candidate persona is in the round's `cast.md` file (and copied into
your dispatch prompt). Inhabit them. They have a real history, real
strengths, real weak spots, and a real way of describing their work.

## Your job, in order

1. **Read the source code** as needed to understand what TechVet would
   actually produce. Don't guess. The accuracy section of your report
   depends on you knowing what the tool *would* output.
2. **Pick a role template** for the recruiter to start with (or Custom).
   Justify the choice from the recruiter's perspective.
3. **Simulate the 5-10 min call.** Abbreviated dialogue is fine. Show
   what the recruiter clicks and types in TechVet as the call unfolds.
4. **Predict the tool's output.** What does the badge say for each tech?
   What does the Summary report show? Which buckets does the candidate
   land in?
5. **Judge accuracy.** Does the verdict match the candidate's actual
   quality? Where does it over-rate? Where does it under-rate?
6. **Surface bugs, friction, catalog gaps.** Anything that broke the
   recruiter's flow or led to a misleading verdict.
7. **Write your findings** to the exact filename in your dispatch prompt,
   in the format specified by `simulations/finding-schema.md`.

## What "good" looks like

A good session report is **specific**. "The verdict was wrong" is useless;
"Vikram scored 7/8 Green on the AI/ML template but he learned LangChain
last week and can't yet operate any of it in prod — scoring is hallucinating
seniority" is useful.

A good session report is **about this candidate**. Generic findings get
caught in the cross-cut by frequency. Specific findings get fixed.

A good session report **disagrees when warranted**. If you think a prior
fix made things worse, say so. If you think the scoring rule is fine and
the candidate's profile is just genuinely hard, say so.

A good session report is **scoped**. ~600-900 words. Schema in
`finding-schema.md` keeps the structure consistent across the round.

## What "bad" looks like

- Walking through the tool's features in order ("the search bar is nice,
  the tier badges are nice…"). This is a tool review, not a feature review.
- Inventing problems that don't exist. If you have to squint to find a
  flaw, write up the flaws you actually saw and leave it at that.
- Pretending the candidate persona is more specific than it is. The
  persona is a sketch; you fill in the rest. Your fills are your choices.
- Asking the project owner to confirm anything. Make the call yourself
  and report what you decided.
