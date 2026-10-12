import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { demoCars } from "@/data/cars"
import { CarDetail } from "@/components/cars/car-detail"

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return demoCars.map((car) => ({ id: car.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const car = demoCars.find((c) => c.id === id)
  if (!car) return {}

  const title = `${car.make} ${car.model}`
  const description = `${car.year} · ${car.mileage.toLocaleString("de-DE")} km · ${car.fuelType} · ${car.transmission} — ${car.price.toLocaleString("de-DE")} KM. CarNext Sarajevo.`
  return {
    title,
    description,
    openGraph: { title, description, images: car.images.slice(0, 1) },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params
  const car = demoCars.find((c) => c.id === id)
  if (!car) notFound()

  // Prefer the same body type, then the closest price.
  const similar = demoCars
    .filter((c) => c.id !== car.id)
    .sort(
      (a, b) =>
        Number(b.bodyType === car.bodyType) - Number(a.bodyType === car.bodyType) ||
        Math.abs(a.price - car.price) - Math.abs(b.price - car.price)
    )
    .slice(0, 3)

  return <CarDetail car={car} similar={similar} />
}
