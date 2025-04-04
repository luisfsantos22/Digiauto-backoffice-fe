import { WorkshopServiceObj } from '@/app/types/workshop/workshop-services'

const mapWorkshopServices = (data): WorkshopServiceObj[] => {
  if (!data) return []

  return data.map((item) => ({
    id: item?.uuid ?? '',
    name: item?.name ?? '',
    description: item?.description ?? '',
    repairUuid: item?.repairUuid ?? '',
  }))
}

export { mapWorkshopServices }
