import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { db } from "@/lib/db"
import { seed } from "@/lib/seed"

seed()

const COLLECTION = "seo"

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  const items = db.read<Record<string, string>>(COLLECTION)
  const seo = items[0] || {}
  return NextResponse.json(seo)
}

export async function PUT(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json()
  const items = db.read<Record<string, string>>(COLLECTION)
  if (items.length === 0) {
    db.create(COLLECTION, body as any)
  } else {
    db.update(COLLECTION, items[0].id, body)
  }
  return NextResponse.json(body)
}
