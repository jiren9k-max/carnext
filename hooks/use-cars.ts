"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { demoCars, type DemoCar } from "@/data/cars"

const STORAGE_KEY = "carnext-added-cars"
const CHANGE_EVENT = "carnext-cars-changed"

type AddedCarInput = Omit<DemoCar, "id">

function readStoredCars(): DemoCar[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (!value) {
      return []
    }

    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStoredCars(cars: DemoCar[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cars))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function useCars() {
  const [addedCars, setAddedCars] = useState<DemoCar[]>([])

  useEffect(() => {
    const syncCars = () => setAddedCars(readStoredCars())

    syncCars()
    window.addEventListener("storage", syncCars)
    window.addEventListener(CHANGE_EVENT, syncCars)

    return () => {
      window.removeEventListener("storage", syncCars)
      window.removeEventListener(CHANGE_EVENT, syncCars)
    }
  }, [])

  const addCar = useCallback((car: AddedCarInput) => {
    const nextCar: DemoCar = {
      ...car,
      id: `added-${Date.now()}`,
    }

    const nextCars = [nextCar, ...readStoredCars()]
    writeStoredCars(nextCars)
    setAddedCars(nextCars)

    return nextCar
  }, [])

  const removeCar = useCallback((id: string) => {
    const nextCars = readStoredCars().filter((car) => car.id !== id)
    writeStoredCars(nextCars)
    setAddedCars(nextCars)
  }, [])

  const cars = useMemo(() => [...addedCars, ...demoCars], [addedCars])

  return {
    cars,
    addedCars,
    addCar,
    removeCar,
  }
}
