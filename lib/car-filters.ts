import type { Car } from "./olx"

export interface FilterOptions {
  makes: string[]
  fuelTypes: string[]
  transmissions: string[]
  bodyTypes: string[]
  yearRange: { min: number; max: number }
  priceRange: { min: number; max: number }
  mileageRange: { min: number; max: number }
}

const uniqueSorted = (values: string[]) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "bs"))

const roundDown = (n: number, step: number) => Math.floor(n / step) * step
const roundUp = (n: number, step: number) => Math.ceil(n / step) * step

/** Search options built from the cars actually in stock, so no filter leads to an empty list. */
export function getFilterOptions(cars: Car[]): FilterOptions {
  const years = cars.map((c) => c.year).filter(Boolean)
  const prices = cars.map((c) => c.price).filter(Boolean)
  const kms = cars.map((c) => c.mileage)
  const range = (xs: number[], step: number, fallback: { min: number; max: number }) =>
    xs.length ? { min: roundDown(Math.min(...xs), step), max: roundUp(Math.max(...xs), step) } : fallback

  return {
    makes: uniqueSorted(cars.map((c) => c.make)),
    fuelTypes: uniqueSorted(cars.map((c) => c.fuelType)),
    transmissions: uniqueSorted(cars.map((c) => c.transmission)),
    bodyTypes: uniqueSorted(cars.map((c) => c.bodyType)),
    yearRange: range(years, 1, { min: 2000, max: new Date().getFullYear() }),
    priceRange: range(prices, 1000, { min: 0, max: 100000 }),
    mileageRange: range(kms, 10000, { min: 0, max: 300000 }),
  }
}
