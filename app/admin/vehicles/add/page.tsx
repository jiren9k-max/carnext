"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, InputLabel } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { makes, fuelTypes, transmissions, bodyTypes, locations } from "@/data/filters"
import type { DemoCar } from "@/data/cars"
import { useCars } from "@/hooks/use-cars"

const placeholderImage =
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80"

const badgeLabels: Record<DemoCar["badges"][number], string> = {
  novo: "Novo",
  "top-ponuda": "Top ponuda",
  akcija: "Akcija",
  rezervisano: "Rezervisano",
  prodano: "Prodano",
}

type FormState = {
  make: string
  model: string
  year: string
  price: string
  mileage: string
  fuelType: string
  transmission: string
  bodyType: string
  color: string
  engine: string
  power: string
  description: string
  location: string
  status: "available" | "reserved" | "sold"
  badges: DemoCar["badges"]
}

const initialForm: FormState = {
  make: "",
  model: "",
  year: String(new Date().getFullYear()),
  price: "",
  mileage: "0",
  fuelType: "",
  transmission: "",
  bodyType: "",
  color: "",
  engine: "",
  power: "",
  description: "",
  location: "",
  status: "available",
  badges: ["novo"],
}

function readImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export default function AddVehiclePage() {
  const router = useRouter()
  const { addCar } = useCars()
  const [form, setForm] = useState<FormState>(initialForm)
  const [images, setImages] = useState<string[]>([])
  const [isReadingImages, setIsReadingImages] = useState(false)
  const [error, setError] = useState("")

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"))
    if (files.length === 0) {
      return
    }

    setIsReadingImages(true)
    setError("")

    try {
      const nextImages = await Promise.all(files.map(readImage))
      setImages((current) => [...current, ...nextImages].slice(0, 8))
    } catch {
      setError("Slike nisu uspjele da se ucitaju. Pokusajte ponovo.")
    } finally {
      setIsReadingImages(false)
      event.target.value = ""
    }
  }

  const toggleBadge = (badge: DemoCar["badges"][number]) => {
    setForm((current) => ({
      ...current,
      badges: current.badges.includes(badge)
        ? current.badges.filter((item) => item !== badge)
        : [...current.badges, badge],
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!form.make || !form.model || !form.year || !form.price || !form.fuelType || !form.transmission || !form.bodyType) {
      setError("Popunite marku, model, godinu, cijenu, gorivo, mjenjac i karoseriju.")
      return
    }

    const badges = new Set(form.badges)
    if (form.status === "reserved") {
      badges.add("rezervisano")
    }
    if (form.status === "sold") {
      badges.add("prodano")
    }

    const newCar = addCar({
      make: form.make,
      model: form.model.trim(),
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage || 0),
      fuelType: form.fuelType,
      transmission: form.transmission,
      bodyType: form.bodyType,
      images: images.length > 0 ? images : [placeholderImage],
      badges: Array.from(badges),
    })

    router.push(`/cars/${newCar.id}`)
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-h3 text-foreground">Dodaj novo vozilo</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Unesite podatke i slike vozila.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="mb-4 text-h6 text-foreground">Osnovne informacije</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <InputLabel>Marka</InputLabel>
                <Select value={form.make} onValueChange={(value) => setField("make", value)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite marku" /></SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => <SelectItem key={make} value={make}>{make}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Model</InputLabel>
                <Input value={form.model} onChange={(e) => setField("model", e.target.value)} placeholder="Npr. 911 Carrera 4S" required />
              </div>
              <div>
                <InputLabel>Godiste</InputLabel>
                <Input value={form.year} onChange={(e) => setField("year", e.target.value)} type="number" min="1950" max="2035" required />
              </div>
              <div>
                <InputLabel>Cijena (KM)</InputLabel>
                <Input value={form.price} onChange={(e) => setField("price", e.target.value)} type="number" min="0" placeholder="185000" required />
              </div>
              <div>
                <InputLabel>Kilometraza</InputLabel>
                <Input value={form.mileage} onChange={(e) => setField("mileage", e.target.value)} type="number" min="0" placeholder="0" />
              </div>
              <div>
                <InputLabel>Boja</InputLabel>
                <Input value={form.color} onChange={(e) => setField("color", e.target.value)} placeholder="GT Silver Metallic" />
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="mb-4 text-h6 text-foreground">Tehnicki detalji</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <InputLabel>Gorivo</InputLabel>
                <Select value={form.fuelType} onValueChange={(value) => setField("fuelType", value)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Mjenjac</InputLabel>
                <Select value={form.transmission} onValueChange={(value) => setField("transmission", value)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {transmissions.map((transmission) => <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Karoserija</InputLabel>
                <Select value={form.bodyType} onValueChange={(value) => setField("bodyType", value)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((bodyType) => <SelectItem key={bodyType} value={bodyType}>{bodyType}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <InputLabel>Motor</InputLabel>
                <Input value={form.engine} onChange={(e) => setField("engine", e.target.value)} placeholder="3.0L Twin-Turbo" />
              </div>
              <div>
                <InputLabel>Snaga (KS)</InputLabel>
                <Input value={form.power} onChange={(e) => setField("power", e.target.value)} type="number" min="0" placeholder="443" />
              </div>
              <div>
                <InputLabel>Lokacija</InputLabel>
                <Select value={form.location} onValueChange={(value) => setField("location", value)}>
                  <SelectTrigger><SelectValue placeholder="Izaberite" /></SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => <SelectItem key={location} value={location}>{location}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="mb-4 text-h6 text-foreground">Opis</h3>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20"
              placeholder="Opisite vozilo..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="mb-4 text-h6 text-foreground">Slike</h3>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image src={image} alt={`Slika ${index + 1}`} fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}

              <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                {isReadingImages ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
                <input type="file" accept="image/*" multiple className="sr-only" onChange={handleImageUpload} />
              </label>
            </div>
            <p className="mt-3 text-small text-muted-foreground">Dodajte do 8 slika. Prva slika je glavna slika kartice.</p>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="mb-4 text-h6 text-foreground">Status</h3>
            <div className="space-y-3">
              {[
                { value: "available", label: "Dostupno" },
                { value: "reserved", label: "Rezervisano" },
                { value: "sold", label: "Prodano" },
              ].map((status) => (
                <label key={status.value} className="flex cursor-pointer items-center gap-3">
                  <input
                    checked={form.status === status.value}
                    onChange={() => setField("status", status.value as FormState["status"])}
                    type="radio"
                    name="status"
                    className="size-4 accent-primary"
                  />
                  <span className="text-body-sm text-foreground">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-card p-5">
            <h3 className="mb-4 text-h6 text-foreground">Oznake</h3>
            <div className="flex flex-wrap gap-2">
              {(["novo", "top-ponuda", "akcija"] as const).map((badge) => (
                <label key={badge} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-small text-muted-foreground transition-colors hover:border-primary/30 has-checked:border-primary/50 has-checked:bg-primary/10 has-checked:text-primary">
                  <input
                    checked={form.badges.includes(badge)}
                    onChange={() => toggleBadge(badge)}
                    type="checkbox"
                    className="size-3.5 accent-primary"
                  />
                  {badgeLabels[badge]}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-body-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">Sacuvaj vozilo</Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Odustani</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
