import { apiClient } from './client';
import { PricingPlan } from '@/types';

export interface PlanPayload {
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  highlighted: boolean;
}

export const plansApi = {
  // Public: Get all plans
  getPublicPlans: async () => {
    return apiClient<PricingPlan[]>('/plans', { cache: 'no-store' });
  },

  // Admin: Create plan
  createPlan: async (data: PlanPayload) => {
    return apiClient<PricingPlan>('/plans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin: Update plan
  updatePlan: async (id: string, data: Partial<PlanPayload>) => {
    return apiClient<PricingPlan>(`/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Admin: Delete plan
  deletePlan: async (id: string) => {
    return apiClient<{ id: string }>(`/plans/${id}`, {
      method: 'DELETE',
    });
  },
};
