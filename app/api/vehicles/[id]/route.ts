import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { db } from "@/lib/db"
import type { AdminVehicle } from "@/data/admin"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  const vehicle = db.getById<AdminVehicle>("vehicles", id)
  if (!vehicle) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(vehicle)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  const body = await request.json()
  const updated = db.update<AdminVehicle>("vehicles", id, { ...body, updatedAt: new Date().toISOString().split("T")[0] })
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  const removed = db.remove("vehicles", id)
  if (!removed) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
