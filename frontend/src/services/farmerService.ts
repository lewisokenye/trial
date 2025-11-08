import api from './api';

export interface Farmer {
  _id: string;
  user: string;
  farmName: string;
  farmSize: number;
  location: string;
  primaryCrops: string[];
  farmingExperience: string;
  farmingType: 'conventional' | 'organic' | 'sustainable' | 'permaculture' | 'hydroponic';
  certifications: string[];
  soilType?: string;
  irrigationMethod?: string;
  equipmentOwned: string[];
  marketingChannels: string[];
  contactNumber?: string;
  bankAccount?: string;
  farmAddress?: string;
  isVerified: boolean;
  verificationDocuments?: string[];
  farmerID: string;
  yieldHistory: YieldData[];
  createdAt: string;
  updatedAt: string;
}

export interface YieldData {
  crop: string;
  year: number;
  yield: number;
  area: number;
  quality: string;
  revenue: number;
  _id?: string;
}

export interface CreateFarmerData {
  farmName: string;
  farmSize: number;
  location: string;
  primaryCrops: string[];
  farmingExperience: string;
  farmingType?: 'conventional' | 'organic' | 'sustainable' | 'permaculture' | 'hydroponic';
  certifications?: string[];
  soilType?: string;
  irrigationMethod?: string;
  equipmentOwned?: string[];
  marketingChannels?: string[];
  contactNumber?: string;
  bankAccount?: string;
  farmAddress?: string;
}

const farmerService = {
  getFarmers: async (): Promise<Farmer[]> => {
    const response = await api.get('/farmers');
    return response.data.data || [];
  },

  getFarmer: async (id: string): Promise<Farmer> => {
    const response = await api.get(`/farmers/${id}`);
    return response.data.data;
  },

  createFarmer: async (data: CreateFarmerData): Promise<Farmer> => {
    const response = await api.post('/farmers', data);
    return response.data.data;
  },

  updateFarmer: async (id: string, data: Partial<CreateFarmerData>): Promise<Farmer> => {
    const response = await api.put(`/farmers/${id}`, data);
    return response.data.data;
  },

  deleteFarmer: async (id: string): Promise<void> => {
    await api.delete(`/farmers/${id}`);
  },

  getMyFarmerProfile: async (): Promise<Farmer> => {
    const response = await api.get('/farmers/me/profile');
    return response.data.data;
  },

  addYieldData: async (id: string, yieldData: YieldData): Promise<Farmer> => {
    const response = await api.post(`/farmers/${id}/yields`, yieldData);
    return response.data.data;
  },
};

export default farmerService;
