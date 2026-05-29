import { useQuery } from '@tanstack/react-query'
import { searchArtworks } from '../api/metClient'
import type { SearchParams } from '../types'

export function useSearch(params: SearchParams, enabled = true) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => searchArtworks(params),
    enabled: enabled && params.q.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  })
}
