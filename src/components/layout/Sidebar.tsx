import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { ADMIN_NAV_ITEMS } from "../../constants/navigation";
import AppIcon from "../../components/ui/AppIcon";
import { Button } from "../../components/ui/Button";

export default function Sidebar() {
  const { user } = useAuthStore();
 

  // Foydalanuvchi biznes turiga qarab menyuni filtrlash
  // Agar user.businessType bo'lmasa, default SERVICE deb olamiz
  const businessType = user?.businessType || "RETAIL";

  const filteredNavItems = ADMIN_NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(businessType)
  );
  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <AppIcon name="lucide:zap" className="w-6 h-6" />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-800">
          LineApp <span className="text-blue-600">Pro</span>
        </span>
      </div>
      <nav className="p-4 space-y-1 bg-blue-950 h-full">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
                          flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100"
                              : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                          }
                        `}
          >
            <AppIcon name={item.icon} className="w-5 h-5" />
            {item.title}
          </NavLink>
        ))}
        <div className="py-8"></div>
        <div className="mt-auto">
          <div className="bg-slate-900 rounded-[24px] p-5 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs text-slate-400 font-medium">
                Yordam kerakmi?
              </p>
              <p className="text-sm font-bold mt-1">
                Qo'llab-quvvatlash botiga yozing
              </p>
              <Button className="mt-4 w-full bg-white/10 hover:bg-white/20 border-none text-xs h-9 rounded-xl">
                Chatni ochish
              </Button>
            </div>
            <AppIcon
              name="lucide:message-circle"
              className="absolute -right-2 -bottom-2 w-20 h-20 text-white/5 group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
