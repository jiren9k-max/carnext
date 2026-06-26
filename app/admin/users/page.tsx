"use client"

import { Badge } from "@/components/ui/badge"
import { adminUsers, type AdminUser } from "@/data/admin"

const roleBadge: Record<AdminUser["role"], { label: string; variant: "default" | "accent" | "secondary" }> = {
  admin: { label: "Admin", variant: "default" },
  dealer: { label: "Dealer", variant: "accent" },
  user: { label: "Korisnik", variant: "secondary" },
}

const statusBadge: Record<AdminUser["status"], { label: string; variant: "success" | "secondary" | "warning" }> = {
  active: { label: "Aktivan", variant: "success" },
  inactive: { label: "Neaktivan", variant: "secondary" },
  suspended: { label: "Suspendovan", variant: "warning" },
}

export default function UsersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h3 text-foreground">Korisnici</h1>
        <p className="mt-1 text-body-sm text-muted-foreground">Upravljajte korisnicima platforme.</p>
      </div>

      <div className="overflow-hidden rounded-[var(--radius)] border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-muted-foreground">Korisnik</th>
                <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Telefon</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Uloga</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((u) => (
                <tr key={u.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-small font-semibold text-primary">
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="font-medium text-foreground">{u.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground hidden md:table-cell">{u.email}</td>
                  <td className="px-4 py-3.5 text-muted-foreground hidden lg:table-cell">{u.phone}</td>
                  <td className="px-4 py-3.5"><Badge variant={roleBadge[u.role].variant} size="sm">{roleBadge[u.role].label}</Badge></td>
                  <td className="px-4 py-3.5"><Badge variant={statusBadge[u.status].variant} size="sm">{statusBadge[u.status].label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
