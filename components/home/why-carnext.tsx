"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShieldCheck, FileSearch, HeadphonesIcon, PiggyBank, RefreshCw, Zap } from "lucide-react"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/shared/section-heading"

const features = [
  { icon: ShieldCheck, title: "Provjerena vozila", description: "Svako vozilo prolazi detaljnu tehničku provjeru prije prodaje." },
  { icon: FileSearch, title: "Transparentna historija", description: "Potpuni uvid u servisnu i vlasničku historiju vozila." },
  { icon: HeadphonesIcon, title: "Profesionalna podrška", description: "Tim stručnjaka na raspolaganju za sva vaša pitanja." },
  { icon: PiggyBank, title: "Finansiranje", description: "Povoljne opcije kreditiranja i lizinga prilagođene vama." },
  { icon: RefreshCw, title: "Zamjena staro za novo", description: "Vaš stari automobil mijenjamo za novi uz najbolju ponudu." },
  { icon: Zap, title: "Brza obrada upita", description: "Odgovaramo u roku od nekoliko sati, bez nepotrebnog čekanja." },
]

const steps = [
  { title: "Pronađite vozilo", description: "Pretražite našu ponudu i izaberite auto koji vam odgovara." },
  { title: "Kontaktirajte nas", description: "Pošaljite upit ili nas pozovite. Odgovaramo u najkraćem roku." },
  { title: "Testna vožnja", description: "Dogovorite termin i osjetite vozilo prije odluke." },
  { title: "Preuzmite automobil", description: "Mi rješavamo formalnosti, vi preuzimate ključeve." },
]

const counters = [
  { target: 1200, suffix: "+", label: "Zadovoljnih kupaca" },
  { target: 850, suffix: "+", label: "Prodanih vozila" },
  { target: 15, suffix: "+", label: "Godina iskustva" },
]

const ease = [0.16, 1, 0.3, 1] as const

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setCount(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <div ref={ref} className="py-8 sm:px-8 sm:py-0 sm:first:pl-0">
      <p className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-foreground tabular-nums">
        {count.toLocaleString("de-DE")}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-3 text-body-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function WhyCarNext() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0D0C0A] py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Zašto CarNext"
          title="Kupovina bez brige"
          description="Ne prodajemo samo automobile — uz svako vozilo dobijate punu podršku i potpunu transparentnost."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
              className="bg-[#0D0C0A] p-7 md:p-8"
            >
              <f.icon className="size-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-6 text-h6 text-foreground">{f.title}</h3>
              <p className="mt-2 text-body-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid divide-y divide-white/[0.08] border-y border-white/[0.08] py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-10">
          {counters.map((c) => (
            <AnimatedCounter key={c.label} {...c} />
          ))}
        </div>

        <SectionHeading
          className="mt-24"
          eyebrow="Kako funkcioniše"
          title="Od prvog klika do ključeva"
        />

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="border-t border-white/15 pt-6"
            >
              <span className="font-mono text-body-sm text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-h5 text-foreground">{s.title}</h3>
              <p className="mt-2 text-body-sm text-muted-foreground">{s.description}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
