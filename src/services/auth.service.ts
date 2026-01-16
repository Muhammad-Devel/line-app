// src/services/auth.service.ts
import api from "./api";

/**
 * 1. Telefon raqamga SMS code so‘rash
 */
export const requestCode = (phone: string) => {
  return api.post("/auth/request-code", {
    phone,
  });
};

/**
 * 2. Code orqali ro‘yxatdan o‘tish
 */
export const register = (payload: {
  phone: string;
  code: string;
  name: string;
  password: string;
}) => {
  return api.post("/auth/register", payload);
};

export const login = (payload:{
  phone: string;
  password: string;
}) => {
  return api.post("/auth/login", payload)
}

/**
 * 3. Telegram auth (agar kerak bo‘lsa)
 */
export const telegramAuth = (payload: any) => {
  return api.post("/auth/telegram", payload);
};

/**
 * 4. Current user
 */
export const getMe = () => {
  return api.get("/auth/me");
};

export const authService = {
  requestCode,
  register,
  login,
  telegramAuth,
  getMe,
};
