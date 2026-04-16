"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Sparkles, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FauxDashboard } from './FauxDashboard';

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="flex flex-col text-center max-w-7xl mx-auto px-4 sm:px-6 items-center relative overflow-visible">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs sm:text-[0.8rem] mb-8 sm:mb-10 border-neutral-800 bg-neutral-900/80 text-neutral-300 backdrop-blur-sm shadow-lg shadow-black/20"
      >
        <span className="flex h-1.5 w-1.5 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span className="text-neutral-500">Now Live</span>
        <span className="w-px h-3 bg-neutral-700" />
        <a href="#features" className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors">
          Explore features
          <ArrowRight className="h-3 w-3" />
        </a>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 inline-block bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-6xl sm:leading-tight md:text-[5.2rem] md:leading-[1.08] tracking-[-0.03em] max-w-5xl mb-5 sm:mb-7"
      >
        Detect insurance fraud
        <br className="hidden sm:block" />
        before it costs you
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base relative z-10 max-w-[580px] font-medium text-neutral-400 sm:text-xl leading-relaxed mb-8 sm:mb-10"
      >
        AI-powered fraud intelligence built for Indian health insurers.
        Sub-second scoring. Explainable verdicts. Zero false positives.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 flex justify-center gap-3 flex-col sm:flex-row w-full sm:w-auto mb-5"
      >
        <Link
          href="#contact"
          className="group font-semibold px-7 py-3.5 rounded-xl transition-all text-[0.9rem] flex items-center justify-center gap-2.5 bg-white text-neutral-900 hover:bg-neutral-100 active:scale-[0.97] shadow-[0_1px_20px_rgba(255,255,255,0.1)]"
        >
          Start free trial
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <button
          onClick={() => setIsVideoOpen(true)}
          className="group font-medium px-7 py-3.5 rounded-xl transition-all text-[0.9rem] flex items-center justify-center gap-2.5 bg-white/[0.06] border border-white/10 text-neutral-300 hover:bg-white/[0.1] hover:border-white/20 hover:text-white cursor-pointer shadow-[0_0_20px_rgba(5,150,105,0.1)] hover:shadow-[0_0_30px_rgba(5,150,105,0.2)]"
        >
          <Play className="w-3.5 h-3.5" />
          View live demo
        </button>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-5 mb-2 text-[0.7rem] text-neutral-600"
      >
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> IRDAI Compliant</span>
        <span className="w-1 h-1 rounded-full bg-neutral-800" />
        <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> No credit card</span>
        <span className="w-1 h-1 rounded-full bg-neutral-800 hidden sm:block" />
        <span className="hidden sm:flex items-center gap-1.5">Setup in 5 minutes</span>
      </motion.div>

      {/* Dashboard Preview with Warm Glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative w-full max-w-5xl mx-auto mt-0"
      >
        {/* Vibrant Emerald glow — outer layer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[200px] w-[100%] h-[600px] pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.1) 45%, transparent 80%)',
          }}
        />
        {/* Lighter Emerald core — inner layer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[140px] w-[70%] h-[450px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 60% 45% at 50% 30%, rgba(110, 231, 183, 0.35) 0%, rgba(52, 211, 153, 0.1) 40%, transparent 75%)',
          }}
        />
        <div className="relative z-10">
          <FauxDashboard />
        </div>
      </motion.div>

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
    </section>
  );
};
