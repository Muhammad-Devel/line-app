import { useState } from "react";
import { StatCard } from "../../components/ui/StartCard";
import { type BusinessType } from "../../types";


type Props = {};

function AddBussiness({}: Props) {
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-zinc-50 space-y-8">
      <h1 className="text-3xl font-semibold">Sizning biznes yo'nalishingiz?</h1>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Xizmat ko'rsatish"
          value="barber, avtousta, klinika, ..."
          className={`w-64 bg-white shadow-lg p-4 hover:scale-105 hover:bg-gray-100 transition-transform duration-300 ${selectedBusiness?.business_type === "SERVICE" ? "border-4 border-green-500" : ""}`}
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="medical-icon:i-interpreter-services"
          iconClassName="grid place-items-center text-blue-500 mb-4"
          onClick={()=>setSelectedBusiness({business_type: "SERVICE"})}
        />

        <StatCard
          title="Savdo"
          value="Do'kon, kafe, butik, ..."
          className={`w-64 bg-white shadow-lg p-4  hover:scale-105 hover:bg-gray-100 transition-transform duration-300 ${selectedBusiness?.business_type === "RETAIL" ? "border-4 border-green-500" : ""}`}
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="healthicons:market-stall"
          iconClassName="grid place-items-center text-blue-500 mb-4"
            onClick={()=>setSelectedBusiness({business_type: "RETAIL"})}
        />
        <StatCard
          title="Ikkalasi bittada"
          value="Xizmat va savdo"
          className={`w-64 col-span-2 justify-self-center bg-white shadow-lg p-4 hover:scale-105 hover:bg-gray-100 transition-transform duration-300 ${selectedBusiness?.business_type === "HYBRID" ? "border-4 border-green-500" : ""}`}
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="mdi:store-cog"
          iconClassName="grid place-items-center text-blue-500 mb-4"
            onClick={()=>setSelectedBusiness({business_type: "HYBRID"})}
        />
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Davom etish
        </button>
      </div>
    </div>
  );
}

export default AddBussiness;
