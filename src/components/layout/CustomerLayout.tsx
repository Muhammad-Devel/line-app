import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import AppIcon from "../ui/AppIcon";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";

export const CustomerLayout = () => {
  const location = useLocation();

  const [profile, setProfile] = useState({
    name: "Foydalanuvchi",
    phone: "Noma'lum",
  });

  const { name, phone } = useAuthStore.getState().user || {};
  if (name && phone && profile.name === "Foydalanuvchi") {
    setProfile({ name, phone });
  }

  const navItems = [
    { icon: <AppIcon name="lucide:home" />, label: "Asosiy", path: "/c/home" },
    {
      icon: <AppIcon name="lucide:clock" />,
      label: "Navbatim",
      path: "/c/my-queue",
    },
    {
      icon: <AppIcon name="lucide:shopping-bag" />,
      label: "Katalog",
      path: "/c/catalog",
    },
    {
      icon: <AppIcon name="lucide:user" />,
      label: "Profil",
      path: "/c/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl">
      {/* 📱 TOP HEADER */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b flex justify-between items-center">
        <h1 className="font-bold text-lg text-blue-600">Line App</h1>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
          {/* Avatar */}

          {profile?.name.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* 🎯 MAIN CONTENT AREA */}
      <main className="flex-1 p-4 pb-24">
        <Outlet />
      </main>

      {/* 🔘 BOTTOM NAVIGATION (Mobile Style) */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 transition-all ${
                isActive ? "text-blue-600 scale-110" : "text-slate-400"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
