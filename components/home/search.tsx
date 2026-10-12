"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search as SearchIcon, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { FilterOptions } from "@/lib/car-filters"

interface Filters {
  make: string
  year: number[]
  price: number[]
  mileage: number[]
  fuel: string
  transmission: string
  bodyType: string
}

const formatPrice = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k KM` : `${v} KM`

const formatMileage = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(0)}k km` : `${v} km`

export function SearchSection({ options }: { options: FilterOptions }) {
  const { makes, fuelTypes, transmissions, bodyTypes, yearRange, priceRange, mileageRange } = options
  const initialFilters: Filters = {
    make: "",
    year: [yearRange.min, yearRange.max],
    price: [priceRange.min, priceRange.max],
    mileage: [mileageRange.min, mileageRange.max],
    fuel: "",
    transmission: "",
    bodyType: "",
  }
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>(initialFilters)

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (filters.make) params.set("make", filters.make)
    if (filters.fuel) params.set("fuel", filters.fuel)
    if (filters.transmission) params.set("transmission", filters.transmission)
    if (filters.bodyType) params.set("bodyType", filters.bodyType)
    if (filters.year[0] !== yearRange.min || filters.year[1] !== yearRange.max) {
      params.set("minYear", String(filters.year[0]))
      params.set("maxYear", String(filters.year[1]))
    }
    if (filters.price[0] !== priceRange.min || filters.price[1] !== priceRange.max) {
      params.set("minPrice", String(filters.price[0]))
      params.set("maxPrice", String(filters.price[1]))
    }
    if (filters.mileage[0] !== mileageRange.min || filters.mileage[1] !== mileageRange.max) {
      params.set("minMileage", String(filters.mileage[0]))
      params.set("maxMileage", String(filters.mileage[1]))
    }
    router.push(`/inventory${params.toString() ? `?${params.toString()}` : ""}`)
  }

  // z-20: the panel overlaps the bottom of the hero and must sit above it to stay clickable
  return (
    <section className="relative z-20 -mt-24 pb-16 md:-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card variant="glass-strong" padding="xl" className="mx-auto max-w-6xl p-6 md:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            <FilterField label="Marka">
              <select
                value={filters.make}
                onChange={(e) => updateFilter("make", e.target.value)}
                className="flex h-9 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/20"
              >
                <option value="" className="bg-background">Sve marke</option>
                {makes.map((m) => (
                  <option key={m} value={m} className="bg-background">{m}</option>
                ))}
              </select>
            </FilterField>

            <FilterField label="Godište">
              <Slider
                value={filters.year}
                onValueChange={(v) => updateFilter("year", v)}
                min={yearRange.min}
                max={yearRange.max}
                step={1}
                formatLabel={(v) => String(v)}
              />
            </FilterField>

            <FilterField label="Cijena">
              <Slider
                value={filters.price}
                onValueChange={(v) => updateFilter("price", v)}
                min={priceRange.min}
                max={priceRange.max}
                step={1000}
                formatLabel={formatPrice}
              />
            </FilterField>

            <FilterField label="Kilometraža">
              <Slider
                value={filters.mileage}
                onValueChange={(v) => updateFilter("mileage", v)}
                min={mileageRange.min}
                max={mileageRange.max}
                step={5000}
                formatLabel={formatMileage}
              />
            </FilterField>

            <FilterField label="Gorivo">
              <Select
                value={filters.fuel}
                onValueChange={(v) => updateFilter("fuel", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sve vrste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sve vrste</SelectItem>
                  {fuelTypes.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField label="Mjenjač">
              <Select
                value={filters.transmission}
                onValueChange={(v) => updateFilter("transmission", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Svi tipovi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Svi tipovi</SelectItem>
                  {transmissions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField label="Karoserija">
              <Select
                value={filters.bodyType}
                onValueChange={(v) => updateFilter("bodyType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Svi tipovi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Svi tipovi</SelectItem>
                  {bodyTypes.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 px-8" onClick={handleSearch}>
              <SearchIcon className="size-4" />
              Pretraži vozila
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={resetFilters}
              className="gap-2 text-muted-foreground"
            >
              <RotateCcw className="size-4" />
              Resetuj filtere
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}

function FilterField({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-small font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}
