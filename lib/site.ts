// Public address of the site, used for Google (sitemap, canonical URLs) and link previews.
// Set NEXT_PUBLIC_SITE_URL once the client's domain is live; on Vercel the production
// address is used automatically until then.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "")

export const SITE_NAME = "CarNext Sarajevo"
export const SITE_DESCRIPTION =
  "Provjerena polovna vozila u Sarajevu. Pogledajte aktuelnu ponudu, dogovorite testnu vožnju i kupite auto bez iznenađenja — Kasindolska 58, Ilidža."
