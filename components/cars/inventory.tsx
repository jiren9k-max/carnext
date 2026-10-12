"use client"

import { Suspense, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { Container } from "@/components/layout/container"
import { CarCard } from "@/components/cars/car-card"
import type { Car } from "@/lib/olx"
import { cn } from "@/lib/utils"

const CARS_PER_PAGE = 12

const sortOptions = [
  { label: "Najnovije objavljeno", value: "newest" },
  { label: "Cijena: od najniže", value: "cheapest" },
  { label: "Cijena: od najviše", value: "most_expensive" },
  { label: "Najmanje kilometara", value: "lowest_mileage" },
  { label: "Najnovije godište", value: "year" },
]

// "Land Rover", "land-rover" and "Škoda"/"skoda" should all match.
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[šđčćž]/g, (c) => ({ š: "s", đ: "dj", č: "c", ć: "c", ž: "z" })[c] || c)
    .replace(/[\s_]+/g, "-")

const uniqueSorted = (values: string[]) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "bs"))

const fmt = (n: number) => n.toLocaleString("de-DE")

// Range filters set from the homepage search, shown as removable chips.
const rangeChips = [
  { min: "minYear", max: "maxYear", label: (a: string, b: string) => `Godište ${a}–${b}` },
  { min: "minPrice", max: "maxPrice", label: (a: string, b: string) => `${fmt(+a)}–${fmt(+b)} KM` },
  { min: "minMileage", max: "maxMileage", label: (a: string, b: string) => `${fmt(+a)}–${fmt(+b)} km` },
]

type Update = (changes: Record<string, string | null>) => void

function filterCars(cars: Car[], p: URLSearchParams) {
  let result = [...cars]
  const q = p.get("q")?.trim().toLowerCase()
  const make = p.get("make")
  const num = (key: string) => (p.get(key) ? Number(p.get(key)) : null)

  if (q) result = result.filter((c) => `${c.make} ${c.model} ${c.title}`.toLowerCase().includes(q))
  if (make) result = result.filter((c) => normalize(c.make) === normalize(make))
  for (const key of ["fuel", "transmission", "bodyType"] as const) {
    const v = p.get(key)
    const field = key === "fuel" ? "fuelType" : key
    if (v) result = result.filter((c) => c[field] === v)
  }
  const [minYear, maxYear] = [num("minYear"), num("maxYear")]
  const [minPrice, maxPrice] = [num("minPrice"), num("maxPrice")]
  const [minKm, maxKm] = [num("minMileage"), num("maxMileage")]
  if (minYear !== null) result = result.filter((c) => c.year >= minYear)
  if (maxYear !== null) result = result.filter((c) => c.year <= maxYear)
  // "Price on request" cars (price 0) only show when no price range is set.
  if (minPrice !== null) result = result.filter((c) => c.price >= minPrice)
  if (maxPrice !== null) result = result.filter((c) => c.price > 0 && c.price <= maxPrice)
  if (minKm !== null) result = result.filter((c) => c.mileage >= minKm)
  if (maxKm !== null) result = result.filter((c) => c.mileage <= maxKm)

  switch (p.get("sort")) {
    case "cheapest":
      result.sort((a, b) => (a.price || Infinity) - (b.price || Infinity))
      break
    case "most_expensive":
      result.sort((a, b) => (b.price || -1) - (a.price || -1))
      break
    case "lowest_mileage":
      result.sort((a, b) => a.mileage - b.mileage)
      break
    case "year":
      result.sort((a, b) => b.year - a.year)
      break
    default:
      result.sort((a, b) => b.createdAt - a.createdAt)
  }
  return result
}

function FilterSelect({
  label,
  value,
  options,
  allLabel,
  onChange,
}: {
  label: string
  value: string
  options: string[] | { label: string; value: string }[]
  allLabel?: string
  onChange: (v: string) => void
}) {
  const opts = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o))
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full cursor-pointer appearance-none rounded-full border bg-transparent pl-4 pr-10 text-body-sm outline-none transition-colors focus-visible:border-ring/70",
          value ? "border-foreground/40 text-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
        )}
      >
        {allLabel !== undefined && (
          <option value="" className="bg-background">
            {allLabel}
          </option>
        )}
        {opts.map((o) => (
          <option key={o.value} value={o.value} className="bg-background text-foreground">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </label>
  )
}

function InventoryView({ cars, params, update }: { cars: Car[]; params: URLSearchParams; update: Update }) {
  const gridTop = useRef<HTMLDivElement>(null)
  const filtered = useMemo(() => filterCars(cars, params), [cars, params])

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARS_PER_PAGE))
  const page = Math.min(Math.max(1, Number(params.get("strana")) || 1), totalPages)
  const shown = filtered.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE)

  const makes = uniqueSorted(cars.map((c) => c.make))
  const fuels = uniqueSorted(cars.map((c) => c.fuelType))
  const transmissions = uniqueSorted(cars.map((c) => c.transmission))
  const bodyTypes = uniqueSorted(cars.map((c) => c.bodyType))
  // Brand links use slugs ("land-rover"); show the matching make in the dropdown.
  const makeValue = makes.find((m) => normalize(m) === normalize(params.get("make") ?? "")) ?? ""

  const chips = rangeChips.filter((r) => params.get(r.min) && params.get(r.max))
  const activeCount =
    ["q", "make", "fuel", "transmission", "bodyType"].filter((k) => params.get(k)).length + chips.length

  // Any filter change goes back to page 1.
  const set = (changes: Record<string, string | null>) => update({ ...changes, strana: null })
  const clearAll = () =>
    update(Object.fromEntries([...params.keys()].filter((k) => k !== "sort").map((k) => [k, null])))

  const goToPage = (p: number) => {
    update({ strana: p > 1 ? String(p) : null })
    gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="pb-24 pt-28 md:pt-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="flex items-center gap-3 text-caption font-semibold text-primary">
            <span className="h-px w-8 bg-primary" />
            Ponuda
          </p>
          <h1 className="mt-4 text-h1 text-foreground">Sva vozila</h1>
          <p className="mt-4 text-lead text-muted-foreground">
            {cars.length} vozila trenutno u ponudi. Svako vozilo možete pogledati uživo u našem showroomu na Ilidži.
          </p>
        </motion.div>

        {/* Toolbar */}
        <div ref={gridTop} className="mt-10 scroll-mt-28 space-y-4 border-y border-white/[0.08] py-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
            <label className="relative block sm:col-span-2 lg:col-span-1">
              <span className="sr-only">Pretraga</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={params.get("q") ?? ""}
                onChange={(e) => set({ q: e.target.value || null })}
                placeholder="Pretraži marku ili model…"
                className="h-11 w-full rounded-full border border-border bg-transparent pl-11 pr-4 text-body-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-ring/70"
              />
            </label>
            <FilterSelect label="Marka" value={makeValue} options={makes} allLabel="Sve marke" onChange={(v) => set({ make: v || null })} />
            <FilterSelect label="Gorivo" value={params.get("fuel") ?? ""} options={fuels} allLabel="Svo gorivo" onChange={(v) => set({ fuel: v || null })} />
            <FilterSelect label="Mjenjač" value={params.get("transmission") ?? ""} options={transmissions} allLabel="Svi mjenjači" onChange={(v) => set({ transmission: v || null })} />
            <FilterSelect label="Karoserija" value={params.get("bodyType") ?? ""} options={bodyTypes} allLabel="Sve karoserije" onChange={(v) => set({ bodyType: v || null })} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body-sm text-foreground">
                <span className="font-semibold">{filtered.length}</span>{" "}
                <span className="text-muted-foreground">{filtered.length === 1 ? "vozilo" : "vozila"}</span>
              </span>
              {chips.map((r) => (
                <button
                  key={r.min}
                  onClick={() => set({ [r.min]: null, [r.max]: null })}
                  className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-small text-foreground transition-colors hover:bg-white/10"
                >
                  {r.label(params.get(r.min)!, params.get(r.max)!)}
                  <X className="size-3.5 text-muted-foreground" />
                </button>
              ))}
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-small text-primary transition-colors hover:text-primary/80">
                  Očisti filtere
                </button>
              )}
            </div>
            <div className="w-full sm:w-60">
              <FilterSelect label="Sortiranje" value={params.get("sort") ?? "newest"} options={sortOptions} onChange={(v) => update({ sort: v === "newest" ? null : v, strana: null })} />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-h4 text-foreground">Nema vozila za odabrane filtere</p>
            <p className="mt-2 text-body text-muted-foreground">Probajte ukloniti neki filter ili nas pozovite — možda imamo nešto što još nije objavljeno.</p>
            <button onClick={clearAll} className="mt-6 rounded-full border border-border px-5 py-2.5 text-body-sm text-foreground transition-colors hover:border-foreground/40">
              Prikaži sva vozila
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Stranice">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Prethodna stranica"
                  className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="size-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    aria-current={p === page ? "page" : undefined}
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full text-body-sm font-medium tabular-nums transition-colors",
                      p === page ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Sljedeća stranica"
                  className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight className="size-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </Container>
    </div>
  )
}

/** Filters live in the URL (shareable links, homepage search lands here). */
function InventoryFromUrl({ cars }: { cars: Car[] }) {
  const searchParams = useSearchParams()
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams])

  const update: Update = (changes) => {
    const next = new URLSearchParams(searchParams.toString())
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    const qs = next.toString()
    // Native history API: Next syncs useSearchParams without a server round trip.
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname)
  }

  return <InventoryView cars={cars} params={params} update={update} />
}

const noParams = new URLSearchParams()

export function Inventory({ cars }: { cars: Car[] }) {
  // The server-rendered fallback shows the full, unfiltered list (no spinner).
  return (
    <Suspense fallback={<InventoryView cars={cars} params={noParams} update={() => {}} />}>
      <InventoryFromUrl cars={cars} />
    </Suspense>
  )
}
