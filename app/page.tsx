import { Hero } from "@/components/home/hero"
import { SearchSection } from "@/components/home/search"
import { FeaturedCars } from "@/components/home/featured-cars"
import { PopularBrands } from "@/components/home/popular-brands"
import { WhyCarNext } from "@/components/home/why-carnext"
import { Testimonials } from "@/components/home/testimonials"

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedCars />
      <PopularBrands />
      <WhyCarNext />
      <Testimonials />
    </>
  )
}
