import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BlogPost } from '../models/blog.model';
import { slugify } from '../utils/slugify';

export interface InMemoryBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  status: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export let inMemoryBlogPosts: InMemoryBlogPost[] = [
  {
    _id: 'post-1',
    title: 'How Engineering Teams Measure True Deep Work Without Surveillance',
    slug: 'how-engineering-teams-measure-true-deep-work',
    excerpt: 'Learn how modern engineering leaders track focus hours and cognitive load without tracking keystrokes or intrusive surveillance.',
    content: `Engineering leadership in high-performing engineering organizations requires trust, clarity, and empirical telemetry rather than invasive surveillance.

### The Illusion of Activity
Many traditional productivity tools focus on active keystrokes, mouse movements, and screen captures. These metrics do not reflect true cognitive throughput or deep work. In fact, high-pressure surveillance incentivizes superficial motion rather than deep engineering problem-solving.

### Measuring Uninterrupted Flow
Flowmetrics focuses on **Focus Blocks**—periods where a developer works uninterrupted on complex tasks without meeting notifications, Slack pings, or context switches.

1. **Sprint Predictability**: Tracking on-time delivery across sprints.
2. **Context Switching Latency**: Understanding how many minutes are lost after each interruption.
3. **PR Review Velocity**: Measuring the cycle time from pull request opening to final review.

> "True productivity is measured by cognitive outcomes and sustained velocity, not continuous typing."`,
    author: 'Elena Rostova, VP of Engineering',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Leadership', 'Productivity', 'Culture'],
    featured: true,
    status: 'published',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'post-2',
    title: 'The Hidden Cost of Context Switching in Distributed Development',
    slug: 'the-hidden-cost-of-context-switching',
    excerpt: 'Every notification costs 23 minutes of refocusing time. Here is the mathematical framework for async-first workflows.',
    content: `In distributed teams, the cost of context switching is often invisible until velocity plummets and burnout spikes.

### The Mathematics of Refocusing
Studies in cognitive psychology reveal that returning to deep flow after a notification takes an average of **23 minutes and 15 seconds**.

When engineers receive 10-15 random interruptions throughout a day:
- Net focused hours drop from 6.5 hours to under 2 hours.
- Defect escape rates increase by 38%.
- Mental fatigue and cognitive friction compound rapidly.

### Adopting Async-First Principles
- Batch reviews into dedicated daily time windows.
- Replace ad-hoc status calls with automated asynchronous telemetry.
- Respect focus block thresholds across time zones.`,
    author: 'Marcus Vance, Principal Architect',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    tags: ['Async Work', 'Remote Teams', 'Focus'],
    featured: true,
    status: 'published',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'post-3',
    title: 'Building a High-Trust Culture with Transparent Workload Analytics',
    slug: 'building-a-high-trust-culture-with-transparent-workload-analytics',
    excerpt: 'Why top engineering organizations use team-level insights to protect bandwidth and prevent sprint fatigue.',
    content: `High trust is the foundation of high-velocity engineering organizations. When analytics are applied to protect team bandwidth rather than micromanage individuals, team satisfaction and output both skyrocket.

### Team-Level vs Individual-Level Telemetry
Flowmetrics aggregates data at the team and sprint level. This allows engineering managers to:
- Identify systemic bottlenecks in the CI/CD pipeline.
- Prevent sprint overcommitment before burnout happens.
- Justify hiring and infrastructure investments with empirical data.

### Sustainable Engineering Cadence
A steady, predictable pace of shipping code prevents technical debt accumulation and keeps team morale at its peak.`,
    author: 'Sarah Jenkins, Head of People Ops',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    tags: ['Culture', 'Management', 'Team Health'],
    featured: false,
    status: 'published',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Public: Get only published blog posts (Featured first, then most recent)
export const getPublicBlogPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const posts = await BlogPost.find({ status: 'published' })
          .select('-__v')
          .sort({ featured: -1, publishedAt: -1, createdAt: -1 });

        if (posts && posts.length > 0) {
          res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const published = inMemoryBlogPosts.filter((p) => p.status === 'published');
    res.status(200).json({
      success: true,
      count: published.length,
      data: published,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get single published blog post by slug
export const getPublicBlogPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const cleanSlug = (slug || '').toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      try {
        const post = await BlogPost.findOne({
          slug: cleanSlug,
          status: 'published',
        }).select('-__v');

        if (post) {
          res.status(200).json({
            success: true,
            data: post,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const post = inMemoryBlogPosts.find(
      (p) => p.slug === cleanSlug && p.status === 'published'
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found or has not been published',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all posts including drafts
export const getAdminBlogPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        if (posts && posts.length > 0) {
          res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    res.status(200).json({
      success: true,
      count: inMemoryBlogPosts.length,
      data: inMemoryBlogPosts,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get single post by ID (for editing)
export const getAdminBlogPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const post = await BlogPost.findById(id);
        if (post) {
          res.status(200).json({
            success: true,
            data: post,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const post = inMemoryBlogPosts.find((p) => p._id === id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create new blog post
export const createBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, slug, excerpt, content, author, coverImage, tags, featured, status } = req.body;

    let finalSlug = slug ? slugify(slug) : slugify(title);

    if (mongoose.connection.readyState === 1) {
      try {
        const existingPost = await BlogPost.findOne({ slug: finalSlug });
        if (existingPost) {
          finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
        }

        const isPublished = status === 'published';
        const publishedAt = isPublished ? new Date() : undefined;

        const newPost = await BlogPost.create({
          title,
          slug: finalSlug,
          excerpt,
          content,
          author: author || 'Flowmetrics Team',
          coverImage: coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          tags: tags || [],
          featured: Boolean(featured),
          status: status || 'draft',
          publishedAt,
        });

        res.status(201).json({
          success: true,
          message: 'Blog post created successfully',
          data: newPost,
        });
        return;
      } catch (dbErr) {
        // Fallback below
      }
    }

    const isPublished = status === 'published';
    const newPost = {
      _id: `post-${Date.now()}`,
      title,
      slug: finalSlug,
      excerpt: excerpt || '',
      content: content || '',
      author: author || 'Flowmetrics Team',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      tags: tags || ['Engineering'],
      featured: Boolean(featured),
      status: status || 'draft',
      publishedAt: isPublished ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryBlogPosts.unshift(newPost);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update existing blog post
export const updateBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (mongoose.connection.readyState === 1) {
      try {
        if (updateData.slug) {
          updateData.slug = slugify(updateData.slug);
          const duplicate = await BlogPost.findOne({
            slug: updateData.slug,
            _id: { $ne: id },
          });
          if (duplicate) {
            res.status(409).json({
              success: false,
              message: 'A post with this slug already exists',
            });
            return;
          }
        }

        const currentPost = await BlogPost.findById(id);
        if (currentPost) {
          if (updateData.status === 'published' && !currentPost.publishedAt) {
            updateData.publishedAt = new Date();
          }

          updateData.updatedAt = new Date();

          const updatedPost = await BlogPost.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
          });

          res.status(200).json({
            success: true,
            message: 'Blog post updated successfully',
            data: updatedPost,
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const idx = inMemoryBlogPosts.findIndex((p) => p._id === id);
    if (idx !== -1) {
      inMemoryBlogPosts[idx] = {
        ...inMemoryBlogPosts[idx],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      res.status(200).json({
        success: true,
        message: 'Blog post updated successfully',
        data: inMemoryBlogPosts[idx],
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: 'Blog post not found',
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete blog post
export const deleteBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const post = await BlogPost.findByIdAndDelete(id);
        if (post) {
          res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully',
            data: { id: post._id },
          });
          return;
        }
      } catch (dbErr) {
        // Fallback below
      }
    }

    const idx = inMemoryBlogPosts.findIndex((p) => p._id === id);
    if (idx !== -1) {
      inMemoryBlogPosts.splice(idx, 1);
      res.status(200).json({
        success: true,
        message: 'Blog post deleted successfully',
        data: { id },
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: 'Blog post not found',
    });
  } catch (error) {
    next(error);
  }
};
