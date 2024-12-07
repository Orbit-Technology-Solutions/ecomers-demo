import { create } from 'zustand';
import type { CheckoutData } from '@/types';

interface CheckoutStore {
  step: number;
  data: CheckoutData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<CheckoutData>) => void;
  reset: () => void;
}

const defaultData: CheckoutData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'Ethiopia',
  city: '',
  address: '',
  apartment: '',
  postalCode: '',
  shippingMethod: 'standard',
  paymentMethod: 'chapa',
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  step: 1,
  data: defaultData,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: 1, data: defaultData }),
}));
