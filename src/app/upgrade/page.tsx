"use client";

import AppShell from "@/components/layout/AppShell";
import { Check, Zap, Shield, Activity, BarChart2, Users, Sparkles, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/mo",
    desc: "Perfect for small teams getting started with fraud detection.",
    highlight: false,
    features: [
      "Up to 500 claims/month",
      "5 custom rules",
      "Basic risk scoring",
      "Email alerts",
      "CSV exports",
      "7-day data retention",
    ],
  },
  {
    name: "Pro",
    price: "₹14,999",
    period: "/mo",
    desc: "Everything a growing investigation team needs.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 5,000 claims/month",
      "Unlimited custom rules",
      "AI risk scoring (full)",
      "SIU escalation workflow",
      "Advanced analytics",
      "90-day data retention",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Dedicated infrastructure, SLAs, and unlimited everything.",
    highlight: false,
    features: [
      "Unlimited claims",
      "Unlimited rules",
      "Custom ML models",
      "Dedicated SIU portal",
      "White-label option",
      "Unlimited retention",
      "24/7 dedicated support",
      "SSO & advanced RBAC",
    ],
  },
];

const proFeatures = [
  { icon: <Zap size={18} />,      title: "Unlimited Rules",      desc: "Create as many fraud detection rules as your team needs with no caps." },
  { icon: <Shield size={18} />,   title: "AI Risk Scoring",      desc: "Full access to our 9-signal AI composite fraud score, updated in real time." },
  { icon: <Activity size={18} />, title: "SIU Escalation",       desc: "One-click escalation to Special Investigation Unit with automated routing." },
  { icon: <BarChart2 size={18}/>, title: "Advanced Analytics",   desc: "Deep-dive dashboards: fraud trends, investigator productivity, ROI metrics." },
  { icon: <Users size={18} />,    title: "Team Collaboration",   desc: "Role-based access control, shared queues, and audit trails for every action." },
  { icon: <Sparkles size={18}/>,  title: "Priority Support",     desc: "Dedicated CSM, 4-hour SLA, and direct access to our engineering team." },
];

export default function UpgradePage() {
  return (
    <AppShell>
      {/* Hero */}
      <div className="mb-10 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.75rem] font-semibold mb-4"
          style={{ background: "rgba(114,227,173,0.1)", borderColor: "rgba(114,227,173,0.3)", color: "var(--primary)" }}
        >
          <Sparkles size={13} /> Upgrade Your Plan
        </div>
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
          Detect More. Investigate Faster.
        </h1>
        <p className="max-w-lg mx-auto text-[0.9rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Unlock the full power of Detectra — AI risk scoring, unlimited rules, and the SIU workflow your team needs to crush fraud.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="mb-12 grid grid-cols-3 gap-5">
        {plans.map(plan => (
          <div
            key={plan.name}
            className="relative flex flex-col rounded-2xl border p-6 overflow-hidden"
            style={{
              background: plan.highlight
                ? "linear-gradient(145deg, #0f1e3c 0%, #162d56 100%)"
                : "var(--card)",
              borderColor: plan.highlight ? "rgba(114,227,173,0.3)" : "var(--border)",
              boxShadow: plan.highlight ? "0 0 0 1px rgba(114,227,173,0.15), 0 24px 48px rgba(0,0,0,0.3)" : undefined,
            }}
          >
            {/* Glow for highlight */}
            {plan.highlight && (
              <>
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20" style={{ background: "#72e3ad", filter: "blur(30px)" }} />
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-24 w-24 rounded-full opacity-10" style={{ background: "#3b82f6", filter: "blur(24px)" }} />
              </>
            )}

            <div className="relative">
              {plan.badge && (
                <div
                  className="absolute -top-1 right-0 rounded-full px-2.5 py-1 text-[0.62rem] font-bold"
                  style={{ background: "rgba(114,227,173,0.18)", color: "#72e3ad", border: "1px solid rgba(114,227,173,0.3)" }}
                >
                  {plan.badge}
                </div>
              )}
              <p className="text-[0.72rem] font-bold uppercase tracking-widest mb-2"
                style={{ color: plan.highlight ? "#72e3ad" : "var(--muted-foreground)" }}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-1.5">
                <span className="text-[2.2rem] font-extrabold tracking-tight"
                  style={{ color: plan.highlight ? "#fff" : "var(--foreground)" }}>
                  {plan.price}
                </span>
                <span className="text-[0.82rem]" style={{ color: plan.highlight ? "rgba(255,255,255,0.5)" : "var(--muted-foreground)" }}>
                  {plan.period}
                </span>
              </div>
              <p className="mb-5 text-[0.78rem] leading-snug"
                style={{ color: plan.highlight ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)" }}>
                {plan.desc}
              </p>

              <button
                className="mb-5 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[0.84rem] font-bold transition-all hover:opacity-90"
                style={
                  plan.highlight
                    ? { background: "#72e3ad", color: "#0a1a10" }
                    : plan.name === "Enterprise"
                    ? { background: "rgba(114,227,173,0.08)", color: "var(--primary)", border: "1px solid rgba(114,227,173,0.2)" }
                    : { background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }
                }
              >
                {plan.name === "Enterprise" ? "Contact Sales" : plan.name === "Pro" ? "Upgrade to Pro" : "Get Started"}
                <ArrowRight size={14} />
              </button>

              <div className="space-y-2.5">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ background: plan.highlight ? "rgba(114,227,173,0.15)" : "rgba(114,227,173,0.1)" }}>
                      <Check size={10} strokeWidth={3} style={{ color: "#72e3ad" }} />
                    </div>
                    <span className="text-[0.78rem]"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.72)" : "var(--muted-foreground)" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro features grid */}
      <div className="mb-8">
        <h2 className="text-[1.1rem] font-bold mb-1 text-center" style={{ color: "var(--foreground)" }}>
          Everything in Pro
        </h2>
        <p className="text-[0.82rem] text-center mb-6" style={{ color: "var(--muted-foreground)" }}>
          A complete toolkit for professional insurance fraud investigation
        </p>
        <div className="grid grid-cols-3 gap-4">
          {proFeatures.map(f => (
            <div key={f.title} className="rounded-2xl border p-4"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "rgba(114,227,173,0.12)", color: "var(--primary)" }}>
                {f.icon}
              </div>
              <p className="text-[0.84rem] font-bold mb-1" style={{ color: "var(--foreground)" }}>{f.title}</p>
              <p className="text-[0.75rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg,#0f1e3c 0%,#162d56 100%)", border: "1px solid rgba(114,227,173,0.2)" }}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 opacity-20 rounded-full" style={{ background: "#72e3ad", filter: "blur(48px)" }} />
        <div className="relative">
          <p className="text-[0.72rem] font-bold uppercase tracking-widest mb-3" style={{ color: "#72e3ad" }}>
            Limited Time Offer
          </p>
          <h3 className="text-[1.5rem] font-extrabold text-white mb-2">
            Start your 14-day free Pro trial
          </h3>
          <p className="mb-6 text-[0.85rem]" style={{ color: "#94a3b8" }}>
            No credit card required. Cancel anytime. Full Pro features from day one.
          </p>
          <button
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-[0.88rem] font-bold transition-all hover:opacity-90"
            style={{ background: "#72e3ad", color: "#0a1a10" }}
          >
            Start Free Trial <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
