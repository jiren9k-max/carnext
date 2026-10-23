import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_COOKIE, adminEmail, isAdminToken } from "@/lib/admin-auth"

export async function GET() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!isAdminToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({
    authenticated: true,
    user: { name: process.env.ADMIN_NAME || "Husein Holjan", email: adminEmail() },
  })
}
