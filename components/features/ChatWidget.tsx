"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, User, Loader2, Mail } from "lucide-react"

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Jeo's virtual assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (text?: string) => {
    const messageToSend = text || input
    if (!messageToSend.trim()) return

    const userMessage = { role: "user", content: messageToSend }
    setMessages(prev => [...prev, userMessage])
    if (!text) setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = "That's a great question! Jeo specializes in high-concurrency systems and full-stack development. Would you like to see his projects or contact him directly?"
      
      const lowerInput = messageToSend.toLowerCase()
      if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
        response = "Jeo is proficient in Python, TypeScript, React, Next.js, FastAPI, and more. He also has experience with message brokers like RabbitMQ and Kafka for high-concurrency systems."
      } else if (lowerInput.includes("project") || lowerInput.includes("work")) {
        response = "His key projects include TAKLUBAN (an NLP profanity detector) and W.AIS (a financial AI ecosystem). Check out the 'Selected Works' section for more!"
      } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("hire")) {
        response = "You can reach Jeo at jeoabarre.dev@gmail.com. I've also added a quick button below to open your email client with a pre-filled template!"
      } else if (lowerInput.includes("education") || lowerInput.includes("school")) {
        response = "Jeo graduated Magna Cum Laude from the Polytechnic University of the Philippines with a BS in Computer Science. He was also a DOST-SEI Scholar."
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  const mailtoLink = `mailto:jeoabarre.dev@gmail.com?subject=Project Inquiry - [Your Name]&body=Hi Jeo,%0D%0A%0D%0AI'm reaching out regarding...`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] md:h-[550px] glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border-primary/20"
          >
            <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-tight text-foreground">System Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary/80 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-hide bg-background/50"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full shrink-0 flex items-center justify-center ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border/50"
                    }`}>
                      {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-3 md:p-4 rounded-[1.25rem] md:rounded-[1.5rem] text-xs md:text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/10" 
                        : "bg-background/80 text-foreground rounded-tl-none border border-border/50 shadow-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="p-4 rounded-[1.5rem] rounded-tl-none bg-background/80 border border-border/50 flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 rounded-full bg-primary" />
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-primary" />
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-background/30 border-t border-border/50">
              <button 
                onClick={() => handleSend("Tell me about your skills")}
                className="shrink-0 px-3 py-1.5 rounded-full border border-border/50 bg-secondary/30 text-[10px] uppercase tracking-widest font-bold hover:bg-primary/10 hover:border-primary/30 transition-all text-foreground"
              >
                Skills
              </button>
              <button 
                onClick={() => handleSend("Show me your projects")}
                className="shrink-0 px-3 py-1.5 rounded-full border border-border/50 bg-secondary/30 text-[10px] uppercase tracking-widest font-bold hover:bg-primary/10 hover:border-primary/30 transition-all text-foreground"
              >
                Projects
              </button>
              <a 
                href={mailtoLink}
                className="shrink-0 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              >
                <Mail className="w-3 h-3" /> Email Jeo
              </a>
            </div>

            <div className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-md">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Jeo..."
                  className="w-full bg-background border border-border/50 rounded-full px-6 py-3 pr-14 text-sm focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-foreground text-background" : "bg-primary text-primary-foreground ring-4 ring-primary/10"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-background rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}
