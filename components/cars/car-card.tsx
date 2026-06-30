"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Fuel, Gauge, Calendar, Cog, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { DemoCar } from "@/data/cars"

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

const makeGradients: Record<string, string> = {
  Volkswagen: "from-[#004e92] to-[#002855]",
  Škoda: "from-[#4ba83d] to-[#2d6b24]",
  Renault: "from-[#ffc423] to-[#cc9c00]",
  Dacia: "from-[#e30613] to-[#9e0b14]",
  Ford: "from-[#2c5f9e] to-[#1a3b63]",
  Toyota: "from-[#e72123] to-[#a31618]",
  Hyundai: "from-[#00a2ed] to-[#006ba8]",
  Suzuki: "from-[#e30613] to-[#9e0b14]",
  Peugeot: "from-[#6f2086] to-[#4a1559]",
  BMW: "from-[#0696d6] to-[#04567d]",
  Kia: "from-[#bb162b] to-[#810f1d]",
}

const defaultGradient = "from-[#2A2A2A] to-[#171717]"

function formatMileage(km: number) {
  return `${(km / 1000).toFixed(km >= 10000 ? 0 : 1)}k km`
}

function formatPrice(price: number) {
  return `${price.toLocaleString("de-DE")} KM`
}

interface CarCardProps {
  car: DemoCar
  index?: number
}

export function CarCard({ car, index = 0 }: CarCardProps) {
  const gradient = makeGradients[car.make] || defaultGradient

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        variant="glass"
        hover="lift"
        padding="off"
        className="group overflow-hidden"
      >
        <Link href={`/cars/${car.id}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-110`}
            />

            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {car.badges.length > 0 && (
              <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
                {car.badges.map((badge) => {
                  const config = badgeConfig[badge]
                  return (
                    <Badge
                      key={badge}
                      variant={config.variant}
                      size="sm"
                      className="shadow-lg"
                    >
                      {config.label}
                    </Badge>
                  )
                })}
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="flex size-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <Eye className="size-6 text-white" />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-10">
              <p className="text-small text-white/60">
                {car.bodyType} &middot; {car.year}
              </p>
            </div>
          </div>
        </Link>

        <div className="p-4 md:p-5">
          <Link href={`/cars/${car.id}`}>
            <h3 className="text-h6 font-semibold text-foreground transition-colors group-hover:text-primary">
              {car.make} {car.model}
            </h3>
          </Link>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Detail icon={Calendar} label={String(car.year)} />
            <Detail icon={Gauge} label={formatMileage(car.mileage)} />
            <Detail icon={Fuel} label={car.fuelType} />
            <Detail icon={Cog} label={car.transmission} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
            <div>
              <span className="text-small text-muted-foreground">Cijena od</span>
              <p className="text-h4 font-bold text-primary">
                {formatPrice(car.price)}
              </p>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-small text-primary">
              {car.mileage < 10000 ? "Skoro novo" : "Provjereno"}
            </span>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-4 w-full gap-2 border-border/50 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            <Link href={`/cars/${car.id}`}>
              Pogledaj detalje
              <Eye className="size-3.5" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function Detail({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5 text-small text-muted-foreground">
      <Icon className="size-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  )
}
