// src/pages/admin/Products.tsx
import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import AppIcon from '../../../components/ui/AppIcon';
import { productService } from '../../../services/product.service';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Ushbu xizmatni o'chirmoqchimisiz?")) {
      await productService.delete(id);
      loadProducts();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Xizmatlar va Mahsulotlar</h1>
          <p className="text-sm text-slate-500">Mijozlarga ko'rinadigan xizmatlar ro'yxati</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 rounded-2xl">
          <AppIcon name="lucide:plus" className="mr-2 w-5 h-5" /> Yangi qo'shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Card key={product._id} className="p-5 border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl bg-white group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <AppIcon name="lucide:package" className="w-6 h-6" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                  <AppIcon name="lucide:edit-3" className="w-4 h-4" />
                </Button>
                <Button onClick={() => handleDelete(product._id)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
                  <AppIcon name="lucide:trash-2" className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 text-lg">{product.name}</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{product.description}</p>

            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Narxi</p>
                <p className="text-blue-600 font-black">{product.price.toLocaleString()} so'm</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Vaqt</p>
                <p className="text-slate-700 font-bold">{product.duration} daq</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 📝 Product Add Modal (Soddalashtirilgan ko'rinish) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 rounded-[32px] bg-white animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6">Yangi xizmat yaratish</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* create mantiqi */ }}>
              <input className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Xizmat nomi" />
              <input className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Narxi (so'm)" type="number" />
              <input className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Davomiyligi (daqiqa)" type="number" />
              <div className="flex gap-3 mt-8">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="ghost" className="flex-1 py-4">Bekor qilish</Button>
                <Button className="flex-1 py-4 bg-blue-600 rounded-2xl">Saqlash</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};