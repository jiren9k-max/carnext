"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1777132577862-e39d7adf9e1e?w=1920&q=80",
    make: "Volkswagen",
    model: "Golf 8",
  },
  {
    image:
      "https://images.unsplash.com/photo-1617631653485-c6c1281c6367?w=1920&q=80",
    make: "Škoda",
    model: "Octavia RS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1698267011298-db52f41a0241?w=1920&q=80",
    make: "Renault",
    model: "Clio V",
  },
  {
    image:
      "https://images.unsplash.com/photo-1751362398745-8794c5ce2187?w=1920&q=80",
    make: "Ford",
    model: "Focus",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].image}
              alt={`${slides[current].make} ${slides[current].model}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]/60" />
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
      >
        <motion.span
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-small text-primary"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          Premijum Auto Marketplace
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-display font-bold tracking-tight text-white"
        >
          Pronađite automobil{" "}
          <span className="text-primary">svojih snova.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-xl text-lead text-white/70"
        >
          Provjerena vozila. Profesionalna usluga. Iskustvo kojem možete vjerovati.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="xl"
            className="group gap-2 text-base"
          >
            <Link href="/inventory">
              Pregledaj vozila
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="group gap-2 border-white/20 text-base text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">
              <Play className="size-4" />
              Kontaktiraj nas
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
    </section>
  )
}
