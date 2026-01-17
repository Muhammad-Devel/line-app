import api from "./api";

export const clientQueueService = {
  // Navbatdagi mijozni olish (Endpoint 22)
  getNextClient: async (businessId: string) => {
    const response = await api.post(`/client/queue/next`, { params: { businessId } });
    return response.data.queue;
  },
    // Mijozning navbat holatini olish (Endpoint 23)
    getQueueStatus: async (businessId: string) => {
        const response = await api.get(`/client/queue/status`, { params: { businessId } });
        return response.data.queue;
    },
    // Navbatga yangi mijoz qo'shish (Endpoint 24)
    addClientToQueue: async (businessId: string, clientInfo: any) => {
        const response = await api.post(`/client/queue`, { businessId, ...clientInfo });
        return response.data;
    }
};
