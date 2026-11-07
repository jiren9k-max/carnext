import type { MetadataRoute } from "next"
import { getCars } from "@/lib/olx"
import { SITE_URL } from "@/lib/site"

// Built on every request from the shared cached car list (lib/olx.ts) — no extra OLX
// requests, and it can never lag behind the pages the way a separately cached copy did.
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars()
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/inventory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ]
  return [
    ...pages,
    ...cars.map((car) => ({
      url: `${SITE_URL}/cars/${car.id}`,
      lastModified: car.listedAt ? new Date(car.listedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
