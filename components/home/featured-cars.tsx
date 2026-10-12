"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { CarCard } from "@/components/cars/car-card"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Car } from "@/lib/olx"
import { cn } from "@/lib/utils"

const ALL = "Sva vozila"

export function FeaturedCars({ cars }: { cars: Car[] }) {
  const [active, setActive] = useState(ALL)

  // Only offer body types that have at least one car, most common first.
  const counts = cars.reduce<Record<string, number>>((acc, c) => {
    if (c.bodyType) acc[c.bodyType] = (acc[c.bodyType] ?? 0) + 1
    return acc
  }, {})
  const tabs = [ALL, ...Object.keys(counts).sort((a, b) => counts[b] - counts[a])]
  const featured = (active === ALL ? cars : cars.filter((c) => c.bodyType === active)).slice(0, 6)

  return (
    <section className="pb-24 pt-20 md:pb-32 md:pt-28">
      <Container>
        <SectionHeading
          eyebrow="Naša ponuda"
          title="Istaknuta vozila"
          description="Najnovija vozila iz naše ponude. Svako vozilo prolazi provjeru prije prodaje."
          action={
            <Link
              href="/inventory"
              className="group inline-flex items-center gap-2 text-body-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Pogledaj sva vozila
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <div className="mt-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-body-sm transition-colors",
                active === tab
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {tab}
              {tab !== ALL && <span className="ml-1.5 opacity-50">{counts[tab]}</span>}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
