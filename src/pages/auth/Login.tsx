

import axios from "axios";
import AppIcon from "../../components/ui/AppIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTelegramAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Telegram Web App obyektini olish
    const tg = (window as any).Telegram?.WebApp;

    if (tg && tg.initData) {
      // Agar foydalanuvchi Telegram ichida (Mini App) ochgan bo'lsa
      try {
        const response = await axios.post("/auth/telegram", {
          initData: tg.initData, // Backend'da hash'ni tekshirish uchun yuboramiz
        });

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/onboarding");
        }
      } catch (error) {
        console.error("Telegram login xatosi:", error);
      }
    } else {
      // 2. Agar foydalanuvchi oddiy brauzerda bo'lsa, botga yo'naltiramiz
      // Bu yerda botingizning linkini yozasiz
      window.location.href = "https://t.me/line_app_bot?start=start";
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-white">
      <div className="bg-zinc-50 p-8 rounded-3xl shadow-sm w-96 text-center border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-600">Line App</h2>
        </div>
        
        <h1 className="text-3xl font-bold mt-4">Xush kelibsiz!</h1>
        <p className="text-sm text-gray-400 mt-2">
          Tizimga kirish usulini tanlang
        </p>

        <div className="mt-10 space-y-4">
          {/* TELEGRAM TUGMASI */}
          <button 
            onClick={handleTelegramAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0088cc] text-white rounded-xl shadow-md hover:bg-[#0077b5] transition-all active:scale-95"
          >
            <AppIcon name="file-icons:telegram" className="w-6 h-6" />
            <span className="font-semibold text-sm">Telegram orqali kirish</span>
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-50 px-2 text-gray-400">Yoki</span></div>
          </div>

          <form className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="+998 __ ___ __ __"
                className="w-full bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <AppIcon name="lucide:phone" className="w-5 h-5" />
              </span>
            </div>

            <button className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 shadow-lg shadow-green-100 transition-all active:scale-95">
              Davom etish
            </button>
          </form>

          <p className="text-[10px] text-gray-400 mt-6 leading-relaxed">
            Tizimga kirish orqali siz <a href="#" className="text-blue-500 underline">Foydalanish shartlari</a> hamda <a href="#" className="text-blue-500 underline">Maxfiylik siyosati</a>ni qabul qilgan bo‘lasiz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;