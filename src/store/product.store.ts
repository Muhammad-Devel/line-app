// src/store/product.store.ts
import { create } from "zustand";
import { productService } from "../services/product.service";

interface ProductStore {
  products: any[];
  loading: boolean;

  fetchProducts: () => Promise<void>;
  addProduct: (data: any) => Promise<void>;
  updateProduct: (id: string, data: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    const res = await productService.getAll();
    set({ products: res, loading: false });
  },

  addProduct: async (data) => {
    const res = await productService.create(data);
    set((state) => ({
      products: [res.data, ...state.products],
    }));
  },

  updateProduct: async (id, data) => {
    const res = await productService.update(id, data);
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? res.data : p)),
    }));
  },

  deleteProduct: async (id) => {
    await productService.delete(id);
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
  },
}));
