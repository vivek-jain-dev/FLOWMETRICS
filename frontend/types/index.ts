export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface PricingPlan {
  _id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  highlighted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalPlans: number;
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  totalUsers: number;
  recentPosts: {
    _id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    featured: boolean;
    author: string;
    createdAt: string;
  }[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: { field: string; message: string }[];
}
