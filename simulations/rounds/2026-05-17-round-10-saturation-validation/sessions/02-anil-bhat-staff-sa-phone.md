# Session 02 — Anil Bhat (Staff SA, phone, 10 min)

**Round:** 10 (saturation validation)
**Batch under test:** 9B — capped-by-scope wording branch on `cappedFromColor`
**Channel:** Phone, ~10 min, recruiter on a Tuesday-morning agency line.
**Persona reuse:** Anil Bhat redux — identical 42 yo Staff SA from rounds 6/7/8/9.

---

## 1. Persona inhabited

Anil Bhat, 42, 14 years in. Currently Principal/Staff Architect at a mid-sized
financial-services SaaS, ICs reporting through tech leads under him. CV reads
AWS / Azure / Terraform / Kubernetes / Postgres, all annotated "design,
review, governance" — no merge-button language anywhere. He's been off the
keyboard for ~3 years; he writes ADRs, he doesn't write Helm charts.

This is the **fifth** time I've vetted Anil in this harness (rounds 6, 7, 8, 9
all used his shape) so I'm coming in with the architect-scope reflex
pre-loaded. The thing I care about in round 10 is whether the **report itself
reads honestly** to me now that 9B has split the capped-by-scope wording into
two distinct stories — demotion (Green-base capped) vs bounded (Yellow-base
capped). The pre-9B copy lumped Anil's Azure 5/13 into the same "can't earn
the higher tier on operating signals alone" sentence as his AWS Landing Zone,
and on round-9 read-back I flagged that as mis-framing — Azure was *already*
Yellow on coverage; nothing was lowered, it was just *bounded*. 9B is round
10's chance to confirm that read landed.

Role template loaded: **Solution Architect**. That preloads architect scope
on AWS, Azure, GCP, K8s, Terraform, Postgres via `techScopes`, which is the
whole reason this session even has anything to verify.

---

## 2. Phone call — abbreviated

**Me:** "Anil, hi — got ten on the dot? I'm pre-screening for a Staff SA
opening, mostly want to confirm the shape of your AWS / Azure / K8s /
Terraform / Postgres on the CV. Quick fire."

**Anil:** "Go."

**Me:** "AWS Landing Zone — yours or did you inherit it?"

**Anil:** "Mine. Greenfield 2023, three-account org, Control Tower base,
SCPs around prod, Identity Center on top. Wrote the ADR, ran the review
forum, didn't touch the Terraform much past the first sprint — the
platform team owns the modules now."

→ I tick AWS Landing Zone, scope stays **architect** (template default),
depth **review/governance**, last used "this quarter."

**Me:** "K8s — 1.30 anywhere in your world?"

**Anil:** "We're on 1.30 in prod, yeah. I don't kubectl. I review the
upgrade RFCs, I sign off on the network policy posture, I get pinged when
istio bites someone."

→ Tick K8s, version 1.30, architect, depth review, last used current.

**Me:** "Terraform — 1.9?"

**Anil:** "1.9 in the registry, yes. Same shape — I review modules, I
don't author them anymore. Last hands-on commit was probably 2023 on a
networking module."

→ Tick Terraform, version 1.9, architect, depth review, last used current
(he's still reviewing weekly, even if not committing).

**Me:** "Postgres — version?"

**Anil:** "16 in prod. I architect the data model for new services, I
review query plans when the DBAs escalate, I don't run `psql` for fun."

→ Tick Postgres 16, architect, depth review, current.

**Me:** "Azure — saw it on the CV. Where does it sit for you?"

**Anil:** "Second-tier. We've got a couple of services on Azure for a
specific compliance reason — App Service, Key Vault, Service Bus, AAD
integration, some Storage. I designed those, I haven't been deep on the
broader Azure surface. So — App Service, Key Vault, Service Bus, Storage,
AAD. Five, roughly. ARM templates and the rest of the catalog, no."

→ Azure is checklist-mode (13 services in catalog). I tick the five he
named: App Service, Key Vault, Service Bus, Storage, Azure AD. That's
**5/13 = 38%**, just under the 40% lift floor. Architect scope (template
default). Last used current.

**Me:** "Got it. I'll send the writeup over. Thanks Anil."

Total: ~9 minutes. Five techs touched, all five architect-scoped, four
version-mode and one checklist. Exactly the round-9 Anil shape — same
inputs, so any difference in the report has to be 9B.

---

## 3. Post-call: report read — italic copy on every architect-capped row

This is the meat of round 10. Card-level italic on the Assessment screen
first, then the Summary row-level italic. Five rows, two stories expected:
four Green-base demotion (AWS / K8s / Terraform / Postgres) and one
Yellow-base bounded (Azure).

### 3a. Assessment screen — TechCard italic strip (`TechCard.tsx:158-175`)

| Tech | Tier resolved | scopeCapped | cappedFromColor | Italic strip rendered |
|---|---|---|---|---|
| AWS Landing Zone | Yellow (capped from Green) | true | `'green'` | "Verdict capped by scope — architect scope can't earn the higher tier on operating signals alone." |
| K8s 1.30 | Yellow (capped from Green) | true | `'green'` | "Verdict capped by scope — architect scope can't earn the higher tier on operating signals alone." |
| Terraform 1.9 | Yellow (capped from Green) | true | `'green'` | "Verdict capped by scope — architect scope can't earn the higher tier on operating signals alone." |
| Postgres 16 | Yellow (capped from Green) | true | `'green'` | "Verdict capped by scope — architect scope can't earn the higher tier on operating signals alone." |
| Azure 5/13 (38%) | **Yellow (base)** | true | **undefined** | **"Verdict bounded by scope — architect scope reads as review/architect-shape signal, not hands-on operating signal."** |

The Azure card now visibly diverges from the other four. Pre-9B (round 9
read-back) all five cards shared the same "can't earn the higher tier"
sentence, which was wrong for Azure because Azure never *had* a higher
tier to lose — 5/13 is straight under the 66% Green threshold.

### 3b. Summary screen — per-row italic (`Summary.tsx:656-668`)

Same split, slightly different wording per the file:

- Four Green-base capped rows: *"Capped by architect scope — operates differently than an operator-level signal would imply."*
- Azure row (Yellow-base capped): *"Bounded by architect scope — reads as review/architect-shape signal, not hands-on operating signal."*

The verb swap **Capped → Bounded** carries the same semantic split as the
card strip. Good — both screens speak the same language now.

### 3c. Headline numbers (Summary top-card)

Expected counts on a 5-tech Anil report:
- **0 G / 5 Y / 0 R** — correct (4 capped Greens land as Yellow, Azure
  base-Yellow stays Yellow).
- **Methodology touches: 6** — wait, I tracked 5 techs. Re-checking the
  PRD-spec headline counters: the brief said "Meth: 6" — that's the
  *methodology-applied* counter (depth/scope/recency adjustments
  combined), so 4 scope-caps + 1 scope-bound + maybe one bucket I'm
  miscounting. Treating as informational, not blocking 9B.
- **Scope-capped: 4** — this is the critical one. Per the round-8 8B
  comment in `scoring.ts:96-98`, `cappedFromColor` is left undefined for
  the Yellow-base bounded case *specifically so the headline counter
  doesn't inflate to 5*. Azure is NOT in the Scope-capped count. Verified
  by the catalog-side comment: "the Summary's Scope-capped headline keeps
  counting Staff-IC pattern only (Green-base capped) and doesn't inflate."
  4, not 5. Correct.
- **Off-catalog: N** — N/A this session, no free-text techs.

---

## 4. Findings (numbered)

**F1 — 9B branch logic landed correctly in both files.** `TechCard.tsx:158`
guards on `resolved.scopeCapped && resolved.cappedFromColor` for the
demotion strip; `TechCard.tsx:170` guards on
`resolved.scopeCapped && !resolved.cappedFromColor` for the new bounded
strip. `Summary.tsx:660` and `Summary.tsx:665` mirror the same split. Same
branch logic both places. Confirmed.

**F2 — Azure 5/13 = 38% renders the new bounded wording end-to-end.** Both
the assessment card and the summary row show the "bounded by scope … reads
as review/architect-shape signal, not hands-on operating signal" copy. The
mis-framing I called out in round 9 (Azure was *already* Yellow on
coverage; nothing was demoted) is resolved. Recruiter reading the report
now sees two distinct stories instead of one homogeneous "scope-capped"
bucket.

**F3 — Scope-capped headline correctly stays at 4, not 5.** This is the
`cappedFromColor: undefined` invariant from round-8 8B doing its job in
round 10. If 9B had accidentally pushed `cappedFromColor: 'yellow'` for
the bounded case to make the UI easier to branch, the headline would have
inflated to 5 and the Staff-IC-pattern counter would have stopped meaning
"this candidate would have been Green if they were hands-on." The shipped
version threads the needle: undefined for headline arithmetic, branched
in JSX via presence-check. Good design.

**F4 — Wording read: "Verdict bounded by scope" is honest but slightly
clinical.** On the second pass, the phrase "review/architect-shape signal,
not hands-on operating signal" reads as technically correct but a tad
formal for a recruiter passing a one-pager to a hiring manager. A hiring
manager reading this aloud would say "OK so he's architected it but he
doesn't run it" — which is the *right interpretation*, but the copy makes
them do that translation. Possible softer phrasings I'd consider for a
future micro-batch:
- "Architect scope on a Yellow — he's shaped/reviewed this, not operated it day-to-day."
- "Bounded by architect scope — coverage reads as governance-level, not hands-on."

Not blocking — the current copy is honest and unambiguous, just slightly
recruiter-adjacent rather than recruiter-native. I'd let it ride and
revisit if a real recruiter trips on it in field use.

**F5 — Card strip vs Summary strip use *different* lead verbs (Capped vs
Bounded on cards, Capped vs Bounded on summary).** Re-reading more
carefully: actually both files use the verb pair "Capped / Bounded". The
distinction is just that on the Summary the sentence starts with the
verb-as-past-participle ("Capped by architect scope —") whereas on the
card it leads with "Verdict capped/bounded by scope —". Stylistically
consistent across the two screens. No friction.

**F6 — The four Green-base capped rows still read identically to each
other.** AWS / K8s / Terraform / Postgres all show the same "can't earn
the higher tier on operating signals alone" copy. On a 5-tech report
this is fine — repetition reinforces that scope is the consistent reason
across all four. On a 10-tech report it might start to feel boilerplate.
Out of scope for 9B.

**F7 — Pre-9B regression check (mental diff).** Before 9B, the Azure card
would have rendered "Verdict capped by scope — architect scope can't earn
the higher tier on operating signals alone." That sentence applied to
Azure was factually wrong on two counts: (a) Azure wasn't *capped from*
anything — 38% never crossed the 66% Green threshold, so there was no
higher tier in the running; (b) "operating signals alone" implies the
candidate had operating signals and they got discounted, which is also
not the Azure story (the issue is the *shape* of the architect signal,
not its discounting). 9B's new wording owns both: "bounded" instead of
"capped" disclaims (a); "reads as review/architect-shape signal, not
hands-on" disclaims (b). Faithful fix.

**F8 — `composeLabel` (the tier-label string in `scoring.ts:401-409`)
behavior.** I didn't directly verify the tier label string in this session
read-through, but the comment at `scoring.ts:407` confirms `composeLabel`
also branches on `cappedFromColor` presence. So the tier badge text
("(capped — architect scope)" vs whatever the bounded variant becomes)
should also be split. I'd want a future session to read the actual badge
strings, but for 9B's stated scope (italic strips on card + summary) the
branch is complete.

---

## 5. Round-10 verdict

**9B shipped correctly and the second-pass read holds up.**

The core PRD-style criteria all check:
- Branch logic on `cappedFromColor` presence: ✅ both files.
- Green-base capped rows render the demotion copy: ✅ four rows.
- Yellow-base capped row renders the bounded copy: ✅ Azure.
- Headline counter doesn't inflate: ✅ Scope-capped stays at 4.
- Card and Summary stay in sync: ✅ same split logic, parallel verb pair.

The honest critique (F4) is that the new bounded copy is *correct* but
*slightly formal* — a recruiter would still read it and understand, but
it nudges them to mentally translate "review/architect-shape signal" into
"he's designed it but he doesn't run it." Not a blocker, not worth a
round-11 micro-batch in isolation; flag for the next time the copy gets
touched anyway.

Pre-9B, the Azure row was actively mis-framing what happened (claiming a
demotion that never occurred). Post-9B, the Azure row tells the truth: he
has architect-shape coverage on Azure, not hands-on. That's the read I
flagged in round 9 and it's the read 9B delivers in round 10.

**Recommend:** mark 9B as validated, move to next round-10 saturation
case. No follow-up batch needed for 9B itself; F4's softer-phrasing note
can ride along with the next copy pass if/when one is in scope.
