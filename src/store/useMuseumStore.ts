import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SearchFilters {
  hasImages: boolean
  isHighlight: boolean
  isOnView: boolean
  searchInTitle: boolean
  artistOrCulture: boolean
  medium: string[]
  geoLocation: string[]
  dateBegin: number | undefined
  dateEnd: number | undefined
}

const defaultFilters: SearchFilters = {
  hasImages: false,
  isHighlight: true,
  isOnView: false,
  searchInTitle: false,
  artistOrCulture: false,
  medium: [],
  geoLocation: [],
  dateBegin: undefined,
  dateEnd: undefined,
}

interface MuseumState {
  favorites: number[]
  searchQuery: string
  draftQuery: string
  selectedDepartmentId: number | undefined
  currentPage: number
  filters: SearchFilters
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  setSearchQuery: (query: string) => void
  setDraftQuery: (query: string) => void
  setSelectedDepartmentId: (id: number | undefined) => void
  setCurrentPage: (page: number) => void
  setFilters: (partial: Partial<SearchFilters>) => void
  resetFilters: () => void
}

export const useMuseumStore = create<MuseumState>()(
  persist(
    (set) => ({
      favorites: [],
      searchQuery: '',
      draftQuery: '',
      selectedDepartmentId: undefined,
      currentPage: 1,
      filters: defaultFilters,
      addFavorite: (id) =>
        set((s) => ({ favorites: [...s.favorites, id] })),
      removeFavorite: (id) =>
        set((s) => ({ favorites: s.favorites.filter((f) => f !== id) })),
      setSearchQuery: (query) =>
        set({ searchQuery: query, draftQuery: query, currentPage: 1 }),
      setDraftQuery: (query) =>
        set({ draftQuery: query }),
      setSelectedDepartmentId: (id) =>
        set({ selectedDepartmentId: id, currentPage: 1 }),
      setCurrentPage: (page) =>
        set({ currentPage: page }),
      setFilters: (partial) =>
        set((s) => ({ filters: { ...s.filters, ...partial }, currentPage: 1 })),
      resetFilters: () =>
        set({ filters: defaultFilters, currentPage: 1 }),
    }),
    { name: 'met-museum-store' }
  )
)
