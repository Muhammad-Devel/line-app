// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import { StatCard } from "../../../components/ui/StartCard";
import OrdersChart from "./OrdersChart";
import EarningsChart from "./EarninsChart";
import { statsService } from "../../../services/stats.service"; // Servisni chaqiramiz

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        setLoading(true);
        // Endpoint 20: Bugungi statistikani olish
        const data = await statsService.getDaily();
        setStats(data);
      } catch (error) {
        console.error("Statistika yuklanmadi:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardStats();
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-400">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Bugungi Buyurtmalar"
          value={stats?.totalOrders || "0"}
          className="bg-blue-400 text-gray-100 text-right h-32"
          titleClassName="text-white opacity-90"
          valueClassName="text-3xl font-black text-white"
          icon="lucide:notebook-pen"
          iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
        />
        <StatCard
          title="Jami Tushum"
          value={`${stats?.totalRevenue?.toLocaleString() || "0"} UZS`}
          className="bg-green-400 text-gray-100 text-right h-32"
          titleClassName="text-white opacity-90"
          valueClassName="text-2xl font-black text-white"
          icon="lucide:wallet"
          iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
        />
        <StatCard
          title="Kutilayotgan Navbat"
          value={stats?.totalQueueEntries || "0"}
          className="bg-yellow-400 text-gray-100 text-right h-32"
          titleClassName="text-white opacity-90"
          valueClassName="text-3xl font-black text-white"
          icon="lucide:clock-3"
          iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
        />
        <StatCard
          title="O'rtacha kutish"
          value={`${stats?.averageWaitTime || "0"} daq`}
          className="bg-red-400 text-gray-100 text-right h-32"
          titleClassName="text-white opacity-90"
          valueClassName="text-3xl font-black text-white"
          icon="lucide:hourglass"
          iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
        />
      </div>

      {/* Charts - Endpoint 21 asosida ishlaydi */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4">Buyurtmalar grafigi</h3>
          <OrdersChart />
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4">Tushum dinamikasi</h3>
          <EarningsChart />
        </div>
      </div>
    </div>
  );
}