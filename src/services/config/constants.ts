export const API_BASE_URL = 'http://localhost:8000/api/v1';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register/',
    LOGIN: '/auth/token/',
    REFRESH: '/auth/token/refresh/',
    VERIFY_EMAIL: '/auth/verify-email/',
    GOOGLE: '/auth/google/',
  },
  PROFILE: {
    GET: '/accounts/profile/',
  },
  MATCHING: {
    ANSWERS: '/accounts/answers/',
    MATCHES: '/accounts/matches/',
    UPDATE_MATCH: (id: number) => `/accounts/matches/${id}/update/`,
  },
  QUESTIONS: {
    CATEGORIES: '/accounts/question-categories/',
  },
} as const;
