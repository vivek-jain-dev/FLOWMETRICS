'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { blogApi } from '@/lib/api/blog';
import { DEFAULT_BLOG_POSTS } from '@/lib/data/blogData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { calculateReadTime } from '@/lib/utils';
import { ArrowRight, Sparkles, AlertCircle, Clock, User as UserIcon } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS.slice(0, 3));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await blogApi.getPublicPosts();
        if (res.success && res.data && res.data.length > 0) {
          setPosts(res.data.slice(0, 3));
        }
      } catch (err: any) {
        // Keep DEFAULT_BLOG_POSTS fallback
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-24 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="cyan" size="md" className="mb-4">
              Engineering Insights
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest from the Flowmetrics Blog
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
              Actionable guides on developer velocity, cognitive flow, async architecture, and high-trust management.
            </p>
          </div>

          <Link href="/blog" className="inline-flex group/link">
            <Button
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5 text-cyan-500" />}
              className="font-semibold px-5 py-2.5 rounded-xl border-slate-300 dark:border-slate-700/80 hover:border-cyan-500/80 dark:hover:border-cyan-400 text-slate-800 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
            >
              View All Articles
            </Button>
          </Link>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden border-slate-200 dark:border-slate-800 space-y-4">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center p-8 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">{error}</p>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group flex">
                <Card
                  hoverEffect
                  className="flex flex-col justify-between overflow-hidden p-0 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/90 group-hover:border-cyan-500/40 w-full rounded-2xl shadow-md"
                >
                  <div>
                    {/* Cover Image Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 uppercase tracking-wider shadow-md">
                            <Sparkles className="w-3 h-3 fill-slate-950" /> Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 truncate max-w-[140px]">
                      <UserIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      {calculateReadTime(post.content)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
