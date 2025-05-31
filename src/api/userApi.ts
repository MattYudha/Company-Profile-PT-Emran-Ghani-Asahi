import { api } from '../services/api';
import { User } from '../types/auth';

export const userApi = {
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get('/api/users/profile');
      return response.data.user;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put('/api/users/profile', userData);
      return response.data.user;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};