"use client";


import { Plus, Search, Filter, ChevronDown, Zap, AlertTriangle, CheckCircle2, Clock4, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const rules = [
  {
    id: "RUL-001", name: "High-Value Auto Claim",
    desc: "Flag auto claims exceeding ₹40,000 with no police report.",
    status: "Active", triggers: 142, flagged: 34, severity: "Critical",
    lastRun: "2 min ago",
  },
  {
    id: "RUL-002", name: "Duplicate Health Claim",
    desc: "Detect identical health claim submissions within 30 days.",
    status: "Active", triggers: 89, flagged: 12, severity: "High",
    lastRun: "5 min ago",
  },
  {
    id: "RUL-003", name: "Claim Velocity Check",
    desc: "Alert if a claimant files more than 3 claims in 90 days.",
    status: "Active", triggers: 56, flagged: 8, severity: "Medium",
    lastRun: "12 min ago",
  },
  {
    id: "RUL-004", name: "Life Claim Velocity",
    desc: "Detect rapid succession of life insurance claims.",
    status: "Active", triggers: 23, flagged: 6, severity: "Critical",
    lastRun: "1 hr ago",
  },
  {
    id: "RUL-005", name: "Property Over-Declaration",
    desc: "Flag property claims where declared value exceeds assessment.",
    status: "Paused", triggers: 45, flagged: 0, severity: "High",
    lastRun: "2 days ago",
  },
  {
    id: "RUL-006", name: "Identity Mismatch Alert",
    desc: "Trigger when claimant ID docs don't match policy holder data.",
    status: "Active", triggers: 31, flagged: 9, severity: "Critical",
    lastRun: "30 min ago",
  },
  {
    id: "RUL-007", name: "Auto Collision Anomaly",
    desc: "Detect collision claims with inconsistent accident narratives.",
    status: "Active", triggers: 78, flagged: 22, severity: "High",
    lastRun: "8 min ago",
  },
  {
    id: "RUL-008", name: "Weekend Hospitalization",
    desc: "Flag health claims for hospitalizations only on weekends.",
    status: "Draft", triggers: 0, flagged: 0, severity: "Low",
    lastRun: "Never",
  },
];

const severityStyle = (s: string) => {
  if (s === "Critical") return { bg: "rgba(239,68,68,0.10)",  text: "#ef4444", border: "rgba(239,68,68,0.2)" };
  if (s === "High")     return { bg: "rgba(245,158,11,0.10)", text: "#d97706", border: "rgba(245,158,11,0.2)" };
  if (s === "Medium")   return { bg: "rgba(59,130,246,0.10)", text: "#3b82f6", border: "rgba(59,130,246,0.2)" };
  return                       { bg: "rgba(34,197,94,0.08)",  text: "#16a34a", border: "rgba(34,197,94,0.18)" };
};

const statusStyle = (s: string) => {
  if (s === "Active") return { icon: <CheckCircle2 size={10} strokeWidth={2.5} />, color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.22)" };
  if (s === "Paused") return { icon: <Clock4 size={10} strokeWidth={2.5} />,       color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.22)" };
  return                     { icon: <AlertTriangle size={10} strokeWidth={2.5} />, color: "#6b7280", bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.22)" };
};

export default function RulesPage() {
  const active = rules.filter(r => r.status === "Active").length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[1.35rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            Rules Engine
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {active} active rules · {rules.reduce((a, r) => a + r.flagged, 0)} flags today
          </p>
        </div>
        <Link
          href="/rules/new"
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-[0.82rem] font-bold transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Plus size={15} /> Create Rule
        </Link>
      </div>

      {/* Stats row */}
      <div className="mb-5 grid grid-cols-4 gap-4">
        {[
          { label: "Total Rules", value: rules.length, color: "var(--foreground)" },
          { label: "Active", value: active, color: "#22c55e" },
          { label: "Total Triggers Today", value: rules.reduce((a,r)=>a+r.triggers,0), color: "#3b82f6" },
          { label: "Flags Raised", value: rules.reduce((a,r)=>a+r.flagged,0), color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-[0.68rem] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
            <p className="text-[1.8rem] font-bold tracking-tight" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border px-3 py-2 flex-1 max-w-xs"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <Search size={13} style={{ color: "var(--muted-foreground)" }} />
          <input type="text" placeholder="Search rules..." className="w-full bg-transparent text-[0.78rem] outline-none"
            style={{ color: "var(--foreground)" }} />
        </div>
        <button className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[0.78rem] font-semibold"
          style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
          <Filter size={13} /> Filter <ChevronDown size={12} />
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
              {["Rule", "Severity", "Status", "Triggers Today", "Flags", "Last Run", ""].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rules.map((r, idx) => {
              const sev = severityStyle(r.severity);
              const st  = statusStyle(r.status);
              return (
                <tr key={r.id}
                  className="group transition-colors hover:bg-[var(--muted)]"
                  style={{ borderBottom: idx < rules.length - 1 ? "1px solid var(--border)" : undefined }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl"
                        style={{ background: "var(--accent)" }}>
                        <Zap size={14} style={{ color: "var(--primary)" }} />
                      </div>
                      <div>
                        <p className="text-[0.82rem] font-semibold" style={{ color: "var(--foreground)" }}>{r.name}</p>
                        <p className="text-[0.7rem]" style={{ color: "var(--muted-foreground)" }}>{r.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block rounded-lg border px-2.5 py-1 text-[0.7rem] font-semibold"
                      style={{ background: sev.bg, color: sev.text, borderColor: sev.border }}>
                      {r.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
                      style={{ background: st.bg, color: st.color, borderColor: st.border }}>
                      {st.icon} {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[0.82rem] font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>
                    {r.triggers}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[0.82rem] font-bold tabular-nums" style={{ color: r.flagged > 0 ? "#ef4444" : "var(--muted-foreground)" }}>
                      {r.flagged}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[0.78rem]" style={{ color: "var(--muted-foreground)" }}>{r.lastRun}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--muted-foreground)" }}>
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
