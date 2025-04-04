import { WorkshopWorkforceObj } from '@/app/types/workshop/workshop-workforces'

const mapWorkshopWorkforces = (data): WorkshopWorkforceObj[] => {
  if (!data) return []

  return data.map((item) => ({
    id: item?.uuid ?? '',
    date: item?.date ?? '',
    numHours: item?.numHours ?? 0,
    hourPrice: item?.hourPrice ?? 0,
    workerUuid: item?.workerUuid ?? '',
    repairUuid: item?.repairUuid ?? '',
  }))
}

export { mapWorkshopWorkforces }
