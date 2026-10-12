"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import { FaViber, FaWhatsapp } from "react-icons/fa6"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { contact, contactLinks } from "@/lib/contact"

const ease = [0.16, 1, 0.3, 1] as const

const quickActions = [
  { label: "Pozovite", sub: contact.phoneDisplay, href: contactLinks.tel, icon: Phone, hover: "hover:border-primary/60" },
  { label: "WhatsApp", sub: "Pišite nam", href: contactLinks.whatsapp(), icon: FaWhatsapp, hover: "hover:border-[#25D366]/60", external: true },
  { label: "Viber", sub: "Pišite nam", href: contactLinks.viber, icon: FaViber, hover: "hover:border-[#7360F2]/60" },
]

const labelClass = "mb-1.5 block text-small font-medium text-muted-foreground"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError("Poruka nije poslana. Pozovite nas ili pokušajte ponovo.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="pt-28 md:pt-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <p className="flex items-center gap-3 text-caption font-semibold text-primary">
            <span className="h-px w-8 bg-primary" />
            Kontakt
          </p>
          <h1 className="mt-4 text-h1 text-foreground">Razgovarajmo o vašem sljedećem autu</h1>
          <p className="mt-4 text-lead text-muted-foreground">
            Pozovite nas, pišite na WhatsApp ili Viber, ili pošaljite poruku. Odgovaramo u roku od nekoliko sati.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {quickActions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 transition-colors ${a.hover}`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-foreground">
                <a.icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-body-sm font-semibold text-foreground">{a.label}</span>
                <span className="block truncate text-body-sm text-muted-foreground">{a.sub}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8 lg:col-span-7"
          >
            <h2 className="text-h4 text-foreground">Pošaljite poruku</h2>
            {sent ? (
              <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
                <CheckCircle className="mx-auto mb-4 size-10 text-emerald-500" />
                <p className="mb-2 text-h5 text-foreground">Poruka poslana!</p>
                <p className="text-body-sm text-muted-foreground">Hvala vam! Javit ćemo vam se u najkraćem roku.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>Ime i prezime</label>
                    <Input id="name" placeholder="Vaše ime" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Telefon</label>
                    <Input id="phone" type="tel" placeholder="06x xxx xxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <Input id="email" type="email" placeholder="vas@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Poruka</label>
                  <textarea
                    id="message"
                    placeholder="Koje vozilo vas zanima?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-ring/70"
                  />
                </div>
                {error && <p className="text-body-sm text-destructive">{error}</p>}
                <Button type="submit" size="lg" className="h-12 w-full gap-2 text-base" disabled={sending}>
                  <Send className="size-4" />
                  {sending ? "Slanje..." : "Pošalji poruku"}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="space-y-8 lg:col-span-5"
          >
            <div>
              <h2 className="text-caption font-semibold text-primary">Showroom</h2>
              <ul className="mt-4 space-y-4 text-body-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="text-foreground">
                    {contact.street}
                    <br />
                    <span className="text-muted-foreground">{contact.city}</span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <a href={contactLinks.tel} className="text-foreground transition-colors hover:text-primary">{contact.phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  <a href={contactLinks.mail} className="text-foreground transition-colors hover:text-primary">{contact.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-caption font-semibold text-primary">
                <Clock className="size-3.5" />
                Radno vrijeme
              </h2>
              <ul className="mt-4 text-body-sm">
                {contact.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 border-b border-border/60 py-3">
                    <span className="text-muted-foreground">{h.days}</span>
                    <span className="tabular-nums text-foreground">{h.time}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4 py-3">
                  <span className="text-muted-foreground">Nedjelja</span>
                  <span className="text-muted-foreground">Zatvoreno</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-24 mt-16 overflow-hidden rounded-2xl border border-border/60"
        >
          <iframe
            src={contactLinks.mapsEmbed}
            title="CarNext Sarajevo na mapi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[360px] w-full md:h-[440px] [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
          />
          <a
            href={contactLinks.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2.5 text-body-sm font-medium text-foreground backdrop-blur-md transition-colors hover:text-primary"
          >
            <MapPin className="size-4 text-primary" />
            Navigacija do nas
          </a>
        </motion.div>
      </Container>
    </div>
  )
}
