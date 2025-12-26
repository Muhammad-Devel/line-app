// src/pages/customer/Home.tsx
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const CustomerHome = () => {
  return (
    <div className="space-y-6">
      {/* Biznes haqida ma'lumot */}
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm mx-auto mb-3 flex items-center justify-center border">
          🏢
        </div>
        <h2 className="text-xl font-bold">"Elegant" Sartaroshxonasi</h2>
        <p className="text-slate-500 text-sm">Hozir ochiq • Kutish vaqti: ~15 daq</p>
      </div>

      {/* ASOSIY ACTION CARD */}
      <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
        <h3 className="text-lg font-semibold mb-2">Navbatga yozilish</h3>
        <p className="text-blue-100 text-sm mb-6">Navbatga turish uchun tugmani bosing va o'z vaqtingizni tejang.</p>
        <Button variant="secondary" className="w-full py-6 font-bold text-blue-700">
          Navbat olish
        </Button>
      </Card>

      {/* Xizmatlar ro'yxati (Kichik ko'rinish) */}
      <div className="space-y-3">
        <h4 className="font-bold">Mashhur xizmatlar</h4>
        {[1, 2].map(i => (
          <Card key={i} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-800">Erkaklar soch turmagi</p>
              <p className="text-xs text-slate-400">30 daqiqa • 50,000 so'm</p>
            </div>
            <Button size="sm" variant="outline">Tanlash</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};