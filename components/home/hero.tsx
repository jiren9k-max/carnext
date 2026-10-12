"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { demoCars } from "@/data/cars"

const SLIDE_MS = 7000

const slides = [
  {
    image:
      "https://d4n0y8dshd77z.cloudfront.net/listings/63580531/lg/img-1726149758-b49a21bff784.jpeg",
    make: "BMW",
    model: "X3 M40d xDrive",
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

const ease = [0.16, 1, 0.3, 1] as const

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const pad = (n: number) => String(n).padStart(2, "0")

export function Hero() {
  const [current, setCurrent] = useState(0)
  const reduceMotion = useReducedMotion()

  // Restart the timer whenever the slide changes, so manual navigation
  // gets a full interval and the progress bar stays in sync.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, SLIDE_MS)
    return () => clearTimeout(timer)
  }, [current])

  const go = (dir: 1 | -1) =>
    setCurrent((prev) => (prev + dir + slides.length) % slides.length)

  const slide = slides[current]
  const car = demoCars.find((c) => c.id === slide.id)
  const specs = [
    String(slide.year),
    car && `${car.mileage.toLocaleString("de-DE")} km`,
    car?.fuelType,
    car?.transmission,
  ].filter(Boolean)

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden md:min-h-svh">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: reduceMotion ? 1 : 1.08 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.2, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={`${slide.make} ${slide.model}`}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Keeps the header readable over bright photos */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0A0A0A]/80 to-transparent" />
        {/* Dark side for the text column */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/55 to-transparent md:via-[#0A0A0A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      </div>

      <Container className="relative z-10 pb-44 pt-32 md:pb-56">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-2xl"
          >
            <motion.p
              variants={itemVariants}
              className="flex items-center gap-3 text-caption font-semibold text-primary"
            >
              <span className="h-px w-8 bg-primary" />
              Istaknuto vozilo
            </motion.p>

            <motion.h1 variants={itemVariants} className="mt-5">
              <span className="block text-h4 font-medium text-white/60">
                {slide.make}
              </span>
              <span className="mt-1 block text-display text-white">
                {slide.model}
              </span>
            </motion.h1>

            <motion.ul
              variants={itemVariants}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-white/60"
            >
              {specs.map((s, i) => (
                <li key={i} className="flex items-center gap-3">
                  {i > 0 && <span className="size-1 rounded-full bg-white/30" />}
                  {s}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="text-caption text-white/50">Cijena</p>
              <p className="mt-1 text-h2 font-bold tracking-tight text-white">
                {slide.price.toLocaleString("de-DE")}{" "}
                <span className="text-primary">KM</span>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="xl" className="group gap-2 text-base">
                <Link href={`/cars/${slide.id}`}>
                  Pogledaj vozilo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/20 bg-white/5 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              >
                <Link href="/inventory">Sva vozila</Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-32 z-10 md:bottom-40">
        <Container className="flex items-center justify-end gap-6">
          <span className="hidden font-mono text-body-sm tabular-nums text-white/60 md:block">
            <span className="text-white">{pad(current + 1)}</span> / {pad(slides.length)}
          </span>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="py-3"
                aria-label={`Vozilo ${i + 1}`}
                aria-current={i === current}
              >
                <span className="relative block h-0.5 w-8 overflow-hidden rounded-full bg-white/20 md:w-12">
                  {i < current && <span className="absolute inset-0 bg-white/60" />}
                  {i === current && (
                    <motion.span
                      key={current}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-primary"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => go(-1)}
              aria-label="Prethodno vozilo"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Sljedeće vozilo"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  )
}
