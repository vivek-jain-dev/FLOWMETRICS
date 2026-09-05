import { apiClient } from './client';
import { AdminStats } from '@/types';

export const adminApi = {
  getStats: async () => {
    return apiClient<AdminStats>('/admin/stats', { cache: 'no-store' });
  },
};
