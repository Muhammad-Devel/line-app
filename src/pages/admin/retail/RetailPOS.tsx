// src/pages/admin/retail/RetailPOS.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import AppIcon from '../../../components/ui/AppIcon';
import api from '../../../services/api';
import type { RetailProduct } from '../../../types/product';

export const RetailPOS = () => {
  const [products, setProducts] = useState<RetailProduct[]>([]);
  const [cart, setCart] = useState<{product: RetailProduct, qty: number}[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Endpoint 12: Barcha mahsulotlarni olish
    api.get('/admin/products').then(res => setProducts(res.data.products));
  }, []);

  const addToCart = (product: RetailProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item => item.product._id === product._id 
          ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6 p-2 overflow-hidden">
      {/* 📦 MAHSULOTLAR KATALOGI (Chap tomonda) */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="relative">
          <input 
            className="w-full p-4 pl-12 bg-white rounded-2xl border-none shadow-sm outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all"
            placeholder="Mahsulot nomi yoki shtrix-kod..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <AppIcon name="lucide:search" className="absolute left-4 top-4 text-slate-400" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(product => (
            <Card 
              key={product._id} 
              onClick={() => addToCart(product)}
              className="p-4 bg-white border-none shadow-sm hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all rounded-[24px] group"
            >
              <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-3 flex items-center justify-center relative overflow-hidden">
                 <AppIcon name="lucide:package" className="w-10 h-10 text-slate-200 group-hover:scale-110 transition-transform" />
                 {product.stock < 10 && (
                   <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                     Kam qoldi: {product.stock}
                   </span>
                 )}
              </div>
              <h4 className="font-bold text-slate-800 text-sm truncate">{product.name}</h4>
              <p className="text-blue-600 font-black mt-1">{product.price.toLocaleString()} UZS</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 🧾 SAVATCHA VA TO'LOV (O'ng tomonda) */}
      <aside className="w-[400px] flex flex-col bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden text-white">
        <div className="p-8 pb-4">
          <h2 className="text-xl font-black flex items-center gap-2">
            <AppIcon name="lucide:shopping-bag" className="text-blue-400" />
            Joriy Savat
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-8 space-y-4 py-4 custom-scrollbar">
          {cart.map(item => (
            <div key={item.product._id} className="flex justify-between items-center group">
              <div className="flex-1">
                <p className="font-bold text-sm leading-tight">{item.product.name}</p>
                <p className="text-xs text-slate-500 font-medium">{item.qty} dona x {item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold">{(item.product.price * item.qty).toLocaleString()}</span>
                <button 
                  onClick={() => setCart(prev => prev.filter(p => p.product._id !== item.product._id))}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                >
                  <AppIcon name="lucide:trash-2" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                <AppIcon name="lucide:shopping-cart" className="w-16 h-16 mb-4" />
                <p>Savat bo'sh</p>
             </div>
          )}
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Jami To'lov</span>
            <span className="text-3xl font-black text-blue-400">{totalAmount.toLocaleString()} <small className="text-xs">UZS</small></span>
          </div>

          <Button 
            disabled={cart.length === 0}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-black shadow-lg shadow-blue-900/20"
            onClick={async () => {
              // Endpoint 5: Buyurtma yaratish
              await api.post('/client/orders', { 
                items: cart.map(c => ({ productId: c.product._id, quantity: c.qty }))
              });
              alert("Sotuv yakunlandi!");
              setCart([]);
            }}
          >
            SOTUVNI YAKUNLASH
          </Button>
        </div>
      </aside>
    </div>
  );
};