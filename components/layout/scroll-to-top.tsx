"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  // Car pages have a sticky call bar at the bottom on mobile
  const hasBottomBar = usePathname().startsWith("/cars/")

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={cn(
            "fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center",
            hasBottomBar && "bottom-24 lg:bottom-6",
            "rounded-full border border-border bg-card text-muted-foreground",
            "shadow-elevated transition-colors hover:border-primary/50 hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
