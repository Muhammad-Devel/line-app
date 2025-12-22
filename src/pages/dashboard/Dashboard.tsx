// src/pages/dashboard/Dashboard.tsx
import { StatCard } from "../../components/ui/StartCard";
import OrdersChart from "./OrdersChart";
import EarningsChart from "./EarninsChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Today's Orders" value="28" />
        <StatCard title="Earnings" value="1,450,000 UZS" />
        <StatCard title="Awaiting Queue" value="16" />
        <StatCard title="Pending Orders" value="7" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <OrdersChart />
        <EarningsChart />
      </div>
    </div>
  );
}
