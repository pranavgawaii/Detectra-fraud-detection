"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';

export const LandingHeader = ({ menuState, setMenuState }: { menuState: boolean, setMenuState: (s: boolean) => void }) => {
  return (
    <header className="fixed top-1 inset-x-0 z-50 border-b backdrop-blur-md border-neutral-800/50 bg-[#0A0A0A]/80">
      <div className="flex h-14 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <BrandLogo size="sm" priority />
          </Link>
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
      {menuState && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0A0A0AC0] backdrop-blur-xl absolute w-full left-0 py-4 px-6 flex flex-col gap-4">
          <Link href="#features" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Features</Link>
          <Link href="#solutions" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Solutions</Link>
          <Link href="#philosophy" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white">Philosophy</Link>
          <Link href="/dashboard" onClick={() => setMenuState(false)} className="text-white/80 hover:text-white mt-4 border-t border-neutral-800 pt-4">Log in</Link>
        </div>
      )}
    </header>
  );
};
