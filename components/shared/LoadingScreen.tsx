"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Code, Globe, Database, Cpu, Terminal } from "lucide-react";

const roles = [
  { label: "Software Engineer", icon: Code },
  { label: "Full Stack Developer", icon: Globe },
  { label: "Data Science", icon: Database },
  { label: "AI / ML", icon: Cpu },
  { label: "Computer Science", icon: Terminal }
];

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    
    // Cycle through roles as loading steps - slowed down
    const stepTimer = setInterval(() => {
      setActiveStep(prev => (prev < roles.length - 1 ? prev + 1 : prev));
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0,
            scale: 1.5,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background border-b border-primary/10 overflow-hidden"
        >
          {/* Subtle Noise Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className="relative flex flex-col items-center gap-12 max-w-xs w-full">
            
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground flex items-center"
            >
              <span className="text-primary mr-1">{"<"}</span>
              jiyo.dev
              <span className="text-primary ml-1">{"/>"}</span>
            </motion.div>

            {/* Roles/Initializing Section */}
            <div className="w-full space-y-6">
              <div className="flex justify-center gap-4">
                {roles.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: activeStep >= i ? 1 : 0.1,
                      scale: activeStep === i ? 1.2 : 1,
                      color: activeStep === i ? "var(--primary)" : "currentColor"
                    }}
                    className="p-2 transition-colors"
                  >
                    <role.icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-center"
                  >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">
                      {roles[activeStep].label}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Progress Bar */}
                <div className="mt-4 w-full h-[1px] bg-primary/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activeStep + 1) / roles.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="absolute bottom-[-60px] text-[8px] uppercase tracking-[0.5em] font-mono"
            >
              System Initialization v2.0
            </motion.p>
          </div>

          {/* Tactical Corner Accents */}
          <div className="absolute top-8 left-8 w-2 h-2 border-t border-l border-primary/40" />
          <div className="absolute top-8 right-8 w-2 h-2 border-t border-r border-primary/40" />
          <div className="absolute bottom-8 left-8 w-2 h-2 border-b border-l border-primary/40" />
          <div className="absolute bottom-8 right-8 w-2 h-2 border-b border-r border-primary/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
