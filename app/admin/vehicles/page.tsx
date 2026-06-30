"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { DemoCar } from "@/data/cars"
import { useCars } from "@/hooks/use-cars"

type VehicleStatus = "available" | "reserved" | "sold"

const statusBadge: Record<VehicleStatus, { label: string; variant: "success" | "accent" | "secondary" }> = {
  available: { label: "Dostupno", variant: "success" },
  reserved: { label: "Rezervisano", variant: "accent" },
  sold: { label: "Prodano", variant: "secondary" },
}

function getStatus(car: DemoCar): VehicleStatus {
  if (car.badges.includes("prodano")) {
    return "sold"
  }

  if (car.badges.includes("rezervisano")) {
    return "reserved"
  }

  return "available"
}

export default function VehiclesPage() {
  const [search, setSearch] = useState("")
  const { cars, removeCar } = useCars()

  const filtered = cars.filter((vehicle) =>
    `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h3 text-foreground">Vozila</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Upravljajte vozilima na platformi.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/vehicles/add">
            <Plus className="size-4" /> Dodaj vozilo
          </Link>
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pretrazi vozila..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-[var(--radius)] border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-muted-foreground">Vozilo</th>
                <th className="hidden px-4 py-3 font-medium text-muted-foreground md:table-cell">Godina</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Cijena</th>
                <th className="hidden px-4 py-3 font-medium text-muted-foreground lg:table-cell">Kilometraza</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((vehicle) => {
                const status = getStatus(vehicle)
                const isAddedCar = vehicle.id.startsWith("added-")

                return (
                  <tr key={vehicle.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-foreground">{vehicle.make} {vehicle.model}</p>
                      <p className="text-small text-muted-foreground">{vehicle.bodyType} &middot; {vehicle.fuelType}</p>
                    </td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">{vehicle.year}</td>
                    <td className="px-4 py-3.5 font-medium text-foreground">
                      {vehicle.price.toLocaleString("de-DE")} KM
                    </td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">
                      {(vehicle.mileage / 1000).toFixed(0)}k km
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={statusBadge[status].variant} size="sm">
                        {statusBadge[status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild variant="ghost" size="icon-xs">
                          <Link href={isAddedCar ? `/cars/${vehicle.id}` : `/admin/vehicles/${vehicle.id}/edit`}>
                            <Pencil className="size-3.5" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-destructive hover:text-destructive"
                          disabled={!isAddedCar}
                          onClick={() => removeCar(vehicle.id)}
                          title={isAddedCar ? "Obrisi vozilo" : "Demo vozilo se ne moze obrisati"}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
