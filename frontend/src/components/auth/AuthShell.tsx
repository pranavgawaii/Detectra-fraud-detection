"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-400 font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative selection:bg-white/10 selection:text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-white/[0.02] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-gradient-to-t from-white/[0.01] to-transparent rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <BrandLogo href="/" size="md" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          {eyebrow && (
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">{eyebrow}</p>
          )}
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-white mb-2 leading-none">{title}</h1>
          <div className="text-neutral-500 text-[0.9rem] leading-relaxed max-w-[340px] mx-auto">
            {description}
          </div>
        </div>

        {/* Card */}
        <div className="bg-neutral-900/60 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl shadow-black/30">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center gap-4 text-[0.65rem] font-medium text-neutral-600">
            {footerLinks.map((link, i) => (
              <div key={link.label} className="flex items-center gap-4">
                <Link href={link.href} className="hover:text-neutral-300 transition-colors uppercase tracking-wider">{link.label}</Link>
                {i < footerLinks.length - 1 && <div className="w-1 h-1 rounded-full bg-neutral-800" />}
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-neutral-600 hover:text-white transition-all"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
