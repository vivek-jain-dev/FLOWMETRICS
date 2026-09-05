'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Github, Linkedin, Shield, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#060913] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-slate-950 font-bold">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                FLOWMETRICS
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Turn team activity into actionable insights. Empowering engineering leaders with workload intelligence, focus time allocation, and sprint predictability.
            </p>

            {/* Direct Author Badge & Click-to-Call */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 w-full sm:w-auto inline-block shadow-sm">
              <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 flex-wrap">
                <span>Designed &amp; Powered By</span>
                <strong className="text-sky-600 dark:text-cyan-400 font-bold">
                  Vivek Jain
                </strong>
                <a
                  href="tel:+9588611472"
                  className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30 transition-all hover:scale-105 active:scale-95"
                  title="Click to place a call directly to Vivek Jain"
                >
                  <Phone className="w-3 h-3 animate-pulse" />
                  <span>+9588611472</span>
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a
                href="https://github.com/vivek-jain-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-105 transition-all shadow-sm"
                aria-label="GitHub Profile"
                title="GitHub: vivek-jain-dev"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vivek-jain-9bb35128b"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-105 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
                title="LinkedIn: Vivek Jain"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/#features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Workload Analytics</Link></li>
              <li><Link href="/#features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Time Intelligence</Link></li>
              <li><Link href="/#features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Project Progress</Link></li>
              <li><Link href="/#pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/blog" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Engineering Blog</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">How It Works</Link></li>
              <li><Link href="/#roi-calculator" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">ROI Calculator</Link></li>
              <li><Link href="/#preview" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Live Demo Preview</Link></li>
            </ul>
          </div>

          {/* Platform / Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
              Administration
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/admin/login" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-slate-500" /> Admin Login</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">KPI Dashboard</Link></li>
              <li><Link href="/admin/plans" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Manage Plans</Link></li>
              <li><Link href="/admin/blog" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Manage Blog Posts</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Vivek Jain signature */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} Flowmetrics Inc.</span>
            <span className="hidden sm:inline">•</span>
            <span>Designed &amp; Powered By <strong className="text-slate-900 dark:text-white font-semibold">Vivek Jain</strong></span>
            <a
              href="tel:+9588611472"
              className="text-sky-600 dark:text-cyan-400 hover:underline font-bold inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> +9588611472
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/#pricing" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="/#pricing" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link href="/#features" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">SOC2 Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
