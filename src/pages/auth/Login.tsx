import AppIcon from "../../components/ui/AppIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { roleRedirect } from "../../utils/roleRedirect";
// import { TelegramAuth } from "./TelegramLogin"; // Bu brauzer uchun widget

function Login() {
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  
  
  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state);

  // Muvaffaqiyatli logindan so'ng
  const handleLoginSuccess = (res:any) => {
    authStore.setAuth(res.data.token, res.data.user);
    navigate(roleRedirect(res.data.user.role), { replace: true });
  }

  // Oddiy forma orqali kirish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(formData);
      handleLoginSuccess(res);
    } catch (err:any) {
      alert(
        "Telefon yoki parol noto'g'ri" + " " + err.response?.data?.error || ""
      );
      console.log("Login xatosi:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Telegram tugmasi bosilganda (Brauzerda bo'lsa botga, Mini Appda bo'lsa tg ichiga)
  const handleTelegramButtonClick = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData && tg.initData !== "") {
      // Allaqachon Mini App ichida, useEffect buni hal qiladi yoki qayta so'rov yuborish mumkin
      alert("Siz allaqachon Telegram Mini App ichidasiz");
    } else {
      // Oddiy brauzerda bo'lsa botga yuboramiz
      window.location.href = "https://t.me/line_app_bot?start=start";
    }
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
          {/* 3-USUL: ODDIY LOGIN FORMA */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="+998 __ ___ __ __"
                className="w-full bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={handleChange}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <AppIcon name="lucide:phone" className="w-5 h-5" />
              </span>
            </div>

            <div className="relative">
              <input
                type={eye ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Parolingiz"
                className="w-full bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={handleChange}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <button type="button" onClick={() => setEye(!eye)}>
                  <AppIcon
                    name={eye ? "lucide:eye" : "lucide:lock"}
                    className="w-5 h-5"
                  />
                </button>
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all active:scale-95"
            >
              {loading ? "Kutilmoqda..." : "Davom etish"}
            </button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-50 px-2 text-gray-400">Yoki</span>
            </div>
          </div>

          {/* 1-USUL: TELEGRAM MINI APP TUGMASI (Yoki Botga yo'naltirish) */}
          <button
            onClick={handleTelegramButtonClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0088cc] text-white rounded-xl shadow-md hover:bg-[#0077b5] transition-all active:scale-95"
          >
            <AppIcon name="file-icons:telegram" className="w-6 h-6" />
            <span className="font-semibold text-sm">
              {loading ? "Yuklanmoqda..." : "Telegram App orqali"}
            </span>
          </button>

          {/* 2-USUL: TELEGRAM WIDGET (Brauzer uchun tugma)
          <div className="flex justify-center">
            <TelegramAuth />
          </div> */}

          <p className="text-[10px] text-gray-400 mt-6 leading-relaxed">
            Tizimga kirish orqali siz{" "}
            <a href="#" className="text-blue-500 underline">
              Foydalanish shartlari
            </a>
            ni qabul qilasiz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
