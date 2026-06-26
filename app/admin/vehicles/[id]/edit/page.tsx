"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { InputLabel } from "@/components/ui/input"
import { adminVehicles } from "@/data/admin"
import { makes, fuelTypes, transmissions, bodyTypes, locations } from "@/data/filters"

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const vehicle = adminVehicles.find((v) => v.id === params.id)

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-h4 text-foreground">Vozilo nije pronađeno</p>
        <Button asChild className="mt-4"><a href="/admin/vehicles">Nazad na vozila</a></Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-h3 text-foreground">Uredi vozilo</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Osnovne informacije</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <InputLabel>Marka</InputLabel>
                <Select defaultValue={vehicle.make}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Model</InputLabel>
                <Input defaultValue={vehicle.model} />
              </div>
              <div>
                <InputLabel>Godište</InputLabel>
                <Input type="number" defaultValue={vehicle.year} />
              </div>
              <div>
                <InputLabel>Cijena (KM)</InputLabel>
                <Input type="number" defaultValue={vehicle.price} />
              </div>
              <div>
                <InputLabel>Kilometraža</InputLabel>
                <Input type="number" defaultValue={vehicle.mileage} />
              </div>
              <div>
                <InputLabel>Boja</InputLabel>
                <Input defaultValue={vehicle.color} />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Tehnički detalji</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <InputLabel>Gorivo</InputLabel>
                <Select defaultValue={vehicle.fuelType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Mjenjač</InputLabel>
                <Select defaultValue={vehicle.transmission}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {transmissions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Karoserija</InputLabel>
                <Select defaultValue={vehicle.bodyType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Opis</h3>
            <textarea
              rows={4}
              defaultValue={vehicle.description}
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20"
            />
            <div className="mt-4">
              <InputLabel>Lokacija</InputLabel>
              <Select defaultValue={vehicle.location}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Status</h3>
            <div className="space-y-3">
              {(["available", "reserved", "sold", "pending"] as const).map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="edit-status" defaultChecked={vehicle.status === status} className="size-4 accent-primary" />
                  <span className="text-body-sm text-foreground capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Oznake</h3>
            <div className="flex flex-wrap gap-2">
              {(["novo", "top-ponuda", "akcija"] as const).map((badge) => (
                <label key={badge} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-small text-muted-foreground transition-colors hover:border-primary/30 has-checked:border-primary/50 has-checked:bg-primary/10 has-checked:text-primary">
                  <input type="checkbox" defaultChecked={vehicle.badges.includes(badge)} className="size-3.5 accent-primary" />
                  {badge === "novo" ? "Novo" : badge === "top-ponuda" ? "Top ponuda" : "Akcija"}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Sačuvaj izmjene</Button>
            <Button variant="outline" className="flex-1" onClick={() => router.back()}>Odustani</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
