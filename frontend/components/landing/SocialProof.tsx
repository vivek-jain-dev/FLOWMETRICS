import React from 'react';
import { Shield, Layers, Cpu, Server, Database, Globe } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const logos = [
    { name: 'Synthetix', icon: Cpu },
    { name: 'HyperScale', icon: Layers },
    { name: 'CloudVeloce', icon: Server },
    { name: 'ApexLogic', icon: Database },
    { name: 'PrismData', icon: Globe },
  ];

  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
          Trusted by fast-growing engineering teams & distributed agencies worldwide
        </p>

        {/* Brand Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80">
          {logos.map((logo) => {
            const Icon = logo.icon;
            return (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-default"
              >
                <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="font-bold tracking-tight text-base sm:text-lg">{logo.name}</span>
              </div>
            );
          })}
        </div>

        {/* High-level aggregate trust stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">500+</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Engineering Teams</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-500 dark:text-cyan-400">4.2M+</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PRs & Tasks Analyzed</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">42%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fewer Sprint Blockers</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 dark:text-emerald-400">3.8 hrs</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Focus Time Gained / Week</p>
          </div>
        </div>
      </div>
    </section>
  );
};
