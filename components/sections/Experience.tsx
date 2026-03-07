"use client"

import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const experiences = [
  {
    id: "fmc",
    company: "FMC Research Solutions Inc.",
    logo: "/fmc-logo.png",
    location: "Mandaluyong, PH",
    roles: [
      {
        role: "Junior Software Developer",
        period: "Dec 2025 – Present",
        type: "Current",
        description: [
          "Optimized enterprise Next.js/Laravel architecture in Docker environments.",
          "Redesigned inventory systems, achieving 80% manual effort reduction.",
          "Engineered RabbitMQ producer–consumer systems for ID processing.",
          "Integrated hardware SDKs (Face/MRZ/NFC) for identity verification.",
          "Led intern teams through rigorous code reviews and mentorship."
        ]
      },
      {
        role: "Software Developer Intern",
        period: "Aug 2025 – Nov 2025",
        type: "Internship",
        description: [
          "Engineered scalable frontend components with Next.js and Material UI.",
          "Developed secure RESTful API architectures using Laravel.",
          "Maintained source control integrity using Bitbucket and Fork."
        ]
      }
    ]
  },
  {
    id: "lamina",
    company: "Lamina Studios, LLC",
    logo: "/lamina-logo.png",
    location: "Spokane, WA (Remote)",
    roles: [
      {
        role: "Full Stack Web Developer Intern",
        period: "Aug 2024 – Sep 2024",
        type: "Remote",
        description: [
          "Contributed to enterprise-scale applications following MVC architecture.",
          "Built high-performance UI components with Vue.js and Tailwind.",
          "Integrated PostgreSQL backend services for scalable features."
        ]
      }
    ]
  }
];

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
          {/* Central Vertical Line - Thicker structural line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-primary/10 md:-translate-x-1/2 rounded-full" />
          
          {/* Accent Glow Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/5 via-primary/40 to-primary/5 md:-translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.1)]" />

          <div className="space-y-32">
            {experiences.map((company, companyIdx) => {
              const isEven = companyIdx % 2 === 0;
              const isHovered = hoveredCompany === company.id;
              
              return (
                <div key={companyIdx} className="relative">
                  {/* Centered Node Dot - Thickens on hover */}
                  <motion.div 
                    animate={{ 
                      scale: isHovered ? 1.8 : 1,
                      borderWidth: isHovered ? "6px" : "4px"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute left-[30px] md:left-1/2 top-8 z-30 h-3 w-3 rounded-full bg-primary md:-translate-x-1/2 border-background outline outline-1 outline-primary/20" 
                  />

                  {/* Company Header Hub */}
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 relative z-20`}>
                    
                    {/* Logo + Company Info Unit */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredCompany(company.id)}
                      onMouseLeave={() => setHoveredCompany(null)}
                      className={`flex items-center gap-6 w-full md:w-1/2 ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-20 md:pl-0 cursor-default`}
                    >
                      <div className={`flex items-center gap-6 ${!isEven ? 'flex-row-reverse' : ''}`}>
                        <div className={isEven ? 'text-right' : 'text-left'}>
                          <h3 className="text-2xl font-medium tracking-tight text-foreground whitespace-nowrap">{company.company}</h3>
                          <div className={`flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest ${!isEven ? 'justify-start' : 'justify-end'}`}>
                            <MapPin className="h-3 w-3 text-primary/60" />
                            {company.location}
                          </div>
                        </div>
                        <div className={`h-16 w-16 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center p-3 overflow-hidden shadow-sm transition-all duration-300 ${isHovered ? 'border-primary/50 scale-110 shadow-lg' : ''}`}>
                          <Image 
                            src={company.logo} 
                            alt={company.company} 
                            width={40} 
                            height={40} 
                            className="object-contain drop-shadow-[0_0_5px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Empty spacer */}
                    <div className="hidden md:block w-1/2" />
                  </div>

                  {/* Roles Container */}
                  <div className="mt-12 space-y-12">
                    {company.roles.map((role, roleIdx) => (
                      <motion.div 
                        key={roleIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: roleIdx * 0.1 }}
                        className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full pl-20 md:pl-0`}
                      >
                        <div className="w-full md:w-[45%]">
                          <div className={`glass p-8 rounded-[2rem] space-y-6 hover:border-primary/30 transition-all duration-500 ${isEven ? 'md:rounded-tl-none' : 'md:rounded-tr-none'}`}>
                            <div className="flex flex-wrap justify-between items-start gap-4">
                              <div className="space-y-1">
                                <h4 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">{role.role}</h4>
                                <div className="flex items-center gap-2 text-xs font-mono text-primary/80 font-bold">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {role.period}
                                </div>
                              </div>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full">
                                {role.type}
                              </span>
                            </div>
                            
                            <ul className="space-y-3">
                              {role.description.map((item, i) => (
                                <li key={i} className="text-muted-foreground text-sm font-light leading-relaxed flex items-start gap-3">
                                  <ArrowRight className="h-4 w-4 text-primary/30 mt-0.5 shrink-0" />
                                  <span className="flex-1">{item}</span>
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
