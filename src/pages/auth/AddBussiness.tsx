import { StatCard } from "../../components/ui/StartCard";

type Props = {};

function AddBussiness({}: Props) {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-zinc-50 space-y-8">
      <h1 className="text-3xl font-semibold">Sizning biznes yo'nalishingiz?</h1>
      <div className="flex gap-4">
        <StatCard
          title="Xizmat ko'rsatish"
          value="barber, avtousta, klinika, ..."
          className="w-64 bg-white shadow-lg p-4 hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="medical-icon:i-interpreter-services"
          iconClassName="grid place-items-center text-blue-500 mb-4"
        />

        <StatCard
          title="Savdo"
          value="Do'kon, kafe, butik, ..."
          className="w-64 bg-white shadow-lg p-4  hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="healthicons:market-stall"
          iconClassName="grid place-items-center text-blue-500 mb-4"
        />
        <StatCard
          title="Ikkalasi bittada"
          value="Xizmat va savdo"
          className="w-64 bg-white shadow-lg p-4 hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="mdi:store-cog"
          iconClassName="grid place-items-center text-blue-500 mb-4"
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
