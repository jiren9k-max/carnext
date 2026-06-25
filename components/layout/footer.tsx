"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Phone, ArrowRight, Send, MapPin, Clock } from "lucide-react"
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
  { label: "Facebook", href: "https://www.facebook.com/carnextsarajevo" },
  { label: "Instagram", href: "https://www.instagram.com/carnextsarajevo/" },
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-[200px]" />
        <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="relative transition-all duration-500 group-hover:scale-110">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-orange-500/40 group-hover:via-amber-500/30 group-hover:to-yellow-500/20 group-hover:opacity-100" />
                <Image
                  src="/logo.png"
                  alt="CarNext"
                  width={48}
                  height={48}
                  className="relative size-12"
                />
              </div>
              <span className="text-h2 font-bold tracking-tight text-white">
                Car<span className="text-primary">Next</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-body-sm leading-relaxed text-white/50">
              Premium auto marketplace. Nudimo provjerena vozila, profesionalnu uslugu
              i potpuno transparentan proces kupovine. Vaše povjerenje nam je najvažnije.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-body-sm text-white/60">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="size-4 text-white/80" />
                </div>
                <span>Husein Holjan</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-white/60">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                  <Phone className="size-4 text-white/80" />
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
            <h4 className="text-small font-semibold uppercase tracking-wider text-white/70">
              Brzi linkovi
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-body-sm text-white/50 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-small font-semibold uppercase tracking-wider text-white/70">
              Kontakt
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-body-sm text-white/50">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>Kasindolska 58, Ilidža, 71000 Sarajevo</span>
              </li>
              <li className="flex items-start gap-3 text-body-sm text-white/50">
                <Clock className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>Pon-Pet: 09:00 - 17:00<br />Sub: 09:00 - 14:00</span>
              </li>
              <li className="flex items-center gap-3 text-body-sm text-white/50">
                <Mail className="size-4 shrink-0 text-white/40" />
                <a href="mailto:info@carnextsarajevo.com" className="hover:text-primary transition-colors">
                  info@carnextsarajevo.com
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-small font-semibold uppercase tracking-wider text-white/70">
                Društvene mreže
              </h4>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/60 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                  >
                    {social.label[0]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-small font-semibold uppercase tracking-wider text-white/70">
              Novosti
            </h4>
            <p className="mt-3 text-body-sm text-white/50">
              Prijavite se za najnovije ponude i ekskluzivne informacije.
            </p>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    type="email"
                    placeholder="vaš@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-white/20 bg-white/5 pl-9 text-white placeholder:text-white/30"
                  />
                </div>
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="size-4" />
                </Button>
              </div>
            </form>

            <div className="mt-8 overflow-hidden rounded-[var(--radius)] border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />
              <p className="relative text-small text-white/60">
                Pozovite nas i dogovorite testnu vožnju već danas.
              </p>
              <a
                href="tel:+38761911654"
                className="relative mt-2 inline-flex items-center gap-1 text-h6 font-bold text-primary transition-colors hover:text-accent"
              >
                061 911 654
                <ArrowRight className="size-4" />
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-small text-white/40 transition-colors hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 md:flex-row"
        >
          <p className="text-small text-white/40">
            &copy; {new Date().getFullYear()} CarNext. Sva prava zadržana.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-small text-white/40 transition-colors hover:text-primary"
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
