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
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
    make: "Porsche",
    model: "911 Carrera 4S",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80",
    make: "BMW",
    model: "M5 Competition",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80",
    make: "Mercedes-Benz",
    model: "AMG GT 63 S",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
    make: "Lamborghini",
    model: "Urus Performante",
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

        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-8 z-10 text-right"
          >
            <span className="text-body-sm font-medium text-white/50">
              {slides[current].make} {slides[current].model}
            </span>
          </motion.p>
        </AnimatePresence>
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
