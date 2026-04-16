"use client";


import Link from "next/link";
import { ChevronRight, AlertTriangle, FileText, CheckCircle2, Clock } from "lucide-react";

const signals = [
  { name: "Claim Amount Anomaly",    pct: 88, severity: "HIGH",   explanation: "Claim ₹45,000 is 2.8× above Auto policy average of ₹16,000", color: "#ef4444" },
  { name: "High Incident Frequency", pct: 75, severity: "HIGH",   explanation: "Claimant filed 3 claims in the past 14 months", color: "#ef4444" },
  { name: "Narrative Inconsistency", pct: 52, severity: "MEDIUM", explanation: "Incident description contains templated phrases common in fabricated reports", color: "#f59e0b" },
  { name: "Location Risk Score",     pct: 44, severity: "MEDIUM", explanation: "Incident location has 3.2× above-average fraud rate in last 12 months", color: "#f59e0b" },
  { name: "Policy Age Flag",         pct: 22, severity: "LOW",    explanation: "Policy started only 47 days before the incident was reported", color: "#22c55e" },
];

const claimDetails = [
  { label: "Claim ID",       val: "CLM-2047" },
  { label: "Policy Number",  val: "POL-2024-00478" },
  { label: "Policy Type",    val: "Auto" },
  { label: "Claimant",       val: "John Doe" },
  { label: "Age",            val: "34 years" },
  { label: "Contact",        val: "+91 98765 43210" },
  { label: "Claim Amount",   val: "₹45,000" },
  { label: "Incident Type",  val: "Collision" },
  { label: "Incident Date",  val: "28 Mar 2026" },
  { label: "Location",       val: "Andheri, Mumbai" },
  { label: "Prior Claims",   val: "3 (past 14 months)" },
  { label: "Police Report",  val: "Yes — FIR #MH/ANE/0276" },
  { label: "Submitted",      val: "30 Mar 2026, 09:41 AM" },
  { label: "Assigned To",    val: "Arjun Khanna (AK)" },
];

const severityStyle = (s: string) => {
  if (s === "HIGH")   return { bg: "rgba(239,68,68,0.1)",  text: "#ef4444",  border: "rgba(239,68,68,0.2)" };
  if (s === "MEDIUM") return { bg: "rgba(245,158,11,0.1)", text: "#d97706", border: "rgba(245,158,11,0.2)" };
  return              { bg: "rgba(22,163,74,0.08)",  text: "#16a34a", border: "rgba(22,163,74,0.15)" };
};

export default function ClaimDetailPage() {
  return (
    <>
      <div className="flex gap-5">
        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* Breadcrumb + Status Row */}
          <div className="pt-1.5">
            <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <ChevronRight size={12} />
              <Link href="/claims" className="hover:underline">Claims</Link>
              <ChevronRight size={12} />
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>CLM-2047</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-sm font-bold px-3 py-1.5 rounded-xl"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                CLM-2047
              </span>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                <Clock size={12} /> Today 09:41 AM
              </div>
              <span
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border"
                style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", borderColor: "rgba(239,68,68,0.2)" }}
              >
                <AlertTriangle size={11} strokeWidth={2.5} /> FLAGGED
              </span>
            </div>
          </div>

          {/* Gauge + Stats */}
          <div className="card p-5 flex items-center gap-8">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-[140px] h-[140px]">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 gauge-glow">
                  <defs>
                    <linearGradient id="detailGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#b91c1c" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--accent)" strokeWidth="12" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#detailGaugeGrad)" strokeWidth="12"
                    strokeDasharray={`${(84 / 100) * 314.16} 314.16`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[2.5rem] font-bold leading-none" style={{ color: "var(--foreground)" }}>84</span>
                  <span className="text-[10px] font-bold mt-0.5" style={{ color: "#ef4444" }}>/100</span>
                </div>
              </div>
              <p className="text-sm font-bold uppercase tracking-wide mt-2" style={{ color: "#ef4444" }}>
                High Fraud Risk
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { label: "Confidence Score", val: "91%" },
                { label: "Processing Time",  val: "1.3s" },
                { label: "Signals Triggered", val: "5 / 5" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center px-5 py-4 rounded-xl border"
                  style={{ background: "var(--muted)", borderColor: "var(--border)" }}
                >
                  <p className="text-[1.6rem] font-bold" style={{ color: "var(--foreground)" }}>{stat.val}</p>
                  <p className="text-[11px] mt-1 font-medium" style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signal Breakdown */}
          <div className="card p-5">
            <h2 className="font-bold text-[0.95rem] mb-5" style={{ color: "var(--foreground)" }}>Fraud Signal Breakdown</h2>
            <div className="space-y-5">
              {signals.map((s) => {
                const sv = severityStyle(s.severity);
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.name}</span>
                      <span
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
                        style={{ background: sv.bg, color: sv.text, borderColor: sv.border }}
                      >
                        {s.severity}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ background: "var(--accent)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${s.pct}%`,
                          background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Verdict */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, #0f1e3c, #162d56)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-20" style={{ background: "#72e3ad", filter: "blur(24px)" }} />
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 relative" style={{ color: "#72e3ad" }}>AI Verdict</p>
            <p className="text-sm leading-relaxed relative" style={{ color: "#cbd5e1" }}>
              This claim shows <strong style={{ color: "#fff" }}>strong indicators of potential fraud</strong> across multiple signal types — including an anomalous claim amount, repeated incident history, and narrative patterns consistent with fraud syndicate templates.
              Fraud probability is <strong style={{ color: "#ef4444" }}>84%</strong> at 91% confidence.
              <br /><br />
              <strong style={{ color: "#f59e0b" }}>Recommendation:</strong> Escalate to the Special Investigation Unit before processing any payment. Collect original invoices, witness statements, and dashcam footage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              <AlertTriangle size={15} strokeWidth={2.5} /> Escalate to Senior
            </button>
            <button
              className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border"
              style={{ background: "rgba(245,158,11,0.08)", color: "#d97706", borderColor: "rgba(245,158,11,0.2)" }}
            >
              <FileText size={15} /> Request Documents
            </button>
            <button
              className="text-sm font-semibold px-5 py-3 rounded-xl border"
              style={{ background: "var(--accent)", color: "var(--muted-foreground)", borderColor: "var(--border)" }}
            >
              Mark as Reviewed
            </button>
            <button
              className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border"
              style={{ background: "rgba(22,163,74,0.08)", color: "#16a34a", borderColor: "rgba(22,163,74,0.2)" }}
            >
              <CheckCircle2 size={15} strokeWidth={2.5} /> Clear Claim
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[240px] shrink-0">
          <div className="card p-5 sticky top-4">
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--foreground)" }}>Claim Details</h3>
            <div className="space-y-3.5">
              {claimDetails.map((row) => (
                <div key={row.label}>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted-foreground)" }}>{row.label}</p>
                  <p className="text-[0.82rem] font-semibold" style={{ color: "var(--foreground)" }}>{row.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
