import { apiClient } from './client';
import { BlogPost } from '@/types';

export interface BlogPostPayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author?: string;
  coverImage: string;
  tags?: string[];
  featured?: boolean;
  status?: 'draft' | 'published';
}

export const blogApi = {
  // Public: Get published blog posts
  getPublicPosts: async () => {
    return apiClient<BlogPost[]>('/blog', { cache: 'no-store' });
  },

  // Public: Get published blog post by slug
  getPostBySlug: async (slug: string) => {
    return apiClient<BlogPost>(`/blog/${slug}`, { cache: 'no-store' });
  },

  // Admin: Get all posts (including drafts)
  getAdminPosts: async () => {
    return apiClient<BlogPost[]>('/blog/admin/all', { cache: 'no-store' });
  },

  // Admin: Get post by ID for editing
  getAdminPostById: async (id: string) => {
    return apiClient<BlogPost>(`/blog/admin/post/${id}`, { cache: 'no-store' });
  },

  // Admin: Create post
  createPost: async (data: BlogPostPayload) => {
    return apiClient<BlogPost>('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin: Update post
  updatePost: async (id: string, data: Partial<BlogPostPayload>) => {
    return apiClient<BlogPost>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Admin: Delete post
  deletePost: async (id: string) => {
    return apiClient<{ id: string }>(`/blog/${id}`, {
      method: 'DELETE',
    });
  },
};
