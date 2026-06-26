"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { inquiries, type Inquiry } from "@/data/admin"
import { Mail, Check, Reply } from "lucide-react"

const statusConfig: Record<Inquiry["status"], { label: string; variant: "warning" | "secondary" | "success" }> = {
  new: { label: "Novo", variant: "warning" },
  read: { label: "Pročitano", variant: "secondary" },
  replied: { label: "Odgovoreno", variant: "success" },
}

export default function InquiriesPage() {
  const [selected, setSelected] = useState<string | null>(null)

  const inq = selected ? inquiries.find((i) => i.id === selected) : null

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h3 text-foreground">Upiti kupaca</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">Pregledajte i odgovorite na upite kupaca.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-2">
          {inquiries.map((inq) => (
            <button
              key={inq.id}
              onClick={() => setSelected(inq.id)}
              className={`w-full text-left rounded-lg border p-4 transition-colors ${
                selected === inq.id ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-foreground truncate">{inq.name}</p>
                  <p className="text-small text-muted-foreground truncate mt-0.5">{inq.subject}</p>
                </div>
                <Badge variant={statusConfig[inq.status].variant} size="sm" className="shrink-0">
                  {statusConfig[inq.status].label}
                </Badge>
              </div>
              <p className="text-small text-muted-foreground mt-2">{inq.date}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {inq ? (
            <div className="rounded-[var(--radius)] border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-h6 text-foreground">{inq.subject}</h3>
                  <p className="mt-1 text-body-sm text-muted-foreground">
                    {inq.name} &middot; {inq.email} &middot; {inq.phone}
                  </p>
                </div>
                <Badge variant={statusConfig[inq.status].variant}>{statusConfig[inq.status].label}</Badge>
              </div>

              {inq.vehicle && (
                <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3">
                  <p className="text-small text-muted-foreground">Povodom vozila:</p>
                  <p className="text-body-sm font-medium text-foreground">{inq.vehicle}</p>
                </div>
              )}

              <p className="mt-4 text-body-sm text-foreground leading-relaxed">{inq.message}</p>

              <div className="mt-6 flex gap-3">
                <Button size="sm" className="gap-2"><Reply className="size-3.5" /> Odgovori</Button>
                <Button size="sm" variant="outline" className="gap-2"><Check className="size-3.5" /> Označi kao riješeno</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-border bg-card py-20">
              <Mail className="size-10 text-muted-foreground/30" />
              <p className="mt-4 text-body-sm text-muted-foreground">Izaberite upit za pregled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
