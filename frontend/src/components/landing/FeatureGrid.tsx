"use client";

import React from 'react';
import Link from 'next/link';
import { Zap, ArrowUpRight, Database, BarChart, Lightbulb, Laptop, ArrowRight, Search, Target, ArrowUp, Lock, GitCommit } from 'lucide-react';
import { TerminalTypewriter } from './TerminalTypewriter';

export const FeatureGrid = () => {
  return (
    <section className="max-w-7xl mr-auto ml-auto pt-32 pr-6 pb-32 pl-6 relative z-10" id="features">
      <div className="mb-16 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4 text-white">Intelligence Engineered.</h2>
        <p className="text-lg max-w-xl mx-auto md:mx-0 text-neutral-400">A specialized architecture engineered for precision, speed, and strict regulatory compliance within the Indian healthcare framework.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
        
        {/* Bento 1: Real-time Scoring */}
        <div className="md:col-span-3 group relative overflow-hidden rounded-2xl border p-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 border-neutral-800/50 bg-[#0A0A0A]/80 hover:bg-[#111111] hover:border-neutral-700/50">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="md:w-5/12 z-10 relative">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center mb-6 shadow-sm group-hover:border-neutral-500 transition-colors duration-500 border-neutral-700/50 bg-neutral-900">
              <Zap className="w-5 h-5 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-normal tracking-tight mb-2 text-white">Real-time Scoring</h3>
            <p className="text-base text-neutral-400 mt-3">Sub-second inference times. We analyze and catch fraud exactly when the claim drops into your system, before any payouts are authorized.</p>
            
            <Link href="#contact" className="relative inline-flex h-9 mt-8 w-fit items-center justify-center overflow-hidden rounded-full p-[1px] group/btn focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#525252_50%,transparent_100%)] group-hover/btn:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#d4d4d4_50%,transparent_100%)] opacity-50 group-hover/btn:opacity-100 transition-all duration-500"></span>
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-5 py-1 text-sm font-medium text-neutral-300 transition-colors group-hover/btn:text-white group-hover/btn:bg-neutral-900 z-10 gap-2">
                Learn the Architecture
                <ArrowUpRight className="w-4 h-4"/>
              </span>
            </Link>
          </div>

          <div className="md:w-7/12 w-full h-56 relative flex items-center justify-center z-10 border rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-transparent border-neutral-800/40 from-neutral-900/40 overflow-hidden">
            <div className="relative w-full h-full max-sm flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full border flex items-center justify-center z-20 group-hover:border-red-400/50 transition-colors duration-500 border-neutral-600 bg-neutral-900">
                <div className="w-3 h-3 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse bg-red-500"></div>
              </div>
              <div className="absolute w-32 h-32 rounded-full border border-dashed z-10 animate-[spin_10s_linear_infinite] border-neutral-700/70"></div>
              <div className="absolute w-48 h-48 rounded-full border z-10 animate-[spin_15s_linear_infinite] border-neutral-800/80">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transform rotate-90 bg-neutral-950 border border-neutral-700 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-neutral-400 transition-colors duration-500">
                   <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-500"/>
                </div>
              </div>
              <div className="absolute w-64 h-64 rounded-full border z-10 border-neutral-800/40"></div>
              
              <div className="absolute top-[20%] left-[20%] w-8 h-8 rounded border flex items-center justify-center z-20 group-hover:bg-neutral-800 group-hover:border-neutral-600 transition-all duration-500 border-neutral-700 bg-neutral-950">
                <BarChart className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="absolute top-[30%] right-[20%] w-8 h-8 rounded border flex items-center justify-center z-20 group-hover:bg-neutral-800 group-hover:border-neutral-600 transition-all duration-500 border-neutral-700 bg-neutral-950">
                <Lightbulb className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="absolute bottom-[20%] right-[30%] w-8 h-8 rounded border flex items-center justify-center z-20 group-hover:bg-neutral-800 group-hover:border-neutral-600 transition-all duration-500 border-neutral-700 bg-neutral-950">
                <Laptop className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Multi-Signal AI */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border flex flex-col md:flex-row shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 border-neutral-800/50 bg-[#0A0A0A]/80 hover:bg-[#111111] hover:border-neutral-700/50">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

          <div className="p-8 md:w-1/2 flex flex-col justify-between z-10 relative">
            <div>
              <div className="w-10 h-10 rounded-lg border flex items-center justify-center mb-6 shadow-sm border-neutral-700/50 bg-neutral-900 text-neutral-300">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-normal tracking-tight mb-3 text-white">Multi-Signal AI Engine</h3>
              <p className="text-base text-neutral-400 leading-relaxed mb-8">Correlates millions of data points instantly. We use robust pipelines combining XGBoost for structural metrics and LLMs for clinical note inconsistencies.</p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-[#050505] p-5 font-mono text-[13px] leading-relaxed w-full shadow-lg mt-auto overflow-hidden relative min-h-[170px]">
              <div className="flex gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
              </div>
              <TerminalTypewriter />
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 relative min-h-[300px] border-l border-neutral-800/50 overflow-hidden bg-transparent">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none flex items-center justify-center opacity-60">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:32px_32px] transition-transform duration-1000 ease-out group-hover:translate-x-2 group-hover:translate-y-2"></div>
            </div>
            <div className="relative w-full h-full flex flex-col items-center justify-center z-10 py-12 gap-1 group-hover:gap-3 transition-all duration-700 ease-in-out">
              <div className="w-14 h-6 rounded-full border border-neutral-700/80 bg-neutral-900/60 flex items-center justify-center z-20 shadow-sm transition-transform duration-700 group-hover:-translate-y-1">
                <div className="w-1 h-1 rounded-full bg-neutral-400"></div>
              </div>
              <div className="w-px h-20 bg-neutral-800/60 relative z-10 transition-all duration-700 group-hover:h-24 group-hover:bg-neutral-700">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neutral-400/30 to-transparent"></div>
              </div>
              <div className="w-16 h-16 rounded-[14px] border border-neutral-700 bg-neutral-900/50 flex items-center justify-center transform rotate-45 z-20 shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all duration-700 group-hover:rotate-[135deg] group-hover:border-neutral-500 group-hover:scale-110 group-hover:bg-neutral-800/60">
                <div className="w-6 h-6 rounded-[6px] border border-neutral-600 bg-neutral-800/80 flex items-center justify-center transition-transform duration-700 group-hover:-rotate-90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_1px_rgba(255,255,255,0.8)] transform -rotate-45"></div>
                </div>
              </div>
              <div className="w-px h-20 bg-neutral-800/60 relative z-10 transition-all duration-700 group-hover:h-24 group-hover:bg-neutral-700">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neutral-400/20 to-transparent"></div>
              </div>
              <div className="w-14 h-6 rounded-full border border-neutral-800/80 bg-[#0A0A0A]/80 flex items-center justify-center z-20 shadow-sm transition-transform duration-700 group-hover:translate-y-1">
                <div className="w-1 h-1 rounded-full bg-neutral-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 3: UX */}
        <div className="group relative overflow-hidden rounded-2xl border p-8 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 border-neutral-800/50 bg-[#0A0A0A]/80 hover:bg-[#111111] hover:border-neutral-700/50">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="z-10 relative">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center mb-6 shadow-sm transition-colors duration-500 border-neutral-700/50 bg-neutral-900">
              <Target className="w-5 h-5 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-normal tracking-tight mb-2 text-white">Investigator-First UX</h3>
            <p className="text-base text-neutral-400 mt-2">Built with SIU teams. Intuitive workflows that reduce triage fatigue and replace guesswork.</p>
          </div>
          <div className="mt-12 h-32 w-full flex items-end gap-2 justify-between relative z-10 border-b pb-px border-neutral-800">
            <div className="w-full rounded-t-sm h-[30%] group-hover:h-[45%] transition-all duration-700 ease-out relative overflow-hidden bg-neutral-800/40"></div>
            <div className="w-full rounded-t-sm h-[40%] group-hover:h-[65%] transition-all duration-700 delay-75 ease-out relative overflow-hidden bg-neutral-800/50"></div>
            <div className="w-full rounded-t-sm h-[55%] group-hover:h-[95%] transition-all duration-700 delay-150 ease-out relative bg-neutral-700/50 group-hover:bg-red-900/30">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500 text-xs border px-2 py-1 rounded shadow-lg flex items-center gap-1 font-medium text-white bg-neutral-800 border-neutral-700">
                <ArrowUp className="w-3 h-3 text-red-500" />
                3.4x ROI
              </div>
            </div>
          </div>
        </div>

        {/* Bento 4: SHAP Explainability */}
        <div className="group relative overflow-hidden rounded-2xl border p-8 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 border-neutral-800/50 bg-[#0A0A0A]/80 hover:bg-[#111111] hover:border-neutral-700/50">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="z-10 relative">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center mb-6 shadow-sm transition-colors duration-500 border-neutral-700/50 bg-neutral-900">
              <Search className="w-5 h-5 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-normal tracking-tight mb-2 text-white">SHAP Explainability</h3>
            <p className="text-base text-neutral-400 mt-2">Never a black box. Mathematical proof showing exactly which variables triggered the high-risk alert.</p>
          </div>
          <div className="mt-12 flex flex-col gap-3 relative z-10">
            <div className="flex items-center gap-2 p-2.5 rounded-lg border overflow-hidden relative border-neutral-800 bg-neutral-900/50">
              <Search className="w-4 h-4 text-neutral-500" />
              <div className="h-3 w-1/2 rounded relative overflow-hidden bg-neutral-800">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full opacity-0 group-hover:opacity-100 group-hover:animate-beam-x"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 h-[52px] rounded-lg border opacity-70 transition-all duration-700 ease-in-out transform group-hover:-translate-y-[calc(100%+0.75rem)] group-hover:opacity-100 group-hover:scale-[1.02] group-hover:bg-neutral-800/50 group-hover:border-neutral-600/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] border-neutral-800/30 bg-neutral-900/20 relative z-20">
              <div className="w-5 h-5 rounded-full border border-transparent flex items-center justify-center text-xs font-semibold transition-all duration-700 bg-neutral-900 text-neutral-600 group-hover:text-red-400 group-hover:border-red-500/30 group-hover:bg-red-500/10 relative overflow-hidden">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:-translate-y-full group-hover:opacity-0">2</span>
              </div>
              <div className="flex-1">
                <div className="h-2 w-2/3 rounded mb-1.5 transition-colors duration-700 bg-neutral-700 group-hover:bg-neutral-400"></div>
                <div className="h-1.5 w-1/4 rounded transition-colors duration-700 bg-neutral-800 group-hover:bg-neutral-500"></div>
              </div>
              <ArrowUp className="w-4 h-4 text-red-500 absolute right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0" />
            </div>
          </div>
        </div>

        {/* Bento 5: Compliance */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border p-8 flex flex-col md:flex-row justify-between items-center gap-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 border-neutral-800/50 bg-[#0A0A0A]/80 hover:bg-[#111111] hover:border-neutral-700/50">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="md:w-1/2 relative z-10">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center mb-6 shadow-sm transition-colors duration-500 border-neutral-700/50 bg-neutral-900">
              <Lock className="w-5 h-5 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-normal tracking-tight mb-2 text-white">IRDAI Regulatory Compliance</h3>
            <p className="text-base text-neutral-400 mt-2">Deploy directly into your private cloud. Protect PHI data and meet all regulatory security requirements natively.</p>
            <Link href="#solutions" className="relative inline-flex h-9 mt-8 w-fit items-center justify-center overflow-hidden rounded-full p-[1px] group/btn focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#525252_50%,transparent_100%)] group-hover/btn:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#d4d4d4_50%,transparent_100%)] opacity-50 group-hover/btn:opacity-100 transition-all duration-500"></span>
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-5 py-1 text-sm font-medium text-neutral-300 transition-colors group-hover/btn:text-white group-hover/btn:bg-neutral-900 z-10 gap-2">
                View Infrastructure Models
                <ArrowRight className="w-3 h-3"/>
              </span>
            </Link>
          </div>
          <div className="md:w-1/2 w-full flex justify-end relative z-10">
            <div className="w-full relative h-48 border rounded-xl bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden flex items-center mask-fade-x border-neutral-800/50">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg border flex items-center justify-center z-20 group-hover:border-emerald-500/40 transition-all duration-500 bg-neutral-900 border-neutral-700">
                <Database className="w-5 h-5 text-neutral-300" />
              </div>
              <div className="absolute left-16 top-1/2 w-12 h-px z-10 overflow-hidden bg-neutral-800">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent -translate-x-full opacity-0 group-hover:opacity-100 group-hover:animate-beam-x"></div>
              </div>
              <div className="absolute left-[112px] top-1/2 -translate-y-1/2 w-8 h-8 rounded border flex items-center justify-center z-20 transform rotate-45 transition-colors duration-500 delay-100 bg-neutral-900 border-neutral-700">
                <GitCommit className="w-4 h-4 text-neutral-500 transform -rotate-45" />
              </div>
              <svg className="absolute left-[144px] top-1/2 -translate-y-1/2 w-16 h-24 z-10" fill="none">
                <path d="M 0 48 L 16 48 C 24 48 32 12 40 12 L 64 12" stroke="#262626" strokeWidth="1" className="group-hover:stroke-emerald-500/40 transition-colors duration-500 delay-200"></path>
                <path d="M 0 48 L 16 48 C 24 48 32 84 40 84 L 64 84" stroke="#262626" strokeWidth="1" className="transition-colors duration-500 delay-200"></path>
              </svg>
              <div className="absolute left-[208px] top-[calc(50%-36px)] -translate-y-1/2 w-24 h-8 rounded border flex items-center px-2 gap-2 z-20 transition-all duration-500 delay-300 border-neutral-800 bg-[#0A0A0A]">
                <div className="w-1.5 h-1.5 rounded-full group-hover:bg-emerald-500/80 transition-colors duration-500 delay-300 bg-neutral-600"></div>
                <div className="h-1.5 w-12 rounded transition-colors duration-500 delay-300 bg-neutral-700"></div>
              </div>
              <div className="absolute left-[208px] top-[calc(50%+36px)] -translate-y-1/2 w-24 h-8 rounded border flex items-center px-2 gap-2 z-20 transition-colors duration-500 delay-300 border-neutral-800 bg-[#0A0A0A]">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white/80 transition-colors duration-500 delay-400"></div>
                <div className="h-1.5 w-8 rounded bg-neutral-700 group-hover:bg-white/30 transition-colors duration-500 delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
