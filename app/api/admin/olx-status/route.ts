import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"

// Admin-only health check: can this server reach the OLX API right now?
export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  const shop = process.env.OLX_SHOP_USERNAME || "CarNextSarajevo"
  const started = Date.now()
  try {
    const res = await fetch(`https://api.olx.ba/users/${shop}/listings?page=1`, {
      headers: { Accept: "application/json", "User-Agent": "CarNext website (carnextsarajevo.com)" },
      cache: "no-store",
    })
    const text = await res.text()
    let total: number | null = null
    try {
      total = JSON.parse(text)?.meta?.total ?? null
    } catch {}
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      ms: Date.now() - started,
      total,
      region: process.env.VERCEL_REGION ?? "local",
      rateLimitRemaining: res.headers.get("x-ratelimit-remaining"),
      retryAfter: res.headers.get("retry-after"),
      server: res.headers.get("server"),
      bodyStart: res.ok ? undefined : text.slice(0, 300),
    })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err), ms: Date.now() - started })
  }
}
