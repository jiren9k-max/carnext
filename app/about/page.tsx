"use client"

import { motion } from "framer-motion"
import { Shield, Users, Star, Car, Award, Handshake } from "lucide-react"
import { Container } from "@/components/layout/container"

const stats = [
  { icon: Car, value: "25+", label: "Vozila na stanju" },
  { icon: Users, value: "1200+", label: "Zadovoljnih kupaca" },
  { icon: Star, value: "15+", label: "Godina iskustva" },
  { icon: Award, value: "100%", label: "Transparentnost" },
]

const values = [
  {
    icon: Shield,
    title: "Provjerena vozila",
    desc: "Svako vozilo prolazi detaljnu tehničku provjeru prije nego što ga ponudimo našim kupcima.",
  },
  {
    icon: Handshake,
    title: "Fer cijene",
    desc: "Transparentno poslovanje bez skrivenih troškova. Dobijate upravo ono što vidite.",
  },
  {
    icon: Star,
    title: "Profesionalna usluga",
    desc: "Naš tim stručnjaka je tu da vam pomogne u svakom koraku, od odabira do kupovine.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h1 className="text-h1 text-foreground">O nama</h1>
          <p className="mx-auto mt-3 max-w-2xl text-body text-muted-foreground">
            CarNext je premijum auto marketplace posvećen pružanju najboljeg iskustva
            kupovine vozila u regiji.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-3xl space-y-6 text-body text-muted-foreground"
        >
          <p>
            Osnovani smo sa ciljem da promijenimo način na koji ljudi kupuju automobile.
            Vjerujemo da svako zaslužuje vozilo koje je provjereno, pouzdano i po fer cijeni.
          </p>
          <p>
            Naš tim čine stručnjaci sa više od 15 godina iskustva u auto industriji.
            Svako vozilo koje uđe u našu ponudu prolazi rigoroznu tehničku provjeru
            i detaljnu analizu stanja.
          </p>
          <p>
            Nalazimo se u Sarajevu, a naše usluge pružamo klijentima iz cijele Bosne
            i Hercegovine i regiona.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <stat.icon className="mx-auto mb-3 size-8 text-primary" />
              <div className="text-h2 font-bold text-foreground">{stat.value}</div>
              <div className="text-small text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-h2 text-foreground"
        >
          Naše vrijednosti
        </motion.h2>

        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <v.icon className="size-6 text-primary" />
              </div>
              <h3 className="mb-2 text-h5 text-foreground">{v.title}</h3>
              <p className="text-body-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  )
}
