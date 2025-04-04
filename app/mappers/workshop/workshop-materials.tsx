import { WorkshopMaterialObj } from '@/app/types/workshop/workshop-materials'

const mapWorkshopMaterials = (data): WorkshopMaterialObj[] => {
  if (!data) return []

  return data.map((item) => ({
    id: item?.uuid ?? '',
    name: item?.name ?? '',
    description: item?.description ?? 0,
    repairUuid: item?.repairUuid ?? '',
  }))
}

export { mapWorkshopMaterials }
