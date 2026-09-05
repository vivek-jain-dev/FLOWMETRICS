import { Router } from 'express';
import { login, getMe, updateProfile, updatePassword } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { loginSchema, updateProfileSchema, updatePasswordSchema } from '../schemas/auth.schema';
import { authLimiter } from '../middleware/rateLimiter';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// POST /api/auth/login (Rate-limited, Zod-validated)
router.post('/login', authLimiter, validate(loginSchema), login);

// GET /api/auth/me (Authenticated user profile)
router.get('/me', authenticateToken, getMe);

// PUT /api/auth/profile (Update Admin Name & Email)
router.put('/profile', authenticateToken, validate(updateProfileSchema), updateProfile);

// PUT /api/auth/password (Update Admin Password)
router.put('/password', authenticateToken, validate(updatePasswordSchema), updatePassword);

export default router;

