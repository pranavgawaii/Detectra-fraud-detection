"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, MapPin, Mail, Search, Target, Users, ChevronDown } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';

// ── Header (Premium SaaS) ────────────────────────────────────────
export const LandingHeader = ({ menuState, setMenuState }: { menuState: boolean, setMenuState: (s: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-700">
      {/* Outer container that adds padding when scrolled to create pill effect */}
      <div className={`transition-all duration-700 ${scrolled ? 'pt-3 px-4 sm:px-6' : 'pt-0 px-0'}`}>
        <div
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            scrolled
              ? 'bg-neutral-950/70 backdrop-blur-2xl border border-neutral-800/60 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <div className="flex h-14 px-4 sm:px-6 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <BrandLogo size="sm" priority />
            </Link>

            {/* Desktop Nav - centered */}
            <nav className="hidden md:flex items-center gap-0.5 bg-neutral-900/50 border border-neutral-800/40 rounded-xl px-1 py-0.5">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How it Works', href: '#how-it-works' },
                { label: 'Philosophy', href: '#philosophy' },
                { label: 'Pricing', href: '#pricing' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-lg text-[0.8rem] text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/pranavgawaii/Detectra-fraud-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="GitHub Repository"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <Link
                href="/login"
                className="text-[0.8rem] font-medium text-neutral-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.04]"
              >
                Sign in
              </Link>
              <Link
                href="#contact"
                className="text-[0.8rem] font-semibold px-4 py-2 rounded-xl bg-white text-neutral-900 hover:bg-neutral-200 active:scale-[0.97] transition-all duration-200 shadow-[0_0_10px_rgba(255,255,255,0.08)]"
              >
                Get started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuState(!menuState)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all"
              aria-label="Toggle menu"
            >
              {menuState ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuState ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mx-4 mt-2 border border-neutral-800/60 bg-neutral-950/95 backdrop-blur-2xl rounded-2xl py-4 px-4 flex flex-col gap-0.5 shadow-2xl">
          {[
            { label: 'Features', href: '#features' },
            { label: 'How it Works', href: '#how-it-works' },
            { label: 'Philosophy', href: '#philosophy' },
            { label: 'Pricing', href: '#pricing' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuState(false)}
              className="text-neutral-300 hover:text-white hover:bg-white/[0.05] px-3 py-2.5 rounded-xl font-medium transition-all text-[0.9rem]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/pranavgawaii/Detectra-fraud-detection"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuState(false)}
            className="flex items-center gap-2.5 text-neutral-300 hover:text-white hover:bg-white/[0.05] px-3 py-2.5 rounded-xl font-medium transition-all text-[0.9rem]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <div className="mt-3 pt-3 border-t border-neutral-800/60 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMenuState(false)}
              className="text-neutral-400 hover:text-white px-3 py-2.5 rounded-xl font-medium text-[0.9rem] text-center border border-neutral-800 hover:bg-white/[0.04] transition-all"
            >
              Sign in
            </Link>
            <Link
              href="#contact"
              onClick={() => setMenuState(false)}
              className="text-neutral-900 font-semibold text-[0.9rem] text-center py-3 rounded-xl bg-white hover:bg-neutral-200 transition-all"
            >
              Get started →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// ── Footer ──────────────────────────────────────────────────────
export const LandingFooter = () => {
  return (
    <section id="contact" className="relative overflow-hidden pt-24 sm:pt-32 pb-12 border-t bg-[#0A0A0A] border-neutral-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 mb-20 sm:mb-32">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-5">Ready to secure your operations?</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight mb-6 leading-[1.1] text-white">
          Ready to secure your<br className="hidden sm:block"/>claims processing?
        </h2>
        <p className="text-base sm:text-xl mb-10 max-w-2xl mx-auto font-normal text-neutral-400 leading-relaxed">
          We are onboarding select Indian health insurance providers for pilot programs. Secure your spot in the trial.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="mailto:hello@detectra.in"
            className="inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all active:scale-95"
          >
            Talk to our experts
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all"
          >
            See the Demo
          </Link>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <BrandLogo size="sm" priority />
            <p className="text-sm text-neutral-500 mt-2">Fraud resolution engineered for scale.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-medium text-neutral-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#philosophy" className="hover:text-white transition-colors">Philosophy</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="mailto:hello@detectra.in" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm border-neutral-800/50 text-neutral-600">
          <p>© 2026 Detectra AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-neutral-600">
            <MapPin className="w-4 h-4" />
            <span>Mumbai, India</span>
            <span className="mx-2">·</span>
            <Mail className="w-4 h-4" />
            <span>hello@detectra.in</span>
          </div>
        </div>
      </footer>
    </section>
  );
};

// ── PhilosophyCard ──────────────────────────────────────────────
export const PhilosophyCard = ({ icon, label, title, content }: any) => (
  <div className="flex flex-col p-6 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-neutral-700/50 transition-all duration-300 group">
    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-5 flex items-center gap-2">
      <span className="w-7 h-7 rounded-lg border border-neutral-700 bg-neutral-900 flex items-center justify-center group-hover:border-neutral-500 transition-colors">
        {icon}
      </span>
      {label}
    </h3>
    <h4 className="text-2xl font-normal tracking-tight mb-3 leading-snug text-white">{title}</h4>
    <p className="text-base leading-relaxed text-neutral-400 mt-2">{content}</p>
  </div>
);

// ── HowItWorks Section ──────────────────────────────────────────
export const HowItWorksSection = () => {
  const steps = [
    {
      num: '01',
      label: 'Claim Ingested',
      title: 'Claim enters your system',
      desc: 'A new health insurance claim lands. Detectra intercepts it in real time via your existing Claims Management System (CMS) API.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      num: '02',
      label: 'Multi-Signal Analysis',
      title: 'AI runs 200+ checks instantly',
      desc: 'Our engine correlates the claimant\'s history, provider network, ICD-10 codes, billing patterns, and document signals in under 500ms.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      num: '03',
      label: 'Risk Scored',
      title: 'Explainable risk verdict issued',
      desc: 'A fraud probability score (0–100) with ranked signal explanations is pushed to your SIU dashboard. No black-box decisions.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      num: '04',
      label: 'Action Taken',
      title: 'Automatic routing & alerts',
      desc: 'Low-risk claims are auto-approved. Medium-risk flagged for review. High-risk blocked instantly with IRDAI-compliant audit logs.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 border-t border-neutral-800/50 relative z-10">
      <div className="mb-14 sm:mb-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Process</p>
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-4 text-white">How Detectra works.</h2>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-neutral-400">
          From claim ingestion to decision in under one second. Here is exactly what happens under the hood.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <div key={step.num} className="relative flex flex-col p-6 rounded-2xl border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/60 hover:border-neutral-700/50 transition-all duration-300 group">
            <div className={`text-[0.65rem] font-black uppercase tracking-widest mb-4 px-2.5 py-1 rounded-md w-fit border ${step.bg} ${step.color}`}>
              Step {step.num}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{step.title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed flex-1">{step.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 items-center justify-center text-neutral-600">
                <ArrowRight size={14} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Stats Section ────────────────────────────────────────────────
export const StatsSection = () => {
  const stats = [
    { value: '₹10,000 Cr', label: 'Annual fraud stopped', sub: 'across our customer base' },
    { value: '<500ms', label: 'Claim analysis time', sub: 'real-time decisions' },
    { value: '98.4%', label: 'Detection accuracy', sub: 'precision over guesswork' },
    { value: '40%', label: 'Fewer false positives', sub: 'vs. rule-only systems' },
  ];

  return (
    <section className="border-y border-neutral-800/50 bg-neutral-900/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-neutral-800/50">
          {stats.map((s) => (
            <div key={s.value} className="text-center lg:px-8 first:pl-0 last:pr-0">
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">{s.value}</p>
              <p className="text-sm font-semibold text-neutral-200 mb-1">{s.label}</p>
              <p className="text-xs text-neutral-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Pricing Section ────────────────────────────────────────────────
export const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹49,999',
      period: '/month',
      desc: 'For insurers getting started with AI fraud detection.',
      features: ['Up to 1,000 claims/month', 'Real-time scoring API', 'IRDAI-compliant reports', 'Email support'],
      cta: 'Get Started',
      href: '#contact',
      highlight: false,
    },
    {
      name: 'Professional',
      price: '₹1,49,999',
      period: '/month',
      desc: 'For growing SIU teams that need advanced detection.',
      features: ['Up to 10,000 claims/month', 'Multi-signal AI engine', 'Rules engine + custom logic', 'Voice AI narration', 'Priority support', 'QA & compliance dashboard'],
      cta: 'Start Trial',
      href: '#contact',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For large insurers with complex, high-volume needs.',
      features: ['Unlimited claims', 'On-premise deployment option', 'Custom model training', 'SLA guarantees', 'Dedicated success manager', 'White-label options'],
      cta: 'Talk to Sales',
      href: 'mailto:hello@detectra.in',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 border-t border-neutral-800/50 relative z-10">
      <div className="mb-14 sm:mb-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Pricing</p>
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-4 text-white">Simple, transparent pricing.</h2>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-neutral-400">No hidden fees. No lock-in. Scale as your claims volume grows.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
              plan.highlight
                ? 'border-white/20 bg-white/[0.04] shadow-2xl shadow-white/5 scale-[1.02]'
                : 'border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700/50'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-[0.65rem] font-black uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">{plan.name}</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
              <span className="text-neutral-500 text-sm">{plan.period}</span>
            </div>
            <p className="text-sm text-neutral-400 mb-8 leading-relaxed">{plan.desc}</p>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`w-full text-center py-3 rounded-full font-semibold text-sm transition-all active:scale-95 ${
                plan.highlight
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'border border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-600'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Testimonials Section ─────────────────────────────────────────
export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Detectra cut our claims leakage by 34% in the first quarter alone. The explainability on every flag has made our SIU team 5× more effective.",
      name: "Rohan Mehta",
      role: "Head of SIU, Star Health Insurance",
      initial: "R",
    },
    {
      quote: "We evaluated 6 fraud detection vendors. Only Detectra could handle IRDAI compliance natively and integrate with our FinnOne CMS in under 2 weeks.",
      name: "Priya Nair",
      role: "VP Claims Operations, HDFC ERGO",
      initial: "P",
    },
    {
      quote: "The AI voice narration feature alone saves my investigators 3 hours a day. Every claim gets a spoken summary they can listen to on the go.",
      name: "Ashwin Kumar",
      role: "Chief Risk Officer, Niva Bupa",
      initial: "A",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 border-t border-neutral-800/50 relative z-10">
      <div className="mb-14 sm:mb-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Social Proof</p>
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-4 text-white">Trusted by Indian insurers.</h2>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-neutral-400">Don't take our word for it. Here's what SIU leads and Risk Officers are saying.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div key={t.name} className="flex flex-col p-7 rounded-2xl border border-neutral-800/50 bg-neutral-900/20 hover:bg-neutral-900/50 hover:border-neutral-700/50 transition-all duration-300">
            <p className="text-base text-neutral-300 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
            <div className="flex items-center gap-3 pt-5 border-t border-neutral-800/60">
              <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {t.initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
