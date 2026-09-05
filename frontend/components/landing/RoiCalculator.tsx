'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Calculator, Sparkles, DollarSign, Clock, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(20);
  const [avgSalary, setAvgSalary] = useState<number>(135000);

  const hoursReclaimedPerWeekPerEngineer = 3.5;
  const annualWorkWeeks = 48;
  const hourlyRate = avgSalary / (annualWorkWeeks * 40);
  
  const annualHoursSaved = Math.round(teamSize * hoursReclaimedPerWeekPerEngineer * annualWorkWeeks);
  const annualDollarSaved = Math.round(annualHoursSaved * hourlyRate);
  
  const annualFlowmetricsCost = Math.round(teamSize * 25 * 12);
  const netSavings = Math.max(0, annualDollarSaved - annualFlowmetricsCost);
  const roiMultiple = ((annualDollarSaved / (annualFlowmetricsCost || 1))).toFixed(1);

  return (
    <section id="roi-calculator" className="py-20 relative bg-slate-100/60 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors">
      {/* Background glow mesh */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-4">
            <Calculator className="w-3.5 h-3.5 mr-1.5" />
            Interactive ROI Calculator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Calculate Your Team’s Reclaimed Engineering Value
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            See the concrete financial and capacity impact of eliminating context-switching and unblocking code reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-6 sm:space-y-7 shadow-xl">
              {/* Slider 1: Team Size */}
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Engineering Team Size</span>
                  </label>
                  <span className="text-base sm:text-lg font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-cyan-200 dark:border-cyan-800/50">
                    {teamSize} Engineers
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <span>5 devs</span>
                  <span>50 devs</span>
                  <span>100 devs</span>
                  <span>150+ devs</span>
                </div>
              </div>

              {/* Slider 2: Average Salary */}
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Average Annual Salary</span>
                  </label>
                  <span className="text-base sm:text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                    ${(avgSalary / 1000).toFixed(0)}k / year
                  </span>
                </div>
                <input
                  type="range"
                  min="70000"
                  max="220000"
                  step="5000"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <span>$70,000</span>
                  <span>$140,000</span>
                  <span>$220,000+</span>
                </div>
              </div>

              {/* Assumptions bullet list */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Based on 3.5h uninterrupted focus gained / dev / week</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>Includes 40% reduction in PR review queue latency</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl text-white">
              <div className="sm:absolute top-4 right-4 mb-3 sm:mb-0">
                <Badge variant="cyan" size="sm">
                  <Sparkles className="w-3 h-3 mr-1" /> Estimated Annual Impact
                </Badge>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Annual Reclaimed Payroll Value
                </p>
                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                  <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-300 tracking-tight">
                    {formatCurrency(annualDollarSaved)}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">/ year</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Net value added to your engineering capacity
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-5 border-y border-slate-800">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium text-slate-300">Hours Reclaimed</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">
                    {annualHoursSaved.toLocaleString()} <span className="text-xs font-normal text-slate-400">hrs/yr</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium text-slate-300">Projected ROI</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">
                    {roiMultiple}x <span className="text-xs font-normal text-slate-400">return</span>
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <Link href="#pricing" className="w-full sm:w-auto flex-1">
                  <Button variant="glow" size="lg" className="w-full justify-center">
                    Claim Your Free 14-Day Trial
                  </Button>
                </Link>
                <span className="text-xs text-slate-300 text-center sm:text-left">
                  Zero setup fee • Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
