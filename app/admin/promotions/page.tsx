"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Percent, Star, Image } from "lucide-react"
import { promotions, type Promotion } from "@/data/admin"

const typeIcon: Record<Promotion["type"], React.ComponentType<{ className?: string }>> = {
  discount: Percent,
  featured: Star,
  banner: Image,
}

const typeLabel: Record<Promotion["type"], string> = {
  discount: "Popust",
  featured: "Istaknuto",
  banner: "Banner",
}

export default function PromotionsPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h3 text-foreground">Promocije</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Upravljajte promocijama i popustima.</p>
        </div>
        <Button className="gap-2"><Plus className="size-4" /> Nova promocija</Button>
      </div>

      <div className="space-y-3">
        {promotions.map((promo) => {
          const Icon = typeIcon[promo.type]
          return (
            <div key={promo.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-h6 text-foreground">{promo.name}</h3>
                  <p className="text-small text-muted-foreground">
                    {typeLabel[promo.type]} &middot; {promo.startDate} — {promo.endDate}
                  </p>
                </div>
              </div>
              <Badge variant={promo.status === "active" ? "success" : "secondary"} size="sm">
                {promo.status === "active" ? "Aktivno" : "Neaktivno"}
              </Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}
