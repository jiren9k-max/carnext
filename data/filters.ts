export const makes = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Volkswagen",
  "Tesla",
  "Lexus",
  "Volvo",
  "Range Rover",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Bentley",
  "Rolls-Royce",
  "McLaren",
]

export const models: Record<string, string[]> = {
  BMW: ["Serija 3", "Serija 5", "Serija 7", "X5", "X7", "M3", "M5", "i4", "iX"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "G-Class", "AMG GT", "EQS"],
  Audi: ["A4", "A6", "A8", "Q5", "Q7", "e-tron", "R8", "RS6"],
  Porsche: ["911", "Cayenne", "Panamera", "Taycan", "Macan", "Carrera GT"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "ID.4", "Arteon"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  Lexus: ["IS", "ES", "RX", "NX", "LX", "LC"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90"],
  "Range Rover": ["Evoque", "Velar", "Sport", "Vogue", "SV Autobiography"],
  Ferrari: ["SF90 Stradale", "296 GTB", "F8 Tributo", "Roma", "Purosangue"],
  Lamborghini: ["Huracán", "Revuelto", "Urus"],
  Maserati: ["Ghibli", "Quattroporte", "MC20", "Grecale"],
  Bentley: ["Continental GT", "Bentayga", "Flying Spur"],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan", "Spectre"],
  McLaren: ["Artura", "720S", "GT"],
}

export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"]

export const transmissions = ["Manual", "Automatic", "Semi-Automatic"]

export const drivetrains = ["Front-Wheel Drive", "Rear-Wheel Drive", "All-Wheel Drive", "Four-Wheel Drive"]

export const bodyTypes = ["Sedan", "SUV", "Coupe", "Convertible", "Hatchback", "Wagon", "Pickup", "Van"]

export const locations = [
  "Sarajevo",
  "Zagreb",
  "Beograd",
  "Ljubljana",
  "Podgorica",
  "Skoplje",
  "Banja Luka",
  "Mostar",
  "Tuzla",
  "Novi Sad",
  "Split",
  "Rijeka",
]

export const yearRange = { min: 2015, max: new Date().getFullYear() + 1 }

export const priceRange = { min: 5000, max: 500000 }

export const mileageRange = { min: 0, max: 250000 }
