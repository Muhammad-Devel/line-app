// src/store/cart.store.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  note?: string; // Mijozning maxsus xohishi (masalan: "Happy Birthday Ali" deb yozilsin)
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existing = items.find(i => i.id === product._id);
    if (existing) {
      set({ items: items.map(i => i.id === product._id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...items, { id: product._id, name: product.name, price: product.price, quantity: 1 }] });
    }
  },
  removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
}));