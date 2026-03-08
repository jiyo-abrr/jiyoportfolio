"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  // Use resolvedTheme which handles 'system' correctly
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
      className="relative w-16 h-8 rounded-full bg-secondary/50 border border-border/50 p-1 flex items-center transition-colors hover:border-primary/30"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-background border border-border/50 shadow-sm flex items-center justify-center z-10"
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-primary" />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" />
        )}
      </motion.div>
      <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
        <Sun className={`h-3 w-3 ${isDark ? 'text-muted-foreground/30' : 'opacity-0'}`} />
        <Moon className={`h-3 w-3 ${!isDark ? 'text-muted-foreground/30' : 'opacity-0'}`} />
      </div>
    </button>
  )
}
