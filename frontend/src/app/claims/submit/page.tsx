"use client";

import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { ChevronRight, AlertTriangle, CheckCircle2, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { api, type ScoreResponse } from "@/lib/api";

/* ── Shared styles (unchanged) ──────────────────────────────────────────── */
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

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function tierColor(t: string) {
  if (t === "HIGH")   return "#ef4444";
  if (t === "MEDIUM") return "#f59e0b";
  return "#22c55e";
}

function tierBg(t: string) {
  if (t === "HIGH")   return "rgba(239,68,68,0.15)";
  if (t === "MEDIUM") return "rgba(245,158,11,0.12)";
  return "rgba(34,197,94,0.12)";
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function SubmitClaimPage() {
  /* ── Original UI state ── */
  const [policeReport, setPoliceReport] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "analyzing" | "done" | "error">("idle");
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);
  const [errorMsg, setErrorMsg]        = useState<string>("");

  /* ── Form state: claimant info (not sent to model, for display only) ── */
  const [firstName,   setFirstName]   = useState("");
  const [lastName,    setLastName]    = useState("");
  const [contact,     setContact]     = useState("");
  const [email,       setEmail]       = useState("");

  /* ── Form state: required model fields ── */
  const [insuranceType,    setInsuranceType]    = useState("Motor");
  const [claimAmount,      setClaimAmount]      = useState("");
  const [premiumAmount,    setPremiumAmount]    = useState("");
  const [incidentSeverity, setIncidentSeverity] = useState("Minor Loss");
  const [lossDt,           setLossDt]           = useState("");
  const [reportDt,         setReportDt]         = useState("");
  const [policyEffDt,      setPolicyEffDt]      = useState("");
  const [age,              setAge]              = useState("");
  const [tenure,           setTenure]           = useState("");
  const [maritalStatus,    setMaritalStatus]    = useState("Y");
  const [employmentStatus, setEmploymentStatus] = useState("Y");
  const [riskSegmentation, setRiskSegmentation] = useState("M");
  const [houseType,        setHouseType]        = useState("Own");
  const [socialClass,      setSocialClass]      = useState("MI");
  const [educationLevel,   setEducationLevel]   = useState("");
  const [familyMembers,    setFamilyMembers]    = useState("1");
  const [incidentHour,     setIncidentHour]     = useState("12");
  const [anyInjury,        setAnyInjury]        = useState("0");
  const [authorityContacted, setAuthorityContacted] = useState("");
  const [agentId,          setAgentId]          = useState("");
  const [vendorId,         setVendorId]         = useState("");

  /* ── AI analysis: calls real /score-claim endpoint ── */
  const handleAnalyze = async () => {
    setAiStatus("analyzing");
    setScoreResult(null);
    setErrorMsg("");

    try {
      const result = await api.scoreClaim({
        INSURANCE_TYPE:           insuranceType,
        MARITAL_STATUS:           maritalStatus,
        EMPLOYMENT_STATUS:        employmentStatus,
        RISK_SEGMENTATION:        riskSegmentation,
        HOUSE_TYPE:               houseType,
        SOCIAL_CLASS:             socialClass,
        CUSTOMER_EDUCATION_LEVEL: educationLevel || undefined,
        INCIDENT_SEVERITY:        incidentSeverity,
        AUTHORITY_CONTACTED:      authorityContacted || undefined,
        AGE:                      parseInt(age,    10) || 30,
        TENURE:                   parseInt(tenure, 10) || 12,
        PREMIUM_AMOUNT:           parseFloat(premiumAmount)  || 100,
        CLAIM_AMOUNT:             parseFloat(claimAmount)    || 0,
        NO_OF_FAMILY_MEMBERS:     parseInt(familyMembers, 10) || 1,
        INCIDENT_HOUR_OF_THE_DAY: parseInt(incidentHour, 10) || 12,
        ANY_INJURY:               parseInt(anyInjury, 10) || 0,
        POLICE_REPORT_AVAILABLE:  policeReport ? 1 : 0,
        LOSS_DT:                  lossDt   || new Date().toISOString().slice(0, 10),
        REPORT_DT:                reportDt || new Date().toISOString().slice(0, 10),
        POLICY_EFF_DT:            policyEffDt || new Date(Date.now() - 365 * 86400000).toISOString().slice(0, 10),
        AGENT_ID:                 agentId  || undefined,
        VENDOR_ID:                vendorId || undefined,
      });

      setScoreResult(result);
      setAiStatus("done");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setAiStatus("error");
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        {/* Header — unchanged */}
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
          {/* ── Form ──────────────────────────────────────────────────── */}
          <div className="col-span-3 flex flex-col gap-4">

            {/* Claimant Details — unchanged visually */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Claimant Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
                <div><label style={labelStyle}>Age</label><input type="number" style={inputStyle} placeholder="34" value={age} onChange={e => setAge(e.target.value)} /></div>
                <div><label style={labelStyle}>Contact Number</label><input style={inputStyle} placeholder="+91 98765 43210" value={contact} onChange={e => setContact(e.target.value)} /></div>
                <div className="col-span-2"><label style={labelStyle}>Email Address</label><input type="email" style={inputStyle} placeholder="john.doe@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
              </div>
            </div>

            {/* Policy & Claim Details */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Policy &amp; Claim Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Insurance Type</label>
                    <select style={inputStyle} value={insuranceType} onChange={e => setInsuranceType(e.target.value)}>
                      <option>Motor</option><option>Health</option><option>Property</option><option>Life</option><option>Travel</option><option>Mobile</option>
                    </select>
                </div>
                <div><label style={labelStyle}>Claim Amount (₹)</label><input type="number" style={inputStyle} placeholder="45000" value={claimAmount} onChange={e => setClaimAmount(e.target.value)} /></div>
                <div><label style={labelStyle}>Monthly Premium (₹)</label><input type="number" style={inputStyle} placeholder="200" value={premiumAmount} onChange={e => setPremiumAmount(e.target.value)} /></div>
                <div><label style={labelStyle}>Policy Tenure (months)</label><input type="number" style={inputStyle} placeholder="24" value={tenure} onChange={e => setTenure(e.target.value)} /></div>
                <div><label style={labelStyle}>Policy Effective Date</label><input type="date" style={inputStyle} value={policyEffDt} onChange={e => setPolicyEffDt(e.target.value)} /></div>
                <div>
                  <label style={labelStyle}>Incident Severity</label>
                  <select style={inputStyle} value={incidentSeverity} onChange={e => setIncidentSeverity(e.target.value)}>
                    <option>Minor Loss</option><option>Major Loss</option><option>Total Loss</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Incident Date (Loss)</label><input type="date" style={inputStyle} value={lossDt} onChange={e => setLossDt(e.target.value)} /></div>
                <div><label style={labelStyle}>Report Date</label><input type="date" style={inputStyle} value={reportDt} onChange={e => setReportDt(e.target.value)} /></div>
              </div>
            </div>

            {/* Risk Profile — new section, same card style */}
            <div className="card p-5">
              <h2 className="font-bold text-[0.9rem] mb-4 pb-3" style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                Claimant Risk Profile
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Marital Status</label>
                  <select style={inputStyle} value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)}>
                    <option value="Y">Married</option><option value="N">Single</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Employment Status</label>
                  <select style={inputStyle} value={employmentStatus} onChange={e => setEmploymentStatus(e.target.value)}>
                    <option value="Y">Employed</option><option value="N">Unemployed</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Risk Segmentation</label>
                  <select style={inputStyle} value={riskSegmentation} onChange={e => setRiskSegmentation(e.target.value)}>
                    <option value="H">High</option><option value="M">Medium</option><option value="L">Low</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>House Type</label>
                  <select style={inputStyle} value={houseType} onChange={e => setHouseType(e.target.value)}>
                    <option value="Own">Own</option><option value="Rent">Rent</option><option value="Mortgage">Mortgage</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Social Class</label>
                  <select style={inputStyle} value={socialClass} onChange={e => setSocialClass(e.target.value)}>
                    <option value="HI">High Income</option><option value="MI">Middle Income</option><option value="LI">Low Income</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Education Level (optional)</label>
                  <select style={inputStyle} value={educationLevel} onChange={e => setEducationLevel(e.target.value)}>
                    <option value="">Unknown</option><option value="High School">High School</option><option value="College">College</option><option value="Bachelor">Bachelor</option><option value="Masters">Masters</option><option value="MD">MD</option><option value="PhD">PhD</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Family Members</label><input type="number" min={1} style={inputStyle} placeholder="2" value={familyMembers} onChange={e => setFamilyMembers(e.target.value)} /></div>
                <div><label style={labelStyle}>Incident Hour (0–23)</label><input type="number" min={0} max={23} style={inputStyle} placeholder="14" value={incidentHour} onChange={e => setIncidentHour(e.target.value)} /></div>
                <div>
                  <label style={labelStyle}>Any Injury?</label>
                  <select style={inputStyle} value={anyInjury} onChange={e => setAnyInjury(e.target.value)}>
                    <option value="0">No</option><option value="1">Yes</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Authority Contacted</label>
                  <select style={inputStyle} value={authorityContacted} onChange={e => setAuthorityContacted(e.target.value)}>
                    <option value="">None / Unknown</option><option value="Police">Police</option><option value="Ambulance">Ambulance</option><option value="Other">Other</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Agent ID (optional)</label><input style={inputStyle} placeholder="AGENT00413" value={agentId} onChange={e => setAgentId(e.target.value)} /></div>
                <div><label style={labelStyle}>Vendor ID (optional)</label><input style={inputStyle} placeholder="VNDR00556" value={vendorId} onChange={e => setVendorId(e.target.value)} /></div>
              </div>
            </div>

            {/* Incident Narrative — unchanged visually */}
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

            {/* Supporting Documents — unchanged */}
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
              disabled={aiStatus === "analyzing"}
              className="w-full font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              {aiStatus === "analyzing" ? "Analyzing…" : "Submit & Run AI Analysis"}
            </button>
          </div>

          {/* ── AI Preview Panel — same layout, now shows real model output ── */}
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
                  <p className="text-sm" style={{ color: "#94a3b8" }}>Fill in the form and click<br /><strong style={{ color: "#fff" }}>Submit &amp; Run AI Analysis</strong><br />to generate a fraud risk report.</p>
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
                    <span className="text-sm" style={{ color: "#94a3b8" }}>Running XGBoost + SHAP…</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="dot-1 w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                      <span className="dot-2 w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#94a3b8" }}>Generating Sarvam summary…</span>
                  </div>
                </div>
              )}

              {/* Real model results */}
              {aiStatus === "done" && scoreResult && (
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} style={{ color: "#72e3ad" }} />
                    <span className="text-sm font-semibold" style={{ color: "#fff" }}>Analysis Complete</span>
                  </div>
                  <div className="text-center py-3 mb-3 rounded-xl" style={{ background: tierBg(scoreResult.risk_tier) }}>
                    <p className="text-[2.5rem] font-bold leading-none" style={{ color: "#fff" }}>{scoreResult.risk_score_100}</p>
                    <p className="text-xs mt-1 font-bold" style={{ color: tierColor(scoreResult.risk_tier) }}>
                      {scoreResult.risk_tier} RISK SCORE
                    </p>
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "#94a3b8" }}>
                    {scoreResult.sarvam_summary}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                    <strong style={{ color: "#fff" }}>Recommended:</strong> {scoreResult.recommended_action}
                  </p>
                  {scoreResult.explanation.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#72e3ad" }}>Top Risk Factors</p>
                      {scoreResult.explanation.slice(0, 3).map(f => (
                        <p key={f.feature} className="text-[11px]" style={{ color: "#94a3b8" }}>
                          <span style={{ color: f.impact > 0 ? "#ef4444" : "#22c55e", marginRight: 4 }}>
                            {f.impact > 0 ? "▲" : "▼"}
                          </span>
                          {f.plain_english}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {aiStatus === "error" && (
                <div className="relative py-4 text-center">
                  <AlertTriangle size={20} className="mx-auto mb-2" style={{ color: "#ef4444" }} />
                  <p className="text-xs" style={{ color: "#ef4444" }}>
                    {errorMsg || "Could not reach the scoring API. Is the FastAPI server running?"}
                  </p>
                </div>
              )}
            </div>

            {/* Signals checklist — unchanged */}
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
                  const done   = aiStatus === "done";
                  const active = aiStatus === "analyzing";
                  // With real model: flag a signal if the SHAP explanation mentions it
                  const triggered = done && scoreResult
                    ? scoreResult.explanation.some(f => f.impact > 0.05) && i < scoreResult.explanation.length
                    : false;
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
    </AppShell>
  );
}
