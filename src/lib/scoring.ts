import type {
  AssessmentItem,
  Depth,
  ResolvedTier,
  Scope,
  Seniority,
  ServiceItem,
  Technology,
  TierColor,
} from '../types';
import { compareVersions, looksLikeVersion } from './version';
import { parseLastUsed } from './lastUsed';

/**
 * Severity ordering used for depth adjustment.
 * Higher number = worse. Depth can move severity down by at most 1 step.
 */
const SEVERITY: Record<TierColor, number> = {
  green: 0,
  yellow: 1,
  red: 2,
};

const COLOR_ORDER: TierColor[] = ['green', 'yellow', 'red'];

/** Depth adjustment moves severity by at most one step.
 *  - deep / very-deep → lift severity down by one (Yellow→Green, Red→Yellow).
 *  - Round-7 7D (J1, Mei + Eitan): shallow + seniority=junior → LOWER severity
 *    by one (Green→Yellow, Yellow→Red). Pre-7D, depth never lowered, so a
 *    junior who barely uses TypeScript (shallow) read identical to a senior
 *    library author at the same Green tier. Junior gate prevents the lower
 *    from over-correcting mid/senior unspecified-shallow cases (those default
 *    to working). The `direction` field tells composeLabel which framing to
 *    render. */
function adjustForDepth(color: TierColor, depth: Depth, seniority?: Seniority): {
  color: TierColor;
  adjusted: boolean;
  direction?: 'lifted' | 'lowered';
} {
  if (depth === 'deep' || depth === 'very-deep') {
    const sev = SEVERITY[color];
    if (sev === 0) return { color, adjusted: false };
    const improved = COLOR_ORDER[sev - 1];
    return { color: improved, adjusted: true, direction: 'lifted' };
  }
  if (depth === 'shallow' && seniority === 'junior') {
    const sev = SEVERITY[color];
    if (sev === SEVERITY.red) return { color, adjusted: false };
    const worsened = COLOR_ORDER[sev + 1];
    return { color: worsened, adjusted: true, direction: 'lowered' };
  }
  return { color, adjusted: false };
}

/**
 * Scope-of-use post-processing. Runs *after* depth adjustment and may revert
 * or cap it. Closes the cluster of misreadings where reviewers, architects,
 * and notebook-authors get scored like operators.
 *
 * - operator / undefined → no-op (pre-scope behavior)
 * - reviewer / architect → ceiling at Yellow. Knowing the shape without running
 *   it in prod cannot be Green, regardless of how deep the depth claim is.
 * - author              → no overall ceiling, but the depth lift cannot push
 *   Yellow → Green. Red → Yellow lifts still go through (they have hands-on
 *   *with the code*; they just don't operate it).
 */
function applyScope(
  baseColor: TierColor,
  adjusted: { color: TierColor; adjusted: boolean; direction?: 'lifted' | 'lowered' },
  scope: Scope | undefined
): { color: TierColor; depthAdjusted: boolean; depthDirection?: 'lifted' | 'lowered'; scopeCapped: boolean; cappedFromColor?: TierColor } {
  if (!scope || scope === 'operator') {
    return {
      color: adjusted.color,
      depthAdjusted: adjusted.adjusted,
      depthDirection: adjusted.direction,
      scopeCapped: false,
    };
  }
  if (scope === 'reviewer' || scope === 'architect') {
    if (SEVERITY[adjusted.color] < SEVERITY.yellow) {
      // Whether the Green came from a natural tier match or a depth-lift,
      // the cap erases it — depthAdjusted reset to false so callers don't
      // claim credit for a lift the cap removed. Round-7 7C: preserve the
      // pre-cap color in `cappedFromColor` so the UI can differentiate
      // "capped from Good by architect scope" (Staff IC pattern) from a
      // plain Yellow ("midmarket signal").
      return { color: 'yellow', depthAdjusted: false, scopeCapped: true, cappedFromColor: adjusted.color };
    }
    // Round-8 8B (Anil R2, "8α"): Yellow-base architect/reviewer used to
    // pass through identical to a thin-coverage mid-engineer. The Staff-IC
    // framing was invisible whenever the underlying coverage didn't quite
    // cross 40% (Anil's Azure at 5/13 = 38% read identical to a mid-engineer
    // who happens to know 5/13 Azure services). Set scopeCapped: true so
    // composeLabel renders "(capped — architect scope)" and the recruiter
    // sees scope was applied to this Yellow. `cappedFromColor` is left
    // undefined — the verdict wasn't lowered, just *bounded* by scope —
    // so the Summary's Scope-capped headline keeps counting Staff-IC
    // pattern only (Green-base capped) and doesn't inflate.
    if (SEVERITY[adjusted.color] === SEVERITY.yellow) {
      return {
        color: adjusted.color,
        depthAdjusted: adjusted.adjusted,
        depthDirection: adjusted.direction,
        scopeCapped: true,
      };
    }
    // Red — architect/reviewer scope doesn't pull a Red down further,
    // and surfacing "(capped)" on a Red would imply the candidate would
    // have been higher without scope, which isn't honest for thin coverage.
    return {
      color: adjusted.color,
      depthAdjusted: adjusted.adjusted,
      depthDirection: adjusted.direction,
      scopeCapped: false,
    };
  }
  // scope === 'author'
  if (adjusted.adjusted && adjusted.direction === 'lifted' && baseColor === 'yellow' && adjusted.color === 'green') {
    return { color: 'yellow', depthAdjusted: false, scopeCapped: true, cappedFromColor: 'green' };
  }
  return {
    color: adjusted.color,
    depthAdjusted: adjusted.adjusted,
    depthDirection: adjusted.direction,
    scopeCapped: false,
  };
}

const LABEL_MAP: Record<TierColor, string> = {
  green: 'Good',
  yellow: 'Review / Probe',
  red: 'Concern',
};

/**
 * Fix E (round-3 cross-cut, Sarah's design wrinkle): asymmetric recency
 * adjustment. Runs AFTER scope and ONLY on version-mode tier-match
 * results (not unknown-version, not checklist, not notUsed, not
 * notDiscussed — none of those have a version to anchor recency to).
 *
 * - **Penalize stale Greens** (Sam-Ansible / Maya-RN-2022 case): when
 *   the version is current but the candidate hasn't touched it in 2+
 *   years, drop Green→Yellow with "Stale — verify currency" note.
 *   Without this, a confidently-quoted version reads identical to live
 *   production use.
 * - **Soften stale Reds for enterprise-still-used techs** (Sarah-Spring
 *   case): when the tech carries `enterpriseStillUsed: true` (catalog's
 *   way of saying "this is still around, the old version is defensible"),
 *   stale Red lifts to Yellow with "returner — expect ramp-up" note.
 *   Spring Boot 2.5 was current when Sarah left in 2022; she shouldn't
 *   read as Concern in 2026, she should read as "returner, ramp-up
 *   expected".
 *
 * Recent / current / unknown — no adjustment. Yellow tiers no change.
 *
 * Why asymmetric? The same axis (years stale) means opposite things
 * depending on the *direction*: it weakens an active-tech claim and
 * softens an outdated-tech concern. Round-3 Sarah's session named this
 * design wrinkle and the canonical fix isn't symmetric penalty.
 */
function applyRecency(
  current: { color: TierColor; depthAdjusted: boolean; depthDirection?: 'lifted' | 'lowered'; scopeCapped: boolean; cappedFromColor?: TierColor },
  lastUsed: string,
  tech: Technology,
  seniority?: Seniority
): { color: TierColor; depthAdjusted: boolean; depthDirection?: 'lifted' | 'lowered'; scopeCapped: boolean; cappedFromColor?: TierColor; recencyAdjusted: boolean; recencyNote?: string; recencyDirection?: 'softener' | 'penalty' } {
  const { bucket } = parseLastUsed(lastUsed);

  // Only stale/ancient trigger anything; current/recent/unknown pass through.
  if (bucket !== 'stale' && bucket !== 'ancient') {
    return { ...current, recencyAdjusted: false };
  }

  const yearsLabel = bucket === 'ancient' ? '5+ yr' : '2-4 yr';

  // Penalize stale Greens — the version was current but the candidate
  // hasn't touched it. Most over-confident-recency-claim case.
  if (current.color === 'green') {
    return {
      color: 'yellow',
      depthAdjusted: false, // recency overrides depth-lift credit
      scopeCapped: false,
      recencyAdjusted: true,
      recencyDirection: 'penalty',
      recencyNote: `Stale (${yearsLabel} since last used) — verify currency before relying on this signal.`,
    };
  }

  // Soften stale non-Greens for enterprise-still-used techs. Round-6 Mei
  // surfaced that this reassurance misfires for juniors on "team hasn't
  // upgraded" stacks (Next.js 12 reads as defensible-legacy, masking a
  // real junior gap on App Router). Round-6 6C: skip the softener when
  // `seniority === 'junior'`; let juniors stay Yellow/Red so the recruiter
  // probes the gap rather than soothing past it. Returner / mid / senior
  // shapes still soften.
  if (tech.enterpriseStillUsed && seniority !== 'junior') {
    return {
      color: 'yellow',
      // Preserve upstream flags so the scope-cap note can still render
      // alongside the softener note (both stories are true; both useful).
      // composeLabel precedence still picks the softener label over scope.
      // Round-7 7C: also preserve cappedFromColor so the new headline card
      // counts this entry correctly when both softener and scope-cap fire.
      depthAdjusted: current.depthAdjusted,
      depthDirection: current.depthDirection,
      scopeCapped: current.scopeCapped,
      cappedFromColor: current.cappedFromColor,
      recencyAdjusted: true,
      recencyDirection: 'softener',
      // Round-7 7B (Sven): old wording "returner shape; expect ramp-up"
      // misfired on the "moved-off" case — Sven deliberately left AWS
      // Lambda 18mo ago, he's a current employee not a returner. Neutral
      // wording handles returner / moved-off / team-won't-upgrade equally:
      // the verdict color is defensible regardless of cause; the recruiter
      // probes the cause.
      recencyNote: `Stale (${yearsLabel}) but the version was current at last-use — defensible older usage; probe whether the candidate is returning to it or deliberately moved off.`,
    };
  }

  // Stale Reds without the enterprise flag → genuine concern, no softening.
  // Stale Yellows without the enterprise flag → no adjustment (probe further).
  return { ...current, recencyAdjusted: false };
}

/**
 * Round-18 (Theo R12 sim 04 — round-17 closure bug): pre-batch-18 the
 * `serviceTagFilters` template field was render-only — TechCard.tsx hid
 * tag-filtered services from the checkbox grid but resolveChecklistTier /
 * resolveHybridTier used `tech.services.length` as denominator. Theo's
 * Custom + AWS read 3/15 in the checkbox UI but the verdict label showed
 * "3/26 services" — internally contradictory. Threading the filter through
 * scoring lets the denominator match the rendered list. Filter semantics
 * mirror TechCard.tsx: matched-by-tag OR already-selected OR untagged.
 */
function filterServicesByTag(
  allServices: ServiceItem[],
  selectedIds: string[],
  tagFilter?: string[]
): ServiceItem[] {
  if (!tagFilter || tagFilter.length === 0) return allServices;
  const selectedSet = new Set(selectedIds);
  return allServices.filter(s => {
    if (selectedSet.has(s.id)) return true;
    if (!s.tags?.length) return true;
    return s.tags.some(t => tagFilter.includes(t));
  });
}

export function resolveTier(
  tech: Technology,
  item: AssessmentItem,
  opts?: { seniority?: Seniority; serviceTagFilter?: string[] }
): ResolvedTier {
  // Candidate explicitly does not work with this tech. Excluded from
  // scoring entirely — buckets and radar must filter on `skipped`.
  // The `color` field is a sentinel; consumers should branch on `skipped`
  // before rendering a tier badge.
  if (item.notUsed) {
    return {
      color: 'yellow',
      label: `Not in candidate's stack`,
      note: `Candidate confirmed they don't work with ${tech.name}. Excluded from the score and radar.`,
      enterpriseNote: undefined,
      unknownVersion: false,
      depthAdjusted: false,
      skipped: true,
    };
  }

  // Fix K (2026-05-16 round-2): when the recruiter hasn't set scope
  // explicitly, fall back to the catalog default (e.g. AI/ML libs default
  // to `author` because they're used as libraries, not operated as
  // services). Explicit user choice always wins. Pass the effective scope
  // through `item` so the downstream paths get a consistent view.
  const itemWithEffectiveScope: AssessmentItem =
    item.scope === undefined && tech.defaultScope !== undefined
      ? { ...item, scope: tech.defaultScope }
      : item;

  if (tech.vetMode === 'checklist') {
    return resolveChecklistTier(tech, itemWithEffectiveScope, opts?.seniority, opts?.serviceTagFilter);
  }
  if (tech.vetMode === 'hybrid') {
    return resolveHybridTier(tech, itemWithEffectiveScope, opts?.seniority, opts?.serviceTagFilter);
  }
  return resolveVersionTier(tech, itemWithEffectiveScope, opts?.seniority);
}

function resolveVersionTier(
  tech: Technology,
  item: AssessmentItem,
  seniority?: Seniority
): ResolvedTier {
  if (item.unknownVersion || !item.version || !looksLikeVersion(item.version)) {
    const baseColor: TierColor = 'yellow';
    // Fix B (2026-05-16 round-2 cross-cut): no depth-lift when version is
    // unknown. If the candidate can't quote a version, there's no version
    // evidence to "lift". Lifting Yellow→Green from depth alone produced
    // misleading Greens for managed-platform daily-drivers (Tomás/Postgres,
    // Aisha/Helm) and toolchain-pinned ecosystems (Hana/Swift, Marcus/Docker).
    // Scope still runs so reviewer/architect caps continue to fire.
    const noLift = { color: baseColor, adjusted: false };
    const scoped = applyScope(baseColor, noLift, item.scope);
    // Fix G: a card was never touched (template-preloaded, recruiter ran
    // out of time) if there's no version, no toggle, and no notes/services.
    // Excluded from headline buckets/radar; rendered as "Not discussed".
    const notDiscussed =
      !item.unknownVersion && !item.version && !item.notUsed;
    // Suppress the "still widely used in enterprise" reassurance when the
    // candidate has neither a version NOR meaningful depth. The note is
    // designed for "they're on Cypress 10 because the org won't migrate" —
    // not for "they've literally never used Kotlin" / "Docker version doesn't
    // exist for them because GHA runners manage it". Firing it on a non-skill
    // misleads the hiring manager into reading the Yellow as legacy-competence.
    const candidateHasMeaningfulDepth =
      item.depth === 'working' || item.depth === 'deep' || item.depth === 'very-deep';
    return {
      color: scoped.color,
      label: composeLabel({
        finalColor: scoped.color,
        baseLabel: 'Review / Probe',
        depthAdjusted: scoped.depthAdjusted,
        scopeCapped: scoped.scopeCapped,
        cappedFromColor: scoped.cappedFromColor,
        scope: item.scope,
      }),
      note: tech.guidanceForUnknownVersion,
      // Round-6 6C: same juniors-misfire gate as the recency softener.
      // "Still widely used in enterprise" reassures the HM that a stale
      // version is defensible — exactly the wrong framing for a junior on
      // a stack the team hasn't upgraded (Mei/Next.js 12 vs App Router gap).
      enterpriseNote:
        tech.enterpriseStillUsed && candidateHasMeaningfulDepth && seniority !== 'junior'
          ? 'Still widely used in many enterprise applications.'
          : undefined,
      unknownVersion: true,
      depthAdjusted: scoped.depthAdjusted,
      scopeCapped: scoped.scopeCapped,
      cappedFromColor: scoped.cappedFromColor,
      notDiscussed,
    };
  }

  const tier = findTier(tech, item.version);
  // Round-7 7D: pass seniority so depth=shallow on a junior can lower tier
  // (Mei TS 5.3 + shallow + junior → Yellow instead of Green).
  const adjusted = adjustForDepth(tier.color, item.depth, seniority);
  const scoped = applyScope(tier.color, adjusted, item.scope);
  // Fix E: recency runs AFTER scope so its asymmetric softener/penalty
  // applies to the post-scope verdict (not the raw tier match). Order
  // matters: tier → depth → scope → recency.
  const withRecency = applyRecency(scoped, item.lastUsed, tech, seniority);

  // Tier-level flag overrides root. ~20 catalog entries declare the flag at
  // tier level (e.g. Selenium 3, Cypress 10–11) — those want the reassurance
  // note ONLY on that tier, not whenever the candidate hits any Yellow band.
  const enterpriseFlag = tier.enterpriseStillUsed ?? tech.enterpriseStillUsed;

  return {
    color: withRecency.color,
    label: composeLabel({
      finalColor: withRecency.color,
      baseLabel: tier.label,
      baseColor: tier.color,
      depthAdjusted: withRecency.depthAdjusted,
      depthDirection: withRecency.depthDirection,
      scopeCapped: withRecency.scopeCapped,
      cappedFromColor: withRecency.cappedFromColor,
      scope: item.scope,
      recencyAdjusted: withRecency.recencyAdjusted,
      recencyDirection: withRecency.recencyDirection,
    }),
    note: tier.note,
    // Round-6 6C: gate enterpriseNote on seniority !== 'junior' (see
    // unknown-version branch comment above for rationale).
    enterpriseNote:
      tier.color === 'yellow' && enterpriseFlag && !withRecency.recencyAdjusted && seniority !== 'junior'
        ? 'Still widely used in many enterprise applications.'
        : undefined,
    unknownVersion: false,
    depthAdjusted: withRecency.depthAdjusted,
    depthDirection: withRecency.depthDirection,
    scopeCapped: withRecency.scopeCapped,
    cappedFromColor: withRecency.cappedFromColor,
    recencyAdjusted: withRecency.recencyAdjusted,
    recencyNote: withRecency.recencyNote,
  };
}

/** Centralized label composition: final-tier name, plus parenthetical when
 *  depth lifted it, scope capped it, or recency adjusted it. Precedence:
 *  recencyAdjusted > scopeCapped > depthAdjusted > raw tier label.
 *  Recency takes priority because the softener/penalty *replaces* the
 *  reason the candidate is at the final color (the asymmetric story is
 *  the most decision-relevant signal). */
function composeLabel(opts: {
  finalColor: TierColor;
  baseLabel: string;
  /** Round-7 7D: needed to render "(lowered from <baseLabel> by shallow depth)"
   *  for junior cases — when depth lowers Green→Yellow, baseLabel is "Excellent"
   *  (Green) but finalColor is Yellow. Optional for back-compat with checklist
   *  call sites that don't have a base color concept. */
  baseColor?: TierColor;
  depthAdjusted: boolean;
  depthDirection?: 'lifted' | 'lowered';
  scopeCapped: boolean;
  cappedFromColor?: TierColor;
  scope: Scope | undefined;
  recencyAdjusted?: boolean;
  recencyDirection?: 'softener' | 'penalty';
}): string {
  const finalLabel = LABEL_MAP[opts.finalColor];
  if (opts.recencyAdjusted) {
    // Round-9 9C (Pooja F5): tautological from-clause when softener fires
    // on an already-Yellow baseLabel — was rendering "(softened from Review /
    // Probe — stale but defensible)" on a label that's also "Review / Probe."
    // Suppress the from-clause when final and base labels match.
    const sameLabel = finalLabel === opts.baseLabel;
    if (opts.recencyDirection === 'softener') {
      return sameLabel
        ? `${finalLabel} (stale but defensible)`
        : `${finalLabel} (softened from ${opts.baseLabel} — stale but defensible)`;
    }
    return sameLabel
      ? `${finalLabel} (stale)`
      : `${finalLabel} (penalized from ${opts.baseLabel} — stale)`;
  }
  if (opts.scopeCapped) {
    // Round-7 7C (5ξ, Anil): when we know the pre-cap color, name it.
    // "Capped from Good by architect scope" tells the HM "this candidate
    // would have read Good if they operated it day-to-day" — Staff IC
    // pattern. Plain "(capped — architect scope)" was the pre-7C fallback
    // and stays as the no-cappedFromColor case.
    if (opts.cappedFromColor) {
      const fromLabel = LABEL_MAP[opts.cappedFromColor];
      return `${finalLabel} (capped from ${fromLabel} by ${opts.scope} scope)`;
    }
    return `${finalLabel} (capped — ${opts.scope} scope)`;
  }
  if (opts.depthAdjusted) {
    // Round-7 7D (J1): direction differentiates junior-shallow-down from
    // the existing senior-deep-lift. "Lowered from Good by shallow depth"
    // tells HM the junior's verdict honestly reflects their depth claim.
    if (opts.depthDirection === 'lowered') {
      return `${finalLabel} (lowered from ${opts.baseLabel} by shallow depth)`;
    }
    return `${finalLabel} (lifted from ${opts.baseLabel} by depth)`;
  }
  return opts.baseLabel;
}

function findTier(tech: Technology, version: string) {
  const tiers = tech.versionTiers ?? [];
  const sorted = [...tiers].sort((a, b) => compareVersions(b.min, a.min));
  for (const tier of sorted) {
    if (compareVersions(version, tier.min) >= 0) return tier;
  }
  return sorted[sorted.length - 1];
}

function resolveChecklistTier(
  tech: Technology,
  item: AssessmentItem,
  seniority?: Seniority,
  serviceTagFilter?: string[]
): ResolvedTier {
  const allServices = tech.services ?? [];
  // Round-18 (Theo R12 fix): use the template-filtered service list as the
  // denominator (mirrors TechCard render). Pre-18 the scoring used full
  // services.length while the card hid filtered services, producing an
  // internally contradictory "3/15 in checklist, 3/26 in label" output.
  const services = filterServicesByTag(allServices, item.selectedServices ?? [], serviceTagFilter);
  const validIds = new Set(services.map(s => s.id));
  const selected = (item.selectedServices ?? []).filter(id => validIds.has(id));
  const total = services.length || 1;
  const ratio = selected.length / total;
  const coverage = { selected: selected.length, total: services.length };

  // Candidate explicitly couldn't recall services — checklist mirror of
  // `unknownVersion`. Skip depth adjustment so the verdict stays parked at
  // Yellow until the recruiter actually probes.
  if (item.checklistUnsure) {
    return {
      color: 'yellow',
      label: `Review / Probe — candidate unsure`,
      note: `Candidate couldn't recall which ${tech.name} services they've used in production. Probe with a couple of pointed examples or move on and revisit.`,
      enterpriseNote: undefined,
      unknownVersion: false,
      depthAdjusted: false,
      coverage,
    };
  }

  // 0/N before any interaction = "not yet assessed" (yellow), not "concern" (red).
  // Once the recruiter has ticked anything (even if later unticked back to 0),
  // a genuine zero still surfaces as Concern.
  // Fix G (2026-05-16 round-2): also flag notDiscussed so Summary excludes
  // from buckets/radar — recruiter's silence isn't candidate weakness.
  if (selected.length === 0 && !item.checklistTouched) {
    return {
      color: 'yellow',
      label: `Not yet assessed — 0/${coverage.total} services`,
      note: `Walk the candidate through the curated ${tech.name} services and tick the ones they've used in production. The status updates as you go.`,
      enterpriseNote: undefined,
      unknownVersion: false,
      depthAdjusted: false,
      coverage,
      notDiscussed: true,
    };
  }

  let baseColor: TierColor;
  if (ratio < 0.25) baseColor = 'red';
  else if (ratio < 0.66) baseColor = 'yellow';
  else baseColor = 'green';

  // Round-6 6D (was deferred 5λ): qualified depth-lift on checklist mode.
  // Original Fix A (round-2) forbade ANY depth-lift on checklist because
  // "coverage IS the signal" — Vikram-style over-claiming (2/12 LangChain
  // services + 'very-deep' should not become Green from a self-report).
  // That guard still holds for low coverage. But round-1→6 surfaced 5
  // separate sessions (Robin / Cara / Brigit / Tanvir / Owen) where
  // deep-narrow specialists with mid-band Yellow coverage (40–66%) were
  // structurally under-rated — an 18-yr Oracle DBA at 8/14 services +
  // very-deep reads as "Review / Probe" when he's clearly Green-shape in
  // his lane.
  //
  // Resolution: keep Fix A's floor protection (Red stays Red even with
  // deep claim — protects Vikram case) but lift Yellow → Green when
  // ALL of: coverage ≥ 40%, depth ∈ {deep, very-deep}, seniority !==
  // 'junior'. The 40% floor splits the Yellow band: 25–40% is surface
  // (Vikram territory) where depth claims can't move the needle, 40–66%
  // is focused-specialist territory where a deep claim is defensible
  // and matches Owen's "mutually constraining" recommendation. Junior
  // gate matches 6C's pattern (junior depth claims unreliable; require
  // probe rather than soothe via lift). Reviewer/architect scope still
  // caps the lift, recency still runs after.
  const COVERAGE_LIFT_FLOOR = 0.4;
  const depthQualifies = item.depth === 'deep' || item.depth === 'very-deep';
  const coverageQualifies = ratio >= COVERAGE_LIFT_FLOOR;
  const seniorityQualifies = seniority !== 'junior';
  const shouldLift =
    baseColor === 'yellow' && depthQualifies && coverageQualifies && seniorityQualifies;
  const adjusted = shouldLift
    ? { color: 'green' as TierColor, adjusted: true }
    : { color: baseColor, adjusted: false };
  const scoped = applyScope(baseColor, adjusted, item.scope);
  // Round-6 6A (was round-5 5κ, deferred): apply Fix E recency to checklist
  // mode too. Margarethe's AWS at 3/14 = 21% reads Red (correct on raw
  // coverage), but her lastUsed=2022 + enterpriseStillUsed AWS catalog flag
  // tells the returner story — Red → Yellow softened with "returner shape"
  // note. Stale Greens (Green coverage but ancient) also penalize via the
  // same asymmetric logic. Order matches version-mode: coverage → scope →
  // recency. The 6C seniority gate inside applyRecency also applies here.
  const withRecency = applyRecency(scoped, item.lastUsed, tech, seniority);
  const ratioPct = Math.round(ratio * 100);
  const coverageSuffix = ` — ${coverage.selected}/${coverage.total} services`;

  const labelCore = composeLabel({
    finalColor: withRecency.color,
    baseLabel: LABEL_MAP[baseColor],
    depthAdjusted: withRecency.depthAdjusted,
    scopeCapped: withRecency.scopeCapped,
    cappedFromColor: withRecency.cappedFromColor,
    scope: item.scope,
    recencyAdjusted: withRecency.recencyAdjusted,
    recencyDirection: withRecency.recencyDirection,
  });
  const label = `${labelCore}${coverageSuffix}`;

  const note =
    coverage.selected === 0
      ? `No services ticked yet. Ask the candidate which ${tech.name} services they've used in production and tick what they confirm.`
      : tech.checklistGuidance ??
        `Coverage: ${ratioPct}% of curated services. Depth and last-used context matter — verify production scope, not tutorial scope.`;

  return {
    color: withRecency.color,
    label,
    note,
    enterpriseNote: undefined,
    unknownVersion: false,
    depthAdjusted: withRecency.depthAdjusted,
    scopeCapped: withRecency.scopeCapped,
    cappedFromColor: withRecency.cappedFromColor,
    coverage,
    recencyAdjusted: withRecency.recencyAdjusted,
    recencyNote: withRecency.recencyNote,
  };
}

/**
 * Round-12 hybrid mode (Sven round-7 R5 + Lars rounds 9-10): some techs carry
 * independent senior signal on BOTH the version axis (era / security posture)
 * and the services axis (depth of operation vs surface usage). Kubernetes is
 * the canonical case — Sven's Helm-consumer shape (works against a cluster but
 * doesn't operate it) and Lars's deep-platform-engineer shape both need the
 * same K8s entry to read honestly. Version-mode-only collapsed them; checklist-
 * only would have erased version-era signal.
 *
 * **Resolution model — weakest link.** Combine version-tier color + coverage-
 * tier color via MIN (severity-max). Then depth + scope + recency apply on top
 * via the existing version-mode pipeline (adjustForDepth → applyScope →
 * applyRecency). This means:
 *   - K8s 1.30 Green + 11/12 services Green → Green clean (Lars shape).
 *   - K8s 1.28 Green + 3/12 services Red → Red (Sven Helm-consumer — honest).
 *   - K8s 1.22 Yellow + 11/12 Green → Yellow base + depth=deep+senior lifts
 *     to Green (legacy-cluster-but-deep-operator — fair).
 *   - K8s 1.30 Green + services untouched → Green (back-compat: services that
 *     haven't been interacted with don't drag the verdict; matches existing
 *     checklist `notDiscussed` semantics).
 *
 * **Back-compat: services-untouched gate.** When `selectedServices.length === 0`
 * AND `!checklistTouched` AND `!checklistUnsure`, the services channel is
 * treated as "not yet assessed" and contributes nothing — only version drives.
 * This preserves the existing recruiter UX where a quick version-only K8s
 * check still produces a sensible Green / Yellow / Red verdict without
 * forcing a service walkthrough. Once any service is ticked (touched=true)
 * or `checklistUnsure` is set, the services channel goes live.
 */
function resolveHybridTier(
  tech: Technology,
  item: AssessmentItem,
  seniority?: Seniority,
  serviceTagFilter?: string[]
): ResolvedTier {
  const allServices = tech.services ?? [];
  // Round-18 (Theo R12 fix): same filter threading as resolveChecklistTier
  // so the hybrid coverage denominator matches the rendered service list.
  const services = filterServicesByTag(allServices, item.selectedServices ?? [], serviceTagFilter);
  const validIds = new Set(services.map(s => s.id));
  const selected = (item.selectedServices ?? []).filter(id => validIds.has(id));
  const total = services.length || 1;
  const ratio = selected.length / total;
  const coverage = { selected: selected.length, total: services.length };

  // Services-channel gate. Untouched + no ticks = "not yet assessed" → version-only.
  // Touched OR explicit-unsure OR any ticks = services channel goes live.
  const servicesInteracted = (item.checklistTouched ?? false) || (item.checklistUnsure ?? false) || selected.length > 0;

  // Version-channel: unknownVersion / empty / unparseable forces Yellow base
  // (Fix B: no depth-lift when version is unknown). Same logic as version-mode.
  const versionUnknown = item.unknownVersion || !item.version || !looksLikeVersion(item.version);
  let versionBaseColor: TierColor = 'yellow';
  let versionTier: ReturnType<typeof findTier> | null = null;
  if (!versionUnknown) {
    versionTier = findTier(tech, item.version);
    versionBaseColor = versionTier.color;
  }

  // Services-channel: if checklistUnsure flips true, parked at Yellow.
  // Otherwise compute coverage tier (<25 R / 25-66 Y / ≥66 G).
  let coverageColor: TierColor | null = null;
  if (item.checklistUnsure) {
    coverageColor = 'yellow';
  } else if (servicesInteracted) {
    if (ratio < 0.25) coverageColor = 'red';
    else if (ratio < 0.66) coverageColor = 'yellow';
    else coverageColor = 'green';
  }

  // Combine — weakest link (max severity = worst).
  const combinedBaseColor: TierColor = coverageColor === null
    ? versionBaseColor
    : SEVERITY[coverageColor] > SEVERITY[versionBaseColor]
      ? coverageColor
      : versionBaseColor;

  // Depth + scope + recency apply on the combined base, mirroring version-mode.
  // Note: Fix B (no depth-lift when version unknown) still holds — pass
  // depth='unknown' equivalent if versionUnknown so adjustForDepth no-ops on
  // the lift side. Easier: pass through normally; adjustForDepth's deep/very-
  // deep lift is honest signal even when version is unknown IF services have
  // been thoroughly walked. Trade-off discussed in Sven-round-7 cross-cut;
  // ship the simple version (always run adjustForDepth) and revisit if a sim
  // surfaces a regression.
  const adjusted = adjustForDepth(combinedBaseColor, item.depth, seniority);
  const scoped = applyScope(combinedBaseColor, adjusted, item.scope);
  const withRecency = applyRecency(scoped, item.lastUsed, tech, seniority);

  // Compose label. baseLabel is the WORSE channel's label so composeLabel's
  // "(lifted from X by depth)" / "(capped from X by scope)" framing is honest.
  const baseLabel: string =
    coverageColor !== null && SEVERITY[coverageColor] > SEVERITY[versionBaseColor]
      ? LABEL_MAP[coverageColor]
      : versionTier?.label ?? LABEL_MAP[versionBaseColor];

  const labelCore = composeLabel({
    finalColor: withRecency.color,
    baseLabel,
    baseColor: combinedBaseColor,
    depthAdjusted: withRecency.depthAdjusted,
    depthDirection: withRecency.depthDirection,
    scopeCapped: withRecency.scopeCapped,
    cappedFromColor: withRecency.cappedFromColor,
    scope: item.scope,
    recencyAdjusted: withRecency.recencyAdjusted,
    recencyDirection: withRecency.recencyDirection,
  });

  // Coverage suffix renders only when services-channel actually contributed
  // (otherwise it would imply "3/12 services" on a version-only assessment).
  const coverageSuffix = servicesInteracted ? ` — ${coverage.selected}/${coverage.total} services` : '';
  const label = labelCore + coverageSuffix;

  // notDiscussed marker — both channels silent.
  const notDiscussed = versionUnknown && !item.unknownVersion && !servicesInteracted && !item.notUsed;

  // Build the note. Combine version-tier note + checklist guidance if both
  // channels active; fall back to the active one otherwise.
  let note: string | undefined;
  if (versionTier?.note && servicesInteracted) {
    const ratioPct = Math.round(ratio * 100);
    note = `${versionTier.note} Coverage: ${ratioPct}% of curated services.`;
  } else if (versionTier?.note) {
    note = versionTier.note;
  } else if (servicesInteracted) {
    const ratioPct = Math.round(ratio * 100);
    note = tech.checklistGuidance ?? `Coverage: ${ratioPct}% of curated services.`;
  } else if (versionUnknown) {
    note = tech.guidanceForUnknownVersion;
  }

  // enterpriseNote: gate on version-tier Yellow (matches version-mode) + 6C
  // junior gate. Doesn't fire on the unknown-version branch unless the
  // candidate has meaningful depth (matches version-mode logic).
  const enterpriseFlag = versionTier?.enterpriseStillUsed ?? tech.enterpriseStillUsed;
  const candidateHasMeaningfulDepth =
    item.depth === 'working' || item.depth === 'deep' || item.depth === 'very-deep';
  const enterpriseNote =
    !withRecency.recencyAdjusted && seniority !== 'junior' && enterpriseFlag &&
    (
      (versionTier && versionTier.color === 'yellow') ||
      (versionUnknown && candidateHasMeaningfulDepth)
    )
      ? 'Still widely used in many enterprise applications.'
      : undefined;

  return {
    color: withRecency.color,
    label,
    note,
    enterpriseNote,
    unknownVersion: versionUnknown,
    depthAdjusted: withRecency.depthAdjusted,
    depthDirection: withRecency.depthDirection,
    scopeCapped: withRecency.scopeCapped,
    cappedFromColor: withRecency.cappedFromColor,
    coverage: servicesInteracted ? coverage : undefined,
    recencyAdjusted: withRecency.recencyAdjusted,
    recencyNote: withRecency.recencyNote,
    notDiscussed,
  };
}

export function colorScore(color: TierColor): number {
  return { green: 3, yellow: 2, red: 1 }[color];
}

export function tierBadgeClass(color: TierColor): string {
  return {
    green: 'badge-green',
    yellow: 'badge-yellow',
    red: 'badge-red',
  }[color];
}

export function tierCardClass(color: TierColor): string {
  return {
    green: 'tier-card-green',
    yellow: 'tier-card-yellow',
    red: 'tier-card-red',
  }[color];
}

export function depthLabel(d: Depth): string {
  return {
    unknown: 'Not specified',
    shallow: 'Shallow (used briefly)',
    working: 'Working knowledge',
    deep: 'Deep (built features end-to-end)',
    'very-deep': 'Very deep (architected / led)',
  }[d];
}

export function scopeLabel(s: Scope): string {
  return {
    operator: 'Operator (runs in prod)',
    author: 'Author (writes code that uses it)',
    reviewer: 'Reviewer (reviews / audits)',
    architect: 'Architect (designs how it gets used)',
  }[s];
}
