import crypto from "crypto"
import { cookies } from "next/headers"
import { db } from "./db"
import { verifySession } from "./session"

const SALT_LENGTH = 32
const KEY_LENGTH = 64
const ITERATIONS = 100000
const DIGEST = "sha512"

export const USER_COOKIE = "user_token"
export const USER_SESSION_SECONDS = 60 * 60 * 24 * 7

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
  const derived = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
  const expected = Buffer.from(hash, "hex")
  return expected.length === derived.length && crypto.timingSafeEqual(expected, derived)
}

export async function getSessionUser() {
  const token = (await cookies()).get(USER_COOKIE)?.value
  const session = verifySession(token, "user")
  if (!session) return null
  return db.read<StoredUser>("users").find((u) => u.email.toLowerCase() === session.sub.toLowerCase()) || null
}
