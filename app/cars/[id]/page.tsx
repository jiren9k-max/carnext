import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCar, getCars } from "@/lib/olx"
import { CarDetail } from "@/components/cars/car-detail"
import { toJsonLd } from "@/lib/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/site"

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
    alternates: { canonical: `/cars/${car.id}` },
    openGraph: { title, description, url: `/cars/${car.id}`, images: car.images.slice(0, 1) },
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

  // Lets Google show the car (price, km, year) directly in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.make} ${car.model}`,
    url: `${SITE_URL}/cars/${car.id}`,
    image: car.images.slice(0, 5),
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: car.year ? String(car.year) : undefined,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" },
    fuelType: car.fuelType || undefined,
    vehicleTransmission: car.transmission || undefined,
    bodyType: car.bodyType || undefined,
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: "BAM",
      ...(car.price > 0 ? { price: car.price } : {}),
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: SITE_NAME, url: SITE_URL },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <CarDetail car={car} similar={similar} />
    </>
  )
}
