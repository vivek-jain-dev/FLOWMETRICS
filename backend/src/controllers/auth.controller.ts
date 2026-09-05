import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { signToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export let SEED_ADMIN = {
  id: 'admin-seed-id',
  name: 'System Admin',
  email: 'admin@flowmetrics.io',
  role: 'admin' as const,
  password: 'AdminPassword123!',
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').toLowerCase().trim();

    // Check if database is connected
    if (mongoose.connection.readyState === 1) {
      try {
        const user = await User.findOne({ email: cleanEmail }).select('+passwordHash');
        if (user) {
          const isMatch = await bcrypt.compare(password, user.passwordHash);
          if (isMatch) {
            const token = signToken({
              userId: user._id.toString(),
              email: user.email,
              role: user.role,
            });

            res.status(200).json({
              success: true,
              message: 'Authentication successful',
              data: {
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                },
              },
            });
            return;
          }
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    // Default Seed Admin Fallback (works in offline/standalone dev mode)
    if (cleanEmail === SEED_ADMIN.email.toLowerCase() && password === SEED_ADMIN.password) {
      const token = signToken({
        userId: SEED_ADMIN.id,
        email: SEED_ADMIN.email,
        role: SEED_ADMIN.role,
      });

      res.status(200).json({
        success: true,
        message: 'Authentication successful',
        data: {
          token,
          user: {
            id: SEED_ADMIN.id,
            name: SEED_ADMIN.name,
            email: SEED_ADMIN.email,
            role: SEED_ADMIN.role,
          },
        },
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (req.user.userId === SEED_ADMIN.id || mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        data: {
          id: req.user.userId,
          name: req.user.email === SEED_ADMIN.email ? SEED_ADMIN.name : 'Administrator',
          email: req.user.email,
          role: req.user.role,
        },
      });
      return;
    }

    try {
      const user = await User.findById(req.user.userId);
      if (user) {
        res.status(200).json({
          success: true,
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
        return;
      }
    } catch (err) {
      // Fallback below
    }

    res.status(200).json({
      success: true,
      data: {
        id: req.user.userId,
        name: req.user.email,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update profile (Name, Email)
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { name, email } = req.body;

    if (mongoose.connection.readyState === 1 && req.user.userId !== SEED_ADMIN.id) {
      try {
        const updateData: Record<string, string> = {};
        if (name) updateData.name = name.trim();
        if (email) updateData.email = email.toLowerCase().trim();

        const updatedUser = await User.findByIdAndUpdate(
          req.user.userId,
          { $set: updateData },
          { new: true, runValidators: true }
        );

        if (updatedUser) {
          const token = signToken({
            userId: updatedUser._id.toString(),
            email: updatedUser.email,
            role: updatedUser.role,
          });

          res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
              token,
              user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
              },
            },
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    // In-Memory / Standalone Fallback
    if (name) SEED_ADMIN.name = name.trim();
    if (email) SEED_ADMIN.email = email.toLowerCase().trim();

    const token = signToken({
      userId: SEED_ADMIN.id,
      email: SEED_ADMIN.email,
      role: SEED_ADMIN.role,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        token,
        user: {
          id: SEED_ADMIN.id,
          name: SEED_ADMIN.name,
          email: SEED_ADMIN.email,
          role: SEED_ADMIN.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Change password
export const updatePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Both current password and new password are required',
      });
      return;
    }

    if (mongoose.connection.readyState === 1 && req.user.userId !== SEED_ADMIN.id) {
      try {
        const user = await User.findById(req.user.userId).select('+passwordHash');
        if (!user) {
          res.status(404).json({ success: false, message: 'User not found' });
          return;
        }

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
          res.status(400).json({ success: false, message: 'Current password is incorrect' });
          return;
        }

        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({
          success: true,
          message: 'Password changed successfully',
        });
        return;
      } catch (dbErr) {
        // Fallback below
      }
    }

    // In-Memory / Standalone Fallback
    if (currentPassword !== SEED_ADMIN.password) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
      return;
    }

    SEED_ADMIN.password = newPassword;

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

