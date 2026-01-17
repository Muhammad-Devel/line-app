import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/auth.store";

interface ClientProfileData {
  name: string;
  phone: string;
}

export const ClientProfile = () => {
  const [profile, setProfile] = useState<ClientProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Vaqtincha: localStorage'dan olish
    const {name, phone} = useAuthStore.getState().user || {};
    if (name && phone) {
      setProfile({ name, phone });
      setLoading(false);
      return;
    }

    setProfile({ name, phone });
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-10">Yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 text-white
                        flex items-center justify-center text-3xl font-bold shadow">
          {profile?.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-3 text-xl font-semibold">{profile?.name}</h2>
        <p className="text-sm text-slate-500">{profile?.phone}</p>
      </div>

      {/* Profil ma'lumotlari */}
      <Card className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-500 text-sm">Ism</span>
          <span className="font-medium">{profile?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 text-sm">Telefon</span>
          <span className="font-medium">{profile?.phone}</span>
        </div>
      </Card>

      {/* Amallar */}
      <Card className="p-4 space-y-3">
        <Button variant="outline" className="w-full">
          Profilni tahrirlash
        </Button>

        <Button
            variant="danger"
          className="w-full"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Chiqish
        </Button>
      </Card>
    </div>
  );
};
