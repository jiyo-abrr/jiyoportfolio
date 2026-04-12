"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Image from "next/image";
import { motion } from "framer-motion";
import { TECH_GROUPS } from "@/lib/data/tech-stacks";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { MatrixFrame } from "@/components/shared/MatrixFrame";


const CORE_TECH = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", brandColor: "#3776AB", tag: "Program Language" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", brandColor: "#3178C6", tag: "Typed Language" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", brandColor: "#05998B", tag: "Server Language" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", brandColor: "#339933", tag: "Runtime" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertLogo: true, brandColor: "#000000", tag: "Fullstack" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", brandColor: "#06B6D4", tag: "Styling" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", brandColor: "#4479A1", tag: "SQL DB" },
  { name: "Ubuntu", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg", brandColor: "#E95420", tag: "Server OS" },
];

const StaticLanyardCard = () => (
  <div className="flex flex-col gap-3 items-center w-full md:h-full h-auto mx-auto">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-full aspect-[3/4] md:aspect-auto md:flex-1 min-h-[280px] rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-card"
    >
      <Image 
        src="/Abarre.JPG" 
        alt="Identity Photo" 
        fill 
        className="object-cover"
        priority
        suppressHydrationWarning
      />
    </motion.div>
    
    <div className="flex items-center justify-between w-full px-1 shrink-0">
      <div className="relative w-9 h-9 opacity-30">
        <Image 
          src="/jiyo-logo.png" 
          alt="Jiyo Logo" 
          fill 
          className="object-contain" 
          suppressHydrationWarning
        />
      </div>
      <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30 whitespace-nowrap">
        BATCH 2025
      </span>
    </div>
  </div>
);

const TechIcon = ({ 
  item, 
  index, 
  isExpanded, 
  snappySmoothSpring,
  hasHydrated
}: { 
  item: any, 
  index: number, 
  isExpanded: boolean, 
  snappySmoothSpring: any,
  hasHydrated: boolean
}) => {
  const isCore = !isExpanded;
  const staggerDelay = isCore ? index * 0.15 : index * 0.08;
  const cycleTime = isCore ? 4.0 : 10.0;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      layoutId={`tech-item-${item.name}`}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...snappySmoothSpring, delay: index * 0.05 }}
      whileHover={{ scale: 1.15, y: -8 }}
      className="flex flex-col items-center gap-2 md:gap-4 cursor-pointer relative group/item"
    >
      <motion.div 
        layoutId={`tech-logo-container-${item.name}`}
        transition={snappySmoothSpring}
        style={hasHydrated ? ({ "--brand-color": item.brandColor || "#3b82f6" } as any) : {}}
        className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-500 rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={isHovering ? { opacity: 0 } : { 
            opacity: [0, 1, 0],
            scale: [1, 1.6, 1],
          }}
          transition={{ 
            duration: 1.5, 
            delay: isHovering ? 0 : staggerDelay, 
            repeat: Infinity,
            repeatDelay: Math.max(0, cycleTime - 1.5), 
            ease: "easeInOut"
          }}
          className={`absolute inset-[-28px] pointer-events-none z-10 rounded-full bg-[var(--brand-color)]/50 blur-3xl transition-opacity duration-1000 ${hasHydrated ? "opacity-100" : "opacity-0"}`}
        />

        <motion.div
          animate={{ 
            opacity: isHovering ? 1.0 : 0,
            scale: isHovering ? 1.8 : 1,
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut" 
          }}
          className={`absolute inset-[-28px] pointer-events-none z-10 rounded-full bg-[var(--brand-color)]/60 blur-3xl transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`}
        />

        <div className="relative w-full h-full z-20 group-hover/item:drop-shadow-[0_0_20px_var(--brand-color)] transition-all duration-300">
          <Image
            src={item.logo}
            alt={item.name}
            fill
            className={`object-contain transition-all duration-500 ${
              item.invertLogo ? "dark:invert" : ""
            }`}
            suppressHydrationWarning
          />
        </div>
      </motion.div>
      
      <motion.span 
        layoutId={`tech-name-${item.name}`}
        transition={snappySmoothSpring}
        className="text-[9px] md:text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest whitespace-nowrap group-hover/item:text-primary transition-colors"
      >
        {item.name}
      </motion.span>

      {item.tag && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[7px] md:text-[8px] font-bold text-primary opacity-0 pointer-events-none group-hover/item:opacity-100 transition-all whitespace-nowrap mt-1"
        >
          {item.tag}
        </motion.span>
      )}
    </motion.div>
  );
};

export const TechStacks = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const snappySmoothSpring = {
    type: "spring" as const,
    stiffness: 220,
    damping: 24,
    mass: 1
  };

  const toggleExpanded = () => {
    if (isExpanded) {
      // Scroll back up to the top of the section when collapsing
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <SectionWrapper>
      <section 
        id="skills" 
        ref={sectionRef}
        className="py-12 md:py-20 overflow-visible scroll-mt-32"
      >
        <div className="space-y-12">
          {/* Header Info */}
          <div className="space-y-4">
            <span className="section-title">04. Technical Arsenal</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
              Tech Stacks
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl font-light">
              A curated selection of tools and technologies I use to build robust,
              scalable systems.
            </p>
          </div>

          {/* Unified Seamless Container (Overflow-visible to prevent box clipping) */}
          <motion.div 
            layout
            transition={snappySmoothSpring}
            className="bg-white/40 dark:bg-white/[0.02] backdrop-blur-md relative group/main outline outline-[1px] outline-primary/30 dark:outline-primary/20 outline-offset-2 hover:outline-primary/50 transition-all duration-500 rounded-xl"
          >
            <div className="flex flex-col relative min-h-[300px]">
              <AnimatePresence initial={false}>
                {!isExpanded ? (
                  /* Core Tech Preview AREA */
                  <motion.div 
                    key="core-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0 }}
                    transition={snappySmoothSpring}
                    className="p-8 md:p-12 space-y-10 w-full"
                  >
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                        Core Technologies I worked daily
                      </h3>
                      <div className="h-0.5 w-12 bg-primary/40 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-12">
                      {CORE_TECH.map((item, idx) => (
                        <TechIcon 
                          key={item.name} 
                          item={item} 
                          index={idx} 
                          isExpanded={isExpanded} 
                          snappySmoothSpring={snappySmoothSpring} 
                          hasHydrated={hasHydrated}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* Full Catalog AREA */
                  <motion.div
                    key="full-catalog"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={snappySmoothSpring}
                    className="w-full"
                  >
                    <div className="">

                      {TECH_GROUPS.map((group, gIdx) => (
                        <div key={group.title} className="p-8 md:p-10">
                           <motion.div
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: gIdx * 0.05 }}
                             className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-4 md:gap-8 transition-colors duration-500 items-start"
                           >
                            <div className="flex flex-col gap-1.5 md:pt-1">
                              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                                {group.title}
                              </h3>
                              <div className="h-0.5 w-8 bg-border rounded-full" />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-10">
                              {(() => {
                                let globalIndexOffset = 0;
                                for (let i = 0; i < gIdx; i++) {
                                  globalIndexOffset += TECH_GROUPS[i].items.length;
                                }
                                return group.items.map((item, iIdx) => (
                                  <TechIcon 
                                    key={item.name} 
                                    item={item} 
                                    index={globalIndexOffset + iIdx} 
                                    isExpanded={isExpanded} 
                                    snappySmoothSpring={snappySmoothSpring} 
                                    hasHydrated={hasHydrated}
                                  />
                                ));
                              })()}
                            </div>
                           </motion.div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expansion Button Area */}
              <motion.div layout className="p-6 flex justify-center bg-gradient-to-t from-background/5 to-transparent border-t border-border/5 mt-auto">
                <button 
                  onClick={toggleExpanded}
                  className="flex items-center gap-3 px-8 py-2.5 rounded-full bg-secondary/10 border border-border/40 hover:bg-secondary/20 hover:border-primary/20 transition-all duration-300 group shadow-lg overflow-hidden relative"
                >
                  <motion.div layout className="flex items-center gap-2 relative z-10">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={snappySmoothSpring}
                    >
                      <ChevronDown className={`w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-all duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                    </motion.div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 group-hover:text-primary transition-colors">
                      {isExpanded ? "Show Less" : "See All Technologies"}
                    </span>
                  </motion.div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

  </SectionWrapper>
);
};


export const Education = () => {
  const [showGWA, setShowGWA] = useState(false);
  const [showHonors, setShowHonors] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <SectionWrapper>
      <section id="education" className="py-10">
        <div className="space-y-12">
          <div className="flex flex-col gap-2">
            <span className="section-title">03. Academic Foundation</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
              Academic <span className="text-primary italic">Foundation</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
            {/* Left Column: Education Info */}
            <div className="flex-[1.2] flex flex-col h-full min-w-0 bg-white/40 dark:bg-white/[0.015] backdrop-blur-md relative overflow-hidden transition-all duration-700 outline outline-[1px] outline-primary/30 dark:outline-primary/20 outline-offset-2 hover:outline-primary/50 rounded-xl">
              {/* University Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 md:gap-8 p-6 md:p-8 justify-center text-center sm:text-left">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative h-20 w-20 md:h-24 md:w-24 shrink-0"
                >
                  <Image
                    src="/pup-logo.png"
                    alt="PUP Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    suppressHydrationWarning
                  />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-foreground leading-tight px-4 sm:px-0">
                  Polytechnic University of the Philippines
                </h3>
                  <p className="text-sm md:text-lg text-muted-foreground font-light italic">
                    Manila, Philippines
                  </p>
                </div>
              </div>

              {/* Degree Info */}
              <div className="space-y-6 p-6 md:p-8 bg-white/20 dark:bg-secondary/[0.02] flex flex-col justify-center flex-1">
                <div className="space-y-3 flex flex-col items-center">
                  <p className="text-lg md:text-xl lg:text-2xl text-primary font-medium tracking-tight text-center leading-tight">
                    Bachelor of Science in <br />
                    Computer Science
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[8px] md:text-[10px] text-muted-foreground/80">
                    <span className="px-2 py-0.5 rounded bg-secondary/30 border border-border/50 shadow-sm whitespace-nowrap">
                      Oct 2021 – Sep 2025
                    </span>
                    <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 shadow-sm text-primary font-bold whitespace-nowrap text-center">
                      DOST-SEI Undergraduate Scholar
                    </span>
                  </div>
                </div>

                {/* GWA and Honors Cards */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div 
                    onClick={() => setShowGWA(!showGWA)}
                    className="bg-secondary/[0.03] p-5 md:p-8 rounded-xl flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-secondary/[0.06] transition-all border border-border/5 relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {!showGWA ? (
                      <motion.p 
                        key="hidden"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[9px] md:text-xs font-mono font-bold text-primary/40 uppercase tracking-widest whitespace-nowrap"
                      >
                          [ REDACTED ]
                        </motion.p>
                      ) : (
                        <motion.p 
                        key="visible"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-light text-primary group-hover:scale-110 transition-transform"
                      >
                        1.29
                      </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2">
                      Cumulative GWA
                    </p>
                    
                    {!showGWA && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[7px] uppercase tracking-widest font-bold text-primary animate-pulse">Click to Reveal</span>
                      </div>
                    )}
                  </div>

                  <div 
                    onClick={() => setShowHonors(!showHonors)}
                    className="bg-secondary/[0.03] p-5 md:p-8 rounded-xl flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-secondary/[0.06] transition-all border border-border/5 relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {!showHonors ? (
                      <motion.p 
                        key="hidden"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[9px] md:text-xs font-mono font-bold text-primary/40 uppercase tracking-widest whitespace-nowrap"
                      >
                          [ REDACTED ]
                        </motion.p>
                      ) : (
                        <motion.p 
                          key="visible"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors"
                        >
                          Magna Cum Laude
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2 text-center">
                      Latin Honors
                    </p>

                    {!showHonors && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[7px] uppercase tracking-widest font-bold text-primary animate-pulse">Click to Reveal</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Identity Photo (Uniform) */}
            <div className="h-auto md:h-auto w-full relative flex-[0.8]">
              <div className="w-full h-auto md:h-full bg-white/40 dark:bg-white/[0.015] backdrop-blur-md relative overflow-hidden flex md:items-center md:justify-center p-1.5 outline outline-[1px] outline-primary/30 dark:outline-primary/20 outline-offset-2 hover:outline-primary/50 transition-all duration-500 rounded-xl">
                <StaticLanyardCard />
              </div>
              <div className="absolute inset-x-12 inset-y-12 bg-primary/5 blur-[60px] md:blur-[80px] -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};
