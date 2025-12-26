// src/pages/dashboard/EarningsChart.tsx
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { statsService } from '../../../services/stats.service';

export default function EarningsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Joriy yil va oy uchun oylik statistikani olish
    const now = new Date();
    statsService.getMonthly(now.getFullYear(), now.getMonth() + 1)
      .then(res => setData(res.dailyBreakdown));
  }, []);

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip 
            labelFormatter={(label) => `Sana: ${new Date(label).toLocaleDateString()}`}
            formatter={(value: any) => [`${value.toLocaleString()} UZS`, 'Tushum']}
          />
          <Area 
            type="monotone" 
            dataKey="totalRevenue" 
            stroke="#4ade80" 
            fill="#4ade80" 
            fillOpacity={0.1} 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}