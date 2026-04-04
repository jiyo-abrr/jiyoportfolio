"use client"

import { Calendar, MapPin, ArrowRight, Globe } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { EXPERIENCES } from "@/lib/data/experience";

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

export const Experience = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">Professional Journey</h2>
        </div>
        
        <div ref={containerRef} className="relative">
          {/* Central Vertical Line (Static Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:w-[3px] bg-primary/20 -translate-x-1/2 rounded-full" />
          
          {/* Glowing Animated Path (Scroll Progress) - Centered */}
          <motion.div 
            style={{ scaleY: pathScaleY, willChange: "transform" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:w-[3px] bg-gradient-to-b from-primary via-blue-400 to-blue-500 -translate-x-1/2 rounded-full origin-top z-10"
          />

          <div className="space-y-24 md:space-y-32">
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
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 relative z-20`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredCompany(company.id)}
                      onMouseLeave={() => setHoveredCompany(null)}
                      className={`flex items-center gap-6 w-full md:w-1/2 ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-10 md:pl-0 relative`}
                    >
                      <div className={`flex items-center gap-4 md:gap-6 flex-row-reverse ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className={`flex flex-col ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground whitespace-nowrap">{company.company}</h3>
                          <div className={`flex items-center gap-2 text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest justify-start ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {company.location.includes('(Remote)') ? (
                              <Globe className="h-3 w-3 text-primary/60" />
                            ) : (
                              <MapPin className="h-3 w-3 text-primary/60" />
                            )}
                            {company.location}
                          </div>
                        </div>
                        <div className={`h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-secondary/50 border border-border flex items-center justify-center p-2 md:p-3 transition-all duration-300 ${isHovered ? 'border-primary/50 scale-110 shadow-lg' : ''}`}>
                          <Image 
                            src={company.logo} 
                            alt={company.company} 
                            width={40} 
                            height={40} 
                            className={`object-contain ${company.invertLogo ? 'dark:invert' : ''}`} 
                          />
                        </div>
                      </div>
                    </motion.div>
                    <div className="hidden md:block w-1/2" />
                  </div>

                  {/* Roles */}
                  <div className="mt-8 md:mt-12 space-y-8 md:space-y-12">
                    {company.roles.map((role, roleIdx) => (
                      <motion.div 
                        key={roleIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: roleIdx * 0.1 }}
                        className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full pl-10 md:pl-0 relative`}
                      >
                        <div className="w-full md:w-[45%]">
                          <div className={`glass p-6 md:p-8 rounded-xl md:rounded-xl space-y-4 md:space-y-6 hover:border-primary/30 transition-all duration-500 ${isEven ? 'md:rounded-tl-none' : 'md:rounded-tr-none'}`}>
                            <div className="flex flex-wrap justify-between items-start gap-4">
                              <div className="space-y-1">
                                <h4 className="text-lg md:text-2xl font-medium tracking-tight text-foreground">{role.role}</h4>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-primary/80 font-bold">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {role.period}
                                </div>
                              </div>
                              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full">
                                {role.type}
                              </span>
                            </div>
                            <ul className="space-y-2 md:space-y-3">
                              {role.description.map((item, i) => (
                                <li key={i} className="text-muted-foreground text-xs md:text-sm font-light leading-relaxed flex items-start gap-2 md:gap-3">
                                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary/30 mt-0.5 shrink-0" />
                                  <span 
                                    className="flex-1" 
                                    dangerouslySetInnerHTML={{ __html: item }}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
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
