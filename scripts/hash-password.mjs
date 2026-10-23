// Creates the ADMIN_PASSWORD_HASH value for a new admin password.
//   node scripts/hash-password.mjs "nova-lozinka"
// Put the printed line in .env.local (locally) and in Vercel → Settings → Environment Variables.
import crypto from "node:crypto"

const password = process.argv[2]
if (!password || password.length < 12) {
  console.error('Upotreba: node scripts/hash-password.mjs "lozinka-od-najmanje-12-znakova"')
  process.exit(1)
}

const salt = crypto.randomBytes(16)
const hash = crypto.scryptSync(password, salt, 64)
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash.toString("hex")}`)
