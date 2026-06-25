"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Fuel, Gauge, Calendar, Cog, Car, CheckCircle, Phone, Mail } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { demoCars } from "@/data/cars"

const badgeConfig: Record<string, { label: string; variant: "default" | "success" | "accent" | "warning" | "secondary" }> = {
  novo: { label: "Novo", variant: "success" },
  "top-ponuda": { label: "Top ponuda", variant: "default" },
  akcija: { label: "Akcija", variant: "warning" },
  rezervisano: { label: "Rezervisano", variant: "accent" },
  prodano: { label: "Prodano", variant: "secondary" },
}

function formatMileage(km: number) {
  return `${(km / 1000).toFixed(km >= 10000 ? 0 : 1)}k km`
}

function formatPrice(price: number) {
  return `${price.toLocaleString("de-DE")} KM`
}

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const car = demoCars.find((c) => c.id === id)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!car) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24">
        <h1 className="text-h2 text-foreground">Vozilo nije pronađeno</h1>
        <p className="text-muted-foreground">Traženo vozilo ne postoji u našoj kolekciji.</p>
        <Button asChild><Link href="/inventory">Pogledaj sva vozila</Link></Button>
      </main>
    )
  }

  const specs = [
    { icon: Calendar, label: "Godište", value: String(car.year) },
    { icon: Gauge, label: "Kilometraža", value: formatMileage(car.mileage) },
    { icon: Fuel, label: "Gorivo", value: car.fuelType },
    { icon: Cog, label: "Mjenjač", value: car.transmission },
    { icon: Car, label: "Karoserija", value: car.bodyType },
  ]

  return (
    <main className="min-h-screen pt-24">
      <Container>
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 text-muted-foreground">
            <ArrowLeft className="size-4" />
            Nazad
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={car.images[selectedImage]}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={selectedImage === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {car.badges.length > 0 && (
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  {car.badges.map((badge) => {
                    const config = badgeConfig[badge]
                    return (
                      <Badge key={badge} variant={config.variant} size="default">
                        {config.label}
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    i === selectedImage
                      ? "border-primary opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={80}
                    height={60}
                    className="size-20 object-cover md:size-24"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="mb-2 flex items-center gap-2 text-small text-muted-foreground">
              <span>{car.make}</span>
              <span>/</span>
              <span className="text-foreground">{car.model}</span>
            </div>

            <h1 className="text-h1 text-foreground">
              {car.make} {car.model}
            </h1>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-h2 font-bold text-primary">{formatPrice(car.price)}</span>
              <span className="text-small text-muted-foreground">cijena uključuje PDV</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3">
                  <s.icon className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-small text-muted-foreground">{s.label}</p>
                    <p className="text-body-sm font-medium text-foreground">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {car.mileage < 10000 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5">
                <CheckCircle className="size-5 text-emerald-500" />
                <span className="text-body-sm text-emerald-500 font-medium">Skoro novo vozilo</span>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <Button size="lg" className="w-full gap-2">
                <Phone className="size-4" />
                Pozovite 061 911 654
              </Button>
              <Button variant="outline" size="lg" className="w-full gap-2" asChild>
                <Link href="mailto:info@carnext.ba">
                  <Mail className="size-4" />
                  Pošaljite upit
                </Link>
              </Button>
            </div>

            <div className="mt-6 rounded-lg border border-border/50 bg-card/30 p-4">
              <h3 className="text-h6 text-foreground mb-2">Lokacija vozila</h3>
              <p className="text-body-sm text-muted-foreground">
                Kasindolska 58, Ilidža, Sarajevo<br />
                Radno vrijeme: Pon-Pet 09:00-17:00, Sub 09:00-14:00
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  )
}
