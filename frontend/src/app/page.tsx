"use client";

import React, { useState } from 'react';
import { Search, Target, Users } from 'lucide-react';
import {
  LandingHeader,
  LandingFooter,
  PhilosophyCard,
  HowItWorksSection,
  StatsSection,
  PricingSection,
  TestimonialsSection,
} from '@/components/landing/LandingComponents';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';

/**
 * Detectra Landing Page
 * Premium, mobile-first layout with full section coverage.
 */
export default function LandingPage() {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="antialiased selection:bg-neutral-800 selection:text-neutral-200 overflow-x-hidden bg-[#0A0A0A] text-neutral-400 font-sans min-h-screen relative">

      <LandingHeader menuState={menuState} setMenuState={setMenuState} />

      <main className="pt-24 sm:pt-32 pb-0 relative">

        {/* ── Hero ─────────────────────────── */}
        <HeroSection />

        {/* ── Trusted By (Social Proof Bar) ─ */}
        <section className="border-y py-10 mt-10 border-neutral-800/50 bg-[#0A0A0A]/50 relative z-10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
            <p className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-8 text-center">
              Trusted by Leading Indian Insurers
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-16 opacity-60">
              {['HDFC ERGO', 'Star Health', 'ICICI Lombard', 'Niva Bupa', 'Apollo Munich'].map((brand) => (
                <div
                  key={brand}
                  className="text-lg sm:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Bar ────────────────────── */}
        <StatsSection />

        {/* ── Feature Grid ─────────────────── */}
        <FeatureGrid />

        {/* ── How It Works ─────────────────── */}
        <HowItWorksSection />

        {/* ── Testimonials ─────────────────── */}
        <TestimonialsSection />

        {/* ── Philosophy ───────────────────── */}
        <section id="philosophy" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 border-t border-neutral-800/50 relative z-10">
          <div className="mb-14 sm:mb-20 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Foundation</p>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-4 text-white">Our foundation.</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto sm:mx-0 text-neutral-400">
              The core principles that drive our engineering-grade approach to investigating fraud.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <PhilosophyCard
              icon={<Search className="w-4 h-4" />}
              label="Vision"
              title={<>Fraud is systemic.<br/>We make it detectable.</>}
              content="We believe fraud detection should connect the dots — across claims, providers, and historical patterns. Not as isolated rules, but as one intelligent network."
            />
            <PhilosophyCard
              icon={<Target className="w-4 h-4" />}
              label="Mission"
              title={<>Precision over<br/>guesswork.</>}
              content="Every flag, every anomaly, every node connection is calculated with algorithmic rigor. We minimize false positives so your SIU teams work efficiently."
            />
            <PhilosophyCard
              icon={<Users className="w-4 h-4" />}
              label="Philosophy"
              title={<>The platform<br/>advantage.</>}
              content="We aren't a black box tool that sits isolated. We are a unified detection layer that seamlessly integrates with your existing claims management software."
            />
          </div>
        </section>

        {/* ── Pricing ──────────────────────── */}
        <PricingSection />

      </main>

      <LandingFooter />
    </div>
  );
}
