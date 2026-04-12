"use client"
 
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Code, Globe, Database, Cpu, Terminal } from "lucide-react";
import Image from "next/image";

const roles = [
  { label: "Software Engineer", icon: Code },
  { label: "Full Stack Developer", icon: Globe },
  { label: "Data Science", icon: Database },
  { label: "AI / ML", icon: Cpu },
  { label: "Computer Science", icon: Terminal }
];

const bootLogs = [
  "[ OK ] Initializing core.v4 protocols...",
  "[ OK ] Mounting /root/projects...",
  "[ OK ] Loading technical arsenal...",
  "[ OK ] Synthesizing dynamic interfaces...",
  "[ OK ] Preparing local environment...",
  "[ OK ] Optimizing build scripts...",
  "[ OK ] System Ready. Handing off to UI."
];

const DataStream = ({ side }: { side: "left" | "right" }) => {
  const [data, setData] = useState<string[]>([]);
  
  useEffect(() => {
    const chars = "01ABCDEF";
    const generateData = () => 
      Array.from({ length: 15 }, () => 
        Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
      );
    setData(generateData());
    const interval = setInterval(() => setData(generateData()), 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute top-0 bottom-0 ${side}-4 w-12 hidden lg:flex flex-col gap-2 font-mono text-[8px] opacity-[0.05] pointer-events-none select-none py-10`}>
      {data.map((str, i) => <span key={i}>{str}</span>)}
    </div>
  );
};

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [exitPhase, setExitPhase] = useState<'loading' | 'vortex' | 'pulse' | 'complete'>('loading');
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    
    const stepTimer = setInterval(() => {
      setActiveStep(prev => {
        if (prev < roles.length - 1) return prev + 1;
        
        clearInterval(stepTimer);
        // Start cinematic sequence
        setTimeout(() => setExitPhase('vortex'), 400);
        setTimeout(() => setExitPhase('pulse'), 1400);
        setTimeout(() => setExitPhase('complete'), 2600);
        setTimeout(() => setLoading(false), 3800); // Increased from 2800 to 3800 to allow 1.2s travel
        return prev;
      });
    }, 1200);

    return () => clearInterval(stepTimer);
  }, []);

  const progress = Math.round((activeStep / (roles.length - 1)) * 100);

  // Transition variants for HUD elements
  const vortexVariants = {
    loading: { scale: 1, opacity: 1, x: 0, y: 0 },
    vortex: { 
      scale: 0, 
      opacity: 0, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.7, 0, 0.3, 1] as const // Type cast for cubic-bezier
      }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5 }
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background border-b border-primary/10 overflow-hidden"
        >
          {/* 1. LAYER: MODERN AMBIENCE (AURA) */}
          <motion.div 
            animate={exitPhase === 'vortex' || exitPhase === 'pulse' ? { opacity: 0 } : { opacity: 0.03 }}
            className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
          />
          
          {/* Shifting Ambient Glows */}
          <motion.div 
            animate={exitPhase !== 'loading' ? { scale: 0, opacity: 0 } : { 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none will-change-transform"
          />
          
          <AnimatePresence mode="popLayout">
            {exitPhase === 'loading' && (
              <motion.div 
                key={activeStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 2],
                  opacity: [0, 0.15, 0],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              >
                <div className="w-64 h-64 border border-primary/20 rounded-full blur-[1px]" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div animate={exitPhase !== 'loading' ? { opacity: 0, scale: 0 } : {}}>
            <DataStream side="left" />
            <DataStream side="right" />
          </motion.div>

          {/* 2. LAYER: MAIN CONTENT */}
          <div className="relative flex flex-col items-center justify-center w-full h-full z-20">
            
            {/* Logo Anchor - Synthesis Zone */}
            <div className="relative flex items-center justify-center">
              {/* Text Logo (Condensing) */}
              <motion.div
                animate={
                  exitPhase === 'pulse' || exitPhase === 'complete'
                    ? { scale: 0.5, opacity: 0, filter: "blur(10px)" }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-4xl md:text-6xl font-mono font-bold text-foreground flex items-center tracking-tight z-50 absolute"
              >
                <span className="text-primary">{"< "}</span>
                jiyo.dev
                <span className="text-primary">{" />"}</span>
              </motion.div>

              {/* 3D Image Logo (Materializing) */}
              <motion.div
                layoutId="hero-logo-3d"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                animate={
                  exitPhase === 'pulse' 
                    ? { scale: [0.8, 1.1, 1], opacity: 1, filter: "blur(0px)" }
                    : exitPhase === 'complete'
                    ? { opacity: 1, transition: { duration: 0.1 } } 
                    : { opacity: 0 }
                }
                transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] as const }}
                className="w-32 h-32 md:w-48 md:h-48 relative z-50"
              >
                {hasHydrated && (
                  <Image
                    src="/jiyo-logo.png"
                    alt="Jiyo Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                    priority
                    suppressHydrationWarning
                  />
                )}
                
                {/* Pulse ripple for core ignition */}
                {exitPhase === 'pulse' && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 3, opacity: [0, 0.4, 0] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 bg-primary/30 rounded-full blur-3xl -z-10"
                  />
                )}
              </motion.div>
            </div>

            {/* Portal Sucked Elements */}
            <motion.div
              variants={vortexVariants}
              animate={exitPhase === 'loading' ? 'loading' : 'vortex'}
              className="flex flex-col items-center gap-12 max-w-xs w-full mt-24"
            >
              <div className="w-full flex flex-col items-center gap-4">
                <div className="flex justify-between w-full">
                  {roles.map((role, i) => (
                    <div key={i} className="p-2">
                       {hasHydrated && (
                         <role.icon 
                           className={`w-5 h-5 transition-all duration-500 ${
                             activeStep === i ? "text-primary scale-125 drop-shadow-[0_0_8px_var(--primary)]" : "opacity-20"
                           }`} 
                         />
                       )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center h-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeStep}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-semibold mr-[-0.4em]"
                    >
                      {roles[activeStep].label}
                    </motion.p>
                  </AnimatePresence>
                </div>
                
                <div className="relative w-full">
                  <div className="w-full h-[1px] bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                   <div className="absolute bottom-full right-0 mb-2">
                     <span className="text-[10px] font-mono text-primary/40 tabular-nums">{progress}%</span>
                   </div>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* HUD Elements for Vortex */}
          <motion.div
            variants={vortexVariants}
            animate={exitPhase === 'loading' ? 'loading' : 'vortex'}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute bottom-[34px] left-[38px] flex flex-col gap-1 h-24">
              <div className="text-[8px] font-bold text-primary/40 uppercase mb-2">// INIT_LOGS:</div>
              {bootLogs.slice(0, activeStep + 1).map((log, i) => (
                <div key={i} className="text-[7px] font-mono whitespace-nowrap opacity-50">{log}</div>
              ))}
            </div>

            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
