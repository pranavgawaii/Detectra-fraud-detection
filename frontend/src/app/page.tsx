"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/branding/BrandLogo";
import DashboardMockup from "@/components/dashboard/DashboardMockup";
import {
  ShieldAlert, ArrowRight, CheckCircle2,
  Zap, Activity, ShieldCheck, BarChart2, Users, Code2,
  Star, TrendingUp, Lock, Globe, Sparkles, Eye,
} from "lucide-react";
import { 
  navLinks, 
  features, 
  steps, 
  testimonials, 
  pricing, 
  stats, 
  companies 
} from "@/data/landing";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/lib/brand";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={20} />,
  Activity: <Activity size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  BarChart2: <BarChart2 size={20} />,
  Users: <Users size={20} />,
  Code2: <Code2 size={20} />,
};

/* ─── Components ───────────────────────────────── */

const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Base Gradient Layer */}
    <div className="absolute inset-0 bg-[#0d0d11]" />
    
    {/* Subtle Pattern Layer: Repeating Logo Watermark */}
    <div className="absolute inset-0 opacity-[0.03] select-none"
      style={{
        backgroundImage: `url(${BRAND.markSrc})`,
        backgroundSize: '120px 120px',
        backgroundRepeat: 'repeat',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}
    />

    {/* Glow Orbs */}
    <div className="absolute left-[10%] top-[-5%] h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
      style={{ background: "radial-gradient(circle, #72e3ad 0%, transparent 70%)" }} />
    <div className="absolute right-[-5%] top-[20%] h-[500px] w-[500px] rounded-full opacity-10 blur-[100px]"
      style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
    
    {/* Mesh Grid Overlay */}
    <div className="absolute inset-0 opacity-[0.05]"
      style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="relative min-h-screen text-[#e8e8e8] selection:bg-[#72e3ad]/30" style={{ fontFamily: "var(--font-sans)", background: "#0d0d11" }}>
      <BackgroundGrid />

      {/* ══ NAV ═════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 transition-all"
        style={{
          background: scrolled ? "rgba(13,13,17,0.92)" : "rgba(13,13,17,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-6">
          <BrandLogo href="/" size="sm" priority />

          <nav className="hidden flex-1 items-center gap-1 md:flex">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="rounded-lg px-3 py-1.5 text-[0.84rem] font-medium transition-all"
                style={{ color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/login"
              className="hidden rounded-xl border px-4 py-2 text-[0.82rem] font-semibold transition-all hover:border-white/20 sm:block"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
            >
              Sign In
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-[0.82rem] font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#72e3ad", color: "#0a1a10" }}
            >
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden pt-40 pb-32 px-6">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-[1200px] text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[0.75rem] font-bold text-[#72e3ad] backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span className="tracking-widest uppercase">The Next Evolution of Fraud Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 text-[4.5rem] font-extrabold leading-[1.0] tracking-[-0.04em] lg:text-[7rem]"
            style={{ color: "#fff" }}
          >
            Detect. <span className="text-[#72e3ad]">Decide.</span><br />
            Deepen Trust.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-12 max-w-[640px] text-[1.15rem] leading-relaxed text-white/50"
          >
            Detectra surfaces sub-second risk verdicts with neural precision. 
            Empowering the world's leading insurers to flag fraud before it exits the gate.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <Link href="/sign-up"
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-[#72e3ad] px-10 py-5 text-[1rem] font-black text-[#0a1a10] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(114,227,173,0.3)]"
            >
              Start Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-10 py-5 text-[1rem] font-bold text-white transition-all hover:bg-white/5 hover:border-white/20 active:scale-95 backdrop-blur-md"
            >
              <Eye size={19} /> Live Preview
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-20 grayscale transition-all hover:opacity-50 hover:grayscale-0"
          >
            {["IRDAI COMPLIANT", "SOC 2 TYPE II", "ISO 27001", "GDPR READY"].map(b => (
              <span key={b} className="text-[0.7rem] font-black tracking-[0.3em] text-white">
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Mockup Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-24 w-full max-w-[1100px] px-4"
        >
          <div className="group relative rounded-3xl border border-white/10 bg-black/40 p-2 backdrop-blur-2xl transition-all duration-500 hover:border-[#72e3ad]/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
            <DashboardMockup />
            
            {/* Absolute floating element */}
            <div className="absolute -left-12 bottom-12 hidden lg:block">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-[#72e3ad]/20 bg-[#0f1e3c]/90 p-5 backdrop-blur-xl shadow-2xl"
                style={{ width: 280 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                    <ShieldAlert size={20} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-red-500">Critical Alert</p>
                    <p className="text-[0.9rem] font-bold text-white">Identity Anomaly</p>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "97%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full rounded-full bg-red-500" 
                  />
                </div>
                <p className="mt-2 text-[0.7rem] text-white/40 font-medium">Fraud Probability: 97.4%</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ COMPANY BAR ════════════════════════════════ */}
      <div className="relative z-10 border-y border-white/5 bg-white/[0.02] py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-8 text-center text-[0.7rem] font-black uppercase tracking-[0.3em] text-white/20">
            Trusted by internal fraud units at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {companies.map(co => (
              <span key={co} className="text-[1.1rem] font-bold tracking-tighter text-white">{co}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 md:grid-cols-4 shadow-2xl backdrop-blur-xl">
          {stats.map((s, i) => (
            <motion.div 
              key={s.val}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center bg-[#0d0d11] px-6 py-16 text-center transition-colors hover:bg-white/[0.02]"
            >
              <motion.p 
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 + 0.2 }}
                className="mb-3 text-[3.5rem] font-black leading-none tracking-[-0.05em] text-[#72e3ad]"
              >
                {s.val}
              </motion.p>
              <p className="text-[0.85rem] font-bold uppercase tracking-widest text-white/30">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════ */}
      <section id="features" className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#72e3ad]/20 bg-[#72e3ad]/5 px-5 py-2 text-[0.75rem] font-bold text-[#72e3ad] backdrop-blur-md">
              <Sparkles size={14} /> 
              <span className="tracking-widest uppercase">Platform Capabilities</span>
            </div>
            <h2 className="mb-6 text-[3rem] font-extrabold tracking-[-0.04em] leading-tight text-white">
              Everything you need to stop fraud
            </h2>
            <p className="mx-auto max-w-[600px] text-[1.1rem] leading-relaxed text-white/40">
              Purpose-built for insurance fraud investigation — not a generic risk platform bolted on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 hover:border-[#72e3ad]/30 hover:bg-[#72e3ad]/[0.02] hover:-translate-y-2 backdrop-blur-xl"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                  style={{ background: f.iconBg, color: f.iconColor }}>
                  {iconMap[f.icon]}
                </div>
                <h3 className="mb-4 text-[1.25rem] font-bold text-white transition-colors group-hover:text-[#72e3ad]">{f.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">{f.desc}</p>
                
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at top right, ${f.iconColor}15, transparent 50%)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════ */}
      <section id="how-it-works" className="relative px-6 py-32 border-y border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-[2.8rem] font-extrabold tracking-[-0.03em] text-white">
              Fraud verdict in under 2 seconds
            </h2>
            <p className="text-[1.1rem] text-white/40">
              From submission to decision in one seamless, automated workflow.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Connection line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-[2px] md:block bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {steps.map((s, i) => (
              <motion.div 
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] transition-all duration-500 hover:scale-110 hover:rotate-6 bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-xl"
                  style={i === 1 ? { background: "linear-gradient(145deg,#0f1e3c,#162d56)", borderColor: "#72e3ad40", boxShadow: "0 0 50px rgba(114,227,173,0.1)" } : {}}>
                  <span className="text-[1.8rem] font-black" style={{ color: i === 1 ? "#72e3ad" : "white" }}>
                    {s.num}
                  </span>
                </div>
                <h3 className="mb-3 text-[1.1rem] font-bold text-white">{s.title}</h3>
                <p className="mx-auto max-w-[200px] text-[0.9rem] leading-relaxed text-white/40">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════ */}
      <section className="relative z-10 px-6 py-32 bg-[#0a0a0d]/50">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-[2.8rem] font-extrabold tracking-[-0.03em] text-white">
              Loved by fraud investigators
            </h2>
            <p className="text-[1.1rem] text-white/40">
              From small brokerages to Fortune 500 carriers — teams trust Detectra daily.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-white/10"
              >
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => <Star key={i} size={14} fill="#72e3ad" color="#72e3ad" className="opacity-80" />)}
                </div>
                <p className="flex-1 text-[1rem] leading-relaxed text-white/70 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-[0.8rem] font-black bg-[#72e3ad]/10 text-[#72e3ad]">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[1rem] font-bold text-white">{t.name}</p>
                    <p className="text-[0.8rem] font-medium text-white/30 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ════════════════════════════════════ */}
      <section id="pricing" className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="mb-4 text-[3rem] font-extrabold tracking-[-0.04em] text-white">
              Simple, predictable pricing
            </h2>
            <p className="text-[1.1rem] text-white/40">
              Scale without friction. All plans include 24/7 priority support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((p, i) => (
              <motion.div 
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] border p-10 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: p.highlight ? "linear-gradient(145deg,#0f1e3c 0%,#162d56 100%)" : "rgba(255,255,255,0.02)",
                  borderColor: p.highlight ? "#72e3ad50" : "rgba(255,255,255,0.06)",
                  boxShadow: p.highlight ? "0 40px 80px -20px rgba(114,227,173,0.15)" : undefined,
                }}>
                
                {p.highlight && (
                  <div className="absolute right-8 top-8 rounded-full bg-[#72e3ad]/10 border border-[#72e3ad]/30 px-4 py-1.5 text-[0.65rem] font-black text-[#72e3ad] tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                
                <p className="mb-6 text-[0.85rem] font-black uppercase tracking-[0.2em]"
                  style={{ color: p.highlight ? "#72e3ad" : "rgba(255,255,255,0.3)" }}>{p.name}</p>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[3.5rem] font-extrabold tracking-[-0.04em] text-white">{p.price}</span>
                  <span className="text-[1rem] text-white/30">{p.period}</span>
                </div>
                
                <p className="mb-10 text-[1rem] leading-relaxed text-white/40">{p.desc}</p>

                <Link href={p.cta === "Contact Sales" ? "mailto:sales@detectra.io" : "/sign-up"}
                  className="mb-10 flex items-center justify-center gap-3 rounded-2xl py-5 text-[1rem] font-black transition-all active:scale-95 shadow-xl"
                  style={
                    p.highlight
                      ? { background: "#72e3ad", color: "#0a1a10" }
                      : { background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }
                  }>
                  {p.cta} <ArrowRight size={20} />
                </Link>

                <div className="space-y-4">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-4">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#72e3ad]/20">
                        <CheckCircle2 size={12} className="text-[#72e3ad]" strokeWidth={3} />
                      </div>
                      <span className="text-[0.9rem] font-medium text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═════════════════════════════════ */}
      <section className="px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[3rem] p-20 text-center"
          style={{ background: "linear-gradient(135deg,#0a1122 0%,#0d142b 100%)", border: "1px solid rgba(114,227,173,0.15)" }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[100px]"
            style={{ background: "#72e3ad" }} />
          
          <div className="relative z-10">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-[0.85rem] font-black uppercase tracking-[0.3em] text-[#72e3ad]"
            >
              Enterprise Deployment Ready
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-[3.5rem] font-extrabold tracking-[-0.04em] leading-tight text-white"
            >
              Start detecting fraud today
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-12 max-w-[650px] text-[1.15rem] leading-relaxed text-white/40"
            >
              Join 340+ leading carriers that trust Detectra to safeguard their ecosystem. 
              ROI-driven within the first 30 days. No complex migration required.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link href="/sign-up"
                className="flex items-center gap-3 rounded-2xl bg-[#72e3ad] px-12 py-5 text-[1rem] font-black text-[#0a1a10] transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(114,227,173,0.25)]"
              >
                Begin Free Trial <ArrowRight size={20} />
              </Link>
              <Link href="/login"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-12 py-5 text-[1rem] font-bold text-white transition-all hover:bg-white/5 active:scale-95 backdrop-blur-md"
              >
                Access Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 bg-[#08080b] px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-20 grid grid-cols-2 gap-16 md:grid-cols-5">
            <div className="col-span-2">
              <BrandLogo href="/" size="sm" className="mb-8" />
              <p className="mb-10 max-w-[320px] text-[1rem] leading-relaxed text-white/30">
                The world's most advanced AI platform for insurance integrity. 
                Built for the high-volume needs of global carriers.
              </p>
              <div className="flex gap-3">
                {[<Lock key="l" size={18}/>, <Globe key="g" size={18}/>, <TrendingUp key="t" size={18}/>].map((icon, i) => (
                  <div key={i} className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-white/20 transition-all hover:border-[#72e3ad]/30 hover:bg-[#72e3ad]/5 hover:text-[#72e3ad]">
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {[
              { heading: "Product",  links: ["Features", "How It Works", "Pricing", "API Docs"] },
              { heading: "Legal",    links: ["Privacy Policy", "Terms of Service", "IRDAI Compliance"] },
              { heading: "Company",  links: ["About", "Blog", "Careers", "Contact"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="mb-5 text-[0.75rem] font-bold uppercase tracking-widest text-[#72e3ad]">
                  {col.heading}
                </h4>
                <div className="flex flex-col gap-3.5">
                  {col.links.map(l => (
                    <a key={l} href="#" className="text-[0.85rem] transition-colors"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#72e3ad")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
              © 2026 Detectra Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-8">
              <p className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
                Built in India. Scaled globally.
              </p>
              <p className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
                Version 1.42.0
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
