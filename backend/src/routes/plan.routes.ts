import { Router } from 'express';
import {
  getPublicPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from '../controllers/plan.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  createPlanSchema,
  updatePlanSchema,
  planIdParamSchema,
} from '../schemas/plan.schema';
import { writeLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public: GET /api/plans
router.get('/', getPublicPlans);

// Admin Only: POST /api/plans
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  writeLimiter,
  validate(createPlanSchema),
  createPlan
);

// Admin Only: PUT /api/plans/:id
router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  writeLimiter,
  validate(updatePlanSchema),
  updatePlan
);

// Admin Only: DELETE /api/plans/:id
router.delete(
  '/:id',
  authenticateToken,
  requireAdmin,
  writeLimiter,
  validate(planIdParamSchema),
  deletePlan
);

export default router;
