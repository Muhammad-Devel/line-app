import { useState } from "react";
import { authService } from "../../services/auth.service";

interface RequestCodeProps {
  onSuccess: (phone: string) => void;
}


export default function RequestCode({ onSuccess }: RequestCodeProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = phone.trim().length >= 9;

  const handleSendCode = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);
      await authService.requestCode(phone);
      onSuccess(phone);
    } catch (err: any) {
      alert(err.response?.data?.message || "Code yuborishda xatolik");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-6 duration-300">

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Telefon raqamni kiriting
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Tasdiqlash kodi yuboriladi
        </p>

        {/* Phone input */}
        <div className="mb-4">
          <input
            type="tel"
            inputMode="numeric"
            placeholder="+998901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="
              w-full rounded-xl border border-gray-300 px-4 py-3
              text-base outline-none
              focus:border-black focus:ring-1 focus:ring-black
            "
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSendCode}
          disabled={!isValid || loading}
          className={`
            w-full py-3 rounded-xl text-white font-medium
            transition-all
            ${isValid
              ? "bg-black active:scale-95 hover:opacity-90"
              : "bg-gray-300 cursor-not-allowed"}
          `}
        >
          {loading ? "Yuborilmoqda..." : "Kodni olish"}
        </button>

        {/* Telegram info */}
        <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm text-gray-700">
          <p className="font-medium mb-1">SMS kelmadimi?</p>
          <p className="text-gray-600">
            Telegram orqali tezroq kirish uchun:
          </p>
          <a
            href="https://t.me/line_app_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-black font-medium underline"
          >
            @line_app_bot
          </a>
        </div>

      </div>
    </div>
  );
}
