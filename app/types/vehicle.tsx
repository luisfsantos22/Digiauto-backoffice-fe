type VehicleWorkshop = {
  licensePlate: string
  uuid: string
  brand: string
  model: string
  version?: string
}

interface VehicleSearch {
  uuid: string
  licensePlate: string
  brand: string
  model: string
  version?: string
}

export type { VehicleWorkshop, VehicleSearch }
