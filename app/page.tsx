import { Hero } from "@/components/home/hero"
import { SearchSection } from "@/components/home/search"
import { FeaturedCars } from "@/components/home/featured-cars"
import { PopularBrands } from "@/components/home/popular-brands"
import { WhyCarNext } from "@/components/home/why-carnext"
import { Testimonials } from "@/components/home/testimonials"
import { getCars } from "@/lib/olx"
import { getFilterOptions } from "@/lib/car-filters"

// Refresh from OLX at most every 10 minutes (see lib/olx.ts).
export const revalidate = 600

export default async function Home() {
  const cars = await getCars()

  return (
    <>
      <Hero cars={cars} />
      <SearchSection options={getFilterOptions(cars)} />
      <FeaturedCars cars={cars} />
      <PopularBrands />
      <WhyCarNext />
      <Testimonials />
    </>
  )
}
