"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Image from "next/image";
import { motion } from "framer-motion";
import { TECH_GROUPS } from "@/lib/data/tech-stacks";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/visuals/Lanyard").then(mod => mod.Lanyard), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/5 rounded-3xl animate-pulse" />
});

export const TechStacks = () => (
  <SectionWrapper>
    <section id="skills" className="py-10">
      <div className="space-y-16">
        <div className="space-y-4">
          <span className="section-title">04. Technical Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
            Tech Stacks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            A curated selection of tools and technologies I use to build robust,
            scalable systems.
          </p>
        </div>

        <div className="space-y-8">
          {TECH_GROUPS.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-start gap-6 md:gap-12 p-6 md:p-8 rounded-2xl md:rounded-3xl glass hover:border-primary/30 transition-all duration-500"
            >
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground md:w-48 shrink-0 md:pt-4">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-x-2 md:gap-x-4 gap-y-8 md:gap-y-10">
                {group.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center gap-3 group/item w-16 md:w-24 text-center"
                  >
                    <div className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        className={`object-contain drop-shadow-sm group-hover/item:drop-shadow-md transition-all ${
                          item.invertLogo ? "dark:invert" : ""
                        }`}
                      />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-medium text-muted-foreground/40 group-hover/item:text-primary uppercase tracking-wider transition-colors duration-300 leading-tight">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Education Info */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start md:items-center gap-6 md:gap-8 bg-secondary/5 p-6 md:p-8 rounded-3xl md:rounded-3xl border border-border/50 h-full justify-center">
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
                <h3 className="text-xl md:text-3xl font-medium tracking-tight text-foreground leading-tight">
                  Polytechnic University of the Philippines
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground font-light italic">
                  Manila, Philippines
                </p>
              </div>
            </div>

            <div className="space-y-8 bg-secondary/5 p-6 md:p-8 rounded-3xl md:rounded-3xl border border-border/50">
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-primary font-medium tracking-tight">
                  Bachelor of Science in Computer Science
                </p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] md:text-sm text-muted-foreground">
                  <span className="px-3 py-1.5 rounded bg-secondary/30 border border-border shadow-sm">
                    Oct 2021 – Sep 2025
                  </span>
                  <span className="px-3 py-1.5 rounded bg-primary/10 border border-primary/20 shadow-sm text-primary font-bold">
                    DOST-SEI Undergraduate Scholar
                  </span>
                </div>
              </div>

              {/* GWA and Honors Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-6 md:p-8 rounded-2xl flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all">
                  <p className="text-3xl md:text-4xl font-light text-primary group-hover:scale-110 transition-transform">
                    1.29
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2">
                    Cumulative GWA
                  </p>
                </div>
                <div className="glass p-6 md:p-8 rounded-2xl flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all">
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
          <div className="h-[500px] lg:h-auto min-h-[500px] w-full relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ contain: 'paint' }}
              className="relative w-full h-full glass rounded-3xl md:rounded-3xl border border-border/40 shadow-2xl overflow-hidden flex items-center justify-center group hover:border-primary/20 transition-all duration-700"
            >
              <Lanyard />
              <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="absolute bottom-6 left-10 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30 pointer-events-none">
                BATCH 2025
              </div>
            </motion.div>
            <div className="absolute inset-x-12 inset-y-12 bg-primary/5 blur-[80px] -z-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  </SectionWrapper>
);
