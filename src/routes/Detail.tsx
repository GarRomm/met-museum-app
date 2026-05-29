import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailSkeleton } from '../components/Skeleton'
import { useFetchArtObject } from '../hooks/useFetchArtObject'
import { useMuseumStore } from '../store/useMuseumStore'

export default function Detail() {
  const { objectID } = useParams<{ objectID: string }>()
  const navigate = useNavigate()
  const id = Number(objectID)

  const { data, isLoading, isError } = useFetchArtObject(id)
  const favorites = useMuseumStore((s) => s.favorites)
  const addFavorite = useMuseumStore((s) => s.addFavorite)
  const removeFavorite = useMuseumStore((s) => s.removeFavorite)
  const isFavorite = favorites.includes(id)

  const sources = data
    ? [data.primaryImageSmall, data.primaryImage, ...(data.additionalImages ?? [])].filter(Boolean) as string[]
    : []
  const [srcIndex, setSrcIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <DetailSkeleton />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="text-stone-600">Cette œuvre est introuvable.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-stone-500 underline hover:text-stone-800"
        >
          ← Retour
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-stone-500 underline hover:text-stone-800"
      >
        ← Retour
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          {sources.length > 0 && srcIndex < sources.length ? (
            <img
              src={sources[srcIndex]}
              alt={data.title}
              className="w-full rounded object-contain"
              onError={() => setSrcIndex((i) => i + 1)}
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded bg-stone-100">
              <span className="text-sm text-stone-400">Sans image</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              {data.title || 'Sans titre'}
            </h1>
            {data.isHighlight && (
              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                Œuvre phare
              </span>
            )}
          </div>

          {data.artistDisplayName && (
            <div>
              <p className="font-medium text-stone-800">{data.artistDisplayName}</p>
              {data.artistDisplayBio && (
                <p className="text-sm text-stone-500">{data.artistDisplayBio}</p>
              )}
            </div>
          )}

          <dl className="flex flex-col gap-2 text-sm">
            {data.objectDate && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Date</dt>
                <dd className="text-stone-700">{data.objectDate}</dd>
              </div>
            )}
            {data.medium && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Médium</dt>
                <dd className="text-stone-700">{data.medium}</dd>
              </div>
            )}
            {data.dimensions && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Dimensions</dt>
                <dd className="text-stone-700">{data.dimensions}</dd>
              </div>
            )}
            {data.culture && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Culture</dt>
                <dd className="text-stone-700">{data.culture}</dd>
              </div>
            )}
            {data.period && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Période</dt>
                <dd className="text-stone-700">{data.period}</dd>
              </div>
            )}
            {data.department && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Département</dt>
                <dd className="text-stone-700">{data.department}</dd>
              </div>
            )}
            {data.isOnView && data.GalleryNumber && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">En exposition</dt>
                <dd className="text-stone-700">Galerie {data.GalleryNumber}</dd>
              </div>
            )}
            {data.creditLine && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">Crédit</dt>
                <dd className="italic text-stone-500">{data.creditLine}</dd>
              </div>
            )}
          </dl>

          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((tag) => (
                <span
                  key={tag.term}
                  className="rounded-full border border-stone-200 px-2.5 py-0.5 text-xs text-stone-500"
                >
                  {tag.term}
                </span>
              ))}
            </div>
          )}

          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={() => (isFavorite ? removeFavorite(id) : addFavorite(id))}
              className={`rounded px-5 py-2 text-sm font-medium transition-colors ${
                isFavorite
                  ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>

            {data.objectURL && (
              <a
                href={data.objectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm text-stone-400 underline hover:text-stone-600"
              >
                Voir sur metmuseum.org
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
