import { Router } from 'express';
import authRoutes from './auth.routes';
import planRoutes from './plan.routes';
import blogRoutes from './blog.routes';
import adminRoutes from './admin.routes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Flowmetrics API',
  });
});

router.use('/auth', authRoutes);
router.use('/plans', planRoutes);
router.use('/blog', blogRoutes);
router.use('/admin', adminRoutes);

export default router;
