"use client";

import AppShell from "@/components/layout/AppShell";
import { ArrowLeft, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const conditionFields = [
  "Claim Amount", "Claim Type", "Claimant History", "Incident Date",
  "Days Since Last Claim", "Identity Verification Score", "Police Report Attached",
  "Claim Frequency (90d)", "Narrative Similarity Score",
];

const operators = ["greater than", "less than", "equals", "not equals", "contains", "is missing"];
const severities = ["Low", "Medium", "High", "Critical"];
const actions    = ["Flag for Review", "Escalate to SIU", "Auto-Reject", "Request Documents", "Human Review"];

export default function NewRulePage() {
  const [severity, setSeverity] = useState("High");
  const [action,   setAction]   = useState("Flag for Review");
  const [conditions, setConditions] = useState([
    { field: "Claim Amount", operator: "greater than", value: "40000" },
  ]);

  const addCondition = () =>
    setConditions(c => [...c, { field: conditionFields[0], operator: operators[0], value: "" }]);

  const removeCondition = (i: number) =>
    setConditions(c => c.filter((_, idx) => idx !== i));

  const sevColor = (s: string) => {
    if (s === "Critical") return { bg: "rgba(239,68,68,0.12)",  border: "#ef4444",  text: "#ef4444" };
    if (s === "High")     return { bg: "rgba(245,158,11,0.12)", border: "#d97706",  text: "#d97706" };
    if (s === "Medium")   return { bg: "rgba(59,130,246,0.12)", border: "#3b82f6",  text: "#3b82f6" };
    return                       { bg: "rgba(34,197,94,0.10)",  border: "#22c55e",  text: "#22c55e" };
  };

  const sc = sevColor(severity);

  const inputStyle: React.CSSProperties = {
    background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)",
    borderWidth: 1, borderStyle: "solid", borderRadius: "0.75rem",
    padding: "8px 12px", fontSize: "0.82rem", outline: "none", width: "100%",
  };

  const selectStyle: React.CSSProperties = { ...inputStyle };

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/rules"
          className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:border-[var(--primary)]"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <ArrowLeft size={15} style={{ color: "var(--muted-foreground)" }} />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-[0.72rem]" style={{ color: "var(--muted-foreground)" }}>
            <Link href="/rules" className="hover:text-[var(--primary)]">Rules Engine</Link>
            <ChevronRight size={12} />
            <span>Create Rule</span>
          </div>
          <h1 className="text-[1.35rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            Create New Rule
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Main form */}
        <div className="col-span-2 flex flex-col gap-5">

          {/* Rule Basics */}
          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h2 className="mb-4 text-[0.9rem] font-bold" style={{ color: "var(--foreground)" }}>Rule Details</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}>Rule Name</label>
                <input style={inputStyle} placeholder="e.g. High-Value Auto Claim Detector" />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}>Description</label>
                <textarea style={{ ...inputStyle, resize: "none" }} rows={3}
                  placeholder="Describe what this rule detects and why it matters..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}>Applies To</label>
                  <select style={selectStyle}>
                    <option>All Claims</option>
                    <option>Auto</option>
                    <option>Health</option>
                    <option>Life</option>
                    <option>Property</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}>Evaluation</label>
                  <select style={selectStyle}>
                    <option>On every submission</option>
                    <option>On update</option>
                    <option>Scheduled daily</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[0.9rem] font-bold" style={{ color: "var(--foreground)" }}>Conditions</h2>
              <span className="text-[0.72rem]" style={{ color: "var(--muted-foreground)" }}>
                Match <strong style={{ color: "var(--primary)" }}>ALL</strong> conditions
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {conditions.map((cond, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold"
                    style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}>
                    {i + 1}
                  </div>
                  <select style={{ ...selectStyle, width: "auto", flex: "1" }}
                    value={cond.field}
                    onChange={e => setConditions(c => c.map((x,idx) => idx===i ? {...x, field: e.target.value} : x))}>
                    {conditionFields.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <select style={{ ...selectStyle, width: "auto", flex: "1" }}
                    value={cond.operator}
                    onChange={e => setConditions(c => c.map((x,idx) => idx===i ? {...x, operator: e.target.value} : x))}>
                    {operators.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <input style={{ ...inputStyle, flex: "1" }} placeholder="value"
                    value={cond.value}
                    onChange={e => setConditions(c => c.map((x,idx) => idx===i ? {...x, value: e.target.value} : x))} />
                  {conditions.length > 1 && (
                    <button onClick={() => removeCondition(i)}
                      className="text-[0.72rem] font-semibold px-2 py-1 rounded-lg"
                      style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)" }}>
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addCondition}
                className="mt-1 flex items-center gap-2 rounded-xl border px-4 py-2 text-[0.78rem] font-semibold self-start transition-all hover:border-[var(--primary)]"
                style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                + Add Condition
              </button>
            </div>
          </div>

          {/* Action */}
          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h2 className="mb-4 text-[0.9rem] font-bold" style={{ color: "var(--foreground)" }}>Action When Triggered</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {actions.map(a => (
                <button
                  key={a}
                  onClick={() => setAction(a)}
                  className="rounded-xl border px-3 py-2.5 text-[0.78rem] font-semibold transition-all"
                  style={
                    action === a
                      ? { background: "rgba(114,227,173,0.12)", borderColor: "var(--primary)", color: "var(--primary)" }
                      : { background: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }
                  }
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar panel */}
        <div className="flex flex-col gap-4">
          {/* Severity */}
          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="mb-3 text-[0.88rem] font-bold" style={{ color: "var(--foreground)" }}>Severity Level</h3>
            <div className="grid grid-cols-2 gap-2">
              {severities.map(s => {
                const c = sevColor(s);
                return (
                  <button key={s} onClick={() => setSeverity(s)}
                    className="rounded-xl border py-2.5 text-[0.78rem] font-semibold transition-all"
                    style={
                      severity === s
                        ? { background: c.bg, borderColor: c.border, color: c.text }
                        : { background: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{ background: "linear-gradient(145deg,#0f1e3c 0%,#162d56 100%)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20" style={{ background:"#72e3ad", filter:"blur(20px)" }} />
            <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-3" style={{ color: "#72e3ad" }}>Rule Preview</p>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} style={{ color: "#72e3ad" }} />
              <span className="text-[0.82rem] font-bold text-white">New Rule</span>
            </div>
            <div className="mb-3 space-y-1.5">
              {conditions.map((c, i) => (
                <div key={i} className="rounded-lg px-2.5 py-1.5 text-[0.7rem]"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}>
                  IF <span className="text-white font-medium">{c.field}</span>{" "}
                  {c.operator} <span className="text-[var(--primary)] font-medium">{c.value || "?"}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg px-2.5 py-1.5 text-[0.7rem]"
              style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}>
              THEN: {action} · <strong>{severity}</strong>
            </div>
          </div>

          {/* Buttons */}
          <button
            className="w-full rounded-xl py-3 text-[0.85rem] font-bold transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Publish Rule
          </button>
          <button
            className="w-full rounded-xl border py-3 text-[0.85rem] font-semibold"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            Save as Draft
          </button>
        </div>
      </div>
    </AppShell>
  );
}
