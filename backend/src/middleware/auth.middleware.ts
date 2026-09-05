import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { User } from '../models/user.model';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication token is missing or malformed',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication token is missing',
      });
      return;
    }

    const decoded = verifyToken(token);
    
    // If seed admin or database is not connected, trust verified JWT token
    if (decoded.userId === 'admin-seed-id' || mongoose.connection.readyState !== 1) {
      req.user = decoded;
      return next();
    }

    try {
      // Verify that user still exists in database
      const userExists = await User.findById(decoded.userId);
      if (userExists) {
        req.user = {
          userId: userExists._id.toString(),
          email: userExists.email,
          role: userExists.role,
        };
        return next();
      }
    } catch (err) {
      // If DB read fails, fall back to decoded JWT payload
      req.user = decoded;
      return next();
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
    });
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access forbidden: Administrator privileges required',
    });
    return;
  }
  next();
};
