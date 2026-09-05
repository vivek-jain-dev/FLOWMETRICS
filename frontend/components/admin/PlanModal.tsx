'use client';

import React, { useState, useEffect } from 'react';
import { PricingPlan } from '@/types';
import { PlanPayload, plansApi } from '@/lib/api/plans';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X, Plus, Trash2, AlertCircle, Sparkles, CreditCard } from 'lucide-react';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialPlan?: PricingPlan | null;
}

export const PlanModal: React.FC<PlanModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialPlan,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>(19);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [features, setFeatures] = useState<string[]>(['']);
  const [highlighted, setHighlighted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPlan) {
      setName(initialPlan.name);
      setPrice(initialPlan.price);
      setBillingCycle(initialPlan.billingCycle);
      setFeatures(initialPlan.features.length > 0 ? initialPlan.features : ['']);
      setHighlighted(initialPlan.highlighted);
    } else {
      setName('');
      setPrice(19);
      setBillingCycle('monthly');
      setFeatures(['Up to 10 team members', 'Core velocity metrics', 'Community support']);
      setHighlighted(false);
    }
    setError(null);
  }, [initialPlan, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    if (features.length <= 1) return;
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validFeatures = features.map((f) => f.trim()).filter((f) => f.length > 0);
    if (!name.trim()) {
      setError('Plan name is required');
      return;
    }
    if (Number(price) < 0 || isNaN(Number(price))) {
      setError('Price must be a valid non-negative number');
      return;
    }
    if (validFeatures.length === 0) {
      setError('At least one feature description is required');
      return;
    }

    const payload: PlanPayload = {
      name: name.trim(),
      price: Number(price),
      billingCycle,
      features: validFeatures,
      highlighted,
    };

    setIsLoading(true);
    try {
      if (initialPlan) {
        await plansApi.updatePlan(initialPlan._id, payload);
      } else {
        await plansApi.createPlan(payload);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save pricing plan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              {initialPlan ? 'Edit Pricing Plan' : 'Create New Pricing Plan'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-xs text-red-700 dark:text-red-400 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Plan Name"
            placeholder="e.g. Starter, Team Pro, Enterprise"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price ($ USD / mo)"
              type="number"
              min="0"
              placeholder="e.g. 29"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Billing Cycle
              </label>
              <select
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 text-sm shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Features Dynamic List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Feature Highlights
              </label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>

            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Feature item #${idx + 1}`}
                    className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm dark:shadow-none focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                      title="Delete feature"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Highlighted Checkbox Card */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
            <input
              type="checkbox"
              id="highlighted"
              checked={highlighted}
              onChange={(e) => setHighlighted(e.target.checked)}
              className="w-4 h-4 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500"
            />
            <label htmlFor="highlighted" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" /> Highlight as "Most Popular / Recommended" tier
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isLoading} className="font-semibold">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isLoading}
              className="font-bold shadow-md shadow-cyan-500/20 px-5"
            >
              {initialPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

