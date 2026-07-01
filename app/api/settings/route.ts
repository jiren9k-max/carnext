import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { seed } from "@/lib/seed"

seed()

const COLLECTION = "settings"

export async function GET() {
  const items = db.read<Record<string, string>>(COLLECTION)
  const settings = items[0] || {}
  return NextResponse.json(settings)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const items = db.read<Record<string, string>>(COLLECTION)
  if (items.length === 0) {
    db.create(COLLECTION, body as any)
  } else {
    db.update(COLLECTION, items[0].id, body)
  }
  return NextResponse.json(body)
}
