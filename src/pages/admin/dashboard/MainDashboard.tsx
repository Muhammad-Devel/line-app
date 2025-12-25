import { useBusinessStore } from '../../../store/business.store';
import { QueueManager } from '../modules/QueueManager';

import { StatsGrid } from '../../../components/ui/StatsGrid'
import { PosTerminal } from '../modules/POSTerminal';

export const MainDashboard = () => {
  const { config } = useBusinessStore();

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* 1. Tepada Statistika (Har doim ko'rinadi, lekin ichi o'zgaradi) */}
      <StatsGrid type={config.type} />

      {/* 2. Asosiy Ish Maydoni */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          {config.type === 'SERVICE' ? (
            <PosTerminal /> 
             // Sotuv oynasi
        ) : (
            // Navbatlar ro'yxati
            <QueueManager /> 
          )}
        </div>

        {/* 3. Yon tarafdagi kichik ma'lumotlar (Loglar yoki tezkor amallar) */}
        <div className="col-span-12 lg:col-span-3">
          {/* <QuickActions type={config.type} /> */}
        </div>
      </div>
    </div>
  );
};