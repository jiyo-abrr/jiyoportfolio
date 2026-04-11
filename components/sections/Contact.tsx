"use client"

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Mail, ArrowRight, Copy, Check, Send, User, MessageSquare, AtSign, Type } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_CONTENT } from "@/lib/data/contact";

const CornerBracket = ({ position, size = "w-4 h-4" }: { position: "tl" | "tr" | "bl" | "br", size?: string }) => {
  const styles = {
    tl: "top-[-1.5px] left-[-1.5px] border-t-2 border-l-2",
    tr: "top-[-1.5px] right-[-1.5px] border-t-2 border-r-2",
    bl: "bottom-[-1.5px] left-[-1.5px] border-b-2 border-l-2",
    br: "bottom-[-1.5px] right-[-1.5px] border-b-2 border-r-2",
  };
  return <div className={`absolute ${size} border-primary/40 ${styles[position]} z-20`} />;
};

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [hasHydrated, setHasHydrated] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTACT_CONTENT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("Web3Forms Access Key is missing! Check your .env.local file or Vercel settings.");
      setStatus("error");
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          from_name: "Portfolio Contact Form"
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <SectionWrapper>
      <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="space-y-14 md:space-y-32">
          {/* Section Header (Consistent with others) */}
          <span className="section-title">
            {CONTACT_CONTENT.subtitle}
          </span>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-28 max-w-7xl mx-auto items-stretch">
            
            {/* Left Column: Info & Headers */}
            <div className="space-y-12 lg:space-y-16 pt-4 flex flex-col">
              <div className="space-y-6">
                <h2 className="text-[clamp(2.5rem,8vw,4.2rem)] font-bold font-display tracking-tight text-foreground leading-[1] uppercase flex flex-col">
                  <span>LET'S START A</span>
                  <span className="text-primary italic">CONVERSATION.</span>
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm lg:text-base font-light leading-relaxed opacity-70">
                  {CONTACT_CONTENT.description}
                </p>
              </div>

              {/* Tactical Info Blocks - Pushed to bottom of its container if needed, but space-y manages it */}
              <div className="space-y-10 mt-auto lg:pt-8">
                {/* Email Block */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary/10 border border-primary/20 flex items-center justify-center relative flex-shrink-0">
                    <CornerBracket position="tl" size="w-3 h-3" />
                    <CornerBracket position="br" size="w-3 h-3" />
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-2 overflow-hidden">
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">Direct_COM</p>
                    <button 
                      onClick={copyToClipboard}
                      className="text-sm md:text-xl font-medium hover:text-primary transition-colors flex items-center gap-3 font-mono truncate"
                    >
                      <span className="truncate">{CONTACT_CONTENT.email}</span>
                      {hasHydrated && (copied ? <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <Copy className="w-4 h-4 opacity-20 flex-shrink-0" />)}
                    </button>
                  </div>
                </div>

                {/* Location & Socials Grid */}
                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-border/20 max-w-lg">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">Location_NODE</p>
                    <p className="text-sm md:text-base font-medium font-mono whitespace-nowrap text-foreground">{CONTACT_CONTENT.location}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">Social_LINKS</p>
                    <div className="flex items-center gap-6">
                      {hasHydrated && CONTACT_CONTENT.socials.map((social) => (
                        <a 
                          key={social.label}
                          href={social.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm md:text-base font-medium text-foreground hover:text-primary transition-colors font-mono uppercase"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Large Terminal Form Card */}
            <div className="relative group/form w-full h-full">
              {/* Tactical Corner Accents */}
              <CornerBracket position="tl" size="w-6 h-6" />
              <CornerBracket position="tr" size="w-6 h-6" />
              <CornerBracket position="bl" size="w-6 h-6" />
              <CornerBracket position="br" size="w-6 h-6" />
              
              {/* HUD Metadata Labels */}
              <div className="bg-secondary/10 backdrop-blur-2xl rounded-none p-5 md:p-8 border border-primary/10 relative overflow-hidden h-full flex flex-col">
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col h-full space-y-5">
                  {/* Triple Row Inputs */}
                  <div className="flex flex-col h-full space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                        Full Name
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="Your full name"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        suppressHydrationWarning
                        className="w-full h-11 md:h-12 bg-background/20 border border-border/40 rounded-none px-5 md:px-6 text-xs md:text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/15"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                        Email Address
                      </label>
                      <input 
                        required
                        type="email"
                        placeholder="Your email address"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        suppressHydrationWarning
                        className="w-full h-11 md:h-12 bg-background/20 border border-border/40 rounded-none px-5 md:px-6 text-xs md:text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/15"
                      />
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                        Message
                      </label>
                      <textarea 
                        required
                        placeholder="How can I help you?"
                        value={formState.message}
                        onChange={(e) => {
                          setFormState({...formState, message: e.target.value});
                          const target = e.target as HTMLTextAreaElement;
                          if (target.scrollHeight > target.clientHeight) {
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }
                        }}
                        suppressHydrationWarning
                        className="w-full flex-1 bg-background/20 border border-border/40 rounded-none p-4 md:p-5 text-xs md:text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/15 resize-none min-h-[120px]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.005, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
                      whileTap={{ scale: 0.995 }}
                      disabled={isSending}
                      type="submit"
                      suppressHydrationWarning
                      className="w-full h-14 md:h-16 bg-cyan-400 text-[#0a0a0a] rounded-none font-bold flex items-center justify-center gap-4 hover:bg-cyan-300 transition-all duration-300 disabled:opacity-50 relative group/btn"
                    >
                      {isSending ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full"
                          />
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-center">Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {status !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-4 md:p-5 rounded-none text-center text-[10px] font-bold uppercase tracking-[0.3em] border ${
                          status === "success" 
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                      >
                        {status === "success" ? "// STATUS: SUCCESS" : "// STATUS: ERROR"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};
