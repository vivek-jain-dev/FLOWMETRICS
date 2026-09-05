'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useTheme } from '@/lib/context/ThemeContext';
import { Button } from '../ui/Button';
import {
  Activity,
  Menu,
  X,
  Shield,
  ArrowRight,
  LayoutDashboard,
  Sun,
  Moon,
  Zap,
  PlayCircle,
  Workflow,
  Calculator,
  CreditCard,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#features', icon: Zap },
    { label: 'Live Preview', href: '/#preview', icon: PlayCircle },
    { label: 'How It Works', href: '/#how-it-works', icon: Workflow },
    { label: 'ROI Calculator', href: '/#roi-calculator', icon: Calculator },
    { label: 'Pricing', href: '/#pricing', icon: CreditCard },
    { label: 'Blog', href: '/blog', icon: BookOpen },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center px-3 sm:px-6',
        isScrolled ? 'pt-3' : 'pt-4 sm:pt-5'
      )}
    >
      <div
        className={cn(
          'w-full transition-all duration-500 ease-out',
          isScrolled
            ? 'max-w-6xl rounded-full bg-white/90 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/30 shadow-xl shadow-slate-900/5 dark:shadow-cyan-950/50 px-4 py-2 ring-1 ring-slate-900/5 dark:ring-white/10'
            : 'max-w-7xl px-2 sm:px-4 py-2 bg-transparent'
        )}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                FLOWMETRICS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Floating Pill Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 px-2.5 py-1 rounded-full backdrop-blur-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 relative group flex items-center gap-1.5',
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white dark:text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/80 dark:hover:bg-slate-800/80'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-white dark:text-slate-950' : 'text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform')} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Magnetic Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-sm hover:scale-110 active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-pulse-subtle" />
              ) : (
                <Moon className="w-4 h-4 text-sky-600" />
              )}
            </button>

            {isAuthenticated ? (
              <Link href="/admin/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LayoutDashboard className="w-3.5 h-3.5 text-cyan-500" />}
                >
                  Admin Console
                </Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Shield className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
                  className="text-slate-700 dark:text-slate-300 hover:text-cyan-600"
                >
                  Admin
                </Button>
              </Link>
            )}

            <Link href="/#pricing">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 dark:text-slate-200 hover:text-cyan-500 focus:outline-none rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 px-4 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/20 rounded-3xl space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="font-semibold">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Admin Console
                  </Button>
                </Link>
              ) : (
                <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center text-slate-700 dark:text-slate-300">
                    Admin Login
                  </Button>
                </Link>
              )}
              <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
