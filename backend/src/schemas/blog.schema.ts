import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(3, 'Title must be at least 3 characters')
      .max(200, 'Title cannot exceed 200 characters')
      .trim(),
    slug: z
      .string()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
      .optional(),
    excerpt: z
      .string({ required_error: 'Excerpt is required' })
      .min(10, 'Excerpt must be at least 10 characters')
      .max(500, 'Excerpt cannot exceed 500 characters')
      .trim(),
    content: z
      .string({ required_error: 'Content is required' })
      .min(20, 'Content must be at least 20 characters'),
    author: z.string().min(2).max(100).default('Flowmetrics Team').optional(),
    coverImage: z
      .string({ required_error: 'Cover image URL is required' })
      .url('Cover image must be a valid URL'),
    tags: z.array(z.string().trim()).default([]).optional(),
    featured: z.boolean().default(false).optional(),
    status: z.enum(['draft', 'published']).default('draft').optional(),
  }),
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  }),
  body: z.object({
    title: z.string().min(3).max(200).trim().optional(),
    slug: z
      .string()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
      .optional(),
    excerpt: z.string().min(10).max(500).trim().optional(),
    content: z.string().min(20).optional(),
    author: z.string().min(2).max(100).optional(),
    coverImage: z.string().url().optional(),
    tags: z.array(z.string().trim()).optional(),
    featured: z.boolean().optional(),
    status: z.enum(['draft', 'published']).optional(),
  }),
});

export const blogIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  }),
});

export const blogSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required'),
  }),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>['body'];
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>['body'];
