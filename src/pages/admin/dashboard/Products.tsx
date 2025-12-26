// src/pages/admin/dashboard/Products.tsx
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import AppIcon from '../../../components/ui/AppIcon';
import { ProductModal } from './components/ProductModal'; // Modal komponenti

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get('/admin/products');
    setProducts(res.data.products);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Mahsulotlar va Xizmatlar</h1>
          <p className="text-slate-400 text-sm">Ombor qoldig'i va narxlarni boshqarish</p>
        </div>
        <Button 
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
          className="bg-blue-600 rounded-2xl px-6 h-12 font-bold flex gap-2"
        >
          <AppIcon name="lucide:plus" /> Yangi mahsulot
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">Mahsulot</th>
              <th className="px-6 py-4">Kategoriya</th>
              <th className="px-6 py-4">Narxi</th>
              <th className="px-6 py-4">Qoldiq</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((p: any) => (
              <tr key={p._id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <AppIcon name="lucide:package" className="text-slate-400 w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{p.category}</td>
                <td className="px-6 py-4 font-black text-slate-800 text-sm">{p.price.toLocaleString()} UZS</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {p.stock} dona
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(p)} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                    <AppIcon name="lucide:edit-3" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
        onRefresh={fetchProducts}
      />
    </div>
  );
};