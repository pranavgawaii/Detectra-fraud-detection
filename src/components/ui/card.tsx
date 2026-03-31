import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", style = {} }: CardProps) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${className}`}
      style={{ 
        background: "var(--card)", 
        borderColor: "var(--border)", 
        ...style 
      }}
    >
      {children}
    </div>
  );
}

export default Card;
