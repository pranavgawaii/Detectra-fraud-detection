"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, MapPin, Mail, Search, Target, Users } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';

// ── Header ──────────────────────────────────────────────────
export const LandingHeader = ({ menuState, setMenuState }: { menuState: boolean, setMenuState: (s: boolean) => void }) => {
  return (
    <header className="fixed top-1 inset-x-0 z-50 border-b backdrop-blur-md border-neutral-800/50 bg-[#0A0A0A]/80">
      <div className="flex h-14 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <BrandLogo size="sm" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-base">
            <Link href="#features" className="transition-colors hover:text-neutral-100">Features</Link>
            <Link href="#solutions" className="transition-colors hover:text-neutral-100">Solutions</Link>
            <Link href="#philosophy" className="transition-colors hover:text-neutral-100">Philosophy</Link>
            <Link href="#contact" className="transition-colors hover:text-neutral-100">Contact</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 text-sm md:text-base">
          <Link href="/dashboard" className="hidden sm:inline-block font-medium text-neutral-400 hover:text-white transition-colors px-2">Log in</Link>
          <Link href="#contact" className="font-medium px-4 py-1.5 rounded-full transition-colors bg-white text-black hover:bg-neutral-200">Request Demo</Link>
          <button onClick={() => setMenuState(!menuState)} className="md:hidden text-white/70">
            {menuState ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
      {menuState && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0A0A0AC0] backdrop-blur-xl absolute w-full left-0 py-4 px-6 flex flex-col gap-4">
          <Link href="#features" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Features</Link>
          <Link href="#solutions" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Solutions</Link>
          <Link href="#philosophy" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Philosophy</Link>
          <Link href="/dashboard" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white mt-4 border-t border-neutral-800 pt-4">Log in</Link>
        </div>
      )}
    </header>
  );
};

// ── Footer ──────────────────────────────────────────────────
export const LandingFooter = () => {
  return (
    <section id="contact" className="relative overflow-hidden pt-32 pb-12 border-t bg-[#0A0A0A] border-neutral-800/50">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-32">
        <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-6 leading-[1.1] text-white">Ready to secure your<br/>claims processing?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto font-normal text-neutral-400">We are onboarding select Indian health insurance providers for pilot programs. Secure your spot in the trial.</p>
        <Link href="mailto:hello@detectra.in" className="inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200">
          Talk to our experts
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <footer className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <BrandLogo size="sm" priority />
            <p className="text-sm text-neutral-500 mt-2">Fraud resolution engineered for scale.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-neutral-400">
            <Link href="#features" className="hover:text-white">Features</Link>
            <Link href="#solutions" className="hover:text-white">Solutions</Link>
            <Link href="#philosophy" className="hover:text-white">Philosophy</Link>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-neutral-800/50 text-neutral-600">
          <p>© 2026 Detectra AI. All rights reserved.</p>
          <div className="flex gap-4">
            <MapPin className="w-5 h-5" />
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </footer>
    </section>
  );
};

// ── PhilosophyCard ──────────────────────────────────────────
export const PhilosophyCard = ({ icon, label, title, content }: any) => (
  <div className="flex flex-col">
    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
      {icon}
      {label}
    </h3>
    <h4 className="text-2xl font-normal tracking-tight mb-3 leading-snug text-white">{title}</h4>
    <p className="text-base leading-relaxed text-neutral-400 mt-2">{content}</p>
  </div>
);
