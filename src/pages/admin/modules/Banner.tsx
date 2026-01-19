import QRCode from "react-qr-code"
import { Button } from "../../../components/ui/Button"
import { useAuthStore } from "../../../store/auth.store"

export const Banner: React.FC = () => {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  const { id: ownerId, businessType } = user

  const handlePrint = () => {
    window.print()
  }

  const clientUrl = `${window.location.origin}/c/${businessType}/${ownerId}`

  return (
    <div
      id="print-area"
      className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center space-y-6
                 print:shadow-none print:rounded-none"
    >
      <h1 className="text-2xl font-black text-slate-800">
        Biznes sahifasiga o‘tish uchun QR-kod
      </h1>

      <p className="text-slate-500 text-sm">
        QR-kodni skanerlab mahsulotlarni ko‘ring yoki navbatga yoziling
      </p>

      <div className="flex justify-center bg-slate-50 p-6 rounded-2xl">
        <QRCode value={clientUrl} size={220} />
      </div>

      <p className="text-xs text-slate-400 break-all">
        {clientUrl}
      </p>

      <Button
        onClick={handlePrint}
        className="w-full h-14 text-lg font-bold print:hidden"
      >
        🖨️ Chop etish
      </Button>
    </div>
  )
}
