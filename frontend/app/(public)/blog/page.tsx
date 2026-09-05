'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { blogApi } from '@/lib/api/blog';
import { DEFAULT_BLOG_POSTS } from '@/lib/data/blogData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { Sparkles, Clock, User, ArrowRight, Search, Tag, BookOpen } from 'lucide-react';

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await blogApi.getPublicPosts();
      if (res.success && res.data && res.data.length > 0) {
        setPosts(res.data);
      }
    } catch (err: any) {
      // Retain DEFAULT_BLOG_POSTS
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = posts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.author.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    setFilteredPosts(result);
  }, [searchQuery, selectedTag, posts]);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const standardPosts = filteredPosts.filter((p) => {
    if (searchQuery || selectedTag) return true;
    return p._id !== featuredPost?._id;
  });

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="cyan" size="md" className="mb-4">
          <BookOpen className="w-3.5 h-3.5 mr-1.5" />
          Flowmetrics Engineering Insights
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Thought Leadership in{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-300 bg-clip-text text-transparent">
            Developer Velocity.
          </span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
          In-depth guides on high-trust workload management, cognitive flow optimization, async engineering architectures, and empirical sprint forecasting.
        </p>

        {/* Search Input Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles, tags, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg text-sm sm:text-base"
          />
        </div>

        {/* Tag Pills Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedTag === null
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400'
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400'
                }`}
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hero Spotlight Featured Post (Only when no search is active) */}
      {!searchQuery && !selectedTag && featuredPost && (
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-64 sm:h-72 lg:h-[420px] overflow-hidden bg-slate-950">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-slate-950 uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> Featured Story
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40 px-2.5 py-1 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-6">
                  <span className="flex items-center gap-1.5 font-medium truncate max-w-[150px]">
                    <User className="w-4 h-4 text-cyan-500 shrink-0" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {calculateReadTime(featuredPost.content)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {standardPosts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="group flex">
            <Card
              hoverEffect
              className="flex flex-col justify-between overflow-hidden p-0 bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800/90 group-hover:border-cyan-500/40 w-full rounded-2xl shadow-md"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="truncate max-w-[140px]">{post.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {calculateReadTime(post.content)}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {standardPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-base">No articles found matching &ldquo;{searchQuery}&rdquo;</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
