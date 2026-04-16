"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
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
      setError(err.message || "Failed to initiate enrollment. Please try again.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 bg-white/[0.03] border border-neutral-800 rounded-xl px-4 text-[0.9rem] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-neutral-600 focus:bg-white/[0.05] focus:ring-1 focus:ring-neutral-700";

  return (
    <AuthShell
      title="Create account"
      description={
        <>
          Join the intelligence network. Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-neutral-300 font-semibold transition-all">
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <form onSubmit={handleSignUp} className="space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-[0.8rem] leading-relaxed"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {/* Role Picker */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Account Type</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`py-2.5 rounded-xl border text-[0.8rem] font-semibold transition-all ${
                    role === "customer"
                      ? "bg-white/[0.06] border-neutral-600 text-white"
                      : "bg-white/[0.02] border-neutral-800 text-neutral-500 hover:bg-white/[0.04] hover:border-neutral-700"
                  }`}
                >
                  Policy Holder
                </button>
                <button
                  type="button"
                  onClick={() => setRole("company_admin")}
                  className={`py-2.5 rounded-xl border text-[0.8rem] font-semibold transition-all ${
                    role === "company_admin"
                      ? "bg-white/[0.06] border-neutral-600 text-white"
                      : "bg-white/[0.02] border-neutral-800 text-neutral-500 hover:bg-white/[0.04] hover:border-neutral-700"
                  }`}
                >
                  Investigator
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Arjun"
                  className={inputClass}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Khanna"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Organization</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="NovaCover Insurance"
                className={inputClass}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={inputClass}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••••••"
                  className={`${inputClass} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-600 hover:text-neutral-300 transition-all"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-white text-neutral-900 font-semibold text-[0.9rem] rounded-xl transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Create account"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[0.65rem] text-neutral-600 uppercase tracking-widest font-medium">
            Protected by Detectra Sentinel
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
