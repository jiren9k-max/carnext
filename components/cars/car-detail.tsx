"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileSearch,
  MapPin,
  MessageCircle,
  Phone,
  PiggyBank,
  RefreshCw,
  Send,
  ShieldCheck,
  X,
} from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CarCard } from "@/components/cars/car-card"
import { Gallery } from "@/components/cars/gallery"
import type { DemoCar } from "@/data/cars"

const PHONE_DISPLAY = "061 911 654"
const PHONE_INTL = "38761911654"
const ADDRESS = "Kasindolska 58, Ilidža, Sarajevo"

const badgeConfig: Record<
  DemoCar["badges"][number],
  { label: string; variant: "default" | "success" | "accent" | "warning" | "secondary" }
> = {
  novo: { label: "Novo", variant: "success" },
  "top-ponuda": { label: "Top ponuda", variant: "default" },
  akcija: { label: "Akcija", variant: "warning" },
  rezervisano: { label: "Rezervisano", variant: "accent" },
  prodano: { label: "Prodano", variant: "secondary" },
}

const trust = [
  { icon: ShieldCheck, title: "Provjereno vozilo", text: "Detaljna tehnička provjera prije prodaje." },
  { icon: FileSearch, title: "Transparentna historija", text: "Uvid u servisnu i vlasničku historiju." },
  { icon: PiggyBank, title: "Finansiranje", text: "Kredit i lizing prilagođeni vama." },
  { icon: RefreshCw, title: "Zamjena staro za novo", text: "Vaš auto uzimamo u zamjenu." },
]

const km = (n: number) => `${n.toLocaleString("de-DE")} km`
const price = (n: number) => (n === 0 ? "Cijena na upit" : `${n.toLocaleString("de-DE")} KM`)

interface CarDetailProps {
  car: DemoCar
  similar: DemoCar[]
}

export function CarDetail({ car, similar }: CarDetailProps) {
  const name = `${car.make} ${car.model}`
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const whatsapp = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
    `Pozdrav, zanima me ${name} (${car.year}) – ${price(car.price)}.`
  )}`
  const viber = `viber://chat?number=%2B${PHONE_INTL}`
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`CarNext, ${ADDRESS}`)}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, vehicle: name }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError("Upit nije poslan. Pozovite nas ili pokušajte ponovo.")
    } finally {
      setSending(false)
    }
  }

  const specs = [
    { label: "Marka", value: car.make },
    { label: "Model", value: car.model },
    { label: "Godište", value: String(car.year) },
    { label: "Kilometraža", value: km(car.mileage) },
    { label: "Gorivo", value: car.fuelType },
    { label: "Mjenjač", value: car.transmission },
    { label: "Karoserija", value: car.bodyType },
    { label: "Lokacija", value: "Ilidža, Sarajevo" },
  ]

  return (
    <div className="pt-24 md:pt-28">
      <Container>
        <nav className="mb-6 flex items-center gap-2 text-small text-muted-foreground">
          <Link href="/inventory" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            Vozila
          </Link>
          <span className="text-border">/</span>
          <Link href={`/inventory?make=${car.make.toLowerCase()}`} className="transition-colors hover:text-foreground">
            {car.make}
          </Link>
          <span className="text-border">/</span>
          <span className="truncate text-foreground">{car.model}</span>
        </nav>

        {/* DOM order gallery → summary → details puts the price right under
            the photos on mobile; on desktop the summary becomes a sticky
            right column spanning both rows. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 lg:col-span-8"
          >
            <Gallery images={car.images} alt={name}>
              {car.badges.length > 0 && (
                <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
                  {car.badges.map((b) => (
                    <Badge key={b} variant={badgeConfig[b].variant}>
                      {badgeConfig[b].label}
                    </Badge>
                  ))}
                </div>
              )}
            </Gallery>
          </motion.div>

          {/* Right: sticky summary */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1"
          >
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <p className="text-body-sm font-medium text-muted-foreground">{car.make}</p>
                <h1 className="mt-1 text-h3 font-bold tracking-tight text-foreground">{car.model}</h1>

                <ul className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-body-sm text-muted-foreground">
                  {[String(car.year), km(car.mileage), car.fuelType, car.transmission].map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      {i > 0 && <span className="size-1 rounded-full bg-muted-foreground/40" />}
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border/60 pt-6">
                  <p className="text-caption text-muted-foreground">Cijena</p>
                  <p className="mt-1 text-h2 font-bold tracking-tight text-foreground">
                    {car.price === 0 ? (
                      price(0)
                    ) : (
                      <>
                        {car.price.toLocaleString("de-DE")} <span className="text-primary">KM</span>
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-small text-muted-foreground">Cijena uključuje PDV</p>
                </div>

                <div className="mt-6 space-y-2.5">
                  <Button size="lg" className="h-12 w-full gap-2 text-base" asChild>
                    <a href={`tel:+${PHONE_INTL}`}>
                      <Phone className="size-4" />
                      Pozovite {PHONE_DISPLAY}
                    </a>
                  </Button>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Button variant="outline" size="lg" className="h-11 gap-2 hover:border-[#25D366]/60 hover:text-[#25D366]" asChild>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="h-11 gap-2 hover:border-[#7360F2]/60 hover:text-[#8B7CF6]" asChild>
                      <a href={viber}>
                        <Phone className="size-4" />
                        Viber
                      </a>
                    </Button>
                  </div>
                  {!showForm && !sent && (
                    <Button variant="ghost" size="lg" className="h-11 w-full gap-2 text-muted-foreground" onClick={() => setShowForm(true)}>
                      <Send className="size-4" />
                      Pošaljite upit
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {showForm && !sent && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleSubmit}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
                        <div className="flex items-center justify-between">
                          <p className="text-body-sm font-semibold text-foreground">Upit za ovo vozilo</p>
                          <button type="button" onClick={() => setShowForm(false)} aria-label="Zatvori" className="text-muted-foreground hover:text-foreground">
                            <X className="size-4" />
                          </button>
                        </div>
                        <Input placeholder="Ime i prezime" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                        <Input type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        <textarea
                          placeholder="Vaša poruka..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                          rows={3}
                          className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-ring/70"
                        />
                        {error && <p className="text-body-sm text-destructive">{error}</p>}
                        <Button type="submit" size="lg" className="w-full gap-2" disabled={sending}>
                          <Send className="size-4" />
                          {sending ? "Slanje..." : "Pošalji upit"}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {sent && (
                  <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                    <CheckCircle className="mx-auto mb-2 size-7 text-emerald-500" />
                    <p className="text-body-sm font-semibold text-foreground">Upit poslan!</p>
                    <p className="mt-1 text-body-sm text-muted-foreground">Javit ćemo vam se u najkraćem roku.</p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/30 p-6">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-body-sm font-semibold text-foreground">CarNext Sarajevo</p>
                    <p className="text-body-sm text-muted-foreground">{ADDRESS}</p>
                    <a href={maps} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-body-sm text-primary hover:underline">
                      Otvori u Google Maps
                    </a>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-body-sm text-muted-foreground">
                    Pon–Pet 09:00–17:00
                    <br />
                    Sub 09:00–14:00
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="min-w-0 lg:col-span-8 lg:row-start-2">
            <section>
              <h2 className="text-caption font-semibold text-primary">Specifikacije</h2>
              <dl className="mt-4 grid border-t border-border/60 sm:grid-cols-2 sm:gap-x-10">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-border/60 py-4">
                    <dt className="text-body-sm text-muted-foreground">{s.label}</dt>
                    <dd className="text-right text-body-sm font-medium text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-12">
              <h2 className="text-caption font-semibold text-primary">Zašto kupiti kod nas</h2>
              <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2">
                {trust.map((t) => (
                  <div key={t.title} className="flex gap-4 bg-background p-5">
                    <t.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-body-sm font-semibold text-foreground">{t.title}</p>
                      <p className="mt-1 text-body-sm text-muted-foreground">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-20 border-t border-border/60 pt-14 md:mt-28">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-caption font-semibold text-primary">Možda vas zanima</p>
                <h2 className="mt-2 text-h2 text-foreground">Slična vozila</h2>
              </div>
              <Link href="/inventory" className="hidden text-body-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
                Sva vozila →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} />
              ))}
            </div>
          </section>
        )}
      </Container>

      {/* Mobile: price and call always within reach */}
      <div className="sticky bottom-0 z-40 mt-16 border-t border-border/60 bg-background/90 backdrop-blur-xl lg:hidden">
        <Container className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="truncate text-small text-muted-foreground">{name}</p>
            <p className="text-h5 font-bold text-foreground">{price(car.price)}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="icon-lg" asChild>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="size-4" />
              </a>
            </Button>
            <Button size="lg" className="gap-2" asChild>
              <a href={`tel:+${PHONE_INTL}`}>
                <Phone className="size-4" />
                Pozovite
              </a>
            </Button>
          </div>
        </Container>
      </div>
      <div className="hidden lg:block lg:h-24" />
    </div>
  )
}
