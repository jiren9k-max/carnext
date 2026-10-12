import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, User } from "lucide-react"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6"
import { Container } from "./container"
import { Button } from "@/components/ui/button"
import { contact, contactLinks } from "@/lib/contact"

const quickLinks = [
  { href: "/", label: "Početna" },
  { href: "/inventory", label: "Vozila" },
  { href: "/about", label: "O nama" },
  { href: "/contact", label: "Kontakt" },
]

const socialLinks = [
  { label: "Facebook", href: contact.facebook, icon: FaFacebookF },
  { label: "Instagram", href: contact.instagram, icon: FaInstagram },
]

const heading = "text-caption font-semibold text-white/50"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0D0C0A]">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[140px]" />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="CarNext" width={48} height={48} className="size-12" />
              <span className="text-h2 font-bold tracking-tight text-white">
                Car<span className="text-primary">Next</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-body-sm leading-relaxed text-white/50">
              Provjerena vozila, profesionalna usluga i potpuno transparentan
              proces kupovine. Vaše povjerenje nam je najvažnije.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className={heading}>Navigacija</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className={heading}>Kontakt</h4>
            <ul className="mt-5 space-y-4 text-body-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  {contact.street}
                  <br />
                  {contact.city}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={contactLinks.tel} className="transition-colors hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={contactLinks.mail} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-primary" />
                {contact.person}
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <h4 className={heading}>Radno vrijeme</h4>
            <ul className="mt-5 space-y-2 text-body-sm">
              {contact.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="text-white/60">{h.days}</span>
                  <span className="tabular-nums text-white">{h.time}</span>
                </li>
              ))}
              <li className="flex justify-between gap-4">
                <span className="text-white/60">Nedjelja</span>
                <span className="text-white/40">Zatvoreno</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild className="flex-1 gap-2">
                <a href={contactLinks.tel}>
                  <Phone className="size-4" />
                  Pozovite
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1 gap-2 border-white/15 text-white hover:border-[#25D366]/60 hover:bg-transparent hover:text-[#25D366]">
                <a href={contactLinks.whatsapp()} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-8 text-small text-white/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} CarNext Sarajevo. Sva prava zadržana.</p>
          <p>
            {contact.street}, {contact.city}
          </p>
        </div>
      </Container>
    </footer>
  )
}
