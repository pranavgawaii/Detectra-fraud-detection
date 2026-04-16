"use client";


import { useState } from "react";
import { ChevronRight, AlertTriangle, CheckCircle2, Loader2, FileText } from "lucide-react";
import Link from "next/link";

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

  const handleAnalyze = () => {
    setAiStatus("analyzing");
    setTimeout(() => setAiStatus("done"), 2600);
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
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} placeholder="John" /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} placeholder="Doe" /></div>
                <div><label style={labelStyle}>Date of Birth</label><input type="date" style={inputStyle} /></div>
                <div><label style={labelStyle}>Contact Number</label><input style={inputStyle} placeholder="+91 98765 43210" /></div>
                <div className="col-span-2"><label style={labelStyle}>Email Address</label><input type="email" style={inputStyle} placeholder="john.doe@example.com" /></div>
              </div>
            </div>

            {/* Policy Details */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Policy & Claim Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label style={labelStyle}>Policy Number</label><input style={inputStyle} placeholder="POL-XXXX-XXXXX" /></div>
                <div>
                  <label style={labelStyle}>Policy Type</label>
                  <select style={inputStyle}>
                    <option>Auto</option><option>Health</option><option>Property</option><option>Life</option><option>Travel</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Claim Amount (₹)</label><input type="number" style={inputStyle} placeholder="45000" /></div>
                <div>
                  <label style={labelStyle}>Incident Type</label>
                  <select style={inputStyle}>
                    <option>Collision</option><option>Theft</option><option>Fire</option><option>Flood</option><option>Medical Emergency</option><option>Death</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Incident Date</label><input type="date" style={inputStyle} /></div>
                <div><label style={labelStyle}>Incident Location</label><input style={inputStyle} placeholder="Andheri, Mumbai" /></div>
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
                    <div><label style={labelStyle}>FIR Number</label><input style={inputStyle} placeholder="MH/ANE/0276" /></div>
                    <div><label style={labelStyle}>Police Station</label><input style={inputStyle} placeholder="Andheri Police Station" /></div>
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
              className="w-full font-bold py-3.5 rounded-xl text-sm"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Submit & Run AI Analysis
            </button>
          </div>

          {/* ── AI Preview Panel ─────────────── */}
          <div className="col-span-2 flex flex-col gap-4 sticky top-4 self-start">
            {/* Dark AI card */}
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, #0f1e3c, #162d56)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-20" style={{ background: "#72e3ad", filter: "blur(28px)" }} />
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4 relative" style={{ color: "#72e3ad" }}>
                AI Fraud Analyser — Live Preview
              </p>

              {aiStatus === "idle" && (
                <div className="relative text-center py-8">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <AlertTriangle size={24} style={{ color: "#72e3ad", opacity: 0.6 }} />
                  </div>
                  <p className="text-sm" style={{ color: "#94a3b8" }}>Fill in the form and click<br /><strong style={{ color: "#fff" }}>Submit & Run AI Analysis</strong><br />to generate a fraud risk report.</p>
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
                      <span className="dot-3 w-2 h-2 rounded-full" style={{ background: "#72e3ad" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#94a3b8" }}>Running NLP narrative analysis…</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="dot-1 w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                      <span className="dot-2 w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#94a3b8" }}>Verifying policy details…</span>
                  </div>
                </div>
              )}

              {aiStatus === "done" && (
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} style={{ color: "#72e3ad" }} />
                    <span className="text-sm font-semibold" style={{ color: "#fff" }}>Analysis Complete</span>
                  </div>
                  <div className="text-center py-3 mb-3 rounded-xl" style={{ background: "rgba(239,68,68,0.15)" }}>
                    <p className="text-[2.5rem] font-bold leading-none" style={{ color: "#fff" }}>78</p>
                    <p className="text-xs mt-1 font-bold" style={{ color: "#ef4444" }}>HIGH RISK SCORE</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                    <strong style={{ color: "#fff" }}>3 fraud signals triggered:</strong> Claim Amount Anomaly (HIGH), Narrative Inconsistency (MEDIUM), Policy Age Flag (LOW).
                  </p>
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
                  return (
                    <div key={s} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: done
                            ? i < 3 ? "rgba(239,68,68,0.1)" : "rgba(22,163,74,0.08)"
                            : "var(--accent)",
                          border: `1px solid ${done ? (i < 3 ? "rgba(239,68,68,0.2)" : "rgba(22,163,74,0.15)") : "var(--border)"}`,
                        }}
                      >
                        {done && (i < 3
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
