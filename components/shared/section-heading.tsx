"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  /** Rendered on the right on desktop, e.g. a "see all" link or carousel arrows */
  action?: React.ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 text-caption font-semibold text-primary">
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h2 className="mt-4 text-h1 text-foreground">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-lead text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  )
}
