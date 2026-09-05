'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { blogApi, BlogPostPayload } from '@/lib/api/blog';
import { BlogPost } from '@/types';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { ArrowLeft, Save, Sparkles, AlertCircle, ExternalLink, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [content, setContent] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await blogApi.getAdminPostById(id);
      if (res.success && res.data) {
        const p = res.data;
        setPost(p);
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt);
        setAuthor(p.author);
        setCoverImage(p.coverImage);
        setTags(p.tags ? p.tags.join(', ') : '');
        setFeatured(p.featured);
        setStatus(p.status);
        setContent(p.content);
      } else {
        setError(res.message || 'Failed to load post');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to retrieve blog post');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

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

    const payload: Partial<BlogPostPayload> = {
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

    setIsSaving(true);
    try {
      await blogApi.updatePost(id, payload);
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to update blog post');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md mx-auto text-center shadow-lg">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">{error}</p>
        <Link href="/admin/blog">
          <Button variant="outline">Back to Blog Posts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <AdminHeader
        title="Edit Article"
        subtitle={`Editing: ${post?.title}`}
        action={
          <div className="flex items-center gap-2.5">
            {post?.status === 'published' && (
              <Link href={`/blog/${post.slug}`} target="_blank">
                <Button variant="outline" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
                  View Live Post
                </Button>
              </Link>
            )}
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Posts
              </Button>
            </Link>
          </div>
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
              <p className="text-xs text-slate-500 dark:text-slate-400">Update publishing properties, SEO slug, and metadata.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Article Title"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              label="Slug"
              placeholder="article-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
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
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              label="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <Input
              label="Cover Image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />

            <Input
              label="Tags (Comma-separated)"
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
                  id="edit-featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="edit-featured" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
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
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 px-6"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

