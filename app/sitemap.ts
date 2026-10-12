import type { MetadataRoute } from "next"
import { getCars } from "@/lib/olx"
import { SITE_URL } from "@/lib/site"

// Regenerated with the car list (see lib/olx.ts) so new cars reach Google quickly.
export const revalidate = 600

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
      lastModified: car.createdAt ? new Date(car.createdAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
