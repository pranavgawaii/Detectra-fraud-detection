"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, Terminal, ShieldCheck } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

const DEMO = { email: "demo@detectra.io", password: "Detectra@2026" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  fontSize: "0.88rem",
  border: "1px solid var(--border)",
  borderRadius: 14,
  background: "var(--input)",
  color: "var(--foreground)",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !pass) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1100);
  };

  const fillDemo = () => {
    setEmail(DEMO.email);
    setPass(DEMO.password);
    setError("");
  };

  return (
    <AuthShell
      eyebrow="Identity Verification"
      title="Access Dashboard"
      description={
        <>
          Enter your professional credentials to continue.{" "}
          <Link href="/sign-up" className="text-[var(--primary)] font-bold hover:underline">
            Don't have an account?
          </Link>
        </>
      }
      asideLabel="Command Center"
      asideTitle={
        <>
          Global fraud intelligence,
          <br />
          <span className="text-[var(--primary)]">at your fingertips.</span>
        </>
      }
      asideDescription="Experience the future of insurance investigation with Detectra's AI-driven command center for real-time risk assessment and automated triage."
      highlights={[
        "Enterprise-grade encryption (AES-256)",
        "Zero-trust architecture protocols",
        "Multi-region data sovereignty",
      ]}
      asideCallout={
        <div className="mt-8 p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[var(--primary)]/10 blur-[40px] rounded-full group-hover:scale-125 transition-transform duration-700" />
          <div className="flex gap-4 items-start relative z-10">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 border border-[var(--primary)]/20">
              <Terminal size={18} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[1.1rem] font-bold text-[var(--foreground)] leading-snug mb-2">
                "Detectra cut our false claim payouts by <span className="text-[var(--primary)]">34%</span>"
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Rohan Mehta</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-[0.65rem] font-medium text-slate-500 uppercase tracking-widest">NovaCover Insurance</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <button
          type="button"
          onClick={fillDemo}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/15 hover:bg-[var(--primary)]/8 transition-all group"
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center border border-[var(--primary)]/20 group-hover:scale-110 transition-transform">
               <ShieldCheck size={16} className="text-[var(--primary)]" />
             </div>
             <div className="text-left">
                <p className="text-[0.62rem] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.1em] mb-0.5">Quick Access</p>
                <p className="text-xs font-bold text-[var(--primary)]">{DEMO.email}</p>
             </div>
          </div>
          <ArrowRight size={14} className="text-[var(--primary)] opacity-60 group-hover:translate-x-1 transition-all" />
        </button>

        <div className="relative flex items-center gap-4 py-2">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-[0.6rem] font-bold text-slate-600 uppercase tracking-widest">or continue with email</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertCircle size={14} className="text-red-400" />
              <p className="text-xs font-semibold text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[0.68rem] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" style={inputStyle} required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(114,227,173,0.3)";
                e.currentTarget.style.background = "rgba(114,227,173,0.02)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-[0.68rem] font-bold text-slate-500 uppercase tracking-widest">Security Password</label>
              <Link href="#" className="text-[0.68rem] font-bold text-slate-600 hover:text-[#72e3ad] transition-colors">Forgot?</Link>
            </div>
            <div className="relative group">
              <input
                type={showPass ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••••••" style={{ ...inputStyle, paddingRight: 48 }} required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(114,227,173,0.3)";
                  e.currentTarget.style.background = "rgba(114,227,173,0.02)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              />
              <button
                type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_12px_24px_var(--primary-foreground)]/10 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[var(--primary-foreground)] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[var(--primary-foreground)] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[var(--primary-foreground)] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <>Sign In to Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <div className="pt-4 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-[0.6rem] font-bold text-slate-600 uppercase tracking-widest text-center">Identity secured by Detectra Guard®</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
      </div>
    </AuthShell>
  );
}
