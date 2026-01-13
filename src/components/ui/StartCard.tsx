import AppIcon from "./AppIcon";

type Props = {
  title: string;
  value: string;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  icon?: string;
  iconClassName?: string;
  onClick?: () => void;
};

export function StatCard({
  title,
  value,
  className,
  titleClassName,
  valueClassName,
  icon,
  iconClassName,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl p-5 shadow ${className}`}
    >
      {icon && (
        <div className={iconClassName}>
          <AppIcon name={icon} className="w-12 h-12" />
        </div>
      )}
      <p className={titleClassName}>{title}</p>
      <h2 className={valueClassName}>{value}</h2>
    </div>
  );
}
