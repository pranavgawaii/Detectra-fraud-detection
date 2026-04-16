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
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-400 font-sans flex flex-col items-center justify-center p-6 relative selection:bg-white selection:text-black">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="flex justify-center mb-10">
          <BrandLogo href="/" size="md" />
        </div>

        <div className="text-center mb-10">
          {eyebrow && (
            <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-neutral-500 mb-3">{eyebrow}</p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-white mb-3">{title}</h1>
          <div className="text-neutral-500 text-[0.9rem] leading-relaxed">
            {description}
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-white/[0.08] rounded-[24px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle top light */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
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
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Command Center
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
