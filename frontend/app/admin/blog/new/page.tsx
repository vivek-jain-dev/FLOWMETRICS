'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { blogApi, BlogPostPayload } from '@/lib/api/blog';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { ArrowLeft, Save, Sparkles, AlertCircle, FileText, Globe, Tag, Image as ImageIcon, User } from 'lucide-react';

export default function CreateBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('Flowmetrics Team');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  );
  const [tags, setTags] = useState('Engineering, Productivity, Deep Work');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [content, setContent] = useState(`## Introduction

Write your insights here. Markdown formatting including code blocks, lists, and quotes is supported.

### Key Takeaways
- First principle of focus flow
- Metric-driven velocity without micromanagement
`);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!excerpt.trim()) {
      setError('Excerpt summary is required');
      return;
    }
    if (!content.trim() || content.trim().length < 20) {
      setError('Content must be at least 20 characters long');
      return;
    }
    if (!coverImage.trim()) {
      setError('Cover image URL is required');
      return;
    }

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: BlogPostPayload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim(),
      content,
      author: author.trim() || 'Flowmetrics Team',
      coverImage: coverImage.trim(),
      tags: parsedTags,
      featured,
      status,
    };

    setIsLoading(true);
    try {
      await blogApi.createPost(payload);
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post');
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-12">
      <AdminHeader
        title="Create New Article"
        subtitle="Compose high-impact engineering thought leadership and technical articles."
        action={
          <Link href="/admin/blog">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Posts
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl flex items-center gap-2.5 text-sm text-red-700 dark:text-red-400 shadow-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Metadata Card */}
        <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-6 shadow-sm dark:shadow-none rounded-3xl">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Article Details & Metadata
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Specify publishing properties, SEO slug, and metadata.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Article Title"
              placeholder="e.g. Measuring Deep Work in Distributed Engineering Teams"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              label="Custom Slug (Optional, auto-generated from title)"
              placeholder="e.g. measuring-deep-work-distributed-teams"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Short Excerpt (Summary displayed on cards)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A concise 1-2 sentence preview of the article..."
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              label="Author Name"
              placeholder="e.g. Elena Rostova, VP of Eng"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <Input
              label="Cover Image URL (Unsplash or CDN)"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />

            <Input
              label="Tags (Comma-separated)"
              placeholder="Engineering, Async, Velocity"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Status & Featured Flags in high quality card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              {/* Publication Status */}
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Publication Status:
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="draft">Draft (Private Editorial)</option>
                  <option value="published">Published (Public Live)</option>
                </select>
              </div>

              {/* Featured Flag */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="featured" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" /> Feature in Spotlight
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Markdown Content Editor */}
        <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm dark:shadow-none rounded-3xl">
          <MarkdownEditor value={content} onChange={setContent} />
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/admin/blog">
            <Button type="button" variant="outline" className="font-semibold">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 px-6"
          >
            {status === 'published' ? 'Publish Article Now' : 'Save as Draft'}
          </Button>
        </div>
      </form>
    </div>
  );
}

