import api from './api';

export interface Donation {
  _id: string;
  donor: string;
  type: 'food' | 'money';
  foodType?: string;
  quantity?: string;
  unit?: string;
  expiryDate?: string;
  pickupLocation?: string;
  description?: string;
  images?: string[];
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  transactionId?: string;
  status: 'pending' | 'approved' | 'collected' | 'delivered' | 'cancelled';
  recipient?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDonationData {
  type: 'food' | 'money';
  foodType?: string;
  quantity?: string;
  unit?: string;
  expiryDate?: string;
  pickupLocation?: string;
  description?: string;
  images?: string[];
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  notes?: string;
}

const donationService = {
  getDonations: async (): Promise<Donation[]> => {
    const response = await api.get('/donations');
    return response.data.data || [];
  },

  getDonation: async (id: string): Promise<Donation> => {
    const response = await api.get(`/donations/${id}`);
    return response.data.data;
  },

  createDonation: async (data: CreateDonationData): Promise<Donation> => {
    const response = await api.post('/donations', data);
    return response.data.data;
  },

  updateDonation: async (id: string, data: Partial<CreateDonationData>): Promise<Donation> => {
    const response = await api.put(`/donations/${id}`, data);
    return response.data.data;
  },

  deleteDonation: async (id: string): Promise<void> => {
    await api.delete(`/donations/${id}`);
  },

  getAvailableDonations: async (): Promise<Donation[]> => {
    const response = await api.get('/donations/available/food');
    return response.data.data || [];
  },
};

export default donationService;
