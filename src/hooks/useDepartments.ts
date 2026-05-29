import { useQuery } from '@tanstack/react-query'
import { fetchDepartments } from '../api/metClient'

export function useDepartments() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
    staleTime: Infinity,
  })
}
