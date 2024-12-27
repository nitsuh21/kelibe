import { apiClient } from '@/services/config/axios';

const BASE_URL = 'http://localhost:8000/api/v1/profile';

export interface Category {
  id: number;
  title: string;
  description: string;
  options: string[];
}

const categoriesService = {
  // Get all categories
  getCategories: async (token: string): Promise<Category[]> => {
    const response = await apiClient.get(`${BASE_URL}/categories/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.results;
  },

  // Get category by ID
  getCategoryById: async (categoryId: number, token: string): Promise<Category> => {
    const response = await apiClient.get(`${BASE_URL}/categories/${categoryId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.results;
  }
};

export default categoriesService;
