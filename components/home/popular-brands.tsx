"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue } from "framer-motion"
import { Container } from "@/components/layout/container"
import { brands } from "@/data/brands"

const brandBorderColors = [
  "hover:border-emerald-500/30",
  "hover:border-blue-500/30",
  "hover:border-purple-500/30",
  "hover:border-amber-500/30",
  "hover:border-rose-500/30",
  "hover:border-teal-500/30",
  "hover:border-primary/30",
  "hover:border-cyan-500/30",
  "hover:border-pink-500/30",
  "hover:border-lime-500/30",
]

function BrandCard({ brand, index }: { brand: (typeof brands)[number]; index: number }) {
  const borderColor = brandBorderColors[index % brandBorderColors.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/inventory?make=${brand.slug}`}
        className={`group flex flex-col items-center justify-center gap-4 rounded-[var(--radius)] border border-border bg-card p-6 transition-all duration-500 hover:shadow-hover sm:p-8 ${borderColor}`}
      >
        <div className="flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0">
          <brand.Logo className="h-14 w-14 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-foreground sm:h-16 sm:w-16" />
        </div>

        <span className="text-body-sm font-medium text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
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
    <section className="relative overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/2 size-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 size-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="text-caption text-primary">Pouzdane marke</span>
          </div>
          <h2 className="text-h2 text-foreground">Popularne marke</h2>
          <p className="mx-auto mt-3 max-w-lg text-body text-muted-foreground">
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
            {brands.map((brand, i) => (
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
                  className={`flex w-[140px] flex-col items-center gap-3 rounded-[var(--radius)] border border-border bg-card p-5 transition-all duration-500 hover:shadow-hover ${brandBorderColors[i % brandBorderColors.length]}`}
                >
                  <div className="flex items-center justify-center transition-all duration-500 grayscale hover:grayscale-0">
                    <brand.Logo className="h-12 w-12 text-muted-foreground transition-all duration-500 hover:scale-110 hover:text-foreground" />
                  </div>
                  <span className="text-small font-medium text-muted-foreground transition-colors duration-500 hover:text-foreground">
                    {brand.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0B0B0B] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0B0B0B] to-transparent" />
        </div>
      </Container>
    </section>
  )
}
