export interface UserRegistrationData {
  email: string;
  password: string;
  password2: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string | Record<string, string[]>;
  status: number;
}

export interface UserProfile {
  phone_number?: string;
  bio?: string;
  location?: string;
  avatar?: string | null;
  birth_date?: string;
  gender?: string;
  looking_for?: string;
  min_age_preference?: number;
  max_age_preference?: number;
  age?: number;
}

export interface EmailVerification {
  email: string;
  code: string;
}
