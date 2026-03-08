"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/40 pt-16 pb-12 bg-secondary/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="flex flex-col gap-10">
          {/* Main Row: Brand & Back to Top */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-medium tracking-tighter text-foreground">
                <span className="text-primary">{"<"}</span>
                jiyo.dev
                <span className="text-primary">{"/>"}</span>
              </p>
            </div>

            <button
              onClick={() => {
                const scrollAreaViewport = document.querySelector('[data-slot="scroll-area-viewport"]');
                if (scrollAreaViewport) {
                  scrollAreaViewport.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              suppressHydrationWarning
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
            >
              <span className="hidden sm:inline">Back to Top</span>
              <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-all bg-background/50">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ↑
                </motion.div>
              </div>
            </button>
          </div>

          {/* Bottom Row: Tech Logos & Copyright */}
          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
                Made with:
              </p>
              <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="relative h-4 w-16 grayscale hover:grayscale-0 transition-all">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                    alt="Next.js"
                    fill
                    className="object-contain dark:invert"
                  />
                </div>
                <div className="relative h-4 w-16 grayscale hover:grayscale-0 transition-all">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                    alt="Tailwind CSS"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative h-4 w-16 grayscale hover:grayscale-0 transition-all">
                  <Image
                    src="/shadcn.svg"
                    alt="shadcn/ui"
                    fill
                    className="object-contain dark:invert"
                  />
                </div>
              </div>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center sm:text-right leading-loose">
              &copy; {new Date().getFullYear()} Jeo C. Abarre <br />
              All rights reserved <br />
              <span className="opacity-50">v3.2 • Last updated: March 2026</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
