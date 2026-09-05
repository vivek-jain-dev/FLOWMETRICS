'use client';

import React, { useState, useEffect } from 'react';
import { PricingPlan } from '@/types';
import { plansApi } from '@/lib/api/plans';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { Skeleton } from '../ui/Skeleton';

const DEFAULT_PLANS: PricingPlan[] = [
  {
    _id: 'default-starter',
    name: 'Starter',
    price: 19,
    billingCycle: 'monthly',
    highlighted: false,
    features: [
      'Up to 5 team members',
      'Core productivity metrics',
      'Weekly velocity reports',
      'Slack & GitHub integration',
      '30-day data retention',
      'Standard community support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'default-pro',
    name: 'Team Pro',
    price: 49,
    billingCycle: 'monthly',
    highlighted: true,
    features: [
      'Up to 25 team members',
      'Real-time focus & workload analytics',
      'Automated sprint velocity forecasts',
      'Deep Jira, Linear & GitLab sync',
      'Custom workload alert thresholds',
      '1-year data history & export',
      'Priority email & Slack support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'default-enterprise',
    name: 'Enterprise',
    price: 129,
    billingCycle: 'monthly',
    highlighted: false,
    features: [
      'Unlimited team members',
      'Custom predictive AI productivity modeling',
      'Cross-department capacity planning',
      'Dedicated Success Manager',
      'SSO & SAML authentication',
      'Custom audit logs & 99.99% SLA',
      '24/7 dedicated engineering support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const PricingSection: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>(DEFAULT_PLANS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const fetchPlans = async () => {
    try {
      const res = await plansApi.getPublicPlans();
      if (res.success && res.data && res.data.length > 0) {
        setPlans(res.data);
      }
    } catch (err: any) {
      // Keep DEFAULT_PLANS as fallback
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <section id="pricing" className="py-12 sm:py-20 md:py-24 relative overflow-hidden transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <Badge variant="cyan" size="md" className="mb-3 sm:mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Plans Tailored for Modern Teams
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            Start with our 14-day full feature trial. No credit card required. Upgrade or downgrade anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-slate-200 dark:bg-slate-900/90 p-1.5 rounded-full border border-slate-300 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                !isYearly
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5',
                isYearly
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-8 border-slate-200 dark:border-slate-800 space-y-5">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-3 pt-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-11 w-full pt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="max-w-md mx-auto text-center p-8 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <p className="text-sm text-slate-300 mb-4">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPlans}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Retry Loading Plans
            </Button>
          </div>
        )}

        {/* Pricing Cards Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {plans.map((plan) => {
              const displayPrice = isYearly ? Math.round(plan.price * 0.8) : plan.price;

              return (
                <Card
                  key={plan._id}
                  hoverEffect
                  className={cn(
                    'relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-300',
                    plan.highlighted
                      ? 'border-cyan-500 bg-white dark:bg-slate-900/90 shadow-xl shadow-cyan-500/10 lg:-translate-y-2'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-md'
                  )}
                >
                  {/* Highlighted Ribbon */}
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                      <Badge variant={plan.highlighted ? 'cyan' : 'slate'} size="sm">
                        {plan.billingCycle}
                      </Badge>
                    </div>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-1.5 mb-6">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {formatCurrency(displayPrice)}
                      </span>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/ month</span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                      {isYearly ? 'Billed annually ($' + displayPrice * 12 + '/yr)' : 'Billed monthly. Cancel anytime.'}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                    <Button
                      variant={plan.highlighted ? 'glow' : 'outline'}
                      size="lg"
                      className="w-full justify-center"
                    >
                      {plan.highlighted ? 'Start 14-Day Free Trial' : 'Get Started'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
