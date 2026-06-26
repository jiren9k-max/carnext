import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    as: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    as: "h1",
    tone: "default",
  },
})

export interface HeadingProps
  extends React.ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function Heading({ className, as = "h1", tone, ...props }: HeadingProps) {
  const Comp = as

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ as, tone, className }))}
      {...props}
    />
  )
}

export interface TextProps extends React.ComponentProps<"p"> {
  variant?: "body" | "body-sm" | "small" | "caption" | "lead"
  color?: "default" | "muted" | "primary"
}

function Text({
  className,
  variant = "body",
  color = "default",
  ...props
}: TextProps) {
  return (
    <p
      data-slot="text"
      className={cn(
        {
          "text-lead": variant === "lead",
          "text-body": variant === "body",
          "text-body-sm": variant === "body-sm",
          "text-small text-muted-foreground": variant === "small",
          "text-caption text-muted-foreground": variant === "caption",
          "text-primary": color === "primary",
          "text-muted-foreground": color === "muted",
        },
        className
      )}
      {...props}
    />
  )
}

export { Heading, Text }
