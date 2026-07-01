"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import {
  ShieldCheck,
  FileSearch,
  HeadphonesIcon,
  PiggyBank,
  RefreshCw,
  Zap,
  Search,
  MessageCircle,
  Car,
  KeyRound,
} from "lucide-react"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"

const features = [
  { icon: ShieldCheck, title: "Provjerena vozila", description: "Svako vozilo prolazi detaljnu tehničku provjeru prije prodaje." },
  { icon: FileSearch, title: "Transparentna historija", description: "Potpuni uvid u servisnu i vlasničku historiju vozila." },
  { icon: HeadphonesIcon, title: "Profesionalna podrška", description: "Tim stručnjaka na raspolaganju za sva vaša pitanja." },
  { icon: PiggyBank, title: "Finansiranje", description: "Povoljne opcije kreditiranja i lizinga prilagođene vama." },
  { icon: RefreshCw, title: "Zamjena staro za novo", description: "Vaš stari automobil mijenjamo za novi uz najbolju ponudu." },
  { icon: Zap, title: "Brza obrada upita", description: "Odgovaramo u roku od nekoliko sati, bez nepotrebnog čekanja." },
]

const steps = [
  { icon: Search, title: "Pronađite vozilo", description: "Pretražite našu kolekciju premium vozila i pronađite savršen auto za sebe." },
  { icon: MessageCircle, title: "Kontaktirajte nas", description: "Pošaljite upit ili nas pozovite. Naš tim će vam odgovoriti u najkraćem roku." },
  { icon: Car, title: "Testna vožnja", description: "Dogovorite testnu vožnju i osjetite razliku. Uvjereni smo da ćete biti oduševljeni." },
  { icon: KeyRound, title: "Preuzmite automobil", description: "Završite kupovinu i preuzmite vozilo. Pokrivamo sve formalnosti umjesto vas." },
]

const counters = [
  { target: 1200, suffix: "+", label: "Zadovoljnih kupaca" },
  { target: 850, suffix: "+", label: "Prodana vozila" },
  { target: 15, suffix: "+", label: "Godina iskustva" },
]

function AnimatedCounter({
  target,
  suffix,
  label,
}: {
  target: number
  suffix: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-h1 font-bold text-primary">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-body-sm text-muted-foreground">{label}</p>
    </div>
  )
}

const iconStyle = "bg-primary/10 text-primary"

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="glass" hover="glow" padding="lg" className="h-full">
        <div className={`flex size-12 items-center justify-center rounded-xl ${iconStyle}`}>
          <Icon className="size-6" />
        </div>
        <h3 className="mt-5 text-h6 text-foreground">{title}</h3>
        <p className="mt-2 text-body-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  )
}

function StepCard({
  icon: Icon,
  title,
  description,
  step,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  step: number
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <span className="absolute -left-1 -top-1 flex size-6 items-center justify-center rounded-full bg-foreground text-small font-bold text-background">
            {step}
          </span>
          <Icon className="size-7 text-primary" />
        </div>
        <h3 className="text-h6 text-foreground">{title}</h3>
        <p className="mt-2 text-body-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

export function WhyCarNext() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24 before:absolute before:inset-x-[10%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="Road"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/50" />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 size-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-caption font-semibold text-primary">Zašto CarNext</span>
          </div>
          <h2 className="text-h1 text-white">Zašto odabrati CarNext?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lead text-white/80">
            Ne prodajemo samo automobile — nudimo kompletan premium doživljaj
            kupovine, uz punu podršku i transparentnost.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 overflow-hidden rounded-[var(--radius)] border border-white/20 bg-white/5 py-10 shadow-glass md:py-14 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
            {counters.map((c) => (
              <div key={c.label} className={counters.indexOf(c) < counters.length - 1 ? "sm:border-r sm:border-border/50" : ""}>
                <AnimatedCounter {...c} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="text-caption text-primary">Kako funkcioniše</span>
          </div>
          <h2 className="text-h1 text-foreground">Kako funkcioniše kupovina?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lead text-muted-foreground">
            Od prvog klika do preuzimanja ključeva — vodič kroz jednostavan proces.
          </p>
        </motion.div>

        <div className="relative mt-14">
          <div className="absolute left-1/2 top-8 hidden h-px w-[calc(100%-4rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StepCard key={s.title} {...s} step={i + 1} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
