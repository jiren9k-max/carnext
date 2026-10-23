import nodemailer from "nodemailer"

/** True when SMTP credentials are configured (Vercel → Settings → Environment Variables). */
export const emailConfigured = () => !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

const transporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

// Customer input goes into the HTML email — escape it so nobody can inject markup or links.
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

// Header fields must not contain line breaks (header injection).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim()

export async function sendInquiryEmail(data: {
  name: string
  email: string
  phone: string
  message: string
  subject: string
  vehicle?: string
}) {
  if (!emailConfigured()) throw new Error("SMTP is not configured")

  const to = process.env.CONTACT_EMAIL || "info@carnextsarajevo.com"
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">${label}</td><td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap">${esc(value)}</td></tr>`

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#E06900">Novi upit sa CarNext sajta</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        ${row("Ime", data.name)}
        ${row("Email", data.email)}
        ${row("Telefon", data.phone || "—")}
        ${data.vehicle ? row("Vozilo", data.vehicle) : ""}
        ${row("Poruka", data.message)}
      </table>
      <p style="color:#888;font-size:12px;margin-top:24px">Odgovorite direktno na ovaj email da odgovorite kupcu.</p>
    </div>
  `

  await transporter().sendMail({
    from: `"CarNext sajt" <${process.env.SMTP_USER}>`,
    to,
    replyTo: oneLine(data.email),
    subject: oneLine(data.subject),
    text: `Novi upit sa CarNext sajta\n\nIme: ${data.name}\nEmail: ${data.email}\nTelefon: ${data.phone}${data.vehicle ? `\nVozilo: ${data.vehicle}` : ""}\n\nPoruka:\n${data.message}`,
    html,
  })
}
