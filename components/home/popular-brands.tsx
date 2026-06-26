"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue } from "framer-motion"
import { Container } from "@/components/layout/container"
import { brands } from "@/data/brands"

const brandColors = [
  "from-emerald-500/20 to-emerald-500/5",
  "from-blue-500/20 to-blue-500/5",
  "from-purple-500/20 to-purple-500/5",
  "from-amber-500/20 to-amber-500/5",
  "from-rose-500/20 to-rose-500/5",
  "from-teal-500/20 to-teal-500/5",
  "from-primary/20 to-primary/5",
  "from-cyan-500/20 to-cyan-500/5",
  "from-pink-500/20 to-pink-500/5",
  "from-lime-500/20 to-lime-500/5",
]

const brandLogos = [
  "hover:text-emerald-400",
  "hover:text-blue-400",
  "hover:text-purple-400",
  "hover:text-amber-400",
  "hover:text-rose-400",
  "hover:text-teal-400",
  "hover:text-primary",
  "hover:text-cyan-400",
  "hover:text-pink-400",
  "hover:text-lime-400",
]

function BrandCard({ brand, index }: { brand: (typeof brands)[number]; index: number }) {
  const gradient = brandColors[index % brandColors.length]
  const logoColor = brandLogos[index % brandLogos.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/inventory?make=${brand.slug}`}
        className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[var(--radius)] border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-glass backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/40 hover:shadow-lg sm:p-8"
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${gradient}`}
        />
        <div className="relative flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0">
          <brand.Logo
            className={`h-14 w-14 text-white/40 transition-all duration-500 group-hover:scale-110 sm:h-16 sm:w-16 ${logoColor}`}
          />
        </div>
        <span className="relative text-body-sm font-medium text-white/60 transition-colors duration-500 group-hover:text-white">
          {brand.name}
        </span>
      </Link>
    </motion.div>
  )
}

export function PopularBrands() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)

  return (
    <section className="relative overflow-hidden pb-24 pt-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B]/85 to-[#0B0B0B]" />
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

        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>

        <div className="relative sm:hidden" ref={carouselRef}>
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            dragElastic={0.1}
            dragMomentum
            style={{ x: dragX }}
            className="flex cursor-grab gap-4 active:cursor-grabbing"
          >
            {brands.map((brand, i) => {
              const gradient = brandColors[i % brandColors.length]
              const logoColor = brandLogos[i % brandLogos.length]
              return (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0"
                >
                  <Link
                    href={`/inventory?make=${brand.slug}`}
                    className={`group relative flex w-[140px] flex-col items-center gap-3 overflow-hidden rounded-[var(--radius)] border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-white/40 hover:shadow-lg`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${gradient}`}
                    />
                    <div className="relative flex items-center justify-center transition-all duration-500 grayscale hover:grayscale-0">
                      <brand.Logo
                        className={`h-12 w-12 text-white/40 transition-all duration-500 hover:scale-110 ${logoColor}`}
                      />
                    </div>
                    <span className="relative text-small font-medium text-white/60 transition-colors duration-500 hover:text-white">
                      {brand.name}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0B0B0B] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0B0B0B] to-transparent" />
        </div>
      </Container>
    </section>
  )
}
