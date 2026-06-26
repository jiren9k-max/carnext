"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { InputLabel, InputError } from "@/components/ui/input"
import { makes, fuelTypes, transmissions, bodyTypes, locations } from "@/data/filters"

export default function AddVehiclePage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-h3 text-foreground">Dodaj novo vozilo</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Unesite podatke o novom vozilu.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Osnovne informacije</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <InputLabel>Marka</InputLabel>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Izaberite marku" /></SelectTrigger>
                  <SelectContent>
                    {makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Model</InputLabel>
                <Input placeholder="Npr. 911 Carrera 4S" />
              </div>
              <div>
                <InputLabel>Godište</InputLabel>
                <Input type="number" placeholder="2025" />
              </div>
              <div>
                <InputLabel>Cijena (KM)</InputLabel>
                <Input type="number" placeholder="185000" />
              </div>
              <div>
                <InputLabel>Kilometraža</InputLabel>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <InputLabel>Boja</InputLabel>
                <Input placeholder="GT Silver Metallic" />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Tehnički detalji</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <InputLabel>Gorivo</InputLabel>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Mjenjač</InputLabel>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {transmissions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Karoserija</InputLabel>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Motor</InputLabel>
                <Input placeholder="3.0L Twin-Turbo" />
              </div>
              <div>
                <InputLabel>Snaga (KS)</InputLabel>
                <Input type="number" placeholder="443" />
              </div>
              <div>
                <InputLabel>0-100 km/h</InputLabel>
                <Input type="number" step="0.1" placeholder="3.4" />
              </div>
              <div>
                <InputLabel>Potrošnja</InputLabel>
                <Input placeholder="10.3 L/100km" />
              </div>
              <div>
                <InputLabel>Broj vrata</InputLabel>
                <Input type="number" placeholder="2" />
              </div>
              <div>
                <InputLabel>Broj sjedišta</InputLabel>
                <Input type="number" placeholder="4" />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Opis i karakteristike</h3>
            <div>
              <InputLabel>Opis</InputLabel>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20"
                placeholder="Opišite vozilo..."
              />
            </div>
            <div className="mt-4">
              <InputLabel>Lokacija</InputLabel>
              <Select>
                <SelectTrigger><SelectValue placeholder="Izaberite lokaciju" /></SelectTrigger>
                <SelectContent>
                  {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Slike</h3>
            <div className="grid grid-cols-3 gap-2">
              {images.map((_, i) => (
                <div key={i} className="relative aspect-square rounded-lg bg-muted flex items-center justify-center">
                  <button className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-white">
                    <X className="size-3" />
                  </button>
                  <span className="text-caption text-muted-foreground">Slika {i + 1}</span>
                </div>
              ))}
              <button
                onClick={() => setImages([...images, ""])}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Upload className="size-5" />
              </button>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Video</h3>
            <div className="space-y-2">
              {videos.map((_, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border/50 p-2">
                  <span className="flex-1 text-small text-muted-foreground">Video {i + 1}</span>
                  <button className="text-destructive hover:text-destructive"><X className="size-3.5" /></button>
                </div>
              ))}
              <button
                onClick={() => setVideos([...videos, ""])}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-3 text-small text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Upload className="size-4" /> Dodaj video
              </button>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Status</h3>
            <div className="space-y-3">
              {(["available", "reserved", "sold", "pending"] as const).map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="status" className="size-4 accent-primary" />
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
                  <input type="checkbox" className="size-3.5 accent-primary" />
                  {badge === "novo" ? "Novo" : badge === "top-ponuda" ? "Top ponuda" : "Akcija"}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Sačuvaj vozilo</Button>
            <Button variant="outline" className="flex-1" onClick={() => router.back()}>Odustani</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
