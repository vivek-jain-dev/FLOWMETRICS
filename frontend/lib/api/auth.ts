import { apiClient } from './client';
import { User } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (credentials: LoginPayload) => {
    return apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getMe: async () => {
    return apiClient<User>('/auth/me');
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    return apiClient<AuthResponse>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  updatePassword: async (payload: UpdatePasswordPayload) => {
    return apiClient<{ message: string }>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};

