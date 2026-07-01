import crypto from "crypto"
import { cookies } from "next/headers"
import { db } from "./db"

const SALT_LENGTH = 32
const KEY_LENGTH = 64
const ITERATIONS = 100000
const DIGEST = "sha512"

export interface StoredUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  salt: string
  phone?: string
  role: "user"
  createdAt: string
}

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")
  return { hash, salt }
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const derived = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")
  return derived === hash
}

export function createUserToken(email: string): string {
  return Buffer.from(`${email}:${Date.now()}:user`).toString("base64")
}

export function decodeUserToken(token: string): { email: string; isValid: boolean } {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    const parts = decoded.split(":")
    if (parts.length !== 3 || parts[2] !== "user") return { email: "", isValid: false }
    return { email: parts[0], isValid: true }
  } catch {
    return { email: "", isValid: false }
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("user_token")?.value
  if (!token) return null

  const { email, isValid } = decodeUserToken(token)
  if (!isValid || !email) return null

  const users = db.read<StoredUser>("users")
  return users.find((u) => u.email === email) || null
}
