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
  /** Catalog-supplied default for the scope axis when the recruiter hasn't
   *  picked one explicitly. Fix K (round-2 cross-cut): recruiters on phone
   *  calls don't reach the scope dropdown, so a category-aware default
   *  applies the right cap automatically. AI/ML and data-science libs
   *  default to `author` (used as a library, not operated as a service);
   *  most other techs leave this undefined (operator-implied current
   *  behavior). Explicit `item.scope` always overrides the default. */
  defaultScope?: Scope;
}

export type Depth = 'unknown' | 'shallow' | 'working' | 'deep' | 'very-deep';

/** Orthogonal to Depth. Describes *how* the candidate engages with the tech,
 *  not how deep they've gone. Closes the cluster of misreadings where a
 *  reviewer / architect / notebook-author scores like an operator:
 *  - operator  → runs it in prod / manages it (current implicit default)
 *  - author    → writes code that uses it (Spark in notebooks, not Spark in prod)
 *  - reviewer  → reviews PRs / policies / audits (Diego on Terraform)
 *  - architect → designed how it gets used (Aliyah on K8s topology) */
export type Scope = 'operator' | 'author' | 'reviewer' | 'architect';

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
  /** Scope of use — orthogonal to Depth. Undefined preserves pre-scope
   *  behavior (= operator-implied). See `Scope` type for semantics. */
  scope?: Scope;
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
  /** Scope cap fired — the verdict is lower than it would be at this depth
   *  alone (reviewer/architect ceiling at Yellow, or author depth-lift
   *  restricted to Red→Yellow only). Surfaces a small caveat in the UI so
   *  the recruiter sees *why* a deep-experience reviewer didn't land Green. */
  scopeCapped?: boolean;
  /** The recruiter never interacted with this tech on the call — the card
   *  exists only because a role template pre-loaded it, and was left at
   *  defaults (no version typed, no toggle flipped; or no checklist
   *  ticks + no checklistTouched/checklistUnsure). Excluded from buckets
   *  and the radar; rendered separately as "Not discussed" so the
   *  recruiter's silence isn't scored as candidate weakness.
   *  Distinct from `skipped` (notUsed = explicitly confirmed absent). */
  notDiscussed?: boolean;
}

/** Fix Q (round-3 cross-cut): channel the screening is happening on.
 *  Drives per-channel empty-field semantics on the Summary report —
 *  "blank version" means "ran out of time" on phone/video but "CV is
 *  silent" on async, and those need different framing for the hiring
 *  manager. Set once at the start of the session via the channel pill
 *  in the candidate header. Defaults to `phone` (primary use case). */
export type Channel = 'phone' | 'video' | 'async';

export interface AssessmentMeta {
  candidateName: string;
  role: string;
  notes: string;
  mandate: string;
  startedAt: string;
  channel: Channel;
}
