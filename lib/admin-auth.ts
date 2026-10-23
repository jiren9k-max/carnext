import crypto from "crypto"
import { NextResponse } from "next/server"
import { verifySession } from "./session"

// Admin credentials live only in environment variables (.env.local locally, Vercel settings
// in production). The password is stored as a scrypt hash — create one with:
//   node scripts/hash-password.mjs
// Format: scrypt:<salt hex>:<hash hex>  (no "$", which .env files would try to expand)

export const ADMIN_COOKIE = "admin_token"
export const ADMIN_SESSION_SECONDS = 60 * 60 * 12

const KEY_LENGTH = 64

export const adminEmail = () => (process.env.ADMIN_EMAIL || "").trim().toLowerCase()

export function verifyAdminPassword(password: string): boolean {
  const [scheme, saltHex, hashHex] = (process.env.ADMIN_PASSWORD_HASH || "").split(":")
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, "hex")
  const actual = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), KEY_LENGTH)
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
}

export function isAdminToken(token: string | undefined): boolean {
  const session = verifySession(token, "admin")
  return !!session && !!adminEmail() && session.sub === adminEmail()
}

/** Call at the top of every admin-only route handler. Returns a 401 response, or null if allowed. */
export async function requireAdmin(): Promise<NextResponse | null> {
  // Loaded lazily so proxy.ts can import this module without request-scoped APIs.
  const { cookies } = await import("next/headers")
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  return isAdminToken(token) ? null : NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })
}
