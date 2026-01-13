import type { BusinessType } from "../types/business";

export interface NavItem {
  title: string;
  path: string;
  icon: string;
  roles?: BusinessType[]; // Qaysi biznes turlarida ko'rinishi
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", path: "/dashboard", icon: "lucide:layout-dashboard" }, // Hamma uchun
  {
    title: "Jonli Navbat",
    path: "/queue",
    icon: "lucide:users",
    roles: ["SERVICE", "HYBRID"],
  },
  {
    title: "Sotuv (POS)",
    path: "/pos",
    icon: "lucide:shopping-cart",
    roles: ["RETAIL", "HYBRID"],
  },
  { title: "Buyurtmalar", path: "/orders", icon: "lucide:clipboard-list" }, // Hamma uchun
  { title: "Mahsulotlar", path: "/products", icon: "lucide:package" }, // Hamma uchun
  { title: "Statistika", path: "/main-dashboard", icon: "lucide:bar-chart-3" },
];
