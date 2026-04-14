"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, ShieldCheck, TerminalSquare } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

const DEMO = { email: "demo@detectra.io", password: "Detectra@2026" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  fontSize: "0.88rem",
  border: "1px solid #262626", // border-neutral-800
  borderRadius: 10,
  background: "#171717", // bg-neutral-900
  color: "#f5f5f5", // text-neutral-100
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
      title="Access Engine"
      description={
        <span className="text-neutral-400">
          Enter your professional credentials to continue.{" "}
          <Link href="/sign-up" className="text-white hover:text-neutral-300 font-medium transition-colors border-b border-transparent hover:border-neutral-300">
            Apply for access
          </Link>
        </span>
      }
      asideLabel="Command Center"
      asideTitle={
        <>
          Global fraud intelligence,
          <br />
          <span className="text-neutral-500">at your fingertips.</span>
        </>
      }
      asideDescription="Experience the future of insurance investigation with engineered data models for real-time risk assessment and automated triage."
      highlights={[
        "Enterprise-grade encryption (AES-256)",
        "Zero-trust architecture protocols",
        "Multi-region data sovereignty",
      ]}
      asideCallout={
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-neutral-800/30 blur-[40px] rounded-full group-hover:bg-red-900/10 transition-colors duration-700" />
          <div className="flex gap-4 items-start relative z-10">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              <TerminalSquare size={18} className="text-neutral-400" />
            </div>
            <div>
              <p className="text-[1.05rem] font-medium text-white leading-snug mb-3">
                "Detectra cut our false claim payouts by <span className="text-red-400">34%</span> within the first quarter."
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-300">Rohan Mehta</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span className="text-[0.65rem] font-semibold text-neutral-500 uppercase tracking-widest">NovaCover Insurance</span>
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
          className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-800/80 transition-all duration-300 group shadow-sm"
        >
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 rounded-md bg-neutral-950 flex items-center justify-center border border-neutral-700 group-hover:border-neutral-500 transition-colors">
               <ShieldCheck size={18} className="text-neutral-300 group-hover:text-white transition-colors" />
             </div>
             <div className="text-left">
                <p className="text-[0.62rem] font-semibold text-neutral-500 uppercase tracking-[0.1em] mb-0.5">Quick Access</p>
                <p className="text-xs font-medium text-neutral-200 group-hover:text-white transition-colors">{DEMO.email}</p>
             </div>
          </div>
          <ArrowRight size={14} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>

        <div className="relative flex items-center gap-4 py-2 opacity-60">
          <div className="h-[1px] flex-1 bg-neutral-800" />
          <span className="text-[0.6rem] font-medium text-neutral-600 uppercase tracking-widest">Or access manually</span>
          <div className="h-[1px] flex-1 bg-neutral-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle size={14} className="text-red-400" />
              <p className="text-xs font-medium text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" style={inputStyle} required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#525252"; // neutral-600
                e.currentTarget.style.background = "#1a1a1a"; 
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#262626"; // neutral-800
                e.currentTarget.style.background = "#171717"; // neutral-900
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Security Password</label>
              <Link href="#" className="text-[0.68rem] font-medium text-neutral-500 hover:text-white transition-colors">Forgot?</Link>
            </div>
            <div className="relative group/pass">
              <input
                type={showPass ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••••••" style={{ ...inputStyle, paddingRight: 48 }} required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#525252"; 
                  e.currentTarget.style.background = "#1a1a1a";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#262626";
                  e.currentTarget.style.background = "#171717";
                }}
              />
              <button
                type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full relative mt-4 h-12 flex items-center justify-center overflow-hidden rounded-xl border border-transparent bg-white text-black font-medium transition-all hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            {loading ? (
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Initialize Session
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <div className="pt-6 flex items-center gap-4 opacity-50">
          <div className="h-[1px] flex-1 bg-neutral-800" />
          <span className="text-[0.6rem] font-medium text-neutral-500 uppercase tracking-widest text-center">Identity secured by Detectra Architecture</span>
          <div className="h-[1px] flex-1 bg-neutral-800" />
        </div>
      </div>
    </AuthShell>
  );
}
