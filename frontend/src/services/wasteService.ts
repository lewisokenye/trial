import api from './api';

export interface WasteEntry {
  _id: string;
  user: string;
  wasteType: string;
  quantity: number;
  unit: string;
  reason: string;
  preventable: boolean;
  estimatedValue: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpiryItem {
  _id: string;
  user: string;
  itemName: string;
  category: string;
  purchaseDate: string;
  expiryDate: string;
  quantity: string;
  location: string;
  status: 'fresh' | 'expiring-soon' | 'expired';
  notificationSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WasteAnalytics {
  totalWaste: number;
  preventableWaste: number;
  wasteValue: number;
  wasteByType: Record<string, number>;
  wasteTrend: Array<{ date: string; amount: number }>;
}

const wasteService = {
  getWasteEntries: async (): Promise<WasteEntry[]> => {
    const response = await api.get('/waste');
    return response.data.data || [];
  },

  getWasteEntry: async (id: string): Promise<WasteEntry> => {
    const response = await api.get(`/waste/${id}`);
    return response.data.data;
  },

  createWasteEntry: async (data: Partial<WasteEntry>): Promise<WasteEntry> => {
    const response = await api.post('/waste', data);
    return response.data.data;
  },

  updateWasteEntry: async (id: string, data: Partial<WasteEntry>): Promise<WasteEntry> => {
    const response = await api.put(`/waste/${id}`, data);
    return response.data.data;
  },

  deleteWasteEntry: async (id: string): Promise<void> => {
    await api.delete(`/waste/${id}`);
  },

  getWasteAnalytics: async (): Promise<WasteAnalytics> => {
    const response = await api.get('/waste/analytics/overview');
    return response.data.data || {};
  },

  getExpiryItems: async (): Promise<ExpiryItem[]> => {
    const response = await api.get('/waste/expiry');
    return response.data.data || [];
  },

  createExpiryItem: async (data: Partial<ExpiryItem>): Promise<ExpiryItem> => {
    const response = await api.post('/waste/expiry', data);
    return response.data.data;
  },

  updateExpiryItem: async (id: string, data: Partial<ExpiryItem>): Promise<ExpiryItem> => {
    const response = await api.put(`/waste/expiry/${id}`, data);
    return response.data.data;
  },

  deleteExpiryItem: async (id: string): Promise<void> => {
    await api.delete(`/waste/expiry/${id}`);
  },
};

export default wasteService;
