import api from './api';

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'donor' | 'farmer' | 'ngo' | 'user' | 'admin';
  avatar?: string;
  organization?: string;
  location?: string;
  phoneNumber?: string;
  isVerified: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
  organization?: string;
  location?: string;
  phoneNumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return {
      success: response.data.success,
      token: response.data.data.token,
      user: response.data.data.user
    };
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return {
      success: response.data.success,
      token: response.data.data.token,
      user: response.data.data.user
    };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  },

  updateDetails: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/updatedetails', data);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    return response.data.data.user;
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put('/auth/updatepassword', { currentPassword, newPassword });
  },

  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getStoredToken: (): string | null => {
    return localStorage.getItem('token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
