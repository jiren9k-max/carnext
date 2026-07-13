"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Container } from "@/components/layout/container"
import { CarCard } from "@/components/cars/car-card"
import { Button } from "@/components/ui/button"
import { demoCars } from "@/data/cars"

export function FeaturedCars() {
  const [activeTag, setActiveTag] = useState("Svi")
  const available = demoCars.filter((c) => !c.badges.includes("prodano"))
  const featured = activeTag === "Svi" ? available.slice(0, 6)
    : activeTag === "Novi" ? available.filter((c) => c.badges.includes("novo")).slice(0, 6)
    : activeTag === "Polovni" ? available.filter((c) => !c.badges.includes("novo")).slice(0, 6)
    : activeTag === "Električni" ? available.filter((c) => c.fuelType === "Električni").slice(0, 6)
    : available.slice(0, 6)

  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24 before:absolute before:inset-x-[10%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-80 rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-80 rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[150px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-caption text-primary">Istaknuta vozila</span>
          </div>
          <h2 className="text-h2 text-foreground">Istaknuta vozila</h2>
          <p className="mx-auto mt-3 max-w-lg text-body text-muted-foreground">
            Ručno odabrani premium automobili iz naše kolekcije. Svako vozilo
            prolazi rigoroznu provjeru kvaliteta.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { tag: "Svi", active: "border-primary/50 text-primary bg-primary/10" },
                { tag: "Novi", active: "border-foreground/30 text-foreground/80 bg-foreground/10" },
                { tag: "Polovni", active: "border-muted-foreground/30 text-muted-foreground bg-muted-foreground/10" },
                { tag: "Električni", active: "border-primary/30 text-primary/70 bg-primary/8" },
              ].map(({ tag, active }) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-4 py-1.5 text-small transition-colors ${
                  activeTag === tag
                    ? active
                    : "border-border bg-transparent text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-3 md:mt-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="inline-flex shrink-0 gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Link href="/inventory">
                Pogledaj sva vozila
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>


      </Container>
    </section>
  )
}
