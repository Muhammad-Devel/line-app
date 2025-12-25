// src/pages/dashboard/EarningsChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { earningsData } from "./data";

export default function EarningsChart() {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-semibold mb-4">Earnings Overview</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={earningsData}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#22C55E"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
