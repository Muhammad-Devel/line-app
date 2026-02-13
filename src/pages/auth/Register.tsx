import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import AppIcon from "../../components/ui/AppIcon";
import api from "../../services/api";
import { useBusinessStore } from "../../store/business.store";

interface RegisterProps {
  onSuccess: (step: number) => void;
}

type BusinessType = "service" | "product";

export const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const setBusinessConfig = useBusinessStore((s) => s.setBusinessConfig);
  const [formData, setFormData] = useState({
    companyName: "",
    ownerFirstName: "",
    ownerLastName: "",
    phone: "",
    businessTypes: [] as BusinessType[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "companyName") {
      setBusinessConfig({ name: value });
    }
  };

  const toggleBusinessType = (type: BusinessType) => {
    setFormData((prev) => {
      const exists = prev.businessTypes.includes(type);
      return {
        ...prev,
        businessTypes: exists
          ? prev.businessTypes.filter((t) => t !== type)
          : [...prev.businessTypes, type],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.businessTypes.length === 0) {
      alert("Iltimos, kamida bitta bo'limni tanlang.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        onSuccess(2);
      }
    } catch (error) {
      console.error("Ro'yxatdan o'tishda xatolik:", error);
      alert("Xatolik yuz berdi. Ma'lumotlarni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Ro'yxatga olish</h1>
      <Card className="w-full max-w-md p-8 shadow-xl bg-zinc-50">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="companyName"
              required
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Kompaniya nomi"
              value={formData.companyName}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon name="lucide:building-2" className="w-6 h-6 inline-block ml-2" />
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              name="ownerFirstName"
              required
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Kompaniya egasi ismi"
              value={formData.ownerFirstName}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon name="lucide:user" className="w-6 h-6 inline-block ml-2" />
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              name="ownerLastName"
              required
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Kompaniya egasi familiyasi"
              value={formData.ownerLastName}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon name="lucide:user-round" className="w-6 h-6 inline-block ml-2" />
            </span>
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              required
              className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="+998 90 123 45 67"
              value={formData.phone}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon name="lucide:phone" className="w-6 h-6 inline-block ml-2" />
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Tovarlar bo'limi</p>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.businessTypes.includes("service")}
                  onChange={() => toggleBusinessType("service")}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm text-slate-700">Xizmat sotish</span>
              </label>
              <label className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.businessTypes.includes("product")}
                  onChange={() => toggleBusinessType("product")}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm text-slate-700">Tovar sotish</span>
              </label>
            </div>
          </div>

          <Button type="submit" variant="success" className="w-full py-2" isLoading={loading}>
            Hisob yaratish
          </Button>
        </form>
      </Card>
    </div>
  );
};
