'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, PlusCircle, CheckCircle2, X, Sparkles, Trash2, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  quote: string;
  metric: string;
  rating?: number;
  isUserSubmitted?: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Samantha Reed',
    role: 'Director of Engineering',
    company: 'CloudVeloce',
    initials: 'SR',
    color: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
    quote:
      'Flowmetrics helped us spot PR review stagnation before it impacted our quarterly roadmap. Our cycle time dropped from 4.2 days down to 18 hours within 3 sprints.',
    metric: '68% faster PR cycle time',
    rating: 5,
  },
  {
    name: 'Liam Gallagher',
    role: 'VP of Technology',
    company: 'ApexLogic Distributed',
    initials: 'LG',
    color: 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/30',
    quote:
      'Finally, an engineering intelligence platform that treats developers like creative professionals rather than factory workers. The focus flow metrics are indispensable.',
    metric: 'Zero micromanagement',
    rating: 5,
  },
  {
    name: 'Dr. Aris Thorne',
    role: 'Head of Infrastructure',
    company: 'HyperScale AI',
    initials: 'AT',
    color: 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/30',
    quote:
      'The predictive sprint completion modeling is scary accurate. Stakeholders now have total confidence in our delivery dates, and our engineers are rarely context-switched.',
    metric: '96% on-time sprint delivery',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [quote, setQuote] = useState('');
  const [metric, setMetric] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formError, setFormError] = useState('');

  // Load user submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('flowmetrics_user_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTestimonials([...parsed, ...DEFAULT_TESTIMONIALS]);
        }
      }
    } catch (e) {
      console.error('Failed to load customer validations from storage', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !company.trim() || !quote.trim()) {
      setFormError('Please fill in all required fields (Name, Role, Company, and Review).');
      return;
    }

    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'CU';

    const colorVariants = [
      'bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/30',
      'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
      'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
      'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30',
    ];
    const randomColor = colorVariants[Math.floor(Math.random() * colorVariants.length)];

    const newTestimonial: TestimonialItem = {
      id: `review-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      initials,
      color: randomColor,
      quote: quote.trim(),
      metric: metric.trim() || 'Verified Impact',
      rating,
      isUserSubmitted: true,
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);

    // Persist user submissions
    try {
      const userSubmissions = updated.filter((item) => item.isUserSubmitted);
      localStorage.setItem('flowmetrics_user_testimonials', JSON.stringify(userSubmissions));
    } catch (e) {
      console.error('Failed to save customer validation', e);
    }

    // Reset Form & Close Modal
    setName('');
    setRole('');
    setCompany('');
    setQuote('');
    setMetric('');
    setRating(5);
    setFormError('');
    setIsModalOpen(false);

    // Toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleDeleteUserReview = (id?: string) => {
    if (!id) return;
    const filtered = testimonials.filter((t) => t.id !== id);
    setTestimonials(filtered);
    try {
      const userSubmissions = filtered.filter((item) => item.isUserSubmitted);
      localStorage.setItem('flowmetrics_user_testimonials', JSON.stringify(userSubmissions));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="testimonials" className="py-12 sm:py-20 md:py-24 bg-slate-50/70 dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800/80 relative transition-colors">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-sky-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Badge variant="purple" size="md">
              Customer Validation
            </Badge>
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" /> 100% Verified
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by High-Output Engineering Leaders
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            See how real engineering teams use Flowmetrics to scale focus and eliminate status meeting bloat.
          </p>

          {/* User action button to submit Customer Validation */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="glow"
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4 text-slate-950" />}
              className="font-bold shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20"
            >
              Share Your Experience
            </Button>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-fade-in-up shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-sm">
              <span className="font-bold">Thank you for your validation!</span> Your story has been posted successfully.
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="ml-auto text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <Card
              key={item.id || item.name + idx}
              hoverEffect
              className="relative flex flex-col justify-between p-8 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-slate-950/40 rounded-2xl transition-all"
            >
              {item.isUserSubmitted && (
                <div className="absolute -top-3 right-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-md">
                    <Sparkles className="w-3 h-3" /> Community Review
                  </span>
                  <button
                    onClick={() => handleDeleteUserReview(item.id)}
                    title="Remove your review"
                    className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Star rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {item.metric && (
                    <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {item.metric}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border ${item.color}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role}, <span className="text-cyan-600 dark:text-cyan-400 font-medium">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Customer Validation Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Share Customer Validation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tell the community how Flowmetrics helped your team
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-300 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-medium">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Job Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead SRE / VP Eng"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              {/* Company & Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ScaleTech Labs"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Key Outcome / Metric (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50% less meeting load"
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              {/* Story / Quote */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Experience / Review *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How did Flowmetrics improve your sprint predictability, focus hours, or team delivery?"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

