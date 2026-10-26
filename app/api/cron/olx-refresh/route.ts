import { NextResponse, type NextRequest } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { ADMIN_COOKIE, isAdminToken } from "@/lib/admin-auth"
import { getCarsSnapshot, OLX_LIST_TAG } from "@/lib/olx"

// Scheduled refresh of the car list from OLX (GitHub Actions hourly, Vercel Cron daily).
// Public on purpose so schedulers need no secret — but it refreshes at most once per
// MIN_AGE, so calling it repeatedly cannot flood OLX. A logged-in admin can force it.
const MIN_AGE_MS = 45 * 60 * 1000

export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(request: NextRequest) {
  const force = isAdminToken(request.cookies.get(ADMIN_COOKIE)?.value)
  try {
    const before = await getCarsSnapshot()
    const age = Date.now() - before.fetchedAt
    if (age < MIN_AGE_MS && !force) {
      return NextResponse.json({ refreshed: false, reason: "fresh", cars: before.cars.length, ageMinutes: Math.round(age / 60000) })
    }

    revalidateTag(OLX_LIST_TAG, { expire: 0 }) // drop the cached list now
    const after = await getCarsSnapshot() // fetch the fresh list from OLX
    revalidatePath("/", "layout") // rebuild every page with it on the next visit

    return NextResponse.json({ refreshed: true, cars: after.cars.length, before: before.cars.length, fetchedAt: new Date(after.fetchedAt).toISOString() })
  } catch (err) {
    console.error("OLX refresh failed:", err)
    return NextResponse.json({ refreshed: false, reason: "olx-unavailable" }, { status: 502 })
  }
}
