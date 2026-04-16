"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Sparkles, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FauxDashboard } from './FauxDashboard';

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="flex flex-col text-center max-w-7xl mx-auto px-4 sm:px-6 items-center relative">
      {/* Subtle radial glow behind hero */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-white/[0.03] via-white/[0.01] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs sm:text-[0.8rem] mb-8 sm:mb-10 border-neutral-800 bg-neutral-900/80 text-neutral-300 backdrop-blur-sm shadow-lg shadow-black/20">
        <span className="flex h-1.5 w-1.5 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span className="font-medium">Now Live</span>
        <span className="w-px h-3 bg-neutral-700" />
        <span className="text-neutral-500">IRDAI-Compliant AI Detection</span>
      </div>

      {/* Headline */}
      <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] font-semibold text-white tracking-[-0.03em] max-w-5xl mb-5 sm:mb-7">
        Detect insurance fraud{' '}
        <br className="hidden sm:block" />
        <span className="text-neutral-500">before it costs you.</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-12 text-neutral-400 leading-relaxed font-normal">
        The AI-powered fraud intelligence platform built for Indian health insurers. 
        Sub-second scoring. Explainable verdicts. Zero false positives.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md sm:max-w-none mb-4">
        <Link
          href="#contact"
          className="group w-full sm:w-auto font-semibold px-7 py-3.5 rounded-xl transition-all text-[0.9rem] flex items-center justify-center gap-2.5 bg-white text-neutral-900 hover:bg-neutral-100 active:scale-[0.97] shadow-[0_1px_20px_rgba(255,255,255,0.1)]"
        >
          Start free trial
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <button
          onClick={() => setIsVideoOpen(true)}
          className="group w-full sm:w-auto font-medium px-7 py-3.5 rounded-xl transition-all text-[0.9rem] flex items-center justify-center gap-2.5 border border-neutral-800 text-neutral-300 hover:bg-white/[0.03] hover:border-neutral-700 hover:text-white cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          View live demo
        </button>
      </div>

      {/* Trust indicators */}
      <div className="flex items-center gap-5 mt-2 mb-0 text-[0.7rem] text-neutral-600">
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> IRDAI Compliant</span>
        <span className="w-1 h-1 rounded-full bg-neutral-800" />
        <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> No credit card</span>
        <span className="w-1 h-1 rounded-full bg-neutral-800 hidden sm:block" />
        <span className="hidden sm:flex items-center gap-1.5">Setup in 5 minutes</span>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video mx-4 md:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-14 right-0 text-white text-xl bg-neutral-900/60 ring-1 ring-white/10 backdrop-blur-md rounded-full p-2.5 hover:bg-neutral-800 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <div className="w-full h-full border-2 border-white/10 rounded-2xl overflow-hidden isolate z-[1] relative shadow-2xl shadow-black/50">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="w-full h-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FauxDashboard />
    </section>
  );
};
