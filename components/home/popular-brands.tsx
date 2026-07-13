"use client"

import { useEffect, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { Container } from "@/components/layout/container"
import { brands } from "@/data/brands"

const AUTOPLAY_INTERVAL = 3000

const brandGradients = [
  "from-primary/20 to-primary/5",
  "from-primary/15 to-primary/3",
  "from-primary/18 to-primary/4",
  "from-primary/12 to-primary/3",
  "from-primary/20 to-primary/5",
]

export function PopularBrands() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    duration: 30,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL)
    emblaApi.on("pointerDown", () => clearInterval(timer))
    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <section className="relative overflow-hidden pb-24 pt-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-white/10 blur-[150px]" />
        <div className="absolute -right-40 top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-white/5 blur-[150px]" />
        <div className="absolute left-1/2 top-0 size-[400px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
        <span className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] whitespace-nowrap text-[clamp(2rem,8vw,6rem)] font-bold tracking-wider text-white/5 select-none">
          Popularne marke
        </span>
        <span className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] whitespace-nowrap text-[clamp(1rem,4vw,3rem)] font-medium tracking-wider text-white/[0.03] select-none">
          Istražite vozila vodećih svjetskih proizvođača
        </span>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-caption font-semibold text-white">Pouzdane marke</span>
          </div>
          <h2 className="text-h2 text-white">Popularne marke</h2>
          <p className="mx-auto mt-3 max-w-lg text-body text-white/80">
            Istražite vozila vodećih svjetskih proizvođača.
          </p>
        </motion.div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {brands.map((brand, i) => {
                const gradient = brandGradients[i % brandGradients.length]
                return (
                  <div
                    key={brand.id}
                    className="min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 lg:basis-1/5 px-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={`/inventory?make=${brand.slug}`}
                        className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[var(--radius)] border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-glass backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/40 hover:shadow-lg sm:p-8"
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${gradient}`}
                        />
                        <div className="relative flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0">
                          <brand.Logo className="h-14 w-14 transition-all duration-500 group-hover:scale-110 sm:h-16 sm:w-16 opacity-70 group-hover:opacity-100" />
                        </div>
                        <span className="relative text-body-sm font-medium text-white/60 transition-colors duration-500 group-hover:text-white">
                          {brand.name}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0A0A0A]/80 text-white backdrop-blur-sm transition-colors hover:bg-[#0A0A0A] hover:border-white/40"
            aria-label="Prethodna marka"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 flex size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0A0A0A]/80 text-white backdrop-blur-sm transition-colors hover:bg-[#0A0A0A] hover:border-white/40"
            aria-label="Sljedeća marka"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="size-2 rounded-full bg-white/20 transition-colors hover:bg-white/50"
              aria-label={`Idi na marku ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
