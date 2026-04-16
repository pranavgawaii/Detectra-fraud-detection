"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/branding/BrandLogo";
import { motion } from "framer-motion";

type AuthShellProps = {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  children: ReactNode;
  footerLinks?: { label: string; href: string }[];
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Help", href: "#" },
  ],
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#030303] text-neutral-400 font-sans flex flex-col items-center justify-center p-6 relative selection:bg-[var(--primary)] selection:text-white overflow-hidden">
      {/* Premium Light Orbs */}
      <div className="absolute top-0 right-[20%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[var(--primary)]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="flex justify-center mb-8">
          <BrandLogo href="/" size="md" />
        </div>

        <div className="text-center mb-10">
          {eyebrow && (
            <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-4">{eyebrow}</p>
          )}
          <h1 className="text-[2.2rem] font-black tracking-tight text-white mb-2 leading-none">{title}</h1>
          <div className="text-neutral-400 text-[0.95rem] leading-relaxed max-w-[340px] mx-auto">
            {description}
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative z-10">
            {children}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-widest text-neutral-600">
            {footerLinks.map((link, i) => (
              <div key={link.label} className="flex items-center gap-4">
                <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                {i < footerLinks.length - 1 && <div className="w-1 h-1 rounded-full bg-neutral-800" />}
              </div>
            ))}
          </div>

          <Link 
            href="/" 
            className="group flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[var(--primary)]" />
            Back to Command Center
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
