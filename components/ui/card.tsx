import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-[var(--radius)] transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border border-border shadow-card",
        glass: "glass text-card-foreground shadow-glass",
        "glass-strong": "glass-strong text-card-foreground shadow-glass",
        "glass-accent": "glass-accent text-card-foreground shadow-glass",
        elevated: "bg-card text-card-foreground border border-border shadow-elevated",
        outline: "border border-border bg-transparent text-card-foreground",
      },
      hover: {
        off: "",
        lift: "hover-lift cursor-pointer",
        glow: "hover-glow cursor-pointer",
        scale: "hover-scale cursor-pointer",
        borderAccent: "hover-border-accent cursor-pointer",
      },
      padding: {
        off: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "off",
      padding: "lg",
    },
  }
)

interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, hover, padding, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, hover, padding, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-h4 font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-3 pt-4", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}
