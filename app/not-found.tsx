"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10"
        >
          <Car className="size-10 text-primary" />
        </motion.div>

        <h1 className="text-display font-bold text-foreground">404</h1>
        <p className="mt-2 text-h3 text-muted-foreground">Stranica nije pronađena</p>
        <p className="mx-auto mt-4 max-w-md text-body text-muted-foreground">
          Izgleda da ste skrenuli sa pravog puta. Vratite se na početnu i nastavite
          istraživati našu ponudu vozila.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Početna
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/inventory">Pregledaj vozila</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
