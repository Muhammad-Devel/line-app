// services/admin.service.ts

import api from "./api";


export const adminService = {
  orders: () => api.get("/admin/orders"),
  products: () => api.get("/admin/products"),
  createProduct: (data: any) => api.post("/admin/products", data),
  queue: () => api.get("/admin/queue"),
  callClient: (id: string) => api.post(`/admin/queue/${id}/call`),
};
