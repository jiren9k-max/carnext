import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { contact } from "@/lib/contact"

// Link preview for WhatsApp/Facebook/Viber shares of the site. Car pages use their own photo.
export const alt = "CarNext Sarajevo — provjerena polovna vozila"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"))
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A0C04 45%, #57260B 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={96} style={{ borderRadius: 16 }} alt="" />
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>
            Car<span style={{ color: "#E06900" }}>Next</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#E06900", fontSize: 26, letterSpacing: 6 }}>
            <div style={{ width: 48, height: 2, background: "#E06900" }} />
            SARAJEVO
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3, maxWidth: 900 }}>
            Provjerena polovna vozila
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)" }}>
            {`${contact.street} · ${contact.phoneDisplay}`}
          </div>
        </div>
      </div>
    ),
    size
  )
}
