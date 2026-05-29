import { ResultsGrid } from '../features/gallery/ResultsGrid'
import { DepartmentFilter } from '../features/search/DepartmentFilter'
import { QuickFilters } from '../features/search/QuickFilters'
import { SearchBar } from '../features/search/SearchBar'
import { SearchFilters } from '../features/search/SearchFilters'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-semibold text-stone-900">
        Collection du Metropolitan Museum of Art
      </h1>

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar />
        <DepartmentFilter />
        <SearchFilters />
      </div>

      <div className="mb-8">
        <QuickFilters />
      </div>

      <ResultsGrid />
    </div>
  )
}
