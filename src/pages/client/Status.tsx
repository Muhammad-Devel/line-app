import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AppIcon from '../../components/ui/AppIcon';
import { useEffect, useState } from 'react';
import { socket, connectSocket } from '../../services/socket';

export const CustomerStatus = () => {
  // 1. Ma'lumotlarni saqlash uchun state
  const [queueInfo, setQueueInfo] = useState({
    position: 0,
    totalAhead: 0,
    estimatedTime: 0,
    status: 'waiting',
    queueNumber: '?'
  });

  useEffect(() => {
    // Socketga ulanish
    connectSocket();

    // 2. Ilk ulanishda statusni so'rash
    socket.emit('queue:getStatus');

    // 3. Serverdan ilk statusni qabul qilish (Endpoint 16 mantiqi bo'yicha)
    socket.on('queue:status', (data) => {
      if (data?.queue) {
        setQueueInfo({
          position: data.queue.position, // Navbatdagi o'rni
          totalAhead: data.queue.position - 1,
          estimatedTime: (data.queue.position - 1) * 15, // Har bir kishi uchun taxminan 15 daqiqa
          status: data.queue.status,
          queueNumber: data.queue.queueNumber // Mijozning kvitansiya raqami
        });
      }
    });

    // 4. Navbat yangilanganda (Masalan, kimdir chiqib ketsa)
    socket.on('queue:update', () => {
      socket.emit('queue:getStatus');
    });

    // 5. Admin chaqirganda (Endpoint 18 mantiqi)
    socket.on('queue:called', (data) => {
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200, 100, 500]);
      }
      setQueueInfo(prev => ({ ...prev, status: 'called' }));
      // Brauzer bildirishnomasi (ixtiyoriy)
      if (Notification.permission === "granted") {
        new Notification("Navbatingiz keldi!", { body: "Marhamat, kiring." });
      }
    });

    // Tozalash
    return () => {
      socket.off('queue:status');
      socket.off('queue:update');
      socket.off('queue:called');
    };
  }, []);

  // Progressni hisoblash (Maksimal 10 ta odamga nisbatan aylana to'lishi)
  const maxQueueView = 10;
  const currentPos = queueInfo.position > maxQueueView ? maxQueueView : queueInfo.position;
  const dashOffset = 440 - (440 * (maxQueueView - currentPos)) / maxQueueView;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 🔵 STATUS CARD */}
      <Card className={`p-8 text-center bg-white shadow-xl border-t-4 relative overflow-hidden transition-all duration-500 ${queueInfo.status === 'called' ? 'border-t-green-500 ring-4 ring-green-500/10' : 'border-t-blue-600'}`}>
        
        {/* Chaqirilganda animatsiya bo'ladigan fon */}
        {queueInfo.status === 'called' && (
          <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
        )}
        
        {/* Orqa fondagi bezak aylana */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50" />
        
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 relative z-10">
          {queueInfo.status === 'called' ? 'Sizni kutishmoqda' : 'Sizning navbatingiz'}
        </p>
        
        {/* Progress Circle */}
        <div className="relative flex items-center justify-center my-6 z-10">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50" />
            <circle
              cx="80" cy="80" r="70"
              stroke="currentColor" strokeWidth="8"
              fill="transparent" 
              className={`transition-all duration-1000 ${queueInfo.status === 'called' ? 'text-green-500' : 'text-blue-600'}`}
              strokeDasharray={440}
              strokeDashoffset={queueInfo.status === 'called' ? 0 : dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-800 tracking-tighter">
              {queueInfo.queueNumber}
            </span>
            <span className="text-slate-400 text-xs font-medium uppercase mt-1">raqam</span>
          </div>
        </div>

        <div className="space-y-1 relative z-10">
          <h3 className={`text-xl font-black ${queueInfo.status === 'called' ? 'text-green-600' : 'text-slate-800'}`}>
            {queueInfo.status === 'called' 
              ? "Marhamat, kiring!" 
              : queueInfo.totalAhead === 0 
                ? "Navbatingiz keldi!" 
                : `Sizdan oldin ${queueInfo.totalAhead} kishi bor`}
          </h3>
          {queueInfo.status !== 'called' && (
             <p className="text-blue-600 font-semibold text-sm">
               Taxminiy kutish vaqti: ~{queueInfo.estimatedTime} daqiqa
             </p>
          )}
        </div>
      </Card>

      {/* 📍 BIZNES MA'LUMOTLARI */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center space-y-2 border-none bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer">
          <AppIcon name="lucide:map-pin" className="w-5 h-5 text-blue-600" />
          <span className="text-[10px] text-center font-bold text-blue-900">Navoi ko'chasi, 12-uy</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center space-y-2 border-none bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer">
          <a href="tel:+998901234567" className="flex flex-col items-center space-y-2">
            <AppIcon name="lucide:phone" className="w-5 h-5 text-green-600" />
            <span className="text-[10px] text-center font-bold text-green-900">Qo'ng'iroq qilish</span>
          </a>
        </Card>
      </div>

      {/* 🔔 BILDIRISHNOMA SOZLAMASI */}
      <Card className="p-4 flex items-center justify-between bg-amber-50/50 border-none ring-1 ring-amber-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-600 shadow-sm">
            <AppIcon name="lucide:bell" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black text-amber-900">Eslatish tizimi</p>
            <p className="text-[10px] font-medium text-amber-600">Navbat kelganda bildirishnoma</p>
          </div>
        </div>
        <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-amber-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
        </div>
      </Card>

      {/* 🚫 CANCEL BUTTON */}
      <div className="pt-2 pb-8">
        <Button 
          variant="ghost" 
          className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-xs py-4 rounded-2xl transition-colors"
          onClick={() => {
            if(confirm("Haqiqatan ham navbatni bekor qilmoqchimisiz?")) {
                socket.emit('queue:cancel');
            }
          }}
        >
          Navbatni bekor qilish
        </Button>
      </div>
    </div>
  );
};