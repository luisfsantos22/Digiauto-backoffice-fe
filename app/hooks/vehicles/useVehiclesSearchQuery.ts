import { useState, useEffect } from 'react'
import axiosInstance from '../axiosInstance'
import { useSession } from 'next-auth/react'

interface Vehicle {
  id: string
  licensePlate: string
  brand: string
  model: string
}

interface UseVehiclesSearchQueryResult {
  vehicles: Vehicle[]
  search: string
  setSearch: (value: string) => void
  loading: boolean
  error: string | null
}

const useVehiclesSearchQuery = (): UseVehiclesSearchQueryResult => {
  const { data: session } = useSession()
  const [search, setSearch] = useState('')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!search) {
      setVehicles([])
      return
    }

    const fetchVehicles = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axiosInstance.get(`/vehicles/company/search`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          params: { keyword: search },
        })
        setVehicles(response.data.vehicles)
      } catch (err) {
        setError('Failed to fetch vehicles')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [search])

  return { vehicles, search, setSearch, loading, error }
}

export default useVehiclesSearchQuery
