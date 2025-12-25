import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import { CustomerLayout } from "../components/layout/CustomerLayout";
import { CustomerHome } from "../pages/client/Home";
import { CustomerStatus } from "../pages/client/Status";

import Dashboard from "../pages/admin/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Queue from "../pages/queue/Queue";
import Login from "../pages/auth/Login";
import AddBussiness from "../pages/auth/AddBussiness";
import { Onboarding } from "../pages/auth/OnBoarding";

// Keyin auth qo‘shiladi
const isAuthenticated = true;

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/add-business",
    element: <AddBussiness />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  // Keyinchalik app ning bisnes egasi uchun routelari qo'shiladi
  {
    path: "/line-pro",
    element: <Navigate to="/login" />,
    children: [],
  },

  // Keyinchalik app ning mijozlari uchun routelari qo'shiladi
  {
    path: "/line-go",
    element: <Navigate to="/login" />,
    children: [],
  },
  // 2. ADMIN Yo'nalishi
  {
    path: "/",
    element: isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "queue",
        element: <Queue />,
      },
    ],
  },

  // 3. CUSTOMER Yo'nalishi (Mobil ko'rinish uchun Layout)
  {
    path: "/c", // qisqa bo'lishi uchun (masalan: lineapp.uz/c/biznes-id)
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      { path: ":businessId", element: <CustomerHome /> },
      { path: "my-queue", element: <CustomerStatus /> },
    ],
  },

  // // 4. Default yo'nalish
  // { path: '*', element: <Navigate to="/login" replace /> },

  // fallback
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
]);
