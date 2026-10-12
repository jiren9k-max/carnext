import type { Metadata } from "next"
import { Inventory } from "@/components/cars/inventory"
import { getCars } from "@/lib/olx"

// Refresh from OLX at most every 10 minutes (see lib/olx.ts).
export const revalidate = 600

export const metadata: Metadata = {
  title: "Vozila",
  description: "Kompletna ponuda vozila CarNext Sarajevo.",
}

export default async function InventoryPage() {
  return <Inventory cars={await getCars()} />
}
