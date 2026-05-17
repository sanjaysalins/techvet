# Session 01 — Esme Okonkwo redux (Senior AI/ML productionization, phone)

Round 10, 2026-05-17. Saturation validation. Round 9 surfaced one
load-bearing structural finding — the AI/ML template's catalog
`defaultScope: "author"` was shape-mismatched against the
productionization candidate it actually serves post-8E. Batch 9A
shipped the proposed template-level `techScopes` override on
`pytorch / llm-api-sdk / vector-db`, deliberately leaving
`huggingface-transformers` at catalog default (genuine scope ambiguity
for fine-tuners). Round 10 re-runs Esme end-to-end against the shipped
fix and checks (a) propagation through the Landing → store → TechCard
chain, (b) the 22-second per-call scope-override tax has actually gone
to zero on the three target cards, (c) HuggingFace remains overridable
(no regression), and (d) the headline shape shifts from a defensive
~4G/3Y to the production-engineer-shaped ~5G/2Y the round-9 verdict
predicted.

## 1. Persona inhabited

**Esme Okonkwo, 31.** Same shape as round 9 — identical CV, identical
stack ownership, identical depth claims. Eight years total ML, three
at the Lagos-based AI startup running the FastAPI + Qdrant + multi-
provider LLM inference service. Weekly fine-tunes of small distilled
classifiers (DistilBERT for intent, quantized Mistral-7B for one
tenant) via HuggingFace `Trainer` + `peft`. Drift monitoring via
Evidently, evals via Braintrust, feature store via Feast.

Her depth claims still parse the same way, and that's the whole point
of a redux session — the candidate didn't change, only the tool did.
A successful 9A means the tool produces a different post-call shape
for the same Esme.

**Daniel Harper, 38.** Same London fintech, same JD ("AI Engineer for
production LLM applications — we're not hiring researchers"). Three
weeks into round-9 he's done another dozen TechVet phone screens; the
AI/ML template is in his muscle memory now. He hasn't read the round-9
session note (recruiters don't; the post-round patch shipped silently
into the tool he uses).

The interesting bit: Daniel **does not know** that batch 9A shipped.
His baseline expectation, formed across the last twelve screens, is
"AI/ML libraries default to 'Use default: author' on the scope
dropdown and I have to think about whether to override." If 9A
propagated correctly, he'll see something different on the PyTorch
card and have to update that expectation mid-call. That micro-moment
of update IS the round-10 signal — does the recruiter notice the
default shifted, and does he trust it?

## 2. Phone call — abbreviated

> D: "Hi Esme, thanks for making this work again. Quick stack pass,
> ten minutes flat, then wrap with role context."
> E: "Sounds good. Same as last time?"
> D: "Same shape. Maybe a touch faster — I've done this template a few
> dozen times now."

Daniel is on `/#/assess`. Landing pick: **AI / ML Engineer**
(`src/data/roles.ts:255`). Eight tech cards preloaded:
`python / pytorch / huggingface-transformers / llm-api-sdk /
vector-db / fastapi / docker / aws` (`roles.ts:257`). Methodology
chips render in the rail. **Path dropdown** is set to
**Productionization / serving** (shipped 8E for AI/ML; he uses it).

He selects **Senior**, types "Esme Okonkwo," sets path. Cards arrive.

The propagation moment, verified by reading the code: `Landing.tsx:31`
runs `role?.techIds.forEach(t => addTech(t, role.techScopes?.[t]))`.
For the AI/ML template, `role.techScopes` is the round-9-shipped map
`{ pytorch: 'operator', 'llm-api-sdk': 'operator', 'vector-db':
'operator' }` (`roles.ts:269-273`). So `addTech` is called eight
times:

- `addTech('python', undefined)` — no override → scope stays unset →
  catalog default (`defaultScope` not set on python, so operator-
  implied).
- `addTech('pytorch', 'operator')` — store writes `scope: 'operator'`
  on the item (`store/assessment.ts:86`).
- `addTech('huggingface-transformers', undefined)` — no override →
  catalog default `author` will surface in the dropdown placeholder.
- `addTech('llm-api-sdk', 'operator')` — explicit operator on item.
- `addTech('vector-db', 'operator')` — explicit operator on item.
- `addTech('fastapi', undefined)` — no defaultScope on FastAPI, no
  override, operator-implied.
- `addTech('docker', undefined)` — same.
- `addTech('aws', undefined)` — catalog has `defaultScope: 'operator'`
  (round-4 Eitan/Owen catch), reads as operator.

This propagation works because `Landing.tsx` already calls `addTech`
with the per-tech scope hint (the K2-from-round-2 plumbing is the same
pipe SA / SRE / Backend / Data / Security / AppSec all use today —
9A is the seventh template to lean on it, not a new mechanism). The
store's `addTech` signature has accepted an optional `scope` parameter
since K2 (`store/assessment.ts:15, 72-92`).

What the recruiter sees on the cards, verified by reading
`TechCard.tsx:101-124`: the scope `<select>`'s `value` is
`item.scope ?? ''`. When `item.scope === 'operator'`, the select shows
the `Operator (runs in prod)` option as selected. When
`item.scope === undefined`, it shows the placeholder
`— Use default: author` (line 116).

**~0:30 — Python.** Same as round 9. `3.12`, deep, Excellent. Clean.
(~10 s.)

**~0:45 — FastAPI.** Same as round 9. `0.115`, deep, Excellent. (~12 s.)

**~1:00 — PyTorch. THE moment this redux was built around.**

> D: "PyTorch version?"
> E: "2.4."
> D: "Depth?"
> E: "Working. I load checkpoints, fine-tune the occasional
> classification head, don't write custom modules."

Daniel clicks the PyTorch card and types `2.4`. His eye flicks to the
scope dropdown — muscle memory from twelve screens of "Use default:
author" — and **the dropdown reads `Operator (runs in prod)`**, not
the author default. He pauses for half a beat. Says, to no one in
particular, "Oh — that's already operator." Picks **Working** depth.
Card: **Excellent (Good)** (Green), no italic strip, no cap.

Tax: **zero scope clicks**. The half-beat pause is ~1.5 s of
adjustment cost (vs round 9's ~7 s of read-think-click-defensive-
override), but it is one-time per recruiter as they update their
expectation. By card 3 of this call he won't pause anymore.

This is finding #1 forming. 9A landed. The propagation chain reads
through correctly all the way to the dropdown surface.

**~1:30 — HuggingFace Transformers.**

> D: "Transformers — version, depth?"
> E: "5.2, deep. I fine-tune the small classifiers."

Types `5.2`. Excellent tier (`5.0` min). Picks Deep. Scope dropdown
shows **`— Use default: author`** — UNCHANGED from round 9, because
9A intentionally did not override this one. Daniel reads the
fine-tune claim, recognizes it as author-shape (writing training
loops), leaves the default in place. ~2 s of hesitation, zero clicks.

This is the 9A design subtlety honoring itself in production. The
honest scope-ambiguity case still surfaces correctly. If Daniel had
been screening a pure-inference candidate ("we just use pretrained
Whisper from HF"), he'd have the option to manually override down
to operator. The default sits where the round-9 finding #2 said it
should: author, because the AVERAGE productionization candidate
does fine-tune.

**~2:00 — LLM API SDK (checklist).** Daniel walks the 14 services.
Esme ticks the same 10 as round 9: openai-sdk, anthropic-sdk,
streaming, tool-use, structured-outputs, prompt-caching, embeddings,
batch-api, eval-harness, agents. 10/14 = 71% → **Good** (Green) at
≥66% threshold.

Scope dropdown: **`Operator (runs in prod)`** already selected
(9A's `llm-api-sdk: 'operator'` propagated). Daniel verifies, makes
no change. Tax: zero scope clicks (down from round 9's 6 s
defensive override).

Verdict: **Good — 10/14 services**. Same as round 9, but reached
without the dropdown re-click. (~70 s for the card — 5 s faster
than round 9's 75 s.)

**~3:25 — Vector DB (checklist). The round-9 load-bearing moment, replayed.**

12 services. Esme ticks same 5 as round 9: qdrant, pgvector,
hybrid-search, reranking, faiss. 5/12 = 42% → **Yellow** (25-66%).
Deep depth, senior, 42% > 40% → 6D depth-lift fires
(`scoring.ts:495-503`). Adjusted to **Green**.

Now `applyScope` runs. **`item.scope === 'operator'`** (set by 9A at
template-pick). At `scoring.ts:71-78`, the operator/undefined branch
returns the adjusted color as-is with `scopeCapped: false`. No cap
fires. **Verdict stays Green — "Good (lifted from Yellow by depth) —
5/12 services."**

This is the round-9 finding #1 load-bearing case closing. In round 9
the author-cap fired at `scoring.ts:118-120`, stole the Green back to
Yellow, and Daniel had to read the italic strip, diagnose, and
override. ~9 s of tax. In round 10: **zero italic strip, zero tax.**
The verdict is honest on first render.

Daniel doesn't even look at the dropdown — the card landed Green and
his eye moves on. (~80 s for the card — 15 s faster than round 9's
95 s, and the saved time is real recruiter attention reclaimed for
methodology probes.)

**~4:45 — Docker.** Same as round 9. `28.0`, deep, Excellent. (~10 s.)

**~4:55 — AWS (checklist).** Same surface, same 8 ticks (lambda, s3,
sagemaker, bedrock, cloudwatch, iam, ecs-fargate, ec2). 8/14 = 57%
under the data-ml-filtered surface. Deep + senior + ≥40% → 6D lift.
Adjusted to Green. AWS `defaultScope: operator` (no 9A change here —
already operator pre-9A). No cap. **Good — 8/14 services.** (~80 s.)

**~6:15 — Methodology chips.** Same 6 chips ticked, same 5
free-text entries (Braintrust, Evidently, Feast, shadow-deployment,
canary-for-ml). The round-9 catalog-gap findings (Finding #3,
Finding #4) are NOT in batch 9A's scope — those queue for later
batches — so the named-only tax is identical to round 9. ~75 s for
chips + free-text.

**~7:30 — Wrap.** Mandate + role context. Continue to Summary.

Total call time: **~7:30 elapsed** (vs round 9's ~8:45). The 1:15
saving is the compounded effect of three zero-scope-tax cards plus
the smoother Vector DB read. 12.5% of the 10-min budget reclaimed —
larger than the headline 22 s of pure scope-tax because the saved
cognitive surface lets Daniel move faster between cards too.

## 3. Post-call — report read

Daniel scrolls Summary. Headline cards:

- **Excellent / Good:** 5 (python, fastapi, pytorch, huggingface,
  docker)
- **Lifted from Yellow:** 3 (llm-api-sdk reads Good on coverage
  alone — not lifted; vector-db and aws lifted from Yellow by depth)

  Recount: Excellent/Good 6 (python, fastapi, pytorch, huggingface,
  llm-api-sdk, docker). Lifted-from-Yellow 2 (vector-db, aws). Yellow
  bucket: 0. Red bucket: 0.

- **Headline shape: 6G / 2 lifted-Yellow-now-Green / 0R = effectively
  8G / 0Y / 0R on first-bucket read.** vs round 9 actual:
  5G / 1Y-capped-from-Green / 1Y / 0R until Daniel manually overrode
  vector-db mid-call, which reshaped to 5G + 2 lifted-from-Y, but
  the *scope-overrides applied* column carried 2 entries.

- **Scope-overrides applied (per recruiter):** 0 in round 10.
  Was 2 in round 9 (pytorch + vector-db, both author→operator).

- **Scope set by template:** 3 (pytorch, llm-api-sdk, vector-db).
  Summary's ScopeChip (`Summary.tsx:716-750`) renders these as
  explicit (`item.scope !== undefined`), so the "via default" italic
  hint doesn't show on them — they read as deliberate template-level
  scope choices, which is honest. Huggingface still reads "via
  default" because no template override applied there.

- **Methodology chips ticked:** 6/6.
- **Free-text methodology:** 5 entries (same as round 9 — not 9A's
  scope).
- **Named-only catalog gaps:** Qdrant, Braintrust, Evidently AI,
  Feast (same as round 9 — not 9A's scope).

The report reads as a clean production-engineer profile. No
"Capped from Green by author scope" line anywhere on the page. The
2 scope-overrides line that read on round 9's summary as recruiter
defensive action is gone. The template-set scope reads as
*intentional first-class shape selection at template-pick* rather
than per-card overrides.

## 4. Findings

### Finding #1 (VALIDATION) — 9A propagation chain reads through end-to-end

Reading the chain: `roles.ts:269-273` → `Landing.tsx:31` → `assessment.ts:72-92`
(store stores `scope` on item) → `TechCard.tsx:101-124` (select reads
`item.scope ?? ''`, renders the matching option). All three target
cards (pytorch, llm-api-sdk, vector-db) carry `item.scope ===
'operator'` from the moment the template is picked. The select shows
**Operator (runs in prod)** pre-selected; no recruiter click required.

The scoring math at `lib/scoring.ts:71-78` treats operator scope as a
no-op, so the round-9 author-cap clause at `scoring.ts:117-120`
*cannot fire* for any of the three target cards regardless of depth
or coverage. The vector-db Yellow→Green depth-lift now lands clean.

**Verdict on 9A:** propagated end-to-end. Round-9 finding #1's
load-bearing case is closed.

### Finding #2 (VALIDATION) — HuggingFace remains overridable, no regression

The intentional non-override on `huggingface-transformers` works
correctly. Card's scope dropdown shows `— Use default: author` (the
catalog `defaultScope` from `technologies.json:2354`). Daniel leaves
it in place for Esme (fine-tuner), would have manual override
available for a pure-inference candidate.

This honors the round-9 finding #2 design subtlety: productionization
candidates routinely fine-tune small classifiers (write training
loops, author the `Trainer` config, pick the LoRA settings) — that
*is* author-shape work and the catalog default is the honest read.
9A correctly left it alone.

**Verdict on 9A:** no over-reach. The fix is precisely targeted.

### Finding #3 (NEW, round-10) — One-time recruiter expectation update is a real but small cost

Daniel's micro-pause on the PyTorch card (~1.5 s of "oh — that's
already operator") is a one-time cost the first time a recruiter
hits the AI/ML template post-9A. By card 3 of this call he wasn't
pausing anymore. Across his career he'll pay this once and never
again.

Compare to round 9 cost: ~22 s per call, every call, forever, for
every productionization candidate. Round 10's ~1.5 s once-per-
recruiter-lifetime is a trade with a payback period of one call.

**Severity:** non-blocker. Worth noting that 9A *did* require a
recruiter mental model update, even though the update goes in the
direction of less friction. No copy or training change needed —
the model self-updates on first encounter.

### Finding #4 (NEW, round-10) — Headline shape now reads honestly as production-engineer

Round-9 headline (pre-9A) was effectively `5G / 1Y-capped / 1Y / 0R`
on first-render with Daniel forced into 2 mid-call scope overrides
to repair to the truthful `5G / 2 lifted-Y / 0R` shape. Round-10
headline (post-9A) lands at `~6G / 2 lifted-Y / 0R` on first-render
with zero overrides — and the lifted-Yellow band reads as *honest
depth-lift signal*, not as *cap-then-uncap recruiter work*.

The headline shape Hiring Managers see on the PDF report — the bucket
sections in `Summary.tsx` — no longer needs the "two scope-overrides
were applied during the call" line that round 9 carried. This matters
downstream: a Hiring Manager reading the report doesn't have to wonder
which overrides changed which verdicts. The template did the work,
honestly, at the front.

**Severity:** material for report quality. This is the second-order
win of 9A that round 9's finding didn't fully name: not just "saves
recruiter time," but "produces a report whose verdict provenance is
cleaner for the downstream reader."

### Finding #5 (NEW, round-10, lower priority) — Round-9 finding #3 (catalog gaps) and finding #4 (chip refresh) still standing

Esme still volunteered Braintrust, Evidently AI, Feast as named-only
entries, plus shadow-deployment and canary-for-ml as missing chips.
9A was scoped to the scope-override fix only; the catalog promotion
and chip refresh are queued separately. No regression on these — they
read exactly as round 9 did — but they remain open.

This is not a 9A failure, it's a confirmation that 9A's blast radius
was correctly small and targeted. The other findings remain on their
own track.

**Severity:** queue-for-next-batch, unchanged from round 9.

### Finding #6 (NEW, round-10) — No Custom-template regression risk surfaced

Worth naming explicitly because the round-10 cast flagged it as a
concern (cast.md mentions Vikram-library-author-on-Custom): 9A only
touched the AI/ML template's `techScopes`, NOT the catalog
`defaultScope: "author"` on the underlying AI/ML library entries
(`technologies.json:1780, 2354, 2396, 2469` etc still read `author`).
A recruiter who picks Custom and manually adds pytorch / llm-api-sdk
/ vector-db still gets the round-2 K2 protection — author scope by
default — which is the right call for a Vikram-shape library-author
candidate.

So 9A is template-scoped, not catalog-scoped, and the Custom path is
untouched. No regression risk on the library-author shape.

**Severity:** structural verification of 9A's blast radius. Confirms
the round-9 verdict's framing that the template-level fix doesn't
disturb K2's protection.

## 5. Round-10 verdict

**Safe.**

Batch 9A is shipped, propagated end-to-end, validated against the
exact candidate shape it was designed for. The round-9 load-bearing
finding (#1, "AI/ML template needs productionization-shape techScopes
override") is closed. Round-9 finding #2 (HuggingFace genuine
ambiguity) is honored by 9A's deliberate non-override. The two
related round-9 findings (#3 catalog gaps, #4 chip refresh) are out
of 9A's scope and remain open on their own track — no regression.

Specifically the three concrete confirmation criteria from the cast
brief:

| Criterion                                                  | Status |
|------------------------------------------------------------|--------|
| Scope on PyTorch / LLM API SDK / Vector DB defaults to operator at template-pick | yes (verified `Landing.tsx:31` → store → `TechCard.tsx:102`) |
| Esme dispatches zero manual scope overrides on the 3 target cards | yes (recruiter eye-scan only, no click) |
| HuggingFace remains at author default (recruiter has option to override) | yes (no template override; `— Use default: author` on dropdown) |
| Headline reads `~5G / 2-3Y / 0R` production-engineer shape  | yes — `6G / 2 lifted-Y / 0R` (six in green/excellent bucket, two lifted from yellow, zero red, zero scope-cap notes) |

The 22-second-per-call tax is now zero on this template. The 1:15
total call-time saving (12.5% of the 10-min budget) is the realized
compound win.

Honest follow-on items NOT closed by 9A and acknowledged as still
open:

1. **Catalog promotion of Braintrust / Evidently / Feast / Langfuse**
   as AI/ML checklist-mode techs. Round-9 finding #3. Each is
   center-of-gravity for the productionization role, currently lives
   as a free-text named-only entry. Queue for batch 10 or later.
2. **Methodology chip refresh** — add `shadow-deployment-ml` and
   `canary-rollout-ml`; consider splitting `rag-evaluation` into
   retrieval-eval and generation-eval. Round-9 finding #4. Lower
   priority than catalog gaps.
3. **Dropdown copy under cognitive load** (round-9 finding #5) is now
   moot for the AI/ML template specifically (because the three
   load-bearing cards no longer show "Use default: author" at all),
   but the UX nuance is still in the rest of the tool wherever
   catalog defaults disagree with the typical template user. Other
   templates' tech-card surfaces could plausibly carry similar
   one-off cases — not a known issue, just a heuristic to keep in
   mind on future audits.

None of those follow-ons block the round-10 saturation verdict for
this session: **9A landed clean. Esme's redux is safe.**
