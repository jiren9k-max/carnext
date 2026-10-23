import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword, type StoredUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, phone } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Sva obavezna polja moraju biti popunjena" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Lozinka mora imati najmanje 6 karaktera" }, { status: 400 })
    }

    const existing = db.read<StoredUser>("users").find((u) => u.email === email)
    if (existing) {
      return NextResponse.json({ error: "Korisnik sa ovom email adresom već postoji" }, { status: 409 })
    }

    const { hash, salt } = hashPassword(password)

    const user: StoredUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password: hash,
      salt,
      phone: phone || undefined,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    db.create("users", user)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 })
  }
}
