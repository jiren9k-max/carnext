"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Container } from "@/components/layout/container"
import { CarCard } from "@/components/cars/car-card"
import { Button } from "@/components/ui/button"
import { useCars } from "@/hooks/use-cars"

export function FeaturedCars() {
  const { cars } = useCars()
  const featured = cars.filter((c) => !c.badges.includes("prodano")).slice(0, 6)

  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
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

          <div className="mt-6 flex justify-center gap-3">
            {[
              { tag: "Svi", color: "hover:border-primary/30 hover:text-primary" },
              { tag: "Novi", color: "hover:border-emerald-500/30 hover:text-emerald-400" },
              { tag: "Polovni", color: "hover:border-blue-500/30 hover:text-blue-400" },
              { tag: "Električni", color: "hover:border-purple-500/30 hover:text-purple-400" },
            ].map(({ tag, color }) => (
              <button
                key={tag}
                className={`rounded-full border border-border bg-transparent px-4 py-1.5 text-small text-muted-foreground transition-colors ${color}`}
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
