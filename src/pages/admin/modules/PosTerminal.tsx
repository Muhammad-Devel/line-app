// src/pages/admin/modules/PosTerminal.tsx
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const PosTerminal = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Mahsulotlar to'plami */}
      <Card className="p-4 grid grid-cols-3 gap-3 h-[600px] overflow-y-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <button
            key={i}
            className="p-4 border rounded-xl hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center"
          >
            <span className="text-2xl mb-2">🥤</span>
            <p className="text-xs font-bold">Coca-Cola</p>
            <p className="text-[10px] text-blue-600">12,000 so'm</p>
          </button>
        ))}
      </Card>

      {/* Savat va To'lov */}
      <Card className="p-6 flex flex-col justify-between bg-zinc-900 text-white">
        <div>
          <h3 className="text-lg font-bold mb-4">Hozirgi savat</h3>
          <div className="space-y-3 opacity-80">
            <div className="flex justify-between">
              <span>Coca-Cola x 2</span> <span>24,000</span>
            </div>
            <div className="flex justify-between">
              <span>Lavash x 1</span> <span>35,000</span>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-700 pt-4 mt-4">
          <div className="flex justify-between text-2xl font-black mb-4">
            <span>Jami:</span> <span>59,000</span>
          </div>
          <Button className="w-full py-6 bg-blue-600 text-lg font-bold">
            To'lovni qabul qilish
          </Button>
        </div>
      </Card>
    </div>
  );
};
