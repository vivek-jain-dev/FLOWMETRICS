import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { DashboardPreview } from './DashboardPreview';
import { ArrowRight, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-cyan-600/15 to-sky-500/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 -z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          {/* Top Announcement Badge */}
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Next-Gen Engineering Intelligence</span>
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4 sm:mb-6 break-words">
            Know Where Your Team’s{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-400 bg-clip-text text-transparent">
              Time Goes.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            Flowmetrics transforms team activity into clear productivity insights, helping modern teams understand workload, focus, and progress without intrusive tracking.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            <Link href="#pricing" className="w-full sm:w-auto">
              <Button
                variant="glow"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start Free
              </Button>
            </Link>

            <Link href="#preview" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Play className="w-4 h-4 text-cyan-500 fill-cyan-500" />}
                className="w-full sm:w-auto"
              >
                View Live Demo
              </Button>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 14-day full feature trial
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> SOC2 & GDPR Compliant
            </span>
          </div>
        </div>

        {/* Hero Interactive Dashboard Visualizer */}
        <div id="preview" className="max-w-5xl mx-auto">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};
