"use client";

import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HERO_CONTENT } from "@/lib/data/hero";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = HERO_CONTENT.roles[roleIndex];

      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_CONTENT.roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20">
      <div className="flex flex-col gap-12 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-[0.3em] text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {HERO_CONTENT.greeting}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight text-foreground leading-[0.85]">
                {HERO_CONTENT.name}<span className="text-primary">.</span>
              </h1>

              <div className="h-[40px] md:h-[70px] flex items-center">
                <p className="text-2xl md:text-5xl lg:text-6xl text-muted-foreground font-light tracking-tight flex items-center">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block w-[2px] md:w-[3px] h-[0.8em] bg-primary ml-2"
                  />
                </p>
              </div>
            </div>

            <p className="text-base md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed pt-2 md:pt-4">
              {HERO_CONTENT.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {HERO_CONTENT.focus}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                {HERO_CONTENT.learning}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="w-full sm:w-auto h-14 px-8 md:px-12 flex items-center justify-center gap-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary transition-colors shadow-2xl shadow-primary/10"
            >
              Get in touch <ArrowRight className="h-5 w-5" />
            </motion.a>

            <div className="flex items-center gap-6 md:gap-8 sm:pl-6 sm:border-l border-border/50">
              <a
                href={HERO_CONTENT.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all transform hover:-translate-y-1"
              >
                <Github className="h-5 w-5 md:h-6 md:w-6" />
              </a>
              <a
                href={HERO_CONTENT.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all transform hover:-translate-y-1"
              >
                <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
              </a>
              <a
                href={HERO_CONTENT.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all transform hover:-translate-y-1"
              >
                <FileText className="h-5 w-5" /> CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
