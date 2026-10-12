"use client"

import { useEffect, useCallback } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { brands } from "@/data/brands"

const AUTOPLAY_INTERVAL = 3500

const arrow =
  "flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"

export function PopularBrands() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 30,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL)
    emblaApi.on("pointerDown", () => clearInterval(timer))
    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <section className="border-t border-white/[0.06] py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Marke"
          title="Popularne marke"
          description="Istražite vozila vodećih svjetskih proizvođača."
          action={
            <div className="flex gap-2">
              <button onClick={scrollPrev} className={arrow} aria-label="Prethodna marka">
                <ChevronLeft className="size-4" />
              </button>
              <button onClick={scrollNext} className={arrow} aria-label="Sljedeća marka">
                <ChevronRight className="size-4" />
              </button>
            </div>
          }
        />

        <div ref={emblaRef} className="mt-10 overflow-hidden">
          <div className="-ml-3 flex">
            {brands.map((brand) => (
              <div key={brand.id} className="min-w-0 shrink-0 grow-0 basis-1/2 pl-3 sm:basis-1/3 lg:basis-1/6">
                <Link
                  href={`/inventory?make=${brand.slug}`}
                  className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.04]"
                >
                  {/* The logo files are drawn for light backgrounds, many in black */}
                  <span className="flex size-16 items-center justify-center rounded-full bg-white/90 p-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-white sm:size-[4.5rem]">
                    <brand.Logo className="size-full" />
                  </span>
                  <span className="text-small font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {brand.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
