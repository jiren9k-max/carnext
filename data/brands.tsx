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

function PorscheLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="100" rx="20" className={strokeClass} strokeWidth="4" />
      <text x="60" y="52" textAnchor="middle" className={fillClass} fontSize="11" fontWeight="700" fontFamily="Geist,sans-serif" letterSpacing="2">PORSCHE</text>
      <rect x="35" y="60" width="50" height="2" className={fillClass} />
      <text x="60" y="78" textAnchor="middle" className={fillClass} fontSize="7" fontWeight="600" fontFamily="Geist,sans-serif" letterSpacing="1">STUTTGART</text>
      <circle cx="60" cy="92" r="5" className={strokeClass} strokeWidth="2" />
      <line x1="60" y1="87" x2="60" y2="82" className={strokeClass} strokeWidth="2" />
    </svg>
  )
}

function TeslaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 18 L18 102 L60 88 L102 102 L60 18Z" className={strokeClass} strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 18 L60 88" className={strokeClass} strokeWidth="3" />
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

function FordLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="100" height="30" rx="15" className={strokeClass} strokeWidth="4" />
      <text x="60" y="45" textAnchor="middle" className={fillClass} fontSize="16" fontWeight="700" fontFamily="Geist,sans-serif" letterSpacing="3">FORD</text>
    </svg>
  )
}

function VolvoLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" className={strokeClass} strokeWidth="5" />
      <path d="M30 45 L45 75 L60 50 L75 75 L90 45" className={strokeClass} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="45" y1="75" x2="75" y2="75" className={strokeClass} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export const brands: Brand[] = [
  { id: "bmw", name: "BMW", color: "#0066b4", slug: "bmw", Logo: BMWLogo },
  { id: "mercedes", name: "Mercedes-Benz", color: "#00a19b", slug: "mercedes-benz", Logo: MercedesLogo },
  { id: "audi", name: "Audi", color: "#d4af37", slug: "audi", Logo: AudiLogo },
  { id: "volkswagen", name: "Volkswagen", color: "#1a6b9e", slug: "volkswagen", Logo: VWLogo },
  { id: "porsche", name: "Porsche", color: "#d4af37", slug: "porsche", Logo: PorscheLogo },
  { id: "tesla", name: "Tesla", color: "#e82127", slug: "tesla", Logo: TeslaLogo },
  { id: "toyota", name: "Toyota", color: "#e82127", slug: "toyota", Logo: ToyotaLogo },
  { id: "skoda", name: "Škoda", color: "#1a6b3c", slug: "skoda", Logo: SkodaLogo },
  { id: "ford", name: "Ford", color: "#1a4b8b", slug: "ford", Logo: FordLogo },
  { id: "volvo", name: "Volvo", color: "#1a6b9e", slug: "volvo", Logo: VolvoLogo },
]
