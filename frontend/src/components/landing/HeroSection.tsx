"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, Play, XIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { FauxDashboard } from "./FauxDashboard";
import { AnimatePresence, motion } from "framer-motion";

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section
      className={cn(
        "bg-background text-foreground relative",
        "py-12 sm:py-24 md:py-32 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24 relative z-10">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="gap-2 py-1 px-4 border-emerald-900/30 bg-emerald-950/10 text-emerald-400">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-500/80">Now Live</span>
              <div className="w-px h-3 bg-emerald-900/30 mx-1" />
              <a href="#features" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
                Explore features
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 inline-block bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight tracking-tight max-w-5xl"
          >
            Detect insurance fraud before it costs you
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-md relative z-10 max-w-[600px] font-medium text-neutral-400 sm:text-xl leading-relaxed"
          >
            AI-powered fraud intelligence built for Indian health insurers.
            Sub-second scoring. Explainable verdicts. <span className="text-emerald-500/80">Zero false positives.</span>
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 flex flex-wrap justify-center gap-4"
          >
            <Button variant="default" size="lg" className="rounded-xl px-8 h-12 text-black bg-white hover:bg-neutral-200">
              <a href="#contact" className="flex items-center gap-2">
                Start free trial
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="rounded-xl px-8 h-12 bg-white/5 border-white/10 hover:bg-white/10"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 fill-current" />
                View live demo
              </div>
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl px-8 h-12 border-neutral-800 bg-transparent hover:bg-white/5" asChild>
              <a href="https://github.com/pranavgawaii/Detectra-fraud-detection" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Icons.gitHub className="h-5 w-5" />
                GitHub
              </a>
            </Button>
          </motion.div>

          {/* Image/Dashboard with Glow */}
          <div className="relative pt-12 w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <MockupFrame size="small" className="bg-neutral-900/50 border-neutral-800/50">
                <Mockup type="responsive" className="rounded-xl border-neutral-800">
                  <FauxDashboard />
                </Mockup>
              </MockupFrame>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <Glow
                variant="top"
                className="opacity-100"
              />
            </motion.div>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl aspect-video mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <XIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Close</span>
              </button>
              <div className="w-full h-full border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="w-full h-full"
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
}
