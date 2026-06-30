export interface Brand {
  id: string
  name: string
  color: string
  slug: string
  Logo: React.ComponentType<{ className?: string }>
}

const strokeClass = "stroke-current transition-colors duration-500"
const fillClass = "fill-current transition-colors duration-500"

function BMWLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" className={strokeClass} strokeWidth="5" />
      <circle cx="60" cy="60" r="42" className={strokeClass} strokeWidth="3" />
      <path d="M60 18 A42 42 0 0 1 60 102" className={fillClass} />
      <path d="M60 18 A42 42 0 0 0 60 102" className={fillClass} opacity="0.3" />
      <text x="60" y="66" textAnchor="middle" className={fillClass} fontSize="11" fontWeight="700" fontFamily="Geist,sans-serif">BMW</text>
    </svg>
  )
}

function MercedesLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" className={strokeClass} strokeWidth="5" />
      <path d="M60 14 L60 60 M60 60 L96 96 M60 60 L24 96" className={strokeClass} strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="8" className={fillClass} />
    </svg>
  )
}

function AudiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={18 + i * 28} cy="30" r="13.5" className={strokeClass} strokeWidth="3.5" />
      ))}
      <text x="60" y="54" textAnchor="middle" className={fillClass} fontSize="9" fontWeight="600" fontFamily="Geist,sans-serif">AUDI</text>
    </svg>
  )
}

function VWLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" className={strokeClass} strokeWidth="5" />
      <path d="M60 14 L38 104 M60 14 L82 104 M44 74 L76 74" className={strokeClass} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ToyotaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="45" rx="38" ry="18" className={strokeClass} strokeWidth="3.5" />
      <ellipse cx="60" cy="45" rx="18" ry="38" className={strokeClass} strokeWidth="3.5" />
      <circle cx="60" cy="45" r="6" className={fillClass} />
      <text x="60" y="86" textAnchor="middle" className={fillClass} fontSize="10" fontWeight="700" fontFamily="Geist,sans-serif" letterSpacing="1">TOYOTA</text>
    </svg>
  )
}

function SkodaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" className={strokeClass} strokeWidth="5" />
      <path d="M32 32 L60 60 L88 32 M32 32 L32 88 L60 60 M88 32 L88 88 L60 60" className={strokeClass} strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="60" cy="60" r="4" className={fillClass} />
    </svg>
  )
}

export const brands: Brand[] = [
  { id: "bmw", name: "BMW", color: "#0066b4", slug: "bmw", Logo: BMWLogo },
  { id: "mercedes", name: "Mercedes-Benz", color: "#00a19b", slug: "mercedes-benz", Logo: MercedesLogo },
  { id: "audi", name: "Audi", color: "#d4af37", slug: "audi", Logo: AudiLogo },
  { id: "volkswagen", name: "Volkswagen", color: "#1a6b9e", slug: "volkswagen", Logo: VWLogo },
  { id: "toyota", name: "Toyota", color: "#e82127", slug: "toyota", Logo: ToyotaLogo },
  { id: "skoda", name: "Škoda", color: "#1a6b3c", slug: "skoda", Logo: SkodaLogo },
]
