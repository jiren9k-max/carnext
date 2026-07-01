"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, InputLabel } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function PrijavaPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Pogrešan email ili lozinka")
        return
      }

      router.push("/")
    } catch {
      setError("Greška pri prijavi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 pt-24">
      <Card variant="glass-strong" padding="xl" className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <LogIn className="size-6 text-primary" />
          </div>
          <h1 className="text-h5 text-foreground">Prijava</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">Dobrodošli nazad! Prijavite se na vaš račun.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.com"
              required
            />
          </div>
          <div>
            <InputLabel>Lozinka</InputLabel>
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
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
            {loading ? "Prijavljivanje..." : "Prijavi se"}
          </Button>
        </form>

        <p className="mt-6 text-center text-small text-muted-foreground">
          Nemate račun?{" "}
          <Link href="/registracija" className="text-primary hover:underline">
            Registrirajte se
          </Link>
        </p>
      </Card>
    </main>
  )
}
