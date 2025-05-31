import { api } from '../services/api';
import { User, LoginResponse, RegisterData, TwoFactorStatus } from '../types/auth';

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, refreshToken, requiresTwoFactor, twoFactorToken, user } = response.data;
      
      if (!requiresTwoFactor) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      return { 
        requiresTwoFactor: requiresTwoFactor || false,
        userData: user,
        twoFactorToken
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (full_name: string, email: string, password: string): Promise<User> => {
    try {
      const registerData: RegisterData = { full_name, email, password };
      const response = await api.post('/api/auth/register', registerData);
      const { token, refreshToken, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const response = await api.get('/api/users/profile');
      return response.data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return null;
    }
  },
  
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },
  
  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      await api.post('/api/auth/request-password-reset', { email });
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },
  
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post(`/api/auth/reset-password`, {
        token,
        newPassword
      });
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },
  
  getTwoFactorStatus: async (): Promise<TwoFactorStatus> => {
    try {
      const response = await api.get('/api/2fa/status');
      return response.data;
    } catch (error) {
      console.error('Get 2FA status error:', error);
      throw error;
    }
  }
};