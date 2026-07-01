import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { seed } from "@/lib/seed"
import type { Promotion } from "@/data/admin"

seed()

export async function GET() {
  return NextResponse.json(db.read<Promotion>("promotions"))
}

export async function POST(request: Request) {
  const body = await request.json()
  const promo: Promotion = {
    id: Date.now().toString(),
    ...body,
  }
  db.create("promotions", promo)
  return NextResponse.json(promo, { status: 201 })
}
