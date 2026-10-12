"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Badge as CarBadge, Car } from "@/lib/olx"

const badgeConfig: Record<
  CarBadge,
  { label: string; variant: "default" | "success" | "accent" | "warning" | "secondary" }
> = {
  novo: { label: "Novo", variant: "success" },
  "top-ponuda": { label: "Top ponuda", variant: "default" },
  akcija: { label: "Akcija", variant: "warning" },
  rezervisano: { label: "Rezervisano", variant: "accent" },
  prodano: { label: "Prodano", variant: "secondary" },
}

interface CarCardProps {
  car: Car
  index?: number
}

export function CarCard({ car, index = 0 }: CarCardProps) {
  const specs = [String(car.year), `${car.mileage.toLocaleString("de-DE")} km`, car.fuelType, car.transmission]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/cars/${car.id}`}
        className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-300 hover:border-white/20"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-card">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {car.badges.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {car.badges.map((badge) => (
                <Badge key={badge} variant={badgeConfig[badge].variant} size="sm">
                  {badgeConfig[badge].label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-small text-muted-foreground">
            {car.make} · {car.bodyType}
          </p>
          <h3 className="mt-1 truncate text-h6 font-semibold text-foreground" title={car.model}>
            {car.model}
          </h3>

          <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted-foreground">
            {specs.map((s, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span className="size-0.5 rounded-full bg-muted-foreground/60" />}
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end justify-between border-t border-white/[0.08] pt-4">
            {car.price > 0 ? (
              <p className="text-h5 font-semibold tracking-tight text-foreground">
                {car.price.toLocaleString("de-DE")} <span className="text-primary">KM</span>
              </p>
            ) : (
              <p className="text-body-sm text-muted-foreground">Cijena na upit</p>
            )}
            <span className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
