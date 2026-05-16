import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AssessmentItem, AssessmentMeta, Depth, NamedOnlyEntry, Scope } from '../types';

interface AssessmentState {
  meta: AssessmentMeta;
  items: AssessmentItem[];
  focusedTechId: string | null;

  setMeta: (patch: Partial<AssessmentMeta>) => void;
  /** Fix K2: optional `scope` lets template-pick set a per-tech scope
   *  hint at item-creation time (e.g. SA template → architect on
   *  Terraform). When omitted, scoring falls back to catalog
   *  `defaultScope` and then operator-implied — pre-K2 behavior. */
  addTech: (techId: string, scope?: Scope) => void;
  removeTech: (techId: string) => void;
  updateItem: (techId: string, patch: Partial<AssessmentItem>) => void;
  /** Fix C: record a tech the candidate named that isn't in the catalog.
   *  Trims, rejects empty / whitespace-only, dedupes case-insensitively,
   *  enforces an 80-char cap. Free-text only — no scoring, no PDF
   *  verdict, just a "probe target" list for the technical interviewer. */
  addNamedOnly: (name: string) => void;
  /** Bug 4 (round-4 Wendy): patch an existing named-only entry's depth
   *  or lastUsed via the post-call Summary editor. Match is by exact
   *  name (case-sensitive — the user just clicked the existing row). */
  updateNamedOnly: (name: string, patch: Partial<Omit<NamedOnlyEntry, 'name'>>) => void;
  removeNamedOnly: (name: string) => void;
  setFocused: (techId: string | null) => void;
  reset: () => void;
  loadDraft: () => boolean;
  saveDraft: () => void;
  clearDraft: () => void;
}

/** Max length for a single named-only entry. Prevents the field from
 *  becoming a notes dumping ground; long descriptions belong in the
 *  per-tech Notes field or the candidate-context block (Fix M). */
const NAMED_ONLY_MAX_LEN = 80;

const emptyMeta: AssessmentMeta = {
  candidateName: '',
  role: '',
  notes: '',
  mandate: '',
  startedAt: '',
  channel: 'phone',
  namedNotInCatalog: [],
  seniority: 'unspecified',
  yearsInIndustry: '',
  pathType: 'unspecified',
  candidateContext: '',
  templateId: undefined,
};

const DRAFT_KEY = 'techvet-draft';

export const useAssessment = create<AssessmentState>()(
  persist(
    (set, get) => ({
      meta: emptyMeta,
      items: [],
      focusedTechId: null,

      setMeta: patch =>
        set(state => ({ meta: { ...state.meta, ...patch } })),

      addTech: (techId, scope) =>
        set(state => {
          if (state.items.some(i => i.techId === techId)) return state;
          const newItem: AssessmentItem = {
            techId,
            version: '',
            unknownVersion: false,
            depth: 'working' as Depth,
            lastUsed: '',
            notes: '',
            selectedServices: [],
            checklistTouched: false,
            checklistUnsure: false,
            notUsed: false,
            scope,
          };
          return {
            items: [...state.items, newItem],
            focusedTechId: techId,
          };
        }),

      removeTech: techId =>
        set(state => ({
          items: state.items.filter(i => i.techId !== techId),
          focusedTechId:
            state.focusedTechId === techId ? null : state.focusedTechId,
        })),

      updateItem: (techId, patch) =>
        set(state => ({
          items: state.items.map(i =>
            i.techId === techId ? { ...i, ...patch } : i
          ),
        })),

      addNamedOnly: name =>
        set(state => {
          const trimmed = name.trim().slice(0, NAMED_ONLY_MAX_LEN);
          if (!trimmed) return state;
          const lower = trimmed.toLowerCase();
          const existing = state.meta.namedNotInCatalog ?? [];
          if (existing.some(e => e.name.toLowerCase() === lower)) return state;
          return {
            meta: {
              ...state.meta,
              namedNotInCatalog: [...existing, { name: trimmed }],
            },
          };
        }),

      updateNamedOnly: (name, patch) =>
        set(state => ({
          meta: {
            ...state.meta,
            namedNotInCatalog: (state.meta.namedNotInCatalog ?? []).map(e =>
              e.name === name ? { ...e, ...patch } : e
            ),
          },
        })),

      removeNamedOnly: name =>
        set(state => ({
          meta: {
            ...state.meta,
            namedNotInCatalog: (state.meta.namedNotInCatalog ?? []).filter(
              e => e.name !== name
            ),
          },
        })),

      setFocused: techId => set({ focusedTechId: techId }),

      reset: () =>
        set({ meta: emptyMeta, items: [], focusedTechId: null }),

      loadDraft: () => {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return false;
        try {
          const data = JSON.parse(raw);
          set({
            meta: { ...emptyMeta, ...(data.meta ?? {}) },
            items: data.items ?? [],
            focusedTechId: null,
          });
          return true;
        } catch {
          return false;
        }
      },

      saveDraft: () => {
        const { meta, items } = get();
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ meta, items }));
      },

      clearDraft: () => localStorage.removeItem(DRAFT_KEY),
    }),
    {
      name: 'techvet-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({ meta: state.meta, items: state.items }),
      // Fix Q: old sessions persisted before the channel field existed
      // would hydrate with meta.channel === undefined; spread emptyMeta
      // over the rehydrated meta to backfill it (and any future fields
      // added to the meta shape).
      //
      // Bug 4 (round-4 Wendy): namedNotInCatalog evolved from string[]
      // to NamedOnlyEntry[]; coerce legacy bare-string entries to the
      // object form on rehydrate so old sessions don't blow up readers
      // expecting `.name`.
      onRehydrateStorage: () => state => {
        if (!state) return;
        state.meta = { ...emptyMeta, ...state.meta };
        const named = state.meta.namedNotInCatalog as unknown[];
        if (Array.isArray(named) && named.some(e => typeof e === 'string')) {
          state.meta.namedNotInCatalog = named.map(e =>
            typeof e === 'string' ? { name: e } : (e as NamedOnlyEntry)
          );
        }
      },
    }
  )
);
