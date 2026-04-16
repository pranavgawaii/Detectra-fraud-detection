"use client";

import AppShell from "@/components/layout/AppShell";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  FileText, AlertTriangle, Activity, TrendingUp,
  ArrowUpRight, ArrowDownRight, Download, Plus,
  Search, ChevronDown, ShieldX, CheckCircle2, Clock4,
  MoreHorizontal, Eye, SlidersHorizontal, ShieldCheck, Volume2,
} from "lucide-react";
import { useChat } from "@/components/providers/ChatProvider";
import { ShiningText } from "@/components/ui/shining-text";
import { Card } from "@/components/ui/card";
import { riskChip, StatusBadge } from "@/components/dashboard/StatusBadge";
import { mockClaims, monthlyData, fraudSignals } from "@/data/dashboard";

/* ── Helpers ──────────────────────────────────────────────── */
function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border px-3 py-2 text-xs"
      style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
    >
      <p className="font-semibold mb-0.5" style={{ color: "var(--foreground)" }}>{label}</p>
      <p style={{ color: "var(--muted-foreground)" }}>
        <span style={{ color: "#72e3ad", fontWeight: 700 }}>{payload[0].value}</span> cases
      </p>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [chartsReady, setChartsReady] = useState(false);
  const [chartView, setChartView] = useState<"line" | "bar">("bar");
  const [query, setQuery] = useState("");
  const { isThinking, setIsThinking } = useChat();
  const [chatValue, setChatValue] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = useState(mockClaims[0]);
  const [activeAnalysis, setActiveAnalysis] = useState<{
    risk_score: number;
    signals: string[];
    explanation: string;
    isAnalyzing: boolean;
  }>({
    risk_score: mockClaims[0].risk,
    signals: ["Potential high claim amount", "New policy risk"],
    explanation: "Selection detailed analysis pending...",
    isAnalyzing: false
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setChartsReady(true);
        analyzeClaim(mockClaims[0]);
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/login");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const analyzeClaim = async (claim: typeof mockClaims[0]) => {
    setActiveAnalysis(prev => ({ ...prev, isAnalyzing: true }));
    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claim_amount: claim.claim_amount,
          expected_amount: claim.expected_amount,
          policy_age_days: claim.policy_age_days,
          claim_frequency: claim.claim_frequency
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setActiveAnalysis({
          risk_score: data.risk_score,
          signals: data.signals,
          explanation: data.explanation,
          isAnalyzing: false
        });
      }
    } catch (e) {
      console.error("Analysis failed", e);
      setActiveAnalysis(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const handleClaimSelect = (claim: typeof mockClaims[0]) => {
    setSelectedClaim(claim);
    analyzeClaim(claim);
  };

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const playAudio = async (text: string) => {
    if (!text || isPlayingAudio) return;
    
    setIsPlayingAudio(true);
    try {
      const response = await fetch("http://localhost:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) throw new Error("TTS failed");
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(url);
      };

      audio.onerror = (err) => {
        console.error("Audio error", err);
        setIsPlayingAudio(false);
        alert("Playback error. Please check your speaker/volume.");
      };
      
      await audio.play();
    } catch (e: any) {
      console.error("Audio playback failed", e);
      setIsPlayingAudio(false);
      alert("Audio failed: " + (e.message || "Unknown error"));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatValue.trim()) return;
    
    const userMsg = chatValue;
    setAiResponse(null);
    setChatValue("");
    setIsThinking(true);
    
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response from AI service");
      }
      
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      console.error("Chat Error:", error);
      setAiResponse("Sorry, I'm having trouble connecting to the AI engine. Please ensure the Sarvam service is running.");
    } finally {
      setIsThinking(false);
    }
  };

  const filteredClaims = mockClaims.filter(
    (c) =>
      c.id.toLowerCase().includes(query.toLowerCase()) ||
      c.claimant.toLowerCase().includes(query.toLowerCase())
  );

  const metrics = [
    {
      label: "Total Claims Today",
      value: "147",
      sub: "Vs Last month",
      subIcon: <ArrowUpRight size={12} />,
      subColor: "#16a34a",
      icon: <FileText size={18} />,
      iconBg: "rgba(59,130,246,0.12)",
      iconColor: "#3b82f6",
    },
    {
      label: "High Risk Claims",
      value: "23",
      sub: "Vs Last month",
      subIcon: <ArrowDownRight size={12} />,
      subColor: "#ef4444",
      icon: <AlertTriangle size={18} />,
      iconBg: "rgba(239,68,68,0.12)",
      iconColor: "#ef4444",
      valueColor: "#ef4444",
    },
    {
      label: "Avg Risk Score",
      value: "61",
      sub: "Vs Last month",
      subIcon: <ArrowUpRight size={12} />,
      subColor: "#f59e0b",
      icon: <Activity size={18} />,
      iconBg: "rgba(245,158,11,0.12)",
      iconColor: "#f59e0b",
    },
    {
      label: "Amount at Risk",
      value: "₹2.3 Cr",
      sub: "Vs Last month",
      subIcon: <ArrowUpRight size={12} />,
      subColor: "#16a34a",
      icon: <TrendingUp size={18} />,
      iconBg: "rgba(114,227,173,0.14)",
      iconColor: "#16a34a",
    },
  ];

  return (
    <AppShell>
      {/* ── Page header ───────────────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[1.35rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-[0.8rem] font-semibold transition-all hover:bg-[var(--accent)]"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            <FileText size={14} /> Generate Report
          </button>
          <button
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-[0.8rem] font-semibold transition-all hover:bg-[var(--accent)]"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            <Download size={14} /> Export
          </button>
          <div className="ml-2 flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <Search size={13} style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              placeholder="Search claims…"
              className="w-36 bg-transparent text-[0.78rem] outline-none placeholder:text-[var(--muted-foreground)]"
              style={{ color: "var(--foreground)" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Top metric row ─────────────────────────────── */}
      <div className="mb-5 grid grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className="p-4 flex flex-col gap-1 transition-all hover:scale-[1.02]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.72rem] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                {m.label}
              </p>
              <button style={{ color: "var(--muted-foreground)" }}>
                <MoreHorizontal size={14} />
              </button>
            </div>
            <p
              className="mb-2 text-[1.8rem] font-bold tracking-tight leading-none"
              style={{ color: (m as any).valueColor ?? "var(--foreground)" }}
            >
              {m.value}
            </p>
            <div
              className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5"
              style={{ background: "var(--muted)", borderColor: "var(--border)" }}
            >
              <span style={{ color: m.subColor }}>{m.subIcon}</span>
              <span className="text-[0.71rem] font-medium" style={{ color: "var(--muted-foreground)" }}>
                {m.sub}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Mid section ────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-5 gap-4">

        {/* AI Risk Panel — 2 cols */}
        <Card className="col-span-2 p-5 flex flex-col gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--muted-foreground)" }}>
              AI-Generated Risk Score
            </p>
            <p className="text-[1.8rem] font-bold tracking-tight leading-none mb-3" style={{ color: activeAnalysis.risk_score > 70 ? "#ef4444" : "#f59e0b" }}>
              {activeAnalysis.isAnalyzing ? "--" : activeAnalysis.risk_score} / 100
            </p>

            {/* Progress segments */}
            <p className="text-[0.72rem] font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>
              Smart Risk Breakdown
            </p>
            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mb-2.5">
              {activeAnalysis.signals.map((s, idx) => (
                <div
                  key={idx}
                  style={{ width: `${100 / (activeAnalysis.signals.length || 1)}%`, background: "#ef4444", opacity: 0.85, flex: "0 0 auto", minWidth: 6 }}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              {activeAnalysis.signals.map((s, idx) => (
                <span key={idx} className="flex items-center gap-1.5 text-[0.7rem]" style={{ color: "var(--muted-foreground)" }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#ef4444" }} />
                  {s}
                </span>
              ))}
              {activeAnalysis.signals.length === 0 && (
                <span className="text-[0.7rem] text-neutral-500 italic">No critical signals detected</span>
              )}
            </div>
          </div>

          {/* Dark fraud card */}
          <div
            className="relative overflow-hidden rounded-xl p-4 mt-auto group transition-all"
            style={{
              background: "linear-gradient(145deg, #0f1e3c 0%, #162d56 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: 120,
            }}
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full transition-all group-hover:scale-125 opacity-20" style={{ background: "#72e3ad", filter: "blur(24px)" }} />
            <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full opacity-10" style={{ background: "#3b82f6", filter: "blur(20px)" }} />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "#72e3ad" }}>
                  {activeAnalysis.isAnalyzing ? "Analyzing..." : "Active Investigation"}
                </p>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[0.75rem] font-bold text-white">Claim {selectedClaim.id}</p>
                  <button 
                    onClick={() => playAudio(activeAnalysis.explanation)}
                    disabled={activeAnalysis.isAnalyzing || isPlayingAudio}
                    className="p-1 rounded-md hover:bg-white/10 transition-colors disabled:opacity-30"
                    title="Listen to analysis"
                  >
                    <Volume2 size={12} className={isPlayingAudio ? "animate-pulse text-[#72e3ad]" : "text-neutral-400"} />
                  </button>
                </div>
                <div className="text-[0.68rem] leading-relaxed max-h-[60px] overflow-y-auto custom-scrollbar" style={{ color: "#94a3b8" }}>
                  {activeAnalysis.isAnalyzing ? (
                    <span className="animate-pulse">Loading AI explanation...</span>
                  ) : (
                    activeAnalysis.explanation
                  )}
                </div>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold"
                style={{ 
                  background: activeAnalysis.risk_score > 70 ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)", 
                  color: activeAnalysis.risk_score > 70 ? "#ef4444" : "#f59e0b", 
                  border: `1px solid ${activeAnalysis.risk_score > 70 ? "rgba(239,68,68,0.35)" : "rgba(245,158,11,0.35)"}` 
                }}
              >
                {activeAnalysis.risk_score > 70 ? "HIGH RISK" : "MODERATE"}
              </span>
            </div>

            {/* SVG mini gauge */}
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
                  <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                  <circle
                    cx="24" cy="24" r="19" fill="none"
                    stroke="url(#gGrad)" strokeWidth="5"
                    strokeDasharray={`${(activeAnalysis.risk_score / 100) * 119.4} 119.4`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={activeAnalysis.risk_score > 70 ? "#f87171" : "#fbbf24"} />
                      <stop offset="100%" stopColor={activeAnalysis.risk_score > 70 ? "#ef4444" : "#f59e0b"} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[0.82rem] font-black text-white">{activeAnalysis.isAnalyzing ? "..." : activeAnalysis.risk_score}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <button
                  className="rounded-lg px-3 py-1.5 text-[0.7rem] font-bold transition-all hover:bg-[rgba(239,68,68,0.25)]"
                  style={{ background: "rgba(239,68,68,0.18)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.28)" }}
                >
                  Escalate to SIU
                </button>
                <button
                  className="rounded-lg px-3 py-1.5 text-[0.7rem] font-bold transition-all hover:bg-[rgba(34,197,94,0.18)]"
                  style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.24)" }}
                >
                  Mark as Safe
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Fraud Trend Chart — 3 cols */}
        <Card className="col-span-3 p-5 flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted-foreground)" }}>
                Available Case Volume
              </p>
              <p className="text-[1.8rem] font-bold tracking-tight leading-none" style={{ color: "var(--foreground)" }}>
                1,847 cases
              </p>
            </div>

            {/* View toggle */}
            <div
              className="flex items-center gap-1 rounded-xl border p-1"
              style={{ background: "var(--muted)", borderColor: "var(--border)" }}
            >
              {(["bar", "line"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setChartView(v)}
                  className="rounded-lg px-3 py-1.5 text-[0.73rem] font-semibold capitalize transition-all"
                  style={
                    chartView === v
                      ? { background: "var(--card)", color: "var(--foreground)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                      : { color: "var(--muted-foreground)" }
                  }
                >
                  {v === "bar" ? "Bar view" : "Line view"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-[220px]">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%">
                {chartView === "bar" ? (
                  <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--border)" />
                    <XAxis
                      dataKey="name" axisLine={false} tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "inherit" }} dy={6}
                    />
                    <YAxis
                      axisLine={false} tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "inherit" }}
                    />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: "var(--accent)", radius: 4 } as any} />
                    <Bar dataKey="v" name="Cases" radius={[5, 5, 2, 2]} maxBarSize={26}>
                      {monthlyData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.name === "Jul" ? "#72e3ad" : "var(--accent)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <LineChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--border)" />
                    <XAxis
                      dataKey="name" axisLine={false} tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "inherit" }} dy={6}
                    />
                    <YAxis
                      axisLine={false} tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "inherit" }}
                    />
                    <Tooltip content={<BarTooltip />} />
                    <Line
                      type="monotone" dataKey="v" stroke="#72e3ad" strokeWidth={2.5}
                      dot={{ fill: "#72e3ad", r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full rounded-xl shimmer opacity-20" style={{ background: "var(--muted)" }} />
            )}
          </div>

          <div className="mt-3 flex items-center gap-1 text-[0.71rem]" style={{ color: "var(--muted-foreground)" }}>
            <ArrowUpRight size={13} style={{ color: "#22c55e" }} />
            <span><span style={{ color: "#22c55e", fontWeight: 700 }}>+18.5%</span> vs last quarter</span>
          </div>
        </Card>
      </div>

      {/* ── Claims table ───────────────────────────────── */}
      <Card className="overflow-hidden">
        {/* Table toolbar */}
        <div
          className="flex items-center gap-3 px-5 py-3.5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="flex items-center gap-2 rounded-xl border px-3 py-2 flex-1 max-w-xs transition-all focus-within:border-[var(--primary)]"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <Search size={13} style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              placeholder="Search Transaction..."
              className="w-full bg-transparent text-[0.78rem] outline-none placeholder:text-[var(--muted-foreground)]"
              style={{ color: "var(--foreground)" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[0.78rem] font-semibold transition-all hover:bg-[var(--accent)]"
            style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            <SlidersHorizontal size={13} /> Processed Date
          </button>
          <button
            className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[0.78rem] font-semibold transition-all hover:bg-[var(--accent)]"
            style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            More <ChevronDown size={13} />
          </button>
          <div className="ml-auto">
            <Link
              href="/claims/submit"
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-[0.78rem] font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <Plus size={13} /> New Claim
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                {["Claim ID", "Claimant", "Type", "Amount", "Risk Period", "Payment Method", "Processed Date", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-left text-[0.65rem] font-bold uppercase tracking-widest last:text-right"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((c) => {
                const rc = riskChip(c.risk);
                return (
                  <tr
                    key={c.id}
                    onClick={() => handleClaimSelect(c)}
                    className={`group transition-colors cursor-pointer ${selectedClaim.id === c.id ? "bg-[var(--primary)]/10" : "hover:bg-[var(--muted)]/50"}`}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-5 py-4 font-bold text-[0.82rem]" style={{ color: "var(--foreground)" }}>
                      {c.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[0.65rem] font-bold shrink-0 shadow-sm"
                          style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}
                        >
                          {c.claimant.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[0.82rem] font-medium" style={{ color: "var(--foreground)" }}>{c.claimant}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.type}</td>
                    <td className="px-5 py-4 text-[0.82rem] font-semibold" style={{ color: "var(--foreground)" }}>{c.amount}</td>
                    <td className="px-5 py-4 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.period}</td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-block rounded-lg px-2.5 py-1 text-[0.7rem] font-semibold border"
                        style={{ background: rc.bg, color: rc.text, borderColor: rc.border }}
                      >
                        {c.method}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.processed}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/claims/${c.id.toLowerCase()}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.7rem] font-bold opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--accent)]"
                        style={{ color: "var(--primary)" }}
                      >
                        <Eye size={12} /> View Claim
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Floating Chatbox (Fixed position) ─────────────────── */}
      <div 
        className="fixed bottom-10 z-50 pointer-events-none transition-all duration-300 ease-in-out w-full max-w-2xl px-4"
        style={{ 
          left: "calc((100% + var(--sidebar-width, 216px)) / 2)",
          transform: "translateX(-50%)"
        }}
      >
        
        {/* AI Thought & Response bubble */}
        {(isThinking || aiResponse) && (
          <div className="mb-4 pointer-events-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isThinking ? (
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[var(--background)] border border-[var(--border)] shadow-xl ring-1 ring-black/5 mb-2 overflow-hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                <ShiningText text="Detectra is thinking..." />
              </div>
            ) : (
              <div className="max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] text-[0.85rem] leading-relaxed relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]" />
                <p className="text-[var(--foreground)] font-medium">{aiResponse}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.1em] text-[var(--muted-foreground)]">Detectra Engine v1.42</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => aiResponse && playAudio(aiResponse)}
                      disabled={isPlayingAudio}
                      className="flex items-center gap-1.5 text-[0.65rem] font-bold text-[var(--primary)] hover:underline disabled:opacity-30"
                    >
                      <Volume2 size={12} className={isPlayingAudio ? "animate-pulse" : ""} />
                      Listen
                    </button>
                    <button onClick={() => setAiResponse(null)} className="text-[0.65rem] font-bold text-[var(--primary)] hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Dismiss Analysis</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <form 
          onSubmit={handleSendMessage}
          className="pointer-events-auto relative"
        >
          <div className="relative flex items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)] overflow-hidden transition-all focus-within:ring-2 ring-[var(--primary)]/20 focus-within:border-[var(--primary)]">
            <div className="p-3 text-[var(--primary)] shrink-0 opacity-80">
              <ShieldCheck size={20} />
            </div>
            <input
              type="text"
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
              placeholder="Ask Detectra to analyze these claims..."
              className="flex-1 bg-transparent border-none outline-none px-2 text-[0.88rem] font-medium placeholder:text-[var(--muted-foreground)] text-[var(--foreground)]"
            />
            <button
              type="submit"
              disabled={!chatValue.trim() || isThinking}
              className="flex h-10 min-w-[80px] items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold text-[0.8rem] transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 ml-2 shadow-sm border border-black/10"
            >
              {isThinking ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Analyze"}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
