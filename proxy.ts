import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_COOKIE, isAdminToken } from "@/lib/admin-auth"

// Second line of defense: every admin page and every API route needs an admin session,
// except the ones listed here. Each admin route handler also checks requireAdmin() itself.
const PUBLIC_API: { path: string; methods: string[] }[] = [
  { path: "/api/inquiry", methods: ["POST"] }, // contact and car inquiry forms
  { path: "/api/auth/login", methods: ["POST"] },
  { path: "/api/auth/logout", methods: ["POST"] },
  { path: "/api/auth/me", methods: ["GET"] },
  { path: "/api/auth/register", methods: ["POST"] },
]

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdmin = isAdminToken(request.cookies.get(ADMIN_COOKIE)?.value)

  if (pathname.startsWith("/api/")) {
    const isPublic = PUBLIC_API.some((r) => r.path === pathname && r.methods.includes(request.method))
    if (isPublic || isAdmin) return NextResponse.next()
    return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })
  }

  // /admin pages
  if (pathname === "/admin/login") {
    return isAdmin ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next()
  }
  if (!isAdmin) return NextResponse.redirect(new URL("/admin/login", request.url))
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/:path*"],
}
