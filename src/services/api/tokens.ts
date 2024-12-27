import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import Cookies from 'js-cookie';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// Function to get tokens
export const getTokens = () => ({
  access: Cookies.get(ACCESS_TOKEN_KEY),
  refresh: Cookies.get(REFRESH_TOKEN_KEY),
});

// Function to set tokens
export const setTokens = (access: string | null, refresh: string | null) => {
  if (access) {
    Cookies.set(ACCESS_TOKEN_KEY, access, { 
      secure: true,
      sameSite: 'strict',
      expires: 7 // 7 days
    });
  } else {
    Cookies.remove(ACCESS_TOKEN_KEY);
  }
  if (refresh) {
    Cookies.set(REFRESH_TOKEN_KEY, refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 30 // 30 days
    });
  } else {
    Cookies.remove(REFRESH_TOKEN_KEY);
  }
};

// Function to refresh token
export const refreshAccessToken = async () => {
  const { refresh } = getTokens();
  if (!refresh) throw new Error('No refresh token available');

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refresh_token: refresh,
    });

    const { access: newAccessToken, refresh: newRefreshToken } = response.data;
    setTokens(newAccessToken, newRefreshToken);
    return newAccessToken;
  } catch (error) {
    setTokens(null, null); // Clear tokens on error
    throw error;
  }
};
