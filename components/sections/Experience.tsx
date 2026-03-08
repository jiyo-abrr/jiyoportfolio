"use client"

import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { EXPERIENCES } from "@/lib/data/experience";

export const Experience = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  return (
    <SectionWrapper>
      <section id="experience" className="relative py-10 space-y-16">
        <div className="flex flex-col gap-2">
          <span className="section-title">02. Career Progression</span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">Professional Journey</h2>
        </div>
        
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] md:w-[5px] bg-primary/40 md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.1)]" />
          
          <div className="space-y-24 md:space-y-32">
            {EXPERIENCES.map((company, companyIdx) => {
              const isEven = companyIdx % 2 === 0;
              const isHovered = hoveredCompany === company.id;
              
              return (
                <div key={companyIdx} className="relative">
                  {/* Centered Node Dot */}
                  <motion.div 
                    animate={{ scale: isHovered ? 1.8 : 1 }}
                    className="absolute left-[11px] md:left-1/2 top-[19px] md:top-8 z-30 h-2.5 w-2.5 rounded-full bg-primary md:-translate-x-1/2 border-background outline outline-1 outline-primary/20" 
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
                      <div className={`flex items-center gap-4 md:gap-6 ${!isEven ? 'flex-row-reverse' : ''}`}>
                        <div className={isEven ? 'text-right' : 'text-left'}>
                          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground whitespace-nowrap">{company.company}</h3>
                          <div className={`flex items-center gap-2 text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest ${!isEven ? 'justify-start' : 'justify-end'}`}>
                            <MapPin className="h-3 w-3 text-primary/60" />
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
                          <div className={`glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] space-y-4 md:space-y-6 hover:border-primary/30 transition-all duration-500 ${isEven ? 'md:rounded-tl-none' : 'md:rounded-tr-none'}`}>
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
