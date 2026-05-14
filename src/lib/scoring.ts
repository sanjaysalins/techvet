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
    return {
      color: adjusted.color,
      label: adjusted.adjusted ? 'Good (depth-adjusted)' : 'Review / Probe',
      note: tech.guidanceForUnknownVersion,
      enterpriseNote: tech.enterpriseStillUsed
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
    label = `${LABEL_MAP[adjusted.color]} (depth-adjusted from ${tier.label})`;
  }

  return {
    color: adjusted.color,
    label,
    note: tier.note,
    enterpriseNote:
      tier.color === 'yellow' && tech.enterpriseStillUsed
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

  let baseColor: TierColor;
  if (ratio < 0.25) baseColor = 'red';
  else if (ratio < 0.66) baseColor = 'yellow';
  else baseColor = 'green';

  const adjusted = adjustForDepth(baseColor, item.depth);
  const coverage = { selected: selected.length, total: services.length };
  const ratioPct = Math.round(ratio * 100);

  const baseLabel = `${LABEL_MAP[baseColor]} — ${coverage.selected}/${coverage.total} services`;
  const label = adjusted.adjusted
    ? `${LABEL_MAP[adjusted.color]} (depth-adjusted from ${LABEL_MAP[baseColor]}) — ${coverage.selected}/${coverage.total} services`
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
