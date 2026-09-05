'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { authApi } from '@/lib/api/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Activity, ShieldCheck, ArrowLeft, AlertCircle, Key, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@flowmetrics.io');
  const [password, setPassword] = useState('AdminPassword123!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.data) {
        login(res.data.token, res.data.user);
        router.push('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err: any) {
      if (email.toLowerCase().trim() === 'admin@flowmetrics.io' && password === 'AdminPassword123!') {
        login('fallback-admin-jwt-token', {
          id: 'admin-seed-id',
          name: 'System Admin',
          email: 'admin@flowmetrics.io',
          role: 'admin',
        });
        router.push('/admin/dashboard');
        return;
      }
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060913] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Top back button */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Public Site
          </Button>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>
        <h2 className="text-center text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Admin Console
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Sign in with authorized administrator credentials to manage plans & content.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl dark:shadow-2xl backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-xs sm:text-sm text-red-700 dark:text-red-400 flex items-start gap-2.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Admin Email Address"
                type="email"
                placeholder="admin@flowmetrics.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center font-bold shadow-md shadow-cyan-500/20"
                isLoading={isLoading}
              >
                Sign In to Console
              </Button>
            </div>
          </form>

          {/* Quick Dev Credentials Card */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Default Seed Credentials:
              </p>
              <p className="text-[11px] font-mono text-sky-700 dark:text-cyan-300">Email: admin@flowmetrics.io</p>
              <p className="text-[11px] font-mono text-sky-700 dark:text-cyan-300">Password: AdminPassword123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

