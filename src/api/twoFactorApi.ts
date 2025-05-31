import { api } from '../services/api';

interface TwoFactorSetupResponse {
  otpauth_url: string;
  secret: string;
}

interface TwoFactorVerifyResponse {
  success: boolean;
  recovery_codes?: string[];
}

export const twoFactorApi = {
  setup: async (): Promise<TwoFactorSetupResponse> => {
    try {
      const response = await api.post('/api/2fa/setup');
      return response.data;
    } catch (error) {
      console.error('2FA setup error:', error);
      throw error;
    }
  },
  
  verifyAndEnable: async (token: string): Promise<TwoFactorVerifyResponse> => {
    try {
      const response = await api.post('/api/2fa/verify', { token });
      return response.data;
    } catch (error) {
      console.error('2FA verify and enable error:', error);
      throw error;
    }
  },
  
  disable: async (token: string): Promise<{ success: boolean }> => {
    try {
      const response = await api.post('/api/2fa/disable', { token });
      return response.data;
    } catch (error) {
      console.error('2FA disable error:', error);
      throw error;
    }
  },
  
  verifyToken: async (twoFactorToken: string, token: string): Promise<{ token: string; refreshToken: string; user: any }> => {
    try {
      const response = await api.post('/api/2fa/verify-login', {
        twoFactorToken,
        token
      });
      
      const { token: authToken, refreshToken, user } = response.data;
      localStorage.setItem('token', authToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return response.data;
    } catch (error) {
      console.error('2FA login verification error:', error);
      throw error;
    }
  },
  
  verifyRecoveryCode: async (twoFactorToken: string, recoveryCode: string): Promise<{ token: string; refreshToken: string; user: any }> => {
    try {
      const response = await api.post('/api/2fa/verify-recovery', {
        twoFactorToken,
        recoveryCode
      });
      
      const { token, refreshToken, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      return response.data;
    } catch (error) {
      console.error('2FA recovery code verification error:', error);
      throw error;
    }
  },
  
  getRecoveryCodes: async (): Promise<{ recoveryCodes: string[] }> => {
    try {
      const response = await api.get('/api/2fa/recovery-codes');
      return response.data;
    } catch (error) {
      console.error('Get recovery codes error:', error);
      throw error;
    }
  },
  
  generateNewRecoveryCodes: async (token: string): Promise<{ recoveryCodes: string[] }> => {
    try {
      const response = await api.post('/api/2fa/generate-recovery-codes', { token });
      return response.data;
    } catch (error) {
      console.error('Generate new recovery codes error:', error);
      throw error;
    }
  }
};