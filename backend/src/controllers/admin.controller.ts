import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { PricingPlan } from '../models/plan.model';
import { BlogPost } from '../models/blog.model';
import { User } from '../models/user.model';
import { inMemoryPlans } from './plan.controller';
import { inMemoryBlogPosts } from './blog.controller';

export const getAdminStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const [
          totalPlans,
          totalPosts,
          publishedPosts,
          draftPosts,
          featuredPosts,
          totalUsers,
          recentPosts,
        ] = await Promise.all([
          PricingPlan.countDocuments(),
          BlogPost.countDocuments(),
          BlogPost.countDocuments({ status: 'published' }),
          BlogPost.countDocuments({ status: 'draft' }),
          BlogPost.countDocuments({ featured: true }),
          User.countDocuments(),
          BlogPost.find().sort({ createdAt: -1 }).limit(5).select('title slug status featured createdAt author'),
        ]);

        res.status(200).json({
          success: true,
          data: {
            totalPlans,
            totalPosts,
            publishedPosts,
            draftPosts,
            featuredPosts,
            totalUsers,
            recentPosts,
          },
        });
        return;
      } catch (dbErr) {
        // Fallback below
      }
    }

    // In-memory stats fallback
    const published = inMemoryBlogPosts.filter((p) => p.status === 'published').length;
    const drafts = inMemoryBlogPosts.filter((p) => p.status === 'draft').length;
    const featured = inMemoryBlogPosts.filter((p) => p.featured).length;

    res.status(200).json({
      success: true,
      data: {
        totalPlans: inMemoryPlans.length,
        totalPosts: inMemoryBlogPosts.length,
        publishedPosts: published,
        draftPosts: drafts,
        featuredPosts: featured,
        totalUsers: 1,
        recentPosts: inMemoryBlogPosts.slice(0, 5).map((p) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          status: p.status,
          featured: p.featured,
          createdAt: p.createdAt,
          author: p.author,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
