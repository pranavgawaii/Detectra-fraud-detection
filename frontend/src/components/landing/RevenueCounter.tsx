"use client";

import React, { useEffect, useRef } from 'react';

export const RevenueCounter = () => {
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
