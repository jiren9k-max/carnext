"use client"

import { useState } from "react"
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
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  makes,
  models,
  fuelTypes,
  transmissions,
  drivetrains,
  bodyTypes,
  locations,
  yearRange,
  priceRange,
  mileageRange,
} from "@/data/filters"

interface Filters {
  make: string
  model: string
  year: number[]
  price: number[]
  mileage: number[]
  fuel: string
  transmission: string
  drivetrain: string
  bodyType: string
  location: string
}

const initialFilters: Filters = {
  make: "",
  model: "",
  year: [yearRange.min, yearRange.max],
  price: [priceRange.min, priceRange.max],
  mileage: [mileageRange.min, mileageRange.max],
  fuel: "",
  transmission: "",
  drivetrain: "",
  bodyType: "",
  location: "",
}

const formatPrice = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k KM` : `${v} KM`

const formatMileage = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(0)}k km` : `${v} km`

export function SearchSection() {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [selectedMake, setSelectedMake] = useState("")

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    if (key === "make") {
      setSelectedMake(value as string)
      setFilters((prev) => ({ ...prev, model: "" }))
    }
  }

  const resetFilters = () => {
    setFilters(initialFilters)
    setSelectedMake("")
  }

  const availableModels = selectedMake ? models[selectedMake] || [] : []

  return (
    <section className="relative -mt-24 pb-16 md:-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card variant="glass-strong" padding="xl" className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            <FilterField label="Marka">
              <Select
                value={filters.make}
                onValueChange={(v) => updateFilter("make", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sve marke" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sve marke</SelectItem>
                  {makes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField label="Model">
              <Select
                value={filters.model}
                onValueChange={(v) => updateFilter("model", v)}
                disabled={!selectedMake}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedMake ? "Svi modeli" : "Izaberite marku"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Svi modeli</SelectItem>
                  {availableModels.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <FilterField label="Pogon">
              <Select
                value={filters.drivetrain}
                onValueChange={(v) => updateFilter("drivetrain", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Svi tipovi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Svi tipovi</SelectItem>
                  {drivetrains.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
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

            <FilterField label="Lokacija" className="md:col-span-2 lg:col-span-1">
              <Select
                value={filters.location}
                onValueChange={(v) => updateFilter("location", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sve lokacije" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sve lokacije</SelectItem>
                  {locations.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 px-8">
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
