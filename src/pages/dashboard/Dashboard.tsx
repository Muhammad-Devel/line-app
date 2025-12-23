// src/pages/dashboard/Dashboard.tsx
import { StatCard } from "../../components/ui/StartCard";
import OrdersChart from "./OrdersChart";
import EarningsChart from "./EarninsChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Today's Orders"
          value="28"
          className="bg-blue-500 text-white text-right"
          titleClassName="text-white"
          valueClassName="text-white"
          icon="lucide:notebook-pen"
        />
        <StatCard
          title="Earnings"
          value="1,450,000 UZS"
          className="bg-green-500 text-white text-right"
          titleClassName="text-white"
          valueClassName="text-white"
          icon="lucide:wallet"
        />
        <StatCard
          title="Awaiting Queue"
          value="16"
          className="bg-yellow-500 text-white text-right"
          titleClassName="text-white"
          valueClassName="text-white"
          icon="lucide:clock-3"
        />
        <StatCard
          title="Pending Orders"
          value="7"
          className="bg-red-500 text-white text-right"
          titleClassName="text-white"
          valueClassName="text-white"
          icon="lucide:package-check"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <OrdersChart />
        <EarningsChart />
      </div>
    </div>
  );
}
