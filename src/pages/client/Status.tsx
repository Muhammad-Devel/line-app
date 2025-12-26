import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import AppIcon from '../../components/ui/AppIcon';
import { socket, connectSocket } from '../../services/socket';
import api from '../../services/api';

export const CustomerStatus = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      // Endpoint 9: Mijozning navbat holati
      const res = await api.get('/client/queue/status');
      setData(res.data);
    } catch (err) {
      console.error("Statusni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    connectSocket();
    fetchStatus();

    // Socket orqali yangilanishlarni kutish
    socket.on('queue:called', (_payload) => {
      // Admin mijozni chaqirganda alert va yangilash
      if (window.navigator.vibrate) window.navigator.vibrate([200, 100, 200]);
      fetchStatus();
    });

    socket.on('queue:update', fetchStatus);

    return () => {
      socket.off('queue:called');
      socket.off('queue:update');
    };
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">Yuklanmoqda...</div>;

  if (!data?.queue) {
    return (
      <div className="p-6 text-center space-y-6">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
          <AppIcon name="lucide:calendar-x" className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold">Siz navbatda emassiz</h2>
        <p className="text-slate-500">Xizmatlardan foydalanish uchun ro'yxatdan o'ting.</p>
      </div>
    );
  }

  const isCalled = data.queue.status === 'called';

  return (
    <div className="p-6 max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- STATUS HEADER --- */}
      <div className="text-center">
        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isCalled ? 'bg-green-100 text-green-600 animate-bounce' : 'bg-blue-100 text-blue-600'}`}>
          {isCalled ? 'Sizning navbatingiz keldi!' : 'Navbatda turibsiz'}
        </span>
        <h1 className="text-4xl font-black mt-4 text-slate-800 tracking-tight">
          #{data.queue.queueNumber}
        </h1>
        <p className="text-slate-400 font-medium">{data.queue.serviceId?.name}</p>
      </div>

      {/* --- LIVE TICKET CARD --- */}
      <Card className={`p-8 border-none rounded-[40px] shadow-2xl transition-all duration-500 ${isCalled ? 'bg-green-500 text-white scale-105' : 'bg-white text-slate-800'}`}>
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-6">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-tighter ${isCalled ? 'text-green-100' : 'text-slate-400'}`}>Sizdan oldin</p>
              <p className="text-2xl font-black">{isCalled ? '0' : data.position} kishi</p>
            </div>
            <div className="text-right">
              <p className={`text-[10px] font-bold uppercase tracking-tighter ${isCalled ? 'text-green-100' : 'text-slate-400'}`}>Taxminiy vaqt</p>
              <p className="text-2xl font-black">
                {isCalled ? 'Hozir' : `${data.position * (data.queue.serviceId?.duration || 15)} daq`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCalled ? 'bg-white/20' : 'bg-slate-50'}`}>
              <AppIcon name={isCalled ? "lucide:megaphone" : "lucide:clock"} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">
                {isCalled ? "Iltimos, qabulxonaga boring" : "Navbatingiz kelganda xabar beramiz"}
              </p>
              {!isCalled && <p className="text-[10px] opacity-60">Jonli yangilanmoqda...</p>}
            </div>
          </div>
        </div>
      </Card>

      {/* --- INFO FOOTER --- */}
      <div className="bg-slate-100 p-6 rounded-3xl flex items-start gap-3">
        <AppIcon name="lucide:info" className="w-5 h-5 text-slate-400 shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          Navbatingizni o'tkazib yubormaslik uchun Telegram bildirishnomalarini yoqib qo'ying.
        </p>
      </div>
    </div>
  );
};