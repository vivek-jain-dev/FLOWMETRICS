'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useTheme } from '@/lib/context/ThemeContext';
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  KeyRound,
  LogOut,
  Activity,
  ExternalLink,
  Shield,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: 'Overview',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Pricing Plans',
      href: '/admin/plans',
      icon: CreditCard,
    },
    {
      label: 'Blog Posts',
      href: '/admin/blog',
      icon: FileText,
    },
    {
      label: 'Security & Profile',
      href: '/admin/settings',
      icon: KeyRound,
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-colors shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-slate-950 font-bold">
            <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
            FLOWMETRICS ADMIN
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
            aria-label="Toggle admin menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 dark:bg-slate-950/98 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xl">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{user?.name || user?.email}</span>
            <button onClick={logout} className="text-red-500 dark:text-red-400 font-semibold">Log out</button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex-col justify-between shrink-0 min-h-screen transition-colors">
        <div>
          {/* Logo & Platform Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-slate-950 font-bold">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-slate-900 dark:text-white block">
                  FLOWMETRICS
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Management
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/admin/settings" className="flex items-center gap-2.5 overflow-hidden hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 flex items-center justify-center text-xs font-bold shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
              </div>
            </Link>
            <button
              onClick={logout}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

