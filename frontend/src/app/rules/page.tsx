"use client";

import { useState } from "react";
import { Plus, Zap, Shield, GitBranch, ArrowRight, Save, Trash2, Check, AlertCircle } from "lucide-react";

export default function RulesEnginePage() {
  const [rules, setRules] = useState([
    { id: 1, name: "High Velocity IPs", desc: "Flag transactions if >5 claims come from the same IP within 24 hours.", status: "active", risk: "high", target: "System" },
    { id: 2, name: "Off-Hours Behavior", desc: "Elevate risk score by 30% if claim is filed between 2 AM and 5 AM.", status: "active", risk: "medium", target: "Claim Attributes" },
    { id: 3, name: "Identity Mismatch", desc: "Flag for manual review if user agent headers drastically change across sessions.", status: "draft", risk: "high", target: "Identity Engine" },
  ]);

  return (
    <div className="max-w-6xl mx-auto w-full pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              <Zap size={16} />
            </div>
            <h1 className="text-[1.8rem] font-bold tracking-tight text-[var(--foreground)] leading-none">Rules Engine</h1>
          </div>
          <p className="text-[0.95rem] text-[var(--muted-foreground)]">
            Define dynamic logic gates and thresholds to override or augment AI model decisions.
          </p>
        </div>
        
        <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl font-bold text-[0.85rem] hover:opacity-90 transition-all shadow-md active:scale-95">
          <Plus size={16} /> Create Rule
        </button>
      </div>

      {/* Stats/Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Active Rules</p>
          <p className="text-3xl font-black text-[var(--foreground)]">24</p>
          <p className="text-[0.75rem] text-green-500 font-bold mt-2 flex items-center gap-1"><Check size={12}/> Running optimally</p>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Flagged by Rules (7d)</p>
          <p className="text-3xl font-black text-[var(--foreground)]">142</p>
          <p className="text-[0.75rem] text-red-500 font-bold mt-2 flex items-center gap-1"><ArrowRight size={12} className="-rotate-45"/> +12% vs last week</p>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Override Analytics</p>
          <p className="text-3xl font-black text-[var(--foreground)]">18%</p>
          <p className="text-[0.75rem] text-[var(--muted-foreground)] mt-2">of total flags bypassed AI model</p>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center gap-3">
          <GitBranch size={16} className="text-[var(--primary)]" />
          <h2 className="text-[1.05rem] font-bold text-[var(--foreground)]">Active Logic Gates</h2>
        </div>
        
        <div className="divide-y divide-[var(--border)]">
          {rules.map((rule) => (
            <div key={rule.id} className="p-6 transition-colors hover:bg-[var(--muted)]/50 group">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[1.1rem] font-bold text-[var(--foreground)]">{rule.name}</h3>
                    {rule.status === "active" ? (
                      <span className="px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-600 text-[0.65rem] font-bold uppercase tracking-wider">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-500/10 border border-slate-500/20 text-slate-600 text-[0.65rem] font-bold uppercase tracking-wider">Draft</span>
                    )}
                    {rule.risk === "high" ? (
                      <span className="flex items-center gap-1 text-[0.7rem] text-red-500 font-bold"><AlertCircle size={12}/> High Impact</span>
                    ) : null}
                  </div>
                  <p className="text-[0.85rem] text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
                    {rule.desc}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-6 text-[0.75rem] font-medium text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1.5"><Shield size={14}/> Engine: {rule.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors">
                    <Save size={16} />
                  </button>
                  <button className="p-2 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
