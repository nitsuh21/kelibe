import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

const ACCESS_TOKEN_KEY = 'kelibe_token';
const REFRESH_TOKEN_KEY = 'kelibe_refresh_token';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get tokens
const getTokens = () => ({
  access: localStorage.getItem(ACCESS_TOKEN_KEY),
  refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
});

// Function to set tokens
const setTokens = (access: string | null, refresh: string | null) => {
  if (access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
  if (refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Function to refresh token
const refreshAccessToken = async () => {
  const { refresh } = getTokens();
  if (!refresh) throw new Error('No refresh token available');

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
      refresh,
    });
    
    if (response.data.access) {
      setTokens(response.data.access, refresh); // Keep the same refresh token
      return response.data.access;
    }
    throw new Error('No access token in refresh response');
  } catch (error) {
    // If refresh fails, clear all tokens
    setTokens(null, null);
    throw error;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const { access } = getTokens();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = '/auth/signin';
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
