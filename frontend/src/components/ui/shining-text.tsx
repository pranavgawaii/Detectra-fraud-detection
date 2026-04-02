"use client" 

import * as React from "react"
import { motion } from "motion/react";
 
export function ShiningText({ text }: { text: string }) {
  return (
    <motion.h1
      className="bg-[linear-gradient(110deg,var(--muted-foreground),35%,var(--foreground),50%,var(--muted-foreground),75%,var(--muted-foreground))] bg-[length:200%_100%] bg-clip-text text-sm font-bold text-transparent inline-block tracking-tight"
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 2.5,
        ease: "linear",
      }}
    >
      {text}
    </motion.h1>
  );
}
