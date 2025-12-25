// src/pages/auth/Onboarding.tsx
import { useBusinessStore } from '../../store/business.store';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StartCard';
import { Register } from './Register';
import api from '../../services/api';

export const Onboarding = () => {
  const { step, config, setBusinessConfig, setStep } = useBusinessStore();

  const handleFinish = async () => {
    try {
      // 1. Backendda biznes profilini yaratish
      const response = await api.post('/business/setup', config);
      
      if (response.data.success || true ) {
        // 2. Muvaffaqiyatli bo'lsa dashboardga
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert("Xatolik yuz berdi, qaytadan urinib ko'ring");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Progress Bar (3 ta qadam) */}
      <div className="flex justify-between max-w-md mx-auto">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center flex-1 px-2">
            <div className={`h-2 w-full rounded-full transition-all duration-500 ${s <= step ? 'bg-green-600' : 'bg-gray-200'}`} />
            <span className="text-[10px] mt-1 uppercase font-bold text-gray-400">
              {s === 1 ? 'Hisob' : s === 2 ? 'Biznes' : s===3 ? 'Biznes Nomi': 'Tayyor'}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: REGISTER */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Register onSuccess={setStep} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-5">
          <h2 className="text-3xl font-bold">Biznesingiz nomini nima?</h2>
          <input 
            type="text" 
            className="w-full p-4 border rounded-2xl text-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masalan: Grand Barbershop"
            onChange={(e) => setBusinessConfig({ name: e.target.value })}
          />
          <button onClick={() => setStep(3)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold">Davom etish</button>
        </div>
      )}

      {/* STEP 4: BIZNES TURINI TANLASH */}
      {step === 3 && (
        <div className="mt-12 animate-in fade-in zoom-in duration-500 space-y-10">
          <h1 className="text-3xl font-semibold text-center">Sizning biznes yo'nalishingiz?</h1>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
             <StatCard
          title="Xizmat ko'rsatish"
          value="barber, avtousta, klinika, ..."
          className={`w-64 bg-white shadow-lg p-4 hover:scale-105 hover:bg-gray-100 transition-transform duration-300 ${config.type === "SERVICE" ? "border-4 border-green-500" : ""}`}
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="medical-icon:i-interpreter-services"
          iconClassName="grid place-items-center text-blue-500 mb-4"
          onClick={() => setBusinessConfig({ type: "SERVICE" })}
        />

        <StatCard
          title="Savdo"
          value="Do'kon, kafe, butik, ..."
          className={`w-64 bg-white shadow-lg p-4  hover:scale-105 hover:bg-gray-100 transition-transform duration-300 ${config.type === "RETAIL" ? "border-4 border-green-500" : ""}`}
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="healthicons:market-stall"
          iconClassName="grid place-items-center text-blue-500 mb-4"
            onClick={() => setBusinessConfig({ type: "RETAIL" })}   
        />
        <StatCard
          title="Ikkalasi bittada"
          value="Xizmat va savdo"
          className={`w-64 col-span-2 justify-self-center bg-white shadow-lg p-4 hover:scale-105 hover:bg-gray-100 transition-transform duration-300 ${config.type === "HYBRID" ? "border-4 border-green-500" : ""}`}
          titleClassName="text-2xl text-center"
          valueClassName="text-sm text-gray-400 text-center"
          icon="mdi:store-cog"
          iconClassName="grid place-items-center text-blue-500 mb-4"
            onClick={() => setBusinessConfig({ type: "HYBRID" })}
        />
          </div>
          <div className="flex justify-center pt-6">
            <Button 
              disabled={!config.type} 
              onClick={() => setStep(4)} 
              className="px-8 py-4 text-lg shadow-xl hover:shadow-blue-200"
            >
              Yakunlash
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS */}
      {step === 4 && (
        <div className="mt-12 text-center py-20 animate-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full text-5xl mb-6">
            ✓
          </div>
          <h1 className="text-4xl font-black mb-2">Muvaffaqiyatli!</h1>
          <p className="text-gray-500 mb-8 text-lg">Line App tizimiga xush kelibsiz.</p>
          <Button onClick={() => handleFinish} size="lg" className="px-12">
            Dashboardga o'tish
          </Button>
        </div>
      )}
    </div>
  );
};