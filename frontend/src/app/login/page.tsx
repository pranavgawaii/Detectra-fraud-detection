"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, Loader2, Shield } from "lucide-react";
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

  const handleDemoFill = (demoType: string) => {
    let targetEmail = "demo@detectra.in";
    if (demoType === 'admin') targetEmail = "admin@detectra.in";
    else if (demoType === 'staff') targetEmail = "staff@detectra.in";
    else if (demoType === 'customer') targetEmail = "customer@detectra.in";

    setEmail(targetEmail);
    setPass("Detectra@123");
    setError("");
  };

  return (
    <AuthShell
      title="Welcome back"
      description={
        <>
          Sign in to your fraud intelligence dashboard.{" "}
          <Link href="/sign-up" className="text-emerald-500 hover:text-emerald-400 font-semibold transition-all">
            Create account →
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <form onSubmit={handleLogin} className="space-y-4">
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

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full h-11 bg-white/[0.03] border border-neutral-800/80 rounded-xl px-4 text-[0.85rem] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-emerald-500/40 focus:bg-emerald-500/[0.02] focus:ring-1 focus:ring-emerald-500/20"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500 ml-0.5">Password</label>
              <Link href="#" className="text-[0.65rem] font-semibold text-neutral-600 hover:text-emerald-400 transition-colors">Forgot?</Link>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••••"
                className="w-full h-11 bg-white/[0.03] border border-neutral-800/80 rounded-xl px-4 pr-11 text-[0.85rem] text-white placeholder:text-neutral-600 outline-none transition-all focus:border-emerald-500/40 focus:bg-emerald-500/[0.02] focus:ring-1 focus:ring-emerald-500/20"
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
                Sign in
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Demo Access */}
        <div className="pt-5 border-t border-neutral-800/40">
          <p className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-700 mb-3 text-center">Demo Environments</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Admin", type: "admin" },
              { label: "Staff", type: "staff" },
              { label: "Customer", type: "customer" },
            ].map((demo) => (
              <button
                key={demo.type}
                type="button"
                onClick={() => handleDemoFill(demo.type)}
                disabled={loading}
                className="h-9 bg-white/[0.02] border border-neutral-800/60 text-neutral-500 font-medium text-[0.75rem] rounded-lg transition-all hover:bg-white/[0.05] hover:border-neutral-700 hover:text-neutral-300 active:scale-[0.97] disabled:opacity-50"
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 pt-2 text-[0.6rem] text-neutral-700">
          <Shield size={10} />
          <span>256-bit TLS encrypted</span>
        </div>
      </div>
    </AuthShell>
  );
}
