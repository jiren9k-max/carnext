"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { CarCard } from "@/components/cars/car-card"
import { demoCars } from "@/data/cars"

const fuelTypes = ["Svi", "Benzin", "Dizel", "Hibrid", "Električni"]
const sortOptions = [
  { label: "Najnoviji", value: "newest" },
  { label: "Najjeftiniji", value: "cheapest" },
  { label: "Najskuplji", value: "most_expensive" },
  { label: "Najmanje km", value: "lowest_mileage" },
]

export default function InventoryPage() {
  const [activeFuel, setActiveFuel] = useState("Svi")
  const [sort, setSort] = useState("newest")

  let filtered = activeFuel === "Svi" ? [...demoCars] : demoCars.filter((c) => c.fuelType === activeFuel)

  switch (sort) {
    case "newest":
      filtered.sort((a, b) => b.year - a.year)
      break
    case "cheapest":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "most_expensive":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "lowest_mileage":
      filtered.sort((a, b) => a.mileage - b.mileage)
      break
  }

  return (
    <main className="min-h-screen pt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <h1 className="text-h1 text-foreground">Sva vozila</h1>
          <p className="mx-auto mt-3 max-w-lg text-body text-muted-foreground">
            Pregledajte kompletnu ponudu vozila iz naše kolekcije.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            {fuelTypes.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFuel(f)}
                className={`rounded-full border px-4 py-1.5 text-small transition-all ${
                  activeFuel === f
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-small text-muted-foreground outline-none transition-colors focus:border-ring/70"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-body text-muted-foreground">Nema vozila za prikaz.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}
