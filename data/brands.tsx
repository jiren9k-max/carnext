export interface Brand {
  id: string
  name: string
  color: string
  slug: string
  Logo: React.ComponentType<{ className?: string }>
}

const CDN = "https://cdn.jsdelivr.net/gh/vehiclespecs/brand-logos@main"

function LogoImg({ src, className }: { src: string; className?: string }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </span>
  )
}

function BMWLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/bmw-logo.svg`} className={className} />
}

function MercedesLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/mercedes-benz-logo.svg`} className={className} />
}

function AudiLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/audi-logo.svg`} className={className} />
}

function VWLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/volkswagen-logo.svg`} className={className} />
}

function SkodaLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/skoda-logo.svg`} className={className} />
}

export const brands: Brand[] = [
  { id: "bmw", name: "BMW", color: "#0066b4", slug: "bmw", Logo: BMWLogo },
  { id: "mercedes", name: "Mercedes-Benz", color: "#00a19b", slug: "mercedes-benz", Logo: MercedesLogo },
  { id: "audi", name: "Audi", color: "#d4af37", slug: "audi", Logo: AudiLogo },
  { id: "volkswagen", name: "Volkswagen", color: "#1a6b9e", slug: "volkswagen", Logo: VWLogo },
  { id: "skoda", name: "Škoda", color: "#1a6b3c", slug: "skoda", Logo: SkodaLogo },
]
