import { apiClient } from '@/services/config/axios';

const BASE_URL = 'http://localhost:8000/api/v1/auth';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: {
    avatar: string | null;
    bio: string;
    values: string[];
    online_status: 'online' | 'offline';
    compatibility?: {
      overall: number;
    };
  };
}

export interface UserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export interface UserFilters {
  search?: string;
  values?: string[];
  interests?: string[];
  location?: string[];
  [key: string]: string | string[] | undefined;
}

const usersService = {
  getUsers: async (token: string, filters?: UserFilters): Promise<UserResponse> => {
    const queryString = filters 
      ? '?' + new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc[key] = Array.isArray(value) ? value.join(',') : value;
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : '';

    const response = await apiClient.get(`${BASE_URL}/users/${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default usersService;
