# 🚀 LineApp — Navbatlar va Buyurtmalarni Boshqarish Ekotizimi

**LineApp** — xizmat ko'rsatish sohalari (sartaroshxonalar, klinikalar) va savdo nuqtalari (shirinlik sexlari, kafelar) uchun mo'ljallangan universal avtomatlashtirish platformasi. Loyiha mijozlar uchun **Telegram Mini App** va biznes egalari uchun professional **Admin Panel**ni o'z ichiga oladi.

---

## ✨ Asosiy Imkoniyatlar

### 🛒 Savdo va Buyurtmalar (Retail & Made-to-order)
* **Dinamik Katalog:** Mahsulotlar qoldig'i (stock) yoki tayyorlanish vaqtiga qarab ko'rsatiladi.
* **Made-to-Order:** Tortchi yoki hunarmandlar uchun buyurtma vaqtini rejalashtirish va mijoz istaklarini (izohlar) qabul qilish.
* **Smart Cart:** Savatcha va tezkor buyurtma berish tizimi.

### ⏳ Jonli Navbat (Queue Management)
* **Real-time Queue:** Mijozlar o'z navbatini real vaqt rejimida kuzatib borishadi.
* **Smart Notifications:** Navbati kelgan mijozga Telegram bot orqali avtomatik xabar yuborish.
* **Estimated Wait Time:** Navbat raqami va taxminiy kutish vaqtini hisoblash algoritmi.

### 🔐 Autentifikatsiya
* **Telegram Mini App Auth:** Birgina tugma orqali shaxsni tasdiqlash (`initData` xavfsiz tekshiruvi bilan).
* **Phone Verification:** Kontakt yuborish orqali telefon raqamini tasdiqlash.

---

## 🛠 Texnologik Stek

| Qism | Texnologiya |
| :--- | :--- |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS |
| **State Management** | Zustand |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Real-time** | Socket.io |
| **Bot API** | Telegraf / Node-Telegram-Bot-API |

---

## 🛰 API Arxitekturasi (Modullar Kesimida)

### 1. Auth Moduli
* `POST /auth/telegram-miniapp` — Telegram Mini App ma'lumotlarini tekshirish va JWT berish.
* `GET /auth/me` — Joriy foydalanuvchi profilini olish.

### 2. Products Moduli
* `GET /products` — Biznes turiga mos mahsulotlar ro'yxati.
* `POST /admin/products` — Yangi mahsulot/xizmat qo'shish.

### 3. Queue Moduli
* `POST /queue/join` — Navbatga yozilish.
* `GET /queue/status` — Navbat holatini real-vaqtda olish.
* `PATCH /admin/queue/call` — Keyingi mijozni chaqirish.

---

## 🚀 O'rnatish va Ishga tushirish

### 1. Loyihani klonlash
```bash
git clone [https://github.com/username/line-app.git](https://github.com/username/line-app.git)
cd line-app
