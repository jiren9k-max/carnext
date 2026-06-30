export const makes = [
  "Škoda",
  "Peugeot",
  "Renault",
  "Kia",
  "Hyundai",
  "Volkswagen",
  "BMW",
  "Mercedes-Benz",
  "Land Rover",
  "Citroen",
  "Nissan",
  "Smart",
  "Audi",
]

export const models: Record<string, string[]> = {
  Škoda: ["Kamiq", "Octavia", "Fabia", "Superb"],
  Peugeot: ["3008", "208", "308"],
  Renault: ["Megane", "Clio"],
  Kia: ["Ceed"],
  Hyundai: ["i30", "Santa Fe"],
  Volkswagen: ["Buba / Beetle", "Golf", "Caddy"],
  BMW: ["520", "X3"],
  "Mercedes-Benz": ["A 180"],
  "Land Rover": ["Range Rover Evoque"],
  Citroen: ["DS3"],
  Nissan: ["Qashqai"],
  Smart: ["ForTwo"],
  Audi: ["S3"],
}

export const fuelTypes = ["Benzin", "Dizel"]

export const transmissions = ["Manuelni", "Automatik"]

export const drivetrains = ["Prednji pogon", "Stražnji pogon", "Pogon na sve kotače"]

export const bodyTypes = ["SUV", "Limuzina", "Hečbek", "Karavan", "Mini", "Coupe", "Kabriolet"]

export const locations = [
  "Sarajevo",
  "Ilidža",
  "Mostar",
  "Tuzla",
  "Zenica",
  "Banja Luka",
]

export const yearRange = { min: 2010, max: 2025 }

export const priceRange = { min: 0, max: 80000 }

export const mileageRange = { min: 100000, max: 300000 }
