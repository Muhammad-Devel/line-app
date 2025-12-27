import { Card } from '../../../components/ui/Card';
import { DashboardSummary } from './DashboardSummary';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* 1. Tepadagi raqamlar */}
      <DashboardSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Katta Grafik (OrdersChart) */}
        <div className="lg:col-span-2">
           <Card className="p-8 border-none shadow-sm bg-white rounded-[32px] h-full">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">Buyurtmalar oqimi</h3>
                    <p className="text-xs text-slate-400">Oxirgi 7 kundagi ko'rsatkichlar</p>
                 </div>
                 {/* Filter tugmalari bo'lishi mumkin */}
              </div>
              <div className="h-[300px]">
                 {/* Bu yerda OrdersChart komponenti bo'ladi */}
              </div>
           </Card>
        </div>

        {/* 3. Eng ko'p sotilayotganlar (Top Services) */}
        <div className="lg:col-span-1">
           <Card className="p-8 border-none shadow-sm bg-white rounded-[32px] h-full">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Top Xizmatlar</h3>
              <div className="space-y-6">
                 {/* Dinamik ro'yxat */}
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-slate-400">1</div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-slate-800">Soch olish</p>
                       <p className="text-[10px] text-slate-400">128 ta buyurtma</p>
                    </div>
                    <p className="text-sm font-black text-blue-600">45%</p>
                 </div>
                 {/* Boshqa qatorlar... */}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}


// // src/pages/dashboard/Dashboard.tsx
// import { useEffect, useState } from "react";
// import { StatCard } from "../../../components/ui/StartCard";
// import OrdersChart from "./OrdersChart";
// import EarningsChart from "./EarninsChart";
// import { statsService } from "../../../services/stats.service"; // Servisni chaqiramiz

// export default function Dashboard() {
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadDashboardStats() {
//       try {
//         setLoading(true);
//         // Endpoint 20: Bugungi statistikani olish
//         const data = await statsService.getDaily();
//         setStats(data);
//       } catch (error) {
//         console.error("Statistika yuklanmadi:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadDashboardStats();
//   }, []);

//   if (loading) return <div className="p-10 text-center text-slate-400">Yuklanmoqda...</div>;

//   return (
//     <div className="space-y-6">
//       {/* Stat cards */}
//       <div className="grid grid-cols-4 gap-4">
//         <StatCard
//           title="Bugungi Buyurtmalar"
//           value={stats?.totalOrders || "0"}
//           className="bg-blue-400 text-gray-100 text-right h-32"
//           titleClassName="text-white opacity-90"
//           valueClassName="text-3xl font-black text-white"
//           icon="lucide:notebook-pen"
//           iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
//         />
//         <StatCard
//           title="Jami Tushum"
//           value={`${stats?.totalRevenue?.toLocaleString() || "0"} UZS`}
//           className="bg-green-400 text-gray-100 text-right h-32"
//           titleClassName="text-white opacity-90"
//           valueClassName="text-2xl font-black text-white"
//           icon="lucide:wallet"
//           iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
//         />
//         <StatCard
//           title="Kutilayotgan Navbat"
//           value={stats?.totalQueueEntries || "0"}
//           className="bg-yellow-400 text-gray-100 text-right h-32"
//           titleClassName="text-white opacity-90"
//           valueClassName="text-3xl font-black text-white"
//           icon="lucide:clock-3"
//           iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
//         />
//         <StatCard
//           title="O'rtacha kutish"
//           value={`${stats?.averageWaitTime || "0"} daq`}
//           className="bg-red-400 text-gray-100 text-right h-32"
//           titleClassName="text-white opacity-90"
//           valueClassName="text-3xl font-black text-white"
//           icon="lucide:hourglass"
//           iconClassName="absolute top-5 left-5 opacity-40 w-10 h-10"
//         />
//       </div>

//       {/* Charts - Endpoint 21 asosida ishlaydi */}
//       <div className="grid grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-[32px] shadow-sm">
//           <h3 className="text-slate-800 font-bold mb-4">Buyurtmalar grafigi</h3>
//           <OrdersChart />
//         </div>
//         <div className="bg-white p-6 rounded-[32px] shadow-sm">
//           <h3 className="text-slate-800 font-bold mb-4">Tushum dinamikasi</h3>
//           <EarningsChart />
//         </div>
//       </div>
//     </div>
//   );
// }