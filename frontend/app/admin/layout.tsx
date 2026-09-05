'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Skeleton } from '@/components/ui/Skeleton';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  // Public admin login page
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">{children}</div>;
  }

  // Loading state while checking token
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#060913] flex items-center justify-center transition-colors">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-500 dark:text-cyan-400 animate-spin" />
          <p className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, prevent flash
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100/80 dark:bg-[#060913] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
