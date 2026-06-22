import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Color } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color: Color, size: number) => void;
  removeItem: (productId: string, colorName: string, size: number) => void;
  updateQuantity: (productId: string, colorName: string, size: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color, size) => {
        const existing = get().items.find(
          (i) =>
            i.product.id === product.id &&
            i.selectedColor.name === color.name &&
            i.selectedSize === size
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === product.id &&
              i.selectedColor.name === color.name &&
              i.selectedSize === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              { product, selectedColor: color, selectedSize: size, quantity: 1 },
            ],
          }));
        }
      },

      removeItem: (productId, colorName, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                i.selectedColor.name === colorName &&
                i.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, colorName, size, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, colorName, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId &&
            i.selectedColor.name === colorName &&
            i.selectedSize === size
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'ibex-cart' }
  )
);
