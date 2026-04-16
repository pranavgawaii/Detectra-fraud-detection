"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { FauxDashboard } from './FauxDashboard';

export const HeroSection = () => {
  return (
    <section className="flex flex-col text-center max-w-7xl mx-auto px-4 sm:px-6 items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs sm:text-sm mb-6 sm:mb-8 backdrop-blur-sm border-neutral-800 bg-neutral-900/50 text-neutral-300">
        <span className="flex h-2 w-2 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-400"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        IRDAI-Compliant Detection
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-500" />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[1.1] font-medium text-neutral-50 tracking-tight max-w-4xl mb-4 sm:mb-6">
        Stop ₹10,000 Cr in <br className="hidden sm:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r to-neutral-500 from-white/90">Healthcare Fraud</span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-10 font-normal text-neutral-400 leading-relaxed px-2">
        AI fraud detection built specifically for Indian insurers. Scale your operations with engineering-grade data infrastructure that never sleeps. Real-Time. Explainable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-sm sm:max-w-none">
        <Link
          href="#contact"
          className="w-full sm:w-auto font-medium px-6 py-3 rounded-full transition-colors text-sm sm:text-base flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 active:scale-95 shadow-lg"
        >
          Request Access
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#features"
          className="w-full sm:w-auto bg-transparent border font-medium px-6 py-3 rounded-full transition-colors text-sm sm:text-base flex items-center justify-center gap-2 border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white"
        >
          <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          Explore the Engine
        </Link>
      </div>

      <FauxDashboard />
    </section>
  );
};
