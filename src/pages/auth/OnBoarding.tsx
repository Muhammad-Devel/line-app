// src/pages/auth/Onboarding.tsx
import { useBusinessStore } from '../../store/business.store';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StartCard';
import { useNavigate } from 'react-router-dom';
import { Register } from './Register';

export const Onboarding = () => {
  const { step, config, setBusinessConfig, nextStep } = useBusinessStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Progress Bar (3 ta qadam) */}
      <div className="flex justify-between max-w-md mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center flex-1 px-2">
            <div className={`h-2 w-full rounded-full transition-all duration-500 ${s <= step ? 'bg-green-600' : 'bg-gray-200'}`} />
            <span className="text-[10px] mt-1 uppercase font-bold text-gray-400">
              {s === 1 ? 'Hisob' : s === 2 ? 'Biznes' : 'Tayyor'}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: REGISTER */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Register onSuccess={nextStep} />
        </div>
      )}

      {/* STEP 2: BIZNES TURINI TANLASH */}
      {step === 2 && (
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
              onClick={nextStep} 
              className="px-8 py-4 text-lg shadow-xl hover:shadow-blue-200"
            >
              Yakunlash
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 3 && (
        <div className="mt-12 text-center py-20 animate-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full text-5xl mb-6">
            ✓
          </div>
          <h1 className="text-4xl font-black mb-2">Muvaffaqiyatli!</h1>
          <p className="text-gray-500 mb-8 text-lg">Line App tizimiga xush kelibsiz.</p>
          <Button onClick={() => navigate('/dashboard')} size="lg" className="px-12">
            Dashboardga o'tish
          </Button>
        </div>
      )}
    </div>
  );
};