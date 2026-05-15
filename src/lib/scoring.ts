import type {
  AssessmentItem,
  Depth,
  ResolvedTier,
  Technology,
  TierColor,
} from '../types';
import { compareVersions, looksLikeVersion } from './version';

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

/** Depth adjustment moves severity down by at most one step. */
function adjustForDepth(color: TierColor, depth: Depth): {
  color: TierColor;
  adjusted: boolean;
} {
  if (depth !== 'deep' && depth !== 'very-deep') {
    return { color, adjusted: false };
  }
  const sev = SEVERITY[color];
  if (sev === 0) return { color, adjusted: false };
  const improved = COLOR_ORDER[sev - 1];
  return { color: improved, adjusted: true };
}

const LABEL_MAP: Record<TierColor, string> = {
  green: 'Good',
  yellow: 'Review / Probe',
  red: 'Concern',
};

export function resolveTier(
  tech: Technology,
  item: AssessmentItem
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

  if (tech.vetMode === 'checklist') {
    return resolveChecklistTier(tech, item);
  }
  return resolveVersionTier(tech, item);
}

function resolveVersionTier(
  tech: Technology,
  item: AssessmentItem
): ResolvedTier {
  if (item.unknownVersion || !item.version || !looksLikeVersion(item.version)) {
    const baseColor: TierColor = 'yellow';
    const adjusted = adjustForDepth(baseColor, item.depth);
    // Suppress the "still widely used in enterprise" reassurance when the
    // candidate has neither a version NOR meaningful depth. The note is
    // designed for "they're on Cypress 10 because the org won't migrate" —
    // not for "they've literally never used Kotlin" / "Docker version doesn't
    // exist for them because GHA runners manage it". Firing it on a non-skill
    // misleads the hiring manager into reading the Yellow as legacy-competence.
    const candidateHasMeaningfulDepth =
      item.depth === 'working' || item.depth === 'deep' || item.depth === 'very-deep';
    return {
      color: adjusted.color,
      label: adjusted.adjusted
        ? 'Good (lifted from Review / Probe by depth)'
        : 'Review / Probe',
      note: tech.guidanceForUnknownVersion,
      enterpriseNote:
        tech.enterpriseStillUsed && candidateHasMeaningfulDepth
          ? 'Still widely used in many enterprise applications.'
          : undefined,
      unknownVersion: true,
      depthAdjusted: adjusted.adjusted,
    };
  }

  const tier = findTier(tech, item.version);
  const adjusted = adjustForDepth(tier.color, item.depth);

  let label = tier.label;
  if (adjusted.adjusted) {
    label = `${LABEL_MAP[adjusted.color]} (lifted from ${tier.label} by depth)`;
  }

  // Tier-level flag overrides root. ~20 catalog entries declare the flag at
  // tier level (e.g. Selenium 3, Cypress 10–11) — those want the reassurance
  // note ONLY on that tier, not whenever the candidate hits any Yellow band.
  const enterpriseFlag = tier.enterpriseStillUsed ?? tech.enterpriseStillUsed;

  return {
    color: adjusted.color,
    label,
    note: tier.note,
    enterpriseNote:
      tier.color === 'yellow' && enterpriseFlag
        ? 'Still widely used in many enterprise applications.'
        : undefined,
    unknownVersion: false,
    depthAdjusted: adjusted.adjusted,
  };
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
  item: AssessmentItem
): ResolvedTier {
  const services = tech.services ?? [];
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
  if (selected.length === 0 && !item.checklistTouched) {
    return {
      color: 'yellow',
      label: `Not yet assessed — 0/${coverage.total} services`,
      note: `Walk the candidate through the curated ${tech.name} services and tick the ones they've used in production. The status updates as you go.`,
      enterpriseNote: undefined,
      unknownVersion: false,
      depthAdjusted: false,
      coverage,
    };
  }

  let baseColor: TierColor;
  if (ratio < 0.25) baseColor = 'red';
  else if (ratio < 0.66) baseColor = 'yellow';
  else baseColor = 'green';

  const adjusted = adjustForDepth(baseColor, item.depth);
  const ratioPct = Math.round(ratio * 100);

  const baseLabel = `${LABEL_MAP[baseColor]} — ${coverage.selected}/${coverage.total} services`;
  const label = adjusted.adjusted
    ? `${LABEL_MAP[adjusted.color]} (lifted from ${LABEL_MAP[baseColor]} by depth) — ${coverage.selected}/${coverage.total} services`
    : baseLabel;

  const note =
    coverage.selected === 0
      ? `No services ticked yet. Ask the candidate which ${tech.name} services they've used in production and tick what they confirm.`
      : tech.checklistGuidance ??
        `Coverage: ${ratioPct}% of curated services. Depth and last-used context matter — verify production scope, not tutorial scope.`;

  return {
    color: adjusted.color,
    label,
    note,
    enterpriseNote: undefined,
    unknownVersion: false,
    depthAdjusted: adjusted.adjusted,
    coverage,
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
