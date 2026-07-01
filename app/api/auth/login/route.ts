import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_EMAIL = "admin@carnext.com"
const ADMIN_PASSWORD = "admin123"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")
  const cookieStore = await cookies()
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  return NextResponse.json({ success: true })
}
