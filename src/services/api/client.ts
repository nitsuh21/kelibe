import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/constants';
import { getTokens, refreshAccessToken, setTokens, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './tokens';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { access } = getTokens();
    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens but don't redirect (let the auth context handle it)
        setTokens(null, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export {
  getTokens,
  setTokens,
  refreshAccessToken,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
};

export default apiClient;
