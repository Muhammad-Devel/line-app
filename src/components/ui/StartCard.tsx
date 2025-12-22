type Props = {
  title: string;
  value: string;
  icon?: React.ReactNode;
};

export function StatCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
