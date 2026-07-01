import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_EMAIL = "admin@carnext.com"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const decoded = Buffer.from(token, "base64").toString("utf-8")
  const email = decoded.split(":")[0]

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, user: { name: "Husein Holjan", email: ADMIN_EMAIL } })
}
