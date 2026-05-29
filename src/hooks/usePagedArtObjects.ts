import { useQueries } from '@tanstack/react-query'
import { fetchArtObject } from '../api/metClient'

export function usePagedArtObjects(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['artObject', id],
      queryFn: () => fetchArtObject(id),
      staleTime: 1000 * 60 * 10,
    })),
  })
}
