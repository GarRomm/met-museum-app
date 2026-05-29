import { useQuery } from '@tanstack/react-query'
import { fetchArtObject } from '../api/metClient'

export function useFetchArtObject(objectID: number) {
  return useQuery({
    queryKey: ['artObject', objectID],
    queryFn: () => fetchArtObject(objectID),
    staleTime: 1000 * 60 * 10,
    enabled: objectID > 0,
  })
}
