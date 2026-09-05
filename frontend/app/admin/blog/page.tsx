'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { blogApi } from '@/lib/api/blog';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import {
  Plus,
  Edit,
  Trash2,
  Sparkles,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  FileClock,
  FileCheck2,
  RefreshCw,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await blogApi.getAdminPosts();
      if (res.success && res.data) {
        setPosts(res.data);
      } else {
        setError(res.message || 'Failed to load blog posts');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to blog service');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the post "${title}"?`)) {
      return;
    }

    try {
      await blogApi.deletePost(id);
      setNotification(`Post "${title}" was deleted.`);
      fetchPosts();
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete post');
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await blogApi.updatePost(post._id, { status: newStatus });
      setNotification(`Status for "${post.title}" changed to ${newStatus}.`);
      fetchPosts();
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to update publication status');
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      await blogApi.updatePost(post._id, { featured: !post.featured });
      fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to update featured flag');
    }
  };

  return (
    <div>
      <AdminHeader
        title="Blog Posts CMS"
        subtitle="Publish, draft, edit, and organize editorial articles and research papers."
        action={
          <Link href="/admin/blog/new">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              className="font-bold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all px-4 py-2"
            >
              New Article
            </Button>
          </Link>
        }
      />

      {/* Success Notification */}
      {notification && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 shadow-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl flex items-center justify-between text-sm text-red-700 dark:text-red-400 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <Button variant="outline" size="sm" onClick={fetchPosts} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Retry
          </Button>
        </div>
      )}

      {/* Blog Posts Table */}
      <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none rounded-2xl">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Article</th>
                  <th className="py-4 px-6">Author</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-12 h-10 object-cover rounded-lg bg-slate-100 dark:bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800"
                        />
                        <div className="truncate">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{post.title}</p>
                          <p className="text-xs text-slate-500 font-mono truncate">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300 text-xs whitespace-nowrap font-medium">
                      {post.author}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          post.status === 'published'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
                            : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-500/20'
                        }`}
                        title="Click to toggle publication status"
                      >
                        {post.status === 'published' ? (
                          <FileCheck2 className="w-3.5 h-3.5" />
                        ) : (
                          <FileClock className="w-3.5 h-3.5" />
                        )}
                        <span className="capitalize">{post.status}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors flex items-center gap-1 ${
                          post.featured
                            ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 hover:bg-cyan-100 dark:hover:bg-cyan-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {post.featured ? 'Featured' : 'Standard'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status === 'published' && (
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Public Post">
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400" />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/admin/blog/edit/${post._id}`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 text-xs font-semibold"
                            leftIcon={<Edit className="w-3.5 h-3.5" />}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          className="h-8 text-xs font-semibold"
                          onClick={() => handleDelete(post._id, post.title)}
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No blog posts found.</p>
            <Link href="/admin/blog/new">
              <Button variant="primary" size="sm">
                Create First Article
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
