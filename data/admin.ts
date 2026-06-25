export interface AdminVehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: string
  transmission: string
  bodyType: string
  condition: string
  color: string
  engineSize: string
  power: number
  acceleration: number
  topSpeed: number
  consumption: string
  doors: number
  seats: number
  description: string
  features: string[]
  location: string
  status: "available" | "sold" | "reserved" | "pending"
  badges: ("novo" | "top-ponuda" | "akcija" | "rezervisano" | "prodano")[]
  images: string[]
  videos: string[]
  createdAt: string
  updatedAt: string
}

export const adminVehicles: AdminVehicle[] = [
  {
    id: "1", make: "Porsche", model: "911 Carrera 4S", year: 2024, price: 185000, mileage: 4200,
    fuelType: "Petrol", transmission: "Automatic", bodyType: "Coupe", condition: "New",
    color: "GT Silver Metallic", engineSize: "3.0L Twin-Turbo", power: 443, acceleration: 3.4, topSpeed: 306,
    consumption: "10.3 L/100km", doors: 2, seats: 4,
    description: "Porsche 911 Carrera 4S u savršenom stanju. Opremljen sa Premium paketom i Sport Chrono paketom.",
    features: ["Sport Chrono", "Bose Surround Sound", "Adaptive Cruise Control", "Park Assist"],
    location: "Sarajevo", status: "available", badges: ["novo", "top-ponuda"],
    images: [], videos: [], createdAt: "2025-01-15", updatedAt: "2025-01-15",
  },
  {
    id: "2", make: "BMW", model: "M5 Competition", year: 2023, price: 128000, mileage: 15800,
    fuelType: "Petrol", transmission: "Automatic", bodyType: "Sedan", condition: "Used",
    color: "Frozen Dark Grey", engineSize: "4.4L V8", power: 617, acceleration: 3.3, topSpeed: 305,
    consumption: "11.2 L/100km", doors: 4, seats: 5,
    description: "BMW M5 Competition u Frozen Dark Grey boji. Kompletna servisna istorija.",
    features: ["M Driver's Package", "Carbon Ceramic Brakes", "Harman Kardon", "Laserlight"],
    location: "Zagreb", status: "available", badges: ["top-ponuda"],
    images: [], videos: [], createdAt: "2025-02-01", updatedAt: "2025-02-10",
  },
  {
    id: "3", make: "Mercedes-Benz", model: "AMG GT 63 S", year: 2024, price: 215000, mileage: 1800,
    fuelType: "Petrol", transmission: "Automatic", bodyType: "Coupe", condition: "New",
    color: "Obsidian Black", engineSize: "4.0L V8 Biturbo", power: 630, acceleration: 3.1, topSpeed: 315,
    consumption: "11.8 L/100km", doors: 4, seats: 5,
    description: "Mercedes-AMG GT 63 S 4-Door Coupe. Najviša razina opreme.",
    features: ["AMG Performance Exhaust", "Burmester 3D Sound", "AMG Carbon Package"],
    location: "Beograd", status: "available", badges: ["novo"],
    images: [], videos: [], createdAt: "2025-02-20", updatedAt: "2025-02-20",
  },
  {
    id: "4", make: "Tesla", model: "Model S Plaid", year: 2023, price: 142000, mileage: 9500,
    fuelType: "Electric", transmission: "Automatic", bodyType: "Sedan", condition: "Used",
    color: "Midnight Silver", engineSize: "Tri Motor", power: 1020, acceleration: 2.1, topSpeed: 322,
    consumption: "18.2 kWh/100km", doors: 4, seats: 5,
    description: "Tesla Model S Plaid. Performanse koje oduzimaju dah uz potpuno električni pogon.",
    features: ["Full Self-Driving", "Plaid Carbon Spoiler", "Yoke Steering", "Premium Sound"],
    location: "Sarajevo", status: "available", badges: ["akcija"],
    images: [], videos: [], createdAt: "2025-03-01", updatedAt: "2025-03-05",
  },
  {
    id: "5", make: "Ferrari", model: "296 GTB", year: 2023, price: 395000, mileage: 1200,
    fuelType: "Hybrid", transmission: "Automatic", bodyType: "Coupe", condition: "Used",
    color: "Rosso Corsa", engineSize: "3.0L V6 Hybrid", power: 819, acceleration: 2.9, topSpeed: 330,
    consumption: "10.5 L/100km", doors: 2, seats: 2,
    description: "Ferrari 296 GTB. Samo 1200 km, kao nov. Assetto Fiorano paket.",
    features: ["Assetto Fiorano", "Carbon Fiber Wheels", "AFS - Ferrari Strada"],
    location: "Zagreb", status: "sold", badges: ["prodano"],
    images: [], videos: [], createdAt: "2025-01-10", updatedAt: "2025-03-15",
  },
  {
    id: "6", make: "Lamborghini", model: "Urus Performante", year: 2024, price: 285000, mileage: 5600,
    fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", condition: "New",
    color: "Arancio Borealis", engineSize: "4.0L V8", power: 666, acceleration: 3.3, topSpeed: 318,
    consumption: "12.7 L/100km", doors: 4, seats: 5,
    description: "Lamborghini Urus Performante u narandžastoj boji. Kompletna oprema.",
    features: ["Performante Exhaust", "Carbon Interior", "Bang & Olufsen Sound"],
    location: "Ljubljana", status: "reserved", badges: ["rezervisano"],
    images: [], videos: [], createdAt: "2025-03-10", updatedAt: "2025-03-18",
  },
]

export interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "user" | "dealer"
  status: "active" | "inactive" | "suspended"
  joined: string
  orders: number
}

export const adminUsers: AdminUser[] = [
  { id: "1", name: "Husein Holjan", email: "husein@carnext.com", phone: "+387 61 911 654", role: "admin", status: "active", joined: "2024-01-01", orders: 0 },
  { id: "2", name: "Marko Petrović", email: "marko@email.com", phone: "+387 63 123 456", role: "user", status: "active", joined: "2024-06-15", orders: 1 },
  { id: "3", name: "Ana Jurić", email: "ana@email.com", phone: "+385 91 234 567", role: "user", status: "active", joined: "2024-08-22", orders: 1 },
  { id: "4", name: "Ivan Kovačević", email: "ivan@email.com", phone: "+387 65 345 678", role: "user", status: "inactive", joined: "2024-03-10", orders: 0 },
  { id: "5", name: "Petra Novak", email: "petra@email.com", phone: "+386 41 456 789", role: "dealer", status: "active", joined: "2024-11-01", orders: 3 },
]

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  date: string
  vehicle?: string
}

export const inquiries: Inquiry[] = [
  { id: "1", name: "Marko Petrović", email: "marko@email.com", phone: "+387 63 123 456", subject: "Testna vožnja BMW M5", message: "Zanima me testna vožnja BMW M5 Competition. Molim vas da me kontaktirate.", status: "new", date: "2025-03-18", vehicle: "BMW M5 Competition" },
  { id: "2", name: "Ana Jurić", email: "ana@email.com", phone: "+385 91 234 567", subject: "Informacije o finansiranju", message: "Zanima me opcija finansiranja za Porsche 911. Koji su uslovi?", status: "read", date: "2025-03-17", vehicle: "Porsche 911 Carrera 4S" },
  { id: "3", name: "Tomislav Horvat", email: "tomislav@email.com", phone: "+385 98 567 890", subject: "Cijena Audi RS6", message: "Da li je cijena za Audi RS6 fiksna ili postoji prostor za dogovor?", status: "replied", date: "2025-03-15", vehicle: "Audi RS6 Avant" },
  { id: "4", name: "Maja Šimić", email: "maja@email.com", phone: "+387 62 678 901", subject: "Zamjena staro za novo", message: "Imam Range Rover 2020. godište koji bih zamijenila za novi model. Da li je to moguće?", status: "new", date: "2025-03-19" },
]

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  status: "draft" | "published"
  date: string
  views: number
}

export const blogPosts: BlogPost[] = [
  { id: "1", title: "Vodič za kupovinu polovnog Porschea", excerpt: "Sve što trebate znati prije kupovine polovnog Porschea.", author: "Husein Holjan", status: "published", date: "2025-03-15", views: 1240 },
  { id: "2", title: "Električni automobili u 2025: Šta donosi budućnost?", excerpt: "Pregled najnovijih električnih modela i tehnologija.", author: "Husein Holjan", status: "published", date: "2025-03-10", views: 890 },
  { id: "3", title: "Kako održavati performanse vašeg BMW M", excerpt: "Savjeti za održavanje M modela.", author: "Husein Holjan", status: "draft", date: "2025-03-05", views: 0 },
  { id: "4", title: "Najbolji SUV automobili 2025", excerpt: "Ranking najboljih SUV automobila u 2025. godini.", author: "Husein Holjan", status: "draft", date: "2025-03-01", views: 0 },
]

export interface Promotion {
  id: string
  name: string
  type: "discount" | "featured" | "banner"
  status: "active" | "inactive"
  startDate: string
  endDate: string
}

export const promotions: Promotion[] = [
  { id: "1", name: "Proljetni popust", type: "discount", status: "active", startDate: "2025-03-01", endDate: "2025-04-15" },
  { id: "2", name: "Istaknuta vozila", type: "featured", status: "active", startDate: "2025-03-01", endDate: "2025-04-01" },
  { id: "3", name: "Uskršnja akcija", type: "banner", status: "inactive", startDate: "2025-04-10", endDate: "2025-04-25" },
]
