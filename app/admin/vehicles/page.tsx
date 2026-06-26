"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { adminVehicles, type AdminVehicle } from "@/data/admin"

const statusBadge: Record<AdminVehicle["status"], { label: string; variant: "success" | "accent" | "warning" | "secondary" }> = {
  available: { label: "Dostupno", variant: "success" },
  reserved: { label: "Rezervisano", variant: "accent" },
  sold: { label: "Prodano", variant: "secondary" },
  pending: { label: "Na čekanju", variant: "warning" },
}

export default function VehiclesPage() {
  const [search, setSearch] = useState("")

  const filtered = adminVehicles.filter((v) =>
    `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search.toLowerCase())
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
          placeholder="Pretraži vozila..."
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
                <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Godina</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Cijena</th>
                <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Kilometraža</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-foreground">{v.make} {v.model}</p>
                    <p className="text-small text-muted-foreground">{v.bodyType} &middot; {v.fuelType}</p>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground hidden md:table-cell">{v.year}</td>
                  <td className="px-4 py-3.5 font-medium text-foreground">
                    {v.price.toLocaleString("de-DE")} KM
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground hidden lg:table-cell">
                    {(v.mileage / 1000).toFixed(0)}k km
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={statusBadge[v.status].variant} size="sm">
                      {statusBadge[v.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="icon-xs">
                        <Link href={`/admin/vehicles/${v.id}/edit`}>
                          <Pencil className="size-3.5" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon-xs" className="text-destructive hover:text-destructive">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
