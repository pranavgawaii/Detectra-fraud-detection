"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, Loader2, ArrowRight, Shield } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("company_admin");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            company: company,
            role: role
          }
        }
      });

      if (authError) throw authError;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 bg-white/[0.03] border border-neutral-800/80 rounded-xl px-4 text-[0.85rem] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-emerald-500/40 focus:bg-emerald-500/[0.02] focus:ring-1 focus:ring-emerald-500/20";

  return (
    <AuthShell
      title="Create your account"
      description={
        <>
          Start detecting fraud in minutes.{" "}
          <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-semibold transition-all">
            Already have an account?
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <form onSubmit={handleSignUp} className="space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/[0.06] border border-red-500/10 text-red-400 text-[0.8rem] leading-relaxed"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Role Picker */}
          <div className="space-y-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "customer", label: "Policy Holder" },
                { key: "company_admin", label: "Investigator" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setRole(opt.key)}
                  className={`py-2.5 rounded-xl border text-[0.8rem] font-semibold transition-all ${
                    role === opt.key
                      ? "bg-emerald-500/[0.08] border-emerald-500/30 text-emerald-400"
                      : "bg-white/[0.02] border-neutral-800/60 text-neutral-500 hover:bg-white/[0.04] hover:border-neutral-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-2">
              <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Arjun" className={inputClass} required />
            </div>
            <div className="space-y-2">
              <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Khanna" className={inputClass} required />
            </div>
          </div>

          {/* Organization */}
          <div className="space-y-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Organization</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="NovaCover Insurance" className={inputClass} required />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Work Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputClass} required />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Minimum 8 characters"
                className={`${inputClass} pr-11`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-600 hover:text-neutral-300 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full h-11 mt-1 bg-emerald-600 text-white font-semibold text-[0.85rem] rounded-xl transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(5,150,105,0.2)]"
          >
            {loading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <>
                Create account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[0.6rem] text-neutral-700">
          <Shield size={10} />
          <span>Protected by Detectra Sentinel</span>
        </div>
      </div>
    </AuthShell>
  );
}
