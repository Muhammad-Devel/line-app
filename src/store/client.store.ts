import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ClientInfo {
  name?: string
  phone?: string
}

interface ClientState {
  // 🔑 Biznes kontekst
  businessType: "queue" | "retail" | null
  businessId: string | null   // ownerId
  productId: string | null

  // 👤 Client maʼlumoti
  client: ClientInfo | null

  // 🔧 Actions
  setBusinessContext: (data: {
    businessType: ClientState["businessType"]
    businessId: string
  }) => void

  setProduct: (productId: string) => void
  setClientInfo: (client: ClientInfo) => void

  clearClient: () => void
}

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      businessType: null,
      businessId: null,
      productId: null,
      client: null,

      // QR orqali kirganda chaqiriladi
      setBusinessContext: ({ businessType, businessId }) =>
        set({
          businessType,
          businessId,
        }),

      setProduct: (productId) =>
        set({ productId }),

      setClientInfo: (client) =>
        set({ client }),

      clearClient: () =>
        set({
          businessType: null,
          businessId: null,
          productId: null,
          client: null,
        }),
    }),
    {
      name: "client-storage", // localStorage
    }
  )
)
