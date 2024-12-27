export const API_BASE_URL = 'http://localhost:8000/api/v1';
export const FRONTEND_URL = 'http://localhost:3000';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/register/',
    LOGIN: '/token/',
    REFRESH: '/token/refresh/',
    VERIFY_EMAIL: '/verify-email/',
    GOOGLE: '/google/',
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
