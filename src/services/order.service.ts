// services/order.service.ts

import api from "./api";

export const orderService = {
  create: (items: any[]) => api.post("/client/orders", { items }),
  myOrders: () => api.get("/client/orders"),
};
