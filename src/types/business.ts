// 1. Enum o'rniga string literal turlarini e'lon qilamiz
export type BusinessType = 'SERVICE' | 'RETAIL' | 'HYBRID';

// 2. O'zgarmas qiymatlarni ob'ekt sifatida saqlaymiz (Enum o'rnini bosadi)
export const BUSINESS_TYPES = {
  SERVICE: 'SERVICE' as const,
  RETAIL: 'RETAIL' as const,
  HYBRID: 'HYBRID' as const,
};

// 3. Biznes funksiyalari interfeysi
export interface BusinessFeatures {
  hasQueue: boolean;
  hasProducts: boolean;
  hasBooking: boolean;
  hasCatalog: boolean;
  requiresStaff: boolean;
}

// 4. Konfiguratsiya (Record yordamida)
export const BUSINESS_CONFIG: Record<BusinessType, BusinessFeatures> = {
  SERVICE: {
    hasQueue: true,
    hasProducts: false,
    hasBooking: true,
    hasCatalog: true,
    requiresStaff: true,
  },
  RETAIL: {
    hasQueue: false,
    hasProducts: true,
    hasBooking: false,
    hasCatalog: true,
    requiresStaff: false,
  },
  HYBRID: {
    hasQueue: true,
    hasProducts: true,
    hasBooking: true,
    hasCatalog: true,
    requiresStaff: false,
  },
};