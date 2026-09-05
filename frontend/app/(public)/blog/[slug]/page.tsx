'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Markdown from 'react-markdown';
import { BlogPost } from '@/types';
import { blogApi } from '@/lib/api/blog';
import { DEFAULT_BLOG_POSTS } from '@/lib/data/blogData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { ArrowLeft, Clock, User, Calendar, Sparkles, Share2 } from 'lucide-react';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find fallback article immediately so page renders with 0 latency
  const fallbackPost = DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) || DEFAULT_BLOG_POSTS[0];
  const [post, setPost] = useState<BlogPost>(fallbackPost);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await blogApi.getPostBySlug(slug);
        if (res.success && res.data) {
          setPost(res.data);
        }
      } catch (err: any) {
        // Retain fallbackPost
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <article className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-500"
          >
            Back to All Insights
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-10 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-2 mb-4 justify-center sm:justify-start">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="cyan" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          {post.excerpt}
        </p>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <User className="w-4 h-4 text-cyan-500 shrink-0" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
          </div>

          <span className="flex items-center gap-1.5 font-medium text-cyan-600 dark:text-cyan-400">
            <Clock className="w-4 h-4" />
            {calculateReadTime(post.content)}
          </span>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 sm:h-[450px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl bg-slate-950 border border-slate-200 dark:border-slate-800">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Markdown Body */}
      <div className="prose-dark max-w-none text-base sm:text-lg leading-relaxed mb-16 overflow-x-hidden">
        <Markdown>{post.content}</Markdown>
      </div>

      {/* Bottom Share & CTA */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-950 border border-cyan-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            Accelerate your engineering flow today
          </h3>
          <p className="text-sm text-slate-400">
            Start tracking deep work and sprint velocity without surveillance.
          </p>
        </div>
        <Link href="/#pricing">
          <Button variant="glow" size="lg">
            Start Free 14-Day Trial
          </Button>
        </Link>
      </div>
    </article>
  );
}
