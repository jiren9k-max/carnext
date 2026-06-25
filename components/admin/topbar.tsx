"use client"

import { Bell, Menu, Search } from "lucide-react"

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="size-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pretraga..."
            className="h-9 w-64 rounded-lg border border-border bg-transparent pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-ring/70 focus:ring-3 focus:ring-ring/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Bell className="size-4.5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-3 border-l border-border pl-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-small font-semibold text-primary">
            HH
          </div>
          <div className="hidden md:block">
            <p className="text-body-sm font-medium text-foreground">Husein Holjan</p>
            <p className="text-small text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}
