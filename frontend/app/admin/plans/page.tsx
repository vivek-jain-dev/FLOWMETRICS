'use client';

import React, { useState, useEffect } from 'react';
import { PricingPlan } from '@/types';
import { plansApi } from '@/lib/api/plans';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PlanModal } from '@/components/admin/PlanModal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus, Edit2, Trash2, Sparkles, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await plansApi.getPublicPlans();
      if (res.success && res.data) {
        setPlans(res.data);
      } else {
        setError(res.message || 'Failed to load plans');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to pricing service');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the "${name}" plan?`)) {
      return;
    }

    try {
      await plansApi.deletePlan(id);
      setNotification(`Plan "${name}" was deleted successfully.`);
      fetchPlans();
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete pricing plan');
    }
  };

  const handleToggleHighlighted = async (plan: PricingPlan) => {
    try {
      await plansApi.updatePlan(plan._id, { highlighted: !plan.highlighted });
      fetchPlans();
    } catch (err: any) {
      alert(err.message || 'Failed to update highlight state');
    }
  };

  return (
    <div>
      <AdminHeader
        title="Pricing Plans Management"
        subtitle="Create, configure, highlight, and delete customer-facing SaaS subscription tiers."
        action={
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
            className="font-bold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all px-4 py-2"
            onClick={handleOpenCreate}
          >
            New Plan
          </Button>
        }
      />

      {/* Success Notification */}
      {notification && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 shadow-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl flex items-center justify-between text-sm text-red-700 dark:text-red-400 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <Button variant="outline" size="sm" onClick={fetchPlans} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Retry
          </Button>
        </div>
      )}

      {/* Plans Management Table */}
      <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none rounded-2xl">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : plans.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm min-w-[650px]">
              <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Tier Name</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Billing Cycle</th>
                  <th className="py-4 px-6">Features</th>
                  <th className="py-4 px-6">Highlight</th>
                  <th className="py-4 px-6">Last Updated</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {plans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{plan.name}</span>
                        {plan.highlighted && (
                          <Badge variant="cyan" size="sm">
                            <Sparkles className="w-3 h-3 fill-cyan-500 inline mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-cyan-600 dark:text-cyan-400 font-bold text-base whitespace-nowrap">
                      {formatCurrency(plan.price)}
                    </td>
                    <td className="py-4 px-6 capitalize text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                        {plan.billingCycle}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-xs whitespace-nowrap font-medium">
                      {plan.features.length} feature items
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleHighlighted(plan)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                          plan.highlighted
                            ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 hover:bg-cyan-100 dark:hover:bg-cyan-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {plan.highlighted ? 'Highlighted' : 'Standard'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(plan.updatedAt || plan.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 text-xs font-semibold"
                          onClick={() => handleOpenEdit(plan)}
                          leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="h-8 text-xs font-semibold"
                          onClick={() => handleDelete(plan._id, plan.name)}
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No pricing plans configured yet.</p>
            <Button variant="primary" size="sm" onClick={handleOpenCreate}>
              Create First Pricing Plan
            </Button>
          </div>
        )}
      </Card>

      {/* Plan Create / Edit Modal */}
      <PlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setNotification(
            editingPlan
              ? `Plan "${editingPlan.name}" updated successfully.`
              : 'New pricing plan created successfully.'
          );
          fetchPlans();
          setTimeout(() => setNotification(null), 4000);
        }}
        initialPlan={editingPlan}
      />
    </div>
  );
}
