import apiClient, { setTokens } from './client';
import { API_BASE_URL } from '../config/constants';

const TOKEN_KEY = 'kelibe_token';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  profile: {
    bio?: string;
    location?: string;
    profile_image?: string;
  } | null;
}

interface AuthResponse {
  refresh?: string | null;
  access?: string | null;
  error?: string | Record<string, string[]>;
  refresh_token?: string | null;
  user?: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  password2: string;
}

const isBrowser = typeof window !== 'undefined';

const setAuthToken = (token: string) => {
  if (isBrowser) {
    localStorage.setItem(TOKEN_KEY, token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const clearAuthToken = () => {
  if (isBrowser) {
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

const getAuthToken = () => {
  if (isBrowser) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token;
  }
  return null;
};

export const authService = {
  async init(): Promise<void> {
    // Initialization is now handled by the API client
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/register/`, data);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || 'Registration failed'
      };
    }
  },

  async verifyEmail(email: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/verify-email/`, {
        email,
        otp
      });
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || 'Email verification failed'
      };
    }
  },

  async resendOtp(email: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/resend-otp/`, {
        email
      });
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || 'OTP resend failed'
      };
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/token/`, data);
      if (response.data.access && response.data.refresh) {
        setTokens(response.data.access, response.data.refresh);
      }
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error);
      return {
        error: error.response?.data?.detail || error.response?.data || 'Login failed'
      };
    }
  },

  async googleAuth(credential: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/google/`, {
        credential
      });
      if (response.data.access && response.data.refresh) {
        setTokens(response.data.access, response.data.refresh);
      }
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || 'Google authentication failed'
      };
    }
  },

  async refreshToken(refresh: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`${API_BASE_URL}/auth/token/refresh/`, {
        refresh
      });
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data || 'Token refresh failed'
      };
    }
  },

  async getProfile(): Promise<AuthResponse> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }
      const response = await apiClient.get(`${API_BASE_URL}/auth/profile/`);
      console.log('response from getProfile in api:', response.data);
      return {
        user: response.data,
        access: token,
        refresh: localStorage.getItem('kelibe_refresh_token')
      };
    } catch (error: any) {
      clearAuthToken(); // Clear invalid token
      throw error;
    }
  },

  async updateProfile(data: Partial<User>): Promise<AuthResponse> {
    try {
      const response = await apiClient.patch(`${API_BASE_URL}/auth/profile/`, data);
      return { user: response.data };
    } catch (error: any) {
      return {
        error: error.response?.data || 'Failed to update profile'
      };
    }
  },

  async logout() {
    try {
      await apiClient.post(`${API_BASE_URL}/auth/logout/`);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearAuthToken();
    }
  },

  async validateToken(): Promise<boolean> {
    try {
      const token = getAuthToken();
      if (!token) return false;
      
      const response = await apiClient.post(`${API_BASE_URL}/auth/token/verify/`, {
        token
      });
      return response.status === 200;
    } catch (error) {
      clearAuthToken(); // Clear invalid token
      return false;
    }
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  }
};

// Initialize auth service
authService.init();
