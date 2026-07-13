"use client"

import { Car, Users, Eye, DollarSign, TrendingUp, MessageSquare } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"

const monthlyData = [
  { month: "Jan", views: 420, inquiries: 12, sales: 2 },
  { month: "Feb", views: 560, inquiries: 18, sales: 3 },
  { month: "Mar", views: 720, inquiries: 24, sales: 5 },
  { month: "Apr", views: 680, inquiries: 20, sales: 4 },
  { month: "May", views: 810, inquiries: 28, sales: 6 },
  { month: "Jun", views: 940, inquiries: 32, sales: 7 },
]

const topVehicles = [
  { name: "Porsche 911 Carrera 4S", views: 1240, inquiries: 18 },
  { name: "BMW M5 Competition", views: 980, inquiries: 14 },
  { name: "Mercedes-AMG GT 63 S", views: 870, inquiries: 12 },
  { name: "Lamborghini Urus Performante", views: 760, inquiries: 10 },
]

export default function StatisticsPage() {
  const maxViews = Math.max(...monthlyData.map((d) => d.views))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h3 text-foreground">Statistika</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">Pregled analitike platforme.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Ukupni pregledi" value="4,130" icon={Eye} change="+18.3%" positive />
        <StatCard label="Upiti (ovaj mjesec)" value="28" icon={MessageSquare} change="+16.7%" positive />
        <StatCard label="Prodano (ovaj mjesec)" value="6" icon={Car} change="+50%" positive />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-6">Mjesečni pregled</h3>
          <div className="flex items-end justify-between gap-2 overflow-x-auto pb-2" style={{ height: 160, minWidth: 300 }}>
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-caption text-muted-foreground">{d.inquiries}</span>
                <div
                  className="w-full rounded-t-md bg-primary transition-all hover:bg-accent"
                  style={{ height: `${(d.views / maxViews) * 100}%`, minHeight: 20 }}
                />
                <span className="text-caption text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground mb-4">Najgledanija vozila</h3>
          <div className="space-y-4">
            {topVehicles.map((v, i) => (
              <div key={v.name} className="flex items-center gap-4">
                <span className="text-h4 font-bold text-muted-foreground/30">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm font-medium text-foreground truncate">{v.name}</p>
                  <p className="text-small text-muted-foreground">{v.views} pregleda &middot; {v.inquiries} upita</p>
                </div>
                <div className="flex items-center gap-2 text-small text-muted-foreground">
                  <TrendingUp className="size-3.5 text-green-500" />
                  +{Math.round((v.inquiries / v.views) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
