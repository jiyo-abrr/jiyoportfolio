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
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    
    // Cycle through roles as loading steps - faster for improved UX
    const stepTimer = setInterval(() => {
      setActiveStep(prev => (prev < roles.length - 1 ? prev + 1 : prev));
    }, 550);

    return () => {
      clearTimeout(timer);
      clearInterval(stepTimer);
    };
  }, []);

  const progress = Math.round(((activeStep + 1) / roles.length) * 100);

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
          {/* 1. LAYER: MODERN AMBIENCE (AURA) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Shifting Ambient Glows */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none will-change-transform"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.1, 0.05],
              x: [20, -20, 20],
              y: [20, -20, 20]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none will-change-transform"
          />
          
          {/* Logo-Centric HUD Pulse Ripple */}
          <AnimatePresence mode="popLayout">
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
          </AnimatePresence>

          <DataStream side="left" />
          <DataStream side="right" />

          {/* 2. LAYER: MAIN CONTENT */}
          <div className="relative flex flex-col items-center gap-12 max-w-xs w-full z-20">
            
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-6xl font-mono font-bold text-foreground flex items-center"
            >
              <span className="text-primary">{"< "}</span>
              jiyo.dev
              <span className="text-primary">{" />"}</span>
            </motion.div>

            {/* Roles/Initializing Section */}
            <div className="w-full flex flex-col items-center gap-4">
              <div className="flex justify-between w-full">
                {roles.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: activeStep >= i ? 1 : 0.1,
                      scale: activeStep === i ? 1.2 : 1,
                      color: activeStep === i ? "var(--primary)" : "currentColor",
                      filter: activeStep === i ? "drop-shadow(0 0 8px var(--primary))" : "none"
                    }}
                    className="p-2 transition-all"
                  >
                    {hasHydrated && <role.icon className="w-5 h-5" />}
                  </motion.div>
                ))}
              </div>

              {/* Centered Role Label */}
              <div className="flex justify-center">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeStep}
                     initial={{ opacity: 0, y: 5 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -5 }}
                     className="text-center"
                   >
                     <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-semibold mr-[-0.4em]">
                       {roles[activeStep].label}
                     </p>
                   </motion.div>
                 </AnimatePresence>
              </div>
              
              {/* Progress Bar & Telemetry Container */}
              <div className="relative w-full">
                <div className="w-full h-[1px] bg-primary/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                 {/* Floating Percentage Readout */}
                 <div className="absolute bottom-full right-0 mb-2">
                   <span className="text-[10px] font-mono text-primary/40 tabular-nums">{progress}%</span>
                 </div>
               </div>
            </div>
            
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.4 }}
               className="absolute bottom-[-60px] text-[8px] uppercase tracking-[0.5em] font-mono mr-[-0.5em]"
             >
               System Initialization v3.2
             </motion.p>
          </div>

          {/* 3. LAYER: HUD & DIAGNOSTICS */}
          <div className="absolute bottom-[34px] left-[38px] flex flex-col gap-1 select-none pointer-events-none overflow-hidden h-24">
             <div className="text-[8px] font-bold text-primary/40 uppercase mb-2">// INIT_LOGS:</div>
             <AnimatePresence>
                {bootLogs.slice(0, activeStep + 1).map((log, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.5, x: 0 }}
                      className="text-[7px] font-mono whitespace-nowrap opacity-50"
                   >
                      {log}
                   </motion.div>
                ))}
             </AnimatePresence>
          </div>

          {/* Tactical Corner Accents */}
          <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-primary/40">
             <span className="absolute -top-6 left-0 text-[6px] opacity-30 font-mono tracking-widest uppercase">SEC_A1</span>
          </div>
          <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-primary/40">
             <span className="absolute -top-6 right-0 text-[6px] opacity-30 font-mono tracking-widest uppercase text-right">CORP_v0</span>
          </div>
          <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
          <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/40">
             <span className="absolute -bottom-6 right-0 text-[6px] opacity-30 font-mono tracking-widest uppercase text-right">NODE_BOOT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
