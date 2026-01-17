// 1. Enum o'rniga string literal turlarini e'lon qilamiz
export type BusinessType = 'queue' | 'retail' | 'hybrid';

// 2. O'zgarmas qiymatlarni ob'ekt sifatida saqlaymiz (Enum o'rnini bosadi)
export const BUSINESS_TYPES = {
  queue: 'queue' as const,
  retail: 'retail' as const,
  hybrid: 'hybrid' as const,
};

// 3. Biznes funksiyalari interfeysi
export interface BusinessFeatures {
  hasQueue: boolean;
  hasProducts: boolean;
  hasBooking: boolean;
  hasCatalog: boolean;
  requiresStaff: boolean;
  isMadeToOrder: boolean; // 👈 Yangi flag: Buyurtmaga tayyorlanadimi?
}

// 4. Konfiguratsiya (Record yordamida)
export const BUSINESS_CONFIG: Record<BusinessType, BusinessFeatures> = {
  queue: {
    hasQueue: true,
    hasProducts: false,
    hasBooking: true,
    hasCatalog: true,
    requiresStaff: true,
    isMadeToOrder: false, // 👈 O'chirilgan
  },
  retail: {
    hasQueue: false,
    hasProducts: true,
    hasBooking: false,
    hasCatalog: true,
    requiresStaff: false,
    isMadeToOrder: false, // 👈 Qo'shildi
  },
  hybrid: { // Masalan, shirinlik tayyorlovchilar uchun
    hasQueue: true,
    hasProducts: true,
    hasBooking: true,
    hasCatalog: true,
    requiresStaff: false,
    isMadeToOrder: true, // 👈 Faollashtirildi
  },
};