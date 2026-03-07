"use client"

import { SectionWrapper } from "@/components/SectionWrapper";
import { Mail, ArrowRight, Copy, Check, Send, User, MessageSquare, AtSign, Type } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const email = "jeoabarre.dev@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Construct the mailto link with all fields
    const subject = encodeURIComponent(`${formState.subject || 'Project Inquiry'} - from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Small delay for UX feel
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSending(false);
    }, 1000);
  };

  return (
    <SectionWrapper>
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="section-title">06. Contact</span>
              <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-foreground leading-[0.9]">
                Let's start a <br />
                <span className="text-primary italic">conversation.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-md pt-4">
                Have a project in mind or just want to say hi? Fill out the form or reach out directly via email.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 pt-4 md:pt-8">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-500 shadow-sm">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Email me directly</p>
                  <button 
                    onClick={copyToClipboard}
                    suppressHydrationWarning
                    className="text-base md:text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="truncate max-w-[200px] md:max-w-none">{email}</span>
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 opacity-30" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50 max-w-sm">
                <div className="space-y-2">
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Location</p>
                  <p className="text-sm font-medium">Manila, PH</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Socials</p>
                  <div className="flex items-center gap-4">
                     <a href="https://github.com/jiyo-abrr" target="_blank" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">GH</a>
                     <a href="https://www.linkedin.com/in/jeo-abarre" target="_blank" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">LI</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-primary/5 border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                    <User className="w-3 h-3" /> Your Name
                  </label>
                  <input 
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    suppressHydrationWarning
                    className="w-full h-12 md:h-14 bg-background border border-border/50 rounded-xl md:rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                    <AtSign className="w-3 h-3" /> Email Address
                  </label>
                  <input 
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    suppressHydrationWarning
                    className="w-full h-12 md:h-14 bg-background border border-border/50 rounded-xl md:rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                  <Type className="w-3 h-3" /> Subject
                </label>
                <input 
                  required
                  type="text"
                  placeholder="How can I help you?"
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  suppressHydrationWarning
                  className="w-full h-12 md:h-14 bg-background border border-border/50 rounded-xl md:rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Message
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  suppressHydrationWarning
                  className="w-full bg-background border border-border/50 rounded-xl md:rounded-2xl p-6 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 shadow-inner resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSending}
                type="submit"
                suppressHydrationWarning
                className="w-full h-14 md:h-16 bg-foreground text-background rounded-xl md:rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-primary transition-all duration-500 disabled:opacity-50 shadow-xl shadow-primary/10"
              >
                {isSending ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                    />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Constructing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};
