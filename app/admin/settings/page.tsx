"use client"

import { InputLabel } from "@/components/ui/input"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h3 text-foreground">Podešavanja</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">Podešavanja platforme.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Opšta podešavanja</h3>
          <div className="space-y-4">
            <div>
              <InputLabel>Naziv platforme</InputLabel>
              <Input defaultValue="CarNext" />
            </div>
            <div>
              <InputLabel>Primarni email</InputLabel>
              <Input type="email" defaultValue="info@carnext.com" />
            </div>
            <div>
              <InputLabel>Telefon</InputLabel>
              <Input defaultValue="+387 61 911 654" />
            </div>
            <div>
              <InputLabel>Adresa</InputLabel>
              <Input defaultValue="Sarajevo, Bosna i Hercegovina" />
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Valuta i lokacija</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <InputLabel>Valuta</InputLabel>
              <Select defaultValue="BAM">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BAM">BAM (KM)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <InputLabel>Jezik</InputLabel>
              <Select defaultValue="bs">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bs">Bosanski</SelectItem>
                  <SelectItem value="hr">Hrvatski</SelectItem>
                  <SelectItem value="sr">Srpski</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Email notifikacije</h3>
          <div className="space-y-3">
            {["Novi upit", "Nova registracija", "Kupovina vozila", "Newsletter prijava"].map((item) => (
              <label key={item} className="flex items-center justify-between rounded-lg border border-border/50 p-3 cursor-pointer hover:bg-muted/30">
                <span className="text-body-sm text-foreground">{item}</span>
                <div className="relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full bg-primary transition-colors has-checked:bg-primary">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <span className="absolute left-0.5 size-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button>Sačuvaj podešavanja</Button>
      </div>
    </div>
  )
}
