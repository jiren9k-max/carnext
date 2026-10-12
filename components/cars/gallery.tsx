"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryProps {
  images: string[]
  alt: string
  children?: React.ReactNode
}

const navButton =
  "flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70"

export function Gallery({ images, alt, children }: GalleryProps) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const strip = useRef<HTMLDivElement>(null)
  const thumbs = useRef<(HTMLButtonElement | null)[]>([])
  const count = images.length

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  )

  // Center the active thumbnail by scrolling only the strip, never the page.
  useEffect(() => {
    const el = thumbs.current[index]
    const container = strip.current
    if (!el || !container) return
    container.scrollTo({
      left: el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    })
  }, [index])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, go])

  return (
    <div>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-card">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${alt} – slika ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setOpen(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label="Otvori galeriju preko cijelog ekrana"
        />

        {children}

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Prethodna slika"
              className={cn(navButton, "absolute left-4 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100")}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Sljedeća slika"
              className={cn(navButton, "absolute right-4 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100")}
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2">
          <span className="rounded-full bg-black/50 px-3 py-1.5 font-mono text-small tabular-nums text-white backdrop-blur-md">
            {index + 1} / {count}
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md">
            <Expand className="size-3.5" />
          </span>
        </div>
      </div>

      {count > 1 && (
        <div ref={strip} className="relative mt-3 flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img}
              ref={(el) => {
                thumbs.current[i] = el
              }}
              onClick={() => setIndex(i)}
              aria-label={`Slika ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-background transition-all sm:w-28",
                i === index ? "ring-primary" : "opacity-50 ring-transparent hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex flex-col bg-black/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <div className="flex items-center justify-between px-4 py-4 md:px-8">
              <p className="truncate text-body-sm text-white/70">{alt}</p>
              <div className="flex items-center gap-4">
                <span className="font-mono text-body-sm tabular-nums text-white/70">
                  {index + 1} / {count}
                </span>
                <button onClick={() => setOpen(false)} aria-label="Zatvori" className={navButton}>
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1" onClick={() => setOpen(false)}>
              <Image
                key={index}
                src={images[index]}
                alt={`${alt} – slika ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                onClick={(e) => e.stopPropagation()}
              />
              {count > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      go(-1)
                    }}
                    aria-label="Prethodna slika"
                    className={cn(navButton, "absolute left-4 top-1/2 -translate-y-1/2 md:left-8")}
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      go(1)
                    }}
                    aria-label="Sljedeća slika"
                    className={cn(navButton, "absolute right-4 top-1/2 -translate-y-1/2 md:right-8")}
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            <div className="overflow-x-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mx-auto flex w-max gap-2 p-1">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setIndex(i)}
                  aria-label={`Slika ${i + 1}`}
                  className={cn(
                    "relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-md transition-opacity",
                    i === index ? "opacity-100 ring-2 ring-primary" : "opacity-40 hover:opacity-80"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
