import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { db } from "@/lib/db"
import { seed } from "@/lib/seed"
import type { AdminVehicle } from "@/data/admin"

seed()

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  const vehicles = db.read<AdminVehicle>("vehicles")
  return NextResponse.json(vehicles)
}

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json()
  const vehicle: AdminVehicle = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  }
  db.create("vehicles", vehicle)
  return NextResponse.json(vehicle, { status: 201 })
}
