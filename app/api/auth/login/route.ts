import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { verifyPassword, createUserToken, type StoredUser } from "@/lib/auth"

const ADMIN_EMAIL = "admin@carnext.com"
const ADMIN_PASSWORD = "admin123"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email i lozinka su obavezni" }, { status: 400 })
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")
    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
    return NextResponse.json({ success: true, role: "admin" })
  }

  const users = db.read<StoredUser>("users")
  const user = users.find((u) => u.email === email)

  if (!user || !verifyPassword(password, user.password, user.salt)) {
    return NextResponse.json({ error: "Pogrešan email ili lozinka" }, { status: 401 })
  }

  const token = createUserToken(email)
  const cookieStore = await cookies()
  cookieStore.set("user_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ success: true, role: "user" })
}
