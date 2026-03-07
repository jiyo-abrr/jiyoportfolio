"use client"

import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const roles = [
  "Software Engineer",
  "Full Stack Web Developer",
  "Data Science",
  "AI / ML",
  "Computer Science"
];

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      
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
        setRoleIndex((prev) => (prev + 1) % roles.length);
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
              Building Stable Futures
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-tight text-foreground leading-[0.85]">
                Jeo Abarre<span className="text-primary">.</span>
              </h1>
              
              <div className="h-[50px] md:h-[70px] flex items-center">
                <p className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground font-light tracking-tight flex items-center">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      ease: "steps(2)", 
                    }}
                    className="inline-block w-[3px] h-[0.8em] bg-primary ml-2"
                  />
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed pt-4">
              I specialize in architecting high-concurrency systems and elegant enterprise applications with a surgical focus on precision and stability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:jeoabarre.dev@gmail.com" 
              className="h-14 px-12 flex items-center justify-center gap-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary transition-colors shadow-2xl shadow-primary/10"
            >
              Get in touch <ArrowRight className="h-5 w-5" />
            </motion.a>
            
            <div className="flex items-center gap-8 pl-6 border-l border-border/50">
              <a href="https://github.com/jiyo-abrr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all transform hover:-translate-y-1">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/jeo-abarre" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all transform hover:-translate-y-1">
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="/portfolio/Abarre - Resume.pdf" 
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
