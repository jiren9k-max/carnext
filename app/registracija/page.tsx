"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserRoundPlus, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, InputLabel } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function RegistracijaPage() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Greška pri registraciji")
        return
      }

      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      if (loginRes.ok) {
        router.push("/")
      } else {
        router.push("/prijava")
      }
    } catch {
      setError("Greška pri registraciji")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 pt-24">
      <Card variant="glass-strong" padding="xl" className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <UserRoundPlus className="size-6 text-primary" />
          </div>
          <h1 className="text-h5 text-foreground">Registracija</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Kreirajte vaš račun i pratite najnovije ponude.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <InputLabel>Ime</InputLabel>
              <Input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Ime"
                required
              />
            </div>
            <div>
              <InputLabel>Prezime</InputLabel>
              <Input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Prezime"
                required
              />
            </div>
          </div>
          <div>
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vas@email.com"
              required
            />
          </div>
          <div>
            <InputLabel>Telefon (opciono)</InputLabel>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="061 911 654"
            />
          </div>
          <div>
            <InputLabel>Lozinka</InputLabel>
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimalno 6 karaktera"
                required
                minLength={6}
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-small text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registracija..." : "Registruj se"}
          </Button>
        </form>

        <p className="mt-6 text-center text-small text-muted-foreground">
          Već imate račun?{" "}
          <Link href="/prijava" className="text-primary hover:underline">
            Prijavite se
          </Link>
        </p>
      </Card>
    </main>
  )
}
