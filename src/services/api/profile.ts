import { AxiosError } from 'axios';
import { apiClient } from './client';
import { API_BASE_URL } from '../config/constants';

export interface Question {
  user_response: any;
  id: number;
  category: number;
  text: string;
  question_type: 'short_answer' | 'single_choice' | 'multiple_choice' | 'scale' | 'boolean';
  required: boolean;
  order: number;
  options?: string[];
  min_value?: number;
  max_value?: number;
}

export interface UserResponse {
  id: number;
  question: number;
  response: any;
  created_at: string;
  updated_at: string;
}

export interface Category {
  name: string;
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  completion_percentage: number;
  questions: Question[];
  user_responses?: Record<number, UserResponse>;
}

export interface BulkUpdateResponse {
  category_id: string | number;
  responses: Array<{
    question: number;
    response: any;
  }>;
}

export interface UserProfile {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  completion_percentage: number;
  categories?: Category[];
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar?: File;
}

export interface ErrorResponse {
  detail?: string;
  [key: string]: any;
}

const profileService = {
  // Profile
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get<UserProfile>(`${API_BASE_URL}/profile/`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to get profile');
    }
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    try {
      const response = await apiClient.patch<UserProfile>(`${API_BASE_URL}/profile/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to update profile');
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      console.log('Making request to:', `${API_BASE_URL}/profile/categories/`);
      const response = await apiClient.get<{ results: Category[] }>(`${API_BASE_URL}/profile/categories/`);
      console.log("API Response:", response);
      console.log("Found Categories:", response.data);
      return response.data.results || [];
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Error in getCategories:", axiosError);
      throw axiosError;
    }
  },

  getCategoryDetail: async (categoryId: string | number): Promise<Category> => {
    try {
      const response = await apiClient.get<Category>(`${API_BASE_URL}/profile/categories/${categoryId}/`);
      console.log("Category Detail:", response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to get category detail');
    }
  },

  // Questions
  getQuestions: async (categoryId: string | number): Promise<Question[]> => {
    try {
      const response = await apiClient.get<Question[]>(`${API_BASE_URL}/profile/categories/${categoryId}/questions/`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to get questions');
    }
  },

  // User Responses
  getUserResponses: async (): Promise<UserResponse[]> => {
    try {
      const response = await apiClient.get<UserResponse[]>(`${API_BASE_URL}/profile/responses/`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to get user responses');
    }
  },

  createResponse: async (questionId: number, response: any): Promise<UserResponse> => {
    try {
      const apiResponse = await apiClient.post<UserResponse>(`${API_BASE_URL}/profile/responses/`, {
        question: questionId,
        response,
      });
      return apiResponse.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to create response');
    }
  },

  updateResponse: async (responseId: number, questionId: number, response: any): Promise<UserResponse> => {
    try {
      const apiResponse = await apiClient.patch<UserResponse>(`${API_BASE_URL}/profile/responses/${responseId}/`, {
        question: questionId,
        response,
      });
      return apiResponse.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to update response');
    }
  },

  deleteResponse: async (responseId: number): Promise<void> => {
    try {
      await apiClient.delete(`${API_BASE_URL}/profile/responses/${responseId}/`);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to delete response');
    }
  },

  bulkUpdateResponses: async (data: BulkUpdateResponse): Promise<Category> => {
    try {
      console.log('Making bulk update request with data:', data);
      const response = await apiClient.post<Category>(`${API_BASE_URL}/profile/responses/bulk_update/`, data);
      console.log('Bulk update response:', response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Bulk update error:', axiosError.response?.data);
      throw new Error(axiosError.response?.data?.detail || axiosError.message || 'Failed to bulk update responses');
    }
  },
};

export default profileService;
