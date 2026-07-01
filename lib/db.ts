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

function read<T>(collection: string): T[] {
  const fp = filePath(collection)
  if (!fs.existsSync(fp)) return []
  try {
    const raw = fs.readFileSync(fp, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function write<T>(collection: string, data: T[]): void {
  ensureDir()
  fs.writeFileSync(filePath(collection), JSON.stringify(data, null, 2), "utf-8")
}

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
