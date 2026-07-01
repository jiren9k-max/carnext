"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, X, HelpCircle, Building2, Shield, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, InputLabel } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type FormData = {
  vorhaben: string
  vorname: string
  nachname: string
  email: string
  telefon: string
  wohnort: string
  firmenname: string
  firmenzweck: string
  kanton: string
  firmensitz: string
  start: string
  paket: string
}

const kantonListe = [
  "AG", "BE", "BS", "BL", "FR", "GE", "GL", "GR",
  "JU", "LU", "NE", "NW", "OW", "SG", "SH", "SO",
  "SZ", "TG", "TI", "UR", "VD", "VS", "ZG", "ZH",
]

const vorhabenOptionen = [
  {
    value: "Einzelfirma",
    label: "Einzelfirma",
    desc: "Einfach & schnell. Ideal für Einzelpersonen, Kleingewerbe und Freelancer.",
    icon: Building2,
  },
  {
    value: "GmbH",
    label: "GmbH",
    desc: "Haftungsbeschränkt & professionell. Beliebt bei Startups und KMU.",
    icon: Shield,
  },
  {
    value: "AG",
    label: "AG",
    desc: "Kapitalgesellschaft mit Aktien. Für grössere Vorhaben und Investoren.",
    icon: FileText,
  },
  {
    value: "Ich weiss noch nicht",
    label: "Ich weiss noch nicht",
    desc: "Kein Problem. Wir beraten dich persönlich und finden die passende Lösung.",
    icon: HelpCircle,
  },
]

const paketOptionen = [
  {
    value: "Basic",
    name: "Basic",
    price: "CHF 0.–",
    statt: "150.–",
    desc: "Gründungsunterlagen, Namenscheck, digitale Abwicklung",
    tag: null,
  },
  {
    value: "Pro",
    name: "Pro",
    price: "CHF 0.–",
    statt: "450.–",
    desc: "Beratung, MWST-/SVA-/SUVA-Anmeldung, Versicherungs-Check",
    tag: "Empfohlen",
  },
  {
    value: "Premium",
    name: "Premium",
    price: "CHF 0.–",
    statt: "750.–",
    desc: "Prioritäre Bearbeitung, Strategiegespräch, Branchenabklärung",
    tag: null,
  },
]

const steps = ["Vorhaben", "Angaben", "Firmendaten", "Paket", "Bestätigung"]

function DotGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.2" fill="currentColor" className="text-primary/30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  )
}

export default function FirmengruendungPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [data, setData] = useState<FormData>({
    vorhaben: "",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    wohnort: "",
    firmenname: "",
    firmenzweck: "",
    kanton: "",
    firmensitz: "",
    start: "sofort",
    paket: "Pro",
  })

  function updateField(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: false }))
  }

  function validateStep(step: number): boolean {
    const newErrors: Record<string, boolean> = {}
    if (step === 1 && !data.vorhaben) newErrors.vorhaben = true
    if (step === 2) {
      if (!data.vorname.trim()) newErrors.vorname = true
      if (!data.nachname.trim()) newErrors.nachname = true
      if (!data.email.trim()) newErrors.email = true
      if (!data.telefon.trim()) newErrors.telefon = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function nextStep() {
    if (!validateStep(step)) return
    if (step < 5) setStep(step + 1)
  }

  function prevStep() {
    if (step > 1) setStep(step - 1)
  }

  function submitForm() {
    localStorage.setItem("dinifirma_lead", JSON.stringify(data))
    setTimeout(() => {
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-background text-foreground">
        <DotGrid />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <Card variant="glass-strong" padding="xl" className="max-w-md w-full text-center animate-fade-up">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-500/20">
              <Check className="size-8 text-green-500" />
            </div>
            <h1 className="text-h3 mb-2">Anfrage versendet!</h1>
            <p className="text-body-sm text-muted-foreground mb-6">
              Wir melden uns innerhalb von 24 Stunden bei dir.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <DotGrid />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold tracking-tight">dinifirma.ch</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Zurück</Link>
          </Button>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <Card variant="glass-strong" padding="xl">
            {/* Step Indicator */}
            <div className="relative mb-10">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
              <div className="relative flex justify-between">
                {steps.map((label, i) => {
                  const stepNum = i + 1
                  const isActive = stepNum === step
                  const isDone = stepNum < step
                  return (
                    <div key={label} className="flex flex-col items-center gap-1.5 z-10">
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                          isActive || isDone
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isDone ? <Check className="size-3.5" /> : stepNum}
                      </div>
                      <span
                        className={`text-[10px] font-medium tracking-wider uppercase ${
                          isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Step 1: Vorhaben */}
            {step === 1 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h1 className="text-h4 mb-1">Was möchtest du gründen?</h1>
                  <p className="text-body-sm text-muted-foreground">Wähle die passende Rechtsform für dein Vorhaben.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {vorhabenOptionen.map((opt) => {
                    const Icon = opt.icon
                    const selected = data.vorhaben === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateField("vorhaben", opt.value)}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition-all ${
                          selected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                        }`}
                      >
                        <div className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                          selected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        }`}>
                          <Icon className="size-5" />
                        </div>
                        <strong className="text-sm">{opt.label}</strong>
                        <span className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</span>
                      </button>
                    )
                  })}
                </div>
                {errors.vorhaben && <p className="text-small text-destructive">Bitte wähle eine Option aus.</p>}
                <div className="flex justify-end">
                  <Button onClick={nextStep} className="gap-2">
                    Weiter <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Angaben */}
            {step === 2 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h1 className="text-h4 mb-1">Deine Angaben</h1>
                  <p className="text-body-sm text-muted-foreground">Wie können wir dich erreichen?</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <InputLabel>Vorname *</InputLabel>
                    <Input
                      value={data.vorname}
                      onChange={(e) => updateField("vorname", e.target.value)}
                      className={errors.vorname ? "border-destructive" : ""}
                    />
                  </div>
                  <div>
                    <InputLabel>Nachname *</InputLabel>
                    <Input
                      value={data.nachname}
                      onChange={(e) => updateField("nachname", e.target.value)}
                      className={errors.nachname ? "border-destructive" : ""}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputLabel>E-Mail *</InputLabel>
                    <Input
                      type="email"
                      value={data.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputLabel>Telefon *</InputLabel>
                    <Input
                      type="tel"
                      value={data.telefon}
                      onChange={(e) => updateField("telefon", e.target.value)}
                      className={errors.telefon ? "border-destructive" : ""}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputLabel>Wohnort</InputLabel>
                    <Input
                      value={data.wohnort}
                      onChange={(e) => updateField("wohnort", e.target.value)}
                      placeholder="z.B. St. Gallen"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="gap-2">
                    <ArrowLeft className="size-4" /> Zurück
                  </Button>
                  <Button onClick={nextStep} className="gap-2">
                    Weiter <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Firmendaten */}
            {step === 3 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h1 className="text-h4 mb-1">Deine Firmendaten</h1>
                  <p className="text-body-sm text-muted-foreground">Gib uns erste Infos zu deiner zukünftigen Firma.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <InputLabel>Gewünschter Firmenname</InputLabel>
                    <Input
                      value={data.firmenname}
                      onChange={(e) => updateField("firmenname", e.target.value)}
                      placeholder="z.B. Meine Firma GmbH"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputLabel>Firmenzweck (kurze Beschreibung)</InputLabel>
                    <textarea
                      value={data.firmenzweck}
                      onChange={(e) => updateField("firmenzweck", e.target.value)}
                      rows={2}
                      placeholder="Was macht deine Firma?"
                      className="flex w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/20 resize-none"
                    />
                  </div>
                  <div>
                    <InputLabel>Kanton</InputLabel>
                    <select
                      value={data.kanton}
                      onChange={(e) => updateField("kanton", e.target.value)}
                      className="flex h-9 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/20"
                    >
                      <option value="" className="bg-background">Bitte wählen</option>
                      {kantonListe.map((k) => (
                        <option key={k} value={k} className="bg-background">{k}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <InputLabel>Firmensitz</InputLabel>
                    <Input
                      value={data.firmensitz}
                      onChange={(e) => updateField("firmensitz", e.target.value)}
                      placeholder="Ort"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputLabel>Geplanter Start</InputLabel>
                    <select
                      value={data.start}
                      onChange={(e) => updateField("start", e.target.value)}
                      className="flex h-9 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/20"
                    >
                      <option value="sofort" className="bg-background">So schnell wie möglich</option>
                      <option value="30-tage" className="bg-background">Innerhalb von 30 Tagen</option>
                      <option value="3-monate" className="bg-background">Innerhalb von 3 Monaten</option>
                      <option value="unbestimmt" className="bg-background">Ich informiere mich erstmal</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="gap-2">
                    <ArrowLeft className="size-4" /> Zurück
                  </Button>
                  <Button onClick={nextStep} className="gap-2">
                    Weiter <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Paket */}
            {step === 4 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h1 className="text-h4 mb-1">Dein Wunschpaket</h1>
                  <p className="text-body-sm text-muted-foreground">Wähle das Paket, das zu deinem Vorhaben passt.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {paketOptionen.map((opt) => {
                    const selected = data.paket === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateField("paket", opt.value)}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition-all ${
                          selected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                        }`}
                      >
                        {opt.tag && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {opt.tag}
                          </span>
                        )}
                        <div className="text-sm font-semibold">{opt.name}</div>
                        <div className="text-2xl font-extrabold text-primary tracking-tight">
                          {opt.price} <span className="text-xs font-normal text-muted-foreground">statt {opt.statt}</span>
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</div>
                      </button>
                    )
                  })}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="gap-2">
                    <ArrowLeft className="size-4" /> Zurück
                  </Button>
                  <Button onClick={nextStep} className="gap-2">
                    Weiter <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Bestätigung */}
            {step === 5 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <h1 className="text-h4 mb-1">Fast geschafft!</h1>
                  <p className="text-body-sm text-muted-foreground">Bitte überprüfe deine Angaben.</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Vorhaben</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rechtsform</span>
                      <span className="font-medium">{data.vorhaben || "–"}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Deine Angaben</h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{data.vorname} {data.nachname}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">E-Mail</span>
                        <span className="font-medium">{data.email || "–"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Telefon</span>
                        <span className="font-medium">{data.telefon || "–"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Firmendaten</h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Firmenname</span>
                        <span className="font-medium">{data.firmenname || "–"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Kanton / Sitz</span>
                        <span className="font-medium">{[data.kanton, data.firmensitz].filter(Boolean).join(" / ") || "–"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Paket</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Gewähltes Paket</span>
                      <span className="font-medium">{data.paket}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="gap-2">
                    <ArrowLeft className="size-4" /> Zurück
                  </Button>
                  <Button onClick={submitForm} className="gap-2">
                    <Sparkles className="size-4" /> Anfrage senden
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">dinifirma.ch</Link>
          <span className="mx-2">&middot;</span>
          <Link href="#" className="hover:text-primary transition-colors">Impressum</Link>
          <span className="mx-2">&middot;</span>
          <Link href="#" className="hover:text-primary transition-colors">Datenschutz</Link>
        </p>
      </footer>
    </div>
  )
}
