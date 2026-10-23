import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { db } from "@/lib/db"
import { seed } from "@/lib/seed"
import type { Inquiry } from "@/data/admin"

seed()

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  return NextResponse.json(db.read<Inquiry>("inquiries"))
}

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json()
  const inquiry: Inquiry = {
    id: Date.now().toString(),
    ...body,
    status: "new",
    date: new Date().toISOString().split("T")[0],
  }
  db.create("inquiries", inquiry)
  return NextResponse.json(inquiry, { status: 201 })
}
