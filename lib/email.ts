import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
})

export async function sendInquiryEmail(data: {
  name: string
  email: string
  phone: string
  message: string
  subject: string
  vehicle?: string
}) {
  const to = process.env.CONTACT_EMAIL || "info@carnextsarajevo.com"

  const vehicleInfo = data.vehicle ? `\n\nPovodom vozila: ${data.vehicle}` : ""

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#FF6B00">Novi upit sa CarNext.ba</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">Ime</td><td style="padding:8px 12px;border:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">Email</td><td style="padding:8px 12px;border:1px solid #ddd"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">Telefon</td><td style="padding:8px 12px;border:1px solid #ddd"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        ${data.vehicle ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">Vozilo</td><td style="padding:8px 12px;border:1px solid #ddd">${data.vehicle}</td></tr>` : ""}
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">Poruka</td><td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap">${data.message}</td></tr>
      </table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />
      <p style="color:#888;font-size:12px">Poslano sa CarNext.ba obrasca za kontakt</p>
    </div>
  `

  await transporter.sendMail({
    from: `"CarNext.ba" <${process.env.SMTP_USER || data.email}>`,
    to,
    replyTo: data.email,
    subject: data.subject,
    text: `Novi upit sa CarNext.ba\n\nIme: ${data.name}\nEmail: ${data.email}\nTelefon: ${data.phone}${vehicleInfo}\n\nPoruka:\n${data.message}`,
    html,
  })
}
