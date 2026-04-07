"use client";

import { Github, Linkedin, Mail, ArrowRight, FileText, Globe, MapPin, Clock, Terminal, GitBranch, Code2, Cpu, Settings, Database, Activity, Wifi, Shield, Cpu as CpuIcon, Command } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HERO_CONTENT } from "@/lib/data/hero";
import Image from "next/image";

// Custom hook for Philippine Time (PHT - UTC+8)
const usePHTTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const pht = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(pht);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const phtTime = usePHTTime();

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
    setHasHydrated(true);
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
        // Faster deletion with slight variation
        setTypingSpeed(40 + Math.random() * 30);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        // Variable typing speed (Human-like)
        setTypingSpeed(100 + Math.random() * 100);
      }

      if (!isDeleting && displayText === currentRole) {
        // Pondering pause after finishing typing
        setTimeout(() => setIsDeleting(true), 2400); 
      } else if (isDeleting && displayText === "") {
        // Pondering pause before starting next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_CONTENT.roles.length);
        setTypingSpeed(500); // Give a bit of breath before next role
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section className="relative h-[95vh] md:h-screen flex items-center pt-24 md:pt-32 pb-10 md:pb-12 w-full overflow-hidden">
      
      {/* 1. CINEMATIC WIDE BACKGROUND (Environment) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Ambient Glows (Full Width) */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0"
        >
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] md:w-[900px] md:h-[900px] bg-primary/5 blur-[150px] md:blur-[220px] rounded-full animate-pulse opacity-20" />
          <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-500/5 blur-[120px] md:blur-[180px] rounded-full animate-slow-float opacity-15" />
        </motion.div>

        {/* Vertical Edge Rails (Wide Corners) */}
        <div className="absolute left-[2%] top-[30%] bottom-[30%] w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-[0.15]" />
        <div className="absolute right-[2%] top-[30%] bottom-[30%] w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-[0.15]" />

        {/* Coding Related Background Elements (SCATTERED) */}
        <div className="absolute inset-0 opacity-[0.14] font-mono pointer-events-none select-none">
           <span className="absolute top-[35%] left-[5%] text-[10px] rotate-[-15deg] dark:opacity-[0.14] opacity-35">const jiyo = {`{ id: 1, role: 'dev' }`};</span>
           <span className="absolute top-[65%] right-[12%] text-[10px] rotate-[10deg] dark:opacity-[0.14] opacity-35">while(active) {`{ buildAndShip(); }`}</span>
           <span className="absolute top-[45%] right-[5%] text-[11px] rotate-[-12deg] dark:opacity-[0.14] opacity-35">&lt;Portfolio /&gt;</span>
           <span className="absolute bottom-[20%] left-[10%] text-[10px] italic underline underline-offset-4 dark:opacity-[0.08] opacity-25">root@jiyo:~$ pnpm start_dev</span>
           <span className="absolute top-[22%] right-[22%] text-[9px] dark:opacity-[0.1] opacity-25 uppercase tracking-[0.4em]">interface Developer {`{ code: true }`}</span>
           
           {/* Technical Icons (Lucide) */}
           {hasHydrated && (
             <>
               <Terminal className="absolute top-[30%] right-[30%] h-8 w-8 dark:opacity-40 opacity-60" />
               <Code2 className="absolute bottom-[35%] left-[25%] h-6 w-6 dark:opacity-40 opacity-60" />
               <Database className="absolute top-[45%] left-[45%] h-5 w-5 dark:opacity-40 opacity-60" />
               <Activity className="absolute bottom-[15%] right-[40%] h-6 w-6 dark:opacity-30 opacity-50" />
             </>
           )}
        </div>
      </div>
      
      {/* 2. SECTION HUD (Surgical Technical Grid) */}
      
      {/* TOP HUD BLOCK */}
      <div className="absolute top-[135px] md:top-28 inset-x-0 px-4 md:px-10 z-20 flex items-center font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.4em] pointer-events-auto cursor-default">
         <div className="relative w-full flex items-center justify-between">
             {/* Wide Desktop Edge: Left (Only XL+) */}
             <span className="hidden xl:block dark:text-foreground/40 text-foreground/70 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300">sys.monitor.v4 // lvl_0</span>

             {/* Dynamic Inner/Main Corners */}
             <div className="hidden md:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2 w-full xl:max-w-5xl justify-between px-0 xl:px-6 transition-all duration-500">
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-100 transition-opacity duration-300">
                   {hasHydrated && <GitBranch className="h-4 w-4 text-primary" />}
                   <span>branch: <span className="text-foreground font-bold"> main*</span></span>
                </div>
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-100 transition-opacity duration-300">
                   <span>env: <span className="text-foreground font-bold"> production</span></span>
                   {hasHydrated && <CpuIcon className="h-4 w-4 text-primary" />}
                </div>
             </div>
             
             {/* Wide Desktop Edge: Right (Only XL+) */}
             <span className="hidden xl:block dark:text-foreground/40 text-foreground/70 text-right opacity-40 hover:opacity-100 transition-opacity duration-300">status.nominal // dev_mode: true</span>

             {/* Mobile Version (Surgical 2x2 Logic) */}
             <div className="md:hidden flex flex-col w-full gap-1">
                <div className="flex items-center justify-between opacity-50">
                   <span className="dark:text-foreground/40 text-foreground/70 pl-5">sys.monitor.v4</span>
                   <span className="dark:text-foreground/40 text-foreground/70 pr-5">status.nominal</span>
                </div>
                <div className="flex items-center justify-between opacity-50">
                   <div className="flex items-center gap-1.5 pl-0">
                      {hasHydrated && <GitBranch className="h-3.5 w-3.5 text-primary" />}
                      <span>main*</span>
                   </div>
                   <div className="flex items-center gap-1.5 pr-0">
                      <span className="opacity-60">production</span>
                      {hasHydrated && <CpuIcon className="h-3.5 w-3.5 text-primary" />}
                   </div>
                </div>
             </div>
         </div>
      </div>

      {/* BOTTOM HUD BLOCK */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 px-4 md:px-10 z-20 flex items-center font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.4em] pointer-events-auto cursor-default">
         <div className="relative w-full flex items-center justify-between">
            {/* Wide Desktop Edge: Left (Only XL+) */}
            <span className="hidden xl:block dark:text-foreground/20 text-foreground/40 font-bold opacity-30 hover:opacity-100 transition-opacity duration-300">{`{ node_01 }`}</span>

            {/* Dynamic Inner/Main Corners */}
            <div className="hidden md:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2 w-full xl:max-w-5xl justify-between px-0 xl:px-6 transition-all duration-500">
               <div className="flex items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2">
                     {hasHydrated && <MapPin className="h-4 w-4 text-primary/40" />}
                     <span className="whitespace-nowrap">14.64N / 120.97E</span>
                  </div>
                  <span className="opacity-100 whitespace-nowrap">// caloocan, rp</span>
               </div>
               <div className="flex items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-300">
                  <span className="whitespace-nowrap">{hasHydrated ? phtTime : "--:--:--"} PHT</span>
                  <div className="flex items-center gap-2">
                     <span className="opacity-100 whitespace-nowrap">// active</span>
                     {hasHydrated && <Clock className="h-4 w-4 text-primary" />}
                  </div>
               </div>
            </div>

            {/* Wide Desktop Edge: Right (Only XL+) */}
            <span className="hidden xl:block dark:text-foreground/20 text-foreground/40 font-bold uppercase opacity-30 hover:opacity-100 transition-opacity duration-300">{`rp_node_01`}</span>

            {/* Mobile Version (Surgical 2x2 Logic) */}
            <div className="md:hidden flex flex-col w-full gap-1 opacity-50">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     {hasHydrated && <MapPin className="h-3.5 w-3.5 text-primary/40" />}
                     <span>14.64N / 120.97E</span>
                  </div>
                  <span className="pr-5">caloocan</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="pl-[22px] whitespace-nowrap">{hasHydrated ? phtTime : "--:--:--"} PHT</span>
                  <div className="flex items-center gap-1.5">
                     <span className="opacity-60">active</span>
                     {hasHydrated && <Clock className="h-3.5 w-3.5 text-primary" />}
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. SURGICAL MARGIN-FITTED CONTENT (Margin-Maximized) */}
      <div className="container relative z-10 mx-auto max-w-5xl h-full min-h-[500px] lg:min-h-[650px] flex flex-col justify-center py-12 md:py-24">

        {/* MAIN PROFILE ROW (The Core Identity - Padded) */}
        <div className="px-6 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-24 relative w-full pt-10 pb-12 lg:py-0">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col flex-[1.4] gap-6 md:gap-10 max-w-full"
          >
            <div className="space-y-4 md:space-y-8">
              {/* Premium Greeting Badge (Repositioned Above Identity Row) */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold uppercase tracking-[0.4em] text-primary shadow-sm w-fit backdrop-blur-sm hover:bg-primary/10 transition-all cursor-default leading-none mb-6 md:mb-10 lg:mb-12">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {HERO_CONTENT.greeting}
              </div>

              {/* Identity Row (Logo + Name/Role) */}
              <div className="flex flex-row items-center gap-4 md:gap-8 lg:gap-0 lg:block">
                {/* Mobile-Only Logo (Surgically Centered with Text) */}
                {hasHydrated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:hidden relative w-24 h-24 sm:w-32 sm:h-32 shrink-0"
                  >
                    <Image src="/jiyo-logo.png" alt="Jiyo Logo" fill className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" suppressHydrationWarning />
                  </motion.div>
                )}

                <div className="flex flex-col gap-0 justify-center">
                  <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-display font-medium tracking-tight text-foreground leading-none">
                    {HERO_CONTENT.name}<span className="text-primary italic animate-pulse">.</span>
                  </h1>

                  <div className="min-h-[24px] md:min-h-[44px] flex items-center mt-1">
                    <p className="text-base md:text-2xl lg:text-3xl text-muted-foreground/80 font-light tracking-tight flex items-center leading-none">
                      {displayText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-block w-[1px] md:w-[6px] h-[0.7em] bg-primary/60 ml-2 md:ml-5"
                      />
                    </p>
                  </div>
                </div>
              </div>


              {/* Description (Breathable Width) */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl dark:text-muted-foreground/60 text-muted-foreground font-light max-w-2xl leading-relaxed">
                {HERO_CONTENT.description}
              </p>

              {/* Focus Labels */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1 rounded-full bg-primary/5 border border-primary/10 text-[8.5px] md:text-[9.5px] font-bold uppercase tracking-widest text-muted-foreground/90 back backdrop-blur-sm shadow-sm transition-all hover:bg-primary/20 w-fit leading-none">
                   <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   {HERO_CONTENT.focus}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1 rounded-full bg-secondary/40 border border-border/80 text-[8.5px] md:text-[9.5px] font-bold uppercase tracking-widest text-muted-foreground/50 transition-all hover:text-muted-foreground/90 w-fit">
                   {HERO_CONTENT.learning}
                </div>
              </div>
            </div>

            {/* CTAs & Socials (Surgically Fit Alignment: Side-by-Side) */}
            <div className="flex flex-row items-center gap-6 sm:gap-8 md:gap-14 pt-4 flex-nowrap overflow-visible">
              <motion.a
                ref={buttonRef}
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                href="#contact"
                className="w-fit h-9 md:h-12 px-5 md:px-10 flex items-center justify-center gap-2.5 rounded-full bg-foreground text-background text-[11px] md:text-base font-bold hover:bg-primary transition-all shadow-[0_20px_40px_-5px_rgba(0,0,0,0.3)] hover:shadow-primary/25 whitespace-nowrap shrink-0"
              >
                 Get in touch {hasHydrated && <ArrowRight className="h-3.5 w-3.5 md:h-5 w-5" />}
              </motion.a>

              <div className="flex items-center gap-5 md:gap-10 text-muted-foreground/30 shrink-0">
                <a href={HERO_CONTENT.socials.github} target="_blank" className="hover:text-primary transition-all group">
                  {hasHydrated && <Github className="h-5 w-5 md:h-8 md:w-8 group-hover:scale-110" />}
                </a>
                <a href={HERO_CONTENT.socials.linkedin} target="_blank" className="hover:text-primary transition-all group">
                  {hasHydrated && <Linkedin className="h-5 w-5 md:h-8 md:w-8 group-hover:scale-110" />}
                </a>
                <a href={HERO_CONTENT.cvPath} target="_blank" className="flex items-center gap-2 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] hover:text-primary transition-all group">
                  {hasHydrated && <FileText className="h-5 w-5 md:h-7 md:w-7 group-hover:scale-110" />} 
                  <span className="hidden xs:inline">CV</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Branded Logo (Spatially Aligned) */}
          {hasHydrated && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-1 justify-end items-center relative h-full"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotateY: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative group select-none pointer-events-none"
              >
                <div className="absolute inset-x-12 inset-y-16 bg-primary/10 blur-[80px] md:blur-[100px] rounded-full animate-pulse scale-125 shadow-[0_0_80px_rgba(59,130,246,0.1)]" />
                <div className="relative w-64 h-64 lg:w-[350px] lg:h-[350px] 2xl:w-[480px] 2xl:h-[480px] flex items-center justify-center">
                  <Image src="/jiyo-logo.png" alt="Jiyo Logo" fill className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.2)] p-10" suppressHydrationWarning />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
