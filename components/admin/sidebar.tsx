"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Car, Users, MessageSquare, FileText, Search,
  Percent, Settings, BarChart3, ChevronLeft, X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Vozila", href: "/admin/vehicles", icon: Car },
  { label: "Korisnici", href: "/admin/users", icon: Users },
  { label: "Upiti kupaca", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Promocije", href: "/admin/promotions", icon: Percent },
  { label: "Statistika", href: "/admin/statistics", icon: BarChart3 },
  { label: "Podešavanja", href: "/admin/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link href="/admin" className="text-h5 font-bold tracking-tight text-foreground">
            Car<span className="text-primary">Next</span>
            <span className="ml-2 rounded-md bg-primary/10 px-2 py-0.5 text-small text-primary">Admin</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm transition-all",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4.5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Link href="/" className="flex items-center gap-2 text-small text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-3.5" />
            Nazad na sajt
          </Link>
        </div>
      </aside>
    </>
  )
}
