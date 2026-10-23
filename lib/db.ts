import fs from "fs"
import path from "path"

const DB_DIR = path.join(process.cwd(), "data", "db")

function ensureDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }
}

function filePath(collection: string): string {
  ensureDir()
  return path.join(DB_DIR, `${collection}.json`)
}

// A missing file is an empty collection. A corrupt file is an error: returning [] there
// would let the next write silently replace all existing data with almost nothing.
function read<T>(collection: string): T[] {
  const fp = filePath(collection)
  if (!fs.existsSync(fp)) return []
  const raw = fs.readFileSync(fp, "utf-8")
  try {
    return JSON.parse(raw)
  } catch {
    throw new Error(`Database file ${collection}.json is corrupt — not overwriting it`)
  }
}

// Atomic write: write a temp file, then rename over the original. A crash mid-write
// leaves the old file intact instead of a half-written one.
function write<T>(collection: string, data: T[]): void {
  ensureDir()
  const fp = filePath(collection)
  const tmp = `${fp}.${process.pid}.${Date.now()}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8")
  fs.renameSync(tmp, fp)
}

// Note: all operations below are synchronous read-modify-write, so requests handled by one
// server process cannot interleave. Several processes/instances writing the same files would
// still race — a real database is needed before multi-instance hosting (e.g. Vercel).

export const db = {
  read,
  write,
  getById<T extends { id: string }>(collection: string, id: string): T | undefined {
    return read<T>(collection).find((item) => item.id === id)
  },
  create<T extends { id: string }>(collection: string, item: T): T {
    const items = read<T>(collection)
    items.push(item)
    write(collection, items)
    return item
  },
  update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
    const items = read<T>(collection)
    const idx = items.findIndex((item) => item.id === id)
    if (idx === -1) return null
    items[idx] = { ...items[idx], ...updates }
    write(collection, items)
    return items[idx]
  },
  remove<T extends { id: string }>(collection: string, id: string): boolean {
    const items = read<T>(collection)
    const idx = items.findIndex((item) => item.id === id)
    if (idx === -1) return false
    items.splice(idx, 1)
    write(collection, items)
    return true
  },
  seed<T extends { id: string }>(collection: string, data: T[]): void {
    const existing = read<T>(collection)
    if (existing.length === 0) {
      write(collection, data)
    }
  },
}
