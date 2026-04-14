"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Terminal, MapPin, Mail, ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/branding/BrandLogo";

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
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-400 font-sans overflow-hidden relative selection:bg-neutral-800 selection:text-neutral-200">
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vh] blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4 bg-neutral-900/40"></div>
          {/* Subtle red tint for Detectra branding */}
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4 bg-red-950/20"></div>
      </div>

      <div className="grid min-h-screen lg:grid-cols-[1fr_580px] relative z-10 w-full max-w-[1600px] mx-auto">
        {/* Left: Creative / Info Section */}
        <aside className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay mask-hero-grid">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-white transition-colors mb-12">
               <ArrowLeft size={16} /> Back to main site
            </Link>
            <BrandLogo href="/" size="md" />
          </div>

          <div className="relative max-w-xl z-10 mt-auto mb-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-400"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-neutral-300">{asideLabel}</span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-medium tracking-tight leading-[1.1] text-white mb-6">
              {asideTitle}
            </h2>
            
            <p className="text-lg text-neutral-400 leading-relaxed max-w-md mb-10">
              {asideDescription}
            </p>

            <div className="space-y-4 mb-12">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3 transition-transform hover:translate-x-1 duration-200">
                  <div className="w-5 h-5 rounded border border-neutral-700 bg-neutral-900/50 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-neutral-400" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">{item}</span>
                </div>
              ))}
            </div>

            {asideCallout}
          </div>

          <div className="relative flex items-center justify-between border-t border-neutral-800/50 pt-8 z-10">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[0.65rem] font-semibold text-neutral-500 uppercase tracking-widest mb-1">Infrastructure</span>
                <span className="text-xs font-medium text-neutral-300">SOC2 Type II • ISO 27001</span>
              </div>
            </div>
            {asideFooter}
          </div>
        </aside>

        {/* Right: Auth Form Section */}
        <main className="flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-y-auto bg-[#0A0A0A]/50 backdrop-blur-3xl border-l border-neutral-800/50">
          <div className="w-full max-w-[420px] relative z-20">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-between items-center mb-10">
              <BrandLogo href="/" size="sm" />
              <Link href="/" className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-white transition-colors">
                Main site <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-900/50 border border-neutral-800 mb-4 lg:hidden">
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-300">{eyebrow}</span>
              </div>
              <p className="hidden lg:block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-3">{eyebrow}</p>
              <h1 className="text-3xl font-medium tracking-tight mb-3 text-white">{title}</h1>
              <div className="text-neutral-400 text-sm leading-relaxed">
                {description}
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-neutral-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
               {/* Form background accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                {children}
              </div>
            </div>

            {/* Bottom links/info */}
            <div className="mt-10 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
              <div className="flex gap-6">
                {["Privacy Policy", "Terms of Service", "Help Center"].map(l => (
                  <Link key={l} href="#" className="text-xs font-medium text-neutral-500 hover:text-white transition-colors">{l}</Link>
                ))}
              </div>
              <p className="text-xs text-neutral-600 font-medium">
                © 2026 Detectra Inc. All rights reserved.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
