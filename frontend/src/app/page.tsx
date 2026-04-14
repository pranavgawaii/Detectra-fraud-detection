"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import BrandLogo from "@/components/branding/BrandLogo";
import { motion, AnimatePresence } from "motion/react";
import { DetectionEngineEffect } from "@/components/ui/detection-engine-effect";
import {
  TriangleAlert, ArrowRight, Activity, BarChart,
  Lock, Globe, Sparkles, Play, Search, Eye,
  Database, Server, Cpu, Zap, HeartPulse, FileWarning, Fingerprint, RefreshCw, Code2, CircleCheck, Clock, Stethoscope, FileText, CircleCheckBig, Brain, User, CheckCircle2, BrainCircuit, UserCheck
} from "lucide-react";
import { HeroSection } from "@/components/blocks/hero-section-1";

// --- Animated Risk Gauge ---
const RiskGauge = ({ targetScore = 84, size = 180 }: { targetScore?: number, size?: number }) => {
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    let frameId: number;
    
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setScore(Math.floor(easeProgress * targetScore));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [targetScore]);

  const radius = size * 0.4;
  const circum = 2 * Math.PI * radius;
  const strokeDashoffset = circum - (score / 100) * circum;
  const color = score > 75 ? "#ef4444" : score > 40 ? "#f59e0b" : "#ffffff";

  return (
    <div className="relative flex items-center justify-center font-sans drop-shadow-xl" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth={size * 0.08} />
        <circle 
          cx="50%" cy="50%" r={radius} fill="transparent" 
          stroke={color} 
          strokeWidth={size * 0.08} 
          strokeDasharray={circum}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
        <circle 
          cx="50%" cy="50%" r={radius} fill="transparent" 
          stroke={color} 
          strokeWidth={size * 0.08} 
          strokeDasharray={circum}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out opacity-40 blur-md"
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="font-extrabold text-white tracking-tighter" style={{ fontSize: size * 0.35, lineHeight: 1 }}>
          {score}
        </span>
      </div>
    </div>
  );
};

// --- Main Page ---
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const [simState, setSimState] = useState<"idle" | "analyzing" | "complete">("idle");

  const runSimulation = () => {
    setSimState("analyzing");
    setTimeout(() => {
      setSimState("complete");
    }, 1500);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-white/10 flex flex-col">
      {/* ══ NAV DELEGATED TO HERO_SECTION ═══════════════ */}

      {/* ══ HERO SECTION ═══════════════════════════════ */}
      <HeroSection dashboardNode={
        <div className="rounded-[12px] overflow-hidden bg-[#0A0A0A] relative grid grid-cols-1 md:grid-cols-3 gap-px h-[400px] ring-1 ring-white/10 ring-inset">
          {/* Sidebar Profile Mock */}
          <div className="col-span-1 border-r border-white/5 bg-[#0a0a0d] p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-6 border border-white/10 px-3 py-1 rounded-full">Active Claim Review</h3>
            <RiskGauge targetScore={84} size={150} />
            <div className="mt-8 space-y-3 w-full px-4">
              <div className="flex justify-between text-xs font-medium"><span className="text-white/40">Anomaly</span><span className="text-red-400">92%</span></div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '92%' }} />
              </div>
              <div className="flex justify-between text-xs font-medium pt-2"><span className="text-white/40">Network Risk</span><span className="text-amber-400">65%</span></div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
          
          {/* Main Feed Mock */}
          <div className="col-span-2 bg-[#0a0a0e] p-8 flex flex-col relative z-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <Stethoscope size={18} className="text-white/60" />
                </div>
                <div>
                  <h4 className="text-white/90 font-medium text-sm">Orthopedic Procedure Claim</h4>
                  <p className="text-white/40 text-xs mt-0.5">Apollo Hospitals • ID: #CLM-9231A</p>
                </div>
              </div>
              <div className="text-right">
                <h4 className="text-white font-medium">₹ 2,45,000</h4>
                <p className="text-red-400 text-xs mt-0.5 font-medium">+42% vs regional avg</p>
              </div>
            </div>

            <h5 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Top AI Risk Signals (SHAP)</h5>
            <div className="flex flex-col gap-3 flex-1">
              {[ 
                { name: "Upcoding Detected: Knee Replacement Code discrepancy", val: "+34%" },
                { name: "Phantom Provider: Doctor NPI inactive since 2024", val: "+28%" },
                { name: "Geolocation Mismatch: IP originates outside India", val: "+19%" }
              ].map((sig, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-red-500/10 bg-red-500/[0.02]">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                     <span className="text-white/80 text-sm">{sig.name}</span>
                   </div>
                   <span className="text-red-400 font-medium text-sm font-mono">{sig.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      } />

      {/* ══ PROBLEM SECTION ══════════════════════════════ */}
      <section className="py-24 px-6 border-y border-white/5 relative bg-[#020614]">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
               <h3 className="text-4xl font-semibold text-white mb-2">₹30,401 Cr</h3>
               <p className="text-white/50 text-sm">Annual loss in the Indian health insurance sector due to systemic fraud.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
               <h3 className="text-4xl font-semibold text-white mb-2">8.5%</h3>
               <p className="text-white/50 text-sm">Of gross written premiums are completely siphoned by fraudulent syndicates.</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
               <h3 className="text-4xl font-semibold text-white mb-2">1000+</h3>
               <p className="text-white/50 text-sm">Monthly claims assigned to a single investigator, making manual review impossible.</p>
            </div>
          </div>

          <div className="mb-10 text-center">
             <h2 className="text-2xl font-medium text-white mb-3">The Fraud Typology Grid</h2>
             <p className="text-white/50">Complex networks execute sophisticated fraud patterns daily.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[ 
              { title: "Staged Accidents", icon: TriangleAlert, desc: "Collusive networks generating fake emergencies." },
              { title: "Phantom Billing", icon: FileWarning, desc: "Claims for treatments and tests never actually provided." },
              { title: "Systemic Upcoding", icon: BarChart, desc: "Billing for more expensive procedures than performed." }
            ].map((type) => (
              <div key={type.title} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white">
                   <type.icon size={20} />
                 </div>
                 <div>
                   <h4 className="text-white font-medium mb-1">{type.title}</h4>
                   <p className="text-white/40 text-[0.85rem]">{type.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOLUTION PILLARS ════════════════════════════ */}
      <section className="py-24 px-6 border-b border-white/5 backdrop-blur-3xl bg-transparent relative top-0 z-20">
         <div className="mx-auto max-w-[1000px]">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-medium text-white mb-4">Intelligence Engineered</h2>
             <p className="text-white/50 max-w-xl mx-auto">A specialized architecture designed for precision, speed, and regulatory compliance.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ 
                { icon: Zap, title: "Real-time Scoring", desc: "Sub-second inference times. Catch fraud exactly when the claim drops into your system." },
                { icon: Brain, title: "Multi-Signal AI", desc: "Combines XGBoost on structured data with LLM analysis on clinical notes." },
                { icon: Eye, title: "SHAP Explainability", desc: "Never a black box. Mathematical proof showing exactly which variables triggered the alert." },
                { icon: User, title: "Investigator-First UX", desc: "Built with SIU teams. Intuitive workflows that reduce triage fatigue by 60%." }
              ].map((p, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] transform group-hover:scale-110 transition-transform">
                     <p.icon size={150} />
                  </div>
                  <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                    <p.icon size={24} />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{p.title}</h3>
                  <p className="text-white/50">{p.desc}</p>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* ══ LIVE DEMO SECTION ═══════════════════════════ */}
      <section id="demo" className="py-32 px-6 border-b border-white/5 bg-[#020614] overflow-hidden relative">
         <div className="absolute top-[20%] left-[50%] w-[1000px] h-[600px] bg-white/5 blur-[200px] -translate-x-1/2 pointer-events-none mix-blend-screen" />
         
         <div className="mx-auto max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <div className="relative z-10">
               <h2 className="text-3xl font-medium text-white mb-4">Experience the Engine</h2>
               <p className="text-white/50 mb-8 text-lg">Input a simulated claim form and watch our multi-signal pipeline extract, analyze, and score the risk instantly.</p>
               
               <div className="bg-[#050508] border border-white/10 rounded-2xl p-6 shadow-2xl">
                 <div className="space-y-4 mb-6">
                   <div>
                     <label className="text-xs font-medium text-white/50 mb-1.5 block uppercase tracking-wider">Patient Name</label>
                     <input type="text" disabled value="Abhishek Sharma" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/80 outline-none" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-medium text-white/50 mb-1.5 block uppercase tracking-wider">Diagnosis (ICD)</label>
                       <input type="text" disabled value="M17.11 (Osteoarthritis)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/80 outline-none" />
                     </div>
                     <div>
                       <label className="text-xs font-medium text-white/50 mb-1.5 block uppercase tracking-wider">Procedure (CPT)</label>
                       <input type="text" disabled value="27447 (Arthroplasty)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/80 outline-none" />
                     </div>
                   </div>
                   <div>
                     <label className="text-xs font-medium text-white/50 mb-1.5 block uppercase tracking-wider">Claim Amount (₹)</label>
                     <input type="text" disabled value="3,20,000" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/80 outline-none" />
                   </div>
                 </div>

                 <div className="flex gap-3">
                   <button 
                     onClick={runSimulation}
                     disabled={simState === "analyzing"}
                     className="flex-1 bg-white text-black font-semibold py-3 rounded-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2 hover:bg-neutral-200"
                   >
                     {simState === "analyzing" ? <RefreshCw className="animate-spin" size={18} /> : <Activity size={18} />}
                     Analyze Claim
                   </button>
                   <button 
                     onClick={() => setSimState("idle")}
                     className="px-5 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 transition-colors"
                   >
                     Simulate
                   </button>
                 </div>
               </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {simState === "idle" && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-[420px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]"
                  >
                    <Search size={40} className="text-white/20 mb-4" />
                    <p className="text-white/40">Waiting for claim payload...</p>
                  </motion.div>
                )}

                {simState === "analyzing" && (
                  <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-[420px] flex flex-col items-center justify-center rounded-3xl bg-[#050508] border border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/5 animate-pulse" />
                    <RefreshCw size={40} className="text-white mb-6 animate-spin" />
                    <div className="flex flex-col items-center gap-3">
                       <span className="text-white/60 font-mono text-sm leading-none bg-white/5 px-3 py-1 rounded">Executing XGBoost Trees...</span>
                       <span className="text-white/40 font-mono text-sm leading-none bg-white/5 px-3 py-1 rounded">Cross-referencing network graphs</span>
                       <span className="text-white/20 font-mono text-sm leading-none bg-white/5 px-3 py-1 rounded">Calculating SHAP values</span>
                    </div>
                  </motion.div>
                )}

                {simState === "complete" && (
                  <motion.div 
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="h-[420px] rounded-3xl border border-red-500/20 bg-gradient-to-b from-[#050508] to-red-950/20 p-8 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    <div className="flex items-start justify-between mb-8">
                       <div>
                         <h3 className="text-red-400 font-semibold mb-1 text-lg flex items-center gap-2"><TriangleAlert size={18}/> High Risk Detected</h3>
                         <p className="text-white/50 text-sm">Review recommended before payout.</p>
                       </div>
                       <RiskGauge targetScore={89} size={90} />
                    </div>

                    <h4 className="text-white text-sm font-medium mb-3 pb-2 border-b border-white/10 uppercase tracking-widest">Top Explainability Signals</h4>
                    <div className="space-y-3 flex-1">
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-between items-center text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                         <span className="text-white/80 font-medium">Historical Network Collusion</span>
                         <span className="text-red-400 font-mono font-bold">+38%</span>
                      </motion.div>
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-between items-center text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                         <span className="text-white/80 font-medium">Distance: Clinic vs Residence</span>
                         <span className="text-red-400 font-mono font-bold">+24%</span>
                      </motion.div>
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-between items-center text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                         <span className="text-white/80 font-medium">Suspicious ICD/CPT mapping gap</span>
                         <span className="text-red-400 font-mono font-bold">+16%</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
         </div>
      </section>

      {/* ══ AI ENGINE GEMINI EFFECT ════════════════════ */}
      <DetectionEngineEffect />

      {/* ══ TECH STACK ══════════════════════════════════ */}
      <section className="py-24 px-6 border-b border-white/5 text-center">
         <div className="mx-auto max-w-[800px]">
           <p className="mb-10 text-[0.8rem] font-bold text-white/40 uppercase tracking-[0.2em] border border-white/10 inline-block px-4 py-1.5 rounded-full bg-white/[0.02]">Enterprise-grade detection. Zero infrastructure cost.</p>
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70">
             <div className="flex items-center gap-2 font-semibold text-xl text-white"><Cpu className="text-white/70"/> XGBoost</div>
             <div className="flex items-center gap-2 font-semibold text-xl text-white"><Server className="text-white/70"/> FastAPI</div>
             <div className="flex items-center gap-2 font-semibold text-xl text-white"><Globe className="text-white/70"/> Next.js</div>
             <div className="flex items-center gap-2 font-semibold text-xl text-white"><Sparkles className="text-white/70"/> Groq API</div>
             <div className="flex items-center gap-2 font-semibold text-xl text-white"><Database className="text-white/70"/> PostgreSQL</div>
           </div>
         </div>
      </section>

      {/* ══ IMPACT METRICS ══════════════════════════════ */}
      <section className="py-32 px-6 border-b border-white/5 bg-[#020614]">
         <div className="mx-auto max-w-[1000px] text-center mb-16">
           <h2 className="text-3xl font-medium text-white mb-4">Measured Impact</h2>
           <p className="text-white/50 max-w-xl mx-auto">See how moving from legacy rules engines to our ML pipeline transforms operations instantly.</p>
         </div>

         <div className="mx-auto max-w-[900px] border border-white/10 rounded-2xl overflow-hidden bg-[#050508] shadow-2xl">
           <div className="grid grid-cols-3 bg-white/5 p-5 text-sm font-semibold uppercase tracking-widest text-white/50">
             <div>Metric</div>
             <div>Legacy Systems</div>
             <div className="text-white">Detectra AI</div>
           </div>
           
           {[ 
             { name: "Detection Rate", old: "40%", new: "85%" },
             { name: "Time to Decision", old: "Hours to Days", new: "< 2 seconds" },
             { name: "False Positives", old: "High (Alert Fatigue)", new: "12% (Precision 88%)" },
             { name: "Explainability", old: "Black-box warnings", new: "Granular SHAP values" }
           ].map((row, i) => (
             <div key={i} className="grid grid-cols-3 p-6 border-t border-white/5 text-white/80 items-center transition-colors hover:bg-white/[0.02]">
                <div className="font-medium text-white">{row.name}</div>
                <div className="text-white/50 text-sm font-medium">{row.old}</div>
                <div className="text-white font-semibold text-lg flex items-center gap-2"><CircleCheck size={18} className="text-white/50" /> {row.new}</div>
             </div>
           ))}
         </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════ */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[600px] border border-white/10 rounded-[32px] p-12 bg-[#050508] shadow-[0_0_100px_rgba(255,255,255,0.02)]">
          <h2 className="text-4xl font-medium text-white mb-4 tracking-tight">Request Early Access</h2>
          <p className="text-white/50 mb-10 leading-relaxed">We are onboarding select Indian health insurance providers for pilot programs. Secure your spot in the trial.</p>
          
          <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="name@insurance-carrier.com" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/40 placeholder-white/20 transition-colors"
            />
            <button className="w-full bg-white text-black font-semibold py-4 rounded-xl transition-all hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 shadow-xl">
               Join Waitlist
            </button>
          </form>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/30 text-xs font-medium uppercase tracking-widest">
            <Lock size={12} /> Your data is completely secure.
          </div>
        </div>
      </section>

    </div>
  );
}
