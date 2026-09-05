'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Zap,
  ArrowUpRight,
  GitPullRequest,
  BarChart3,
  Layers,
  Flame,
  ShieldCheck,
  Cpu,
  GitBranch,
  Timer,
  AlertTriangle,
  Smile,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'velocity' | 'workload'>('overview');

  const days = [
    { name: 'Mon', focus: 7.2, tasks: 24, height: '72%' },
    { name: 'Tue', focus: 8.5, tasks: 31, height: '88%' },
    { name: 'Wed', focus: 9.1, tasks: 38, height: '95%' },
    { name: 'Thu', focus: 7.8, tasks: 29, height: '78%' },
    { name: 'Fri', focus: 6.4, tasks: 18, height: '64%' },
  ];

  const teamMembers = [
    { name: 'Alex Rivera', role: 'Staff Eng', focus: '38.5h', workload: 84, status: 'Optimal', prs: 14 },
    { name: 'Sarah Chen', role: 'Frontend Lead', focus: '36.0h', workload: 76, status: 'Optimal', prs: 19 },
    { name: 'David Kim', role: 'Backend Eng', focus: '34.2h', workload: 92, status: 'High Load', prs: 22 },
    { name: 'Elena Vance', role: 'DevOps Eng', focus: '31.8h', workload: 68, status: 'Healthy', prs: 9 },
  ];

  const velocitySprints = [
    { sprint: 'Sprint 39', committed: 42, completed: 40, cycleTime: '4.8d' },
    { sprint: 'Sprint 40', committed: 48, completed: 46, cycleTime: '4.2d' },
    { sprint: 'Sprint 41', committed: 50, completed: 49, cycleTime: '3.9d' },
    { sprint: 'Sprint 42 (Current)', committed: 55, completed: 51, cycleTime: '3.4d' },
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/98 border border-slate-700/70 p-4 sm:p-7 shadow-2xl shadow-cyan-950/50 relative overflow-hidden backdrop-blur-2xl">
      {/* Top ambient glow decoration */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-36 bg-cyan-500/25 blur-3xl pointer-events-none rounded-full" />

      {/* Window Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-5 border-b border-slate-800 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-500/90 inline-block ring-2 ring-rose-500/20" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-500/90 inline-block ring-2 ring-amber-500/20" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500/90 inline-block ring-2 ring-emerald-500/20" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-slate-900 px-2 sm:px-3 py-1 rounded-md border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="sm:hidden">Sprint 42 • Live Telemetry</span>
              <span className="hidden sm:inline">Sprint 42 — Core Platform & AI Telemetry</span>
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Tab Selector */}
        <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800/90 text-xs shadow-inner w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5',
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <BarChart3 className="w-3.5 h-3.5 shrink-0" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('velocity')}
            className={cn(
              'flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5',
              activeTab === 'velocity'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>Velocity</span>
          </button>
          <button
            onClick={() => setActiveTab('workload')}
            className={cn(
              'flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5',
              activeTab === 'workload'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>Team Health</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 my-3.5 sm:my-5">
        {/* Productivity Score */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 relative group hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-slate-400">Focus Index</span>
            <div className="p-1 sm:p-1.5 rounded-md bg-cyan-500/10 text-cyan-400">
              <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
          </div>
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">89.4%</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> +6.8%
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">Deep focus flow</p>
        </div>

        {/* Tasks Completed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 group hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-slate-400">Sprint Done</span>
            <div className="p-1 sm:p-1.5 rounded-md bg-sky-500/10 text-sky-400">
              <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
          </div>
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">138</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> +18
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">99.1% on-time</p>
        </div>

        {/* Focus Hours */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 group hover:border-teal-500/50 hover:bg-slate-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-slate-400">PR Latency</span>
            <div className="p-1 sm:p-1.5 rounded-md bg-teal-500/10 text-teal-400">
              <Timer className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
          </div>
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">3.2h</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> -42%
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">Down from 18.5h</p>
        </div>

        {/* Project Progress */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 group hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-medium text-slate-400">Predictive SLA</span>
            <div className="p-1 sm:p-1.5 rounded-md bg-purple-500/10 text-purple-400">
              <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">96%</span>
            <Badge variant="emerald" size="sm" className="text-[9px] sm:text-xs px-1.5 py-0.5">High Confidence</Badge>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 h-full rounded-full w-[96%]" />
          </div>
        </div>
      </div>

      {/* Dynamic Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
          {/* Left 2 Cols: Weekly Productivity & Focus Bar Chart */}
          <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Weekly Focus Flow & Cognitive Density
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculated from VCS commits, PR turns & distraction-free coding intervals
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-1 rounded">
                Avg 8.2h Flow
              </span>
            </div>

            {/* Responsive Bar Chart Visualizer */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2 border-b border-slate-800">
              {days.map((d) => (
                <div key={d.name} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                  <div className="text-[11px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    {d.focus}h ({d.tasks} tasks)
                  </div>
                  <div className="w-full max-w-[48px] bg-slate-800/90 rounded-t-md relative flex items-end overflow-hidden h-full">
                    <div
                      className="w-full bg-gradient-to-t from-cyan-600 via-sky-500 to-cyan-400 rounded-t-md transition-all duration-700 ease-out group-hover:brightness-125"
                      style={{ height: d.height }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {d.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Legend */}
            <div className="flex items-center justify-between mt-3 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" />
                  Deep Coding Flow
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block" />
                  Meeting Overhead (&lt;1.5h/day)
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">⚡ 94% Distraction-free</span>
            </div>
          </div>

          {/* Right 1 Col: Team Workload Health Snapshot */}
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                Live Engineering Squad
              </h4>
              <Badge variant="cyan" size="sm">4 Active</Badge>
            </div>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-sky-400 flex items-center justify-center font-bold text-slate-950 text-[10px]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-200">{member.name}</p>
                      <p className="text-[11px] text-slate-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-cyan-400 font-semibold">{member.focus}</p>
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-1.5 py-0.5 rounded',
                        member.workload > 90
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      )}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" /> 24 PRs Merged this week
              </span>
              <span className="text-emerald-400 font-medium">0 Friction Points</span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Tab Content 2: Velocity Forecast */}
      {activeTab === 'velocity' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
          <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Monte Carlo Sprint Velocity & SLA Forecast
                </h4>
                <Badge variant="emerald" size="sm">P95 On-Time Delivery</Badge>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Empirical simulation of 1,000 sprint iterations based on historical team throughput
              </p>

              {/* Sprint Historical Table */}
              <div className="space-y-2.5">
                {velocitySprints.map((s) => (
                  <div key={s.sprint} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-semibold text-slate-200">{s.sprint}</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-between sm:justify-end">
                      <span className="text-slate-400">
                        Committed: <strong className="text-white">{s.committed} pts</strong>
                      </span>
                      <span className="text-slate-400">
                        Completed: <strong className="text-emerald-400">{s.completed} pts</strong>
                      </span>
                      <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        Cycle: {s.cycleTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Predicted Release Date: Friday 4:00 PM
              </span>
              <span className="text-slate-500">Confidence Interval: ±2.5 hours</span>
            </div>
          </div>

          {/* Cycle Time Breakdown */}
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-sky-400" />
                Cycle Time Anatomy
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>PR Review Latency</span>
                    <strong className="text-cyan-400">3.2 hrs (Top 5%)</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[25%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>CI/CD Automated Test Run</span>
                    <strong className="text-sky-400">12 mins</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full w-[15%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Deployment to Staging</span>
                    <strong className="text-teal-400">4 mins</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full w-[8%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-cyan-950/40 border border-cyan-500/20 rounded-lg text-xs text-cyan-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Team velocity is <strong>3.4x faster</strong> than industry average</span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Tab Content 3: Team Health */}
      {activeTab === 'workload' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
          <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Smile className="w-4 h-4 text-emerald-400" />
                  Cognitive Load Balance & Burnout Prevention Radar
                </h4>
                <Badge variant="cyan" size="sm">Zero Critical Alerts</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3">
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">Quiet Focus Mornings</p>
                  <p className="text-xl font-bold text-white mt-1">4.8 Days</p>
                  <span className="text-[10px] text-emerald-400">No meeting interruptions</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">Review Distribution</p>
                  <p className="text-xl font-bold text-white mt-1">Equitable</p>
                  <span className="text-[10px] text-cyan-400">Max 6 PRs/engineer</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">Overtime Index</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">0.0%</p>
                  <span className="text-[10px] text-slate-400">Healthy work hours</span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% High-Trust Autonomous Privacy Mode Active
              </span>
              <span className="text-slate-500">Zero Keystroke / Screen Logging</span>
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-teal-400" />
                AI Telemetry Insights
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Automated recommendations generated for engineering leadership:
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/20 rounded-lg text-emerald-300">
                  ✓ PR turnaround for backend squad improved by <strong>52 mins</strong>.
                </div>
                <div className="p-2.5 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-cyan-300">
                  ✓ Friday code freeze cadence protected weekend deploy stability.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Next sprint audit: in 3 days</span>
              <span className="text-cyan-400 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                View Log <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

