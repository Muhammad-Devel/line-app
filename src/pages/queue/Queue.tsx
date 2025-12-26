import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AppIcon from '../../components/ui/AppIcon';
import { socket, connectSocket } from '../../services/socket';
import api from '../../services/api';

export const QueuePage = () => {
  const [queues, setQueues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Ma'lumotlarni yuklash (Endpoint 16)
  const fetchQueue = async () => {
    try {
      const res = await api.get('/admin/queue?status=waiting,called');
      setQueues(res.data.queues);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    connectSocket();
    fetchQueue();

    // 2. Socket orqali real-time yangilanishlar
    socket.on('admin:queue', (data) => setQueues(data.queues));
    socket.on('queue:joined', fetchQueue);
    socket.on('queue:update', fetchQueue);

    return () => {
      socket.off('admin:queue');
      socket.off('queue:joined');
      socket.off('queue:update');
    };
  }, []);

  // 3. Mijozni chaqirish (Endpoint 18)
  const handleCall = async (id: string) => {
    setLoading(true);
    try {
      await api.post(`/admin/queue/${id}/call`);
      // Socket avtomatik ravishda mijozga "Sizni chaqirishdi" xabarini yuboradi
      fetchQueue();
    } finally {
      setLoading(false);
    }
  };

  // 4. Navbatni yakunlash yoki o'tkazib yuborish (Endpoint 19)
  const updateStatus = async (id: string, status: 'completed' | 'skipped') => {
    try {
      await api.put(`/admin/queue/${id}/status`, { status });
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const currentCalled = queues.find(q => q.status === 'called');
  const waitingList = queues.filter(q => q.status === 'waiting');

  return (
    <div className="space-y-8">
      {/* --- CHAQRILGAN MIJOZ (HIGHLIGHT) --- */}
      {currentCalled ? (
        <Card className="p-8 border-none bg-blue-600 text-white rounded-[40px] shadow-xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between animate-in fade-in zoom-in duration-500">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl font-black">
              {currentCalled.queueNumber}
            </div>
            <div>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Hozirgi mijoz</p>
              <h2 className="text-3xl font-black mt-1">{currentCalled.userId?.name || 'Ismsiz'}</h2>
              <p className="opacity-80 flex items-center gap-2 mt-1">
                <AppIcon name="lucide:scissors" className="w-4 h-4" /> 
                {currentCalled.serviceId?.name}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 md:mt-0">
            <Button 
              onClick={() => updateStatus(currentCalled._id, 'completed')}
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl px-8 h-14 font-black"
            >
              YAKUNLASH
            </Button>
            <Button 
              onClick={() => handleCall(currentCalled._id)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-2xl h-14"
            >
              <AppIcon name="lucide:volume-2" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-12 border-2 border-dashed border-slate-200 bg-white rounded-[40px] text-center">
          <p className="text-slate-400 font-bold italic">Hozircha hech kim chaqirilmadi</p>
        </Card>
      )}

      {/* --- KUTISH RO'YXATI --- */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 px-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          Navbatda kutayotganlar ({waitingList.length})
        </h3>
        
        {waitingList.map((item, index) => (
          <div 
            key={item._id}
            className="group flex items-center justify-between p-5 bg-white rounded-3xl border border-transparent hover:border-blue-100 hover:shadow-sm transition-all animate-in slide-in-from-bottom duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {item.queueNumber}
              </div>
              <div>
                <p className="font-bold text-slate-800">{item.userId?.name || 'Mijoz #' + item.queueNumber}</p>
                <p className="text-xs text-slate-400 font-medium">{item.serviceId?.name} • {item.serviceId?.duration} daqiqa</p>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                onClick={() => updateStatus(item._id, 'skipped')}
                className="text-slate-400 hover:text-red-500"
              >
                O'tkazib yuborish
              </Button>
              <Button 
                onClick={() => handleCall(item._id)}
                disabled={loading}
                className="bg-slate-900 text-white rounded-xl px-6"
              >
                CHAQIRISH
              </Button>
            </div>
          </div>
        ))}

        {waitingList.length === 0 && !currentCalled && (
          <div className="py-20 text-center opacity-30">
            <AppIcon name="lucide:coffee" className="w-12 h-12 mx-auto mb-4" />
            <p className="font-bold">Navbat bo'sh. Dam olishingiz mumkin!</p>
          </div>
        )}
      </div>
    </div>
  );
};