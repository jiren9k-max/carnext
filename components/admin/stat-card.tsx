import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  icon: React.ComponentType<{ className?: string }>
}

export function StatCard({ label, value, change, positive, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-[var(--radius)] border border-border bg-card p-5 transition-colors hover:border-primary/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-small text-muted-foreground">{label}</p>
          <p className="mt-1 text-h3 font-bold text-foreground">{value}</p>
          {change && (
            <p className={cn("mt-1 text-small", positive ? "text-green-500" : "text-destructive")}>
              {change}
            </p>
          )}
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
      </div>
    </div>
  )
}
