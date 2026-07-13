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
      "https://d4n0y8dshd77z.cloudfront.net/listings/63580531/lg/img-1726149758-b49a21bff784.jpeg",
    make: "BMW",
    model: "X3 M40D xDrive",
    year: 2019,
    price: 79900,
    id: "13",
  },
  {
    image:
      "https://d4n0y8dshd77z.cloudfront.net/listings/77620739/lg/img-1782394074-1fcbd0b2b9f3.jpeg",
    make: "Land Rover",
    model: "Range Rover Evoque",
    year: 2016,
    price: 32900,
    id: "17",
  },
  {
    image:
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083844-e2ad1197edff.jpeg",
    make: "Peugeot",
    model: "3008 GT Line",
    year: 2019,
    price: 34900,
    id: "2",
  },
  {
    image:
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379654-57f2ce7ba1c0.jpeg",
    make: "Škoda",
    model: "Kamiq 1.0 TSI",
    year: 2021,
    price: 32900,
    id: "1",
  },
  {
    image:
      "https://d4n0y8dshd77z.cloudfront.net/listings/77042619/lg/img-1780404022-5381b73187f6.jpeg",
    make: "Mercedes-Benz",
    model: "A 180",
    year: 2013,
    price: 20900,
    id: "12",
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
    <section className="relative flex min-h-[50svh] md:min-h-svh items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].image}
              alt={`${slides[current].make} ${slides[current].model}`}
              fill
              className="object-cover md:object-center"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]/30" />
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex items-center justify-center py-2`}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"
            }`} />
          </button>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-display font-bold tracking-tight text-white"
        >
          {slides[current].price.toLocaleString("de-DE")} KM
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
            <Link href={`/cars/${slides[current].id}`}>
              Pogledaj detalje
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="group gap-2 border-white/20 text-base text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/inventory">
              Sva vozila
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  )
}
