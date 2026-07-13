"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Početna" },
  { href: "/inventory", label: "Vozila" },
  { href: "/about", label: "O nama" },
  { href: "/contact", label: "Kontakt" },
]

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative text-body-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const handleToggle = () => {
    if (isHome) {
      setIsOpen(!isOpen)
    } else {
      router.push("/")
      setIsOpen(true)
    }
  }

  return (
    <div className="md:hidden">
      <button
        onClick={handleToggle}
        className="relative z-50 flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5">
          <motion.span
            animate={isOpen && isHome ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 bg-foreground transition-colors"
          />
          <motion.span
            animate={isOpen && isHome ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-5 bg-foreground transition-colors"
          />
          <motion.span
            animate={isOpen && isHome ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 bg-foreground transition-colors"
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8",
              "bg-[#0A0A0A]/95 backdrop-blur-2xl"
            )}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-h2 text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
