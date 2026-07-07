"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, InputLabel } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { makes, fuelTypes, transmissions, bodyTypes, locations } from "@/data/filters"
import { FileUpload } from "@/components/shared/file-upload"

const defaultForm = {
  make: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  color: "",
  fuelType: "",
  transmission: "",
  bodyType: "",
  engineSize: "",
  power: "",
  acceleration: "",
  topSpeed: "",
  consumption: "",
  doors: "",
  seats: "",
  description: "",
  location: "",
  status: "available" as const,
  badges: [] as string[],
}

export default function AddVehiclePage() {
  const router = useRouter()
  const [form, setForm] = useState({ ...defaultForm })
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleBadge(badge: string) {
    setForm((prev) => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter((b) => b !== badge)
        : [...prev.badges, badge],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const body = {
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        power: Number(form.power),
        acceleration: Number(form.acceleration),
        topSpeed: Number(form.topSpeed),
        doors: Number(form.doors),
        seats: Number(form.seats),
        condition: "New",
        features: [],
        images,
        videos,
      }
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Failed to save")
      router.push("/admin/vehicles")
    } catch {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center gap-4">
        <Button type="button" variant="ghost" size="icon" onClick={() => router.back()}>
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
                <Select value={form.make} onValueChange={(v) => update("make", v)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite marku" /></SelectTrigger>
                  <SelectContent>
                    {makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Model</InputLabel>
                <Input value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Npr. 911 Carrera 4S" />
              </div>
              <div>
                <InputLabel>Godište</InputLabel>
                <Input type="number" value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="2025" />
              </div>
              <div>
                <InputLabel>Cijena (KM)</InputLabel>
                <Input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="185000" />
              </div>
              <div>
                <InputLabel>Kilometraža</InputLabel>
                <Input type="number" value={form.mileage} onChange={(e) => update("mileage", e.target.value)} placeholder="0" />
              </div>
              <div>
                <InputLabel>Boja</InputLabel>
                <Input value={form.color} onChange={(e) => update("color", e.target.value)} placeholder="GT Silver Metallic" />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Tehnički detalji</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <InputLabel>Gorivo</InputLabel>
                <Select value={form.fuelType} onValueChange={(v) => update("fuelType", v)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Mjenjač</InputLabel>
                <Select value={form.transmission} onValueChange={(v) => update("transmission", v)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {transmissions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Karoserija</InputLabel>
                <Select value={form.bodyType} onValueChange={(v) => update("bodyType", v)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Motor</InputLabel>
                <Input value={form.engineSize} onChange={(e) => update("engineSize", e.target.value)} placeholder="3.0L Twin-Turbo" />
              </div>
              <div>
                <InputLabel>Snaga (KS)</InputLabel>
                <Input type="number" value={form.power} onChange={(e) => update("power", e.target.value)} placeholder="443" />
              </div>
              <div>
                <InputLabel>0-100 km/h</InputLabel>
                <Input type="number" step="0.1" value={form.acceleration} onChange={(e) => update("acceleration", e.target.value)} placeholder="3.4" />
              </div>
              <div>
                <InputLabel>Potrošnja</InputLabel>
                <Input value={form.consumption} onChange={(e) => update("consumption", e.target.value)} placeholder="10.3 L/100km" />
              </div>
              <div>
                <InputLabel>Broj vrata</InputLabel>
                <Input type="number" value={form.doors} onChange={(e) => update("doors", e.target.value)} placeholder="2" />
              </div>
              <div>
                <InputLabel>Broj sjedišta</InputLabel>
                <Input type="number" value={form.seats} onChange={(e) => update("seats", e.target.value)} placeholder="4" />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Opis i karakteristike</h3>
            <div>
              <InputLabel>Opis</InputLabel>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20"
                placeholder="Opišite vozilo..."
              />
            </div>
            <div className="mt-4">
              <InputLabel>Lokacija</InputLabel>
              <Select value={form.location} onValueChange={(v) => update("location", v)}>
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
            <FileUpload type="image" value={images} onChange={setImages} maxFiles={20} />
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Video</h3>
            <FileUpload type="video" value={videos} onChange={setVideos} maxFiles={5} />
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="text-h6 text-foreground mb-4">Status</h3>
            <div className="space-y-3">
              {(["available", "reserved", "sold", "pending"] as const).map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === status}
                    onChange={() => update("status", status)}
                    className="size-4 accent-primary"
                  />
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
                  <input
                    type="checkbox"
                    checked={form.badges.includes(badge)}
                    onChange={() => toggleBadge(badge)}
                    className="size-3.5 accent-primary"
                  />
                  {badge === "novo" ? "Novo" : badge === "top-ponuda" ? "Top ponuda" : "Akcija"}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={saving}>
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? "Spremanje..." : "Sačuvaj vozilo"}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Odustani</Button>
          </div>
        </div>
      </div>
    </form>
  )
}
