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

function NissanLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/nissan-logo.svg`} className={className} />
}

function RenaultLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/renault-logo.svg`} className={className} />
}

function PeugeotLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/peugeot-logo.svg`} className={className} />
}

function LandRoverLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/land-rover-logo.svg`} className={className} />
}

function FiatLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/fiat-logo.svg`} className={className} />
}

function CitroenLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/citroen-logo.svg`} className={className} />
}

function HyundaiLogo({ className }: { className?: string }) {
  return <LogoImg src={`${CDN}/hyundai-logo.svg`} className={className} />
}

export const brands: Brand[] = [
  { id: "bmw", name: "BMW", color: "#0066b4", slug: "bmw", Logo: BMWLogo },
  { id: "mercedes", name: "Mercedes-Benz", color: "#00a19b", slug: "mercedes-benz", Logo: MercedesLogo },
  { id: "audi", name: "Audi", color: "#d4af37", slug: "audi", Logo: AudiLogo },
  { id: "volkswagen", name: "Volkswagen", color: "#1a6b9e", slug: "volkswagen", Logo: VWLogo },
  { id: "skoda", name: "Škoda", color: "#1a6b3c", slug: "skoda", Logo: SkodaLogo },
  { id: "nissan", name: "Nissan", color: "#c3002f", slug: "nissan", Logo: NissanLogo },
  { id: "renault", name: "Renault", color: "#ffd200", slug: "renault", Logo: RenaultLogo },
  { id: "peugeot", name: "Peugeot", color: "#003a70", slug: "peugeot", Logo: PeugeotLogo },
  { id: "land-rover", name: "Land Rover", color: "#00a650", slug: "land-rover", Logo: LandRoverLogo },
  { id: "fiat", name: "Fiat", color: "#8c1a1a", slug: "fiat", Logo: FiatLogo },
  { id: "citroen", name: "Citroen", color: "#6e6e6e", slug: "citroen", Logo: CitroenLogo },
  { id: "hyundai", name: "Hyundai", color: "#003fa5", slug: "hyundai", Logo: HyundaiLogo },
]
