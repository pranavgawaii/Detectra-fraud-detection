"use client";

import AppShell from "@/components/layout/AppShell";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Area, AreaChart,
} from "recharts";
import {
  Activity, ShieldCheck, Banknote, Target, AlertOctagon, TrendingDown, MoreHorizontal,
  ShieldX, CheckCircle2, Clock4,
} from "lucide-react";

// 30-day data (deterministic for SSR)
const dailyData = [
  { day: 1, total: 42, fraud: 6 }, { day: 2, total: 38, fraud: 4 },
  { day: 3, total: 55, fraud: 9 }, { day: 4, total: 48, fraud: 7 },
  { day: 5, total: 62, fraud: 11 }, { day: 6, total: 44, fraud: 5 },
  { day: 7, total: 57, fraud: 8 }, { day: 8, total: 49, fraud: 6 },
  { day: 9, total: 63, fraud: 12 }, { day: 10, total: 51, fraud: 7 },
  { day: 11, total: 47, fraud: 6 }, { day: 12, total: 58, fraud: 9 },
  { day: 13, total: 66, fraud: 13 }, { day: 14, total: 43, fraud: 5 },
  { day: 15, total: 71, fraud: 14 }, { day: 16, total: 54, fraud: 8 },
  { day: 17, total: 60, fraud: 10 }, { day: 18, total: 45, fraud: 5 },
  { day: 19, total: 68, fraud: 11 }, { day: 20, total: 52, fraud: 7 },
  { day: 21, total: 59, fraud: 9 }, { day: 22, total: 46, fraud: 5 },
  { day: 23, total: 64, fraud: 10 }, { day: 24, total: 50, fraud: 6 },
  { day: 25, total: 72, fraud: 15 }, { day: 26, total: 56, fraud: 8 },
  { day: 27, total: 61, fraud: 9 }, { day: 28, total: 48, fraud: 6 },
  { day: 29, total: 53, fraud: 7 }, { day: 30, total: 67, fraud: 11 },
];

const fraudByType = [
  { type: "Auto",     count: 67, color: "#ef4444" },
  { type: "Health",   count: 54, color: "#f59e0b" },
  { type: "Property", count: 38, color: "#3b82f6" },
  { type: "Life",     count: 18, color: "#8b5cf6" },
  { type: "Travel",   count: 9,  color: "#72e3ad" },
];

const signalFreq = [
  { signal: "Claim Amount Anomaly",    count: 142, color: "#ef4444" },
  { signal: "High Incident Frequency", count: 118, color: "#f59e0b" },
  { signal: "Narrative Inconsistency", count: 97,  color: "#8b5cf6" },
  { signal: "Location Risk Score",     count: 84,  color: "#3b82f6" },
  { signal: "Policy Age Flag",         count: 61,  color: "#72e3ad" },
];

const topClaims = [
  { id: "CLM-2051", claimant: "Sarah Lee",        type: "Life",     amount: "₹10,00,000", score: 91, status: "Flagged" },
  { id: "CLM-2054", claimant: "Global Logistics", type: "Property", amount: "₹14,50,000", score: 88, status: "Flagged" },
  { id: "CLM-2047", claimant: "John Doe",         type: "Auto",     amount: "₹45,000",    score: 84, status: "Flagged" },
  { id: "CLM-2056", claimant: "Vikram Singh",     type: "Life",     amount: "₹25,00,000", score: 76, status: "Flagged" },
  { id: "CLM-2058", claimant: "Sanjay Gupta",     type: "Health",   amount: "₹2,15,000",  score: 61, status: "Under Review" },
];

function scoreChip(s: number) {
  if (s > 70) return { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "rgba(239,68,68,0.2)" };
  if (s > 30) return { bg: "rgba(245,158,11,0.1)", text: "#d97706", border: "rgba(245,158,11,0.2)" };
  return { bg: "rgba(22,163,74,0.08)", text: "#16a34a", border: "rgba(22,163,74,0.15)" };
}
function statusConfig(s: string) {
  if (s === "Flagged")      return { bg: "rgba(239,68,68,0.08)", text: "#ef4444", border: "rgba(239,68,68,0.15)", icon: <ShieldX size={10} /> };
  if (s === "Cleared")      return { bg: "rgba(22,163,74,0.08)", text: "#16a34a", border: "rgba(22,163,74,0.15)", icon: <CheckCircle2 size={10} /> };
  return                           { bg: "rgba(245,158,11,0.08)", text: "#d97706", border: "rgba(245,158,11,0.15)", icon: <Clock4 size={10} /> };
}

const metrics = [
  { label: "Claims Analyzed",     value: "1,247", icon: <Activity size={17} />,     iconBg: "rgba(59,130,246,0.1)",   iconColor: "#3b82f6", trend: null },
  { label: "Fraud Detected",      value: "186",   icon: <AlertOctagon size={17} />, iconBg: "rgba(239,68,68,0.1)",   iconColor: "#ef4444", trend: { val: "+8.3%",  up: false } },
  { label: "Amount Saved",        value: "₹47.3L",icon: <Banknote size={17} />,     iconBg: "rgba(114,227,173,0.15)",iconColor: "#16a34a", trend: { val: "+12.1%", up: true } },
  { label: "Avg Risk Score",      value: "58",    icon: <TrendingDown size={17} />, iconBg: "rgba(245,158,11,0.1)",  iconColor: "#f59e0b", trend: null },
  { label: "Detection Accuracy",  value: "94.2%", icon: <Target size={17} />,       iconBg: "rgba(139,92,246,0.1)",  iconColor: "#8b5cf6", trend: { val: "+1.4%",  up: true } },
  { label: "False Positive Rate", value: "6.8%",  icon: <ShieldCheck size={17} />,  iconBg: "rgba(107,114,128,0.1)", iconColor: "#6b7280", trend: { val: "−2.1%",  up: true } },
];

function ChartFallback() {
  return <div className="h-full w-full rounded-[1.5rem] shimmer" />;
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
      <p style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>{typeof label === "number" ? `Day ${label}` : label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AnalyticsPage() {
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-end justify-between pt-1.5">
          <div>
            <h1 className="text-[1.6rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>Analytics & Insights</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Fraud detection performance · all metrics reflect current period</p>
          </div>
          <select
            className="text-sm px-3 py-2 rounded-xl border outline-none"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        {/* 6 Metric cards */}
        <div className="grid grid-cols-6 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="card card-hover p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.iconBg, color: m.iconColor }}>
                  {m.icon}
                </div>
                <button style={{ color: "var(--muted-foreground)" }}><MoreHorizontal size={14} /></button>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted-foreground)" }}>{m.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[1.4rem] font-bold" style={{ color: "var(--foreground)" }}>{m.value}</span>
                  {m.trend && (
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: m.trend.up ? "#16a34a" : "#ef4444" }}
                    >
                      {m.trend.val}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two charts */}
        <div className="grid grid-cols-2 gap-4">
          {/* Area/Line chart */}
          <div className="card p-5">
            <h2 className="font-bold text-[0.95rem]" style={{ color: "var(--foreground)" }}>Daily Claims vs Fraud Detected</h2>
            <p className="text-xs mt-0.5 mb-4" style={{ color: "var(--muted-foreground)" }}>
              <span style={{ color: "var(--foreground)" }}>——</span> Total &nbsp;
              <span style={{ color: "#72e3ad" }}>——</span> Fraud
            </p>
            <div className="h-52">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#72e3ad" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#72e3ad" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} tickFormatter={(v) => `D${v}`} interval={4} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="total" name="Total Claims" stroke="var(--foreground)" strokeWidth={1.8} fill="url(#totalGrad)" dot={false} />
                    <Area type="monotone" dataKey="fraud" name="Fraud Detected" stroke="#72e3ad" strokeWidth={2} fill="url(#fraudGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ChartFallback />
              )}
            </div>
          </div>

          {/* Bar chart by type */}
          <div className="card p-5">
            <h2 className="font-bold text-[0.95rem]" style={{ color: "var(--foreground)" }}>Fraud by Claim Type</h2>
            <p className="text-xs mt-0.5 mb-4" style={{ color: "var(--muted-foreground)" }}>Count of flagged claims per category this period</p>
            <div className="h-52">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fraudByType} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)", radius: 4 }} />
                    <Bar dataKey="count" name="Cases" radius={[5, 5, 2, 2]} maxBarSize={40}>
                      {fraudByType.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ChartFallback />
              )}
            </div>
          </div>
        </div>

        {/* Signal frequency horizontal bars */}
        <div className="card p-5">
          <h2 className="font-bold text-[0.95rem] mb-5" style={{ color: "var(--foreground)" }}>Top Fraud Signal Frequency — This Month</h2>
          <div className="space-y-4">
            {signalFreq.map((s) => (
              <div key={s.signal} className="flex items-center gap-4">
                <span className="text-sm font-medium w-56 shrink-0" style={{ color: "var(--foreground)" }}>{s.signal}</span>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--accent)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(s.count / signalFreq[0].count) * 100}%`, background: `linear-gradient(90deg, ${s.color}88, ${s.color})`, transition: "width 0.8s ease" }}
                  />
                </div>
                <span className="text-sm font-bold tabular-nums w-10 text-right" style={{ color: "var(--foreground)" }}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 risk table */}
        <div className="card p-5">
          <h2 className="font-bold text-[0.95rem] mb-4" style={{ color: "var(--foreground)" }}>Top 5 Highest Risk Claims This Month</h2>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Claim ID", "Claimant", "Type", "Amount", "Risk Score", "Status"].map((h) => (
                  <th key={h} className="text-left pb-2.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topClaims.map((c) => {
                const sc = scoreChip(c.score);
                const st = statusConfig(c.status);
                return (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-3 font-bold text-[0.82rem]" style={{ color: "var(--foreground)" }}>{c.id}</td>
                    <td className="py-3 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.claimant}</td>
                    <td className="py-3 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.type}</td>
                    <td className="py-3 text-[0.82rem] font-semibold" style={{ color: "var(--foreground)" }}>{c.amount}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center justify-center w-[34px] h-[26px] rounded-full text-[11px] font-bold border" style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>{c.score}</span>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border" style={{ background: st.bg, color: st.text, borderColor: st.border }}>
                        {st.icon} {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
