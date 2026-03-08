"use client";

import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

export const Terminal = () => {
  const commands = [
    { label: "> jiyo --status", result: "[SYSTEM]: Operating at 100% efficiency" },
    { label: "> jiyo --skills", result: "[STACK]: Next.js, FastAPI, RabbitMQ, Docker" },
    { label: "> jiyo --focus", result: "[CURRENT]: Distributed Systems & High-Concurrency Architecture" },
    { label: "> jiyo --philosophy", result: "[GOAL]: Building resilient systems that bridge industrial needs and scalable software." }
  ];

  return (
    <div className="w-full font-mono text-xs md:text-sm bg-[#0d1117] rounded-xl overflow-hidden border border-border/50 shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1.5 ml-2">
            <TerminalIcon className="w-3 h-3" /> system-terminal
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground/30">zsh</div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 space-y-4">
        {commands.map((cmd, idx) => (
          <div key={idx} className="space-y-1.5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="text-primary/90 font-bold"
            >
              {cmd.label}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: (idx * 0.2) + 0.1 }}
              className="text-muted-foreground pl-4 border-l border-primary/20"
            >
              {cmd.result}
            </motion.div>
          </div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-primary/60 ml-0.5 mt-2"
        />
      </div>
    </div>
  );
};
