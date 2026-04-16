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

  return (
    <AuthShell
      title="Welcome back"
      description={
        <>
          Access your fraud intelligence dashboard. No account?{" "}
          <Link href="/sign-up" className="text-[var(--primary)] hover:text-[var(--primary)]/80 font-bold transition-all">
            Secure clearance
          </Link>
        </>
      }
    >
      <div className="space-y-6 pt-2">
        <form onSubmit={handleLogin} className="space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[0.8rem]"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <input
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[0.9rem] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">Security Key</label>
                <Link href="#" className="text-[0.6rem] font-bold text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} 
                  value={pass} 
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 pr-12 text-[0.9rem] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  required
                />
                <button
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-all"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <button
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-[var(--primary)] text-white font-bold text-[0.9rem] rounded-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign in to Detectra"}
            </button>

            <div className="pt-5 border-t border-slate-100">
              <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-500 mb-3 text-center">Quick Demo Environments</p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  disabled={loading}
                  className="w-full h-10 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[0.8rem] rounded-xl transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                >
                  Admin Command Center
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("staff")}
                    disabled={loading}
                    className="w-full h-10 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[0.8rem] rounded-xl transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                  >
                    Investigator Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("customer")}
                    disabled={loading}
                    className="w-full h-10 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[0.8rem] rounded-xl transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                  >
                    Customer Portal
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
