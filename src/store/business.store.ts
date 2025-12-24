// src/store/business.store.ts
import { create } from 'zustand';

export type BusinessType = 'SERVICE' | 'RETAIL' | 'HYBRID';

interface BusinessState {
  step: number;
  config: {
    type: BusinessType | null;
    features: string[];
    name: string;
  };
  nextStep: () => void;
  setBusinessConfig: (data: Partial<BusinessState['config']>) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  step: 1,
  config: { type: null, features: [], name: '' },
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  // setStep: (step) => set(() => ({ step })),
  setBusinessConfig: (data) => set((state) => ({ config: { ...state.config, ...data } })),
}));