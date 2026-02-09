import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/auth.store";

interface ClientProfileData {
  name: string;
  phone: string;
}

export const ClientProfile = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ClientProfileData>({
    name: "Foydalanuvchi",
    phone: "Nomalum",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.name || user?.phone) {
      setProfile({
        name: user?.name ?? "Foydalanuvchi",
        phone: user?.phone ?? "Nomalum",
      });
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-3 text-xl font-semibold">{profile.name}</h2>
        <p className="text-sm text-slate-500">{profile.phone}</p>
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-500 text-sm">Ism</span>
          <span className="font-medium">{profile.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 text-sm">Telefon</span>
          <span className="font-medium">{profile.phone}</span>
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <Button variant="outline" className="w-full">
          Profilni tahrirlash
        </Button>

        <Button
          variant="danger"
          className="w-full"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          Chiqish
        </Button>
      </Card>
    </div>
  );
};
