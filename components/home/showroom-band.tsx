import Image from "next/image"
import { Clock, MapPin, Navigation, Phone } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { contact, contactLinks } from "@/lib/contact"

// Background clip: Pexels video 31220487 (free for commercial use, no attribution required).
// Replace public/media/showroom-detail.* with footage of the real showroom when available.
const VIDEO = "/media/showroom-detail.mp4"
const POSTER = "/media/showroom-detail.jpg"

export function ShowroomBand() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06]">
      {/* Phones and reduced-motion users get the still frame instead of the video */}
      <Image src={POSTER} alt="" fill sizes="100vw" className="-z-20 object-cover md:hidden md:motion-reduce:block" />
      <video
        className="absolute inset-0 -z-20 hidden size-full object-cover md:block motion-reduce:hidden"
        src={VIDEO}
        poster={POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[#0A0A0A]/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-transparent" />

      <Container className="py-28 md:py-40">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-caption font-semibold text-primary">
            <span className="h-px w-8 bg-primary" />
            Showroom
          </p>
          <h2 className="mt-4 text-h1 text-white">Posjetite nas i pogledajte vozila uživo</h2>
          <p className="mt-5 text-lead text-white/70">
            Sjednite za volan, pogledajte svaki detalj i dogovorite testnu vožnju — bez ikakve obaveze.
          </p>

          <dl className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <dt className="text-caption text-white/50">Adresa</dt>
                <dd className="mt-1 text-body-sm text-white">
                  {contact.street}
                  <br />
                  {contact.city}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <dt className="text-caption text-white/50">Radno vrijeme</dt>
                <dd className="mt-1 text-body-sm text-white">
                  {contact.hours.map((h) => (
                    <span key={h.days} className="block tabular-nums">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl" className="gap-2 text-base">
              <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                Navigacija do nas
              </a>
            </Button>
            <Button asChild size="xl" variant="outline" className="gap-2 border-white/25 bg-white/5 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
              <a href={contactLinks.tel}>
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
