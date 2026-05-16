import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AssessmentItem, AssessmentMeta, Depth } from '../types';

interface AssessmentState {
  meta: AssessmentMeta;
  items: AssessmentItem[];
  focusedTechId: string | null;

  setMeta: (patch: Partial<AssessmentMeta>) => void;
  addTech: (techId: string) => void;
  removeTech: (techId: string) => void;
  updateItem: (techId: string, patch: Partial<AssessmentItem>) => void;
  setFocused: (techId: string | null) => void;
  reset: () => void;
  loadDraft: () => boolean;
  saveDraft: () => void;
  clearDraft: () => void;
}

const emptyMeta: AssessmentMeta = {
  candidateName: '',
  role: '',
  notes: '',
  mandate: '',
  startedAt: '',
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

      addTech: techId =>
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
            scope: undefined,
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
    }
  )
);
