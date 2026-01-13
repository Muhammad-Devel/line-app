// src/components/auth/TelegramAuth.tsx
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const TelegramAuth: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Avvalgi widgetlarni tozalash (re-render bo'lganda takrorlanmasligi uchun)
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // 2. Telegram scriptini yaratish
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    // 3. Widget atributlarini sozlash
    script.setAttribute('data-telegram-login', '@line_app_bot'); // BotFatherdan olingan nom
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '12');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)'); // Callback nomi

    containerRef.current?.appendChild(script);

    // 4. Global callback funksiyasini aniqlash
    (window as any).onTelegramAuth = async (user: any) => {
      console.log("Telegramdan kelgan ma'lumot:", user);
      
      try {
        // Backend'ga yuborish
        const response = await axios.post('http://localhost:3000/api/auth/telegram', user);
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Role bo'yicha yo'naltirish
          if (response.data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/menu');
          }
        }
      } catch (error) {
        alert("Avtorizatsiya muvaffaqiyatsiz tugadi");
        console.error(error);
      }
    };

    return () => {
      // Komponent o'chirilganda callbackni tozalash
      delete (window as any).onTelegramAuth;
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-[32px] shadow-xl border border-slate-100">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-black text-slate-800">Tezkor kirish</h3>
        <p className="text-sm text-slate-400">Telegram orqali profilingizga kiring</p>
      </div>
      
      {/* Widget mana shu yerda paydo bo'ladi */}
      <div ref={containerRef}></div>
    </div>
  );
};