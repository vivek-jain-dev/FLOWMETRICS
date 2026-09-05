import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { SocialProof } from '@/components/landing/SocialProof';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PricingSection } from '@/components/landing/PricingSection';
import { RoiCalculator } from '@/components/landing/RoiCalculator';
import { Testimonials } from '@/components/landing/Testimonials';
import { BlogSection } from '@/components/landing/BlogSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal delay={100}>
        <SocialProof />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <Features />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <PricingSection />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <RoiCalculator />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <BlogSection />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <CtaSection />
      </ScrollReveal>
    </>
  );
}
