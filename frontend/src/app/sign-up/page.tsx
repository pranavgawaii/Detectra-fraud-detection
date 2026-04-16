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

  return (
    <AuthShell
      title="Create account"
      description={
        <>
          Join the intelligence network. Already a member?{" "}
          <Link href="/login" className="text-white hover:text-emerald-400 font-bold transition-all">
            Identified login
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <form onSubmit={handleSignUp} className="space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 text-[0.8rem]"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">First Name</label>
              <input
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Arjun" 
                className="w-full h-11 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 text-[0.9rem] text-white outline-none transition-all focus:border-white/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Last Name</label>
              <input
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Khanna" 
                className="w-full h-11 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 text-[0.9rem] text-white outline-none transition-all focus:border-white/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Organization</label>
            <input
              value={company} 
              onChange={(e) => setCompany(e.target.value)}
              placeholder="NovaCover Insurance" 
              className="w-full h-11 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 text-[0.9rem] text-white outline-none transition-all focus:border-white/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Work Email</label>
            <input
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" 
              className="w-full h-11 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 text-[0.9rem] text-white outline-none transition-all focus:border-white/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 ml-1">Security Key</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"} 
                value={pass} 
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••••••" 
                className="w-full h-11 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 pr-12 text-[0.9rem] text-white outline-none transition-all focus:border-white/20"
                required
              />
              <button
                type="button" 
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-600 hover:text-white transition-all"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-white text-black font-bold text-[0.9rem] rounded-xl transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Start free trial"}
          </button>
        </form>

        <div className="pt-2 text-center">
            <p className="text-[0.7rem] text-neutral-600 uppercase tracking-widest font-medium">
                Protected by Detectra Sentinel Architecture
            </p>
        </div>
      </div>
    </AuthShell>
  );
}
