import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { seed } from "@/lib/seed"
import type { BlogPost } from "@/data/admin"

seed()

export async function GET() {
  return NextResponse.json(db.read<BlogPost>("blog"))
}

export async function POST(request: Request) {
  const body = await request.json()
  const post: BlogPost = {
    id: Date.now().toString(),
    ...body,
    date: new Date().toISOString().split("T")[0],
    views: 0,
  }
  db.create("blog", post)
  return NextResponse.json(post, { status: 201 })
}
