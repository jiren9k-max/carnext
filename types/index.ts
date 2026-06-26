export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  condition: Condition;
  images: string[];
  featuredImage: string;
  color: string;
  engineSize: string;
  power: number;
  acceleration: number;
  topSpeed: number;
  consumption: string;
  emissions: string;
  doors: number;
  seats: number;
  description: string;
  features: string[];
  location: string;
  status: CarStatus;
  createdAt: string;
  updatedAt: string;
}

export type FuelType = "petrol" | "diesel" | "electric" | "hybrid" | "plug-in hybrid";
export type Transmission = "manual" | "automatic" | "semi-automatic";
export type BodyType = "sedan" | "suv" | "coupe" | "convertible" | "hatchback" | "wagon" | "pickup" | "van";
export type Condition = "new" | "used" | "certified pre-owned";
export type CarStatus = "available" | "sold" | "reserved" | "pending";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = "user" | "admin" | "dealer";

export interface ListingFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: FuelType;
  transmission?: Transmission;
  bodyType?: BodyType;
  condition?: Condition;
  mileage?: number;
  location?: string;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption = "price-asc" | "price-desc" | "year-desc" | "year-asc" | "mileage-asc" | "newest";

export interface PageMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
