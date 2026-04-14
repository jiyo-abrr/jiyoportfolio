"use client"

import { motion } from "framer-motion"
import { Code, Globe, Database, Cpu, Terminal } from "lucide-react"
import { useState, useEffect } from "react";
import { MARQUEE_LOGOS } from "@/lib/data/logo-marquee";

const separatorIcons = [
  { Icon: Code, color: "text-blue-500/40" },
  { Icon: Globe, color: "text-emerald-500/40" },
  { Icon: Database, color: "text-amber-500/40" },
  { Icon: Cpu, color: "text-purple-500/40" },
  { Icon: Terminal, color: "text-cyan-500/40" }
]

export const LogoMarquee = () => {
  const [hasHydrated, setHasHydrated] = useState(false);
  
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // We'll create a list of items where each item is a logo followed by an icon
  const items = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS];

  return (
    <section className="relative py-3 md:py-6 overflow-hidden glass border-x-0 border-y shadow-2xl shadow-primary/5 pause-on-hover">
      {/* Side Fades for depth */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex select-none">
        {/* We use two identical divs side-by-side */}
        {[1, 2].map((i) => (
          <div
            key={i}
            // Single gap value for perfect consistency
            className="flex shrink-0 items-center gap-12 md:gap-20 pr-12 md:pr-20 animate-marquee"
          >
            {items.map((logo, idx) => {
              const { Icon, color } = separatorIcons[idx % separatorIcons.length];
              return (
                <div key={idx} className="flex items-center gap-12 md:gap-20">
                  <div className="relative h-8 md:h-12 flex items-center shrink-0">
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className={`h-full w-auto object-contain opacity-80 md:opacity-40 hover:opacity-100 transition-all duration-300 grayscale-0 md:grayscale md:hover:grayscale-0 scale-100 md:hover:scale-110 drop-shadow-none md:hover:drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)] ${logo.invert ? 'dark:invert' : ''}`}
                      suppressHydrationWarning
                    />
                  </div>
                  <Icon className={`w-3.5 h-3.5 md:w-5 md:h-5 ${color} shrink-0 transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
