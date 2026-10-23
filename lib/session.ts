import crypto from "crypto"

// Signed session tokens: base64url(payload) + "." + base64url(HMAC-SHA256(payload)).
// Without SESSION_SECRET nobody can log in — there is deliberately no fallback secret.

export type Role = "admin" | "user"

interface SessionPayload {
  sub: string // email
  role: Role
  exp: number // unix seconds
}

const secret = () => process.env.SESSION_SECRET || ""

const sign = (data: string) =>
  crypto.createHmac("sha256", secret()).update(data).digest("base64url")

export function sessionsEnabled() {
  return secret().length >= 32
}

export function createSession(sub: string, role: Role, maxAgeSeconds: number): string {
  if (!sessionsEnabled()) throw new Error("SESSION_SECRET is not set (min. 32 characters)")
  const payload: SessionPayload = { sub, role, exp: Math.floor(Date.now() / 1000) + maxAgeSeconds }
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return `${body}.${sign(body)}`
}

export function verifySession(token: string | undefined, role: Role): SessionPayload | null {
  if (!token || !sessionsEnabled()) return null
  const [body, mac] = token.split(".")
  if (!body || !mac) return null

  const expected = Buffer.from(sign(body))
  const given = Buffer.from(mac)
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload
    if (payload.role !== role || typeof payload.sub !== "string") return null
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export const sessionCookie = (maxAgeSeconds: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: maxAgeSeconds,
})
