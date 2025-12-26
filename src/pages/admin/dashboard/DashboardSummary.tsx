// src/pages/admin/dashboard/Dashboard.tsx (Yoki DashboardSummary.tsx)
import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import AppIcon from '../../../components/ui/AppIcon';
import { statsService } from '../../../services/stats.service';

export const DashboardSummary = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Bugungi statistikani yuklash
    statsService.getDaily().then(setStats);
  }, []);

  const cards = [
    {
      title: "Bugungi tushum",
      value: `${stats?.totalRevenue?.toLocaleString() || 0} UZS`,
      change: "+12.5%", // Bu kelajakda Endpoint 21 bilan solishtirib chiqiladi
      icon: "lucide:banknote",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Mijozlar",
      value: stats?.totalOrders || 0,
      change: "+5",
      icon: "lucide:users",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Navbatda",
      value: stats?.totalQueueEntries || 0,
      change: "Faol",
      icon: "lucide:timer",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      title: "O'rtacha kutish",
      value: `${stats?.averageWaitTime || 0} daq`,
      change: "-2 daq",
      icon: "lucide:hourglass",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <Card key={idx} className="p-6 border-none shadow-sm bg-white rounded-[32px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
              <AppIcon name={card.icon} className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${card.bg} ${card.color}`}>
              {card.change}
            </span>
          </div>
          
          <div className="mt-5">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{card.title}</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{card.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};