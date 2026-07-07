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
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" fill="currentColor" opacity="0.08" />
      <circle cx="60" cy="60" r="52" className={strokeClass} strokeWidth="3" />
      <circle cx="60" cy="60" r="38" className={strokeClass} strokeWidth="2" />
      <path d="M60 22 A38 38 0 0 1 98 60 L60 60 Z" fill="#0066b4" />
      <path d="M60 22 A38 38 0 0 0 22 60 L60 60 Z" fill="#a0a0a0" opacity="0.3" />
      <path d="M22 60 A38 38 0 0 0 60 98 L60 60 Z" fill="#a0a0a0" opacity="0.15" />
      <path d="M98 60 A38 38 0 0 1 60 98 L60 60 Z" fill="#0066b4" />
      <rect x="44" y="55" width="32" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <text x="60" y="70" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">BMW</text>
    </svg>
  )
}

function MercedesLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" fill="currentColor" opacity="0.08" />
      <circle cx="60" cy="60" r="52" className={strokeClass} strokeWidth="3" />
      <path d="M60 16 L60 60 M60 60 L104 104 M60 60 L16 104" className={strokeClass} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5" className={fillClass} />
      <text x="60" y="117" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="600" fontFamily="Arial,sans-serif" letterSpacing="1">MERCEDES</text>
    </svg>
  )
}

function AudiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="2" width="108" height="54" rx="4" fill="currentColor" opacity="0.06" />
      {[0, 1, 2, 3].map((i) => {
        const cx = 18 + i * 28
        return (
          <g key={i}>
            <circle cx={cx} cy="30" r="15" className={strokeClass} strokeWidth="3.5" />
            <circle cx={cx} cy="30" r="10" fill="currentColor" opacity="0.06" />
          </g>
        )
      })}
      <text x="60" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="2.5">AUDI</text>
    </svg>
  )
}

function VWLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" fill="currentColor" opacity="0.08" />
      <circle cx="60" cy="60" r="52" className={strokeClass} strokeWidth="3" />
      <circle cx="60" cy="60" r="36" className={strokeClass} strokeWidth="1.5" />
      <path d="M60 28 L36 100 M60 28 L84 100 M46 78 L74 78" className={strokeClass} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SkodaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" fill="currentColor" opacity="0.08" />
      <circle cx="60" cy="60" r="52" className={strokeClass} strokeWidth="3" />
      <path d="M52 32 Q60 48 52 72 Q44 88 36 96 Q28 88 32 72 Q28 48 36 32 Z" className={fillClass} opacity="0.15" />
      <path d="M68 32 Q60 48 68 72 Q76 88 84 96 Q92 88 88 72 Q92 48 84 32 Z" className={fillClass} opacity="0.15" />
      <circle cx="60" cy="48" r="16" className={strokeClass} strokeWidth="2.5" />
      <circle cx="52" cy="72" r="10" className={strokeClass} strokeWidth="2" />
      <circle cx="68" cy="72" r="10" className={strokeClass} strokeWidth="2" />
      <path d="M44 84 Q52 94 60 98 Q68 94 76 84" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export const brands: Brand[] = [
  { id: "bmw", name: "BMW", color: "#0066b4", slug: "bmw", Logo: BMWLogo },
  { id: "mercedes", name: "Mercedes-Benz", color: "#00a19b", slug: "mercedes-benz", Logo: MercedesLogo },
  { id: "audi", name: "Audi", color: "#d4af37", slug: "audi", Logo: AudiLogo },
  { id: "volkswagen", name: "Volkswagen", color: "#1a6b9e", slug: "volkswagen", Logo: VWLogo },
  { id: "skoda", name: "Škoda", color: "#1a6b3c", slug: "skoda", Logo: SkodaLogo },
]
