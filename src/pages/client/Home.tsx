import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { connectSocket, socket } from "../../services/socket";
import { useQueueStore } from "../../store/queue.store";
import { useClientStore } from "../../store/client.store";
import { ClientEntry } from "./ClientEntry";

export const CustomerHome = () => {
  const { businessId } = useParams();
  const storedBusinessId = useClientStore((s) => s.businessId);
  const [queues, setQueues] = useState<any[]>([]);
  const joinQueue = useQueueStore((s) => s.joinQueue);

  const handleJoinQueue = async () => {
    const targetBusinessId = businessId ?? storedBusinessId;
    if (!targetBusinessId) {
      alert("Biznes topilmadi. Iltimos, qayta urinib ko'ring.");
      return;
    }

    try {
      const queue = await joinQueue(targetBusinessId);
      if (queue?.queueNumber) {
        alert(`Sizning navbat raqamingiz: ${queue.queueNumber}`);
      }
    } catch (e) {
      alert("Navbatga yozilishda xatolik: " + e);
    }
  };

  useEffect(() => {
    connectSocket();

    const handleQueueUpdate = (data: { queues?: any[] }) => {
      setQueues(Array.isArray(data.queues) ? data.queues : []);
    };

    socket.on("client:queue", handleQueueUpdate);

    return () => {
      socket.off("client:queue", handleQueueUpdate);
    };
  }, []);

  return (
    <div className="space-y-6">
      <ClientEntry />

      <div className="text-center py-4">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm mx-auto mb-3 flex items-center justify-center border">
          Salon
        </div>
        <h2 className="text-xl font-bold">"Elegant" Sartaroshxonasi</h2>
        <p className="text-slate-500 text-sm">Hozir ochiq - Kutish vaqti: ~15 daq</p>
        <p className="text-slate-400 text-xs mt-1">Navbatdagi odamlar: {queues.length}</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
        <h3 className="text-lg font-semibold mb-2">Navbatga yozilish</h3>
        <p className="text-blue-100 text-sm mb-6">
          Navbatga turish uchun tugmani bosing va o'z vaqtingizni tejang.
        </p>
        <Button
          variant="secondary"
          className="w-full py-6 font-bold text-blue-700"
          onClick={handleJoinQueue}
        >
          Navbat olish
        </Button>
      </Card>

      <div className="space-y-3">
        <h4 className="font-bold">Mashhur xizmatlar</h4>
        {[1, 2].map((i) => (
          <Card key={i} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-800">Erkaklar soch turmagi</p>
              <p className="text-xs text-slate-400">30 daqiqa - 50,000 so'm</p>
            </div>
            <Button size="sm" variant="outline">
              Tanlash
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
