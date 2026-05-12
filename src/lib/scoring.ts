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

function findTier(tech: Technology, version: string) {
  const sorted = [...tech.versionTiers].sort((a, b) =>
    compareVersions(b.min, a.min)
  );
  for (const tier of sorted) {
    if (compareVersions(version, tier.min) >= 0) return tier;
  }
  return sorted[sorted.length - 1];
}

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

export function resolveTier(
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

  const labelMap: Record<TierColor, string> = {
    green: 'Good',
    yellow: 'Review / Probe',
    red: 'Concern',
  };

  let label = tier.label;
  if (adjusted.adjusted) {
    label = `${labelMap[adjusted.color]} (depth-adjusted from ${tier.label})`;
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
