"use client"

import { Calendar, MapPin, ArrowRight, Globe, ChevronDown, Plus, Minus } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { EXPERIENCES, Role } from "@/lib/data/experience";

const TimelineNode = ({ progress, threshold, isHovered }: { progress: any, threshold: number, isHovered: boolean }) => {
  const isActive = useTransform(progress, [threshold - 0.01, threshold], [0, 1]);
  const scale = useTransform(progress, [threshold - 0.01, threshold], [0.8, 1]);
  const opacity = useTransform(progress, [threshold - 0.01, threshold], [0.3, 1]);
  const glowOpacity = useTransform(progress, [threshold - 0.01, threshold], [0, 1]);

  return (
    <div className="absolute left-4 md:left-1/2 top-[19px] md:top-8 z-30 -translate-x-1/2">
      <motion.div 
        style={{ 
          scale: isHovered ? 1.4 : scale,
          opacity: opacity,
        }}
        className="h-3 w-3 rounded-full bg-primary border-2 border-background ring-4 ring-primary/5 relative z-10 transition-transform duration-300"
      >
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute inset-x-[-10px] inset-y-[-10px] bg-primary/20 blur-md rounded-full -z-10"
        />
      </motion.div>
      
      {/* Pulse Animation - Only when active */}
      <motion.div 
        style={{ opacity: isActive }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.1, 0, 0.1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-primary rounded-full -z-10"
      />
    </div>
  );
};

const ExperienceCard = ({ 
  role, 
  roleIdx, 
  isEven, 
  hasHydrated,
}: { 
  role: Role, 
  roleIdx: number, 
  isEven: boolean, 
  hasHydrated: boolean,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: roleIdx * 0.1 }}
      className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full pl-10 md:pl-0 relative`}
    >
      <div className="w-full md:w-[45%] group">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`glass p-6 md:p-8 rounded-xl cursor-pointer transition-all duration-500 relative ${isEven ? 'md:rounded-tl-none' : 'md:rounded-tr-none'} 
            ${isExpanded 
              ? 'border-primary/40 shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.2)] outline outline-1 outline-primary/60 outline-offset-4' 
              : 'border-primary/20 dark:border-primary/10 outline outline-[1px] outline-primary/30 dark:outline-primary/20 outline-offset-2'
            } hover:outline-primary/50 hover:border-primary/40`}
        >



          {/* Header Section */}
          <div className="flex items-start gap-4 md:gap-6">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-1.5 md:p-2 rounded-xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors shrink-0 mt-0.5 md:mt-1"
            >
              <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-primary/60" />
            </motion.div>

            <div className="space-y-2 flex-1">
              <h4 className="text-base md:text-lg lg:text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                {role.role}
              </h4>
              
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] md:text-xs font-mono transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`}>
                <div className="flex items-center gap-2 text-primary/80 font-bold uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5" />
                  {role.period}
                </div>
                <span className="text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest bg-secondary/30">
                  {role.type}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-6" />
                
                <ul className="space-y-4">
                  {role.description.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      className="text-muted-foreground text-xs md:text-[13px] font-light leading-relaxed flex items-start gap-3 group/item"
                    >
                      <div className="mt-1.5 shrink-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-300" />
                      </div>
                      <span 
                        className="flex-1 transition-colors group-hover/item:text-foreground/90" 
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom indicator for collapsed state */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setHasHydrated(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const pathScaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.1
  });

  return (
    <SectionWrapper>
      <section id="experience" className="relative py-10 space-y-16">
        <div className="flex flex-col gap-2">
          <span className="section-title">02. Career Progression</span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
            Professional <span className="text-primary italic">Journey</span>
          </h2>
        </div>
        
        <div ref={containerRef} className="relative">
          {/* Central Vertical Line (Static Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:w-[3px] bg-primary/5 -translate-x-1/2 rounded-full" />
          
          {/* Glowing Animated Path (Scroll Progress) - Centered */}
          <motion.div 
            style={{ scaleY: pathScaleY, willChange: "transform" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:w-[3px] bg-gradient-to-b from-primary via-primary/50 to-primary/10 -translate-x-1/2 rounded-full origin-top z-10"
          />

          <div className="space-y-32 md:space-y-48">
            {EXPERIENCES.map((company, companyIdx) => {
              const isEven = companyIdx % 2 === 0;
              const isHovered = hoveredCompany === company.id;
              // FMC is at the start (0), Lamina is approx at 0.7 progress
              const threshold = companyIdx === 0 ? 0.05 : 0.7;
              
              return (
                <div key={companyIdx} className="relative">
                  <TimelineNode 
                    progress={pathScaleY} 
                    threshold={threshold} 
                    isHovered={isHovered} 
                  />

                  {/* Company Header */}
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 relative z-20`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredCompany(company.id)}
                      onMouseLeave={() => setHoveredCompany(null)}
                      className={`flex items-center gap-6 w-full md:w-1/2 ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-12 md:pl-0 relative`}
                    >
                      <div className={`flex items-center gap-6 md:gap-8 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className={`h-16 w-16 md:h-24 md:w-24 rounded-2xl md:rounded-3xl bg-secondary/40 flex items-center justify-center p-3 md:p-5 transition-all duration-500 outline outline-[1px] outline-primary/30 dark:outline-primary/20 outline-offset-2 hover:outline-primary/50 ${isHovered ? 'outline-primary/50 scale-110 shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.2)] bg-secondary/60' : ''} shrink-0`}>
                          <Image 
                            src={company.logo} 
                            alt={company.company} 
                            width={64} 
                            height={64} 
                            className={`object-contain transition-transform duration-500 ${isHovered ? 'scale-110' : ''} ${company.invertLogo ? 'dark:invert' : ''}`} 
                            suppressHydrationWarning
                          />
                        </div>
                        <div className={`flex flex-col ${isEven ? 'md:text-right' : 'md:text-left'} text-left space-y-1 max-w-[200px] md:max-w-none`}>
                          <h3 className="text-lg md:text-2xl lg:text-3xl font-medium tracking-tight text-foreground leading-tight">
                            {company.company}
                          </h3>
                          <div className={`flex items-center gap-2 text-[11px] md:text-sm font-mono text-muted-foreground/80 uppercase tracking-widest justify-start ${isEven ? 'md:justify-end' : 'md:justify-start'} transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`}>
                            {company.location.includes('(Remote)') ? (
                              <Globe className="h-3.5 w-3.5 text-red-500" />
                            ) : (
                              <MapPin className="h-3.5 w-3.5 text-red-500" />
                            )}
                            {company.location}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <div className="hidden md:block w-1/2 invisible" />
                  </div>

                  {/* Roles */}
                  <div className="mt-12 md:mt-20 space-y-12 md:space-y-20">
                    {company.roles.map((role, roleIdx) => (
                      <ExperienceCard 
                        key={roleIdx}
                        role={role}
                        roleIdx={roleIdx}
                        isEven={isEven}
                        hasHydrated={hasHydrated}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};
