import { create } from 'zustand';

interface BusinessState {
  step: number;
  config: {
    name: string;
    type: 'queue' | 'retail' | 'hybrid' | null;
    category: string;
    features: string[];
  };
  setStep: (step: number) => void;
  setBusinessConfig: (data: Partial<BusinessState['config']>) => void;
  reset: () => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  step: 1,
  config: {
    name: '',
    type: null,
    category: '',
    features: [],
  },
  setStep: (step) => set({ step }),
  setBusinessConfig: (data) => 
    set((state) => ({ config: { ...state.config, ...data } })),
  reset: () => set({ step: 1, config: { name: '', type: null, category: '', features: [] } }),
}));