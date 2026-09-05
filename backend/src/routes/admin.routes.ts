import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// GET /api/admin/stats (Admin Only)
router.get('/stats', authenticateToken, requireAdmin, getAdminStats);

export default router;
