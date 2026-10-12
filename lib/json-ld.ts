const BACKSLASH = String.fromCharCode(92)

/** Serialize structured data for a <script type="application/ld+json"> tag.
 *  "<" is escaped as a JSON unicode escape so listing text can never close the script tag. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, `${BACKSLASH}u003c`)
}
