"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  FileText, AlertTriangle, Activity, TrendingUp,
  ArrowUpRight, ArrowDownRight, Download, Plus,
  Search, ChevronDown, CheckCircle2, Clock4,
  MoreHorizontal, Eye, SlidersHorizontal, ShieldCheck, Volume2,
} from "lucide-react";
import { useChat } from "@/components/providers/ChatProvider";
import { ShiningText } from "@/components/ui/shining-text";
import { Card } from "@/components/ui/card";
import { riskChip, StatusBadge } from "@/components/dashboard/StatusBadge";
import { mockClaims, monthlyData } from "@/data/dashboard";
import { api, type ChatRequest, type ScoreResponse } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

export default function DashboardPage() {
  const router = useRouter();
  const [chartsReady, setChartsReady] = useState(false);
  const [chartView, setChartView] = useState<"line" | "bar">("bar");
  const [query, setQuery] = useState("");
  const { isThinking, setIsThinking } = useChat();
  const [chatValue, setChatValue] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  
  // Persists conversation history across multi-turn chat
  const conversationHistory = useRef<{ role: string; content: string }[]>([]);
  // Store the active scored claim from the ML pipeline
  const activeClaim = useRef<ScoreResponse | null>(null);

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

  const [role, setRole] = useState<string>("customer");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [useVoiceAI, setUseVoiceAI] = useState(true);

  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    const fetchSessionAndRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // 1. Fetch Role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      let assignedRole = user.user_metadata?.role || "customer"; 
      if (profile && profile.role) {
        assignedRole = profile.role;
      } else if (user.email) {
        if (user.email.includes("admin") || user.email.includes("staff") || user.email.includes("demo")) {
          assignedRole = "company_admin";
        }
      }
      setRole(assignedRole);

      // 2. Fetch Real Claims from Supabase
      const { data: realClaims, error: claimsError } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (realClaims && realClaims.length > 0) {
        setClaims(realClaims);
        setSelectedClaim(realClaims[0]);
        analyzeClaim(realClaims[0]);
      } else {
        // Fallback to mock if table is empty
        setClaims(mockClaims);
        setSelectedClaim(mockClaims[0]);
        analyzeClaim(mockClaims[0]);
      }
      
      setChartsReady(true);
    };
    
    fetchSessionAndRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/login");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const isInternal = role === "company_admin" || role === "employee_admin";

  const analyzeClaim = async (claim: typeof mockClaims[0]) => {
    setActiveAnalysis(prev => ({ ...prev, isAnalyzing: true }));
    try {
      // Use the new structured API for analysis
      const data = await api.analyzeClaim({
        claim_amount: claim.claim_amount,
        expected_amount: claim.expected_amount,
        policy_age_days: claim.policy_age_days,
        claim_frequency: claim.claim_frequency
      });
      
      activeClaim.current = data;
      setActiveAnalysis({
        risk_score: data.risk_score_100 || 0,
        signals: data.explanation || [],
        explanation: data.sarvam_summary || "Summary pending.",
        isAnalyzing: false
      });
    } catch (e) {
      console.error("Analysis failed", e);
      setActiveAnalysis(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const handleClaimSelect = (claim: typeof mockClaims[0]) => {
    setSelectedClaim(claim);
    analyzeClaim(claim);
  };

  const playAudio = async (text: string) => {
    if (!text || isPlayingAudio || !useVoiceAI) return;
    
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
      };
      
      await audio.play();
    } catch (e: any) {
      console.error("Audio playback failed", e);
      setIsPlayingAudio(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = chatValue.trim();
    if (!msg) return;

    setAiResponse(null);
    setChatValue("");
    setIsThinking(true);

    try {
      const req: ChatRequest = {
        score_response: (activeClaim.current ?? {
          fraud_score: 0,
          risk_score_100: 0,
          risk_tier: "LOW",
          recommended_action: "N/A",
          explanation: [],
          sarvam_summary: "",
        }) as ScoreResponse,
        user_message: msg,
        conversation_history: conversationHistory.current,
        language: "en-IN",
      };

      const res = await api.sarvamChat(req);

      conversationHistory.current = [
        ...conversationHistory.current,
        { role: "user",      content: msg },
        { role: "assistant", content: res.reply },
      ];

      setAiResponse(res.reply);
    } catch (error) {
      console.error("Chat Error:", error);
      setAiResponse("Sorry, I'm having trouble connecting to the AI engine. Please ensure the Sarvam service is running.");
    } finally {
      setIsThinking(false);
    }
  };

  const filteredClaims = (claims || []).filter(
    (c) =>
      c.claimant?.toLowerCase().includes(query.toLowerCase()) ||
      c.id?.toLowerCase().includes(query.toLowerCase())
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

  const customerMetrics = [
    {
      label: "Your Active Claims",
      value: "2",
      sub: "Currently under review",
      subIcon: <Clock4 size={12} />,
      subColor: "#f59e0b",
      icon: <FileText size={18} />,
      iconBg: "rgba(59,130,246,0.12)",
      iconColor: "#3b82f6",
    },
    {
      label: "Resolved Claims",
      value: "5",
      sub: "Processed successfully",
      subIcon: <CheckCircle2 size={12} />,
      subColor: "#16a34a",
      icon: <ShieldCheck size={18} />,
      iconBg: "rgba(34,197,94,0.12)",
      iconColor: "#22c55e",
    },
  ];

  if (!isInternal) {
    return (
      <>
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[1.6rem] font-bold tracking-tight text-[var(--foreground)]">
              Welcome to Detectra
            </h1>
            <p className="text-[0.85rem] text-[var(--muted-foreground)] mt-1">
              Manage your policies and track your recent claims.
            </p>
          </div>
          <Link
            href="/claims/submit"
            className="flex items-center gap-2 rounded-2xl px-6 py-3 text-[0.85rem] font-bold transition-all hover:opacity-90 active:scale-95 shadow-md"
            style={{ background: "var(--primary)", color: "white" }}
          >
            <Plus size={16} /> File a New Claim
          </Link>
        </div>

        <h2 className="text-[1.1rem] font-bold tracking-tight mb-4" style={{ color: "var(--foreground)" }}>Active Claim Status</h2>
        
        <Card className="p-6 md:p-8 mb-8 border border-[var(--border)] relative overflow-hidden bg-[var(--card)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
             <div>
                <span className="text-[0.65rem] font-bold uppercase tracking-widest mb-2 block" style={{ color: "var(--primary)" }}>Active Investigation</span>
                <p className="text-[1.3rem] font-bold text-[var(--foreground)]">{selectedClaim?.type}</p>
                <p className="text-[0.8rem] text-[var(--muted-foreground)] mt-1">Claim ID: {selectedClaim?.id} &bull; Filed on {selectedClaim?.processed}</p>
             </div>
             <div className="sm:text-right px-4 py-3 rounded-xl" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                <p className="text-[0.7rem] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Expected Payout</p>
                <p className="text-[1.5rem] font-black text-[var(--foreground)] leading-none">{selectedClaim?.amount}</p>
             </div>
           </div>

           <div className="relative pt-6 pb-2 px-2 md:px-8">
             <div className="absolute top-[2rem] left-0 w-full h-[3px] bg-[var(--muted)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--primary)] w-[40%] rounded-full shadow-[0_0_10px_var(--primary)]" />
             </div>
             <div className="relative flex justify-between z-10">
               {["Submitted", "Under Review", "Decision", "Payout"].map((step, i) => (
                 <div key={step} className="flex flex-col items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[0.8rem] font-bold border-[4px] border-[var(--card)] transition-all ${i <= 1 ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30 scale-110" : "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>
                     {i < 1 ? <CheckCircle2 size={16}/> : i + 1}
                   </div>
                   <span className={`text-[0.75rem] font-bold ${i <= 1 ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}>{step}</span>
                 </div>
               ))}
             </div>
           </div>
        </Card>

        <h2 className="text-[1.1rem] font-bold tracking-tight mb-4" style={{ color: "var(--foreground)" }}>Claim History</h2>
        
        <div className="grid grid-cols-1 gap-3">
          {filteredClaims?.map((c) => (
             <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 hover:shadow-md transition-all cursor-pointer group gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors group-hover:bg-[var(--primary)] group-hover:text-white" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                   <FileText size={20} />
                 </div>
                 <div>
                   <p className="text-[0.95rem] font-bold text-[var(--foreground)]">{c.type}</p>
                   <p className="text-[0.75rem] text-[var(--muted-foreground)] mt-0.5">Ref: {c.id} &bull; Processed on {c.processed}</p>
                 </div>
               </div>
               <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t sm:border-0 border-[var(--border)] pt-3 sm:pt-0">
                 <p className="text-[1.05rem] font-bold text-[var(--foreground)]">{c.amount}</p>
                 <StatusBadge status={c.status} />
               </div>
             </div>
          ))}
        </div>
      </>
    );
  }

  const activeMetrics = metrics;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[1.35rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          {isInternal && (
            <div 
              className="mr-3 flex items-center gap-3 rounded-xl border px-3 py-1.5 transition-all"
              style={{ background: useVoiceAI ? "rgba(114,227,173,0.05)" : "var(--card)", borderColor: useVoiceAI ? "rgba(114,227,173,0.2)" : "var(--border)" }}
            >
              <div className="flex flex-col">
                <span className="text-[0.6rem] font-bold uppercase tracking-tight text-neutral-500">Sarvam AI</span>
                <span className="text-[0.65rem] font-bold text-white">Bulbul v3</span>
              </div>
              <button onClick={() => setUseVoiceAI(!useVoiceAI)} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${useVoiceAI ? "bg-emerald-500" : "bg-neutral-800"}`}>
                <span className={`pointer-events-none block h-3.5 w-3.5 rounded-full bg-white shadow-lg transition-transform ${useVoiceAI ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          )}
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-[0.8rem] font-semibold hover:bg-[var(--accent)]" style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
            <FileText size={14} /> Generate Report
          </button>
          <div className="ml-2 flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <Search size={13} style={{ color: "var(--muted-foreground)" }} />
            <input type="text" placeholder="Search claims…" className="w-36 bg-transparent text-[0.78rem] outline-none" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-4">
        {activeMetrics?.map((m, i) => (
          <Card key={i} className="p-4 flex flex-col gap-1 transition-all hover:scale-[1.02]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.72rem] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>{m.label}</p>
            </div>
            <p className="mb-2 text-[1.8rem] font-bold tracking-tight" style={{ color: (m as any).valueColor ?? "var(--foreground)" }}>{m.value}</p>
            <div className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
              <span style={{ color: m.subColor }}>{m.subIcon}</span>
              <span className="text-[0.71rem] font-medium" style={{ color: "var(--muted-foreground)" }}>{m.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-5 gap-4">
        <Card className="col-span-2 p-5 flex flex-col gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-widest mb-1 text-[var(--muted-foreground)]">AI-Generated Risk Score</p>
            <p className="text-[1.8rem] font-bold" style={{ color: activeAnalysis.risk_score > 70 ? "#ef4444" : "#f59e0b" }}>{activeAnalysis.isAnalyzing ? "--" : activeAnalysis.risk_score} / 100</p>
            <div className="grid grid-cols-1 gap-y-1 mt-4">
              {activeAnalysis?.signals?.map((s, idx) => (
                <span key={idx} className="flex items-center gap-1.5 text-[0.7rem] text-[var(--muted-foreground)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#ef4444" }} />
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl p-4 mt-auto bg-gradient-to-br from-[#0f1e3c] to-[#162d56] border border-white/5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#72e3ad] mb-1">Active Investigation</p>
                <div className="flex items-center gap-2">
                  <p className="text-[0.75rem] font-bold text-white">Claim {selectedClaim.id}</p>
                  <button onClick={() => playAudio(activeAnalysis.explanation)} disabled={isPlayingAudio} className="p-1 rounded-md hover:bg-white/10">
                    <Volume2 size={12} className={isPlayingAudio ? "animate-pulse text-[#72e3ad]" : "text-neutral-400"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="col-span-3 p-5 flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.72rem] font-semibold uppercase text-[var(--muted-foreground)]">System Platform Volume</p>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                <Bar dataKey="v" fill="#72e3ad" radius={[5, 5, 2, 2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--muted)] border-b border-[var(--border)]">
              <tr className="text-[0.65rem] font-bold uppercase text-[var(--muted-foreground)]">
                {["Claim ID", "Claimant", "Type", "Amount", "Processed Date", "Status", ""].map((h) => <th key={h} className="px-5 py-4 text-left">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredClaims?.map((c) => (
                <tr key={c.id} onClick={() => handleClaimSelect(c)} className={`cursor-pointer border-b border-[var(--border)] ${selectedClaim?.id === c.id ? "bg-[var(--primary)]/5" : "hover:bg-[var(--muted)]/30"}`}>
                  <td className="px-5 py-4 font-bold text-[0.82rem]">{c.id}</td>
                  <td className="px-5 py-4 font-medium">{c.claimant}</td>
                  <td className="px-5 py-4">{c.type}</td>
                  <td className="px-5 py-4 font-semibold">{c.amount}</td>
                  <td className="px-5 py-4 text-[var(--muted-foreground)]">{c.processed}</td>
                  <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-4 text-right"><Eye size={14} className="text-[var(--primary)]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Floating Chatbox */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50 pointer-events-none">
        {(isThinking || aiResponse) && (
          <div className="mb-4 pointer-events-auto flex flex-col items-center">
            {isThinking ? (
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[var(--background)] border border-[var(--border)] shadow-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                <ShiningText text="Detectra is thinking..." />
              </div>
            ) : (
              <div className="max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-2xl relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]" />
                <p className="text-[var(--foreground)] text-[0.85rem]">{aiResponse}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                   <button onClick={() => playAudio(aiResponse || "")} className="flex items-center gap-1.5 text-[0.65rem] font-bold text-[var(--primary)]">
                     <Volume2 size={12} className={isPlayingAudio ? "animate-pulse" : ""} /> Listen
                   </button>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="pointer-events-auto">
          <div className="relative flex items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-2 shadow-2xl">
            <ShieldCheck size={20} className="ml-3 text-[var(--primary)]" />
            <input
              type="text"
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
              placeholder="Ask Detectra about this claim..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-[0.88rem]"
            />
            <button type="submit" className="bg-[var(--primary)] text-white px-6 py-2 rounded-xl font-bold text-sm">Analyze</button>
          </div>
        </form>
      </div>
    </>
  );
}
