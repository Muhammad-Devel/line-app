export type BusinessType = {
   business_type: "SERVICE" | "RETAIL" | "HYBRID";
   business_name?: string;
};

export type BusinessConfig = {
   name: string;
   type: BusinessType["business_type"] | null;
   category: string;
   features: string[];
};

export type BusinessSettings = {
   timezone: string;
   currency: string;
   tax_rate: number;
   notifications_enabled: boolean;
};

