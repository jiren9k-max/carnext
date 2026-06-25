"use client"

import { InputLabel } from "@/components/ui/input"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SEOPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h3 text-foreground">SEO</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">Optimizacija za pretraživače.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Meta podaci</h3>
          <div className="space-y-4">
            <div>
              <InputLabel>Meta naslov</InputLabel>
              <Input defaultValue="CarNext - Premium Auto Marketplace" />
            </div>
            <div>
              <InputLabel>Meta opis</InputLabel>
              <textarea
                rows={3}
                defaultValue="Premium auto marketplace za kupovinu i prodaju luksuznih vozila."
                className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20"
              />
            </div>
            <div>
              <InputLabel>Ključne riječi</InputLabel>
              <Input defaultValue="automobili, premium, auto marketplace, luksuzna vozila" />
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Open Graph</h3>
          <div className="space-y-4">
            <div>
              <InputLabel>OG naslov</InputLabel>
              <Input defaultValue="CarNext" />
            </div>
            <div>
              <InputLabel>OG opis</InputLabel>
              <textarea rows={2} defaultValue="Premium auto marketplace" className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20" />
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Sitemap</h3>
          <div className="flex items-center justify-between rounded-lg border border-border/50 p-3">
            <span className="text-body-sm text-muted-foreground">sitemap.xml</span>
            <span className="text-small text-green-500">Automatski generisan</span>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-border/50 p-3">
            <span className="text-body-sm text-muted-foreground">robots.txt</span>
            <span className="text-small text-green-500">Automatski generisan</span>
          </div>
        </div>

        <Button>Sačuvaj promjene</Button>
      </div>
    </div>
  )
}
