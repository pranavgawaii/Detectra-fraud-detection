"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans flex flex-col items-center justify-center p-6 relative selection:bg-[var(--primary)] selection:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="flex justify-center mb-10">
          <BrandLogo href="/" size="md" tone="dark" />
        </div>

        <div className="text-center mb-8">
          {eyebrow && (
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--primary)] mb-3">{eyebrow}</p>
          )}
          <h1 className="text-[1.8rem] font-bold tracking-tight text-slate-900 mb-2 leading-none">{title}</h1>
          <div className="text-slate-500 text-[0.95rem] leading-relaxed max-w-[340px] mx-auto">
            {description}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          {children}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 text-[0.7rem] font-semibold text-slate-400">
            {footerLinks.map((link, i) => (
              <div key={link.label} className="flex items-center gap-4">
                <Link href={link.href} className="hover:text-slate-900 transition-colors uppercase tracking-wider">{link.label}</Link>
                {i < footerLinks.length - 1 && <div className="w-1 h-1 rounded-full bg-slate-200" />}
              </div>
            ))}
          </div>

          <Link 
            href="/" 
            className="group flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-slate-900 transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-slate-400" />
            Back to Command Center
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
