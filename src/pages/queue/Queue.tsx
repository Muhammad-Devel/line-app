// src/pages/admin/QueuePage.tsx
import { useEffect, useState } from 'react';
import { adminQueueService } from '../../services/adminQueue.service';
import { socket, connectSocket } from '../../services/socket';
import { Button } from '../../components/ui/Button';

export const QueuePage = () => {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    connectSocket();
    fetchQueues();

    // WebSocket orqali real-time yangilanishlarni eshitish
    socket.on('queue:update', () => fetchQueues());
    socket.on('queue:joined', () => fetchQueues());

    return () => {
      socket.off('queue:update');
      socket.off('queue:joined');
    };
  }, []);

  const fetchQueues = async () => {
    const data = await adminQueueService.getQueues('waiting');
    setQueues(data);
  };

  const handleCall = async (id: string) => {
    await adminQueueService.callClient(id);
    // Chaqirilganda status o'zgaradi, socket orqali hamma xabar topadi
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Jonli Navbat</h1>
      <div className="grid gap-4">
        {queues.map((q: any) => (
          <div key={q._id} className="p-4 bg-white rounded-2xl shadow-sm flex justify-between items-center border border-slate-100">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-blue-600">#{q.queueNumber}</span>
              <div>
                <p className="font-bold">{q.userId.name}</p>
                <p className="text-xs text-slate-400">{q.serviceId.name} • {q.userId.phone}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleCall(q._id)} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Chaqirish
              </Button>
              <Button onClick={() => adminQueueService.updateStatus(q._id, 'completed')} className="bg-green-600">
                Tugatish
              </Button>
            </div>
          </div>
        ))}
        {queues.length === 0 && <p className="text-center text-slate-400 py-20">Hozircha navbatlar yo'q</p>}
      </div>
    </div>
  );
};