# Cross-cut — 2026-05-17 round 9 post-8E validation

**6 sessions.** 6 phone. Cast: 3 redux personas (Mei / Anil / Pooja —
composition stress for this morning's 8A-E ship) + 3 new shapes
(Lars Senior DevOps / Akira Senior QA / Esme Senior AI/ML
productionization — first-ever validation of 3 templates that rounds
1-8 never put on the dock).

**Headline result: 5 Safe / 1 At-risk / 0 Unworkable — best distribution
across all 9 rounds.** Round 9 confirms batch 8 landed end-to-end:
Mei's 8A renders correctly, Anil's 8B fires on Azure Yellow-base
exactly as designed, Pooja's 8D Snowflake preload + techScopes + chip
swap all hold. The only At-risk is **Esme AI/ML productionization
scope-default mismatch** — a template-shape design assumption that
round-2 Vikram drove and that productionization-shaped engineers expose.

## Validation matrix per shipped fix (8A–8E)

| Fix | Held? | Notes |
|-----|-------|-------|
| **8A** (UI rendering for 7D lowered) | ✅✅ | Card-vs-panel parity restored at `TechCard.tsx:24`. Lowered copy fires in BOTH locations at `TechCard.tsx:174-178` + `GuidancePanel.tsx:59-63`. Lifted path preserved by the `depthDirection !== 'lowered'` gate. Mei: Safe (5G/2Y/0R hold from round 8 — only rendering changed). |
| **8B** (Yellow-base architect scope-bounded) | ✅⚠️ | Scoring layer + label suffix render correctly (Anil's Azure 5/13 reads `"Review / Probe (capped — architect scope) — 5/13 services"`). Headline Scope-capped:4 preserved (Azure not in count — correct, cappedFromColor undefined). **Wording defect surfaced**: TechCard.tsx:158-163 + Summary.tsx:656 italic strips both say "can't earn the higher tier on operating signals alone" — that's the Green-base story; for 8B's Yellow-base case the verdict was *bounded* not lowered, so wording mis-frames. Branch on `cappedFromColor !== undefined`. |
| **8C** (mobile-XP chip rewrite) | (n/a) | No mobile-XP redux this round. |
| **8D** (DE template fixes) | ✅✅ | All 4 sub-fixes landed: Snowflake preload (`roles.ts:179` ships 9 techIds), Postgres/Kafka reviewer techScopes propagate via `Landing.tsx:31` → `applyScope`, data-lineage + cdc-discipline chips visible, data-contracts reframe land. Pooja: Safe (recognized new chips on first reading). |
| **8E** (FE chip swap) | ✅ | `bundle-size-budgets` ships at `roles.ts:61` replacing `progressive-enhancement`. |

## What round 9 answered

1. **Batch 8 landed cleanly end-to-end.** 5 of 6 personas read Safe with
   no load-bearing defects against the shipped fixes. The single
   At-risk (Esme) is on a never-validated terrain (AI/ML
   productionization vs library-author shape), not a 8A-E regression.

2. **The trajectory is now saturating.** Round 9 = best Safe
   distribution across all 9 rounds (5/1/0). For 3 of the 6 cast
   (Mei / Anil / Pooja), the report read the recruiter "wanted" on
   first try — the structural redesigns are converging.

3. **DevOps template (first-ever validation) ships at ~75%** — clean
   preload sizing, working `enterpriseStillUsed` audit on K8s/Terraform,
   8 of 10 expected pathways correct. Lars's 6 named-only entries
   (Argo Rollouts / Karpenter / cosign / Backstage / Unleash /
   Crossplane) name the catalog refresh needed for 2026 platform-eng
   vocabulary — a separate batch-sized item.

4. **QA template (first-ever validation) ships at ~75%** — pre-session
   hypothesis was wrong; QA actually HAS 6 methodologyChips at
   `roles.ts:371-378`. Akira's findings are 5 quality improvements,
   not structural defects.

5. **AI/ML template (first productionization validation) shows a
   template-design assumption gap.** Round-2 K2 added `defaultScope:
   'author'` on AI/ML library catalog entries to match Vikram's
   library-author shape. Esme is the opposite shape: she USES these
   libraries as production tools. The author cap fires on her depth
   claims and forces ~22s of scope-override tax in a 10-min budget
   (3.7%). **The catalog default is correct for the AVERAGE AI/ML
   shape, but the TEMPLATE for productionization needs override.**
   Fix: add `techScopes: { pytorch: 'operator', 'llm-api-sdk':
   'operator', 'vector-db': 'operator' }` to AI/ML template.
   Intentionally leave `huggingface-transformers` at catalog default
   (genuine scope ambiguity — productionization engineers do author
   fine-tuning loops).

## What round 9 revealed for the first time

6. **Tautological softener label** when checklist Yellow + softener
   fires (Pooja F5). Spark stale + enterpriseStillUsed: baseLabel
   was already "Review / Probe" (Yellow); softener fires and produces
   `"Review / Probe (softened from Review / Probe — stale but
   defensible)"`. Same-color from-clause is awkward. Suppress
   from-clause when `baseLabel === finalLabel`. ~3 LOC fix in
   `composeLabel` at `scoring.ts:386-389`.

7. **Wording in capped-by-scope UI strips** doesn't match 8B's
   Yellow-base case (Anil F1, F2). TechCard.tsx:158-163 +
   Summary.tsx:656-660 italic strips render `"Verdict capped by scope
   — {scope} scope can't earn the higher tier on operating signals
   alone"` for ALL scopeCapped: true cases. For 8B's Yellow-base case
   the verdict wasn't lowered — it was *bounded*. Two-line fix to
   branch on `cappedFromColor !== undefined`.

8. **DevOps catalog vocabulary is 2018-2022 GitOps-era.** Lars's
   6 named-only canonical 2026 platform-eng entries — Argo Rollouts,
   Karpenter, Backstage, Unleash, Crossplane, cosign/SLSA — are
   absent. Each is a ~30 min catalog add (similar shape to round-6
   Oracle entry). DevOps template chip refresh also needed (current
   6 chips lean GitOps-era; 2024-2026 differentiators are
   supply-chain-security / cost-aware-platform / IDP-golden-paths /
   chaos-resilience).

9. **QA chip-set has 5 quality improvements** (Akira F1-F5). Chip 5
   split (perf-gates + load-testing), add visual-regression chip,
   replace mutation-testing → test-data-management. Plus catalog
   gaps: Pact (Akira's biggest project, currently named-only) +
   Cucumber. Drop Selenium from preload (legacy).

10. **6E auto-promote threshold confirmed under-fires on dense-stack
    senior cases** (Lars F5). 6 named-only > 8 scored = `> scored`
    threshold doesn't fire (which is correct under current rule —
    the named-only count is large but not larger than scored). Real
    fix is catalog the named-only items, not tweak threshold. Confirms
    Pooja F3 from round 8: catalog Debezium / GE / polars / Braintrust /
    Evidently / Feast / Langfuse rather than fight the threshold.

## Two new defects named

- **9α-capped-italic-mismatch (Anil F1, F2).** TechCard.tsx:158 +
  Summary.tsx:656 italic strips need to branch on `cappedFromColor`
  to differentiate Green-base capped ("verdict lowered") from
  Yellow-base capped ("verdict bounded"). ~10 LOC.

- **9β-tautological-softener (Pooja F5).** When `baseLabel ===
  finalLabel` in composeLabel softener branch, suppress the from-clause.
  ~3 LOC in `scoring.ts:386-389`.

## Speed-of-use distribution

- Round 3: 0 Safe / 7 At-risk / 3 Unworkable
- Round 4: 0 Safe / 5 At-risk / 1 not-stated
- Round 5: 1 Safe / 5 At-risk / 0 Unworkable
- Round 6: 2 Safe / 4 At-risk / 0 Unworkable
- Round 7: 3 Safe / 3 At-risk / 0 Unworkable
- Round 8: 2 Safe / 4 At-risk / 0 Unworkable
- **Round 9: 5 Safe / 1 At-risk / 0 Unworkable** ← best distribution to date

Trajectory: rounds 3-9 converged from "fundamentally broken on phone"
to "templates fit their target personas." Round 9's 5/1/0 is the
saturation marker. The remaining 1 At-risk (Esme) is on AI/ML
productionization, a never-validated terrain that round-2 K2 didn't
account for.

## The 6 sessions at a glance

| # | Persona              | Channel | Rating | Headline finding |
|---|----------------------|---------|--------|------------------|
| 01 | Mei (Junior FE)     | Phone   | **Safe** | 8A renders end-to-end; card+panel parity restored; J4/J5 still load-bearing |
| 02 | Anil (Staff SA)     | Phone   | **Safe** | 8B fires correctly on Azure Yellow-base; 2 wording defects in italic strips |
| 03 | Pooja (Senior DE)   | Phone   | **Safe** | 8D landed cleanly; tautological softener label cosmetic finding |
| 04 | Lars (Senior DevOps) | Phone  | **Safe** | First-ever DevOps validation; ~75% out-of-box; 6 catalog gaps named |
| 05 | Akira (Senior QA)   | Phone   | **Safe** | First-ever QA validation; ~75% out-of-box; 5 quality improvements named |
| 06 | Esme (Senior AI/ML prod) | Phone | **At-risk** | AI/ML template defaultScope shape-mismatch for productionization; ~22s tax |

## Priority list — round 9 (top 5)

| ID | Severity | Effort | Item |
|----|----------|--------|------|
| **9A** | High | ~8 LOC | **AI/ML template productionization scope fix** (Esme F1). Add `techScopes: { pytorch: 'operator', 'llm-api-sdk': 'operator', 'vector-db': 'operator' }` to `data` template... wait, `ai-ml` template at `roles.ts:226-241`. Keep `huggingface-transformers` at catalog default (genuine scope ambiguity). Closes Esme's 22s tax. |
| **9B** | Medium | ~10 LOC | **9α capped-italic copy** (Anil F1, F2). Branch `TechCard.tsx:158-163` and `Summary.tsx:656-660` italic-strip text on `cappedFromColor !== undefined`. Green-base: keep existing "can't earn higher tier" wording. Yellow-base: new wording "Verdict bounded by scope — review/architect-shape signal, not operating-signal". |
| **9C** | Low | ~5 LOC | **9β tautological softener** (Pooja F5). In `composeLabel` softener branch (`scoring.ts:386-389`), suppress the from-clause when `LABEL_MAP[finalColor] === baseLabel`. |
| **9D** | Medium | ~15 LOC + 5 chip swaps | **QA template chip refresh + Selenium-de-preload** (Akira F1-F4). Split chip 5 → perf-regression-gates + load-testing-discipline. Add visual-regression chip. Replace mutation-testing → test-data-management. Drop Selenium from preload (8 → 7 techs). |
| **9E** | Low | ~5 LOC | **DevOps preload Vault** (Lars F2). Add `vault` to DevOps template `techIds` — same Snowflake/DE pattern. Vault is catalog (Security template uses it). |

### Deferred / cosmetic backlog

- **DevOps catalog adds** (Lars F1) — Argo Rollouts, Karpenter, Backstage,
  Unleash, Crossplane, cosign/SLSA. ~30 min each = ~3 hr. Defer to a
  consolidated catalog refresh pass.
- **DevOps chip refresh** (Lars F3) — swap GitOps-era chips for 2024-2026
  differentiators. Defer until a second DevOps persona validates.
- **QA catalog adds** (Akira) — Pact (checklist) + Cucumber (version-mode).
  ~30 min × 2 = 1 hr. Defer.
- **AI/ML catalog adds** (Esme F3) — Braintrust, Evidently, Feast, Langfuse.
  Productionization-canonical. ~30 min × 4 = 2 hr. Defer.
- **6E auto-promote rule rethink** — confirmed across rounds 7-9. Real fix
  is catalog the named-only items. Defer the rule tweak.
- **UIKit catalog entry** (Kenji R5, deferred from rounds 7-8). Round-9 didn't
  re-validate but remains the load-bearing residual gap for iOS migration shops.
- **Storybook catalog entry** (Maya M2 round 8). Defer.
- **7E RN tier-level enterpriseStillUsed restoration** (Diego F5 round 8). Defer.

## Recommended ship order

**Single batch (~30 LOC + chip data):** 9A + 9B + 9C + 9D + 9E together.
All small, all close named composition gaps from this morning, all
touch `roles.ts` / `scoring.ts` / `TechCard.tsx` / `Summary.tsx` only.
Highest priority is 9A (load-bearing for productionization shape); the
rest are wording polish + small template tweaks.

**Catalog refresh batch (deferred, ~6 hr):** DevOps + QA + AI/ML
catalog adds (15-20 entries). Schedule as a separate session — too
big to mix with 9A-9E without losing surgical focus.

If round 10 runs after batch 9 ships: cast should include (i) an Esme
redux to validate 9A landed, (ii) a Lars-equivalent on a different
DevOps shop shape to validate DevOps template across personas, (iii)
maybe an iOS migration shop to surface UIKit pressure again. But
honestly, round 10 may show saturation (6/0/0 distribution) which
is the natural stopping point.
