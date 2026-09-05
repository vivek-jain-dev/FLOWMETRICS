import React from 'react';
import {
  BarChart2,
  Clock4,
  CheckSquare2,
  Zap,
  HeartHandshake,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: BarChart2,
      title: 'Workload Analytics',
      description:
        'Understand how work is distributed across your team in real time. Prevent senior developer overload and unblock junior engineers before deadlines slip.',
      tag: 'Capacity',
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
    },
    {
      icon: Clock4,
      title: 'Time Intelligence',
      description:
        'See where your team’s productive hours are actually going. Differentiate uninterrupted deep focus blocks from context-switching fragmentation.',
      tag: 'Focus Flow',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20',
    },
    {
      icon: CheckSquare2,
      title: 'Project Progress',
      description:
        'Monitor delivery velocity and sprint commitments without endless status syncs. Automatic VCS and issue-tracker reconciliation keeps everyone aligned.',
      tag: 'Velocity',
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20',
    },
    {
      icon: Zap,
      title: 'Productivity Insights',
      description:
        'Turn raw activity signals into actionable leadership recommendations. Receive automated proactive nudges when pull requests linger unreviewed.',
      tag: 'AI Telemetry',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    },
    {
      icon: HeartHandshake,
      title: 'Team Health',
      description:
        'Identify burnout risks and workload asymmetry early. Protect team morale by fostering a sustainable, high-trust engineering culture.',
      tag: 'Wellbeing',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20',
    },
    {
      icon: FileSpreadsheet,
      title: 'Smart Reporting',
      description:
        'Generate executive-ready summary decks and sprint health summaries in one click. Give stakeholders total clarity on engineering outcomes.',
      tag: 'Executive',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-20 md:py-24 relative transition-colors">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <Badge variant="cyan" size="md" className="mb-3 sm:mb-4">
            Built for Modern Engineering Leaders
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered to Solve Delivery Friction
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 mt-3 sm:mt-4 leading-relaxed">
            Eliminate guesswork and endless status update meetings. Flowmetrics provides automated telemetry that respects developer autonomy.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                hoverEffect
                className="group relative flex flex-col justify-between p-7 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/40 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
