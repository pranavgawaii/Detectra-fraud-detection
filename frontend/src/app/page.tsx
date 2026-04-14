"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { createNoise3D } from 'simplex-noise';
import { ArrowRight, Layers, Lock, Target, Mail, MessageSquare, Database, TrendingUp, Zap, BarChart, Lightbulb, Laptop, Search, GitBranch, User, GitCommit, ArrowUp, MapPin, Menu, X, ArrowUpRight } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';

// --- Background Grid Animation ---
const AnimatedGrid = () => {
  const sqContainerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const sqContainer = sqContainerRef.current;
    if (!sqContainer) return;

    const size = 40;
    const numSquares = 30;
    let cols = Math.max(1, Math.floor(window.innerWidth / size));
    let rows = Math.max(1, Math.floor(window.innerHeight / size));

    const timeoutIds: NodeJS.Timeout[] = [];

    for (let i = 0; i < numSquares; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', (size - 1).toString());
      rect.setAttribute('height', (size - 1).toString());
      rect.setAttribute('fill', 'currentColor');
      rect.setAttribute('stroke-width', '0');
      rect.style.opacity = '0';
      rect.style.transition = 'opacity 3s ease-in-out';
      sqContainer.appendChild(rect);

      const animateSquare = () => {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        rect.setAttribute('x', (x * size + 1).toString());
        rect.setAttribute('y', (y * size + 1).toString());
        rect.style.opacity = '0.3';
        
        timeoutIds.push(setTimeout(() => {
          rect.style.opacity = '0';
          timeoutIds.push(setTimeout(animateSquare, 3000 + Math.random() * 2000));
        }, 3000));
      };
      
      timeoutIds.push(setTimeout(animateSquare, i * 150));
    }
    
    const handleResize = () => {
      cols = Math.max(1, Math.floor(window.innerWidth / size));
      rows = Math.max(1, Math.floor(window.innerHeight / size));
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      timeoutIds.forEach(clearTimeout);
      if (sqContainer) sqContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 h-[100vh] z-[-2] pointer-events-none overflow-hidden mask-hero-grid opacity-70">
      <svg className="absolute inset-0 h-full w-full stroke-neutral-800/30 fill-neutral-800/10" aria-hidden="true">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
            <path d="M.5 40V.5H40" fill="none"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
        <svg ref={sqContainerRef} x="-1" y="-1" className="overflow-visible"></svg>
      </svg>
    </div>
  );
};

// --- Wavy Canvas ---
const WavyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number, nt = 0;
    const noise3D = createNoise3D();
    const blur = 10;
    
    const initCanvas = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = canvas.parentElement?.offsetHeight || 600;
      ctx.filter = `blur(${blur}px)`;
    };
    
    window.addEventListener('resize', initCanvas);
    initCanvas();
    
    const waveColors = ["#451a1a", "#7f1d1d", "#991b1b", "#b91c1c", "#dc2626"]; // Adapted to Detectra red accent
    
    let reqId: number;
    const renderWaves = () => {
      ctx.fillStyle = "#0a0a0a"; 
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, 0, w, h);
      
      nt += 0.002;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise3D(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
      reqId = requestAnimationFrame(renderWaves);
    };
    renderWaves();

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

// --- Revenue Counter ---
const RevenueCounter = () => {
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const counterElement = counterRef.current;
    if (!counterElement) return;

    const targetValue = 320000;
    const duration = 2000;
    
    const formatNumber = (num: number) => {
      return `₹${num.toLocaleString('en-IN')}<span class="text-sm text-neutral-500 font-normal">.00</span>`;
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        let startTimestamp: number | null = null;
        
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(easeProgress * targetValue);
          
          if (counterRef.current) {
               counterRef.current.innerHTML = formatNumber(currentValue);
          }

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else if (counterRef.current) {
            counterRef.current.innerHTML = formatNumber(targetValue);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (counterRef.current) counterRef.current.innerHTML = formatNumber(0);
    observer.observe(counterElement);

    return () => observer.disconnect();
  }, []);

  return <div ref={counterRef} className="text-3xl font-normal tracking-tight text-neutral-100">₹0<span className="text-sm text-neutral-500 font-normal">.00</span></div>;
};

// --- Terminal Block ---
const TerminalTypewriter = () => {
  const twContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const snippets = [
        "const pipeline = await PredictionModel.init();\nif (pipeline.status === 'ready') {\n  await RiskEngine.scan(pipeline.data);\n}\n> Processing claims... [OK]",
        "const stream = new DataStream('hospital_node');\nstream.on('data', (claim) => {\n  SHAP.explain(claim);\n});\n> Anomalies found: 3"
    ];
    
    let sIdx = 0;
    let cIdx = 0;
    let isDeleting = false;
    let text = "";
    let timeoutId: NodeJS.Timeout;

    function highlight(code: string) {
      return code
        .replace(/(const|await|if|new)\b/g, '<span class="text-neutral-200">$1</span>')
        .replace(/('.*?')/g, '<span class="text-neutral-500">$1</span>')
        .replace(/(>.*)/g, '<span class="text-neutral-500">$1</span>')
        .replace(/  /g, '&nbsp;&nbsp;')
        .replace(/\\n/g, '<br>');
    }

    function type() {
      const currentSnippet = snippets[sIdx];
      
      if (isDeleting) {
          text = currentSnippet.substring(0, cIdx - 1);
          cIdx--;
      } else {
          text = currentSnippet.substring(0, cIdx + 1);
          cIdx++;
      }

      if (twContainerRef.current) {
        twContainerRef.current.innerHTML = highlight(text) + '<span class="inline-block w-[6px] h-3.5 bg-neutral-400 ml-[1px] align-middle animate-pulse"></span>';
      }

      let typeSpeed = isDeleting ? 20 : 50;

      if (!isDeleting && text === currentSnippet) {
          typeSpeed = 2000;
          isDeleting = true;
      } else if (isDeleting && text === "") {
          isDeleting = false;
          sIdx = (sIdx + 1) % snippets.length;
          typeSpeed = 500;
      }

      if (!isDeleting) {
          typeSpeed += Math.random() * 30;
      }

      timeoutId = setTimeout(type, typeSpeed);
    }
    
    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return <div ref={twContainerRef} className="text-neutral-400">c<span className="inline-block w-[6px] h-3.5 bg-neutral-400 ml-[1px] align-middle animate-pulse"></span></div>;
}


// --- Main Page Component ---
export default function LandingPage() {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="antialiased selection:bg-neutral-800 selection:text-neutral-200 overflow-x-hidden bg-[#0A0A0A] text-neutral-400 font-sans min-h-screen relative">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[80vw] h-[50vh] blur-[120px] rounded-full translate-y-[-50%] bg-neutral-900/40 z-0 opacity-50"></div>
          {/* Subtle red tint for Detectra branding */}
          <div className="w-[40vw] h-[40vh] blur-[150px] rounded-full translate-x-[-10%] translate-y-[-20%] bg-red-950/20 z-0"></div>
      </div>

      <AnimatedGrid />

      {/* Navigation */}
      <header className="fixed top-1 inset-x-0 z-50 border-b backdrop-blur-md border-neutral-800/50 bg-[#0A0A0A]/80">
          <div className="flex h-14 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
              <div className="flex items-center gap-8">
                  {/* Logo */}
                  <Link href="/" className="flex items-center space-x-2">
                      <BrandLogo size="sm" priority />
                  </Link>
                  
                  {/* Desktop Nav */}
                  <nav className="hidden md:flex items-center gap-6 text-base">
                      <Link href="#features" className="transition-colors hover:text-neutral-100">Features</Link>
                      <Link href="#solutions" className="transition-colors hover:text-neutral-100">Solutions</Link>
                      <Link href="#philosophy" className="transition-colors hover:text-neutral-100">Philosophy</Link>
                      <Link href="#contact" className="transition-colors hover:text-neutral-100">Contact</Link>
                  </nav>
              </div>
              
              <div className="flex items-center gap-4 text-sm md:text-base">
                  <Link href="/dashboard" className="hidden sm:inline-block font-medium text-neutral-400 hover:text-white transition-colors px-2">Log in</Link>
                  <Link href="#contact" className="font-medium px-4 py-1.5 rounded-full transition-colors bg-white text-black hover:bg-neutral-200">Request Demo</Link>
                  <button onClick={() => setMenuState(!menuState)} className="md:hidden text-white/70">
                     {menuState ? <X size={20}/> : <Menu size={20}/>}
                  </button>
              </div>
          </div>
          {/* Mobile Menu Dropdown */}
          {menuState && (
            <div className="md:hidden border-t border-neutral-800 bg-[#0A0A0AC0] backdrop-blur-xl absolute w-full left-0 py-4 px-6 flex flex-col gap-4">
               <Link href="#features" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Features</Link>
               <Link href="#solutions" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Solutions</Link>
               <Link href="#philosophy" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Philosophy</Link>
               <Link href="/dashboard" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white mt-4 border-t border-neutral-800 pt-4">Log in</Link>
            </div>
          )}
      </header>

      <main className="pt-32 pb-24 relative">
          
          {/* Hero Section */}
          <section className="flex flex-col text-center max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm mb-8 backdrop-blur-sm border-neutral-800 bg-neutral-900/50 text-neutral-300">
                  <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-400"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  IRDAI-Compliant Detection
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
              </div>

              <h1 className="md:text-7xl leading-[1.1] text-5xl font-medium text-neutral-50 tracking-tight max-w-4xl mb-6">
                 Stop ₹10,000 Cr in <br className="hidden md:block" />
                 <span className="bg-clip-text text-transparent bg-gradient-to-r to-neutral-500 from-white/90">Healthcare Fraud</span>
              </h1>

              <p className="text-lg md:text-xl max-w-2xl mb-10 font-normal text-neutral-400">
                  AI fraud detection built specifically for Indian insurers. Scale your operations with engineering-grade data infrastructure that never sleeps. Real-Time. Explainable.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                  <Link href="#contact" className="w-full sm:w-auto font-medium px-6 py-2.5 rounded-full transition-colors text-base flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200">
                      Request Access
                      <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="#features" className="w-full sm:w-auto bg-transparent border font-medium px-6 py-2.5 rounded-full transition-colors text-base flex items-center justify-center gap-2 border-neutral-800 text-neutral-300 hover:bg-neutral-900 hover:text-white">
                      <Layers className="w-5 h-5" />
                      Explore the Engine
                  </Link>
              </div>

              {/* Faux UI Dashboard Graphic */}
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
          </section>

          {/* Social Proof */}
          <section className="border-y py-10 mt-10 border-neutral-800/50 bg-[#0A0A0A]/50 relative z-10 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                  <p className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-8 text-center">Trusted by Leading Indian Insurers</p>
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                      <div className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default">HDFC ERGO</div>
                      <div className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default">Star Health</div>
                      <div className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default">ICICI Lombard</div>
                      <div className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default">Niva Bupa</div>
                      <div className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-500 hover:text-white transition-colors duration-500 cursor-default">Apollo Munich</div>
                  </div>
              </div>
          </section>

          {/* Features Bento */}
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
                          <div className="relative w-full h-full max-w-sm flex items-center justify-center">
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

                  {/* Bento 2: Multi-Signal AI / Data Engineering */}
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

                          {/* Terminal Code Block */}
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
                          
                          <div className="flex items-center gap-3 p-2.5 h-[52px] rounded-lg border transition-all duration-700 ease-in-out transform group-hover:translate-y-[calc(100%+0.75rem)] group-hover:opacity-40 group-hover:scale-[0.98] border-neutral-800/40 bg-neutral-900/30 relative z-10">
                              <div className="w-5 h-5 rounded-full border border-transparent flex items-center justify-center text-xs font-semibold transition-all duration-700 bg-neutral-800 text-neutral-400 relative overflow-hidden">
                                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:-translate-y-full group-hover:opacity-0">1</span>
                              </div>
                              <div className="flex-1">
                                  <div className="h-2 w-1/2 rounded mb-1.5 transition-colors duration-700 bg-neutral-600 group-hover:bg-neutral-700"></div>
                                  <div className="h-1.5 w-1/3 rounded transition-colors duration-700 bg-neutral-700 group-hover:bg-neutral-800"></div>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-2.5 h-[52px] rounded-lg border opacity-70 transition-all duration-700 ease-in-out transform group-hover:-translate-y-[calc(100%+0.75rem)] group-hover:opacity-100 group-hover:scale-[1.02] group-hover:bg-neutral-800/50 group-hover:border-neutral-600/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] border-neutral-800/30 bg-neutral-900/20 relative z-20">
                              <div className="w-5 h-5 rounded-full border border-transparent flex items-center justify-center text-xs font-semibold transition-all duration-700 bg-neutral-900 text-neutral-600 group-hover:text-red-400 group-hover:border-red-500/30 group-hover:bg-red-500/10 relative overflow-hidden">
                                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:-translate-y-full group-hover:opacity-0">2</span>
                                  <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">1</span>
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

          {/* Philosophy Section */}
          <section id="philosophy" className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-neutral-800/50 relative z-10">
              <div className="mb-20 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4 text-white">Our foundation.</h2>
                  <p className="text-lg max-w-xl mx-auto md:mx-0 text-neutral-400">The core principles that drive our engineering-grade approach to investigating fraud.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                  <div className="flex flex-col">
                      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Vision
                      </h3>
                      <h4 className="text-2xl font-normal tracking-tight mb-3 leading-snug text-white">Fraud is systemic.<br/>We make it detectable.</h4>
                      <p className="text-base leading-relaxed text-neutral-400 mt-2">We believe fraud detection should connect the dots — across claims, providers, and historical patterns. Not as isolated rules, but as one intelligent network.</p>
                  </div>
                  
                  <div className="flex flex-col">
                      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Mission
                      </h3>
                      <h4 className="text-2xl font-normal tracking-tight mb-3 leading-snug text-white">Precision over<br/>guesswork.</h4>
                      <p className="text-base leading-relaxed text-neutral-400 mt-2">Every flag, every anomaly, every node connection is calculated with algorithmic rigor. We minimize false positives so your SIU teams work efficiently.</p>
                  </div>
                  
                  <div className="flex flex-col">
                      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Philosophy
                      </h3>
                      <h4 className="text-2xl font-normal tracking-tight mb-3 leading-snug text-white">The platform<br/>advantage.</h4>
                      <p className="text-base leading-relaxed text-neutral-400 mt-2">We aren't a black box tool that sits isolated. We are a unified detection layer that seamlessly integrates with your existing claims management software.</p>
                  </div>
              </div>
          </section>
      </main>

      {/* Seamless CTA & Footer */}
      <section id="contact" className="relative overflow-hidden pt-32 pb-12 border-t bg-[#0A0A0A] border-neutral-800/50">
          
          {/* Wavy Background Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center mask-waves opacity-60">
              <WavyBackground />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b via-transparent z-0 pointer-events-none from-[#0A0A0A] to-[#0A0A0A] opacity-80"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-32">
              <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-6 leading-[1.1] text-white">Ready to secure your<br/>claims processing?</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto font-normal text-neutral-400">We are onboarding select Indian health insurance providers for pilot programs. Secure your spot in the trial.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="mailto:hello@detectra.in" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-full transition-colors text-base shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-white text-black hover:bg-neutral-200">
                      Talk to our experts
                      <ArrowRight className="w-5 h-5" />
                  </Link>
              </div>
          </div>

          <footer className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                  <div>
                      <Link href="/" className="flex items-center space-x-2 mb-2">
                          <BrandLogo size="sm" priority />
                      </Link>
                      <p className="text-sm text-neutral-500">Fraud resolution engineered for scale.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-neutral-400">
                      <Link href="#features" className="transition-colors hover:text-white">Features</Link>
                      <Link href="#solutions" className="transition-colors hover:text-white">Solutions</Link>
                      <Link href="#philosophy" className="transition-colors hover:text-white">Philosophy</Link>
                      <Link href="#contact" className="transition-colors hover:text-white">Contact</Link>
                  </div>
              </div>
              
              <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-neutral-800/50 text-neutral-600">
                  <p>© 2026 Detectra AI. All rights reserved.</p>
                  <div className="flex gap-4">
                      <Link href="#contact" className="transition-colors hover:text-neutral-400"><MapPin className="w-5 h-5" /></Link>
                      <Link href="#contact" className="transition-colors hover:text-neutral-400"><Mail className="w-5 h-5" /></Link>
                  </div>
              </div>
          </footer>
      </section>

    </div>
  );
}

// Temporary Users icon, since it wasn't imported from lucide above
const Users = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
