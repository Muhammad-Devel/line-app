import api from "./api";

export const queueService = {
  joinQueue: (serviceId: string, orderId?: string) =>
    api.post("/client/queue", { serviceId, orderId }),

  myQueue: () => api.get("/client/queue/my"),

  getServiceQueue: (serviceId: string) => api.get(`/queue/service/${serviceId}`),
};
