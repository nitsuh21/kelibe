import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/api/auth';
import { RootState } from '../store';

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  matches_count?: number;
  likes_count?: number;
  created_at?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('kelibe_token'),
  refresh_token: localStorage.getItem('kelibe_token'),
  isAuthenticated: !!localStorage.getItem('kelibe_token'),
  isLoading: false,
  error: null,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      if (response.error) {
        return rejectWithValue(response.error);
      }
      console.log("response from fetchUserProfile:", response);
      return response;  
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/token',
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      console.log("response from login:", response);
      
      if (response.error) {
        return rejectWithValue(response.error);
      }

      return response
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (credential: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.googleAuth(credential);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      // After successful login, fetch user profile
      if (response.access) {
        dispatch(fetchUserProfile());
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(profileData);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('kelibe_token');
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log('action.payload fetch', action.payload);
        state.isLoading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
          state.token = action.payload.access || state.token;
          state.refresh_token = action.payload.refresh || state.refresh_token;
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log('action.payload login fullfilled',action.payload)
        if (action.payload.access) {
          state.isAuthenticated = true;
          state.token = action.payload.access;
          localStorage.setItem('kelibe_token', action.payload.access);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.access) {
          state.isAuthenticated = true;
          state.token = action.payload.access;
          localStorage.setItem('kelibe_token', action.payload.access);
        }
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user && action.payload) {
          state.user = { 
            ...state.user, 
            ...action.payload 
          };
        }
      })
      // Logout
      .addCase(logout, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('kelibe_token');
      });
  },
});

export const { clearError, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
