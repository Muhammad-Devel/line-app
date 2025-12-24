import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Queue from "../pages/queue/Queue";
import Login from "../pages/auth/Login";
import AddBussiness from "../pages/auth/AddBussiness";
import { Onboarding } from "../pages/auth/OnBoarding";

// Keyin auth qo‘shiladi
const isAuthenticated = true;

export const router = createBrowserRouter([
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

  // fallback
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
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
  }
]);
