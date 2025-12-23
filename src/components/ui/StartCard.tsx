import AppIcon from "./AppIcon";

type Props = {
  title: string;
  value: string;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  icon?: string;
};

export function StatCard({ title, value, className, titleClassName, valueClassName, icon }: Props) {
return (
    <div className={`relative bg-white rounded-xl p-5 shadow ${className}`}>
      {icon && <div className="absolute top-5 left-5"><AppIcon name={icon} className="w-12 h-12" /></div>}
      <p className={`text-gray-500 ${titleClassName}`}>{title}</p>
      <h2 className={`text-2xl font-bold ${valueClassName}`}>{value}</h2>
    </div>
  );
}
