export type TierColor = 'green' | 'yellow' | 'red';
export type TierLabel = 'Excellent' | 'Good' | 'Review / Probe' | 'Concern';

export interface VersionTier {
  min: string;
  label: TierLabel | string;
  color: TierColor;
  note?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  currentVersion: string;
  versionTiers: VersionTier[];
  enterpriseStillUsed: boolean;
  suggestedProbes: string[];
  guidanceForUnknownVersion: string;
}

export type Depth = 'unknown' | 'shallow' | 'working' | 'deep' | 'very-deep';

export interface AssessmentItem {
  techId: string;
  version: string;
  unknownVersion: boolean;
  depth: Depth;
  lastUsed: string;
  notes: string;
}

export interface ResolvedTier {
  color: TierColor;
  label: string;
  note?: string;
  enterpriseNote?: string;
  unknownVersion: boolean;
  depthAdjusted: boolean;
}

export interface AssessmentMeta {
  candidateName: string;
  role: string;
  notes: string;
  startedAt: string;
}
