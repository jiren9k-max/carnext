"use client"

import { Suspense, useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { CarCard } from "@/components/cars/car-card"
import type { Car } from "@/lib/olx"

const CARS_PER_PAGE = 9
const ALL_FUELS = "Svi"

// "Land Rover", "land-rover" and "Škoda"/"skoda" should all match.
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[šđčćž]/g, (c) => ({ š: "s", đ: "dj", č: "c", ć: "c", ž: "z" })[c] || c)
    .replace(/[\s_]+/g, "-")
const sortOptions = [
  { label: "Najnoviji", value: "newest" },
  { label: "Najjeftiniji", value: "cheapest" },
  { label: "Najskuplji", value: "most_expensive" },
  { label: "Najmanje km", value: "lowest_mileage" },
]

function InventoryContent({ cars }: { cars: Car[] }) {
  const searchParams = useSearchParams()
  const fuelTypes = [ALL_FUELS, ...[...new Set(cars.map((c) => c.fuelType).filter(Boolean))].sort()]
  const [activeFuel, setActiveFuel] = useState(ALL_FUELS)
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...cars]

    const makeParam = searchParams.get("make")
    const fuelParam = searchParams.get("fuel")
    const transmissionParam = searchParams.get("transmission")
    const bodyTypeParam = searchParams.get("bodyType")
    const minYear = searchParams.get("minYear")
    const maxYear = searchParams.get("maxYear")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minMileage = searchParams.get("minMileage")
    const maxMileage = searchParams.get("maxMileage")

    if (makeParam) {
      result = result.filter((c) => normalize(c.make) === normalize(makeParam))
    }
    if (activeFuel !== ALL_FUELS) {
      result = result.filter((c) => c.fuelType === activeFuel)
    }
    if (fuelParam) {
      result = result.filter((c) => c.fuelType === fuelParam)
    }
    if (transmissionParam) {
      result = result.filter((c) => c.transmission === transmissionParam)
    }
    if (bodyTypeParam) {
      result = result.filter((c) => c.bodyType === bodyTypeParam)
    }
    if (minYear) result = result.filter((c) => c.year >= Number(minYear))
    if (maxYear) result = result.filter((c) => c.year <= Number(maxYear))
    if (minPrice) result = result.filter((c) => c.price >= Number(minPrice))
    if (maxPrice) result = result.filter((c) => c.price > 0 && c.price <= Number(maxPrice))
    if (minMileage) result = result.filter((c) => c.mileage >= Number(minMileage))
    if (maxMileage) result = result.filter((c) => c.mileage <= Number(maxMileage))

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.createdAt - a.createdAt)
        break
      case "cheapest":
        result.sort((a, b) => (a.price || Infinity) - (b.price || Infinity))
        break
      case "most_expensive":
        result.sort((a, b) => b.price - a.price)
        break
      case "lowest_mileage":
        result.sort((a, b) => a.mileage - b.mileage)
        break
    }

    return result
  }, [cars, searchParams, activeFuel, sort])

  const totalPages = Math.ceil(filtered.length / CARS_PER_PAGE)
  const paginatedCars = filtered.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [searchParams, activeFuel, sort])

  return (
    <div className="min-h-screen pt-24">
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

          <div className="flex items-center gap-4">
            <span className="text-small text-muted-foreground">
              {filtered.length} vozila
            </span>
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
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-body text-muted-foreground">Nema vozila za prikaz.</p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-small text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex size-9 items-center justify-center rounded-lg border text-small font-medium transition-colors ${
                      page === p
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-small text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  )
}

export function Inventory({ cars }: { cars: Car[] }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-body text-muted-foreground">Učitavanje...</p>
        </div>
      </div>
    }>
      <InventoryContent cars={cars} />
    </Suspense>
  )
}
