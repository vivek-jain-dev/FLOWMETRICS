import React from 'react';
import { Network, Activity, Cpu, Rocket } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Network,
      title: 'Connect',
      tagline: 'Connect your team’s workflow',
      description:
        'One-click native integrations with GitHub, GitLab, Linear, Jira, and Slack. Zero agent installations on developer machines.',
    },
    {
      step: '02',
      icon: Activity,
      title: 'Track',
      tagline: 'Capture work patterns & activity',
      description:
        'Passively aggregates PR review latencies, commit cadences, and focus blocks. Completely private with zero keystroke surveillance.',
    },
    {
      step: '03',
      icon: Cpu,
      title: 'Analyze',
      tagline: 'Understand workload & velocity',
      description:
        'Proprietary telemetry models normalize velocity variations, detect bottlenecked code reviews, and calculate real cognitive flow.',
    },
    {
      step: '04',
      icon: Rocket,
      title: 'Improve',
      tagline: 'Make decisions with confidence',
      description:
        'Deliver sprints predictably, distribute review duties equitably, and protect your engineers’ uninterrupted focus hours.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-20 md:py-24 bg-slate-50/70 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800/80 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <Badge variant="blue" size="md" className="mb-3 sm:mb-4">
            Simple 4-Step Process
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Flowmetrics Works
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 mt-3 sm:mt-4 leading-relaxed">
            Go from fragmented status spreadsheets to automated engineering visibility in under 5 minutes.
          </p>
        </div>

        {/* 4-Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 shadow-md transition-all duration-300 group"
              >
                {/* Step number badge watermark */}
                <div className="text-5xl font-black text-slate-200 dark:text-slate-800/60 group-hover:text-cyan-100 dark:group-hover:text-cyan-950/80 transition-colors absolute top-4 right-5 font-mono select-none">
                  {step.step}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-3">{step.tagline}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
