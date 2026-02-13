import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState<number>(0); // 0 dan boshlaymiz
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const PROJECT_CODE = "f585b98b";
  const PROJECT_KEY = "b16a82e01675b89e4e254dcdb1d83f3a94d399cd3cfb880b";
  // Botga o'tish URL (telefon raqamini parametr sifatida yuborish tavsiya etiladi)
  const TG_BOT_URL = `https://t.me/auth_tg_robot?start=${PROJECT_CODE}`;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, ''); // Faqat raqam
    if (!value && element.value !== '') return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSendCode = async () => {
    if (phone.length < 9) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting");
      return;
    }

    try {
      const response = await axios.post('http://verify.lutfulla.uz/auth/request', {
        phone: `+998${phone}`
      }, {
        headers: { 'x-project-key': PROJECT_KEY }
      });

      console.log('Javob:', response.data);

      // Agar API foydalanuvchi botdan ro'yxatdan o'tishi kerakligini aytsa
      // Masalan: response.data.status === "need_telegram_auth"
      if (response.data.error || response.data.error === "phone not linked to telegram") {
        const confirmBot = window.confirm("Tizimdan foydalanish uchun Telegram botimizdan ro'yxatdan o'tishingiz kerak. Botga o'tasizmi?");
        if (confirmBot) {
          window.open(TG_BOT_URL, '_blank');
          return; // Kod yuborish qismini to'xtatib turamiz
        }
      }

      setIsCodeSent(true);
      setTimer(59);
    } catch (error: any) {
      if (error.response?.data?.error === "phone not linked to telegram") {
        const confirmBot = window.confirm("Tizimdan foydalanish uchun Telegram botimizdan ro'yxatdan o'tishingiz kerak. Botga o'tasizmi?");
        if (confirmBot) {
          window.open(TG_BOT_URL, '_blank');
          return; // Kod yuborish qismini to'xtatib turamiz
        }
      }
      console.error('Xatolik:', error);
      alert(error.response?.data?.error || 'Kod yuborishda xatolik yuz berdi!');
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) return;

    try {
      const response = await axios.post('http://verify.lutfulla.uz/auth/verify', {
        phone: `+998${phone}`,
        code: fullCode
      }, {
        headers: { 'x-project-key': PROJECT_KEY }
      });
      
      localStorage.setItem('token', response.data.token);
      alert('Muvaffaqiyatli kirdingiz!');
      // roleRedirect(response.data.user.role); // Yo'naltirish
    } catch (error) {
      alert('Kod noto\'g\'ri yoki muddati o\'tgan!');
      console.log(error);
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans text-[#333]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-8 border border-gray-50">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-[#1a4f95]">Tizimga Kirish</h1>
          <p className="text-gray-400 text-sm">Tasdiqlash kodi Telegram bot orqali yuboriladi</p>
        </div>

        {/* Telefon raqam */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Telefon Raqami</label>
          <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden focus-within:border-[#1a4f95] transition-all bg-gray-50">
            <span className="pl-4 pr-2 py-4 text-gray-500 font-medium border-r border-gray-200">+998</span>
            <input 
              type="tel"
              placeholder="90 123 45 67"
              className="w-full px-4 py-4 outline-none bg-transparent font-semibold text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isCodeSent}
            />
          </div>
        </div>

        {/* Kod kiritish */}
        {isCodeSent && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tasdiqlash KODI</label>
              <button onClick={() => setIsCodeSent(false)} className="text-xs text-blue-500 font-semibold italic">Raqamni o'zgartirish</button>
            </div>
            <div className="flex justify-between gap-2">
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el:any) => (inputRefs.current[index] = el!)}
                  className="w-11 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-black text-[#1a4f95] focus:border-[#1a4f95] focus:bg-blue-50 outline-none transition-all"
                  value={data}
                  onChange={(e) => handleCodeChange(e.target, index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !code[index] && index > 0) {
                      inputRefs.current[index - 1].focus();
                    }
                  }}
                />
              ))}
            </div>
            
            <button 
              disabled={timer > 0}
              onClick={handleSendCode}
              className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              {timer > 0 ? `Kodni qayta yuborish (${timer}s)` : 'Kodni qayta yuborish'}
            </button>
          </div>
        )}

        {/* Tugma */}
        <button
          onClick={isCodeSent ? handleSubmit : handleSendCode}
          className="w-full bg-[#1a4f95] hover:bg-[#113a70] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-blue-100"
        >
          <span className="tracking-wide">{isCodeSent ? "DAVOM ETISH" : "KOD OLISH"}</span>
          <div className="bg-white/20 p-1 rounded-full">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};


export default Login;