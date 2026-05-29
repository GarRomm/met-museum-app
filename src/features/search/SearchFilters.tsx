import { useState } from 'react'
import { useMuseumStore } from '../../store/useMuseumStore'

export function SearchFilters() {
  const filters = useMuseumStore((s) => s.filters)
  const setFilters = useMuseumStore((s) => s.setFilters)
  const resetFilters = useMuseumStore((s) => s.resetFilters)

  const [isOpen, setIsOpen] = useState(false)
  const [mediumInput, setMediumInput] = useState(filters.medium.join(', '))
  const [geoInput, setGeoInput] = useState(filters.geoLocation.join(', '))
  const [dateBeginInput, setDateBeginInput] = useState(filters.dateBegin?.toString() ?? '')
  const [dateEndInput, setDateEndInput] = useState(filters.dateEnd?.toString() ?? '')

  function applyMedium() {
    setFilters({ medium: mediumInput.split(',').map((s) => s.trim()).filter(Boolean) })
  }

  function applyGeo() {
    setFilters({ geoLocation: geoInput.split(',').map((s) => s.trim()).filter(Boolean) })
  }

  function applyDates() {
    setFilters({
      dateBegin: dateBeginInput ? Number(dateBeginInput) : undefined,
      dateEnd: dateEndInput ? Number(dateEndInput) : undefined,
    })
  }

  function handleReset() {
    resetFilters()
    setMediumInput('')
    setGeoInput('')
    setDateBeginInput('')
    setDateEndInput('')
  }

  const activeCount = [
    filters.medium.length > 0,
    filters.geoLocation.length > 0,
    filters.dateBegin !== undefined || filters.dateEnd !== undefined,
  ].filter(Boolean).length

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
          activeCount > 0
            ? 'border-stone-800 bg-stone-800 text-white'
            : 'border-stone-300 text-stone-600 hover:border-stone-400'
        }`}
      >
        Filtres avancés
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-stone-800">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* fond transparent pour fermer au clic extérieur */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded border border-stone-200 bg-white p-5 shadow-lg sm:w-96">
            <div className="flex flex-col gap-5">

              {/* Médium */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Médium
                </label>
                <input
                  type="text"
                  value={mediumInput}
                  onChange={(e) => setMediumInput(e.target.value)}
                  onBlur={applyMedium}
                  placeholder="ex : Paintings, Ceramics, Gold"
                  className="rounded border border-stone-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
                <p className="text-xs text-stone-400">Séparer plusieurs valeurs par des virgules</p>
              </div>

              {/* Lieu géographique */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Lieu géographique
                </label>
                <input
                  type="text"
                  value={geoInput}
                  onChange={(e) => setGeoInput(e.target.value)}
                  onBlur={applyGeo}
                  placeholder="ex : France, Paris, Europe"
                  className="rounded border border-stone-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
                <p className="text-xs text-stone-400">Séparer plusieurs valeurs par des virgules</p>
              </div>

              {/* Période */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Période (année)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={dateBeginInput}
                    onChange={(e) => setDateBeginInput(e.target.value)}
                    onBlur={applyDates}
                    placeholder="De"
                    className="w-full rounded border border-stone-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                  <span className="shrink-0 text-stone-400">→</span>
                  <input
                    type="number"
                    value={dateEndInput}
                    onChange={(e) => setDateEndInput(e.target.value)}
                    onBlur={applyDates}
                    placeholder="À"
                    className="w-full rounded border border-stone-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <p className="text-xs text-stone-400">Valeurs négatives pour avant J.-C. (ex : -500)</p>
              </div>

              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-left text-sm text-stone-400 underline hover:text-stone-600"
                >
                  Réinitialiser les filtres avancés
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
