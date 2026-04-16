"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Mail } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';

export const LandingFooter = () => {
  return (
    <section id="contact" className="relative overflow-hidden pt-32 pb-12 border-t bg-[#0A0A0A] border-neutral-800/50">
      <div className="absolute inset-0 bg-gradient-to-b via-transparent z-0 pointer-events-none from-[#0A0A0A] to-[#0A0A0A] opacity-80"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-32">
        <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-6 leading-[1.1] text-white">Ready to secure your<br/>claims processing?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto font-normal text-neutral-400">We are onboarding select Indian health insurance providers for pilot programs. Secure your spot in the trial.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="mailto:hello@detectra.in" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-full transition-colors text-base shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-white text-black hover:bg-neutral-200">
            Talk to our experts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-2">
              <BrandLogo size="sm" priority />
            </Link>
            <p className="text-sm text-neutral-500">Fraud resolution engineered for scale.</p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-neutral-400">
            <Link href="#features" className="transition-colors hover:text-white">Features</Link>
            <Link href="#solutions" className="transition-colors hover:text-white">Solutions</Link>
            <Link href="#philosophy" className="transition-colors hover:text-white">Philosophy</Link>
            <Link href="#contact" className="transition-colors hover:text-white">Contact</Link>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-neutral-800/50 text-neutral-600">
          <p>© 2026 Detectra AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#contact" className="transition-colors hover:text-neutral-400"><MapPin className="w-5 h-5" /></Link>
            <Link href="#contact" className="transition-colors hover:text-neutral-400"><Mail className="w-5 h-5" /></Link>
          </div>
        </div>
      </footer>
    </section>
  );
};
