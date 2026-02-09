import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import { CustomerLayout } from "../components/layout/CustomerLayout";
import { CustomerHome } from "../pages/client/Home";
import { CustomerCatalog } from "../pages/client/Home2";
import { CustomerStatus } from "../pages/client/Status";

import Dashboard from "../pages/admin/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import { QueuePage } from "../pages/queue/Queue";
import Login from "../pages/auth/Login";
import AddBussiness from "../pages/auth/AddBussiness";
import { Onboarding } from "../pages/auth/OnBoarding";
import { AdminProducts } from "../pages/admin/dashboard/Products";
import { RetailPOS } from "../pages/admin/retail/RetailPOS";
import { TelegramLogin } from "../pages/auth/TelegramLogin";
import { DefaultRegister } from "../pages/auth/DefaultRegister";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { ClientProfile } from "../pages/client/ClientProfile";
import { Banner } from "../pages/admin/modules/Banner";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <DefaultRegister /> },
  { path: "/telegram", element: <TelegramLogin /> },
  { path: "/add-business", element: <AddBussiness /> },
  { path: "/onboarding", element: <Onboarding /> },

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
      { path: "pos", element: <RetailPOS /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <AdminProducts /> },
      { path: "queue", element: <QueuePage /> },
      { path: "banner", element: <Banner /> },
    ],
  },

  {
    path: "/c",
    element: (
      <ProtectedRoute roles={["client"]}>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: "home", element: <CustomerHome /> },
      { path: "catalog", element: <CustomerCatalog /> },
      { path: ":businessId", element: <CustomerHome /> },
      { path: "my-queue", element: <CustomerStatus /> },
      { path: "profile", element: <ClientProfile /> },
      { path: "cart", element: <div>Mijozning savati</div> },
    ],
  },

  { path: "/line-pro", element: <Navigate to="/" /> },
  { path: "/line-go", element: <Navigate to="/c/default" /> },

  { path: "*", element: <Navigate to="/dashboard" /> },
]);
