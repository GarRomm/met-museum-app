import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { ArtObject } from '../types'

interface ArtCardProps {
  data: ArtObject
}

export function ArtCard({ data }: ArtCardProps) {
  const sources = [
    data.primaryImageSmall,
    data.primaryImage,
    ...(data.additionalImages ?? []),
  ].filter(Boolean) as string[]

  const [srcIndex, setSrcIndex] = useState(0)

  return (
    <Link to={`/oeuvre/${data.objectID}`} className="group flex flex-col gap-2">
      <div className="overflow-hidden rounded bg-stone-100">
        {sources.length > 0 && srcIndex < sources.length ? (
          <img
            src={sources[srcIndex]}
            alt={data.title}
            className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setSrcIndex((i) => i + 1)}
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center">
            <span className="text-xs text-stone-400">Sans image</span>
          </div>
        )}
      </div>
      <div>
        <p className="line-clamp-2 text-sm font-medium leading-snug text-stone-900">
          {data.title || 'Sans titre'}
        </p>
        {data.artistDisplayName && (
          <p className="mt-0.5 line-clamp-1 text-xs text-stone-500">
            {data.artistDisplayName}
          </p>
        )}
      </div>
    </Link>
  )
}
