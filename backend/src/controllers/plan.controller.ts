import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { PricingPlan } from '../models/plan.model';

export let inMemoryPlans = [
  {
    _id: 'default-starter',
    name: 'Starter',
    price: 19,
    billingCycle: 'monthly',
    highlighted: false,
    features: [
      'Up to 5 team members',
      'Core productivity metrics',
      'Weekly velocity reports',
      'Slack & GitHub integration',
      '30-day data retention',
      'Standard community support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'default-pro',
    name: 'Team Pro',
    price: 49,
    billingCycle: 'monthly',
    highlighted: true,
    features: [
      'Up to 25 team members',
      'Real-time focus & workload analytics',
      'Automated sprint velocity forecasts',
      'Deep Jira, Linear & GitLab sync',
      'Custom workload alert thresholds',
      '1-year data history & export',
      'Priority email & Slack support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'default-enterprise',
    name: 'Enterprise',
    price: 129,
    billingCycle: 'monthly',
    highlighted: false,
    features: [
      'Unlimited team members',
      'Custom predictive AI productivity modeling',
      'Cross-department capacity planning',
      'Dedicated Success Manager',
      'SSO & SAML authentication',
      'Custom audit logs & 99.99% SLA',
      '24/7 dedicated engineering support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Public: Get all plans
export const getPublicPlans = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const plans = await PricingPlan.find().sort({ price: 1 });
        if (plans && plans.length > 0) {
          res.status(200).json({
            success: true,
            count: plans.length,
            data: plans,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    res.status(200).json({
      success: true,
      count: inMemoryPlans.length,
      data: inMemoryPlans,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create a new plan
export const createPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, billingCycle, features, highlighted } = req.body;

    if (mongoose.connection.readyState === 1) {
      try {
        const plan = await PricingPlan.create({
          name,
          price,
          billingCycle,
          features,
          highlighted,
        });

        res.status(201).json({
          success: true,
          message: 'Pricing plan created successfully',
          data: plan,
        });
        return;
      } catch (dbErr) {
        // Fallback below
      }
    }

    const newPlan = {
      _id: `plan-${Date.now()}`,
      name,
      price: Number(price),
      billingCycle: billingCycle || 'monthly',
      features: features || [],
      highlighted: Boolean(highlighted),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryPlans.push(newPlan);

    res.status(201).json({
      success: true,
      message: 'Pricing plan created successfully',
      data: newPlan,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update existing plan
export const updatePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const plan = await PricingPlan.findByIdAndUpdate(
          id,
          { ...req.body, updatedAt: new Date() },
          { new: true, runValidators: true }
        );

        if (plan) {
          res.status(200).json({
            success: true,
            message: 'Pricing plan updated successfully',
            data: plan,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const idx = inMemoryPlans.findIndex((p) => p._id === id);
    if (idx !== -1) {
      inMemoryPlans[idx] = {
        ...inMemoryPlans[idx],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };

      res.status(200).json({
        success: true,
        message: 'Pricing plan updated successfully',
        data: inMemoryPlans[idx],
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: 'Pricing plan not found',
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete plan
export const deletePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const plan = await PricingPlan.findByIdAndDelete(id);
        if (plan) {
          res.status(200).json({
            success: true,
            message: 'Pricing plan deleted successfully',
            data: { id: plan._id },
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const idx = inMemoryPlans.findIndex((p) => p._id === id);
    if (idx !== -1) {
      inMemoryPlans.splice(idx, 1);
      res.status(200).json({
        success: true,
        message: 'Pricing plan deleted successfully',
        data: { id },
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: 'Pricing plan not found',
    });
  } catch (error) {
    next(error);
  }
};
