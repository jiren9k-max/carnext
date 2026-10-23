import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { verifyPassword, USER_COOKIE, USER_SESSION_SECONDS, type StoredUser } from "@/lib/auth"
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, adminEmail, verifyAdminPassword } from "@/lib/admin-auth"
import { createSession, sessionCookie, sessionsEnabled } from "@/lib/session"

// Brute-force protection: after MAX_FAILURES wrong attempts from one IP, block for WINDOW_MS.
// In-memory per server instance — a speed bump, not a replacement for strong passwords.
const MAX_FAILURES = 3
const WINDOW_MS = 15 * 60 * 1000
const failures = new Map<string, { count: number; until: number }>()

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"

function blocked(ip: string) {
  const entry = failures.get(ip)
  if (!entry) return false
  if (Date.now() > entry.until) {
    failures.delete(ip)
    return false
  }
  return entry.count >= MAX_FAILURES
}

async function fail(ip: string) {
  const now = Date.now()
  const entry = failures.get(ip)
  failures.set(ip, entry && now < entry.until ? { count: entry.count + 1, until: entry.until } : { count: 1, until: now + WINDOW_MS })
  await new Promise((r) => setTimeout(r, 400)) // slow down guessing
  return NextResponse.json({ error: "Pogrešan email ili lozinka" }, { status: 401 })
}

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (blocked(ip)) {
    return NextResponse.json({ error: "Previše pokušaja. Pokušajte kasnije." }, { status: 429 })
  }

  let email = ""
  let password = ""
  try {
    const body = await request.json()
    email = String(body.email ?? "").trim().toLowerCase()
    password = String(body.password ?? "")
  } catch {
    return NextResponse.json({ error: "Neispravan zahtjev" }, { status: 400 })
  }
  if (!email || !password) {
    return NextResponse.json({ error: "Email i lozinka su obavezni" }, { status: 400 })
  }
  if (!sessionsEnabled()) {
    console.error("Login disabled: SESSION_SECRET is not set")
    return NextResponse.json({ error: "Prijava trenutno nije dostupna" }, { status: 503 })
  }

  const cookieStore = await cookies()

  if (adminEmail() && email === adminEmail()) {
    if (!verifyAdminPassword(password)) return fail(ip)
    failures.delete(ip)
    cookieStore.set(ADMIN_COOKIE, createSession(email, "admin", ADMIN_SESSION_SECONDS), sessionCookie(ADMIN_SESSION_SECONDS))
    return NextResponse.json({ success: true, role: "admin" })
  }

  let user: StoredUser | undefined
  try {
    user = db.read<StoredUser>("users").find((u) => u.email.toLowerCase() === email)
  } catch {
    user = undefined
  }
  if (!user || !verifyPassword(password, user.password, user.salt)) return fail(ip)

  failures.delete(ip)
  cookieStore.set(USER_COOKIE, createSession(user.email, "user", USER_SESSION_SECONDS), sessionCookie(USER_SESSION_SECONDS))
  return NextResponse.json({ success: true, role: "user" })
}
