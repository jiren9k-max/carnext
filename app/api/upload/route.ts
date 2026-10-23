import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")
// Only plain file names like "img-123.jpg" — no folders, no "..", no hidden files.
const SAFE_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,200}$/

export async function DELETE(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const { filename } = await request.json()
    if (typeof filename !== "string" || !SAFE_NAME.test(filename) || filename.includes("..")) {
      return NextResponse.json({ error: "Neispravan naziv datoteke" }, { status: 400 })
    }

    const filePath = path.resolve(UPLOADS_DIR, filename)
    // Defense in depth: the resolved path must stay inside public/uploads.
    if (path.dirname(filePath) !== UPLOADS_DIR) {
      return NextResponse.json({ error: "Neispravan naziv datoteke" }, { status: 400 })
    }

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 })
  }
}
