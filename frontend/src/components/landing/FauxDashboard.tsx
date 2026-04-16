"use client";

import React from 'react';
import { Target, User, MessageSquare, Database, Lock, TrendingUp } from 'lucide-react';
import { RevenueCounter } from './RevenueCounter';

export const FauxDashboard = () => {
  return (
    <div className="w-full max-w-5xl mt-20 relative">
      <div className="z-10 bg-gradient-to-t via-transparent to-transparent from-[#0A0A0A] absolute top-0 right-0 bottom-0 left-0"></div>
      <div className="rounded-xl border overflow-hidden shadow-2xl relative border-neutral-800/60 bg-[#0A0A0D]">
        {/* Faux Window Header */}
        <div className="h-10 border-b flex items-center px-4 gap-2 border-neutral-800/60 bg-neutral-900/40">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          <div className="mx-auto flex items-center gap-2 text-xs font-medium text-neutral-500 px-12 py-1.5 rounded-md border bg-neutral-900/80 border-neutral-800/50">
            <Lock className="w-3 h-3" />
            app.detectra.in
          </div>
        </div>
        
        {/* Faux App Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Sidebar / Metrics */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Live Interventions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-red-950/50 text-red-400 border border-red-900/50">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-200">Upcoding Detected</div>
                      <div className="text-xs text-neutral-500">Risk: 92%</div>
                    </div>
                  </div>
                  <div className="w-8 h-4 rounded-full relative cursor-pointer border border-red-800/50 bg-red-500">
                    <div className="w-3 h-3 rounded-full absolute right-0.5 top-0.5 shadow-sm bg-neutral-950"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-amber-950/50 text-amber-500 border border-amber-900/50">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-200">Phantom Provider</div>
                      <div className="text-xs text-neutral-500">Risk: 88%</div>
                    </div>
                  </div>
                  <div className="w-8 h-4 rounded-full relative cursor-pointer border border-amber-800/50 bg-amber-500">
                    <div className="w-3 h-3 rounded-full absolute right-0.5 top-0.5 shadow-sm bg-neutral-950"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-neutral-800/50 text-neutral-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-200">Network Mapping</div>
                      <div className="text-xs text-neutral-500">Extracting nodes...</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 animate-spin mr-1 border-neutral-700 border-t-neutral-400"></div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-neutral-800/50 text-neutral-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-200">SHAP Analysis</div>
                      <div className="text-xs text-neutral-500">Calculating...</div>
                    </div>
                  </div>
                  <div className="w-8 h-1.5 rounded-full overflow-hidden mr-1 bg-neutral-800">
                    <div className="w-[60%] h-full rounded-full bg-neutral-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Graph Area */}
          <div className="md:col-span-2 border rounded-lg p-5 flex flex-col justify-between min-h-[280px] border-neutral-800/50 bg-neutral-900/10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-sm font-medium mb-1 text-neutral-400">Prevented Fraud Loss</div>
                <RevenueCounter />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" />
                +14.2% Today
              </div>
            </div>
            
            {/* Abstract Graph */}
            <div className="relative w-full h-36 flex items-end gap-2 overflow-hidden mt-auto px-1">
              <div className="w-full h-[20%] rounded-t bg-neutral-800/30"></div>
              <div className="w-full h-[35%] rounded-t bg-neutral-800/30"></div>
              <div className="w-full h-[30%] rounded-t bg-neutral-800/50"></div>
              <div className="w-full h-[45%] rounded-t bg-neutral-700/50"></div>
              <div className="w-full h-[60%] rounded-t bg-neutral-700/70"></div>
              <div className="w-full h-[55%] rounded-t bg-neutral-600/70"></div>
              <div className="w-full h-[80%] rounded-t bg-neutral-500"></div>
              <div className="w-full h-[75%] rounded-t relative bg-white">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap hidden md:block bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  Today
                </div>
              </div>
              <div className="w-full border border-dashed h-[90%] rounded-t border-neutral-700"></div>
              <div className="w-full border border-dashed h-[100%] rounded-t border-neutral-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
