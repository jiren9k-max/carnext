import { adminVehicles, adminUsers, inquiries, blogPosts, promotions } from "@/data/admin"
import { db } from "./db"

export function seed() {
  db.seed("vehicles", adminVehicles)
  db.seed("users", adminUsers)
  db.seed("inquiries", inquiries)
  db.seed("blog", blogPosts)
  db.seed("promotions", promotions)
  db.seed("settings", [])
  db.seed("seo", [])
}
