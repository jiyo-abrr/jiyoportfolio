"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Code, Globe, Database, Cpu, Terminal } from "lucide-react"

const logos = [
  { src: "/pup-logo.png", alt: "Polytechnic University of the Philippines" },
  { src: "/lamina-logo.png", alt: "Lamina Studios" },
  { src: "/fmc-logo.png", alt: "FMC Research Solutions" },
]

const separatorIcons = [Code, Globe, Database, Cpu, Terminal]

export const LogoMarquee = () => {
  // We'll create a list of items where each item is a logo followed by an icon
  // This ensures the pattern [Logo] -- Gap -- [Icon] -- Gap -- [Logo] is perfectly preserved
  const items = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative py-8 md:py-10 overflow-hidden glass border-x-0 border-y shadow-2xl shadow-primary/5">
      {/* Side Fades for depth */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex select-none">
        {/* We use two identical motion divs side-by-side with NO gap between them */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            // Using a single gap value for both the internal items and the container
            className="flex shrink-0 items-center gap-12 md:gap-20"
            style={{ paddingRight: "3rem" }} // Default mobile gap (gap-12 = 3rem)
          >
            {items.map((logo, idx) => {
              const Icon = separatorIcons[idx % separatorIcons.length];
              return (
                <div key={idx} className="flex items-center gap-12 md:gap-20">
                  <div className="relative h-5 w-20 md:h-8 md:w-32 opacity-80 md:opacity-40 hover:opacity-100 transition-all duration-500 grayscale-0 md:grayscale md:hover:grayscale-0">
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <Icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary/20 shrink-0" />
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
