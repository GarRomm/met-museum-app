import { Skeleton } from '../../components/Skeleton'
import { useDepartments } from '../../hooks/useDepartments'
import { useMuseumStore } from '../../store/useMuseumStore'

export function DepartmentFilter() {
  const { data, isLoading, isError } = useDepartments()
  const selectedId = useMuseumStore((s) => s.selectedDepartmentId)
  const setSelectedDepartmentId = useMuseumStore((s) => s.setSelectedDepartmentId)
  const setSearchQuery = useMuseumStore((s) => s.setSearchQuery)

  if (isLoading) return <Skeleton className="h-9 w-52" />

  // En cas d'erreur, on masque le filtre plutôt que d'afficher un select vide et trompeur
  if (isError) return null

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchQuery('')
    setSelectedDepartmentId(e.target.value ? Number(e.target.value) : undefined)
  }

  return (
    <select
      value={selectedId ?? ''}
      onChange={handleChange}
      aria-label="Filtrer par département"
      className="rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
    >
      <option value="">Tous les départements</option>
      {data?.departments.map((d) => (
        <option key={d.departmentId} value={d.departmentId}>
          {d.displayName}
        </option>
      ))}
    </select>
  )
}
