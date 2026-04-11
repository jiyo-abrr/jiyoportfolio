"use client";

import React from "react";
import { motion } from "framer-motion";

interface MatrixFrameProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export const MatrixFrame = ({ children, className = "" }: MatrixFrameProps) => {
  return (
    <div className={`relative group/matrix ${className}`}>
      {/* Segmented Border Lines - TL */}
      <div className="absolute top-0 left-0 w-8 h-[2px] bg-primary/60 dark:bg-primary/40 z-20" />
      <div className="absolute top-0 left-0 w-[2px] h-8 bg-primary/60 dark:bg-primary/40 z-20" />
      
      {/* Segmented Border Lines - TR */}
      <div className="absolute top-0 right-0 w-8 h-[2px] bg-primary/60 dark:bg-primary/40 z-20" />
      <div className="absolute top-0 right-0 w-[2px] h-8 bg-primary/60 dark:bg-primary/40 z-20" />
      
      {/* Segmented Border Lines - BL */}
      <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-primary/60 dark:bg-primary/40 z-20" />
      <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-primary/60 dark:bg-primary/40 z-20" />
      
      {/* Segmented Border Lines - BR */}
      <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-primary/60 dark:bg-primary/40 z-20" />
      <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-primary/60 dark:bg-primary/40 z-20" />

      {/* Edge Ticks */}
      <div className="absolute top-1/2 -left-[1px] w-[3px] h-4 -translate-y-1/2 bg-primary/30 z-20" />
      <div className="absolute top-1/2 -right-[1px] w-[3px] h-4 -translate-y-1/2 bg-primary/30 z-20" />

      {/* Digital Telemetry Labels */}
      <div className="absolute -top-3 left-4 text-[7px] font-mono text-primary/50 uppercase tracking-[0.3em] transition-all duration-500 opacity-0 group-hover/matrix:opacity-100 z-30">
        // 0x76_SYS_INIT
      </div>
      <div className="absolute -bottom-3 right-4 text-[7px] font-mono text-primary/50 uppercase tracking-[0.3em] transition-all duration-500 opacity-0 group-hover/matrix:opacity-100 z-30">
        // NODE_STABLE_V5
      </div>

      {children}
    </div>
  );
};
