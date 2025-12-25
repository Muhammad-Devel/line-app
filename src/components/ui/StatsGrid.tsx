import { Card } from './Card';

export const StatsGrid = ({ type }: { type: string | null }) => {
  const isService = type === 'SERVICE';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <p className="text-xs text-slate-400">Bugungi mijozlar</p>
        <h4 className="text-2xl font-bold font-mono">142</h4>
      </Card>
      
      <Card className="p-4 border-l-4 border-blue-500">
        <p className="text-xs text-slate-400">{isService ? "O'rtacha kutish" : "O'rtacha chek"}</p>
        <h4 className="text-2xl font-bold font-mono">{isService ? "12 min" : "85,000 so'm"}</h4>
      </Card>

      {/* Qolgan 2 ta vidjet ham shunday davom etadi... */}
    </div>
  );
};