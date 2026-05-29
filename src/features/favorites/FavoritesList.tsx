import { ArtCard } from '../../components/ArtCard'
import { ArtCardSkeleton } from '../../components/Skeleton'
import { usePagedArtObjects } from '../../hooks/usePagedArtObjects'
import type { ArtObject } from '../../types'

interface FavoritesListProps {
  ids: number[]
}

export function FavoritesList({ ids }: FavoritesListProps) {
  const artQueries = usePagedArtObjects(ids)

  if (artQueries.some((q) => q.isLoading)) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {ids.map((id) => (
          <ArtCardSkeleton key={id} />
        ))}
      </div>
    )
  }

  // Les favoris sont toujours affichés, même sans image
  const artworks = artQueries
    .map((q) => q.data)
    .filter((art): art is ArtObject => art != null)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {artworks.map((art) => (
        <ArtCard key={art.objectID} data={art} />
      ))}
    </div>
  )
}
