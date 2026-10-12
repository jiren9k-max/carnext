import { unstable_cache } from "next/cache"

// Reads the dealership's active listings from OLX.ba so the website always
// mirrors what is published there. Server-only: called from pages/route
// handlers, cached by Next.js and refreshed every REVALIDATE_SECONDS.

export const REVALIDATE_SECONDS = 600
// Specs and equipment rarely change once a car is listed; price and availability
// come from the list, which refreshes every REVALIDATE_SECONDS.
const DETAIL_REVALIDATE_SECONDS = 6 * 60 * 60

const API = "https://api.olx.ba"
const SHOP = process.env.OLX_SHOP_USERNAME || "CarNextSarajevo"
const CARS_CATEGORY_ID = 18 // OLX "Automobili"
const NEW_LISTING_DAYS = 14

export type Badge = "novo" | "top-ponuda" | "akcija" | "rezervisano" | "prodano"

export interface Car {
  id: string
  make: string
  model: string
  title: string
  year: number
  price: number
  mileage: number
  powerKw: number
  fuelType: string
  transmission: string
  bodyType: string
  images: string[]
  badges: Badge[]
  olxUrl: string
  createdAt: number
  specs: { label: string; value: string }[]
  features: string[]
}

type OlxAttribute = {
  attr_code: string
  name: string
  type: string
  value: string | number | boolean | null
  group_name: string
}

type OlxListing = {
  id: number
  title: string
  price: number
  has_discount: boolean
  status: string
  visible: boolean
  available: boolean
  category_id: number
  images: string[]
  attributes: OlxAttribute[]
  brand?: { name: string } | null
  model?: { name: string } | null
  created_at?: number
  additional?: { created_at?: number }
}

type OlxListItem = {
  id: number
  title: string
  price: number
  has_discount: boolean
  category_id: number
  status: string
  visible: boolean
  available: boolean
}

type OlxListPage = {
  data: OlxListItem[]
  meta: { last_page: number }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** GET from the OLX API. OLX allows 60 requests/minute; on 429 wait as long as it asks. */
async function olx<T>(path: string, attempt = 0): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/json", "User-Agent": "CarNext website (carnextsarajevo.com)" },
    // Results are cached by unstable_cache below; never cache individual calls.
    cache: "no-store",
  })
  if ((res.status === 429 || res.status >= 500) && attempt < 3) {
    const retryAfter = Number(res.headers.get("retry-after")) * 1000
    await sleep(Math.min(retryAfter || 2000 * 2 ** attempt, 65_000))
    return olx<T>(path, attempt + 1)
  }
  if (!res.ok) throw new Error(`OLX ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

/** Runs `fn` over `items` with at most `limit` requests in flight. */
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      out[i] = await fn(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return out
}

// Words OLX sellers type in capitals that should stay that way.
const KEEP_UPPER = /^(?:[A-Z]{1,4}|[A-Z0-9.+\-/]*\d[A-Z0-9.+\-/]*)$/

/** "X3 / M40D / 2019 / XDRIVE / MAX FULL" → "X3 M40D Xdrive Max Full" */
function tidyModel(title: string, make: string, year: number) {
  let t = title.replace(/!+/g, " ").replace(/\s+\/\s+/g, " ").replace(/\s+/g, " ").trim()
  if (make && t.toLowerCase().startsWith(make.toLowerCase())) t = t.slice(make.length).trim()
  return t
    .split(" ")
    // Drop the model year (shown separately), but never the first word: "Peugeot 2008".
    .filter((w, i) => i === 0 || w !== String(year))
    .map((w) => {
      if (KEEP_UPPER.test(w) && w !== "MAX" && w !== "FULL") return w
      if (w === w.toUpperCase() && /[A-ZČĆŠŽĐ]{2,}/.test(w)) return w[0] + w.slice(1).toLowerCase()
      return w
    })
    .join(" ")
}

const yes = (v: OlxAttribute["value"]) => v === true || v === "true" || v === "Da"
const empty = (v: OlxAttribute["value"]) =>
  v === null || v === "" || v === false || v === "false" || v === "Ne" || v === "Nema"

const fmtNumber = (n: number) => n.toLocaleString("de-DE")

function toCar(l: OlxListing): Car {
  const attr = new Map(l.attributes.map((a) => [a.attr_code, a]))
  const val = (code: string) => attr.get(code)?.value ?? null
  const str = (code: string) => {
    const v = val(code)
    return empty(v) ? "" : String(v)
  }

  const make = l.brand?.name ?? ""
  const year = Number(val("godiste")) || 0
  const mileage = Number(val("kilometra-a")) || 0
  const kw = Number(val("kilovata-kw")) || 0
  const litres = Number(val("kubikaza")) || 0
  const created = (l.additional?.created_at ?? l.created_at ?? 0) * 1000

  const specs = [
    { label: "Godište", value: year ? String(year) : "" },
    { label: "Kilometraža", value: mileage ? `${fmtNumber(mileage)} km` : "" },
    { label: "Gorivo", value: str("gorivo") },
    { label: "Mjenjač", value: [str("transmisija"), str("broj-stepeni-prijenosa") && `${str("broj-stepeni-prijenosa")} brzina`].filter(Boolean).join(", ") },
    { label: "Snaga", value: kw ? `${kw} kW (${Math.round(kw * 1.36)} KS)` : "" },
    { label: "Zapremina motora", value: litres ? `${litres.toLocaleString("de-DE", { minimumFractionDigits: 1 })} l` : "" },
    { label: "Pogon", value: str("pogon") },
    { label: "Karoserija", value: str("tip") },
    { label: "Boja", value: [str("boja"), yes(val("metalik")) ? "metalik" : ""].filter(Boolean).join(", ") },
    { label: "Broj vrata", value: str("broj-vrata") },
    { label: "Sjedećih mjesta", value: str("sjedecih-mjesta") },
    { label: "Emisioni standard", value: str("emisioni-standard") },
    { label: "Prethodni vlasnici", value: str("broj-prethodnih-vlasnika") },
    { label: "Prva registracija", value: str("godina-prve-registracije") },
    { label: "Registrovan", value: attr.has("registrovan") ? (yes(val("registrovan")) ? "Da" : "Ne") : "" },
    { label: "Servisna knjiga", value: yes(val("servisna-knjiga")) ? "Da" : "" },
    { label: "Udaren", value: yes(val("udaren")) ? "Da" : "" },
  ].filter((s) => s.value)

  // Equipment: OLX "Oprema" group plus the positive yes/no items from "Specifikacije".
  const specFeatures = ["alu-felge", "alarm", "centralna-brava", "daljinsko-otklju-avanje", "airbag", "abs", "esp", "servo-volan", "turbo", "auto-kuka", "ocarinjen"]
  const features: string[] = []
  for (const a of l.attributes) {
    const inOprema = a.group_name === "Oprema"
    if (!inOprema && !specFeatures.includes(a.attr_code)) continue
    if (empty(a.value)) continue
    features.push(yes(a.value) ? a.name : `${a.name}: ${a.value}`)
  }
  if (yes(val("kupi-na-leasing"))) features.push("Mogućnost lizinga")

  const badges: Badge[] = []
  if (created && Date.now() - created < NEW_LISTING_DAYS * 86_400_000) badges.push("novo")
  if (l.has_discount) badges.push("akcija")

  return {
    id: String(l.id),
    make,
    model: tidyModel(l.title, make, year) || l.model?.name || l.title,
    title: l.title,
    year,
    price: l.price || 0,
    mileage,
    powerKw: kw,
    fuelType: str("gorivo"),
    transmission: str("transmisija"),
    bodyType: str("tip"),
    images: l.images ?? [],
    badges,
    olxUrl: `https://olx.ba/artikal/${l.id}`,
    createdAt: created,
    specs,
    features,
  }
}

const getListing = unstable_cache(
  (id: number) => olx<OlxListing>(`/listings/${id}`),
  ["olx-listing"],
  { revalidate: DETAIL_REVALIDATE_SECONDS, tags: ["olx"] }
)

async function fetchCars(): Promise<Car[]> {
  const first = await olx<OlxListPage>(`/users/${SHOP}/listings?page=1`)
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, first.meta.last_page - 1) }, (_, i) =>
      olx<OlxListPage>(`/users/${SHOP}/listings?page=${i + 2}`)
    )
  )
  const items = [first, ...rest]
    .flatMap((p) => p.data)
    .filter((l) => l.category_id === CARS_CATEGORY_ID && l.status === "active" && l.visible && l.available)

  const details = await mapLimit(items, 3, (item) => getListing(item.id))
  return details
    // Price, title and discount from the fresh list; specs from the (longer-cached) details.
    .map((d, i) => toCar({ ...d, title: items[i].title, price: items[i].price, has_discount: items[i].has_discount }))
    .sort((a, b) => b.createdAt - a.createdAt)
}

/** All active car listings of the shop, newest first, fetched from OLX at most once
 *  per REVALIDATE_SECONDS and shared by every page. Throws if OLX is unreachable so
 *  Next.js keeps serving the last successfully generated pages. */
export const getCars = unstable_cache(fetchCars, ["olx-cars", SHOP], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["olx"],
})

export async function getCar(id: string): Promise<Car | undefined> {
  return (await getCars()).find((c) => c.id === id)
}
