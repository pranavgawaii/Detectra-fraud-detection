"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (authError) throw authError;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your identity.");
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoType: string) => {
    let targetEmail = "demo@detectra.in";
    if (demoType === 'admin') targetEmail = "admin@detectra.in";
    else if (demoType === 'staff') targetEmail = "staff@detectra.in";
    else if (demoType === 'customer') targetEmail = "customer@detectra.in";

    setLoading(true);
    setError("");

    try {
      // We actually perform a real login so the Dashboard session check passes
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: targetEmail,
        password: "Detectra@123", // Standard demo password
      });

      if (authError) throw authError;
      router.push("/dashboard");
    } catch (err: any) {
      setError("Demo account login failed. Ensure " + targetEmail + " exists in Supabase with password 'Detectra@123'.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-12 bg-white/[0.03] border border-neutral-800 rounded-xl px-4 text-[0.9rem] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-neutral-600 focus:bg-white/[0.05] focus:ring-1 focus:ring-neutral-700";

  return (
    <AuthShell
      title="Welcome back"
      description={
        <>
          Access your fraud intelligence dashboard. No account?{" "}
          <Link href="/sign-up" className="text-white hover:text-neutral-300 font-semibold transition-all">
            Create one
          </Link>
        </>
      }
    >
      <div className="space-y-5 pt-1">
        <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={inputClass}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500">Password</label>
                <Link href="#" className="text-[0.6rem] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Forgot?</Link>
              </div>
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

          <div className="space-y-4 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-white text-neutral-900 font-semibold text-[0.9rem] rounded-xl transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
            </button>

            <div className="pt-5 border-t border-neutral-800/60">
              <p className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-600 mb-3 text-center">Quick Demo Access</p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  disabled={loading}
                  className="w-full h-10 bg-white/[0.03] border border-neutral-800 text-neutral-400 font-semibold text-[0.8rem] rounded-xl transition-all hover:bg-white/[0.06] hover:border-neutral-700 hover:text-white active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                >
                  Admin Command Center
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("staff")}
                    disabled={loading}
                    className="w-full h-10 bg-white/[0.03] border border-neutral-800 text-neutral-400 font-semibold text-[0.8rem] rounded-xl transition-all hover:bg-white/[0.06] hover:border-neutral-700 hover:text-white active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                  >
                    Investigator
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("customer")}
                    disabled={loading}
                    className="w-full h-10 bg-white/[0.03] border border-neutral-800 text-neutral-400 font-semibold text-[0.8rem] rounded-xl transition-all hover:bg-white/[0.06] hover:border-neutral-700 hover:text-white active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                  >
                    Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}
