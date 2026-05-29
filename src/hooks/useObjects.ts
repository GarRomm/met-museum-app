import { useQuery } from '@tanstack/react-query'
import { fetchObjects } from '../api/metClient'
import type { ObjectsParams } from '../types'

export function useObjects(params?: ObjectsParams, enabled = true) {
  return useQuery({
    queryKey: ['objects', params],
    queryFn: () => fetchObjects(params),
    enabled,
    staleTime: 1000 * 60 * 60,
  })
}
