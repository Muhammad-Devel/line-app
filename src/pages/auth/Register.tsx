import React, { useState } from "react";
import {  Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import AppIcon from "../../components/ui/AppIcon";
import api from "../../services/api";

interface RegisterProps {
  onSuccess: () => void;
}

export const Register: React.FC<RegisterProps> = ({onSuccess}) => {
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    // password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API ga yuborish
      const response = await api.post("/auth/register", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Ro'yxatdan o'tgach, to'g'ridan-to'g'ri biznes sozlamalariga (Onboarding) o'tamiz
       onSuccess();
      }
    } catch (error) {
      console.error("Ro'yxatdan o'tishda xatolik:", error);
      alert("Xatolik yuz berdi. Ma'lumotlarni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-md p-8 shadow-xl bg-zinc-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600">Line App</h1>
          <p className="text-slate-500 mt-2">
            Biznesingizni boshqarishni bugun boshlang
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            {/* <label className="block text-sm font-medium text-slate-700 mb-1">
              To'liq ismingiz
            </label> */}
            <input
              type="text"
              name="name"
              required
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-md  focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ismingiz va familiyangiz"
              onChange={handleChange}
            />
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon
                name="lucide:user"
                className="w-6 h-6 inline-block ml-2"
              />
            </span>
          </div>

          <div className="relative">
            {/* <label className="block text-sm font-medium text-slate-700 mb-1">
              Telefon raqam
            </label> */}
            <input
              type="tel"
              name="phone"
              required
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-md  focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="+998 90 123 45 67"
              onChange={handleChange}
            />
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon
                name="lucide:phone"
                className="w-6 h-6 inline-block ml-2"
              />
            </span>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parol</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div> */}

          <div>
            <p className="text-xs text-gray-400">
              Ro'yhatdan o'tish orqali siz{" "}
              <a href="#" className="text-blue-500 underline">
                Foydalanish shartlari
              </a>{" "}
              hamda{" "}
              <a href="#" className="text-blue-500 underline">
                Maxfiylik siyosati
              </a>
              ni qabul qilgan bo‘lasiz.
            </p>
          </div>

          <Button
            type="submit"
            variant="success"
            className="w-full py-2"
            isLoading={loading}
          >
            Hisob yaratish
          </Button>
        </form>
        <hr className="my-6 border-t" />

        <div className="">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600">
            <AppIcon
              name="file-icons:telegram"
              className="w-6 h-6 inline-block mr-2"
            />
            Telegram orqali kirish
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Kirish
          </Link>
        </div>
      </Card>
    </div>
  );
};
