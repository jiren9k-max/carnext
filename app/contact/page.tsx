"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent("Upit sa CarNext.ba")
    const body = encodeURIComponent(
      `Ime: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\nPoruka:\n${form.message}`
    )
    window.location.href = `mailto:info@carnextsarajevo.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main className="min-h-screen pt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h1 className="text-h1 text-foreground">Kontakt</h1>
          <p className="mx-auto mt-3 max-w-lg text-body text-muted-foreground">
            Kontaktirajte nas i rado ćemo vam odgovoriti na sva pitanja.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mb-6 text-h3 text-foreground">Pošaljite nam poruku</h2>
            {sent ? (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
                <Send className="mx-auto mb-3 size-8 text-primary" />
                <p className="text-body text-foreground">
                  Hvala! Vaš email klijent je otvoren.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-small font-medium text-muted-foreground">
                    Ime i prezime
                  </label>
                  <Input
                    placeholder="Vaše ime"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-small font-medium text-muted-foreground">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="vas@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-small font-medium text-muted-foreground">
                    Telefon
                  </label>
                  <Input
                    type="tel"
                    placeholder="061 911 654"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-small font-medium text-muted-foreground">
                    Poruka
                  </label>
                  <textarea
                    placeholder="Vaša poruka..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-ring/70"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="size-4" />
                  Pošalji poruku
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h2 className="text-h3 text-foreground">Informacije</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Adresa</h4>
                  <p className="text-body-sm text-muted-foreground">
                    Kasindolska 58, Ilidža<br />71000 Sarajevo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                <Phone className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Telefon</h4>
                  <a href="tel:+38761911654" className="text-body-sm text-muted-foreground hover:text-primary transition-colors">
                    061 911 654
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                <Mail className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <a href="mailto:info@carnextsarajevo.com" className="text-body-sm text-muted-foreground hover:text-primary transition-colors">
                    info@carnextsarajevo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                <Clock className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Radno vrijeme</h4>
                  <p className="text-body-sm text-muted-foreground">
                    Pon - Pet: 09:00 - 17:00<br />
                    Sub: 09:00 - 14:00
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  )
}
