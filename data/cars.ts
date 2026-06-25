export interface DemoCar {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: string
  transmission: string
  bodyType: string
  image: string
  badges: ("novo" | "top-ponuda" | "akcija" | "rezervisano" | "prodano")[]
}

export const demoCars: DemoCar[] = [
  {
    id: "1",
    make: "Volkswagen",
    model: "Golf 8 2.0 TDI",
    year: 2023,
    price: 55000,
    mileage: 18500,
    fuelType: "Dizel",
    transmission: "Automatik",
    bodyType: "Hečbek",
    image: "/images/car-placeholder.jpg",
    badges: ["novo", "top-ponuda"],
  },
  {
    id: "2",
    make: "Škoda",
    model: "Octavia RS TDI",
    year: 2022,
    price: 45000,
    mileage: 32000,
    fuelType: "Dizel",
    transmission: "Automatik",
    bodyType: "Limuzina",
    image: "/images/car-placeholder.jpg",
    badges: ["top-ponuda"],
  },
  {
    id: "3",
    make: "Renault",
    model: "Clio V 1.0 TCe",
    year: 2024,
    price: 22000,
    mileage: 4500,
    fuelType: "Benzin",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    image: "/images/car-placeholder.jpg",
    badges: ["novo"],
  },
  {
    id: "4",
    make: "Dacia",
    model: "Sandero Stepway",
    year: 2023,
    price: 18000,
    mileage: 12000,
    fuelType: "Benzin",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    image: "/images/car-placeholder.jpg",
    badges: ["akcija"],
  },
  {
    id: "5",
    make: "Ford",
    model: "Focus 1.5 EcoBlue",
    year: 2022,
    price: 35000,
    mileage: 28000,
    fuelType: "Dizel",
    transmission: "Manuelni",
    bodyType: "Karavan",
    image: "/images/car-placeholder.jpg",
    badges: [],
  },
  {
    id: "6",
    make: "Toyota",
    model: "Yaris 1.5 Hybrid",
    year: 2024,
    price: 28000,
    mileage: 800,
    fuelType: "Hibrid",
    transmission: "Automatik",
    bodyType: "Hečbek",
    image: "/images/car-placeholder.jpg",
    badges: ["novo", "top-ponuda"],
  },
  {
    id: "7",
    make: "Hyundai",
    model: "i30 1.6 CRDi",
    year: 2021,
    price: 32000,
    mileage: 45000,
    fuelType: "Dizel",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    image: "/images/car-placeholder.jpg",
    badges: ["prodano"],
  },
  {
    id: "8",
    make: "Suzuki",
    model: "Swift 1.2 DualJet",
    year: 2023,
    price: 25000,
    mileage: 15000,
    fuelType: "Benzin",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    image: "/images/car-placeholder.jpg",
    badges: ["rezervisano"],
  },
]
