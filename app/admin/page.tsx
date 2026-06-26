"use client"

import { Car, Users, MessageSquare, Eye, TrendingUp, DollarSign } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { adminUsers, inquiries, adminVehicles } from "@/data/admin"

export default function AdminDashboard() {
  const totalRevenue = adminVehicles.reduce((sum, v) => sum + v.price, 0)
  const newInquiries = inquiries.filter((i) => i.status === "new").length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h3 text-foreground">Dashboard</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">Pregled stanja platforme.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard label="Ukupno vozila" value={String(adminVehicles.length)} icon={Car} change="+2 this month" positive />
        <StatCard label="Korisnici" value={String(adminUsers.length)} icon={Users} change="+1 this month" positive />
        <StatCard label="Upiti" value={String(inquiries.length)} icon={MessageSquare} change={`${newInquiries} new`} positive />
        <StatCard label="Pregledi" value="4,892" icon={Eye} change="+12.5%" positive />
        <StatCard label="Prihod" value={`${(totalRevenue / 1000000).toFixed(1)}M KM`} icon={DollarSign} change="+8.3%" positive />
        <StatCard label="Konverzija" value="3.2%" icon={TrendingUp} change="+0.4%" positive />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground">Nedavni upiti</h3>
          <div className="mt-4 space-y-3">
            {inquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-small font-medium text-primary">
                  {inq.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm font-medium text-foreground truncate">{inq.name}</p>
                  <p className="text-small text-muted-foreground truncate">{inq.subject}</p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-caption text-primary">
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-5">
          <h3 className="text-h6 text-foreground">Brze akcije</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Dodaj vozilo", href: "/admin/vehicles/add" },
              { label: "Pregled upita", href: "/admin/inquiries" },
              { label: "Novi blog", href: "/admin/blog" },
              { label: "Promocije", href: "/admin/promotions" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center justify-center rounded-lg border border-border bg-muted/50 p-4 text-body-sm text-foreground transition-colors hover:bg-muted hover:border-primary/20"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
