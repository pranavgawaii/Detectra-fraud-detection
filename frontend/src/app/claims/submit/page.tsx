"use client";

import { useState, useRef } from "react";
import { ChevronRight, AlertTriangle, CheckCircle2, Loader2, FileText, Send, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { api, ScoreResponse, ChatRequest } from "@/lib/api";

const inputStyle = {
  width: "100%" as const,
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "10px 12px",
  fontSize: "0.875rem",
  outline: "none",
  background: "var(--input)",
  color: "var(--foreground)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--muted-foreground)",
  marginBottom: "6px",
};

export default function SubmitClaimPage() {
  const [policeReport, setPoliceReport] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "analyzing" | "done">("idle");
  const [aiResult, setAiResult] = useState<ScoreResponse | null>(null);

  // Chatbot state
  const [chatValue, setChatValue] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const conversationHistory = useRef<{ role: string; content: string }[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    contact: "",
    email: "",
    policyNumber: "",
    policyType: "Auto",
    claimAmount: "",
    incidentType: "Collision",
    incidentDate: "",
    location: "",
    description: "",
    fir: "",
    station: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const autoFill = () => {
    setFormData({
      firstName: "Michael",
      lastName: "Scott",
      dob: "1975-03-15",
      contact: "+91 98765 00000",
      email: "mscott@company.com",
      policyNumber: "POL-3849-XYZ",
      policyType: "Auto",
      claimAmount: "85000",
      incidentType: "Collision",
      incidentDate: "2023-10-12",
      location: "Mumbai, MH",
      description: "Hit a stationary pole while driving at night. No witnesses available. The pole was not visible.",
      fir: "MH/ANE/9999",
      station: "Andheri Branch",
    });
    setPoliceReport(true);
  };

  const handleAnalyze = async () => {
    setAiStatus("analyzing");
    setAiResult(null);
    setAiResponse(null);
    conversationHistory.current = [];

    try {
      const payload = {
        claim_amount: Number(formData.claimAmount) || 85000,
        expected_amount: 15000, // mock logic for comparison
        policy_age_days: 12, // mock flag: very recent policy
        claim_frequency: 3, // mock flag: high frequency
      };
      const data = await api.analyzeClaim(payload);
      setAiResult(data);
      setAiStatus("done");
    } catch (e) {
      console.error(e);
      // Fallback in case Backend is down
      setTimeout(() => {
        setAiResult({
          fraud_score: 0.85,
          risk_score_100: 85,
          risk_tier: "HIGH",
          recommended_action: "Investigate immediately",
          explanation: ["Claim Amount Anomaly", "High Claim Frequency", "Low Policy Age"],
          sarvam_summary: "This claim exhibits multiple high-risk indicators including a high claim amount shortly after policy inception, and a history of frequent claims.",
        });
        setAiStatus("done");
      }, 2500);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = chatValue.trim();
    if (!msg || !aiResult) return;

    setAiResponse(null);
    setChatValue("");
    setIsThinking(true);

    try {
      const req: ChatRequest = {
        score_response: aiResult,
        user_message: msg,
        conversation_history: conversationHistory.current,
        language: "en-IN",
      };

      const res = await api.sarvamChat(req);

      conversationHistory.current = [
        ...conversationHistory.current,
        { role: "user", content: msg },
        { role: "assistant", content: res.reply },
      ];

      setAiResponse(res.reply);
    } catch (error) {
      console.error("Chat Error:", error);
      setAiResponse("Sorry, I'm having trouble connecting to the AI engine.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-end justify-between pt-1.5">
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <ChevronRight size={12} />
              <Link href="/claims" className="hover:underline">Claims</Link>
              <ChevronRight size={12} />
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Submit Claim</span>
            </div>
            <h1 className="text-[1.6rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>Submit New Claim</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Fill in the details to register and run AI fraud analysis on a claim.</p>
          </div>
          <button
            onClick={autoFill}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" }}
          >
            <Sparkles size={16} /> Auto-fill Mock Claim
          </button>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {/* ── Form ────────────────────────── */}
          <div className="col-span-3 flex flex-col gap-4">

            {/* Claimant Details */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Claimant Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label style={labelStyle}>First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} style={inputStyle} placeholder="John" /></div>
                <div><label style={labelStyle}>Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} placeholder="Doe" /></div>
                <div><label style={labelStyle}>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} /></div>
                <div><label style={labelStyle}>Contact Number</label><input name="contact" value={formData.contact} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" /></div>
                <div className="col-span-2"><label style={labelStyle}>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john.doe@example.com" /></div>
              </div>
            </div>

            {/* Policy Details */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Policy & Claim Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label style={labelStyle}>Policy Number</label><input name="policyNumber" value={formData.policyNumber} onChange={handleChange} style={inputStyle} placeholder="POL-XXXX-XXXXX" /></div>
                <div>
                  <label style={labelStyle}>Policy Type</label>
                  <select name="policyType" value={formData.policyType} onChange={handleChange} style={inputStyle}>
                    <option>Auto</option><option>Health</option><option>Property</option><option>Life</option><option>Travel</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Claim Amount (₹)</label><input type="number" name="claimAmount" value={formData.claimAmount} onChange={handleChange} style={inputStyle} placeholder="45000" /></div>
                <div>
                  <label style={labelStyle}>Incident Type</label>
                  <select name="incidentType" value={formData.incidentType} onChange={handleChange} style={inputStyle}>
                    <option>Collision</option><option>Theft</option><option>Fire</option><option>Flood</option><option>Medical Emergency</option><option>Death</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Incident Date</label><input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} style={inputStyle} /></div>
                <div><label style={labelStyle}>Incident Location</label><input name="location" value={formData.location} onChange={handleChange} style={inputStyle} placeholder="Andheri, Mumbai" /></div>
              </div>
            </div>

            {/* Narrative */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Incident Narrative
              </h2>
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>Detailed Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    style={{ ...inputStyle, resize: "none" }}
                    placeholder="Describe the incident in full detail — timeline, circumstances, witnesses, and any other relevant information..."
                  />
                </div>

                {/* Police report toggle */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Police Report Filed?</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Attach FIR number if applicable</p>
                  </div>
                  <button
                    onClick={() => setPoliceReport((p) => !p)}
                    className={`theme-toggle${policeReport ? " dark-active" : ""}`}
                    aria-label="Toggle police report"
                  />
                </div>
                {policeReport && (
                  <div className="grid grid-cols-2 gap-4">
                    <div><label style={labelStyle}>FIR Number</label><input name="fir" value={formData.fir} onChange={handleChange} style={inputStyle} placeholder="MH/ANE/0276" /></div>
                    <div><label style={labelStyle}>Police Station</label><input name="station" value={formData.station} onChange={handleChange} style={inputStyle} placeholder="Andheri Police Station" /></div>
                  </div>
                )}
              </div>
            </div>

            {/* Supporting Documents */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Supporting Documents
              </h2>
              <button
                className="w-full border-dashed border-2 rounded-xl py-8 text-sm"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              >
                <FileText size={20} className="mx-auto mb-2" style={{ opacity: 0.5 }} />
                Click to upload or drag and drop<br />
                <span className="text-xs">PDF, JPG, PNG up to 10MB per file</span>
              </button>
            </div>

            <button
              onClick={handleAnalyze}
              className="w-full font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[0.98]"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Submit & Run AI Analysis
            </button>
          </div>

          {/* ── AI Preview Panel ─────────────── */}
          <div className="col-span-2 flex flex-col gap-4 sticky top-4 self-start">
            {/* Dark AI card */}
            <div
              className="rounded-2xl p-5 relative overflow-hidden flex flex-col transition-all duration-300"
              style={{ background: "linear-gradient(145deg, #0f1e3c, #162d56)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-20" style={{ background: "#72e3ad", filter: "blur(28px)" }} />
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4 relative flex items-center gap-2" style={{ color: "#72e3ad" }}>
                <Wand2 size={12} /> AI Fraud Analyser — Live Preview
              </p>

              {aiStatus === "idle" && (
                <div className="relative text-center py-8">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" style={{ background: "rgba(255,255,255,0.04)" }} onClick={autoFill}>
                    <Sparkles size={24} style={{ color: "#72e3ad", opacity: 0.8 }} />
                  </div>
                  <p className="text-sm" style={{ color: "#94a3b8" }}>Fill in the form (or <button onClick={autoFill} className="text-emerald-400 hover:text-emerald-300 underline">Auto-fill Mock Data</button>) and click<br /><strong style={{ color: "#fff" }}>Submit & Run AI Analysis</strong><br />to generate a fraud risk report.</p>
                </div>
              )}

              {aiStatus === "analyzing" && (
                <div className="relative space-y-4 py-4">
                  <div className="flex items-center gap-3">
                    <Loader2 size={16} className="animate-spin" style={{ color: "#72e3ad", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "#cbd5e1" }}>Checking claim patterns…</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="dot-1 w-2 h-2 rounded-full" style={{ background: "#72e3ad" }} />
                      <span className="dot-2 w-2 h-2 rounded-full" style={{ background: "#72e3ad" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#94a3b8" }}>Running NLP narrative analysis…</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="dot-1 w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#94a3b8" }}>Verifying policy details…</span>
                  </div>
                </div>
              )}

              {aiStatus === "done" && aiResult && (
                <div className="relative flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} style={{ color: "#72e3ad" }} />
                    <span className="text-sm font-semibold" style={{ color: "#fff" }}>Analysis Complete</span>
                  </div>
                  <div className="text-center py-3 mb-3 rounded-xl" style={{ 
                      background: aiResult.risk_tier === "HIGH" || aiResult.risk_tier === "CRITICAL" ? "rgba(239,68,68,0.15)" : "rgba(22,163,74,0.15)" 
                    }}>
                    <p className="text-[2.5rem] font-bold leading-none" style={{ color: "#fff" }}>{aiResult.risk_score_100}</p>
                    <p className="text-xs mt-1 font-bold" style={{ color: aiResult.risk_tier === "HIGH" || aiResult.risk_tier === "CRITICAL" ? "#ef4444" : "#22c55e" }}>{aiResult.risk_tier} RISK SCORE</p>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                    <strong style={{ color: "#fff" }}>{aiResult.explanation.length} fraud signals triggered:</strong> {aiResult.explanation.join(", ")}.
                  </p>
                  
                  {/* Assistant summary */}
                  {aiResult.sarvam_summary && (
                    <div className="text-xs p-3 rounded-lg bg-black/20 border border-white/5 text-neutral-300 italic mb-4">
                      "{aiResult.sarvam_summary}"
                    </div>
                  )}

                  {/* AI Chatbot Area */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} style={{ color: "#72e3ad" }} />
                      <span className="text-xs font-semibold" style={{ color: "#fff" }}>Copilot Assistant</span>
                    </div>
                    
                    <div className="flex-1 min-h-[60px] overflow-y-auto mb-3 text-xs space-y-3 pr-1">
                       {conversationHistory.current.map((msg, idx) => (
                          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
                            <span className={`inline-block px-3 py-2 rounded-xl ${msg.role === "user" ? "bg-emerald-500/20 text-emerald-100" : "bg-white/10 text-neutral-200"}`}>
                              {msg.content}
                            </span>
                          </div>
                        ))}
                       {aiResponse && (
                          <div className="text-left">
                            <span className="inline-block px-3 py-2 rounded-xl bg-white/10 text-neutral-200">
                              {aiResponse}
                            </span>
                          </div>
                       )}
                       {isThinking && (
                         <div className="text-left">
                            <span className="inline-block px-3 py-2 rounded-xl bg-white/10 text-neutral-400">
                              <Loader2 size={12} className="animate-spin inline mr-1" /> Thinking...
                            </span>
                          </div>
                       )}
                    </div>

                    <form onSubmit={handleSendMessage} className="relative mt-auto">
                      <input
                        type="text"
                        placeholder="Ask AI Copilot for help..."
                        value={chatValue}
                        onChange={(e) => setChatValue(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-emerald-500/50 transition-all"
                      />
                      <button 
                        type="submit" 
                        disabled={isThinking || !chatValue.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
                      >
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Signals checklist */}
            <div className="card p-5">
              <h3 className="font-bold text-[0.9rem] mb-4" style={{ color: "var(--foreground)" }}>Auto-Check Signals</h3>
              <div className="space-y-3">
                {[
                  "Claim Amount Anomaly",
                  "Incident Frequency Check",
                  "Policy Age Validation",
                  "Location Risk Index",
                  "Narrative NLP Analysis",
                ].map((s, i) => {
                  const done = aiStatus === "done";
                  const active = aiStatus === "analyzing";
                  const triggered = aiResult?.explanation.some(exp => exp.toLowerCase().includes(s.toLowerCase().split(" ")[0])) || (i < 3 && aiResult?.risk_tier === "HIGH"); // mock triggered state
                  return (
                    <div key={s} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: done
                            ? triggered ? "rgba(239,68,68,0.1)" : "rgba(22,163,74,0.08)"
                            : "var(--accent)",
                          border: `1px solid ${done ? (triggered ? "rgba(239,68,68,0.2)" : "rgba(22,163,74,0.15)") : "var(--border)"}`,
                        }}
                      >
                        {done && (triggered
                          ? <AlertTriangle size={10} style={{ color: "#ef4444" }} />
                          : <CheckCircle2 size={10} style={{ color: "#16a34a" }} />
                        )}
                        {active && <span className="dot-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />}
                      </div>
                      <span className="text-[0.82rem]" style={{ color: done || active ? "var(--foreground)" : "var(--muted-foreground)" }}>
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
