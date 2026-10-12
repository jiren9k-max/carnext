"use client"

import { usePathname } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa6"
import { contactLinks } from "@/lib/contact"
import { cn } from "@/lib/utils"

export function WhatsAppButton() {
  // Car pages already have WhatsApp in the sticky call bar on mobile.
  const onCarPage = usePathname().startsWith("/cars/")

  return (
    <a
      href={contactLinks.whatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pišite nam na WhatsApp"
      className={cn(
        "group fixed bottom-6 right-6 z-40 flex h-14 items-center gap-0 rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:gap-2 hover:pr-5 hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)]",
        onCarPage && "hidden lg:flex"
      )}
    >
      <FaWhatsapp className="size-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-body-sm font-semibold transition-all duration-300 group-hover:max-w-32">
        Pišite nam
      </span>
    </a>
  )
}
