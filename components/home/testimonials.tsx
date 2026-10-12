"use client"

import { useEffect, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowRight, ChevronLeft, ChevronRight, Phone, Star } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { reviews } from "@/data/reviews"
import { contact, contactLinks } from "@/lib/contact"

const AUTOPLAY_INTERVAL = 5000

const arrow =
  "flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocjena ${rating} od 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-3.5 ${i < rating ? "fill-primary text-primary" : "fill-none text-border"}`} />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", duration: 30 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL)
    emblaApi.on("pointerDown", () => clearInterval(timer))
    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <section className="bg-gradient-to-b from-ember-900 to-ember-800 pt-20 md:pt-28">
      <Container>
        <SectionHeading
          eyebrow="Utisci kupaca"
          title="Iskustva kupaca"
          description="Šta kažu ljudi koji su svoj auto pronašli kod nas."
          action={
            <div className="flex gap-2">
              <button onClick={scrollPrev} className={arrow} aria-label="Prethodni utisak">
                <ChevronLeft className="size-4" />
              </button>
              <button onClick={scrollNext} className={arrow} aria-label="Sljedeći utisak">
                <ChevronRight className="size-4" />
              </button>
            </div>
          }
        />

        <div ref={emblaRef} className="mt-10 overflow-hidden">
          <div className="-ml-4 flex">
            {reviews.map((review) => (
              <div key={review.id} className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/20 p-7">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-5 flex-1 text-body leading-relaxed text-foreground/85">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-white/[0.06] text-small font-semibold text-foreground">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-body-sm font-semibold text-foreground">{review.name}</span>
                      <span className="block truncate text-small text-muted-foreground">{review.purchased}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 border-t border-white/[0.06] border-white/10 bg-gradient-to-br from-ember-600 via-ember-700 to-ember-800 md:mt-32"
      >
        <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div className="max-w-xl">
            <h2 className="text-h1 text-foreground">Postanite i Vi zadovoljni kupac.</h2>
            <p className="mt-4 text-lead text-white/75">
              Pogledajte ponudu ili nas pozovite — rado ćemo vam pomoći da pronađete pravi auto.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="xl" className="group gap-2 bg-white text-base text-ember-900 hover:bg-white/90">
              <Link href="/inventory">
                Pregledaj vozila
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="gap-2 border-white/30 bg-transparent text-base text-white hover:bg-white/10 hover:text-white">
              <a href={contactLinks.tel}>
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </Container>
      </motion.div>
    </section>
  )
}
