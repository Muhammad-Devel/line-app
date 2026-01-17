import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import { CustomerLayout } from "../components/layout/CustomerLayout";
import { CustomerHome } from "../pages/client/Home";
import { CustomerStatus } from "../pages/client/Status";

import Dashboard from "../pages/admin/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import { QueuePage } from "../pages/queue/Queue";
import Login from "../pages/auth/Login";
import AddBussiness from "../pages/auth/AddBussiness";
import { Onboarding } from "../pages/auth/OnBoarding";
import { AdminProducts } from "../pages/admin/dashboard/Products";
import { RetailPOS } from "../pages/admin/retail/RetailPOS"; // Yangi: Sotuv oynasi
import { TelegramLogin } from "../pages/auth/TelegramLogin";
import { DefaultRegister } from "../pages/auth/DefaultRegister";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { ClientProfile } from "../pages/client/ClientProfile";

// const isAuthenticated = true;

export const router = createBrowserRouter([
  // --- AUTH YO'NALISHLARI ---
  { path: "/login", element: <Login /> },
  { path: "/register", element: <DefaultRegister /> },
  { path: "/telegram", element: <TelegramLogin /> },
  { path: "/add-business", element: <AddBussiness /> },
  { path: "/onboarding", element: <Onboarding /> },

  // --- ADMIN YO'NALISHI (Desktop/Boshqaruv) ---
  {
    path: "/",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },

      // 🛒 RETAIL VA ORDERS
      { path: "pos", element: <RetailPOS /> }, // Yangi: Retail Sotuv oynasi
      { path: "orders", element: <Orders /> }, // Buyurtmalar tarixi

      // 📦 MAHSULOTLAR VA XIZMATLAR
      { path: "products", element: <AdminProducts /> },

      // 👥 SERVICE (Navbatlar)
      { path: "queue", element: <QueuePage /> },
    ],
  },

  // --- CUSTOMER YO'NALISHI (Mobil/Mijoz) ---
  {
    path: "/c",
    element: (
      <ProtectedRoute roles={["client"]}>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: ":businessId", element: <CustomerHome /> }, // Menyu/Xizmatlar tanlash
      { path: "my-queue", element: <CustomerStatus /> }, // Mijoz navbat statusi
      { path: "profile", element: <ClientProfile /> }, // Mijoz profili
      { path: "cart", element: <div>Mijozning savati</div> }, // Yangi: Retail mijoz uchun
    ],
  },

  // --- LINE PRO & GO (Branding redirect) ---
  {
    path: "/line-pro",
    element: <Navigate to="/" />, // Admin panelga yo'naltirish
  },
  {
    path: "/line-go",
    element: <Navigate to="/c/default" />, // Mijoz ilovasiga yo'naltirish
  },

  // Fallback
  { path: "*", element: <Navigate to="/dashboard" /> },
]);
