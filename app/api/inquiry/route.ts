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

    db.create("inquiries", inquiry)

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
    } catch (emailErr) {
      console.warn("Email sending failed (SMTP not configured):", emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
