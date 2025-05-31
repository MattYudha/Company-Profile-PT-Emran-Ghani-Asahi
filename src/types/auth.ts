export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  created_at: string;
  two_factor_enabled: boolean;
  streak: number;
  completed_activities: number;
  risk_score_current: number;
}

export interface LoginResponse {
  requiresTwoFactor: boolean;
  userData?: User;
  twoFactorToken?: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

export interface TwoFactorStatus {
  enabled: boolean;
  verified: boolean;
}