import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) => {
        const current = get().ids;
        if (current.includes(id)) {
          set({ ids: current.filter((i) => i !== id) });
        } else {
          set({ ids: [...current, id] });
        }
      },

      isWishlisted: (id) => get().ids.includes(id),

      clear: () => set({ ids: [] }),
    }),
    { name: 'ibex-wishlist' }
  )
);
