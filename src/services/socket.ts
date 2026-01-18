import { io } from 'socket.io-client';
import { useAuthStore } from "../store/auth.store";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  auth: {
    token: useAuthStore.getState().token,
  },
  autoConnect: false // Faqat login bo'lgandan keyin ulaymiz
});

// Socketni ishga tushirish funksiyasi
export const connectSocket = () => {
  if (!socket.connected) {
    socket.auth = { token: useAuthStore.getState().token };
    socket.connect();
  }
};