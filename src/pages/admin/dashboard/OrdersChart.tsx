// src/pages/dashboard/OrdersChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ordersData } from "./data";

export default function OrdersChart() {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-semibold mb-4">Orders Overview</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={ordersData}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Bar dataKey="orders" radius={[6, 6, 0, 0]} fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
