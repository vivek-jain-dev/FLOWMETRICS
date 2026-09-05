import { Router } from 'express';
import {
  getPublicBlogPosts,
  getPublicBlogPostBySlug,
  getAdminBlogPosts,
  getAdminBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blog.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  createBlogSchema,
  updateBlogSchema,
  blogIdParamSchema,
  blogSlugParamSchema,
} from '../schemas/blog.schema';
import { writeLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public: GET /api/blog (published only)
router.get('/', getPublicBlogPosts);

// Public: GET /api/blog/:slug (published only)
router.get('/:slug', validate(blogSlugParamSchema), getPublicBlogPostBySlug);

// Admin Only: GET /api/blog/admin/all (all posts including drafts)
router.get(
  '/admin/all',
  authenticateToken,
  requireAdmin,
  getAdminBlogPosts
);

// Admin Only: GET /api/blog/admin/post/:id (single post for editing)
router.get(
  '/admin/post/:id',
  authenticateToken,
  requireAdmin,
  validate(blogIdParamSchema),
  getAdminBlogPostById
);

// Admin Only: POST /api/blog
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  writeLimiter,
  validate(createBlogSchema),
  createBlogPost
);

// Admin Only: PUT /api/blog/:id
router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  writeLimiter,
  validate(updateBlogSchema),
  updateBlogPost
);

// Admin Only: DELETE /api/blog/:id
router.delete(
  '/:id',
  authenticateToken,
  requireAdmin,
  writeLimiter,
  validate(blogIdParamSchema),
  deleteBlogPost
);

export default router;
