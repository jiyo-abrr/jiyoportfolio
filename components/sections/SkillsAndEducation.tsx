"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Image from "next/image";
import { motion } from "framer-motion";
import { TECH_GROUPS } from "@/lib/data/tech-stacks";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/visuals/Lanyard").then(mod => mod.Lanyard), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/5 rounded-xl animate-pulse" />
});

export const TechStacks = () => (
  <SectionWrapper>
    <section id="skills" className="py-12 md:py-20">
      <div className="space-y-12">
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

        <div className="glass rounded-xl border border-border/50 overflow-hidden shadow-xl backdrop-blur-md">
          <div className="divide-y divide-border/10">
            {TECH_GROUPS.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-4 md:gap-8 p-6 md:p-8 hover:bg-primary/[0.01] transition-all duration-300 items-start border-l-2 border-l-transparent hover:border-l-primary/40"
              >
                <div className="flex flex-col gap-1.5 md:pt-1">
                  <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/80 group-hover:text-primary transition-colors duration-300">
                    {group.title}
                  </h3>
                  <div className="h-0.5 w-8 bg-border group-hover:bg-primary/40 group-hover:w-12 transition-all duration-500 rounded-full" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-4 md:gap-y-8">
                  {group.items.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex flex-col items-center gap-2 transition-all duration-300 group/item min-h-[50px] justify-start pt-2"
                    >
                      <div className="relative w-6 h-6 md:w-7 md:h-7 shrink-0">
                        <Image
                          src={item.logo}
                          alt={item.name}
                          fill
                          className={`object-contain transition-all duration-500 ${
                            item.invertLogo ? "dark:invert" : ""
                          }`}
                        />
                      </div>
                      <span className="text-[8px] md:text-[9px] font-bold text-muted-foreground/60 group-hover/item:text-primary uppercase tracking-widest transition-all duration-300 mt-1 whitespace-nowrap">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </SectionWrapper>
);

export const Education = () => (
  <SectionWrapper>
    <section id="education" className="py-10">
      <div className="space-y-12">
        <span className="section-title">05. Academic Foundation</span>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {/* Left Column: Education Info */}
          <div className="flex flex-col flex-[1.2] min-w-0 bg-secondary/[0.03] dark:bg-white/[0.015] border border-border/10 rounded-xl overflow-hidden divide-y divide-border/10 transition-all duration-700">
            {/* University Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 md:gap-8 p-8 md:p-10 justify-center text-center sm:text-left">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative h-20 w-20 md:h-24 md:w-24 shrink-0"
              >
                <Image
                  src="/pup-logo.png"
                  alt="PUP Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-3xl font-medium tracking-tight text-foreground leading-tight px-4 sm:px-0">
                  Polytechnic University of the Philippines
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground font-light italic">
                  Manila, Philippines
                </p>
              </div>
            </div>

            {/* Degree Info */}
            <div className="space-y-8 p-8 md:p-10 bg-secondary/[0.02]">
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-primary font-medium tracking-tight text-center sm:text-left">
                  Bachelor of Science in Computer Science
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 font-mono text-[10px] md:text-sm text-muted-foreground">
                  <span className="px-3 py-1.5 rounded bg-secondary/30 border border-border shadow-sm whitespace-nowrap">
                    Oct 2021 – Sep 2025
                  </span>
                  <span className="px-3 py-1.5 rounded bg-primary/10 border border-primary/20 shadow-sm text-primary font-bold whitespace-nowrap text-center">
                    DOST-SEI Undergraduate Scholar
                  </span>
                </div>
              </div>

              {/* GWA and Honors Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/[0.03] p-5 md:p-8 rounded-xl flex flex-col justify-center items-center text-center group hover:bg-secondary/[0.06] transition-all border border-border/5">
                  <p className="text-3xl md:text-4xl font-light text-primary group-hover:scale-110 transition-transform">
                    1.29
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2">
                    Cumulative GWA
                  </p>
                </div>
                <div className="bg-secondary/[0.03] p-5 md:p-8 rounded-xl flex flex-col justify-center items-center text-center group hover:bg-secondary/[0.06] transition-all border border-border/5">
                  <p className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    Magna Cum Laude
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2 text-center">
                    Latin Honors
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Identity Port (Lanyard) */}
          <div className="h-[400px] md:h-auto min-h-[400px] w-full relative flex-[0.8]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ contain: 'paint' }}
              className="relative w-full h-full bg-secondary/[0.03] dark:bg-white/[0.015] border border-border/10 rounded-xl md:rounded-xl overflow-hidden flex items-center justify-center group transition-all duration-700"
            >
              <Lanyard />
              <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="absolute bottom-6 left-10 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30 pointer-events-none">
                BATCH 2025
              </div>
            </motion.div>
            <div className="absolute inset-x-12 inset-y-12 bg-primary/5 blur-[60px] md:blur-[80px] -z-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  </SectionWrapper>
);
