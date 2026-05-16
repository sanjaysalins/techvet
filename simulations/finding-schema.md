# Session findings schema

Each agent writes one markdown file to
`simulations/rounds/<round>/sessions/<NN>-<persona-slug>-<role-slug>.md`
following this schema. The cross-cut depends on the schema being
consistent — please don't reorganize sections.

## Required sections

```markdown
# Session NN — <Persona Name> (<seniority>, <role>)

**Agent:** <agent id or short name>
**Date:** YYYY-MM-DD
**Round:** <round folder name>
**Channel:** Phone (5-10 min)
**Role template picked:** <name from src/data/roles.ts, or "Custom">

## 1. Persona inhabited

Two or three sentences sketching who this candidate is *as you imagined them*
beyond the cast brief. Their actual stack, their actual weak spots, how they
talk about their work. This is *your* fill, not the brief's.

## 2. Phone call — abbreviated

Show the call in compressed form. Mix dialogue with what the recruiter
clicks/types in TechVet. Imagine the recruiter is fast on the keyboard but
not technical. Aim for ~150-250 words; this is not a script, it's a trace.

> R: "So Maya, tell me what you've been working with on the frontend?"
> M: "Mostly React — we just migrated to 18 last quarter…"
> [Recruiter: searches "React", clicks it, types "18", picks depth=working]
> M: "…and Storybook for the design system, I've owned that for two years."
> [Recruiter: searches "Storybook"…]

## 3. What TechVet would output

Predict the actual verdict from reading the source. For each tech the
recruiter logs:

| Tech | Version / Coverage | Depth | Scope | Verdict (predicted) |
|------|--------------------|-------|-------|---------------------|
| React | 18 | working | — | Excellent |
| Storybook | (no version field) | working | — | Review / Probe (capped at unknown-version + meaningful depth → fires enterprise note) |
| ... | ... | ... | ... | ... |

Plus what the Summary's headline stats and radar would show.

## 4. Accuracy judgement

The most important section. Does the report match the candidate?

- **Where it's right:** ...
- **Where it over-rates:** ...
- **Where it under-rates:** ...
- **Where it's silent on something a hiring manager would need to know:** ...

Be specific. Quote the verdict and explain why it's misleading.

## 5. Friction during the call

What slowed the recruiter down? Examples to consider — but don't constrain
yourself:

- Search couldn't find the tech the candidate named
- Too many clicks to log a single tech
- Tier badge updated mid-typing and confused the recruiter
- Recruiter didn't know which depth to pick
- Recruiter didn't understand a control (scope, checklist, "not in stack")
- Tool assumed knowledge the recruiter doesn't have

## 6. Bugs / structural defects

Numbered list. For each:

**Title.** What. Why it matters. Evidence (file:line where useful). Severity
(your call — Critical / High / Medium / Low).

## 6b. Speed-of-use rating (REQUIRED — added 2026-05-16 round 3)

The tool's primary use case is a phone call where the recruiter has a
couple of minutes total. Rate this session's workflow against that
constraint, **even if your assigned channel was video or async**.

- **Entry time (estimate).** Roughly how many seconds did it take to log a
  typical tech with the controls the recruiter used? Add up search +
  click-add + type-version + pick-depth + (optional) pick-scope. Phone
  budget is ~10-15 seconds per tech to stay in flight.
- **Phone-shrink test.** If this exact workflow were run on a phone
  (5-10 min, recruiter typing while listening, no time to look anything
  up), what specifically breaks? Name the controls / paths.
- **Friction that vanishes on phone.** Things the recruiter did *because
  they had time* (e.g. reading checklist items aloud, opening the scope
  dropdown to think) that they couldn't do on a phone call.
- **Risk / safe rating.** Your call — Safe (would survive a phone call) /
  At-risk (needs at least one fix) / Unworkable (would fail outright).

This section feeds the cross-cut's prioritization. Be concrete.

## 7. Catalog gaps

Techs the candidate named that aren't in `technologies.json`, or are there
but in the wrong category, or have tier ranges that misread the candidate.

## 8. One-liner for cross-cut

A single sentence the cross-cut author can paste into a summary table:

> **<Persona> — <role template> — <headline failure or finding>**

Example: *"Vikram — AI/ML Engineer — scoring hallucinates seniority on a
one-week LangChain hobbyist; depth dropdown rewards self-report without
gating on production deployment evidence."*

## 9. Recommendation

One short paragraph. What's the single highest-leverage change that would
have made this session's verdict more useful to the hiring manager?
</markdown>
```

## Optional sections (include if relevant)

- **Disagreement with prior fixes.** If today's scoring rule contradicts
  what you think the right behavior is, name the rule and explain.
- **Out-of-scope observations.** Things that matter but aren't TechVet's
  job to fix (e.g. recruiter training, hiring manager workflow).
- **Edge case you couldn't resolve.** State it as an open question for
  the cross-cut, not a bug.
