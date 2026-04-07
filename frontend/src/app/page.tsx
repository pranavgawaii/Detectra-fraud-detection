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

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={20} />,
  Activity: <Activity size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  BarChart2: <BarChart2 size={20} />,
  Users: <Users size={20} />,
  Code2: <Code2 size={20} />,
};

/* ─── Page ──────────────────────────────────────── */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#0d0d11", minHeight: "100vh", color: "#e8e8e8", fontFamily: "var(--font-sans)" }}>

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
      <section className="relative overflow-hidden pt-28 pb-32 px-6">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-10"
          style={{ background: "#72e3ad", filter: "blur(100px)" }} />
        <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/4 rounded-full opacity-8"
          style={{ background: "#3b82f6", filter: "blur(80px)" }} />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: text */}
          <div className="fade-up-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.72rem] font-semibold"
              style={{ background: "rgba(114,227,173,0.08)", borderColor: "rgba(114,227,173,0.25)", color: "#72e3ad" }}>
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#72e3ad" }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#72e3ad" }} />
              </div>
              Next-Gen Fraud Intelligence
            </div>

            <h1 className="mb-6 text-[3.5rem] font-extrabold leading-[1.0] tracking-[-0.03em]"
              style={{ color: "#fff" }}>
              The Gold Standard<br />
              <span style={{ color: "#72e3ad" }}>In Fraud Detection.</span>
            </h1>

            <p className="mb-10 max-w-[500px] text-[1.05rem] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Empowering top-tier insurers with sub-second risk verdicts. Our neural engine surfaces
              47+ fraud signals instantly, saving your team hours of manual triage.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/sign-up"
                className="group flex items-center gap-2.5 rounded-2xl px-8 py-4 text-[0.95rem] font-bold transition-all hover:shadow-[0_0_40px_rgba(114,227,173,0.35)] hover:scale-[1.02]"
                style={{ background: "#72e3ad", color: "#0a1a10" }}>
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard"
                className="flex items-center gap-2.5 rounded-2xl border px-8 py-4 text-[0.95rem] font-semibold transition-all hover:border-white/30"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
                <Eye size={17} /> Live Preview
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {["IRDAI COMPLIANT", "SOC 2 TYPE II", "ISO 27001"].map(b => (
                <span key={b} className="text-[0.6rem] font-black tracking-[0.2em]"
                  style={{ color: "#fff" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: mockup */}
          <div className="relative hidden lg:block">
            <DashboardMockup />

            {/* Floating alert card */}
            <div
              className="absolute -bottom-8 -left-12 rounded-2xl p-4 animate-in slide-in-from-left-8 duration-700 delay-300 fill-mode-both"
              style={{
                background: "linear-gradient(145deg,#0f1e3c,#162d56)",
                border: "1px solid rgba(114,227,173,0.2)",
                boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
                width: 240,
              }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{ background: "rgba(239,68,68,0.15)" }}>
                  <ShieldAlert size={16} style={{ color: "#ef4444" }} />
                </div>
                <div>
                  <p className="text-[0.6rem] font-black uppercase tracking-widest" style={{ color: "#ef4444" }}>High Risk</p>
                  <p className="text-[0.78rem] font-bold text-white">Claim #CLM-20948</p>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: "94%", background: "#ef4444" }} />
              </div>
              <p className="mt-1.5 text-[0.62rem]" style={{ color: "#94a3b8" }}>94% Probability of Fraud</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPANY BAR ════════════════════════════════ */}
      <div className="border-y px-6 py-8" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-center text-[0.65rem] font-bold uppercase tracking-[0.16em]"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            Trusted by 340+ insurers across India & Southeast Asia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            {companies.map(co => (
              <span key={co} className="text-[0.95rem] font-bold hover:opacity-100 transition-opacity" style={{ color: "#fff" }}>{co}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ══════════════════════════════════════ */}
      <section className="px-6 py-20" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px md:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden" }}>
          {stats.map(s => (
            <div key={s.val} className="flex flex-col items-center py-12 px-6 text-center"
              style={{ background: "#0d0d11" }}>
              <p className="text-[2.8rem] font-extrabold leading-none tracking-[-0.03em] mb-2"
                style={{ color: "#72e3ad" }}>{s.val}</p>
              <p className="text-[0.82rem] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════ */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-widest"
              style={{ background: "rgba(114,227,173,0.06)", borderColor: "rgba(114,227,173,0.18)", color: "#72e3ad" }}>
              <Sparkles size={12} /> Capabilities
            </div>
            <h2 className="mb-4 text-[2.6rem] font-extrabold tracking-[-0.03em] leading-tight" style={{ color: "#fff" }}>
              Everything you need to stop fraud
            </h2>
            <p className="mx-auto max-w-[540px] text-[1rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Purpose-built for insurance fraud investigation — not a generic risk platform bolted on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title}
                className="rounded-2xl border p-7 transition-all duration-300 cursor-default group"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(114,227,173,0.3)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(114,227,173,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                  style={{ background: f.iconBg, color: f.iconColor }}>
                  {iconMap[f.icon]}
                </div>
                <h3 className="mb-2 text-[1rem] font-bold text-white transition-colors group-hover:text-[#72e3ad]">{f.title}</h3>
                <p className="text-[0.85rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════ */}
      <section id="how-it-works" className="px-6 py-24"
        style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-[2.4rem] font-extrabold tracking-[-0.03em]" style={{ color: "#fff" }}>
              Fraud verdict in under 2 seconds
            </h2>
            <p className="text-[0.95rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
              From submission to decision in one seamless, automated workflow.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px md:block"
              style={{ background: "rgba(255,255,255,0.07)" }} />
            {steps.map((s, i) => (
              <div key={s.num} className="relative z-10 text-center flex flex-col items-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 hover:scale-105"
                  style={{
                    background: i === 1 ? "linear-gradient(145deg,#0f1e3c,#162d56)" : "rgba(255,255,255,0.04)",
                    border: i === 1 ? "1px solid rgba(114,227,173,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: i === 1 ? "0 0 40px rgba(114,227,173,0.15)" : undefined,
                  }}>
                  <span className="text-[1.1rem] font-black" style={{ color: i === 1 ? "#72e3ad" : "rgba(255,255,255,0.35)" }}>
                    {s.num}
                  </span>
                </div>
                <h3 className="mb-2 text-[0.95rem] font-bold text-white">{s.title}</h3>
                <p className="text-[0.8rem] leading-relaxed max-w-[200px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════ */}
      <section className="px-6 py-24" style={{ background: "#0a0a0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <h2 className="mb-2 text-[2.4rem] font-extrabold tracking-[-0.03em]" style={{ color: "#fff" }}>
              Loved by fraud investigators
            </h2>
            <p className="text-[0.95rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
              From small brokerages to Fortune 500 carriers — teams trust Detectra daily.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="flex flex-col gap-5 rounded-2xl border p-7 transition-all hover:bg-white/[0.04]"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p className="flex-1 text-[0.88rem] leading-relaxed italic"
                  style={{ color: "rgba(255,255,255,0.7)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-[0.75rem] font-bold"
                    style={{ background: "#72e3ad20", color: "#72e3ad" }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[0.85rem] font-bold text-white">{t.name}</p>
                    <p className="text-[0.72rem] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ════════════════════════════════════ */}
      <section id="pricing" className="px-6 py-24"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <h2 className="mb-2 text-[2.4rem] font-extrabold tracking-[-0.03em]" style={{ color: "#fff" }}>
              Simple, predictable pricing
            </h2>
            <p className="text-[0.95rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map(p => (
              <div key={p.name} className="relative overflow-hidden rounded-3xl border p-8 transition-all hover:translate-y-[-4px]"
                style={{
                  background: p.highlight ? "linear-gradient(145deg,#0f1e3c 0%,#162d56 100%)" : "rgba(255,255,255,0.03)",
                  borderColor: p.highlight ? "rgba(114,227,173,0.3)" : "rgba(255,255,255,0.08)",
                  boxShadow: p.highlight ? "0 0 0 1px rgba(114,227,173,0.1), 0 32px 64px -12px rgba(0,0,0,0.5)" : undefined,
                }}>
                {p.highlight && (
                  <>
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-25" style={{ background: "#72e3ad", filter: "blur(40px)" }} />
                    <div className="absolute right-6 top-6 rounded-full px-3 py-1 text-[0.62rem] font-bold"
                      style={{ background: "#72e3ad20", color: "#72e3ad", border: "1px solid #72e3ad40" }}>
                      MOST POPULAR
                    </div>
                  </>
                )}
                <div className="relative">
                  <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-widest"
                    style={{ color: p.highlight ? "#72e3ad" : "rgba(255,255,255,0.4)" }}>{p.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-white">{p.price}</span>
                    <span className="text-[0.9rem]" style={{ color: "rgba(255,255,255,0.35)" }}>{p.period}</span>
                  </div>
                  <p className="mb-7 text-[0.82rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>

                  <Link href={p.cta === "Contact Sales" ? "mailto:sales@detectra.io" : "/sign-up"}
                    className="mb-8 flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-[0.9rem] font-bold transition-all active:scale-95"
                    style={
                      p.highlight
                        ? { background: "#72e3ad", color: "#0a1a10" }
                        : { background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }
                    }>
                    {p.cta} <ArrowRight size={16} />
                  </Link>

                  <div className="space-y-3.5">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-3">
                        <CheckCircle2 size={14} style={{ color: "#72e3ad", flexShrink: 0 }} strokeWidth={3} />
                        <span className="text-[0.82rem]" style={{ color: p.highlight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═════════════════════════════════ */}
      <section className="px-6 py-24">
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-3xl p-16 text-center"
          style={{ background: "linear-gradient(135deg,#0a1122 0%,#0d142b 100%)", border: "1px solid rgba(114,227,173,0.18)" }}>
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
            style={{ background: "#72e3ad", filter: "blur(80px)" }} />
          <div className="relative">
            <p className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.2em]" style={{ color: "#72e3ad" }}>
              Enterprise Ready
            </p>
            <h2 className="mb-6 text-[2.6rem] font-extrabold tracking-[-0.03em] leading-tight text-white">
              Start detecting fraud today
            </h2>
            <p className="mb-10 text-[1.05rem] leading-relaxed max-w-[600px] mx-auto" style={{ color: "#94a3b8" }}>
              Join 340+ insurance companies using Detectra. Onboard in under 2 weeks. ROI-positive within the first month.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link href="/sign-up"
                className="flex items-center gap-3 rounded-2xl px-10 py-4 text-[0.95rem] font-bold transition-all hover:opacity-90 hover:shadow-[0_0_50px_rgba(114,227,173,0.3)] active:scale-95"
                style={{ background: "#72e3ad", color: "#0a1a10" }}>
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link href="/login"
                className="flex items-center gap-3 rounded-2xl border px-10 py-4 text-[0.95rem] font-bold transition-all hover:bg-white/5 active:scale-95"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                Sign In to Dashboard
              </Link>
            </div>
            <p className="mt-7 text-[0.78rem] font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              14-day free trial · No credit card required · Unlimited features
            </p>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════ */}
      <footer className="border-t px-6 py-20" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#08080b" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 grid grid-cols-2 md:grid-cols-5 gap-12">
            <div className="col-span-2">
              <BrandLogo href="/" size="sm" className="mb-5" />
              <p className="mb-8 max-w-[280px] text-[0.85rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                The industry's most advanced AI fraud detection platform, designed specifically for high-volume insurance carriers.
              </p>
              <div className="flex gap-2.5">
                {[<Lock key="l" size={14}/>, <Globe key="g" size={14}/>, <TrendingUp key="t" size={14}/>].map((icon, i) => (
                  <div key={i} className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
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
