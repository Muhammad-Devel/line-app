import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  auth: {
    token: localStorage.getItem('token')
  },
  autoConnect: false // Faqat login bo'lgandan keyin ulaymiz
});

// Socketni ishga tushirish funksiyasi
export const connectSocket = () => {
  if (!socket.connected) {
    socket.auth = { token: localStorage.getItem('token') };
    socket.connect();
  }
};