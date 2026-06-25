import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-small font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-muted-foreground",
        destructive:
          "border-transparent bg-destructive/10 text-destructive",
        outline:
          "border-border text-muted-foreground",
        glass:
          "glass text-foreground border-border/50",
        accent:
          "border-primary/30 bg-primary/10 text-primary",
        success:
          "border-transparent bg-green-500/10 text-green-500",
        warning:
          "border-transparent bg-yellow-500/10 text-yellow-500",
      },
      size: {
        default: "px-2.5 py-0.5 text-small",
        sm: "px-2 py-0.5 text-caption",
        lg: "px-3.5 py-1 text-body-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
