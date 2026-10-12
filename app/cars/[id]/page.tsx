import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCar, getCars } from "@/lib/olx"
import { CarDetail } from "@/components/cars/car-detail"

// Keep in sync with REVALIDATE_SECONDS in lib/olx.ts (segment config must be a literal).
export const revalidate = 600

type Props = {
  params: Promise<{ id: string }>
}

// Render each car page on its first visit, then cache it (ISR). Prerendering all
// of them at build time fires a burst of OLX requests and gets rate-limited.
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const car = await getCar(id)
  if (!car) return {}

  const title = `${car.make} ${car.model}`
  const price = car.price ? `${car.price.toLocaleString("de-DE")} KM` : "Cijena na upit"
  const description = `${car.year} · ${car.mileage.toLocaleString("de-DE")} km · ${car.fuelType} · ${car.transmission} — ${price}. CarNext Sarajevo.`
  return {
    title,
    description,
    openGraph: { title, description, images: car.images.slice(0, 1) },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params
  const cars = await getCars()
  const car = cars.find((c) => c.id === id)
  // Sold or removed on OLX → the page disappears too.
  if (!car) notFound()

  // Prefer the same body type, then the closest price.
  const similar = cars
    .filter((c) => c.id !== car.id)
    .sort(
      (a, b) =>
        Number(b.bodyType === car.bodyType) - Number(a.bodyType === car.bodyType) ||
        Math.abs(a.price - car.price) - Math.abs(b.price - car.price)
    )
    .slice(0, 3)

  return <CarDetail car={car} similar={similar} />
}
