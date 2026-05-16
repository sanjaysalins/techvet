# TechVet adversarial simulation pipeline

A repeatable way to stress-test TechVet by simulating realistic recruiter
phone screenings. Each round dispatches N independent agents who each
play one fictional candidate + recruiter pair, walk through TechVet
end-to-end, and report friction, accuracy, and catalog gaps.

The first ad-hoc round (2026-05-15, before this pipeline existed) surfaced
**5 code bugs** and **4 structural defects** across 12 sessions — see
`RESUME.md` for the cross-cut. That round used chat-only outputs and was
hard to revisit; this pipeline keeps everything in-repo and versioned.

## Directory layout

```
simulations/
  README.md              # This file
  brief-template.md      # Standard brief given to each agent
  finding-schema.md      # Required output schema for each session
  rounds/
    YYYY-MM-DD-<theme>/
      cast.md            # Roster + persona definitions for the round
      sessions/
        01-<persona>-<role>.md   # One file per agent, agent fills it
        02-...
      cross-cut.md       # Synthesis after all sessions complete
      fixes-shipped.md   # Optional: which findings became commits (link by hash)
```

## How to run a round

1. **Pick a theme.** Phone screening, video panel, in-person career fair,
   batch CV processing, ATS-export workflow, etc. The theme constrains
   the scenario; cast variety covers the rest.
2. **Build the cast** in `rounds/<date>-<theme>/cast.md`. Aim for **10-15**
   personas with deliberate diversity (seniority, role, fit-with-template,
   non-traditional paths). Each persona is a one-paragraph sketch — enough
   for the agent to inhabit but loose enough to let them improvise.
3. **Dispatch agents.** Spawn one `general-purpose` agent per persona,
   in parallel, in background. Each agent gets:
   - A pointer to `brief-template.md` and `finding-schema.md`
   - Their persona text (copied inline)
   - The exact output filename to write to
   - Latitude to be an independent critic
4. **Wait for completion.** Notifications arrive as agents finish.
5. **Cross-cut.** Read all session files. Distill recurring patterns into
   `cross-cut.md`: code bugs, structural defects, catalog gaps,
   priority-ordered fix list.
6. **Triage.** Update `RESUME.md`'s priority list with new items. Ship
   fixes. Optionally update `fixes-shipped.md` as commits land.

## Design principles

- **Independence over consistency.** Agents are independent thinkers; they
  bring their own framework, not mine. Two agents may disagree on whether
  the same behavior is a bug — that disagreement is signal, not noise.
- **Phone-call realism.** The recruiter persona is non-technical, working
  on a laptop while listening, taking 5-10 minutes max per candidate. The
  agent simulates BOTH sides of the call and types in the tool while it
  happens. No "let me think about this carefully" pauses — speed is part
  of the test.
- **Predict, don't observe.** The agent predicts what TechVet's verdict
  would be from the source code, then judges whether that verdict matches
  the candidate's actual quality. Confirmation is the recruiter's job;
  prediction is the simulation.
- **Boundary-test the catalog.** Include candidates who don't fit any
  template cleanly (embedded C dev applying to backend; ex-Salesforce dev
  trying full-stack). Catalog gaps surface fastest here.
- **No tool execution.** Agents read the source. They don't `npm run dev`
  or browse the live app. The point is to surface what the *code* would
  produce, not to debug environment issues.

## Anti-patterns

- **Don't pre-script findings.** Tempting to seed agents with "look for
  X" — but then we only find X. Brief them on the *use case*, not the
  expected output.
- **Don't homogenize the cast.** All-senior, all-template-aligned casts
  mostly tell us the tool works. Failure modes live at the boundaries.
- **Don't skip the cross-cut.** Ten session files are unreadable as raw
  signal. The cross-cut is where 700-word findings become a 5-line
  priority list. Without it, the round dies on the shelf.

## Past rounds

| Date       | Theme               | Sessions | Cross-cut |
|------------|---------------------|----------|-----------|
| 2026-05-15 | Mid/senior structured screens (ad-hoc, pre-pipeline) | 12 | In `RESUME.md` |
| 2026-05-16 | Phone screening — diverse seniority | 10 | `rounds/2026-05-16-phone-screening/cross-cut.md` |
| 2026-05-16 | Multi-channel × underrepresented roles + specialist extremes + non-traditional paths | 10 | `rounds/2026-05-16-multichannel-round-3/cross-cut.md` |
