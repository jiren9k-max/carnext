"use client"

import { useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FloatingSquares } from "@/components/effects/floating-squares"
import { reviews } from "@/data/reviews"

const AUTOPLAY_INTERVAL = 4000

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-primary text-primary" : "fill-none text-border"}`}
        />
      ))}
    </div>
  )
}

const avatarColors = [
  "bg-primary/10 text-primary",
  "bg-primary/8 text-primary/80",
  "bg-primary/12 text-primary",
  "bg-primary/6 text-primary/70",
  "bg-primary/10 text-primary",
  "bg-primary/8 text-primary/80",
]

function AvatarFallback({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <div className={`flex size-11 items-center justify-center rounded-full ${avatarColors[index % avatarColors.length]} text-small font-semibold`}>
      {initials}
    </div>
  )
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    duration: 30,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const timer = setInterval(() => {
      emblaApi.scrollNext()
    }, AUTOPLAY_INTERVAL)

    emblaApi.on("pointerDown", () => clearInterval(timer))

    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24 before:absolute before:inset-x-[10%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent">
      <FloatingSquares />
      <div className="absolute inset-0 bg-[#0F0D0A]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/3 size-[500px] -translate-y-1/2 rounded-full bg-white/10 blur-[150px]" />
        <div className="absolute -right-40 top-2/3 size-[500px] -translate-y-1/2 rounded-full bg-white/5 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="text-caption text-primary">Utisci kupaca</span>
          </div>
          <h2 className="text-h1 text-foreground">Iskustva kupaca</h2>
          <p className="mx-auto mt-3 max-w-xl text-lead text-muted-foreground">
            Čujte šta naši kupci kažu o svom iskustvu sa CarNext platformom.
          </p>
        </motion.div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    variant="glass"
                    hover="glow"
                    padding="lg"
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <AvatarFallback name={review.name} index={i} />
                        <div>
                          <p className="text-body-sm font-semibold text-foreground">
                            {review.name}
                          </p>
                          <p className="text-small text-muted-foreground">
                            {review.role}
                          </p>
                        </div>
                      </div>
                      <Quote className="size-6 text-primary/30" />
                    </div>

                    <Stars rating={review.rating} />

                    <p className="mt-4 flex-1 text-body-sm leading-relaxed text-muted-foreground">
                      &ldquo;{review.comment}&rdquo;
                    </p>

                    <div className="mt-4 border-t border-border/50 pt-3">
                      <p className="text-small text-primary">
                        {review.purchased}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={scrollPrev}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              aria-label="Previous"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="size-2 rounded-full bg-border transition-colors hover:bg-primary/50 data-[active=true]:bg-primary"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              aria-label="Next"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <Card
            variant="glass"
            padding="xl"
            className="mx-auto max-w-2xl border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md"
            hover="glow"
          >
            <h3 className="text-h3 text-foreground">
              Postanite i Vi zadovoljni kupac.
            </h3>
            <p className="mt-3 text-body text-muted-foreground">
              Pridružite se stotinama zadovoljnih kupaca koji su pronašli svoj
              savršeni automobil uz CarNext.
            </p>
            <Button asChild size="lg" className="mt-6">
              <a href="/inventory">Pregledaj vozila</a>
            </Button>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}
