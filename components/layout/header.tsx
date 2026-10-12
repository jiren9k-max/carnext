"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { Container } from "./container"
import { Navigation, MobileNav } from "./navigation"
import { Button } from "../ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX }}
        className="absolute inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-primary via-accent to-primary"
      />
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.85)"
            : "rgba(10, 10, 10, 0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ willChange: "auto" }}
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "backdrop-blur-2xl border-border/50"
            : "backdrop-blur-none border-transparent"
        )}
      >
        <Container>
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative transition-all duration-500 group-hover:scale-110">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-primary/40 group-hover:via-primary/30 group-hover:to-primary/20 group-hover:opacity-100" />
                <Image
                  src="/logo.png"
                  alt="CarNext"
                  width={48}
                  height={48}
                  className="relative size-12"
                />
              </div>
              <span className="font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
                Car<span className="text-primary">Next</span>
              </span>
            </Link>

            <Navigation />

            <div className="flex items-center gap-4">
              <Button variant="glass" size="sm" className="hidden md:inline-flex transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20" asChild>
                <Link href="/prijava">Prijava</Link>
              </Button>
              <Button size="sm" className="hidden md:inline-flex transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20" asChild>
                <Link href="/registracija">Registracija</Link>
              </Button>
              <Suspense fallback={null}>
                <MobileNav />
              </Suspense>
            </div>
          </div>
        </Container>
      </motion.div>
    </header>
  )
}
