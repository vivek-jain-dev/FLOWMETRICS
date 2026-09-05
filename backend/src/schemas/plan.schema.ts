import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Plan name is required' })
      .min(2, 'Plan name must be at least 2 characters')
      .max(100, 'Plan name cannot exceed 100 characters')
      .trim(),
    price: z
      .number({ required_error: 'Price is required' })
      .min(0, 'Price must be greater than or equal to 0'),
    billingCycle: z.enum(['monthly', 'yearly']).default('monthly'),
    features: z
      .array(z.string().min(1, 'Feature item cannot be empty'))
      .min(1, 'At least one feature is required'),
    highlighted: z.boolean().default(false),
  }),
});

export const updatePlanSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  }),
  body: z.object({
    name: z.string().min(2).max(100).trim().optional(),
    price: z.number().min(0).optional(),
    billingCycle: z.enum(['monthly', 'yearly']).optional(),
    features: z.array(z.string().min(1)).min(1).optional(),
    highlighted: z.boolean().optional(),
  }),
});

export const planIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  }),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>['body'];
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>['body'];
