import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function DELETE(request: Request) {
  try {
    const { filename } = await request.json()
    if (!filename) return NextResponse.json({ error: "No filename provided" }, { status: 400 })

    const filePath = path.join(process.cwd(), "public", "uploads", filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
