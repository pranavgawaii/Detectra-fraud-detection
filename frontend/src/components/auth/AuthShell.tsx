"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/branding/BrandLogo";
import { Glow } from "@/components/ui/glow";
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
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
  ],
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#060606] text-neutral-400 font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative selection:bg-emerald-900/30 selection:text-emerald-300 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Glow variant="above" className="opacity-40" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <BrandLogo href="/" size="md" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          {eyebrow && (
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-500/60 mb-3">{eyebrow}</p>
          )}
          <h1 className="text-[1.75rem] font-semibold tracking-[-0.02em] text-white mb-2.5 leading-none">{title}</h1>
          <div className="text-neutral-500 text-[0.85rem] leading-relaxed max-w-[380px] mx-auto">
            {description}
          </div>
        </div>

        {/* Card */}
        <div className="relative">
          {/* Card border glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] via-transparent to-transparent pointer-events-none" />
          <div className="relative bg-[#0C0C0C] border border-neutral-800/50 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3 text-[0.65rem] font-medium text-neutral-700">
            {footerLinks.map((link, i) => (
              <div key={link.label} className="flex items-center gap-3">
                <Link href={link.href} className="hover:text-neutral-400 transition-colors uppercase tracking-wider">{link.label}</Link>
                {i < footerLinks.length - 1 && <span className="text-neutral-800">·</span>}
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2 text-[0.7rem] font-medium text-neutral-600 hover:text-white transition-all"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
