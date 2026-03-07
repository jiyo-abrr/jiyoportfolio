"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = ["About", "Experience", "Projects", "Skills", "Education", "Contact"];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between glass px-4 md:px-6 py-3 rounded-2xl border-border/40 shadow-xl shadow-black/5 bg-background/60 backdrop-blur-xl">
        {/* Brand with Pop-up Effect */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-lg md:text-xl font-bold tracking-tighter text-foreground">
            <span className="text-primary">{"</"}</span>jiyo.dev
          </span>
        </motion.div>

        {/* Desktop Navigation with Per-Item Pop-up */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item)}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors px-2 py-1"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 glass rounded-2xl border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, item)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="py-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground border-b border-border/50 last:border-0 hover:text-primary transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
