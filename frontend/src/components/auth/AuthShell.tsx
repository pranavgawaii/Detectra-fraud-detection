"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap, Lock } from "lucide-react";
import BrandLogo from "@/components/branding/BrandLogo";
import { BRAND } from "@/lib/brand";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  asideLabel: string;
  asideTitle: ReactNode;
  asideDescription: string;
  highlights: string[];
  asideCallout?: ReactNode;
  asideFooter?: ReactNode;
  children: ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  asideLabel,
  asideTitle,
  asideDescription,
  highlights,
  asideCallout,
  asideFooter,
  children,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] font-[var(--font-sans)] text-[var(--foreground)] overflow-hidden relative">
      {/* Background mesh gradients */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--primary)]/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
      
      <div className="grid min-h-screen lg:grid-cols-[1fr_580px] relative z-10">
        {/* Left: Creative / Info Section */}
        <aside className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          
          <div className="relative">
            <BrandLogo href="/" size="md" tone="dark" />
          </div>

          <div className="relative max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-6">
              <ShieldCheck size={14} className="text-[var(--primary)]" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--primary)]">{asideLabel}</span>
            </div>
            
            <h2 className="text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] mb-8">
              {asideTitle}
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed max-w-md mb-10">
              {asideDescription}
            </p>

            <div className="space-y-4 mb-12">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3 transition-transform hover:translate-x-1 duration-200">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center border border-[var(--primary)]/20">
                    <CheckCircle2 size={12} className="text-[var(--primary)]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            {asideCallout}
          </div>

          <div className="relative flex items-center justify-between border-t border-white/5 pt-8 mt-12">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest mb-1">Infrastructure</span>
                <span className="text-xs font-bold text-slate-300">SOC2 Type II • ISO 27001</span>
              </div>
            </div>
            {asideFooter}
          </div>
        </aside>

        {/* Right: Auth Form Section */}
        <main className="flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto bg-white/[0.02] backdrop-blur-3xl border-l border-white/5">
          <div className="w-full max-w-[420px]">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-10">
              <BrandLogo href="/" size="md" tone="dark" />
            </div>

            <div className="mb-10 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 lg:hidden">
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-blue-400">{eyebrow}</span>
              </div>
              <p className="hidden lg:block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--primary)] mb-3">{eyebrow}</p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">{title}</h1>
              <div className="text-slate-400 text-[0.92rem] leading-relaxed">
                {description}
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               {/* Form background accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)]/5 blur-[60px] rounded-full" />
              
              <div className="relative z-10">
                {children}
              </div>
            </div>

            {/* Bottom links/info */}
            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex gap-6">
                {["Privacy Policy", "Terms of Service", "Help Center"].map(l => (
                  <a key={l} href="#" className="text-[0.7rem] font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">{l}</a>
                ))}
              </div>
              <p className="text-[0.65rem] text-slate-600 font-medium">
                © 2026 Detectra Inc. All rights reserved.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
