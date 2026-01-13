// src/pages/admin/dashboard/components/ProductModal.tsx
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import AppIcon from "../../../../components/ui/AppIcon";
import { Button } from "../../../../components/ui/Button";

export const ProductModal = ({ isOpen, onClose, product, onRefresh }: any) => {
  const { register, handleSubmit, reset } = useForm({
    values: product || {
      name: "",
      price: 0,
      stock: 0,
      category: "",
      isActive: true,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    try {
      if (product) {
        // Endpoint 14: Update
        await api.put(`/admin/products/${product._id}`, data);
      } else {
        // Endpoint 13: Create
        await api.post("/admin/products", data);
      }
      onRefresh();
      onClose();
      reset();
    } catch (err) {
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800">
            {product ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <AppIcon name="lucide:x" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                Nomi
              </label>
              <input
                {...register("name")}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                Narxi (UZS)
              </label>
              <input
                type="number"
                {...register("price")}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                Ombor qoldig'i
              </label>
              <input
                type="number"
                {...register("stock")}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
              Kategoriya
            </label>
            <select
              {...register("category")}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold appearance-none"
            >
              <option value="ichimliklar">Ichimliklar</option>
              <option value="ovqatlar">Ovqatlar</option>
              <option value="shirinliklar">Shirinliklar</option>
            </select>
          </div>

          <Button className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-lg mt-4 shadow-xl">
            SAQLASH
          </Button>
        </form>
      </div>
    </div>
  );
};
