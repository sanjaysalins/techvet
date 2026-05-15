export type TierColor = 'green' | 'yellow' | 'red';
export type TierLabel = 'Excellent' | 'Good' | 'Review / Probe' | 'Concern';

export type VetMode = 'version' | 'checklist';

export interface VersionTier {
  min: string;
  label: TierLabel | string;
  color: TierColor;
  note?: string;
  /** Tier-level override of the root flag — fires the "still widely used in
   *  enterprise" reassurance only on this specific tier. Useful when only the
   *  Yellow-band version (e.g. Selenium 3, Cypress 10–11) is the legacy-but-valid
   *  one and the current versions don't deserve the reassurance note. */
  enterpriseStillUsed?: boolean;
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
  /** Third state in the version-knowledge tri-state, alongside the default
   *  (knows version) and `unknownVersion` (forgot). Set true when the
   *  candidate explicitly does NOT use this tech (Alex/Kotlin: iOS engineer
   *  who doesn't write Android; Mei/Databricks: Colab+SageMaker shop;
   *  Priya/TensorFlow: deliberate pure-PyTorch). The item is excluded from
   *  scoring buckets and the radar; the report renders it in a separate
   *  "Not in candidate's stack" section. */
  notUsed?: boolean;
}

export interface ResolvedTier {
  color: TierColor;
  label: string;
  note?: string;
  enterpriseNote?: string;
  unknownVersion: boolean;
  depthAdjusted: boolean;
  coverage?: { selected: number; total: number };
  /** When true, this tech is excluded from headline buckets and the
   *  category radar — Summary renders it in a separate "Not in candidate's
   *  stack" section. The `color` field on a skipped tier is a sentinel
   *  ('yellow') and should not be displayed via the normal tier badge. */
  skipped?: boolean;
}

export interface AssessmentMeta {
  candidateName: string;
  role: string;
  notes: string;
  mandate: string;
  startedAt: string;
}
