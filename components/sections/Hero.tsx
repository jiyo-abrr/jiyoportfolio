"use client";

import { Github, Linkedin, FileText, MapPin, Clock, GitBranch, Cpu, ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HERO_CONTENT } from "@/lib/data/hero";
import Image from "next/image";

// Philippine Time Hook
const usePHTTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Manila",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};



// === AMBIENT GLOW PULSE ===
const AmbientGlow = () => (
  <>
    <motion.div
      animate={{ opacity: [0.03, 0.07, 0.03] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/8 blur-[150px] rounded-full pointer-events-none"
    />
    <motion.div
      animate={{ opacity: [0.02, 0.05, 0.02] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-primary/6 blur-[120px] rounded-full pointer-events-none"
    />
  </>
);

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const phtTime = usePHTTime();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 80 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  // Glitch effect trigger
  useEffect(() => {
    const trigger = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 280);
    };
    const id = setInterval(trigger, 4500 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setHasHydrated(true);
    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(prev => prev !== mobile ? mobile : prev);
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    checkMobile();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        setButtonPos(dist < 100 ? { x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 } : { x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [mouseX, mouseY, isMobile]);

  useEffect(() => {
    const currentRole = HERO_CONTENT.roles[roleIndex];
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(40 + Math.random() * 30);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(100 + Math.random() * 80);
      }
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2400);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_CONTENT.roles.length);
        setTypingSpeed(500);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    // No bg-background — fully transparent so the page background shows through
    <section className="relative min-h-svh flex flex-col w-full overflow-hidden">

      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft ambient glows */}
        <AmbientGlow />
      </div>

      {/* ── TOP HUD BAR (md+ only) ── */}
      <div className="hidden md:block absolute top-[84px] inset-x-0 z-20 px-8 pointer-events-none">
        <div className={`flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/20 transition-opacity duration-700 ${hasHydrated ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-3">
            <GitBranch className="h-3 w-3 text-primary/35" />
            <span>branch:<span className="text-primary/50 font-bold ml-1">main*</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            <span>sys.online // jeo_dev_v2</span>
          </div>
          <div className="flex items-center gap-3">
            <span>env:<span className="text-primary/50 font-bold ml-1">production</span></span>
            <Cpu className="h-3 w-3 text-primary/35" />
          </div>
        </div>
      </div>

      {/* ── BOTTOM HUD BAR ── */}
      <div className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] md:bottom-5 inset-x-0 z-20 px-4 md:px-8 pointer-events-none">
        <div className={`flex items-center justify-between font-mono text-[9px] md:text-[10px] lg:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.25em] lg:tracking-[0.3em] text-foreground/20 transition-opacity duration-700 ${hasHydrated ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-1.5 md:gap-2">
            <MapPin className="h-3 w-3 text-primary/35 shrink-0" />
            <span>120.97E</span>
            <span className="hidden lg:inline text-foreground/12">// caloocan, rp</span>
          </div>
          <div className="hidden lg:block text-foreground/12">node_01 // rp_grid</div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>{hasHydrated ? phtTime : "--:--:--"} PHT</span>
            <Clock className="h-3 w-3 text-primary/35 shrink-0" />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      {/* Header height: ~72px mobile, ~80px md — add 8px extra breathing room */}
      <div className="container relative z-10 mx-auto max-w-5xl flex-1 flex flex-col justify-center px-5 md:px-6 pt-[82px] md:pt-[100px] pb-12 md:pb-16 lg:pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-16">

          {/* LEFT: TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1
                }
              }
            }}
            className="flex flex-col gap-4 md:gap-6 lg:gap-8 flex-[1.3] w-full"
          >
            {/* Status badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/8 backdrop-blur-md w-fit shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
              </span>
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-primary font-bold">
                {HERO_CONTENT.greeting}
              </span>
            </motion.div>

            {/* Name + Role Row */}
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3 md:gap-5 lg:gap-2">
              {/* Mobile logo */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 12 } }
                  }}
                  className={`md:hidden relative w-22 h-22 sm:w-30 sm:h-30 shrink-0 transition-opacity duration-1000 ${hasHydrated ? "opacity-100" : "opacity-0"}`}
                >
                  {/* Mobile Aura removed per user request */}
                  <Image
                    src="/jiyo-logo.png"
                    alt="Jiyo Logo"
                    fill
                    className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    suppressHydrationWarning
                  />
                </motion.div>

              <div className="min-w-0">
                {/* Name with glitch */}
                <div className="relative overflow-hidden">
                  <h1
                    className={`text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-none transition-all duration-100 ${
                      glitchActive ? "translate-x-[2px] text-primary" : "text-foreground text-shimmer"
                    }`}
                  >
                    {HERO_CONTENT.name}
                    <span className="text-primary">.</span>
                  </h1>
                  <AnimatePresence>
                    {glitchActive && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.05 }}
                          className="absolute inset-0 text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-none text-cyan-400 translate-x-[-3px] translate-y-[2px] select-none pointer-events-none"
                          style={{ clipPath: "inset(20% 0 65% 0)" }}
                        >
                          {HERO_CONTENT.name}.
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.05, delay: 0.05 }}
                          className="absolute inset-0 text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-none text-red-400 translate-x-[3px] translate-y-[-1px] select-none pointer-events-none"
                          style={{ clipPath: "inset(55% 0 15% 0)" }}
                        >
                          {HERO_CONTENT.name}.
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Animated role typewriter */}
                <div className="min-h-[24px] md:min-h-[36px] flex items-center mt-1.5 md:mt-2">
                  <div className="flex items-center gap-1.5 md:gap-2 font-mono">
                    <span className="text-primary/40 text-sm md:text-base select-none">&gt;</span>
                    <p className="text-base md:text-lg lg:text-2xl text-primary/75 font-light tracking-tight leading-none">
                      {displayText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block w-[2px] md:w-[3px] h-[0.75em] bg-primary ml-1 md:ml-1.5 align-middle"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="text-base sm:text-lg lg:text-lg text-foreground/60 font-medium max-w-xl leading-relaxed mt-1"
            >
              A <span className="text-foreground font-bold">Software Developer</span> who builds 
              <span className="text-primary/80 font-semibold px-1">scalable web systems</span>, 
              <span className="text-primary/80 font-semibold px-1">automation tools</span>, and 
              <span className="text-primary/80 font-semibold px-1">intelligent applications</span>.
            </motion.p>

            {/* Tech Focus Tags */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
              }}
              className="flex flex-wrap gap-2"
            >
              <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-1 rounded-md border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5 text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/80">
                <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_6px_rgba(5,150,105,0.4)] dark:shadow-[0_0_6px_rgba(52,211,153,0.6)] shrink-0" />
                {HERO_CONTENT.focus}
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-1 rounded-md border border-primary/25 dark:border-primary/12 bg-primary/8 dark:bg-primary/4 text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-primary/70 dark:text-primary/45">
                <TerminalIcon className="h-2 w-2 md:h-2.5 md:w-2.5 shrink-0" />
                {HERO_CONTENT.learning}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="flex flex-row items-center gap-4 md:gap-8 pt-4 md:pt-6 flex-wrap"
            >
              <motion.a
                ref={buttonRef}
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                href="#contact"
                className="group relative w-fit h-9 md:h-12 px-5 md:px-9 flex items-center justify-center gap-2 rounded-md overflow-hidden font-bold text-[11px] md:text-sm uppercase tracking-widest text-background bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_28px_rgba(59,130,246,0.3)] hover:shadow-[0_0_42px_rgba(59,130,246,0.5)] whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-white/10 blur-xl animate-breathe pointer-events-none" />
                <span className="relative z-10 absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                <span className="relative z-10">Get in touch</span>
                {hasHydrated && <ArrowUpRight className="relative z-10 h-3.5 w-3.5 md:h-4 md:w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              </motion.a>

              <div className={`flex items-center gap-4 md:gap-7 text-foreground/30 transition-opacity duration-1000 ${hasHydrated ? "opacity-100" : "opacity-0"}`}>
                <a href={HERO_CONTENT.socials.github} target="_blank" className="group hover:text-primary transition-all" aria-label="GitHub">
                  <Github className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href={HERO_CONTENT.socials.linkedin} target="_blank" className="group hover:text-primary transition-all" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href={HERO_CONTENT.cvPath} target="_blank" className="group flex items-center gap-2 hover:text-primary transition-all text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.3em]" aria-label="Resume">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                  <span className="inline font-bold">CV</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: LOGO (desktop only) */}
          {hasHydrated && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex flex-1 justify-center items-center relative min-h-[400px] lg:min-h-[500px]"
            >
              {/* Rotating orbit rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] xl:w-[460px] xl:h-[460px] rounded-full border border-primary/8 border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[240px] h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] xl:w-[360px] xl:h-[360px] rounded-full border border-primary/5"
                />

              {/* Glow halo */}
                <div className="absolute w-48 h-48 md:w-60 md:h-60 xl:w-72 xl:h-72 bg-primary/7 blur-[60px] md:blur-[80px] rounded-full" />

              {/* Logo float */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-[360px] xl:h-[360px] 2xl:w-[420px] 2xl:h-[420px]"
                >
                <Image
                  src="/jiyo-logo.png"
                  alt="Jiyo Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.28)] p-4"
                  suppressHydrationWarning
                />
              </motion.div>

              {/* Floating status chips */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-0 xl:right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-background/70 border border-primary/12 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] animate-pulse" />
                <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/45">online</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-0 xl:left-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-background/70 border border-primary/12 backdrop-blur-sm"
              >
                <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/45">v2.0 · prod</span>
              </motion.div>

              {/* Extra code chip on the ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] xl:w-[460px] xl:h-[460px]"
                >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-background/70 border border-primary/12 backdrop-blur-sm">
                  <span className="font-mono text-[7px] text-primary/40 whitespace-nowrap">{ "jiyo.tsx" }</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
