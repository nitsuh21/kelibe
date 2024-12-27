'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, authService } from '@/services/api/auth';
import { getTokens, setTokens, refreshAccessToken } from '@/services/api/tokens';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  googleAuth: (credential: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const { access, refresh } = getTokens();
      console.log('Access token:', access);
      console.log('Refresh token:', refresh);
      
      if (!access || !refresh) {
        setIsLoading(false);
        return;
      }

      try {
        setToken(access);
        const userProfile = await authService.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
      } catch (profileError) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            setToken(newToken);
            const refreshedProfile = await authService.getProfile();
            setUser(refreshedProfile);
            setIsAuthenticated(true);
          } else {
            throw new Error('Failed to refresh token');
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          handleLogout();
        }
      }
    } catch (err) {
      console.error('Auth initialization failed:', err);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(data);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.email_verified) {
        throw new Error('Please verify your email first');
      }

      const { access } = getTokens();
      if (access) {
        setToken(access);
        const userProfile = await authService.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
      } else {
        throw new Error('No access token received');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const googleAuth = async (credential: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.googleAuth(credential);
      
      if (response.error) {
        throw new Error(response.error);
      }

      const { access } = getTokens();
      if (access) {
        setToken(access);
        const userProfile = await authService.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
      } else {
        throw new Error('No access token received');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout: handleLogout,
    clearError,
    googleAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
