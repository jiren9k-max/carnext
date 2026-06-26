import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "border-border",
        glass: "glass border-border/60",
        ghost: "border-transparent bg-muted/50 hover:bg-muted focus-visible:bg-transparent",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs px-2.5",
        lg: "h-10 text-base px-4",
        xl: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({ className, variant, size, type, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function InputLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="input-label"
      className={cn(
        "text-body-sm font-medium text-foreground mb-1.5 block",
        className
      )}
      {...props}
    />
  )
}

function InputError({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="input-error"
      className={cn(
        "text-small text-destructive mt-1",
        className
      )}
      {...props}
    />
  )
}

export { Input, InputLabel, InputError, inputVariants }
