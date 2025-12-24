import axios from 'axios';
// import { useBusinessStore } from '../store/business.store';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.lineapp.uz/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// So'rov yuborishdan oldin tokenni qo'shish (Interceptor)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ASOSIY API FUNKSIYALARI
export const businessService = {
  // 1. Onboarding tugagach hamma sozlamalarni yuborish
  setupBusiness: async (data: {
    type: string;
    features: string[];
    name: string;
  }) => {
    const response = await api.post('/business/setup', data);
    return response.data;
  },

  // 2. Dashboard uchun ma'lumotlarni olish
  // Tizim biznes turiga qarab har xil ma'lumot qaytaradi
  getDashboardStats: async () => {
    const response = await api.get('/business/stats');
    return response.data;
  },

  // 3. Navbatlar (Xizmat ko'rsatish uchun)
  getQueues: async () => {
    const response = await api.get('/queues');
    return response.data;
  },

  // 4. Sotuvlar (Savdo uchun)
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  }
};

export default api;