import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Activity, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060913] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden transition-colors">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-cyan-500/15 to-sky-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-slate-950 font-bold mb-6 mx-auto shadow-lg shadow-cyan-500/20">
          <Activity className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h1 className="text-6xl sm:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 font-mono">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-8">
          The metric or page you are looking for does not exist or may have been relocated.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

