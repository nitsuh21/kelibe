import { AxiosError } from 'axios';
import { API_BASE_URL } from '../config/constants';
import { apiClient } from './client';
import { getTokens, setTokens } from './tokens';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
}

export interface AuthResponse {
  error?: any;
  access: string;
  refresh: string;
  user: User;
  message?: string;
  email_verified?: boolean;
}

export interface ErrorResponse {
  detail?: string;
  [key: string]: any;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register/', data);
      const { access, refresh } = response.data;
      setTokens(access, refresh);
      return {
        ...response.data,
        message: 'Registration successful. Please check your email for verification code.'
      };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      let errorMessage = 'Registration failed';

      if (errorData?.detail) {
        errorMessage = errorData.detail;
      } else if (errorData?.email?.[0]) {
        errorMessage = errorData.email[0];
      }

      throw new Error(errorMessage);
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/token/', data);
      const { access, refresh } = response.data;
      setTokens(access, refresh);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || 'Login failed');
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/profile/');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || 'Failed to fetch profile');
    }
  },

  async googleAuth(credential: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/google/', {
        credential,
      });
      const { access, refresh } = response.data;
      setTokens(access, refresh);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || 'Google authentication failed');
    }
  },

  logout() {
    setTokens(null, null);
  },

  isAuthenticated(): boolean {
    const { access } = getTokens();
    return !!access;
  },
};
