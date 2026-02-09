import { useEffect, useState } from "react";
import api from "../../services/api";
import { useCartStore } from "../../store/cart.store";
import AppIcon from "../../components/ui/AppIcon";
import { Button } from "../../components/ui/Button";

export const CustomerCatalog = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { addItem, items, getTotal } = useCartStore();
  const [activeCategory, setActiveCategory] = useState("Hammasi");

  useEffect(() => {
    api.get("/client/products").then((res) => setProducts(res.data.products));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <header className="p-6 bg-white rounded-b-[40px] shadow-sm">
        <h1 className="text-2xl font-black text-slate-800">Xush kelibsiz!</h1>
        <p className="text-slate-400 text-sm mt-1">Bugun nima buyurtma qilamiz?</p>
      </header>

      <div className="flex gap-3 overflow-x-auto p-6 no-scrollbar">
        {["Hammasi", "Ovqatlar", "Ichimliklar", "Shirinliklar"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-white text-slate-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 px-6">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-[32px] flex items-center gap-4 shadow-sm border border-transparent active:scale-95 transition-all"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
              <AppIcon name="lucide:utensils" className="text-slate-200 w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{product.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{product.description}</p>
              <p className="text-blue-600 font-black mt-1">
                {product.price.toLocaleString()} UZS
              </p>
            </div>
            <button
              onClick={() => addItem(product)}
              className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center active:bg-blue-600 transition-colors"
            >
              <AppIcon name="lucide:plus" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-8 left-6 right-6 animate-in slide-in-from-bottom-10 duration-500">
          <Button
            className="w-full h-16 bg-blue-600 rounded-[24px] shadow-2xl shadow-blue-300 flex items-center justify-between px-8"
            onClick={() => {
              // TODO: savat oynasini ochish
            }}
          >
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-lg text-sm font-black">
                {items.length}
              </span>
              <span className="font-black">Savatchani ko'rish</span>
            </div>
            <span className="font-mono font-bold">{getTotal().toLocaleString()} UZS</span>
          </Button>
        </div>
      )}
    </div>
  );
};
