import { FavoritesList } from '../features/favorites/FavoritesList'
import { useMuseumStore } from '../store/useMuseumStore'

export default function Favorites() {
  const favorites = useMuseumStore((s) => s.favorites)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-3xl font-semibold text-stone-900">Mes favoris</h1>
      <p className="mb-8 text-sm text-stone-400">
        {favorites.length} œuvre{favorites.length !== 1 ? 's' : ''} sauvegardée{favorites.length !== 1 ? 's' : ''}
      </p>

      {favorites.length === 0 ? (
        <p className="py-24 text-center text-stone-400">
          Vous n'avez pas encore de favoris. Explorez la collection pour en ajouter.
        </p>
      ) : (
        <FavoritesList ids={favorites} />
      )}
    </div>
  )
}
