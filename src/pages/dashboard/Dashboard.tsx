// src/pages/dashboard/Dashboard.tsx
import { StatCard } from "../../components/ui/StartCard";
import OrdersChart from "./OrdersChart";
import EarningsChart from "./EarninsChart";
// import type { BusinessType } from "../../types";

// const dummyBusinesses: BusinessType[] = [
//   { business_type: "SERVICE", business_name: "Salon" },
//   { business_type: "RETAIL", business_name: "Shop" },
//   { business_type: "HYBRID" },
// ];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Today's Orders"
          value="28"
          className="bg-blue-400 text-gray-100 text-right"
          titleClassName="text-gray-500 text-white"
          valueClassName="text-2xl font-bold text-white"
          icon="lucide:notebook-pen"
          iconClassName="absolute top-5 left-5"
        />
        <StatCard
          title="Earnings"
          value="1,450,000 UZS"
          className="bg-green-400 text-gray-100 text-right"
          titleClassName="text-gray-500 text-white"
          valueClassName="text-2xl font-bold text-white"
          icon="lucide:wallet"
          iconClassName="absolute top-5 left-5"
        />
        <StatCard
          title="Awaiting Queue"
          value="16"
          className="bg-yellow-400 text-gray-100 text-right"
          titleClassName="text-gray-500 text-white"
          valueClassName="text-2xl font-bold text-white"
          icon="lucide:clock-3"
          iconClassName="absolute top-5 left-5"
        />
        <StatCard
          title="Pending Orders"
          value="7"
          className="bg-red-400 text-gray-100 text-right"
          titleClassName="text-white"
          valueClassName="text-white"
          icon="lucide:package-check"
          iconClassName="absolute top-5 left-5"
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
