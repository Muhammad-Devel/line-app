import api from './api';

export const productService = {
  // Barcha mahsulotlarni olish (Endpoint 12)
  getAll: () => api.get('/admin/products').then(res => res.data.products),
  
  // Yangi mahsulot yaratish (Endpoint 13)
  create: (data: any) => api.post('/admin/products', data),
  
  // Mahsulotni tahrirlash (Endpoint 14)
  update: (id: string, data: any) => api.put(`/admin/products/${id}`, data),
  
  // Mahsulotni o'chirish (Endpoint 15)
  delete: (id: string) => api.delete(`/admin/products/${id}`)
};