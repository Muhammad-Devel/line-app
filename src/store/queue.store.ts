import { create } from "zustand";
import { queueService } from "../services/queue.service";

export interface QueueItem {
  _id: string;
  userId: string;
  serviceId: string;
  orderId?: string | null;
  queueNumber: number;
  status: "waiting" | "called" | "completed" | "skipped";
  estimatedTime?: string;
  createdAt: string;
}

interface QueueState {
  myQueue: QueueItem | null;
  serviceQueue: QueueItem[];
  loading: boolean;
  error: string | null;

  joinQueue: (serviceId: string, orderId?: string) => Promise<QueueItem | null>;
  fetchMyQueue: () => Promise<void>;
  fetchServiceQueue: (serviceId: string) => Promise<void>;
  clearQueue: () => void;
}

export const useQueueStore = create<QueueState>((set) => ({
  myQueue: null,
  serviceQueue: [],
  loading: false,
  error: null,

  joinQueue: async (serviceId, orderId) => {
    try {
      set({ loading: true, error: null });

      const res = await queueService.joinQueue(serviceId, orderId);
      const queue = res.data.queue as QueueItem | undefined;

      set({
        myQueue: queue ?? null,
        loading: false,
      });

      return queue ?? null;
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Navbatga yozilishda xatolik",
      });
      throw err;
    }
  },

  fetchMyQueue: async () => {
    try {
      set({ loading: true, error: null });

      const res = await queueService.myQueue();

      set({
        myQueue: res.data.queue,
        loading: false,
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Navbatni olishda xatolik",
      });
    }
  },

  fetchServiceQueue: async (serviceId) => {
    try {
      set({ loading: true, error: null });

      const res = await queueService.getServiceQueue(serviceId);

      set({
        serviceQueue: res.data.queue,
        loading: false,
      });
    } catch (err: any) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Navbatlar ro'yxatini olishda xatolik",
      });
    }
  },

  clearQueue: () =>
    set({
      myQueue: null,
      serviceQueue: [],
      error: null,
    }),
}));
