import { type FormEvent, useState } from 'react'
import { useMuseumStore } from '../../store/useMuseumStore'

export function SearchBar() {
  const setSearchQuery = useMuseumStore((s) => s.setSearchQuery)
  const setDraftQuery = useMuseumStore((s) => s.setDraftQuery)
  const initialQuery = useMuseumStore((s) => s.searchQuery)
  const [value, setValue] = useState(initialQuery)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSearchQuery(value.trim())
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    setDraftQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Rechercher une œuvre, un artiste…"
        aria-label="Recherche"
        className="flex-1 rounded border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
      />
      <button
        type="submit"
        className="rounded bg-stone-800 px-5 py-2 text-sm text-white hover:bg-stone-700 transition-colors"
      >
        Rechercher
      </button>
    </form>
  )
}
