import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { Inquiry } from "@/data/admin"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const updated = db.update<Inquiry>("inquiries", id, body)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(updated)
}
