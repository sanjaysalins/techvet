export type TierColor = 'green' | 'yellow' | 'red';
export type TierLabel = 'Excellent' | 'Good' | 'Review / Probe' | 'Concern';

export type VetMode = 'version' | 'checklist';

export interface VersionTier {
  min: string;
  label: TierLabel | string;
  color: TierColor;
  note?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  hint?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  vetMode?: VetMode;
  currentVersion?: string;
  versionTiers?: VersionTier[];
  services?: ServiceItem[];
  enterpriseStillUsed?: boolean;
  suggestedProbes: string[];
  guidanceForUnknownVersion?: string;
  checklistGuidance?: string;
}

export type Depth = 'unknown' | 'shallow' | 'working' | 'deep' | 'very-deep';

export interface AssessmentItem {
  techId: string;
  version: string;
  unknownVersion: boolean;
  depth: Depth;
  lastUsed: string;
  notes: string;
  selectedServices?: string[];
  /** True once the recruiter has interacted with the checklist at least once.
   *  Distinguishes "haven't asked yet" (untouched) from "asked and the answer is zero". */
  checklistTouched?: boolean;
  /** Checklist-mode mirror of `unknownVersion`: candidate can't recall which
   *  services they've used. Forces Yellow regardless of selectedServices. */
  checklistUnsure?: boolean;
}

export interface ResolvedTier {
  color: TierColor;
  label: string;
  note?: string;
  enterpriseNote?: string;
  unknownVersion: boolean;
  depthAdjusted: boolean;
  coverage?: { selected: number; total: number };
}

export interface AssessmentMeta {
  candidateName: string;
  role: string;
  notes: string;
  mandate: string;
  startedAt: string;
}
