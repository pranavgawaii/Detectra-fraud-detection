"use client";

import React, { useState } from 'react';
import { Search, Target, Users } from 'lucide-react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { LandingFooter } from '@/components/landing/LandingFooter';

/**
 * Detectra Landing Page
 * High-performance, minimalist interface for elite investigation units.
 * Consistently aligned and modularized for maximum maintainability.
 */
export default function LandingPage() {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="antialiased selection:bg-neutral-800 selection:text-neutral-200 overflow-x-hidden bg-[#0A0A0A] text-neutral-400 font-sans min-h-screen relative">
      
      <LandingHeader menuState={menuState} setMenuState={setMenuState} />

      <main className="pt-32 pb-24 relative">
        <HeroSection />

        {/* Social Proof */}
        <section className="border-y py-10 mt-10 border-neutral-800/50 bg-[#0A0A0A]/50 relative z-10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <p className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-8 text-center">Trusted by Leading Indian Insurers</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              {['HDFC ERGO', 'Star Health', 'ICICI Lombard', 'Niva Bupa', 'Apollo Munich'].map((brand) => (
                <div key={brand} className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />

        {/* Philosophy Section */}
        <section id="philosophy" className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-neutral-800/50 relative z-10">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4 text-white">Our foundation.</h2>
            <p className="text-lg max-w-xl mx-auto md:mx-0 text-neutral-400">The core principles that drive our engineering-grade approach to investigating fraud.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
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
      </main>

      <LandingFooter />
    </div>
  );
}

const PhilosophyCard = ({ icon, label, title, content }: any) => (
  <div className="flex flex-col">
    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
      {icon}
      {label}
    </h3>
    <h4 className="text-2xl font-normal tracking-tight mb-3 leading-snug text-white">{title}</h4>
    <p className="text-base leading-relaxed text-neutral-400 mt-2">{content}</p>
  </div>
);
