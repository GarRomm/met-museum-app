import { useMuseumStore } from '../../store/useMuseumStore'

interface ChipProps {
  label: string
  active: boolean
  disabled?: boolean
  onClick: () => void
}

function FilterChip({ label, active, disabled, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        disabled
          ? 'cursor-not-allowed border-stone-200 text-stone-300'
          : active
            ? 'border-stone-800 bg-stone-800 text-white'
            : 'border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-800'
      }`}
    >
      {label}
    </button>
  )
}

export function QuickFilters() {
  const filters = useMuseumStore((s) => s.filters)
  const setFilters = useMuseumStore((s) => s.setFilters)
  const hasQuery = useMuseumStore((s) => s.draftQuery.trim().length > 0)

  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label="Avec image"
        active={filters.hasImages}
        onClick={() => setFilters({ hasImages: !filters.hasImages })}
      />
      <FilterChip
        label="En exposition"
        active={filters.isOnView}
        onClick={() => setFilters({ isOnView: !filters.isOnView })}
      />
      <FilterChip
        label="Œuvres phares"
        active={filters.isHighlight}
        onClick={() => setFilters({ isHighlight: !filters.isHighlight })}
      />
      <FilterChip
        label="Par artiste ou culture"
        active={filters.artistOrCulture}
        disabled={!hasQuery}
        onClick={() => setFilters({ artistOrCulture: !filters.artistOrCulture })}
      />
      <FilterChip
        label="Dans le titre"
        active={filters.searchInTitle}
        disabled={!hasQuery}
        onClick={() => setFilters({ searchInTitle: !filters.searchInTitle })}
      />
    </div>
  )
}
