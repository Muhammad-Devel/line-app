import { Icon } from "@iconify/react";

type Props = {
  name: string;
  className?: string;
};

export default function AppIcon({ name, className }: Props) {
  return <Icon icon={name} className={className} />;
}
