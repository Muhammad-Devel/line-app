import api from './api';

export const adminQueueService = {
  // Navbatlar ro'yxatini olish (Endpoint 16)
  getQueues: async (status?: string) => {
    const response = await api.get('/admin/queue', { params: { status } });
    return response.data.queues;
  },

  // Mijozni chaqirish (Endpoint 18)
  callClient: async (id: string) => {
    const response = await api.post(`/admin/queue/${id}/call`);
    return response.data.queue;
  },

  // Statusni yangilash (Endpoint 19)
  updateStatus: async (id: string, status: 'completed' | 'skipped') => {
    const response = await api.put(`/admin/queue/${id}/status`, { status });
    return response.data.queue;
  }
};