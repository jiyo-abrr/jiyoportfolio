"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const logos = [
  { src: "/pup-logo.png", alt: "Polytechnic University of the Philippines" },
  { src: "/lamina-logo.png", alt: "Lamina Studios" },
  { src: "/fmc-logo.png", alt: "FMC Research Solutions" },
]

export const LogoMarquee = () => {
  return (
    <section className="relative py-4 overflow-hidden glass border-x-0 border-y shadow-2xl shadow-primary/5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex select-none gap-16 md:gap-32">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center justify-around gap-16 md:gap-32 min-w-full"
        >
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-16 md:gap-32">
               <div className="relative h-6 w-20 md:h-8 md:w-24 opacity-50 hover:opacity-100 transition-opacity duration-500">
                 <Image 
                   src={logo.src} 
                   alt={logo.alt} 
                   fill 
                   className="object-contain drop-shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                 />
               </div>
               <div className="h-1 w-1 rounded-full bg-primary/20" />
            </div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center justify-around gap-16 md:gap-32 min-w-full"
        >
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-16 md:gap-32">
               <div className="relative h-8 w-24 md:h-10 md:w-28 opacity-50 hover:opacity-100 transition-opacity duration-500">
                 <Image 
                   src={logo.src} 
                   alt={logo.alt} 
                   fill 
                   className="object-contain drop-shadow-[0_0_5px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                 />
               </div>
               <div className="h-1 w-1 rounded-full bg-primary/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
