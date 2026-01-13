import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import AppIcon from "../../components/ui/AppIcon";
import { ADMIN_NAV_ITEMS } from "../../constants/navigation";
type Props = {};

function Header({}: Props) {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const businessType = user?.businessType || "SERVICE";
  const filteredNavItems = ADMIN_NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(businessType)
  );

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          {filteredNavItems.find((i) => location.pathname.includes(i.path))
            ?.title || "Boshqaruv"}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Biznes statusi (Live/Closed) */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Ochiq
        </div>

        <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-800 leading-none">
              {user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
              {businessType}
            </p>
          </div>
          <button
            onClick={logout}
            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <AppIcon name="lucide:log-out" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
