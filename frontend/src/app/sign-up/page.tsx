"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, User2, Building2, Mail, Lock, ChevronDown, CheckCircle2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  fontSize: "0.88rem",
  background: "#171717", // neutral-900
  color: "#f5f5f5", // neutral-100
  border: "1px solid #262626", // neutral-800
  borderRadius: 10,
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const plans = ["Starter — ₹4,999/mo", "Professional — ₹14,999/mo (Popular)", "Enterprise — Custom"];

const perks = [
  "14-day full platform access",
  "Unlimited investigation rules",
  "SOC 2 Type II compliant environment",
  "24/7 dedicated success manager",
];

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [plan, setPlan] = useState(plans[1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!firstName || !email || !pass) { setError("Please fill in all required fields."); return; }
    if (pass.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/dashboard"); }, 1400);
  };

  return (
    <AuthShell
      eyebrow="Onboarding Portal"
      title="Create Workspace"
      description={
        <span className="text-neutral-400">
          Join hundreds of elite insurance teams.{" "}
          <Link href="/login" className="text-white hover:text-neutral-300 font-medium transition-colors border-b border-transparent hover:border-neutral-300">
            Already have an account?
          </Link>
        </span>
      }
      asideLabel="Premium Access"
      asideTitle={
        <>
          Precision fraud detection,
          <br />
          <span className="text-neutral-500">built for scale.</span>
        </>
      }
      asideDescription="Start your journey with India's most advanced claim investigation platform. Build, automate, and escalate with confidence."
      highlights={perks}
      asideFooter={
        <div className="flex gap-10 items-center">
            {[{ val: "94.2%", label: "Accuracy" }, { val: "2s", label: "Verdict" }].map((stat) => (
              <div key={stat.val}>
                <p className="text-2xl font-medium text-white tracking-tight">{stat.val}</p>
                <p className="text-[0.65rem] font-semibold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
            <div className="h-8 w-[1px] bg-neutral-800" />
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900" />
              ))}
              <div className="w-8 h-8 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center z-10">
                <span className="text-[0.6rem] font-medium text-white">+12k</span>
              </div>
            </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle size={14} className="text-red-400" />
            <p className="text-xs font-medium text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">First Name</label>
            <div className="relative group border-0 p-0 m-0">
              <User2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" />
              <input
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                placeholder="Arjun" style={{ ...inputStyle, paddingLeft: 42 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#525252"; e.currentTarget.style.background = "#1a1a1a"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#262626"; e.currentTarget.style.background = "#171717"; }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Last Name</label>
            <input
              value={lastName} onChange={(e) => setLastName(e.target.value)}
              placeholder="Khanna" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#525252"; e.currentTarget.style.background = "#1a1a1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#262626"; e.currentTarget.style.background = "#171717"; }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Corporate Company</label>
          <div className="relative group">
            <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" />
            <input
              value={company} onChange={(e) => setCompany(e.target.value)}
              placeholder="NovaCover Insurance" style={{ ...inputStyle, paddingLeft: 42 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#525252"; e.currentTarget.style.background = "#1a1a1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#262626"; e.currentTarget.style.background = "#171717"; }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Work Email</label>
          <div className="relative group">
            <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" />
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" style={{ ...inputStyle, paddingLeft: 42 }} required
              onFocus={(e) => { e.currentTarget.style.borderColor = "#525252"; e.currentTarget.style.background = "#1a1a1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#262626"; e.currentTarget.style.background = "#171717"; }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Security Password</label>
          <div className="relative group">
            <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" />
            <input
              type={showPass ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)}
              placeholder="Min. 8 characters" style={{ ...inputStyle, paddingLeft: 42, paddingRight: 48 }} required
              onFocus={(e) => { e.currentTarget.style.borderColor = "#525252"; e.currentTarget.style.background = "#1a1a1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#262626"; e.currentTarget.style.background = "#171717"; }}
            />
            <button
                type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[0.68rem] font-semibold text-neutral-500 uppercase tracking-widest">Trial Plan Selection</label>
          <div className="relative group">
            <select
              value={plan} onChange={(e) => setPlan(e.target.value)}
              style={{ ...inputStyle, appearance: "none" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#525252"; e.currentTarget.style.background = "#1a1a1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#262626"; e.currentTarget.style.background = "#171717"; }}
            >
              {plans.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
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
              Create Environment Access
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
      </form>
    </AuthShell>
  );
}
