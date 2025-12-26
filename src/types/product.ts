// src/types/product.ts
export interface RetailProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;      // Ombor qoldig'i
  sku?: string;       // Barcode / Artikul
  category: string;
  image?: string;
  description?: string;
}