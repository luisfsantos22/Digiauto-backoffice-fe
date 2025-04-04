import { WorkshopObj } from '../../types/workshop/workshop'
import { mapWorkshopExternalServices } from './workshop-external-services'
import { mapWorkshopMaterials } from './workshop-materials'
import { mapWorkshopServices } from './workshop-services'
import { mapWorkshopWorkforces } from './workshop-workforces'

export const mapWorkshopItems = (data: any): WorkshopObj => ({
  uuid: data.id,
  vehicle: {
    uuid: data.uuid ?? '',
    brand: data.brand_name ?? '',
    model: data.model_name ?? '',
    version: data.version ?? '',
  },
  nOr: data.nOr ?? '',
  appointmentDate: data.appointmentDate ?? '',
  status: data.status ?? '',
  hasRequestedMaterial: data.hasRequestedMaterial ?? false,
  createdAt: data.createdAt ?? '',
  updatedAt: data.updatedAt ?? '',
  services: mapWorkshopServices(data.services) ?? [],
  materials: mapWorkshopMaterials(data.materials) ?? [],
  externalServices: mapWorkshopExternalServices(data.externalServices) ?? [],
  workforces: mapWorkshopWorkforces(data.workforces) ?? [],
  client: {
    id: data.client.uuid ?? '',
    name: data.client.name ?? '',
  },
})
