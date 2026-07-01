"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Container } from "./container"
import { Navigation, MobileNav } from "./navigation"
import { Button } from "../ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(11, 11, 11, 0.85)"
            : "rgba(11, 11, 11, 0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
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
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-orange-500/40 group-hover:via-amber-500/30 group-hover:to-yellow-500/20 group-hover:opacity-100" />
                <Image
                  src="/logo.png"
                  alt="CarNext"
                  width={48}
                  height={48}
                  className="relative size-12"
                />
              </div>
              <span className="text-h2 font-bold tracking-tight text-foreground">
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
              <MobileNav />
            </div>
          </div>
        </Container>
      </motion.div>
    </header>
  )
}
