'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminStats } from '@/types';
import { adminApi } from '@/lib/api/admin';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import {
  CreditCard,
  FileCheck2,
  FileClock,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminApi.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      } else {
        setError(res.message || 'Failed to load system statistics');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to admin statistics service');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <AdminHeader
        title="Admin Overview"
        subtitle="Manage public pricing plans, blog publications, and editorial content."
        action={
          <div className="flex items-center gap-2.5">
            <Link href="/admin/plans">
              <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                New Plan
              </Button>
            </Link>
            <Link href="/admin/blog/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                New Article
              </Button>
            </Link>
          </div>
        }
      />

      {/* Error notification */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-between text-sm text-red-400">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <Button variant="outline" size="sm" onClick={fetchStats}>
            Retry
          </Button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {/* Total Plans */}
        <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm dark:shadow-none rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pricing Plans
            </span>
            <div className="p-2 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 dark:text-white">{stats?.totalPlans ?? 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Tiers</span>
            </div>
          )}
        </Card>

        {/* Published Posts */}
        <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm dark:shadow-none rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Published Posts
            </span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats?.publishedPosts ?? 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Public Live</span>
            </div>
          )}
        </Card>

        {/* Draft Posts */}
        <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm dark:shadow-none rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Draft Posts
            </span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <FileClock className="w-5 h-5" />
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400">{stats?.draftPosts ?? 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">In Editorial</span>
            </div>
          )}
        </Card>

        {/* Featured Posts */}
        <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm dark:shadow-none rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Featured Articles
            </span>
            <div className="p-2 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400">{stats?.featuredPosts ?? 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Spotlighted</span>
            </div>
          )}
        </Card>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Posts Activity Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Editorial Content</h3>
            <Link href="/admin/blog" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
              Manage All Posts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Author</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Created</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {stats.recentPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 font-semibold text-slate-900 dark:text-slate-200 max-w-xs truncate pr-4">
                        {post.title}
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-400 text-xs">{post.author}</td>
                      <td className="py-3.5">
                        <Badge
                          variant={post.status === 'published' ? 'emerald' : 'amber'}
                          size="sm"
                        >
                          {post.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-xs text-slate-500 dark:text-slate-400">{formatDate(post.createdAt)}</td>
                      <td className="py-3.5 text-right">
                        <Link href={`/admin/blog/edit/${post._id}`}>
                          <Button variant="secondary" size="sm" className="h-7 text-xs font-semibold">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">No recent blog posts found.</p>
          )}
        </div>

        {/* Quick Management Shortcuts (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-none space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Management Center</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instantly configure and update SaaS billing tiers, pricing flags, and published blog posts.
            </p>

            <div className="space-y-2.5 pt-2">
              <Link href="/admin/plans" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between font-semibold h-11 px-4"
                  rightIcon={<CreditCard className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />}
                >
                  Manage Pricing Plans
                </Button>
              </Link>
              <Link href="/admin/blog" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between font-semibold h-11 px-4"
                  rightIcon={<FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                >
                  Manage Blog Posts
                </Button>
              </Link>
              <Link href="/admin/blog/new" className="block">
                <Button
                  variant="primary"
                  className="w-full justify-between font-bold h-11 px-4 shadow-md shadow-cyan-500/20"
                  rightIcon={<Plus className="w-4 h-4 shrink-0" />}
                >
                  Create New Post
                </Button>
              </Link>
            </div>
          </div>

          {/* System Security Notice */}
          <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/20 rounded-2xl text-xs text-slate-600 dark:text-slate-400 space-y-1.5 shadow-sm dark:shadow-none">
            <p className="font-bold text-cyan-800 dark:text-cyan-300">Protected API Surface</p>
            <p className="leading-relaxed">
              Drafts are strictly isolated from public REST routes. All administrative write endpoints require valid JWT authentication and admin role authorization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
