import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AppIcon from '../../components/ui/AppIcon';


export const CustomerStatus = () => {
  // Bu ma'lumotlar aslida Socket.io yoki API dan keladi
  const queueInfo = {
    position: 3,
    totalAhead: 2,
    estimatedTime: 15, // daqiqa
    status: 'waiting' // 'waiting', 'calling', 'finished'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 🔵 STATUS CARD */}
      <Card className="p-8 text-center bg-white shadow-xl border-t-4 border-t-blue-600 relative overflow-hidden">
        {/* Orqa fondagi bezak aylana */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50" />
        
        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-2">Sizning navbatingiz</p>
        
        {/* Progress Circle */}
        <div className="relative flex items-center justify-center my-6">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80" cy="80" r="70"
              stroke="currentColor" strokeWidth="8"
              fill="transparent" className="text-slate-100"
            />
            <circle
              cx="80" cy="80" r="70"
              stroke="currentColor" strokeWidth="8"
              fill="transparent" className="text-blue-600 transition-all duration-1000"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * (10 - queueInfo.position)) / 10}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-800">{queueInfo.position}</span>
            <span className="text-slate-400 text-sm">o'rin</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800">
            {queueInfo.totalAhead === 0 ? "Sizni kutishmoqda!" : `Sizdan oldin ${queueInfo.totalAhead} kishi bor`}
          </h3>
          <p className="text-blue-600 font-semibold italic">Taxminiy vaqt: ~{queueInfo.estimatedTime} daqiqa</p>
        </div>
      </Card>

      {/* 📍 BIZNES MA'LUMOTLARI */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center space-y-2 border-none bg-blue-50">
          <AppIcon name="lucide:map-pin" className="w-5 h-5 text-blue-600" />
          <span className="text-[10px] text-center font-medium">Navoi ko'chasi, 12-uy</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center space-y-2 border-none bg-green-50">
          <AppIcon name="lucide:phone" className="w-5 h-5 text-green-600" />
          <span className="text-[10px] text-center font-medium">Qo'ng'iroq qilish</span>
        </Card>
      </div>

      {/* 🔔 BILDIRISHNOMA SOZLAMASI */}
      <Card className="p-4 flex items-center justify-between bg-amber-50 border-none">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <AppIcon name="lucide:bell" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-800">Navbat kelganda eslatish</p>
            <p className="text-[10px] text-amber-600">SMS yoki Telegram orqali</p>
          </div>
        </div>
        <input type="checkbox" className="w-5 h-5 accent-amber-600" defaultChecked />
      </Card>

      <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50 text-xs">
        Navbatni bekor qilish
      </Button>
    </div>
  );
};