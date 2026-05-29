import { ArtCard } from '../../components/ArtCard'
import { ArtCardSkeleton } from '../../components/Skeleton'
import { useObjects } from '../../hooks/useObjects'
import { usePagedArtObjects } from '../../hooks/usePagedArtObjects'
import { useSearch } from '../../hooks/useSearch'
import { useMuseumStore } from '../../store/useMuseumStore'
import type { ArtObject } from '../../types'
import { Pagination } from './Pagination'

const PAGE_SIZE = 20

export function ResultsGrid() {
  const query = useMuseumStore((s) => s.searchQuery)
  const departmentId = useMuseumStore((s) => s.selectedDepartmentId)
  const page = useMuseumStore((s) => s.currentPage)
  const filters = useMuseumStore((s) => s.filters)

  const hasText = query.trim().length > 0

  // Filtres qui nécessitent l'endpoint /search (non supportés par /objects)
  const hasSearchFilters =
    filters.isHighlight ||
    filters.isOnView ||
    filters.searchInTitle ||
    filters.artistOrCulture ||
    filters.medium.length > 0 ||
    filters.geoLocation.length > 0 ||
    filters.dateBegin !== undefined ||
    filters.dateEnd !== undefined

  // Mode navigation : département seul, sans texte ni filtre search-spécifique
  const isBrowseMode = !hasText && !hasSearchFilters && departmentId !== undefined

  const searchResult = useSearch(
    {
      q: query.trim() || '*',
      departmentId,
      hasImages: (hasText && filters.hasImages) || undefined,
      isHighlight: filters.isHighlight || undefined,
      isOnView: filters.isOnView || undefined,
      title: filters.searchInTitle || undefined,
      artistOrCulture: filters.artistOrCulture || undefined,
      medium: filters.medium.length ? filters.medium : undefined,
      geoLocation: filters.geoLocation.length ? filters.geoLocation : undefined,
      dateBegin: filters.dateBegin,
      dateEnd: filters.dateEnd,
    },
    !isBrowseMode
  )

  // /objects pour le mode navigation par département
  const objectsResult = useObjects(
    { departmentIds: departmentId !== undefined ? [departmentId] : undefined },
    isBrowseMode
  )

  const activeResult = isBrowseMode ? objectsResult : searchResult
  const ids = activeResult.data?.objectIDs ?? []
  const pageIds = ids.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(ids.length / PAGE_SIZE)

  const artQueries = usePagedArtObjects(pageIds)

  if (activeResult.isError) {
    return (
      <p className="py-24 text-center text-stone-500">
        Impossible de charger les résultats. Vérifiez votre connexion et réessayez.
      </p>
    )
  }

  if (activeResult.isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <ArtCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (ids.length === 0) {
    return (
      <p className="py-24 text-center text-stone-500">
        {hasText
          ? `Aucun résultat pour « ${query} ».`
          : 'Aucun résultat pour les filtres sélectionnés.'}
      </p>
    )
  }

  if (artQueries.some((q) => q.isLoading)) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <ArtCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const artworks = artQueries
    .map((q) => q.data)
    .filter((art): art is ArtObject => {
      if (!art) return false
      if (!filters.hasImages) return true
      return Boolean(art.primaryImageSmall || art.primaryImage || art.additionalImages?.length)
    })

  const total = ids.length
  const label = `${total.toLocaleString('fr-FR')} œuvre${total > 1 ? 's' : ''} trouvée${total > 1 ? 's' : ''}`

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-stone-400">{label}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {artworks.map((art) => (
          <ArtCard key={art.objectID} data={art} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
