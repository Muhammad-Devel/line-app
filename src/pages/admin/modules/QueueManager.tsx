import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import AppIcon from '../../../components/ui/AppIcon';
import api from '../../../services/api';
import { socket, connectSocket } from '../../../services/socket';

export const QueueManager = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQueue = async () => {
    try {
      // Endpoint 16: Navbatlar ro'yxatini olish
      const response = await api.get('/admin/queue?status=waiting');
      setQueues(response.data.queues);
    } catch (error) {
      console.error("Navbatni yuklashda xato:", error);
    }
  };

  useEffect(() => {
    connectSocket();
    fetchQueue();

    // Real-time yangilanishlar
    socket.on('admin:queue', (data) => setQueues(data.queues));
    socket.on('queue:update', fetchQueue);
    socket.on('queue:joined', fetchQueue);

    return () => {
      socket.off('admin:queue');
      socket.off('queue:update');
      socket.off('queue:joined');
    };
  }, []);

  // Mijozni chaqirish (Endpoint 18)
  const handleCallClient = async (id: string) => {
    setLoading(true);
    try {
      await api.post(`/admin/queue/${id}/call`);
      // API'dan keyin socket avtomatik hamma joyda (mijozda ham) 
      // 'queue:called' eventini trigger qiladi
      fetchQueue(); 
    } catch (error) {
      alert("Mijozni chaqirib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  // Statusni yakunlash (Endpoint 19)
  const handleComplete = async (id: string) => {
    try {
      await api.put(`/admin/queue/${id}/status`, { status: 'completed' });
      fetchQueue();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Jonli Navbat</h2>
          <p className="text-xs text-slate-400 font-medium">Hozirda {queues.length} ta mijoz kutmoqda</p>
        </div>
        <Button size="sm" className="bg-blue-600 rounded-xl px-4 py-2 hover:bg-blue-700">
          <AppIcon name="lucide:user-plus" className="w-4 h-4 mr-2" /> 
          Mijoz qo'shish
        </Button>
      </div>

      <div className="space-y-3">
        {queues.map((item: any, index: number) => (
          <div 
            key={item._id} 
            className={`flex items-center justify-between p-4 border rounded-2xl transition-all ${index === 0 ? 'bg-blue-50/50 border-blue-200' : 'border-slate-100'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center font-black text-blue-600 shadow-sm">
                {item.queueNumber}
              </div>
              <div>
                <p className="font-bold text-slate-800">{item.userId?.name || 'Ismsiz mijoz'}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><AppIcon name="lucide:clock" className="w-3 h-3"/> {item.serviceId?.duration} daq</span>
                  <span>•</span>
                  <span>{item.serviceId?.name}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => handleCallClient(item._id)}
                disabled={loading}
                variant="outline" 
                className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold px-4 py-2"
              >
                <AppIcon name="lucide:volume-2" className="w-4 h-4 mr-2" />
                Chaqirish
              </Button>
              <Button 
                onClick={() => handleComplete(item._id)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-4"
              >
                <AppIcon name="lucide:check" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {queues.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <AppIcon name="lucide:users" className="w-8 h-8" />
             </div>
             <p className="text-slate-400 text-sm font-medium">Hozircha navbatda hech kim yo'q</p>
          </div>
        )}
      </div>
    </Card>
  );
};