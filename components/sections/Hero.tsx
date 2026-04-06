"use client";

import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HERO_CONTENT } from "@/lib/data/hero";
import Image from "next/image";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax / Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax offsets for background elements
  const bgX = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const bgY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  // Magnetic Button State
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        mouseX.set(x);
        mouseY.set(y);
      }

      // Magnetic Logic
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 100) {
          setButtonPos({
            x: (e.clientX - centerX) * 0.25,
            y: (e.clientY - centerY) * 0.25,
          });
        } else {
          setButtonPos({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

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
        setTimeout(() => setIsDeleting(true), 2400); 
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_CONTENT.roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section className="relative min-h-[82vh] md:min-h-[80vh] flex items-center pt-28 md:pt-32 pb-10 md:pb-12 w-full">
      {/* Background Ambient Glows (Positioned to avoid edge-clipping artifacts) */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none select-none"
      >
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-primary/5 blur-[120px] md:blur-[180px] rounded-full animate-pulse opacity-30" />
        <div className="absolute bottom-[10%] left-[15%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 blur-[100px] md:blur-[140px] rounded-full animate-slow-float opacity-20" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-32 relative">
          
          {/* Main Content Area (Mobile Refined & Spaced) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col flex-[1.2] gap-10 md:gap-12 max-w-3xl lg:max-w-4xl"
          >
            <div className="space-y-6 md:space-y-8">
              {/* Greeting Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold uppercase tracking-[0.3em] text-primary shadow-sm w-fit backdrop-blur-sm transition-all hover:bg-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {HERO_CONTENT.greeting}
              </div>

              {/* Title & Role (Logo on Left + Text on Right) */}
              <div className="flex flex-row items-center gap-6 w-full lg:block">
                {/* Mobile/Tablet Logo (Left Side - Scaled to match text height) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="lg:hidden relative w-20 h-20 sm:w-32 sm:h-32 shrink-0 transition-all duration-500"
                >
                  <Image
                    src="/jiyo-logo.png"
                    alt="Jiyo Mobile Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  />
                  <div className="absolute inset-x-2 inset-y-2 bg-primary/10 blur-[40px] rounded-full -z-10" />
                </motion.div>

                <div className="space-y-1 md:space-y-4 flex-1">
                  <h1 className="text-4xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-foreground leading-[1.1] md:leading-[1]">
                    {HERO_CONTENT.name}<span className="text-primary italic animate-pulse">.</span>
                  </h1>

                  <div className="h-[20px] md:h-[60px] flex items-center">
                    <p className="text-base md:text-3xl lg:text-4xl text-muted-foreground/80 font-light tracking-tight flex items-center leading-none">
                      {displayText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-block w-[2px] md:w-[6px] h-[0.8em] bg-primary/60 ml-3"
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Description (Breathable Width & Size) */}
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground/60 font-light max-w-2xl leading-relaxed">
                {HERO_CONTENT.description}
              </p>

              {/* Focus Tags (Minimized for Mobile) */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 pt-1">
                <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 backdrop-blur-sm shadow-sm transition-all hover:bg-primary/10 w-fit">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  {HERO_CONTENT.focus}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-secondary/30 border border-border/50 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 transition-all hover:text-muted-foreground/80 w-fit">
                  {HERO_CONTENT.learning}
                </div>
              </div>
            </div>

            {/* CTAs & Socials (Side-by-Side on Mobile) */}
            <div className="flex flex-row items-center gap-4 sm:gap-10 pt-2">
              <motion.a
                ref={buttonRef}
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                href="#contact"
                className="w-fit h-10 md:h-14 px-5 md:px-8 flex items-center justify-center gap-2 rounded-full bg-foreground text-background text-[11px] md:text-base font-bold hover:bg-primary transition-all shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:shadow-primary/25 whitespace-nowrap"
              >
                Get in touch <ArrowRight className="h-3.5 w-3.5 md:h-5 w-5" />
              </motion.a>

              <div className="flex items-center gap-4 md:gap-10 px-2 sm:px-0">
                <a
                  href={HERO_CONTENT.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground/40 hover:text-primary transition-all transform hover:-translate-y-2 group"
                >
                  <Github className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={HERO_CONTENT.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground/40 hover:text-primary transition-all transform hover:-translate-y-2 group"
                >
                  <Linkedin className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={HERO_CONTENT.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[12px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 hover:text-primary transition-all transform hover:-translate-y-1 group"
                >
                  <FileText className="h-7 w-7 group-hover:scale-110 transition-transform" /> 
                  <span className="hidden xs:inline">Resume</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Branded Logo (RESTORED TO BIG DRAMATIC IMPACT) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-1 justify-end relative h-full pr-4"
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [0, 8, -8, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative group select-none pointer-events-none"
              >
                {/* Brand Aura Glow (Positioned further from edge) */}
                <div className="absolute inset-x-12 inset-y-16 bg-primary/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse scale-150" />
                
                <div className="relative w-64 h-64 lg:w-[450px] lg:h-[450px] flex items-center justify-center transition-all duration-1000">
                  <Image
                    src="/jiyo-logo.png"
                    alt="Jiyo Official Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-700 p-4"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  );
};
