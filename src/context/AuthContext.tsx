'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, authService } from '@/services/api/auth';
import { getTokens, setTokens, refreshAccessToken } from '@/services/api/client';

interface AuthContextType {
  user: User | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const { access, refresh } = getTokens();
      
      if (!access || !refresh) {
        setIsLoading(false);
        return;
      }

      // Token is present, try to get the user profile
      try {
        const userProfile = await authService.getProfile();
        if (userProfile.user) {
          setUser(userProfile.user);
          setIsAuthenticated(true);
          return;
        }
      } catch (profileError) {
        // If profile fetch fails, try to refresh token
        try {
          await refreshAccessToken();
          // After refresh, try to get profile again
          const refreshedProfile = await authService.getProfile();
          if (refreshedProfile.user) {
            setUser(refreshedProfile.user);
            setIsAuthenticated(true);
            return;
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // If refresh fails, logout
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error('Auth initialization failed:', err);
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(data);
      
      if (response.error) {
        throw new Error(typeof response.error === 'string' ? response.error : 'Login failed');
      }

      // After successful login, fetch the user profile
      const userProfile = await authService.getProfile();
      if (userProfile.user) {
        setUser(userProfile.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Failed to get user profile');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
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
        throw new Error(typeof response.error === 'string' ? response.error : 'Google login failed');
      }

      // After successful login, fetch the user profile
      const userProfile = await authService.getProfile();
      if (userProfile.user) {
        setUser(userProfile.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Failed to get user profile');
      }
    } catch (err: any) {
      setError(err.message || 'Google login failed');
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
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
      
      if (response.error) {
        throw new Error(typeof response.error === 'string' ? response.error : 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        clearError,
        googleAuth,
      }}
    >
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
