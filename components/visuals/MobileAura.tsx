"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MobileAura = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(prev => prev !== mobile ? mobile : prev);
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    checkMobile();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          x: ["-10%", "10%", "-5%"],
          y: ["-5%", "15%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vw] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)] blur-[40px] md:blur-[80px] pointer-events-none will-change-transform"
      />

      {/* Secondary accent glow */}
      <motion.div
        animate={{
          x: ["20%", "-10%", "10%"],
          y: ["10%", "-5%", "5%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute -bottom-1/4 -right-1/4 w-[120vw] h-[120vw] bg-[radial-gradient(circle_at_center,rgba(99,82,210,0.04),transparent_50%)] blur-[50px] md:blur-[100px] pointer-events-none will-change-transform"
      />

      {/* Subtle scanning lines or digital noise could go here */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
