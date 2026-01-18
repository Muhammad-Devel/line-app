// src/services/queue.service.ts
import api from "./api";

export const queueService = {
  // ➕ Navbatga yozilish
  joinQueue: (serviceId: string) =>
    api.post("/client/queue", { serviceId }),

  // 📄 Mijozning hozirgi navbati
  myQueue: () =>
    api.get("/client/queue/my"),

  // 📊 Xizmat bo‘yicha navbat
  getServiceQueue: (serviceId: string) =>
    api.get(`/queue/service/${serviceId}`),
};
