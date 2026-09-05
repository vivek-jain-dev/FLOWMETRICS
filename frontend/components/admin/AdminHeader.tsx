'use client';

import React from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useTheme } from '@/lib/context/ThemeContext';
import { Badge } from '../ui/Badge';
import { ShieldCheck, User, Sun, Moon } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, action }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 sm:pb-8 sm:mb-8 border-b border-slate-200 dark:border-slate-800/80 gap-4">
      <div>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
          <Badge variant="cyan" size="sm">
            <ShieldCheck className="w-3 h-3 inline mr-1" /> Admin
          </Badge>
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="hidden md:flex p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all shadow-sm"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
        </button>
        {action}
      </div>
    </div>
  );
};

