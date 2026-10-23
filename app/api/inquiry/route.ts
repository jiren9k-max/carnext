import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { emailConfigured, sendInquiryEmail } from "@/lib/email"

// Public endpoint for the contact and car inquiry forms.
const LIMITS = { name: 100, email: 200, phone: 40, message: 5000, vehicle: 200 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Neispravan zahtjev" }, { status: 400 })
  }

  const name = field(body.name, LIMITS.name)
  const email = field(body.email, LIMITS.email)
  const phone = field(body.phone, LIMITS.phone)
  const message = field(body.message, LIMITS.message)
  const vehicle = field(body.vehicle, LIMITS.vehicle)

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ime, ispravan email i poruka su obavezni" }, { status: 400 })
  }

  const subject = vehicle ? `Upit za vozilo: ${vehicle}` : "Upit sa CarNext sajta"
  const inquiry = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    subject,
    message,
    status: "new" as const,
    date: new Date().toISOString().split("T")[0],
    vehicle: vehicle || undefined,
  }

  // Saving and emailing are independent: on Vercel the file database is read-only.
  let saved = false
  try {
    db.create("inquiries", inquiry)
    saved = true
  } catch (err) {
    console.warn("Saving inquiry failed (read-only filesystem?):", err)
  }

  let emailed = false
  if (emailConfigured()) {
    try {
      await sendInquiryEmail({ name, email, phone, message, subject, vehicle: vehicle || undefined })
      emailed = true
    } catch (err) {
      console.error("Sending inquiry email failed:", err)
    }
  } else {
    console.warn("SMTP is not configured — inquiry was not emailed")
  }

  // On the live site someone must actually be notified, so success means the email went out.
  // Locally (no SMTP) a saved inquiry is enough — it shows up in the admin dashboard.
  const delivered = emailed || (saved && process.env.NODE_ENV !== "production")
  if (!delivered) {
    return NextResponse.json({ error: "Upit nije poslan" }, { status: 503 })
  }
  return NextResponse.json({ success: true })
}
