"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, ArrowRight, Send } from "lucide-react"
import { Container } from "./container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { href: "/", label: "Početna" },
  { href: "/inventory", label: "Vozila" },
  { href: "/about", label: "O nama" },
  { href: "/contact", label: "Kontakt" },
]

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
]

const legalLinks = [
  { href: "#", label: "Politika privatnosti" },
  { href: "#", label: "Uslovi korištenja" },
  { href: "#", label: "Cookie politika" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block text-h4 font-bold tracking-tight text-foreground"
            >
              Car<span className="text-primary">Next</span>
            </Link>
            <p className="mt-4 max-w-sm text-body-sm leading-relaxed text-muted-foreground">
              Premium auto marketplace. Nudimo provjerena vozila, profesionalnu uslugu
              i potpuno transparentan proces kupovine. Vaše povjerenje nam je najvažnije.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-4 text-primary" />
                </div>
                <span>Husein Holjan</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-4 text-primary" />
                </div>
                <a
                  href="tel:+38761911654"
                  className="transition-colors hover:text-primary"
                >
                  061 911 654
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-small font-semibold uppercase tracking-wider text-foreground">
              Brzi linkovi
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-small font-semibold uppercase tracking-wider text-foreground">
              Društvene mreže
            </h4>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    className="group inline-flex items-center gap-3 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                      <span className="text-small font-medium text-muted-foreground transition-colors group-hover:text-primary">
                        {social.label[0]}
                      </span>
                    </span>
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-small font-semibold uppercase tracking-wider text-foreground">
              Pravni linkovi
            </h4>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-small font-semibold uppercase tracking-wider text-foreground">
              Novosti
            </h4>
            <p className="mt-3 text-body-sm text-muted-foreground">
              Prijavite se za najnovije ponude i ekskluzivne informacije.
            </p>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="vaš@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9"
                  />
                </div>
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="size-4" />
                </Button>
              </div>
            </form>

            <div className="mt-8 rounded-lg border border-border/50 bg-card p-4">
              <p className="text-small text-muted-foreground">
                Pozovite nas i dogovorite testnu vožnju već danas.
              </p>
              <a
                href="tel:+38761911654"
                className="mt-1 inline-flex items-center gap-1 text-h6 font-bold text-primary transition-colors hover:text-accent"
              >
                061 911 654
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 md:flex-row"
        >
          <p className="text-small text-muted-foreground">
            &copy; {new Date().getFullYear()} CarNext. Sva prava zadržana.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-small text-muted-foreground transition-colors hover:text-primary"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
