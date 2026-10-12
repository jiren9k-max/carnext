import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Handshake, Phone, ShieldCheck, Star } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { getCars } from "@/lib/olx"
import { contact, contactLinks } from "@/lib/contact"

// Live stock count and photos come from OLX (see lib/olx.ts).
export const revalidate = 600

export const metadata: Metadata = {
  title: "O nama",
  description: "CarNext Sarajevo — provjerena vozila, fer cijene i profesionalna usluga na Ilidži.",
}

const values = [
  {
    icon: ShieldCheck,
    title: "Provjerena vozila",
    desc: "Svako vozilo prolazi detaljnu tehničku provjeru prije nego što ga ponudimo našim kupcima.",
  },
  {
    icon: Handshake,
    title: "Fer cijene",
    desc: "Transparentno poslovanje bez skrivenih troškova. Dobijate upravo ono što vidite.",
  },
  {
    icon: Star,
    title: "Profesionalna usluga",
    desc: "Naš tim je tu da vam pomogne u svakom koraku, od odabira do preuzimanja ključeva.",
  },
]

export default async function AboutPage() {
  const cars = await getCars()
  const showcase = cars.filter((c) => c.images.length > 0).slice(0, 3)

  const stats = [
    { value: String(cars.length), label: "Vozila trenutno u ponudi" },
    { value: "1.200+", label: "Zadovoljnih kupaca" },
    { value: "15+", label: "Godina iskustva" },
    { value: "Platinum", label: "OLX.ba Shop status" },
  ]

  return (
    <div className="pt-28 md:pt-36">
      <Container>
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-caption font-semibold text-primary">
            <span className="h-px w-8 bg-primary" />
            O nama
          </p>
          <h1 className="mt-4 text-display text-foreground">Vozila kojima možete vjerovati</h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
            CarNext je auto kuća sa Ilidže posvećena jednom cilju — da kupovina polovnog automobila bude
            jednostavna, transparentna i bez iznenađenja.
          </p>
        </div>

        {showcase.length === 3 && (
          <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {showcase.map((car, i) => (
              <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className={
                  i === 0
                    ? "group relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:aspect-auto"
                    : "group relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto md:min-h-56"
                }
              >
                <Image
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-body-sm font-medium text-white">
                  {car.make} {car.model}
                </span>
              </Link>
            ))}
          </div>
        )}

        <section className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Naša priča" title="Iskustvo koje se vidi u svakom detalju" />
          </div>
          <div className="space-y-6 text-lead text-muted-foreground lg:col-span-7 lg:pt-12">
            <p>
              Osnovani smo sa ciljem da promijenimo način na koji ljudi kupuju automobile. Vjerujemo da svako
              zaslužuje vozilo koje je provjereno, pouzdano i po fer cijeni.
            </p>
            <p>
              Naš tim ima više od 15 godina iskustva u prodaji vozila. Svako vozilo koje uđe u našu ponudu prolazi
              tehničku provjeru i detaljnu analizu stanja — a sve informacije dobijate otvoreno, prije kupovine.
            </p>
            <p>
              Nalazimo se na adresi {contact.street}, a vozila prodajemo kupcima iz cijele Bosne i Hercegovine i
              regiona.
            </p>
          </div>
        </section>

        <dl className="mt-20 grid grid-cols-2 gap-y-10 border-y border-white/[0.08] py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-2 lg:border-l lg:border-white/[0.08] lg:px-8 lg:first:border-l-0 lg:first:pl-0">
              <dd className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-foreground">
                {s.value}
              </dd>
              <dt className="mt-3 text-body-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>

        <section className="mt-24 md:mt-32">
          <SectionHeading eyebrow="Vrijednosti" title="Na čemu gradimo povjerenje" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-background p-7 md:p-8">
                <v.icon className="size-6 text-primary" strokeWidth={1.5} />
                <h3 className="mt-6 text-h6 text-foreground">{v.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <section className="mt-24 border-t border-white/[0.06] bg-gradient-to-b from-primary/[0.06] to-transparent md:mt-32">
        <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div className="max-w-xl">
            <h2 className="text-h1 text-foreground">Pronađite svoje sljedeće vozilo.</h2>
            <p className="mt-4 text-lead text-muted-foreground">Pogledajte ponudu online ili nas posjetite u showroomu.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="xl" className="group gap-2 text-base">
              <Link href="/inventory">
                Pogledaj vozila
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="gap-2 border-white/20 text-base">
              <a href={contactLinks.tel}>
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
