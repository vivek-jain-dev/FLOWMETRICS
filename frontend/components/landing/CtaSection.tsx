'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-600 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-cyan-400/40 dark:border-cyan-500/40 p-5 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-cyan-600/20 dark:shadow-cyan-950/40 text-white">
          {/* Decorative ambient gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 mb-4 sm:mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Get Started in 5 Minutes
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 sm:mb-6">
              Turn Team Activity Into{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                Actionable Insights.
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-white/90 dark:text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto font-normal">
              Join hundreds of engineering managers using Flowmetrics to optimize sprint velocity, protect focus hours, and build high-trust teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button
                  variant="glow"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                  className="w-full sm:w-auto font-bold shadow-lg"
                >
                  Start Your 14-Day Free Trial
                </Button>
              </Link>
              <Link href="/admin/login" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-900 border border-white/20 dark:border-slate-700 dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:hover:border-cyan-400 font-bold shadow-lg"
                >
                  Admin Console
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/95 dark:text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 bg-white/10 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 dark:border-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-200 dark:text-cyan-400" /> Instant Setup
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 dark:border-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-200 dark:text-cyan-400" /> Cancel Anytime
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 dark:border-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-200 dark:text-cyan-400" /> SOC2 Compliant Security
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
