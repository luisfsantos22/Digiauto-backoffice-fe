import { WorkshopObj } from '@/app/types/workshop/workshop'
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { mapWorkshopItems } from '@/app/mappers/workshop/workshop'

export const useRepairsWorkshop = (accessToken: string) => {
  const [workshopItems, setWorkshopItems] = useState<WorkshopObj[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchWorkshopItems = async () => {
      try {
        const response = await axiosInstance.get('/repairs/company', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        const mapped = response.data.repairs.map(mapWorkshopItems)
        setWorkshopItems(mapped)
      } catch (err) {
        setError('Failed to load workshop items')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshopItems()
  }, [])

  return { workshopItems, loading, error }
}
