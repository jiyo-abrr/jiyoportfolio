"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const terminalLines = [
    { text: "> GET /requested-page", color: "text-primary" },
    { text: "HTTP/1.1 404 Not Found", color: "text-red-500" },
    { text: "[ERROR]: The resource you are looking for does not exist or has been moved.", color: "text-muted-foreground" },
    { text: "> initiating_recovery_protocol...", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-12">
        <div className="space-y-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl md:text-9xl font-medium tracking-tighter text-foreground/10"
          >
            404
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-light text-muted-foreground tracking-tight"
          >
            System Error: Route Not Found
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs md:text-sm bg-[#0d1117] rounded-xl overflow-hidden border border-border/50 shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1.5 ml-2">
                <TerminalIcon className="w-3 h-3" /> error-handler
              </span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {terminalLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (idx * 0.2) }}
                className={line.color}
              >
                {line.text}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-primary/60 mt-2"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors group"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
