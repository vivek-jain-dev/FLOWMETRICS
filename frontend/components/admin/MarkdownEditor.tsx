'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Bold, Italic, Heading2, Heading3, List, Code, Quote, Eye, Edit3, Columns } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  minHeight?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  label = 'Article Body (Markdown Supported)',
  minHeight = 'min-h-[350px]',
}) => {
  const [activeView, setActiveView] = useState<'edit' | 'preview' | 'split'>('split');

  const insertText = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) {
      onChange(value + prefix + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = value.substring(start, end);
    const replacement = prefix + (selection || 'text') + suffix;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selection.length || 4)
      );
    }, 50);
  };

  return (
    <div className="space-y-2.5">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </label>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-inner">
          <button
            type="button"
            onClick={() => setActiveView('edit')}
            className={cn(
              'px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all',
              activeView === 'edit'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            )}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveView('preview')}
            className={cn(
              'px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all',
              activeView === 'preview'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            )}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveView('split')}
            className={cn(
              'hidden md:flex px-3 py-1.5 rounded-lg items-center gap-1.5 font-semibold transition-all',
              activeView === 'split'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            )}
          >
            <Columns className="w-3.5 h-3.5" /> Split
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 flex-wrap">
          <button
            type="button"
            onClick={() => insertText('**', '**')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('*', '*')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={() => insertText('## ')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('### ')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={() => insertText('> ')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('- ')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText('```typescript\n', '\n```')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
          {/* Write Textarea */}
          {(activeView === 'edit' || activeView === 'split') && (
            <div
              className={cn(
                'p-4 flex flex-col',
                activeView === 'split' ? 'md:col-span-6 border-r border-slate-200 dark:border-slate-800' : 'md:col-span-12'
              )}
            >
              <textarea
                id="markdown-textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Write your article in Markdown syntax..."
                className={`w-full ${minHeight} bg-transparent text-slate-900 dark:text-slate-100 font-mono text-sm resize-y focus:outline-none placeholder-slate-400 dark:placeholder-slate-600 leading-relaxed`}
              />
            </div>
          )}

          {/* Live Preview Panel */}
          {(activeView === 'preview' || activeView === 'split') && (
            <div
              className={cn(
                'p-6 bg-slate-50/70 dark:bg-slate-900/40 overflow-y-auto max-h-[500px]',
                activeView === 'split' ? 'md:col-span-6' : 'md:col-span-12'
              )}
            >
              <div className="prose-dark max-w-none text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                {value.trim() ? (
                  <Markdown>{value}</Markdown>
                ) : (
                  <p className="text-slate-400 dark:text-slate-600 italic">Live Markdown preview will appear here...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

