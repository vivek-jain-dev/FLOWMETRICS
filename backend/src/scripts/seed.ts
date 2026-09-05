import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { User } from '../models/user.model';
import { PricingPlan } from '../models/plan.model';
import { BlogPost } from '../models/blog.model';

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to database for seeding...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    // Clear existing data
    console.log('🧹 Purging existing collections...');
    await Promise.all([
      User.deleteMany({}),
      PricingPlan.deleteMany({}),
      BlogPost.deleteMany({}),
    ]);

    // 1. Create Admin User
    console.log('👤 Seeding Admin User...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, salt);

    const admin = await User.create({
      name: env.ADMIN_NAME,
      email: env.ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: 'admin',
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // 2. Create Pricing Plans
    console.log('💳 Seeding Pricing Plans...');
    const pricingPlans = [
      {
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
      },
      {
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
      },
      {
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
      },
    ];

    await PricingPlan.insertMany(pricingPlans);
    console.log(`✅ Seeded ${pricingPlans.length} pricing plans.`);

    // 3. Create Blog Posts
    console.log('📝 Seeding Blog Posts...');
    const blogPosts = [
      {
        title: 'How Engineering Teams Measure True Deep Work Without Micromanagement',
        slug: 'measuring-deep-work-without-micromanagement',
        excerpt:
          'Learn how modern engineering leaders track focus hours and cognitive load without tracking keystrokes or intrusive surveillance.',
        author: 'Elena Rostova, VP of Engineering',
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        tags: ['Engineering Leadership', 'Productivity', 'Deep Work'],
        featured: true,
        status: 'published',
        publishedAt: new Date('2026-08-15T10:00:00Z'),
        content: `
## The Fallacy of Activity Metrics

For decades, software development teams have relied on flawed proxies for productivity: lines of code written, commit frequencies, and raw ticket counts. In modern high-leverage software engineering, these metrics incentivize bloated codebases, fragmented commits, and hurried reviews.

### What Actually Correlates with Velocity?

True engineering velocity is driven by **uninterrupted cognitive flow**. When developers experience 3 to 4 hours of continuous focus time, defect rates decrease by up to 40% and solution quality increases dramatically.

> "High-performing engineering teams do not write more code; they solve the right problems with minimal architectural friction."

### How to Measure Focus Without Being Intrusive

1. **Context Switching Frequency**: Measure PR review turnaround times and calendar fragmentation rather than screen time.
2. **Work-in-Progress (WIP) Limits**: Keep active tasks per engineer under 2.
3. **Async Communication Windows**: Designate quiet mornings for heads-down development.

Flowmetrics aggregates anonymized VCS activity and sprint cadence into a single **Focus Score**, empowering managers to eliminate blockers before burnout strikes.
        `.trim(),
      },
      {
        title: 'The Hidden Cost of Context Switching in Distributed Development',
        slug: 'hidden-cost-of-context-switching',
        excerpt:
          'Every notification costs 23 minutes of refocusing time. Here is the mathematical framework for async-first workflows.',
        author: 'Marcus Vance, Principal Architect',
        coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        tags: ['Async Work', 'Remote Teams', 'Team Health'],
        featured: true,
        status: 'published',
        publishedAt: new Date('2026-08-22T14:30:00Z'),
        content: `
## Quantifying Cognitive Friction

When an engineer is interrupted mid-implementation, the mental model of the call stack, memory allocations, and edge cases evaporates. Research shows it takes an average of **23 minutes and 15 seconds** to return to the original level of cognitive immersion.

### The Mathematics of Fragmentation

Consider an engineer interrupted 4 times during an 8-hour workday:
- 4 interruptions × 23 minutes recovery = **92 minutes lost**
- Meeting overhead = **120 minutes**
- Effective creative focus remaining = **Less than 3 hours**

\`\`\`typescript
interface CognitiveBudget {
  totalHours: number;
  interruptionsCount: number;
  recoveryCostPerHour: number;
  netProductiveHours: number;
}
\`\`\`

### 3 Rules for Async Excellence
* **Document First**: Replace 15-minute syncs with concise RFCs.
* **Batch Review Windows**: Review pull requests twice daily at set intervals.
* **Smart Alert Routing**: Direct non-critical alerts to digested channels.
        `.trim(),
      },
      {
        title: 'Building a High-Trust Culture with Transparent Workload Analytics',
        slug: 'high-trust-culture-workload-analytics',
        excerpt:
          'Why top engineering organizations use team-level insights to protect bandwidth and prevent sprint fatigue.',
        author: 'Sarah Jenkins, Head of People Ops',
        coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        tags: ['Culture', 'Management', 'Burnout Prevention'],
        featured: false,
        status: 'published',
        publishedAt: new Date('2026-08-28T09:15:00Z'),
        content: `
## Why Transparency Breeds Trust

When workload metrics are kept opaque or used punitive-style, teams default to defensive behaviors. When workload data is visible to the entire team, it becomes an instrument of empathy and collective resilience.

### Spotting Imbalance Early

In traditional sprint retrospectives, workload imbalance is identified after sprint failure. With Flowmetrics live workload telemetry:

- You notice when 80% of complex PRs are landing on 2 senior engineers.
- You rebalance review loads before bottlenecks occur.
- You give junior engineers room to grow without overwhelming them.

### Healthy Metrics vs Toxic Metrics
- **Healthy**: Sprint Completion Variance, Focus Hours Ratio, PR Review Latency.
- **Toxic**: Keystroke monitoring, camera tracking, raw hours logged.
        `.trim(),
      },
      {
        title: 'Predictive Velocity: Forecasting Sprint Completion with Confidence',
        slug: 'predictive-velocity-sprint-forecasting',
        excerpt:
          'Move past gut-feel story point estimates with empirical Monte Carlo simulation for sprint deliverables.',
        author: 'David Chen, Lead Data Scientist',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        tags: ['Agile', 'Forecasting', 'Data Science'],
        featured: false,
        status: 'published',
        publishedAt: new Date('2026-09-01T16:00:00Z'),
        content: `
## The Failure of Story Point Estimations

Human estimation is notoriously biased by optimism. A 3-point task can balloon into a 3-week rabbit hole when hidden technical debt is uncovered.

### Monte Carlo Simulations in Action

Flowmetrics uses historical throughput distributions rather than static estimations to generate probability ranges for release dates:

1. **P50 Estimate**: 50% likelihood of delivery by Target Date A.
2. **P85 Estimate**: 85% likelihood of delivery by Target Date B (recommended for external SLAs).
3. **P95 Estimate**: 95% high-confidence commitment.

By communicating in confidence intervals, engineering teams build immense credibility with executive stakeholders and product leaders.
        `.trim(),
      },
      {
        title: 'Draft: The 2026 State of Distributed Engineering Workload',
        slug: '2026-state-of-distributed-workload-draft',
        excerpt:
          'An internal benchmark study evaluating 150+ remote software teams across North America and Europe.',
        author: 'Flowmetrics Research Group',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        tags: ['Research', 'Benchmarks', 'Draft'],
        featured: false,
        status: 'draft', // Testing draft isolation: Must NEVER appear in public endpoints
        content: `
## Internal Research Draft

This is an unreleased internal report compiling empirical observations from Q2 2026.

Key initial findings:
- Remote teams using structured async retrospectives ship 28% faster.
- Meeting load above 12 hours/week leads to a 3.4x spike in attrition risk.

*Note: Confidential pending peer review.*
        `.trim(),
      },
      {
        title: 'Draft: Upcoming Flowmetrics AI Co-Pilot Capabilities',
        slug: 'upcoming-flowmetrics-ai-copilot-draft',
        excerpt:
          'Sneak peek into automated sprint bottleneck detection and intelligent PR assignment.',
        author: 'Product Strategy Team',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        tags: ['AI', 'Roadmap', 'Draft'],
        featured: false,
        status: 'draft', // Testing draft isolation: Must NEVER appear in public endpoints
        content: `
## Previewing Flowmetrics AI

We are testing autonomous bottleneck resolution models capable of predicting PR review delays before PRs are even submitted.

*Confidential feature roadmap.*
        `.trim(),
      },
    ];

    await BlogPost.insertMany(blogPosts);
    console.log(`✅ Seeded ${blogPosts.length} blog posts (including 2 drafts for verification).`);

    console.log('\n========================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    console.log(`🔑 Admin Login:    ${env.ADMIN_EMAIL}`);
    console.log(`🔐 Admin Password: ${env.ADMIN_PASSWORD}`);
    console.log('========================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
