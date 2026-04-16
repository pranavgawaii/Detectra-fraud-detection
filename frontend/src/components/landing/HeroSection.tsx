"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Shield, Sparkles, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mockup, MockupFrame } from '@/components/ui/mockup';
import { Glow } from '@/components/ui/glow';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section
      className={cn(
        "text-white",
        "py-4 sm:py-12 md:py-16 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-8 sm:gap-20">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-10">

          {/* Badge */}
          <Badge variant="outline" className="animate-appear gap-2 border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-neutral-300 px-3 py-1">
            <span className="flex h-1.5 w-1.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-500">Now Live</span>
            <a href="#features" className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors">
              Explore features
              <ArrowRight className="h-3 w-3" />
            </a>
          </Badge>

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-6xl sm:leading-tight md:text-[5.2rem] md:leading-[1.08] tracking-[-0.03em] max-w-5xl">
            Detect insurance fraud
            <br className="hidden sm:block" />
            before it costs you
          </h1>

          {/* Description */}
          <p className="text-base relative z-10 max-w-[580px] animate-appear font-medium text-neutral-400 opacity-0 delay-100 sm:text-xl leading-relaxed">
            AI-powered fraud intelligence built for Indian health insurers.
            Sub-second scoring. Explainable verdicts. Zero false positives.
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear justify-center gap-3 opacity-0 delay-300 flex-col sm:flex-row w-full sm:w-auto">
            <Button variant="default" size="lg" asChild>
              <a href="#contact" className="flex items-center gap-2">
                Start free trial
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="glow" size="lg" onClick={() => setIsVideoOpen(true)}>
              <Play className="w-4 h-4 mr-1" />
              View live demo
            </Button>
          </div>

          {/* Trust bar */}
          <div className="relative z-10 flex items-center gap-5 animate-appear opacity-0 delay-500 text-[0.7rem] text-neutral-600">
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> IRDAI Compliant</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800" />
            <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> No credit card</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800 hidden sm:block" />
            <span className="hidden sm:flex items-center gap-1.5">Setup in 5 minutes</span>
          </div>

          {/* Dashboard Mockup with GREEN Glow */}
          <div className="relative pt-8 w-full max-w-5xl">
            <MockupFrame
              className="animate-appear opacity-0 delay-700"
              size="small"
            >
              <Mockup type="responsive">
                <Image
                  src="/assets/demo-thumbnail.png"
                  alt="Detectra Dashboard Preview"
                  width={1248}
                  height={765}
                  priority
                  className="w-full h-auto"
                />
              </Mockup>
            </MockupFrame>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        </div>
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
    </section>
  );
};
