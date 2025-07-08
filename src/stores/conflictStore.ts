import { create } from 'zustand';

interface ConflictState {
  step: number;
  title: string;
  description: string;
  inviteeEmail: string;
  nextStep: () => void;
  prevStep: () => void;
  setDetails: (title: string, description: string) => void;
  setInvitee: (email: string) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  title: '',
  description: '',
  inviteeEmail: '',
};

export const useConflictStore = create<ConflictState>((set) => ({
  ...initialState,
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  setDetails: (title, description) => set({ title, description }),
  setInvitee: (inviteeEmail) => set({ inviteeEmail }),
  reset: () => set(initialState),
}));
