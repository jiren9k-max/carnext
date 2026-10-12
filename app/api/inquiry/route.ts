import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, vehicle } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Ime, email i poruka su obavezni" }, { status: 400 })
    }

    const inquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      subject: vehicle ? `Upit za vozilo: ${vehicle}` : "Upit sa CarNext.ba",
      message,
      status: "new" as const,
      date: new Date().toISOString().split("T")[0],
      vehicle: vehicle || undefined,
    }

    // Saving and emailing are independent: on Vercel the file database is read-only,
    // so the email alone must be enough. Only fail if the inquiry reached nobody.
    let saved = false
    try {
      db.create("inquiries", inquiry)
      saved = true
    } catch (dbErr) {
      console.warn("Saving inquiry failed (read-only filesystem?):", dbErr)
    }

    let emailed = false
    try {
      const { sendInquiryEmail } = await import("@/lib/email")
      await sendInquiryEmail({
        name,
        email,
        phone: phone || "",
        message,
        subject: inquiry.subject,
        vehicle,
      })
      emailed = true
    } catch (emailErr) {
      console.warn("Email sending failed (SMTP not configured?):", emailErr)
    }

    if (!saved && !emailed) {
      return NextResponse.json({ error: "Upit nije poslan" }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Inquiry failed:", err)
    return NextResponse.json({ error: "Upit nije poslan" }, { status: 500 })
  }
}
